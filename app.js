const tasteQuestions = [
  { question: "선호 풍경", a: ["바다", "sea"], b: ["숲·정원", "forest"] },
  { question: "선호 활동", a: ["카페·휴식", "cafe"], b: ["체험·액티비티", "activity"] },
  { question: "장소 분위기", a: ["유명 명소", "popular"], b: ["한적한 장소", "quiet"] },
  { question: "식사 취향", a: ["지역 전통음식", "local_food"], b: ["분위기 좋은 식당", "mood"] },
  { question: "날씨 선택", a: ["실내 전시", "indoor"], b: ["야외 산책", "outdoor"] },
  { question: "시간대", a: ["낮 풍경", "daytime"], b: ["일몰·야경", "night_view"] }
];

const state = {
  tastes: {},
  plans: {},
  activePlan: "clear"
};

const transportPolicy = {
  car: { label: "자가용", speed: 30, buffer: 10, maxLeg: 15, places: { relaxed: 4, normal: 5, packed: 6 } },
  transit: { label: "대중교통", speed: 18, buffer: 15, maxLeg: 5, places: { relaxed: 3, normal: 4, packed: 5 } },
  walk: { label: "도보 중심", speed: 4, buffer: 15, maxLeg: 2, places: { relaxed: 3, normal: 3, packed: 4 } },
  taxi: { label: "택시·혼합", speed: 25, buffer: 10, maxLeg: 10, places: { relaxed: 4, normal: 5, packed: 5 } }
};

const styleLabels = {
  food: "먹거리",
  mood: "분위기",
  healing: "힐링",
  nature: "자연",
  activity: "체험",
  culture: "문화"
};

const tagLabels = {
  sea: "바다",
  forest: "숲·정원",
  cafe: "카페·휴식",
  activity: "체험",
  popular: "유명 명소",
  quiet: "한적함",
  local_food: "지역음식",
  mood: "분위기",
  indoor: "실내",
  outdoor: "야외",
  daytime: "낮 풍경",
  night_view: "야경",
  nature: "자연",
  food: "먹거리",
  healing: "힐링",
  culture: "문화"
};

const weatherMeta = {
  clear: {
    title: "맑은 날 플랜",
    description: "야외 경험과 전망, 산책 시간을 우선 배치했습니다. 일몰·야경 선호가 있으면 저녁 코스로 옮깁니다."
  },
  rain: {
    title: "비 오는 날 플랜",
    description: "실내 비율을 높이고 이동 구간을 줄였습니다. 야외 장소는 대체 후보로 교체하거나 짧게 배치합니다."
  },
  extreme: {
    title: "폭염·악천후 플랜",
    description: "12~16시 야외 활동을 피하고 오전 야외, 점심·오후 실내, 저녁 전망 구조로 재배치했습니다."
  }
};

function init() {
  setDefaultDates();
  renderTasteCards();
  document.querySelector("#generate").addEventListener("click", generate);
  document.querySelector("#reset-taste").addEventListener("click", resetTaste);
  document.querySelectorAll(".plan-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activePlan = button.dataset.plan;
      document.querySelectorAll(".plan-tabs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderActivePlan();
    });
  });
}

function setDefaultDates() {
  const start = new Date();
  start.setDate(start.getDate() + 14);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  document.querySelector("[name=startDate]").value = toDateInput(start);
  document.querySelector("[name=endDate]").value = toDateInput(end);
}

function toDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function renderTasteCards() {
  const wrap = document.querySelector("#taste-cards");
  wrap.innerHTML = tasteQuestions
    .map((item, index) => {
      return `
        <article class="taste-card">
          <p>${index + 1}. ${item.question}</p>
          <div class="choice-row">
            <button type="button" data-index="${index}" data-tag="${item.a[1]}">${item.a[0]}</button>
            <button type="button" data-index="${index}" data-tag="${item.b[1]}">${item.b[0]}</button>
          </div>
        </article>
      `;
    })
    .join("");

  wrap.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      state.tastes[index] = button.dataset.tag;
      wrap.querySelectorAll(`[data-index="${index}"]`).forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}

function resetTaste() {
  state.tastes = {};
  document.querySelectorAll(".choice-row button").forEach((button) => button.classList.remove("selected"));
  setMessage("");
  setStatus("taste");
}

