const tasteQuestions = [
  { question: "풍경 취향", a: ["바다", "sea"], b: ["숲·정원", "forest"] },
  { question: "여행 리듬", a: ["카페·휴식", "cafe"], b: ["체험·액티비티", "activity"] },
  { question: "장소 분위기", a: ["유명 명소", "popular"], b: ["한적한 장소", "quiet"] },
  { question: "식사 취향", a: ["지역 전통음식", "local_food"], b: ["분위기 좋은 식당", "mood"] },
  { question: "날씨 대응", a: ["실내 전시", "indoor"], b: ["야외 산책", "outdoor"] },
  { question: "선호 시간대", a: ["낮 풍경", "daytime"], b: ["일몰·야경", "night_view"] }
];

const tasteVisuals = {
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
  forest: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80",
  cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80",
  activity: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=700&q=80",
  popular: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  quiet: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=80",
  local_food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  mood: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80",
  indoor: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=700&q=80",
  outdoor: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=700&q=80",
  daytime: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  night_view: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80"
};

const tasteIcons = {
  sea: "바다",
  forest: "정원",
  cafe: "카페",
  activity: "체험",
  popular: "명소",
  quiet: "한적",
  local_food: "맛",
  mood: "무드",
  indoor: "실내",
  outdoor: "산책",
  daytime: "낮",
  night_view: "야경"
};

const state = {
  tastes: {},
  activePlan: "clear",
  selectedPlaceId: null,
  result: null
};

const API_CONFIG = window.TRAVEL_CONFIG || {};
const kakaoMapState = {
  loading: null
};

const transportPolicy = {
  car: { label: "자가용", speed: 30, buffer: 10, maxLeg: 15, places: { relaxed: 4, normal: 5, packed: 6 } },
  transit: { label: "대중교통", speed: 18, buffer: 15, maxLeg: 5, places: { relaxed: 3, normal: 4, packed: 5 } },
  walk: { label: "도보 중심", speed: 4, buffer: 15, maxLeg: 2.4, places: { relaxed: 3, normal: 3, packed: 4 } },
  taxi: { label: "택시·혼합", speed: 25, buffer: 10, maxLeg: 10, places: { relaxed: 4, normal: 5, packed: 5 } }
};

const labels = {
  food: "먹거리",
  mood: "분위기",
  healing: "힐링",
  nature: "자연",
  activity: "체험",
  culture: "문화",
  sea: "바다",
  forest: "숲·정원",
  cafe: "카페·휴식",
  popular: "유명 명소",
  quiet: "한적한 장소",
  local_food: "지역음식",
  indoor: "실내",
  outdoor: "야외",
  daytime: "낮 풍경",
  night_view: "야경",
  walking: "산책",
  view: "전망",
  photo: "사진",
  rain: "우천",
  family: "가족",
  couple: "커플"
};

const CATEGORY_PRESETS_FOR_REMOTE = {
  음식점: {
    category: "음식점",
    duration: 70,
    indoor: true,
    outdoor: false,
    slots: ["lunch", "dinner"],
    tags: ["food", "local_food"],
    scores: { clear: 4, rain: 4, extreme: 4 }
  },
  문화시설: {
    category: "문화시설",
    duration: 85,
    indoor: true,
    outdoor: false,
    slots: ["morning", "afternoon"],
    tags: ["culture", "indoor", "rain"],
    scores: { clear: 4, rain: 5, extreme: 5 }
  },
  체험: {
    category: "체험",
    duration: 90,
    indoor: true,
    outdoor: false,
    slots: ["afternoon"],
    tags: ["activity", "family", "indoor"],
    scores: { clear: 3, rain: 5, extreme: 5 }
  },
  default: {
    category: "자연",
    duration: 85,
    indoor: false,
    outdoor: true,
    slots: ["morning", "afternoon"],
    tags: ["nature", "walking", "photo"],
    scores: { clear: 5, rain: 1, extreme: 2 }
  }
};

const weatherInfo = {
  clear: {
    title: "맑은 날 코스",
    copy: "야외 풍경, 산책, 전망 요소의 점수를 높이고 저녁에는 야경 장소를 배치했습니다.",
    danger: "맑음"
  },
  rain: {
    title: "비 오는 날 코스",
    copy: "실내 장소를 우선 검색하고 야외 노출과 환승 부담을 줄이는 방향으로 재배치했습니다.",
    danger: "우천"
  },
  extreme: {
    title: "폭염·폭설 코스",
    copy: "12~16시 야외 활동을 피하고 오전·저녁에만 야외 장소를 남기도록 수정했습니다.",
    danger: "악천후"
  }
};

const PHOTO_BY_ID = {
  YS_01: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Odongdo%20%28view%20from%20west%20breakwater%29%20in%202017.jpg?width=900",
  YS_02: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  YS_03: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  YS_04: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
  YS_05: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
  YS_06: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
  GJ_01: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
  GJ_02: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
  GJ_03: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  GJ_04: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  DY_01: "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?auto=format&fit=crop&w=900&q=80",
  DY_02: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=900&q=80",
  DY_03: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
  DY_04: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  SC_01: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
  SC_02: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80",
  SC_03: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  SC_04: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  MP_01: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80",
  MP_02: "https://commons.wikimedia.org/wiki/Special:Redirect/file/20240225%20View%20of%20Yudal%20Mountain%2C%20Korea.jpg?width=900",
  MP_03: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  MP_04: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=900&q=80"
};

