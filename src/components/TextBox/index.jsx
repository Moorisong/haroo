import { DATA_TYPE } from 'src/constants';

export const TextBoxDefault = (props) => {
  const isConditionBox = props.id === 0;
  const textLengh = props.text.length;

  return (
    <div>
      <p>{props.title}</p>
      {isConditionBox && <p>{`${textLengh}/${DATA_TYPE.TEXT.MAX_LENGTH}`}</p>}

      <input value={props.text} onChange={props.onChange} id={props.id} maxLength={isConditionBox && 35} />
    </div>
  );
};