function generate() {
  const userInput = readForm();
  const validation = validateInput(userInput);
  if (validation) {
    setMessage(validation);
    return;
  }

  setMessage("");
  setStatus("search");
  const persona = buildPersona(userInput);
  const candidates = retrievePlaces(persona, userInput);
  state.plans = {
    clear: buildPlan("clear", candidates, userInput, persona),
    rain: buildPlan("rain", candidates, userInput, persona),
    extreme: buildPlan("extreme", candidates, userInput, persona)
  };

  setStatus("simulate");
  Object.keys(state.plans).forEach((key) => {
    state.plans[key] = validateAndRevise(state.plans[key], candidates, userInput, key);
  });

  state.persona = persona;
  state.candidates = candidates;
  state.activePlan = "clear";
  renderResults();
  setStatus("done");
}

function readForm() {
  const form = new FormData(document.querySelector("#trip-form"));
  const styles = form.getAll("styles");
  const tastes = Object.values(state.tastes);
  return {
    region: form.get("region"),
    startDate: form.get("startDate"),
    endDate: form.get("endDate"),
    people: Number(form.get("people") || 1),
    companion: form.get("companion"),
    transport: form.get("transport"),
    pace: form.get("pace"),
    baby: form.has("baby"),
    pet: form.has("pet"),
    styles,
    request: String(form.get("request") || "").trim(),
    tastes
  };
}

function validateInput(input) {
  if (!input.startDate || !input.endDate) return "여행 날짜를 입력해주세요.";
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  if (end < start) return "종료일은 시작일보다 빠를 수 없습니다.";
  if (input.tastes.length < 4) return "취향 선택을 4개 이상 완료해주세요.";
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
  const tags = [...new Set([...input.styles, ...input.tastes, ...extractRequestTags(input.request)])];
  const readable = tags.slice(0, 8).map((tag) => tagLabels[tag] || tag);
  const transport = transportPolicy[input.transport].label;
  const pace = { relaxed: "여유로운", normal: "균형 잡힌", packed: "알찬" }[input.pace];
  const companion = { solo: "혼자", couple: "커플", friends: "친구", family: "가족", parents: "부모님 동반" }[
    input.companion
  ];
  let sentence = `${readable.slice(0, 3).join(", ")} 취향을 중심으로 ${transport} 이동에 맞춘 ${pace} ${companion} 여행자`;
  if (input.baby) sentence += ", 휴식과 유모차 이동 편의를 중요하게 보는 유형";
  if (input.pet) sentence += ", 반려동물 동반 가능 여부를 우선 확인하는 유형";
  return { sentence, keywords: [input.region, ...readable].slice(0, 9), tags };
}

function extractRequestTags(request) {
  const tags = [];
  if (/게장|민어|국밥|떡갈비|국수|음식|맛집|먹/.test(request)) tags.push("food", "local_food");
  if (/야경|일몰|노을/.test(request)) tags.push("night_view");
  if (/카페|커피/.test(request)) tags.push("cafe", "mood");
  if (/바다|해변|해상/.test(request)) tags.push("sea");
  if (/숲|정원|자연|산책/.test(request)) tags.push("nature", "walking");
  return tags;
}

function retrievePlaces(persona, input) {
  return window.PLACES.filter((place) => place.region === input.region)
    .filter((place) => {
      if (!input.pet) return true;
      return place.pet !== false;
    })
    .map((place) => ({ ...place, score: scorePlace(place, persona.tags, input, "clear") }))
    .map((place) => ({ ...place, score: place.score + (input.pet && place.pet === true ? 12 : 0) }))
    .sort((a, b) => b.score - a.score);
}

function scorePlace(place, tags, input, weather) {
  let score = place.scores[weather] * 5;
  tags.forEach((tag) => {
    if (place.tags.includes(tag)) score += 8;
  });
  if (input.baby && place.baby) score += 8;
  if (input.transport === "car" && place.parking) score += 5;
  if (input.transport === "walk" && place.tags.includes("walking")) score += 4;
  if (place.category === "음식점" && tags.includes("food")) score += 9;
  if (input.request && place.description.includes(input.request.slice(0, 2))) score += 4;
  return score;
}

