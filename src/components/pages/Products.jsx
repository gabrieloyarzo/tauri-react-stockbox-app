import React, { useState, useEffect } from "react";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";

const Products = () => {
  const [tableData, setTableData] = useState(null);
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    const products = await ProductApi.getAllProducts();
    setTableData(products.data);
    setCategories([...new Set(products.data.map((item) => item.cat))])
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MainLayout
        currentTable="products"
        data={tableData}
        fetchData={fetchData}
        productsCategories={categories}
      />
    </>
  );
};

export default Products;
