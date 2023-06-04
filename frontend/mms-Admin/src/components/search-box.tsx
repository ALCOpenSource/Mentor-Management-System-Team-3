import { type FC } from 'react';
import searchIconSVG from "./../assets/images/search-green.svg";
import { Field } from 'formik';

interface SearchBoxProps {
    id: string;
    name: string;
    iconLeftPosition?: number;
    placeholder?: string;
    handleClick?: () => void;
    extraStyles?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ id, name, placeholder, iconLeftPosition, handleClick, extraStyles }) => {
    return (
        <div className="w-full transform hover:translate-y-1 hover:bg-opacity-80 transition ease-out duration-300">
            <button
                className={`focus:outline-none pl-0 text-gray-two z-10 absolute left-[${iconLeftPosition ?? 20}px] top-[16px]`}
                type="button"
                onClick={handleClick}
            >
                <img
                    src={searchIconSVG}
                    alt="search icon"
                    className="min-w-[40px] w-[40px] h-[25px] text-left"
                />
            </button>
            <Field
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                className={`ps-[40px] text-customBlack-two h-[42px] py-[5px] my-2 w-full border-2 border-gray-300 focus:border-green-three hover:border-green-two rounded-[5px] text-[16px] relative outline-none hover:bg-opacity-80 transition ease-out duration-300 focus:outline-none focus:shadow-green-three ${extraStyles} absolute`}
            />

        </div>
    );
};
export default SearchBox;