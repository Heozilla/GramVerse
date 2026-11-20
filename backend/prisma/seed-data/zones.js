// Tầng 3 – Các Khu vực (Zones) của từng hành tinh.
// Mỗi khu vực: lý thuyết song ngữ ngắn gọn + công thức + ví dụ + mẹo + bài tập.
// Admin có thể bổ sung thêm câu hỏi bằng trợ lý Gemini (source = AI_GENERATED).

// ── Helpers rút gọn ───────────────────────────────────────────
/** Ví dụ song ngữ; highlight = các chuỗi con trong câu EN cần tô màu hành tinh */
const ex = (en, vi, highlight = []) => ({ en, vi, highlight });

/** Trắc nghiệm */
const mc = (promptEn, options, correctAnswer, explanationVi, difficulty = "EASY") => ({
  type: "MULTIPLE_CHOICE",
  promptEn,
  options,
  correctAnswer,
  explanationVi,
  difficulty,
});

/** Điền từ vào chỗ trống ("___") */
const fill = (promptEn, correctAnswer, explanationVi, acceptableAnswers = null, difficulty = "MEDIUM") => ({
  type: "FILL_BLANK",
  promptEn,
  promptVi: "Điền vào chỗ trống.",
  correctAnswer,
  // Cột Json? không nhận null thường trong createMany → bỏ hẳn key khi không có
  ...(acceptableAnswers ? { acceptableAnswers } : {}),
  explanationVi,
  difficulty,
});

/** Tìm và sửa lỗi sai: correctAnswer là câu đúng hoàn chỉnh */
const fix = (promptEn, correctAnswer, explanationVi, difficulty = "MEDIUM") => ({
  type: "ERROR_CORRECTION",
  promptEn,
  promptVi: "Tìm lỗi sai và viết lại câu đúng.",
  correctAnswer,
  explanationVi,
  difficulty,
});

