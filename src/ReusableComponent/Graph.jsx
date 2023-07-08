import React,{ useRef } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart,Bar,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';



export const BarGraph = () => {
  const data = [
    { name: 'Category A', value: 10 },
    { name: 'Category B', value: 20 },
    { name: 'Category C', value: 15 },
  ];

  return (
    <div>
      <h2>Bar Graph</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="tomato" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
let Graph = () => {

  const data = [
    { Month: 'Jan', Revenue: 1000 },
    { Month: 'Feb', Revenue: 2000 },
    { Month: 'Mar', Revenue: 1500 },
    { Month: 'Apr', Revenue: 3000 },
    { Month: 'May', Revenue: 2500 },
  ];
  return (
    <div className='graph' style={{width : "900px",display:'flex',flexDirection : 'column',justifyContent:'center',alignItems:'center',letterSpacing:'2px',fontWeight :'bold'}}>
      <h3 style={{marginTop: '20px',marginBottom:'30px',color:'grey'}}>Total Revenue generated</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="tomato" stopOpacity={0.8} />
              <stop offset="100%" stopColor="tomato" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="tomato"
            strokeWidth={3}
            dot={{ fill: 'tomato', r: 5, strokeWidth: 2, stroke: 'white' }}
            fill="url(#gradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;