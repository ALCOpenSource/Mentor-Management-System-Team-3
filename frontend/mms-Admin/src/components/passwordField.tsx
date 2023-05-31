import React, { useState, type FC } from 'react';
import SVG_ICONS from "../constants/svg-icons";
import { Field } from 'formik';

interface PasswordFieldProps {
    id: string;
    name: string;
    placeholder?: string;
    handleClick?: () => void;
    extraStyles?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({ id, name, placeholder, handleClick, extraStyles }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className="w-full transform hover:translate-y-1 hover:bg-opacity-80 transition ease-out duration-300">
            <Field
                type={showPassword ? "text" : "password"}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`text-input ${extraStyles} hover:translate-y-0 absolute`}
                onClick={handleClick}
            />
            <button
                className="transform -translate-y-1/2 focus:outline-none text-gray-two absolute right-2 top-7"
                type="button"
                onClick={() => {
                    setShowPassword(!showPassword);
                }}
            >
                {showPassword
                    ? SVG_ICONS.PASSWORD.SHOW
                    : SVG_ICONS.PASSWORD.HIDE}
            </button>
        </div>
    );
};
export default PasswordField;