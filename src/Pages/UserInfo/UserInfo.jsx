import { useLocation } from "react-router-dom";
import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export function UserInfo() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  const [sex, setSex] = useState();
  const [currentUserImageUrl, setCurrentUserImageUrl] = useState();

  useEffect(() => {
    if (location?.state?.userId) {
      axios
        .get(`${API_URL}/user/getById?id=${location.state.userId}`)
        .then((response) => setUserInfo(response.data))
        .catch((error) => alert("Can't load user info :("));
    }

    axios.get(`${API_URL}/lookup/getSex`).then((response) => {
      setSex(response.data);
    });
  }, []);

  useEffect(() => {
    if (userInfo) {
      axios
        .get(`${API_URL}/user/getImage?userId=${userInfo.id}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          setCurrentUserImageUrl(url);
        })
        .catch((error) => {
          console.clear();
          setCurrentUserImageUrl("");
        });
    } else {
      setCurrentUserImageUrl("");
    }
  }, [userInfo]);

  function calculateAge(birthDate) {
    return Math.floor(
      (new Date() - new Date(birthDate).getTime()) / 3.15576e10
    );
  }

  if (userInfo)
    return (
      <div className={s.container}>
        <CustomNavbar />
        <div className={s.top}>
          <div className={s.topInfo}>
            <h2 className={s.name}>{userInfo.name}</h2>
            <span className={s.tag}>
              Age:{" "}
              {
                <span className={s.infoLine}>
                  {calculateAge(userInfo.birthDate)}
                </span>
              }
            </span>
            <span className={s.tag}>
              Sex:{" "}
              {
                <span className={s.infoLine}>
                  {sex.find((s) => s.id === userInfo.sexId).name}
                </span>
              }
            </span>
            <span className={s.tag}>
              Country:{" "}
              {<span className={s.infoLine}>{userInfo.country.name}</span>}
            </span>
            <span className={s.tag}>
              City: {<span className={s.infoLine}>{userInfo.city.name}</span>}
            </span>
            <div className={s.descriptionDiv}>
              <span className={s.tag}>Description: </span>
              <span className={s.infoLine}>{userInfo.description}</span>
            </div>
          </div>
          <div className={s.photo}>
            <img
              className={s.image}
              src={currentUserImageUrl}
              alt="No user photo"
            />
          </div>
        </div>
      </div>
    );
}
