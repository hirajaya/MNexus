import {
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
  } from "../../redux/api/orderApiSlice.js";
  
  import { useState } from "react";
  import Loader from "../../components/Loader";
  import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
  
  const OrderDashboard = () => {
    const { data: sales, isLoading: loadingSales, error: salesError } = useGetTotalSalesQuery();
    const { data: orders, isLoading: loadingOrders, error: ordersError } = useGetTotalOrdersQuery();
    const { data: salesByDate } = useGetTotalSalesByDateQuery();
  
    const [chartType, setChartType] = useState('bar');
  
    if (salesError || ordersError) {
      return <div>Error loading data.</div>;
    }
  
    return (
      <>
        <section className="xl:ml-[4rem] md:ml-[0rem]">
          <div className="w-[80%] flex justify-around flex-wrap">
            <div className="rounded-lg bg-white p-5 w-[20rem] mt-5">
              <div className="font-bold text-white rounded-full w-[3rem] bg-pink-500 text-center p-3">
                Rs
              </div>
              <p className="mt-5">Sales</p>
            </div>
            <div className="rounded-lg bg-white p-5 w-[20rem] mt-5">
              <div className="font-bold text-white rounded-full w-[3rem] bg-pink-500 text-center p-3">
                O
              </div>
              <p className="mt-5">All Orders</p>
              <h1 className="text-xl font-bold">
                {loadingOrders ? <Loader /> : orders?.totalOrders}
              </h1>
            </div>
          </div>
  
          <div className="mt-[4rem] flex flex-col items-center">
            <div className="mb-4">
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-pink-500 text-white' : 'bg-pink-200'}`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-pink-500 text-white' : 'bg-pink-200'} ml-2`}
              >
                Line Chart
              </button>
            </div>
            {salesByDate ? (
              chartType === 'bar' ? (
                <BarChart
                  width={800}
                  height={400}
                  data={salesByDate}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#FFB6C1" />
                </BarChart>
              ) : (
                <LineChart
                  width={800}
                  height={400}
                  data={salesByDate}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalSales" stroke="#FF69B4" />
                </LineChart>
              )
            ) : (
              <Loader />
            )}
          </div>
        </section>
      </>
    );
  };
  
  export default OrderDashboard;
  