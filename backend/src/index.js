// const express = require("express");
// const app = express();
// const session = require("express-session");
// const path = require("path");
// const handlebars = require("express-handlebars").engine;
// const route = require("./routes");
// const db = require("./config/db/index");
// const methodOverride = require("method-override");
// const SortMiddleware = require("./app/middlewares/SortMiddleware");
// const connectCloudinary = require("./config/cloudinary");
// const cors = require("cors");
// const fs = require("fs");
// require("dotenv").config();

// const SESSION_SECRET = process.env.SESSION_SECRET || "default_secret_key"; // Thêm giá trị mặc định

// // **Kết nối database & Cloudinary**
// db.connect();
// connectCloudinary();

// // --- Static + body parsers ---
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(methodOverride("_method"));

// // --- CORS động (chỉ dùng 1 lần, trước routes) ---
// const allowedOrigins = process.env.FRONTEND_URL
//   ? process.env.FRONTEND_URL.split(",").map((u) => u.trim())
//   : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"];

// console.log("Allowed CORS origins:", allowedOrigins);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (curl, Postman)
//       if (!origin) return callback(null, true);
//       if (
//         allowedOrigins.includes("*") ||
//         allowedOrigins.indexOf(origin) !== -1
//       ) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS: " + origin));
//     },
//     methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true,
//   })
// );

// app.use(SortMiddleware);

// // **Cấu hình session**
// app.use(
//   session({
//     secret: SESSION_SECRET, // Chuỗi bí mật (có giá trị mặc định)
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Để test trên localhost
//   })
// );

// // **Cấu hình Handlebars**
// app.engine(
//   "hbs",
//   handlebars({
//     extname: ".hbs",
//     defaultLayout: "main",
//     helpers: require("./helpers/handlebars"),
//     runtimeOptions: {
//       allowProtoMethodsByDefault: true,
//     },
//   })
// );

// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "resources/views"));

// // Serve frontend production build nếu tồn tại (giữ same-origin để cookies hoạt động)
// const frontendDist = path.join(__dirname, "../../frontend/dist");
// if (fs.existsSync(frontendDist)) {
//   app.use(express.static(frontendDist));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendDist, "index.html"));
//   });
// }

// // **Khai báo route**
// route(app);

// // **Chạy server**
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const handlebars = require("express-handlebars").engine;
const route = require("./routes");
const db = require("./config/db/index");
const methodOverride = require("method-override");
const SortMiddleware = require("./app/middlewares/SortMiddleware");
const connectCloudinary = require("./config/cloudinary");
const cors = require("cors");
const fs = require("fs");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const SESSION_SECRET = process.env.SESSION_SECRET || "default_secret_key";

// Connect services
db.connect();
connectCloudinary();

// Middleware: static + body parsers + method override
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride("_method"));

// CORS dynamic
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((u) => u.trim())
  : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"];

console.log("Allowed CORS origins:", allowedOrigins);

// If behind a proxy (Render/etc) trust proxy so secure cookies work
app.set("trust proxy", 1);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser tools like curl/postman (no origin)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes("*") ||
        allowedOrigins.indexOf(origin) !== -1
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Session with MongoStore
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 60 * 60 * 24 * 7, // 7 days
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // require HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Apply app middlewares
app.use(SortMiddleware);

// Handlebars setup
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: require("./helpers/handlebars"),
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// // Serve frontend production build if exists (same-origin to preserve cookies)
// const frontendDist = path.join(__dirname, "../../frontend/dist");
// if (fs.existsSync(frontendDist)) {
//   app.use(express.static(frontendDist));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendDist, "index.html"));
//   });
// }
// Serve frontend production build if exists (same-origin to preserve cookies)
const frontendDist = path.join(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  // only serve index.html for non-API requests
  app.get("*", (req, res, next) => {
    const reqPath = req.path || "";
    // if the request looks like an API call, skip this handler so API routes work
    if (
      reqPath.startsWith("/api") ||
      reqPath.startsWith("/customer") ||
      reqPath.startsWith("/cosmetic") ||
      reqPath.startsWith("/blog") ||
      reqPath.startsWith("/cart") ||
      reqPath.startsWith("/bill") ||
      reqPath.startsWith("/wishlist") ||
      reqPath.startsWith("/address") ||
      reqPath.startsWith("/stores")
    ) {
      return next();
    }
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Routes
route(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
