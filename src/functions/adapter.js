import {
  iProduct,
  iUser,
  iPurchase,
  iProvider,
  iSales,
  iRefund,
} from "./dataStructure";

export const adapter = (value, currentTable) => {
  switch (currentTable) {
    case "products":
      return Object.keys(iProduct).find((key) => iProduct[key][0] === value);
    case "users":
      return Object.keys(iUser).find((key) => iUser[key][0] === value);
    case "purchases":
      return Object.keys(iPurchase).find((key) => iPurchase[key][0] === value);
    case "providers":
      return Object.keys(iProvider).find((key) => iProvider[key][0] === value);
    case "sales":
      return Object.keys(iSales).find((key) => iSales[key][0] === value);
    case "refunds":
      return Object.keys(iRefund).find((key) => iRefund[key][0] === value);
    default:
      return value;
  }
};
