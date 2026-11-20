# GramVerse

**GramVerse** là nền tảng học Ngữ pháp và Từ vựng tiếng Anh song ngữ (Anh – Việt) trực quan theo mô hình **Bản đồ Vũ trụ Tri thức (Knowledge Universe)**, kết hợp thuật toán ôn tập ngắt quãng (**Spaced Repetition – SM-2**) và trợ lý **Google Gemini AI**.

---

## Tính năng chính

- **Grammar Universe (Vũ trụ Ngữ pháp 3 tầng):**
  - **3 Thiên hà (Galaxies):** *Foundation (Nền tảng)*, *Structure (Cấu trúc)*, *Mastery (Nâng cao)*.
  - **12 Hành tinh (Planets):** Loại từ (*Parts of Speech*), Thành phần câu (*Sentence Elements*), Dạng động từ (*Verb Forms*), Thì (*Tenses*), Sự hòa hợp (*Agreement*), Mệnh đề quan trọng (*Important Clauses*), Cụm từ (*Phrases*), Mệnh đề (*Clauses*), Cấu trúc câu (*Sentence Structures*), Các loại câu (*Types of Sentences*), Mạo từ & Từ hạn định (*Articles & Determiners*), Cấu trúc đặc biệt (*Special Structures*).
  - **75 Khu vực bài học (Zones):** Lý thuyết song ngữ ngắn gọn, công thức, ví dụ minh họa và bài tập thực hành.
- **Vocabulary & SRS Flashcards:** Học từ vựng theo chủ đề gắn với loại từ, tự động tính lịch ôn tập ngắt quãng theo thuật toán **SM-2**.
- **IPA Pronunciation:** Bảng 44 âm IPA quốc tế kèm hướng dẫn khẩu hình và từ vựng mẫu.
- **AI Tutor & Sentence Analyzer (Gemini AI):** Giải thích chi tiết lỗi sai trong bài tập ngữ pháp, phân tích cấu trúc câu tiếng Anh bất kỳ và hỗ trợ quản trị viên biên soạn nội dung bài học.

---

## Công nghệ sử dụng (Tech Stack)

| Tầng | Công nghệ |
|---|---|
| **Frontend** | React 19, Vite, TailwindCSS v4, React Router v7, Zustand, TanStack Query, Apache ECharts, Lucide Icons |
| **Backend** | Node.js (ES Modules), Express 5, JWT Authentication, Helmet, CORS |
| **Cơ sở dữ liệu** | PostgreSQL (Neon Serverless), Prisma ORM v7 (`@prisma/adapter-pg`) |
| **Trí tuệ nhân tạo** | Google Gemini API (Structured JSON Output & Database Caching) |

---

## Cấu trúc thư mục

```text
GramVerse/
├── docs/               # Tài liệu kiến trúc hệ thống (ARCHITECTURE.md)
├── backend/            # RESTful API (Express 5 + Prisma 7 + PostgreSQL + Gemini AI)
│   ├── prisma/         # Schema.prisma & dữ liệu mẫu (seed.js, seed-data/)
│   ├── src/            # Config, Controllers, Services, Repositories, Middlewares, Routes
│   └── server.js       # Điểm khởi chạy server Backend
└── frontend/           # Giao diện người dùng & trang quản trị (React 19 + TailwindCSS v4)
```

---

## Hướng dẫn cài đặt và chạy dự án (Local Development)

### 1. Yêu cầu môi trường
- **Node.js** `>= 20.x`
- **PostgreSQL** (Local hoặc tài khoản [Neon.tech](https://neon.tech))

### 2. Cài đặt và khởi chạy Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/` dựa trên file `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gramverse?schema=public"
PORT=5000
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
```

Khởi tạo bảng và nạp dữ liệu mẫu (3 Thiên hà, 12 Hành tinh, 75 Khu vực bài học, 6 bộ Từ vựng):

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Chạy server Backend ở chế độ phát triển:

```bash
npm run dev
```

### 3. Cài đặt và khởi chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Quy trình nhánh (Gitflow Workflow)

- `main`: Nhánh chứa các phiên bản phát hành ổn định.
- `dev`: Nhánh tích hợp chính trong quá trình phát triển.
- `feature/*`: Các nhánh phát triển từng module tính năng độc lập (`feature/database-schema`, `feature/backend-setup`, ...).
