// 매일 아침 자동 계산이 이 파일을 새로 씁니다. 원가는 넣지 않습니다(결과 가격만).
// 컨테이너는 1만 원, 베일은 1천 원 단위로 올림. 모두 부가세 포함.
window.VT_PRICES = {
  basisDate: "2026-11-20",
  rate: { jpy100: 848.99, source: "하나은행 매매기준율" },
  items: {
    "hokkaido":          { container: 17670000, bale: 268000 },
    "hardoff-hokkaido":  { container: 18440000, bale: 290000 },
    "bookoff-hokkaido":  { container: 23610000, bale: 363000 },
    "2nd-kanto":         { container: 23610000, bale: 363000 },
    // 세컨 간사이(오사카)·주부(나고야)는 11/22 사장님 지시로 「견적 문의」 (가격 안 보임)
    "shikoku":           { container: 18510000, bale: 157000 }
  }
};
