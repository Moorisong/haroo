export const TextBoxDefault = (props) => {
  const isConditionBox = props.id === 0;
  const textLengh = props.message.length;

  return (
    <div>
      <p>{props.title}</p>
      {isConditionBox && <p>{`${textLengh}/35`}</p>}

      <input value={props.message} onChange={props.onChange} id={props.id} />
    </div>
  );
};
