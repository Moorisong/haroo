import { FONT } from 'src/constants';

export default function Footer() {
  return (
    <div className={`flex space-x-2 mt-5 ${FONT.SMALL_DARTGRAY}`}>
      <a href="/terms" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        이용약관
      </a>
      <span>·</span>
      <a href="/policy" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        개인정보처리방침
      </a>
      <span>·</span>
      <a href="/about" target="_blank" className={FONT.HOVER_UNDERLINE_TO_GRAY}>
        About
      </a>
    </div>
  );
}
