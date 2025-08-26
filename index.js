import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // If multiple IPs (comma-separated), take the first one
  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }
  res.status(200).json({ip});
});


app.listen(PORT, () => {
  console.log(`IP service running at http://localhost:${PORT}`);
});

