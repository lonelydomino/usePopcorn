import { useEffect, useRef } from "react";
import useKey from "../custom hooks/useKey";

export const Search = ({ query, setQuery }) => {

  useKey("enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  } )

  const inputEl = useRef(null);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
