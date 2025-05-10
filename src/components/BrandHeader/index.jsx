import { useNavigate } from 'react-router-dom';
import { FONT, TEXT, PATH, STYLE } from 'src/constants';
import { useLocation } from 'react-router-dom';

export default function BrandHeader(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLuckPage = location.pathname.includes('luck');

  const titleString = isLuckPage ? TEXT.LUCK_SIMULATOR.TITLE : TEXT.HAROO.TITLE;
  const subTitleString = isLuckPage ? TEXT.LUCK_SIMULATOR.SUBTITLE : TEXT.HAROO.SUBTITLE;
  const subTitleStyle = isLuckPage ? FONT.MEDIUM_BLUE : `${FONT.SMALL_BLUE} mt-5`;

  const onClickLogo = () => navigate(PATH.MAIN);

  return (
    <div className={`${STYLE.FLEX_COL_ITEM_CENTER} gap-5`}>
      <img
        src={PATH.LOGO_SVG}
        alt="Haroo logo"
        className={`cursor-pointer ${props.scale} ?? ${undefined}`}
        onClick={onClickLogo}
      />
      <div className={`${STYLE.FLEX_COL_ITEM_CENTER} text-center`}>
        <span className={FONT.BIG_BLACK}>{titleString}</span>
        <span className={`${subTitleStyle} whitespace-pre-line`}>{subTitleString}</span>
      </div>
    </div>
  );
}
