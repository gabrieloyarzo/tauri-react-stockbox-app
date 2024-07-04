import {
  iProduct,
  iUser,
  iPurchase,
  iProvider,
  iSales,
  iRefund,
} from "./dataStructure";

export const invAdapterType = (key, currentTable) => {
  switch (currentTable) {
    case "products":
      return iProduct[key][1];
    case "users":
      return iUser[key][1];
    case "purchases":
      return iPurchase[key][1];
    case "providers":
      return iProvider[key][1];
    case "sales":
      return iSales[key][1];
    case "refunds":
      return iRefund[key][1];
    default:
      return "string";
  }
};
