import { useContext, useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/auth/selectors";
import { useParams } from "react-router-dom";
import {
  deleteMessage,
  getMessage,
  sendMessage,
  editMessage,
} from "../../services/api";
import { MdDelete } from "react-icons/md";
import { AlwaysScrollToBottom } from "../../services/AlwaysScrollToBottom";
import { FaCheck } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "../Modal/Modal";
import { CheckMessageContext } from "../App";

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusEdit, setStatusEdit] = useState(false);
  const [idNumberEdit, setIdNumberEdit] = useState(null);
  const [textEdit, setTextEdit] = useState(null);
  const [listMessages, setListMessages] = useState([]);

  const user_id = useSelector(selectId);
  const { id } = useParams();
  const { statusGet } = useContext(CheckMessageContext);

  useEffect(() => {
    if (id) {
      getMessage({ whom: id, from: user_id }).then(function (result) {
        setListMessages(result.data);
      });
    }
  }, [id, user_id, status, statusGet]);

  const handleSubmit = () => {
    const data = {
      text: message,
      from: user_id,
      whom: id,
      data: Date.now(),
    };
    sendMessage(data).then(function (result) {
      setMessage("");
      setStatus(result.data);
    });
  };
  const submitEditMessage = () => {
    const data = {
      text: textEdit,
      id: idNumberEdit,
    };
    editMessage(data).then(function (result) {
      setTextEdit(null);
      setStatusEdit(false);
      setStatus(result.data);
    });
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  };
  const handleEditInput = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    setTextEdit(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleKeyDownEdit = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteMessage(e.currentTarget.dataset.info).then(function (result) {
      setStatus(result.data);
    });
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    setIdNumberEdit(e.currentTarget.dataset.info);
    setTextEdit(e.currentTarget.dataset.text);
    setStatusEdit(true);
  };

  return (
    <div className="ChatPanel">
      <h1>Chat</h1>
      <h4>Content</h4>

      <div className="wrapper1 chatContent">
        {listMessages &&
          listMessages.map((it) => {
            return (
              <div style={{ width: "100%" }} key={it._id}>
                <ul className={user_id === it.whom ? "leftSide" : "rightSide"}>
                  <li>
                    {it.text}{" "}
                    <FaPencilAlt
                      className="editMessage"
                      data-info={it._id}
                      data-text={it.text}
                      onClick={(e) => handleEdit(e)}
                    />
                  </li>
                  <li className="deleteBucket">
                    <span>
                      {
                        new Date(it.data)
                          .toLocaleString("en-GB", { timeZone: "UTC" })
                          .split("GMT")[0]
                      }
                    </span>
                    <span data-info={it._id} onClick={(e) => handleDelete(e)}>
                      <MdDelete />
                    </span>
                  </li>
                </ul>
              </div>
            );
          })}
        <AlwaysScrollToBottom />
        <div className="wrapper2 inputMessagePosition">
          <input
            placeholder="Type your message"
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="inputField field"
            value={message || ""}
          />
          <FaRegArrowAltCircleRight onClick={handleSubmit} />
        </div>
      </div>
      {statusEdit && (
        <Modal closeFunction={setStatusEdit}>
          {listMessages.map((it) => {
            if (it._id === idNumberEdit) {
              return (
                <div
                  key={it._id}
                  className="containerEditMessage"
                  onClick={(e) => e.stopPropagation()}
                >
                  {" "}
                  <input
                    placeholder="Type your message"
                    onChange={(e) => handleEditInput(e)}
                    onKeyDown={(e) => handleKeyDownEdit(e)}
                    className=""
                    value={textEdit || ""}
                  />
                  <FaCheck onClick={(e) => submitEditMessage(e)} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </Modal>
      )}
    </div>
  );
};
