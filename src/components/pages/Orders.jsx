import React, { useState, useEffect } from "react";
import OrderApi from "../../services/api/order.service";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import mockOrders from "../../../mock/orderMocks";

const Orders = () => {
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    // const orders = await OrderApi.getAllOrders();
    const orders = mockOrders;
    const products = await ProductApi.getAllProducts();

    setTableData(orders);
    setProducts(products.data);
    setProducts([
      ...new Set(
        products.data.map((item) => ({
          idp: item.idp,
          nombre: item.nombre,
        }))
      ),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainLayout
        currentTable="orders"
        data={tableData}
        fetchData={fetchData}
        products={products}
      />
    </>
  );
};

export default Orders;
