import { DATA_TYPE, SCALE } from 'src/constants';

export const TextBoxDefault = (props) => {
  const isConditionBox = props.id === 0;
  const isYoutubeBox = props.id === 1;
  const textLengh = props.text.length;

  return (
    <div className={`flex flex-col gap-2 ${SCALE.WEB_WIDTH}`}>
      <p className="whitespace-pre-line text-base font-bold">{props.title}</p>
      {isYoutubeBox && <p className="whitespace-pre-line text-xs -mt-2">{DATA_TYPE.YOUTUBE_ADDITIONAL}</p>}

      <div className="relative w-full">
        <input
          className="w-full h-[2rem] border border-gray-300 rounded-sm pr-[3.5rem] text-sm"
          value={props.text}
          onChange={props.onChange}
          id={props.id}
          maxLength={isConditionBox && 35}
        />
        {isConditionBox && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
            {`${textLengh}/${DATA_TYPE.TEXT.MAX_LENGTH}`}
          </span>
        )}
      </div>
    </div>
  );
};