const FALLBACK_PHOTOS = {
  sea: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  ],
  forest: [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?auto=format&fit=crop&w=900&q=80"
  ],
  food: [
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
  ],
  cafe: [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
  ],
  culture: [
    "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
  ],
  night_view: [
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80"
  ],
  default: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80"
  ]
};

const tasteOpposites = {
  sea: ["forest"],
  forest: ["sea"],
  cafe: ["activity"],
  activity: ["cafe"],
  popular: ["quiet"],
  quiet: ["popular"],
  local_food: ["mood"],
  mood: ["local_food"],
  indoor: ["outdoor"],
  outdoor: ["indoor"],
  daytime: ["night_view"],
  night_view: ["daytime"]
};

const REGION_PHOTOS = {
  여수: PHOTO_BY_ID.YS_01,
  광주: PHOTO_BY_ID.GJ_01,
  담양: PHOTO_BY_ID.DY_01,
  순천: PHOTO_BY_ID.SC_01,
  목포: PHOTO_BY_ID.MP_02
};

function init() {
  setDefaultDates();
  renderTasteCards();
  document.querySelector("#generate").addEventListener("click", generate);
  document.querySelector("#demo-fill").addEventListener("click", fillDemo);
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePlan = button.dataset.plan;
      document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPlan();
    });
  });
}

function setDefaultDates() {
  const start = new Date();
  start.setDate(start.getDate() + 10);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  document.querySelector("[name=startDate]").value = toInputDate(start);
  document.querySelector("[name=endDate]").value = toInputDate(end);
}

function toInputDate(date) {
  return date.toISOString().slice(0, 10);
}

function fillDemo() {
  const form = document.querySelector("#trip-form");
  form.region.value = "여수";
  form.people.value = 2;
  form.transport.value = "car";
  form.companion.value = "couple";
  form.pace.value = "relaxed";
  form.request.value = "게장 식사와 야경을 포함하고 싶음";
  form.querySelectorAll("[name=styles]").forEach((input) => {
    input.checked = ["food", "mood", "nature"].includes(input.value);
  });
  form.baby.checked = false;
  form.pet.checked = false;
  state.tastes = {
    0: "sea",
    1: "cafe",
    2: "quiet",
    3: "local_food",
    4: "outdoor",
    5: "night_view"
  };
  renderTasteCards();
  setMessage("여수 발표 데모값을 채웠습니다. 바로 생성해보세요.");
}

function renderTasteCards() {
  const wrap = document.querySelector("#taste-cards");
  wrap.innerHTML = tasteQuestions
    .map((item, index) => {
      const selected = state.tastes[index];
      const renderChoice = (choice) => {
        const [label, tag] = choice;
        return `
          <button
            type="button"
            class="choice-card ${selected === tag ? "selected" : ""}"
            data-index="${index}"
            data-tag="${tag}"
            style="background-image: linear-gradient(180deg, rgba(16, 44, 74, 0.05), rgba(16, 44, 74, 0.62)), url('${tasteVisuals[tag]}');"
            aria-label="${label} 선택"
          >
            <small>${tasteIcons[tag] || "취향"}</small>
            <span>${label}</span>
          </button>
        `;
      };
      return `
        <article class="taste-card">
          <p>${index + 1}. ${item.question}</p>
          <div class="choice-row">
            ${renderChoice(item.a)}
            ${renderChoice(item.b)}
          </div>
        </article>
      `;
    })
    .join("");

  wrap.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.tastes[button.dataset.index] = button.dataset.tag;
      renderTasteCards();
      setMessage("");
    });
  });
}

async function generate() {
  const input = readInput();
  const error = validate(input);
  if (error) {
    setMessage(error);
    return;
  }

  setMessage("여행 장소를 불러오는 중입니다.");
  await loadPlacesForRegion(input.region);
  const persona = buildPersona(input);
  const candidates = retrieveCandidates(input, persona);
  const plans = {
    clear: createWeatherPlan("clear", input, persona, candidates),
    rain: createWeatherPlan("rain", input, persona, candidates),
    extreme: createWeatherPlan("extreme", input, persona, candidates)
  };

  state.result = { input, persona, candidates, plans };
  state.activePlan = "clear";
  state.selectedPlaceId = candidates[0]?.id || null;
  renderResults();
  setMessage("");
}

async function loadPlacesForRegion(region) {
  const proxyUrl = getPlacesProxyUrl();
  if (!proxyUrl) return;
  try {
    const url = new URL(proxyUrl, window.location.href);
    url.searchParams.set("region", region);
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Proxy response was not ok.");
    const payload = await response.json();
    const remotePlaces = normalizeRemotePlaces(Array.isArray(payload) ? payload : payload.places, region);
    mergePlaces(remotePlaces);
  } catch (error) {
    console.warn("프록시 API 호출에 실패해 로컬 장소 데이터로 대체합니다.", error);
  }
}

function getPlacesProxyUrl() {
  if (API_CONFIG.PLACES_PROXY_URL) return API_CONFIG.PLACES_PROXY_URL;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return "/api/places";
  return "";
}

function normalizeRemotePlaces(items, fallbackRegion) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item?.name || item?.title)
    .map((item, index) => {
      const category = item.category || item.contentType || "자연";
      const preset = CATEGORY_PRESETS_FOR_REMOTE[category] || CATEGORY_PRESETS_FOR_REMOTE.default;
      const tags = [...new Set([...(item.tags || []), ...preset.tags])];
      return {
        id: item.id || item.contentId || `REMOTE_${fallbackRegion}_${index}`,
        name: item.name || item.title,
        region: item.region || fallbackRegion,
        category: preset.category,
        lat: Number(item.lat || item.mapY || item.latitude),
        lng: Number(item.lng || item.mapX || item.longitude),
        duration: Number(item.duration || preset.duration),
        indoor: Boolean(item.indoor ?? preset.indoor),
        outdoor: Boolean(item.outdoor ?? preset.outdoor),
        parking: item.parking ?? null,
        baby: item.baby ?? true,
        pet: item.pet ?? null,
        slots: item.slots || preset.slots,
        tags,
        scores: item.scores || preset.scores,
        description: item.description || item.overview || `${fallbackRegion} 공공데이터 기반 장소입니다.`
      };
    })
    .filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lng));
}

