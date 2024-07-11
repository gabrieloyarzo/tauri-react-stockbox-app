import SaleDetails from "../components/organisms/modals/SaleDetails";
import PurchaseDetails from "../components/organisms/modals/PurchaseDetails";
import RefundDetails from "../components/organisms/modals/RefundDetails";

const RenderModal = ({ currentTable, modalProps }) => {
  switch (currentTable) {
    case "purchases":
      return <PurchaseDetails {...modalProps} />;
    case "sales":
      return <SaleDetails {...modalProps} />;
    case "refunds":
      return <RefundDetails {...modalProps} />;
    default:
      return null;
  }
};

export default RenderModal;