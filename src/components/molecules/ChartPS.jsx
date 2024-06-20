import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Orden Completa', value: 5636 },
  { name: 'Orden Pendiente', value: 1296 },
  { name: 'Orden Cancelada', value: 1258 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const EstadisticasProductos = () => (
  <div style={{ width: '100%', height: 'auto', paddingTop: '20px' }}>
    <h3 style={{ textAlign: 'left'}}>Estadísticas de Productos</h3>
    <ResponsiveContainer width="100%" height={200}>
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
    <div>
      {data.map((entry, index) => (
        <div key={`item-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  </div>
);

export default EstadisticasProductos;
