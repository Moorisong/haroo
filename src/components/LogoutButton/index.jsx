import { BUTTON_STYLE } from 'src/constants';

export default function LogoutButton(props) {
  return (
    <>
      <button className={`${BUTTON_STYLE.LOGOUT} bg-[#E5F2FF] text-[#0051C1]`} onClick={props.onClick}>
        {props.text}
      </button>
    </>
  );
}
