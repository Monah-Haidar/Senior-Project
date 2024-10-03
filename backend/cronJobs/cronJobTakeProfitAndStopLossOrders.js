import Order from "../models/order.js";
import Account from "../models/account.js";
import Instrument from "../models/instrument.js";
import cron from "node-cron";

const cronJobTakeProfitAndStopLossOrders = () => {
  cron.schedule("* * * * *", async () => {
    try {
      // fetch orders
      console.log("ENTERED Cron Job");
      const openOrders = await Order.findAll({
        where: { order_status: "Open" },
      });

      if (openOrders.length === 0) return;

      // fetch current instrument price
      const btc = await Instrument.findOne({ where: { symbol: "BTC" } });
      if (!btc) {
        console.log("BTC not found");
        return;
      }
      const btcPrice = btc.price;
      console.log("BTC PRICE: ", btcPrice);
      for (const order of openOrders) {
        // fetch account
        const account = await Account.findOne({
          where: { account_id: order.account_id },
        });
        if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }

        // check if stop loss or take profit triggered
        if (
          order.stop_loss_price - 100 <=
            btcPrice <=
            order.stop_loss_price + 100 ||
          order.take_profit_price - 10 <=
            btcPrice <=
            order.take_profit_price + 10
        ) {
          // update order status to closed
          await order.update({
            order_status: "Closed",
            completion_time: Date.now(),
            close_price: btcPrice,
          });

          // update account balance

          const orderValue = order.quantity / order.entry_price;

          const newBalance = account.total_balance + orderValue * btcPrice;

          await account.update({ total_balance: newBalance });

          console.log(`Take profit or stop loss triggered at ${btcPrice}`);

          //   return res.status(200).json({
          //     message: "Take profit or stop loss triggered",
          //   });
        }
      }
    } catch (error) {
      console.error("Failed during scheduled task:", error);
    }
  });
};

export default cronJobTakeProfitAndStopLossOrders;