function mergePlaces(remotePlaces) {
  if (!remotePlaces.length) return;
  const keys = new Set(window.PLACES.map((place) => `${place.region}:${place.name}`));
  remotePlaces.forEach((place) => {
    const key = `${place.region}:${place.name}`;
    if (keys.has(key)) return;
    keys.add(key);
    window.PLACES.push(place);
  });
}

function readInput() {
  const form = new FormData(document.querySelector("#trip-form"));
  return {
    region: form.get("region"),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    days: 1,
    people: Number(form.get("people") || 1),
    pace: form.get("pace"),
    transport: form.get("transport"),
    companion: form.get("companion"),
    baby: form.has("baby"),
    pet: form.has("pet"),
    styles: form.getAll("styles"),
    request: String(form.get("request") || "").trim(),
    tastes: Object.values(state.tastes)
  };
}

function validate(input) {
  if (!input.startDate || !input.endDate) return "날짜를 입력해주세요.";
  if (new Date(input.endDate) < new Date(input.startDate)) return "종료일은 시작일보다 빠를 수 없습니다.";
  if (Object.keys(state.tastes).length < 4) return "취향 토너먼트를 4개 이상 선택해주세요.";
  if (input.request.length > 200) return "추가 요청은 200자 이내로 입력해주세요.";
  return "";
}

function getDays(input) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diff = Math.floor((end - start) / 86400000) + 1;
  return Math.min(Math.max(diff, 1), 3);
}

function buildPersona(input) {
  const requestTags = extractRequestTags(input.request);
  const tags = [...new Set([...input.styles, ...input.tastes, ...requestTags])];
  const keywordLabels = tags.slice(0, 9).map((tag) => labels[tag] || tag);
  const paceLabel = { relaxed: "여유로운", normal: "균형 잡힌", packed: "촘촘한" }[input.pace];
  const companionLabel = { solo: "혼자", couple: "커플", friends: "친구", family: "가족", parents: "부모님 동반" }[
    input.companion
  ];
  const sentence = `${keywordLabels.slice(0, 4).join(", ")} 취향을 가진 ${paceLabel} ${companionLabel} 여행자`;
  const constraints = [];
  if (input.baby) constraints.push("아기 동반: 휴식 버퍼와 주차/실내 편의 우선");
  if (input.pet) constraints.push("반려동물 동반: 동반 가능 또는 확인 필요 장소만 사용");
  if (input.transport === "walk") constraints.push("도보 중심: 한 권역 집중, 긴 이동 경고");
  if (input.request) constraints.push(`추가 요청: ${input.request}`);
  return {
    sentence,
    tags,
    keywords: [input.region, ...keywordLabels],
    constraints
  };
}

function extractRequestTags(text) {
  const tags = [];
  if (/게장|민어|국밥|떡갈비|국수|음식|맛집|먹|식사/.test(text)) tags.push("food", "local_food");
  if (/야경|일몰|노을|밤/.test(text)) tags.push("night_view");
  if (/카페|커피|디저트/.test(text)) tags.push("cafe", "mood");
  if (/바다|해변|해상|섬/.test(text)) tags.push("sea");
  if (/숲|정원|자연|산책/.test(text)) tags.push("nature", "walking");
  if (/전시|박물관|문화/.test(text)) tags.push("culture", "indoor");
  return tags;
}

function retrieveCandidates(input, persona) {
  return window.PLACES.filter((place) => place.region === input.region)
    .filter((place) => {
      if (!input.pet) return true;
      if (isMealPlace(place)) return true;
      return place.pet !== false;
    })
    .map((place) => {
      const matchedTags = place.tags.filter((tag) => persona.tags.includes(tag));
      const semantic = matchedTags.length * 10;
      const tasteFit = scoreTasteFit(place, input);
      const metadata = scoreMetadata(place, input);
      const textBoost = scoreRequest(place, input.request);
      const score = Math.round(30 + semantic + tasteFit + metadata + textBoost);
      return {
        ...place,
        rankScore: score,
        ragScore: Math.max(0, Math.min(score, 98)),
        tasteFit,
        matchedTags,
        evidence: buildEvidence(place, matchedTags, input)
      };
    })
    .sort((a, b) => b.rankScore - a.rankScore || b.tasteFit - a.tasteFit);
}

