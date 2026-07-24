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

const foodWorldcupItems = [
  {
    id: "crab",
    label: "게장·해산물",
    tags: ["food", "local_food", "sea"],
    pattern: /게장|꽃게|해물|해산물|수산|항|회|바다|갈치|준치/,
    visual: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "meat",
    label: "떡갈비·고기",
    tags: ["food", "local_food", "family"],
    pattern: /떡갈비|갈비|고기|구이|불고기|한우|정육|육회|곱창|막창|대창|삼겹살|숯불|오리/,
    visual: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "soup",
    label: "국밥·탕",
    tags: ["food", "local_food"],
    pattern: /국밥|탕|해장국|곰탕|설렁탕|백반|찌개/,
    visual: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "noodle",
    label: "국수·면",
    tags: ["food", "local_food", "daytime"],
    pattern: /국수|냉면|면|막국수|칼국수|소바|라면/,
    visual: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cafe-dessert",
    label: "카페·디저트",
    tags: ["cafe", "mood", "indoor"],
    pattern: /카페|커피|디저트|베이커리|브런치|찻집|빵/,
    visual: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "market",
    label: "시장 먹거리",
    tags: ["food", "market", "local_food"],
    pattern: /시장|장터|먹거리|분식|포차|거리|골목/,
    visual: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "hanjeongsik",
    label: "한정식·남도밥상",
    tags: ["food", "local_food", "family"],
    pattern: /한정식|밥상|남도|정식|회관|가든|식당/,
    visual: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "mood-dining",
    label: "분위기 좋은 식당",
    tags: ["food", "mood", "couple"],
    pattern: /레스토랑|다이닝|카페|라운지|브런치|그릴|바|포차/,
    visual: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
  }
];

const state = {
  tastes: {},
  foodCup: createFoodCupState(),
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
  walk: { label: "도보 중심", speed: 4, buffer: 12, maxLeg: 1.2, maxDayDistance: 4.2, places: { relaxed: 3, normal: 3, packed: 3 } },
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

const REGION_CENTERS = {
  광주: { lat: 35.1595, lng: 126.8526 },
  여수: { lat: 34.7604, lng: 127.6622 },
  목포: { lat: 34.8118, lng: 126.3922 },
  순천: { lat: 34.9506, lng: 127.4872 },
  담양: { lat: 35.3211, lng: 126.9882 }
};

const DEPARTURE_POINTS = [
  { id: "서울", name: "서울", lat: 37.5547, lng: 126.9706 },
  { id: "경기", name: "경기", lat: 37.4138, lng: 127.5183 },
  { id: "인천", name: "인천", lat: 37.4563, lng: 126.7052 },
  { id: "강원", name: "강원", lat: 37.8228, lng: 128.1555 },
  { id: "충북", name: "충북", lat: 36.6357, lng: 127.4917 },
  { id: "충남", name: "충남", lat: 36.5184, lng: 126.8000 },
  { id: "대전", name: "대전", lat: 36.3326, lng: 127.4348 },
  { id: "세종", name: "세종", lat: 36.4801, lng: 127.2890 },
  { id: "전북", name: "전북", lat: 35.7175, lng: 127.1530 },
  { id: "광주", name: "광주", lat: 35.1595, lng: 126.8526 },
  { id: "전남", name: "전남", lat: 34.8679, lng: 126.9910 },
  { id: "대구", name: "대구", lat: 35.8796, lng: 128.6286 },
  { id: "경북", name: "경북", lat: 36.4919, lng: 128.8889 },
  { id: "부산", name: "부산", lat: 35.1152, lng: 129.0415 },
  { id: "울산", name: "울산", lat: 35.5384, lng: 129.3114 },
  { id: "경남", name: "경남", lat: 35.4606, lng: 128.2132 },
  { id: "제주", name: "제주", lat: 33.4996, lng: 126.5312 }
];

function init() {
  renderTasteCards();
  renderFoodWorldcup();
  document.querySelector("#generate").addEventListener("click", generate);
  document.querySelector("#demo-fill").addEventListener("click", fillDemo);
  document.querySelector("#edit-input").addEventListener("click", showInputPanel);
  document.querySelector("#export-schedule").addEventListener("click", exportActiveSchedule);
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePlan = button.dataset.plan;
      document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPlan();
    });
  });
}

