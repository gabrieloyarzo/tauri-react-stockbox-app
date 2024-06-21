import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import Typography from '@mui/material/Typography';


const data = [
  { name: 'Orden Completa', value: 5636 },
  { name: 'Orden Pendiente', value: 1296 },
  { name: 'Orden Cancelada', value: 1258 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const EstadisticasProductos = () => (
  <div style={{ width: 'auto%', height: 'auto'}}>
    <Typography gutterBottom align="left" sx={{fontSize: "27px", fontWeight: "bold"}}>
      Estadísticas de Productos
    </Typography>
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div style={{paddingTop: '0px' }}>
      {data.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <LabelImportantRoundedIcon style={{ color: COLORS[index % COLORS.length] }} /> 
          </ListItemIcon>
          <span style={{ color: 'black' }}>{entry.name}: {entry.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default EstadisticasProductos;