// ══════════════════════════════════════════════════════════════
export const zonesByPlanet = {
  // ────────────────────────────────────────────────────────────
  // 1. PARTS OF SPEECH
  // ────────────────────────────────────────────────────────────
  "parts-of-speech": [
    {
      slug: "nouns",
      titleVi: "Danh từ",
      titleEn: "Nouns",
      theoryVi: "Danh từ gọi tên người, vật, nơi chốn hoặc khái niệm. Danh từ đếm được có dạng số ít/số nhiều (book → books); danh từ không đếm được không thêm -s (water, information).",
      theoryEn: "Nouns name people, things, places or ideas. Countable nouns have singular/plural forms (book → books); uncountable nouns take no -s (water, information).",
      formula: "a/an + N(số ít) | N-s/es (số nhiều) | N không đếm được",
      examples: [ex("She bought two books.", "Cô ấy đã mua hai quyển sách.", ["books"]), ex("I need some information.", "Tôi cần một vài thông tin.", ["information"])],
      tipVi: "Đuôi -tion, -ment, -ness, -ity thường là danh từ.",
      questions: [
        mc("Which word is a noun?", ["happiness", "happy", "happily", "happen"], "happiness", "Đuôi -ness tạo danh từ: happiness = niềm hạnh phúc."),
        fix("Can you give me some advices?", "Can you give me some advice?", "'advice' là danh từ không đếm được nên không thêm -s."),
      ],
    },
    {
      slug: "pronouns",
      titleVi: "Đại từ",
      titleEn: "Pronouns",
      theoryVi: "Đại từ thay thế cho danh từ để tránh lặp lại. Có đại từ nhân xưng chủ ngữ (I, he), tân ngữ (me, him), sở hữu (mine, his) và phản thân (myself).",
      theoryEn: "Pronouns replace nouns to avoid repetition: subject (I, he), object (me, him), possessive (mine, his) and reflexive (myself) pronouns.",
      formula: "Chủ ngữ: I/you/he/she/it/we/they • Tân ngữ: me/you/him/her/it/us/them",
      examples: [ex("Tom is tall. He plays basketball.", "Tom cao. Anh ấy chơi bóng rổ.", ["He"]), ex("This bag is mine.", "Cái túi này là của tôi.", ["mine"])],
      tipVi: "Sau động từ và giới từ luôn dùng đại từ tân ngữ: with me, call him.",
      questions: [
        mc("Please give the keys to ___.", ["I", "me", "my", "mine"], "me", "Sau giới từ 'to' dùng đại từ tân ngữ 'me'."),
        fill("She hurt ___ while cooking.", "herself", "Chủ ngữ và tân ngữ là cùng một người → dùng đại từ phản thân 'herself'."),
      ],
    },
    {
      slug: "verbs",
      titleVi: "Động từ",
      titleEn: "Verbs",
      theoryVi: "Động từ diễn tả hành động hoặc trạng thái. Gồm động từ thường (run, eat), động từ to be (am/is/are) và trợ động từ/khuyết thiếu (do, have, can, must).",
      theoryEn: "Verbs express actions or states: main verbs (run, eat), the verb 'be' (am/is/are) and auxiliary/modal verbs (do, have, can, must).",
      formula: "S + V | S + modal + V(nguyên mẫu)",
      examples: [ex("Birds fly south in winter.", "Chim bay về phương nam vào mùa đông.", ["fly"]), ex("You must wear a helmet.", "Bạn phải đội mũ bảo hiểm.", ["must wear"])],
      tipVi: "Sau động từ khuyết thiếu (can, must, should…) luôn là động từ nguyên mẫu không 'to'.",
      questions: [
        mc("She can ___ three languages.", ["speak", "speaks", "to speak", "speaking"], "speak", "Sau 'can' dùng động từ nguyên mẫu không 'to'."),
        fix("He musts finish the report today.", "He must finish the report today.", "Động từ khuyết thiếu 'must' không chia theo ngôi, không thêm -s."),
      ],
    },
    {
      slug: "adjectives",
      titleVi: "Tính từ",
      titleEn: "Adjectives",
      theoryVi: "Tính từ bổ nghĩa cho danh từ, đứng trước danh từ (a red car) hoặc sau động từ nối như be, seem, look, feel (She looks tired).",
      theoryEn: "Adjectives describe nouns. They go before a noun (a red car) or after linking verbs like be, seem, look, feel (She looks tired).",
      formula: "Adj + N | S + linking verb + Adj",
      examples: [ex("It was an interesting film.", "Đó là một bộ phim thú vị.", ["interesting"]), ex("The soup smells delicious.", "Món súp có mùi thơm ngon.", ["delicious"])],
      tipVi: "Đuôi -ful, -less, -ous, -able, -ive, -al thường là tính từ.",
      questions: [
        mc("The test was very ___.", ["difficulty", "difficult", "difficultly", "differ"], "difficult", "Sau 'be' + 'very' cần một tính từ: difficult."),
        mc("She feels ___ today.", ["happily", "happy", "happiness", "happen"], "happy", "'feel' là động từ nối, theo sau là tính từ chứ không phải trạng từ."),
      ],
    },
    {
      slug: "adverbs",
      titleVi: "Trạng từ",
      titleEn: "Adverbs",
      theoryVi: "Trạng từ bổ nghĩa cho động từ, tính từ hoặc trạng từ khác, cho biết cách thức, thời gian, nơi chốn, tần suất. Nhiều trạng từ = tính từ + -ly (quick → quickly).",
      theoryEn: "Adverbs modify verbs, adjectives or other adverbs, showing manner, time, place or frequency. Many are adjective + -ly (quick → quickly).",
      formula: "V + Adv | Adv + Adj | S + Adv tần suất + V",
      examples: [ex("He drives carefully.", "Anh ấy lái xe cẩn thận.", ["carefully"]), ex("I usually get up at six.", "Tôi thường dậy lúc 6 giờ.", ["usually"])],
      tipVi: "good (tính từ) → well (trạng từ); fast, hard, late giữ nguyên dạng.",
      questions: [
        mc("She sings ___.", ["beautiful", "beautifully", "beauty", "beautify"], "beautifully", "Bổ nghĩa cho động từ 'sings' cần trạng từ chỉ cách thức."),
        fix("He works very hardly.", "He works very hard.", "'hard' vừa là tính từ vừa là trạng từ; 'hardly' nghĩa là 'hầu như không'."),
      ],
    },
    {
      slug: "prepositions",
      titleVi: "Giới từ",
      titleEn: "Prepositions",
      theoryVi: "Giới từ chỉ mối quan hệ thời gian, nơi chốn, phương hướng giữa danh từ/đại từ và phần còn lại của câu: in, on, at, to, from, with…",
      theoryEn: "Prepositions show relationships of time, place or direction between a noun/pronoun and the rest of the sentence: in, on, at, to, from, with…",
      formula: "at + giờ | on + ngày/thứ | in + tháng/năm/mùa",
      examples: [ex("The meeting is on Monday at 9 a.m.", "Cuộc họp vào thứ Hai lúc 9 giờ sáng.", ["on Monday","at 9 a.m."]), ex("She was born in 2005.", "Cô ấy sinh năm 2005.", ["in 2005"])],
      tipVi: "Nhớ 'tam giác thời gian': AT (điểm) → ON (ngày) → IN (khoảng dài).",
      questions: [
        mc("My birthday is ___ July.", ["at", "on", "in", "by"], "in", "Trước tháng dùng 'in'."),
        mc("See you ___ Friday!", ["in", "on", "at", "for"], "on", "Trước thứ trong tuần dùng 'on'."),
      ],
    },
    {
      slug: "conjunctions",
      titleVi: "Liên từ",
      titleEn: "Conjunctions",
      theoryVi: "Liên từ nối từ, cụm từ hoặc mệnh đề. Liên từ kết hợp: FANBOYS (for, and, nor, but, or, yet, so); liên từ phụ thuộc: because, although, when, if…",
      theoryEn: "Conjunctions join words, phrases or clauses. Coordinating: FANBOYS (for, and, nor, but, or, yet, so); subordinating: because, although, when, if…",
      formula: "Mệnh đề 1 + , + FANBOYS + Mệnh đề 2",
      examples: [ex("I was tired, so I went to bed early.", "Tôi mệt nên đi ngủ sớm.", ["so"]), ex("Although it rained, we went out.", "Mặc dù trời mưa, chúng tôi vẫn ra ngoài.", ["Although"])],
      tipVi: "Không dùng 'although' và 'but' trong cùng một câu.",
      questions: [
        mc("She studied hard, ___ she passed the exam.", ["but", "so", "or", "although"], "so", "'so' chỉ kết quả: học chăm → đỗ."),
        fix("Although he was ill, but he went to work.", "Although he was ill, he went to work.", "Đã có 'although' thì bỏ 'but'."),
      ],
    },
    {
      slug: "interjections",
      titleVi: "Thán từ",
      titleEn: "Interjections",
      theoryVi: "Thán từ diễn tả cảm xúc đột ngột, thường đứng đầu câu và theo sau là dấu chấm than hoặc dấu phẩy: Wow!, Oh, Oops!, Ouch!",
      theoryEn: "Interjections express sudden emotion, usually at the start of a sentence followed by an exclamation mark or comma: Wow!, Oh, Oops!, Ouch!",
      formula: "Interjection + ! / , + câu",
      examples: [ex("Wow! What a view!", "Chà! Cảnh đẹp quá!", ["Wow!"]), ex("Oops, I dropped my phone.", "Ối, tôi làm rơi điện thoại rồi.", ["Oops"])],
      tipVi: "Thán từ không có chức năng ngữ pháp trong câu; bỏ đi câu vẫn đúng.",
      questions: [
        mc("___! That hurts!", ["Ouch", "Hooray", "Yum", "Bravo"], "Ouch", "'Ouch' diễn tả cảm giác đau."),
        mc("Which word is an interjection?", ["hooray", "quickly", "under", "because"], "hooray", "'hooray' thể hiện sự vui mừng – là thán từ."),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 2. SENTENCE ELEMENTS
  // ────────────────────────────────────────────────────────────
  "sentence-elements": [
    {
      slug: "subject",
      titleVi: "Chủ ngữ",
      titleEn: "Subject",
      theoryVi: "Chủ ngữ là người/vật thực hiện hành động hoặc được nói đến, thường đứng đầu câu. Chủ ngữ có thể là danh từ, đại từ, V-ing hoặc mệnh đề.",
      theoryEn: "The subject is who or what does the action or is described, usually at the start. It can be a noun, pronoun, gerund or clause.",
      formula: "S (N / Pronoun / V-ing / Clause) + V",
      examples: [ex("Swimming is good for health.", "Bơi lội tốt cho sức khỏe.", ["Swimming"]), ex("My brother lives in Hanoi.", "Anh trai tôi sống ở Hà Nội.", ["My brother"])],
      tipVi: "Hỏi 'Ai/Cái gì + động từ?' để tìm chủ ngữ.",
      questions: [
        mc("Find the subject: 'The old man next door walks his dog every morning.'", ["The old man next door", "walks", "his dog", "every morning"], "The old man next door", "Cả cụm 'The old man next door' là người thực hiện hành động 'walks'."),
        mc("___ English every day helps you improve.", ["Practise", "Practising", "Practised", "To practising"], "Practising", "V-ing có thể làm chủ ngữ."),
      ],
    },
    {
      slug: "predicate-verb",
      titleVi: "Vị ngữ (Động từ chính)",
      titleEn: "Predicate & Main Verb",
      theoryVi: "Vị ngữ cho biết chủ ngữ làm gì hoặc thế nào, luôn chứa động từ chính đã chia theo chủ ngữ và thì. Mỗi mệnh đề phải có đúng một động từ chính đã chia.",
      theoryEn: "The predicate tells what the subject does or is, and always contains a finite main verb. Each clause needs exactly one finite verb.",
      formula: "S + V(chia) + …",
      examples: [ex("The children are playing in the yard.", "Lũ trẻ đang chơi ngoài sân.", ["are playing"]), ex("She seems happy.", "Cô ấy có vẻ vui.", ["seems"])],
      tipVi: "Câu thiếu động từ chia là lỗi rất phổ biến: 'She very kind.' ✗",
      questions: [
        fix("She very kind to everyone.", "She is very kind to everyone.", "Câu thiếu động từ chính → thêm 'is'."),
        mc("Which is the main verb? 'They have finished their homework.'", ["have", "finished", "have finished", "homework"], "have finished", "Động từ chính ở thì hiện tại hoàn thành gồm 'have + finished'.", "MEDIUM"),
      ],
    },
    {
      slug: "object",
      titleVi: "Tân ngữ",
      titleEn: "Object",
      theoryVi: "Tân ngữ nhận tác động của động từ. Tân ngữ trực tiếp trả lời 'cái gì?', tân ngữ gián tiếp trả lời 'cho ai?' (give him a book).",
      theoryEn: "The object receives the action. A direct object answers 'what?', an indirect object answers 'to/for whom?' (give him a book).",
      formula: "S + V + O(gián tiếp) + O(trực tiếp) | S + V + O + to/for + O",
      examples: [ex("She sent me a letter.", "Cô ấy gửi cho tôi một lá thư.", ["me","a letter"]), ex("I bought flowers for my mother.", "Tôi mua hoa cho mẹ.", ["flowers","for my mother"])],
      tipVi: "Nội động từ (sleep, arrive, die) không có tân ngữ.",
      questions: [
        mc("Find the direct object: 'He told us a funny story.'", ["He", "told", "us", "a funny story"], "a funny story", "'a funny story' trả lời câu hỏi 'kể cái gì?'.", "MEDIUM"),
        fill("She gave the book ___ her friend.", "to", "Cấu trúc give + O(vật) + to + O(người)."),
      ],
    },
    {
      slug: "complement",
      titleVi: "Bổ ngữ",
      titleEn: "Complement",
      theoryVi: "Bổ ngữ bổ sung nghĩa cho chủ ngữ (sau be, become, seem…) hoặc cho tân ngữ (make him angry, call her Anna).",
      theoryEn: "A complement completes the meaning of the subject (after be, become, seem…) or of the object (make him angry, call her Anna).",
      formula: "S + linking V + C | S + V + O + C",
      examples: [ex("She became a doctor.", "Cô ấy trở thành bác sĩ.", ["a doctor"]), ex("The news made everyone sad.", "Tin đó làm mọi người buồn.", ["sad"])],
      tipVi: "Bổ ngữ chủ ngữ và chủ ngữ chỉ cùng một đối tượng: She = a doctor.",
      questions: [
        mc("Find the complement: 'The soup tastes salty.'", ["The soup", "tastes", "salty", "tastes salty"], "salty", "'salty' mô tả chủ ngữ 'the soup' sau động từ nối 'tastes'."),
        mc("They elected him ___.", ["captain", "captainly", "to captain", "captaining"], "captain", "Bổ ngữ tân ngữ: elect + O + N."),
      ],
    },
    {
      slug: "adverbial",
      titleVi: "Trạng ngữ",
      titleEn: "Adverbial",
      theoryVi: "Trạng ngữ cung cấp thông tin về thời gian, nơi chốn, cách thức, lý do… Có thể là trạng từ, cụm giới từ hoặc mệnh đề, vị trí linh hoạt.",
      theoryEn: "Adverbials give information about time, place, manner, reason… They can be adverbs, prepositional phrases or clauses and move freely.",
      formula: "Thứ tự thường gặp: Cách thức → Nơi chốn → Thời gian",
      examples: [ex("She studied quietly in the library yesterday.", "Hôm qua cô ấy học lặng lẽ trong thư viện.", ["quietly","in the library","yesterday"]), ex("Because of the rain, the match was cancelled.", "Vì mưa, trận đấu bị hủy.", ["Because of the rain"])],
      tipVi: "Nhớ MPT: Manner – Place – Time.",
      questions: [
        mc("Choose the correct order:", ["He worked hard in the office yesterday.", "He worked yesterday hard in the office.", "He worked in the office yesterday hard.", "He yesterday worked hard in the office."], "He worked hard in the office yesterday.", "Thứ tự trạng ngữ: cách thức (hard) → nơi chốn → thời gian.", "MEDIUM"),
        mc("Find the adverbial of time: 'We will meet after lunch.'", ["We", "will meet", "after lunch", "meet"], "after lunch", "'after lunch' trả lời câu hỏi 'khi nào?'."),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 3. VERB FORMS
  // ────────────────────────────────────────────────────────────
  "verb-forms": [
    {
      slug: "bare-infinitive",
      titleVi: "Động từ nguyên mẫu không 'to'",
      titleEn: "Bare Infinitive",
      theoryVi: "Dùng sau động từ khuyết thiếu (can, must, should), sau make/let/have + O, và sau had better, would rather.",
      theoryEn: "Used after modal verbs (can, must, should), after make/let/have + object, and after had better, would rather.",
      formula: "modal + V | make/let + O + V",
      examples: [ex("My mom let me go to the party.", "Mẹ cho tôi đi dự tiệc.", ["let me go"]), ex("You had better hurry.", "Bạn nên nhanh lên.", ["had better hurry"])],
      tipVi: "Bị động của make thì lại có 'to': He was made to wait.",
      questions: [
        mc("The teacher made us ___ the essay again.", ["write", "to write", "writing", "written"], "write", "make + O + V nguyên mẫu không 'to'."),
        fix("You should to see a doctor.", "You should see a doctor.", "Sau 'should' không dùng 'to'."),
      ],
    },
    {
      slug: "to-infinitive",
      titleVi: "Động từ nguyên mẫu có 'to'",
      titleEn: "To-infinitive",
      theoryVi: "Dùng sau các động từ như want, decide, hope, plan, agree, refuse; sau tính từ (happy to help) và để chỉ mục đích (I came to see you).",
      theoryEn: "Used after verbs like want, decide, hope, plan, agree, refuse; after adjectives (happy to help) and to show purpose (I came to see you).",
      formula: "V + to V | Adj + to V | … + to V (mục đích)",
      examples: [ex("She decided to study abroad.", "Cô ấy quyết định đi du học.", ["to study"]), ex("I went out to buy some milk.", "Tôi ra ngoài để mua sữa.", ["to buy"])],
      tipVi: "Các động từ hướng tới tương lai (want, hope, plan) thường đi với to V.",
      questions: [
        mc("They agreed ___ the contract.", ["sign", "to sign", "signing", "signed"], "to sign", "'agree' + to V."),
        fill("I'm saving money ___ buy a laptop.", "to", "To V chỉ mục đích.", ["in order to", "so as to"]),
      ],
    },
    {
      slug: "gerund",
      titleVi: "Danh động từ (V-ing)",
      titleEn: "Gerund (V-ing)",
      theoryVi: "V-ing đóng vai trò như danh từ: làm chủ ngữ, đứng sau giới từ và sau các động từ như enjoy, avoid, finish, mind, suggest, keep.",
      theoryEn: "A gerund works like a noun: as a subject, after prepositions, and after verbs like enjoy, avoid, finish, mind, suggest, keep.",
      formula: "V + V-ing | prep + V-ing",
      examples: [ex("I enjoy reading novels.", "Tôi thích đọc tiểu thuyết.", ["reading"]), ex("She is good at drawing.", "Cô ấy giỏi vẽ.", ["at drawing"])],
      tipVi: "Sau giới từ LUÔN là V-ing: look forward to meeting you.",
      questions: [
        mc("Would you mind ___ the window?", ["open", "to open", "opening", "opened"], "opening", "'mind' + V-ing."),
        fix("I'm looking forward to see you.", "I'm looking forward to seeing you.", "'to' trong 'look forward to' là giới từ nên theo sau là V-ing.", "HARD"),
      ],
    },
    {
      slug: "present-participle",
      titleVi: "Hiện tại phân từ",
      titleEn: "Present Participle",
      theoryVi: "Hiện tại phân từ (V-ing) dùng trong các thì tiếp diễn, làm tính từ mang nghĩa chủ động/gây ra cảm xúc (boring, exciting) và rút gọn mệnh đề chủ động.",
      theoryEn: "The present participle (V-ing) forms continuous tenses, acts as an active adjective that causes a feeling (boring, exciting) and shortens active clauses.",
      formula: "be + V-ing | V-ing + N (nghĩa chủ động)",
      examples: [ex("The film was really boring.", "Bộ phim thật nhàm chán.", ["boring"]), ex("The man sitting there is my uncle.", "Người đàn ông đang ngồi kia là chú tôi.", ["sitting"])],
      tipVi: "-ing = vật/người GÂY RA cảm xúc; -ed = người CẢM THẤY.",
      questions: [
        mc("The trip was very ___.", ["tired", "tiring", "tire", "tiredly"], "tiring", "Chuyến đi gây ra sự mệt mỏi → tiring."),
        mc("Look at the ___ baby!", ["sleeping", "slept", "sleep", "to sleep"], "sleeping", "Em bé đang ngủ (chủ động) → sleeping."),
      ],
    },
    {
      slug: "past-participle",
      titleVi: "Quá khứ phân từ",
      titleEn: "Past Participle",
      theoryVi: "Quá khứ phân từ (V3/V-ed) dùng trong các thì hoàn thành, câu bị động, và làm tính từ mang nghĩa bị động/cảm thấy (bored, broken window).",
      theoryEn: "The past participle (V3/V-ed) forms perfect tenses and the passive, and acts as a passive or feeling adjective (bored, a broken window).",
      formula: "have + V3 | be + V3 | V3 + N (nghĩa bị động)",
      examples: [ex("I have lost my keys.", "Tôi đã làm mất chìa khóa.", ["lost"]), ex("She felt bored in class.", "Cô ấy cảm thấy chán trong lớp.", ["bored"])],
      tipVi: "Học thuộc bảng động từ bất quy tắc: go – went – gone, write – wrote – written.",
      questions: [
        mc("I'm ___ in learning Korean.", ["interesting", "interested", "interest", "interestingly"], "interested", "Người cảm thấy hứng thú → interested."),
        fill("The letter was ___ (write) by hand.", "written", "Bị động: be + V3; write → wrote → written."),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 4. TENSES (12 thì)
  // ────────────────────────────────────────────────────────────
  tenses: [
    {
      slug: "present-simple",
      titleVi: "Hiện tại đơn",
      titleEn: "Present Simple",
      theoryVi: "Diễn tả thói quen, sự thật hiển nhiên, lịch trình cố định. Ngôi thứ ba số ít thêm -s/-es.",
      theoryEn: "Used for habits, general truths and fixed schedules. Add -s/-es for he/she/it.",
      formula: "S + V(s/es) | S + do/does + not + V | Do/Does + S + V?",
      examples: [ex("Water boils at 100°C.", "Nước sôi ở 100°C.", ["boils"]), ex("She goes to the gym every Monday.", "Cô ấy đi tập gym mỗi thứ Hai.", ["goes","every Monday"])],
      tipVi: "Dấu hiệu: always, usually, often, every day, sometimes, never.",
      questions: [
        mc("He ___ coffee every morning.", ["drink", "drinks", "is drinking", "drank"], "drinks", "Thói quen + chủ ngữ 'He' → drinks."),
        fix("She don't like spicy food.", "She doesn't like spicy food.", "Ngôi thứ ba số ít dùng 'doesn't'."),
      ],
    },
    {
      slug: "present-continuous",
      titleVi: "Hiện tại tiếp diễn",
      titleEn: "Present Continuous",
      theoryVi: "Diễn tả hành động đang xảy ra lúc nói, sự việc tạm thời hoặc kế hoạch đã sắp xếp trong tương lai gần.",
      theoryEn: "Used for actions happening now, temporary situations and arranged future plans.",
      formula: "S + am/is/are + V-ing",
      examples: [ex("Listen! The baby is crying.", "Nghe kìa! Em bé đang khóc.", ["is crying"]), ex("I'm meeting Lan tomorrow.", "Ngày mai tôi gặp Lan.", ["'m meeting"])],
      tipVi: "Động từ trạng thái (know, like, want, believe) thường không chia tiếp diễn.",
      questions: [
        mc("Look! It ___.", ["rains", "is raining", "rained", "has rained"], "is raining", "'Look!' báo hiệu hành động đang xảy ra."),
        fix("I am knowing the answer.", "I know the answer.", "'know' là động từ trạng thái, không dùng thì tiếp diễn.", "MEDIUM"),
      ],
    },
    {
      slug: "present-perfect",
      titleVi: "Hiện tại hoàn thành",
      titleEn: "Present Perfect",
      theoryVi: "Diễn tả hành động đã xảy ra nhưng không rõ thời gian, kinh nghiệm, hoặc hành động bắt đầu trong quá khứ kéo dài đến hiện tại.",
      theoryEn: "Used for past actions with no specific time, experiences, or actions that started in the past and continue now.",
      formula: "S + have/has + V3",
      examples: [ex("I have visited Japan twice.", "Tôi đã đến Nhật hai lần.", ["have visited"]), ex("She has lived here since 2020.", "Cô ấy sống ở đây từ năm 2020.", ["has lived","since 2020"])],
      tipVi: "Dấu hiệu: already, yet, just, ever, never, since, for, so far.",
      questions: [
        mc("We ___ each other for ten years.", ["know", "knew", "have known", "are knowing"], "have known", "'for ten years' + kéo dài đến nay → hiện tại hoàn thành."),
        fix("I have seen him yesterday.", "I saw him yesterday.", "Có mốc thời gian cụ thể trong quá khứ (yesterday) → dùng quá khứ đơn.", "MEDIUM"),
      ],
    },
    {
      slug: "present-perfect-continuous",
      titleVi: "Hiện tại hoàn thành tiếp diễn",
      titleEn: "Present Perfect Continuous",
      theoryVi: "Nhấn mạnh tính liên tục của hành động bắt đầu trong quá khứ, kéo dài đến hiện tại và có thể còn tiếp tục.",
      theoryEn: "Emphasises the duration of an action that began in the past and is still continuing or just stopped.",
      formula: "S + have/has + been + V-ing",
      examples: [ex("I have been waiting for an hour.", "Tôi đã chờ suốt một tiếng rồi.", ["have been waiting","for an hour"]), ex("She's tired because she has been running.", "Cô ấy mệt vì vừa chạy bộ.", ["has been running"])],
      tipVi: "Hỏi 'How long…?' thường dùng thì này để nhấn mạnh quá trình.",
      questions: [
        mc("How long ___ English?", ["do you learn", "have you been learning", "are you learning", "did you learn"], "have you been learning", "'How long' + hành động còn tiếp diễn → HTHT tiếp diễn.", "MEDIUM"),
        fill("It ___ (rain) since this morning.", "has been raining", "Hành động kéo dài từ sáng đến giờ.", ["has rained"], "MEDIUM"),
      ],
    },
    {
      slug: "past-simple",
      titleVi: "Quá khứ đơn",
      titleEn: "Past Simple",
      theoryVi: "Diễn tả hành động đã xảy ra và kết thúc tại thời điểm xác định trong quá khứ.",
      theoryEn: "Used for actions that started and finished at a specific time in the past.",
      formula: "S + V2/V-ed | S + did not + V | Did + S + V?",
      examples: [ex("I watched a movie last night.", "Tối qua tôi xem một bộ phim.", ["watched","last night"]), ex("They went to Da Lat in 2023.", "Họ đã đến Đà Lạt năm 2023.", ["went","in 2023"])],
      tipVi: "Dấu hiệu: yesterday, last…, … ago, in + năm quá khứ.",
      questions: [
        mc("She ___ to London two years ago.", ["moves", "moved", "has moved", "is moving"], "moved", "'two years ago' → quá khứ đơn."),
        fix("Did you went to school yesterday?", "Did you go to school yesterday?", "Sau 'did' dùng động từ nguyên mẫu."),
      ],
    },
    {
      slug: "past-continuous",
      titleVi: "Quá khứ tiếp diễn",
      titleEn: "Past Continuous",
      theoryVi: "Diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ, hoặc đang xảy ra thì có hành động khác xen vào.",
      theoryEn: "Used for actions in progress at a past moment, or interrupted by another action.",
      formula: "S + was/were + V-ing",
      examples: [ex("At 8 p.m. yesterday, I was studying.", "Lúc 8 giờ tối qua, tôi đang học.", ["was studying"]), ex("I was cooking when the phone rang.", "Tôi đang nấu ăn thì điện thoại reo.", ["was cooking","rang"])],
      tipVi: "Hành động dài → QKTD; hành động ngắn xen vào → QKĐ (when).",
      questions: [
        mc("While I ___ TV, the lights went out.", ["watched", "was watching", "am watching", "watch"], "was watching", "'While' + hành động đang diễn ra → QKTD."),
        fill("They ___ (play) football at 5 p.m. yesterday.", "were playing", "Hành động đang diễn ra tại thời điểm xác định trong quá khứ."),
      ],
    },
    {
      slug: "past-perfect",
      titleVi: "Quá khứ hoàn thành",
      titleEn: "Past Perfect",
      theoryVi: "Diễn tả hành động xảy ra và hoàn tất trước một hành động hoặc thời điểm khác trong quá khứ.",
      theoryEn: "Used for an action completed before another past action or time.",
      formula: "S + had + V3",
      examples: [ex("When I arrived, the train had left.", "Khi tôi đến, tàu đã rời đi.", ["had left"]), ex("She had finished dinner before 7.", "Cô ấy đã ăn tối xong trước 7 giờ.", ["had finished"])],
      tipVi: "Hành động xảy ra TRƯỚC → had V3; hành động SAU → V2.",
      questions: [
        mc("By the time we got there, the film ___.", ["started", "has started", "had started", "starts"], "had started", "Phim bắt đầu trước khi chúng tôi đến → QKHT.", "MEDIUM"),
        fix("After he had ate, he went out.", "After he had eaten, he went out.", "QKHT: had + V3; eat → ate → eaten."),
      ],
    },
    {
      slug: "past-perfect-continuous",
      titleVi: "Quá khứ hoàn thành tiếp diễn",
      titleEn: "Past Perfect Continuous",
      theoryVi: "Nhấn mạnh quá trình kéo dài của một hành động cho đến trước một thời điểm/hành động khác trong quá khứ.",
      theoryEn: "Emphasises how long an action had been going on before another past moment.",
      formula: "S + had + been + V-ing",
      examples: [ex("He had been working for 3 hours when I called.", "Anh ấy đã làm việc 3 tiếng khi tôi gọi.", ["had been working","for 3 hours"]), ex("Her eyes were red; she had been crying.", "Mắt cô ấy đỏ; cô ấy đã khóc.", ["had been crying"])],
      tipVi: "Thường đi với 'for + khoảng thời gian' và mốc 'when/before' trong quá khứ.",
      questions: [
        mc("They ___ for two hours before the bus came.", ["waited", "have been waiting", "had been waiting", "were waited"], "had been waiting", "Quá trình kéo dài trước một hành động quá khứ.", "HARD"),
        fill("She was exhausted because she ___ (study) all night.", "had been studying", "Nguyên nhân kéo dài dẫn tới trạng thái trong quá khứ.", null, "HARD"),
      ],
    },
    {
      slug: "future-simple",
      titleVi: "Tương lai đơn",
      titleEn: "Future Simple",
      theoryVi: "Diễn tả quyết định tức thời, lời hứa, dự đoán không có căn cứ rõ ràng.",
      theoryEn: "Used for instant decisions, promises and predictions without clear evidence.",
      formula: "S + will + V | S + won't + V",
      examples: [ex("I'll help you with your bags.", "Tôi sẽ giúp bạn xách túi.", ["'ll help"]), ex("I think it will rain tomorrow.", "Tôi nghĩ mai trời sẽ mưa.", ["will rain"])],
      tipVi: "Có kế hoạch từ trước hoặc dấu hiệu rõ ràng → dùng 'be going to'.",
      questions: [
        mc("The phone is ringing. – OK, I ___ it.", ["answer", "will answer", "am going to answer", "answered"], "will answer", "Quyết định ngay lúc nói → will."),
        mc("Look at those clouds! It ___.", ["will rain", "is going to rain", "rains", "rained"], "is going to rain", "Có dấu hiệu rõ ràng (mây đen) → be going to.", "MEDIUM"),
      ],
    },
    {
      slug: "future-continuous",
      titleVi: "Tương lai tiếp diễn",
      titleEn: "Future Continuous",
      theoryVi: "Diễn tả hành động sẽ đang diễn ra tại một thời điểm xác định trong tương lai.",
      theoryEn: "Used for an action that will be in progress at a specific future time.",
      formula: "S + will be + V-ing",
      examples: [ex("This time tomorrow, I will be flying to Paris.", "Giờ này ngày mai, tôi đang bay tới Paris.", ["This time tomorrow","will be flying"]), ex("Don't call at 9; I'll be sleeping.", "Đừng gọi lúc 9 giờ; lúc đó tôi đang ngủ.", ["'ll be sleeping"])],
      tipVi: "Dấu hiệu: this time tomorrow, at + giờ + tương lai.",
      questions: [
        mc("At 10 a.m. tomorrow, we ___ an exam.", ["take", "will be taking", "took", "have taken"], "will be taking", "Hành động đang diễn ra tại thời điểm xác định trong tương lai."),
        fill("This time next week, I ___ (lie) on the beach.", "will be lying", "Tương lai tiếp diễn: will be + V-ing.", null, "MEDIUM"),
      ],
    },
    {
      slug: "future-perfect",
      titleVi: "Tương lai hoàn thành",
      titleEn: "Future Perfect",
      theoryVi: "Diễn tả hành động sẽ hoàn tất trước một thời điểm trong tương lai.",
      theoryEn: "Used for an action that will be completed before a future time.",
      formula: "S + will have + V3",
      examples: [ex("By 2030, I will have graduated.", "Đến năm 2030, tôi sẽ tốt nghiệp.", ["By 2030","will have graduated"]), ex("She will have finished the report by Friday.", "Cô ấy sẽ hoàn thành báo cáo trước thứ Sáu.", ["will have finished","by Friday"])],
      tipVi: "Dấu hiệu: by + thời điểm tương lai, by the time + hiện tại đơn.",
      questions: [
        mc("By next month, they ___ the bridge.", ["build", "will build", "will have built", "built"], "will have built", "'By next month' → hoàn tất trước thời điểm tương lai.", "MEDIUM"),
        fix("By the time you arrive, I will finish cooking.", "By the time you arrive, I will have finished cooking.", "Hoàn tất trước mốc tương lai → tương lai hoàn thành.", "HARD"),
      ],
    },
    {
      slug: "future-perfect-continuous",
      titleVi: "Tương lai hoàn thành tiếp diễn",
      titleEn: "Future Perfect Continuous",
      theoryVi: "Nhấn mạnh khoảng thời gian một hành động đã diễn ra tính đến một thời điểm trong tương lai.",
      theoryEn: "Emphasises how long an action will have been going on by a future time.",
      formula: "S + will have been + V-ing",
      examples: [ex("By June, I will have been working here for 5 years.", "Đến tháng Sáu, tôi sẽ làm việc ở đây được 5 năm.", ["By June","will have been working","for 5 years"]), ex("By 6 p.m., she will have been driving for 4 hours.", "Đến 6 giờ tối, cô ấy sẽ lái xe được 4 tiếng.", ["By 6 p.m.","will have been driving","for 4 hours"])],
      tipVi: "Công thức đầy đủ: by + mốc tương lai + for + khoảng thời gian.",
      questions: [
        mc("By December, he ___ English for two years.", ["will learn", "will be learning", "will have been learning", "learns"], "will have been learning", "'By December … for two years' → TLHT tiếp diễn.", "HARD"),
        fill("Next year, we ___ (live) here for a decade.", "will have been living", "Nhấn mạnh quá trình kéo dài đến mốc tương lai.", ["will have lived"], "HARD"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 5. AGREEMENT
  // ────────────────────────────────────────────────────────────
  agreement: [
    {
      slug: "subject-verb-basics",
      titleVi: "Hòa hợp chủ ngữ – động từ cơ bản",
      titleEn: "Subject–Verb Agreement Basics",
      theoryVi: "Động từ chia theo chủ ngữ: chủ ngữ số ít → động từ số ít; số nhiều → số nhiều. Cụm giới từ chen giữa không ảnh hưởng.",
      theoryEn: "The verb agrees with its subject: singular subject → singular verb, plural → plural. Phrases in between do not change it.",
      formula: "N(số ít) + V-s | N(số nhiều) + V",
      examples: [ex("The box of apples is heavy.", "Thùng táo thì nặng.", ["The box","is"]), ex("My friends live nearby.", "Bạn bè tôi sống gần đây.", ["friends","live"])],
      tipVi: "Tìm danh từ chính (trước 'of') để chia động từ.",
      questions: [
        mc("The list of names ___ on the desk.", ["is", "are", "be", "were"], "is", "Danh từ chính là 'the list' (số ít)."),
        fix("The students in my class is friendly.", "The students in my class are friendly.", "Chủ ngữ chính 'The students' số nhiều."),
      ],
    },
    {
      slug: "compound-subjects",
      titleVi: "Chủ ngữ ghép",
      titleEn: "Compound Subjects",
      theoryVi: "A and B → động từ số nhiều. Với either…or, neither…nor, not only…but also, động từ chia theo chủ ngữ gần nhất.",
      theoryEn: "A and B → plural verb. With either…or, neither…nor, not only…but also, the verb agrees with the nearer subject.",
      formula: "A and B + V(số nhiều) | Neither A nor B + V(theo B)",
      examples: [ex("Tom and Jerry are friends.", "Tom và Jerry là bạn.", ["Tom and Jerry","are"]), ex("Neither the teacher nor the students were late.", "Cả giáo viên lẫn học sinh đều không đến muộn.", ["Neither the teacher nor the students","were"])],
      tipVi: "A as well as / with / along with B → chia theo A.",
      questions: [
        mc("Either my parents or my sister ___ coming.", ["is", "are", "be", "am"], "is", "Chia theo chủ ngữ gần nhất 'my sister'.", "MEDIUM"),
        mc("The teacher, along with her students, ___ visiting the museum.", ["is", "are", "were", "be"], "is", "'along with' → chia theo chủ ngữ đầu 'The teacher'.", "HARD"),
      ],
    },
    {
      slug: "indefinite-pronouns",
      titleVi: "Đại từ bất định",
      titleEn: "Indefinite Pronouns",
      theoryVi: "Everyone, somebody, nothing, each, every… luôn đi với động từ số ít. Both, few, many, several đi với số nhiều.",
      theoryEn: "Everyone, somebody, nothing, each, every… take singular verbs. Both, few, many, several take plural verbs.",
      formula: "Every-/Some-/Any-/No- + one/body/thing + V-s",
      examples: [ex("Everyone is here.", "Mọi người đều có mặt.", ["Everyone","is"]), ex("Both of them are doctors.", "Cả hai người họ đều là bác sĩ.", ["Both","are"])],
      tipVi: "'Each of + N số nhiều' vẫn chia số ít: Each of the boys has a bike.",
      questions: [
        mc("Everybody ___ the answer.", ["know", "knows", "are knowing", "have known"], "knows", "'Everybody' chia động từ số ít."),
        fix("Each of the players have a uniform.", "Each of the players has a uniform.", "'Each of' + động từ số ít.", "MEDIUM"),
      ],
    },
    {
      slug: "collective-and-special-nouns",
      titleVi: "Danh từ tập hợp & danh từ đặc biệt",
      titleEn: "Collective & Special Nouns",
      theoryVi: "Danh từ tập hợp (team, family) thường chia số ít khi xem như một khối. News, mathematics, physics chia số ít; police, people chia số nhiều.",
      theoryEn: "Collective nouns (team, family) usually take singular verbs as one unit. News, mathematics, physics are singular; police, people are plural.",
      formula: "The news/Mathematics + V-s | The police/People + V",
      examples: [ex("The news is surprising.", "Tin tức thật bất ngờ.", ["The news","is"]), ex("The police are investigating.", "Cảnh sát đang điều tra.", ["The police","are"])],
      tipVi: "Khoảng thời gian, tiền, khoảng cách xem như một khối → số ít: Ten dollars is enough.",
      questions: [
        mc("Mathematics ___ my favourite subject.", ["is", "are", "were", "be"], "is", "'Mathematics' là danh từ số ít dù có đuôi -s."),
        mc("Five kilometres ___ a long way to walk.", ["is", "are", "were", "have"], "is", "Khoảng cách xem như một khối → số ít.", "MEDIUM"),
      ],
    },
    {
      slug: "pronoun-antecedent",
      titleVi: "Hòa hợp đại từ – danh từ",
      titleEn: "Pronoun–Antecedent Agreement",
      theoryVi: "Đại từ phải phù hợp về số và giới tính với danh từ mà nó thay thế. Có thể dùng 'they' số ít khi không rõ giới tính.",
      theoryEn: "A pronoun must match the noun it refers to in number and gender. Singular 'they' is used when gender is unknown.",
      formula: "N(số ít) … he/she/it/they | N(số nhiều) … they",
      examples: [ex("The company changed its logo.", "Công ty đã đổi logo của mình.", ["its"]), ex("If a student is late, they must sign in.", "Nếu học sinh đến muộn, họ phải ký tên.", ["they"])],
      tipVi: "Tổ chức (company, government) xem như 'it'.",
      questions: [
        mc("The dog wagged ___ tail.", ["its", "it's", "their", "his"], "its", "'its' là tính từ sở hữu của 'it'; 'it's' = it is."),
        fix("My parents sold his old car.", "My parents sold their old car.", "'My parents' số nhiều → 'their'."),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 6. IMPORTANT CLAUSES
  // ────────────────────────────────────────────────────────────
  "important-clauses": [
    {
      slug: "conditional-type-0",
      titleVi: "Câu điều kiện loại 0",
      titleEn: "Zero Conditional",
      theoryVi: "Diễn tả sự thật hiển nhiên, quy luật tự nhiên: điều kiện xảy ra thì kết quả luôn xảy ra.",
      theoryEn: "Used for general truths and natural laws: whenever the condition happens, the result always follows.",
      formula: "If + S + V(hiện tại), S + V(hiện tại)",
      examples: [ex("If you heat ice, it melts.", "Nếu đun nóng đá, nó tan chảy.", ["If you heat","melts"]), ex("If I drink coffee late, I can't sleep.", "Nếu uống cà phê muộn, tôi không ngủ được.", ["If I drink","can't sleep"])],
      tipVi: "Có thể thay 'if' bằng 'when' mà nghĩa không đổi.",
      questions: [
        mc("If you mix red and blue, you ___ purple.", ["get", "will get", "would get", "got"], "get", "Sự thật hiển nhiên → câu điều kiện loại 0."),
        fill("Plants die if they ___ (not get) water.", "don't get", "Loại 0: cả hai vế dùng hiện tại đơn.", ["do not get"]),
      ],
    },
    {
      slug: "conditional-type-1",
      titleVi: "Câu điều kiện loại 1",
      titleEn: "First Conditional",
      theoryVi: "Diễn tả điều kiện có thể xảy ra ở hiện tại hoặc tương lai và kết quả của nó.",
      theoryEn: "Used for real, possible conditions in the present or future and their results.",
      formula: "If + S + V(hiện tại đơn), S + will + V",
      examples: [ex("If it rains, we will stay home.", "Nếu trời mưa, chúng ta sẽ ở nhà.", ["If it rains","will stay"]), ex("Unless you hurry, you'll miss the bus.", "Nếu không nhanh lên, bạn sẽ lỡ xe buýt.", ["Unless you hurry","'ll miss"])],
      tipVi: "Không dùng 'will' trong mệnh đề 'if'. Unless = If … not.",
      questions: [
        mc("If you study hard, you ___ the exam.", ["pass", "will pass", "would pass", "passed"], "will pass", "Loại 1: If + hiện tại đơn, will + V."),
        fix("If it will be sunny, we will go swimming.", "If it is sunny, we will go swimming.", "Mệnh đề 'if' loại 1 dùng hiện tại đơn, không dùng 'will'.", "MEDIUM"),
      ],
    },
    {
      slug: "conditional-type-2",
      titleVi: "Câu điều kiện loại 2",
      titleEn: "Second Conditional",
      theoryVi: "Diễn tả điều kiện không có thật hoặc khó xảy ra ở hiện tại. Với 'be' dùng 'were' cho mọi ngôi.",
      theoryEn: "Used for unreal or unlikely present conditions. Use 'were' for all persons with 'be'.",
      formula: "If + S + V2/were, S + would/could + V",
      examples: [ex("If I were you, I would accept the offer.", "Nếu tôi là bạn, tôi sẽ nhận lời.", ["If I were","would accept"]), ex("If I had more time, I would learn the piano.", "Nếu có thêm thời gian, tôi sẽ học đàn.", ["If I had","would learn"])],
      tipVi: "'If I were you' là mẫu câu khuyên bảo cực kỳ phổ biến.",
      questions: [
        mc("If I ___ rich, I would travel the world.", ["am", "was being", "were", "will be"], "were", "Loại 2 với 'be' dùng 'were'."),
        fill("If she knew his number, she ___ (call) him.", "would call", "Loại 2: If + V2, would + V.", ["could call"], "MEDIUM"),
      ],
    },
    {
      slug: "conditional-type-3",
      titleVi: "Câu điều kiện loại 3",
      titleEn: "Third Conditional",
      theoryVi: "Diễn tả điều kiện không có thật trong quá khứ, thường thể hiện sự tiếc nuối.",
      theoryEn: "Used for unreal past conditions, often expressing regret.",
      formula: "If + S + had + V3, S + would have + V3",
      examples: [ex("If I had studied, I would have passed.", "Nếu tôi đã học, tôi đã đỗ rồi.", ["If I had studied","would have passed"]), ex("If we had left earlier, we wouldn't have missed the train.", "Nếu đi sớm hơn, chúng tôi đã không lỡ tàu.", ["If we had left","wouldn't have missed"])],
      tipVi: "Đảo ngữ: Had I known… = If I had known…",
      questions: [
        mc("If she ___ the alarm, she wouldn't have been late.", ["heard", "had heard", "has heard", "would hear"], "had heard", "Loại 3: If + had + V3.", "MEDIUM"),
        fill("If you had told me, I ___ (help) you.", "would have helped", "Loại 3: would have + V3.", ["could have helped"], "MEDIUM"),
      ],
    },
    {
      slug: "mixed-conditionals",
      titleVi: "Câu điều kiện hỗn hợp",
      titleEn: "Mixed Conditionals",
      theoryVi: "Kết hợp loại 3 và loại 2: điều kiện trong quá khứ dẫn đến kết quả ở hiện tại (hoặc ngược lại).",
      theoryEn: "Mixes types 2 and 3: a past condition with a present result (or vice versa).",
      formula: "If + S + had + V3, S + would + V (bây giờ)",
      examples: [ex("If I had taken the job, I would be rich now.", "Nếu tôi đã nhận việc đó, giờ tôi đã giàu.", ["If I had taken","would be","now"]), ex("If I were taller, I would have joined the team.", "Nếu tôi cao hơn, tôi đã được vào đội.", ["If I were","would have joined"])],
      tipVi: "Chú ý trạng từ 'now' ở vế kết quả → would + V.",
      questions: [
        mc("If he had saved money, he ___ a car now.", ["would have", "would have had", "has", "will have"], "would have", "Điều kiện quá khứ, kết quả hiện tại (now).", "HARD"),
        mc("If I ___ breakfast, I wouldn't be hungry now.", ["ate", "had eaten", "eat", "would eat"], "had eaten", "Vế 'if' nói về quá khứ → had + V3.", "HARD"),
      ],
    },
    {
      slug: "wish-clauses",
      titleVi: "Câu ước (Wish / If only)",
      titleEn: "Wish Clauses",
      theoryVi: "Ước cho hiện tại: wish + V2/were. Ước cho quá khứ: wish + had V3. Ước cho tương lai/phàn nàn: wish + would + V.",
      theoryEn: "Present wish: wish + V2/were. Past wish: wish + had V3. Future/complaint: wish + would + V.",
      formula: "S + wish + S + V2 | had V3 | would V",
      examples: [ex("I wish I were taller.", "Ước gì tôi cao hơn.", ["wish I were"]), ex("She wishes she hadn't said that.", "Cô ấy ước đã không nói điều đó.", ["wishes she hadn't said"])],
      tipVi: "Câu ước luôn 'lùi một thì' so với thực tế.",
      questions: [
        mc("I wish I ___ how to swim.", ["know", "knew", "had known", "will know"], "knew", "Ước cho hiện tại → V2."),
        mc("He wishes he ___ harder last year.", ["studied", "had studied", "would study", "studies"], "had studied", "Ước cho quá khứ (last year) → had V3.", "MEDIUM"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 7. SENTENCE STRUCTURES
  // ────────────────────────────────────────────────────────────
  "sentence-structures": [
    {
      slug: "sv",
      titleVi: "Mẫu câu S + V",
      titleEn: "Pattern S + V",
      theoryVi: "Mẫu câu đơn giản nhất, dùng với nội động từ – không cần tân ngữ để hoàn chỉnh nghĩa.",
      theoryEn: "The simplest pattern, used with intransitive verbs that need no object.",
      formula: "S + V(nội động từ) (+ trạng ngữ)",
      examples: [ex("The baby is sleeping.", "Em bé đang ngủ.", ["The baby","is sleeping"]), ex("Prices rose sharply.", "Giá cả tăng mạnh.", ["Prices","rose"])],
      tipVi: "Nội động từ thường gặp: sleep, arrive, happen, rise, fall, laugh.",
      questions: [
        mc("Which sentence is S + V?", ["The sun rises.", "She loves music.", "He is a teacher.", "They gave me a gift."], "The sun rises.", "'rise' là nội động từ, không cần tân ngữ."),
        fix("The accident was happened last night.", "The accident happened last night.", "'happen' là nội động từ nên không dùng bị động.", "MEDIUM"),
      ],
    },
    {
      slug: "svo",
      titleVi: "Mẫu câu S + V + O",
      titleEn: "Pattern S + V + O",
      theoryVi: "Dùng với ngoại động từ – động từ cần một tân ngữ để hoàn chỉnh nghĩa.",
      theoryEn: "Used with transitive verbs that need an object.",
      formula: "S + V(ngoại động từ) + O",
      examples: [ex("She plays the guitar.", "Cô ấy chơi đàn guitar.", ["She","plays","the guitar"]), ex("We discussed the plan.", "Chúng tôi thảo luận kế hoạch.", ["We","discussed","the plan"])],
      tipVi: "'discuss', 'enter', 'marry' là ngoại động từ – không thêm giới từ.",
      questions: [
        fix("We discussed about the problem.", "We discussed the problem.", "'discuss' là ngoại động từ, không đi với 'about'.", "MEDIUM"),
        mc("Which sentence is S + V + O?", ["I read the newspaper.", "He seems tired.", "Birds sing.", "She made me happy."], "I read the newspaper.", "'the newspaper' là tân ngữ của 'read'."),
      ],
    },
    {
      slug: "svc",
      titleVi: "Mẫu câu S + V + C",
      titleEn: "Pattern S + V + C",
      theoryVi: "Dùng với động từ nối (be, become, seem, look, feel, get…) theo sau là bổ ngữ là tính từ hoặc danh từ.",
      theoryEn: "Used with linking verbs (be, become, seem, look, feel, get…) followed by an adjective or noun complement.",
      formula: "S + linking V + Adj/N",
      examples: [ex("He became a famous singer.", "Anh ấy trở thành ca sĩ nổi tiếng.", ["became","a famous singer"]), ex("The weather is getting colder.", "Thời tiết đang trở lạnh hơn.", ["is getting","colder"])],
      tipVi: "Sau động từ nối dùng tính từ, không dùng trạng từ: look good ✓, look well (khỏe mạnh).",
      questions: [
        mc("The flowers smell ___.", ["sweet", "sweetly", "sweetness", "sweeten"], "sweet", "'smell' là động từ nối → tính từ."),
        mc("Which sentence is S + V + C?", ["She looks beautiful.", "She looked at me.", "She sent a card.", "She arrived."], "She looks beautiful.", "'beautiful' bổ nghĩa cho chủ ngữ sau động từ nối."),
      ],
    },
    {
      slug: "svoo",
      titleVi: "Mẫu câu S + V + O + O",
      titleEn: "Pattern S + V + O + O",
      theoryVi: "Dùng với động từ có hai tân ngữ (give, send, show, buy, tell…): tân ngữ gián tiếp (người) đứng trước tân ngữ trực tiếp (vật).",
      theoryEn: "Used with verbs taking two objects (give, send, show, buy, tell…): indirect object (person) before direct object (thing).",
      formula: "S + V + O(người) + O(vật) = S + V + O(vật) + to/for + O(người)",
      examples: [ex("He showed me his photos.", "Anh ấy cho tôi xem ảnh.", ["showed","me","his photos"]), ex("I'll buy you a coffee.", "Tôi sẽ mời bạn một ly cà phê.", ["buy","you","a coffee"])],
      tipVi: "give/send/show → to; buy/make/cook → for.",
      questions: [
        fill("She cooked dinner ___ her family.", "for", "cook + O(vật) + for + O(người)."),
        mc("Choose the correct sentence:", ["He told me the truth.", "He told the truth me.", "He told to me the truth.", "He told me to the truth."], "He told me the truth.", "S + V + O(người) + O(vật).", "MEDIUM"),
      ],
    },
    {
      slug: "svoc",
      titleVi: "Mẫu câu S + V + O + C",
      titleEn: "Pattern S + V + O + C",
      theoryVi: "Bổ ngữ tân ngữ mô tả hoặc đặt tên cho tân ngữ. Thường gặp với make, keep, find, call, name, elect, consider.",
      theoryEn: "An object complement describes or names the object. Common with make, keep, find, call, name, elect, consider.",
      formula: "S + V + O + Adj/N",
      examples: [ex("Music keeps me calm.", "Âm nhạc giúp tôi bình tĩnh.", ["keeps","me","calm"]), ex("They named their son Minh.", "Họ đặt tên con trai là Minh.", ["named","their son","Minh"])],
      tipVi: "Khác SVOO: ở SVOC, tân ngữ = bổ ngữ (me = calm).",
      questions: [
        mc("I found the book very ___.", ["useful", "usefully", "use", "usefulness"], "useful", "find + O + Adj."),
        mc("Which sentence is S + V + O + C?", ["They painted the wall white.", "They gave us a call.", "They are students.", "They left early."], "They painted the wall white.", "'white' mô tả tân ngữ 'the wall'.", "MEDIUM"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 8. PHRASES
  // ────────────────────────────────────────────────────────────
  phrases: [
    {
      slug: "noun-phrases",
      titleVi: "Cụm danh từ",
      titleEn: "Noun Phrases",
      theoryVi: "Cụm danh từ gồm danh từ chính cùng các từ bổ nghĩa: từ hạn định, tính từ đứng trước và cụm giới từ/mệnh đề đứng sau.",
      theoryEn: "A noun phrase is a head noun with its modifiers: determiners and adjectives before, prepositional phrases or clauses after.",
      formula: "Det + (Adj) + N + (bổ ngữ sau)",
      examples: [ex("the tall girl in the red dress", "cô gái cao mặc váy đỏ", ["girl"]), ex("a beautiful old wooden house", "một ngôi nhà gỗ cũ đẹp", ["house"])],
      tipVi: "Trật tự tính từ OSASCOMP: Opinion – Size – Age – Shape – Colour – Origin – Material – Purpose.",
      questions: [
        mc("Choose the correct order:", ["a lovely small black cat", "a black small lovely cat", "a small lovely black cat", "a lovely black small cat"], "a lovely small black cat", "Opinion (lovely) → Size (small) → Colour (black).", "MEDIUM"),
        mc("Find the head noun: 'the old books on the shelf'", ["old", "books", "shelf", "the"], "books", "Danh từ chính là 'books'; còn lại là bổ nghĩa."),
      ],
    },
    {
      slug: "verb-phrases",
      titleVi: "Cụm động từ",
      titleEn: "Verb Phrases",
      theoryVi: "Cụm động từ gồm động từ chính và các trợ động từ đi kèm. Ngoài ra còn có phrasal verb: động từ + tiểu từ mang nghĩa mới (give up, look after).",
      theoryEn: "A verb phrase is the main verb with its auxiliaries. Phrasal verbs combine a verb + particle with a new meaning (give up, look after).",
      formula: "(aux) + (aux) + V | V + particle",
      examples: [ex("She has been working all day.", "Cô ấy làm việc cả ngày.", ["has been working"]), ex("Don't give up!", "Đừng bỏ cuộc!", ["give up"])],
      tipVi: "Với phrasal verb tách được, đại từ phải đứng giữa: turn it off ✓, turn off it ✗.",
      questions: [
        fix("The music is too loud. Please turn down it.", "The music is too loud. Please turn it down.", "Đại từ đứng giữa động từ và tiểu từ.", "MEDIUM"),
        mc("'look after' means:", ["take care of", "search for", "admire", "visit"], "take care of", "'look after' = chăm sóc."),
      ],
    },
    {
      slug: "adjective-phrases",
      titleVi: "Cụm tính từ",
      titleEn: "Adjective Phrases",
      theoryVi: "Cụm tính từ có tính từ chính cùng trạng từ bổ nghĩa phía trước và/hoặc cụm giới từ, to-V phía sau.",
      theoryEn: "An adjective phrase has a head adjective with adverbs before it and/or a prepositional phrase or to-infinitive after it.",
      formula: "(Adv) + Adj + (prep + N / to V)",
      examples: [ex("She is extremely good at maths.", "Cô ấy cực kỳ giỏi toán.", ["extremely good at maths"]), ex("I'm happy to help you.", "Tôi rất vui được giúp bạn.", ["happy to help"])],
      tipVi: "Học tính từ cùng giới từ: afraid of, interested in, good at, responsible for.",
      questions: [
        fill("He is interested ___ photography.", "in", "'interested in' là cụm cố định."),
        mc("She is afraid ___ spiders.", ["of", "with", "at", "about"], "of", "'afraid of' = sợ."),
      ],
    },
    {
      slug: "adverb-phrases",
      titleVi: "Cụm trạng từ",
      titleEn: "Adverb Phrases",
      theoryVi: "Cụm trạng từ gồm trạng từ chính với trạng từ bổ nghĩa khác (very quickly, quite often) hoặc cụm chỉ thời gian/nơi chốn đóng vai trò trạng từ.",
      theoryEn: "An adverb phrase is a head adverb with modifiers (very quickly, quite often) or a group of words acting as an adverb.",
      formula: "(Adv bổ nghĩa) + Adv",
      examples: [ex("He speaks English very fluently.", "Anh ấy nói tiếng Anh rất trôi chảy.", ["very fluently"]), ex("We meet once a week.", "Chúng tôi gặp nhau mỗi tuần một lần.", ["once a week"])],
      tipVi: "'enough' đứng sau trạng từ/tính từ: fast enough, old enough.",
      questions: [
        fix("She didn't run enough fast.", "She didn't run fast enough.", "'enough' đứng sau trạng từ.", "MEDIUM"),
        mc("Find the adverb phrase: 'He finished the task surprisingly quickly.'", ["He finished", "the task", "surprisingly quickly", "finished the task"], "surprisingly quickly", "'surprisingly' bổ nghĩa cho trạng từ 'quickly'."),
      ],
    },
    {
      slug: "prepositional-phrases",
      titleVi: "Cụm giới từ",
      titleEn: "Prepositional Phrases",
      theoryVi: "Cụm giới từ gồm giới từ + danh từ/đại từ/V-ing, có thể làm trạng ngữ hoặc bổ nghĩa cho danh từ.",
      theoryEn: "A prepositional phrase is a preposition + noun/pronoun/gerund, acting as an adverbial or modifying a noun.",
      formula: "Prep + N / Pronoun / V-ing",
      examples: [ex("The keys are under the table.", "Chìa khóa ở dưới bàn.", ["under the table"]), ex("Thanks for helping me.", "Cảm ơn vì đã giúp tôi.", ["for helping me"])],
      tipVi: "Chủ ngữ không nằm trong cụm giới từ: 'One of the students IS…'.",
      questions: [
        mc("She is good ___ playing chess.", ["at", "in", "on", "for"], "at", "'good at + V-ing'."),
        fix("One of my friends live in Canada.", "One of my friends lives in Canada.", "Chủ ngữ là 'One', cụm 'of my friends' không ảnh hưởng.", "MEDIUM"),
      ],
    },
    {
      slug: "participle-phrases",
      titleVi: "Cụm phân từ",
      titleEn: "Participle Phrases",
      theoryVi: "Cụm phân từ bắt đầu bằng V-ing (chủ động) hoặc V3 (bị động), dùng để rút gọn mệnh đề khi hai vế cùng chủ ngữ.",
      theoryEn: "A participle phrase starts with V-ing (active) or V3 (passive) and shortens a clause when both parts share the subject.",
      formula: "V-ing …, S + V | V3 …, S + V | Having V3 …, S + V",
      examples: [ex("Feeling tired, she went to bed.", "Cảm thấy mệt, cô ấy đi ngủ.", ["Feeling tired"]), ex("Built in 1900, the house is very old.", "Được xây năm 1900, ngôi nhà rất cũ.", ["Built in 1900"])],
      tipVi: "Tránh 'dangling participle': chủ ngữ sau dấu phẩy phải là người/vật thực hiện hành động của phân từ.",
      questions: [
        mc("___ by the noise, the baby started crying.", ["Waking", "Woken", "Wake", "To wake"], "Woken", "Em bé bị đánh thức → nghĩa bị động → V3.", "HARD"),
        mc("___ his homework, he went out to play.", ["Having finished", "Finished", "Being finished", "To finish"], "Having finished", "Hành động hoàn tất trước → Having + V3.", "HARD"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 9. CLAUSES
  // ────────────────────────────────────────────────────────────
  clauses: [
    {
      slug: "independent-dependent",
      titleVi: "Mệnh đề độc lập & phụ thuộc",
      titleEn: "Independent & Dependent Clauses",
      theoryVi: "Mệnh đề độc lập đứng một mình thành câu hoàn chỉnh. Mệnh đề phụ thuộc bắt đầu bằng liên từ phụ thuộc/đại từ quan hệ và không thể đứng một mình.",
      theoryEn: "An independent clause can stand alone as a sentence. A dependent clause starts with a subordinator or relative pronoun and cannot stand alone.",
      formula: "Mệnh đề độc lập + (liên từ phụ thuộc + mệnh đề phụ thuộc)",
      examples: [ex("I stayed home because I was sick.", "Tôi ở nhà vì bị ốm.", ["because I was sick"]), ex("When the bell rang, everyone left.", "Khi chuông reo, mọi người rời đi.", ["When the bell rang"])],
      tipVi: "'Because I was sick.' đứng một mình là câu cụt (fragment) ✗.",
      questions: [
        mc("Which is a dependent clause?", ["although she was tired", "she was tired", "she went home", "I agree"], "although she was tired", "Bắt đầu bằng 'although' nên không thể đứng một mình."),
        mc("Which is a complete sentence?", ["She smiled.", "Because she smiled.", "When she smiled.", "If she smiled."], "She smiled.", "Chỉ 'She smiled.' là mệnh đề độc lập."),
      ],
    },
    {
      slug: "noun-clauses",
      titleVi: "Mệnh đề danh từ",
      titleEn: "Noun Clauses",
      theoryVi: "Mệnh đề danh từ đóng vai trò danh từ (chủ ngữ, tân ngữ, bổ ngữ), bắt đầu bằng that, whether/if, hoặc từ để hỏi (what, where, how…).",
      theoryEn: "A noun clause acts as a noun (subject, object, complement), starting with that, whether/if, or a wh-word (what, where, how…).",
      formula: "that/whether/wh- + S + V (trật tự câu khẳng định)",
      examples: [ex("I don't know where she lives.", "Tôi không biết cô ấy sống ở đâu.", ["where she lives"]), ex("What he said surprised me.", "Điều anh ấy nói làm tôi bất ngờ.", ["What he said"])],
      tipVi: "Không đảo ngữ trong mệnh đề danh từ: where she lives ✓, where does she live ✗.",
      questions: [
        fix("Can you tell me where is the station?", "Can you tell me where the station is?", "Trong mệnh đề danh từ dùng trật tự S + V.", "MEDIUM"),
        mc("I wonder ___ he will come.", ["whether", "what", "that", "which"], "whether", "'whether' = liệu có… hay không."),
      ],
    },
    {
      slug: "relative-clauses",
      titleVi: "Mệnh đề quan hệ",
      titleEn: "Relative Clauses",
      theoryVi: "Mệnh đề quan hệ bổ nghĩa cho danh từ đứng trước, bắt đầu bằng who (người), which (vật), that, whose (sở hữu), where, when.",
      theoryEn: "A relative clause describes a preceding noun, starting with who (people), which (things), that, whose (possession), where, when.",
      formula: "N + who/which/that/whose + (S) + V",
      examples: [ex("The woman who lives next door is a nurse.", "Người phụ nữ sống cạnh nhà là y tá.", ["who lives next door"]), ex("This is the town where I grew up.", "Đây là thị trấn nơi tôi lớn lên.", ["where I grew up"])],
      tipVi: "Mệnh đề không xác định (có dấu phẩy) không dùng 'that'.",
      questions: [
        mc("The man ___ car was stolen called the police.", ["who", "which", "whose", "whom"], "whose", "'whose' chỉ sở hữu: xe của người đàn ông.", "MEDIUM"),
        fix("My father, that is a doctor, works hard.", "My father, who is a doctor, works hard.", "Mệnh đề không xác định không dùng 'that'.", "MEDIUM"),
      ],
    },
    {
      slug: "adverbial-clauses",
      titleVi: "Mệnh đề trạng ngữ",
      titleEn: "Adverbial Clauses",
      theoryVi: "Mệnh đề trạng ngữ chỉ thời gian (when, while), lý do (because, since), nhượng bộ (although), mục đích (so that), kết quả (so…that).",
      theoryEn: "Adverbial clauses show time (when, while), reason (because, since), contrast (although), purpose (so that), result (so…that).",
      formula: "Liên từ phụ thuộc + S + V, S + V",
      examples: [ex("She was so tired that she fell asleep.", "Cô ấy mệt đến nỗi ngủ thiếp đi.", ["so tired that"]), ex("I left early so that I could catch the bus.", "Tôi đi sớm để kịp xe buýt.", ["so that I could catch the bus"])],
      tipVi: "Mệnh đề thời gian chỉ tương lai dùng hiện tại đơn: When I arrive, I'll call you.",
      questions: [
        fix("When I will finish, I will call you.", "When I finish, I will call you.", "Mệnh đề thời gian chỉ tương lai dùng hiện tại đơn.", "MEDIUM"),
        mc("___ it was raining, they played outside.", ["Because", "Although", "So that", "Since"], "Although", "Hai vế trái ngược → nhượng bộ 'Although'."),
      ],
    },
    {
      slug: "reduced-relative-clauses",
      titleVi: "Rút gọn mệnh đề quan hệ",
      titleEn: "Reduced Relative Clauses",
      theoryVi: "Rút gọn bằng V-ing (chủ động), V3 (bị động) hoặc to V (sau the first, the only, the last…).",
      theoryEn: "Reduce with V-ing (active), V3 (passive) or to-infinitive (after the first, the only, the last…).",
      formula: "N + V-ing | N + V3 | the first/only + N + to V",
      examples: [ex("The girl standing there is my sister.", "Cô gái đứng đó là em gái tôi.", ["standing there"]), ex("He was the first person to arrive.", "Anh ấy là người đầu tiên đến.", ["the first person to arrive"])],
      tipVi: "Xác định chủ động/bị động trước khi chọn V-ing hay V3.",
      questions: [
        mc("The books ___ on the table are mine.", ["leaving", "left", "to leave", "leave"], "left", "Sách được để lại (bị động) → V3.", "MEDIUM"),
        mc("She was the only student ___ the test.", ["passing", "passed", "to pass", "pass"], "to pass", "Sau 'the only' → to V.", "HARD"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 10. TYPES OF SENTENCES
  // ────────────────────────────────────────────────────────────
  "types-of-sentences": [
    {
      slug: "declarative",
      titleVi: "Câu trần thuật",
      titleEn: "Declarative Sentences",
      theoryVi: "Câu trần thuật dùng để kể, nêu thông tin hoặc ý kiến, kết thúc bằng dấu chấm. Có dạng khẳng định và phủ định.",
      theoryEn: "Declarative sentences state facts or opinions and end with a full stop, in affirmative or negative form.",
      formula: "S + V + … . | S + aux + not + V + … .",
      examples: [ex("The museum opens at 9 a.m.", "Bảo tàng mở cửa lúc 9 giờ sáng.", ["The museum opens at 9 a.m."]), ex("I don't eat meat.", "Tôi không ăn thịt.", ["don't eat"])],
      tipVi: "Câu phủ định cần trợ động từ: don't/doesn't/didn't, isn't, haven't…",
      questions: [
        mc("Which is a declarative sentence?", ["She lives in Hue.", "Where does she live?", "Live here!", "What a city!"], "She lives in Hue.", "Câu kể thông tin, kết thúc bằng dấu chấm."),
        fill("He ___ (not like) horror films.", "doesn't like", "Phủ định hiện tại đơn ngôi thứ ba: doesn't + V.", ["does not like"]),
      ],
    },
    {
      slug: "interrogative",
      titleVi: "Câu nghi vấn",
      titleEn: "Interrogative Sentences",
      theoryVi: "Câu hỏi Yes/No đảo trợ động từ lên trước chủ ngữ; câu hỏi Wh- đặt từ để hỏi lên đầu. Câu hỏi đuôi dùng trợ động từ ngược thể với mệnh đề chính.",
      theoryEn: "Yes/No questions put the auxiliary before the subject; Wh- questions start with a question word. Tag questions use the opposite auxiliary.",
      formula: "Aux + S + V? | Wh- + aux + S + V? | …, aux(n't) + pronoun?",
      examples: [ex("Have you ever been to Hanoi?", "Bạn đã bao giờ đến Hà Nội chưa?", ["Have you ever been"]), ex("She is a nurse, isn't she?", "Cô ấy là y tá, phải không?", ["isn't she?"])],
      tipVi: "Câu hỏi về chủ ngữ không dùng trợ động từ: Who called you?",
      questions: [
        mc("You can swim, ___?", ["can you", "can't you", "don't you", "do you"], "can't you", "Mệnh đề khẳng định → câu hỏi đuôi phủ định cùng trợ động từ 'can'.", "MEDIUM"),
        fix("Where you went last weekend?", "Where did you go last weekend?", "Câu hỏi Wh- ở quá khứ cần 'did' + V nguyên mẫu."),
      ],
    },
    {
      slug: "imperative",
      titleVi: "Câu mệnh lệnh",
      titleEn: "Imperative Sentences",
      theoryVi: "Câu mệnh lệnh dùng để ra lệnh, yêu cầu, khuyên bảo, bắt đầu bằng động từ nguyên mẫu; phủ định dùng Don't. 'Let's + V' để rủ rê.",
      theoryEn: "Imperatives give orders, requests or advice, starting with a bare verb; negatives use Don't. 'Let's + V' makes suggestions.",
      formula: "V + … ! | Don't + V | Let's + V",
      examples: [ex("Close the door, please.", "Làm ơn đóng cửa lại.", ["Close"]), ex("Don't be late!", "Đừng đến muộn!", ["Don't be"])],
      tipVi: "Thêm 'please' để lịch sự hơn.",
      questions: [
        mc("___ touch that! It's hot.", ["Not", "No", "Don't", "Doesn't"], "Don't", "Mệnh lệnh phủ định: Don't + V."),
        fix("Let's going to the cinema.", "Let's go to the cinema.", "'Let's' + V nguyên mẫu."),
      ],
    },
    {
      slug: "exclamatory",
      titleVi: "Câu cảm thán",
      titleEn: "Exclamatory Sentences",
      theoryVi: "Câu cảm thán bày tỏ cảm xúc mạnh, thường với What hoặc How và kết thúc bằng dấu chấm than.",
      theoryEn: "Exclamatory sentences express strong feelings, usually with What or How, ending in an exclamation mark.",
      formula: "What + (a/an) + Adj + N (+ S + V)! | How + Adj/Adv (+ S + V)!",
      examples: [ex("What a beautiful day!", "Một ngày đẹp trời làm sao!", ["What a beautiful day!"]), ex("How fast he runs!", "Anh ấy chạy nhanh quá!", ["How fast"])],
      tipVi: "What + danh từ; How + tính từ/trạng từ.",
      questions: [
        mc("___ delicious this cake is!", ["What", "How", "What a", "So"], "How", "'How' + tính từ."),
        fix("What beautiful dress!", "What a beautiful dress!", "Danh từ đếm được số ít cần 'a/an' sau 'What'.", "MEDIUM"),
      ],
    },
    {
      slug: "compound-sentences",
      titleVi: "Câu ghép",
      titleEn: "Compound Sentences",
      theoryVi: "Câu ghép gồm hai (hoặc nhiều) mệnh đề độc lập nối bằng liên từ kết hợp (FANBOYS), dấu chấm phẩy hoặc trạng từ liên kết (however, therefore).",
      theoryEn: "A compound sentence joins two or more independent clauses with a coordinating conjunction (FANBOYS), a semicolon or a conjunctive adverb.",
      formula: "MĐ1, and/but/so + MĐ2 | MĐ1; however, MĐ2",
      examples: [ex("I wanted to go, but I was busy.", "Tôi muốn đi nhưng tôi bận.", [", but"]), ex("It was late; therefore, we took a taxi.", "Đã muộn; vì vậy chúng tôi đi taxi.", ["; therefore,"])],
      tipVi: "Nối hai mệnh đề chỉ bằng dấu phẩy là lỗi 'comma splice' ✗.",
      questions: [
        mc("Which is a compound sentence?", ["She cooked, and he washed the dishes.", "She cooked dinner.", "When she cooked, he slept.", "Cooking dinner."], "She cooked, and he washed the dishes.", "Hai mệnh đề độc lập nối bằng 'and'."),
        fix("It was raining, we stayed inside.", "It was raining, so we stayed inside.", "Lỗi comma splice – cần liên từ 'so' (hoặc dấu chấm phẩy).", "MEDIUM"),
      ],
    },
    {
      slug: "complex-sentences",
      titleVi: "Câu phức",
      titleEn: "Complex Sentences",
      theoryVi: "Câu phức gồm một mệnh đề độc lập và ít nhất một mệnh đề phụ thuộc. Khi mệnh đề phụ thuộc đứng đầu, dùng dấu phẩy ngăn cách.",
      theoryEn: "A complex sentence has one independent clause and at least one dependent clause. Use a comma when the dependent clause comes first.",
      formula: "MĐ phụ thuộc, MĐ độc lập | MĐ độc lập + MĐ phụ thuộc",
      examples: [ex("If you need help, call me.", "Nếu cần giúp, hãy gọi tôi.", ["If you need help,"]), ex("I know the man who won the prize.", "Tôi biết người đàn ông đã đoạt giải.", ["who won the prize"])],
      tipVi: "Câu ghép-phức (compound-complex) = câu ghép có thêm mệnh đề phụ thuộc.",
      questions: [
        mc("Which is a complex sentence?", ["Because it was cold, I wore a coat.", "It was cold, so I wore a coat.", "It was cold.", "I wore a coat and a hat."], "Because it was cold, I wore a coat.", "Có mệnh đề phụ thuộc 'Because it was cold'.", "MEDIUM"),
        mc("Where should the comma go? 'After she graduated she moved to Da Nang.'", ["after 'graduated'", "after 'she moved'", "after 'After'", "no comma needed"], "after 'graduated'", "Mệnh đề phụ thuộc đứng đầu → dấu phẩy sau mệnh đề đó."),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 11. SPECIAL STRUCTURES
  // ────────────────────────────────────────────────────────────
  "special-structures": [
    {
      slug: "passive-voice",
      titleVi: "Câu bị động",
      titleEn: "Passive Voice",
      theoryVi: "Câu bị động nhấn mạnh đối tượng chịu tác động. Tân ngữ câu chủ động thành chủ ngữ; động từ chuyển thành be (chia theo thì) + V3.",
      theoryEn: "The passive focuses on who/what receives the action. The active object becomes the subject; the verb becomes be (in the right tense) + V3.",
      formula: "S + be + V3 (+ by O)",
      examples: [ex("This bridge was built in 1990.", "Cây cầu này được xây năm 1990.", ["was built"]), ex("The room is being cleaned.", "Căn phòng đang được dọn dẹp.", ["is being cleaned"])],
      tipVi: "Bỏ 'by + O' khi người thực hiện không quan trọng hoặc không rõ (by people, by someone).",
      questions: [
        mc("English ___ all over the world.", ["speaks", "is spoken", "is speaking", "spoke"], "is spoken", "Tiếng Anh được nói → bị động hiện tại đơn."),
        fill("The report must ___ (finish) by Friday.", "be finished", "Bị động với modal: modal + be + V3.", null, "MEDIUM"),
      ],
    },
    {
      slug: "reported-speech",
      titleVi: "Câu tường thuật",
      titleEn: "Reported Speech",
      theoryVi: "Khi tường thuật lại lời nói với động từ ở quá khứ (said, told), lùi thì một bậc và đổi đại từ, trạng từ thời gian/nơi chốn (now → then, here → there).",
      theoryEn: "When reporting with a past verb (said, told), shift tenses back one step and change pronouns and time/place words (now → then, here → there).",
      formula: "S + said (that) + S + V(lùi thì) | S + asked + if/wh- + S + V",
      examples: [ex("'I am tired,' she said. → She said she was tired.", "Cô ấy nói rằng cô ấy mệt.", ["She said she was tired"]), ex("He asked me where I lived.", "Anh ấy hỏi tôi sống ở đâu.", ["where I lived"])],
      tipVi: "tell + O (told me), say + (to O) (said to me).",
      questions: [
        mc("'I will call you tomorrow,' he said. → He said he ___ me the next day.", ["will call", "would call", "called", "calls"], "would call", "Lùi thì: will → would; tomorrow → the next day.", "MEDIUM"),
        fix("She said me that she was busy.", "She told me that she was busy.", "'say' không đi trực tiếp với tân ngữ người; dùng 'told me'.", "MEDIUM"),
      ],
    },
    {
      slug: "inversion",
      titleVi: "Đảo ngữ",
      titleEn: "Inversion",
      theoryVi: "Đảo trợ động từ lên trước chủ ngữ sau các trạng từ phủ định/hạn chế đứng đầu câu (Never, Rarely, Not only, Hardly…when, No sooner…than) để nhấn mạnh.",
      theoryEn: "Put the auxiliary before the subject after negative/limiting adverbials at the start (Never, Rarely, Not only, Hardly…when, No sooner…than) for emphasis.",
      formula: "Never/Rarely/Seldom + aux + S + V",
      examples: [ex("Never have I seen such a view.", "Chưa bao giờ tôi thấy cảnh đẹp như vậy.", ["Never have I seen"]), ex("Not only is she smart, but she is also kind.", "Cô ấy không chỉ thông minh mà còn tốt bụng.", ["Not only is she","but she is also"])],
      tipVi: "No sooner … THAN; Hardly/Scarcely … WHEN.",
      questions: [
        mc("Rarely ___ such a talented player.", ["I have seen", "have I seen", "I saw", "seen I have"], "have I seen", "Sau 'Rarely' đầu câu phải đảo trợ động từ.", "HARD"),
        fill("No sooner had he arrived ___ it started to rain.", "than", "Cấu trúc 'No sooner … than'.", null, "HARD"),
      ],
    },
    {
      slug: "cleft-sentences",
      titleVi: "Câu chẻ",
      titleEn: "Cleft Sentences",
      theoryVi: "Câu chẻ tách câu thành hai phần để nhấn mạnh một thành phần: It is/was + phần nhấn mạnh + that/who…; hoặc What + S + V + is/was…",
      theoryEn: "Cleft sentences split a sentence to emphasise one part: It is/was + focus + that/who…; or What + S + V + is/was…",
      formula: "It is/was + X + that/who + … | What + S + V + is/was + X",
      examples: [ex("It was Nam who broke the vase.", "Chính Nam là người làm vỡ bình.", ["It was Nam who"]), ex("What I need is a holiday.", "Điều tôi cần là một kỳ nghỉ.", ["What I need is"])],
      tipVi: "Nhấn mạnh người có thể dùng 'who' hoặc 'that'.",
      questions: [
        mc("It was in Hue ___ I met my wife.", ["which", "that", "where", "what"], "that", "Câu chẻ nhấn mạnh trạng ngữ dùng 'that'.", "MEDIUM"),
        mc("___ I like most about her is her honesty.", ["That", "Which", "What", "It"], "What", "Câu chẻ dạng 'What + S + V + is…'.", "MEDIUM"),
      ],
    },
    {
      slug: "causative",
      titleVi: "Thể sai khiến",
      titleEn: "Causative (have/get)",
      theoryVi: "Diễn tả nhờ/thuê người khác làm việc gì. Chủ động: have + người + V, get + người + to V. Bị động: have/get + vật + V3.",
      theoryEn: "Used when you arrange for someone else to do something. Active: have + person + V, get + person + to V. Passive: have/get + thing + V3.",
      formula: "have + sb + V | get + sb + to V | have/get + sth + V3",
      examples: [ex("I had my hair cut yesterday.", "Hôm qua tôi đi cắt tóc.", ["had my hair cut"]), ex("She got her brother to fix the bike.", "Cô ấy nhờ anh trai sửa xe đạp.", ["got her brother to fix"])],
      tipVi: "'I cut my hair' = tự cắt; 'I had my hair cut' = nhờ người cắt.",
      questions: [
        mc("We are having our house ___.", ["paint", "painted", "painting", "to paint"], "painted", "have + vật + V3.", "MEDIUM"),
        mc("I'll get the mechanic ___ the brakes.", ["check", "checked", "to check", "checking"], "to check", "get + người + to V.", "MEDIUM"),
      ],
    },
    {
      slug: "used-to",
      titleVi: "Used to / Be used to / Get used to",
      titleEn: "Used to / Be used to / Get used to",
      theoryVi: "used to + V: thói quen trong quá khứ nay không còn. be used to + V-ing: đã quen với. get used to + V-ing: dần quen với.",
      theoryEn: "used to + V: a past habit that no longer exists. be used to + V-ing: be accustomed to. get used to + V-ing: become accustomed to.",
      formula: "used to + V | be/get used to + V-ing/N",
      examples: [ex("I used to play football every day.", "Tôi từng chơi bóng đá mỗi ngày.", ["used to play"]), ex("She is used to working late.", "Cô ấy đã quen làm việc muộn.", ["is used to working"])],
      tipVi: "'to' trong be/get used to là giới từ → theo sau là V-ing.",
      questions: [
        mc("He ___ smoke, but he quit last year.", ["used to", "is used to", "gets used to", "use to"], "used to", "Thói quen trong quá khứ nay không còn."),
        fix("I'm used to get up early.", "I'm used to getting up early.", "be used to + V-ing.", "MEDIUM"),
      ],
    },
  ],

  // ────────────────────────────────────────────────────────────
  // 12. ARTICLES & DETERMINERS
  // ────────────────────────────────────────────────────────────
  "articles-determiners": [
    {
      slug: "indefinite-articles",
      titleVi: "Mạo từ không xác định a/an",
      titleEn: "Indefinite Articles a/an",
      theoryVi: "Dùng a/an trước danh từ đếm được số ít khi nhắc đến lần đầu hoặc không xác định. 'an' đứng trước âm nguyên âm, 'a' trước âm phụ âm.",
      theoryEn: "Use a/an before singular countable nouns mentioned for the first time or non-specifically. 'an' goes before vowel sounds, 'a' before consonant sounds.",
      formula: "a + âm phụ âm | an + âm nguyên âm",
      examples: [ex("She is an engineer.", "Cô ấy là kỹ sư.", ["an engineer"]), ex("It takes an hour; it's a university bus.", "Mất một tiếng; đó là xe buýt của trường đại học.", ["an hour","a university"])],
      tipVi: "Xét theo ÂM, không theo chữ: an hour (h câm), a university (/juː/).",
      questions: [
        mc("He is ___ honest man.", ["a", "an", "the", "—"], "an", "'honest' bắt đầu bằng âm nguyên âm /ɒ/ (h câm)."),
        mc("She wants to buy ___ umbrella.", ["a", "an", "the", "some"], "an", "'umbrella' bắt đầu bằng âm nguyên âm /ʌ/."),
      ],
    },
    {
      slug: "definite-article",
      titleVi: "Mạo từ xác định the",
      titleEn: "Definite Article the",
      theoryVi: "Dùng 'the' khi người nghe đã biết đối tượng, vật duy nhất (the sun), so sánh nhất, số thứ tự, tên sông/biển/dãy núi.",
      theoryEn: "Use 'the' when the listener knows which one, for unique things (the sun), superlatives, ordinals, and names of rivers/seas/mountain ranges.",
      formula: "the + N (đã xác định) | the + -est / most + Adj",
      examples: [ex("I saw a cat. The cat was black.", "Tôi thấy một con mèo. Con mèo màu đen.", ["a cat","The cat"]), ex("She is the best student in class.", "Cô ấy là học sinh giỏi nhất lớp.", ["the best"])],
      tipVi: "Lần đầu nhắc → a/an; lần sau → the.",
      questions: [
        mc("___ Mekong River flows through six countries.", ["A", "An", "The", "—"], "The", "Tên sông dùng 'the'."),
        fix("Mount Everest is highest mountain in the world.", "Mount Everest is the highest mountain in the world.", "So sánh nhất cần 'the'."),
      ],
    },
    {
      slug: "zero-article",
      titleVi: "Không dùng mạo từ",
      titleEn: "Zero Article",
      theoryVi: "Không dùng mạo từ với danh từ số nhiều/không đếm được nói chung, tên riêng, bữa ăn, môn thể thao, môn học, và các cụm go to school/bed/work.",
      theoryEn: "No article with plural/uncountable nouns in general, proper names, meals, sports, school subjects, and go to school/bed/work.",
      formula: "Ø + N(số nhiều/không đếm được, nghĩa chung)",
      examples: [ex("I love music.", "Tôi yêu âm nhạc.", ["music"]), ex("We have breakfast at 7.", "Chúng tôi ăn sáng lúc 7 giờ.", ["breakfast"])],
      tipVi: "go to school (đi học) ≠ go to the school (đến trường với mục đích khác).",
      questions: [
        mc("She plays ___ tennis on weekends.", ["a", "an", "the", "—"], "—", "Không dùng mạo từ trước môn thể thao."),
        fix("The life is beautiful.", "Life is beautiful.", "Danh từ trừu tượng mang nghĩa chung không dùng 'the'.", "MEDIUM"),
      ],
    },
    {
      slug: "demonstratives",
      titleVi: "Từ chỉ định",
      titleEn: "Demonstratives",
      theoryVi: "This/these chỉ vật ở gần; that/those chỉ vật ở xa. This/that đi với số ít, these/those đi với số nhiều.",
      theoryEn: "This/these point to things nearby; that/those to things far away. This/that go with singular nouns, these/those with plural.",
      formula: "this/that + N(số ít) | these/those + N(số nhiều)",
      examples: [ex("This book is mine.", "Quyển sách này của tôi.", ["This book"]), ex("Those shoes are expensive.", "Những đôi giày kia đắt.", ["Those shoes"])],
      tipVi: "Gần – số ít: this; gần – số nhiều: these.",
      questions: [
        mc("___ apples on the table are fresh.", ["This", "That", "These", "Such"], "These", "'apples' số nhiều, ở gần → these."),
        fix("Look at that birds in the sky!", "Look at those birds in the sky!", "'birds' số nhiều → 'those'."),
      ],
    },
    {
      slug: "quantifiers",
      titleVi: "Lượng từ",
      titleEn: "Quantifiers",
      theoryVi: "many/few/a few + danh từ đếm được số nhiều; much/little/a little + không đếm được; some/any/a lot of/lots of dùng cho cả hai.",
      theoryEn: "many/few/a few + plural countable nouns; much/little/a little + uncountable; some/any/a lot of/lots of with both.",
      formula: "many/(a) few + N(đếm được) | much/(a) little + N(không đếm được)",
      examples: [ex("There are a few eggs left.", "Còn lại vài quả trứng.", ["a few eggs"]), ex("I have little time.", "Tôi có rất ít thời gian.", ["little time"])],
      tipVi: "a few/a little = một ít (đủ dùng); few/little = rất ít (gần như không).",
      questions: [
        mc("How ___ money do you need?", ["many", "much", "few", "a few"], "much", "'money' không đếm được → much."),
        mc("She has ___ friends, so she feels lonely.", ["a few", "few", "a little", "little"], "few", "'few' = rất ít (nghĩa tiêu cực) + danh từ đếm được.", "MEDIUM"),
      ],
    },
    {
      slug: "possessive-determiners",
      titleVi: "Tính từ sở hữu & sở hữu cách",
      titleEn: "Possessive Determiners",
      theoryVi: "Tính từ sở hữu (my, your, his, her, its, our, their) đứng trước danh từ. Sở hữu cách 's dùng cho người/động vật: Lan's bag, the students' books.",
      theoryEn: "Possessive determiners (my, your, his, her, its, our, their) go before nouns. The possessive 's is used for people/animals: Lan's bag, the students' books.",
      formula: "my/your/… + N | N's + N | N(số nhiều -s)' + N",
      examples: [ex("Their house is near the beach.", "Nhà của họ gần biển.", ["Their house"]), ex("This is my parents' car.", "Đây là xe của bố mẹ tôi.", ["parents' car"])],
      tipVi: "its (của nó) ≠ it's (it is); their ≠ there ≠ they're.",
      questions: [
        mc("The company announced ___ new product.", ["it's", "its", "their's", "it"], "its", "Tính từ sở hữu của 'it' là 'its'."),
        fix("That is my sisters bike.", "That is my sister's bike.", "Sở hữu cách cần dấu 's."),
      ],
    },
  ],
};
