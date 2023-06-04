import { type FC } from 'react';

interface LoadingButtonProps {
    id?: string;
    name?: string;
    isSubmit: boolean
    isBusy: boolean
    label: any;
    handleClick?: () => Promise<void>;
    extraStyles?: string;
}

const LoadingButton: FC<LoadingButtonProps> = ({ id, name, label, isBusy, isSubmit, handleClick, extraStyles }) => {
    return (
        <div className="w-full absolute transform hover:translate-y-1 hover:bg-opacity-80 transition ease-out duration-300">
            {!isBusy && <button
                type={ isSubmit ? "submit" : "button" }
                id={id}
                name={name}
                onClick={handleClick}
                style={{ marginLeft: "auto" }}
                className={`${extraStyles}`}
            >
                {label}
            </button>}
            {isBusy && <button
                type="button"
                style={{ marginLeft: "auto" }}
                className="btn-primary mt-1 inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
                disabled>
                <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                {label}
            </button>
            }
        </div>
    );
};
export default LoadingButton;