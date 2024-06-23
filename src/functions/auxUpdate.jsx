import ProviderApi from "../services/api/provider.service";
import UserApi from "../services/api/user.service";

export const auxUpdate = async (currentTable, id, status) => {
  console.log(id);
  console.log(status);
  switch (currentTable) {
    case 'users':
      return await UserApi.updateUser(id, status);
    case 'providers':
      return await ProviderApi.updateProvider(id, status);
    default:
      console.error("currentTable doesn't match any of the switch cases");
  }
};