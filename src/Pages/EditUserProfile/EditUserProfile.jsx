import { UserInfoForm } from "../../Components/UserInfoForm/UserInfoForm";
import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";

export function EditUserProfile() {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(AuthService.getUserInfo());
  }, []);

  function onFormSubmit(formValues) {
    let request = {
      id: userInfo.id,
      ...formValues,
    };

    axios
      .put(`${API_URL}/user/update`, request)
      .then((response) => {
        axios
          .get(`${API_URL}/user/getById?id=${userInfo.id}`)
          .then((response) => {
            AuthService.saveUserInfo(response.data);
            setUserInfo(response.data);
            alert("Updated successfully :)");
          });
      })
      .catch((error) => {
        alert("Error updating the info :(");
      });
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <UserInfoForm onSubmit={onFormSubmit} userInfo={userInfo} />
      </div>
    </div>
  );
}
