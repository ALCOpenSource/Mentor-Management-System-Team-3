import passwordSuccessLogo from "../../assets/images/password-reset-success.svg";

function MessagePopUpPage(props: {
  message: string;
  toggle?: () => void;
  image?: any;
  persist?: boolean;
  buttonText?: string
}): JSX.Element {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (props.persist) {
          e.stopPropagation();
        }

        if (props.toggle)
          props.toggle();
      }}
      className="fixed w-[100%] h-[100vh] top-0 left-0"
    >
       <div className="relative bg-white w-[520px] ml-auto mr-auto h-[100%] max-h-[370px] mt-[50px] border-gray-200 border-[4px] rounded-lg p-0 border-solid overflow-x-hidden overflow-y-hidden">
          <div className="flex-col flex-auto w-full">
            <div className='flex flex-col items-center'>
              <h3 className='text-3xl font-bold leading-[53.18px] mt-4'>{props.message}</h3>
              <img src={passwordSuccessLogo} className="w-[220px] h-[165px] my-[28px]" alt="logo" />
              <div className="flex w-full">
                <button
                  type="submit"
                  style={{ margin: "auto" }}
                  className="btn-primary mt-1"
                >
                  {props.buttonText ?? "Done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default MessagePopUpPage;
