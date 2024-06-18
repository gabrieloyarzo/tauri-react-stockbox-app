import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Orden Completa', value: 56236 },
  { name: 'Orden Pendiente', value: 12596 },
  { name: 'Orden Cancelada', value: 12568 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const EstadisticasProductos = () => (
  <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
    <h3 style={{ textAlign: 'left'}}>Estadísticas de Productos</h3>
    <ResponsiveContainer width={500} height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
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
        <div key={`item-${index}`} style={{ color: COLORS[index % COLORS.length], marginTop: '10px' }}>
          {entry.name}: {entry.value}
        </div>
      ))}
    </div>
  </div>
);

export default EstadisticasProductos;
