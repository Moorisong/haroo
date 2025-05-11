import { useState, useEffect } from 'react';
import { TEXT, COMPONENT_STYLE } from 'src/constants';

export default function Vote({ data }) {
  const [clickedIndex, setClickedIndex] = useState(null);

  const now = new Date();
  const isVotingClosed = now.getHours() === 23 && now.getMinutes() >= 30;

  useEffect(() => {
    const alreadyVoted = Object.keys(localStorage).find((key) => key.includes(TEXT.HAROO.VOTE_TOKEN));

    if (alreadyVoted) {
      const votedIndex = localStorage.getItem(alreadyVoted);
      setClickedIndex(Number(votedIndex));
    }
  }, []);

  const handleClick = (index) => {
    if (clickedIndex !== null || isVotingClosed) return;
    setClickedIndex(index);
    localStorage.setItem(`${TEXT.HAROO.VOTE_TOKEN} ${new Date().toISOString()}`, index);
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

        <h2 className={COMPONENT_STYLE.VOTE.TOPIC}>{data.topic}</h2>

        <div className={COMPONENT_STYLE.VOTE.OPTIONS_GRID}>
          {data.options.map((e, i) => {
            const isSelected = clickedIndex === i;
            const isDisabled = clickedIndex !== null || isVotingClosed;

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

      <div className={COMPONENT_STYLE.VOTE.KNOWLEDGE_BOX}>{formatWithLineBreaks(data.knowledge)}</div>
    </>
  );
}
