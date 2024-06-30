import {
  iProduct,
  iUser,
  iPurchase,
  iProvider,
  iSales,
  iRefund,
} from "./dataStructure";

export const adapter = (columns, currentTable) => {
  switch (currentTable) {
    case "products":
      return columns.map((item) => iProduct[item]).filter(Boolean);
    case "users":
      return columns.map((item) => iUser[item]).filter(Boolean);
    case "purchases":
      return columns.map((item) => iPurchase[item]).filter(Boolean);
    case "providers":
      return columns.map((item) => iProvider[item]).filter(Boolean);
    case "sales":
      return columns.map((item) => iSales[item]).filter(Boolean);
    case "refunds":
      return columns.map((item) => iRefund[item]).filter(Boolean);
    default:
      return columns;
  }
};
