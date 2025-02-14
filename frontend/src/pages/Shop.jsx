import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop_container">
      <Breadcrumb />
      <div className="shop_content">
        <Sidebar />
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;
