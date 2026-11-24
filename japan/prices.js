// 평일 아침 자동 계산(GitHub Actions)이 이 파일을 새로 씁니다. 원가는 넣지 않습니다(결과 가격만).
// 컨테이너는 1만 원, 베일은 1천 원 단위로 올림. 모두 부가세 포함.
window.VT_PRICES = {
  basisDate: "2026-11-24",
  rate: { jpy100: 847.85, source: "하나은행 매매기준율" },
  items: {
    "hokkaido": { container: 17650000, bale: 268000 },
    "hardoff-hokkaido": { container: 18420000, bale: 290000 },
    "bookoff-hokkaido": { container: 23580000, bale: 363000 },
    "2nd-kanto": { container: 23580000, bale: 363000 },
    "shikoku": { container: 18500000, bale: 157000 }
  }
};
