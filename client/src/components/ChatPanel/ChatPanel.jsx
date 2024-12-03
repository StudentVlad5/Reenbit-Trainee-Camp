import { useEffect, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/auth/selectors";
import { useParams } from "react-router-dom";
import { deleteMessage, getMessage, sendMessage } from "../../services/api";
import { MdDelete } from "react-icons/md";

export const ChatPanel = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [listMessages, setListMessages] = useState([]);

  const user_id = useSelector(selectId);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMessage({ whom: id, from: user_id }).then(function (result) {
        setListMessages(result.data);
      });
    }
  }, [id, user_id, status]);

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

  const handleInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteMessage(e.currentTarget.dataset.info).then(function (result) {
      setStatus(result.data);
    });
  };

  return (
    <div className="ChatPanel">
      <h1>Title</h1>
      <div>Chat content</div>

      <div className="wrapper1">
        {listMessages.length > 0 &&
          listMessages.map((it) => {
            return (
              <ul key={it._id}>
                <li>{it.text}</li>
                <li>
                  {
                    Date(it.data)
                      .toLocaleString("en-GB", { timeZone: "UTC" })
                      .split("GMT")[0]
                  }
                </li>
                <li data-info={it._id} onClick={(e) => handleDelete(e)}>
                  <MdDelete />
                </li>
              </ul>
            );
          })}
        <div className="wrapper2">
          <input
            placeholder="Type your message"
            onChange={(e) => handleInput(e)}
            className="inputField field"
            value={message || ""}
          />
          <FaRegArrowAltCircleRight onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
