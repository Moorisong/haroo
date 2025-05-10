import { COLOR, TEXT, COMPONENT_STYLE } from 'src/constants';

export default function HarooStats({ data }) {
  return (
    <div className={COMPONENT_STYLE.STAT.CARD}>
      <h2 className={COMPONENT_STYLE.STAT.HEADER}>{TEXT.HAROO.STAT_TITLE}</h2>
      <div className={COMPONENT_STYLE.STAT.SCROLL_AREA}>
        {data.map(({ label, value }) => {
          const barColor = value < 0 ? COLOR.PROGRESSBAR_RED : COLOR.PROGRESSBAR_BLUE;
          const width = Math.min(Math.abs(value), 100);
          return (
            <div key={label}>
              <div className={COMPONENT_STYLE.STAT.LABEL_ROW}>
                <span className={COMPONENT_STYLE.STAT.LABEL_TEXT}>{label}</span>
                <span className={COMPONENT_STYLE.STAT.VALUE_TEXT}>{value} / 100</span>
              </div>
              <div className={COMPONENT_STYLE.STAT.BAR_BACKGROUND}>
                <div className={`${barColor} h-full`} style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
