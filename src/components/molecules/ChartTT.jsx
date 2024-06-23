import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { Typography, Box } from '@mui/material';
import ProductApi from '../../services/api/product.service';

const TopSoldProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const limit = 10;
      let offset = 0;
      let allProducts = [];
      let hasMoreProducts = true;

      while (hasMoreProducts) {
        try {
          const { data: products } = await ProductApi.getAllProducts({ limit, offset, dato: 'idp', orden: 'asc' });
          allProducts = [...allProducts, ...products];

          if (products.length < limit) {
            hasMoreProducts = false;
          } else {
            offset += limit;
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          hasMoreProducts = false;
        }
      }

      const nameCounts = allProducts.reduce((acc, { nombre }) => {
        acc[nombre] = (acc[nombre] || 0) + 1;
        return acc;
      }, {});

      const totalCount = allProducts.length;

      const productData = Object.keys(nameCounts).map(name => ({
        name,
        value: nameCounts[name],
        percentage: ((nameCounts[name] / totalCount) * 100).toFixed(2)
      }));

      setData(productData);
    };

    fetchAllProducts();
  }, []);

  const customLabel = ({ x, y, value, index }) => (
    <text x={x} y={y} dy={-4} textAnchor="start" fill="#666" fontSize={12} fontWeight="bold">
      {`${data[index].name} (${data[index].percentage}%)`}
    </text>
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography gutterBottom align="left" sx={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '30px' }}>
        Productos más vendidos
      </Typography>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 5 }}>
          <XAxis type="number" tick={false} axisLine={false} />
          <YAxis type="category" dataKey="name" tick={false} axisLine={false} />
          <Bar dataKey="value" fill="#266763" barSize={7}>
            <LabelList content={customLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopSoldProducts;
