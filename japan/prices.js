// 평일 아침 자동 계산(GitHub Actions)이 이 파일을 새로 씁니다. 원가는 넣지 않습니다(결과 가격만).
// 컨테이너는 1만 원, 베일은 1천 원 단위로 올림. 모두 부가세 포함.
window.VT_PRICES = {
  basisDate: "2026-11-26",
  rate: { jpy100: 843.82, source: "하나은행 매매기준율" },
  items: {
    "hokkaido": { container: 17590000, bale: 267000 },
    "hardoff-hokkaido": { container: 18350000, bale: 289000 },
    "bookoff-hokkaido": { container: 23490000, bale: 362000 },
    "2nd-kanto": { container: 23490000, bale: 362000 },
    "shikoku": { container: 18430000, bale: 156000 }
  }
};
