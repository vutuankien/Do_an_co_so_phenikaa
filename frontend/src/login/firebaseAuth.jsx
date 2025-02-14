import app from "./firebaseConfig";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification ,
  sendPasswordResetEmail
} from "firebase/auth";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Đăng nhập bằng Google
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("Google login error:", error.message);
    throw new Error(error.message);
  }
};

// Đăng ký bằng Email và Password + Xác minh email
export const registerWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Gửi email xác minh
    await sendEmailVerification(user);
    
    console.log("User registered:", user);
    console.log("Verification email sent to:", user.email);

    return {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("Registration error:", error.message);
    throw new Error(error.message);
  }
};


// Đăng nhập bằng Email và Password (chỉ cho phép nếu đã xác minh email)
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      throw new Error("Email chưa được xác minh. Vui lòng kiểm tra hộp thư của bạn.");
    }

    // Lưu UID và Email vào localStorage
    localStorage.setItem("userUid", user.uid);
    localStorage.setItem("userEmail", user.email);

    return {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    throw new Error(error.message);
  }
};

// 🛠 Hàm reset mật khẩu
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("📧 Email đặt lại mật khẩu đã được gửi tới:", email);
    return "Vui lòng kiểm tra email để đặt lại mật khẩu.";
  } catch (error) {
    console.error("Lỗi đặt lại mật khẩu:", error.message);
    throw new Error(error.message);
  }
};