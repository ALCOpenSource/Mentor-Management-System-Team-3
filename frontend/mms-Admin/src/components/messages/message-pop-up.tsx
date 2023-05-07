import SuccessSplashComponent from "../success-splash-component/success-splash-component";
import logo from "../../assets/images/mms_logo.svg";
import passwordSuccessLogo from "../../assets/images/password-reset-success.svg";
import "./message-pop-up.css";
import Button from "../shared/button";

function MessagePopUpPage(props: {
  message: string;
  toggle: () => void;
  image?: any;
  persist?: boolean;
  buttonText? :string
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
      <div>
			<div className="flex-col flex-auto w-full">
    			<div className='flex flex-col items-center'>
					<h3 className='text-3xl font-bold leading-[53.18px] mt-4'>{props.message}</h3>
					<img src={passwordSuccessLogo} className="w-[220px] h-[165px] my-[28px]" alt="logo" />
          <div className="flex w-full">
              <button
                type="submit"
                style={{ margin: "auto" }}
                className="bg-green-three text-white rounded-[10px] p-[10px] pe-[40px] ps-[40px] font-medium mt-1"
              >
                {props.buttonText ?? "Done"}
              </button>
            </div>
				</div>
			</div>
		</div>
      </div>
    </div>
  );
}
export default MessagePopUpPage;
