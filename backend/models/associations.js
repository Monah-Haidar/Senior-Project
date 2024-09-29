// import sequelize from "./config";
import User from "./user.js";
import Account from "./account.js";
import Instrument from "./instrument.js";
import Watchlist from "./watchlist.js";
import Order from "./order.js";
import Transaction from "./transaction.js";
import Alert from "./alert.js";
import JournalEntrie from "./journalEntrie.js";

export function setupAssociations() {
  User.hasMany(Account, { foreignKey: "user_id", onDelete: "CASCADE" });
  Account.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(JournalEntrie, { foreignKey: "user_id", onDelete: "CASCADE"  });
  JournalEntrie.belongsTo(User, { foreignKey: "user_id" });

  Account.hasMany(Order, { foreignKey: "account_id", onDelete: "CASCADE" });
  Order.belongsTo(Account, { foreignKey: "account_id" });

  Account.hasMany(Alert, { foreignKey: "account_id", onDelete: "CASCADE" });
  Alert.belongsTo(Account, { foreignKey: "account_id" });

  Account.hasMany(Transaction, { foreignKey: "account_id", onDelete: "CASCADE" });
  Transaction.belongsTo(Account, { foreignKey: "account_id" });


  Account.hasMany(Watchlist, { foreignKey: "account_id", onDelete: "CASCADE" });
  Watchlist.hasMany(Instrument, { foreignKey: "watchlist_id", onDelete: "SET NULL" });
  Instrument.belongsTo(Watchlist, { foreignKey: "watchlist_id" });
}
