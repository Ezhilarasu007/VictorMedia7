-- Seed data for VictorMedia Platform

-- Categories
INSERT INTO categories (id, name, slug, description, type) VALUES
('11111111-1111-1111-1111-111111111111', 'Programming', 'programming', 'Software engineering, clean code, and core algorithms.', 'article'),
('22222222-2222-2222-2222-222222222222', 'Artificial Intelligence', 'ai', 'Machine learning, LLMs, neural networks, and prompt engineering.', 'article'),
('33333333-3333-3333-3333-333333333333', 'Cybersecurity', 'cybersecurity', 'Network security, ethical hacking, cryptography, and defense.', 'article'),
('44444444-4444-4444-4444-444444444444', 'Web Development', 'web-development', 'Modern web technologies, Next.js, CSS architecture, and APIs.', 'article'),
('55555555-5555-5555-5555-555555555555', 'Mobile Development', 'mobile-development', 'Flutter, React Native, iOS, Android, and cross-platform app design.', 'article')
ON CONFLICT (slug) DO NOTHING;

-- Articles
INSERT INTO articles (id, title, slug, excerpt, content, category_id, status, published_at, reading_time, seo_title, seo_description) VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'Architecting Next.js 14 Web Applications for Enterprise Scale',
    'architecting-nextjs-14-enterprise',
    'Explore the modern App Router architecture, server components, edge caching, and scalable state management strategies.',
    '# Architecting Next.js 14 Web Applications for Enterprise Scale\n\nNext.js 14 has introduced groundbreaking performance optimizations and simplified server-side rendering mechanisms through the App Router...\n\n## Server Components vs Client Components\n\nBy leveraging React Server Components (RSC), developers can significantly reduce JavaScript bundle size delivered to the browser...\n\n```tsx\n// Server Component Example\nexport default async function DashboardPage() {\n  const data = await fetchMetrics();\n  return <MetricsGrid data={data} />;\n}\n```\n\n## Conclusion\n\nWith proper caching strategies and Supabase integration, Next.js 14 provides unmatched developer velocity and end-user speed.',
    '44444444-4444-4444-4444-444444444444',
    'published',
    NOW(),
    6,
    'Architecting Next.js 14 Applications | VictorMedia Tech',
    'In-depth engineering guide on building scalable, production-ready web apps using Next.js 14 and Supabase.'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Understanding Large Language Model Fine-Tuning & Vector Retrieval',
    'llm-fine-tuning-vector-retrieval',
    'A deep dive into Retrieval-Augmented Generation (RAG), vector databases, and parameter-efficient fine-tuning (LoRA).',
    '# Understanding Large Language Model Fine-Tuning & Vector Retrieval\n\nAs artificial intelligence becomes integral to software platforms, developers must master Retrieval-Augmented Generation (RAG) and embedding vectors...\n\n## Vector Embeddings\n\nVectors represent contextual semantic relationships in multi-dimensional space...\n\n```python
# Generating embeddings with OpenAI API
from openai import OpenAI
client = OpenAI()

