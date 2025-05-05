import { DATA_TYPE, SCALE } from 'src/constants';

const roundGrayBorderStyle = 'border border-gray-300 rounded-sm';

export const TextBox = (props) => {
  const { id, title, subTitle, text, onChange, youtubeOption } = props;

  const isConditionBox = id === 0;
  const isYoutubeBox = id === 1;
  const isYoutubeLinkSkipped = isYoutubeBox && youtubeOption.withoutYoutube;
  const showInputArea = !isYoutubeLinkSkipped;
  const textLength = text.length;

  return (
    <div className={`flex flex-col gap-3 ${SCALE.WEB_WIDTH} mt-5`}>
      {showInputArea && (
        <>
          <p className="whitespace-pre-line text-base font-bold">{title}</p>
          <p className="whitespace-pre-line -mt-3 text-xs text-gray-400">{subTitle}</p>
        </>
      )}

      <div className="relative w-full">
        {showInputArea && (
          <input
            className={`${roundGrayBorderStyle} w-full p-3 h-[2rem] pr-[3.5rem] text-sm focus:outline-none`}
            value={text}
            onChange={onChange}
            id={id}
            maxLength={isConditionBox ? 35 : undefined}
          />
        )}

        {/* 글자수 표기*/}
        {isConditionBox && (
          <span
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${
              textLength >= 35 ? 'text-red-500 font-semibold' : 'text-gray-400'
            } text-xs pointer-events-none`}
          >
            {`${textLength}/${DATA_TYPE.TEXT.MAX_LENGTH}`}
          </span>
        )}

        {/* 유튜브 링크 스킵 체크 영역 */}
        {isYoutubeBox && (
          <div className="mt-1">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" onChange={youtubeOption.onToggle} />
              <div className={`${roundGrayBorderStyle} w-3.5 h-3.5 peer-checked:bg-blue-500`} />
              <span className="text-xs ml-1">{DATA_TYPE.WITHOUT_YOUTUBE}</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
