-- Supabase Dashboard -> SQL Editor에서 실행할 테이블 생성 DDL

CREATE TABLE IF NOT EXISTS public."UserProjectDraft" (
    id VARCHAR(50) PRIMARY KEY,
    draft_id VARCHAR(50),
    "userId" VARCHAR(100),
    user_id VARCHAR(100),
    name VARCHAR(100) DEFAULT '나만의 프로젝트' NOT NULL,
    draft_name VARCHAR(100),
    "selectedBlocks" JSONB NOT NULL,
    block_config_json JSONB,
    "versionClock" INT DEFAULT 0,
    version_clock INT DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_project_draft_user_id ON public."UserProjectDraft"("userId");

-- RLS (Row Level Security) 활성화 및 전체 정책 허용
ALTER TABLE public."UserProjectDraft" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated user full access on UserProjectDraft"
ON public."UserProjectDraft"
FOR ALL
USING (true)
WITH CHECK (true);
