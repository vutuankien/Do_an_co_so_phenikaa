// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaCheckCircle, FaTrashAlt, FaBoxOpen } from "react-icons/fa";
// import "./Bill.css";

// const Bill = () => {
//   const [orders, setOrders] = useState([]);
//   const userId = localStorage.getItem("userUID")?.replace(/"/g, "");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(
//           `https://backend-doancoso.onrender.com/bill/api/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Error when getting order list");
//         }
//         const data = await response.json();
//         console.log("Orders:", data);
//         setOrders(data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchOrders();
//   }, [userId]);

//   const handleCancelOrder = async (orderId) => {
//     if (window.confirm("Are you sure you want to cancel this order?")) {
//       try {
//         await fetch(
//           `https://backend-doancoso.onrender.com/bill/api/delete/${orderId}`,
//           {
//             method: "DELETE",
//           }
//         );
//         setOrders((prevOrders) =>
//           prevOrders.filter((order) => order._id !== orderId)
//         );
//       } catch (error) {
//         console.error("Error deleting order:", error);
//       }
//     }
//   };

//   const handleReceiveOrder = async (orderId) => {
//     if (window.confirm("Are you sure you received the item?")) {
//       try {
//         await fetch(
//           `https://backend-doancoso.onrender.com/bill/api/update/${orderId}`,
//           {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status: "Shipped" }),
//           }
//         );

//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status: "Shipped" } : order
//           )
//         );
//       } catch (error) {
//         console.error("Error updating order:", error);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-left w-full">Your orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         <div className="bill space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="bill-element relative bg-white p-4 rounded-lg border space-y-2"
//             >
//               {order.status === "Shipped" && (
//                 <FaCheckCircle className="absolute top-2 right-2 text-green-500 text-xl" />
//               )}

//               <div className="flex justify-between items-center border-b pb-2">
//                 <h3
//                   className="text-lg font-semibold"
//                   style={{ color: "#fb9dab" }}
//                 >
//                   ID: #{order._id.slice(-6)}
//                 </h3>
//                 <p className="text-gray-500 text-sm">
//                   {new Date(order.orderDate).toLocaleString()}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 {order.bills.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-20 h-20 overflow-hidden rounded-lg">
//                         <Link to={`/product/${item.productId}`}>
//                           <img
//                             src={item.image}
//                             alt={item.productName}
//                             className="w-full h-full object-cover"
//                           />
//                         </Link>
//                       </div>
//                       <div>
//                         <p className="text-gray-700 font-medium">
//                           {item.productName}
//                         </p>
//                         <p className="text-gray-500">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-gray-500">
//                       $
//                       {parseFloat(item.price.replace(/[^0-9.]/g, "")).toFixed(
//                         2
//                       )}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-2">
//                 <div className="flex justify-between text-lg font-medium">
//                   <span>Shipping:</span>
//                   <span className="text-right">$4.00</span>
//                 </div>
//                 <div
//                   className="flex justify-between text-lg font-bold"
//                   style={{ color: "#fb9dab" }}
//                 >
//                   <span>Total: ({order.paymentMethod})</span>
//                   <span className="text-right">
//                     $
//                     {parseFloat(
//                       order.totalPrice.replace(/[^0-9.]/g, "")
//                     ).toFixed(2)}
//                     {/* Money: {order.totalPrice} */}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mt-2">
//                 <p className="text-gray-700 flex items-center gap-2">
//                   <svg
//                     fill="#000000"
//                     height="50px"
//                     width="50px"
//                     version="1.1"
//                     id="Layer_1"
//                     xmlns="http://www.w3.org/2000/svg"
//                     xmlns:xlink="http://www.w3.org/1999/xlink"
//                     viewBox="0 0 512 512"
//                     xml:space="preserve"
//                   >
//                     <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                     <g
//                       id="SVGRepo_tracerCarrier"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     ></g>
//                     <g id="SVGRepo_iconCarrier">
//                       {" "}
//                       <g>
//                         {" "}
//                         <g>
//                           {" "}
//                           <path d="M509.473,256.394l-59.391-67.801c-1.937-2.21-4.733-3.479-7.672-3.479h-49.455v-41.872 c0-5.633-4.567-10.199-10.199-10.199H172.109c-5.632,0-10.199,4.566-10.199,10.199v13.762H63.818 c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h98.092v132.21h-59.046 c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h59.046v10.365c0,5.633,4.567,10.199,10.199,10.199 h21.288c4.485,16.339,19.459,28.382,37.203,28.382c17.744,0,32.718-12.043,37.204-28.382h136.089v-0.001 c4.485,16.339,19.459,28.382,37.203,28.382c17.744,0,32.718-12.043,37.204-28.382h23.502c5.632,0,10.199-4.566,10.199-10.199 v-77.261C512,260.642,511.101,258.253,509.473,256.394z M230.6,358.558c-10.026,0-18.182-8.157-18.182-18.183 s8.156-18.183,18.182-18.183s18.183,8.157,18.183,18.183S240.626,358.558,230.6,358.558z M267.802,330.176 c-4.485-16.339-19.46-28.382-37.204-28.382s-32.717,12.043-37.203,28.382h-11.089V153.44h190.247v176.736H267.802z M441.094,358.558c-10.026,0-18.182-8.157-18.182-18.183s8.156-18.183,18.182-18.183c10.026,0,18.183,8.157,18.183,18.183 S451.121,358.558,441.094,358.558z M491.602,330.176h-13.304c-4.485-16.339-19.46-28.382-37.204-28.382 c-17.744,0-32.717,12.043-37.203,28.382h-10.939V205.512h44.831l53.818,61.437V330.176z"></path>{" "}
//                         </g>{" "}
//                       </g>{" "}
//                       <g>
//                         {" "}
//                         <g>
//                           {" "}
//                           <path d="M69.261,309.611h-5.442c-5.632,0-10.199,4.566-10.199,10.199c0,5.633,4.567,10.199,10.199,10.199h5.442 c5.632,0,10.199-4.566,10.199-10.199C79.46,314.177,74.894,309.611,69.261,309.611z"></path>{" "}
//                         </g>{" "}
//                       </g>{" "}
//                       <g>
//                         {" "}
//                         <g>
//                           {" "}
//                           <path d="M119.5,232.276H10.199C4.567,232.276,0,236.842,0,242.475c0,5.633,4.567,10.199,10.199,10.199H119.5 c5.632,0,10.199-4.566,10.199-10.199C129.699,236.842,125.132,232.276,119.5,232.276z"></path>{" "}
//                         </g>{" "}
//                       </g>{" "}
//                     </g>
//                   </svg>
//                   {order.address}
//                 </p>

