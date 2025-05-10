import { DATA_TYPE, STYLE } from 'src/constants';

export default function ShareButton(props) {
  return (
    <button className={`${STYLE.LOGIN_BUTTON} bg-[#FEE500]`} onClick={props.onClick}>
      {DATA_TYPE.LUCK_SIMULATOR.TEXT.BUTTON_SHARE}
    </button>
  );
}
