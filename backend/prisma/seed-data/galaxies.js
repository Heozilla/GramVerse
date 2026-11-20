// Tầng 1 (Thiên hà) + Tầng 2 (Hành tinh) + liên kết giữa các hành tinh.
// Tọa độ node dùng cho ECharts graph layout "none": BEGIN nằm tại (0, 0),
// 3 thiên hà tỏa theo 3 hướng, các hành tinh xòe quạt quanh thiên hà của mình.

export const galaxies = [
  {
    slug: "foundation",
    nameVi: "Nền tảng",
    nameEn: "Foundation",
    descriptionVi: "Những viên gạch đầu tiên: loại từ, thành phần câu, động từ và thì.",
    descriptionEn: "The building blocks: parts of speech, sentence elements, verbs and tenses.",
    color: "#38bdf8",
    icon: "Orbit",
    orderIndex: 1,
    angle: -90, // phía trên BEGIN
  },
  {
    slug: "structure",
    nameVi: "Cấu trúc",
    nameEn: "Structure",
    descriptionVi: "Ghép từ thành cụm, cụm thành mệnh đề, mệnh đề thành câu hoàn chỉnh.",
    descriptionEn: "Combine words into phrases, phrases into clauses, clauses into sentences.",
    color: "#f59e0b",
    icon: "Layers",
    orderIndex: 2,
    angle: 30, // phía dưới bên phải
  },
  {
    slug: "mastery",
    nameVi: "Nâng cao",
    nameEn: "Mastery",
    descriptionVi: "Mạo từ, từ hạn định và các cấu trúc đặc biệt để dùng tiếng Anh tự nhiên.",
    descriptionEn: "Articles, determiners and special structures for natural English.",
    color: "#f87171",
    icon: "Crown",
    orderIndex: 3,
    angle: 150, // phía dưới bên trái
  },
];

export const planets = [
  // ── Thiên hà 1 – Foundation ──────────────────────────────
  {
    galaxy: "foundation",
    slug: "parts-of-speech",
    nameVi: "Loại từ",
    nameEn: "Parts of Speech",
    descriptionVi: "8 loại từ cơ bản và chức năng của chúng trong câu.",
    descriptionEn: "The 8 basic word classes and what they do in a sentence.",
    color: "#0ea5e9",
    icon: "Shapes",
  },
  {
    galaxy: "foundation",
    slug: "sentence-elements",
    nameVi: "Thành phần câu",
    nameEn: "Sentence Elements",
    descriptionVi: "Chủ ngữ, vị ngữ, tân ngữ, bổ ngữ và trạng ngữ.",
    descriptionEn: "Subject, verb, object, complement and adverbial.",
    color: "#8b5cf6",
    icon: "Puzzle",
  },
  {
    galaxy: "foundation",
    slug: "verb-forms",
    nameVi: "Dạng của động từ",
    nameEn: "Verb Forms",
    descriptionVi: "Nguyên mẫu, to-V, V-ing, quá khứ phân từ và cách dùng.",
    descriptionEn: "Bare infinitive, to-infinitive, gerund and participles.",
    color: "#0284c7",
    icon: "Repeat",
  },
  {
    galaxy: "foundation",
    slug: "tenses",
    nameVi: "Thì",
    nameEn: "Tenses",
    descriptionVi: "12 thì tiếng Anh: hiện tại, quá khứ, tương lai ở 4 thể.",
    descriptionEn: "The 12 English tenses across present, past and future.",
    color: "#a855f7",
    icon: "Clock",
  },
  {
    galaxy: "foundation",
    slug: "agreement",
    nameVi: "Sự hòa hợp",
    nameEn: "Agreement",
    descriptionVi: "Hòa hợp giữa chủ ngữ – động từ và đại từ – danh từ.",
    descriptionEn: "Subject–verb and pronoun–antecedent agreement.",
    color: "#e2e8f0",
    icon: "Scale",
  },
  {
    galaxy: "foundation",
    slug: "important-clauses",
    nameVi: "Mệnh đề quan trọng",
    nameEn: "Important Clauses",
    descriptionVi: "Câu điều kiện và câu ước – những mệnh đề dùng hằng ngày.",
    descriptionEn: "Conditionals and wish clauses used every day.",
    color: "#f97316",
    icon: "GitBranch",
  },

  // ── Thiên hà 2 – Structure ───────────────────────────────
  {
    galaxy: "structure",
    slug: "sentence-structures",
    nameVi: "Cấu trúc câu",
    nameEn: "Sentence Structures",
    descriptionVi: "5 mẫu câu cơ bản: SV, SVO, SVC, SVOO, SVOC.",
    descriptionEn: "The 5 basic patterns: SV, SVO, SVC, SVOO, SVOC.",
    color: "#d97706",
    icon: "Blocks",
  },
  {
    galaxy: "structure",
    slug: "phrases",
    nameVi: "Cụm từ",
    nameEn: "Phrases",
    descriptionVi: "Cụm danh từ, động từ, tính từ, trạng từ, giới từ, phân từ.",
    descriptionEn: "Noun, verb, adjective, adverb, prepositional and participle phrases.",
    color: "#fb7185",
    icon: "Link",
  },
  {
    galaxy: "structure",
    slug: "clauses",
    nameVi: "Mệnh đề",
    nameEn: "Clauses",
    descriptionVi: "Mệnh đề độc lập, phụ thuộc, danh từ, quan hệ và trạng ngữ.",
    descriptionEn: "Independent, dependent, noun, relative and adverbial clauses.",
    color: "#b45309",
    icon: "Brackets",
  },
  {
    galaxy: "structure",
    slug: "types-of-sentences",
    nameVi: "Các loại câu",
    nameEn: "Types of Sentences",
    descriptionVi: "Câu trần thuật, nghi vấn, mệnh lệnh, cảm thán, câu ghép, câu phức.",
    descriptionEn: "Declarative, interrogative, imperative, exclamatory, compound, complex.",
    color: "#9333ea",
    icon: "MessageSquareText",
  },

  // ── Thiên hà 3 – Mastery ─────────────────────────────────
  {
    galaxy: "mastery",
    slug: "special-structures",
    nameVi: "Các cấu trúc ngữ pháp đặc biệt",
    nameEn: "Special Structures",
    descriptionVi: "Bị động, câu tường thuật, đảo ngữ, câu chẻ, thể sai khiến…",
    descriptionEn: "Passive voice, reported speech, inversion, cleft sentences, causatives…",
    color: "#f87171",
    icon: "Sparkles",
  },
  {
    galaxy: "mastery",
    slug: "articles-determiners",
    nameVi: "Mạo từ & Từ hạn định",
    nameEn: "Articles & Determiners",
    descriptionVi: "a/an, the, không mạo từ, chỉ định từ, lượng từ, sở hữu.",
    descriptionEn: "a/an, the, zero article, demonstratives, quantifiers, possessives.",
    color: "#0d9488",
    icon: "Pointer",
  },
];

