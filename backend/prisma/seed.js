// GramVerse seed – chạy bằng: npx prisma db seed  (hoặc npm run db:seed)
// Idempotent: chạy lại nhiều lần không tạo bản ghi trùng, không xóa dữ liệu người dùng.
import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";
import { galaxies, planets, relationships, galaxyPosition, planetPosition } from "./seed-data/galaxies.js";
import { zonesByPlanet } from "./seed-data/zones.js";
import { vocabSets, posToZone } from "./seed-data/vocabulary.js";

const DIFFICULTY_XP = { EASY: 20, MEDIUM: 30, HARD: 40 };

// Bài học khó nhất trong khu vực quyết định độ khó của khu vực
function zoneDifficulty(questions) {
  if (questions.some((q) => q.difficulty === "HARD")) return "HARD";
  if (questions.some((q) => q.difficulty === "MEDIUM")) return "MEDIUM";
  return "EASY";
}

function firstSentence(text) {
  return text.split(/(?<=[.!?])\s/)[0];
}

async function seedSystem() {
  const settings = [
    ["ai_daily_limit_user", "20", "Số lượt gọi Gemini tối đa mỗi ngày cho USER"],
    ["ai_daily_limit_admin", "200", "Số lượt gọi Gemini tối đa mỗi ngày cho ADMIN"],
    ["xp_per_correct_answer", "5", "XP cộng cho mỗi câu trả lời đúng"],
    ["srs_new_words_per_day", "10", "Số từ mới tối đa đưa vào SRS mỗi ngày"],
    ["lesson_pass_score", "70", "Điểm (%) tối thiểu để hoàn thành một Khu vực"],
  ];
  for (const [key, value, description] of settings) {
    await prisma.systemSetting.upsert({
      where: { key },
      update: { description }, // giữ nguyên value admin đã chỉnh
      create: { key, value, description },
    });
  }

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    await prisma.user.upsert({
      where: { email },
      update: { role: "ADMIN" },
      create: {
        email,
        passwordHash: await bcrypt.hash(password, 10),
        fullName: "GramVerse Admin",
        role: "ADMIN",
      },
    });
    console.log(`  ✓ Admin: ${email}`);
  } else {
    console.log("  • Bỏ qua tạo admin (thiếu SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)");
  }
}

async function seedUniverse() {
  // Tầng 1 – Thiên hà
  const galaxyIds = {};
  for (const g of galaxies) {
    const { angle, ...data } = g;
    const pos = galaxyPosition(g);
    const row = await prisma.grammarCategory.upsert({
      where: { slug: g.slug },
      update: { ...data, nodeX: pos.x, nodeY: pos.y },
      create: { ...data, nodeX: pos.x, nodeY: pos.y },
    });
    galaxyIds[g.slug] = row.id;
  }
  console.log(`  ✓ ${galaxies.length} thiên hà`);

  // Tầng 2 – Hành tinh
  const topicIds = {};
  let globalOrder = 0;
  for (const g of galaxies) {
    const members = planets.filter((p) => p.galaxy === g.slug);
    for (const [i, p] of members.entries()) {
      const { galaxy, ...data } = p;
      const pos = planetPosition(g, i, members.length);
      const zoneCount = zonesByPlanet[p.slug]?.length ?? 0;
      const fields = {
        ...data,
        categoryId: galaxyIds[galaxy],
        orderIndex: ++globalOrder,
        nodeX: pos.x,
        nodeY: pos.y,
        nodeSize: 44 + zoneCount * 3, // hành tinh nhiều khu vực trông "to" hơn
      };
      const row = await prisma.grammarTopic.upsert({
        where: { slug: p.slug },
        update: fields,
        create: fields,
      });
      topicIds[p.slug] = row.id;
    }
  }
  console.log(`  ✓ ${planets.length} hành tinh`);

  for (const [src, tgt, relationType, labelVi] of relationships) {
    const sourceTopicId = topicIds[src];
    const targetTopicId = topicIds[tgt];
    await prisma.topicRelationship.upsert({
      where: { sourceTopicId_targetTopicId: { sourceTopicId, targetTopicId } },
      update: { relationType, labelVi },
      create: { sourceTopicId, targetTopicId, relationType, labelVi },
    });
  }
  console.log(`  ✓ ${relationships.length} liên kết hành tinh`);

  // Tầng 3 – Khu vực + bài tập
  const lessonIds = {}; // "planet/zone" → id
  let zoneTotal = 0;
  let questionTotal = 0;
  for (const [planetSlug, zones] of Object.entries(zonesByPlanet)) {
    const topicId = topicIds[planetSlug];
    if (!topicId) throw new Error(`Hành tinh không tồn tại: ${planetSlug}`);

    for (const [i, z] of zones.entries()) {
      const { questions = [], ...zone } = z;
      const difficulty = zoneDifficulty(questions);
      const fields = {
        ...zone,
        summaryVi: zone.summaryVi ?? firstSentence(zone.theoryVi),
        summaryEn: zone.summaryEn ?? firstSentence(zone.theoryEn),
        orderIndex: i + 1,
        difficulty,
        xpReward: DIFFICULTY_XP[difficulty],
      };
      const lesson = await prisma.lesson.upsert({
        where: { topicId_slug: { topicId, slug: z.slug } },
        update: fields,
        create: { ...fields, topicId },
      });
      lessonIds[`${planetSlug}/${z.slug}`] = lesson.id;
      zoneTotal++;

      // Chỉ thêm câu hỏi mẫu khi khu vực chưa có câu hỏi thủ công nào,
      // để không xóa lịch sử làm bài (question_attempts) khi seed lại.
      const existing = await prisma.question.count({ where: { lessonId: lesson.id, source: "MANUAL" } });
      if (existing === 0 && questions.length) {
        await prisma.question.createMany({
          data: questions.map((q, qi) => ({ ...q, lessonId: lesson.id, orderIndex: qi + 1 })),
        });
        questionTotal += questions.length;
      }
    }
  }
  console.log(`  ✓ ${zoneTotal} khu vực, +${questionTotal} câu hỏi mới`);
  return lessonIds;
}

async function seedVocabulary(lessonIds) {
  let wordTotal = 0;
  for (const [i, set] of vocabSets.entries()) {
    const { words, ...data } = set;
    const row = await prisma.vocabSet.upsert({
      where: { slug: set.slug },
      update: { ...data, orderIndex: i + 1 },
      create: { ...data, orderIndex: i + 1 },
    });

    for (const word of words) {
      const [planetSlug, zoneSlug] = posToZone[word.pos];
      const fields = {
        ...word,
        cefrLevel: set.level,
        posLessonId: lessonIds[`${planetSlug}/${zoneSlug}`] ?? null,
      };
      await prisma.word.upsert({
        where: { setId_word_pos: { setId: row.id, word: word.word, pos: word.pos } },
        update: fields,
        create: { ...fields, setId: row.id },
      });
      wordTotal++;
    }
  }
  console.log(`  ✓ ${vocabSets.length} bộ từ vựng, ${wordTotal} từ`);
}

async function main() {
  console.log("🌌 Seeding GramVerse…");
  await seedSystem();
  const lessonIds = await seedUniverse();
  await seedVocabulary(lessonIds);
  console.log("✅ Seed hoàn tất");
}

main()
  .catch((err) => {
    console.error("❌ Seed thất bại:", err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
