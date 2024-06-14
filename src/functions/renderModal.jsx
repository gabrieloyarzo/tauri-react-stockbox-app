import SaleDetails from "../components/organisms/modals/SaleDetails";
import PurchaseDetails from "../components/organisms/modals/PurchaseDetails";

const RenderModal = ({ currentTable, modalProps }) => {
  switch (currentTable) {
    case "purchases":
      return <PurchaseDetails {...modalProps} />;
    case "sales":
      return <SaleDetails {...modalProps} />;
    default:
      return null;
  }
};

export default RenderModal;