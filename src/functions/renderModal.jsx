import SaleDetails from "../components/organisms/modals/SaleDetails";
import PurchaseDetails from "../components/organisms/modals/PurchaseDetails";
import RefundsDetails from "../components/organisms/modals/RefundsDetails";

const RenderModal = ({ currentTable, modalProps }) => {
  switch (currentTable) {
    case "purchases":
      return <PurchaseDetails {...modalProps} />;
    case "sales":
      return <SaleDetails {...modalProps} />;
    case "refunds":
      return <RefundsDetails {...modalProps} />;
    default:
      return null;
  }
};

export default RenderModal;