export const TextBoxDefault = (props) => (
  <div>
    <p>{props.title}</p>
    <input value={props.message} onChange={props.onChange} id={props.id} />
  </div>
);