function scoreTasteFit(place, input) {
  let score = 0;
  const selected = new Set(input.tastes || []);

  selected.forEach((taste) => {
    if (place.tags.includes(taste)) score += 18;
    (tasteOpposites[taste] || []).forEach((opposite) => {
      if (place.tags.includes(opposite)) score -= 10;
    });
  });

  if (selected.has("sea") && place.tags.includes("sea")) score += 12;
  if (selected.has("forest") && (place.tags.includes("forest") || place.tags.includes("garden"))) score += 12;
  if (selected.has("cafe") && (place.tags.includes("cafe") || place.tags.includes("mood"))) score += 10;
  if (selected.has("activity") && (place.tags.includes("activity") || place.category.includes("체험"))) score += 10;
  if (selected.has("popular") && place.tags.includes("popular")) score += 12;
  if (selected.has("quiet") && place.tags.includes("quiet")) score += 12;
  if (selected.has("local_food") && place.category === "음식점") score += 14;
  if (selected.has("mood") && (place.tags.includes("mood") || place.tags.includes("photo"))) score += 10;
  if (selected.has("indoor") && place.indoor) score += 14;
  if (selected.has("outdoor") && place.outdoor) score += 14;
  if (selected.has("daytime") && (place.slots.includes("morning") || place.slots.includes("afternoon"))) score += 8;
  if (selected.has("night_view") && (place.slots.includes("night") || place.slots.includes("sunset"))) score += 14;

  if (selected.has("indoor") && place.outdoor && !place.indoor) score -= 8;
  if (selected.has("outdoor") && place.indoor && !place.outdoor) score -= 8;
  if (selected.has("daytime") && place.slots.includes("night")) score -= 6;
  if (selected.has("night_view") && place.slots.every((slot) => slot !== "night" && slot !== "sunset")) score -= 5;

  return score;
}

function scoreMetadata(place, input) {
  let score = 0;
  if (place.category === "음식점" && input.styles.includes("food")) score += 12;
  if (place.category === "시장" && input.styles.includes("food")) score += 10;
  if (input.baby && place.baby) score += 8;
  if (input.transport === "car" && place.parking) score += 7;
  if (input.transport === "walk" && place.tags.includes("walking")) score += 6;
  if (input.pet && place.pet === true) score += 15;
  if (input.pet && isMealPlace(place)) score -= 4;
  if (input.companion === "couple" && place.tags.includes("couple")) score += 5;
  return score;
}

function scoreRequest(place, request) {
  if (!request) return 0;
  let score = 0;
  if (/게장/.test(request) && /게장/.test(place.name + place.description)) score += 18;
  if (/야경/.test(request) && place.tags.includes("night_view")) score += 14;
  if (/카페/.test(request) && place.tags.includes("cafe")) score += 10;
  if (/실내|전시|박물관|미술관/.test(request) && (place.indoor || place.tags.includes("culture"))) score += 14;
  if (/바다|해변|항구|오션/.test(request) && place.tags.includes("sea")) score += 12;
  if (/숲|정원|자연|산책/.test(request) && (place.tags.includes("forest") || place.tags.includes("nature") || place.tags.includes("walking"))) score += 10;
  if (/시장|먹거리/.test(request) && (place.category === "시장" || place.tags.includes("market"))) score += 10;
  if (/아이|아기|가족/.test(request) && (place.baby || place.tags.includes("family"))) score += 8;
  return score;
}

function buildEvidence(place, matchedTags, input) {
  const reasons = [];
  if (matchedTags.length) reasons.push(`취향 태그 ${matchedTags.map((tag) => labels[tag] || tag).join(", ")} 일치`);
  if (place.category === "음식점") reasons.push("식사 시간 배치에 적합");
  if (input.pet && isMealPlace(place) && place.pet !== true) reasons.push("반려동물 동반은 매장 확인 필요");
  if (input.transport === "car" && place.parking) reasons.push("자가용 이동에 유리");
  if (place.indoor) reasons.push("우천/악천후 대체 가능");
  if (place.outdoor) reasons.push("맑은 날 경험 가치 높음");
  return reasons.slice(0, 3);
}

function createWeatherPlan(weather, input, persona, candidates) {
  const draft = buildDraftSchedule(weather, input, candidates);
  const audit = auditSchedule(draft, weather, input);
  const final = reviseSchedule(draft, audit, weather, input, candidates);
  const finalAudit = auditSchedule(final, weather, input);
  const logs = [
    ...audit.issues.map((issue) => ({ type: issue.type, tone: "warning", message: issue.message })),
    ...final.actions.map((action) => ({ type: "수정", tone: "fix", message: action })),
    ...finalAudit.passed.map((message) => ({ type: "통과", tone: "ok", message }))
  ];
  const score = Math.max(68, 96 - finalAudit.issues.length * 9 - audit.issues.length * 2);
  return {
    weather,
    title: weatherInfo[weather].title,
    description: weatherInfo[weather].copy,
    draft,
    final,
    logs,
    score
  };
}

function buildDraftSchedule(weather, input, candidates) {
  const days = getDays(input);
  const perDayLimit = transportPolicy[input.transport].places[input.pace];
  const ranked = rankForWeather(candidates, weather, false);
  const used = new Set();
  const result = [];
  const placesPerDay = Math.max(1, Math.min(perDayLimit, Math.ceil(ranked.length / days)));

  for (let day = 1; day <= days; day += 1) {
    const freshPool = ranked.filter((place) => !used.has(place.id));
    const selected = naivePick(freshPool, Math.min(placesPerDay, freshPool.length), weather);
    selected.forEach((place) => used.add(place.id));
    result.push({
      day,
      items: assignTimes(selected, weather, input, false)
    });
  }
  return result;
}

function rankForWeather(candidates, weather, revised) {
  return [...candidates]
    .map((place) => {
      let score = (place.rankScore || place.ragScore) + (place.tasteFit || 0) * 0.35 + place.scores[weather] * 8;
      if (weather === "rain" && place.indoor) score += revised ? 26 : 8;
      if (weather === "rain" && place.outdoor) score -= revised ? 20 : 0;
      if (weather === "extreme" && place.indoor) score += revised ? 24 : 6;
      if (weather === "clear" && place.outdoor) score += 12;
      if ((place.slots.includes("night") || place.slots.includes("sunset")) && weather !== "rain") score += 8;
      return { ...place, weatherRank: score };
    })
    .sort((a, b) => b.weatherRank - a.weatherRank);
}

