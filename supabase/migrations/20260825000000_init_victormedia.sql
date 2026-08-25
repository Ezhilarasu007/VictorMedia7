-- VictorMedia Supabase Database Initialization Migration
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('user', 'editor', 'admin');
CREATE TYPE article_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE quiz_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE reward_type AS ENUM ('extra_life', 'feature_unlock', 'bonus_points');

-- 1. Profiles Table (linked to Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'user' NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    streak_count INT DEFAULT 0 NOT NULL,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'general' NOT NULL, -- article, learning, tool, game
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Articles Table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status article_status DEFAULT 'draft' NOT NULL,
    published_at TIMESTAMPTZ,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    reading_time INT DEFAULT 5 NOT NULL, -- in minutes
    views_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Article Views Table (Internal Product Metrics)
CREATE TABLE article_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    ip_hash TEXT,
    device_type TEXT,
    country TEXT,
    viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Bookmarks Table
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    item_type TEXT NOT NULL, -- article, lesson, quiz, tool, game
    item_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, item_type, item_id)
);

-- 6. Learning Courses & Lessons
CREATE TABLE learning_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    thumbnail TEXT,
    level TEXT DEFAULT 'Beginner' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE learning_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES learning_courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT NOT NULL,
    code_examples JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0 NOT NULL,
    reading_time INT DEFAULT 10 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(course_id, slug)
);

-- 7. Quizzes Engine
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    difficulty quiz_difficulty DEFAULT 'medium' NOT NULL,
    is_daily BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    points INT DEFAULT 10 NOT NULL,
    order_index INT DEFAULT 0 NOT NULL
);

CREATE TABLE quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    score INT NOT NULL,
    max_score INT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE user_quiz_stats (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    total_quizzes INT DEFAULT 0 NOT NULL,
    total_score INT DEFAULT 0 NOT NULL,
    streak_days INT DEFAULT 0 NOT NULL,
    last_quiz_date DATE
);

-- 8. Games Directory
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    game_url TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    play_count INT DEFAULT 0 NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 5.0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    duration_seconds INT DEFAULT 0,
    ended_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. Tools Catalog
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT DEFAULT 'wrench' NOT NULL,
    usages_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. AI Usage Metrics
CREATE TABLE ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    tool_name TEXT NOT NULL,
    tokens_used INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 12. Content Reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    item_type TEXT NOT NULL,
    item_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. Audit Logs (Admin tracking)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. Site Settings (Global Key-Value)
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. Rewarded Ad Server-Side Verification Events
CREATE TABLE reward_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reward_event_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    ad_unit TEXT NOT NULL,
    reward_type reward_type DEFAULT 'bonus_points' NOT NULL,
    reward_amount INT DEFAULT 10 NOT NULL,
    transaction_id TEXT,
    verified BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for Query Optimization
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status_published ON articles(status, published_at);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_learning_lessons_course ON learning_lessons(course_id);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX idx_quiz_options_question ON quiz_options(question_id);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_game_sessions_user ON game_sessions(user_id);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_reward_events_event_id ON reward_events(reward_event_id);

-- ROW LEVEL SECURITY (RLS) POLICIES --
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_events ENABLE ROW LEVEL SECURITY;

-- Helper Functions for Roles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins full profiles access" ON profiles FOR ALL USING (public.is_admin());

-- Categories Policies
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins categories write" ON categories FOR ALL USING (public.is_admin());

-- Articles Policies
CREATE POLICY "Public published articles read" ON articles FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins articles write" ON articles FOR ALL USING (public.is_admin());

-- Bookmarks Policies
CREATE POLICY "Users access own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- Learning Policies
CREATE POLICY "Public learning read" ON learning_courses FOR SELECT USING (true);
CREATE POLICY "Public lessons read" ON learning_lessons FOR SELECT USING (true);
CREATE POLICY "Admins learning write" ON learning_courses FOR ALL USING (public.is_admin());
CREATE POLICY "Admins lessons write" ON learning_lessons FOR ALL USING (public.is_admin());

-- Quiz Policies
CREATE POLICY "Public quizzes read" ON quizzes FOR SELECT USING (true);
CREATE POLICY "Public quiz questions read" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public quiz options read" ON quiz_options FOR SELECT USING (true);
CREATE POLICY "Users access own attempts" ON quiz_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own quiz stats" ON user_quiz_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins quizzes write" ON quizzes FOR ALL USING (public.is_admin());

-- Games & Tools Policies
CREATE POLICY "Public games read" ON games FOR SELECT USING (true);
CREATE POLICY "Public tools read" ON tools FOR SELECT USING (true);
CREATE POLICY "Users insert game sessions" ON game_sessions FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users read own game sessions" ON game_sessions FOR SELECT USING (auth.uid() = user_id);

-- Reward Events Policies
CREATE POLICY "Users read own reward events" ON reward_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage reward events" ON reward_events FOR ALL USING (public.is_admin());

-- Notifications & Audit Logs
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view audit logs" ON audit_logs FOR SELECT USING (public.is_admin());

-- Storage Bucket Setup Configuration
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
