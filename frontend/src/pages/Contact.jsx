import React from "react";
import "./Contact.css";
import Breadcrumb from "../components/Breadcrumb";

const admins = [
  {
    name: "Tuấn Kiên",
    fbLink: "https://www.facebook.com/tuan.kien.878874",
    avatar: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/476106946_1414692866579407_7229718211801302194_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_ohc=wUZv4EOc524Q7kNvgHXBOvT&_nc_oc=Adi9buUzjek-wkNpPn8a-7QYD1B7vlN1QTCWpviGzQbJ99lwDoxjBgd87DX6hK025FYFDfoZvYjnr1-q4-1mddKK&_nc_zt=24&_nc_ht=scontent.fhan14-2.fna&_nc_gid=tvoVsq42Z8g392chgj1vDQ&oh=00_AYFdbsYirzaX6TZrcc2kGxsDVsY0CBzc2PrYwddK5q5XbQ&oe=67DAE23E"
  },
  {
    name: "Hồng Đăng",
    fbLink: "https://www.facebook.com/angvu.541695/",
    avatar: "https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-1/114181015_106053464528327_4385031049838430609_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHiaasevL0DDmvgM6vobL_eN0fTqJgXETM3R9OomBcRMyVp4pWvZC__flobiye7-AMa27iDNHqdprdjMKVuZRla&_nc_ohc=3H_gloDQG0kQ7kNvgEfvE3e&_nc_oc=AditDmorqxmNpaiiL1wTUVlcvYZ59mriW0dr5hyJtMcUp_dcx6GPfkwi1HiHKU8GiJkU5aT2yUHVslgga8IM3cVI&_nc_zt=24&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AJGXXA67iDT0Vsvs5hRcDco&oh=00_AYBpHTPxnLWasDL2refaocZgK7p4Cou-2gUN3LDveU4eqw&oe=67D64BED"
  },
  {
    name: "Thế Hưng",
    fbLink: "https://www.facebook.com/thienquoc.hoang.52",
    avatar: "https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_eui2=AeH4M_NObfnpBzSavDcGrThSWt9TLzuBU1Ba31MvO4FTUAURZLnVcZqwICZFT8EyI9a8b9_lUJ5-TdGVlv1gV8Xt&_nc_ohc=y_2d5iWHAR8Q7kNvgEjHH3T&_nc_oc=AdhxQnnyDI47YjkjjP5y0MndayvGTtd4B6WYWviD6w5yQ4ohJExZg7TTEx0cDzJRnuZraEkK1kymGhHXYighWUUT&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AcQJ1-867bVzkDqeWBQfScQ&oh=00_AYB_0Mso8hEouWA7pCUmag62z7L_8KaocFG3kqfAynXIvA&oe=67D6213A"
  },
];

const Contact = () => {
  return (
    <div className="container">
      <Breadcrumb />
      <h2>Contact Us</h2>
      <iframe
        className="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3371.608264966921!2d105.7461114747127!3d20.962616190048152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313452efff394ce3%3A0x391a39d4325be464!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBQaGVuaWthYQ!5e1!3m2!1svi!2s!4v1739507843400!5m2!1svi!2s"
        width="100%"
        height="300"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="about-section">
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
