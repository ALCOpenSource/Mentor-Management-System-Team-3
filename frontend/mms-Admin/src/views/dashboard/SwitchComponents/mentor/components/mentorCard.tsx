import { Mentor } from "../types";

const MentorsCard = ({ name, userImageLink, createdDate }: Mentor) => {
  return (
    <div
      key={name}
      className="flex justify-between items-center w-full border border-lightGray- min-h-[70px] px-5 py-3.5"
    >
      <div className="flex items-center gap-x-3.5">
        <img
          src={userImageLink}
          alt={name}
          className="w-[45px] h-[43px] object-cover rounded-full"
        />
        <div className="leading-5">
          <h6 className="text-[16px] font-semibold">{name}</h6>
          <p className="text-[12px]">{createdDate}</p>
        </div>
      </div>
      <button className="bg-green-three w-14 text-white rounded-[5px] text-[12px] font-normal">
        view
      </button>
    </div>
  );
};

export default MentorsCard;
