import { UserInfoForm } from "../../Components/UserInfoForm/UserInfoForm";
import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { AuthService } from "../../Services/auth";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import { ImageUploadForm } from "../../Components/ImageUploadForm/ImageUploadForm";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function EditUserProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [userImageUrl, setUserImageUrl] = useState();

  useEffect(() => {
    const user = AuthService.getUserInfo();
    setUserInfo(user);
    axios
      .get(`${API_URL}/user/getImage?userId=${user.id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setUserImageUrl(url);
      });
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

  function onImageUpload(file) {
    const formData = new FormData();
    formData.append("image", file);
    axios({
      method: "post",
      url: `${API_URL}/user/uploadImage?userId=${userInfo.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => alert("Image uploaded successfully :)"))
      .catch((error) => alert("Error uploading the image :("));
  }

  function onAccountDelete() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`${API_URL}/user/delete?id=${userInfo.id}`)
        .then((response) => {
          AuthService.deleteAuthTokenCookie();
          AuthService.removeAuthTokenFromAxios();
          navigate("/login");
        })
        .catch((error) => {
          alert("Can't delete the account :(");
        });
    }
  }

  function onUserImageDelete() {
    if (window.confirm("Are you sure you want to delete your account image?")) {
      axios
        .delete(`${API_URL}/user/deleteImage?userId=${userInfo.id}`)
        .then((response) => {
          setUserImageUrl("");
        })
        .catch((error) => {
          alert("Can't delete the image :(");
        });
    }
  }

  function onViewProfile() {
    navigate("/userInfo", {
      state: {
        userId: userInfo.id,
      },
    });
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <div className={s.title}>
          <h4>Profile image</h4>
        </div>
        <div className={s.middleInfo}>
          <ImageUploadForm
            onSubmit={onImageUpload}
            previewImageUrl={userImageUrl}
          />
        </div>
        <div className={s.buttonsDiv}>
          <Button variant="danger" onClick={onUserImageDelete}>
            Delete profile image
          </Button>
        </div>
      </div>
      <div className={s.card}>
        <div className={s.title}>
          <h4>Profile info</h4>
        </div>
        <div className={s.middleInfo}>
          <UserInfoForm onSubmit={onFormSubmit} userInfo={userInfo} />
        </div>
        <div className={s.buttonsDiv}>
          <Button variant="secondary" onClick={onViewProfile}>
            View my profile
          </Button>
          <Button variant="danger" onClick={onAccountDelete}>
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}
