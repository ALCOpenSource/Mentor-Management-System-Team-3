import { type FC } from 'react';

interface LoadingProps {
  isActive: boolean;
}

const LoadingComponent: FC<LoadingProps> = ({ isActive }) => {
  return (
    <div
      className={`${isActive ? "hidden" : ""} left-0 right-0 inline-block mx-auto h-[64px] w-[64px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Please Wait...</span
      >
    </div>
  )
}

export default LoadingComponent;