response = client.embeddings.create(
    input="VictorMedia is an innovative tech portal",
    model="text-embedding-3-small"
)
```\n\n## RAG Pipeline Overview\n\nIntegrating pgvector with Supabase enables lightning-fast semantic document search.',
    '22222222-2222-2222-2222-222222222222',
    'published',
    NOW(),
    8,
    'LLM Fine-Tuning & Vector Retrieval Guide | VictorMedia AI',
    'Master RAG, embeddings, vector databases, and fine-tuning for modern AI applications.'
)
ON CONFLICT (slug) DO NOTHING;

-- Learning Courses & Lessons
INSERT INTO learning_courses (id, title, slug, description, category_id, level) VALUES
(
    'c1111111-1111-1111-1111-111111111111',
    'Full-Stack Web Engineering with Supabase & Next.js',
    'fullstack-web-engineering',
    'Master modern web development from relational schema design to edge deployment.',
    '44444444-4444-4444-4444-444444444444',
    'Intermediate'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO learning_lessons (id, course_id, title, slug, content, order_index, reading_time) VALUES
(
    'l1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Database Schemas & Row Level Security (RLS)',
    'database-schemas-and-rls',
    'Row Level Security guarantees data isolation directly at the database engine level. Learn how to write secure PostgreSQL policies for multi-tenant environments.',
    1,
    7
) ON CONFLICT (course_id, slug) DO NOTHING;

-- Quizzes
INSERT INTO quizzes (id, title, slug, category_id, description, difficulty, is_daily) VALUES
(
    'q1111111-1111-1111-1111-111111111111',
    'Daily Web Architecture & Security Quiz',
    'daily-web-architecture-quiz',
    'Test your daily knowledge of web security, HTTP standards, database indexing, and API security.',
    'medium',
    TRUE
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO quiz_questions (id, quiz_id, question_text, explanation, points, order_index) VALUES
(
    'qq111111-1111-1111-1111-111111111111',
    'q1111111-1111-1111-1111-111111111111',
    'Which HTTP header is specifically designed to mitigate Cross-Site Scripting (XSS) attacks by controlling resources loaded on a webpage?',
    'Content-Security-Policy (CSP) allows server administrators to restrict the resources (such as JavaScript, CSS, Images) that the browser is allowed to load for a given page.',
    10,
    1
) ON CONFLICT (id) DO NOTHING;

INSERT INTO quiz_options (id, question_id, option_text, is_correct) VALUES
('qo111111-1111-1111-1111-111111111111', 'qq111111-1111-1111-1111-111111111111', 'Strict-Transport-Security', FALSE),
('qo222222-2222-2222-2222-222222222222', 'qq111111-1111-1111-1111-111111111111', 'Content-Security-Policy', TRUE),
('qo333333-3333-3333-3333-333333333333', 'qq111111-1111-1111-1111-111111111111', 'X-Frame-Options', FALSE),
('qo444444-4444-4444-4444-444444444444', 'qq111111-1111-1111-1111-111111111111', 'Access-Control-Allow-Origin', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Games Catalog
INSERT INTO games (id, title, slug, description, category, game_url, thumbnail, play_count, rating) VALUES
(
    'g1111111-1111-1111-1111-111111111111',
    'Cyber Runner 2099',
    'cyber-runner-2099',
    'A high-speed futuristic HTML5 arcade endless runner. Collect data nodes while avoiding digital grid anomalies.',
    'Arcade',
    'https://html5.gamedistribution.com/rvvASndrUmg0M2p3c09jN2VpL0x1UT00/',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    1240,
    4.85
),
(
    'g2222222-2222-2222-2222-222222222222',
    'Quantum Sudoku',
    'quantum-sudoku',
    'Challenge your mental analytical skills with randomized daily grid puzzles and progressive difficulty scaling.',
    'Puzzle',
    'https://html5.gamedistribution.com/rvvASndrUmg0M2p3c09jN2VpL0x1UT00/',
    'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&auto=format&fit=crop&q=80',
    890,
    4.90
) ON CONFLICT (slug) DO NOTHING;

-- Tools Seed
INSERT INTO tools (id, title, slug, description, category, icon) VALUES
('t01', 'Word Counter', 'word-counter', 'Count words, sentences, characters, and reading time in real-time.', 'Text', 'file-text'),
('t02', 'Character Counter', 'character-counter', 'Analyze character density, spaces, and platform character limits.', 'Text', 'align-left'),
('t03', 'JSON Formatter', 'json-formatter', 'Format, beautify, and inspect raw JSON data with indentation.', 'Developer', 'code'),
('t04', 'JSON Validator', 'json-validator', 'Validate syntax and diagnose structural JSON errors instantly.', 'Developer', 'check-circle'),
('t05', 'Base64 Encoder/Decoder', 'base64-tool', 'Encode string data to Base64 format or decode Base64 back to UTF-8 text.', 'Developer', 'binary'),
('t06', 'URL Encoder/Decoder', 'url-encoder', 'Escape special characters for safe URL query parameter usage.', 'Developer', 'link'),
('t07', 'Password Generator', 'password-generator', 'Generate cryptographically strong passwords with custom rules.', 'Security', 'shield-check'),
('t08', 'QR Generator', 'qr-generator', 'Generate high-resolution custom QR codes for URLs and text.', 'Utility', 'qr-code'),
('t09', 'Unit Converter', 'unit-converter', 'Convert measurements between metric and imperial systems seamlessly.', 'Math', 'calculator'),
('t10', 'Percentage Calculator', 'percentage-calculator', 'Calculate percentage increases, discounts, and ratio proportions.', 'Math', 'percent'),
('t11', 'Age Calculator', 'age-calculator', 'Calculate exact age in years, months, days, hours, and total leap years.', 'Utility', 'calendar'),
('t12', 'Text Case Converter', 'text-case-converter', 'Convert text between UPPERCASE, lowercase, camelCase, snake_case, and Title Case.', 'Text', 'type'),
('t13', 'Markdown Previewer', 'markdown-previewer', 'Write GitHub-flavored markdown and render HTML preview live.', 'Text', 'eye'),
('t14', 'Color Converter', 'color-converter', 'Convert color codes between HEX, RGB, HSL, and HSV formats.', 'Design', 'palette'),
('t15', 'Timestamp Converter', 'timestamp-converter', 'Convert UNIX epoch timestamps into human-readable ISO date strings.', 'Developer', 'clock')
ON CONFLICT (slug) DO NOTHING;
