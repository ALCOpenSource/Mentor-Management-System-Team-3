import "./message-pop-up.css";

function PopUpPage(props: {
  message: string;
  toggle: () => void;
  image?: any;
  persist?: boolean;
}): JSX.Element {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (props.persist) {
          e.stopPropagation();
        }
      }}
      className="popup-box"
    >
      <div className="box">
        <div style={{ height: "50px" }}>
          <label>div 1</label>
        </div>
        <div style={{ height: "50px" }}>
          <label>div 2</label>
        </div>
        <div style={{ height: "50px" }}>
          <label>div 3</label>
        </div>
      </div>
    </div>
  );
}

export default PopUpPage;