// Liên kết vẽ cạnh trên bản đồ (source → target)
export const relationships = [
  ["parts-of-speech", "sentence-elements", "PREREQUISITE", "Từ tạo nên câu"],
  ["parts-of-speech", "articles-determiners", "PREREQUISITE", "Từ hạn định là một loại từ"],
  ["parts-of-speech", "phrases", "PREREQUISITE", "Loại từ là lõi của cụm từ"],
  ["sentence-elements", "sentence-structures", "PREREQUISITE", "Thành phần ghép thành mẫu câu"],
  ["sentence-elements", "agreement", "RELATED", "Chủ ngữ quyết định động từ"],
  ["verb-forms", "tenses", "PREREQUISITE", "Thì được tạo từ các dạng động từ"],
  ["verb-forms", "phrases", "RELATED", "Cụm phân từ, cụm to-V"],
  ["tenses", "agreement", "RELATED", "Chia động từ theo chủ ngữ"],
  ["tenses", "important-clauses", "PREREQUISITE", "Câu điều kiện lùi thì"],
  ["tenses", "special-structures", "PREREQUISITE", "Bị động & tường thuật dựa trên thì"],
  ["phrases", "clauses", "PREREQUISITE", "Cụm từ mở rộng thành mệnh đề"],
  ["clauses", "types-of-sentences", "PREREQUISITE", "Mệnh đề tạo câu ghép, câu phức"],
  ["important-clauses", "clauses", "EXTENDS", "Mở rộng sang mọi loại mệnh đề"],
  ["sentence-structures", "types-of-sentences", "RELATED", "Mẫu câu và loại câu"],
  ["types-of-sentences", "special-structures", "EXTENDS", "Biến đổi câu nâng cao"],
];

// Tính tọa độ: thiên hà cách BEGIN 260px, hành tinh xòe quạt cách thiên hà 170px.
const GALAXY_RADIUS = 260;
const PLANET_RADIUS = 170;
const FAN_SPREAD = 140; // độ

export function galaxyPosition(galaxy) {
  const rad = (galaxy.angle * Math.PI) / 180;
  return { x: Math.round(Math.cos(rad) * GALAXY_RADIUS), y: Math.round(Math.sin(rad) * GALAXY_RADIUS) };
}

export function planetPosition(galaxy, index, total) {
  const center = galaxyPosition(galaxy);
  const step = total > 1 ? FAN_SPREAD / (total - 1) : 0;
  const angle = galaxy.angle - FAN_SPREAD / 2 + step * index;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.round(center.x + Math.cos(rad) * PLANET_RADIUS),
    y: Math.round(center.y + Math.sin(rad) * PLANET_RADIUS),
  };
}
