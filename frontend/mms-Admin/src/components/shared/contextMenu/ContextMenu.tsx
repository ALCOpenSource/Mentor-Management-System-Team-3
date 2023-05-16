import { RefObject } from 'react';
import { useContextMenu } from '../../../hooks/useContextMenu';
import './ContextMenu.css';

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
      className={'ContextMenu'}
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      {items.map((item) => (
        <li key={item} onClick={() => onClick(item)}>{item}</li>
      ))}
    </ul>
  );
};

export { ContextMenu };