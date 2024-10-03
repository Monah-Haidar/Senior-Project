import cron from "node-cron";
import Order from "../models/order.js";
import Account from "../models/account.js";
import Instrument from "../models/instrument.js";

const cronJobLimitOrder = () => {
  // Schedule a job to run every minute
  cron.schedule("* * * * *", async () => {
    try {
      // Fetch all pending orders
      const pendingOrders = await Order.findAll({
        where: { order_status: "Pending" },
      });

      if (pendingOrders.length === 0) return;

      // Fetch the latest BTC price
      const btc = await Instrument.findOne({ where: { symbol: "BTC" } });
      if (!btc) {
        console.log("BTC not found");
        return;
      }
      const btcPrice = btc.price;

      for (const order of pendingOrders) {
        // Check if the entry price matches the instrument's current price
        if (btcPrice >= order.entry_price) {
          const account = await Account.findOne({
            where: { account_id: order.account_id },
          });

          if (account && account.total_balance >= order.quantity) {
            // Update order status to "Open"
            await order.update({ order_status: "Open" });

            // Deduct the order quantity from the account balance
            await account.update({
              total_balance: account.total_balance - order.quantity,
            });

            console.log(
              `Order ${order.order_id} is now open, and the account balance has been updated.`
            );
          } else {
            console.log(
              `Insufficient balance for account ${order.account_id} or account not found.`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error checking orders:", error);
    }
  });
};

export default cronJobLimitOrder;
