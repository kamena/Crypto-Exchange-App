import React, { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
