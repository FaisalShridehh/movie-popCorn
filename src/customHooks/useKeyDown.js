import { useEffect } from "react";

export function useKeyDown(key, callback) {
  useEffect(() => {
    function keyDownCallback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback();
        // console.log("keyDownCallback");
      }
    }

    document.addEventListener("keydown", keyDownCallback);
    return function () {
      document.removeEventListener("keydown", keyDownCallback);
    };
  }, [callback, key]);
}
