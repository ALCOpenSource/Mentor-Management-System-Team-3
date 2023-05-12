import "./accordion.css";
import AccordionItem, { AccordionData } from "./accordion-item";
import { useState } from "react";

function Accordion({ items }: { items: Array<AccordionData> }) {
  const [currentIdx, setCurrentIdx] = useState(-1);

  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue: number) => (currentValue !== idx ? idx : -1));
  };

  return (
    <ul className="accordion">
      {items.map((item, idx) => {
               
        //console.log(idx, currentIdx, item);
        return (
          <AccordionItem
            key={idx}
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
