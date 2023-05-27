import { DetailCard } from "../types";
import time from "../../../../../assets/images/time.svg";
import calender from "../../../../../assets/images/calendar.svg";
import upArrow from "../../../../../assets/images/arrow-up.svg";

const DetailCards = ({ section, title, imageLink, subTexts }: DetailCard) => {
  return (
    <div className="flex justify-between items-center px-5 py-4 border border-lightGray-two rounded-[5px]">
      <div className="flex items-center gap-x-8">
        <img
          src={imageLink}
          alt={section}
          className="inline-block w-[50px] h-[50px] object-contain"
        />
        <div className="leading-6">
          <h6 className="text-md text-customBlack-two">{title}</h6>

          {subTexts &&
            subTexts?.map((info) => {
              return info.date && info.time ? (
                <div className="flex items-center gap-6">
                  <p className="flex items-start gap-1">
                    <img src={calender} alt="schedule" />
                    <span className="text-xs text-gray-two">{info.date}</span>
                  </p>
                  <p className="flex items-start gap-1">
                    <img src={time} alt="time" />
                    <span className="text-xs text-gray-two">{info.time}</span>
                  </p>
                </div>
              ) : (
                <p className="flex items-start gap-1">
                  <img src={calender} alt="time" />
                  <span className="text-xs text-gray-two">{info.date}</span>
                </p>
              );
            })}
        </div>
      </div>
      <img src={upArrow} alt="arrow up" className="cursor-pointer" />
    </div>
  );
};

export default DetailCards;
