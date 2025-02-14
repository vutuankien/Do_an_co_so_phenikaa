import logo from "./footer-logo.png";
import search_icon from "./search.png";
import cart_icon from "./shopping-cart.png";
import user_icon from "./user.png";
import navbar_img1 from "./navbar-img-1.png";
import navbar_img2 from "./navbar-img-2.png";
import banner_img1 from "./banner-img1.jpg";
import banner_img2 from "./banner-img2.jpg";
import banner_img3 from "./banner-img3.jpg";
import image_content1 from "./img-content1.jpg";
import image_content2 from "./img-content2.jpg";
import image_content3 from "./img-content3.jpg";
import image_content4 from "./img-content4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";
import product8 from "./product8.jpg";
import zoom_icon from "./zoom_icon.png";
import like_icon from "./like_icon.png";
import eye_icon from "./eye_icon.png";
import cart_icon2 from "./cart_icon2.png";
import brand1 from "./brand1.jpg";
import brand2 from "./brand2.jpg";
import brand3 from "./brand3.jpg";
import brand4 from "./brand4.jpg";
import brand5 from "./brand5.jpg";
import brand6 from "./brand6.jpg";
import discount_img1 from "./discount_img1.jpg";
import discount_img2 from "./discount_img2.jpg";
import blog_update_img1 from "./blog_update_img1.jpg";
import blog_update_img2 from "./blog_update_img2.jpg";
import blog_update_img3 from "./blog_update_img3.jpg";
import blog_update_img5 from "./blog-update-img5-4.jpg";
import discount_tag from "./discount-tag.png";
import giftbox from "./giftbox.png";
import percent from "./percent.png";

export const assets = {
  logo,
  search_icon,
  cart_icon,
  user_icon,
  navbar_img1,
  navbar_img2,
  banner_img1,
  banner_img2,
  banner_img3,
  image_content1,
  image_content2,
  image_content3,
  image_content4,

  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,

  zoom_icon,
  like_icon,
  eye_icon,
  cart_icon2,

  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,

  discount_img1,
  discount_img2,

  blog_update_img1,
  blog_update_img2,
  blog_update_img3,
  blog_update_img5,

  discount_tag,
  giftbox,
  percent,
};

export const productThemes = {
  "Best sellers": [
    {
      id: 1,
      image: "../src/assets/product1.jpg",
      title: "Volumizing eyebrow mascara",
      category: ["Eyes", "Face"],
      tags: ["Brush", "Mascara"],
      price: "$48.00",
      salePrice: "$22.00",
      onSale: true,
    },
    {
      id: 2,
      image: "../src/assets/product2.jpg",
      title: "Eye-reviving dark circle concealer - beige chair",
      category: ["Face", "Lips", "Skin"],
      tags: ["Brush", "Palettes"],
      price: "$66.00",
      salePrice: "$33.00",
      onSale: true,
    },
    {
      id: 3,
      image: "../src/assets/product3.jpg",
      title: "Waterproof Eyeliner",
      category: ["Eyes", "Face"],
      tags: ["Brush", "Concealer"],
      price: "$39.00",
      salePrice: "$33.00",
      onSale: true,
    },
    {
      id: 4,
      image: "../src/assets/product4.jpg",
      title: "Long-wear cream eyeliner - noir",
      category: ["Eyes", "Skin"],
      tags: ["Lipstick", "Mascara"],
      price: "$28.00",
      salePrice: "$22.00",
      onSale: true,
    },
    {
      id: 5,
      image: "../src/assets/product5.jpg",
      title: "Waterproof vinyl eyeliner - prune",
      category: ["Brushes", "Eyes", "Face"],
      tags: ["Lipstick", "Mascara"],
      price: "$43.00",
      salePrice: null,
      onSale: false,
    },
    {
      id: 6,
      image: "../src/assets/product6.jpg",
      title: "L’oreal Tendertalk Lip Balm",
      category: ["Face", "Lips"],
      tags: ["Lipstick", "Mascara"],
      price: "$66.00",
      salePrice: "$22.00",
      onSale: true,
    },
    {
      id: 7,
      image: "../src/assets/product7.jpg",
      title: "Sephora Cream Color Base",
      category: ["Brushes", "Skin"],
      tags: ["Concealer", "Palettes"],
      price: "$39.00",
      salePrice: null,
      onSale: false,
    },
    {
      id: 8,
      image: "../src/assets/product8.jpg",
      title: "Mineralize Charged Water Charcoal Spray",
      category: ["Brushes", "Face", "Skin"],
      tags: ["Concealer", "Mascara", "Palettes"],
      price: "$98.00",
      salePrice: null,
      onSale: false,
    },
  ],
  "New arrivals": [
    {
      id: 3,
      image: "../src/assets/product3.jpg",
      title: "Waterproof Eyeliner",
      category: ["Eyes", "Face"],
      price: "$39.00",
      salePrice: null,
      onSale: false,
    },
    {
      id: 6,
      image: "../src/assets/product6.jpg",
      title: "L’oreal Tendertalk Lip Balm",
      category: ["Face", "Lips"],
      tags: ["Lipstick", "Mascara"],
      price: "$66.00",
      salePrice: "$22.00",
      onSale: true,
    },
    {
      id: 8,
      image: "../src/assets/product8.jpg",
      title: "Mineralize Charged Water Charcoal Spray",
      category: ["Brushes", "Face", "Skin"],
      tags: ["Concealer", "Mascara", "Palettes"],
      price: "$98.00",
      salePrice: null,
      onSale: false,
    },
  ],
  "Items sale": [
    {
      id: 1,
      image: "../src/assets/product1.jpg",
      title: "Volumizing eyebrow mascara",
      category: ["Eyes", "Face"],
      tags: ["Brush", "Mascara"],
      price: "$48.00",
      salePrice: "$22.00",
      onSale: true,
    },
    {
      id: 2,
      image: "../src/assets/product2.jpg",
      title: "Eye-reviving dark circle concealer - beige chair",
      category: ["Face", "Lips", "Skin"],
      tags: ["Brush", "Palettes"],
      price: "$66.00",
      salePrice: "$33.00",
      onSale: true,
    },
    {
      id: 3,
      image: "../src/assets/product3.jpg",
      title: "Waterproof Eyeliner",
      category: ["Eyes", "Face"],
      tags: ["Brush", "Concealer"],
      price: "$39.00",
      salePrice: "$33.00",
      onSale: true,
    },
    {
      id: 4,
      image: "../src/assets/product4.jpg",
      title: "Long-wear cream eyeliner - noir",
      category: ["Eyes", "Skin"],
      tags: ["Lipstick", "Mascara"],
      price: "$28.00",
      salePrice: "$22.00",
      onSale: true,
    },
  ],
};
