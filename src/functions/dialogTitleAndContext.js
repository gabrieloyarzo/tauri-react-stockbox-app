const deleteDialogTitleAndContext = (currentTable, data) => {
  switch (currentTable) {
    case "products":
      return {
        title: "Eliminar producto",
        content: `¿Está sesguro que desea eliminar el producto con código: ${data.cod}?`,
      };
    case "purchases":
      return {
        title: "Eliminar compra",
        content: `¿Está seguro que desea eliminar la compra con código: ${data.cod}?`,
      };
    case "sales":
      return {
        title: "Eliminar venta",
        content: `¿Está seguro que desea eliminar la venta con código: ${data.cod}?`,
      };
    case "providers":
      return {
        title: "Eliminar proveedor",
        content: `¿Está seguro que desea eliminar el proveedor con RUT: ${data.rutp}?`,
      };
    case "users":
      return {
        title: "Eliminar usuario",
        content: `¿Está seguro que desea eliminar el usuario con RUT: ${data.rutu}?`,
      };  
    case "refunds":
      return {
        title: "Eliminar devolución",
        content: `¿Está seguro que desea eliminar la devolución con código: ${data.codr}?`,
      };
    default:
      return {
        title: "Acción no reconocida",
        content: "El tipo de tabla o acción no coincide con ninguno especificado.",
      };
  }
};

export { deleteDialogTitleAndContext };