import React, { useEffect } from 'react';
import { useGetProductCountQuery, useGetTopProductsQuery, useGetNewProductsQuery } from '../../redux/api/productApiSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryDashboard = () => {
  const { data: productCountData, isLoading, error } = useGetProductCountQuery();
  const { data: topProducts } = useGetTopProductsQuery();
  const { data: newProducts } = useGetNewProductsQuery();

  useEffect(() => {}, [productCountData]);

  const chartData = {
    labels: productCountData?.map(product => product.name) || [],
    datasets: [
      {
        label: 'Product Stock Count',
        data: productCountData?.map(product => product.quantity) || [],
        backgroundColor: 'rgba(255, 105, 180, 0.2)',
        borderColor: 'rgba(255, 105, 180, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
  };

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Our Products</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>
          <h2 style={{ textAlign: 'center', color: 'pink' }}>Top Products</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'pink' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {topProducts?.map(product => (
                <tr key={product._id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{product.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2 style={{ textAlign: 'center', color: 'pink' }}>New Products</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'pink' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {newProducts?.map(product => (
                <tr key={product._id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{product.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