function fillDemo() {
  const form = document.querySelector("#trip-form");
  form.region.value = "여수";
  form.tripLength.value = "2";
  form.departurePlace.value = "광주";
  form.departureTime.value = "08:00";
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
  state.foodCup = createFoodCupState();
  ["crab", "noodle", "cafe-dessert", "hanjeongsik", "crab", "hanjeongsik", "crab"].forEach((foodId) => {
    chooseFoodCupItem(foodWorldcupItems.find((item) => item.id === foodId), { silent: true });
  });
  renderTasteCards();
  renderFoodWorldcup();
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

function createFoodCupState(contenders = foodWorldcupItems, history = []) {
  return {
    round: contenders.length,
    pairs: pairFoodItems(contenders),
    pairIndex: 0,
    winners: [],
    history,
    champion: null
  };
}

function pairFoodItems(items) {
  const pairs = [];
  for (let index = 0; index < items.length; index += 2) {
    pairs.push([items[index], items[index + 1]]);
  }
  return pairs;
}

function renderFoodWorldcup() {
  const wrap = document.querySelector("#food-cup");
  if (!wrap) return;
  const cup = state.foodCup;
  const ranking = getFoodRanking(cup);

  if (cup.champion) {
    wrap.innerHTML = `
      <div class="food-cup-result">
        <span>음식 취향 순위</span>
        <strong>${ranking[0]?.label || cup.champion.label}</strong>
        <div class="food-rank-list">
          ${ranking
            .slice(0, 4)
            .map((item, index) => `<span><b>${index + 1}</b>${item.label}</span>`)
            .join("")}
        </div>
        <p>우승 음식 하나만 보지 않고, 선택 과정에서 살아남은 순위대로 식당 추천 점수에 반영합니다.</p>
        <button type="button" id="food-cup-reset">다시 고르기</button>
      </div>
    `;
    document.querySelector("#food-cup-reset").addEventListener("click", resetFoodWorldcup);
    return;
  }

  const pair = cup.pairs[cup.pairIndex];
  const title = cup.round === 8 ? "8강" : cup.round === 4 ? "4강" : "결승";
  wrap.innerHTML = `
    <div class="food-cup-head">
      <strong>${title}</strong>
      <span>${cup.pairIndex + 1} / ${cup.pairs.length}</span>
      <button type="button" id="food-cup-reset">초기화</button>
    </div>
    <div class="food-cup-match">
      ${pair.map((item) => renderFoodCupChoice(item)).join("")}
    </div>
  `;

  wrap.querySelectorAll(".food-choice").forEach((button) => {
    button.addEventListener("click", () => {
      chooseFoodCupItem(foodWorldcupItems.find((item) => item.id === button.dataset.foodId));
    });
  });
  document.querySelector("#food-cup-reset").addEventListener("click", resetFoodWorldcup);
}

function renderFoodCupChoice(item) {
  return `
    <button type="button" class="food-choice" data-food-id="${item.id}" style="background-image: linear-gradient(180deg, rgba(7, 31, 48, 0.06), rgba(7, 31, 48, 0.66)), url('${item.visual}');">
      <span>${item.label}</span>
    </button>
  `;
}

function chooseFoodCupItem(item, options = {}) {
  if (!item || state.foodCup.champion) return;
  const cup = state.foodCup;
  cup.winners.push(item);
  cup.history.push(item);

  if (cup.pairIndex + 1 < cup.pairs.length) {
    cup.pairIndex += 1;
  } else if (cup.winners.length === 1) {
    cup.champion = cup.winners[0];
  } else {
    state.foodCup = createFoodCupState(cup.winners, cup.history);
  }

  if (!options.silent) renderFoodWorldcup();
}

function resetFoodWorldcup() {
  state.foodCup = createFoodCupState();
  renderFoodWorldcup();
}

function getFoodRanking(cup = state.foodCup) {
  const recentFirst = [...(cup.history || [])].reverse();
  return [...new Map(recentFirst.map((item) => [item.id, item])).values()];
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
  showResultPanel();
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
  const input = {
    region: form.get("region"),
    tripLength: Number(form.get("tripLength") || 2),
    departurePlace: String(form.get("departurePlace") || "").trim(),
    departureTime: form.get("departureTime"),
    people: Number(form.get("people") || 1),
    pace: form.get("pace"),
    transport: form.get("transport"),
    companion: form.get("companion"),
    baby: form.has("baby"),
    pet: form.has("pet"),
    styles: form.getAll("styles"),
    request: String(form.get("request") || "").trim(),
    tastes: Object.values(state.tastes),
    foodPreference: getFoodPreference()
  };
  input.arrival = estimateInboundTrip(input);
  return input;
}

function getFoodPreference() {
  const ranking = getFoodRanking();
  return {
    champion: ranking[0] || null,
    ranking,
    selected: ranking
  };
}

function validate(input) {
  if (![1, 2, 3].includes(input.tripLength)) return "여행 기간을 선택해주세요.";
  if (!input.departurePlace) return "출발 장소를 입력해주세요.";
  if (!input.departureTime) return "출발 시간을 입력해주세요.";
  if (Object.keys(state.tastes).length < 4) return "취향 토너먼트를 4개 이상 선택해주세요.";
  if (input.request.length > 200) return "추가 요청은 200자 이내로 입력해주세요.";
  return "";
}

function getDays(input) {
  return Math.min(Math.max(Number(input.tripLength) || 1, 1), 3);
}

function buildPersona(input) {
  const requestTags = extractRequestTags(input.request);
  const foodTags = (input.foodPreference.ranking || []).flatMap((item) => item.tags).slice(0, 8);
  const tags = [...new Set([...input.styles, ...input.tastes, ...requestTags, ...foodTags])];
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
  if (input.foodPreference.ranking?.length) {
    const topFoods = input.foodPreference.ranking.slice(0, 3).map((item, index) => `${index + 1}순위 ${item.label}`);
    constraints.push(`음식 월드컵 순위: ${topFoods.join(", ")} 선호`);
  }
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
      const foodBoost = scoreFoodPreference(place, input.foodPreference);
      const requestMatches = getRequestMatches(place, input.request);
      const textBoost = scoreRequest(place, input.request, requestMatches);
      const score = Math.round(28 + semantic + tasteFit + metadata + foodBoost + textBoost);
      return {
        ...place,
        rankScore: score,
        ragScore: Math.max(0, Math.min(score, 98)),
        tasteFit,
        foodMatches: getFoodPreferenceMatches(place, input.foodPreference),
        matchedTags,
        requestMatches,
        evidence: buildEvidence(place, matchedTags, input, requestMatches)
      };
    })
    .sort((a, b) => b.requestMatches.length - a.requestMatches.length || b.rankScore - a.rankScore || b.tasteFit - a.tasteFit);
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
  if (input.baby && place.indoor) score += 5;
  if (input.baby && place.parking) score += 6;
  if (input.baby && place.duration <= 90) score += 4;
  if (input.baby && place.outdoor && !place.parking) score -= 5;
  if (input.transport === "car" && place.parking) score += 7;
  if (input.transport === "walk" && place.tags.includes("walking")) score += 6;
  if (input.pet && place.pet === true) score += 15;
  if (input.pet && isMealPlace(place) && place.pet === false) score -= 18;
  if (input.pet && isMealPlace(place) && place.pet == null) score -= 6;
  if (input.companion === "couple" && place.tags.includes("couple")) score += 5;
  return score;
}

