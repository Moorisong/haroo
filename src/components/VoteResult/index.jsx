import { SCALE, COMPONENT_STYLE, TEXT } from 'src/constants';
import { getRandomEmlji } from 'src/utils';

export default function VoteResult(props) {
  return (
    <div className={`${COMPONENT_STYLE.VOTE_RESULT.RESULT_WRAPPER} ${SCALE.WEB_WIDTH} mx-auto`}>
      <div className={COMPONENT_STYLE.VOTE_RESULT.RESULT_BOX}>
        {/* 헤더 */}
        <div className={COMPONENT_STYLE.VOTE_RESULT.HEADER}>
          <span className={COMPONENT_STYLE.VOTE_RESULT.HEADER_ICON}>🏆</span>
          <div className={COMPONENT_STYLE.VOTE_RESULT.HEADER_TEXT}>
            {TEXT.HAROO.VOTE_RESULT.HEADER_TEXT_1}{' '}
            <span className="text-indigo-600 font-bold">{props.topVoted || 'test'}</span>{' '}
            {TEXT.HAROO.VOTE_RESULT.HEADER_TEXT_2}
          </div>
        </div>

        {props.data.statChanges?.map((stat) => {
          const isPlus = stat.value > 0;

          return (
            <div className={COMPONENT_STYLE.VOTE_RESULT.BODY} key={stat._id}>
              <span className={COMPONENT_STYLE.VOTE_RESULT.BODY_ICON}>{getRandomEmlji()}</span> {/* 랜덤 이모티콘 */}
              <div className={COMPONENT_STYLE.VOTE_RESULT.BODY_TEXT}>
                {TEXT.HAROO.VOTE_RESULT.BODY_TEXT_1} <span className="font-bold text-green-600">{stat.label}</span>{' '}
                {TEXT.HAROO.VOTE_RESULT.BODY_TEXT_2}
                <span
                  className={
                    isPlus ? COMPONENT_STYLE.VOTE_RESULT.VALUE_POSITIVE : COMPONENT_STYLE.VOTE_RESULT.VALUE_NEGATIVE
                  }
                >
                  {isPlus ? `+${stat.value}` : stat.value}
                </span>
                {isPlus ? TEXT.HAROO.VOTE_RESULT.BODY_TEXT_STAT_UP : TEXT.HAROO.VOTE_RESULT.BODY_TEXT_STAT_DOWN}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