function naivePick(pool, count, weather) {
  const selected = [];
  const food = pool.find((place) => place.category === "음식점");
  const night = pool.find((place) => place.slots.includes("night") || place.slots.includes("sunset"));

  pool.forEach((place) => {
    if (selected.length < count && place !== food && place !== night) selected.push(place);
  });
  if (food && !selected.some((place) => place.id === food.id)) selected.splice(Math.min(1, selected.length), 0, food);
  if (night && !selected.some((place) => place.id === night.id)) selected.push(night);

  if (weather === "extreme") {
    selected.sort((a, b) => Number(a.indoor) - Number(b.indoor));
  }
  return selected.slice(0, count);
}

function assignTimes(places, weather, input, revised) {
  const starts =
    weather === "extreme"
      ? revised
        ? ["09:30", "12:00", "14:10", "17:30", "19:00", "20:00"]
        : ["10:20", "12:30", "14:00", "16:10", "18:20", "19:30"]
      : revised
        ? ["09:50", "12:00", "14:00", "16:10", "18:10", "19:30"]
        : ["10:20", "13:40", "15:20", "17:00", "18:40", "20:00"];

  return places.map((place, index) => {
    const start = starts[index] || addMinutes(starts[starts.length - 1], index * 50);
    const duration = adjustedDuration(place, weather, input);
    return {
      ...place,
      start,
      end: addMinutes(start, duration),
      travel: index === 0 ? 0 : estimateTravel(places[index - 1], place, input.transport),
      distance: index === 0 ? 0 : haversine(places[index - 1].lat, places[index - 1].lng, place.lat, place.lng),
      reason: reasonFor(place, weather)
    };
  });
}

function adjustedDuration(place, weather, input) {
  let duration = place.duration;
  if (weather === "rain" && place.outdoor) duration -= 25;
  if (weather === "extreme" && place.outdoor) duration -= 20;
  if (input.baby) duration += 10;
  return Math.max(duration, 45);
}

function auditSchedule(days, weather, input) {
  const issues = [];
  const passed = [];
  days.forEach((day) => {
    if (!day.items.some((item) => item.category === "음식점")) {
      issues.push({ type: "식사", message: `${day.day}일차에 점심/저녁 식사 장소가 없습니다.` });
    } else {
      passed.push(`${day.day}일차 식사 일정 포함`);
    }

    day.items.forEach((item, index) => {
      const hour = Number(item.start.split(":")[0]);
      if (weather === "rain" && item.outdoor) {
        issues.push({ type: "날씨", message: `${item.start} ${item.name}: 비 오는 날 야외 노출이 큽니다.` });
      }
      if (weather === "extreme" && item.outdoor && hour >= 12 && hour <= 16) {
        issues.push({ type: "날씨", message: `${item.start} ${item.name}: 악천후 시간대 야외 일정입니다.` });
      }
      if (input.baby && item.baby === false) {
        issues.push({ type: "동반", message: `${item.name}: 아기 동반 편의가 낮은 장소입니다.` });
      }
      if (input.pet && item.pet !== true) {
        issues.push({ type: "동반", message: `${item.name}: 반려동물 동반 여부 재확인이 필요합니다.` });
      }
      if (index > 0 && item.distance > transportPolicy[input.transport].maxLeg) {
        issues.push({
          type: "이동",
          message: `${day.items[index - 1].name} → ${item.name}: ${item.distance.toFixed(1)}km로 ${transportPolicy[input.transport].label} 기준 부담이 큽니다.`
        });
      }
    });

    const lunchLike = day.items.some((item) => {
      const hour = Number(item.start.split(":")[0]);
      return isMealPlace(item) && hour >= 11 && hour <= 14;
    });
    if (!lunchLike) issues.push({ type: "시간", message: `${day.day}일차 식사 시간이 점심 권장 시간대에서 벗어났습니다.` });
    else passed.push(`${day.day}일차 점심 시간대 배치 확인`);
  });

  if (!issues.some((issue) => issue.type === "이동")) passed.push("교통수단별 이동 한도 통과");
  if (!issues.some((issue) => issue.type === "날씨")) passed.push(`${weatherInfo[weather].danger} 조건 통과`);
  return { issues, passed: [...new Set(passed)] };
}

function reviseSchedule(draft, audit, weather, input, candidates) {
  const actions = [];
  const ranked = rankForWeather(candidates, weather, true);
  const perDayLimit = transportPolicy[input.transport].places[input.pace];
  const used = new Set();

  const revisedDays = draft.map((day) => {
    let items = day.items.map((item) => ({ ...item }));
    items.forEach((item) => used.add(item.id));

    items = items.map((item) => {
      const hour = Number(item.start.split(":")[0]);
      const weatherBad = (weather === "rain" && item.outdoor) || (weather === "extreme" && item.outdoor && hour >= 12 && hour <= 16);
      const companionBad = (input.baby && item.baby === false) || (input.pet && item.pet !== true && !isMealPlace(item));
      if (!weatherBad && !companionBad) return item;
      const replacement = ranked.find((place) => {
        if (used.has(place.id)) return false;
        if (place.category === "음식점") return false;
        if (weather === "rain" && !place.indoor) return false;
        if (weather === "extreme" && hour >= 12 && hour <= 16 && !place.indoor) return false;
        if (input.baby && place.baby === false) return false;
        if (input.pet && place.pet !== true && !isMealPlace(place)) return false;
        return true;
      });
      if (!replacement) return item;
      used.add(replacement.id);
      actions.push(`${item.name}을(를) ${replacement.name}(으)로 교체했습니다. 이유: 날씨/동반 조건 위반 해소`);
      return replacement;
    });

    if (!items.some((item) => isMealPlace(item))) {
      const meal = ranked.find((place) => isMealPlace(place) && !used.has(place.id));
      if (meal) {
        items.splice(1, 0, meal);
        used.add(meal.id);
        actions.push(`${day.day}일차에 식사 장소 ${meal.name}을(를) 추가했습니다.`);
      } else {
        const flexibleMeal = createFlexibleMeal(input.region, day.day, items);
        items.splice(Math.min(1, items.length), 0, flexibleMeal);
        actions.push(`${day.day}일차 식사는 중복 장소 대신 근처 로컬 맛집 탐색 슬롯으로 비워두었습니다.`);
      }
    }

    items = improveRoute(items, input);
    return { day: day.day, items: assignTimes(items.slice(0, perDayLimit), weather, input, true) };
  });

  if (actions.length === 0 && audit.issues.length === 0) actions.push("초기 일정이 주요 검증 기준을 통과해 시간대만 정돈했습니다.");
  return Object.assign(revisedDays, { actions });
}

