
import { type FC } from 'react';

export enum BUTTON_TYPE {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface ButtonProps {
	type: BUTTON_TYPE;
	title: string;
	handleClick?: () => void;
	extraStyles?: string;
}

const Button: FC<ButtonProps> = ({ type, title, handleClick, extraStyles }) => {
	return (
		type === BUTTON_TYPE.PRIMARY
			? <button onClick={handleClick} className={`bg-green-three w-full text-white rounded-[10px] p-[10px] font-medium mt-10 ${extraStyles}`}>
				{title}
			</button>
			: <button onClick={handleClick} className={`bg-white w-full text-green-three rounded-[10px] p-[10px] font-medium mt-10 border-2 border-gray-two ${extraStyles}`}>
				{title}
			</button>
	);
};
export default Button;