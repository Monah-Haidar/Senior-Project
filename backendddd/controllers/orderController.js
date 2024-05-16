import Order from "../models/order.js";
import Account from "../models/account.js";

// leverage , cross, long 
const createOrder = async (req,res)=>{
    try{
        await Order.sync();
        const user_id = req.user_id
        const account_type = req.body.account_type
        const account = await Account.findOne({where:{UserUserId:user_id, account_type:account_type}})
        if (account == null){
            res.status(404).json({"message":"Account not found"})
        }
        const {order_type, quantity, entry_price, completion_time, stop_loss_price, take_profit_price, trigger_value,instrument_symbol } = req.body
        const order = await Order.create({order_type, quantity, entry_price, completion_time, stop_loss_price, take_profit_price, trigger_value, instrument_symbol, account_id:account.account_id })
        res.json({"message":"Order created", "data":order})
    }
    catch(err){
        res.status(500).json({"message":err.message})
    }
}

const getOrder = async (req,res)=>{
    try{
        const id = req.params.id
        const order = await Order.findByPk(id)
        if (!order){
            res.status(404).json({"message":"Order not found"})
        }
        else{
            res.json({"message":"Order found", "data":order})
        }
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}

const getAllOrders = async (req,res)=>{
    try{
        const user_id = req.user_id 
        const account_type = req.body.account_type
        const account = await Account.findOne({where:{UserUserId:user_id, account_type}})
        if (account == null){
            res.status(404).json({"message":"Account not found"})
        }
        const orders = await Order.findAll({where:{account_id:account.account_id}})
        res.json(orders)
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}

const updateOrder = async (req,res)=>{
    const id = req.params.id;
    const order = await Order.findByPk(id)

    if (!order){
        res.status(404).json({"message":"Order not found"})
    }
    const {take_profit_price, stop_loss_price} = req.body

    if (take_profit_price == null && stop_loss_price == null) {
      res
        .status(400)
        .json({
          message: "Please provide either take profit or stop loss price",
        });
    } else if (take_profit_price && stop_loss_price) {
      await order.update({ take_profit_price, stop_loss_price });
      res.json({ message: "Take profit and stop loss price updated" });
    }
     else if (take_profit_price) {
      await order.update({ take_profit_price });
      res.json({ message: "Take profit price updated" });
    } else if (stop_loss_price) {
      await order.update({ stop_loss_price });
      res.json({ message: "Stop loss price updated" });
    }
    
}

const updateStatus = async (req,res)=>{
    const id = req.params.id
    const order = await Order.findByPk(id)
    if (!order){
        res.status(404).json({"message":"Order not found"})
    }
    const order_status = "Closed"
    await order.update({order_status})
    res.json({"message":"Order status closed", "data":order})
}

const updateBalance = (req,res)=>{
    const id = req.params.id
}
export {createOrder, getOrder,getAllOrders, updateOrder, updateStatus}