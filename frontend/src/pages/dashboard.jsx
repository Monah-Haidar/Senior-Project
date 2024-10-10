import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DepositModal from "../components/payment/depositModal";
import WithdrawlModal from "../components/payment/withdrawlModal";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  // const [watchlist, setWatchlist] = useState([]);
  // const [positions, setPositions] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define URLs for requests
        const urls = {
          transactions: "/transaction/all",
          balance: "/account/balance",
          orders: "/order/all",
          alerts: "/alert/all",
          // positions: "/positions",
        };

        // Create all fetch requests
        const requests = Object.keys(urls).map((key) =>
          axiosPrivate.get(urls[key]).then((response) => ({
            key,
            data: response.data,
          })),
        );

        // Fetch all data in parallel
        const results = await Promise.allSettled(requests);

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { key, data } = result.value;
            // console.log("Data fetched:", result.value);
            switch (key) {
              case "transactions":
                setTransactions(data.transactions);
                break;
              case "balance":
                setBalance(data["Total Balance"]);
                break;
              case "orders":
                setOrders(data.orders);
                setOpenOrders(
                  data.orders.filter(
                    (order) => order.order_status !== "Closed",
                  ),
                );
                // console.log("Orders:", data.orders);
                break;
              case "alerts":
                setAlerts(data.alerts);
                // console.log("Alerts:", data.alerts);
                break;
              
              default:
                break;
            }
          } else {
            console.error(
              `Error fetching ${result.reason.config.url}:`,
              result.reason.message,
            );
          }
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleDepositClick = (modalName) => {
    const modal = document.getElementById(modalName);
    if (modal) {
      modal.showModal();
    }
  };

  const handleCloseOrder = async (id) => {
    const closedOrder = orders.find((order) => order.order_id === id);
    if (closedOrder) {
      try {
        setOpenOrders(
          orders.filter((order) => order.order_status !== "Closed"),
        );
        await axiosPrivate.post(`/order/close/${id}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteAlert = async (id) => {
    // console.log("Deleting alert:", id);
    const closedAlert = alerts.find((alert) => alert.alert_id === id);
    // console.log("Deleted Alert:", closedAlert);
    if (closedAlert) {
      try {
        await axiosPrivate.delete(`/alert/${id}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="mx-auto mb-40 mt-10 flex w-9/12 flex-col gap-16">
        {/* estimated balance */}
        <div className="flex w-full lg:w-6/12 xl:w-4/12 flex-col overflow-hidden rounded-3xl shadow-lg">
          <div className="stats bg-gradient-to-r from-blue-300 to-purple-600 p-4 text-primary-content">
            <div className="stat">
              <div className="stat-title text-2xl font-bold text-white">
                Current Balance
              </div>

              <div className="stat-value mt-4 text-5xl font-bold text-gray-100">
                {balance !== null ? `$${balance}` : "Loading..."}
              </div>

              <div className="stat-actions mt-4 flex gap-3">
                <button
                  className="mt-4 w-28 rounded-md bg-gradient-to-r from-gray-500 to-gray-700 py-2 font-semibold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                  onClick={() => handleDepositClick("withdrawlModal")}
                >
                  Withdrawal
                </button>

                <button
                  className="mt-4 w-28 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 py-2 font-semibold text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-700"
                  onClick={() => handleDepositClick("depositModal")}
                >
                  Deposit
                </button>

                <dialog id="depositModal" className="modal">
                  <DepositModal />
                </dialog>

                <dialog id="withdrawlModal" className="modal">
                  <WithdrawlModal />
                </dialog>
              </div>
            </div>
          </div>
        </div>

        {/* orders */}
        <div className="flex w-full flex-col gap-5 overflow-x-auto rounded-lg bg-white shadow-2xl">
          <h1 className="pl-3 pt-4 text-left text-2xl font-semibold text-gray-800">
            Open Orders
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="table-responsive">
            <table className="w-full table-auto border-collapse overflow-hidden rounded-lg bg-white text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-sm uppercase tracking-wider text-white dark:bg-gray-800 dark:text-white">
                  <th className="px-6 py-4 text-center font-medium">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Order Type
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Order Status
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Trigger Value
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Stop Loss
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Take Profit
                  </th>
                  <th className="px-6 py-4 text-center font-medium">
                    Close Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {openOrders.map((order, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } duration-50 transform transition ease-in-out hover:scale-[1.02] hover:bg-gray-200`}
                  >
                    <td className="border-b border-gray-100 px-6 py-4 text-center font-semibold text-gray-800">
                      {order.order_id}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-800">
                      {order.order_type}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-800">
                      {order.order_status}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-800">
                      {order.quantity}$
                    </td>
                    <td className="border-b px-4 py-3 text-center">
                      {order.entry_price
                        ? order.entry_price + "$"
                        : order.pending_order_value}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-800">
                      {order.stop_loss_price ? order.stop_loss_price : "---"}$
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-center text-gray-800">
                      {order.take_profit_price
                        ? order.take_profit_price
                        : "---"}
                      $
                    </td>
                    <td>
                      <button
                        className="flex w-full justify-center border-b border-gray-100 px-6 py-4 text-gray-800"
                        onClick={() => handleCloseOrder(order.order_id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="flex w-full flex-col gap-5 overflow-x-auto bg-white shadow-2xl">
          <h1 className="pl-3 pt-4 text-left text-2xl font-semibold text-gray-800">
            Alerts
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="table-responsive">
            <table className="w-full table-auto border-collapse overflow-hidden rounded-lg bg-white text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-sm uppercase tracking-wider text-white dark:bg-gray-800 dark:text-white">
                  <th className="px-6 py-4 font-medium">Threshold Price</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                  <th className="px-6 py-4 font-medium">Expiration Date</th>
                  <th className="px-6 py-4 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } duration-50 transform transition ease-in-out hover:scale-[1.02] hover:bg-gray-200`}
                  >
                    <td className="border-b border-gray-100 px-6 py-4 font-semibold text-gray-800">
                      {alert.threshold}$
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {alert.status}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {alert.message}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {new Date(alert.expiration_date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "2-digit" },
                      )}
                    </td>
                    <td>
                      <button
                        className="ml-3 border-b border-gray-100 px-6 py-4 text-gray-800"
                        onClick={() => handleDeleteAlert(alert.alert_id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="flex w-full flex-col gap-5 overflow-x-auto bg-white shadow-2xl">
          <h1 className="pl-3 pt-4 text-left text-2xl font-semibold text-gray-800">
            Recent transactions
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="table-responsive">
            <table className="w-full table-auto border-collapse overflow-hidden rounded-lg bg-white text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-sm uppercase tracking-wider text-white dark:bg-gray-800 dark:text-white">
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } duration-50 transform transition ease-in-out hover:scale-[1.02] hover:bg-gray-200`}
                  >
                    <td className="border-b border-gray-100 px-6 py-4 font-semibold text-gray-800">
                      {transaction.transaction_id}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {new Date(transaction.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 font-semibold text-gray-800">
                      {transaction.amount}$
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {transaction.type}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {transaction.status}
                    </td>
                    <td className="border-b border-gray-100 px-6 py-4 text-gray-800">
                      {transaction.payment_method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
