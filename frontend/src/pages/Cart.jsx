import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import "./Cart.css";
import Breadcrumb from "../components/Breadcrumb";
import Qr from "./QR";
import COD from "./COD";
import Loading from "../components/loading";

const Cart = () => {
  const uid = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [showCOD, setShowCOD] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:5000/address");
        const data = await response.json();

        console.log("Dữ liệu từ API:", data);
        console.log("UID hiện tại:", uid, typeof uid);

        // Tìm thông tin địa chỉ của user
        const userAddress = data.find((entry) => String(entry.id) === String(uid));

        if (!userAddress || !Array.isArray(userAddress.addresses)) {
          console.warn("Không tìm thấy địa chỉ hợp lệ.");
          setAddresses([]);
          return;
        }

        console.log("Địa chỉ tìm thấy:", userAddress.addresses);

        // Cập nhật danh sách địa chỉ
        setAddresses(userAddress.addresses);

        // Chọn địa chỉ mặc định hoặc địa chỉ đầu tiên
        const defaultAddress = userAddress.addresses.find((addr) => addr.default) || userAddress.addresses[0];
        setSelectedAddress(defaultAddress?.id || "");
      } catch (error) {
        console.error("Lỗi khi tải địa chỉ:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchAddresses();
    }
  }, [uid]);

  useEffect(() => {
    if (!uid) {
      console.error("Không tìm thấy UID.");
      setLoadingUser(false);
      return;
    }

    fetch(`http://localhost:5000/cart?userUID=${uid}`)
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));

    fetch(`http://localhost:5000/user?id=${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data[0]);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setLoadingUser(false);
      });
  }, [uid]);

  const updateQuantity = (id, amount) => {
    if (!uid) {
      console.error("Không tìm thấy UID của người dùng.");
      return;
    }
    // Tìm sản phẩm cần cập nhật
    const productToUpdate = cartItems.find((item) => item.id === id && item.userUID === uid);
    if (!productToUpdate) {
      console.error("Không tìm thấy sản phẩm trong giỏ hàng.");
      return;
    }

    const newQuantity = Math.max(1, productToUpdate.quantity + amount);

    // Cập nhật state trước
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.userUID === uid ? { ...item, quantity: newQuantity } : item
      )
    );
    // Gửi request cập nhật lên JSON Server
    fetch(`http://localhost:5000/cart/${id}`, { // Thay đổi URL API để cập nhật trực tiếp vào item có id cụ thể
      method: "PATCH", // Dùng PATCH để cập nhật một phần dữ liệu
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }), // Chỉ cập nhật quantity
    })
      .then((res) => res.json())
      .then((data) => console.log("Cập nhật thành công:", data))
      .catch((error) => console.error("Lỗi khi cập nhật số lượng:", error));
  };

  const deleteCartItem = (id) => {
    const uid = localStorage.getItem("userId"); // Lấy UID trực tiếp

    if (!uid) {
      console.error("Không tìm thấy UID của người dùng.");
      return;
    }

    // Kiểm tra sản phẩm có tồn tại với UID của người dùng
    fetch(`http://localhost:5000/cart?userUID=${uid}&id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          console.error("Không tìm thấy sản phẩm trong giỏ hàng.");
          return;
        }

        // Lấy ID thực tế của sản phẩm trong database
        const itemToDelete = data[0]; // Vì API trả về mảng

        // Cập nhật lại state giỏ hàng trước khi xóa trên server
        setCartItems((prevItems) =>
          prevItems.filter((item) => !(item.id === id && item.userUID === uid))
        );

        // Gửi request DELETE để xóa sản phẩm khỏi database
        fetch(`http://localhost:5000/cart/${itemToDelete.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Lỗi khi xóa sản phẩm khỏi giỏ hàng.");
            }
            console.log("Xóa sản phẩm thành công.");
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error("Lỗi khi tìm sản phẩm:", error));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id) // Bỏ tích
        : [...prevSelected, id] // Tích vào
    );
  };

  // Tính tổng chỉ với sản phẩm được chọn
  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (total, item) =>
        total + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
      0
    );

    const handleCheckout = (method) => {
      if (selectedItems.length === 0) {
        alert("Vui lòng chọn sản phẩm muốn mua.");
        return;
      }
  
      if (!user?.phone || !selectedAddress) {
        alert("Vui lòng cập nhật thông tin cá nhân để hoàn tất đặt hàng.");
        return;
      }
  
      if (method === "qr") {
        setShowQR(true);
        setShowCOD(false);
      } else if (method === "cod") {
        setShowCOD(true);
        setShowQR(false);
      }
    };

  return (
    <div>
      <Breadcrumb />
      <Loading />
      <Qr show={showQR} onClose={() => setShowQR(false)} />
      <COD show={showQR} onClose={() => setShowQR(false)}/>
      <div className="cart flex p-8">
        <div className="left w-2/3">
          <h2 className="text-xl font-bold">Shopping Cart</h2>

          {cartItems.length > 0 ? (
            <>
              <p className="mt-4 text-gray-500">
                You have <span className="font-bold">{cartItems.length}</span> items in your cart.
              </p>
              <div className="mt-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item flex items-center p-4 bg-white rounded-lg mb-4">
                    {/* Checkbox chọn sản phẩm */}
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="cart-input mr-4"
                    />

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg cursor-pointer"
                      onClick={() => window.location.href = `http://localhost:5173/product/${item.productId}`}
                    />

                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 border">
                        <AiOutlineMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 border">
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <p className="cart-price ml-4 font-semibold">
                      ${(
                        parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity
                      ).toFixed(2)}
                    </p>

                    <button onClick={() => deleteCartItem(item.id)} className="ml-4 text-red-500">
                      <AiOutlineDelete />
                    </button>

                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">Cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-1/3 bg-[#fb9dab] text-black p-6 rounded-lg">
            <h2 className="text-lg font-bold">Cart Information</h2>

            {loadingUser ? (
              <p className="mt-4">Loading information...</p>
            ) : user ? (
              <div className="anh flex flex-col items-center my-4">
                <img src={user.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full mb-2" />
                <p className="email text-sm">{user.email}</p>
                <p className="email text-sm">{user.phone}</p>
                {/* Danh sách địa chỉ */}
                <div className="mt-4 w-full">
                  <p className="addr font-semibold">Shipping address:</p>
                  {loading ? (
                    <p>Đang tải địa chỉ...</p>
                  ) : addresses.length > 0 ? (
                    <select
                      className="mt-2 p-2 border rounded w-full"
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id} title={address.address}>
                          {address.address.length > 30 ? address.address.slice(0, 30) + "..." : address.address}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm text-red-400">Không có địa chỉ nào được lưu.</p>
                  )}
                </div>

              </div>
            ) : (
              <p className="mt-4 text-red-300">Unable to load user information.</p>
            )}


            <div className="mt-4">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Shipping: $4.00</p>
              <p className="font-bold">Total (Tax incl.): ${(subtotal + 4).toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold">Select payment method:</h3>
              <button
                className="w-full bg-blue-400 p-3 mt-2 rounded-lg font-bold"
                onClick={() => handleCheckout("qr")}
              >
                Pay by QR code
              </button>

              <button
                className="w-full bg-gray-400 p-3 mt-2 rounded-lg font-bold"
                onClick={() => handleCheckout("cod")}
              >
                Cash on Delivery
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
