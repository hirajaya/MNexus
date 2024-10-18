import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useGetTopProductsQuery,
} from "../../redux/api/orderApiSlice.js";
import { useGetApprovedInquiriesQuery } from '../../redux/features/inquiries/inquiriesApiSlice';
import { useState } from "react";
import Loader from "../../components/Loader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalesDashboard = () => {
  const { data: sales, isLoading: loadingSales, error: salesError } = useGetTotalSalesQuery();
  const { data: orders, isLoading: loadingOrders, error: ordersError } = useGetTotalOrdersQuery();
  const { data: salesByDate } = useGetTotalSalesByDateQuery();
  const { data: approvedInquiries } = useGetApprovedInquiriesQuery();
  const { data: topProducts, isLoading: loadingTopProducts } = useGetTopProductsQuery();

  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const calculateDeductionForApprovedInquiries = () => {
    if (!approvedInquiries) return 0;
    return approvedInquiries.reduce((totalDeduction, inquiry) => {
      const inquiryItemPrice = inquiry.orderID.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      return totalDeduction + inquiryItemPrice;
    }, 0);
  };

  const totalApprovedInquiriesDeduction = calculateDeductionForApprovedInquiries();

  if (salesError || ordersError) {
    return <div>Error loading data.</div>;
  }

  // Filter sales by date range
  const filterSalesByDateRange = (sales) => {
    if (!dateRange.startDate || !dateRange.endDate) return sales;
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    return sales.filter((sale) => {
      const saleDate = new Date(sale._id);
      return saleDate >= start && saleDate <= end;
    });
  };

  const filteredSalesByDate = salesByDate ? filterSalesByDateRange(salesByDate) : [];

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Total Sales", "Orders"];
    const tableRows = filteredSalesByDate.map(sale => [
      sale._id,
      sale.totalSales,
      sale.orderCount // assuming orderCount is part of the sale object
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Filtered Sales Report", 14, 15);
    doc.save("filtered_sales_report.pdf");
  };

  return (
    <>
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-white p-5 w-[20rem] mt-5">
            <div className="font-bold text-white rounded-full w-[3rem] bg-pink-500 text-center p-3">
              Rs
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              Rs {loadingSales ? <Loader /> : (sales.totalSales - totalApprovedInquiriesDeduction).toFixed(2)}
            </h1>
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
          {/* Date Range Inputs */}
          <div className="mb-4 flex gap-4">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="p-2 border rounded-lg"
            />
          </div>

          {/* Chart Type Buttons */}
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

          {/* Chart Display */}
          {filteredSalesByDate.length > 0 ? (
            chartType === 'bar' ? (
              <BarChart
                width={800}
                height={400}
                data={filteredSalesByDate}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
                data={filteredSalesByDate}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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

          {/* Export to PDF Button */}
          <button onClick={exportToPDF} className="mt-5 p-2 bg-pink-500 text-white rounded-lg">
            Export to PDF
          </button>
        </div>

        {/* Top Products Table */}
        <div className="mt-10 w-full flex justify-center">
          <div className="w-[50%] max-w-[600px]">
            <h2 className="text-center text-xl font-bold mb-4">Top Products</h2>
            {loadingTopProducts ? (
              <Loader />
            ) : (
              <table className="min-w-full table-auto bg-white border border-gray-200 text-center">
                <thead>
                  <tr className="bg-pink-100 border-b">
                    <th className="py-2 px-4 border-r">Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts?.map((product) => (
                    <tr key={product.productId} className="border-b">
                      <td className="py-2 px-4 border-r">{product.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SalesDashboard;
