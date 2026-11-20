# GramVerse – Cấu trúc thư mục tổng thể

Monorepo gồm 2 ứng dụng độc lập: `backend/` (Node.js + Express 5 + Prisma 7) và `frontend/` (React 19 + Vite + TailwindCSS v4 + React Three Fiber cho bản đồ vũ trụ 3D, ECharts cho biểu đồ thống kê).

## Mô hình "Vũ trụ" ↔ Database

| Tầng giao diện            | Bảng DB              | Model Prisma       | Số lượng seed |
|---------------------------|----------------------|--------------------|---------------|
| Điểm xuất phát **BEGIN**  | (ngôi sao trung tâm trong cảnh 3D) | — | 1             |
| Tầng 1 – Thiên hà (Galaxy) | `grammar_categories` | `GrammarCategory`  | 3             |
| Tầng 2 – Hành tinh (Planet) | `grammar_topics`    | `GrammarTopic`     | 12            |
| Liên kết giữa hành tinh    | `topic_relationships` | `TopicRelationship` | ~14         |
| Tầng 3 – Khu vực (Zone)    | `lessons`            | `Lesson`           | 75            |
| Bài tập trong khu vực      | `questions`          | `Question`         | 2 / zone      |
| Bộ từ vựng                 | `vocab_sets`         | `VocabSet`         | 6             |
| Từ vựng (gắn loại từ)      | `words`              | `Word`             | 60            |

## Cây thư mục

```text
GramVerse/
├── docs/
│   └── ARCHITECTURE.md
├── backend/
│   ├── package.json              # "type": "module"
│   ├── prisma.config.js          # Prisma 7: datasource URL + lệnh seed
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js               # điều phối seed
│   │   ├── seed-data/
│   │   │   ├── galaxies.js       # 3 thiên hà + 12 hành tinh + liên kết
│   │   │   ├── zones.js          # các khu vực: lý thuyết, ví dụ, bài tập
│   │   │   └── vocabulary.js     # bộ từ vựng + từ
│   │   └── migrations/
│   ├── public/uploads/           # audio, ảnh admin upload
│   ├── server.js                 # import "./src/utils/bigint.js" đầu tiên
│   └── src/
│       ├── config/               # env.js, cors.js
│       ├── lib/                  # prisma.js (adapter-pg), mailer.js
│       ├── middleware/           # auth.js, checkAdmin.js, rateLimiter.js, aiQuota.js
│       ├── routes/               # auth, grammar, vocab, ipa, skills, ai, admin
│       ├── controller/           # 1 controller / route
│       ├── services/             # geminiService.js, srsService.js, progressService.js
│       ├── repositories/         # truy vấn Prisma, không chứa logic HTTP
│       └── utils/                # bigint.js, hash.js, slugify.js
└── frontend/
    ├── package.json
    ├── vite.config.js            # @tailwindcss/vite + proxy /api → backend
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx               # router
        ├── index.css             # @import "tailwindcss"; @theme { ... Cosmic palette }
        ├── assets/
        ├── components/
        │   ├── layout/           # Navbar, BottomTabs, StarfieldBackground (trang ngoài vũ trụ)
        │   ├── universe3d/       # UniverseCanvas, Scene, Galaxy, Planet, ZoneMoon, CameraDirector, IntroSequence, Effects
        │   ├── universe/         # PlanetPanel, GalaxyFilter, UniverseSearch, UniverseListView, Universe2DFallback (ECharts)
        │   ├── zone/             # TheoryCard, ExampleList, QuizRunner, AiExplainModal
        │   ├── vocab/            # Flashcard, SrsReviewSession, WordCard
        │   └── common/           # Button, Modal, Loader, LanguageToggle
        ├── pages/
        │   ├── UniverseLayout.jsx # giữ một Canvas 3D duy nhất cho mọi route /universe/* (camera bay "one shot")
        │   ├── UniversePage.jsx  # UI nổi: chào, tìm kiếm, lọc thiên hà
        │   ├── PlanetPage.jsx    # PlanetPanel + danh sách khu vực
        │   ├── ZonePage.jsx      # lý thuyết + ví dụ + bài tập (nổi trên cảnh 3D)
        │   ├── VocabPage.jsx, ReviewPage.jsx, SentenceAnalyzerPage.jsx
        │   ├── auth/             # Login, Register, ForgotPassword
        │   └── admin/            # Dashboard, LessonEditor, AiGenerator, VocabManager
        ├── services/             # grammarApi.js, vocabApi.js, aiApi.js, authApi.js (axios + getAuthHeaders)
        ├── stores/               # useLanguageStore.js, useAuthStore.js, useUniverseStore.js (zustand)
        ├── hooks/
        └── utils/
```

## Quy ước

- Slug là khóa nghiệp vụ ổn định: frontend định tuyến `/universe/:planetSlug/:zoneSlug`, Gemini trả `relatedTopicSlug` khớp `grammar_topics.slug`.
- Mọi lệnh gọi Gemini chỉ ở `backend/src/services/geminiService.js`; kết quả được cache trong `ai_cache`.
- Nội dung do AI sinh có `source = AI_GENERATED`, `status = DRAFT` cho tới khi Admin duyệt.
