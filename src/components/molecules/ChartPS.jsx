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

const COLORS = ['#266763', '#FFBB28', '#D52A2A'];

const EstadisticasProductos = () => (
  <div style={{ width: 'auto%', height: 'auto'}}>
    <Typography align="left" sx={{fontSize: "25px", fontWeight: "bold"}}>
      Estadísticas de Productos
    </Typography>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          fill="#8884d8"
          paddingAngle={4}
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
    <div>
      {data.map((entry, index) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginLeft:'15px'}}>
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
