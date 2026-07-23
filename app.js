const tasteQuestions = [
  { question: "풍경 취향", a: ["바다", "sea"], b: ["숲·정원", "forest"] },
  { question: "여행 리듬", a: ["카페·휴식", "cafe"], b: ["체험·액티비티", "activity"] },
  { question: "장소 분위기", a: ["유명 명소", "popular"], b: ["한적한 장소", "quiet"] },
  { question: "식사 취향", a: ["지역 전통음식", "local_food"], b: ["분위기 좋은 식당", "mood"] },
  { question: "날씨 대응", a: ["실내 전시", "indoor"], b: ["야외 산책", "outdoor"] },
  { question: "선호 시간대", a: ["낮 풍경", "daytime"], b: ["일몰·야경", "night_view"] }
];

const state = {
  tastes: {},
  activePlan: "clear",
  result: null
};

const API_CONFIG = window.TRAVEL_CONFIG || {};

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

const weatherInfo = {
  clear: {
    title: "맑은 날 코스",
    copy: "야외 풍경, 산책, 전망 요소의 점수를 높이고 저녁에는 야경 후보를 배치했습니다.",
    danger: "맑음"
  },
  rain: {
    title: "비 오는 날 코스",
    copy: "실내 후보를 우선 검색하고 야외 노출과 환승 부담을 줄이는 방향으로 재배치했습니다.",
    danger: "우천"
  },
  extreme: {
    title: "폭염·폭설 코스",
    copy: "12~16시 야외 활동을 피하고 오전·저녁에만 야외 후보를 남기도록 수정했습니다.",
    danger: "악천후"
  }
};