function createFlexibleMeal(region, day, items) {
  const anchor = items[0] || window.PLACES.find((place) => place.region === region);
  return {
    id: `FLEX_MEAL_${region}_${day}`,
    name: `${region} ${day}일차 로컬 맛집 탐색`,
    region,
    category: "음식점",
    lat: anchor?.lat || 35.15,
    lng: anchor?.lng || 126.92,
    duration: 70,
    indoor: true,
    outdoor: false,
    parking: null,
    baby: true,
    pet: null,
    slots: ["lunch", "dinner"],
    tags: ["food", "local_food", "mood"],
    scores: { clear: 4, rain: 4, extreme: 4 },
    description: "같은 식당을 반복하지 않도록 남겨둔 식사 탐색 시간입니다. 지도에서 현재 동선 근처 맛집을 확인해 고르면 됩니다.",
    evidence: ["중복 일정 방지", "식사 시간 확보", "지도 검색으로 실제 장소 확인"]
  };
}

function isMealPlace(place) {
  return place?.category === "음식점" || place?.category === "시장";
}

function improveRoute(items, input) {
  if (items.length <= 2) return items;
  const food = items.find((item) => isMealPlace(item));
  const night = items.find((item) => item.slots.includes("night") || item.slots.includes("sunset"));
  const rest = items.filter((item) => item !== food && item !== night);
  const ordered = [];
  if (rest.length) ordered.push(rest.shift());
  if (food) ordered.push(food);
  while (rest.length) {
    const current = ordered[ordered.length - 1];
    rest.sort((a, b) => haversine(current.lat, current.lng, a.lat, a.lng) - haversine(current.lat, current.lng, b.lat, b.lng));
    ordered.push(rest.shift());
  }
  if (night) ordered.push(night);
  return ordered;
}

function reasonFor(place, weather) {
  if (weather === "rain" && place.indoor) return "우천 플랜에서 실내 적합도가 높아 선택되었습니다.";
  if (weather === "extreme" && place.indoor) return "악천후 시간대 대체 가능한 실내 장소입니다.";
  if (isMealPlace(place)) return "여행일당 최소 1회 식사 조건과 지역 먹거리 선호를 반영했습니다.";
  if (place.slots.includes("night") || place.slots.includes("sunset")) return "일몰·야경 선호를 반영해 후반 시간대에 배치했습니다.";
  return "페르소나 키워드와 장소 태그의 유사도가 높아 선택되었습니다.";
}

