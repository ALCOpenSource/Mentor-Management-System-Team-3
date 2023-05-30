import { getRandomInteger } from "../../services/mathFunctions";
import AccordionItem, { AccordionData } from "./accordion-item";
import { useState } from "react";

function Accordion({ items }: { items: Array<AccordionData> }) {
  const [currentIdx, setCurrentIdx] = useState(-1);

  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue: number) => (currentValue !== idx ? idx : -1));
  };
  const intValue = getRandomInteger(0,100000000);
  return (
    <ul className="list-none p-0 m-0 h-full w-full">
      {items.map((item, idx) => {               
        //console.log(idx, currentIdx, item);
        return (
          <AccordionItem
            key={idx + intValue}
            data={item}
            isOpen={idx === currentIdx}
            btnOnClick={() => btnOnClick(idx)}
          />
        );
      })}
    </ul>
  );
}

export default Accordion;
