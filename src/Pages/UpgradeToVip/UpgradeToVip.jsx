import { useEffect, useState } from "react";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import s from "./style.module.css";
import axios from "axios";
import { API_URL } from "../../config";
import { SubscriptionType } from "../../Components/SubscriptionType/SubscriptionType";
import { AuthService } from "../../Services/auth";

export function UpgradeToVip() {
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/lookup/getSubscriptionTypes`)
      .then((response) => setSubscriptionTypes(response.data))
      .catch((error) => alert("Can't load subscription types :("));
  }, []);

  function onSubscriptionRequest(subscriptionId, additionalInfo) {
    const request = {
      userId: AuthService.getUserInfo().id,
      subscriptionTypeId: subscriptionId,
      additionalInfo: additionalInfo,
    };
    axios
      .post(`${API_URL}/user/createVipRequest`, request)
      .then((response) =>
        alert(
          "Your request has been saved. Administrator will contact you soon :)"
        )
      )
      .catch((error) => alert("Can't save the request :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.title}>
        <h4>Choose one of the subscription types :)</h4>
      </div>
      <div className={s.subscriptionTypes}>
        {subscriptionTypes?.map((st) => (
          <SubscriptionType
            key={st.id}
            info={st}
            onRequest={onSubscriptionRequest}
          />
        ))}
      </div>
    </div>
  );
}
