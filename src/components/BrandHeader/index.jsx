import { FONT, TITLE_TEXT, PATH } from 'src/constants';
import { useLocation } from 'react-router-dom';

export default function BrandHeader(props) {
  const location = useLocation();
  const isLuckPage = location.pathname.includes('luck');

  const titleString = isLuckPage ? TITLE_TEXT.LUCK_SIMULATOR.TITLE : TITLE_TEXT.HAROO.TITLE;
  const subTitleString = isLuckPage ? TITLE_TEXT.LUCK_SIMULATOR.SUBTITLE : TITLE_TEXT.HAROO.SUBTITLE;
  const subTitleStyle = isLuckPage ? FONT.MEDIUM_BLUE : `${FONT.SMALL_BLUE} mt-5`;

  return (
    <div className="flex flex-col items-center gap-5">
      <img src={PATH.LOGO_SVG} alt="Haroo logo" className={props.scale ?? undefined} />
      <div className="flex flex-col items-center text-center">
        <span className={FONT.BIG_BLACK}>{titleString}</span>
        <span className={`${subTitleStyle} whitespace-pre-line`}>{subTitleString}</span>
      </div>
    </div>
  );
}
