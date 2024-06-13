import SaleDetails from "../components/organisms/modals/SaleDetails";
import OrderDetails from "../components/organisms/modals/OrderDetails";

const RenderModal = ({ currentTable, modalProps }) => {
  switch (currentTable) {
    case "orders":
      return <OrderDetails {...modalProps} />;
    case "sales":
      return <SaleDetails {...modalProps} />;
    default:
      return null;
  }
};

export default RenderModal;