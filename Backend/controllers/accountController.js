import Account from "../models/account.js";


const createAccount = async (req, res) => {
  try {
    await Account.sync();
    const { account_type, total_balance, instrument_symbol } = req.body;
    const user_id = req.user_id
    //const existingUser = await Account.findOne({ where: { email } });
    const existingAccount = await Account.findAll({ where: { UserUserId:user_id, account_type:account_type } });
    
    if (existingAccount.length > 0) {
      return res.status(400).json({ message: "Account already exists" });
    }
      const account = await Account.create({
        account_type,
        total_balance,
        instrument_symbol,
        UserUserId:user_id
      });
      res.json(account);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllAccounts = async (req, res) => {
  try {
    const user_id = req.user_id
    const accounts = await Account.findAll({where:{UserUserId:user_id}});
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_balance } = req.body;
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    account.total_balance = total_balance;
    await account.update({ total_balance });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getAccount = (req,res) =>{
    const id = req.params.id
    const account = Account.findByPk(id)
    if (!account){
        res.status(404).json({"message":"Account not found"})
    }else{
        res.json(account)
    }
}

export { createAccount, getAllAccounts, updateBalance, getAccount }