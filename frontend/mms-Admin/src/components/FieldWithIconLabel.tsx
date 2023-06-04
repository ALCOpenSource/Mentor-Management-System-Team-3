import { type FC } from 'react';
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
                className="absolute mx-5 mt-4"
            />
            <Field
                disabled
                type="text"
                value={label}
                className="border-2 ps-12 border-lightGray-two w-32 mt-2 h-[42px] rounded-[5px] text-[15px] "
            />
            <Field
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                className={`my-0 w-full mt-2 border-2 border-lightGray-two rounded-[5px] text-customBlack-two h-[42px] px-[3px] py-[5px] focus:border-green-three hover:border-green-two text-[16px] relative outline-none hover:bg-opacity-80 transition ease-out duration-300 focus:outline-none focus:shadow-green-three `}
            />
        </div>
    );
};
export default FieldWithIconLabel;