const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;
const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService2";

const REGIONS = {
  여수: { areaCode: "38", sigunguName: "여수시", prefix: "YS" },
  광주: { areaCode: "5", sigunguName: "", prefix: "GJ" },
  담양: { areaCode: "38", sigunguName: "담양군", prefix: "DY" },
  순천: { areaCode: "38", sigunguName: "순천시", prefix: "SC" },
  목포: { areaCode: "38", sigunguName: "목포시", prefix: "MP" }
};

const CONTENT_TYPES = ["39", "38", "14", "28", "12"];
const QUOTAS = { 39: 15, 38: 5, 14: 10, 28: 8, 12: 24 };
const cache = new Map();

function logLocalServer(message) {
  fs.appendFileSync(path.join(ROOT, "local-server.log"), `${new Date().toISOString()} ${message}\n`, "utf8");
}

process.on("uncaughtException", (error) => {
  logLocalServer(`uncaughtException: ${error.stack || error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logLocalServer(`unhandledRejection: ${error.stack || error.message}`);
  process.exit(1);
});

function readLocalConfig() {
  const file = path.join(ROOT, "config.local.js");
  if (!fs.existsSync(file)) return {};
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context);
  return context.window.TRAVEL_CONFIG || {};
}

function getApiKey() {
  const config = readLocalConfig();
  return process.env.TOUR_API_KEY || config.TOUR_API_KEY || config.NAMDO_TOUR_API_KEY || "";
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*"
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, status, text, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "content-type": type });
  res.end(text);
}

function getBrowserLocalConfigScript() {
  const config = readLocalConfig();
  const publicConfig = {
    PLACES_PROXY_URL: "/api/places"
  };
  if (config.KAKAO_MAP_JS_KEY) {
    publicConfig.KAKAO_MAP_JS_KEY = config.KAKAO_MAP_JS_KEY;
  }
  return `window.TRAVEL_CONFIG = { ...(window.TRAVEL_CONFIG || {}), ${JSON.stringify(publicConfig).slice(1, -1)} };\n`;
}

async function fetchTourApi(pathname, params) {
  const key = getApiKey();
  if (!key) throw new Error("config.local.js에 TourAPI 키가 없습니다.");
  const url = new URL(`${TOUR_API_BASE}/${pathname}`);
  Object.entries({
    serviceKey: key,
    MobileOS: "ETC",
    MobileApp: "bootcamp_contest",
    _type: "json",
    ...params
  }).forEach(([name, value]) => url.searchParams.set(name, value));
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TourAPI 응답 오류: ${response.status}`);
  return response.json();
}

function itemsOf(json) {
  const item = json?.response?.body?.items?.item;
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

async function getSigunguCode(region) {
  if (!region.sigunguName) return "";
  const json = await fetchTourApi("areaCode2", {
    areaCode: region.areaCode,
    numOfRows: "100",
    pageNo: "1"
  });
  return String(itemsOf(json).find((item) => item.name === region.sigunguName)?.code || "");
}

async function fetchByType(region, sigunguCode, contentTypeId) {
  const params = {
    areaCode: region.areaCode,
    contentTypeId,
    arrange: "O",
    numOfRows: "160",
    pageNo: "1"
  };
  if (sigunguCode) params.sigunguCode = sigunguCode;
  return itemsOf(await fetchTourApi("areaBasedList2", params)).filter((item) => item.title && item.mapx && item.mapy);
}

function cleanTitle(title) {
  return String(title || "").replace(/\s+/g, " ").trim();
}

function categoryFor(item) {
  const type = String(item.contenttypeid || "");
  const title = cleanTitle(item.title);
  if (type === "39") return "음식점";
  if (type === "38") return "시장";
  if (type === "14") return "문화시설";
  if (type === "28") return "체험";
  if (/해변|해수욕장|바다|항|선착장|섬|대교|등대|해안|만|포구/.test(title)) return "바다";
  if (/전망|케이블카|타워|봉수|일몰|야경/.test(title)) return "전망";
  if (/마을|거리|골목|광장/.test(title)) return "마을";
  return "자연";
}

function presetFor(category) {
  const presets = {
    음식점: {
      duration: 70,
      indoor: true,
      outdoor: false,
      pet: false,
      slots: ["lunch", "dinner"],
      tags: ["food", "local_food", "popular"],
      scores: { clear: 4, rain: 4, extreme: 4 }
    },
    시장: {
      duration: 75,
      indoor: true,
      outdoor: false,
      pet: false,
      slots: ["lunch", "afternoon"],
      tags: ["food", "local_food", "market", "popular"],
      scores: { clear: 4, rain: 4, extreme: 4 }
    },
    문화시설: {
      duration: 85,
      indoor: true,
      outdoor: false,
      pet: false,
      slots: ["morning", "afternoon"],
      tags: ["culture", "indoor", "exhibition", "rain"],
      scores: { clear: 4, rain: 5, extreme: 5 }
    },
    체험: {
      duration: 90,
      indoor: false,
      outdoor: true,
      pet: false,
      slots: ["afternoon"],
      tags: ["activity", "family", "photo"],
      scores: { clear: 4, rain: 2, extreme: 2 }
    },
    바다: {
      duration: 80,
      indoor: false,
      outdoor: true,
      pet: null,
      slots: ["morning", "sunset"],
      tags: ["sea", "nature", "walking", "photo", "view"],
      scores: { clear: 5, rain: 1, extreme: 2 }
    },
    전망: {
      duration: 75,
      indoor: false,
      outdoor: true,
      pet: null,
      slots: ["sunset", "night"],
      tags: ["view", "photo", "night_view", "couple"],
      scores: { clear: 5, rain: 2, extreme: 3 }
    },
    마을: {
      duration: 80,
      indoor: false,
      outdoor: true,
      pet: true,
      slots: ["morning", "afternoon"],
      tags: ["mood", "walking", "photo", "quiet", "cafe"],
      scores: { clear: 4, rain: 2, extreme: 2 }
    },
    자연: {
      duration: 90,
      indoor: false,
      outdoor: true,
      pet: null,
      slots: ["morning", "afternoon"],
      tags: ["nature", "walking", "healing", "photo"],
      scores: { clear: 5, rain: 1, extreme: 2 }
    }
  };
  return presets[category] || presets.자연;
}

function tagsFor(item, category) {
  const title = cleanTitle(item.title);
  const tags = [...presetFor(category).tags];
  if (/카페|커피|찻집|브루|베이커리/.test(title)) tags.push("cafe", "mood");
  if (/정원|수목원|꽃|원림/.test(title)) tags.push("garden", "healing");
  if (/산|숲|대나무|편백/.test(title)) tags.push("forest", "healing");
  if (/해변|바다|항|섬|대교|등대/.test(title)) tags.push("sea");
  if (/야경|일몰|노을|전망|타워|케이블카/.test(title)) tags.push("night_view", "view");
  if (/박물관|미술관|전시|기념관|문화/.test(title)) tags.push("culture", "indoor");
  if (/시장|거리|골목/.test(title)) tags.push("popular", "walking");
  if (/공원|산책|둘레길|길/.test(title)) tags.push("walking", "family");
  return [...new Set(tags)];
}

function normalize(item, regionName, prefix, index) {
  const category = categoryFor(item);
  const preset = presetFor(category);
  return {
    id: `LIVE_${prefix}_${String(index + 1).padStart(3, "0")}`,
    contentId: String(item.contentid || ""),
    name: cleanTitle(item.title),
    region: regionName,
    category,
    lat: Number(Number(item.mapy).toFixed(4)),
    lng: Number(Number(item.mapx).toFixed(4)),
    duration: preset.duration,
    indoor: preset.indoor,
    outdoor: preset.outdoor,
    parking: null,
    baby: true,
    pet: preset.pet,
    slots: preset.slots,
    tags: tagsFor(item, category),
    scores: preset.scores,
    image: item.firstimage || item.firstimage2 || "",
    address: item.addr1 || "",
    description: `${item.addr1 ? `${item.addr1}에 위치한 ` : ""}${regionName} ${category} 여행지입니다.`
  };
}

async function getPlaces(regionName) {
  if (cache.has(regionName)) return cache.get(regionName);
  const region = REGIONS[regionName];
  if (!region) return [];
  const sigunguCode = await getSigunguCode(region);
  const buckets = {};
  for (const type of CONTENT_TYPES) {
    buckets[type] = await fetchByType(region, sigunguCode, type);
  }
  const selected = [];
  const seen = new Set();
  const add = (item) => {
    const title = cleanTitle(item.title);
    if (!title || seen.has(title)) return false;
    seen.add(title);
    selected.push(item);
    return true;
  };
  for (const type of CONTENT_TYPES) {
    let count = 0;
    for (const item of buckets[type]) {
      if (count >= QUOTAS[type] || selected.length >= 80) break;
      if (add(item)) count += 1;
    }
  }
  for (const type of CONTENT_TYPES) {
    for (const item of buckets[type]) {
      if (selected.length >= 80) break;
      add(item);
    }
    if (selected.length >= 80) break;
  }
  const places = selected.map((item, index) => normalize(item, regionName, region.prefix, index));
  cache.set(regionName, places);
  return places;
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  if (pathname === "/config.local.js") {
    sendText(res, 200, getBrowserLocalConfigScript(), "application/javascript; charset=utf-8");
    return;
  }
  const file = path.normalize(path.join(ROOT, pathname.replace(/^\/+/, "")));
  if (!file.startsWith(ROOT)) {
    sendText(res, 403, "Forbidden");
    return;
  }
  fs.readFile(file, (error, data) => {
    if (error) {
      sendText(res, 404, "Not found");
      return;
    }
    const ext = path.extname(file);
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8"
    };
    res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://localhost:${PORT}`);
  if (requestUrl.pathname === "/api/places") {
    try {
      const region = requestUrl.searchParams.get("region") || "여수";
      const places = await getPlaces(region);
      sendJson(res, 200, { places, source: "tourapi-local" });
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return;
  }
  serveStatic(req, res);
});

logLocalServer(`starting on port ${PORT}`);
server.on("error", (error) => {
  logLocalServer(`server error: ${error.stack || error.message}`);
  process.exit(1);
});
server.listen(PORT, () => {
  const message = `Local travel planner: http://localhost:${PORT}`;
  logLocalServer(message);
  console.log(message);
});
