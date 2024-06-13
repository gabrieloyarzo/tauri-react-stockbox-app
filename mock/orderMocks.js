// Datos mockeados para pedidos
const mockOrders = [
  {
    id_pedido: 1,
    rut_proveedor: "12345678-9",
    rut_usuario: "98765432-1",
    fecha: "2023-06-01",
    compra_total: 150,
    detalle_pedido: [
      {
        id_pedido: 1,
        id_producto: "P001",
        cantidad: 2,
        precio_unidad: 50,
        precio_total: 100,
      },
      {
        id_pedido: 1,
        id_producto: "P002",
        cantidad: 1,
        precio_unidad: 50,
        precio_total: 50,
      },
    ],
  },
  {
    id_pedido: 2,
    rut_proveedor: "22334455-6",
    rut_usuario: "11223344-5",
    fecha: "2023-06-02",
    compra_total: 200,
    detalle_pedido: [
      {
        id_pedido: 2,
        id_producto: 201,
        cantidad: 4,
        precio_unidad: 50,
        precio_total: 200,
      },
    ],
  },
  {
    id_pedido: 3,
    rut_proveedor: "33445566-7",
    rut_usuario: "22334455-6",
    fecha: "2023-06-03",
    compra_total: 300,
    detalle_pedido: [
      {
        id_pedido: 3,
        id_producto: 301,
        cantidad: 3,
        precio_unidad: 100,
        precio_total: 300,
      },
    ],
  },
  {
    id_pedido: 4,
    rut_proveedor: "44556677-8",
    rut_usuario: "33445566-7",
    fecha: "2023-06-04",
    compra_total: 400,
    detalle_pedido: [
      {
        id_pedido: 4,
        id_producto: 401,
        cantidad: 2,
        precio_unidad: 150,
        precio_total: 300,
      },
      {
        id_pedido: 4,
        id_producto: 402,
        cantidad: 2,
        precio_unidad: 50,
        precio_total: 100,
      },
    ],
  },
  {
    id_pedido: 5,
    rut_proveedor: "55667788-9",
    rut_usuario: "44556677-8",
    fecha: "2023-06-05",
    compra_total: 500,
    detalle_pedido: [
      {
        id_pedido: 5,
        id_producto: 501,
        cantidad: 5,
        precio_unidad: 100,
        precio_total: 500,
      },
    ],
  },
  {
    id_pedido: 6,
    rut_proveedor: "66778899-0",
    rut_usuario: "55667788-9",
    fecha: "2023-06-06",
    compra_total: 600,
    detalle_pedido: [
      {
        id_pedido: 6,
        id_producto: 601,
        cantidad: 3,
        precio_unidad: 200,
        precio_total: 600,
      },
    ],
  },
  {
    id_pedido: 7,
    rut_proveedor: "77889900-1",
    rut_usuario: "66778899-0",
    fecha: "2023-06-07",
    compra_total: 700,
    detalle_pedido: [
      {
        id_pedido: 7,
        id_producto: 701,
        cantidad: 7,
        precio_unidad: 100,
        precio_total: 700,
      },
    ],
  },
  {
    id_pedido: 8,
    rut_proveedor: "88990011-2",
    rut_usuario: "77889900-1",
    fecha: "2023-06-08",
    compra_total: 800,
    detalle_pedido: [
      {
        id_pedido: 8,
        id_producto: 801,
        cantidad: 4,
        precio_unidad: 200,
        precio_total: 800,
      },
    ],
  },
  {
    id_pedido: 9,
    rut_proveedor: "99001122-3",
    rut_usuario: "88990011-2",
    fecha: "2023-06-09",
    compra_total: 900,
    detalle_pedido: [
      {
        id_pedido: 9,
        id_producto: 901,
        cantidad: 6,
        precio_unidad: 150,
        precio_total: 900,
      },
    ],
  },
  {
    id_pedido: 10,
    rut_proveedor: "10011223-4",
    rut_usuario: "99001122-3",
    fecha: "2023-06-10",
    compra_total: 1000,
    detalle_pedido: [
      {
        id_pedido: 10,
        id_producto: 1001,
        cantidad: 10,
        precio_unidad: 100,
        precio_total: 1000,
      },
    ],
  },
];

export default mockOrders;
