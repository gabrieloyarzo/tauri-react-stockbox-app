import OrderForm from "../components/organisms/forms/OrderForm";
import ProductForm from "../components/organisms/forms/ProductForm";

const RenderForm = ({ currentTable, formProps }) => {
  switch (currentTable) {
    case "products":
      return <ProductForm {...formProps} />;
    case "orders":
      return <OrderForm {...formProps} />;
    default:
      return null;
  }
};

export default RenderForm;