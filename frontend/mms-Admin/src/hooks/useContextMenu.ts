import { useEffect, useCallback, useState, RefObject } from "react";

type AnchorPoint = {
  x: number;
  y: number;
};

const useContextMenu = (contextParent: RefObject<HTMLButtonElement>) => {
  const [anchorPoint, setAnchorPoint] = useState<AnchorPoint>({ x: 0, y: 0 });
  const [isShown, setIsShow] = useState(false);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      if (contextParent.current != null && contextParent.current === document.activeElement) {
        event.preventDefault();
        setAnchorPoint({ x: event.pageX - 160, y: event.pageY });
        setIsShow(true);
      }
    },
    [setIsShow, setAnchorPoint, contextParent]
  );

  const handleClick = useCallback(() => {
    if (isShown) {
      setIsShow(false);
    }
  }, [isShown]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { anchorPoint, isShown };
};

export { useContextMenu };
