import React, { useState, useEffect } from 'react';
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { Link } from "react-router-dom";
import { useGetOrdersQuery, useGetOrderCountByUserQuery } from "../../redux/api/orderApiSlice.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const { data: orderCounts } = useGetOrderCountByUserQuery();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [deliveryStatus, setDeliveryStatus] = useState("All");

  useEffect(() => {
    if (orders) {
      filterOrders();
    }
  }, [orders, searchQuery, dateRange, deliveryStatus]);

  const filterOrders = () => {
    const filtered = orders.filter((order, index) => {
      const customOrderId = generateCustomOrderId(index).toLowerCase();
      const orderDate = order.createdAt ? new Date(order.createdAt) : null;
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

      const matchesSearch = customOrderId.includes(searchQuery.toLowerCase());
      const matchesDateRange =
        (!startDate || (orderDate && orderDate >= startDate)) &&
        (!endDate || (orderDate && orderDate <= endDate));
      const matchesStatus =
        deliveryStatus === "All" ||
        (deliveryStatus === "Delivered" && order.isDelivered) ||
        (deliveryStatus === "Pending" && !order.isDelivered);

      return matchesSearch && matchesDateRange && matchesStatus;
    });

    setFilteredOrders(filtered);
  };

  const generateCustomOrderId = (index) => {
    const orderNumber = index + 1;
    return `O${String(orderNumber).padStart(3, "0")}`;
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Filtered Orders Report", 14, 16);

    const tableData = filteredOrders.map(order => [
      order.user ? order.user.username : "N/A",
      order.createdAt ? order.createdAt.substring(0, 10) : "N/A",
      order.isDelivered ? "Delivered" : "Pending",
      `Rs. ${order.totalPrice}`
    ]);

    doc.autoTable({
      head: [['Username', 'Date', 'Delivery Status', 'Total']],
      body: tableData,
      startY: 20,
    });

    doc.save("filtered_orders_report.pdf");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by OID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-1/3"
            />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="p-2 border rounded-md"
            />
            <select
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="All">All</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </select>
            <button onClick={generateReport} className="px-4 py-2 bg-blue-500 text-white rounded">
              Generate Report
            </button>
          </div>

          <table className="container mx-auto">
            <thead className="w-full border">
              <tr>
                <th className="text-left pl-1">ITEMS</th>
                <th className="text-left pl-1">ORDER ID</th>
                <th className="text-left pl-1">USER</th>
                <th className="text-left pl-1">DATE</th>
                <th className="text-left pl-1">TOTAL</th>
                <th className="text-left pl-1">DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order._id}>
                  <td>
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[5rem] pt-4"
                    />
                  </td>
                  
                  <td>{generateCustomOrderId(index)}</td> 

                  <td>{order.user ? order.user.username : "N/A"}</td>

                  <td>
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>

                  <td>Rs. {order.totalPrice}</td>

                  <td className="px-2 py-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-white text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button>More</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default OrderList;
