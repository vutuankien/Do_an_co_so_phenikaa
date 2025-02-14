// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Cấu hình Firebase của ứng dụng
const firebaseConfig = {
  apiKey: "AIzaSyBeyvvYdNbZtMogDvpBIkuzzaUXpDTf38A",
  authDomain: "first-login-a5e79.firebaseapp.com",
  projectId: "first-login-a5e79",
  storageBucket: "first-login-a5e79.appspot.com", 
  messagingSenderId: "948088825390",
  appId: "1:948088825390:web:059352174b15d5bf4321bf",
  measurementId: "G-M6LPTVV1KM",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
