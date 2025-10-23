import express from "express";
import path from "path";
import favicon from "serve-favicon";
import wheelsRouter from "./routes/wheels.js";
import roofsRouter from "./routes/roofs.js";
import interiorsRouter from "./routes/interiors.js";
import exteriorsRouter from "./routes/exteriors.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api/wheels", wheelsRouter);
app.use("/api/roofs", roofsRouter);
app.use("/api/interiors", interiorsRouter);
app.use("/api/exteriors", exteriorsRouter);

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "lightning.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "lightning.png")));
  app.use(express.static("public"));
}

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
