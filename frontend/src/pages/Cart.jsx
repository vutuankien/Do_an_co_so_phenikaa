import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import "./Cart.css";
import Breadcrumb from "../components/Breadcrumb";
import Qr from "./QR";
import COD from "./COD";
import RelatedProducts from "../components/RelatedProduct";


const Cart = () => {
  const uid = localStorage.getItem("userUID")?.replace(/"/g, "");

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
        const response = await fetch(`http://localhost:3000/address/api/${uid}`);
        const data = await response.json();

        // Kiểm tra nếu dữ liệu trả về không phải là mảng
        if (!Array.isArray(data)) {
          console.warn("Dữ liệu API không hợp lệ:", data);
          setAddresses([]);
          return;
        }

        console.log("Địa chỉ tìm thấy:", data);

        // Cập nhật danh sách địa chỉ
        setAddresses(data);

        // Chọn địa chỉ mặc định hoặc địa chỉ đầu tiên
        const defaultAddress = data.find((addr) => addr.default) || data[0];

        setSelectedAddress(defaultAddress ? defaultAddress._id : "");
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
    console.log("Địa chỉ mặc định đã chọn:", selectedAddress);
  }, [selectedAddress]);


  useEffect(() => {
    if (!uid) {
      console.error("Không tìm thấy UID.");
      setLoadingUser(false);
      return;
    }

    fetch(`http://localhost:3000/cart/api/${uid}`)
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));

    fetch(`http://localhost:3000/customer/api/user?id=${uid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu người dùng API trả về:", data);
        setUser(data); // Không cần data[0] nếu API trả về object
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      });
  }, [uid]);

  const updateQuantity = (productId, amount) => {
    if (!uid) {
      console.error("Không tìm thấy UID của người dùng.");
      return;
    }

    // Tìm sản phẩm cần cập nhật
    const productToUpdate = cartItems.find((item) => item.productId === productId && item.userId === uid);
    if (!productToUpdate) {
      console.error("Không tìm thấy sản phẩm trong giỏ hàng.");
      return;
    }

    const newQuantity = Math.max(1, productToUpdate.quantity + amount);

    // Cập nhật state trước
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Gửi request cập nhật lên backend
    fetch(`http://localhost:3000/cart/api/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: uid, // Gửi userId đúng theo yêu cầu của server
        productId: productId,
        quantity: newQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Cập nhật thành công:", data))
      .catch((error) => console.error("Lỗi khi cập nhật số lượng:", error));
  };

  const deleteCartItem = (productId) => {
    if (!uid) {
      console.error("Không tìm thấy UID của người dùng.");
      return;
    }

    console.log(`🗑️ Xóa sản phẩm: ${productId} của user: ${uid}`);

    fetch(`http://localhost:3000/cart/api/delete/${uid}/${productId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Lỗi khi xóa sản phẩm khỏi giỏ hàng.");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Xóa thành công:", data);
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      })
      .catch((error) => console.error("❌ Lỗi khi xóa sản phẩm:", error));
  };

  const toggleSelectItem = (product) => {
    setSelectedItems((prevSelected) => {
      const exists = prevSelected.find((item) => item.productId === product.productId);
      return exists
        ? prevSelected.filter((item) => item.productId !== product.productId) // Bỏ tích
        : [...prevSelected, product]; // Thêm toàn bộ thông tin sản phẩm
    });
  };


  useEffect(() => {
    console.log("Sản phẩm đã chọn:", selectedItems);
  }, [selectedItems]);



  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item.productId))
    .reduce(
      (total, item) =>
        total + parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
      0
    );

  const handleCheckout = (method) => {
    if (selectedItems.length === 0) {
      alert("Please select the product you want to buy.");
      return;
    }

    if (!user?.phone || !selectedAddress) {
      alert("Please update your personal information to complete your order.");
      return;
    }

    console.log("Method selected:", method);

    if (method === "qr") {
      setShowQR(true);
      setShowCOD(false);
    } else if (method === "cod") {
      setShowCOD(true);
      setShowQR(false);
    }

    console.log("showQR:", showQR, "showCOD:", showCOD);
  };
  return (
    <div>
      <Breadcrumb />
      <div className="cart flex p-8">
        <div className="left w-2/3">
          <h2 className="text-xl font-bold">Shopping Cart</h2>

          {cartItems.length > 0 ? (
            <>
              <p className="mt-4 text-gray-500">
                You have <span className="font-bold">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span> items in your cart. items in your cart.
              </p>
              <div className="mt-6">
                {cartItems.slice().reverse().map((item) => (
                  <div key={item._id} className="cart-item flex items-center p-4 bg-white rounded-lg mb-4">
                    {/* Checkbox chọn sản phẩm */}
                    <input
                      type="checkbox"
                      checked={selectedItems.some(selected => selected.productId === item.productId)}
                      onChange={() => toggleSelectItem(item)}
                      className="cart-input mr-4"
                    />

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg cursor-pointer"
                      onClick={() => window.location.href = `http://localhost:5173/product/${item.productId}`}
                    />

                    <div className="title l-4 flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>

                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.productId, -1)} className="p-2 border">
                        <AiOutlineMinus />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, 1)} className="p-2 border">
                        <AiOutlinePlus />
                      </button>
                    </div>

                    <p className="cart-price ml-4 font-semibold">
                      ${(
                        parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity
                      ).toFixed(2)}
                    </p>

                    <button onClick={() => deleteCartItem(item.productId)} className="ml-4 text-red-500">
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
            <h2 className="text-lg font-bold">Cart Details</h2>

            {user ? (
              <div className="anh flex flex-col items-center my-4">
                <img src={user.photoURL} alt="User Avatar" className="w-16 h-16 rounded-full mb-2" />
                <p className="email fw-medium text-sm">Email: <span className="fw-bold fs-6">{user.email}</span></p>
                <p className="email text-sm">SĐT: <span className="fw-bold fs-6">{user.phone || "Chưa có số điện thoại"}</span></p>

                {/* Danh sách địa chỉ */}
                <div className="mt-4 w-full">
                  <p className="addr font-semibold">Shipping address:</p>

                  {addresses.length > 0 ? (
                    <select
                      className="mt-2 p-2 border rounded w-full"
                      value={selectedAddress || ""}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      {addresses.map((address) => (
                        <option key={address._id} value={address._id}>
                          {address.address}
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
      <Qr
        show={showQR}
        onClose={() => setShowQR(false)}
        selectedItems={selectedItems}
        cartItems={cartItems}
        userId={uid}
        selectedAddress={selectedAddress}
        onOrderSuccess={() => setCartItems(cartItems.filter(item => !selectedItems.includes(item._id)))}
      />
      <COD
        show={showCOD}
        onClose={() => setShowCOD(false)}
        selectedItems={selectedItems}
        cartItems={cartItems}
        userId={uid}
        selectedAddress={selectedAddress}
        onOrderSuccess={() => setCartItems(cartItems.filter(item => !selectedItems.includes(item._id)))}
      />
    </div>
  );
};

export default Cart;