function buildPlan(weather, candidates, input, persona) {
  const days = getDays(input);
  const perDay = transportPolicy[input.transport].places[input.pace];
  const weatherCandidates = candidates
    .map((place) => ({ ...place, score: scorePlace(place, persona.tags, input, weather) }))
    .sort((a, b) => b.score - a.score);

  const used = new Set();
  const planDays = [];
  for (let day = 1; day <= days; day += 1) {
    const picked = pickForDay(weatherCandidates, used, perDay, weather, input);
    picked.forEach((place) => used.add(place.id));
    planDays.push({ day, items: assignTimes(picked, weather, input) });
  }

  return {
    weather,
    title: weatherMeta[weather].title,
    description: weatherMeta[weather].description,
    days: planDays,
    report: []
  };
}

function pickForDay(candidates, used, count, weather, input) {
  const pool = candidates.filter((place) => !used.has(place.id));
  const food = pool.find((place) => place.category === "음식점");
  const indoor = pool.filter((place) => place.indoor && place.category !== "음식점");
  const outdoor = pool.filter((place) => place.outdoor && place.category !== "음식점");
  const mixed = [];

  if (weather === "rain") {
    mixed.push(...indoor.slice(0, Math.max(2, count - 2)));
    if (food) mixed.push(food);
    mixed.push(...outdoor.slice(0, 1));
  } else if (weather === "extreme") {
    mixed.push(...outdoor.slice(0, 1));
    if (food) mixed.push(food);
    mixed.push(...indoor.slice(0, Math.max(2, count - 2)));
    mixed.push(...outdoor.filter((place) => place.slots.includes("night") || place.slots.includes("sunset")).slice(0, 1));
  } else {
    mixed.push(...outdoor.slice(0, count - 1));
    if (food) mixed.splice(Math.min(1, mixed.length), 0, food);
    mixed.push(...indoor.slice(0, 1));
  }

  const unique = [];
  mixed.forEach((place) => {
    if (place && !unique.some((item) => item.id === place.id)) unique.push(place);
  });
  pool.forEach((place) => {
    if (unique.length < count && !unique.some((item) => item.id === place.id)) unique.push(place);
  });
  return orderByRoute(unique.slice(0, count));
}

function orderByRoute(places) {
  if (places.length <= 2) return places;
  const food = places.find((place) => place.category === "음식점");
  const night = places.find((place) => place.slots.includes("night") || place.slots.includes("sunset"));
  const rest = places.filter((place) => place !== food && place !== night);
  return [...rest.slice(0, 1), ...(food ? [food] : []), ...rest.slice(1), ...(night ? [night] : [])];
}

function assignTimes(places, weather, input) {
  const starts = weather === "extreme" ? ["09:30", "12:00", "14:00", "17:20", "19:00", "20:00"] : ["10:00", "12:00", "14:00", "16:10", "18:00", "19:30"];
  return places.map((place, index) => {
    const start = starts[index] || addMinutes(starts[starts.length - 1], index * 50);
    const end = addMinutes(start, place.duration);
    return {
      ...place,
      start,
      end,
      travel: index === 0 ? 0 : estimateTravel(places[index - 1], place, input.transport),
      reason: buildReason(place, weather, input)
    };
  });
}

function addMinutes(time, minutes) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
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

function buildReason(place, weather, input) {
  if (weather === "rain" && place.indoor) return "우천 노출을 줄이기 위해 실내 적합도가 높은 후보를 우선 배치했습니다.";
  if (weather === "extreme" && place.indoor) return "폭염 시간대의 야외 활동을 피하기 위해 점심·오후 실내 코스로 넣었습니다.";
  if (place.category === "음식점") return "여행일당 최소 1회 식사를 보장하고 지역 먹거리 선호를 반영했습니다.";
  if (place.tags.some((tag) => input.tastes.includes(tag))) return "취향 선택 태그와 장소 설명의 유사도가 높아 추천했습니다.";
  return "지역, 이동 조건, 날씨 적합도를 함께 계산해 후보로 선택했습니다.";
}

