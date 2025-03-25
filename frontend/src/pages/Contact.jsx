import React from "react";
import "./Contact.css";
import Breadcrumb from "../components/Breadcrumb";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import StoreLocator from "../components/StoreLocator";
const admins = [
  {
    name: "Tuấn Kiên",
    fbLink: "https://www.facebook.com/tuan.kien.878874",
    avatar: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/469222246_1370506087664752_6999540447022209537_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHRxi1chtId_Iuz55-xih11kuJ5CUYrqeeS4nkJRiup5248UpKwCXhr9P3ZdDBmkXpBvjTURmbx1VynZrMkTzId&_nc_ohc=mnnp9C874GQQ7kNvgF0rv9z&_nc_oc=Adm4VpphbS1eZxOLSNd5SH26o2aUUlZZ-QBfDq9z7UD1i2cnzn8wcu35F3xH1t9uYtA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=YPTbME77rkLw854MPjHvQg&oh=00_AYHxmEoAecWBsfOuMlQg3JLeKwV8PVMK6VExXLMIATYu6w&oe=67E8CC59"
  },
  {
    name: "Hồng Đăng",
    fbLink: "https://www.facebook.com/angvu.541695/",
    avatar: "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-1/114181015_106053464528327_4385031049838430609_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHiaasevL0DDmvgM6vobL_eN0fTqJgXETM3R9OomBcRMyVp4pWvZC__flobiye7-AMa27iDNHqdprdjMKVuZRla&_nc_ohc=_1_axekrybAQ7kNvgGgi_9m&_nc_oc=AdnhNRKjskvM2YPksoumjFnmzmKwUhr0B8xLiH5epOemL4hOel8XiYnlYqTfCZw0TibZupKRSw-aM8VVxN9E2TiO&_nc_zt=24&_nc_ht=scontent.fhan14-1.fna&_nc_gid=uLalyOV5qNQ7IM2gu4EtQg&oh=00_AYGJn4UfHiOegicIiM_-IngmRG2qON6wNNWvyND2OErQMg&oe=680A5F2D"
  },
  {
    name: "Thế Hưng",
    fbLink: "https://www.facebook.com/thienquoc.hoang.52",
    avatar: "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeH4M_NObfnpBzSavDcGrThSWt9TLzuBU1Ba31MvO4FTUAURZLnVcZqwICZFT8EyI9a8b9_lUJ5-TdGVlv1gV8Xt&_nc_ohc=y_2d5iWHAR8Q7kNvgEjHH3T&_nc_oc=AdhxQnnyDI47YjkjjP5y0MndayvGTtd4B6WYWviD6w5yQ4ohJExZg7TTEx0cDzJRnuZraEkK1kymGhHXYighWUUT&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AcQJ1-867bVzkDqeWBQfScQ&oh=00_AYB_0Mso8hEouWA7pCUmag62z7L_8KaocFG3kqfAynXIvA&oe=67D6213A"
  },
];

const Contact = () => {
  return (
    <div>
      <div className="container">
        <Breadcrumb />
      </div>
      <h2 className="text-center">Contact Us</h2>
      <StoreLocator />
      <div className="about-section container">
        <h2 className="about-title">'Paletto – The Palette of Beauty</h2>
        <p className="about-text">
          Behind every brand lies a story, a heartfelt aspiration of its founders.
          <strong>'Paletto was born with the mission to celebrate natural beauty</strong>, helping everyone discover their own unique shades.
        </p>

        <p className="about-text">
          Inspired by <strong>Palette – the color board of art</strong>, 'Paletto is more than just cosmetics;
          it is a journey of exploring personal style, individuality, and distinctive beauty.
        </p>

        <p className="about-text">
          In today’s modern world, beauty is no longer confined by standards; it is a fusion of <strong>personality, confidence</strong>,
          and <strong>delicate self-care</strong>. 'Paletto believes that everyone can shine in their own way.
        </p>

        <p className="about-text">
          With safe formulas, natural ingredients, and advanced technology, 'Paletto delivers high-quality products
          that help the skin stay <strong>youthful, radiant, and full of vitality</strong>.
        </p>

        <p className="about-text last">
          'Paletto – The Palette of Beauty, where you are the artist of your own masterpiece!
        </p>
      </div>


      <h2 className="admins-section">Admin Team</h2>
      <div className="admins-list">
        {admins.map((admin, index) => (
          <div key={index} className="admin-card">
            <a href={admin.fbLink} target="_blank" rel="noopener noreferrer">
              <img src={admin.avatar} alt={admin.name} className="admin-avatar" />
            </a>
            <p className="admin-name">{admin.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Contact;