const PHOTO_BY_ID = {
  YS_01: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Odongdo%20%28view%20from%20west%20breakwater%29%20in%202017.jpg?width=900",
  YS_02: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80",
  YS_03: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yeosu%20Maritime%20Cable%20Car%20View.jpg?width=900",
  YS_04: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yeosu%20Lights.jpg?width=900",
  YS_05: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  YS_06: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yeosu%20the%20Beautiful.jpg?width=900",
  GJ_01: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&w=900&q=80",
  GJ_02: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
  GJ_03: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  GJ_04: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
  DY_01: "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?auto=format&fit=crop&w=900&q=80",
  DY_02: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  DY_03: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
  DY_04: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  SC_01: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  SC_02: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  SC_03: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
  SC_04: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  MP_01: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
  MP_02: "https://commons.wikimedia.org/wiki/Special:Redirect/file/20240225%20View%20of%20Yudal%20Mountain%2C%20Korea.jpg?width=900",
  MP_03: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  MP_04: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=900&q=80"
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
      return `
        <article class="taste-card">
          <p>${index + 1}. ${item.question}</p>
          <div class="choice-row">
            <button type="button" class="${selected === item.a[1] ? "selected" : ""}" data-index="${index}" data-tag="${item.a[1]}">${item.a[0]}</button>
            <button type="button" class="${selected === item.b[1] ? "selected" : ""}" data-index="${index}" data-tag="${item.b[1]}">${item.b[0]}</button>
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

function generate() {
  const input = readInput();
  const error = validate(input);
  if (error) {
    setMessage(error);
    return;
  }

  const persona = buildPersona(input);
  const candidates = retrieveCandidates(input, persona);
  const plans = {
    clear: createWeatherPlan("clear", input, persona, candidates),
    rain: createWeatherPlan("rain", input, persona, candidates),
    extreme: createWeatherPlan("extreme", input, persona, candidates)
  };

  state.result = { input, persona, candidates, plans };
  state.activePlan = "clear";
  renderResults();
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
      return place.pet !== false;
    })
    .map((place) => {
      const matchedTags = place.tags.filter((tag) => persona.tags.includes(tag));
      const semantic = matchedTags.length * 10;
      const metadata = scoreMetadata(place, input);
      const textBoost = scoreRequest(place, input.request);
      const score = Math.round(35 + semantic + metadata + textBoost);
      return {
        ...place,
        ragScore: Math.min(score, 98),
        matchedTags,
        evidence: buildEvidence(place, matchedTags, input)
      };
    })
    .sort((a, b) => b.ragScore - a.ragScore);
}

function scoreMetadata(place, input) {
  let score = 0;
  if (place.category === "음식점" && input.styles.includes("food")) score += 12;
  if (input.baby && place.baby) score += 8;
  if (input.transport === "car" && place.parking) score += 7;
  if (input.transport === "walk" && place.tags.includes("walking")) score += 6;
  if (input.pet && place.pet === true) score += 15;
  if (input.companion === "couple" && place.tags.includes("couple")) score += 5;
  return score;
}

function scoreRequest(place, request) {
  if (!request) return 0;
  let score = 0;
  if (/게장/.test(request) && /게장/.test(place.name + place.description)) score += 18;
  if (/야경/.test(request) && place.tags.includes("night_view")) score += 14;
  if (/카페/.test(request) && place.tags.includes("cafe")) score += 10;
  return score;
}

function buildEvidence(place, matchedTags, input) {
  const reasons = [];
  if (matchedTags.length) reasons.push(`취향 태그 ${matchedTags.map((tag) => labels[tag] || tag).join(", ")} 일치`);
  if (place.category === "음식점") reasons.push("식사 시간 배치 후보");
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
  const perDay = transportPolicy[input.transport].places[input.pace];
  const ranked = rankForWeather(candidates, weather, false);
  const used = new Set();
  const result = [];

  for (let day = 1; day <= days; day += 1) {
    const freshPool = ranked.filter((place) => !used.has(place.id));
    const pool = freshPool.length >= perDay ? freshPool : ranked;
    const selected = naivePick(pool, perDay, weather);
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
      let score = place.ragScore + place.scores[weather] * 8;
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
      issues.push({ type: "식사", message: `${day.day}일차에 점심/저녁 식사 후보가 없습니다.` });
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
        issues.push({ type: "동반", message: `${item.name}: 아기 동반 편의가 낮은 후보입니다.` });
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
      return item.category === "음식점" && hour >= 11 && hour <= 14;
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
  const used = new Set();

  const revisedDays = draft.map((day) => {
    let items = day.items.map((item) => ({ ...item }));
    items.forEach((item) => used.add(item.id));

    items = items.map((item) => {
      const hour = Number(item.start.split(":")[0]);
      const weatherBad = (weather === "rain" && item.outdoor) || (weather === "extreme" && item.outdoor && hour >= 12 && hour <= 16);
      const companionBad = (input.baby && item.baby === false) || (input.pet && item.pet !== true);
      if (!weatherBad && !companionBad) return item;
      const replacement = ranked.find((place) => {
        if (used.has(place.id)) return false;
        if (place.category === "음식점") return false;
        if (weather === "rain" && !place.indoor) return false;
        if (weather === "extreme" && hour >= 12 && hour <= 16 && !place.indoor) return false;
        if (input.baby && place.baby === false) return false;
        if (input.pet && place.pet !== true) return false;
        return true;
      });
      if (!replacement) return item;
      used.add(replacement.id);
      actions.push(`${item.name}을(를) ${replacement.name}(으)로 교체했습니다. 이유: 날씨/동반 조건 위반 해소`);
      return replacement;
    });

    if (!items.some((item) => item.category === "음식점")) {
      const meal = ranked.find((place) => place.category === "음식점" && !used.has(place.id));
      if (meal) {
        items.splice(1, 0, meal);
        actions.push(`${day.day}일차에 식사 후보 ${meal.name}을(를) 추가했습니다.`);
      }
    }

    items = improveRoute(items, input);
    return { day: day.day, items: assignTimes(items.slice(0, transportPolicy[input.transport].places[input.pace]), weather, input, true) };
  });

  if (actions.length === 0 && audit.issues.length === 0) actions.push("초기 일정이 주요 검증 기준을 통과해 시간대만 정돈했습니다.");
  return Object.assign(revisedDays, { actions });
}

function improveRoute(items, input) {
  if (items.length <= 2) return items;
  const food = items.find((item) => item.category === "음식점");
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
  if (weather === "extreme" && place.indoor) return "악천후 시간대 대체 가능한 실내 후보입니다.";
  if (place.category === "음식점") return "여행일당 최소 1회 식사 조건과 지역 먹거리 선호를 반영했습니다.";
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
  renderCandidates(candidates);
  renderPlan();
}

function renderCandidates(candidates) {
  document.querySelector("#candidate-list").innerHTML = candidates
    .slice(0, 6)
    .map((place) => {
      return `
        <article class="candidate-card">
          <img src="${imageForPlace(place)}" alt="${place.name} 사진" loading="lazy" />
          <div class="candidate-body">
            <strong>${place.name}</strong>
            <p>${place.description}</p>
          </div>
          <div class="tag-row">
            <span class="tag score">${place.ragScore}점</span>
            ${place.evidence.map((item) => `<span class="tag">${item}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPlan() {
  if (!state.result) return;
  const plan = state.result.plans[state.activePlan];
  document.querySelector("#plan-title").textContent = plan.title;
  document.querySelector("#plan-description").textContent = plan.description;
  document.querySelector("#plan-score").textContent = plan.score;
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.plan === state.activePlan);
  });
  document.querySelector("#final-timeline").innerHTML = renderTimeline(plan.final);
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
            <div class="schedule-item">
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
            </div>
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

function renderMap(days) {
  const map = document.querySelector("#map");
  const items = days.flatMap((day) => day.items);
  if (!items.length) {
    map.innerHTML = "";
    return;
  }
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
  return PHOTO_BY_ID[place?.id] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80";
}

init();