function validateAndRevise(plan, candidates, input, weather) {
  const report = [];
  let revisions = 0;
  plan.days.forEach((day) => {
    const hasMeal = day.items.some((item) => item.category === "음식점");
    if (!hasMeal) {
      const meal = candidates.find((item) => item.category === "음식점" && !day.items.some((place) => place.id === item.id));
      if (meal) {
        day.items.splice(1, 0, meal);
        day.items = assignTimes(day.items.slice(0, transportPolicy[input.transport].places[input.pace]), weather, input);
        revisions += 1;
        report.push(["식사 시간", `${day.day}일차에 식사 일정이 없어 지역 음식 후보를 추가했습니다.`]);
      }
    }

    day.items.forEach((item, index) => {
      const hour = Number(item.start.split(":")[0]);
      if (weather === "extreme" && item.outdoor && hour >= 12 && hour <= 16) {
        const replacement = candidates.find((place) => place.indoor && !day.items.some((candidate) => candidate.id === place.id));
        if (replacement) {
          day.items[index] = replacement;
          day.items = assignTimes(day.items, weather, input);
          revisions += 1;
          report.push(["날씨", `${item.name}은 폭염 시간대 야외 장소라 ${replacement.name}(으)로 교체했습니다.`]);
        }
      }
      if (weather === "rain" && item.outdoor && index > 1) {
        report.push(["날씨", `${item.name}은 야외 장소라 우천 시 짧게 방문하거나 현장 상황 확인이 필요합니다.`]);
      }
    });

    day.items.forEach((item, index) => {
      if (index === 0) return;
      const previous = day.items[index - 1];
      const distance = haversine(previous.lat, previous.lng, item.lat, item.lng);
      if (distance > transportPolicy[input.transport].maxLeg) {
        report.push(["이동", `${previous.name} → ${item.name} 구간은 ${distance.toFixed(1)}km로 이동 부담 경고가 있습니다.`]);
      }
    });

    if (input.baby && day.items.some((item) => item.baby === false)) {
      report.push(["동반 조건", "아기 동반 편의가 낮은 장소가 있어 현장 동선 확인이 필요합니다."]);
    }
  });

  if (report.length === 0) {
    report.push(["검증 완료", "거리·시간·날씨·동반 조건 검사를 통과했습니다."]);
  }

  return { ...plan, revisions, report };
}

function renderResults() {
  document.querySelector("#empty-state").classList.add("hidden");
  document.querySelector("#results").classList.remove("hidden");
  document.querySelector("#persona").textContent = state.persona.sentence;
  document.querySelector("#keywords").textContent = `검색 키워드: ${state.persona.keywords.join(", ")}`;
  document.querySelector("#candidate-count").textContent = state.candidates.length;
  document.querySelector("#revision-count").textContent = Object.values(state.plans).reduce((sum, plan) => sum + plan.revisions, 0);
  document.querySelector("#day-count").textContent = state.plans.clear.days.length;
  document.querySelectorAll(".plan-tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.plan === state.activePlan);
  });
  renderActivePlan();
}

function renderActivePlan() {
  const plan = state.plans[state.activePlan];
  if (!plan) return;
  document.querySelector("#plan-title").textContent = plan.title;
  document.querySelector("#plan-description").textContent = plan.description;
  renderTimeline(plan);
  renderMap(plan);
  renderReport(plan);
}

function renderTimeline(plan) {
  document.querySelector("#timeline").innerHTML = plan.days
    .map((day) => {
      const items = day.items
        .map(
          (item, index) => `
            <div class="item">
              <div class="time">${item.start}<br />${item.end}</div>
              <div>
                <div class="place-title">
                  <span>${index + 1}. ${item.name}</span>
                  <span class="badge">${item.category}</span>
                  <span class="badge">이동 ${item.travel}분</span>
                </div>
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

function renderMap(plan) {
  const map = document.querySelector("#map");
  const items = plan.days.flatMap((day) => day.items);
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

function renderReport(plan) {
  document.querySelector("#report-list").innerHTML = plan.report
    .map(
      ([type, message]) => `
        <div class="report-row">
          <strong>${type}</strong>
          <span>${message}</span>
        </div>
      `
    )
    .join("");
}

function setMessage(message) {
  document.querySelector("#form-message").textContent = message;
}

function setStatus(active) {
  document.querySelectorAll("[data-status]").forEach((item) => {
    item.classList.toggle("active", item.dataset.status === active);
  });
}

init();
