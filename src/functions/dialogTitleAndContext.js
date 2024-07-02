const deleteDialogTitleAndContext = (currentTable) => {
  switch (currentTable) {
    case "products":
      return {
        title: "Eliminar producto",
        content: `¿Está seguro que desea eliminar el producto?`,
      };
    case "purchases":
      return {
        title: "Eliminar compra",
        content: `¿Está seguro que desea eliminar la compra?`,
      };
    case "sales":
      return {
        title: "Eliminar venta",
        content: `¿Está seguro que desea eliminar la venta?`,
      };
    case "providers":
      return {
        title: "Eliminar proveedor",
        content: `¿Está seguro que desea eliminar el proveedor?`,
      };
    case "users":
      return {
        title: "Eliminar usuario",
        content: `¿Está seguro que desea eliminar el usuario?`,
      };
    case "refunds":
      return {
        title: "Eliminar devolución",
        content: `¿Está seguro que desea eliminar la devolución?`,
      };
    default:
      return {
        title: "Acción no reconocida",
        content: "El tipo de tabla o acción no coincide con ninguno especificado.",
      };
  }
};

export { deleteDialogTitleAndContext };