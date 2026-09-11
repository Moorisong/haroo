-- ============================================================
-- waitlist_signups 테이블 생성 마이그레이션
-- Supabase SQL Editor에서 실행하세요.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id    TEXT NOT NULL,
  phone_masked  TEXT NOT NULL,
  phone_raw     TEXT,
  status        TEXT NOT NULL DEFAULT 'PENDING',
  notified_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_project_id ON public.waitlist_signups (project_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist_signups (status);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only"
  ON public.waitlist_signups
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE public.waitlist_signups IS '알림 신청 대기자 목록 (APPLY_NOTIFICATION 블록 액션)';
COMMENT ON COLUMN public.waitlist_signups.phone_masked IS '화면 노출용 마스킹 번호 (예: 010-****-5678)';
COMMENT ON COLUMN public.waitlist_signups.phone_raw IS '실제 발송용 원본 번호 (Service Role만 조회)';
COMMENT ON COLUMN public.waitlist_signups.status IS 'PENDING: 발송 대기 / NOTIFIED: 발송 완료';
