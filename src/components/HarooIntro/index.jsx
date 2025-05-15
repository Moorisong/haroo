import { COMPONENT_STYLE } from 'src/constants';

export default function HarooIntro({ introString, emoticon }) {
  return (
    <div className={COMPONENT_STYLE.HAROO_INTRO.CONTAINER}>
      <div className={COMPONENT_STYLE.HAROO_INTRO.EMOTICON}>
        <pre className="text-xl font-bold block">{emoticon}</pre>
      </div>
      <div className={COMPONENT_STYLE.HAROO_INTRO.TEXT}>
        <div>{introString}</div>
      </div>
    </div>
  );
}
