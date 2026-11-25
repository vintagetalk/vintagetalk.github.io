// 평일 아침 자동 계산(GitHub Actions)이 이 파일을 새로 씁니다. 원가는 넣지 않습니다(결과 가격만).
// 컨테이너는 1만 원, 베일은 1천 원 단위로 올림. 모두 부가세 포함.
window.VT_PRICES = {
  basisDate: "2026-11-25",
  rate: { jpy100: 843.36, source: "하나은행 매매기준율" },
  items: {
    "hokkaido": { container: 17580000, bale: 267000 },
    "hardoff-hokkaido": { container: 18350000, bale: 288000 },
    "bookoff-hokkaido": { container: 23480000, bale: 361000 },
    "2nd-kanto": { container: 23480000, bale: 361000 },
    "shikoku": { container: 18420000, bale: 156000 }
  }
};
