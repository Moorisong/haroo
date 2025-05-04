import { DATA_TYPE, SCALE } from 'src/constants';

const roundGrayBorderStyle = 'border border-gray-300 rounded-sm';

export const TextBox = (props) => {
  const isConditionBox = props.id === 0;
  const isYoutubeBox = props.id === 1;
  const isCheckedWithoutYoutube = isYoutubeBox && props.youtubeOption.withoutYoutube;
  const textLength = props.text.length;

  return (
    <div className={`flex flex-col gap-2 ${SCALE.WEB_WIDTH}`}>
      {!isCheckedWithoutYoutube && <p className="whitespace-pre-line text-base font-bold">{props.title}</p>}
      {isYoutubeBox && !isCheckedWithoutYoutube && (
        <p className="whitespace-pre-line text-xs -mt-2">{DATA_TYPE.YOUTUBE_ADDITIONAL}</p>
      )}

      <div className="relative w-full">
        {!isCheckedWithoutYoutube && (
          <input
            className={`${roundGrayBorderStyle} w-full p-3 h-[2rem] pr-[3.5rem] text-sm focus:outline-none`}
            value={props.text}
            onChange={props.onChange}
            id={props.id}
            maxLength={isConditionBox ? 35 : undefined}
          />
        )}

        {isConditionBox && (
          <span
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${textLength >= 35 ? 'text-red-500 font-semibold' : 'text-gray-400'} text-xs pointer-events-none`}
          >
            {`${textLength}/${DATA_TYPE.TEXT.MAX_LENGTH}`}
          </span>
        )}

        {isYoutubeBox && (
          <div className="mt-1">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={props.youtubeOption.onToggle} />
              <div className={`${roundGrayBorderStyle} w-3.5 h-3.5 peer-checked:bg-blue-500`} />
              <span className="text-xs ml-1">{DATA_TYPE.WITHOUT_YOUTUBE}</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
