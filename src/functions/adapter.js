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
      return Object.keys(iProduct).find((key) => iProduct[key] === value);
    case "users":
      return Object.keys(iUser).find((key) => iUser[key] === value);
    case "purchases":
      return Object.keys(iPurchase).find((key) => iPurchase[key] === value);
    case "providers":
      return Object.keys(iProvider).find((key) => iProvider[key] === value);
    case "sales":
      return Object.keys(iSales).find((key) => iSales[key] === value);
    case "refunds":
      return Object.keys(iRefund).find((key) => iRefund[key] === value);
    default:
      return value;
  }
};