//                 <div className="flex gap-4">
//                   {/* Nút Cancel chỉ hiển thị nếu status là "Pending" */}
//                   {order.status === "Pending" && (
//                     <button
//                       onClick={() => handleCancelOrder(order._id)}
//                       className="flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white"
//                     >
//                       <FaTrashAlt /> Cancel
//                     </button>
//                   )}

//                   {/* Nút Received chỉ hiển thị nếu status là "Shipping" */}
//                   {order.status === "Shipping" && (
//                     <button
//                       onClick={() => handleReceiveOrder(order._id)}
//                       className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       <FaBoxOpen /> Received
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bill;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTrashAlt, FaBoxOpen } from "react-icons/fa";
import "./Bill.css";

const Bill = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userUID")?.replace(/"/g, "");
  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${API}/bill/api/${userId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error when getting order list");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, [userId, API]);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await fetch(`${API}/bill/api/delete/${orderId}`, {
          method: "DELETE",
          credentials: "include",
        });
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const handleReceiveOrder = async (orderId) => {
    if (window.confirm("Are you sure you received the item?")) {
      try {
        await fetch(`${API}/bill/api/update/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "Shipped" }),
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Shipped" } : order
          )
        );
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-left w-full">Your orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="bill space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bill-element relative bg-white p-4 rounded-lg border space-y-2"
            >
              {order.status === "Shipped" && (
                <FaCheckCircle className="absolute top-2 right-2 text-green-500 text-xl" />
              )}

              <div className="flex justify-between items-center border-b pb-2">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#fb9dab" }}
                >
                  ID: #{order._id.slice(-6)}
                </h3>
                <p className="text-gray-500 text-sm">
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                {order.bills.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 overflow-hidden rounded-lg">
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          {item.productName}
                        </p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500">
                      $
                      {parseFloat(item.price.replace(/[^0-9.]/g, "")).toFixed(
                        2
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-medium">
                  <span>Shipping:</span>
                  <span className="text-right">$4.00</span>
                </div>
                <div
                  className="flex justify-between text-lg font-bold"
                  style={{ color: "#fb9dab" }}
                >
                  <span>Total: ({order.paymentMethod})</span>
                  <span className="text-right">
                    $
                    {parseFloat(
                      order.totalPrice.replace(/[^0-9.]/g, "")
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-700 flex items-center gap-2">
                  <svg
                    fill="#000000"
                    height="50px"
                    width="50px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* svg omitted for brevity */}
                  </svg>
                  {order.address}
                </p>

                <div className="flex gap-4">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <FaTrashAlt /> Cancel
                    </button>
                  )}

                  {order.status === "Shipping" && (
                    <button
                      onClick={() => handleReceiveOrder(order._id)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      <FaBoxOpen /> Received
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bill;
