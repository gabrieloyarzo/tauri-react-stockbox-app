import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';
import { formatNumber } from '../../functions/helpers';

const TendenciasVentas = () => {
  const [data, setData] = useState([]);
  const [totalCurrentYear, setTotalCurrentYear] = useState(0);
  const [totalPreviousYear, setTotalPreviousYear] = useState(0);

  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AnalyticApi.getAnalyticData();
        const salesData = response.data.datePriceSales.map(item => ({
          date: new Date(item.date),
          amount: item.total_price,
        }));

        const monthlySales = salesData.reduce((acc, data) => {
          const year = data.date.getFullYear();
          const month = data.date.toLocaleString('es-ES', { month: 'short' }).slice(0, 3);

          if (!acc[year]) {
            acc[year] = {};
          }
          if (!acc[year][month]) {
            acc[year][month] = 0;
          }
          acc[year][month] += data.amount;

          return acc;
        }, {});

        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        const formattedData = months.map(month => ({
          month,
          [previousYear]: monthlySales[previousYear] && monthlySales[previousYear][month.toLowerCase()] ? monthlySales[previousYear][month.toLowerCase()] : 0,
          [currentYear]: monthlySales[currentYear] && monthlySales[currentYear][month.toLowerCase()] ? monthlySales[currentYear][month.toLowerCase()] : 0,
        }));

        const totalPreviousYear = formattedData.reduce((sum, item) => sum + item[previousYear], 0);
        const totalCurrentYear = formattedData.reduce((sum, item) => sum + item[currentYear], 0);

        setData(formattedData);
        setTotalPreviousYear(totalPreviousYear);
        setTotalCurrentYear(totalCurrentYear);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [currentYear, previousYear]);

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <Typography gutterBottom align="left" sx={{ fontSize: "24px", fontWeight: "bold" }}>
        Tendencia de ventas
      </Typography>
      <Box sx={{ width: '100%', height: 325 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10 }}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${formatNumber(value)}`} />
            <Legend
              verticalAlign="top"
              align="left"
              height={50}
              payload={[
                { value: <span style={{ fontWeight: 'bold' }}>{`Año ${previousYear}`} <span style={{ color: 'black' }}>${formatNumber(totalPreviousYear)} -</span></span>, type: 'square', id: 'ID01', color: '#787878' },
                { value: <span style={{ fontWeight: 'bold' }}>{`Año ${currentYear}`} <span style={{ color: 'black' }}>${formatNumber(totalCurrentYear)}</span></span>, type: 'square', id: 'ID02', color: '#266763' },
              ]}
            />
            <Bar dataKey={previousYear.toString()} fill="#787878" name={`Año ${previousYear}`} />
            <Bar dataKey={currentYear.toString()} fill="#266763" name={`Año ${currentYear}`} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default TendenciasVentas;