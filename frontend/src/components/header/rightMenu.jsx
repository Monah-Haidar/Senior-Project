import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import DepositModal from "../payment/depositModal.jsx";

function RightMenu() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const handleDepositClick = (modalName) => {
    const modal = document.getElementById(modalName);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center font-display font-semibold">
        {/* Deposit Button */}
        <Link
          className="btn btn-sm btn-primary rounded-xl"
          onClick={() => handleDepositClick("depositModal")}
        >
          Deposit
        </Link>

        {/* Deposit Modal */}
        <dialog id="depositModal" className="modal">
          <DepositModal />
        </dialog>

        {/* Profile */}
        <details className="dropdown dropdown-end bg-transparent">
          {/* Dropdown button */}
          <summary className="m-1 btn bg-transparent border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 dropdown"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

          </summary>

          {/* Dropdown content */}
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Link to="/journal">Trading Journal</Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </details>

        {/* Notifications */}
        <details
          className="dropdown dropdown-end bg-transparent"
          onClick={() => {
            fetch("http://localhost:3500/alerts/notifications", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json(); // Convert response to JSON format
              })
              .then((data) => {
                setNotifications(data);
                console.log(data);
              })
              .catch((error) => console.log("Error:", error));
          }}
        >
          {/* Dropdown button */}
          <summary className="m-1 btn bg-transparent border-0">
            {/* Use your NotificationSVG here */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              className="hidden xl:flex fill-current hover:text-primary"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </summary>

          {/* Dropdown content */}
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id}>
                  <p>{notification.message}</p>
                </li>
              ))
            ) : (
              <li>No notifications</li>
            )}
          </ul>
        </details>
      </div>
    </>
  );
}
export default RightMenu;
