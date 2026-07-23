# 광주·전남 AI 여행 플래너 MVP

RAG 후보 검색과 에이전틱 시뮬레이션 흐름을 보여주는 광주·전남 여행 일정 자동 플래너입니다.

## 핵심 흐름

1. 여행 조건 입력
2. 취향 토너먼트 선택
3. 페르소나와 검색 키워드 생성
4. 로컬 관광/먹거리 데이터에서 RAG 후보 검색
5. 날씨별 초기 일정 초안 생성
6. 거리, 시간, 날씨, 동반 조건 시뮬레이션
7. 문제 장소 교체와 시간대 재배치
8. 맑음, 비, 폭염·폭설 최종 플랜 출력

## MVP 구현 범위

- 광주, 담양, 여수, 순천, 목포 샘플 장소 데이터
- DB 없이 정적 HTML/CSS/JavaScript로 실행
- API 장애 상황에서도 발표 가능한 로컬 우선 구조
- 사진이 포함된 장소 추천 카드
- 날씨별 최종 일정
- 거리, 시간, 날씨, 동반 조건 확인 메모
- 좌표 기반 지도 미리보기

## API 확장 포인트

현재 버전은 API 키 없이 실행되는 데모입니다. 실시간 데이터까지 연결하려면 아래 키가 필요합니다.

- 한국관광공사 TourAPI 서비스키
- 남도여행길잡이 관광/먹거리 API 서비스키
- Kakao Maps JavaScript API 키

키는 `config.local.js`에만 넣습니다. 이 파일은 `.gitignore`에 등록되어 GitHub에 올라가지 않습니다.

```js
window.TRAVEL_CONFIG = {
  TOUR_API_KEY: "여기에_키",
  NAMDO_TOUR_API_KEY: "여기에_키",
  NAMDO_FOOD_API_KEY: "여기에_키",
  KAKAO_MAP_JS_KEY: "여기에_지도_JS_키",
  KAKAO_LOGIN_ACCESS_TOKEN: "카카오_로그인_access_token이_있다면_여기에"
};
```

주의: GitHub Pages처럼 정적 사이트에 직접 넣은 키는 브라우저에서 보일 수 있습니다. TourAPI와 남도 API 키를 완전히 숨기려면 나중에 작은 백엔드/API 프록시가 필요합니다. Kakao Maps JavaScript 키는 도메인 제한을 걸어 사용하는 방식이 일반적입니다.

카카오 로그인 access token과 Kakao Maps JavaScript 키는 용도가 다릅니다. 지도 표시에는 JavaScript 키가 필요합니다.

## 실행

브라우저에서 `index.html`을 열면 바로 실행됩니다.

## 배포 주소

https://kyjyeonjoo.github.io/bootcamp_contest/

Pages 설정 전 대체 미리보기:

https://raw.githack.com/kyjyeonjoo/bootcamp_contest/main/index.html
