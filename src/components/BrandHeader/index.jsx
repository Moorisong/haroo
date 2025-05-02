import { FONT, TITLE_TEXT } from 'src/constants';

export default function BrandHeader(props) {
  return (
    <>
      <img src="/logo.svg" alt="Haroo logo" className={props.scale ?? undefined} />
      <div className="flex flex-col items-center">
        <span className={FONT.BIG_BLACK}>{TITLE_TEXT.KOREAN}</span>
        <span className={FONT.MEDIUM_BLUE}>{TITLE_TEXT.ENGLISH}</span>
      </div>
    </>
  );
}
