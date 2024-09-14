import Order from "../models/order.js";
import Account from "../models/account.js";

const createOrder = async (req, res) => {
  try {
    await Order.sync();

    const user_id = req.user_id;

    const {
      order_type,
      order_status,
      quantity,
      entry_price,
      stop_loss_price,
      take_profit_price,
      pending_order_value,
    } = req.body;

    const quantity_in_usd = quantity * entry_price;

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.total_balance < quantity_in_usd) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await account.update({ total_balance: account.total_balance - quantity_in_usd });

    const order = await Order.create({
      order_type,
      order_status,
      quantity: quantity_in_usd,
      entry_price,
      stop_loss_price,
      take_profit_price,
      pending_order_value,
      creation_time: Date.now(),  
      account_id: account.account_id,
    });

    return res.json({ message: "Order created", data: order , "total balance": account.total_balance});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const modifyOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { take_profit_price, stop_loss_price } = req.body;

    if (take_profit_price == null && stop_loss_price == null) {
      return res.status(400).json({
        message: "Please provide either take profit or stop loss price",
      });
    } else if (take_profit_price && stop_loss_price) {
      await order.update({ take_profit_price, stop_loss_price });

      return res.json({ message: "Take profit and stop loss price updated" });
    } else if (take_profit_price) {
      await order.update({ take_profit_price });

      return res.json({ message: "Take profit price updated" });
    } else if (stop_loss_price) {
      await order.update({ stop_loss_price });

      return res.json({ message: "Stop loss price updated" });
    }
  } catch (err) {
    console.err(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const user_id = req.user_id;

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    if (account == null) {
      return res.status(404).json({ message: "Account not found" });
    }

    const orders = await Order.findAll({
      where: { account_id: account.account_id },
    });

    return res.json({
      message: "Orders retrieved successfully",
      orders: orders,
    });
  } catch (err) {
    console.err(err);
    res.status(500).json({ message: err.message });
  }
};

const closeOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const user_id = req.user_id;

    const { instrument_current_price_in_usd } = req.body;

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    const order = await Order.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order_close_value = order.quantity * instrument_current_price_in_usd;
    const order_open_value = order.quantity * order.entry_price;
    const profit_loss_amount = order_close_value - order_open_value;

    const account_new_balance = account.total_balance + profit_loss_amount + order_open_value;

    await account.update({
      total_balance: account_new_balance,
    });

    await order.update({
      order_status: "Closed",
      stop_loss_price: null,
      take_profit_price: null,
      completion_time: Date.now(),
    });

    return res.json({
      message: "Order Closed",
      data: order,
      profit_loss_amount: profit_loss_amount,
      account_new_balance: account_new_balance,
      message: "Account total balance modified",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// not used
const getOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ message: "Order found", data: order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createOrder, modifyOrder, closeOrder, getAllOrders };
