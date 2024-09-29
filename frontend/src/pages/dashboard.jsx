import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DepositModal from "../components/payment/depositModal";
import WithdrawlModal from "../components/payment/withdrawlModal";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
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
          }))
        );

        // Fetch all data in parallel
        const results = await Promise.allSettled(requests);

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { key, data } = result.value;
            console.log("Data fetched:", result.value);
            switch (key) {
              case "transactions":
                setTransactions(data.transactions);
                break;
              case "balance":
                setBalance(data["Total Balance"]);
                break;
              case "orders":
                setOrders(data.orders);
                console.log("Orders:", data.orders);
                break;
              case "alerts":
                setAlerts(data.alerts);
                break;
              // case "positions":
              //   setPositions(data.positions);
              //   break;
              default:
                break;
            }
          } else {
            console.error(
              `Error fetching ${result.reason.config.url}:`,
              result.reason.message
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

  // const filteredMarketData = watchlist.filter((item) => {
  //   return localStorage.getItem(item.name) === "true";
  // });

  // console.log("watchlist: ", watchlist);
  // console.log("filtered market data: ", filteredMarketData);

  return (
    <>
      <div className="flex flex-col items-center gap-10 pt-4 pb-6">
        {/* estimated balance */}
        <div className="bg-primary w-3/4 rounded-3xl flex flex-col">
          <div className="stats text-primary-content">
            <div className="stat">
              <div className="stat-title">Current balance</div>

              <div className="stat-value text-gray-500">
                {balance !== null ? `$${balance}` : "Loading..."}
              </div>

              <div className="stat-actions flex gap-3">
                <button
                  className="btn btn-sm"
                  onClick={() => handleDepositClick("withdrawlModal")}
                >
                  Withdrawal
                </button>

                <button
                  className="btn btn-primary btn-sm"
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
        
        {/* watch list
        <div className="flex flex-col gap-5 overflow-x-auto rounded-3xl bg-white w-3/4">
          <h1 className="text-left pl-6 pt-4 stat-title">Watchlist</h1>
          <div className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Symbol</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarketData.map((item, index) => (
                <tr key={index}>
                  <th>1</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>BTC</td>
                </tr>
              ))}
            </tbody>
          </div>
        </div> */}

        {/* positions */}
        {/* <div className="flex flex-col gap-5 overflow-x-auto rounded-3xl bg-white w-3/4">
          <h1 className="text-left pl-6 pt-4 stat-title">Positions</h1>

          <div className="table">
            <thead>
              <tr>
                <th></th>
                <th>Quantity</th>
                <th>Order Status</th>
                <th>Symbol</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((item, index) => (
                <tr key={index}>
                  <th>{index}</th>
                  <td>{item.quantity}</td>
                  <td>{item.order_status}</td>
                  <td>{item.symbol}</td>
                </tr>
              ))}
            </tbody>
          </div>
        </div> */}

        {/* orders */}
        <div className="flex flex-col gap-5 overflow-x-auto rounded-3xl bg-white w-3/4">
          <h1 className="text-left pl-6 pt-4 stat-title">Open Orders</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Type</th>
                  <th>Order Status</th>
                  <th>Quantity</th>
                  <th>Trigger Value</th>
                  <th>Stop Loss</th>
                  <th>Take Profit</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.order_id}</td>
                    <td>{order.order_type}</td>
                    <td>{order.order_status}</td>
                    <td>{order.quantity}$</td>
                    <td>{order.pending_order_value ? order.pending_order_value : "---"}</td>
                    <td>{order.stop_loss_price ? order.stop_loss_price : "---"}</td>
                    <td>
                      {order.take_profit_price ? order.take_profit_price : "---"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="flex flex-col gap-5 overflow-x-auto rounded-3xl bg-white w-3/4">
          <h1 className="text-left pl-6 pt-4 stat-title">Alerts</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Threshold Price</th>
                  <th>Status</th>
                  <th>Message</th>
                  <th>Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => (
                  <tr key={index}>
                    <td>{alert.threshold} $</td>
                    <td>{alert.message}</td>
                    <td>{alert.status}</td>
                    <td>{alert.expiration_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="flex flex-col gap-5 overflow-x-auto rounded-3xl bg-white w-3/4">
          <h1 className="text-left pl-6 pt-4 stat-title">
            Recent transactions
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.transaction_id}</td>
                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                    {/* <td>{transaction.timestamp}</td> */}
                    <td>{transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.payment_method}</td>
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
