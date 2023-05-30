import { FC } from 'react';
import Button, { BUTTON_TYPE } from '../shared/button';

interface SuccessSplashProps {
  imageSrc?: string,
  title?: string,
  btnText: string,
}

const SuccessSplashComponent: FC<SuccessSplashProps> = ({ btnText, title, imageSrc }) => {
	return (
		<>
			<div className="bg-white rounded-[20px] mt-2 px-5 w-[600px]">
				<div className='flex flex-col items-center'>
					<h3 className='text-3xl font-bold leading-[53.18px] mt-4'>{title}</h3>
					<img src={imageSrc} className="w-[220px] h-[165px] my-[28px]" alt="logo" />
					<Button
						title={btnText}
						type={BUTTON_TYPE.PRIMARY}
						extraStyles="btn-secondary w-[121px] mt-0 mb-4"
					/>
				</div>
			</div>
		</>
	);
};
export default SuccessSplashComponent;