import s from "./style.module.css";
import { CustomNavbar } from "../../Components/common/CustomNavbar/CustomNavbar";
import { SubscriprionRequestsTable } from "../../Components/SubscriprionRequestsTable/SubscriprionRequestsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export function AdminSubscriptions() {
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/admin/getVipRequests`)
      .then((response) => setSubscriptionRequests(response.data))
      .catch((error) => alert("Can't load subscription requests :("));
  }, []);

  function removeSubscriptionRequest(id) {
    let newRequest = subscriptionRequests.filter((r) => r.id !== id);
    setSubscriptionRequests(newRequest);
  }

  function onRequestApprove(requestId) {
    axios
      .post(`${API_URL}/admin/approveVipRequest`, { requestId: requestId })
      .then((response) => {
        removeSubscriptionRequest(requestId);
        alert("Approved successfully :)");
      })
      .catch((error) => alert("Can't approve the request :("));
  }

  function onRequestDecline(requestId) {
    axios
      .delete(`${API_URL}/admin/declineVipRequest?requestId=${requestId}`)
      .then((response) => {
        removeSubscriptionRequest(requestId);
        alert("Declined successfully :)");
      })
      .catch((error) => alert("Can't decline the request :("));
  }

  return (
    <div className={s.container}>
      <CustomNavbar />
      <div className={s.card}>
        <div className={s.title}>
          <h4>VIP subscription requests:</h4>
        </div>
        <SubscriprionRequestsTable
          requests={subscriptionRequests}
          onApprove={onRequestApprove}
          onDecline={onRequestDecline}
        />
      </div>
    </div>
  );
}
