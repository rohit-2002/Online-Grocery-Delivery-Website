
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        const cleanedOrders = data.orders.filter((order) =>
          order.items.some((item) => item.product)
        );
        setOrders(cleanedOrders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-white">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-lg font-semibold text-gray-800">Orders List</h2>

        {!loading && orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <img
              src={
                assets.empty_icon ||
                "https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              }
              alt="No orders"
              className="mx-auto mb-4 w-20 h-20 opacity-50"
            />
            <p className="text-lg font-medium">No orders available</p>
            <p className="text-sm text-gray-400">
              You haven’t received any orders yet.
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="w-full max-w-5xl mx-auto border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 w-full md:w-[35%]">
                <img
                  className="w-14 h-14 object-cover rounded-md"
                  src={
                    order.items.find((item) => item.product)?.product
                      ?.image?.[0] ||
                    "https://cdn-icons-png.flaticon.com/512/543/543682.png"
                  }
                  alt="Product"
                />
                <div className="space-y-1">
                  {order.items.map(
                    (item, itemIndex) =>
                      item.product && (
                        <p
                          key={itemIndex}
                          className="text-sm font-medium text-black"
                        >
                          {item.product.name}{" "}
                          <span className="text-green-600 font-semibold">
                            × {item.quantity}
                          </span>
                        </p>
                      )
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="w-full md:w-[30%] text-sm text-gray-700">
                <p className="font-semibold text-black">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city}
                </p>
                <p>
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* Amount */}
              <div className="text-lg font-bold text-black w-full md:w-[10%]">
                {currency}
                {order.amount}
              </div>

              {/* Payment Info */}
              <div className="text-sm text-gray-600 w-full md:w-[25%] space-y-1">
                <p>Method: {order.paymentType}</p>
                <p>
                  Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
