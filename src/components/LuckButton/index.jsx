import { COMPONENT_STYLE, DATA_TYPE } from 'src/constants';

export default function LuckButton(props) {
  return (
    <button onClick={props.onClick} className={COMPONENT_STYLE.MAIN.BUTTON}>
      {DATA_TYPE.MAIN_PAGE.LUCK_BUTTON_TEXT}
    </button>
  );
}
