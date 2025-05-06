import { FONT, TITLE_TEXT, PATH } from 'src/constants';

export default function BrandHeader(props) {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={PATH.LOGO_SVG} alt="Haroo logo" className={props.scale ?? undefined} />
      <div className="flex flex-col items-center">
        <span className={FONT.BIG_BLACK}>{TITLE_TEXT.KOREAN}</span>
        <span className={FONT.MEDIUM_BLUE}>{TITLE_TEXT.ENGLISH}</span>
      </div>
    </div>
  );
}
