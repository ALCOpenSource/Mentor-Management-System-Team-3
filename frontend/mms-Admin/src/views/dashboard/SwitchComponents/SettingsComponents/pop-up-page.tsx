//import "./pop-up-page.css";

function PopUpPage(props: {
  toggle: () => void;
  content: JSX.Element;
  persist: boolean;
}): JSX.Element {
  const handleClick = () => {
    props.toggle();
  };

  return (
    <div onClick={(e: React.MouseEvent<HTMLDivElement>)=> {
      if(props.persist)
      {
        e.stopPropagation();
      }
    }} className="fixed w-full h-[100vh] top-0 left-0">
      <div className="relative w-[420px] ml-auto mr-[60px] h-[100%] max-h-[85vh] ">
        <span className="cursor-pointer w-[40px] rounded-full text-customBlack-three h-[40px] bg-opacity-20 absolute pt-[7px] right-[20px] top-[30px]" onClick={handleClick}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
}

export default PopUpPage;
