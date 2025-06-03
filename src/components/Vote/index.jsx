import { useState } from 'react';
import { DATA_TYPE } from 'src/constants';
import { TEXT, COMPONENT_STYLE } from 'src/constants';
import { submitVote } from 'src/services/harooApis';

export default function Vote({ voteData, userVoteData }) {
  const initialVoteIndex = userVoteData.isVoted ? userVoteData.optionIndex : undefined;
  const [clikedIndex, setClickedIndex] = useState(initialVoteIndex);
  const now = new Date();
  const isVotingClosed = now.getHours() === 23 && now.getMinutes() >= 30;

  const handleClick = async (index) => {
    if (isVotingClosed) return;
    const confirmed = window.confirm(TEXT.HAROO.VOTE_CONFIRM);
    if (!confirmed) return;

    try {
      await submitVote(voteData._id, index);
      setClickedIndex(index);
    } catch (error) {
      const message = error.response?.data?.message || error.message || DATA_TYPE.ERROR_MESSAGE;
      return alert(message);
    }
  };

  const formatWithLineBreaks = (text) =>
    text
      .split('. ')
      .map((sentence, index, arr) => (index < arr.length - 1 ? sentence + '.' : sentence))
      .map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ));

  return (
    <>
      <div className={COMPONENT_STYLE.VOTE.WRAPPER}>
        <div className={COMPONENT_STYLE.VOTE.TITLE}>{TEXT.HAROO.VOTE_TITLE}</div>

        <h2 className={COMPONENT_STYLE.VOTE.TOPIC}>{voteData.topic}</h2>

        <div className={COMPONENT_STYLE.VOTE.OPTIONS_GRID}>
          {voteData.options.map((e, i) => {
            const isDisabled = isVotingClosed;
            const isSelected = i === clikedIndex;

            return (
              <button
                key={e + i}
                onClick={() => handleClick(i)}
                className={`
                  ${COMPONENT_STYLE.VOTE.OPTION}
                  ${isSelected ? COMPONENT_STYLE.VOTE.OPTION_SELECTED : COMPONENT_STYLE.VOTE.OPTION_DEFAULT}
                  ${isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
                `}
                disabled={isDisabled}
              >
                {e}
              </button>
            );
          })}
        </div>

        <div className={COMPONENT_STYLE.VOTE.RULES}>
          {TEXT.HAROO.VOTE_RULES.map((e, i) => (
            <p key={e + i}>{e}</p>
          ))}
        </div>
      </div>

      <div className={COMPONENT_STYLE.VOTE.KNOWLEDGE_BOX}>{formatWithLineBreaks(voteData.knowledge)}</div>
    </>
  );
}
