import express from "express";
import {UAParser} from "ua-parser-js";
import geoip from "geoip-lite";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  // Get IP
  const ip =
    (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0];

  // Parse User-Agent
  const userAgent = req.headers["user-agent"];
  const parser = new UAParser(userAgent);
  const uaInfo = parser.getResult();

  // Geo lookup
  const geo = geoip.lookup(ip);

  const info = {
    ip,
    geo: geo
      ? {
          country: geo.country,
          region: geo.region,
          city: geo.city,
          latitude: geo.ll[0],
          longitude: geo.ll[1],
          timezone: geo.timezone,
        }
      : null,
    method: req.method,
    path: req.originalUrl,
    protocol: req.protocol,
    host: req.headers.host,
    referrer: req.headers.referer || req.headers.referrer || null,
    userAgent,
    parsedAgent: uaInfo,
    query: req.query,
    cookies: req.cookies,
    accept: req.headers.accept,
    language: req.headers["accept-language"],
    connection: {
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
      localAddress: req.socket.localAddress,
      localPort: req.socket.localPort,
    },
    headers: req.headers,
  };

  res.json(info);
});

app.listen(PORT, () => {
  console.log(`IP info service running at http://localhost:${PORT}`);
});
