import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../services/api";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/auth/selectors";
import { CheckMessageContext } from "../App";

export const SearchPanel = ({ setFilterListUsers, listUsers }) => {
  const [text, setText] = useState("");
  const [talkButtonStatus, setTalkButtonStatus] = useState(true);
  const id = useParams();
  const user_id = useSelector(selectId);
  const { setStatusGet } = useContext(CheckMessageContext);


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

  const startChat = () => {
    if (talkButtonStatus) {
      if (id && id?.id?.length) {
        const data = {
          text: "Let's start talking...",
          from: user_id,
          whom: id.id,
          data: Date.now(),
          autoanswer: true,
        };
        sendMessage(data);
        setStatusGet((prev) => !prev);
      } else {
        alert("Please, choose chat");
      }
    }
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
      <button className="talkButton" type="button" aria-label="start talk">
        {" "}
        <RiKakaoTalkFill
          onClick={() => setTalkButtonStatus((prev) => !prev)}
          style={{ width: "25px", height: "25px" }}
          className={talkButtonStatus ? "green" : "black"}
        />
        <span onClick={() => startChat()}>Start</span>
      </button>
    </div>
  );
};
