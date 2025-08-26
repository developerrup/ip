import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.send(ip);
});

app.listen(PORT, () => {
  console.log(`IP service running at http://localhost:${PORT}`);
});
