import { Table } from "react-bootstrap";
import s from "./style.module.css";
import moment from "moment";
import { CheckSquareFill, XSquareFill } from "react-bootstrap-icons";

export function SubscriprionRequestsTable({ requests, onApprove, onDecline }) {
  return (
    <div className={s.container}>
      <Table hover variant="dark">
        <thead>
          <tr>
            <th>Created At</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Subscription Type</th>
            <th>Additional Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((r) => (
            <tr key={r.id}>
              <td>
                {moment(new Date(r.createDateTime)).format("DD.MM.YYYY HH:mm")}
              </td>
              <td>{r.user.name}</td>
              <td>{r.user.email}</td>
              <td>{r.subscriptionType.name}</td>
              <td>
                <div className={s.additionalInfo}>{r.additionalInfo}</div>
              </td>
              <td>
                <div className={s.icons}>
                  <CheckSquareFill
                    className={s.icon}
                    fill="#74bbca"
                    size={22}
                    onClick={() => onApprove(r.id)}
                  />
                  <XSquareFill
                    className={s.icon}
                    fill="#74bbca"
                    size={22}
                    onClick={() => onDecline(r.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