function scoreFoodPreference(place, foodPreference) {
  const ranking = foodPreference?.ranking || foodPreference?.selected || [];
  if (!ranking.length || !isMealPlace(place)) return 0;
  let score = 0;
  const text = `${place.name} ${place.category} ${place.description || ""} ${place.address || ""}`;
  const weights = [90, 58, 36, 22, 14, 9, 6, 4];

  ranking.forEach((item, index) => {
    const weight = weights[index] || 3;
    if (item.pattern.test(text)) score += weight;
    if (index < 3 && item.tags.some((tag) => place.tags.includes(tag))) {
      score += Math.max(4, Math.round(weight * 0.25));
    }
  });

  return score;
}

function getFoodPreferenceMatches(place, foodPreference) {
  const ranking = foodPreference?.ranking || foodPreference?.selected || [];
  if (!ranking.length || !isMealPlace(place)) return [];
  const text = `${place.name} ${place.category} ${place.description || ""} ${place.address || ""}`;
  return ranking.filter((item) => item.pattern.test(text)).map((item) => item.label);
}

function scoreRequest(place, request, requestMatches = getRequestMatches(place, request)) {
  if (!request) return 0;
  let score = 0;
  score += requestMatches.length * 42;
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

function getRequestMatches(place, request) {
  if (!request) return [];
  const text = `${place.name} ${place.category} ${place.description || ""} ${place.address || ""}`;
  const compactText = text.replace(/\s+/g, "");
  const matches = [];
  const rules = [
    { label: "게장", request: /게장/, place: /게장/ },
    { label: "민어·해산물", request: /민어|회|해산물|수산/, place: /민어|회|수산|해산물|항|포구|시장|어시장|바다/ },
    { label: "야경", request: /야경|밤|일몰|노을/, place: /야경|일몰|노을|전망|대교|타워|케이블카|밤바다/ },
    { label: "카페", request: /카페|커피|디저트|브런치/, place: /카페|커피|디저트|브런치|베이커리/ },
    { label: "바다", request: /바다|해변|해상|섬|오션|항구/, place: /바다|해변|해수욕장|해상|섬|항|포구|등대|대교/ },
    { label: "숲·정원", request: /숲|정원|자연|산책|힐링|공원/, place: /숲|정원|수목원|공원|산책|산|원림|생태/ },
    { label: "실내·전시", request: /실내|전시|박물관|미술관|문화|기념관/, place: /박물관|미술관|전시|문화|기념관|체험관/ },
    { label: "시장·먹거리", request: /시장|먹거리|맛집|식사|음식|로컬|전통/, place: /시장|거리|골목|식당|회관|밥상|국밥|냉면|게장|카페/ },
    { label: "아이·가족", request: /아이|아기|가족|부모님/, place: /공원|체험|박물관|미술관|정원|아쿠아|키즈/ }
  ];

  rules.forEach((rule) => {
    if (rule.request.test(request) && rule.place.test(text)) matches.push(rule.label);
  });

  extractRequestKeywords(request).forEach((keyword) => {
    const compactKeyword = keyword.replace(/\s+/g, "");
    if (text.includes(keyword) || compactText.includes(compactKeyword)) matches.push(keyword);
  });

  return [...new Set(matches)].slice(0, 4);
}

function extractRequestKeywords(request) {
  return String(request || "")
    .replace(/[^\w가-힣\s]/g, " ")
    .split(/\s+/)
    .map((word) =>
      word.replace(/(이랑|랑|하고|와|과|으로|로|에서|에는|에게|한테|은|는|이|가|을|를|도|만|좀|꼭|포함|넣어줘|넣어|하고|싶음|싶어|주세요)$/g, "")
    )
    .filter((word) => word.length >= 2 && !["여행", "일정", "코스", "장소", "추천", "반영"].includes(word));
}

function buildEvidence(place, matchedTags, input, requestMatches = []) {
  const reasons = [];
  if (requestMatches.length) reasons.push(`요청 반영: ${requestMatches.join(", ")}`);
  if (place.foodMatches?.length) reasons.push(`음식 월드컵: ${place.foodMatches.slice(0, 2).join(", ")}`);
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
    ...final.actions.map((action) => ({ type: "수정", tone: "fix", message: action })),
    ...finalAudit.issues.map((issue) => ({ type: issue.type, tone: "warning", message: issue.message })),
    ...finalAudit.passed.map((message) => ({ type: "통과", tone: "ok", message }))
  ];
  const score = Math.max(68, 96 - finalAudit.issues.length * 11);
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
  const requiredPlaces = selectRequiredPlaces(ranked, input).slice(0, days);

  for (let day = 1; day <= days; day += 1) {
    const freshPool = ranked.filter((place) => !used.has(place.id));
    const plannedRequired = requiredPlaces[day - 1];
    const requestPick =
      plannedRequired && !used.has(plannedRequired.id)
        ? plannedRequired
        : ranked.find((place) => !used.has(place.id) && place.requestMatches?.length);
    const selected =
      input.transport === "walk" && requestPick
        ? pickWalkablePlaces([requestPick, ...freshPool.filter((place) => place.id !== requestPick.id)], Math.min(placesPerDay, freshPool.length), weather, input, requestPick)
        : pickPlacesForTransport(freshPool, Math.min(placesPerDay, freshPool.length), weather, input);
    if (requestPick && !selected.some((place) => place.id === requestPick.id)) {
      selected.splice(Math.min(1, selected.length), 0, requestPick);
      if (selected.length > perDayLimit) selected.pop();
    }
    selected.forEach((place) => used.add(place.id));
    result.push({
      day,
      items: assignTimes(selected, weather, input, false, day)
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

function pickPlacesForTransport(pool, count, weather, input) {
  if (input.transport === "walk") return pickWalkablePlaces(pool, count, weather, input);
  return naivePick(pool, count, weather, input);
}

function pickWalkablePlaces(pool, count, weather, input, anchorPlace = null) {
  const policy = transportPolicy[input.transport];
  const targetCount = Math.max(1, count);
  const candidates = pool.slice(0, 36);
  const seeds = candidates.filter((place) => !isMealPlace(place)).slice(0, 14);
  const preferredMeal = selectPreferredMeal(candidates, input);
  const seedPool = [
    ...(anchorPlace ? [anchorPlace] : []),
    ...(preferredMeal && preferredMeal.id !== anchorPlace?.id ? [preferredMeal] : []),
    ...(seeds.length ? seeds : candidates.slice(0, 14))
  ].filter((place, index, array) => array.findIndex((item) => item.id === place.id) === index);
  let best = [];
  let bestScore = -Infinity;

  seedPool.forEach((seed) => {
    const cluster = [seed];
    while (cluster.length < targetCount) {
      const next = candidates
        .filter((place) => !cluster.some((item) => item.id === place.id))
        .map((place) => {
          const minDistance = Math.min(...cluster.map((item) => haversine(item.lat, item.lng, place.lat, place.lng)));
          const mealBonus = !cluster.some((item) => isMealPlace(item)) && isMealPlace(place) ? 38 : 0;
          const nightPenalty = place.slots.includes("night") || place.slots.includes("sunset") ? 10 : 0;
          const tooFarPenalty = minDistance > policy.maxLeg ? (minDistance - policy.maxLeg) * 180 : 0;
          return {
            place,
            score: (place.weatherRank || place.rankScore || place.ragScore || 0) + mealBonus - nightPenalty - minDistance * 58 - tooFarPenalty
          };
        })
        .sort((a, b) => b.score - a.score)[0]?.place;
      if (!next) break;
      cluster.push(next);
    }

    const ordered = improveRoute(cluster, input);
    const quality = scoreWalkableRoute(ordered, input);
    if (quality > bestScore) {
      best = ordered;
      bestScore = quality;
    }
  });

  if (!best.length) best = candidates.slice(0, targetCount);
  if (!best.some((item) => isMealPlace(item))) {
    const anchor = best[0];
    const preferredCloseMeal = selectPreferredMeal(
      candidates.filter((place) => !best.some((item) => item.id === place.id)),
      input,
      anchor
    );
    const closeMeal = preferredCloseMeal || candidates
      .filter((place) => isMealPlace(place) && !best.some((item) => item.id === place.id))
      .sort((a, b) => haversine(anchor.lat, anchor.lng, a.lat, a.lng) - haversine(anchor.lat, anchor.lng, b.lat, b.lng))[0];
    if (closeMeal) {
      best = [best[0], closeMeal, ...best.slice(1)].slice(0, targetCount);
    }
  }

  return limitMealPlaces(improveRoute(best.slice(0, targetCount), input), input, targetCount);
}

function scoreWalkableRoute(items, input) {
  const policy = transportPolicy[input.transport];
  const ordered = improveRoute(items, input);
  const distances = legDistances(ordered);
  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0);
  const worstLeg = Math.max(0, ...distances);
  const longLegs = distances.filter((distance) => distance > policy.maxLeg).length;
  const mealPenalty = ordered.some((item) => isMealPlace(item)) ? 0 : 90;
  const score = ordered.reduce((sum, item) => sum + (item.weatherRank || item.rankScore || item.ragScore || 0), 0);
  return score - totalDistance * 28 - worstLeg * 80 - longLegs * 220 - mealPenalty;
}

function naivePick(pool, count, weather, input = {}) {
  const selected = [];
  const food = selectPreferredMeal(pool, input) || pool.find((place) => isMealPlace(place));
  const night = pool.find((place) => place.slots.includes("night") || place.slots.includes("sunset"));

  pool.forEach((place) => {
    if (selected.length < count && place !== food && place !== night && canAddMealPlace(selected, place, input)) selected.push(place);
  });
  if (food && !selected.some((place) => place.id === food.id)) selected.splice(Math.min(1, selected.length), 0, food);
  if (night && !selected.some((place) => place.id === night.id)) selected.push(night);

  if (weather === "extreme") {
    selected.sort((a, b) => Number(a.indoor) - Number(b.indoor));
  }
  return limitMealPlaces(selected.slice(0, count), input, count);
}

function getMaxMealsPerDay(input) {
  const foodFocused = input.styles?.includes("food");
  if (foodFocused) return input.pace === "packed" ? 4 : 3;
  return 2;
}

function canAddMealPlace(selected, place, input) {
  if (!isMealPlace(place)) return true;
  return selected.filter((item) => isMealPlace(item)).length < getMaxMealsPerDay(input);
}

function limitMealPlaces(items, input, count = items.length) {
  const maxMeals = getMaxMealsPerDay(input);
  const meals = items.filter((item) => isMealPlace(item));
  if (meals.length <= maxMeals) return items.slice(0, count);

  const keepMeals = new Set(
    meals
      .map((item) => ({
        item,
        score: scoreFoodPreference(item, input.foodPreference) * 2 + (item.weatherRank || item.rankScore || item.ragScore || 0)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxMeals)
      .map((entry) => entry.item.id)
  );

  const trimmed = items.filter((item) => !isMealPlace(item) || keepMeals.has(item.id));
  return trimmed.slice(0, count);
}

function selectPreferredMeal(pool, input, anchor = null) {
  const meals = pool.filter((place) => isMealPlace(place));
  if (!meals.length) return null;
  const ranking = input.foodPreference?.ranking || [];
  return meals
    .map((place) => {
      const foodScore = scoreFoodPreference(place, input.foodPreference);
      const distancePenalty = anchor ? haversine(anchor.lat, anchor.lng, place.lat, place.lng) * 4 : 0;
      const rankScore = place.weatherRank || place.rankScore || place.ragScore || 0;
      const companionPenalty =
        (input.pet && place.pet === false ? 22 : 0) +
        (input.pet && place.pet == null ? 8 : 0) +
        (input.baby && place.baby === false ? 35 : 0);
      return {
        place,
        score: foodScore * 2.5 + rankScore - distancePenalty - companionPenalty,
        foodScore
      };
    })
    .filter((entry) => !ranking.length || entry.foodScore > 0)
    .sort((a, b) => b.score - a.score)[0]?.place || null;
}

function assignTimes(places, weather, input, revised, day = 1) {
  const starts = getScheduleStarts(weather, input, revised, day);

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

function getScheduleStarts(weather, input, revised, day = 1) {
  const base =
    weather === "extreme"
      ? revised
        ? ["09:30", "12:00", "14:10", "17:30", "19:00", "20:00"]
        : ["10:20", "12:30", "14:00", "16:10", "18:20", "19:30"]
      : revised
        ? ["09:50", "12:00", "14:00", "16:10", "18:10", "19:30"]
        : ["10:20", "13:40", "15:20", "17:00", "18:40", "20:00"];

  if (day !== 1 || !input.arrival?.time) return base;
  const firstStart = Math.max(timeToMinutes(base[0]), timeToMinutes(input.arrival.time) + 30);
  if (firstStart < timeToMinutes("11:30")) return shiftStarts(base, firstStart);
  if (firstStart < timeToMinutes("14:00")) return shiftStarts(["12:00", "14:00", "16:10", "18:10", "19:30"], firstStart);
  if (firstStart < timeToMinutes("17:30")) return shiftStarts(["14:00", "16:10", "18:10", "19:30"], firstStart);
  return shiftStarts(["18:00", "19:30", "20:40"], firstStart);
}

function shiftStarts(starts, minimumStart) {
  const first = Math.max(timeToMinutes(starts[0]), minimumStart);
  const offset = first - timeToMinutes(starts[0]);
  return starts.map((time) => minutesToTime(timeToMinutes(time) + offset));
}

function estimateInboundTrip(input) {
  const destination = REGION_CENTERS[input.region] || REGION_CENTERS.광주;
  const departure = resolveDeparturePoint(input.departurePlace);
  const distance = haversine(departure.lat, departure.lng, destination.lat, destination.lng);
  const policy = transportPolicy[input.transport] || transportPolicy.car;
  const longTripSpeed = input.transport === "walk" ? 4 : input.transport === "transit" ? 55 : input.transport === "taxi" ? 62 : 65;
  const buffer = input.transport === "transit" ? 35 : input.transport === "walk" ? 0 : 25;
  const minutes = Math.max(0, Math.round((distance / Math.max(longTripSpeed, policy.speed)) * 60 + buffer));
  const arrivalMinutes = timeToMinutes(input.departureTime || "08:00") + minutes;
  return {
    from: departure.name,
    distance,
    minutes,
    time: minutesToTime(arrivalMinutes)
  };
}

function resolveDeparturePoint(value) {
  return DEPARTURE_POINTS.find((point) => point.id === value) || DEPARTURE_POINTS.find((point) => point.id === "광주");
}

function timeToMinutes(time) {
  const [hours, mins] = String(time || "00:00").split(":").map(Number);
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(mins) ? mins : 0);
}

function minutesToTime(totalMinutes) {
  const normalized = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
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
  const seenPlaces = new Set();
  days.forEach((day) => {
    if (input.transport === "walk") {
      day.items = enforceWalkAuditLimit(day.items, input);
    }

    if (!day.items.some((item) => isMealPlace(item))) {
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
      if (input.pet && item.pet !== true && !isMealPlace(item)) {
        issues.push({ type: "동반", message: `${item.name}: 반려동물 동반 여부 재확인이 필요합니다.` });
      }
      if (index > 0 && item.distance > transportPolicy[input.transport].maxLeg) {
        issues.push({
          type: "이동",
          message: `${day.items[index - 1].name} → ${item.name}: ${item.distance.toFixed(1)}km로 ${transportPolicy[input.transport].label} 기준 부담이 큽니다.`
        });
      }
    });

    if (input.transport === "walk") {
      const totalWalkDistance = legDistances(day.items).reduce((sum, distance) => sum + distance, 0);
      if (totalWalkDistance > transportPolicy.walk.maxDayDistance) {
        issues.push({
          type: "이동",
          message: `${day.day}일차 도보 이동 합계가 ${totalWalkDistance.toFixed(1)}km로 하루 도보 권장 범위를 넘습니다.`
        });
      } else {
        passed.push(`${day.day}일차 도보 이동 합계 ${totalWalkDistance.toFixed(1)}km로 조정`);
      }
    }

    day.items.forEach((item) => {
      const key = placeUniqueKey(item);
      if (seenPlaces.has(key)) {
        issues.push({ type: "중복", message: `${item.name}: 이미 다른 일정에 포함된 장소입니다.` });
      } else {
        seenPlaces.add(key);
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
  const requiredPlaces = selectRequiredPlaces(ranked, input).slice(0, getDays(input));

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
      const meal = selectPreferredMeal(
        ranked.filter((place) => !used.has(place.id)),
        input,
        items[0]
      ) || ranked.find((place) => isMealPlace(place) && !used.has(place.id));
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

    const required = requiredPlaces[day.day - 1];
    if (required && !items.some((item) => item.id === required.id)) {
      const replaceIndex = Math.max(0, items.findIndex((item) => !isMealPlace(item) && !(item.slots.includes("night") || item.slots.includes("sunset"))));
      const index = replaceIndex === -1 ? Math.max(0, items.length - 1) : replaceIndex;
      const removed = items[index];
      items[index] = required;
      used.add(required.id);
      actions.push(`${day.day}일차에 꼭 반영 요청과 맞는 ${required.name}을(를) 배치했습니다.${removed ? ` (${removed.name} 대체)` : ""}`);
    }

    items = improveRoute(items, input);
    if (input.transport === "walk") {
      items = constrainWalkableRoute(items, ranked, used, input, actions, day.day, weather);
    }
    return { day: day.day, items: assignTimes(limitMealPlaces(items, input, perDayLimit), weather, input, true, day.day) };
  });

  const dedupedDays = resolveDuplicateSchedule(revisedDays, ranked, input, actions, weather);
  if (actions.length === 0 && audit.issues.length === 0) actions.push("초기 일정이 주요 검증 기준을 통과해 시간대만 정돈했습니다.");
  return Object.assign(dedupedDays, { actions });
}

function resolveDuplicateSchedule(days, ranked, input, actions, weather) {
  const seen = new Set();
  const usedIds = new Set();

  days.forEach((day) => {
    let items = day.items.map((item) => ({ ...item }));

    items = items
      .map((item, index) => {
        const key = placeUniqueKey(item);
        if (!seen.has(key)) {
          seen.add(key);
          if (item.id) usedIds.add(item.id);
          return item;
        }

        const replacement = findDuplicateReplacement(item, items, ranked, usedIds, seen, input, weather, index);
        if (replacement) {
          const replacementKey = placeUniqueKey(replacement);
          seen.add(replacementKey);
          if (replacement.id) usedIds.add(replacement.id);
          actions.push(`${day.day}일차 중복 장소 ${item.name} 대신 ${replacement.name}을(를) 배치했습니다.`);
          return replacement;
        }

        if (isMealPlace(item)) {
          const flexibleMeal = createFlexibleMeal(input.region, day.day, items);
          seen.add(placeUniqueKey(flexibleMeal));
          actions.push(`${day.day}일차 중복 식당 ${item.name}은(는) 근처 로컬 맛집 탐색 슬롯으로 바꿨습니다.`);
          return flexibleMeal;
        }

        actions.push(`${day.day}일차 중복 장소 ${item.name}을(를) 제외했습니다.`);
        return null;
      })
      .filter(Boolean);

    if (!items.some((item) => isMealPlace(item))) {
      const meal =
        selectPreferredMeal(
          ranked.filter((place) => !usedIds.has(place.id) && !seen.has(placeUniqueKey(place))),
          input,
          items[0]
        ) ||
        findDuplicateReplacement({ category: "음식점", lat: items[0]?.lat, lng: items[0]?.lng }, items, ranked, usedIds, seen, input, weather, 1);
      if (meal) {
        items.splice(Math.min(1, items.length), 0, meal);
        seen.add(placeUniqueKey(meal));
        usedIds.add(meal.id);
        actions.push(`${day.day}일차 식사 중복을 피하기 위해 ${meal.name}을(를) 새로 배치했습니다.`);
      } else {
        const flexibleMeal = createFlexibleMeal(input.region, day.day, items);
        items.splice(Math.min(1, items.length), 0, flexibleMeal);
        seen.add(placeUniqueKey(flexibleMeal));
        actions.push(`${day.day}일차 식사는 중복 방지를 위해 근처 로컬 맛집 탐색 슬롯으로 조정했습니다.`);
      }
    }

    day.items = assignTimes(limitMealPlaces(improveRoute(items, input), input), weather, input, true, day.day);
  });

  return days;
}

function findDuplicateReplacement(target, dayItems, ranked, usedIds, seen, input, weather, index) {
  const wantMeal = isMealPlace(target);
  const previous = dayItems[index - 1];
  const next = dayItems[index + 1];
  const policy = transportPolicy[input.transport];

  return ranked.find((place) => {
    if (usedIds.has(place.id) || seen.has(placeUniqueKey(place))) return false;
    if (wantMeal !== isMealPlace(place)) return false;
    if (!wantMeal && place.category === "음식점") return false;
    if (weather === "rain" && target.indoor && !place.indoor) return false;
    if (input.baby && place.baby === false) return false;
    if (input.pet && place.pet !== true && !isMealPlace(place)) return false;
    if (input.transport === "walk") {
      const prevDistance = previous ? haversine(previous.lat, previous.lng, place.lat, place.lng) : 0;
      const nextDistance = next ? haversine(place.lat, place.lng, next.lat, next.lng) : 0;
      if (previous && prevDistance > policy.maxLeg) return false;
      if (next && nextDistance > policy.maxLeg) return false;
    }
    return true;
  });
}

function selectRequiredPlaces(ranked, input) {
  if (!input.request) return [];
  const selected = [];
  const covered = new Set();
  ranked
    .filter((place) => place.requestMatches?.length)
    .forEach((place) => {
      const newMatches = place.requestMatches.filter((match) => !covered.has(match));
      if (!newMatches.length) return;
      selected.push(place);
      newMatches.forEach((match) => covered.add(match));
    });
  ranked
    .filter((place) => place.requestMatches?.length && !selected.some((item) => item.id === place.id))
    .forEach((place) => selected.push(place));
  return selected;
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

function placeUniqueKey(place) {
  if (!place) return "";
  if (String(place.id || "").startsWith("FLEX_MEAL_")) return place.id;
  return String(place.name || place.id || "").replace(/\s+/g, "").toLowerCase();
}

function isMealPlace(place) {
  return place?.category === "음식점" || place?.category === "시장";
}

function legDistances(items) {
  return items.slice(1).map((item, index) => haversine(items[index].lat, items[index].lng, item.lat, item.lng));
}

function enforceWalkAuditLimit(items, input) {
  if (input.transport !== "walk") return items;
  const policy = transportPolicy.walk;
  let route = improveRoute(items, input);
  let guard = 0;

  while (route.length > 1 && guard < 5) {
    guard += 1;
    const distances = legDistances(route);
    const total = distances.reduce((sum, distance) => sum + distance, 0);
    const longIndex = distances.findIndex((distance) => distance > policy.maxLeg);
    if (longIndex === -1 && total <= policy.maxDayDistance) break;

    const candidates = route
      .map((item, index) => ({
        item,
        index,
        protected: Boolean(item.requestMatches?.length),
        pressure:
          (index > 0 ? distances[index - 1] || 0 : 0) +
          (index < distances.length ? distances[index] || 0 : 0) -
          routeRankValue(item) / 180
      }))
      .filter((entry) => !entry.protected)
      .sort((a, b) => b.pressure - a.pressure);

    const removeIndex = candidates[0]?.index;
    if (removeIndex == null) break;
    route.splice(removeIndex, 1);
    route = improveRoute(route, input);
  }

  return route;
}

function constrainWalkableRoute(items, ranked, used, input, actions, dayNumber, weather) {
  const policy = transportPolicy[input.transport];
  let route = improveRoute(items, input);
  let guard = 0;

  while (guard < 5) {
    guard += 1;
    const distances = legDistances(route);
    const longIndex = distances.findIndex((distance) => distance > policy.maxLeg);
    if (longIndex === -1) break;

    const offenderIndex = longIndex + 1;
    const offender = route[offenderIndex];
    const previous = route[offenderIndex - 1];
    const next = route[offenderIndex + 1];
    const replacement = ranked.find((place) => {
      if (used.has(place.id) || route.some((item) => item.id === place.id)) return false;
      if (isMealPlace(offender) !== isMealPlace(place)) return false;
      if (weather === "rain" && offender.indoor && !place.indoor) return false;
      if (input.baby && place.baby === false) return false;
      if (input.pet && place.pet !== true && !isMealPlace(place)) return false;
      const prevDistance = haversine(previous.lat, previous.lng, place.lat, place.lng);
      const nextDistance = next ? haversine(place.lat, place.lng, next.lat, next.lng) : 0;
      return prevDistance <= policy.maxLeg && (!next || nextDistance <= policy.maxLeg);
    });

    if (replacement) {
      route[offenderIndex] = replacement;
      used.add(replacement.id);
      actions.push(`${dayNumber}일차 도보 이동 부담을 줄이기 위해 ${offender.name} 대신 가까운 ${replacement.name}을(를) 배치했습니다.`);
      route = improveRoute(route, input);
      continue;
    }

    if (route.length > 2 && !offender.requestMatches?.length) {
      route.splice(offenderIndex, 1);
      actions.push(`${dayNumber}일차 ${previous.name} → ${offender.name} 구간이 도보 기준을 넘어서 ${offender.name}을(를) 제외했습니다.`);
      route = improveRoute(route, input);
      continue;
    }

    if (route.length > 2 && !previous.requestMatches?.length) {
      route.splice(offenderIndex - 1, 1);
      actions.push(`${dayNumber}일차 ${previous.name} → ${offender.name} 구간이 도보 기준을 넘어서 ${previous.name}을(를) 제외했습니다.`);
      route = improveRoute(route, input);
      continue;
    }

    if (route.length > 2) {
      const removeIndex = route
        .map((item, index) => ({ item, index, protected: Boolean(item.requestMatches?.length) || isMealPlace(item) }))
        .filter((entry) => entry.index > 0 && !entry.protected)
        .sort((a, b) => (routeRankValue(a.item) - routeRankValue(b.item)))[0]?.index;
      if (removeIndex != null) {
        const removed = route.splice(removeIndex, 1)[0];
        actions.push(`${dayNumber}일차 도보 동선을 맞추기 위해 ${removed.name}을(를) 제외했습니다.`);
        route = improveRoute(route, input);
        continue;
      }
    }

    if (route.length > 1) {
      const removeIndex = chooseWalkRemovalIndex(route);
      if (removeIndex != null) {
        const removed = route.splice(removeIndex, 1)[0];
        actions.push(`${dayNumber}일차 도보 동선 기준을 맞추기 위해 ${removed.name}을(를) 제외했습니다.`);
        if (!route.some((item) => isMealPlace(item))) {
          const flexibleMeal = createFlexibleMeal(input.region, dayNumber, route);
          route.splice(Math.min(1, route.length), 0, flexibleMeal);
          actions.push(`${dayNumber}일차 식사는 남은 동선 근처 로컬 맛집 탐색 슬롯으로 조정했습니다.`);
        }
        route = improveRoute(route, input);
        continue;
      }
    }

    break;
  }

  return route;
}

function chooseWalkRemovalIndex(route) {
  const removable = route
    .map((item, index) => ({ item, index }))
    .filter((entry) => !entry.item.requestMatches?.length);
  if (!removable.length) return null;
  return removable.sort((a, b) => routeRankValue(a.item) - routeRankValue(b.item))[0].index;
}

function routeRankValue(place) {
  return place.weatherRank || place.rankScore || place.ragScore || 0;
}

function improveRoute(items, input) {
  if (items.length <= 2) return items;
  if (input.transport === "walk") return improveWalkRoute(items);
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

function improveWalkRoute(items) {
  const remaining = [...items];
  const start = remaining.sort((a, b) => (b.weatherRank || b.rankScore || b.ragScore || 0) - (a.weatherRank || a.rankScore || a.ragScore || 0)).shift();
  const ordered = start ? [start] : [];
  while (remaining.length) {
    const current = ordered[ordered.length - 1];
    remaining.sort((a, b) => haversine(current.lat, current.lng, a.lat, a.lng) - haversine(current.lat, current.lng, b.lat, b.lng));
    ordered.push(remaining.shift());
  }
  const mealIndex = ordered.findIndex((item) => isMealPlace(item));
  if (mealIndex > 1 && mealIndex < ordered.length - 1) {
    const [meal] = ordered.splice(mealIndex, 1);
    ordered.splice(1, 0, meal);
  }
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
  return minutesToTime(total);
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
  document.querySelector("#trip-summary").textContent = `${input.region} · ${getDays(input)}일 · ${transportPolicy[input.transport].label} · ${input.people}명 · ${input.arrival.from} ${input.departureTime} 출발 / ${input.arrival.time} 도착`;
  document.querySelector("#persona").textContent = persona.sentence;
  document.querySelector("#keywords").textContent = `반영한 키워드: ${persona.keywords.slice(0, 8).join(", ")}${persona.constraints.length ? ` · ${persona.constraints.join(" · ")}` : ""}`;
  document.querySelector("#candidate-count").textContent = candidates.length;
  document.querySelector("#avg-score").textContent = Math.round(candidates.reduce((sum, place) => sum + place.ragScore, 0) / candidates.length);
  document.querySelector("#days-count").textContent = getDays(input);
  renderAgentSimulation();
  renderCandidates(candidates);
  renderPlan();
}

function showResultPanel() {
  document.querySelector(".form-panel")?.classList.add("hidden");
  document.querySelector(".result-panel")?.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showInputPanel() {
  document.querySelector(".result-panel")?.classList.add("hidden");
  document.querySelector(".form-panel")?.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  document.querySelector("#agent-input").textContent = `${input.arrival.from} ${input.departureTime} 출발 · ${input.arrival.time} 도착`;
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

function exportActiveSchedule() {
  if (!state.result) return;
  const input = state.result.input;
  const plan = state.result.plans[state.activePlan];
  const title = `${input.region} ${plan.title} 스케줄표`;
  const rows = plan.final
    .map(
      (day) => `
        <section>
          <h2>${day.day}일차</h2>
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>장소</th>
                <th>분류</th>
                <th>이동</th>
                <th>장소 설명</th>
              </tr>
            </thead>
            <tbody>
              ${day.items
                .map(
                  (item) => `
                    <tr>
                      <td>${escapeHtml(item.start)} - ${escapeHtml(item.end)}</td>
                      <td>${escapeHtml(item.name)}</td>
                      <td>${escapeHtml(item.category)}</td>
                      <td>${escapeHtml(String(item.travel || 0))}분</td>
                      <td>${escapeHtml(compactDescription(item.description))}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>
      `
    )
    .join("");
  const checks = plan.logs
    .slice(0, 8)
    .filter((log) => log.tone === "warning")
    .map((log) => `<li>${escapeHtml(log.message)}</li>`)
    .join("");

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    setMessage("팝업이 차단되어 PDF 화면을 열 수 없습니다. 브라우저 팝업 허용 후 다시 눌러주세요.");
    return;
  }
  printWindow.document.write(`
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <title>${escapeHtml(title)}</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 30px; color: #102a43; font-family: Arial, "Malgun Gothic", sans-serif; }
          h1 { margin: 0 0 8px; font-size: 25px; letter-spacing: 0; }
          h2 { margin: 28px 0 10px; font-size: 17px; }
          .meta { margin: 0 0 18px; color: #486581; line-height: 1.6; }
          table { width: 100%; table-layout: fixed; border-collapse: collapse; page-break-inside: avoid; }
          th, td { border: 1px solid #c9e7f3; padding: 9px 10px; text-align: left; vertical-align: top; font-size: 12px; line-height: 1.55; word-break: keep-all; overflow-wrap: anywhere; }
          th { background: #eaf8ff; color: #12344d; }
          th:nth-child(1), td:nth-child(1) { width: 15%; }
          th:nth-child(2), td:nth-child(2) { width: 20%; font-weight: 700; }
          th:nth-child(3), td:nth-child(3) { width: 10%; }
          th:nth-child(4), td:nth-child(4) { width: 10%; }
          th:nth-child(5), td:nth-child(5) { width: 45%; font-weight: 400; color: #334e68; }
          ul { margin: 8px 0 0; padding-left: 18px; color: #334e68; }
          li { margin: 6px 0; }
          .print-guide { margin: 0 0 18px; padding: 10px 12px; border: 1px solid #ffd3c8; border-radius: 10px; background: #fff7f4; color: #9f3a2d; }
          @media print {
            body { padding: 18mm; }
            .print-guide { display: none; }
          }
        </style>
      </head>
      <body>
        <p class="print-guide">인쇄 창에서 대상/프린터를 "PDF로 저장"으로 선택하면 스케줄표를 PDF 파일로 저장할 수 있습니다.</p>
        <h1>${escapeHtml(title)}</h1>
        <p class="meta">
          ${escapeHtml(input.region)} · ${getDays(input)}일 · ${escapeHtml(transportPolicy[input.transport].label)} · ${escapeHtml(String(input.people))}명<br />
          출발: ${escapeHtml(input.arrival.from)} ${escapeHtml(input.departureTime)} · 예상 도착: ${escapeHtml(input.arrival.time)} · 약 ${Math.round(input.arrival.distance)}km / ${input.arrival.minutes}분
        </p>
        ${rows}
        ${checks ? `<h2>여행 참고사항</h2><ul>${checks}</ul>` : ""}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 350);
}

function compactDescription(description) {
  const text = String(description || "장소 상세 정보는 지도 링크에서 확인할 수 있습니다.").replace(/\s+/g, " ").trim();
  return text.length > 115 ? `${text.slice(0, 112)}...` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