function addMinutes(time, minutes) {
  const [hours, mins] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function estimateTravel(a, b, transport) {
  const distance = haversine(a.lat, a.lng, b.lat, b.lng);
  const policy = transportPolicy[transport];
  return Math.round((distance / policy.speed) * 60 + policy.buffer);
}

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const radius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderResults() {
  const { input, persona, candidates } = state.result;
  document.querySelector("#empty-state").classList.add("hidden");
  document.querySelector("#results").classList.remove("hidden");
  document.querySelector("#hero-photo").src = REGION_PHOTOS[input.region] || imageForPlace(candidates[0]);
  document.querySelector("#hero-photo").alt = `${input.region} 여행 사진`;
  document.querySelector("#trip-summary").textContent = `${input.region} · ${getDays(input)}일 · ${transportPolicy[input.transport].label} · ${input.people}명`;
  document.querySelector("#persona").textContent = persona.sentence;
  document.querySelector("#keywords").textContent = `반영한 키워드: ${persona.keywords.slice(0, 8).join(", ")}${persona.constraints.length ? ` · ${persona.constraints.join(" · ")}` : ""}`;
  document.querySelector("#candidate-count").textContent = candidates.length;
  document.querySelector("#avg-score").textContent = Math.round(candidates.reduce((sum, place) => sum + place.ragScore, 0) / candidates.length);
  document.querySelector("#days-count").textContent = getDays(input);
  renderAgentSimulation();
  renderCandidates(candidates);
  renderPlan();
}

function renderAgentSimulation() {
  const { input, persona, candidates, plans } = state.result;
  const activePlan = plans[state.activePlan] || plans.clear;
  const firstDay = activePlan.final[0]?.items || [];
  const topPlaces = candidates.slice(0, 5);
  const issueCount = Object.values(plans).reduce((sum, plan) => sum + plan.logs.filter((log) => log.tone === "warning").length, 0);
  const fixedCount = Object.values(plans).reduce((sum, plan) => sum + plan.logs.filter((log) => log.tone === "fix").length, 0);

  document.querySelector("#agent-status").textContent = `${candidates.length}곳 검색 · ${fixedCount}회 조정`;
  document.querySelector("#agent-map").dataset.weather = state.activePlan;
  document.querySelector("#journey-icon").textContent = transportIcon(input.transport);
  document.querySelector("#agent-input").textContent = `${input.region} · ${getDays(input)}일 · ${transportPolicy[input.transport].label}`;
  document.querySelector("#agent-rag").textContent = `${persona.keywords.slice(1, 4).join(" · ") || "취향"} 기반`;
  document.querySelector("#agent-sim").textContent = `${issueCount}개 조건 검토`;
  document.querySelector("#agent-plan").textContent = `${firstDay.length}곳부터 배치`;
  document.querySelector("#bubble-rag").textContent = `${topPlaces[0]?.name || input.region} 유사도 우선`;
  document.querySelector("#bubble-sim").textContent = firstDay[1] ? `${firstDay[0].name} → ${firstDay[1].name}` : "동선 계산 완료";
  document.querySelector("#bubble-weather").textContent = activePlan.logs.find((log) => log.tone === "fix")?.message || "날씨별 플랜 검증";

  document.querySelector("#agent-chips").innerHTML = topPlaces
    .map(
      (place, index) => `
        <span style="--delay:${index * 0.35}s; --lane:${index % 3}">
          <strong>${place.ragScore}</strong>
          ${place.name}
        </span>
      `
      )
    .join("");
}

function transportIcon(transport) {
  return {
    car: "🚗",
    transit: "🚌",
    walk: "🚶",
    taxi: "🚕"
  }[transport] || "🚗";
}

function renderCandidates(candidates) {
  document.querySelector("#candidate-list").innerHTML = candidates
    .slice(0, 6)
    .map((place) => {
      return `
        <button type="button" class="candidate-card ${state.selectedPlaceId === place.id ? "active" : ""}" data-place-id="${place.id}">
          <img src="${imageForPlace(place)}" alt="${place.name} 사진" loading="lazy" />
          <div class="candidate-body">
            <strong>${place.name}</strong>
            <p>${place.description}</p>
          </div>
          <div class="tag-row">
            <span class="tag score">${place.ragScore}점</span>
            ${place.evidence.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </button>
      `;
    })
    .join("");
  document.querySelectorAll(".candidate-card").forEach((card) => {
    card.addEventListener("click", () => showPlaceDetail(card.dataset.placeId));
  });
  renderPlaceDetail();
}

function renderPlan() {
  if (!state.result) return;
  const plan = state.result.plans[state.activePlan];
  document.querySelector("#plan-title").textContent = plan.title;
  document.querySelector("#plan-description").textContent = plan.description;
  document.querySelector("#plan-score").textContent = plan.score;
  renderAgentSimulation();
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.plan === state.activePlan);
  });
  document.querySelector("#final-timeline").innerHTML = renderTimeline(plan.final);
  document.querySelectorAll(".schedule-item").forEach((item) => {
    item.addEventListener("click", () => showPlaceDetail(item.dataset.placeId));
  });
  document.querySelector("#simulation-log").innerHTML = plan.logs
    .slice(0, 7)
    .map(
      (log) => `
        <div class="log-row ${log.tone}">
          <strong>${log.type}</strong>
          <span>${log.message}</span>
        </div>
      `
    )
    .join("");
  renderMap(plan.final);
}

function renderTimeline(days) {
  return days
    .map((day) => {
      const items = day.items
        .map(
          (item, index) => `
            <button type="button" class="schedule-item" data-place-id="${item.id}">
              <img class="schedule-photo" src="${imageForPlace(item)}" alt="${item.name} 사진" loading="lazy" />
              <div>
                <div class="place-title">
                  <span>${index + 1}. ${item.name}</span>
                  <span class="badge">${item.category}</span>
                  <span class="badge">이동 ${item.travel}분</span>
                </div>
                <div class="time">${item.start} - ${item.end}</div>
                <p class="reason">${item.reason}</p>
              </div>
            </button>
          `
        )
        .join("");
      return `
        <article class="day-block">
          <div class="day-heading">
            <span>${day.day}일차</span>
            <span>${day.items.length}곳 방문</span>
          </div>
          ${items}
        </article>
      `;
    })
    .join("");
}

function showPlaceDetail(placeId) {
  state.selectedPlaceId = placeId;
  renderPlaceDetail();
  document.querySelectorAll(".candidate-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.placeId === placeId);
  });
  document.querySelector("#place-detail")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderPlaceDetail() {
  const detail = document.querySelector("#place-detail");
  if (!detail || !state.result?.candidates?.length) return;
  const place = findPlaceById(state.selectedPlaceId) || state.result.candidates[0];
  if (!place) {
    detail.classList.add("hidden");
    return;
  }
  detail.classList.remove("hidden");
  const petText = place.pet === true ? "가능" : place.pet === false ? "불가" : "확인 필요";
  const babyText = place.baby ? "편의 좋음" : "동선 확인 필요";
  const indoorText = place.indoor ? "실내" : "야외";
  const parkingText = place.parking ? "주차 가능" : "주차 확인 필요";
  const tags = place.tags.slice(0, 7).map((tag) => labels[tag] || tag);
  const mapLinks = getMapLinks(place);
  detail.innerHTML = `
    <img src="${imageForPlace(place)}" alt="${place.name} 사진" />
    <div class="place-detail-body">
      <p class="eyebrow">장소 상세</p>
      <h3>${place.name}</h3>
      <p>${place.description}</p>
      <div class="detail-grid">
        <span><strong>분류</strong>${place.category}</span>
        <span><strong>공간</strong>${indoorText}</span>
        <span><strong>체류</strong>${place.duration}분</span>
        <span><strong>주차</strong>${parkingText}</span>
        <span><strong>아기</strong>${babyText}</span>
        <span><strong>반려동물</strong>${petText}</span>
      </div>
      <div class="detail-tags">
        ${tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <div class="detail-actions" aria-label="지도에서 장소 확인">
        <a href="${mapLinks.kakao}" target="_blank" rel="noopener">카카오맵에서 보기</a>
        <a href="${mapLinks.naver}" target="_blank" rel="noopener">네이버지도에서 보기</a>
      </div>
      <p class="detail-note">추천 근거: ${(place.evidence || ["지역과 취향 조건에 맞는 장소입니다."]).join(" · ")}</p>
      <p class="detail-note">좌표: ${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}</p>
    </div>
  `;
}

