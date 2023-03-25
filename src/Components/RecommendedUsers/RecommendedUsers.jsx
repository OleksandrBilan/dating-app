import axios from "axios";
import { useEffect, useState } from "react";
import { CaretRightFill, HeartFill } from "react-bootstrap-icons";
import { API_URL } from "../../config";
import s from "./style.module.css";

export function RecommendedUsers({ users }) {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [sex, setSex] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/lookup/getSex`).then((response) => {
      setSex(response.data);
    });
  }, []);

  useEffect(() => {
    if (users && Array.isArray(users) && users.length > 0) {
      setCurrentUserIndex(0);
    }
  }, [users]);

  function calculateAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }

  function setNextUser() {
    if (currentUserIndex === users.length - 1) {
      alert(
        "That's the last recommended user \n(set some other search filters to see more users)"
      );
    } else {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  }

  function onLike() {
    setNextUser();
  }

  function onSkip() {
    setNextUser();
  }

  if (users[currentUserIndex]) {
    return (
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.topInfo}>
            <h2 className={s.name}>{users[currentUserIndex].name}</h2>
            <span className={s.tag}>
              Age:{" "}
              {
                <span className={s.infoLine}>
                  {calculateAge(users[currentUserIndex].birthDate)}
                </span>
              }
            </span>
            <span className={s.tag}>
              Sex:{" "}
              {
                <span className={s.infoLine}>
                  {sex.find((s) => s.id === users[currentUserIndex].sexId).name}
                </span>
              }
            </span>
            <span className={s.tag}>
              Country:{" "}
              {
                <span className={s.infoLine}>
                  {users[currentUserIndex].country.name}
                </span>
              }
            </span>
            <span className={s.tag}>
              City:{" "}
              {
                <span className={s.infoLine}>
                  {users[currentUserIndex].city.name}
                </span>
              }
            </span>
            <div className={s.descriptionDiv}>
              <span className={s.tag}>Description: </span>
              <span className={s.infoLine}>
                {users[currentUserIndex].description}
              </span>
            </div>
          </div>
          <div className={s.photo}>
            <img
              className={s.image}
              src="https://picsum.photos/1000/1500"
              alt="User Avatar"
            />
          </div>
        </div>
        <div className={s.buttons}>
          <HeartFill fill="red" size={30} className={s.icon} onClick={onLike} />
          <CaretRightFill
            fill="gray"
            size={35}
            className={s.icon}
            onClick={onSkip}
          />
        </div>
      </div>
    );
  } else {
    return (
      <h4>
        Set up the Search Filters and press Apply to see recommended people :)
      </h4>
    );
  }
}
