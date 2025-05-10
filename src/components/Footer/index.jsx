import { FONT } from 'src/constants';
export default function Footer() {
  return (
    <div className={`text-center w-full mt-5 ${FONT.SMALL_DARTGRAY}`}>
      <a href="/terms" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        이용약관
      </a>
      <span className="mx-1">·</span>
      <a href="/policy" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        개인정보처리방침
      </a>
      <span className="mx-1">·</span>
      <a href="/about" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        About
      </a>
    </div>
  );
}
