import { ReactNode, useEffect, useRef, useState } from 'react';
import './accordion-item.css';

export type AccordionData = {
    title: string;
    content: ReactNode;
  };

function AccordionItem({
  data,
  isOpen,
  btnOnClick,
}: {
  data: AccordionData;
  isOpen: boolean;
  btnOnClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current as HTMLDivElement;

      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <h2 className="accordion-item-title">
        <button type='button' className="hover:shadow-inner transform hover:scale-105 hover:bg-opacity-80 transition ease-out duration-300 accordion-item-btn ms-5" onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className="accordion-item-container" style={{ height }}>
        <div ref={contentRef} className="accordion-item-content">
          {data.content}
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;