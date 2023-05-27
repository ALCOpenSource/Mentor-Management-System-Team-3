import React, { useState, type FC } from 'react';
import SVG_ICONS from "../assets/svg-icons";
import { Field } from 'formik';

interface FieldWithIconLabelProps {
    id: string;
    name: string;
    label: string;
    icon:any;
    placeholder?: string;
    extraStyles?: string;
}

const FieldWithIconLabel: FC<FieldWithIconLabelProps> = ({ id, name, placeholder, label, icon, extraStyles }) => {
    return (
        <div className={`w-full transform hover:translate-y-1 hover:bg-opacity-80 p-0 transition ease-out duration-300 ${extraStyles}`}>
            <img
                src={icon}
                alt="profile logo"
                className="mx-5 my-2.5"
            />
            <Field
                disabled
                type="text"
                value={label}
                className="border-2 ps-12 border-lightGray-two w-32 rounded-[5px] text-[15px] "
            />
            <Field
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                className={`my-0 text-input input-icon-field ms-0 border-2 border-lightGray-two rounded-[5px] ps-14 text-[15px]`}
            />
        </div>
    );
};
export default FieldWithIconLabel;