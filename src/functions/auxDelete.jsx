import ClientApi from "../services/api/client.service"
import NotificationApi from "../services/api/notification.service";
import OrderApi from "../services/api/order.service";
import ProductApi from "../services/api/product.service";
import ProviderApi from "../services/api/provider.service";
import RefundApi from "../services/api/refund.service";
import SaleApi from "../services/api/sale.service";
import UserApi from "../services/api/user.service";

export const auxDelete = async ({ currentTable, id }) => {
  switch (currentTable) {
    case 'clients':
      await ClientApi.deleteClient(id);
      break;
    case 'notifications':
      await NotificationApi.deleteNotification(id);
      break;
    case 'orders':
      await OrderApi.deleteOrder(id);
      break;
    case 'products':
      await ProductApi.deleteProduct(id);
      break;
    case 'providers':
      await ProviderApi.deleteProvider(id);
      break;
    case 'refunds':
      await RefundApi.deleteRefund(id);
      break;
    case 'sales':
      await SaleApi.deleteSale(id);
      break;
    case 'users':
      await UserApi.deleteUser(id);
      break;
    default:
      console.error("currentTable doesn't match any of the switch cases");
  }
};