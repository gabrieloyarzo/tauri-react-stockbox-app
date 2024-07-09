import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { Typography, Box } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';

const TopSoldProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { allProducts } } = await AnalyticApi.getAnalyticData();

        const nameCounts = allProducts.reduce((acc, { name, quantity }) => {
          if (!acc[name]) {
            acc[name] = {
              name,
              quantity: 0
            };
          }
          acc[name].quantity += quantity;
          return acc;
        }, {});

        const sortedProducts = Object.values(nameCounts)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 10);

        const totalQuantity = allProducts.reduce((total, { quantity }) => total + quantity, 0);

        const productData = sortedProducts.map(({ name, quantity }) => ({
          name,
          value: quantity,
          percentage: ((quantity / totalQuantity) * 100).toFixed(2),
        }));

        setData(productData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const customLabel = ({ x, y, value, index }) => (
    <text x={x} y={y} dy={-4} textAnchor="start" fill="#666" fontSize={12} fontWeight="bold">
      {`${data[index].name} (${data[index].percentage}%)`}
    </text>
  );

  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <Typography gutterBottom align="left" sx={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '30px' }}>
        Productos más vendidos
      </Typography>
      <ResponsiveContainer width="100%" height={259}>
        <BarChart layout="vertical" data={data} margin={{ top: 8, right: 5 }}>
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