function getMapLinks(place) {
  const query = encodeURIComponent(`${place.region} ${place.name}`);
  return {
    kakao: `https://map.kakao.com/link/search/${query}`,
    naver: `https://map.naver.com/p/search/${query}`
  };
}

function findPlaceById(placeId) {
  if (!placeId) return null;
  const fromCandidates = state.result?.candidates?.find((place) => place.id === placeId);
  if (fromCandidates) return fromCandidates;
  const plans = Object.values(state.result?.plans || {});
  for (const plan of plans) {
    const items = plan.final.flatMap((day) => day.items);
    const found = items.find((place) => place.id === placeId);
    if (found) return found;
  }
  return null;
}

function renderMap(days) {
  const map = document.querySelector("#map");
  const items = days.flatMap((day) => day.items);
  if (!items.length) {
    map.innerHTML = "";
    return;
  }

  if (API_CONFIG.KAKAO_MAP_JS_KEY) {
    map.innerHTML = '<div class="map-loading">Kakao 지도를 불러오는 중입니다.</div>';
    loadKakaoMapScript()
      .then(() => renderKakaoMap(map, items))
      .catch(() => renderFallbackMap(map, items));
    return;
  }

  renderFallbackMap(map, items);
}

function loadKakaoMapScript() {
  if (window.kakao?.maps) {
    return new Promise((resolve) => window.kakao.maps.load(resolve));
  }
  if (kakaoMapState.loading) return kakaoMapState.loading;

  kakaoMapState.loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(API_CONFIG.KAKAO_MAP_JS_KEY)}&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (!window.kakao?.maps) {
        reject(new Error("Kakao Maps SDK was not initialized."));
        return;
      }
      window.kakao.maps.load(resolve);
    };
    script.onerror = () => reject(new Error("Failed to load Kakao Maps SDK."));
    document.head.appendChild(script);
  });

  return kakaoMapState.loading;
}

function renderKakaoMap(container, items) {
  container.innerHTML = "";
  container.classList.add("kakao-map");

  const center = new window.kakao.maps.LatLng(items[0].lat, items[0].lng);
  const kakaoMap = new window.kakao.maps.Map(container, {
    center,
    level: 7
  });
  const bounds = new window.kakao.maps.LatLngBounds();

  items.forEach((item, index) => {
    const position = new window.kakao.maps.LatLng(item.lat, item.lng);
    bounds.extend(position);
    new window.kakao.maps.Marker({
      map: kakaoMap,
      position
    });
    new window.kakao.maps.CustomOverlay({
      map: kakaoMap,
      position,
      yAnchor: 1.7,
      content: `<div class="kakao-label"><strong>${index + 1}</strong><span>${item.name}</span></div>`
    });
  });

  if (items.length > 1) {
    kakaoMap.setBounds(bounds);
  }
}

function renderFallbackMap(map, items) {
  map.classList.remove("kakao-map");
  const latValues = items.map((item) => item.lat);
  const lngValues = items.map((item) => item.lng);
  const minLat = Math.min(...latValues);
  const maxLat = Math.max(...latValues);
  const minLng = Math.min(...lngValues);
  const maxLng = Math.max(...lngValues);
  const latRange = Math.max(maxLat - minLat, 0.01);
  const lngRange = Math.max(maxLng - minLng, 0.01);
  map.innerHTML = items
    .map((item, index) => {
      const left = 12 + ((item.lng - minLng) / lngRange) * 74;
      const top = 88 - ((item.lat - minLat) / latRange) * 76;
      return `
        <span class="marker" style="left:${left}%; top:${top}%">${index + 1}</span>
        <span class="map-label" style="left:${left}%; top:${top}%">${item.name}</span>
      `;
    })
    .join("");
}

function setMessage(message) {
  document.querySelector("#form-message").textContent = message;
}

function imageForPlace(place) {
  if (place?.image) return place.image;
  if (PHOTO_BY_ID[place?.id]) return PHOTO_BY_ID[place.id];
  const key =
    place?.tags?.find((tag) => FALLBACK_PHOTOS[tag]) ||
    (place?.category === "음식점" || place?.category === "시장" ? "food" : "") ||
    (place?.category === "카페" ? "cafe" : "") ||
    (place?.category === "문화시설" ? "culture" : "") ||
    (place?.category === "전망" ? "night_view" : "") ||
    "default";
  const photos = FALLBACK_PHOTOS[key] || FALLBACK_PHOTOS.default;
  return photos[hashPlace(place?.name || place?.id || "default") % photos.length];
}

function hashPlace(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

init();
