// 일본 도매 홈페이지 가격 자동 계산 — 평일 아침 GitHub Actions 가 돌립니다.
// 원가·운임 같은 숫자는 저장소 비밀(JAPAN_COST)에만 있고, 이 파일과 로그에는 남기지 않습니다.
// 결과(컨테이너·베일 가격, 부가세 포함)만 japan/prices.js 에 씁니다.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "japan/prices.js";
const force = process.env.FORCE === "true";

let cost;
try { cost = JSON.parse(process.env.JAPAN_COST || ""); }
catch { console.log("비밀 JAPAN_COST 가 없거나 형식이 틀림 — 어제 가격 유지"); process.exit(0); }

const num = s => Number(String(s).replace(/,/g, ""));

// 하나은행 고시 환율(네이버 증권 자료): 매매기준율·송금 보낼 때
async function rate(code) {
  const r = await fetch(`https://api.stock.naver.com/marketindex/exchange/${code}/prices?page=1&pageSize=1`,
    { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) throw new Error(`${code} ${r.status}`);
  const [row] = await r.json();
  return { date: row.localTradedAt, base: num(row.closePrice), send: num(row.sendValue) };
}

let J, U;
try { [J, U] = await Promise.all([rate("FX_JPYKRW"), rate("FX_USDKRW")]); }
catch (e) { console.log("환율을 못 읽음 — 어제 가격 유지:", e.message); process.exit(0); }

const ok = J.base > 500 && J.base < 1500 && J.send > 500 && J.send < 1500 && U.send > 900 && U.send < 2500
  && /^\d{4}-\d{2}-\d{2}$/.test(J.date);
if (!ok) { console.log("환율 값이 이상함 — 어제 가격 유지"); process.exit(0); }

const old = readFileSync(FILE, "utf8");
const oldDate = (old.match(/basisDate:\s*"([^"]+)"/) || [])[1];
if (!force && oldDate === J.date) { console.log("이미 오늘(" + J.date + ") 환율로 계산됨 — 건너뜀"); process.exit(0); }

const c = cost;
function price(it) {
  const send = it.kg * it.yen * J.send / 100;            // 원료값 송금(원)
  const cif = send + c.cifAdd * U.send / c.cifRate;       // 과세 가격
  const duty = cif * c.duty;                              // 관세
  const ivat = (cif + duty) * c.vat;                      // 수입 부가세
  const freight = c.freightUsd * U.send + c.freightKrw;  // 운임·통관·운송
  const out = send + duty + ivat + freight;               // 나간 돈
  const inVat = ivat + c.inVatUsd * U.send + c.inVatKrw; // 돌려받는 매입 부가세
  const supply = out - inVat + c.margin;                  // 공급가액(남는 돈 포함)
  const sale = supply * 1.1;                              // 부가세 포함 판매가
  const bale = it.bales ? sale / it.bales : sale / it.kg * it.baleKg;
  return { container: Math.ceil(sale / 10000) * 10000, bale: Math.ceil(bale / 1000) * 1000 };
}

const rows = Object.entries(c.items || {}).filter(([, it]) => it.show !== false).map(([k, it]) => [k, price(it)]);
if (!rows.length || rows.some(([, p]) => !(p.container > 1e6 && p.container < 1e9))) {
  console.log("계산 결과가 이상함 — 어제 가격 유지"); process.exit(0);
}

const out = [
  "// 평일 아침 자동 계산(GitHub Actions)이 이 파일을 새로 씁니다. 원가는 넣지 않습니다(결과 가격만).",
  "// 컨테이너는 1만 원, 베일은 1천 원 단위로 올림. 모두 부가세 포함.",
  "window.VT_PRICES = {",
  `  basisDate: "${J.date}",`,
  `  rate: { jpy100: ${J.base}, source: "하나은행 매매기준율" },`,
  "  items: {",
  rows.map(([k, p]) => `    "${k}": { container: ${p.container}, bale: ${p.bale} }`).join(",\n"),
  "  }",
  "};",
  ""
].join("\n");
writeFileSync(FILE, out);
console.log(`가격 새로 씀: ${J.date} 환율, ${rows.length}종`);
