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

// Trust proxy (Render/Vercel/Heroku) so secure cookies work behind TLS terminators
app.set("trust proxy", 1);

// Body parsers and method override
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride("_method"));

// Build allowed origins from FRONTEND_URL env (comma separated)
// - trim spaces, remove trailing slashes, ignore empty entries
const parseAllowedOrigins = (raw) => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((u) => (u || "").trim().replace(/\/+$/, ""))
    .filter(Boolean);
};

let allowedOrigins = parseAllowedOrigins(process.env.FRONTEND_URL);
if (allowedOrigins.length === 0) {
  allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
}
console.log("Allowed CORS origins:", allowedOrigins);

// CORS options with support for *.vercel.app previews and credentials
const corsOptions = {
  origin: function (origin, callback) {
    // allow non-browser tools (no origin)
    if (!origin) return callback(null, true);

    const originClean = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes("*") || allowedOrigins.includes(originClean)) {
      return callback(null, true);
    }

    // allow any vercel.app subdomain (optional convenience for preview deployments)
    try {
      const host = new URL(origin).host;
      if (host.endsWith(".vercel.app")) return callback(null, true);
    } catch (e) {
      // ignore parse errors
    }

    return callback(new Error("Not allowed by CORS: " + origin), false);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Apply CORS and explicitly handle preflight
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Serve static public assets (admin views, hbs resources)
app.use(express.static(path.join(__dirname, "public")));

// Session (use MongoStore in production)
app.use(
  session({
    name: "connect.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: process.env.MONGODB_URL
      ? MongoStore.create({
          mongoUrl: process.env.MONGODB_URL,
          ttl: 60 * 60 * 24 * 7, // 7 days
        })
      : undefined,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // require HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Apply app middlewares (sorting, etc.)
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

// Serve frontend production build if exists (keep API routes separate)
const frontendDist = path.join(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));

  app.get("*", (req, res, next) => {
    const reqPath = req.path || "";
    // Skip API routes - adjust if your API prefixes differ
    const apiPrefixes = [
      "/api",
      "/customer",
      "/cosmetic",
      "/blog",
      "/cart",
      "/bill",
      "/wishlist",
      "/address",
      "/stores",
      "/user",
    ];
    if (apiPrefixes.some((p) => reqPath.startsWith(p))) {
      return next();
    }
    return res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// Register routes (make sure routes use req.session and CORS correctly)
route(app);

// Generic error handler to return JSON for API callers and log detailed errors
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err && err.stack ? err.stack : err);
  // For CORS errors, respond 403/400
  if (err && err.message && err.message.startsWith("Not allowed by CORS")) {
    return res.status(403).send("CORS Error: " + err.message);
  }
  // API path -> JSON error, otherwise HTML
  if (
    req.path.startsWith("/api") ||
    req.headers.accept?.includes("application/json")
  ) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  return res.status(500).send("<pre>Internal Server Error</pre>");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
