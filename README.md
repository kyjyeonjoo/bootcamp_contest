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
- RAG 검색 근거 카드
- 초기 일정과 수정 후 최종 일정 비교
- 시뮬레이션 로그와 수정 Agent 로그
- 좌표 기반 지도 미리보기

## 실행

브라우저에서 `index.html`을 열면 바로 실행됩니다.

## 배포 주소

https://kyjyeonjoo.github.io/bootcamp_contest/

Pages 설정 전 대체 미리보기:

https://raw.githack.com/kyjyeonjoo/bootcamp_contest/main/index.html
