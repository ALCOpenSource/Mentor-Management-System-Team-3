import "./pop-up-page.css";

function PopUpPage(props: {
  toggle: () => void;
  content: JSX.Element;
}): JSX.Element {
  const handleClick = () => {
    props.toggle();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClick}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
}

export default PopUpPage;
