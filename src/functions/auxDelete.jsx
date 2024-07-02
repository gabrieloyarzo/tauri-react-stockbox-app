import NotificationApi from "../services/api/notification.service";
import PurchaseApi from "../services/api/purchase.service";
import ProductApi from "../services/api/product.service";
import ProviderApi from "../services/api/provider.service";
import RefundApi from "../services/api/refund.service";
import SaleApi from "../services/api/sale.service";
import UserApi from "../services/api/user.service";

export const auxDelete = async ({ currentTable, id }) => {
  switch (currentTable) {
    case 'notifications':
      return await NotificationApi.deleteNotification(id);
    case 'purchases':
      return await PurchaseApi.deletePurchase(id);
    case 'products':
      return await ProductApi.deleteProduct(id);
    case 'providers':
      return await ProviderApi.deleteProvider(id);
    case 'refunds':
      return await RefundApi.deleteRefund(id);
    case 'sales':
      return await SaleApi.deleteSale(id);
    case 'users':
      return await UserApi.deleteUser(id);
    default:
      console.error("currentTable doesn't match any of the switch cases");
  }
};