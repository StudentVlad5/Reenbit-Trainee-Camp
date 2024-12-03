import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export const SearchPanel = ({ setFilterListUsers, listUsers }) => {
  const [text, setText] = useState("");

  useEffect(
    (_) => {
      if (text === "" && text?.length < 1) {
        setFilterListUsers([...listUsers]);
      } else {
        setFilterListUsers(
          listUsers.filter((it) =>
            it.userName.toLowerCase().includes(text.toLowerCase())
          )
        );
      }
    },
    [listUsers]
  );

  useEffect(
    (_) => {
      if (text === "" && text?.length < 1) {
        setFilterListUsers([...listUsers]);
      }
      const v = setTimeout(request, 1000);
      return (_) => clearTimeout(v);
    },
    [text]
  );

  const request = () => {
    if (text) {
      setFilterListUsers(
        listUsers.filter((it) =>
          it.userName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div className="wrapper1">
      <div className="wrapper2">
        <CiSearch />
        <input
          placeholder="Search or start new chat"
          onChange={(e) => handleInput(e)}
          className="inputField field"
          value={text || ""}
        />
      </div>
    </div>
  );
};
