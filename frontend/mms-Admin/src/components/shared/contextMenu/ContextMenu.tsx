import { RefObject } from 'react';
import { useContextMenu } from '../../../hooks/useContextMenu';

type Props = {
  items: Array<string>;
  contextParent: RefObject<HTMLButtonElement>;
  onClick: (item: string) => void;
};

const ContextMenu = ({ items, contextParent, onClick }: Props) => {
  const { anchorPoint, isShown } = useContextMenu(contextParent);

  if (!isShown) {
    return null;
  }

  return (
    <ul
      className={"absolute border-1 border-solid border-r-2 p-1 w-40 list-none m-0 bg-lighterGreen-two left-[-100px]"}
      style={{ top: anchorPoint.y }}
    >
      {items.map((item) => (
        <li className={`cursor-pointer m-2`} key={item} onClick={() => onClick(item)}>{item}</li>
      ))}
    </ul>
  );
};

export { ContextMenu };