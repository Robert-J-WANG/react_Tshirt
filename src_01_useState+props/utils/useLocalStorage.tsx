import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // console.log(key, initialValue); // shopping-cart, []
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    // console.log(jsonValue); // []
    if (jsonValue !== null) {
      // console.log(jsonValue); // [{"id":1,"quantity":1}]
      //JSON.parse 将 JSON 字符串作为输入并将其转换为 JavaScript 对象
      // console.log(JSON.parse(jsonValue)); // [{id:1,quantity:1}]
      return JSON.parse(jsonValue);
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      // console.log(initialValue); //[]
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  // console.log(value, setValue);
  return [value, setValue] as [typeof value, typeof setValue];
}
