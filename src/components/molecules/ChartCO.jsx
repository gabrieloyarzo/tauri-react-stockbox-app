import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import Typography from '@mui/material/Typography';
import AnalyticApi from '../../services/api/analytic.service';

const CommercialOperations = () => {
  const COLORS = ['#266763', '#FFBB28', '#D52A2A'];

  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const AnalyticData = await AnalyticApi.getAnalyticData();

        const data = [
          { name: 'Ventas', value: AnalyticData.data.countSales },
          { name: 'Compras', value: AnalyticData.data.countPurchases },
          { name: 'Devoluciones', value: AnalyticData.data.countRefunds }
        ]; 

        setAnalyticsData(data);
      } catch (error) {
        console.error("Error al obtener datos de analytics:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div style={{ width: '100%', height: '70%' }}>
      <Typography align="left" sx={{ fontSize: "20px", fontWeight: "bold", marginTop: "13px" }}>
      Operaciones Comerciales
      </Typography>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={analyticsData}
            cx="50%"
            cy="50%"
            innerRadius={15}
            outerRadius={35}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {analyticsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div>
        {analyticsData.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            <ListItemIcon>
              <LabelImportantRoundedIcon style={{ color: COLORS[index % COLORS.length] }} />
            </ListItemIcon>
            <span style={{ color: 'black' }}>{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommercialOperations;