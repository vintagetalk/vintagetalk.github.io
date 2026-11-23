/* 메인 첫 화면 편집기 · 빈티지톡 전용 (11/18 사장님: 빈티지플러스·빈티지오케이는 편집기에서 뺌 — 그 전 마지막 판 vt_hero_shared_6.4_cand5_세쇼핑몰_마지막_20261118.js)
 * 원본: 클로드6(2026-11-08, 빈티지톡 대표용) → 11/10 공용으로 정리 → 11/18 다시 빈티지톡 전용. 빈티지톡 스킨67 에만 올립니다.
 * - 편집기 코드는 '빈티지톡 편집기' 세션에서만 고칩니다. 쇼핑몰 값은 아래 SHOPS 표(빈티지톡 한 줄)와 hero.html 설정에 둡니다.
 * - 손님 화면에는 이 파일이 불러와지지 않습니다. 7.3(11/23)부터 이 파일은 빈티지 작업실(vintagetalk.github.io/auto/vt_hero.js)에 있고, 작업실 디자인 편집기와 「쇼핑몰에 반영」(?vtpub&vtdraft=web)에서만 열립니다.
 * - 화면은 hero.html 안의 완성된 HTML/CSS로 바로 그려집니다(스크립트 없이도 표시 → 속도 유지).
 *
 * 두 가지 방식(hero.html 안 설정으로 자동 결정)
 * 1) PC·모바일 디자인이 따로인 디자인(톡 예전 대표 스킨64·모바일34): PC 디자인 hero.html = PC 설정, 모바일 디자인 hero.html = 모바일 설정.
 *    PC 화면에서 [모바일]을 누르면 모바일 디자인(mobilePreview)을 390px 창으로 열어 고치고, 저장하면 바뀐 쪽을 각 디자인에 저장.
 * 2) 반응형(톡 스킨67): hero.html 한 파일에 vth-cfg(PC 1024px 이상) + vth-cfg-m(모바일 1023px 이하).
 *    손님 화면은 #vth(PC)·#vthm(모바일) 두 칸, CSS는 @media로 나뉨. 편집할 때는 화면에 맞는 칸 하나만 남기고 고침.
 * - 모바일은 움직임 효과를 모두 끔(사장님 규칙): 글씨 나타나기·사진 움직임·띠·내리면 사라짐.
 */
(function () {
  if (window.VTH && window.VTH.ready) { return; }
  var WEB = window.__VTH_WEB || null; /* 4.0 웹용: 구글 웹앱 안에서 열릴 때 {shop, html, app} */
  /* 7.1(11/23) 사장님 "?vtedit 이건 삭제하라니깐": 편집기는 빈티지 작업실(vintagetalk.github.io/auto) 「디자인 편집기」 탭에서만.
     쇼핑몰 주소+?vtedit 는 웹앱 「쇼핑몰에 반영」(?vtedit&vtdraft=web)일 때만 열림 — 카페24 API 는 디자인 파일을 못 써서 저장은 이 길로.
     점검·시험 도구: 주소에 &vtdev 또는 window.__VTH_NOHIDE */
  if (!WEB && !/[?&]vtdraft=web/.test(location.search) && !/[?&]vtdev/.test(location.search) && !window.__VTH_NOHIDE && !window.__VTH_LIB) { return; } /* 7.3: ?vtedit 는 아무 일도 안 함(사장님 "싹다 지워") */
  var WEBAPP = 'https:' + '/' + '/script.google.com/macros/s/AKfycby66qcbuyVKL0YjL21isQXYAe1yDkkSvnC5s59N7GGKDnTcVqIcs2xHwIenG7NlDbydPg/exec'; /* 7.2(11/23): 웹 저장본 = 빈티지 작업실 웹앱(?api=draft). 예전 '메인 편집기 (웹)' 구글 웹앱(AKfycbzrI3…)은 사장님 지시로 없앰 — 편집기 화면은 vintagetalk.github.io/auto/editor.html */
  var VTH = window.VTH = { ready: true, ver: '7.3' }; /* 7.3(11/23): 쇼핑몰 주소+?vtedit 편집기 싹 없앰(사장님) — 편집기 파일은 빈티지 작업실 auto/vt_hero.js, 손님 첫 화면의 불러오기 줄은 「쇼핑몰에 반영」(?vtpub)일 때만 작업실 파일을 부름. 7.2(11/23): 편집기를 빈티지 작업실로 통째로 옮김 — 화면 vintagetalk.github.io/auto/editor.html(「디자인 편집기」 탭), 웹 저장본은 빈티지 작업실 웹앱. 7.1(11/23): 편집기는 빈티지 작업실 「디자인 편집기」 탭(웹앱)에서만 — 쇼핑몰 주소+?vtedit 로 직접 열면 안내만 뜨고, 웹앱 「쇼핑몰에 반영」(?vtedit&vtdraft=web)일 때만 열림(점검 도구는 &vtdev). 7.0(11/23): 사장님이 머리말 WHOLESALE 주황 알약을 없앰("여자·남자·주니어와 같은 색·크기로") → 6.9 의 알약 지키기를 빼고 About·Community 는 분류 메뉴와 같은 색·글꼴·크기, WHOLESALE 은 크기·글꼴은 같고 글씨색만 주황(빈티지톡 디자인 최종 #cc3700 — 어두운 바탕 스타일·사진 위 흰 머리말·☰ 검정 메뉴에서는 밝은 주황, 늘 대비 4.5:1 이상), 큰 메뉴 에디토리얼의 About·Community 기울임·가는 글씨 뺌, 스타일 카드 미리보기는 알약 대신 주황 글씨. 메뉴가 길어진 만큼 한 줄 배치는 160px 넓은 화면부터, 좁은 PC는 메뉴 간격·글자 아이콘을 촘촘하게(머리말 스타일 넘침 막기). 6.9(11/23): 머리말 WHOLESALE 단추(빈티지톡 디자인 11/23, 주황 알약+검정 글씨)는 머리말 스타일·☰ 메뉴 스타일·사진 위 흰 머리말이 색·글꼴·칩 모양을 덮지 않음(스타일 카드 미리보기에도 보임). 휴대폰 가로(874x402 등)·키 작은 화면에서 첫 화면 글씨가 겹치던 것 — 글 자리는 화면 높이 %인데 글씨 크기는 폭 기준이라 가로 화면에서 큰 제목이 아래 글을 덮음 → 휴대폰 글씨에 높이 기준 한도도 둠(정리 기준 키 620 이상인 세로 휴대폰은 글자 하나도 안 바뀜). 6.8(11/20): 인터페이스 정리 — 맨 위 단추 줄 한 줄(따로 창·편집 칸 옮기기는 「⋯ 더보기」 안), 「가운데 화면」 단추 6개 줄을 없애고 「보는 폭」만(모든 화면에 들어가는 대분류에서만 「다른 화면에서 보기」), 대분류를 누르면 늘 그 화면으로, 겹치는 「화면 열기」 단추 뺌, 설명 글 짧게(긴 글은 두 줄·누르면 전체), 삭제 줄 작게, 기능개선은 이름을 눌러도 시안이 켜지고 바뀌는 곳으로 화면이 내려감, 메인·머리말 스타일을 누르면 화면 맨 위로. 편집기 화면만. 6.7(11/19): 목록을 방향키로 옮겨 보기·Enter 체크·Delete/오른쪽 단추 삭제, 지운 것은 바로 기억(다시 안 나옴), 고른 스타일을 한 번 더 누르면 원래대로(「↩ 원래 상태」 칸). 편집기 화면만. 6.6(11/19): 휴대폰용 세로 사진을 화면 비율이 아니라 너비로 고름(스크롤로 주소창이 접힐 때 사진이 갈아끼워져 커져 보이던 것). 6.5(11/19): 휴대폰 첫 화면 높이를 실제로 보이는 높이로(앱 안 브라우저에서 아래 띠가 도구 줄에 가리던 것). 6.4(11/18): 휴대폰 글씨 간격 정리(제목 줄 수 맞춤·글 사이 간격·버튼 높이), PC 글씨 '아래에서 위로' 기본, 띠를 바꾸면 휴대폰·노트북 자동 정리 */ /* 6.3(11/16): 휴대폰 아래 칸 자동 배치(글씨 14px 이상·버튼 44px·칸 높이 자동, 새로 고를 때 켜짐) · 대분류 8곳(1·3·5~10)에 스타일 카드 · 기능개선 세부값(글·색·위치) · L-01 가격 한 줄 시안이 칸을 깨던 것 고침(실제 가격으로 한 줄, 원래 두 줄 숨김) · 시안은 한 칸에 한 번만. 화면 방식에서 나눔(8:2 등)을 고르면 PC·휴대폰이 같이 — 휴대폰은 위아래로 쌓기(큰 칸 위·작은 칸 아래)가 기본('한 화면'은 '📱 휴대폰일 때'에서 직접 고를 때만), 작은 칸에 버튼 칸이 바로 들어감(버튼 칸이 없으면 같은 사진), 전체 화면으로 돌아가면 제자리. PC는 작은 칸이 편집 칸 밑에 가려져서 'PC 전체 화면 줄여 보기'로 자동 전환(✏️PC로 돌아옴). 가운데 화면(메인)에도 고치는 첫 화면·머리말이 바로 보임.  6.2(11/16): '품절 있는 화면' 단추 주소를 쇼핑몰별 값(SHOPS 줄의 soldUrl)으로 읽음 — 없으면 예전 주소(폴로 검색 4쪽).  6.1(11/15): 가운데 화면 바꾸기 — 상품목록·상세·검색·게시판·장바구니를 새 창 없이 편집기 가운데 화면 틀에 열고 꾸미기·기능개선 시안을 바로 그림(웹앱도: 웹앱이 쇼핑몰 화면 글을 받아 줌). 대분류·기능개선 칸을 고르면 그 화면으로 자동, 폭 1440·1024·390, 따로 창은 ↗ 단추로 하나씩만 다시 씀. 도구막대는 아래 가운데로(머리말 메뉴 안 가림).  6.0(11/15): 품절 덮개를 고르면 쇼핑몰 품절 칸의 가상 그림(플러스 .vt-item__soldout::after 띠)도 끔, 품절 칸 숨김을 더 세게.  5.9(11/15): 상품목록 품절 덮개를 쇼핑몰 원래 품절 그림 규칙(오케이 [alt="품절"] 띠)보다 세게 — 선택자 세기 올리고 원래 띠 값(위치·높이·그림)을 지운 뒤 그림, '흐림'은 원래 띠도 숨김.  5.8(11/15): 디자인 편집기 10 하단 — 바닥(.vt-ft) 바탕·글자·제목 색, 전화번호·회사 정보 글자 크기, 메뉴 글자색, 위 구분선, 위아래 여백(좁게/넓게), 바로가기 표·안전거래 칸 보이기. 이로써 대분류 10개 모두.  5.7(11/15): 디자인 편집기 9 게시판 — 게시판 목록(Q&A·REVIEW·UPDATE NEW) 제목 크기·정렬, 표 머리줄 바탕·보이기, 줄 모양(가는 선/선 없이/한 줄씩 연한 바탕)·줄 높이, 글 제목 크기, 글쓰기 단추 색·모양, 쪽 번호 모양·색. 품절 표시는 사진 칸 위에 직접 그림(오케이처럼 품절 칸이 사진 밖에 있어도 사진을 덮음).  5.6(11/15): 디자인 편집기 8 상품상세 — 구매 단추 바탕·글자색, 단추 모양(네모/둥근/알약)·높이, 장바구니·관심 단추(선/연한 바탕), 판매가 줄 보이기, 할인가 크기·색, 정보 표 줄·글자 크기, 작은 사진 모서리, 총액 색. 휴대폰 아래 고정 구매 줄 단추도 같이. site.html에 같이 저장, 미리보기 창(첫 상품 상세).  5.5(11/15): 디자인 편집기 7 검색 — 검색 화면(#vtSearchPage) 제목 보이기·크기·정렬, 검색 칸 모양(네모/둥근/알약)·테두리 색·높이, 인기검색어 태그 모양·색, 결과 수 색, 결과 없음 칸 바탕·글자, 쪽 번호 모양·지금 쪽 색. site.html에 같이 저장, 미리보기 창(결과 있음·없음).  5.4(11/15): 디자인 편집기 6 상품목록 — 품절 표시 8가지(품절/SOLD OUT), NEW 표시 8가지, 할인 표시 8가지(+숨기기·색·자리), 칸 사이 간격(PC·휴대폰), 사진 모서리·바탕, 상품명·브랜드·할인가 크기·색. 상품 칸(.vt-item)은 메인·목록·검색 모두 같이. site.html에 같이 저장.  5.3(11/15): 디자인 편집기 5 메인 아래 — 메인 첫 화면 아래 칸들(화면에서 저절로 읽음)마다 보이기/숨기기·순서 위아래·바탕색, 전체 칸 사이 간격(좁게/그대로/넓게)·제목 정렬·색·크기. site.html에 같이 저장, PC·휴대폰 같이.  5.2(11/15): 디자인 편집기 3 ☰ 메뉴 — 휴대폰 전체 메뉴 창(#vtDrawer) 바탕·글자색, 큰 분류 글자 크기·굵기·줄 간격, 위 칩 모양(알약/네모/선만)·색, 구분선·색, 안쪽 여백, 고객센터 번호 크기. site.html에 같이 저장, 📱 휴대폰 창에서 ☰를 열어 미리보기.  5.1(11/15): 디자인 편집기 대분류 10개(1 전체·2 머리말·3 ☰ 메뉴·4 메인 첫 화면·5 메인 아래·6 상품목록·7 검색·8 상품상세·9 게시판·10 하단) — 이번 판은 1 전체: 본문 글꼴·포인트 색·맨 위 공지 띠·팝업(날짜·오늘 하루 안 보기)·맨 위로 단추, 손님 화면 /_/main/vt_hero/site.html(처음 저장 때 vt_header.html에 한 줄 연결). 나머지 새 대분류는 다음 판(지금은 기능개선 시안으로 연결).  5.0(11/15): 사장님 최종 지시 "편집기 수정" — 맨 위 [○○ 디자인 편집기][기능개선], 기능개선 113가지(기능개선_통합목록.json) 8개 대분류 탭 M·D·L·S·P·B·F·C, 번호마다 '👀 시안'(실제 화면 위에 편집기에서만 그림 — 이 화면·미리보기 창 PC·휴대폰, 쇼핑몰 저장 X), [고른 것 보내기](목록 복사), 체크 삭제·확인 창·지운 것·되살리기, 고른 것·지운 것은 editor.html·작업내역·웹에 저장. 옛 50가지 칸은 안 보임(코드·빈티지톡 cfg.html 연결은 남김, 쓰지 않음).  4.9(11/15): PC 화면 밀림(CLS 0.066~0.149) 원인 = 흐르는 띠 글자가 웹 글꼴(Anton·Inter)로 바뀌며 폭이 달라짐(약 1초) → 띠 글자도 글꼴이 준비될 때까지 숨김(제목과 같은 방식, 최대 2.5초), REVEAL이 띠 글꼴도 기다림. 손님 화면은 hero.html 저장 때 적용.  4.8(11/15): 빈티지톡은 디자인 세션이 만든 값 파일(/_/vt_imp/cfg.html, id vt-imp-cfg)에 바로 저장(SHOPS.imp), 미리보기는 그쪽 window.vtImpLoad(값) 먼저, 상태 '이미 있음'·안내 글(note)·묶음 값 칸(json), 9번(첫 화면 버튼 또렷하게)은 편집기가 버튼 모양으로(흰 테두리·크게·휴대폰 2×2, 끄면 원래대로, 겹침 정리).  4.7(11/15): 사장님 "48·49 넣어 보고 판단" — 48(운영시간·전화 한 줄)·49(SALE 띠) 세 쇼핑몰 모두(전용 표시 뺌), 둘 다 '👀 시안으로 보기'(48 = 메인 바닥 맨 위 한 줄, 쇼핑몰 화면에서 전화·운영시간을 찾아 넣음 / 49 = 목록 위 빨간 띠).  4.6(11/15): 사장님 "10번은 기능개선에 넣어 화면 보고 판단"·"40번도 넣기"·25·34번 뺌(번호 그대로) — 40번 카카오 상담 시안, 미리보기 때 window.vtImp.apply(값)도 부름(디자인 세션 기능 파일용), 아직 안 만든 개선 번호도 '👀 시안으로 보기'(편집기 화면·미리보기 창에만, 저장 안 됨). 10번 오늘 들어온 옷 띠 시안(숫자는 예시), 10번은 '안 됨' 대신 늘 '준비 중'.  4.5(11/15): 사장님 계획 — 맨 위 두 칸 [○○ 디자인 편집기][쇼핑몰 개선 제안], 개선 제안 50가지 켜기·끄기·세부값·미리보기 창·카페24 저장(imps.html, 형식 vt_hero\imps\쇼핑몰개선_설정형식_v1.md), 스타일 카드·머리말 카드·개선 번호 체크해서 지우기(꼭 확인 창, 지운 것 보기·되살리기, 손님 화면에 쓰는 것은 못 지움, editor.html), 작업내역·ESC·웹에 저장 같이.  4.4(11/14): 사장님 "모든 스타일은 PC·휴대폰 공유" — ① 메인 스타일을 고르면 숨은 휴대폰 화면(390×844)에 그려 보고 겹치거나 화면 밖으로 나간 글씨를 휴대폰에서만 옮김(mobTidy, '📱 휴대폰 글씨 겹침 정리' 단추) ② 머리말 스타일 휴대폰판: 가운데 로고(햄버거는 왼쪽), 글자 아이콘, 세로선·네모 칸, 유리 막대, 투명 머리말 그늘 ③ 휴대폰에서 처음과 같던 '오른쪽 메뉴 몰아두기' 지움 ④ 새 머리말 '큰 메뉴 에디토리얼'(큰 굵은 메뉴 줄 + 작은 분류 줄, 휴대폰은 로고 줄 + 굵은 메뉴 줄 옆으로 넘기기).  4.3(11/14): 사장님 "모든 건 모바일과 공유" — 같이 바꾸기가 글씨·색뿐 아니라 바깥 여백·모서리·어둡게·높이·작은 칸 색·위치·크기·간격·띠 속도·방향·머리말 높이·로고 크기까지 다른 폭에 따라감(휴대폰은 폭에 맞춰 0.42배). '📱 PC 값으로 휴대폰 맞추기' 단추. 휴대폰만 따로: 휴대폰일 때(나눔 모양)·움직임(휴대폰은 늘 없음)·사진 고정·로고 자리.  4.2(11/14): '📱 휴대폰일 때'를 8:2~2:8·5:5 모든 나눔에서 — 제목에 PC 비율, 쌓기 처음 사진 칸 높이는 PC 비율(30~85)로.  4.1(11/14): 화면 방식에서 나눔(8:2 등)을 고르면 '📱 휴대폰일 때' 칸 — 위아래로 쌓기(위에 올 칸·사진 칸 높이·쌓는 방식) 또는 한 화면(작은 칸 없이). PC 손님 화면은 그대로, 휴대폰은 움직임 없음.  4.0(11/14): 웹용 — 구글 웹앱(window.__VTH_WEB)에서도 열림(어디서나 고치고 웹에 저장), 쇼핑몰 편집기에서 ?vtdraft=web 이면 웹 저장본을 불러와 확인 후 카페24에 저장.  3.9(11/14): 바깥여백 '네 방향 같이' — 키보드로 숫자를 쳐도(칠 때마다·Enter·칸 벗어날 때) 위·오른쪽·아래·왼쪽이 같이. 직접 넣은 바깥여백은 스타일(구도·분위기)이나 추천 시안을 골라도 그대로 남음.  3.8(11/14): PC 화면은 절대 가리지 않음 — ✏️휴대폰은 가운데 검은 휴대폰 화면 대신 휴대폰 창(따로 창)을 열고 휴대폰 설정을 고침.  3.7(11/14): [🖥 PC][💻 노트북][📱 휴대폰]을 켜고 끄는 단추로 — 각각 떨어진 창으로 열어 여러 모니터에 두고 한꺼번에 봄, 고치면 모든 창 같이, 창에서 끌면 그 폭 고침, 창 자리·크기 기억. 고치는 폭은 ✏️PC/✏️휴대폰.  3.6(11/14): 편집 창 머리 줄 — 제목은 한 줄, 단추는 아랫줄로 줄바꿈 없이. 노트북 미리보기 '불러오는 중' 표시.  3.5(11/14): 미리보기 폭 [🖥 PC(지금 창)][💻 노트북(1366×768)][📱 휴대폰(390×844)] 바로 전환, 노트북 화면에서도 바로 고쳐 보이기.  3.4(11/14): 저장 직전 사진 크기 재기(3.2)는 작업내역 줄로 안 남기고 지금 줄에 조용히 합침.  3.3(11/14): 작업내역 목록(도구막대 '작업내역', 줄 누르면 그때로), ESC = 한 단계 되돌리기(글자 입력 중·창 열림이면 그것부터 닫음), 반응형은 PC·휴대폰·머리말을 한 작업내역으로 + 글씨·사진·색은 PC·휴대폰 같이(위치·크기는 보는 폭만), 스타일도 두 폭 같이.  3.2(11/13, 플러스 편집기): 저장할 때 사진 실제 크기(naturalWidth·Height)로 media·sizes·tall의 w/h 자동 맞춤(주소 칸 바꿀 때도), SHOPS.preloadFile이 있고 그 파일이 화면에 연결된 몰은 첫 사진 미리 받기 줄을 그 파일(메인 주소에서만 동작)에 따로 저장하고 hero.html에서는 뺌.  3.1(11/13): 첫 화면 큰 사진(첫 장)에 decoding="sync" — 받은 사진을 글자와 같은 순간에 그림(PageSpeed 휴대폰 LCP 그리기 지연).  3.0(11/13): PC도 웹 글꼴 글씨를 글꼴이 준비될 때까지 숨겼다가 제자리에 바로 보임(큰 제목이 대체 글꼴→진짜 글꼴로 바뀌며 움찔하던 것). REVEAL은 PC 폭이면 #vth-cfg 글꼴을 기다림(최대 2.5초).  2.9(11/13 오케이 편집기): 손님 화면 글자 보이기(REVEAL)에서 getComputedStyle 강제 리플로우 없앰 — 설정 JSON 글꼴 값으로 fonts.load, PC 폭이면 바로 보임. 2.8(11/13): 편집기 맨 위 [메인 첫 화면]/[머리말] 큰 전환, 머리말 스타일 31가지(PC·휴대폰 같이, 휴대폰은 단순·움직임 없음), 메인 시안+머리말 세트, 머리말만 바꾸면 머리말 파일만 저장.  2.7(11/13): 사진 크기별 파일(media.sizes → srcset, 화면 폭에 맞는 사진만 받음) + 세로로 긴 화면용 사진(media.tall → picture source, 예: 휴대폰 세로 7:10 이하). 저장해도 손작업 picture가 사라지지 않게.  2.6(11/13): 로고 칸 비율 지키기(SHOPS.hdr.logoBox{pc:[폭,높이],mobile:[폭,높이]}) — 로고 크기를 바꿔도 칸 비율 그대로(플러스 PC 240×24).  2.5(11/13): 머리말 아래 틈(SHOPS.hdr.gap{pc,mobile}) — 윗여백·메인 높이 = 머리말 높이 + 틈(오케이 PC 8px).  2.4(11/12, 빈티지톡 편집기): 머리말 탭(높이 PC·휴대폰 따로, 로고 크기·자리, 분류 글자·간격, 배경색, 아이콘 위아래, 고정·사진 위 겹치기), 메인 높이 비율(16:9 등).  2.3(11/12, 플러스 편집기): 디자인 번호(skinNo)·머리말 높이(headerPx)·기본 버튼(items)을 SHOPS 값으로, 플러스 home(지금 플러스 메인), 버튼 줄 없는 첫 화면에서 스타일 누르면 오류 나던 것 고침.  2.2(11/11): '② 스타일' 맨 위 추천 시안 3개(가격표·수입 베일·데님 라벨), 누르면 PC·휴대폰 함께 적용.  2.1(11/11): 휴대폰 웹 글꼴 글씨 늦게 바뀌며 움직이던 것 → 준비되면 제자리에 보이게 */
  /* 반응형 모드: hero.html 안에 모바일 설정(vth-cfg-m)이 있으면 켜짐 */
  var RESP = !!document.getElementById('vth-cfg-m');
  VTH.resp = RESP;

  /* ---------- 쇼핑몰별 다른 점 (이름, 사진 설명, '처음 상태') ----------
   * home: '전체 초기화'·'지금 메인 그대로' 스타일을 누를 때 돌아갈 처음 화면 설정(PC/모바일). 없으면 아래 기본값(빈티지톡 메인).
   * preloadFile(3.2): 첫 사진 미리 받기 줄만 담는 파일(예 '/_/main/vt_hero/preload.html'). 메인 레이아웃 <head> 앞쪽에서 import. 연결되면(window.__vthPre) hero.html 안 preload는 빠짐. 없으면 예전 그대로.
   * hdr(2.4~): 머리말 편집 — file·scrolled·pcPadB·sel(칸 이름)·def(처음 값)·gap{pc,mobile}(머리말 아래 틈 px, 윗여백 = 높이 + 틈), rowMin(2.8: 머리말 스타일이 배치를 바꾸는 가장 좁은 PC 폭, 분류가 많으면 크게), logoBox{pc:[폭,높이],mobile:[폭,높이]}(로고 칸이 고정 크기면 그 비율로 폭, 없으면 width:auto).
   * skinNo: 반응형 디자인 번호(저장할 곳), headerPx: { pc, mobile } 반응형 머리말 높이(px). 없으면 빈티지톡 스킨67 값(102, 128/52).
   * items: 첫 화면에 버튼 줄이 없을 때 스타일이 쓸 기본 버튼(BRAND·WOMEN·MEN·KIDS 분류 링크). 없으면 빈티지톡 기본값. */
  var SHOPS = {
    oldmarket: { KO: '빈티지톡', KOI: '빈티지톡이', EN: 'VINTAGE TALK', En: 'Vintage Talk', en: 'vintage talk', alt: '빈티지톡 수입 구제 빈티지 의류', skinNo: 102, headerPx: { pc: 128, mobile: 52 }, preloadFile: '/_/main/vt_hero/preload.html', home: null,
      imp: { file: '/_/vt_imp/cfg.html', id: 'vt-imp-cfg', plain: true }, /* 4.8 개선 제안 값 파일 = 빈티지톡 디자인이 만든 것(boot.html이 읽음) */
      /* 머리말(2.4): 스킨67 /layout/basic/vt_header.html 맨 위에서 header.html 을 불러옴. scrolled = 내리면 붙는 이름(작은 머리말) */
      hdr: { file: '/_/main/vt_hero/header.html', scrolled: 'is-fixed', pcPadB: 20,
        sel: { root: '.vt-hd', inner: '.vt-hd__in', logo: '.vt-hd__logo', logoImg: '.vt-hd__logo .vt-logo-svg', navLi: '.vt-hd__nav li', navA: '.vt-hd__nav li a', right: '.vt-hd__right', ico: '.vt-ico', wrap: '#wrap' },
        def: { v: 1, bg: '#ffffff', fixed: true, overlay: false, overlayLight: true, pc: { h: 128, logoH: 22, logoPos: 'left', logoX: 0, logoY: 30, navSize: 0, navGap: 0, iconY: -7 }, mobile: { h: 52, logoH: 16, logoPos: 'left', logoX: 14, iconY: 0 } } } },
  };
  var SHKEY = 'oldmarket'; /* 11/18 사장님: 편집기는 빈티지톡 전용(플러스·오케이는 뺌) */
  if ((WEB && WEB.shop && WEB.shop !== 'oldmarket') || (!WEB && /korshin7|k2sun2000|vintageok|vintageplus/.test(location.hostname))) {
    VTH.ready = false; try { alert('이 편집기는 빈티지톡 전용입니다(11/18부터). 이 쇼핑몰에서는 열리지 않습니다.'); } catch (e) { } return;
  }
  var SH = SHOPS[SHKEY]; SH.key = SHKEY;
  VTH.shop = SH;

  /* ---------- 글꼴 목록 (모두 상업용 무료) ---------- */
  var FONTS = [
    ['Noto Serif', '노토 세리프 (지금 제목)', "'Noto Serif',serif", 'g:Noto+Serif:ital,wght@0,400;0,700;0,900;1,400;1,700'],
    ['Noto Sans KR', '노토 산스 (지금 본문)', "'Noto Sans KR',sans-serif", ''],
    ['Playfair Display', 'Playfair Display (FLOWRISE 느낌)', "'Playfair Display',serif", 'g:Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900'],
    ['Gloock', 'Gloock (굵은 세리프)', "'Gloock',serif", 'g:Gloock'],
    ['Bodoni Moda', 'Bodoni Moda (잡지 표지)', "'Bodoni Moda',serif", 'g:Bodoni+Moda:ital,wght@0,400;0,700;0,900;1,400;1,700'],
    ['DM Serif Display', 'DM Serif Display', "'DM Serif Display',serif", 'g:DM+Serif+Display:ital@0;1'],
    ['Libre Caslon Text', 'Libre Caslon (Athelas 느낌)', "'Libre Caslon Text',serif", 'g:Libre+Caslon+Text:ital,wght@0,400;0,700;1,400'],
    ['EB Garamond', 'EB Garamond', "'EB Garamond',serif", 'g:EB+Garamond:ital,wght@0,400;0,600;0,800;1,400'],
    ['Cormorant Garamond', 'Cormorant (가늘고 우아함)', "'Cormorant Garamond',serif", 'g:Cormorant+Garamond:ital,wght@0,300;0,500;0,700;1,300;1,500'],
    ['Bebas Neue', 'Bebas Neue (좁은 대문자)', "'Bebas Neue',sans-serif", 'g:Bebas+Neue'],
    ['Anton', 'Anton (굵은 대문자)', "'Anton',sans-serif", 'g:Anton'],
    ['Oswald', 'Oswald', "'Oswald',sans-serif", 'g:Oswald:wght@300;500;700'],
    ['Archivo', 'Archivo (Cogito 느낌)', "'Archivo',sans-serif", 'g:Archivo:ital,wght@0,300;0,500;0,800;0,900;1,400'],
    ['Inter', 'Inter (깔끔한 고딕)', "'Inter',sans-serif", 'g:Inter:wght@300;400;600;800'],
    ['Outfit', 'Outfit', "'Outfit',sans-serif", 'g:Outfit:wght@300;500;800'],
    ['Syne', 'Syne (개성 고딕)', "'Syne',sans-serif", 'g:Syne:wght@400;700;800'],
    ['Nanum Myeongjo', '나눔명조', "'Nanum Myeongjo',serif", 'g:Nanum+Myeongjo:wght@400;700;800'],
    ['MaruBuri', '마루부리 (한글 세리프)', "'MaruBuri',serif", 'u:https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css'],
    ['Pretendard', '프리텐다드 (한글 고딕)', "'Pretendard',sans-serif", 'u:https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'],
    /* ---- 빈티지 글꼴 (11/09 추가, 모두 구글 폰트·상업용 무료) ---- */
    ['Abril Fatface', '[빈티지] Abril Fatface (70년대 굵은 세리프)', "'Abril Fatface',serif", 'g:Abril+Fatface'],
    ['Fraunces', '[빈티지] Fraunces (부드러운 옛 세리프)', "'Fraunces',serif", 'g:Fraunces:ital,wght@0,400;0,700;0,900;1,400;1,700'],
    ['Old Standard TT', '[빈티지] Old Standard (옛날 책 글씨)', "'Old Standard TT',serif", 'g:Old+Standard+TT:ital,wght@0,400;0,700;1,400'],
    ['IM Fell English', '[빈티지] IM Fell (오래된 인쇄)', "'IM Fell English',serif", 'g:IM+Fell+English:ital@0;1'],
    ['Cinzel', '[빈티지] Cinzel (고전 대문자)', "'Cinzel',serif", 'g:Cinzel:wght@400;700;900'],
    ['Rozha One', '[빈티지] Rozha One (굵고 날카로운 세리프)', "'Rozha One',serif", 'g:Rozha+One'],
    ['Shrikhand', '[빈티지] Shrikhand (70년대 레트로 기울임)', "'Shrikhand',serif", 'g:Shrikhand'],
    ['Alfa Slab One', '[빈티지] Alfa Slab (굵은 슬랩)', "'Alfa Slab One',serif", 'g:Alfa+Slab+One'],
    ['Ultra', '[빈티지] Ultra (아주 굵은 슬랩)', "'Ultra',serif", 'g:Ultra'],
    ['Rye', '[빈티지] Rye (웨스턴 간판)', "'Rye',serif", 'g:Rye'],
    ['Limelight', '[빈티지] Limelight (아르데코)', "'Limelight',serif", 'g:Limelight'],
    ['Poiret One', '[빈티지] Poiret One (가는 아르데코)', "'Poiret One',sans-serif", 'g:Poiret+One'],
    ['Monoton', '[빈티지] Monoton (네온 줄무늬)', "'Monoton',sans-serif", 'g:Monoton'],
    ['Righteous', '[빈티지] Righteous (레트로 고딕)', "'Righteous',sans-serif", 'g:Righteous'],
    ['UnifrakturMaguntia', '[빈티지] Unifraktur (블랙레터)', "'UnifrakturMaguntia',serif", 'g:UnifrakturMaguntia'],
    ['Pirata One', '[빈티지] Pirata One (스트릿 블랙레터)', "'Pirata One',serif", 'g:Pirata+One'],
    ['Special Elite', '[빈티지] Special Elite (낡은 타자기)', "'Special Elite',monospace", 'g:Special+Elite'],
    ['Space Mono', '[모노] Space Mono (고정폭)', "'Space Mono',monospace", 'g:Space+Mono:ital,wght@0,400;0,700'],
    ['IBM Plex Mono', '[모노] IBM Plex Mono (터미널)', "'IBM Plex Mono',monospace", 'g:IBM+Plex+Mono:wght@400;500;600'],
    ['Courier Prime', '[빈티지] Courier Prime (타자기)', "'Courier Prime',monospace", 'g:Courier+Prime:ital,wght@0,400;0,700;1,400'],
    ['Lobster', '[빈티지] Lobster (레트로 손글씨)', "'Lobster',cursive", 'g:Lobster'],
    ['Pacifico', '[빈티지] Pacifico (서핑 손글씨)', "'Pacifico',cursive", 'g:Pacifico'],
    ['Yellowtail', '[빈티지] Yellowtail (50년대 손글씨)', "'Yellowtail',cursive", 'g:Yellowtail'],
    ['Song Myung', '[빈티지] 송명 (한글 옛 명조)', "'Song Myung',serif", 'g:Song+Myung'],
    ['Gowun Batang', '[빈티지] 고운바탕 (한글 부드러운 명조)', "'Gowun Batang',serif", 'g:Gowun+Batang:wght@400;700'],
    ['Hahmlet', '[빈티지] 함렛 (한글 굵은 명조)', "'Hahmlet',serif", 'g:Hahmlet:wght@400;700;900'],
    ['Black Han Sans', '[빈티지] 검은고딕 (한글 레트로 포스터)', "'Black Han Sans',sans-serif", 'g:Black+Han+Sans'],
    ['Do Hyeon', '[빈티지] 도현 (한글 옛 간판)', "'Do Hyeon',sans-serif", 'g:Do+Hyeon'],
    ['Gugi', '[빈티지] 구기 (한글 옛 서체)', "'Gugi',serif", 'g:Gugi'],
    ['Yeon Sung', '[빈티지] 연성 (한글 레트로 손글씨)', "'Yeon Sung',cursive", 'g:Yeon+Sung'],
    ['Nanum Brush Script', '[빈티지] 나눔 붓글씨 (한글 붓)', "'Nanum Brush Script',cursive", 'g:Nanum+Brush+Script']
  ];
  function fontRow(name) { for (var i = 0; i < FONTS.length; i++) { if (FONTS[i][0] === name) { return FONTS[i]; } } return null; }
  function ff(name) { var r = fontRow(name); return r ? r[2] : "'" + String(name || 'Noto Sans KR').replace(/'/g, '') + "',sans-serif"; }

  /* ---------- 작은 도구 ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function num(v, d) { v = parseFloat(v); return isNaN(v) ? (d || 0) : v; }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function hexA(hex, a) {
    hex = String(hex || '#000000').replace('#', '');
    if (hex.length === 3) { hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]; }
    var n = parseInt(hex.slice(0, 6), 16) || 0;
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function cleanHtml(h) {
    return String(h || '').replace(/<\s*\/?\s*(script|style|iframe|object|embed)[^>]*>/gi, '').replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '').replace(/javascript:/gi, '');
  }
  var uid = 1;
  function newId() { uid++; return 'k' + Date.now().toString(36).slice(-4) + uid; }

  /* ---------- 기본 설정 ---------- */
  function baseBlock(o) {
    var b = {
      id: newId(), type: 'text', area: 'main', tag: 'div', html: '글씨', pos: 'mc', x: 0, y: 0, w: 90, align: 'center',
      font: 'Noto Sans KR', size: 24, weight: 400, italic: false, color: '#ffffff', ls: 0, lh: 1.3, upper: 'none',
      rotate: 0, flipX: false, flipY: false, clipT: 0, clipB: 0, stroke: 0, strokeColor: '#ffffff', fill: true,
      shadow: 0, bg: '', bgPad: 10, opacity: 100, link: '',
      items: [], bstyle: 'text', bdir: 'row', gap: 40, bcolor: '#ffffff', bbg: '#ffffff', bhover: '#c4001f'
    };
    for (var k in o) { if (o.hasOwnProperty(k)) { b[k] = o[k]; } }
    return b;
  }
  VTH.defaults = function (device) {
    var mob = device === 'mobile';
    if (SH.home && SH.home[mob ? 'mobile' : 'pc']) { return clone(SH.home[mob ? 'mobile' : 'pc']); }
    var d = {
      v: 1, device: mob ? 'mobile' : 'pc', base: mob ? 390 : 1100,
      skinNo: 0, file: '/_/main/vt_hero/hero.html', mobilePreview: '', mobileSkinNo: 0,
      height: { mode: 'screen', vh: 100, px: 800, minusHeader: !mob },
      bleed: !mob, pad: mob ? 6 : 5,
      media: { type: 'image', src: '/web/main/main100kb.jpg', w: 1491, h: 1173, fx: 50, fy: mob ? 50 : 0, fixed: true, zoom: false, motion: 'none', slides: [], slideSec: 5, video: '', poster: '', videoMobile: 'poster' },
      split: { mode: 'full', ratio: 80, reverse: false, stack: mob, sideType: 'image', sideColor: '#f1efe9', sideImg: '', sideH: 40, fit: 'screen', sfx: 50, sfy: 50, sov: 0, sovColor: '#000000', sgrad: 'none', spad: mob ? 6 : 5, gap: 0 },
      overlay: { amount: 0, color: '#000000', grad: 'none' },
      frame: { t: 0, r: 0, b: 0, l: 0, color: '#ffffff', radius: 0 },
      blocks: [
        baseBlock({ tag: 'h2', html: 'UP TO<br>90% SALE', pos: 'mc', y: mob ? -7 : -5.6, font: 'Noto Serif', size: mob ? 70 : 132, weight: 700, ls: mob ? 143 : 76, lh: mob ? 1 : 1.36 }),
        baseBlock({ tag: 'p', html: '매주 새로운 상품 업데이트!', pos: 'mc', y: mob ? 10.3 : 12.7, font: 'Noto Sans KR', size: mob ? 14 : 25, weight: 400, ls: -30, lh: 1.6 }),
        baseBlock({ type: 'buttons', html: '', pos: 'mc', y: mob ? 16.2 : 18.6, font: 'Noto Sans KR', size: mob ? 13 : 20, weight: 700, gap: mob ? 17 : 60,
          items: [{ t: 'BRAND', u: '/product/list.html?cate_no=2410' }, { t: 'WOMEN', u: '/product/list.html?cate_no=2459' }, { t: 'MEN', u: '/product/list.html?cate_no=2460' }, { t: 'KIDS', u: '/product/list.html?cate_no=1835' }] })
      ],
      marquee: { on: false, text: 'SALE  SALE  SALE  SALE', pos: 'over-bottom', speed: 20, dir: 'left', font: 'Libre Caslon Text', size: mob ? 60 : 140, weight: 400, italic: false, ls: -90, color: '#ffffff', bg: '', clipT: 12, clipB: 18, upper: 'none', opacity: 100 },
      fx: { scrollFade: false, entrance: mob ? 'none' : 'up', pageIn: 'still' }
    };
    if (RESP) {
      /* 스킨67: 머리말이 화면 위에 고정(PC 128px · 모바일 52px), 본문은 이미 화면 끝까지라 좌우 늘리기(bleed) 안 씀 */
      var hp = SH.headerPx || {}; d.resp = true; d.headerPx = mob ? (hp.mobile != null ? hp.mobile : 52) : (hp.pc != null ? hp.pc : 128); d.bleed = false; d.skinNo = SH.skinNo || 102;
      d.media.alt = SH.alt; d.media.fixed = !mob;
    }
    return d;
  };

  /* ---------- 화면 만들기 (CSS + HTML) ---------- */
  var POS = { tl: [0, 0], tc: [1, 0], tr: [2, 0], ml: [0, 1], mc: [1, 1], mr: [2, 1], bl: [0, 2], bc: [1, 2], br: [2, 2] };
  function fsz(s, base) { s = num(s, 16); return 'min(' + s + 'px,' + (s * 100 / (base || 1440)).toFixed(3) + 'vw)'; }
  /* 휴대폰 글 칸: 폭이 390 보다 좁은 휴대폰(375·360)에서도 본문·버튼 글씨가 14px 아래로 줄지 않게(14px 보다 작게 정한 글씨는 그 크기 그대로) */
  function fszM(s, base) { s = num(s, 16); return 'max(' + Math.min(14, s) + 'px,' + fsz(s, base) + ')'; }
  /* 6.9 휴대폰 글씨 높이 한도: 글 칸 자리(top)는 첫 화면 높이의 %라서, 폭은 넓고 키는 작은 화면(휴대폰 가로 874x402·740x360 등)에서는 자리 사이가 좁아지는데
     글씨는 폭 기준이라 그대로 커서 겹침 → 글씨도 첫 화면 높이에 비례하는 한도를 둠. 기준 = 휴대폰 글씨 정리를 하는 키 620 화면(tidyFrame)의 첫 화면 높이 —
     그보다 키가 큰 화면(세로 휴대폰 거의 전부)은 한도가 정한 크기보다 커서 지금과 똑같음. 14px 아래로는 줄이지 않음(본문 14px 규칙) */
  function fszMH(b, c) {
    var s = num(b.size, 16), h = c.height || {};
    if (h.mode === 'px' || h.mode === 'ratio') { return fszM(s, c.base); }
    var vh = h.mode === 'screen' ? 100 : num(h.vh, 80), ref = 620 * vh / 100 - (h.minusHeader ? (c.headerPx != null ? num(c.headerPx) : 50) : 0);
    if (ref < 200 || s <= 14) { return fszM(s, c.base); }
    return 'max(14px,min(' + s + 'px,' + (s * 100 / (c.base || 1440)).toFixed(3) + 'vw,calc(' + heightCss(c) + ' * ' + (s / ref).toFixed(5) + ')))';
  }

  function blockCss(b, c) {
    var p = POS[b.pos] || [1, 1], spl = c.split || {};
    var pad = (b.area === 'side' && spl.mode !== 'full' && spl.spad != null) ? num(spl.spad, 5) : num(c.pad, 5);
    var ax = [pad, 50, 100 - pad][p[0]], ay = [pad, 50, 100 - pad][p[1]];
    var tx = [0, -50, -100][p[0]], ty = [0, -50, -100][p[1]];
    var t = 'translate(' + tx + '%,' + ty + '%)';
    if (num(b.rotate)) { t += ' rotate(' + num(b.rotate) + 'deg)'; }
    if (b.flipX || b.flipY) { t += ' scale(' + (b.flipX ? -1 : 1) + ',' + (b.flipY ? -1 : 1) + ')'; }
    var s = '#vth .vth-b' + b.id + '{left:calc(' + ax + '% + ' + num(b.x) + '%);top:calc(' + ay + '% + ' + num(b.y) + '%);transform:' + t +
      ';max-width:' + num(b.w, 90) + '%;text-align:' + (b.align || 'center') + ';font-family:' + ff(b.font) + ';font-size:' + (c.device === 'mobile' ? fszMH(b, c) : fsz(b.size, c.base)) +
      ';font-weight:' + (b.weight || 400) + ';font-style:' + (b.italic ? 'italic' : 'normal') + ';color:' + (b.fill === false ? 'transparent' : (b.color || '#fff')) +
      ';letter-spacing:' + (num(b.ls) / 1000) + 'em;line-height:' + num(b.lh, 1.3) + ';text-transform:' + (b.upper || 'none') +
      ';opacity:' + (num(b.opacity, 100) / 100) + ';';
    if (num(b.stroke)) { s += '-webkit-text-stroke:' + num(b.stroke) + 'px ' + (b.strokeColor || '#fff') + ';'; }
    if (num(b.shadow)) { s += 'text-shadow:0 2px ' + num(b.shadow) + 'px rgba(0,0,0,.45);'; }
    if (b.bg) { s += 'background:' + b.bg + ';padding:' + num(b.bgPad) + 'px ' + Math.round(num(b.bgPad) * 1.5) + 'px;'; }
    if (num(b.clipT) || num(b.clipB)) { s += 'clip-path:inset(' + num(b.clipT) + '% -30% ' + num(b.clipB) + '% -30%);'; }
    s += '}';
    if (b.type === 'buttons') {
      var jc = { left: 'flex-start', center: 'center', right: 'flex-end', justify: 'space-between' }[b.align || 'center'];
      s += '#vth .vth-b' + b.id + ' ul{display:flex;flex-wrap:wrap;flex-direction:' + (b.bdir === 'col' ? 'column' : 'row') + ';align-items:' + (b.bdir === 'col' ? jc : 'center') + ';justify-content:' + jc + ';gap:' + fsz(b.gap, c.base) + ';list-style:none;margin:0;padding:0}';
      var a = '#vth .vth-b' + b.id + ' a{display:inline-block;text-decoration:none;color:' + (b.bcolor || '#fff') + ';transition:color .2s,background .2s,border-color .2s;';
      if (b.bstyle === 'underline') { a += 'border-bottom:1px solid currentColor;padding-bottom:.15em;'; }
      if (b.bstyle === 'outline') { a += 'border:1px solid currentColor;padding:.55em 1.3em;'; }
      if (b.bstyle === 'solid' || b.bstyle === 'pill') { a += 'background:' + (b.bbg || '#fff') + ';padding:.6em 1.4em;'; }
      if (b.bstyle === 'pill') { a += 'border-radius:999px;'; }
      s += a + '}#vth .vth-b' + b.id + ' a:hover{color:' + (b.bhover || '#c4001f') + (b.bstyle === 'solid' || b.bstyle === 'pill' ? ';background:' + (b.bcolor || '#fff') : '') + '}';
    }
    return s;
  }

  function ovBg(color, a, grad) {
    return grad === 'none' ? hexA(color, a) :
      grad === 'radial' ? 'radial-gradient(circle at center,' + hexA(color, 0) + ' 20%,' + hexA(color, a) + ' 100%)' :
        'linear-gradient(to ' + grad + ',' + hexA(color, 0) + ' 0%,' + hexA(color, a) + ' 100%)';
  }
  function heightCss(c) {
    var h = c.height || {};
    if (h.mode === 'px') { return num(h.px, 800) + 'px'; }
    if (h.mode === 'ratio') { var rr = String(h.ratio || '16:9').split(':'); return 'calc(100vw * ' + num(rr[1], 9) + ' / ' + num(rr[0], 16) + ')'; }
    var vh = h.mode === 'screen' ? 100 : num(h.vh, 80);
    var minus = h.minusHeader ? ' - var(--header-height,' + (c.headerPx != null ? num(c.headerPx) : (c.device === 'mobile' ? 50 : 0)) + 'px)' : '';
    // --vthH: 휴대폰에서 처음 높이를 px로 고정(카카오톡·사파리 도구막대가 숨었다 나타날 때 사진·글씨 출렁임 방지, 11/09)
    return 'var(--vthH,calc(' + vh + 'svh' + minus + '))';
  }
  /* ===== 머리말(상단) 설정 (2.4, 11/12) =====
     쇼핑몰마다 SHOPS[..].hdr 에 머리말 칸 이름(sel)·처음 값(def)·저장 파일(file)을 둔다.
     저장 파일(header.html)은 머리말 파일 맨 위에서 불러와 모든 화면(메인·목록·상세·게시판)에 들어감.
     높이는 --header-height 하나로 정해서 머리말 높이·다른 화면 윗여백·메인 높이가 같이 맞음. 움직임 효과 없음 */
  /* ===== 머리말 스타일 (2.8, 11/13) =====
     h.st = 머리말 꾸밈(글자색·글꼴·선·칩·아이콘 글자·한 줄/가운데 배치·위 정보 띠·유리·로고 상자·반전).
     모양(색·글꼴·선)은 내려서 작아진 머리말에도 같이, 배치·높이는 PC 처음 머리말(:not(내림))에만. 휴대폰은 단순형(움직임 없음) */
  function gFontUrl(name, weights, ital) {
    var f = FONTS.filter(function (x) { return x[0] === name; })[0]; if (!f || !/^g:/.test(f[3])) { return ''; }
    var fam = f[3].slice(2).split(':')[0], ax = f[3].slice(2).split(':').slice(1).join(':');
    if (!ax || !/wght/.test(ax)) { return 'https://fonts.googleapis.com/css2?family=' + fam + (ax && ital && /ital/.test(ax) ? ':ital@0;1' : '') + '&display=swap'; }
    var it = /ital/.test(ax), have = (ax.split('@')[1] || '').split(';').map(function (x) { return x.split(',').pop(); });
    var want = weights.filter(function (w, i, a) { return a.indexOf(w) === i && have.indexOf(String(w)) > -1; }).sort();
    if (!want.length) { want = [have[0]]; }
    return 'https://fonts.googleapis.com/css2?family=' + fam + ':' + (it ? 'ital,wght@' + want.map(function (w) { return '0,' + w; }).concat(ital ? want.map(function (w) { return '1,' + w; }) : []).join(';') : 'wght@' + want.join(';')) + '&display=swap';
  }
  VTH.hdrFonts = function (h) {
    var st = h && h.st; if (!st) { return []; }
    var u = [], add = function (n, w, it) { if (n && n !== 'Noto Sans KR') { var x = gFontUrl(n, w, it); if (x && u.indexOf(x) < 0) { u.push(x); } } };
    add(st.font, [num(st.fw, 400)], st.it);
    if (st.bar && st.bar.text) { add(st.bar.font, [num(st.bar.fw, 400)]); }
    return u;
  };
  /* 7.0 WHOLESALE 글씨색: 빈티지톡 디자인 최종 = 진한 주황 #cc3700(흰 바탕 대비 5.1:1). 바탕이 밝으면 #cc3700 에서 4.5:1 이 될 때까지 진하게,
     어두우면 밝은 주황 #ff7a3d 에서 4.5:1 이 될 때까지 밝게. 둘 다 안 되면(중간 회색 바탕 등) 그 스타일 글자색 */
  function wsRgb(c) { var m = String(c || '').trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i); if (!m) { return null; } var x = m[1].length === 3 ? m[1].replace(/(.)/g, '$1$1') : m[1]; return [0, 2, 4].map(function (i) { return parseInt(x.substr(i, 2), 16); }); }
  function wsLum(r) { return [0.2126, 0.7152, 0.0722].reduce(function (a, w, i) { var v = r[i] / 255; return a + w * (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); }, 0); }
  function wsCr(a, b) { var x = wsLum(a), y = wsLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function wsHexOf(r) { return '#' + r.map(function (v) { return ('0' + Math.max(0, Math.min(255, Math.round(v))).toString(16)).slice(-2); }).join(''); }
  function wsColor(bg, fg) {
    var B = wsRgb(bg) || [255, 255, 255], i, c;
    var down = function () { c = [204, 55, 0]; for (i = 0; i < 14 && wsCr(c, B) < 4.5; i++) { c = c.map(function (v) { return v * 0.94; }); } return wsCr(c, B) >= 4.5 ? wsHexOf(c) : null; };
    var up = function () { c = [255, 122, 61]; for (i = 0; i < 14 && wsCr(c, B) < 4.5; i++) { c = c.map(function (v, k) { return v + ([255, 214, 190][k] - v) * 0.15; }); } return wsCr(c, B) >= 4.5 ? wsHexOf(c) : null; };
    return (wsLum(B) < 0.18 ? (up() || down()) : (down() || up())) || fg || '#111111';
  }
  VTH.wsColor = wsColor;
  function hdrStyleCss(h, H, S, ns, bP, bM) {
    var st = h.st, p = h.pc || {}, m = h.mobile || {}, P = 'html body ', s = '', pc = '', mo = '';
    var K = function (sub) { return !sub ? '' : (sub.indexOf(S.root + ' ') === 0 ? sub : S.root + ' ' + sub); };
    var A = function (sub, body) { return sub ? P + K(sub) + '{' + body + '}' : ''; };
    var AN = function (sub, body) { return sub ? P + S.root + ns + ' ' + K(sub).slice(S.root.length + 1) + '{' + body + '}' : ''; };
    var nav = S.nav || (S.navLi ? S.navLi.replace(/\s+li$/, '') : ''), ul = nav ? nav + ' ul' : '';
    var fg = st.fg || '', G = H.gap || {};
    var ico = S.ico || '.vt-ico', icoK = ico.split(' ').pop(), icoP = ico.slice(0, ico.length - icoK.length);
    var state = S.state || '.vt-hd__state span';
    var NA = S.navA; /* 7.0: 글꼴·크기·칩은 WHOLESALE 도 분류 메뉴와 똑같이(사장님 11/23 알약 없앰) — 글씨색만 아래에서 주황 */
    if (S.navA && /\bli a$/.test(S.navA)) { var wsA = S.navA.replace(/\bli a$/, 'li.vt-hdws a'), wsC = wsColor(st.glass ? '#ffffff' : (h.bg || '#ffffff'), fg); s += A(wsA, 'color:' + wsC) + A(wsA + ':hover', 'color:' + wsC); } /* 7.0 WHOLESALE 글씨색(빈티지톡 디자인 최종 #cc3700, 바탕이 어두우면 밝은 주황) — 디자인 규칙(.vt-hd__nav li.vt-add.vt-hdws a)보다 한 단계 센 이름 */
    /* 모양: 늘 */
    if (st.glass) { s += P + S.root + '{background:transparent;box-shadow:none}'; }
    if (fg) { s += A(NA, 'color:' + fg) + A(S.navLi, 'color:' + fg) + A(S.navLi + '::before', 'background:currentColor;opacity:.3') + A(S.navLi + '::after', 'background:currentColor;opacity:.3'); }
    if (st.font || st.up || st.ls != null) { s += A(NA, (st.font ? 'font-family:' + ff(st.font) + ';' : '') + (st.fw ? 'font-weight:' + num(st.fw) + ';' : '') + (st.it ? 'font-style:italic;' : '') + (st.up ? 'text-transform:uppercase;' : '') + (st.ls != null ? 'letter-spacing:' + num(st.ls) + 'em' : '')); }
    if (st.chip === 'plain') { s += A(NA + '::before', 'background:transparent;border:0') + A(NA, 'margin-left:0;margin-right:0'); }
    else if (st.chip === 'line') { s += A(NA + '::before', 'background:transparent;border:1px solid currentColor;opacity:.7'); }
    else if (st.dark) { s += A(NA + '::before', 'opacity:.9'); }
    if (st.dark) {
      s += A(S.logoImg, 'filter:invert(1)') + A(ico, 'filter:invert(1)') + A(state, 'background:rgba(255,255,255,.18);color:#fff');
    }
    if (st.logoBox) { s += A(S.logo, 'background:' + st.logoBox + ';padding:7px 12px;line-height:0' + (st.logoTilt ? ';transform-origin:center;rotate:' + num(st.logoTilt) + 'deg' : '')); if (st.logoBoxInv) { s += A(S.logoImg, 'filter:invert(1)'); } }
    if (st.lineB) { s += P + S.root + '::after{content:"";position:absolute;left:0;right:0;bottom:' + num(st.lineB.off) + 'px;border-bottom:' + st.lineB.w + 'px ' + (st.lineB.s || 'solid') + ' ' + (st.lineB.c || fg || '#111') + ';pointer-events:none}'; }
    if (st.lineT) { s += A(S.inner, 'position:relative') + P + K(S.inner) + '::before{content:"";position:absolute;left:0;right:0;top:' + num(st.lineT.off) + 'px;border-top:' + st.lineT.w + 'px ' + (st.lineT.s || 'solid') + ' ' + (st.lineT.c || fg || '#111') + ';pointer-events:none}'; }
    /* 머리말 아래 틈(gap 값이 있을 때)을 머리말 색으로 채움 */
    var bgc = st.glass ? '' : (h.bg || '#ffffff');
    if (bgc && !/^#?f{3}(f{3})?$/i.test(bgc.replace('#', '')) && num(G.pc)) { pc += P + S.root + '{box-shadow:0 ' + num(G.pc) + 'px 0 0 ' + bgc + '}'; }
    if (bgc && !/^#?f{3}(f{3})?$/i.test(bgc.replace('#', '')) && num(G.mobile)) { mo += P + S.root + '{box-shadow:0 ' + num(G.mobile) + 'px 0 0 ' + bgc + '}'; }
    /* PC 아이콘을 글자로 */
    if (st.icon === 'text' || st.icon === 'bracket') {
      var br = st.icon === 'bracket', L = br ? '[ ' : '', Rr = br ? ' ]' : '';
      var ib = 'background-image:none!important;width:auto!important;height:48px;min-width:0;padding:0 8px;line-height:48px;font-size:12px;font-weight:' + num(st.fw, 600) + ';letter-spacing:.08em;color:' + (fg || '#111') + ';filter:none' + (st.font ? ';font-family:' + ff(st.font) : '');
      pc += A(ico, ib) + A(ico + '--search::before', 'content:"' + L + 'SEARCH' + Rr + '"') + A(ico + '--my::before', 'content:"' + L + 'MY' + Rr + '"') + A(ico + '--cart::before', 'content:"' + L + 'BAG ("') + A(ico + '--cart::after', 'content:")' + Rr + '"') + A(ico + '--cart span', 'position:static;display:inline;min-width:0;height:auto;padding:0;background:none;color:inherit;font-size:inherit;line-height:inherit');
      /* 4.4 휴대폰도 글자 아이콘(메뉴는 그림 그대로), 좁아서 글자 작게·괄호 안 띄어쓰기 없이 */
      var Lm = br ? '[' : '', Rm = br ? ']' : '', ibm = 'background-image:none!important;width:auto!important;height:32px;min-width:0;padding:0 4px;line-height:32px;font-size:10px;font-weight:' + num(st.fw, 600) + ';letter-spacing:.03em;color:' + (fg || '#111') + ';filter:none' + (st.font ? ';font-family:' + ff(st.font) : '');
      mo += A(ico + '--search', ibm) + A(ico + '--my', ibm) + A(ico + '--cart', ibm) + A(ico + '--search::before', 'content:"' + Lm + 'SEARCH' + Rm + '"') + A(ico + '--my::before', 'content:"' + Lm + 'MY' + Rm + '"') + A(ico + '--cart::before', 'content:"' + Lm + 'BAG("') + A(ico + '--cart::after', 'content:")' + Rm + '"') + A(ico + '--cart span', 'position:static;display:inline;min-width:0;height:auto;padding:0;background:none;color:inherit;font-size:inherit;line-height:inherit');
    }
    /* 4.4 휴대폰 아이콘 사이 세로선·네모 칸(분류 구분과 같은 모양) */
    if (st.div === 'bar') { mo += A(ico, 'border-right:1px solid ' + (fg || '#111') + ';border-radius:0') + A(ico + '--menu', 'border-right:0'); }
    if (st.div === 'box') { mo += A(ico, 'border:1px solid ' + (fg || '#111') + ';margin-left:-1px;border-radius:0'); }
    /* PC 분류 구분선 */
    var divCss = '';
    if (st.div === 'bar') { divCss += A(S.navLi, 'padding-right:10px;margin-right:10px;border-right:1px solid ' + (fg || '#111')) + A(S.navLi + ':last-child', 'border-right:0'); }
    if (st.div === 'box') { divCss += A(S.navLi, 'margin-right:-1px;padding:0 12px;border:1px solid ' + (fg || '#111')); }
    /* PC 배치(처음 머리말만) */
    var ly = st.layout || '';
    var wide = ly === 'row' || ly === 'right' || ly === 'center' || ly === 'ed' || st.glass, pcw = ''; /* 배치를 바꾼 스타일은 넓은 PC에서만, 좁은 PC는 처음 배치 */
    if (ly || st.font || st.ls) { var nsz = num(p.navSize) || 15, lsk = st.ls ? Math.max(0.7, 1 - num(st.ls)) : 1, nCnt = 14; try { nCnt = document.querySelectorAll('.vt-hd__nav li').length || 14; } catch (e) { } var kN = Math.min(1, 14 / nCnt); /* 6.3: 분류가 14개보다 많아지면 그만큼 글씨·간격을 줄여 오른쪽 아이콘이 밀려 나가지 않게 */ var clampCss = A(S.navA, 'font-size:clamp(11px,' + (nsz / 14.4 * lsk * kN).toFixed(3) + 'vw,' + Math.max(11, Math.round(nsz * kN * 10) / 10) + 'px)') + A(S.navLi, 'margin-right:clamp(4px,' + ((num(p.navGap) || 14) / 14.4 * kN).toFixed(3) + 'vw,' + Math.round((num(p.navGap) || 18) * kN) + 'px)'); if (wide) { pcw = clampCss; } else { pc += clampCss; } }
    if (ly === 'row' || ly === 'right') {
      pcw += AN(S.inner, 'align-items:center;justify-content:space-between;padding-bottom:0') + AN(S.logo, 'position:static;transform:none;margin:0 32px 0 0;flex:none') + AN(nav, 'flex:1;min-width:0;overflow:hidden') + AN(ul, 'justify-content:flex-start') + AN(ul + '>li:first-child', 'margin-left:auto') + (ly === 'right' ? '' : AN(ul + '>li:last-child', 'margin-right:auto')) + AN(S.right, 'align-self:center');
    } else if (ly === 'center') {
      pcw += AN(nav, 'flex:1;min-width:0;overflow:hidden') + AN(ul, 'justify-content:flex-start') + AN(ul + '>li:first-child', 'margin-left:auto') + AN(ul + '>li:last-child', 'margin-right:auto');
    }
    if (wide) { pcw += divCss; } else { pc += divCss; }
    if (st.glass) { pcw += AN(S.inner, 'height:' + (num(p.h, 84) - 16) + 'px;margin:8px auto;width:calc(100% - 40px);padding:0 26px;border-radius:999px;background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 4px 18px rgba(0,0,0,.10)'); mo += P + S.root + '{background:transparent!important;box-shadow:none}' + A(S.inner, 'height:' + Math.max(36, num(m.h, 52) - 10) + 'px;margin:5px 8px;padding:0 4px 0 0;border-radius:999px;background:rgba(255,255,255,.78);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 3px 12px rgba(0,0,0,.12)'); }
    /* 위 정보 띠: PC는 처음 머리말에만(흐름은 PC만), 휴대폰은 멈춘 짧은 글 */
    var bar = st.bar && st.bar.text ? st.bar : null;
    if (bar) {
      var bt = function (t) { return String(t).replace(/\\/g, '').replace(/"/g, '\\"'); };
      var bb = 'position:absolute;left:0;right:0;top:0;overflow:hidden;white-space:nowrap;text-align:center;background:' + (bar.bg || '#111') + ';color:' + (bar.fg || '#fff') + ';font-family:' + ff(bar.font || 'Noto Sans KR') + ';font-weight:' + num(bar.fw, 500) + ';letter-spacing:' + num(bar.ls) + 'em;' + (bar.up ? 'text-transform:uppercase;' : '') + 'pointer-events:none;z-index:1';
      if (bP) {
        var txt = bar.move ? (bt(bar.text) + '\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0').repeat(6) : bt(bar.text);
        pc += P + S.root + ns + '::before{content:"' + txt + '";' + bb + ';height:' + bP + 'px;line-height:' + bP + 'px;font-size:' + num(bar.fs, Math.min(14, Math.round(bP * 0.42))) + 'px' + (bar.move ? ';right:auto;text-align:left;width:max-content;animation:vthHdrBar ' + num(bar.sec, 40) + 's linear infinite' : '') + '}';
        if (bar.move) { pc += P + S.root + ns + '{overflow-x:clip}@media (prefers-reduced-motion:reduce){' + P + S.root + '::before{animation:none!important}}'; s += '@keyframes vthHdrBar{from{transform:translateX(0)}to{transform:translateX(-50%)}}'; }
      }
      if (bM) { mo += P + S.root + '::before{content:"' + bt(bar.mtext || bar.text) + '";' + bb + ';height:' + bM + 'px;line-height:' + bM + 'px;font-size:' + Math.min(12, Math.round(bM * 0.44)) + 'px;text-overflow:ellipsis;padding:0 10px;animation:none}'; }
    }
    /* 4.4 큰 메뉴 에디토리얼: PC는 작은 로고 위·큰 굵은 메뉴 3개 줄·작은 분류 줄, 휴대폰은 로고 줄 + 굵은 메뉴 줄(옆으로 넘기기, 움직임 없음) */
    if (ly === 'ed') {
      pcw += AN(S.inner, 'align-items:flex-end;padding-bottom:16px') + AN(S.right, 'position:absolute;top:' + Math.max(4, num(p.logoY, 26) - 14) + 'px;right:0;align-self:auto') + AN(nav, 'height:auto;overflow:visible;flex:1;min-width:0') +
        AN(ul, 'flex-wrap:wrap;align-items:baseline;row-gap:4px;height:auto;justify-content:flex-start') + AN(ul + '::before', 'content:"";flex-basis:100%;order:1;height:0') +
        AN(ul + '>li', 'order:2;margin-right:22px') + AN(ul + '>li:nth-child(-n+3)', 'order:0;margin-right:clamp(16px,1.8vw,30px)') + AN(ul + '>li:nth-child(-n+3) a', 'font-size:clamp(24px,2.5vw,38px)!important;font-weight:800;letter-spacing:-0.02em;line-height:1.2') +
        AN(ul + '>li:nth-child(n+4) a', 'font-size:15px!important;font-weight:600') /* 7.0: About·Community·WHOLESALE 도 분류와 같게(전에는 vt-add 기울임·가는 글씨) */ + AN(ul + '>li.vt-add-first', 'border-left:1px solid #d6d6d6;padding-left:18px') + AN(ul + '>li::before', 'display:none') + AN(ul + '>li::after', 'display:none');
      mo += A(S.inner, 'position:relative;align-items:flex-start;padding-top:' + Math.max(0, Math.round((52 - 32) / 2)) + 'px') + A(S.logo, 'margin-top:8px') +
        P + S.root + ' ' + nav + '{display:block!important;position:absolute;left:0;right:0;bottom:0;height:44px;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none}' + P + S.root + ' ' + nav + '::-webkit-scrollbar{display:none}' +
        P + S.root + ' ' + ul + '{display:flex!important;flex-wrap:nowrap;align-items:center;gap:18px;height:44px;margin:0;padding:0 14px}' + P + S.root + ' ' + ul + '>li{display:block!important;flex:none;margin:0!important;padding:0!important;border:0!important}' +
        P + S.root + ' ' + ul + '>li a{display:inline!important;font-size:15px!important;font-weight:700;white-space:nowrap;color:' + (fg || '#111') + ';letter-spacing:-0.01em;background:none}' + P + S.root + ' ' + ul + '>li:nth-child(-n+3) a{font-size:18px!important;font-weight:800}' ;
    }
    /* 4.4 투명 머리말(흰 글씨)은 위쪽 옅은 그늘로 사진·띠 위에서도 읽히게(PC·휴대폰 같이) */
    if (h.overlay && h.overlayLight !== false && !st.glass && !st.blend) { s += 'html body:has(#vth) ' + S.root + ns + '{background:linear-gradient(rgba(0,0,0,.42),rgba(0,0,0,0))!important}'; }
    /* 사진 위 반전(메인, 처음 머리말만) */
    if (st.blend && h.overlay) { s += 'html body:has(#vth) ' + S.root + ns + '{mix-blend-mode:difference}'; }
    if (wide) {
      /* 1024~1279(좁은 PC)는 한 줄이 안 들어가서 처음 배치·처음 높이로 */
      var d0 = VTH.hdrDefaults().pc, dT = num(d0.h, 128) + num(G.pc) + bP, pad0 = num(H.pcPadB, 20);
      var WM = Math.max(num(st.wmin, 1280) + 160, num(H.rowMin, 0)); /* 7.0: 머리말에 WHOLESALE 이 들어가 메뉴가 길어짐(사장님 11/23 "기본은 이걸로") → 한 줄 배치는 160px 더 넓은 화면부터(1280→1440, 1440→1600), 그보다 좁으면 처음 배치 */ pc += '}@media (min-width:1024px) and (max-width:' + (WM - 1) + 'px){:root{--header-height:' + dT + 'px}' + P + S.wrap + '{padding-top:' + dT + 'px}' + AN(S.inner, 'height:' + num(d0.h, 128) + 'px') + A(S.logoImg, 'height:' + num(d0.logoH, 22) + 'px') +
        AN(S.logo, 'top:' + num(d0.logoY, 30) + 'px;' + (d0.logoPos === 'center' ? 'left:50%;transform:translateX(-50%)' : 'left:' + num(d0.logoX) + 'px;transform:none')) + AN(S.right, 'top:' + num(d0.iconY) + 'px') + (st.glass ? P + S.root + '{background:' + (h.bg || '#fff') + '}' : '') + '}@media (min-width:' + WM + 'px){' + pcw;
    }
    var nar = A(nav, 'min-width:0;flex:1 1 auto;overflow:hidden') + A(ul, 'flex-wrap:nowrap') + A(S.right, 'flex:none') + A(S.navA, 'font-size:clamp(11px,1vw,13px)!important;letter-spacing:0.01em') + A(S.navLi, 'margin-right:clamp(6px,0.8vw,12px)'); /* 4.5 노트북에서 아이콘 안 밀리게 */
    /* 7.0 좁은 PC: WHOLESALE 이 들어가 길어진 메뉴도 한 줄에 들어가게 — 메뉴 간격·세로선 자리·글자 아이콘(SEARCH·MY·BAG)을 촘촘하게(색·글꼴은 스타일 그대로) */
    nar += A(S.navA, 'letter-spacing:0!important') + A(S.navLi, 'margin-right:clamp(4px,0.55vw,9px)') + A(S.navLi + '.vt-add-first', 'margin-left:2px!important;padding-left:8px!important');
    if (st.icon === 'text' || st.icon === 'bracket') { nar += A(ico, 'padding:0 4px!important;font-size:10.5px!important;letter-spacing:.02em!important'); }
    var nar2 = A(S.navLi, 'margin-right:3px') + ((st.icon === 'text' || st.icon === 'bracket') ? A(ico, 'padding:0 3px!important') : ''); /* 7.0: 1024~1099 는 한 번 더 촘촘하게 */
    return s + (pc ? '@media (min-width:1024px){' + pc + '}' : '') + '@media (min-width:1024px) and (max-width:' + ((typeof WM === 'number' && WM > 1280) ? WM - 1 : 1279) + 'px){' + nar + '}@media (min-width:1024px) and (max-width:1099px){' + nar2 + '}' + (mo ? '@media (max-width:1023px){' + mo + '}' : '');
  }
  /* 머리말 스타일 31가지(4.4: 오른쪽 메뉴 몰아두기 지우고 큰 메뉴 에디토리얼 넣음): [id, 이름, 묶음, 설명, 만들기(h, d=처음 값)] — 처음 값(쇼핑몰 로고 크기·틈)에서 출발해 꾸밈만 얹음 */
  function hsGeo(h, d, o) {
    var p = h.pc, m = h.mobile, pad = num((SH.hdr || {}).pcPadB, 20);
    p.h = o.h || d.pc.h; p.logoH = Math.round(num(d.pc.logoH, 22) * (o.lk || 1)); p.navSize = o.ns || 0; p.navGap = o.ng || 0; p.iconY = o.iy != null ? o.iy : d.pc.iconY;
    if (o.center) { p.logoPos = 'center'; p.logoY = Math.max(8, Math.round((p.h - 48 - pad - p.logoH) / 2)); }
    else if (o.row) { p.logoPos = 'left'; p.logoX = 0; p.logoY = 0; p.iconY = 0; }
    else { p.logoPos = d.pc.logoPos; p.logoX = d.pc.logoX; p.logoY = o.ly != null ? o.ly : (p.h === d.pc.h && p.logoH === d.pc.logoH ? d.pc.logoY : Math.max(8, Math.round((p.h - 48 - pad - p.logoH) / 2))); }
    m.h = o.mh || d.mobile.h; m.logoH = Math.round(num(d.mobile.logoH, 16) * (o.mlk || 1)); m.logoPos = o.mc ? 'center' : d.mobile.logoPos; m.logoX = d.mobile.logoX; m.iconY = 0;
    if (o.center) { m.logoPos = 'center'; m.logoH = Math.min(m.logoH, num(d.mobile.logoH, 16)); } /* 4.4 가운데 로고 스타일은 휴대폰도 가운데 */
  }
  var TICK = function () { return 'NEW ARRIVALS EVERY WEEK      UP TO 90% SALE      ' + SH.EN + ' — 매주 새로 들어오는 수입 구제'; };
  var HSTYLES = [
    /* 미니멀 */
    ['m1', '올 화이트 미니멀', '미니멀', '흰 바탕·대문자·넓은 자간, 아이콘을 SEARCH·BAG(0) 글자로', function (h, d) { hsGeo(h, d, { row: 1, h: 84, ns: 13 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Inter', fw: 500, up: true, ls: 0.14, chip: 'plain', icon: 'text', layout: 'row' }; }],
    ['m2', '오프화이트 크림', '미니멀', '크림 바탕 + 가는 세리프, 칩은 선만', function (h, d) { hsGeo(h, d, {}); h.bg = '#f5f0e6'; h.st = { fg: '#2a2420', font: 'Cormorant Garamond', fw: 700, ls: 0.04, chip: 'line' }; }],
    ['m3', '한 줄 미니', '미니멀', '로고 왼쪽 · 분류 가운데 · 아이콘 오른쪽 한 줄', function (h, d) { hsGeo(h, d, { row: 1, h: 72, ns: 14, mh: 46, mlk: 0.88 }); h.bg = '#ffffff'; h.st = { fg: '#000000', chip: 'plain', layout: 'row' }; }],
    ['m4', '가운데 로고 클래식', '미니멀', '로고 가운데 위, 분류 가운데 아래 두 줄', function (h, d) { hsGeo(h, d, { center: 1, h: 156, lk: 1.3 }); h.bg = '#ffffff'; h.st = { fg: '#111111', chip: 'plain', layout: 'center', lineB: { w: 1, c: '#e6e6e6' } }; }],
    ['m5', '머리카락 선', '미니멀', '위아래 아주 가는 선, 대문자', function (h, d) { hsGeo(h, d, { row: 1, h: 76, ns: 13 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Inter', fw: 400, up: true, ls: 0.1, chip: 'plain', icon: 'text', layout: 'row', lineT: { w: 0.5, c: '#111111', off: 6 }, lineB: { w: 0.5, c: '#111111', off: 6 } }; }],
    /* 모노·타자기 */
    ['t1', '모노 스페이스', '모노·타자기', '고정폭 글꼴, [ SEARCH ] [ BAG (0) ]', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 11 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Space Mono', fw: 700, up: true, ls: 0.02, chip: 'plain', icon: 'bracket', layout: 'row', wmin: 1440 }; }],
    ['t2', '터미널 블랙', '모노·타자기', '검정 바탕 + 모노 글꼴 + 호박색 선', function (h, d) { hsGeo(h, d, { row: 1, h: 72, ns: 12 }); h.bg = '#0d0d0d'; h.st = { fg: '#e6e6e6', font: 'IBM Plex Mono', fw: 500, up: true, ls: 0.04, chip: 'plain', icon: 'bracket', layout: 'row', dark: true, lineB: { w: 1, c: '#ffb000' }, wmin: 1440 }; }],
    ['t3', '영수증 감성', '모노·타자기', '타자기 글꼴 + 위아래 점선', function (h, d) { hsGeo(h, d, { row: 1, h: 88, ns: 12 }); h.bg = '#ffffff'; h.st = { fg: '#222222', font: 'Courier Prime', fw: 700, up: true, ls: 0.04, chip: 'plain', icon: 'text', layout: 'row', lineT: { w: 2, s: 'dashed', c: '#222222', off: 6 }, lineB: { w: 2, s: 'dashed', c: '#222222', off: 6 }, wmin: 1440 }; }],
    /* 구성 */
    ['c1', '스플릿 바', '구성', '분류 사이 세로선 + 위아래 선', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 12, ng: 1 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Inter', fw: 600, up: true, ls: 0.06, chip: 'plain', layout: 'row', div: 'bar', lineB: { w: 1, c: '#111111' }, lineT: { w: 1, c: '#111111' }, wmin: 1440 }; }],
    ['c2', '그리드 박스', '구성', '분류마다 네모 칸', function (h, d) { hsGeo(h, d, { row: 1, h: 88, ns: 12, ng: 1 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Inter', fw: 500, up: true, ls: 0.06, chip: 'plain', layout: 'row', div: 'box', lineB: { w: 1, c: '#111111' }, wmin: 1440 }; }],
    ['c3', '왼쪽 에디토리얼', '구성', '큰 로고 왼쪽 위, 세리프 분류 왼쪽 정렬', function (h, d) { hsGeo(h, d, { h: 150, lk: 1.4 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Playfair Display', fw: 700, chip: 'plain', lineB: { w: 1, c: '#111111' } }; }],
    ['e1', '큰 메뉴 에디토리얼', '구성', '작은 로고 위 · 아주 큰 굵은 메뉴 줄 · 아래 작은 분류 줄 (휴대폰은 로고 줄 + 굵은 메뉴 줄 옆으로 넘기기)', function (h, d) { hsGeo(h, d, { h: 196, lk: 0.8, ly: 26, mh: 96 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Noto Sans KR', fw: 600, chip: 'plain', layout: 'ed', wmin: 1280 }; }],
    /* 큰 로고 */
    ['b1', '빅 워드마크', '큰 로고', '아주 큰 로고 가운데, 내리면 작은 머리말', function (h, d) { hsGeo(h, d, { center: 1, h: 210, lk: 2.8, ns: 13, mh: 60, mlk: 1.3 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Inter', fw: 600, up: true, ls: 0.12, chip: 'plain', layout: 'center' }; }],
    ['b2', '로고 박스', '큰 로고', '검정 네모 안에 흰 로고', function (h, d) { hsGeo(h, d, { row: 1, h: 84, ns: 14 }); h.bg = '#ffffff'; h.st = { fg: '#111111', chip: 'plain', layout: 'row', logoBox: '#111111', logoBoxInv: true }; }],
    ['b3', '신문 헤드라인', '큰 로고', '굵은 두 줄 선 + 위 작은 발행 줄', function (h, d) { hsGeo(h, d, { center: 1, h: 170, lk: 2, mh: 56 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Old Standard TT', fw: 700, up: true, ls: 0.08, chip: 'plain', layout: 'center', lineB: { w: 4, s: 'double', c: '#111111' }, bar: { text: 'WEEKLY VINTAGE EDITION      ' + SH.EN + '      매주 새로 들어오는 수입 구제', mtext: 'WEEKLY VINTAGE EDITION', h: 28, mh: 22, bg: '#ffffff', fg: '#111111', font: 'Old Standard TT', fw: 700, up: true, ls: 0.12 } }; }],
    ['b4', '매거진 표지', '큰 로고', '큰 로고 + 기울인 세리프 분류', function (h, d) { hsGeo(h, d, { center: 1, h: 190, lk: 2.4, ns: 16, mh: 58, mlk: 1.2 }); h.bg = '#ffffff'; h.st = { fg: '#111111', font: 'Playfair Display', fw: 400, it: true, chip: 'plain', layout: 'center' }; }],
    /* 레이어·질감 */
    ['l1', '유리 플로팅 바', '레이어·질감', '둥근 반투명 막대가 사진 위에 떠 있음', function (h, d) { hsGeo(h, d, { row: 1, h: 84, ns: 14 }); h.bg = '#ffffff'; h.overlay = true; h.overlayLight = false; h.st = { fg: '#111111', chip: 'plain', layout: 'row', glass: true }; }],
    ['l2', '투명 → 내리면 흰색', '레이어·질감', '메인 사진 위 투명·흰 글씨, 내리면 흰 머리말', function (h, d) { hsGeo(h, d, { row: 1, h: 84, ns: 14 }); h.bg = '#ffffff'; h.overlay = true; h.overlayLight = true; h.st = { chip: 'plain', layout: 'row' }; }],
    ['l3', '흑백 반전 투명', '레이어·질감', '사진 위에서 글씨가 사진 색의 반대로 보임', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 14 }); h.bg = '#ffffff'; h.overlay = true; h.overlayLight = true; h.st = { chip: 'plain', layout: 'row', blend: true }; }],
    ['l4', '블랙 라인 두 줄', '레이어·질감', '위 검정 얇은 줄 + 아래 흰 로고 줄', function (h, d) { hsGeo(h, d, {}); h.bg = '#ffffff'; h.st = { fg: '#111111', chip: 'keep', bar: { text: SH.EN + '      NEW ARRIVALS EVERY WEEK', mtext: SH.EN, h: 34, mh: 26, bg: '#111111', fg: '#ffffff', font: 'Inter', fw: 600, up: true, ls: 0.2 } }; }],
    ['l5', '다크 프리미엄', '레이어·질감', '먹색 바탕 + 금색 선·세리프', function (h, d) { hsGeo(h, d, { center: 1, h: 150, lk: 1.4 }); h.bg = '#1b1a18'; h.st = { fg: '#e9e2d0', font: 'Cormorant Garamond', fw: 700, up: true, ls: 0.12, chip: 'line', layout: 'center', dark: true, lineB: { w: 1, c: '#c8a96a' } }; }],
    /* 정보 띠 */
    ['i1', '티커 정보 줄', '정보 띠', '위 검정 줄에 소식이 흐름(PC만, 휴대폰은 멈춤)', function (h, d) { hsGeo(h, d, {}); h.bg = '#ffffff'; h.st = { chip: 'keep', bar: { text: TICK(), mtext: 'NEW ARRIVALS EVERY WEEK', move: true, h: 32, mh: 26, bg: '#111111', fg: '#ffffff', font: 'Inter', fw: 600, up: true, ls: 0.14, sec: 40 } }; }],
    ['i2', '드롭 알림', '정보 띠', '위 노란 줄 NEW DROP EVERY WEEK', function (h, d) { hsGeo(h, d, {}); h.bg = '#ffffff'; h.st = { chip: 'keep', bar: { text: 'NEW DROP EVERY WEEK      매주 새 상품 입고', mtext: 'NEW DROP EVERY WEEK', h: 34, mh: 26, bg: '#f2c230', fg: '#111111', font: 'Anton', fw: 400, up: true, ls: 0.1 } }; }],
    ['i3', '띠 배너 + 클래식', '정보 띠', '위 연한 띠 + 가운데 로고', function (h, d) { hsGeo(h, d, { center: 1, h: 140, lk: 1.2 }); h.bg = '#ffffff'; h.st = { fg: '#111111', chip: 'plain', layout: 'center', bar: { text: '매주 새로 들어오는 수입 구제 · 최대 90% 할인', mtext: '매주 새 상품 · 최대 90% 할인', h: 40, mh: 28, bg: '#efe9df', fg: '#333333', font: 'Noto Sans KR', fw: 500, ls: 0 } }; }],
    ['i4', '세일 강조', '정보 띠', '위 빨간 줄 UP TO 90% SALE + 세일 칩 그대로', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 14 }); h.bg = '#ffffff'; h.st = { fg: '#111111', chip: 'keep', layout: 'row', wmin: 1440, bar: { text: 'UP TO 90% SALE', h: 34, mh: 26, bg: '#e0201b', fg: '#ffffff', font: 'Anton', fw: 400, up: true, ls: 0.14 } }; }],
    /* 빈티지·스트리트 */
    ['v1', '크라프트 종이', '빈티지·스트리트', '갈색 종이 바탕 + 세리프', function (h, d) { hsGeo(h, d, {}); h.bg = '#c9a46b'; h.st = { fg: '#2b1d10', font: 'Fraunces', fw: 700, chip: 'line', lineB: { w: 1, c: '#2b1d10' } }; }],
    ['v2', '데님 라벨', '빈티지·스트리트', '남색 바탕 + 금색 점선 바느질', function (h, d) { hsGeo(h, d, { row: 1, h: 86, ns: 13 }); h.bg = '#1f2c4a'; h.st = { fg: '#efe7d6', font: 'Fraunces', fw: 700, it: true, chip: 'line', layout: 'row', dark: true, lineT: { w: 2, s: 'dashed', c: '#d4a23a', off: 6 }, lineB: { w: 2, s: 'dashed', c: '#d4a23a', off: 6 }, wmin: 1440 }; }],
    ['v3', '가격표 태그 로고', '빈티지·스트리트', '로고가 기울어진 갈색 가격표 안에', function (h, d) { hsGeo(h, d, { row: 1, h: 88, ns: 12 }); h.bg = '#ffffff'; h.st = { fg: '#2b1d10', font: 'Courier Prime', fw: 700, up: true, ls: 0.04, chip: 'plain', icon: 'text', layout: 'row', logoBox: '#c9a46b', logoTilt: -4, wmin: 1440 }; }],
    ['v4', '스트리트 굵은 대문자', '빈티지·스트리트', '검정 바탕 + 굵은 좁은 대문자 + 노란 줄', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 15 }); h.bg = '#111111'; h.st = { fg: '#ffffff', font: 'Anton', fw: 400, up: true, ls: 0.04, chip: 'plain', layout: 'row', dark: true, bar: { text: 'NEW ARRIVALS EVERY WEEK      UP TO 90% SALE', mtext: 'NEW ARRIVALS EVERY WEEK', h: 30, mh: 24, bg: '#f2c230', fg: '#111111', font: 'Anton', fw: 400, up: true, ls: 0.1 }, wmin: 1440 }; }],
    ['v5', '크림 + 버건디', '빈티지·스트리트', '크림 바탕 + 버건디 글씨·굵은 선', function (h, d) { hsGeo(h, d, {}); h.bg = '#f3ece0'; h.st = { fg: '#7a1f2b', font: 'DM Serif Display', fw: 400, chip: 'line', lineB: { w: 3, c: '#7a1f2b' } }; }],
    ['v6', '흰 + 코발트', '빈티지·스트리트', '흰 바탕 + 코발트 파랑 글씨·선', function (h, d) { hsGeo(h, d, { row: 1, h: 80, ns: 13 }); h.bg = '#ffffff'; h.st = { fg: '#1f47b8', font: 'Inter', fw: 700, up: true, ls: 0.08, chip: 'line', layout: 'row', lineB: { w: 3, c: '#1f47b8' } }; }]
  ];
  /* 메인 추천 시안과 짝 */
  var SIG_HDR = { sigA: 'v3', sigB: 'v4', sigC: 'v2' };
  function hstMake(id) {
    var d = VTH.hdrDefaults(), sp = HSTYLES.filter(function (x) { return x[0] === id; })[0]; if (!sp) { return null; }
    var h = clone(d); h.overlay = false; h.overlayLight = true; h.fixed = true; sp[4](h, d); h.st.id = id; return h;
  }
  VTH.hstyles = HSTYLES; VTH.hstMake = hstMake;
  VTH.hdrDefaults = function () {
    var H = SH.hdr || {};
    return clone(H.def || { v: 1, bg: '#ffffff', fixed: true, overlay: false, overlayLight: true,
      pc: { h: 128, logoH: 22, logoPos: 'left', logoX: 0, logoY: 30, navSize: 0, navGap: 0, iconY: 0 },
      mobile: { h: 52, logoH: 16, logoPos: 'left', logoX: 14, iconY: 0 } });
  };
  VTH.hdrCss = function (h) {
    var H = SH.hdr; if (!H || !H.sel || !h) { return ''; }
    var S = H.sel, P = 'html body ', ns = H.scrolled ? ':not(.' + H.scrolled + ')' : '', m = h.mobile || {}, p = h.pc || {}, s = '';
    var bar0 = h.st && h.st.bar && h.st.bar.text ? h.st.bar : null, bP = bar0 ? num(bar0.h, 32) : 0, bM = bar0 ? num(bar0.mh, 0) : 0; /* 2.8 위 정보 띠 높이 */
    var G = H.gap || {}, mT = num(m.h, 52) + num(G.mobile) + bM, pT = num(p.h, 128) + num(G.pc) + bP; /* 윗여백 = 머리말 높이 + 틈 (+ 띠) */
    var LB = H.logoBox || {}, lw = function (dv, hh) { var b = LB[dv]; return b && num(b[1]) ? Math.round(hh * num(b[0]) / num(b[1])) + 'px' : 'auto'; }; /* 로고 칸이 정해진 곳은 칸 비율대로 폭 */
    var R = function (sel, body) { return sel ? P + sel + '{' + body + '}' : ''; };
    var RN = function (sub, body) { return sub ? P + S.root + ns + ' ' + sub + '{' + body + '}' : ''; };
    /* 공통 */
    s += ':root{--header-height:' + mT + 'px}';
    s += R(S.wrap, 'padding-top:' + mT + 'px');
    s += R(S.root, 'background:' + (h.bg || '#ffffff') + (h.fixed === false ? ';position:absolute' : ''));
    /* 휴대폰 */
    s += '@media (max-width:1023px){';
    s += R(S.inner, 'height:' + num(m.h, 52) + 'px;padding-top:0;padding-bottom:0');
    s += R(S.logoImg, 'height:' + num(m.logoH, 16) + 'px;width:' + lw('mobile', num(m.logoH, 16)));
    if (m.logoPos === 'center') { s += R(S.inner, 'position:relative') + R(S.logo, 'position:absolute;left:50%;margin:0;transform:translateX(-50%)') + R(S.right, 'margin-left:auto'); }
    else { s += R(S.logo, 'margin-left:' + num(m.logoX, 14) + 'px'); }
    s += R(S.right, 'position:relative;top:' + num(m.iconY) + 'px');
    /* 4.4 휴대폰 가운데 로고: 햄버거(메뉴)를 왼쪽으로 빼서 로고와 아이콘이 안 겹침 */
    if (m.logoPos === 'center') { var icoM = S.icoMenu || ((S.ico || '.vt-ico') + '--menu'); s += R(S.root + ' ' + S.inner, 'position:relative') + R(S.root + ' ' + S.right, 'position:static!important;margin-left:auto;transform:none;margin-top:' + num(m.iconY) + 'px') + R(S.root + ' ' + S.right + ' ' + icoM, 'position:absolute!important;left:6px!important;right:auto!important;top:50%;margin-top:-16px') + R(S.logoImg, 'max-width:calc(100vw - 250px)'); }
    if (bM) { s += R(S.root, 'padding-top:' + bM + 'px'); }
    s += '}';
    /* PC */
    s += '@media (min-width:1024px){';
    s += ':root{--header-height:' + pT + 'px}';
    s += R(S.wrap, 'padding-top:' + pT + 'px');
    s += RN(S.inner, 'height:' + num(p.h, 128) + 'px;padding-top:0;padding-bottom:' + num(H.pcPadB, 20) + 'px;align-items:flex-end');
    s += R(S.logoImg, 'height:' + num(p.logoH, 22) + 'px;width:' + lw('pc', num(p.logoH, 22)));
    s += RN(S.logo, 'top:' + num(p.logoY, 30) + 'px;' + (p.logoPos === 'center' ? 'left:50%;transform:translateX(-50%)' : 'left:' + num(p.logoX) + 'px;transform:none'));
    if (num(p.navSize) > 0) { s += R(S.root + ' ' + S.navA, 'font-size:' + num(p.navSize) + 'px'); } /* 7.0: 머리말 이름을 앞에 붙여 About·Community·WHOLESALE(디자인 li.vt-add 크기 규칙)에도 같은 크기 */
    if (num(p.navGap) > 0) { s += R(S.navLi, 'margin-right:' + num(p.navGap) + 'px'); }
    s += RN(S.right, 'align-self:flex-end;margin-top:0;position:relative;top:' + num(p.iconY) + 'px');
    if (bP) { s += P + S.root + ns + '{padding-top:' + bP + 'px}'; }
    s += '}';
    /* 7.0 분류 글자 크기·간격을 고른 경우: 폭마다 메뉴가 한 줄에 들어가는 만큼까지만(빈티지톡 디자인 "키울 때 좁은 폭 넘침 점검"). 11/23 손님 화면에서 잰 디자인 글씨·간격·남는 자리로 정한 한도 —
       [시작 폭, 끝 폭, 글씨 한도(px), 간격 한도(px)]. 고른 값이 한도보다 작으면 고른 값 그대로. 메뉴 칸 수가 크게 바뀌면 다시 재야 함(ego\hdr24-20261112\navsz.mjs) */
    var NS = num(p.navSize), NG = num(p.navGap);
    if (NS > 0 || NG > 0) { [[1024, 1099, 12.3, 6], [1100, 1199, 13.6, 6], [1200, 1279, 15.4, 7], [1280, 1439, 16.8, 7], [1440, 1599, 18.4, 13], [1600, 1799, 20, 18], [1800, 0, 23.1, 18]].forEach(function (b) { s += '@media (min-width:' + b[0] + 'px)' + (b[1] ? ' and (max-width:' + b[1] + 'px)' : '') + '{' + (NS > 0 ? R(S.root + ' ' + S.navA, 'font-size:' + Math.max(11, Math.min(NS, b[2])) + 'px') : '') + (NG > 0 ? R(S.navLi, 'margin-right:' + Math.min(NG, b[3]) + 'px') : '') + '}'; }); }
    /* 사진 위에 겹치기(메인에만): 메인은 윗여백 0·메인 높이에서 머리말을 안 뺌, 내리면 원래 머리말 */
    if (h.overlay) {
      var M = 'html body:has(#vth) ';
      s += ':root:has(#vth){--header-height:0px}';
      s += M + S.wrap + '{padding-top:0}';
      s += M + S.root + ns + '{background:transparent;box-shadow:none}';
      if (h.overlayLight !== false) {
        if (S.navA) { s += M + S.root + ns + ' ' + S.navA + '{color:#ffffff}'; if (!(h.st && h.st.blend) && /\bli a$/.test(S.navA)) { s += M + S.root + ns + ' ' + S.navA.replace(/\bli a$/, 'li.vt-hdws a') + '{color:' + wsColor('#222222') + '}'; } } /* 7.0: 사진 위 WHOLESALE 은 밝은 주황 */
        if (S.logoImg) { s += M + S.root + ns + ' ' + S.logoImg + '{fill:#ffffff}'; }
        if (S.ico) { s += M + S.root + ns + ' ' + S.ico + '{filter:invert(1)}'; }
      }
    }
    if (h.st) { s += hdrStyleCss(h, H, S, ns, bP, bM); }
    return s;
  };
  VTH.hdrFile = function (h) {
    return VTH.hdrFonts(h).map(function (u) { return '<link rel="stylesheet" href="' + esc(u) + '" data-vthhf="1">\n'; }).join('') + '<style id="vth-hdr-css">' + VTH.hdrCss(h) + '</style>\n' +
      '<script type="application/json" id="vth-hdr-cfg">' + JSON.stringify(h).replace(/</g, '\\u003c') + '</' + 'script>\n';
  };

  /* ---------- 움직이는 띠 (여러 개, 11/09) ----------
   * mode: zone(사진을 줄이고 띠 칸 차지) / over(사진 위 띠) / rain(비 내리듯) / float(여기저기 깜빡)
   */
  var BAND_DEF = { on: true, text: 'SALE  SALE  SALE  SALE', mode: 'over', pos: 'bottom', zone: 10, y: 50, rotate: 0, area: 'all', count: 10,
    font: 'Libre Caslon Text', size: 120, fitZone: true, weight: 400, italic: false, ls: -40, color: '#ffffff', bg: '', stroke: 0, upper: 'none',
    speed: 20, dir: 'left', clipT: 0, clipB: 0, opacity: 100, gapEm: 0.6 };
  function bandOf(o) { var b = clone(BAND_DEF); for (var k in o) { if (o.hasOwnProperty(k)) { b[k] = o[k]; } } b.id = newId(); return b; }
  VTH.band = bandOf;
  function prand(i, k) { var x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); }
  function zoneSum(c, side) { var t = 0; (c.bands || []).forEach(function (b) { if (b.on !== false && b.mode === 'zone' && b.pos === side) { t += num(b.zone, 10); } }); return t; }
  function zpad(c, H, k) {
    var fr = c.frame || {}, side = { t: 'top', r: 'right', b: 'bottom', l: 'left' }[k], z = zoneSum(c, side), px = num(fr[k]);
    if (!z) { return px + 'px'; }
    return (k === 't' || k === 'b') ? 'calc(' + px + 'px + ' + H + ' * ' + (z / 100) + ')' : 'calc(' + px + 'px + ' + z + '%)';
  }
  function bandVert(b) { return (b.mode === 'zone' || b.mode === 'over') && (b.pos === 'left' || b.pos === 'right'); }
  function bandCss(b, c, H, acc) {
    var id = '#vth .vth-bd' + b.id, s = '', fr = c.frame || {}, z = num(b.zone, 10), vert = bandVert(b), size = fsz(b.size, c.base);
    var stroke = num(b.stroke);
    var txt = 'font-family:' + ff(b.font) + ';font-weight:' + (b.weight || 400) + ';font-style:' + (b.italic ? 'italic' : 'normal') + ';letter-spacing:' + (num(b.ls) / 1000) + 'em;color:' + (stroke ? 'transparent' : (b.color || '#fff')) +
      ';text-transform:' + (b.upper || 'none') + ';line-height:1;' + (stroke ? '-webkit-text-stroke:' + stroke + 'px ' + (b.color || '#fff') + ';' : '');
    s += id + '{opacity:' + (num(b.opacity, 100) / 100) + ';' + (b.bg ? 'background:' + b.bg + ';' : '') + (vert ? 'writing-mode:vertical-rl;' : '') + '}';
    var rot = num(b.rotate);
    if (b.mode === 'zone') {
      if (!vert) {
        var off = 'calc(' + num(b.pos === 'top' ? fr.t : fr.b) + 'px + ' + H + ' * ' + (acc[b.pos] / 100) + ')';
        s += id + '{left:' + num(fr.l) + 'px;right:' + num(fr.r) + 'px;' + (b.pos === 'top' ? 'top' : 'bottom') + ':' + off + ';height:calc(' + H + ' * ' + (z / 100) + ');display:flex;align-items:center}';
        if (b.fitZone !== false) { size = 'calc(' + H + ' * ' + (z / 100 * 0.78).toFixed(4) + ')'; }
      } else {
        s += id + '{top:calc(' + num(fr.t) + 'px + ' + H + ' * ' + (zoneSum(c, 'top') / 100) + ');bottom:calc(' + num(fr.b) + 'px + ' + H + ' * ' + (zoneSum(c, 'bottom') / 100) + ');' +
          b.pos + ':calc(' + num(b.pos === 'left' ? fr.l : fr.r) + 'px + ' + acc[b.pos] + '%);width:' + z + '%;display:flex;justify-content:center' + (rot ? ';transform:rotate(' + rot + 'deg)' : '') + '}';
        if (b.fitZone !== false) { size = (z * 0.78).toFixed(2) + 'vw'; }
      }
      acc[b.pos] += z;
    } else if (b.mode === 'over') {
      if (vert) { s += id + '{top:-10%;bottom:-10%;' + b.pos + ':' + num(b.y, 3) + '%;display:flex;justify-content:center' + (rot ? ';transform:rotate(' + rot + 'deg)' : '') + '}'; }
      else {
        var yy = b.pos === 'top' ? 'top:0' : b.pos === 'bottom' ? 'bottom:0' : 'top:' + (b.pos === 'middle' ? 50 : num(b.y, 50)) + '%';
        var mid = b.pos !== 'top' && b.pos !== 'bottom';
        var tf = (mid ? 'translateY(-50%) ' : '') + (rot ? 'rotate(' + rot + 'deg)' : '');
        s += id + '{' + yy + ';left:-25%;right:-25%;display:flex;align-items:center;padding:.12em 0' + (tf.trim() ? ';transform:' + tf.trim() : '') + '}';
      }
    } else {
      s += id + '{inset:0}';
      var n = Math.max(1, Math.min(40, num(b.count, 10))), sp = num(b.speed, 20);
      if (b.mode === 'rain') { s += id + ' .vth-r{writing-mode:vertical-rl;animation:vthRain 5s linear infinite' + (b.dir === 'up' ? ' reverse' : '') + '}'; }
      else { s += id + ' .vth-r{opacity:0;animation:vthFl 5s ease-in-out infinite}'; }
      for (var i = 0; i < n; i++) {
        var r1 = prand(i, 1), r2 = prand(i, 2), r3 = prand(i, 3), r4 = prand(i, 4);
        if (b.mode === 'rain') {
          s += id + ' .vth-r' + i + '{left:' + (i / n * 100 + r1 * (70 / n)).toFixed(1) + '%;font-size:' + fsz(num(b.size) * (0.55 + r2 * 0.9), c.base) + ';opacity:' + (0.35 + r3 * 0.65).toFixed(2) +
            ';animation-duration:' + (sp * (0.6 + r4 * 0.8) / 4).toFixed(1) + 's;animation-delay:-' + (r1 * sp / 2).toFixed(1) + 's}';
        } else {
          s += id + ' .vth-r' + i + '{left:' + (5 + r1 * 78).toFixed(1) + '%;top:' + (6 + r2 * 78).toFixed(1) + '%;transform:rotate(' + Math.round((r3 - 0.5) * 2 * rot) + 'deg);font-size:' + fsz(num(b.size) * (0.6 + r4 * 0.8), c.base) +
            ';animation-duration:' + (sp / 4).toFixed(1) + 's;animation-delay:' + (i * sp / 4 / n).toFixed(2) + 's}';
        }
      }
    }
    var clip = (num(b.clipT) || num(b.clipB)) && !vert ? 'clip-path:inset(' + num(b.clipT) + '% -5% ' + num(b.clipB) + '% -5%);' : '';
    s += id + ' span{' + txt + 'font-size:' + size + ';padding-' + (vert ? 'bottom' : 'right') + ':' + num(b.gapEm, 0.6) + 'em;' + clip + '}';
    if (b.mode === 'zone' || b.mode === 'over') {
      var rev = vert ? b.dir === 'down' : b.dir === 'right';
      s += id + ' .vth-bt{animation:' + (vert ? 'vthMqV' : 'vthMq') + ' ' + num(b.speed, 20) + 's linear infinite' + (rev ? ' reverse' : '') + '}';
    }
    return s;
  }
  function bandHtml(b) {
    var cls = 'vth-bd vth-bd' + b.id + ' vth-bm-' + b.mode, t = esc(b.text).replace(/ {2}/g, ' &nbsp;'), h = '', i, da = ' data-bid="' + b.id + '"';
    if (b.mode === 'rain' || b.mode === 'float') {
      var n = Math.max(1, Math.min(40, num(b.count, 10)));
      for (i = 0; i < n; i++) { h += '<span class="vth-r vth-r' + i + '">' + t + '</span>'; }
      return '<div class="' + cls + '"' + da + ' aria-hidden="true">' + h + '</div>';
    }
    var one = '<span>' + t + '</span>', run = '';
    for (i = 0; i < 8; i++) { run += one; }
    return '<div class="' + cls + '"' + da + ' aria-hidden="true"><div class="vth-bt">' + run + run + '</div></div>';
  }
  function bandsIn(c, where) {
    var split = (c.split || {}).mode !== 'full';
    return (c.bands || []).filter(function (b) {
      if (b.on === false) { return false; }
      var inMain = split && b.area === 'main' && b.mode !== 'zone';
      return where === 'main' ? inMain : !inMain;
    }).map(bandHtml).join('');
  }

  /* 6.3 휴대폰 아래 칸 자동 배치(읽기 좋게): 나눔을 휴대폰에서 위아래로 쌓을 때 아래 칸 글씨를 차례로 놓고(겹침·잘림 없음),
     글씨는 본문 14px·제목 20px 이상, 버튼은 누르기 좋은 높이(44px), 칸 높이는 글씨에 맞게 늘어남. split.flow(새로 고를 때 켜짐, 예전 저장값은 그대로) */
  function flowOn(c) { var sp = (c && c.split) || {}; return !!c && c.device === 'mobile' && sp.mode !== 'full' && !!sp.stack && !!sp.flow; }
  function flowSize(b) { var s = num(b.size, 16); if (b.type === 'buttons') { return Math.min(18, Math.max(15, s)); } if (/^h[1-3]$/.test(b.tag)) { return Math.min(52, Math.max(20, s)); } return Math.min(20, Math.max(14, s)); }
  /* 글 칸이 큰 칸일 때(휴대폰 4:6·3:7·2:8) 제목은 칸 폭에 맞게 키움(짧은 한 줄 제목이 큰 칸에서 작게 보이지 않게). 키우기만 하고 줄이지 않음, 52px 까지 */
  function flowFit(b) {
    var s0 = flowSize(b); if (b.type === 'buttons' || !/^h[1-3]$/.test(b.tag)) { return s0; }
    var up = b.upper === 'uppercase', ls = Math.max(0, num(b.ls)) / 1000, mx = 0;
    String(b.html || '').split(/<br\s*\/?>|<\/p>|<\/div>/i).forEach(function (ln) {
      var t = ln.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&[a-z#0-9]+;/gi, 'x').trim(), u = 0, i, ch;
      for (i = 0; i < t.length; i++) { ch = t.charAt(i); u += (ch.charCodeAt(0) > 0x2E7F ? 1 : ch === ' ' ? 0.3 : (up || /[A-Z0-9%&@#]/.test(ch)) ? 0.72 : 0.54) + ls; }
      if (u > mx) { mx = u; }
    });
    if (!mx) { return s0; }
    return Math.max(s0, Math.min(52, Math.floor(318 / mx)));
  }
  function flowCss(c, H) {
    var sp = c.split, r = Math.max(20, Math.min(85, num(sp.ratio, 80))), below = sp.fit === 'below';
    /* 글 칸에 글이 하나도 없으면(사진만 있는 칸) 맞출 글 높이가 없으니 예전처럼 화면 높이의 그 비율로 */
    var txt = (c.blocks || []).some(function (b) { return b.area === 'side'; });
    /* ph: 사진 칸이 작은 비율에서 사진 칸 높이 — 사진이 사진으로 보이게 100px 이상(11/18 사장님: 사진 칸 두껍게). 비율이 클수록 조금 더 두껍게 */
    var small = !below && txt && r < 50, ph = r <= 20 ? 'max(100px,26vw)' : r <= 30 ? 'max(120px,31vw)' : 'max(140px,36vw)';
    /* 6.4 휴대폰 나눔도 첫 화면을 화면 끝까지(전에는 사진 칸 = 화면의 그 비율, 글 칸 = 글 높이라 둘을 더한 높이가 화면보다 낮았음):
       첫 화면 전체 = 화면 높이(min-height), 글 칸은 글 높이 그대로, 남는 높이는 사진 칸이 가져감. In = 흐르는 띠·테두리·칸 사이를 뺀 안쪽 높이 */
    var zs = zoneSum(c, 'top') + zoneSum(c, 'bottom'), fr0 = c.frame || {}, fp = num(fr0.t) + num(fr0.b) + num(sp.gap);
    var In = '(' + H + ' * ' + (Math.round((100 - zs) * 100) / 10000) + ' - ' + fp + 'px)';
    var cap = r <= 20 ? 0.44 : r <= 30 ? 0.46 : 0.48; /* 사진 칸이 작은 비율(글 칸이 위): 사진 칸은 안쪽 높이의 44~48% 까지만 — 글 칸이 늘 더 크고(큰 칸 위), 사진 칸의 1.3배를 넘지 않음 */
    var fk = small || below ? 1 : Math.max(0.6, Math.min(1, num(sp.flowK, 1))); /* 글 칸 줄임 몫(정리가 정함) */
    var fz = function (b, sz) { return fk >= 1 ? sz : Math.max(b.type === 'buttons' || !/^h[1-3]$/.test(b.tag) ? 14 : 18, Math.round(sz * fk)); };
    var pt = small ? 30 : txt ? Math.max(12, Math.round((20 + Math.round(Math.max(0, 80 - r) / 30 * 14)) * fk)) : 20; /* 글 칸 위아래 여백: 사진 칸 비율이 작을수록 조금 넉넉히(8:2 20px ~ 5:5 34px) */
    var fab = !small && !below && txt && !zoneSum(c, 'bottom') && (c.height || {}).mode === 'screen'; /* 글 칸이 화면 맨 아래: 떠 있는 단추 자리(아래 64px)를 비움 */
    var s = '#vth{height:auto!important;' + (below ? '' : (H.indexOf('svh') > -1 ? 'min-height:' + H.replace('svh', 'vh') + ';' : '') + 'min-height:' + H + ';') + '}';
    /* 글 칸(side)은 글 높이에 맞춤(위아래 여백만 — 빈 칸 없음).
       사진 칸이 절반 이상(8:2~5:5): 사진 칸 = 화면 높이의 그 비율, 글 칸은 그 아래 글 높이만큼.
       사진 칸이 절반보다 작음(4:6·3:7·2:8): 큰 칸(글 칸)이 위(split.reverse → column-reverse). 사진 칸 = ph(100px 이상),
       글 칸 = 글 높이만큼이되 사진 칸의 1.3배보다는 크게(글이 한 줄뿐이어도 큰 칸이 위 — 모자라는 만큼은 위아래 여백) */
    if (small) { s += '#vth .vth-main{flex:1000 0 0%!important;height:auto!important;min-height:' + ph + ';max-height:max(' + ph + ',calc(' + In + ' * ' + cap + '))}';
    } else if (!below && txt) { s += '#vth .vth-main{flex:1 0 0%!important;height:auto!important;min-height:calc(' + In + ' * 0.5)}'; /* 사진 칸 = 화면 높이 − 글 칸, 안쪽 높이의 절반 아래로는 안 내려감(큰 칸 위). 글 칸이 절반을 넘으려 하면 정리(tidyOnce)가 글 칸 글씨·여백을 줄임(flowK) */
    } else if (!below) { s += '#vth .vth-main{flex:none!important;height:calc(' + In + ' * ' + (r / 100) + ')}'; }
    s += '#vth .vth-side{' + (small ? 'flex:1 0 auto!important;' : 'flex:none!important;') + 'height:auto!important;' + (below ? 'min-height:' + num(sp.sideH, 40) + 'svh;' : small ? 'min-height:calc(' + ph + ' * 1.3);' : txt ? '' : 'min-height:calc(' + In + ' * ' + ((100 - r) / 100) + ');') + 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:' + (small ? 14 : 12) + 'px;padding:' + pt + 'px 16px ' + (fab ? 64 : pt + 2) + 'px}';
    s += '#vth .vth-side>.vth-blk{position:relative!important;left:auto!important;top:auto!important;right:auto!important;bottom:auto!important;transform:none!important;z-index:2;max-width:100%!important;margin:0!important;clip-path:none!important;overflow-wrap:anywhere;word-break:keep-all}';
    s += '#vth .vth-side>.vth-blk ul{flex-direction:row!important;gap:6px 16px!important;justify-content:center!important;flex-wrap:wrap!important}#vth .vth-side>.vth-blk a{min-height:' + Math.max(40, Math.round(44 * fk)) + 'px;display:inline-flex!important;align-items:center;justify-content:center}';
    (c.blocks || []).forEach(function (b) {
      if (b.area !== 'side') { return; }
      var z = '#vth .vth-side>.vth-b' + b.id + '{font-size:' + (small ? flowFit(b) : fz(b, flowSize(b))) + 'px!important;' + (num(b.opacity, 100) < 85 ? 'opacity:1!important;' : '');
      if (b.fill === false) { z += 'color:' + (b.strokeColor || '#111111') + '!important;-webkit-text-stroke:0!important;'; }
      if (num(b.ls) > 200) { z += 'letter-spacing:.12em!important;'; }
      if (num(b.lh, 1.3) < 1.1) { z += 'line-height:1.15!important;'; }
      s += z + '}';
    });
    return s;
  }
  VTH.css = function (c) {
    var H = heightCss(c), sp = c.split || {}, md = c.media || {}, fr = c.frame || {}, ov = c.overlay || {};
    var stack = sp.mode !== 'full' && sp.stack;
    var dir = stack ? (sp.reverse ? 'column-reverse' : 'column') : (sp.reverse ? 'row-reverse' : 'row');
    var s = '#vth{position:relative;display:flex;flex-direction:' + dir + ';box-sizing:border-box;overflow:hidden;' + (c.bleed && sp.mode === 'full' ? 'margin:0 -4%;' : 'margin:0;') +
      (stack && sp.fit === 'below' ? '' : (H.indexOf('svh') > -1 ? 'height:' + H.replace('svh', 'vh') + ';' : '') + 'height:' + H + ';') + (sp.mode !== 'full' && num(sp.gap) ? 'gap:' + num(sp.gap) + 'px;' : '') + 'padding:' + zpad(c, H, 't') + ' ' + zpad(c, H, 'r') + ' ' + zpad(c, H, 'b') + ' ' + zpad(c, H, 'l') + ';background:' + (fr.color || '#fff') + '}';
    s += '#vth *{box-sizing:border-box}#vth .vth-area{position:relative;overflow:hidden;min-width:0;min-height:0}';
    if (c.device === 'mobile') { var hraw = H.replace(/^var\(--vthH,(.*)\)$/, '$1'); s += '#vth>.vth-hp{position:absolute;left:0;top:0;width:0;height:' + hraw + ';visibility:hidden;pointer-events:none}'; }
    if (sp.mode === 'full') { s += '#vth .vth-main{flex:1 1 auto}'; }
    else if (stack && sp.fit !== 'below') { s += '#vth .vth-main{flex:0 1 ' + num(sp.ratio, 80) + '%}#vth .vth-side{flex:1 1 auto;background:' + (sp.sideColor || '#fff') + '}'; }
    else if (stack) { s += '#vth .vth-main{flex:none;height:' + H + '}#vth .vth-side{flex:none;min-height:' + num(sp.sideH, 40) + 'svh;background:' + (sp.sideColor || '#fff') + '}'; }
    else { s += '#vth .vth-main{flex:0 1 ' + num(sp.ratio, 80) + '%}#vth .vth-side{flex:1 1 auto;background:' + (sp.sideColor || '#fff') + '}'; }
    if (flowOn(c)) { s += flowCss(c, H); }
    if (c.device === 'mobile' && c.tap) { s += '#vth .vth-blk a{min-height:40px;display:inline-flex;align-items:center;justify-content:center}'; }
    if (c.mainBg) { s += '#vth .vth-main{background:' + c.mainBg + '}'; }
    if (num(fr.radius)) { s += '#vth .vth-area{border-radius:' + num(fr.radius) + 'px}'; }
    if (sp.mode !== 'full') { s += '#vth .vth-side>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' + num(sp.sfx, 50) + '% ' + num(sp.sfy, 50) + '%;z-index:0}'; if (num(sp.sov) > 0 && sp.sideType === 'image') { s += '#vth .vth-side::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:' + ovBg(sp.sovColor || '#000000', num(sp.sov) / 100, sp.sgrad || 'none') + '}'; } }
    s += '#vth .vth-media{position:absolute;inset:0;z-index:0}#vth .vth-media img,#vth .vth-media video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:' + num(md.fx, 50) + '% ' + num(md.fy, 50) + '%;display:block;max-width:none}';
    if (md.fixed && md.type !== 'video') { s += '#vth .vth-media{clip-path:inset(0)}#vth .vth-media img{position:fixed;top:0;left:0;width:100vw;height:100vh}'; }
    if (md.fixed && md.type !== 'video') { s += '#vth .vth-media img{will-change:transform;backface-visibility:hidden}'; }
    var mo = md.motion || (md.zoom ? 'zoomLoop' : 'none');
    var MO = {
      zoomLoop: ['from{transform:scale(1)}to{transform:scale(1.08)}', '14s ease-in-out infinite alternate'],
      zoomIn1: ['from{transform:scale(1.12)}to{transform:scale(1)}', '6s cubic-bezier(.16,1,.3,1) both'],
      zoomOut1: ['from{transform:scale(1)}to{transform:scale(1.08)}', '9s ease-out both'],
      panX: ['from{transform:scale(1.1) translateX(-3%)}to{transform:scale(1.1) translateX(3%)}', '22s ease-in-out infinite alternate'],
      panY: ['from{transform:scale(1.1) translateY(-3%)}to{transform:scale(1.1) translateY(3%)}', '22s ease-in-out infinite alternate'],
      drift: ['0%,100%{transform:scale(1.05) translate(0,0)}33%{transform:scale(1.05) translate(-1%,.6%)}66%{transform:scale(1.05) translate(.8%,-.6%)}', '12s ease-in-out infinite'],
      blurIn: ['from{filter:blur(12px);transform:scale(1.04)}to{filter:none;transform:scale(1)}', '1.4s ease-out both'],
      darkIn: ['from{filter:brightness(.25)}to{filter:none}', '1.6s ease-out both']
    };
    if (MO[mo] && md.type !== 'video' && md.type !== 'slides') { s += '@keyframes vthMo{' + MO[mo][0] + '}#vth .vth-media img{animation:vthMo ' + MO[mo][1] + '}'; }
    if ((c.fx || {}).pageIn !== 'slide') { s += '@media (prefers-reduced-motion:no-preference){@keyframes vthPgIn{from{opacity:0}to{opacity:1}}:root:has(#vth)::view-transition-new(root){animation:vthPgIn .4s ease-out both}}'; }
    if (md.type === 'slides' && (md.slides || []).length > 1) {
      var n = md.slides.length, per = num(md.slideSec, 5), tot = n * per, on = (100 / n), fade = Math.min(on * 0.25, 8);
      s += '@keyframes vthSl{0%{opacity:0}' + fade.toFixed(2) + '%{opacity:1}' + on.toFixed(2) + '%{opacity:1}' + (on + fade).toFixed(2) + '%{opacity:0}100%{opacity:0}}';
      s += '#vth .vth-media img{opacity:0;animation:vthSl ' + tot + 's linear infinite}#vth .vth-media img:first-child{opacity:1}';
      for (var i = 0; i < n; i++) { s += '#vth .vth-media img:nth-child(' + (i + 1) + '){animation-delay:' + (i * per - per * 0.25) + 's}'; }
    }
    if (md.type === 'video') { s += '#vth video{opacity:0;transition:opacity .8s}#vth.vth-vplaying video{opacity:1}'; }
    if (md.type === 'anim') { s += '#vth .vth-media img.vth-anim{opacity:0;transition:opacity .6s}#vth.vth-aplaying .vth-media img.vth-anim{opacity:1}'; }
    var a = num(ov.amount) / 100;
    if (a > 0) {
      var bg = ovBg(ov.color, a, ov.grad || 'none');
      s +='#vth .vth-main::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:' + bg + '}';
    }
    s += '#vth .vth-blk{position:absolute;z-index:2;margin:0;width:max-content;word-break:keep-all}#vth .vth-blk p,#vth .vth-blk div,#vth .vth-blk ul,#vth .vth-blk ol{margin:0}#vth .vth-blk ul.vth-li,#vth .vth-blk ol{padding-left:1.2em}#vth .vth-blk a{color:inherit}';
    var fx = c.fx || {};
    if (fx.entrance && fx.entrance !== 'none') {
      var kf = fx.entrance === 'up' ? 'from{opacity:0;translate:0 30px}to{opacity:1;translate:0 0}' : fx.entrance === 'blur' ? 'from{opacity:0;filter:blur(8px)}to{opacity:1;filter:none}' : 'from{opacity:0}to{opacity:1}';
      if (fx.entrance === 'up') { kf = 'from{opacity:0;translate:0 26px}to{opacity:1;translate:0 0}'; }
      s += '@keyframes vthIn{' + kf + '}html:not(.vth-fok) #vth .vth-blk{visibility:hidden}html.vth-fok #vth .vth-blk{animation:vthIn .7s cubic-bezier(.16,1,.3,1) both}';
      (c.blocks || []).forEach(function (b, i) { s += '#vth .vth-b' + b.id + '{animation-delay:' + (i * 0.08).toFixed(2) + 's}'; });
    }
    (c.blocks || []).forEach(function (b) { s += blockCss(b, c); });
    var m = c.marquee || {};
    if (m.on) {
      var mpos = m.pos === 'top' ? 'position:absolute;top:0;left:0;right:0;' : m.pos === 'over-bottom' ? 'position:absolute;bottom:0;left:0;right:0;' : m.pos === 'over-middle' ? 'position:absolute;top:50%;left:0;right:0;transform:translateY(-50%);' : 'position:relative;';
      s += '.vth-mq{' + mpos + 'z-index:3;overflow:hidden;white-space:nowrap;pointer-events:none;background:' + (m.bg || 'transparent') + ';opacity:' + (num(m.opacity, 100) / 100) + '}';
      s += '.vth-mq-t{display:inline-flex;animation:vthMq ' + num(m.speed, 20) + 's linear infinite' + (m.dir === 'right' ? ' reverse' : '') + '}';
      s += '.vth-mq span{display:inline-block;padding-right:.6em;font-family:' + ff(m.font) + ';font-size:' + fsz(m.size, c.base) + ';font-weight:' + (m.weight || 400) + ';font-style:' + (m.italic ? 'italic' : 'normal') +
        ';letter-spacing:' + (num(m.ls) / 1000) + 'em;color:' + (m.color || '#fff') + ';line-height:1;text-transform:' + (m.upper || 'none') + ';clip-path:inset(' + num(m.clipT) + '% 0 ' + num(m.clipB) + '% 0)}';
      s += '@keyframes vthMq{from{transform:translateX(0)}to{transform:translateX(-50%)}}';
    }
    var bl = (c.bands || []).filter(function (b) { return b.on !== false; });
    if (bl.length) {
      s += '#vth .vth-bd{position:absolute;z-index:3;overflow:hidden;pointer-events:none}#vth .vth-bd span{display:inline-block;white-space:nowrap}#vth .vth-bt{display:inline-flex;white-space:nowrap;will-change:transform}' +
        '#vth .vth-r{position:absolute;top:0}@keyframes vthMq{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes vthMqV{from{transform:translateY(0)}to{transform:translateY(-50%)}}' +
        '@keyframes vthRain{from{transform:translateY(-100%)}to{transform:translateY(120vh)}}@keyframes vthFl{0%,100%{opacity:0}15%,55%{opacity:1}70%{opacity:0}}';
      var acc = { top: 0, bottom: 0, left: 0, right: 0 };
      bl.forEach(function (b) { s += bandCss(b, c, H, acc); });
    }
    s += '@media (prefers-reduced-motion:reduce){#vth *,.vth-mq *{animation:none!important}}';
    if (c.device === 'mobile') {
      /* 모바일은 움직이는 효과를 모두 끔(사장님 규칙). 깜빡이는 띠 글씨는 보이게만 */
      s += '#vth,#vth *,#vth *::before,#vth *::after{animation:none!important;transition:none!important}#vth .vth-bm-float .vth-r{opacity:1}';
    }
    /* 웹 글꼴(구글 등)을 쓰는 글씨는 글꼴이 준비될 때까지 숨겼다가 제자리에 바로 보임(휴대폰 11/11, PC 3.0 11/13 — 대체 글꼴→진짜 글꼴로 바뀌며 움직이던 것 방지, 최대 2.5초) */
    var wf = (c.blocks || []).filter(function (b) { var r = fontRow(b.font); return r && r[3]; });
    if (wf.length) { s += wf.map(function (b) { return 'html:not(.vth-fok) #vth .vth-b' + b.id; }).join(',') + '{visibility:hidden}'; }
    if ((c.bands || []).some(function (b) { var r = b.on !== false && fontRow(b.font); return r && r[3]; })) { s += 'html:not(.vth-fok) #vth .vth-bd span{visibility:hidden}'; } /* 4.9 띠 글자도 글꼴 준비 뒤에(바뀌며 밀리던 것) */
    if (c.resp) {
      /* 스킨67: 메인 첫 화면은 화면 끝까지(마일드 기본 좌우 여백 없앰) */
      s += '#contents:has(#vth){width:auto!important;max-width:none!important;margin:0!important;padding:0!important}';
      /* PC "처음 나타나기 없음"이면 vt_motion.html(E)의 글자 떠오르기를 차례로(0.12초씩) */
      if (c.device !== 'mobile' && (!fx.entrance || fx.entrance === 'none')) {
        (c.blocks || []).forEach(function (b, i) { s += '#vth .vth-b' + b.id + '{transition:opacity .4s cubic-bezier(.16,1,.3,1) ' + (i * 0.12).toFixed(2) + 's,translate .4s cubic-bezier(.16,1,.3,1) ' + (i * 0.12).toFixed(2) + 's}'; });
      }
    }
    return s;
  };

  function mediaHtml(c) {
    var md = c.media || {};
    if (md.type === 'slides' && (md.slides || []).length) {
      return md.slides.map(function (u, i) { return '<img src="' + esc(u) + '" alt=""' + (i ? ' fetchpriority="low" decoding="async"' : ' fetchpriority="high" loading="eager" decoding="sync"') + '>'; }).join('');
    }
    if (md.type === 'video') {
      var poster = md.poster || md.src;
      var vid = (c.device === 'mobile' && md.videoMobile === 'poster') ? '' : '<video muted loop playsinline preload="none" data-src="' + esc(md.video) + '"' + (poster ? ' poster="' + esc(poster) + '"' : '') + '></video>';
      return (poster ? '<img src="' + esc(poster) + '" alt="" fetchpriority="high" loading="eager" decoding="sync">' : '') + vid;
    }
    if (md.type === 'none') { return ''; }
    if (md.type === 'anim') {
      return (md.src ? '<img src="' + esc(md.src) + '"' + (md.w ? ' width="' + num(md.w) + '" height="' + num(md.h) + '"' : '') + ' alt="' + esc(md.alt || '') + '" fetchpriority="high" loading="eager" decoding="sync">' : '') +
        (md.anim ? '<img class="vth-anim" data-src="' + esc(md.anim) + '" alt="" decoding="async">' : '');
    }
    if (!md.src) { return ''; }
    var set = imgSet(md), ss = set.length ? ' srcset="' + set.map(function (x) { return esc(x.src) + ' ' + x.w + 'w'; }).join(', ') + '" sizes="' + sizesAttr(c) + '"' : '';
    var img = '<img src="' + esc(md.src) + '"' + ss + (md.w ? ' width="' + num(md.w) + '" height="' + num(md.h) + '"' : '') + ' alt="' + esc(md.alt || '') + '" fetchpriority="high" loading="eager" decoding="sync">';
    var T = md.tall;
    if (T && T.src) { return '<picture><source media="(max-width:' + tallW(T) + 'px)" srcset="' + esc(T.src) + '"' + (num(T.w) ? ' width="' + num(T.w) + '" height="' + num(T.h) + '"' : '') + '>' + img + '</picture>'; }
    return img;
  }
  /* 6.6: 세로(휴대폰) 사진을 쓰는 화면 너비. 전에는 화면 가로세로 비율(max-aspect-ratio)로 골라서, 휴대폰에서 스크롤로 주소창이 접혀 화면 높이가 바뀌면 사진이 갈아끼워졌음(갑자기 커져 보임).
   * 너비는 주소창·도구 줄·스크롤로 바뀌지 않음. 저장된 값 '7/10'·'9/16' = 휴대폰(767px 이하), '3/4' = 태블릿 세로까지(1023px 이하) */
  function tallW(T) { return T && T.ratio === '3/4' ? 1023 : 767; }
  /* 2.7: 크기별 사진 목록(원래 사진 + media.sizes), 2장 이상일 때만 srcset */
  function imgSet(md) {
    var list = [], seen = {};
    if (md.src && num(md.w)) { list.push({ src: md.src, w: num(md.w) }); }
    (md.sizes || []).forEach(function (x) { if (x && x.src && num(x.w)) { list.push({ src: x.src, w: num(x.w) }); } });
    list = list.filter(function (x) { if (seen[x.w]) { return false; } seen[x.w] = 1; return true; }).sort(function (a, b) { return a.w - b.w; });
    return list.length > 1 ? list : [];
  }
  function sizesAttr(c) { var sp = c.split || {}; return sp.mode && sp.mode !== 'full' && !sp.stack ? num(sp.ratio, 80) + 'vw' : '100vw'; }
  /* 2.7: 첫 사진 미리 받기 줄. mq = 이 칸이 보이는 화면 조건 */
  function preFor(c, mq) {
    var md = c.media || {}, out = '';
    var L = function (href, set, media) { return href ? '<link rel="preload" as="image" href="' + esc(href) + '"' + (set && set.length ? ' imagesrcset="' + set.map(function (x) { return esc(x.src) + ' ' + x.w + 'w'; }).join(', ') + '" imagesizes="' + sizesAttr(c) + '"' : '') + (media ? ' media="' + media + '"' : '') + ' fetchpriority="high">\n' : ''; };
    var J = function (a, b) { return a && b ? a + ' and ' + b : (a || b); };
    if (md.type !== 'image') { return L(firstImg(c), null, mq); }
    var T = md.tall;
    if (T && T.src) { var R = tallW(T); return L(T.src, null, J(mq, '(max-width:' + R + 'px)')) + L(md.src, imgSet(md), J(mq, '(min-width:' + (R + 1) + 'px)')); }
    return L(md.src, imgSet(md), mq);
  }
  function imgKey(c) { var md = c.media || {}; return md.type === 'image' ? JSON.stringify([md.src, imgSet(md), md.tall && md.tall.src ? [md.tall.src, md.tall.ratio] : 0]) : String(firstImg(c)); }

  function blockHtml(b) {
    var cls = 'vth-blk vth-b' + b.id, tag = /^(h1|h2|h3|p|div)$/.test(b.tag) ? b.tag : 'div';
    var inner;
    if (b.type === 'buttons') {
      inner = '<ul>' + (b.items || []).map(function (it) { return '<li><a href="' + esc(it.u || '#') + '">' + esc(it.t) + '</a></li>'; }).join('') + '</ul>';
      tag = 'div';
    } else {
      inner = cleanHtml(b.html);
      if (b.link) { inner = '<a href="' + esc(b.link) + '" style="text-decoration:none">' + inner + '</a>'; }
    }
    return '<' + tag + ' class="' + cls + '" data-id="' + b.id + '">' + inner + '</' + tag + '>';
  }

  function marqueeHtml(c) {
    var m = c.marquee || {};
    if (!m.on) { return ''; }
    var one = '<span>' + esc(m.text).replace(/ {2}/g, ' &nbsp;') + '</span>', run = '';
    for (var i = 0; i < 6; i++) { run += one; }
    return '<div class="vth-mq" aria-hidden="true"><div class="vth-mq-t">' + run + run + '</div></div>';
  }

  VTH.html = function (c) {
    var sp = c.split || {}, blocks = c.blocks || [], m = c.marquee || {};
    var inMain = blocks.filter(function (b) { return b.area !== 'side' || sp.mode === 'full'; }).map(blockHtml).join('');
    var inSide = blocks.filter(function (b) { return b.area === 'side' && sp.mode !== 'full'; }).map(blockHtml).join('');
    var mq = marqueeHtml(c), mqIn = m.on && m.pos !== 'below' ? mq : '';
    var h = '<section id="vth" class="vth"' + ((c.fx || {}).scrollFade && c.device !== 'mobile' ? ' data-sf="1"' : '') + '>';
    if (c.device === 'mobile') { var hg = c.height || {}; h += '<i class="vth-hp" aria-hidden="true"' + (hg.mode === 'screen' ? ' data-full="1"' : '') + '></i>'; } /* 휴대폰 높이 고정용 자(RUNTIME 의 lk) */
    h += '<div class="vth-area vth-main"><div class="vth-media">' + mediaHtml(c) + '</div>' + inMain + mqIn + bandsIn(c, 'main') + '</div>';
    if (sp.mode !== 'full') {
      h += '<div class="vth-area vth-side">' + (sp.sideType === 'image' && sp.sideImg ? '<img src="' + esc(sp.sideImg) + '" alt="" decoding="async">' : '') + inSide + '</div>';
    }
    h += bandsIn(c, 'all') + '</section>';
    if (m.on && m.pos === 'below') { h += mq; }
    return h;
  };

  VTH.fonts = function (c) {
    var used = {}, add = function (n) { if (n) { used[n] = 1; } };
    (c.blocks || []).forEach(function (b) {
      add(b.font);
      String(b.html || '').replace(/face="([^"]+)"/g, function (m, f) { add(f.split(',')[0].replace(/['"]/g, '').trim()); });
      String(b.html || '').replace(/font-family:\s*([^;"]+)/g, function (m, f) { add(f.split(',')[0].replace(/['"&;]|quot/g, '').trim()); });
    });
    if ((c.marquee || {}).on) { add(c.marquee.font); }
    (c.bands || []).forEach(function (b) { if (b.on !== false) { add(b.font); } });
    var g = [], u = [];
    Object.keys(used).forEach(function (n) { var r = fontRow(n); if (!r || !r[3]) { return; } if (r[3].indexOf('g:') === 0) { g.push(r[3].slice(2)); } else { u.push(r[3].slice(2)); } });
    if (g.length) { u.unshift('https://fonts.googleapis.com/css2?family=' + g.join('&family=') + '&display=swap'); }
    return u;
  };

  /* 11/11 휴대폰: 웹 글꼴 글씨는 CSS로 숨겨 둠(VTH.css) → 글꼴 설정 파일(data-vthf)이 오고 그 글꼴이 준비되면 html.vth-fok 를 붙여 보이게. 늦어도 2.5초 뒤엔 보임 */
  /* 2.9(11/13): getComputedStyle(강제 리플로우) 없이, 화면에 있는 설정 JSON의 글꼴·굵기·글자로 fonts.load. PC 폭이면 바로 보이게 */
  var REVEAL = '(function(){var d=document,rv=function(){d.documentElement.classList.add("vth-fok")};setTimeout(rv,2500);var F=d.fonts,L=[].slice.call(d.querySelectorAll("link[data-vthf]"));' +
    'if(!F||!F.load||!window.Promise){rv();return;}' +
    'var c=null;try{var m=d.getElementById("vth-cfg-m"),mob=!!(window.matchMedia&&matchMedia("(max-width:1023px)").matches),el=m&&mob?m:d.getElementById("vth-cfg");c=el&&JSON.parse(el.textContent);if(!c){rv();return;}}catch(e){rv();return;}' +
    'var Q=(c.blocks||[]).filter(function(b){return b&&b.font}).map(function(b){var t=b.type==="buttons"?(b.items||[]).map(function(i){return i&&i.t||""}).join(""):String(b.html||"").replace(/<[^>]*>/g,"").replace(/&[a-z0-9#]+;/gi,"");t=t.replace(/\\s+/g,"");if(b.upper==="uppercase")t=t.toUpperCase();return[(b.italic?"italic ":"")+(b.weight||400)+" 16px \\""+b.font+"\\"",t||"a"]});' +
    'Q=Q.concat((c.bands||[]).filter(function(b){return b&&b.font&&b.on!==false}).map(function(b){var t=String(b.text||"").replace(/\\s+/g,"");if(b.upper==="uppercase")t=t.toUpperCase();return[(b.italic?"italic ":"")+(b.weight||400)+" 16px \\""+b.font+"\\"",t||"a"]}));' +
    'Promise.all(L.map(function(l){return new Promise(function(r){if(l.sheet&&l.media==="all"){r();return;}l.addEventListener("load",function(){setTimeout(r,0)});l.addEventListener("error",r);})}))' +
    '.then(function(){return Promise.all(Q.map(function(q){return F.load(q[0],q[1]).catch(function(){})}))}).then(rv,rv);})();';
  /* 휴대폰 첫 화면 높이 고정(6.5, 11/19): 100svh · innerHeight · visualViewport.height · 고정 자리(position:fixed) 높이 가운데 가장 작은 값 − 첫 화면 윗자리 = --vthH.
   * 네이버·카카오 같은 앱 안 브라우저는 svh·innerHeight 가 아래 도구 줄에 가려지는 곳까지 넣어 주기도 해서(사장님 아이폰 네이버 앱: 약 38px 길었음) 가장 작은 값을 씀.
   * 처음 그릴 때 바로 재고, 손대기 전까지는 늦게 바뀌는 값도 따라감. 손댄 뒤에는 폭이 바뀔 때(화면 돌림)만 다시 잼(도구 줄이 숨었다 나타나도 안 흔들림).
   * 주소 뒤에 ?vthdbg 를 붙이면 잰 값이 화면에 나옴. mx: 이 폭 이상이면 고정을 풂(0 = 안 풂) */
  var LKRT = '(function(s,mx){var lw=0,fz=0,n=0,cur=0,D=document,dbg=/[?&]vthdbg/.test(location.search),pr=function(c){var e=D.createElement("i");e.style.cssText="position:fixed;left:0;top:0;width:0;visibility:hidden;pointer-events:none;"+c;(D.body||D.documentElement).appendChild(e);var r=e.getBoundingClientRect().height;e.parentNode.removeChild(e);return r},lk=function(){var w=window.innerWidth,rot=w!==lw;if(!rot&&fz)return;var p=s.querySelector(".vth-hp"),full=p&&p.getAttribute("data-full");if(!rot&&!full)return;if(rot){lw=w;fz=0;if(!p||(mx&&w>=mx)){s.style.removeProperty("--vthH");cur=0}}if(mx&&w>=mx)return;var q=s.getBoundingClientRect(),h0=p?p.getBoundingClientRect().height:q.height,h=h0,u="svh",top=q.top+(window.pageYOffset||0),ih=window.innerHeight||0,vv=window.visualViewport,vh=vv?vv.height*(vv.scale||1):0,fx=0,sv=0;if(full){fx=pr("bottom:0");sv=pr("height:100svh");var bs=sv>0?sv:ih,V=bs,c=[["inner",ih],["vv",vh],["fix",fx]];u=sv>0?"svh":"inner";for(var i=0;i<3;i++){var x=c[i][1];if(x>0&&Math.abs(x-bs)<200&&x<V-.5){V=x;u=c[i][0]}}if(V-top>200)h=V-top;else u="svh-"}h=Math.floor(h+.05);if(h>0&&h!==cur){cur=h;s.style.setProperty("--vthH",h+"px")}n++;if(dbg){var g=D.getElementById("vthDbg")||D.body.appendChild(D.createElement("div")),r=Math.round;g.id="vthDbg";g.style.cssText="position:fixed;left:6px;top:120px;z-index:2147483647;background:rgba(0,0,0,.88);color:#7CFC00;font:12px/1.6 monospace;padding:7px 9px;white-space:pre;pointer-events:none";g.textContent="\\uCCAB \\uD654\\uBA74 "+cur+"px (\\uC4F4 \\uAC12: "+u+")\\nsvh "+r(sv)+" / inner "+ih+" / vv "+r(vh)+" / fix "+r(fx)+"\\n\\uBA38\\uB9AC\\uB9D0 "+r(top)+" / \\uC2E4\\uC81C \\uCCAB \\uD654\\uBA74 "+r(s.getBoundingClientRect().height)+"\\n\\uD3ED "+w+" / \\uC7B0 \\uD69F\\uC218 "+n+" / \\uACE0\\uC815 "+fz+" / safe "+r(pr("height:env(safe-area-inset-bottom)"))+" / y "+r(window.pageYOffset||0)}};lk();var o={passive:true};addEventListener("resize",lk,o);if(window.visualViewport&&visualViewport.addEventListener)visualViewport.addEventListener("resize",lk,o);addEventListener("orientationchange",function(){setTimeout(lk,350)},o);addEventListener("pageshow",lk);addEventListener("load",lk);D.addEventListener("DOMContentLoaded",lk);setTimeout(lk,400);setTimeout(lk,1200);addEventListener("touchstart",function(){fz=1},o);})';
  var RUNTIME = REVEAL + '(function(){var s=document.getElementById("vth");if(!s)return;var b=(location.pathname.match(/^\\/skin-[a-z]+\\d+/)||[""])[0];' +
    'var ed=/[?&#]vtpub/.test(location.href)||window.__vthDrag;if(!ed&&window.innerWidth<=1024){' + LKRT + '(s,0);}' +
    'if(/[?&#]vtpub/.test(location.href)){var e=document.createElement("script");e.src="https://vintagetalk.github.io/auto/vt_hero.js?v="+Date.now();document.body.appendChild(e);}' +
    'var an=s.querySelector("img.vth-anim[data-src]");if(an){var ga=function(){an.onload=function(){s.classList.add("vth-aplaying")};an.src=an.getAttribute("data-src")};if(document.readyState==="complete")setTimeout(ga,300);else addEventListener("load",function(){setTimeout(ga,300)});}' +
    'var v=s.querySelector("video[data-src]");if(v&&v.getAttribute("data-src")){var go=function(){v.src=v.getAttribute("data-src");v.addEventListener("playing",function(){s.classList.add("vth-vplaying")});var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});};if(document.readyState==="complete")setTimeout(go,200);else addEventListener("load",function(){setTimeout(go,200)});}' +
    'if(s.getAttribute("data-sf")){var k=s.querySelectorAll(".vth-blk"),t=0;addEventListener("scroll",function(){if(t)return;t=1;requestAnimationFrame(function(){t=0;var o=Math.max(0,1-scrollY/(s.offsetHeight*.6));for(var i=0;i<k.length;i++)k[i].style.opacity=o;});},{passive:true});}})();';

  VTH.file = function (c) {
    var md = c.media || {}, pre = '';
    pre = md.type === 'none' ? '' : preFor(c, '');
    var links = VTH.fonts(c).map(function (u) { return '<link rel="stylesheet" href="' + esc(u) + '" media="print" onload="this.media=\'all\'" data-vthf="1">'; }).join('\n');
    var json = JSON.stringify(c).replace(/</g, '\\u003c');
    return '<!-- [' + SH.KO + ' 메인 첫 화면] 이 파일은 빈티지 작업실 디자인 편집기(vintagetalk.github.io/auto/#design)에서 만들어집니다. 직접 고치기보다 편집기를 쓰세요. 만든 날: ' + new Date().toLocaleString('ko-KR') + ' -->\n' +
      pre + (links ? links + '\n' : '') +
      '<style id="vth-css">' + VTH.css(c) + '</style>\n' +
      VTH.html(c) + '\n' +
      '<script type="application/json" id="vth-cfg">' + json + '</script>\n' +
      '<script>' + RUNTIME + '</script>\n';
  };

  /* ---------- 반응형 한 파일 (스킨67, 11/10) ----------
   * PC 칸 #vth(1024px 이상에서만 보임) + 모바일 칸 #vthm(1023px 이하에서만 보임)
   * - CSS는 @media로 감싸 서로 섞이지 않음, 모바일은 움직임 전부 끔
   * - 두 칸 첫 사진이 다르면 안 보이는 칸 사진은 받지 않음(picture + 1px 빈 그림)
   * - 글꼴은 두 칸에 쓴 글꼴을 한 번에, 쓰는 글자만 받음(text=)
   */
  var RUNTIME_R = REVEAL + '(function(){var ed=/[?&#]vtpub/.test(location.href)||window.__vthDrag;' + /* 7.3: ?vtedit 없앰 — 「쇼핑몰에 반영」(?vtpub)일 때만 빈티지 작업실의 편집기 파일을 부름 */
    'if(/[?&#]vtpub/.test(location.href)&&!window.__vthLoad){window.__vthLoad=1;var e=document.createElement("script");e.src="https://vintagetalk.github.io/auto/vt_hero.js?v="+Date.now();document.body.appendChild(e);}' +
    '["vth","vthm"].forEach(function(id){var s=document.getElementById(id);if(!s)return;var pc=id==="vth",mq=window.matchMedia&&matchMedia(pc?"(min-width:1024px)":"(max-width:1023px)"),on=function(){return !mq||mq.matches};' +
    'if(!pc&&!ed){' + LKRT + '(s,1024);}' +
    'var later=function(f,ms){var g=function(){if(on()){f();return;}if(mq&&mq.addEventListener){var h=function(){if(mq.matches){mq.removeEventListener("change",h);f();}};mq.addEventListener("change",h);}};if(document.readyState==="complete")setTimeout(g,ms);else addEventListener("load",function(){setTimeout(g,ms)});};' +
    'var an=s.querySelector("img.vth-anim[data-src]");if(an){later(function(){an.onload=function(){s.classList.add("vth-aplaying")};an.src=an.getAttribute("data-src")},300);}' +
    'var v=s.querySelector("video[data-src]");if(v&&v.getAttribute("data-src")){later(function(){v.src=v.getAttribute("data-src");v.addEventListener("playing",function(){s.classList.add("vth-vplaying")});var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});},200);}' +
    'if(pc&&s.getAttribute("data-sf")){var k=s.querySelectorAll(".vth-blk"),t=0;addEventListener("scroll",function(){if(t||!on())return;t=1;requestAnimationFrame(function(){t=0;var o=Math.max(0,1-scrollY/(s.offsetHeight*.6));for(var i=0;i<k.length;i++)k[i].style.opacity=o;});},{passive:true});}' +
    '});})();';
  var GIF1 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  function firstImg(c) { var md = c.media || {}; return md.type === 'none' ? '' : md.type === 'video' ? (md.poster || md.src) : md.type === 'slides' ? (md.slides || [])[0] : md.src; }
  function toMobId(s) { return String(s).replace(/#vth(?![\w-])/g, '#vthm'); }
  function noLoadWhen(html, c, mq) {
    /* 안 보이는 칸의 첫 사진은 받지 않게: 사진 1장·움직이는 사진만 */
    var t = (c.media || {}).type;
    if (t !== 'image' && t !== 'anim') { return html; }
    if (html.indexOf('<div class="vth-media"><picture>') > -1) { return html.replace('<div class="vth-media"><picture>', '<div class="vth-media"><picture><source media="' + mq + '" srcset="' + GIF1 + '">'); }
    return html.replace(/<div class="vth-media"><img ([^>]*)>/, function (m, a) { return '<div class="vth-media"><picture><source media="' + mq + '" srcset="' + GIF1 + '"><img ' + a + '></picture>'; });
  }
  function usedText(list) {
    var box = document.createElement('div'), t = '';
    list.forEach(function (c) {
      (c.blocks || []).forEach(function (b) {
        if (b.type === 'buttons') { (b.items || []).forEach(function (it) { t += it.t || ''; }); }
        else { box.innerHTML = cleanHtml(b.html); t += box.textContent || ''; }
      });
      (c.bands || []).forEach(function (b) { if (b.on !== false) { t += b.text || ''; } });
      if ((c.marquee || {}).on) { t += c.marquee.text || ''; }
    });
    t += t.toUpperCase() + t.toLowerCase() + ' ';
    var seen = {}, out = '';
    for (var i = 0; i < t.length; i++) { var ch = t.charAt(i); if (!seen[ch] && !/[\r\n\t]/.test(ch)) { seen[ch] = 1; out += ch; } }
    return out;
  }
  VTH.fontsR = function (pc, mo) {
    var bands = [];
    [pc, mo].forEach(function (c) { (c.bands || []).forEach(function (b) { bands.push(b); }); if ((c.marquee || {}).on) { bands.push({ font: c.marquee.font }); } });
    var u = VTH.fonts({ blocks: (pc.blocks || []).concat(mo.blocks || []), bands: bands });
    var txt = usedText([pc, mo]);
    return u.map(function (x) { return /^https:\/\/fonts\.googleapis\.com\/css2\?/.test(x) && txt ? x.replace('&display=swap', '&text=' + encodeURIComponent(txt) + '&display=swap') : x; });
  };
  function respPair(pc, mo) {
    var bp = (location.pathname.match(/^\/skin-[a-z]+\d+/) || [''])[0];
    pc = JSON.parse(unskin(JSON.stringify(pc), bp)); mo = JSON.parse(unskin(JSON.stringify(mo), bp)); pc.resp = mo.resp = true; pc.device = 'pc'; mo.device = 'mobile';
    return [pc, mo];
  }
  function preR(pc, mo) {
    var a = imgKey(pc), b = imgKey(mo);
    if (a === b && firstImg(pc) && !((pc.media || {}).tall || {}).src) { return preFor(pc, ''); }
    return (firstImg(pc) ? preFor(pc, '(min-width:1024px)') : '') + (firstImg(mo) ? preFor(mo, '(max-width:1023px)') : '');
  }
  /* 3.2: 미리 받기 파일(SHOPS.preloadFile) 내용 — 메인 주소(/, /index.html, 미리보기 /skin-xxNN/)에서만 미리 받기 줄을 넣음. __vthPre = 연결 표시 */
  VTH.preFileR = function (pc, mo) {
    var pr = respPair(pc, mo), pre = preR(pr[0], pr[1]);
    var re = '/^\\/(skin-[a-z0-9]+\\/?)?(index\\.html)?$/';
    return '<script>window.__vthPre=1;if(' + re + '.test(location.pathname)){document.write(' + JSON.stringify(pre).replace(/</g, '\\u003c') + ');}</' + 'script>\n';
  };
  VTH.fileR = function (pc, mo, noPre) {
    var pr = respPair(pc, mo); pc = pr[0]; mo = pr[1];
    var a = imgKey(pc), b = imgKey(mo), pre = noPre ? '' : preR(pc, mo);
    var links = VTH.fontsR(pc, mo).map(function (u) { return '<link rel="stylesheet" href="' + esc(u) + '" media="print" onload="this.media=\'all\'" data-vthf="1">'; }).join('\n');
    var hPc = VTH.html(pc), hMo = VTH.html(mo).replace('<section id="vth"', '<section id="vthm"');
    if (a !== b) { hPc = noLoadWhen(hPc, pc, '(max-width:1023px)'); hMo = noLoadWhen(hMo, mo, '(min-width:1024px)'); }
    var css = '@media (max-width:1023px){#vth{display:none!important}}@media (min-width:1024px){#vthm{display:none!important}}' +
      '@media (min-width:1024px){' + VTH.css(pc) + '}' +
      '@media (max-width:1023px){' + toMobId(VTH.css(mo)) + '}';
    var j = function (c) { return JSON.stringify(c).replace(/</g, '\\u003c'); };
    return '<!-- [' + SH.KO + ' 메인 첫 화면 · 반응형] 이 파일은 빈티지 작업실 디자인 편집기(vintagetalk.github.io/auto/#design)에서 만들어집니다. 직접 고치기보다 편집기를 쓰세요. PC(1024px 이상) 설정 = vth-cfg, 모바일(1023px 이하) 설정 = vth-cfg-m. 만든 날: ' + new Date().toLocaleString('ko-KR') + ' -->\n' +
      pre + (links ? links + '\n' : '') +
      '<style id="vth-css">' + css + '</style>\n' +
      hPc + '\n' + hMo + '\n' +
      '<script type="application/json" id="vth-cfg">' + j(pc) + '</script>\n' +
      '<script type="application/json" id="vth-cfg-m">' + j(mo) + '</script>\n' +
      '<script>' + RUNTIME_R + '</script>\n';
  };

  /* ================= 편집 모드 ================= */
  if (!/[?&#](vtpub|vtedit|vtdev)/.test(location.href) && !WEB && !window.__VTH_NOHIDE) { return; }

  var BASE = (location.pathname.match(/^\/skin-[a-z]+\d+/) || [''])[0];
  var state = { dev: 'pc', cfg: { pc: null, mobile: null }, hist: { pc: [], mobile: [] }, fut: { pc: [], mobile: [] }, sel: 0, tab: 'layout', area: 'main', frame: null };

  /* 카페24는 미리보기 주소(/skin-skin67/)로 열면 화면 안의 모든 주소 앞에 /skin-skin67 을 붙여 보여 줌
     → 설정을 읽을 때 떼어 냄(안 떼면 저장 파일 경로를 못 찾고, 손님 링크도 미리보기 주소로 저장됨) */
  function docBase(doc) { try { return (doc.location.pathname.match(/^\/skin-[a-z]+\d+/) || [''])[0]; } catch (e) { return ''; } }
  function unskin(txt, pre) {
    /* pre = 그 화면의 미리보기 앞부분(/skin-skin18 등). 그 앞부분만 뗌(모바일 미리보기 주소 /skin-mobile11/ 같은 다른 값은 그대로) */
    if (!pre) { return String(txt); }
    return String(txt).split(pre + '/').join('/');
  }
  function readCfg(doc, device) {
    var el = doc.getElementById('vth-cfg');
    if (el) { try { return JSON.parse(unskin(el.textContent, docBase(doc))); } catch (e) { } }
    return VTH.defaults(device);
  }
  var isMobileSkin = /mobile/.test(BASE) || /^m\./.test(location.hostname);
  if (RESP) {
    /* 반응형: 한 파일에 PC·모바일 설정이 같이 있음. 화면이 1023px 이하(휴대폰)에서 열면 모바일만 고침 */
    isMobileSkin = window.innerWidth < 1024;
    var mEl = document.getElementById('vth-cfg-m'), mCfg = null;
    try { mCfg = JSON.parse(unskin(mEl.textContent, docBase(document))); } catch (e) { mCfg = VTH.defaults('mobile'); }
    state.cfg.pc = readCfg(document, 'pc'); state.cfg.mobile = mCfg;
    var mSec = document.getElementById('vthm'); if (mSec) { mSec.parentNode.removeChild(mSec); }
  }
  state.dev = isMobileSkin ? 'mobile' : 'pc';
  (function () { var he = document.getElementById('vth-hdr-cfg'); state.hdrOn = !!(he || document.getElementById('vth-hdr-css')); state.hdr = null;
    if (state.hdrOn && SH.hdr) { try { state.hdr = JSON.parse(he.textContent); } catch (e) { state.hdr = VTH.hdrDefaults(); } if (!state.hdr || !state.hdr.pc) { state.hdr = VTH.hdrDefaults(); } }
    state.hdrOrig = state.hdr ? JSON.stringify(state.hdr) : ''; })();
  if (!RESP) { state.cfg[state.dev] = readCfg(document, state.dev); }
  function normBands(c) {
    if (!c || c.bands) { return c; }
    c.bands = [];
    var m = c.marquee;
    if (m && m.on) {
      var pos = m.pos === 'top' ? 'top' : m.pos === 'over-middle' ? 'middle' : 'bottom';
      c.bands.push(bandOf({ mode: m.pos === 'below' ? 'zone' : 'over', pos: pos, zone: 10, fitZone: false, text: m.text, font: m.font, size: m.size, weight: m.weight, italic: m.italic, ls: m.ls,
        color: m.color, bg: m.bg, speed: m.speed, dir: m.dir, clipT: m.clipT, clipB: m.clipB, upper: m.upper, opacity: m.opacity }));
      m.on = false;
    }
    return c;
  }
  function C() { var c = state.cfg[state.dev]; if (c && !c.bands) { normBands(c); } if (c && state.orig && !state.orig[state.dev]) { state.orig[state.dev] = JSON.stringify(c); } return c; }
  function targetDoc() { return state.dev === 'mobile' && !isMobileSkin ? (state.frame && state.frame.contentDocument) : document; }

  function applyTo(doc, c, cssOnly) {
    try { if (c && c.device === 'mobile' && doc !== document && doc.defaultView && doc.defaultView.innerWidth < 600 && typeof noBar === 'function') { noBar(doc, true); } } catch (e) { }
    if (!doc) { return; }
    var st = doc.getElementById('vth-css');
    if (!st) { st = doc.createElement('style'); st.id = 'vth-css'; doc.head.appendChild(st); }
    st.textContent = VTH.css(c) + editCss();
    if (cssOnly) { return; }
    var sec = doc.getElementById('vth');
    var old = doc.querySelectorAll('.vth-mq');
    for (var i = 0; i < old.length; i++) { if (!sec || !sec.contains(old[i])) { old[i].parentNode.removeChild(old[i]); } }
    var wrap = doc.createElement('div'); wrap.innerHTML = VTH.html(c);
    var nodes = Array.prototype.slice.call(wrap.childNodes);
    if (sec) { nodes.forEach(function (n) { sec.parentNode.insertBefore(n, sec); }); sec.parentNode.removeChild(sec); }
    else {
      var host = doc.querySelector('.main-top-banner') || doc.querySelector('#contents') || doc.body;
      nodes.forEach(function (n) { host.parentNode.insertBefore(n, host); });
    }
    VTH.fonts(c).forEach(function (u, idx) {
      var id = 'vth-font-' + idx + '-' + u.length; if (doc.getElementById(id)) { return; }
      var l = doc.createElement('link'); l.rel = 'stylesheet'; l.href = u; l.id = id; doc.head.appendChild(l);
    });
    var ns = doc.getElementById('vth'), v = ns && ns.querySelector('video[data-src]');
    var an = ns && ns.querySelector('img.vth-anim[data-src]');
    if (an) { an.onload = function () { ns.classList.add('vth-aplaying'); }; an.src = an.getAttribute('data-src'); }
    if (v && v.getAttribute('data-src')) { v.src = v.getAttribute('data-src'); v.addEventListener('playing', function () { ns.classList.add('vth-vplaying'); }); try { v.play(); } catch (e) { } }
    markSel(doc);
  }
  function editCss() {
    return 'html #vth .vth-blk{visibility:visible!important}html:not(.vth-fxplay) #vth .vth-blk{animation:none!important}#vth .vth-blk{cursor:move;outline:1px dashed rgba(255,255,255,.0);outline-offset:6px}#vth .vth-blk:hover{outline-color:rgba(196,0,31,.6)}#vth .vth-blk.vth-sel{outline:2px dashed #c4001f}#vth a{pointer-events:none}' +
      '#vth .vth-bd.vth-bm-zone,#vth .vth-bd.vth-bm-over{pointer-events:auto;cursor:pointer}#vth .vth-bd.vth-bm-over{cursor:ns-resize}#vth .vth-bd:hover{box-shadow:inset 0 0 0 1px rgba(255,45,85,.6)}#vth .vth-bd.vth-sel{box-shadow:inset 0 0 0 2px #ff2d55}';
  }
  function markSel(doc) {
    doc = doc || targetDoc(); if (!doc) { return; }
    var c = C(), all = doc.querySelectorAll('#vth .vth-blk'), b = state.selKind !== 'band' && state.selKind !== 'none' ? c.blocks[state.sel] : null;
    for (var i = 0; i < all.length; i++) { all[i].classList.toggle('vth-sel', !!b && all[i].getAttribute('data-id') === b.id); }
    var bb = state.selKind === 'band' ? (c.bands || [])[state.bsel] : null, bs = doc.querySelectorAll('#vth .vth-bd');
    for (var j = 0; j < bs.length; j++) { bs[j].classList.toggle('vth-sel', !!bb && bs[j].getAttribute('data-bid') === bb.id); }
  }
  var pushT = 0;
  function changed(cssOnly, noHist) {
    if (RESP && state.sync !== false && !noHist && state.mode === 'hdr') { syncHdr(); }
    if (RESP && state.sync && !noHist && state.H.length) { syncOther(); if (state._syncMsg) { var sm = state._syncMsg; state._syncMsg = ''; setTimeout(function () { msg(sm); }, 0); } }
    applyTo(targetDoc(), C(), cssOnly); winsApply(cssOnly); if (typeof pvHero === 'function') { pvHero(cssOnly); } if (state.view === 'lap' && state.dev === 'pc') { var ld = lapDoc(); if (ld) { applyTo(ld, state.cfg.pc, cssOnly); } } if (typeof applyHdr === 'function') { applyHdr(); }
    if (noHist) { return; }
    if (RESP && state.mode !== 'hdr' && typeof allTidy === 'function') {
      var bsig = JSON.stringify(['pc', 'mobile'].map(function (dv) { var cc0 = state.cfg[dv] || {}; return (cc0.bands || []).filter(function (b) { return b.on !== false && b.mode === 'zone'; }).map(function (b) { return [b.pos, num(b.zone)]; }); }));
      if (state._bandSig !== undefined && state._bandSig !== bsig) { clearTimeout(state._bandT); state._bandT = setTimeout(function () { allTidy(function (n) { if (n) { msg('띠가 사진 칸 높이를 바꿔서 휴대폰·노트북 글씨 자리를 다시 맞췄어요(' + n + '번). 📱 휴대폰 창에서 확인하세요.'); } }, true); }, 900); }
      state._bandSig = bsig;
    }
    clearTimeout(pushT);
    if (!cssOnly) { pushHist(); return; }
    pushT = setTimeout(pushHist, 350);
  }
  function pushHist() { pushT = 0; if (RESP) { pushAll(); return; } var h = state.hist[state.dev], s = JSON.stringify(C()); if (h[h.length - 1] === s) { return; } h.push(s); if (h.length > 200) { h.shift(); } state.fut[state.dev] = []; if (typeof autoSave === 'function') { autoSave(); } }
  function flushHist() { if (pushT) { clearTimeout(pushT); pushHist(); } if (state._fvT) { clearTimeout(state._fvT); state._fvT = 0; state._lbl = state._fvLbl || state._lbl; pushAll(); } if (state._siteT) { clearTimeout(state._siteT); state._siteT = 0; pushAll(); } }
  function undo() { flushHist(); if (RESP) { if (state.Hi > 0) { goHist(state.Hi - 1); } return; } var h = state.hist[state.dev]; if (h.length < 2) { return; } state.fut[state.dev].push(h.pop()); state.cfg[state.dev] = JSON.parse(h[h.length - 1]); state.sel = Math.min(state.sel, C().blocks.length - 1); changed(false, true); build(); }
  function redo() { flushHist(); if (RESP) { if (state.Hi < state.H.length - 1) { goHist(state.Hi + 1); } return; } var f = state.fut[state.dev]; if (!f.length) { return; } var s = f.pop(); state.hist[state.dev].push(s); state.cfg[state.dev] = JSON.parse(s); changed(false, true); build(); }
  /* ===== 3.3 반응형 작업내역(포토샵처럼) + PC·휴대폰 같이 고치기 =====
     반응형이면 PC 설정·휴대폰 설정·머리말을 한 줄로 묶어 기록. 줄을 누르면 그때로, ESC = 한 단계 되돌리기 */
  state.H = []; state.Hi = -1; state.sync = true;
  function snapAll() { return JSON.stringify({ pc: state.cfg.pc, mobile: state.cfg.mobile, hdr: state.hdr || null, imp: state.imp || null, ed: state.ed || null, site: state.site || null }); }
  function setBase() { state._last = { pc: JSON.stringify(state.cfg.pc), mobile: JSON.stringify(state.cfg.mobile) }; state._hlast = state.hdr ? JSON.stringify(state.hdr) : null; }
  function histInit() { state.H = [{ s: snapAll(), label: '처음 (편집기를 열었을 때)', t: Date.now() }]; state.Hi = 0; setBase(); VTH._state = state; /* 시험용으로 읽기만 */ try { fxInit(); } catch (e) { } VTH._t = { tidyDbg: function () { try { var fd = tidyFr && tidyFr.contentDocument; if (!fd) { return 'no frame'; } return (state.cfg.mobile.blocks || []).map(function (b) { var e = fd.querySelector('#vth .vth-b' + b.id), q = e ? e.getBoundingClientRect() : null; return q ? Math.round(q.top) + '~' + Math.round(q.bottom) + ' x' + Math.round(q.left) + '~' + Math.round(q.right) + ' ' + fd.defaultView.getComputedStyle(e).fontFamily.slice(0, 18) : '-'; }).join(' | ') + ' // ' + fd.defaultView.innerWidth + 'x' + fd.defaultView.innerHeight + ' 기록 ' + (state._tidyLog || []).join(' > ') + ' 단계 ' + state._tidyPass + ' 오류 ' + (state._tidyErr || '없음') + ' main ' + JSON.stringify((function () { var m = fd.querySelector('#vth .vth-main'); var r = m ? m.getBoundingClientRect() : null; return r ? [Math.round(r.top), Math.round(r.bottom)] : null; })()); } catch (e) { return 'err ' + e.message; } }, allTidy: function (cb) { allTidy(cb, true); }, tidyBusy: function () { return state._tidying || 0; }, pvAlt: function () { return PV.on && fxAlt(PV.url); }, pvGoPg: function (pg) { pvGo(pg); }, fxBusy: function () { return FXD.busy; }, fxNa: function () { return FXD.na; }, fxErr: function () { return FXD.err || []; }, fxWant: function (x) { return fxWant(x); }, pcOnly: function (x) { return !!x.pc; }, pvOpen: function (u) { pvOpen(u); }, fx: function () { return FX; }, sst: function () { return SST; }, pv: function () { return PV; }, pvFit: function () { try { pvFit(); } catch (e) { } }, pcPairs: function (cb) { pcPairsBig(cb); }, mobOnly: function (x) { return fxMobOnly(x); }, presets: function () { return PRESETS.map(function (p) { return [p[0], p[1], p[4]]; }); } }; }
  function renderAll() {
    if (!isMobileSkin && state.cfg.pc) { applyTo(document, state.cfg.pc); }
    if (isMobileSkin && state.cfg.mobile) { applyTo(document, state.cfg.mobile); }
    var fd = state.frame && state.frame.contentDocument; if (fd && !isMobileSkin && state.cfg.mobile) { applyTo(fd, state.cfg.mobile); }
    var ld = lapDoc(); if (ld && state.cfg.pc) { applyTo(ld, state.cfg.pc); }
    winsApply(false);
    if (typeof applyHdr === 'function') { applyHdr(); }
  }
  function blkName(b) { if (!b) { return ''; } var t = b.type === 'buttons' ? (b.items || []).map(function (x) { return x.t; }).join(' ') : String(b.html || '').replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim(); return t ? '"' + (t.length > 12 ? t.slice(0, 12) + '…' : t) + '" ' : ''; }
  var BLK_KEY = { html: '글씨 바꿈', items: '버튼 바꿈', x: '위치 옮김', y: '위치 옮김', pos: '위치 옮김', area: '칸 옮김', size: '글씨 크기', color: '글씨 색', font: '글꼴', weight: '굵기', italic: '기울임', ls: '자간', lh: '줄 간격', rotate: '돌리기', w: '글씨 폭', align: '정렬', link: '링크', upper: '대문자', bg: '글씨 배경', shadow: '그림자', stroke: '테두리 글씨', opacity: '투명도', gap: '버튼 간격', bstyle: '버튼 모양', bcolor: '버튼 색', bbg: '버튼 바탕', bhover: '버튼 올렸을 때 색' };
  function devLabel(x, y) {
    if (!x || !y) { return ''; }
    var xb = x.blocks || [], yb = y.blocks || [];
    if (yb.length > xb.length) { return '글씨 칸 추가'; }
    if (yb.length < xb.length) { return '글씨 칸 삭제'; }
    for (var i = 0; i < yb.length; i++) {
      var a = xb[i], b = yb[i]; if (JSON.stringify(a) === JSON.stringify(b)) { continue; }
      if (!a || a.id !== b.id) { return '글씨 칸 바뀜'; }
      for (var k in b) { if (b.hasOwnProperty(k) && JSON.stringify(a[k]) !== JSON.stringify(b[k])) { return blkName(b) + (BLK_KEY[k] || '글씨 꾸밈'); } }
    }
    var M = [['media', ''], ['split', '화면 방식'], ['height', '높이'], ['overlay', '사진 어둡게'], ['bands', '흐르는 띠'], ['marquee', '흐르는 띠'], ['fx', '효과'], ['frame', '테두리'], ['mainBg', '배경색'], ['pad', '바깥 여백'], ['bleed', '좌우 끝까지']];
    for (var j = 0; j < M.length; j++) {
      var k2 = M[j][0]; if (JSON.stringify(x[k2]) === JSON.stringify(y[k2])) { continue; }
      if (k2 === 'media') { var mx = x.media || {}, my = y.media || {}; return mx.src !== my.src ? '사진 교체' : JSON.stringify(mx.sizes) !== JSON.stringify(my.sizes) ? '크기별 사진' : JSON.stringify(mx.tall) !== JSON.stringify(my.tall) ? '세로 사진' : mx.type !== my.type ? '사진 종류' : '사진 위치·설정'; }
      return M[j][1];
    }
    return '설정 바꿈';
  }
  function diffLabel(a, b) {
    if (!a) { return '처음'; }
    var out = [];
    if (JSON.stringify(a.imp) !== JSON.stringify(b.imp)) { out.push('개선 제안'); } if (JSON.stringify(a.ed) !== JSON.stringify(b.ed)) { out.push('지우기·되살리기'); } if (JSON.stringify(a.site) !== JSON.stringify(b.site)) { out.push('전체 꾸밈'); }
    if (JSON.stringify(a.hdr) !== JSON.stringify(b.hdr)) { var sa = a.hdr && a.hdr.st, sb = b.hdr && b.hdr.st; out.push(sb && sb.id && (!sa || sa.id !== sb.id) ? '머리말 스타일' : '머리말 조정'); }
    var lp = JSON.stringify(a.pc) !== JSON.stringify(b.pc) ? devLabel(a.pc, b.pc) : '', lm = JSON.stringify(a.mobile) !== JSON.stringify(b.mobile) ? devLabel(a.mobile, b.mobile) : '';
    if (lp && lm) { out.push(lp === lm ? lp + ' (PC·휴대폰)' : lp + ' (PC) · ' + lm + ' (휴대폰)'); }
    else if (lp) { out.push(lp + ' (PC)'); } else if (lm) { out.push(lm + ' (휴대폰)'); }
    return out.join(' · ') || '바꿈';
  }
  function pushAll() {
    var s = snapAll(), cur = state.H[state.Hi]; if (cur && cur.s === s) { state._lbl = null; return; }
    var lb = state._lbl || diffLabel(cur ? JSON.parse(cur.s) : null, JSON.parse(s)); state._lbl = null;
    state.H.length = state.Hi + 1; state.H.push({ s: s, label: lb, t: Date.now() });
    if (state.H.length > 200) { state.H.shift(); } state.Hi = state.H.length - 1;
    if (typeof autoSave === 'function') { autoSave(); } if (typeof histUI === 'function') { histUI(); }
  }
  function goHist(i) {
    if (!RESP || !state.H[i]) { return; }
    if (pushT) { clearTimeout(pushT); pushT = 0; pushAll(); if (!state.H[i]) { return; } }
    var o = JSON.parse(state.H[i].s); state.cfg.pc = o.pc; state.cfg.mobile = o.mobile; if (o.hdr !== undefined) { state.hdr = o.hdr; } if (o.imp) { state.imp = o.imp; } if (o.ed) { state.ed = o.ed; } if (o.site) { state.site = o.site; } if (typeof siteAll === 'function') { siteAll(); } if (typeof impApplyAll === 'function') { impApplyAll(); } if (typeof fxAll === 'function') { fxAll(); }
    state.Hi = i; setBase(); var c = C(); state.sel = Math.max(0, Math.min(state.sel || 0, ((c && c.blocks) || []).length - 1));
    renderAll(); build(); if (typeof refreshTB === 'function') { refreshTB(); } if (typeof histUI === 'function') { histUI(); } if (typeof hideKeep === 'function') { hideKeep(true); }
    msg('작업내역 ' + i + '번 "' + state.H[i].label + '" 상태로 돌아갔어요. 다시 앞으로 가려면 작업내역에서 아래 줄을 누르거나 Ctrl+Y.');
  }
  /* 글씨·사진·색은 다른 폭에도 같이(위치·크기는 지금 보는 폭만) */
  var SYNC_BLK = ['html', 'items', 'color', 'font', 'weight', 'italic', 'upper', 'link', 'fill', 'stroke', 'strokeColor', 'bg', 'bstyle', 'bcolor', 'bbg', 'bhover', 'opacity', 'tag'];
  var SYNC_BAND = ['text', 'color', 'bg', 'font', 'weight', 'italic', 'upper', 'on', 'stroke', 'opacity'];
  /* 4.3 사장님 "모든 건 모바일과 공유": 바꾼 값만 다른 폭에 따라감. 위치(x·y·폭)는 움직인 만큼, 크기·간격은 같은 비율로, 여백(px)은 폭에 맞춰 0.42배.
     휴대폰만 따로 두는 것: '📱 휴대폰일 때'(나눔 모양·높이), 움직임(휴대폰은 늘 없음), 사진 고정(fixed), 머리말 로고 자리 */
  var SYNC_BLK2 = ['align', 'pos', 'rotate', 'flipX', 'flipY', 'clipT', 'clipB', 'ls', 'lh', 'shadow', 'bdir'];
  var SYNC_BAND2 = ['speed', 'dir', 'pos', 'mode', 'ls', 'clipT', 'clipB', 'zone', 'fitZone'];
  function r1(v) { return Math.round(v * 10) / 10; }
  function syncBlkMore(y, x, t, k, oSplit) {
    SYNC_BLK2.forEach(function (key) { if (JSON.stringify(y[key]) !== JSON.stringify(x[key])) { t[key] = clone(x[key]); } });
    ['x', 'y', 'w'].forEach(function (key) { if (num(y[key]) !== num(x[key])) { t[key] = r1(num(t[key]) + num(x[key]) - num(y[key])); } });
    if (t.w != null) { t.w = Math.max(5, Math.min(100, num(t.w, 90))); }
    ['size', 'gap', 'bgPad', 'stroke'].forEach(function (key) { var o1 = num(y[key]), n1 = num(x[key]); if (o1 === n1) { return; } t[key] = (o1 > 0 && num(t[key]) > 0) ? Math.round(num(t[key]) * n1 / o1) : Math.round(n1 * k); if (key === 'size') { t.size = Math.max(8, t.size); } });
    if (y.area !== x.area) { t.area = (oSplit && oSplit.mode === 'full') ? 'main' : x.area; }
  }
  function syncMore(a, b, o, k, dev) {
    var ch = function (p, q) { return JSON.stringify(p) !== JSON.stringify(q); };
    var af = a.frame || {}, bf = b.frame || {}, of = o.frame = o.frame || {};
    ['t', 'r', 'b', 'l', 'radius'].forEach(function (key) { if (num(af[key]) !== num(bf[key])) { of[key] = Math.min(300, Math.round(num(bf[key]) * k)); } });
    if (ch(af.color, bf.color)) { of.color = bf.color; }
    var ao = a.overlay || {}, bo = b.overlay || {}, oo = o.overlay = o.overlay || {};
    Object.keys(bo).forEach(function (key) { if (ch(ao[key], bo[key])) { oo[key] = clone(bo[key]); } });
    var as = a.split || {}, bs = b.split || {}, os = o.split = o.split || {};
    ['sideType', 'sideColor', 'sideImg', 'sfx', 'sfy', 'sov', 'sovColor', 'sgrad', 'spad'].forEach(function (key) { if (ch(as[key], bs[key])) { os[key] = clone(bs[key]); } });
    if (num(as.gap) !== num(bs.gap)) { os.gap = Math.round(num(bs.gap) * k); }
    /* PC를 전체 화면으로 돌리면 휴대폰도 전체 화면(휴대폰일 때 칸이 사라지므로) */
    if (dev === 'pc' && bs.mode === 'full' && as.mode !== 'full' && os.mode !== 'full') { os.mode = 'full'; (o.blocks || []).forEach(function (x) { x.area = 'main'; }); }
    var ah = a.height || {}, bh = b.height || {}, oh = o.height = o.height || {};
    ['mode', 'vh', 'ratio'].forEach(function (key) { if (ch(ah[key], bh[key])) { oh[key] = clone(bh[key]); } });
    if (num(ah.px) !== num(bh.px)) { oh.px = Math.max(200, Math.round(num(bh.px) * k)); }
    if (num(a.pad) !== num(b.pad)) { o.pad = b.pad; }
    var am = a.media || {}, bm = b.media || {}, om = o.media = o.media || {};
    ['fx', 'fy', 'alt', 'slideSec'].forEach(function (key) { if (ch(am[key], bm[key])) { om[key] = clone(bm[key]); } });
  }
  /* 4.3 머리말: 높이·로고 크기는 같은 비율, 로고 왼쪽·아이콘 위아래는 움직인 만큼(휴대폰은 0.42배). 로고 자리(가운데)는 휴대폰 아이콘과 겹쳐서 PC만 */
  function syncHdr() {
    var h = state.hdr; if (!h || !h.pc || !h.mobile) { return; }
    var cur = JSON.stringify(h); if (!state._hlast) { state._hlast = cur; return; } if (cur === state._hlast) { return; }
    var a = JSON.parse(state._hlast), dv = state.dev === 'mobile' ? 'mobile' : 'pc', oth = dv === 'pc' ? 'mobile' : 'pc', ad = a[dv] || {}, nd = h[dv], od = h[oth], k = dv === 'pc' ? 0.42 : 1 / 0.42;
    var lim = { h: oth === 'mobile' ? [40, 120] : [60, 260], logoH: [8, oth === 'mobile' ? 40 : 80] };
    ['h', 'logoH'].forEach(function (key) { var o1 = num(ad[key]), n1 = num(nd[key]); if (o1 === n1) { return; } var v = (o1 > 0 && num(od[key]) > 0) ? num(od[key]) * n1 / o1 : n1 * k; od[key] = Math.round(Math.max(lim[key][0], Math.min(lim[key][1], v))); });
    ['logoX', 'iconY'].forEach(function (key) { var o1 = num(ad[key]), n1 = num(nd[key]); if (o1 === n1) { return; } od[key] = Math.round(num(od[key]) + (n1 - o1) * k); });
    if (ad.logoPos !== nd.logoPos) { od.logoPos = nd.logoPos; } /* 4.4 휴대폰 가운데 로고는 햄버거가 왼쪽으로 가서 안 겹침 */
    state._hlast = JSON.stringify(h);
  }
  /* 4.3 지금 PC 값을 휴대폰에 한 번에(위치·크기는 휴대폰 화면에 맞춘 것 그대로, 이후 PC에서 옮기면 같이 움직임) */
  function syncAllNow() {
    var p = state.cfg.pc, m = state.cfg.mobile; if (!p || !m) { return; } normBands(p); normBands(m);
    var k = 0.42, f = p.frame || {}, mf = m.frame = m.frame || {};
    ['t', 'r', 'b', 'l', 'radius'].forEach(function (key) { mf[key] = Math.min(300, Math.round(num(f[key]) * k)); }); mf.color = f.color || mf.color;
    m.overlay = clone(p.overlay || {});
    var ps = p.split || {}, ms = m.split = m.split || {};
    ['sideType', 'sideColor', 'sideImg', 'sfx', 'sfy', 'sov', 'sovColor', 'sgrad'].forEach(function (key) { if (ps[key] !== undefined) { ms[key] = clone(ps[key]); } });
    ms.gap = Math.round(num(ps.gap) * k); if (ps.mode === 'full') { ms.mode = 'full'; }
    var pb = p.blocks || [], mb = m.blocks = m.blocks || [];
    pb.forEach(function (x, i) {
      var t = mb[i];
      if (!t || t.type !== x.type) { var n = clone(x); n.id = (t && t.id) || newId(); n.size = Math.max(10, Math.round(num(x.size) * k)); n.gap = Math.round(num(x.gap) * 0.5); n.area = ms.mode === 'full' ? 'main' : x.area; mb[i] = n; return; }
      SYNC_BLK.concat(SYNC_BLK2).forEach(function (key) { if (x[key] !== undefined) { t[key] = clone(x[key]); } });
      t.area = ms.mode === 'full' ? 'main' : x.area;
    });
    mb.length = pb.length;
    var pB = p.bands || [], mB = m.bands || [];
    m.bands = pB.map(function (x, i) { var t = mB[i], n = clone(x); n.size = t ? num(t.size, Math.round(num(x.size) * k)) : Math.max(12, Math.round(num(x.size) * k)); if (t) { n.id = t.id; } else { n.id = newId(); } return n; });
    var pm = p.media || {}, mm = m.media = m.media || {};
    if (pm.src !== mm.src) { delete mm.sizes; delete mm.tall; }
    ['type', 'src', 'w', 'h', 'slides', 'video', 'poster', 'anim', 'alt', 'slideSec'].forEach(function (key) { if (pm[key] !== undefined) { mm[key] = clone(pm[key]); } });
    m.mainBg = p.mainBg;
    setBase(); state._lbl = 'PC 값으로 휴대폰 맞추기'; changed(false, true); pushAll(); renderAll(); build();
    msg('지금 PC 값(바깥 여백·모서리·어둡게·작은 칸 색·글씨·색·글꼴·정렬·띠·사진)을 휴대폰에 맞췄어요. 여백은 휴대폰 폭에 맞춰 줄였고, 글씨 위치·크기는 휴대폰 화면에 맞춘 그대로예요. 📱 휴대폰 창에서 확인하세요.');
  }
  function syncOther() {
    var dev = state.dev, oth = dev === 'pc' ? 'mobile' : 'pc', b = state.cfg[dev], o = state.cfg[oth];
    if (!state._last || !b || !o) { setBase(); return false; }
    var a = JSON.parse(state._last[dev] || 'null'); if (!a) { setBase(); return false; }
    var cur = JSON.stringify(b); if (cur === state._last[dev]) { return false; }
    var before = JSON.stringify(o), toMob = oth === 'mobile';
    var ab = a.blocks || [], bb = b.blocks || [], ob = o.blocks = o.blocks || [];
    var aIds = ab.map(function (x) { return x.id; }), bIds = bb.map(function (x) { return x.id; });
    var common = bIds.filter(function (id) { return aIds.indexOf(id) > -1; }).length;
    if (!ab.length || common || !bb.length) {
      /* 지운 칸: 같은 순서의 칸을 다른 폭에서도 지움 */
      for (var ri = ab.length - 1; ri >= 0; ri--) { if (bIds.indexOf(ab[ri].id) < 0 && ob[ri] && !ab[ri]._auto) { ob.splice(ri, 1); } } /* 저절로 만든 메뉴 칸(_auto)은 다른 폭이 스스로 만들고 지움(sideFill·sideUnfill) — 여기서 또 옮기면 메뉴 줄이 두 번 */
      /* 새 칸: 크기를 폭에 맞춰 줄이거나 키워서 추가 */
      bb.forEach(function (x) { if (aIds.indexOf(x.id) < 0 && !x._auto) { var n = clone(x); n.id = newId(); var k = toMob ? 0.42 : 1 / 0.42; n.size = Math.max(10, Math.round(num(n.size) * k)); n.gap = Math.round(num(n.gap) * (toMob ? 0.5 : 2)); ob.push(n); } });
      /* 바뀐 칸: 같은 순서 칸의 글씨·색·글꼴 등 */
      bb.forEach(function (x) { var ia = aIds.indexOf(x.id); if (ia < 0) { return; } var y = ab[ia], t = ob[ia]; if (!t || t.type !== x.type) { return; } SYNC_BLK.forEach(function (k) { if (JSON.stringify(y[k]) !== JSON.stringify(x[k])) { t[k] = clone(x[k]); } }); syncBlkMore(y, x, t, toMob ? 0.42 : 1 / 0.42, o.split); });
    }
    /* 흐르는 띠 */
    var aB = a.bands || [], bB = b.bands || [], oB = o.bands = o.bands || [];
    if (bB.length === aB.length) { bB.forEach(function (x, i) { var y = aB[i], t = oB[i]; if (!y || !t) { return; } SYNC_BAND.forEach(function (k) { if (JSON.stringify(y[k]) !== JSON.stringify(x[k])) { t[k] = clone(x[k]); } }); SYNC_BAND2.forEach(function (k) { if (JSON.stringify(y[k]) !== JSON.stringify(x[k])) { t[k] = clone(x[k]); } }); if (num(y.size) !== num(x.size) && num(y.size) > 0) { t.size = Math.max(10, Math.round(num(t.size || x.size * (toMob ? 0.42 : 2.4)) * num(x.size) / num(y.size))); } }); }
    else if (bB.length > aB.length) { bB.slice(aB.length).forEach(function (x) { var n = clone(x); n.id = newId(); if (toMob) { n.size = Math.max(12, Math.round(num(n.size) * 0.42)); } oB.push(n); }); }
    else { var bbIds = bB.map(function (x) { return x.id; }); for (var bi = aB.length - 1; bi >= 0; bi--) { if (bbIds.indexOf(aB[bi].id) < 0 && oB[bi]) { oB.splice(bi, 1); } } }
    /* 사진: 바꾸면 다른 폭도 같은 사진, 옛 사진용 크기별·세로 사진은 뺌 */
    var am = a.media || {}, bm = b.media || {}, om = o.media = o.media || {};
    if (am.src !== bm.src || am.type !== bm.type) {
      om.type = bm.type; om.src = bm.src; om.w = bm.w; om.h = bm.h;
      ['slides', 'video', 'poster', 'anim'].forEach(function (k) { if (bm[k] !== undefined) { om[k] = clone(bm[k]); } });
      var hadExtra = om.sizes || om.tall || bm.sizes || bm.tall; delete om.sizes; delete om.tall; delete bm.sizes; delete bm.tall;
      if (hadExtra) { state._syncMsg = '사진을 바꿔서, 옛 사진으로 만든 크기별·세로 사진 설정은 뺐어요. 필요하면 "③ 칸 꾸미기"에서 새 사진으로 다시 넣어 주세요.'; }
    } else {
      ['slides', 'video', 'poster', 'anim'].forEach(function (k) { if (JSON.stringify(am[k]) !== JSON.stringify(bm[k])) { om[k] = clone(bm[k]); } });
    }
    if (a.mainBg !== b.mainBg) { o.mainBg = b.mainBg; }
    syncMore(a, b, o, toMob ? 0.42 : 1 / 0.42, dev);
    setBase();
    if (JSON.stringify(o) !== before) {
      var od = oth === 'mobile' ? (isMobileSkin ? null : state.frame && state.frame.contentDocument) : (isMobileSkin ? null : document);
      if (od) { applyTo(od, o); }
      if (oth === 'pc') { var ld2 = lapDoc(); if (ld2) { applyTo(ld2, o); } }
      return true;
    }
    return false;
  }

  var P = document.createElement('div'); P.id = 'vthP';
  var css = document.createElement('style');
  css.textContent = '#vthP{position:fixed;top:0;right:0;width:400px;height:100vh;z-index:2147483000;background:#fff;color:#222;font:13px/1.45 "Noto Sans KR",sans-serif;box-shadow:-4px 0 24px rgba(0,0,0,.18);display:flex;flex-direction:column}' +
    '#vthP.min{height:44px;overflow:hidden}#vthP *{box-sizing:border-box}#vthP .hd{display:flex;flex-wrap:wrap;align-items:center;gap:5px;padding:8px 10px;background:#111;color:#fff}#vthP .hd b{flex:1 0 100%;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#vthP .hd button{white-space:nowrap;padding:4px 7px}' +
    '#vthP button{font:inherit;cursor:pointer;border:1px solid #ccc;background:#fff;border-radius:6px;padding:5px 9px;color:#222}#vthP button:hover{border-color:#c4001f}#vthP .hd button{background:#222;color:#fff;border-color:#444}#vthP button.on{background:#c4001f;color:#fff;border-color:#c4001f}' +
    '#vthP .mode{display:flex;gap:6px;padding:8px;background:#f3f3f3;border-bottom:1px solid #e5e5e5}#vthP .mode button{flex:1;padding:9px 6px;font-size:13px;font-weight:700}#vthP .presets button.on{outline:2px solid #c4001f}' +
    '#vthP .tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px;border-bottom:1px solid #eee}#vthP .tabs button{padding:5px 8px;font-size:12px}#vthP .bd{flex:1;overflow:auto;padding:10px 12px 40px}' +
    '#vthP .row{display:flex;align-items:center;gap:8px;margin:7px 0}#vthP .row>label{width:96px;flex:none;color:#555;font-size:12px}#vthP .row input[type=range]{flex:1}#vthP .row input[type=number]{width:62px}#vthP .row input[type=text],#vthP .row select,#vthP .row textarea{flex:1;min-width:0;padding:5px;border:1px solid #ccc;border-radius:5px;font:inherit}' +
    '#vthP h4{margin:14px 0 6px;font-size:13px;border-left:3px solid #c4001f;padding-left:6px}#vthP .tip{color:#888;font-size:11.5px;margin:4px 0 8px}#vthP .grid9{display:grid;grid-template-columns:repeat(3,26px);gap:3px}#vthP .grid9 button{width:26px;height:22px;padding:0}' +
    '#vthP .chips{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}#vthP .chips button{max-width:170px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#vthP .tb{display:flex;flex-wrap:wrap;gap:3px;margin:6px 0;padding:5px;background:#f6f6f6;border-radius:6px}#vthP .tb button,#vthP .tb select{padding:3px 6px;font-size:12px;min-width:28px}' +
    '#vthP .ed{min-height:70px;max-height:220px;overflow:auto;border:1px solid #bbb;border-radius:6px;padding:8px;background:#333;color:#fff}#vthP .presets{display:grid;grid-template-columns:1fr 1fr;gap:6px}#vthP .presets button{text-align:left;padding:8px}#vthP .presets small{display:block;color:#888}#vthP .lay{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:4px 0 8px}#vthP .lay button{padding:7px 2px;font-size:12px}' +
    '#vthP textarea.code{width:100%;height:140px;font:11px monospace}#vthP .ft{display:flex;gap:6px;padding:8px;border-top:1px solid #eee;flex-wrap:wrap}#vthP .ft button{flex:1}#vthP .msg{padding:6px 10px;font-size:12px;color:#0a7a2f;min-height:18px}' +
    '#vthFrameWrap{position:fixed;inset:0 400px 0 0;z-index:2147482999;background:rgba(20,20,20,.85);display:flex;align-items:center;justify-content:center}#vthFrameWrap iframe{width:390px;height:844px;max-height:94vh;border:10px solid #111;border-radius:36px;background:#fff}' +
    '#vthP select,#vthP input[type=text],#vthP input[type=number]{height:auto!important;min-height:28px;line-height:1.4!important;padding:4px 6px!important;font-size:12.5px!important;color:#222!important;background:#fff!important;border:1px solid #ccc!important;border-radius:5px!important;appearance:auto!important;-webkit-appearance:auto!important}#vthP input[type=color]{width:34px;height:28px;padding:0;border:1px solid #ccc}#vthP input[type=checkbox]{width:16px;height:16px;appearance:auto!important;-webkit-appearance:checkbox!important}#vthP label{display:block}' +
    '#vthP.left{right:auto;left:0}.vth-pl #vthFrameWrap{inset:0 0 0 400px}' +
    '#vthLapWrap .lapbox{position:relative}#vthLapWrap .lapload{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#999;background:#fff;font:14px "Noto Sans KR",sans-serif}#vthLapWrap{position:fixed;inset:0 400px 0 0;z-index:2147482999;background:rgba(20,20,20,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;gap:8px}#vthLapWrap .lapbox{flex:none;border:10px solid #111;border-radius:14px;background:#111;overflow:hidden}#vthLapWrap iframe{width:1366px;height:768px;border:0;background:#fff;transform-origin:0 0;display:block}#vthLapWrap .lapcap{color:#ccc;font:12px "Noto Sans KR",sans-serif}.vth-pl #vthLapWrap{inset:0 0 0 400px}html.vth-pop #vthLapWrap{inset:0!important}' +
    '@media (min-width:761px){html.vth-on body{margin-right:400px!important}html.vth-on.vth-pl body{margin-left:400px!important;margin-right:0!important}html.vth-on.vth-min body,html.vth-on.vth-pop body{margin:0!important}}' +
    'html.vth-pop #vthFrameWrap{inset:0!important}' +
    '#vthP .vthFV{margin-top:6px;padding:6px 8px;background:#fafafa;border:1px dashed #ddd;border-radius:6px}#vthP .vthFVh{font-size:11px;color:#666;margin-bottom:4px}' +
    '#vthP .pvsel{display:flex;flex-wrap:wrap;align-items:center;gap:3px;padding:5px 8px;background:#fafafa;border-bottom:1px solid #e5e5e5}#vthP .pvsel b{font-size:11px;color:#666;margin-right:2px}#vthP .pvsel i{flex:1}#vthP .pvsel button{padding:3px 6px;font-size:11px;line-height:1.3;border-radius:5px}#vthP .pvsel button.on{background:#111;color:#fff;border-color:#111}' +
    '#vthPv{position:fixed;inset:0 400px 0 0;z-index:2147482990;background:#d9d9d9;display:none;flex-direction:column;font:12px/1.4 "Noto Sans KR",sans-serif}.vth-pl #vthPv{inset:0 0 0 400px}html.vth-pop #vthPv{inset:0!important}#vthPv .pvb{display:flex;align-items:center;gap:6px;padding:6px 10px;background:#111;color:#fff;min-height:34px;box-sizing:border-box}#vthPv .pvs{font-weight:700;white-space:nowrap}#vthPv .pvg{color:#aaa;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}#vthPv .pvb button{font:inherit;cursor:pointer;background:#2a2a2a;color:#fff;border:1px solid #444;border-radius:6px;padding:4px 9px;white-space:nowrap}#vthPv .pvb button:hover{background:#c4001f}#vthPv .pva{position:relative;flex:1;overflow:hidden}#vthPv iframe{position:absolute;top:8px;border:0;background:#fff;transform-origin:0 0;box-shadow:0 2px 14px rgba(0,0,0,.25)}#vthPv .pvl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#555;font-size:14px;z-index:2;background:rgba(217,217,217,.8);text-align:center;padding:20px}' +
    '@media (max-width:760px){#vthP{top:auto;bottom:0;width:100%;height:55vh}#vthFrameWrap,#vthPv{inset:0 0 55vh 0}}';
  css.textContent += '#vthP .vthShp{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:0 0 6px}#vthP .vthShp button{padding:6px 3px;font-size:11.5px}#vthP .vthLow{display:flex;align-items:center;gap:5px;padding:5px 0;border-bottom:1px solid #f0f0f0}#vthP .vthLow button{padding:2px 7px}#vthP .vthLow input[type=color]{width:30px;height:24px;padding:0;border:1px solid #ccc}#vthP .mode.cats{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:6px 8px}#vthP .mode.cats button{padding:6px 2px;font-size:11.5px;line-height:1.25}#vthP .vthFT{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:0 0 8px}#vthP .vthFT button{padding:6px 2px;font-size:11.5px;line-height:1.25}#vthP .bd{overflow-x:hidden}#vthP .top{display:flex;gap:6px;padding:8px 8px 0;background:#111}#vthP .top button{flex:1;padding:9px 6px;font-size:13px;font-weight:800;border-radius:8px 8px 0 0;background:#2a2a2a;color:#ddd;border:0}#vthP .top button.on{background:#f3f3f3;color:#111;outline:0}' +
    '#vthP .vthC.vthCur{outline:3px solid #1a6dff;outline-offset:1px;border-radius:6px}#vthP .vthC.vthPk>button{box-shadow:inset 0 0 0 2px #0a7a2f}#vthP .vthC.vthPk::after{content:"✓ 고름";position:absolute;right:24px;top:3px;z-index:2;background:#0a7a2f;color:#fff;font-size:10px;line-height:1;padding:3px 5px;border-radius:4px;pointer-events:none}#vthP .vthC{position:relative}#vthP .vthC>button{width:100%;height:100%}#vthP .vthX{position:absolute;top:2px;right:2px;z-index:2;background:rgba(255,255,255,.92);border-radius:4px;padding:1px 3px;line-height:1;cursor:pointer}#vthP .vthX input{margin:0;width:15px;height:15px;cursor:pointer}' +
    '#vthP .vthDB{display:flex;gap:5px;margin:2px 0 8px}#vthP .vthDB button{flex:1;padding:6px 4px;font-size:12px}#vthP .vthDel:not([disabled]){border-color:#c4001f;color:#c4001f;font-weight:700}#vthP .vthDelBox{background:#fafafa;border:1px dashed #ccc;border-radius:6px;padding:8px;margin:0 0 10px}#vthP .vthDelRow{display:flex;align-items:center;gap:6px;padding:3px 0}#vthP .vthDelRow span{flex:1;font-size:12px}' +
    '#vthP .vthI{border:1px solid #e3e3e3;border-radius:8px;padding:8px 30px 8px 8px;margin:0 0 6px;background:#fff}#vthP .vthI.on{border-color:#c4001f;background:#fff7f8}#vthP .vthIh{display:flex;align-items:center;gap:6px}#vthP .vthT{padding:3px 8px;font-size:12px;font-weight:700;white-space:nowrap}#vthP .vthT.on{background:#c4001f;color:#fff;border-color:#c4001f}#vthP .vthT[disabled]{opacity:.45;cursor:not-allowed}#vthP .vthIh b{font-size:13px}#vthP .vthIb{font-size:11px;padding:1px 6px;border-radius:9px;background:#eee;color:#666;white-space:nowrap}#vthP .vthI.on .vthIb{background:#c4001f;color:#fff}#vthP .vthIb-no{background:#555;color:#fff}#vthP .vthId p{margin:4px 0;font-size:12px;color:#444}#vthP .vthId i{font-style:normal;font-weight:700;color:#111;margin-right:4px}#vthP .vthIno{color:#c4001f!important}#vthP .vthIwip{color:#8a6d00!important}';
  document.head.appendChild(css);
  css.textContent += '#vthP .hd b{flex:1 1 auto;min-width:0}#vthP .hd2 b{font-size:13px}#vthP .hd2 .hmore{display:none;flex:1 0 100%;flex-wrap:wrap;align-items:center;gap:5px;padding-top:7px;margin-top:2px;border-top:1px solid #333}#vthP.hm .hd2 .hmore{display:flex}#vthP .hd2 .hmore span{font-size:11px;color:#aaa;margin:0 1px 0 3px}#vthP.min .hd2 .hmore{display:none}#vthP .tabs:empty{display:none}#vthP .vthFT{display:flex;flex-wrap:wrap}#vthP .vthFT button{flex:1 1 auto;padding:6px 8px;white-space:nowrap}' +
    '#vthP .mode.cats{display:flex;flex-wrap:wrap}#vthP .mode.cats button{flex:1 1 auto;padding:6px 8px;white-space:nowrap}' +
    '#vthP .pvsel{gap:4px;padding:6px 8px}#vthP .pvsel b{margin-right:3px}#vthP .pvsel .pvpg{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#666}#vthP .pvsel select{font:inherit;font-size:11px;padding:2px 4px;border:1px solid #ccc;border-radius:5px;background:#fff;color:#222}' +
    '#vthP .tipc{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;cursor:pointer}#vthP .tipc.open{display:block}' +
    '#vthP .vthDB{justify-content:flex-end;gap:4px;margin:0 0 6px}#vthP .vthDB button{flex:0 0 auto;padding:3px 9px;font-size:11px;border-radius:999px;color:#555}' +
    '#vthP .vthHr{display:flex;align-items:center;gap:8px;margin:12px 0 8px;font-size:11px;color:#888}#vthP .vthHr::after{content:"";flex:1;height:1px;background:#e5e5e5}' +
    '@media (max-width:760px){#vthP .vthDB button{padding:7px 11px;font-size:12px}#vthP .pvsel button{padding:6px 9px}#vthP .pvsel select{padding:5px 6px;font-size:12px}html.vth-on #vthT:not(.moved){left:50%;bottom:calc(55vh + 8px);max-width:calc(100vw - 12px);overflow-x:auto}html.vth-on #vthT:not(.moved)>*{flex-shrink:0}html.vth-on.vth-min #vthT:not(.moved){bottom:52px}}'; /* 6.8 인터페이스 정리 */
  document.body.appendChild(P);
  document.documentElement.classList.add('vth-on');

  var HD2 = RESP && !isMobileSkin; /* 6.8: 한 줄 머리 — 자주 안 쓰는 따로 창·편집 칸 옮기기는 「⋯ 더보기」 안 */
  P.innerHTML = '<div class="hd' + (HD2 ? ' hd2' : '') + '"><b>' + (HD2 ? '편집기' : SH.KO + ' 편집기') + '</b>' +
    (HD2 ? '<button data-a="dev-pc" title="PC 폭 설정을 고치기(이 화면)">✏️PC</button><button data-a="dev-mobile" title="휴대폰 폭 설정만 따로 고치기(휴대폰 창에서 보임, PC 화면은 그대로)">✏️휴대폰</button><button data-a="undo" title="되돌리기">↶</button><button data-a="redo" title="다시하기">↷</button><button data-a="more" title="따로 창으로 보기 · 편집 칸 옮기기">⋯ 더보기</button><button data-a="min" title="접기">_</button>' +
      '<div class="hmore"><span>따로 창으로 보기</span><button data-a="win-pc" title="PC 큰 화면(1920×1080) 창 켜기/끄기 — 다른 모니터로 옮길 수 있어요">🖥 PC</button><button data-a="win-lap" title="노트북 화면(1366×768) 창 켜기/끄기">💻 노트북</button><button data-a="win-mob" title="휴대폰 화면(390×844) 창 켜기/끄기">📱 휴대폰</button><span>편집 칸</span><button data-a="pop" title="편집 칸을 따로 띄우기 / 다시 붙이기">⧉ 따로 띄우기</button><button data-a="side" title="편집 칸을 왼쪽/오른쪽으로 옮기기">⇄ 왼쪽·오른쪽</button></div></div>'
      : (isMobileSkin ? '' : '<button data-a="dev-pc">PC</button><button data-a="dev-mobile">모바일</button>') +
    '<button data-a="pop" title="편집창을 따로 띄우기 / 다시 붙이기">⧉ 따로</button><button data-a="side" title="패널을 왼쪽/오른쪽으로 옮기기">⇄</button><button data-a="undo" title="되돌리기">↶</button><button data-a="redo" title="다시하기">↷</button><button data-a="min" title="접기">_</button></div>') +
    (RESP ? '<div class="top"><button data-a="top-design">' + SH.KO + ' 디자인 편집기</button><button data-a="top-imp">기능개선</button></div>' : '') +
    (RESP ? '<div class="mode cats">' + [['site', '1 전체'], ['hdr', '2 머리말'], ['drawer', '3 ☰ 메뉴'], ['main', '4 메인 첫 화면'], ['mainlow', '5 메인 아래'], ['list', '6 상품목록'], ['search', '7 검색'], ['detail', '8 상품상세'], ['board', '9 게시판'], ['foot', '10 하단']].map(function (x) { return '<button data-a="mode-' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div><div class="pvsel"><b>보는 폭</b>' + [['pc', '🖥 PC', 1440], ['lap', '💻 노트북', 1024], ['mob', '📱 휴대폰', 390]].map(function (x) { return '<button data-a="pvz-' + x[0] + '" title="편집 화면을 ' + x[2] + 'px 폭으로 보기">' + x[1] + '</button>'; }).join('') + '<i></i><label class="pvpg">보는 화면 <select data-pvpg="1" title="이 대분류는 모든 화면에 들어가요. 다른 화면에서는 어떻게 보이는지 골라 보세요.">' + [['main', '메인'], ['list', '상품목록'], ['detail', '상품상세'], ['search', '검색'], ['board', '게시판'], ['cart', '장바구니']].map(function (x) { return '<option value="' + x[0] + '">' + x[1] + '</option>'; }).join('') + '</select></label></div>' : '<div class="mode"><button data-a="mode-main">메인 첫 화면</button><button data-a="mode-hdr">머리말 (맨 위 로고·메뉴 줄)</button></div>') +
    '<div class="tabs"></div><div class="bd"></div><div class="msg"></div>' +
    '<div class="ft"><button data-a="save" class="on">' + (WEB ? '웹에 저장 (어디서나 이어서)' : '카페24에 바로 저장') + '</button><button data-a="copy">코드 복사</button></div>';
  var TABS = [['layout', '① 화면 방식'], ['style', '② 스타일'], ['area', '③ 칸 꾸미기'], ['text', '④ 글씨·버튼'], ['marquee', '흐르는 띠'], ['fx', '효과'], ['hdr', '머리말'], ['done', '완성']];
  var tabsEl = P.querySelector('.tabs'), bd = P.querySelector('.bd'), msgEl = P.querySelector('.msg');
  function askOK(m) { var w = (P.ownerDocument && P.ownerDocument.defaultView) || window; return w.confirm(m); }
  /* 편집창 따로 띄우기: 패널을 새 창으로 옮겨 사이트를 가리지 않게 함 */
  var popWin = null;
  function popOut() {
    if (popWin && !popWin.closed) { popWin.close(); return; }
    var w = window.open('', 'vthPanel', 'width=440,height=' + Math.min(980, screen.availHeight - 40) + ',left=' + Math.max(0, screen.availWidth - 460) + ',top=20');
    if (!w) { msg('새 창이 막혔습니다. 주소창 오른쪽의 팝업 차단 아이콘을 눌러 허용해 주세요.', 1); return; }
    popWin = w;
    var d = w.document;
    d.open(); d.write('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>메인 첫 화면 편집 (' + SH.KO + ')</title></head><body style="margin:0;background:#fff"></body></html>'); d.close();
    [css, tcss].forEach(function (s) { var c2 = d.createElement('style'); c2.textContent = s.textContent; d.head.appendChild(c2); });
    var fx = d.createElement('style');
    fx.textContent = '#vthP{position:static!important;width:100%!important;height:100vh!important;box-shadow:none!important}#vthP .hd button[data-a=side],#vthP .hd button[data-a=min]{display:none}';
    d.head.appendChild(fx);
    d.body.appendChild(P);
    document.documentElement.classList.add('vth-pop');
    P.querySelector('[data-a=pop]').textContent = '⧉ 붙이기';
    d.addEventListener('keydown', function (e) { if (VTH._onKey) { VTH._onKey(e); } });
    w.addEventListener('pagehide', dock);
    msg('편집창을 따로 띄웠습니다. 창을 닫거나 "⧉ 붙이기"를 누르면 다시 사이트 옆에 붙습니다.');
  }
  function dock() {
    if (P.ownerDocument === document) { return; }
    document.body.appendChild(P);
    document.documentElement.classList.remove('vth-pop');
    P.querySelector('[data-a=pop]').textContent = '⧉ 따로';
    popWin = null; msg('편집창을 다시 붙였습니다.');
  }
  window.addEventListener('pagehide', function () { if (popWin && !popWin.closed) { popWin.close(); } });
  function msg(t, bad) { msgEl.textContent = t; msgEl.style.color = bad ? '#c4001f' : '#0a7a2f'; }

  function row(label, el, tp) { var r = document.createElement('div'); r.className = 'row'; var l = document.createElement('label'); l.textContent = label; r.appendChild(l); r.appendChild(el); if (tp) { r.title = tp; } return r; }
  function rng(obj, key, min, max, step, cssOnly) {
    var w = document.createElement('span'); w.style.cssText = 'display:flex;flex:1;gap:6px;align-items:center';
    var a = document.createElement('input'); a.type = 'range'; a.min = min; a.max = max; a.step = step || 1; a.value = num(obj[key]);
    var b = document.createElement('input'); b.type = 'number'; b.min = min; b.max = max; b.step = step || 1; b.value = num(obj[key]);
    a.oninput = function () { b.value = a.value; obj[key] = num(a.value); changed(cssOnly !== false); };
    b.oninput = function () { a.value = b.value; obj[key] = num(b.value); changed(cssOnly !== false); };
    w.appendChild(a); w.appendChild(b); return w;
  }
  function sel(obj, key, opts, after, cssOnly) {
    var s = document.createElement('select');
    opts.forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (String(obj[key]) === String(o[0])) { op.selected = true; } s.appendChild(op); });
    s.onchange = function () { var v = s.value; obj[key] = /^-?\d+(\.\d+)?$/.test(v) ? num(v) : v; changed(!!cssOnly); if (after) { after(); } };
    return s;
  }
  function chk(obj, key, after, cssOnly) {
    var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!obj[key];
    c.onchange = function () { obj[key] = c.checked; changed(!!cssOnly); if (after) { after(); } }; return c;
  }
  function txt(obj, key, ph, after) {
    var t = document.createElement('input'); t.type = 'text'; t.value = obj[key] || ''; if (ph) { t.placeholder = ph; }
    t.onchange = function () { obj[key] = t.value; changed(false); if (after) { after(); } }; return t;
  }
  function col(obj, key, allowNone) {
    var w = document.createElement('span'); w.style.cssText = 'display:flex;gap:6px;align-items:center;flex:1';
    var c = document.createElement('input'); c.type = 'color'; c.value = /^#[0-9a-f]{6}$/i.test(obj[key]) ? obj[key] : '#000000';
    var t = document.createElement('input'); t.type = 'text'; t.value = obj[key] || ''; t.style.width = '84px'; t.placeholder = allowNone ? '없음' : '';
    c.oninput = function () { obj[key] = c.value; t.value = c.value; changed(true); };
    t.onchange = function () { obj[key] = t.value.trim(); if (/^#[0-9a-f]{6}$/i.test(obj[key])) { c.value = obj[key]; } changed(true); };
    w.appendChild(c); w.appendChild(t);
    if (allowNone) { var x = document.createElement('button'); x.textContent = '없음'; x.onclick = function () { obj[key] = ''; t.value = ''; changed(true); }; w.appendChild(x); }
    return w;
  }
  function imgField(obj, key, after) {
    var w = document.createElement('span'); w.style.cssText = 'display:flex;gap:6px;flex:1;flex-wrap:wrap';
    var t = txt(obj, key, '/web/upload/... 사진 주소', after); t.style.minWidth = '160px';
    if (key === 'src') { t.addEventListener('change', function () { if (obj.src) { measureOne(obj, obj.src).then(function () { changed(false); }); } }); } /* 3.2: 주소를 직접 넣어도 실제 크기로 */
    var up = document.createElement('button'); up.textContent = '사진 올리기';
    up.onclick = function () { pickUpload(function (url, wh) { obj[key] = url; t.value = url; if (wh && key === 'src') { obj.w = wh[0]; obj.h = wh[1]; } changed(false); if (after) { after(); } }); };
    var rm = document.createElement('button'); rm.textContent = '사진 빼기'; rm.title = '사진을 빼고 배경색만 쓰기 (Ctrl+Z로 되돌리기)';
    rm.onclick = function () {
      obj[key] = ''; t.value = '';
      if (key === 'sideImg') { obj.sideType = 'color'; }
      if (key === 'src' && obj.type === 'image') { obj.type = 'none'; }
      changed(false); build(); msg('사진을 뺐습니다. 이제 배경색만 보입니다. 배경색은 바로 아래에서 고르세요. (Ctrl+Z = 되돌리기)');
    };
    w.appendChild(t); w.appendChild(up); w.appendChild(rm); return w;
  }
  function h4(t) { var h = document.createElement('h4'); h.textContent = t; return h; }
  function tip(t) { var d = document.createElement('div'); d.className = 'tip'; d.textContent = t; if (String(t).length > 62 && String(t).charAt(0) !== '⚠') { d.className = 'tip tipc'; d.title = '눌러서 전체 보기'; d.onclick = function () { d.classList.toggle('open'); }; } return d; } /* 6.8: 긴 설명은 두 줄만 보이고 누르면 전체(⚠ 경고는 늘 전체) */
  var FONT_OPTS = FONTS.map(function (f) { return [f[0], f[1]]; });
  var WEIGHTS = [[100, '아주 얇게 100'], [300, '얇게 300'], [400, '보통 400'], [500, '조금 굵게 500'], [600, '600'], [700, '굵게 700'], [800, '800'], [900, '아주 굵게 900']];

  /* 움직이는 WebP/GIF는 줄이면 움직임이 사라지므로 그대로 올림 */
  function pickRaw(cb) {
    var f = (P.ownerDocument || document).createElement('input'); f.type = 'file'; f.accept = 'image/webp,image/gif';
    f.onchange = function () {
      var file = f.files[0]; if (!file) { return; }
      msg('움직이는 사진을 올리는 중… (' + Math.round(file.size / 1024) + 'KB)');
      var fd = new FormData(); fd.append('key', 'vth' + Date.now()); fd.append('image', file, 'vth_anim_' + Date.now() + '.' + (/gif/.test(file.type) ? 'gif' : 'webp'));
      fetch('/exec/admin/editor/uploadimage', { method: 'POST', body: fd, credentials: 'include' }).then(function (r) { return r.text(); }).then(function (t) {
        var m = t.match(/"(\\\/web\\\/upload[^"]+)"/); if (!m) { throw new Error('no'); }
        msg('올렸습니다 (' + Math.round(file.size / 1024) + 'KB)'); cb(m[1].replace(/\\\//g, '/'));
      }).catch(function () { msg('올리기가 안 됩니다. 관리자 로그인 상태인지, 파일이 너무 크지 않은지 확인해 주세요.', 1); });
    };
    f.click();
  }
  function pickUpload(cb) {
    var f = (P.ownerDocument || document).createElement('input'); f.type = 'file'; f.accept = 'image/*';
    f.onchange = function () {
      var file = f.files[0]; if (!file) { return; }
      msg('사진을 줄이고 올리는 중…');
      var img = new Image(), rd = new FileReader();
      rd.onload = function () { img.src = rd.result; };
      img.onload = function () {
        var max = state.dev === 'mobile' ? 1300 : 2400, sc = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement('canvas'); cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        cv.toBlob(function (blob) {
          var fd = new FormData(); fd.append('key', 'vth' + Date.now()); fd.append('image', blob, 'vth_' + Date.now() + '.webp');
          fetch('/exec/admin/editor/uploadimage', { method: 'POST', body: fd, credentials: 'include' }).then(function (r) { return r.text(); }).then(function (t) {
            var m = t.match(/"(\\\/web\\\/upload[^"]+)"/);
            if (!m) { throw new Error('no'); }
            var url = m[1].replace(/\\\//g, '/');
            msg('올렸습니다 (' + Math.round(blob.size / 1024) + 'KB, ' + cv.width + 'x' + cv.height + ')');
            cb(url, [cv.width, cv.height]);
          }).catch(function () { msg('바로 올리기가 안 됩니다. 카페24 관리자에 로그인한 상태로, 미리보기 주소(' + SH.key + '.cafe24.com)에서 열어 주세요. 또는 사진 주소를 직접 넣어 주세요.', 1); });
        }, 'image/webp', 0.8);
      };
      rd.readAsDataURL(file);
    };
    f.click();
  }

  /* ---------- 스타일 (11/09 v2: 화면 방식 먼저 → 맞는 스타일) ---------- */
  function B(o) { return baseBlock(o); }
  function S(o) { o.area = 'side'; return baseBlock(o); }
  function its(c) {
    var bb = (c.blocks || []).filter(function (x) { return x.type === 'buttons' && (x.items || []).length; })[0];
    if (bb) { return clone(bb.items); }
    if (SH.items) { return clone(SH.items); }
    var db = VTH.defaults('pc').blocks.filter(function (x) { return x.type === 'buttons'; })[0];
    return db ? clone(db.items) : [];
  }
  function itm(c, t) { var a = its(c); for (var i = 0; i < a.length; i++) { if (String(a[i].t).toUpperCase() === t) { return a[i].u; } } return ''; }
  function ov(c, a, g, col) { c.overlay = { amount: a, color: col || '#000000', grad: g || 'none' }; }
  function sideColor(c, col) { c.split.sideType = 'color'; c.split.sideColor = col; }
  function sidePhoto(c, dark) { c.split.sideType = 'image'; if (!c.split.sideImg) { c.split.sideImg = c.media.src; } c.split.sov = dark || 0; }
  function factors(c) {
    var sp = c.split || {}, r = num(sp.ratio, 80) / 100, st = !!sp.stack;
    return {
      st: st, pad: num(c.pad, 5),
      fm: st ? Math.min(1, r * 1.25) : Math.max(0.4, Math.min(1, r * 1.1)),
      fs: st ? Math.min(1, (1 - r) * 2.5) : Math.max(0.4, Math.min(1, (1 - r) * 1.1))
    };
  }
  function fitSplit(c) {
    if (!c.split || c.split.mode === 'full') { return c; }
    var k = factors(c);
    c.blocks.forEach(function (b) {
      var f = b.area === 'side' ? k.fs : k.fm;
      b.size = Math.max(12, Math.round(b.size * f)); b.gap = Math.round(num(b.gap) * f);
      if (k.st && b.area === 'side') { if (b.bdir === 'col') { b.bdir = 'row'; } if (Math.abs(num(b.rotate)) >= 45) { b.rotate = 0; } }
    });
    if (c.marquee) { c.marquee.size = Math.round(c.marquee.size * k.fm); }
    return c;
  }
  function addBandsIfNone(c, arr) {
    normBands(c);
    if (c.bands.length) { return; }
    arr.forEach(function (o) { var b = bandOf(o); if (c.device === 'mobile') { b.size = Math.max(12, Math.round(b.size * 0.42)); } c.bands.push(b); });
  }
  function fresh(c) {
    c.frame = { t: 0, r: 0, b: 0, l: 0, color: (c.frame && c.frame.color) || '#ffffff', radius: 0 };
    c.marquee.on = false; normBands(c);
    if (c.media.type === 'video' && !c.media.video) { c.media.type = 'image'; }
    return c;
  }

  /* [id, 이름, 설명, 만들기, 'full'|'split'] — 글씨 크기는 PC 기준. 나눈 화면은 칸 너비에 맞춰 자동으로 줄어듦 */
  var PRESETS = [
    /* ===== 전체 화면 ===== */
    ['base', '지금 메인 그대로', '처음 상태', function (c) { var d = VTH.defaults(c.device); d.skinNo = c.skinNo; d.mobilePreview = c.mobilePreview; d.mobileSkinNo = c.mobileSkinNo; d.media = c.media; d.split = c.split; d.bands = c.bands || []; return d; }, 'full'],
    ['edit', '편집샵', '큰 이탤릭 세리프 대각선', function (c) {
      ov(c, 18);
      c.blocks = [B({ tag: 'h2', html: 'vintage<br><i>edit</i>', pos: 'ml', x: 2, y: -6, font: 'Playfair Display', italic: true, size: 170, weight: 400, ls: -40, lh: 0.95, rotate: -6, align: 'left' }),
        B({ tag: 'p', html: 'UP TO 90% SALE — 매주 새로운 상품', pos: 'br', font: 'Inter', size: 14, ls: 300, upper: 'uppercase', align: 'right' }),
        B({ type: 'buttons', pos: 'bl', font: 'Inter', size: 15, weight: 600, ls: 120, bstyle: 'underline', gap: 30, align: 'left', items: its(c) })];
      return c;
    }, 'full'],
    ['mag', '매거진', '잡지 표지처럼 위아래', function (c) {
      ov(c, 35, 'bottom');
      c.blocks = [B({ tag: 'h2', html: 'VINTAGE', pos: 'tc', y: 2, font: 'Bodoni Moda', size: 230, weight: 900, ls: -30, lh: 1, clipB: 10 }),
        B({ tag: 'p', html: 'UP TO <b>90%</b> SALE', pos: 'bc', y: -14, font: 'Bodoni Moda', italic: true, size: 46, ls: 20 }),
        B({ type: 'buttons', pos: 'bc', y: -6, font: 'Inter', size: 14, weight: 600, ls: 200, gap: 40, items: its(c) })];
      return c;
    }, 'full'],
    ['mini', '미니멀', '작은 글씨 한 줄, 사진 강조', function (c) {
      ov(c, 0);
      c.blocks = [B({ tag: 'h2', html: 'New arrivals every week', pos: 'bl', font: 'Inter', size: 22, weight: 300, ls: 40, align: 'left' }),
        B({ type: 'buttons', pos: 'br', font: 'Inter', size: 14, weight: 500, ls: 150, gap: 26, align: 'right', items: its(c) })];
      return c;
    }, 'full'],
    ['sale', '세일 강조', '큰 90% SALE + 흐르는 띠', function (c) {
      ov(c, 25);
      c.blocks = [B({ tag: 'h2', html: 'UP TO<br><span style="color:#c4001f">90%</span> SALE', pos: 'mc', y: -6, font: 'Anton', size: 200, ls: 0, lh: 1 }),
        B({ type: 'buttons', pos: 'mc', y: 22, font: 'Inter', size: 16, weight: 700, ls: 120, bstyle: 'outline', gap: 18, items: its(c) })];
      addBandsIfNone(c, [{ mode: 'over', pos: 'bottom', text: 'SALE  SALE  SALE  SALE', font: 'Libre Caslon Text', size: 140, ls: -90, clipT: 12, clipB: 18 }]);
      return c;
    }, 'full'],
    ['season', '시즌 오프', '빨간 큰 숫자 + 띠', function (c) {
      ov(c, 30);
      c.blocks = [B({ tag: 'p', html: 'SEASON OFF', pos: 'mc', y: -17, font: 'Oswald', size: 40, weight: 500, ls: 400 }),
        B({ tag: 'h2', html: '~90%', pos: 'mc', y: -1, font: 'Anton', size: 260, color: '#c4001f', lh: 1 }),
        B({ type: 'buttons', pos: 'mc', y: 19, font: 'Oswald', size: 18, weight: 500, ls: 200, gap: 36, items: its(c) })];
      addBandsIfNone(c, [{ mode: 'zone', pos: 'bottom', zone: 8, bg: '#c4001f', text: 'SEASON OFF  ·  SEASON OFF  ·  ', font: 'Oswald', weight: 500, ls: 100 }]);
      return c;
    }, 'full'],
    ['poster', '레트로 포스터', '색 띠 위의 굵은 대문자', function (c) {
      ov(c, 15);
      c.blocks = [B({ tag: 'h2', html: 'VINTAGE', pos: 'mc', y: -10, font: 'Bebas Neue', size: 180, ls: 60, lh: 1, bg: '#c4001f', bgPad: 6 }),
        B({ tag: 'p', html: 'UP TO 90% SALE', pos: 'mc', y: 5, font: 'Bebas Neue', size: 70, ls: 200, lh: 1, bg: '#111111', bgPad: 8 }),
        B({ type: 'buttons', pos: 'mc', y: 19, font: 'Inter', size: 15, weight: 800, ls: 150, bstyle: 'solid', bbg: '#ffffff', bcolor: '#111111', bhover: '#ffffff', gap: 12, items: its(c) })];
      return c;
    }, 'full'],
    ['street', '스트릿', '아래쪽 거대한 글씨 + 알약 버튼', function (c) {
      ov(c, 20, 'bottom');
      c.blocks = [B({ tag: 'h2', html: 'VINTAGE', pos: 'bl', x: -2, y: 6, font: 'Anton', size: 320, ls: -20, lh: 1, clipB: 12, align: 'left' }),
        B({ tag: 'p', html: 'NEW DROP<br>EVERY WEEK', pos: 'tr', font: 'Archivo', size: 18, weight: 800, ls: 100, lh: 1.2, align: 'right' }),
        B({ type: 'buttons', pos: 'br', y: -4, font: 'Archivo', size: 14, weight: 800, ls: 80, bstyle: 'pill', bbg: '#ffffff', bcolor: '#111111', bhover: '#ffffff', gap: 10, align: 'right', items: its(c) })];
      return c;
    }, 'full'],
    ['label', '빈티지 라벨', '우아한 이탤릭 + 테두리 버튼', function (c) {
      ov(c, 28);
      c.blocks = [B({ tag: 'h2', html: 'Vintage Clothing', pos: 'mc', y: -6, font: 'Cormorant Garamond', size: 140, weight: 500, italic: true, ls: -10, lh: 1 }),
        B({ tag: 'p', html: '— curated every week —', pos: 'mc', y: 6, font: 'Cormorant Garamond', size: 28, italic: true, ls: 60 }),
        B({ type: 'buttons', pos: 'mc', y: 17, font: 'Inter', size: 13, weight: 600, ls: 250, bstyle: 'outline', gap: 14, items: its(c) })];
      return c;
    }, 'full'],
    ['boutique', '고급 부티크', '작은 세리프, 넓은 간격', function (c) {
      ov(c, 45, 'bottom');
      c.blocks = [B({ tag: 'h2', html: SH.En, pos: 'bc', y: -15, font: 'EB Garamond', size: 96, weight: 400, ls: 60 }),
        B({ tag: 'p', html: 'CURATED SECOND-HAND CLOTHING', pos: 'bc', y: -10, font: 'Inter', size: 12, weight: 400, ls: 450 }),
        B({ type: 'buttons', pos: 'bc', y: -3, font: 'EB Garamond', size: 20, italic: true, ls: 40, bstyle: 'underline', gap: 40, items: its(c) })];
      return c;
    }, 'full'],
    ['korean', '한글 감성', '마루부리 한글 제목', function (c) {
      ov(c, 30, 'right');
      c.blocks = [B({ tag: 'h2', html: '오래 입을수록<br>더 멋진 옷', pos: 'ml', x: 3, y: -4, font: 'MaruBuri', size: 92, weight: 700, ls: -30, lh: 1.25, align: 'left' }),
        B({ tag: 'p', html: SH.KO + ' · 매주 새로운 상품', pos: 'ml', x: 3, y: 12, font: 'Pretendard', size: 18, ls: 0, align: 'left' }),
        B({ type: 'buttons', pos: 'bl', x: 3, font: 'Pretendard', size: 16, weight: 600, ls: 80, bstyle: 'underline', gap: 28, align: 'left', items: its(c) })];
      return c;
    }, 'full'],
    ['leftgrad', '왼쪽 어둡게', '왼쪽 그늘 + 왼쪽 글씨', function (c) {
      ov(c, 75, 'left');
      c.blocks = [B({ tag: 'h2', html: 'UP TO<br>90% SALE', pos: 'ml', x: 2, y: -8, font: 'Playfair Display', size: 120, weight: 700, ls: -10, lh: 1.05, align: 'left' }),
        B({ tag: 'p', html: '매주 새로운 상품 업데이트!', pos: 'ml', x: 2, y: 9, font: 'Noto Sans KR', size: 20, ls: -20, align: 'left' }),
        B({ type: 'buttons', pos: 'ml', x: 2, y: 18, font: 'Inter', size: 14, weight: 700, ls: 150, bstyle: 'outline', gap: 12, align: 'left', items: its(c) })];
      return c;
    }, 'full'],
    ['spot', '가운데 집중', '둘레 어둡게 + 흰 알약 버튼', function (c) {
      ov(c, 65, 'radial');
      c.blocks = [B({ tag: 'h2', html: 'UP TO 90% SALE', pos: 'mc', y: -4, font: 'DM Serif Display', size: 110, ls: -10, lh: 1 }),
        B({ type: 'buttons', pos: 'mc', y: 10, font: 'Inter', size: 14, weight: 700, ls: 120, bstyle: 'pill', bbg: '#ffffff', bcolor: '#111111', bhover: '#c4001f', gap: 10, items: its(c) })];
      return c;
    }, 'full'],
    ['outline', '테두리 글씨', '속이 빈 큰 SALE', function (c) {
      ov(c, 25);
      c.blocks = [B({ tag: 'h2', html: 'SALE', pos: 'mc', y: -6, font: 'Anton', size: 320, ls: 40, lh: 1, fill: false, stroke: 2, strokeColor: '#ffffff' }),
        B({ tag: 'p', html: 'UP TO 90% OFF', pos: 'mc', y: 12, font: 'Inter', size: 22, weight: 800, ls: 350 }),
        B({ type: 'buttons', pos: 'mc', y: 21, font: 'Inter', size: 14, weight: 600, ls: 150, gap: 34, items: its(c) })];
      return c;
    }, 'full'],
    ['stamp', '신상 도장', '빨간 NEW 도장 + 이탤릭', function (c) {
      ov(c, 22);
      c.blocks = [B({ tag: 'div', html: 'NEW<br>IN', pos: 'tr', x: -3, y: 6, font: 'Anton', size: 56, lh: 0.95, rotate: 12, bg: '#c4001f', bgPad: 14 }),
        B({ tag: 'h2', html: 'This week\'s<br>vintage', pos: 'bl', y: -10, font: 'Playfair Display', size: 120, italic: true, ls: -20, lh: 1, align: 'left' }),
        B({ type: 'buttons', pos: 'br', y: -10, font: 'Inter', size: 14, weight: 700, ls: 150, bstyle: 'underline', gap: 28, align: 'right', items: its(c) })];
      return c;
    }, 'full'],
    ['vertical', '세로 제목', '왼쪽 세로 글씨 + 오른쪽 제목', function (c) {
      ov(c, 25);
      c.blocks = [B({ tag: 'div', html: SH.EN, pos: 'mc', x: -42, font: 'Bebas Neue', size: 130, ls: 120, lh: 1, rotate: -90, opacity: 85 }),
        B({ tag: 'h2', html: 'UP TO<br>90% SALE', pos: 'mr', y: -6, font: 'Playfair Display', size: 110, weight: 700, lh: 1.05, align: 'right' }),
        B({ type: 'buttons', pos: 'br', font: 'Inter', size: 14, weight: 600, ls: 150, bdir: 'col', gap: 12, align: 'right', items: its(c) })];
      return c;
    }, 'full'],
    ['light', '밝은 사진용', '검은 글씨 (밝은 사진에)', function (c) {
      ov(c, 0);
      c.blocks = [B({ tag: 'h2', html: 'VINTAGE<br>CLOTHING', pos: 'tl', y: 4, font: 'Syne', size: 130, weight: 800, ls: -30, lh: 0.95, color: '#111111', align: 'left' }),
        B({ tag: 'p', html: 'UP TO 90% SALE · 매주 새로운 상품', pos: 'tl', y: 34, font: 'Pretendard', size: 17, weight: 600, color: '#111111', align: 'left' }),
        B({ type: 'buttons', pos: 'bl', font: 'Syne', size: 16, weight: 700, ls: 60, bcolor: '#111111', bhover: '#c4001f', bstyle: 'underline', gap: 30, align: 'left', items: its(c) })];
      return c;
    }, 'full'],
    ['ticker', '위쪽 띠 + 가운데', '빨간 띠가 위에서 흐름', function (c) {
      ov(c, 30);
      c.blocks = [B({ tag: 'h2', html: SH.En, pos: 'mc', y: -4, font: 'Bodoni Moda', size: 140, weight: 700, italic: true, ls: -20, lh: 1 }),
        B({ type: 'buttons', pos: 'bc', y: -6, font: 'Inter', size: 14, weight: 800, ls: 150, bstyle: 'solid', bbg: '#ffffff', bcolor: '#111111', bhover: '#ffffff', gap: 10, items: its(c) })];
      addBandsIfNone(c, [{ mode: 'zone', pos: 'top', zone: 5, bg: '#c4001f', text: 'NEW ARRIVALS EVERY WEEK  ·  UP TO 90% SALE  ·  ', font: 'Inter', weight: 700, ls: 150, speed: 30 }]);
      return c;
    }, 'full'],
    ['video', '영상형', '영상 배경 + 가운데 제목', function (c) {
      c.media.type = 'video'; c.media.poster = c.media.poster || c.media.src;
      ov(c, 30);
      c.blocks = [B({ tag: 'h2', html: 'UP TO 90% SALE', pos: 'mc', font: 'DM Serif Display', size: 120, ls: -10 }),
        B({ type: 'buttons', pos: 'mc', y: 14, font: 'Inter', size: 15, weight: 600, ls: 150, gap: 34, items: its(c) })];
      return c;
    }, 'full'],
    ['frame', '테두리형', '사진 둘레 여백 + 안쪽 글씨', function (c) {
      c.frame = { t: 40, r: 40, b: 40, l: 40, color: '#ffffff', radius: 0 };
      ov(c, 15);
      c.blocks = [B({ tag: 'h2', html: SH.En, pos: 'mc', font: 'Cormorant Garamond', size: 150, weight: 500, italic: true, ls: -20 }),
        B({ tag: 'p', html: 'UP TO 90% SALE', pos: 'mc', y: 14, font: 'Inter', size: 15, ls: 400 })];
      return c;
    }, 'full'],

    /* ===== 나눈 화면 (사진 칸 + 글씨/사진 칸) ===== */
    ['sp_now', '지금 글씨 + 메뉴 칸', '지금 제목 그대로, 버튼은 옆 칸', function (c) {
      ov(c, 10); sideColor(c, '#f1efe9');
      /* 6.3: 처음 값에 글이 한 칸뿐이면 둘째 글을 읽다 오류가 나던 것 → 있는 글만 씀 */
      var d = VTH.defaults('pc').blocks.filter(function (b) { return b && b.type !== 'buttons' && b.html; }), d0 = d[0] || { html: SH.EN, font: 'Playfair Display' }, d1 = d[1];
      c.blocks = [B({ tag: 'h2', html: d0.html, pos: 'mc', y: d1 ? -4 : 0, font: d0.font, size: 132, weight: 700, ls: 76, lh: 1.36 })].concat(d1 ? [B({ tag: 'p', html: d1.html, pos: 'mc', y: 12, font: d1.font, size: 25, ls: -30, lh: 1.6 })] : []).concat([
        S({ tag: 'h3', html: 'MENU', pos: 'tl', font: 'Inter', size: 40, weight: 800, ls: 300, color: '#111111', align: 'left' }),
        S({ type: 'buttons', pos: 'ml', font: 'Noto Sans KR', size: 50, weight: 700, bdir: 'col', gap: 30, align: 'left', bcolor: '#222222', bhover: '#c4001f', items: its(c) })]);
      return c;
    }, 'split'],
    ['sp_beige', '베이지 칸 + 빨간 글씨', '11/08 시안 느낌', function (c) {
      ov(c, 10); sideColor(c, '#f1efe9');
      c.blocks = [B({ tag: 'h2', html: 'UP TO<br>90% SALE', pos: 'bl', x: 2, font: 'Playfair Display', size: 150, weight: 700, ls: -20, lh: 1, align: 'left', color: '#f4f1e8' }),
        S({ tag: 'h3', html: 'vintage', pos: 'tl', font: 'Gloock', size: 160, color: '#c4001f', align: 'left' }),
        S({ type: 'buttons', pos: 'ml', font: 'Inter', size: 45, weight: 500, ls: 60, bdir: 'col', gap: 35, align: 'left', bcolor: '#222222', bhover: '#c4001f', items: its(c) }),
        S({ tag: 'p', html: '매주 새로운 상품 업데이트', pos: 'bl', font: 'Noto Sans KR', size: 32, color: '#555555', align: 'left' })];
      return c;
    }, 'split'],
    ['sp_black', '검정 칸 세일', '빨간 90% + 흰 글씨', function (c) {
      ov(c, 10); sideColor(c, '#111111');
      c.blocks = [B({ tag: 'p', html: 'NEW ARRIVALS EVERY WEEK', pos: 'bl', font: 'Inter', size: 16, weight: 600, ls: 300, align: 'left' }),
        S({ tag: 'p', html: 'UP TO', pos: 'tl', font: 'Inter', size: 40, weight: 600, ls: 300, align: 'left' }),
        S({ tag: 'h2', html: '90%', pos: 'ml', y: c.device === 'mobile' ? -12 : -8, font: 'Anton', size: c.device === 'mobile' ? 210 : 250, lh: 1, color: '#c4001f', align: 'left' }),
        S({ tag: 'h3', html: 'SALE', pos: 'ml', y: c.device === 'mobile' ? 14 : 10, font: 'Anton', size: c.device === 'mobile' ? 110 : 130, lh: 1, align: 'left' }),
        S({ type: 'buttons', pos: 'bl', font: 'Inter', size: 40, weight: 600, ls: 100, bdir: 'col', bstyle: 'underline', gap: 25, align: 'left', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_white', '흰 칸 미니멀', '깔끔한 이탤릭 + 목록 버튼', function (c) {
      ov(c, 0); sideColor(c, '#ffffff');
      c.blocks = [S({ tag: 'p', html: 'NEW IN', pos: 'tl', font: 'Inter', size: 30, weight: 600, ls: 400, color: '#111111', align: 'left' }),
        S({ tag: 'h2', html: 'Weekly<br>Vintage', pos: 'ml', y: -6, font: 'Playfair Display', size: 120, italic: true, lh: 1, color: '#111111', align: 'left' }),
        S({ type: 'buttons', pos: 'bl', font: 'Inter', size: 38, weight: 500, ls: 150, bdir: 'col', gap: 25, align: 'left', bcolor: '#111111', bhover: '#c4001f', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_red', '빨강 칸 포인트', '빨간 칸에 흰 SALE', function (c) {
      ov(c, 5); sideColor(c, '#c4001f');
      c.blocks = [S({ tag: 'h2', html: 'SALE', pos: 'tc', y: 4, font: 'Bodoni Moda', size: 200, weight: 900, lh: 1 }),
        S({ tag: 'p', html: 'UP TO 90%', pos: 'mc', font: 'Inter', size: 40, weight: 600, ls: 300 }),
        S({ type: 'buttons', pos: 'bc', font: 'Inter', size: 40, weight: 700, ls: 120, bdir: 'col', gap: 20, bhover: '#111111', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_number', '노랑 칸 큰 숫자', '노란 칸에 검은 90%', function (c) {
      ov(c, 5); sideColor(c, '#f2d64b');
      c.blocks = [S({ tag: 'h2', html: '90%', pos: 'mc', y: -8, font: 'Anton', size: 330, lh: 1, color: '#111111' }),
        S({ tag: 'p', html: 'SALE', pos: 'mc', y: 14, font: 'Inter', size: 50, weight: 800, ls: 500, color: '#111111' }),
        S({ type: 'buttons', pos: 'bc', font: 'Inter', size: 38, weight: 700, ls: 100, bdir: 'col', gap: 18, bcolor: '#111111', bhover: '#c4001f', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_index', '매거진 목차', '목차처럼 이탤릭 메뉴', function (c) {
      ov(c, 20, 'bottom'); sideColor(c, '#efe9df');
      c.blocks = [B({ tag: 'h2', html: 'The Vintage<br>Issue', pos: 'bl', font: 'Bodoni Moda', size: 150, weight: 700, lh: 0.95, align: 'left' }),
        S({ tag: 'h3', html: 'INDEX', pos: 'tl', font: 'Bodoni Moda', size: 70, ls: 300, color: '#111111', align: 'left' }),
        S({ type: 'buttons', pos: 'ml', font: 'Bodoni Moda', size: 70, italic: true, bdir: 'col', gap: 25, align: 'left', bcolor: '#111111', bhover: '#c4001f', items: its(c) }),
        S({ tag: 'p', html: SH.en + ' — weekly issue', pos: 'bl', font: 'Libre Caslon Text', size: 32, italic: true, color: '#777777', align: 'left' })];
      return c;
    }, 'split'],
    ['sp_korean', '한글 감성 칸', '마루부리 한글 + 목록', function (c) {
      ov(c, 0); sideColor(c, '#ece6da');
      c.blocks = [S({ tag: 'h2', html: '오래 입어<br>더 멋진 옷', pos: 'tl', font: 'MaruBuri', size: 100, weight: 700, ls: -30, lh: 1.3, color: '#2b2b2b', align: 'left' }),
        S({ tag: 'p', html: SH.KOI + ' 매주 고른 옷', pos: 'ml', font: 'Pretendard', size: 34, color: '#666666', align: 'left' }),
        S({ type: 'buttons', pos: 'bl', font: 'Pretendard', size: 40, weight: 600, bdir: 'col', gap: 22, align: 'left', bcolor: '#2b2b2b', bhover: '#c4001f', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_vertical', '세로 글씨 칸', '짙은 초록 칸에 세로 글씨', function (c) {
      ov(c, 15); sideColor(c, '#1f2a24');
      c.blocks = [B({ type: 'buttons', pos: 'bl', font: 'Inter', size: 15, weight: 600, ls: 150, bstyle: 'underline', gap: 30, align: 'left', items: its(c) }),
        S({ tag: 'h2', html: SH.EN, pos: 'mc', font: 'Bebas Neue', size: 220, ls: 100, lh: 1, rotate: -90, color: '#e9e4d8' })];
      return c;
    }, 'split'],
    ['sp_quote', '검정 칸 영문 문구', '이탤릭 한 줄 문구', function (c) {
      ov(c, 15); sideColor(c, '#111111');
      c.blocks = [B({ type: 'buttons', pos: 'bc', font: 'Inter', size: 16, weight: 600, ls: 150, gap: 40, items: its(c) }),
        S({ tag: 'h2', html: '“Old clothes,<br>new stories.”', pos: 'ml', font: 'Playfair Display', size: 100, italic: true, lh: 1.2, color: '#f4f1e8', align: 'left' }),
        S({ tag: 'p', html: '— ' + SH.EN, pos: 'bl', font: 'Inter', size: 30, ls: 300, color: '#999999', align: 'left' })];
      return c;
    }, 'split'],
    ['sp_two', '사진 두 장 WOMEN / MEN', '칸마다 사진 + 큰 글씨', function (c) {
      ov(c, 20); sidePhoto(c, 20);
      c.blocks = [B({ tag: 'h2', html: 'WOMEN', pos: 'bc', y: -8, font: 'Bebas Neue', size: 200, ls: 60, link: itm(c, 'WOMEN') }),
        S({ tag: 'h2', html: 'MEN', pos: 'bc', y: -8, font: 'Bebas Neue', size: 200, ls: 60, link: itm(c, 'MEN') })];
      return c;
    }, 'split'],
    ['sp_word', '이어지는 큰 글씨', '두 칸에 걸친 VIN|TAGE', function (c, k) {
      ov(c, 25); sidePhoto(c, 25);
      c.blocks = [B({ tag: 'h2', html: 'VIN', pos: 'mr', x: k.pad, font: 'Anton', size: 260, lh: 1, align: 'right' }),
        S({ tag: 'h2', html: 'TAGE', pos: 'ml', x: -k.pad, font: 'Anton', size: Math.round(260 * k.fm / k.fs), lh: 1, align: 'left' }),
        B({ type: 'buttons', pos: 'bl', font: 'Inter', size: 14, weight: 600, ls: 150, gap: 30, align: 'left', items: its(c) })];
      return c;
    }, 'split'],
    ['sp_pick', '큰 사진 + 오늘의 추천', '작은 칸 사진에 추천 글씨', function (c) {
      ov(c, 20); sidePhoto(c, 35);
      c.blocks = [B({ tag: 'h2', html: 'UP TO<br>90% SALE', pos: 'mc', y: -4, font: 'Noto Serif', size: 110, weight: 700, ls: 60, lh: 1.3 }),
        S({ tag: 'p', html: 'TODAY\'S PICK', pos: 'tl', font: 'Inter', size: 34, weight: 600, ls: 300, align: 'left' }),
        S({ tag: 'h3', html: 'Vintage<br>Denim', pos: 'bl', y: -14, font: 'Playfair Display', size: 110, italic: true, lh: 1, align: 'left' }),
        S({ type: 'buttons', pos: 'bl', font: 'Inter', size: 36, weight: 600, ls: 100, bstyle: 'underline', gap: 20, align: 'left', items: its(c).slice(0, 1) })];
      return c;
    }, 'split'],
    ['sp_frame', '테두리 두 칸', '흰 여백 안 사진 두 장', function (c) {
      c.frame = { t: 24, r: 24, b: 24, l: 24, color: '#ffffff', radius: 0 };
      ov(c, 15); sidePhoto(c, 15);
      c.blocks = [B({ tag: 'h2', html: 'New in', pos: 'bl', font: 'Cormorant Garamond', size: 120, weight: 500, italic: true, lh: 1, align: 'left' }),
        S({ tag: 'h2', html: 'Sale', pos: 'bl', font: 'Cormorant Garamond', size: 300, weight: 500, italic: true, lh: 1, align: 'left' }),
        B({ type: 'buttons', pos: 'tr', font: 'Inter', size: 13, weight: 600, ls: 200, gap: 24, align: 'right', items: its(c) })];
      return c;
    }, 'split']
  ];
  /* ---------- 자동 조합 스타일: 구도 × 분위기(글꼴·색) ---------- */
  var THEMES = [
    { id: 'classic', n: '클래식 세리프', tf: 'Playfair Display', tw: 700, ti: false, tls: -10, sf: 'Inter', acc: '#c4001f', sideBg: '#f1efe9', sideTx: '#222222' },
    { id: 'modern', n: '모던 고딕', tf: 'Archivo', tw: 900, ti: false, tls: -30, sf: 'Inter', acc: '#ffd400', sideBg: '#111111', sideTx: '#ffffff' },
    { id: 'bodoni', n: '잡지 보도니', tf: 'Bodoni Moda', tw: 900, ti: false, tls: -20, sf: 'Inter', acc: '#c4001f', sideBg: '#efe9df', sideTx: '#111111' },
    { id: 'poster', n: '굵은 포스터', tf: 'Anton', tw: 400, ti: false, tls: 10, sf: 'Oswald', acc: '#ff4d00', sideBg: '#ff4d00', sideTx: '#111111' },
    { id: 'narrow', n: '좁은 대문자', tf: 'Bebas Neue', tw: 400, ti: false, tls: 60, sf: 'Inter', acc: '#c9a86a', sideBg: '#1f2a24', sideTx: '#e9e4d8' },
    { id: 'elegant', n: '우아한 이탤릭', tf: 'Cormorant Garamond', tw: 500, ti: true, tls: -10, sf: 'EB Garamond', acc: '#d8b878', sideBg: '#ffffff', sideTx: '#333333' },
    { id: 'kserif', n: '한글 명조', tf: 'MaruBuri', tw: 700, ti: false, tls: -40, sf: 'Pretendard', acc: '#e05a4f', sideBg: '#ece6da', sideTx: '#2b2b2b', ko: true },
    { id: 'ksans', n: '한글 고딕', tf: 'Pretendard', tw: 800, ti: false, tls: -40, sf: 'Pretendard', acc: '#3ddc84', sideBg: '#0f0f0f', sideTx: '#ffffff', ko: true },
    { id: 'syne', n: '개성 고딕', tf: 'Syne', tw: 800, ti: false, tls: -30, sf: 'Inter', acc: '#a48bff', sideBg: '#e8e1ff', sideTx: '#1a1440' },
    { id: 'dmserif', n: '부드러운 세리프', tf: 'DM Serif Display', tw: 400, ti: false, tls: -10, sf: 'Outfit', acc: '#f2d64b', sideBg: '#f2d64b', sideTx: '#111111' },
    { id: 'caslon', n: '빈티지 캐슬론', tf: 'Libre Caslon Text', tw: 400, ti: true, tls: -20, sf: 'Inter', acc: '#e0b97a', sideBg: '#2a1f1a', sideTx: '#f3e9dc' },
    { id: 'gloock', n: '레드 글룩', tf: 'Gloock', tw: 400, ti: false, tls: 0, sf: 'Archivo', acc: '#ff3b3b', sideBg: '#c4001f', sideTx: '#ffffff' },
    { id: 'oswald', n: '스포티 오스왈드', tf: 'Oswald', tw: 700, ti: false, tls: 20, sf: 'Inter', acc: '#00c2ff', sideBg: '#0b1f3a', sideTx: '#ffffff' },
    { id: 'outfit', n: '둥근 고딕', tf: 'Outfit', tw: 800, ti: false, tls: -20, sf: 'Outfit', acc: '#ff8fb1', sideBg: '#fff0f4', sideTx: '#3a1d27' },
    /* 빈티지 분위기 (11/09 추가) */
    { id: 'v70s', n: '[빈티지] 70년대 레트로', tf: 'Shrikhand', tw: 400, ti: false, tls: 0, sf: 'Righteous', acc: '#f4a259', sideBg: '#e85d2a', sideTx: '#fff3e0' },
    { id: 'vfat', n: '[빈티지] 굵은 세리프 포스터', tf: 'Abril Fatface', tw: 400, ti: false, tls: 0, sf: 'Old Standard TT', acc: '#d7263d', sideBg: '#f3ead8', sideTx: '#1b1b1b' },
    { id: 'vtype', n: '[빈티지] 낡은 타자기', tf: 'Special Elite', tw: 400, ti: false, tls: 20, sf: 'Courier Prime', acc: '#e8d9b5', sideBg: '#efe6d2', sideTx: '#2b2620' },
    { id: 'vblack', n: '[빈티지] 블랙레터', tf: 'UnifrakturMaguntia', tw: 400, ti: false, tls: 0, sf: 'Old Standard TT', acc: '#c9a227', sideBg: '#141414', sideTx: '#efe9dc' },
    { id: 'vdeco', n: '[빈티지] 아르데코', tf: 'Limelight', tw: 400, ti: false, tls: 40, sf: 'Poiret One', acc: '#d4af37', sideBg: '#0f2a2a', sideTx: '#f1e6c8' },
    { id: 'vwest', n: '[빈티지] 웨스턴 간판', tf: 'Rye', tw: 400, ti: false, tls: 20, sf: 'Alfa Slab One', acc: '#e0a458', sideBg: '#5b3a1e', sideTx: '#f6e7cf' },
    { id: 'vslab', n: '[빈티지] 굵은 슬랩', tf: 'Ultra', tw: 400, ti: false, tls: 0, sf: 'Courier Prime', acc: '#2a9d8f', sideBg: '#264653', sideTx: '#f4f1de' },
    { id: 'vfell', n: '[빈티지] 오래된 인쇄', tf: 'IM Fell English', tw: 400, ti: true, tls: -10, sf: 'Old Standard TT', acc: '#b5651d', sideBg: '#e9dfc8', sideTx: '#3b2f22' },
    { id: 'vscript', n: '[빈티지] 50년대 손글씨', tf: 'Yellowtail', tw: 400, ti: false, tls: 0, sf: 'Righteous', acc: '#ff6f91', sideBg: '#1d3557', sideTx: '#f1faee' },
    { id: 'vkpost', n: '[빈티지] 한글 레트로 포스터', tf: 'Black Han Sans', tw: 400, ti: false, tls: -20, sf: 'Do Hyeon', acc: '#ffcf33', sideBg: '#d62828', sideTx: '#fff8e7', ko: true },
    { id: 'vkold', n: '[빈티지] 한글 옛 명조', tf: 'Song Myung', tw: 400, ti: false, tls: -30, sf: 'Gowun Batang', acc: '#c0392b', sideBg: '#efe3cc', sideTx: '#2d2416', ko: true },
    { id: 'vkbrush', n: '[빈티지] 한글 붓글씨', tf: 'Nanum Brush Script', tw: 400, ti: false, tls: 0, sf: 'Gowun Batang', acc: '#e63946', sideBg: '#f5efe2', sideTx: '#1f1f1f', ko: true }
  ];
  function T1(T, en, ko) { return T.ko && ko ? ko : en; }
  function hl(T, s) { return '<span style="color:' + T.acc + '">' + s + '</span>'; }
  function tt(T, o) { o.font = T.tf; o.weight = o.weight || T.tw; if (o.italic == null) { o.italic = T.ti; } if (o.ls == null) { o.ls = T.tls; } return B(o); }
  function st(T, o) { o.font = T.tf; o.weight = o.weight || T.tw; if (o.italic == null) { o.italic = T.ti; } if (o.ls == null) { o.ls = T.tls; } if (!o.color) { o.color = T.sideTx; } return S(o); }
  function sb(T, o) { o.font = o.font || T.sf; return B(o); }
  function ss(T, o) { o.font = o.font || T.sf; if (!o.color) { o.color = T.sideTx; } if (o.type === 'buttons') { o.bcolor = o.bcolor || T.sideTx; o.bhover = o.bhover || T.acc; } return S(o); }
  function btn(c, T, o) { o.type = 'buttons'; o.font = o.font || T.sf; o.bhover = o.bhover || T.acc; o.items = o.items || its(c); return B(o); }
  var SALE1 = function (T) { return T1(T, 'UP TO<br>' + hl(T, '90%') + ' SALE', '최대 ' + hl(T, '90%') + '<br>할인'); };
  var SUB1 = function (T) { return T1(T, 'New arrivals every week', '매주 새로운 상품 업데이트'); };
  var COMPS_FULL = [
    ['c1', '가운데 정렬', function (c, T) { ov(c, 30); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -6, size: 130, lh: 1.05 }), sb(T, { tag: 'p', html: SUB1(T), pos: 'mc', y: 10, size: 20, ls: 40 }), btn(c, T, { pos: 'mc', y: 18, size: 15, weight: 600, ls: 150, gap: 34 })]; }],
    ['c2', '왼쪽 그늘', function (c, T) { ov(c, 70, 'left'); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'ml', x: 2, y: -8, size: 120, lh: 1.05, align: 'left' }), sb(T, { tag: 'p', html: SUB1(T), pos: 'ml', x: 2, y: 8, size: 19, align: 'left' }), btn(c, T, { pos: 'ml', x: 2, y: 16, size: 14, weight: 700, ls: 150, bstyle: 'outline', gap: 12, align: 'left' })]; }],
    ['c3', '아래 크게', function (c, T) { ov(c, 40, 'bottom'); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VINTAGE', '빈티지'), pos: 'bl', y: -6, size: 240, lh: 0.9, align: 'left' }), sb(T, { tag: 'p', html: T1(T, 'UP TO 90% SALE', '최대 90% 할인'), pos: 'tr', size: 16, weight: 700, ls: 250, align: 'right' }), btn(c, T, { pos: 'br', y: -6, size: 14, weight: 600, ls: 120, bstyle: 'underline', gap: 28, align: 'right' })]; }],
    ['c4', '위 제목 + 아래 메뉴', function (c, T) { ov(c, 45, 'top'); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'tl', y: 4, size: 110, lh: 1.05, align: 'left' }), sb(T, { tag: 'p', html: SUB1(T), pos: 'tl', y: 30, size: 18, align: 'left' }), btn(c, T, { pos: 'bc', y: -5, size: 15, weight: 700, ls: 200, gap: 50 })]; }],
    ['c5', '대각선 제목', function (c, T) { ov(c, 22); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'vintage<br>edit', '빈티지<br>에디트'), pos: 'ml', x: 4, y: -4, size: 170, lh: 0.95, rotate: -7, align: 'left', italic: true }), sb(T, { tag: 'p', html: T1(T, 'UP TO 90% SALE — WEEKLY DROP', '최대 90% 할인 — 매주 새 상품'), pos: 'br', size: 14, ls: 300, align: 'right' }), btn(c, T, { pos: 'bl', size: 14, weight: 600, ls: 120, bstyle: 'underline', gap: 30, align: 'left' })]; }],
    ['c6', '색 상자 제목', function (c, T) { ov(c, 15); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VINTAGE SALE', '빈티지 세일'), pos: 'mc', y: -8, size: 120, lh: 1, bg: T.acc, bgPad: 10, color: '#111111' }), sb(T, { tag: 'p', html: T1(T, 'UP TO 90% OFF', '최대 90% 할인'), pos: 'mc', y: 6, size: 26, weight: 700, ls: 200, bg: '#111111', bgPad: 8 }), btn(c, T, { pos: 'mc', y: 18, size: 14, weight: 800, ls: 150, bstyle: 'solid', bbg: '#ffffff', bcolor: '#111111', bhover: '#ffffff', gap: 10 })]; }],
    ['c7', '테두리 큰 글씨', function (c, T) { ov(c, 30); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'SALE', '세일'), pos: 'mc', y: -6, size: 300, lh: 1, fill: false, stroke: 2, strokeColor: '#ffffff' }), sb(T, { tag: 'p', html: T1(T, 'UP TO ' + hl(T, '90%') + ' OFF', '최대 ' + hl(T, '90%') + ' 할인'), pos: 'mc', y: 12, size: 22, weight: 800, ls: 300 }), btn(c, T, { pos: 'mc', y: 21, size: 14, weight: 600, ls: 150, gap: 34 })]; }],
    ['c8', '오른쪽 정렬', function (c, T) { ov(c, 65, 'right'); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mr', x: -2, y: -8, size: 120, lh: 1.05, align: 'right' }), sb(T, { tag: 'p', html: SUB1(T), pos: 'mr', x: -2, y: 8, size: 19, align: 'right' }), btn(c, T, { pos: 'mr', x: -2, y: 16, size: 14, weight: 700, ls: 150, bstyle: 'outline', gap: 12, align: 'right' })]; }],
    ['c9', '잡지 표지', function (c, T) { ov(c, 35, 'bottom'); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VINTAGE', SH.KO), pos: 'tc', y: 2, size: 240, lh: 1, clipB: 8 }), sb(T, { tag: 'p', html: T1(T, 'UP TO <b>90%</b> SALE', '최대 <b>90%</b> 할인'), pos: 'bc', y: -14, size: 40, italic: true, font: T.tf }), btn(c, T, { pos: 'bc', y: -6, size: 14, weight: 600, ls: 200, gap: 40 })]; }],
    ['c10', '미니멀 한 줄', function (c, T) { ov(c, 12, 'bottom'); c.blocks = [sb(T, { tag: 'p', html: T1(T, 'New arrivals every week · UP TO 90% SALE', '매주 새 상품 · 최대 90% 할인'), pos: 'bl', size: 18, weight: 400, ls: 60, align: 'left' }), btn(c, T, { pos: 'br', size: 13, weight: 500, ls: 150, gap: 24, align: 'right' })]; }],
    ['c11', '도장 + 제목', function (c, T) { ov(c, 22); c.blocks = [tt(T, { tag: 'div', html: T1(T, 'NEW<br>IN', '신상<br>입고'), pos: 'tr', x: -3, y: 6, size: 52, lh: 0.95, rotate: 12, bg: T.acc, bgPad: 14, color: '#111111' }), tt(T, { tag: 'h2', html: T1(T, 'This week\'s<br>vintage', '이번 주<br>빈티지'), pos: 'bl', y: -10, size: 130, lh: 1, align: 'left' }), btn(c, T, { pos: 'br', y: -10, size: 14, weight: 700, ls: 150, bstyle: 'underline', gap: 28, align: 'right' })]; }],
    ['c12', '두 줄 엇갈림', function (c, T) { ov(c, 30); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VINTAGE', '오래된'), pos: 'ml', x: 2, y: -10, size: 170, lh: 1, align: 'left' }), tt(T, { tag: 'h2', html: T1(T, 'clothing', '좋은 옷'), pos: 'mr', x: -2, y: 6, size: 170, lh: 1, italic: true, align: 'right', color: T.acc }), btn(c, T, { pos: 'bc', y: -6, size: 14, weight: 600, ls: 150, gap: 34 })]; }],
    ['c13', '세로 제목', function (c, T) { ov(c, 25); c.blocks = [tt(T, { tag: 'div', html: T1(T, SH.EN, SH.KO), pos: 'mc', x: -42, size: 120, lh: 1, ls: 100, rotate: -90, opacity: 85 }), tt(T, { tag: 'h2', html: SALE1(T), pos: 'mr', y: -6, size: 110, lh: 1.05, align: 'right' }), btn(c, T, { pos: 'br', size: 14, weight: 600, ls: 150, bdir: 'col', gap: 12, align: 'right' })]; }],
    ['c14', '네 모서리', function (c, T) { ov(c, 25); c.blocks = [tt(T, { tag: 'p', html: T1(T, 'VINTAGE', '빈티지'), pos: 'tl', size: 46, ls: 100, align: 'left' }), tt(T, { tag: 'p', html: T1(T, 'TALK', '톡'), pos: 'tr', size: 46, ls: 100, align: 'right' }), tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', size: 110, lh: 1.05 }), sb(T, { tag: 'p', html: T1(T, 'WEEKLY DROP', '매주 새 상품'), pos: 'bl', size: 14, ls: 300, align: 'left' }), btn(c, T, { pos: 'br', size: 14, weight: 600, ls: 150, gap: 24, align: 'right' })]; }]
  ];
  var COMPS_SPLIT = [
    ['s1', '메뉴 칸', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'bl', x: 2, size: 140, lh: 1, align: 'left' }), st(T, { tag: 'h3', html: T1(T, 'vintage', '빈티지'), pos: 'tl', size: 150, color: T.acc, align: 'left' }), ss(T, { type: 'buttons', pos: 'ml', size: 45, weight: 500, ls: 60, bdir: 'col', gap: 35, align: 'left', items: its(c) }), ss(T, { tag: 'p', html: SUB1(T), pos: 'bl', size: 30, align: 'left' })]; }],
    ['s2', '큰 숫자 칸', function (c, T) { ov(c, 8); sideColor(c, T.sideBg); c.blocks = [sb(T, { tag: 'p', html: T1(T, 'NEW ARRIVALS EVERY WEEK', '매주 새 상품'), pos: 'bl', size: 16, weight: 600, ls: 300, align: 'left' }), st(T, { tag: 'h2', html: '90%', pos: 'mc', y: -8, size: 300, lh: 1, color: T.acc === T.sideBg ? T.sideTx : T.acc }), ss(T, { tag: 'p', html: T1(T, 'SALE', '할인'), pos: 'mc', y: 12, size: 50, weight: 800, ls: 400 }), ss(T, { type: 'buttons', pos: 'bc', size: 36, weight: 700, ls: 100, bdir: 'col', gap: 18, items: its(c) })]; }],
    ['s3', '목차 칸', function (c, T) { ov(c, 20, 'bottom'); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'The Vintage<br>Issue', '빈티지<br>이야기'), pos: 'bl', size: 150, lh: 0.95, align: 'left' }), st(T, { tag: 'h3', html: T1(T, 'INDEX', '목차'), pos: 'tl', size: 70, ls: 300, align: 'left' }), ss(T, { type: 'buttons', pos: 'ml', font: T.tf, size: 70, italic: true, bdir: 'col', gap: 25, align: 'left', items: its(c) }), ss(T, { tag: 'p', html: T1(T, SH.en + ' — weekly issue', SH.KO + ' — 매주 발행'), pos: 'bl', size: 30, italic: true, align: 'left' })]; }],
    ['s4', '세로 글씨 칸', function (c, T) { ov(c, 15); sideColor(c, T.sideBg); c.blocks = [btn(c, T, { pos: 'bl', size: 15, weight: 600, ls: 150, bstyle: 'underline', gap: 30, align: 'left' }), st(T, { tag: 'h2', html: T1(T, SH.EN, SH.KO), pos: 'mc', size: 220, ls: 100, lh: 1, rotate: -90 })]; }],
    ['s5', '문구 칸', function (c, T) { ov(c, 15); sideColor(c, T.sideBg); c.blocks = [btn(c, T, { pos: 'bc', size: 16, weight: 600, ls: 150, gap: 40 }), st(T, { tag: 'h2', html: T1(T, '“Old clothes,<br>new stories.”', '“오래된 옷,<br>새로운 이야기”'), pos: 'ml', size: 100, italic: true, lh: 1.2, align: 'left' }), ss(T, { tag: 'p', html: '— ' + SH.EN, pos: 'bl', size: 30, ls: 300, color: T.acc, align: 'left' })]; }],
    ['s6', '가운데 모음 칸', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [st(T, { tag: 'h2', html: T1(T, 'SALE', '세일'), pos: 'mc', y: -16, size: 170, lh: 1 }), ss(T, { tag: 'p', html: T1(T, 'UP TO 90%', '최대 90%'), pos: 'mc', y: 0, size: 44, weight: 700, ls: 200, color: T.acc === T.sideBg ? T.sideTx : T.acc }), ss(T, { type: 'buttons', pos: 'mc', y: 18, size: 36, weight: 600, ls: 120, bdir: 'col', gap: 16, items: its(c) })]; }],
    ['s7', '사진 제목 + 메뉴 칸', function (c, T) { ov(c, 25); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -4, size: 120, lh: 1.05 }), sb(T, { tag: 'p', html: SUB1(T), pos: 'mc', y: 12, size: 20 }), ss(T, { tag: 'p', html: 'MENU', pos: 'tc', size: 36, weight: 700, ls: 400, color: T.acc === T.sideBg ? T.sideTx : T.acc }), ss(T, { type: 'buttons', pos: 'mc', size: 50, weight: 600, bdir: 'col', gap: 30, items: its(c) })]; }],
    ['s8', '추천 칸 (사진)', function (c, T) { ov(c, 20); sidePhoto(c, 35); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -4, size: 110, lh: 1.1 }), S({ tag: 'p', html: T1(T, 'TODAY\'S PICK', '오늘의 추천'), pos: 'tl', font: T.sf, size: 34, weight: 600, ls: 300, align: 'left' }), S({ tag: 'h3', html: T1(T, 'Vintage<br>Denim', '빈티지<br>데님'), pos: 'bl', y: -14, font: T.tf, size: 110, italic: true, lh: 1, align: 'left' }), S({ type: 'buttons', pos: 'bl', font: T.sf, size: 36, weight: 600, ls: 100, bstyle: 'underline', gap: 20, align: 'left', bhover: T.acc, items: its(c).slice(0, 1) })]; }],
    ['s9', '이어지는 글씨 (사진)', function (c, T, k) { ov(c, 25); sidePhoto(c, 25); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VIN', '빈티'), pos: 'mr', x: k.pad, size: 260, lh: 1, align: 'right' }), S({ tag: 'h2', html: T1(T, 'TAGE', '지톡'), pos: 'ml', x: -k.pad, font: T.tf, weight: T.tw, italic: T.ti, ls: T.tls, size: Math.round(260 * k.fm / k.fs), lh: 1, align: 'left', color: T.acc }), btn(c, T, { pos: 'bl', size: 14, weight: 600, ls: 150, gap: 30, align: 'left' })]; }],
    ['s10', '두 사진 글씨 (사진)', function (c, T) { ov(c, 20); sidePhoto(c, 20); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'WOMEN', '여자'), pos: 'bc', y: -8, size: 200, ls: 40, link: itm(c, 'WOMEN') }), S({ tag: 'h2', html: T1(T, 'MEN', '남자'), pos: 'bc', y: -8, font: T.tf, weight: T.tw, italic: T.ti, size: 200, ls: 40, link: itm(c, 'MEN') })]; }],
    ['s11', '위 라벨 + 아래 메뉴 칸', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [st(T, { tag: 'h2', html: T1(T, 'NEW<br>IN', '신상<br>입고'), pos: 'tl', size: 160, lh: 0.95, align: 'left' }), ss(T, { tag: 'p', html: SUB1(T), pos: 'ml', y: 6, size: 30, align: 'left' }), ss(T, { type: 'buttons', pos: 'bl', size: 40, weight: 700, ls: 150, bdir: 'col', gap: 18, align: 'left', items: its(c) })]; }],
    ['s12', '알약 버튼 칸', function (c, T) { ov(c, 15); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'bl', size: 130, lh: 1, align: 'left' }), st(T, { tag: 'h3', html: T1(T, 'SHOP', '쇼핑'), pos: 'tc', size: 90, ls: 200 }), ss(T, { type: 'buttons', pos: 'mc', y: 6, size: 36, weight: 700, ls: 100, bstyle: 'pill', bbg: T.sideTx, bcolor: T.sideBg, bhover: T.acc, bdir: 'col', gap: 18, items: its(c) })]; }]
  ];
  /* ---- 11/09 추가 구도 (전체 화면 12 + 나눈 화면 12) ---- */
  var ACC = function (T) { return T.acc === T.sideBg ? T.sideTx : T.acc; };
  COMPS_FULL.push(
    ['c15', '반투명 상자', function (c, T) { ov(c, 10); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -4, size: 110, lh: 1.05, bg: 'rgba(0,0,0,.45)', bgPad: 26 }), btn(c, T, { pos: 'mc', y: 18, size: 14, weight: 700, ls: 150, gap: 30 })]; }],
    ['c16', '큰 단어 + 작은 라벨', function (c, T) { ov(c, 28); c.blocks = [sb(T, { tag: 'p', html: T1(T, 'NO. 90 — WEEKLY', '90호 — 매주'), pos: 'tl', size: 14, weight: 700, ls: 400, align: 'left' }), tt(T, { tag: 'h2', html: T1(T, 'Vintage', '빈티지'), pos: 'ml', x: 2, size: 260, lh: 0.9, italic: true, align: 'left' }), sb(T, { tag: 'p', html: T1(T, 'UP TO ' + hl(T, '90%') + ' OFF', '최대 ' + hl(T, '90%') + ' 할인'), pos: 'br', size: 22, weight: 700, ls: 200, align: 'right' }), btn(c, T, { pos: 'bl', size: 14, weight: 600, ls: 150, bstyle: 'underline', gap: 28, align: 'left' })]; }],
    ['c17', '아래 정보 줄', function (c, T) { ov(c, 75, 'bottom'); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'bl', y: -12, size: 90, lh: 1.05, align: 'left' }), sb(T, { tag: 'p', html: SUB1(T), pos: 'bl', y: -4, size: 16, ls: 60, align: 'left' }), btn(c, T, { pos: 'br', y: -4, size: 13, weight: 700, ls: 120, bstyle: 'pill', bbg: '#ffffff', bcolor: '#111111', bhover: '#ffffff', gap: 8, align: 'right' })]; }],
    ['c18', '가운데 도장', function (c, T) { ov(c, 30); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'SALE<br>90%', '세일<br>90%'), pos: 'mc', y: -4, size: 120, lh: 0.95, rotate: -8, bg: T.acc, bgPad: 30, color: '#111111' }), btn(c, T, { pos: 'bc', y: -6, size: 14, weight: 700, ls: 180, gap: 34 })]; }],
    ['c19', '로고 + 큰 SALE', function (c, T) { ov(c, 30); c.blocks = [sb(T, { tag: 'p', html: SH.EN, pos: 'tl', size: 16, weight: 800, ls: 450, align: 'left' }), tt(T, { tag: 'h2', html: T1(T, 'SALE', '세일'), pos: 'mc', size: 330, lh: 1, ls: 20 }), sb(T, { tag: 'p', html: T1(T, 'UP TO 90% · EVERY WEEK', '최대 90% · 매주 새 상품'), pos: 'br', size: 15, weight: 600, ls: 300, align: 'right' }), btn(c, T, { pos: 'bl', size: 14, weight: 600, ls: 150, gap: 26, align: 'left' })]; }],
    ['c20', '꽉 찬 아래 글씨', function (c, T) { ov(c, 25, 'bottom'); c.blocks = [sb(T, { tag: 'p', html: SUB1(T), pos: 'tc', y: 4, size: 18, ls: 200 }), btn(c, T, { pos: 'tc', y: 10, size: 14, weight: 700, ls: 150, gap: 30 }), tt(T, { tag: 'h2', html: T1(T, 'VINTAGE', SH.KO), pos: 'bc', y: 9, size: 420, lh: 1, ls: -20, clipB: 18, w: 100 })]; }],
    ['c21', '오른쪽 기사', function (c, T) { ov(c, 70, 'right'); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'The Vintage<br>Edit', '이번 주<br>빈티지'), pos: 'mr', x: -2, y: -12, size: 100, lh: 1, align: 'left', w: 34 }), sb(T, { tag: 'p', html: T1(T, 'Hand-picked second-hand clothing, new every week. Up to 90% off.', '직접 고른 빈티지 의류를 매주 새로 올립니다. 최대 90% 할인.'), pos: 'mr', x: -2, y: 8, size: 17, lh: 1.6, align: 'left', w: 30 }), btn(c, T, { pos: 'mr', x: -2, y: 20, size: 14, weight: 700, ls: 150, bstyle: 'underline', gap: 22, align: 'left' })]; }],
    ['c22', '숫자 크게', function (c, T) { ov(c, 35); c.blocks = [tt(T, { tag: 'h2', html: '90%', pos: 'ml', x: 2, size: 300, lh: 1, color: T.acc, align: 'left' }), tt(T, { tag: 'h3', html: T1(T, 'SALE<br>every week', '할인<br>매주 새 상품'), pos: 'mr', x: -4, size: 80, lh: 1.05, align: 'left' }), btn(c, T, { pos: 'bc', y: -6, size: 14, weight: 600, ls: 150, gap: 34 })]; }],
    ['c23', '스티커 여러 개', function (c, T) { ov(c, 20); c.blocks = [tt(T, { tag: 'div', html: 'NEW', pos: 'tl', x: 6, y: 10, size: 46, rotate: -12, bg: T.acc, bgPad: 12, color: '#111111' }), tt(T, { tag: 'div', html: 'SALE', pos: 'tr', x: -8, y: 18, size: 54, rotate: 10, bg: '#ffffff', bgPad: 12, color: '#111111' }), tt(T, { tag: 'div', html: '90%', pos: 'bl', x: 10, y: -18, size: 60, rotate: 6, bg: '#111111', bgPad: 12, color: '#ffffff' }), tt(T, { tag: 'h2', html: T1(T, SH.En, SH.KO), pos: 'mc', size: 140, lh: 1 }), btn(c, T, { pos: 'br', size: 14, weight: 700, ls: 150, bstyle: 'underline', gap: 26, align: 'right' })]; }],
    ['c24', '영화 포스터', function (c, T) { ov(c, 50, 'bottom'); c.blocks = [sb(T, { tag: 'p', html: T1(T, 'A ' + SH.EN + ' PRODUCTION', SH.KO + ' 제공'), pos: 'tc', y: 4, size: 13, weight: 600, ls: 600 }), tt(T, { tag: 'h2', html: T1(T, 'THE GREAT<br>SALE', '대 세일'), pos: 'mc', y: 4, size: 150, lh: 0.95, ls: 20 }), sb(T, { tag: 'p', html: T1(T, 'UP TO 90% OFF · NEW ARRIVALS EVERY WEEK · ONLINE ONLY', '최대 90% 할인 · 매주 새 상품 · 온라인 단독'), pos: 'bc', y: -12, size: 13, ls: 300 }), btn(c, T, { pos: 'bc', y: -5, size: 13, weight: 700, ls: 200, gap: 30 })]; }],
    ['c25', '기울인 큰 제목', function (c, T) { ov(c, 25); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'Weekly<br>vintage drop', '매주<br>빈티지 입고'), pos: 'mc', y: -4, size: 150, lh: 0.95, italic: true, rotate: -4 }), sb(T, { tag: 'p', html: '<u>UP TO 90% SALE</u>', pos: 'mc', y: 16, size: 20, weight: 700, ls: 200 }), btn(c, T, { pos: 'bc', y: -5, size: 14, weight: 600, ls: 150, gap: 34 })]; }],
    ['c26', '한 줄 가로', function (c, T) { ov(c, 30); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'VINTAGE · SALE · NEW', '빈티지 · 세일 · 신상'), pos: 'mc', y: -3, size: 110, lh: 1, w: 100 }), btn(c, T, { pos: 'mc', y: 10, size: 14, weight: 600, ls: 150, bstyle: 'outline', gap: 12 })]; }]
  );
  COMPS_SPLIT.push(
    ['s13', '좁은 칸 · 로고 + 메뉴', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', size: 120, lh: 1.05 }), ss(T, { tag: 'p', html: 'VINTAGE<br>TALK', pos: 'tl', size: 50, weight: 800, ls: 300, lh: 1.2, align: 'left' }), ss(T, { type: 'buttons', pos: 'ml', size: 44, weight: 600, ls: 100, bdir: 'col', gap: 30, align: 'left', items: its(c) }), ss(T, { tag: 'p', html: '© WEEKLY DROP', pos: 'bl', size: 26, ls: 300, color: ACC(T), align: 'left' })]; }, 'narrow'],
    ['s14', '좁은 칸 · 세로 숫자', function (c, T) { ov(c, 15); sideColor(c, T.sideBg); c.blocks = [btn(c, T, { pos: 'bl', size: 15, weight: 600, ls: 150, gap: 30, align: 'left' }), st(T, { tag: 'h2', html: '9<br>0<br>%', pos: 'mc', y: -6, size: 220, lh: 0.9, color: ACC(T) }), ss(T, { tag: 'p', html: T1(T, 'SALE', '할인'), pos: 'bc', size: 44, weight: 800, ls: 500 })]; }, 'narrow'],
    ['s15', '좁은 칸 · 세로 문구', function (c, T) { ov(c, 15); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'bl', size: 130, lh: 1, align: 'left' }), st(T, { tag: 'h3', html: T1(T, 'NEW ARRIVALS', '신상 입고'), pos: 'mc', y: -8, size: 150, ls: 100, rotate: 90 }), ss(T, { type: 'buttons', pos: 'bc', size: 32, weight: 700, ls: 120, bdir: 'col', gap: 14, items: its(c) })]; }, 'narrow'],
    ['s16', '좁은 칸 · 알약 메뉴', function (c, T) { ov(c, 25); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -4, size: 120, lh: 1.05 }), sb(T, { tag: 'p', html: SUB1(T), pos: 'mc', y: 12, size: 20 }), ss(T, { type: 'buttons', pos: 'mc', size: 38, weight: 700, ls: 100, bstyle: 'pill', bbg: T.sideTx, bcolor: T.sideBg, bhover: T.acc, bdir: 'col', gap: 22, items: its(c) })]; }, 'narrow'],
    ['s17', '넓은 칸 · 반반 대비', function (c, T) { ov(c, 5); sideColor(c, T.sideBg); c.blocks = [st(T, { tag: 'h2', html: SALE1(T).replace(T.acc, ACC(T)), pos: 'tl', size: 150, lh: 1, align: 'left' }), ss(T, { tag: 'p', html: T1(T, 'Hand-picked vintage, new every week.', '직접 고른 빈티지, 매주 새로 올라옵니다.'), pos: 'ml', y: 8, size: 30, lh: 1.5, align: 'left', w: 80 }), ss(T, { type: 'buttons', pos: 'bl', size: 30, weight: 700, ls: 150, bstyle: 'underline', gap: 40, align: 'left', items: its(c) })]; }, 'wide'],
    ['s18', '넓은 칸 · 잡지 펼침면', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [ss(T, { tag: 'p', html: 'ISSUE 01 — ' + SH.EN, pos: 'tl', size: 24, weight: 700, ls: 400, color: ACC(T), align: 'left' }), st(T, { tag: 'h2', html: T1(T, 'Old clothes,<br>new stories', '오래된 옷,<br>새 이야기'), pos: 'ml', y: -6, size: 140, lh: 1, italic: true, align: 'left' }), ss(T, { tag: 'p', html: c.device === 'mobile' ? T1(T, 'Up to 90% off, every week.', '매주 새 빈티지 · 최대 90% 할인') : T1(T, 'Every week we pick vintage pieces worth keeping. Up to 90% off.', '매주 오래 입을 만한 빈티지를 고릅니다. 최대 90% 할인.'), pos: 'ml', y: 14, size: 26, lh: 1.6, align: 'left', w: 80 }), ss(T, { type: 'buttons', pos: 'bl', size: 28, weight: 700, ls: 150, gap: 36, align: 'left', items: its(c) })]; }, 'wide'],
    ['s19', '넓은 칸 · 걸친 제목 (사진)', function (c, T, k) { ov(c, 25); sidePhoto(c, 25); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'NEW', '신상'), pos: 'mr', x: k.pad, size: 240, lh: 1, align: 'right' }), S({ tag: 'h2', html: T1(T, 'IN', '입고'), pos: 'ml', x: -k.pad, font: T.tf, weight: T.tw, italic: T.ti, ls: T.tls, size: Math.round(240 * k.fm / k.fs), lh: 1, align: 'left', color: T.acc }), btn(c, T, { pos: 'bl', size: 14, weight: 600, ls: 150, gap: 26, align: 'left' })]; }, 'wide'],
    ['s20', '넓은 칸 · 두 사진 각각 메뉴', function (c, T) { ov(c, 25); sidePhoto(c, 25); c.blocks = [tt(T, { tag: 'h2', html: T1(T, 'WOMEN', '여자'), pos: 'bl', y: -10, size: 150, lh: 1, align: 'left', link: itm(c, 'WOMEN') }), btn(c, T, { pos: 'bl', size: 14, weight: 700, ls: 200, bstyle: 'outline', gap: 10, align: 'left', items: [{ t: 'SHOP WOMEN', u: itm(c, 'WOMEN') || '#' }] }), S({ tag: 'h2', html: T1(T, 'MEN', '남자'), pos: 'bl', y: -10, font: T.tf, weight: T.tw, italic: T.ti, ls: T.tls, size: 150, lh: 1, align: 'left', link: itm(c, 'MEN') }), S({ type: 'buttons', pos: 'bl', font: T.sf, size: 14, weight: 700, ls: 200, bstyle: 'outline', gap: 10, align: 'left', bhover: T.acc, items: [{ t: 'SHOP MEN', u: itm(c, 'MEN') || '#' }] })]; }, 'wide'],
    ['s21', '넓은 칸 · 큰 숫자 + 설명', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); c.blocks = [st(T, { tag: 'h2', html: '90%', pos: 'tl', size: 300, lh: 1, color: ACC(T), align: 'left' }), ss(T, { tag: 'p', html: T1(T, 'UP TO 90% OFF<br>New arrivals every week', '최대 90% 할인<br>매주 새로운 상품'), pos: 'ml', y: 10, size: 34, lh: 1.5, align: 'left' }), ss(T, { type: 'buttons', pos: 'bl', size: 28, weight: 700, ls: 150, gap: 34, align: 'left', items: its(c) })]; }, 'wide'],
    ['s22', '넓은 칸 · 반복 SALE', function (c, T) { ov(c, 10); sideColor(c, T.sideBg); var mob22 = c.device === 'mobile'; c.blocks = [st(T, { tag: 'h2', html: mob22 ? T1(T, 'SALE<br>SALE', '세일<br>세일') : T1(T, 'SALE<br>SALE<br>SALE', '세일<br>세일<br>세일'), pos: 'mc', y: mob22 ? -14 : -6, size: 200, lh: 0.9 }), st(T, { tag: 'h2', html: T1(T, 'SALE', '세일'), pos: 'mc', y: mob22 ? 14 : 26, size: 200, lh: 0.9, fill: false, stroke: 2, strokeColor: T.sideTx }), ss(T, { type: 'buttons', pos: 'bc', size: 26, weight: 700, ls: 150, gap: 30, items: its(c) })]; }, 'wide'],
    ['s23', '사진 칸 큰 글씨 · 작은 칸 버튼', function (c, T) { ov(c, 30); sideColor(c, T.sideBg); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'mc', y: -4, size: 120, lh: 1.05 }), sb(T, { tag: 'p', html: SUB1(T), pos: 'mc', y: 12, size: 20 }), ss(T, { type: 'buttons', pos: 'mc', y: 0, size: 14, weight: 600, ls: 150, gap: 22, bdir: 'col', items: its(c) })]; }, 'any'],
    ['s24', '작은 칸 사진 + 큰 칸 글씨', function (c, T) { ov(c, 55, 'left'); sidePhoto(c, 0); c.blocks = [tt(T, { tag: 'h2', html: SALE1(T), pos: 'ml', x: 3, y: -8, size: 120, lh: 1.05, align: 'left' }), sb(T, { tag: 'p', html: SUB1(T), pos: 'ml', x: 3, y: 8, size: 20, align: 'left' }), btn(c, T, { pos: 'ml', x: 3, y: 16, size: 14, weight: 700, ls: 150, bstyle: 'outline', gap: 12, align: 'left' })]; }, 'any']
  );
  /* 색 분위기 6가지 추가 */
  THEMES.push(
    { id: 'mono', n: '흑백 모노', tf: 'Inter', tw: 800, ti: false, tls: -40, sf: 'Inter', acc: '#ffffff', sideBg: '#000000', sideTx: '#ffffff' },
    { id: 'pastel', n: '파스텔', tf: 'Fraunces', tw: 700, ti: true, tls: -20, sf: 'Outfit', acc: '#ffc6d9', sideBg: '#fde8ef', sideTx: '#5b3a4a' },
    { id: 'neon', n: '네온 스트릿', tf: 'Monoton', tw: 400, ti: false, tls: 20, sf: 'Righteous', acc: '#39ff14', sideBg: '#0a0a0a', sideTx: '#39ff14' },
    { id: 'earth', n: '어스 톤', tf: 'Old Standard TT', tw: 700, ti: false, tls: -10, sf: 'Inter', acc: '#d9a066', sideBg: '#6b4f3a', sideTx: '#f3e7d6' },
    { id: 'navygold', n: '네이비 골드', tf: 'Cinzel', tw: 700, ti: false, tls: 60, sf: 'EB Garamond', acc: '#d4af37', sideBg: '#0b1f3a', sideTx: '#f1e6c8' },
    { id: 'mint', n: '민트 레트로', tf: 'Alfa Slab One', tw: 400, ti: false, tls: 0, sf: 'Courier Prime', acc: '#7fe0c5', sideBg: '#d9f5ec', sideTx: '#1d3b33' }
  );
  (function () {
    COMPS_FULL.forEach(function (cp) {
      THEMES.forEach(function (T) {
        PRESETS.push(['g_' + cp[0] + '_' + T.id, cp[1] + ' · ' + T.n, T.tf + ' + ' + T.sf, function (c, k) { cp[2](c, T, k); return c; }, 'full', cp[0], T.id, T, 'any']);
      });
    });
    COMPS_SPLIT.forEach(function (cp) {
      THEMES.forEach(function (T) {
        PRESETS.push(['g_' + cp[0] + '_' + T.id, cp[1] + ' · ' + T.n, T.tf + ' + ' + T.sf, function (c, k) { cp[2](c, T, k); return c; }, 'split', cp[0], T.id, T, cp[3] || 'any']);
      });
    });
  })();
  /* ===== 추천 시안 (2.2, 11/11) — PC·휴대폰을 한 번에 바꾸는 완성 디자인. 사진·링크·저장 위치는 그대로 ===== */
  var SUB_KO = '매주 새로 들어오는 수입 구제';
  function sigBase(c) {
    fresh(c); c.blocks = []; c.bands = []; c.fx = { scrollFade: false, entrance: c.device === 'mobile' ? 'none' : 'up' };
    c.overlay = { amount: 0, color: '#000000', grad: 'none' };
    c.split.mode = 'full';
    return c;
  }
  function mix(a, b) { var o = {}, k; for (k in a) { if (a.hasOwnProperty(k)) { o[k] = a[k]; } } for (k in b) { if (b.hasOwnProperty(k)) { o[k] = b[k]; } } return o; }
  var SIGS = [
    ['sigA', '가격표', '갈색 종이 가격표에 90% — 구제 가게 행거 느낌', ['#c9a46b', '#2b1d10', '#ffffff'], function (c, mob, it) {
      var TAG = '#c9a46b', INK = '#2b1d10'; sigBase(c);
      if (!mob) {
        c.overlay = { amount: 55, color: '#000000', grad: 'right' };
        c.blocks = [B({ html: 'UP TO', pos: 'mc', x: 24, y: -25, w: 34, font: 'Courier Prime', size: 34, weight: 700, ls: 260 }),
          B({ tag: 'h2', html: '90%', pos: 'mc', x: 24, y: -5, w: 34, font: 'Alfa Slab One', size: 165, color: INK, bg: TAG, bgPad: 26, lh: 1, ls: -20, rotate: -5 }),
          B({ html: 'SALE', pos: 'mc', x: 24, y: 14, w: 34, font: 'Courier Prime', size: 34, weight: 700, ls: 260 }),
          B({ html: SUB_KO, pos: 'mc', x: 24, y: 23, w: 34, size: 20, weight: 500, ls: -20 }),
          B({ type: 'buttons', pos: 'mc', x: 24, y: 31, w: 34, size: 16, weight: 700, ls: 80, bstyle: 'underline', gap: 34, items: it, bhover: TAG })];
      } else {
        c.overlay = { amount: 55, color: '#000000', grad: 'bottom' };
        c.blocks = [B({ html: 'UP TO', pos: 'bc', y: -53, w: 90, font: 'Courier Prime', size: 22, weight: 700, ls: 260 }),
          B({ tag: 'h2', html: '90%', pos: 'bc', y: -36, w: 90, font: 'Alfa Slab One', size: 96, color: INK, bg: TAG, bgPad: 16, lh: 1, ls: -20, rotate: -5 }),
          B({ html: 'SALE', pos: 'bc', y: -28, w: 90, font: 'Courier Prime', size: 22, weight: 700, ls: 260 }),
          B({ html: SUB_KO, pos: 'bc', y: -20, w: 90, size: 15, weight: 500, ls: -20 }),
          B({ type: 'buttons', pos: 'bc', y: -11, w: 92, size: 15, weight: 700, ls: 60, bstyle: 'underline', gap: 22, items: it, bhover: TAG })];
      }
    }],
    ['sigB', '수입 베일', '아주 큰 좁은 글씨 + 노란 포장 테이프 띠', ['#f2c230', '#151515', '#ffffff'], function (c, mob, it) {
      var TAPE = '#f2c230', INK = '#151515'; sigBase(c);
      var bt = { type: 'buttons', pos: 'bl', x: 0, align: 'left', weight: 700, bstyle: 'solid', bbg: TAPE, bcolor: INK, bhover: TAPE, items: it };
      if (!mob) {
        c.overlay = { amount: 70, color: '#000000', grad: 'left' };
        c.blocks = [B({ tag: 'h2', html: 'UP TO<br>90%<br>SALE', pos: 'ml', x: 0, y: -9, w: 50, align: 'left', font: 'Anton', size: 165, lh: 0.88, ls: 10 }),
          B({ html: SUB_KO + ', 최대 90% 할인', pos: 'bl', x: 0, y: -15, w: 50, align: 'left', size: 20, weight: 500, ls: -20 }),
          B(mix(bt, { y: -5, w: 60, size: 15, ls: 60, gap: 10 }))];
        c.bands = [bandOf({ text: 'NEW ARRIVALS EVERY WEEK      UP TO 90% SALE      ' + SH.EN + '      ', mode: 'zone', pos: 'bottom', zone: 8, bg: TAPE, color: INK, font: 'Anton', ls: 30, speed: 45 })];
      } else {
        c.overlay = { amount: 65, color: '#000000', grad: 'bottom' };
        c.blocks = [B({ tag: 'h2', html: 'UP TO<br>90%<br>SALE', pos: 'bl', x: 0, y: -25, w: 92, align: 'left', font: 'Anton', size: 104, lh: 0.88, ls: 10 }),
          B({ html: SUB_KO + ', 최대 90% 할인', pos: 'bl', x: 0, y: -17, w: 92, align: 'left', size: 15, weight: 500, ls: -20 }),
          B(mix(bt, { y: -9, w: 92, size: 12, ls: 10, gap: 5 }))];
        c.bands = [bandOf({ text: 'NEW EVERY WEEK', mode: 'zone', pos: 'top', zone: 6, bg: TAPE, color: INK, font: 'Anton', ls: 60, speed: 0 })];
      }
    }],
    ['sigC', '데님 라벨', '사진 6 : 남색 칸 4, 박음질 금색 글씨, 큰 분류 목차', ['#1f2c4a', '#d4a23a', '#efe7d6'], function (c, mob, it) {
      var DENIM = '#1f2c4a', THREAD = '#d4a23a', CLOTH = '#efe7d6'; sigBase(c);
      var sp = c.split; sp.mode = 'ratio'; sp.reverse = false; sp.sideType = 'color'; sp.sideColor = DENIM; sp.spad = 7; sp.gap = 0; sp.fit = 'screen';
      var S = function (o) { o.area = 'side'; o.align = 'left'; o.x = 0; return B(o); };
      if (!mob) {
        sp.ratio = 60; sp.stack = false; c.media.fx = 30;
        c.blocks = [S({ html: SUB_KO, pos: 'tl', y: 3, w: 90, size: 16, weight: 500, color: THREAD }),
          S({ html: 'Up to', pos: 'tl', y: 11, w: 90, font: 'Fraunces', italic: true, size: 40, color: THREAD }),
          S({ tag: 'h2', html: '90%<br>Sale', pos: 'tl', y: 18, w: 90, font: 'Fraunces', size: 140, weight: 900, lh: 0.92, ls: -20, color: CLOTH }),
          S({ type: 'buttons', pos: 'bl', y: -4, w: 90, font: 'Fraunces', italic: true, size: 30, bdir: 'col', gap: 4, bcolor: CLOTH, bhover: THREAD, items: it })];
      } else {
        sp.ratio = 52; sp.stack = true; c.media.fx = 35;
        c.blocks = [S({ html: SUB_KO, pos: 'tl', y: 7, w: 92, size: 13, weight: 500, color: THREAD }),
          S({ html: 'Up to', pos: 'tl', y: 18, w: 90, font: 'Fraunces', italic: true, size: 22, color: THREAD }),
          S({ tag: 'h2', html: '90% Sale', pos: 'tl', y: 27, w: 92, font: 'Fraunces', size: 62, weight: 900, lh: 0.95, ls: -20, color: CLOTH }),
          S({ type: 'buttons', pos: 'bl', y: -30, w: 92, font: 'Fraunces', italic: true, size: 22, gap: 18, bcolor: CLOTH, bhover: THREAD, items: it })];
      }
    }]
  ];
  /* 시안 적용: PC와 휴대폰 설정을 함께 바꾼다(열려 있는 쪽만) */
  function applySig(sg) {
    var it = its(C());
    ['pc', 'mobile'].forEach(function (dv) {
      var cur = state.cfg[dv]; if (!cur) { return; }
      var n = clone(cur); if (!n.bands) { normBands(n); }
      sg[4](n, dv === 'mobile', clone(it)); if (dv === 'mobile') { mobFloor(n); } keepFrame(cur, n); n.styleId = sg[0];
      state.cfg[dv] = n;
    });
    if (RESP) { setBase(); state._lbl = '메인 시안: ' + sg[1]; }
    state.sel = 0; changed(false); if (RESP) { renderAll(); allTidy(null, true); } build();
    msg('"' + sg[1] + '" 시안을 PC와 휴대폰에 함께 적용했습니다. 위 [PC]·[모바일]로 바꿔 보며 확인하고, 마음에 들면 "카페24에 바로 저장"을 누르세요.');
  }
  VTH.sigs = SIGS;
  function sigList() {
    bd.appendChild(h4('추천 시안 (11/11 새로 만든 것)'));
    bd.appendChild(tip('누르면 PC와 휴대폰이 함께 바뀝니다. 사진·버튼 링크는 그대로이고, 글씨·색·위치는 "④ 글씨·버튼"에서 고칠 수 있어요. 저장하기 전에는 손님 화면이 바뀌지 않아요.'));
    var g = document.createElement('div'); g.className = 'presets';
    SIGS.filter(function (sg) { return !(RESP && isHid('main', sg[0])); }).forEach(function (sg) {
      var b = document.createElement('button');
      b.innerHTML = '<b>' + sg[1] + '</b><small>' + sg[2] + '</small><span style="display:inline-flex;gap:2px;margin-top:4px">' + sg[3].map(function (x) { return '<i style="width:12px;height:12px;border-radius:50%;background:' + x + ';border:1px solid #ddd"></i>'; }).join('') + '</span>';
      b.setAttribute('data-sig', sg[0]);
      b.onclick = function () { applySig(sg); };
      var sx = sigSetButton(sg); if (sx) { b.appendChild(document.createElement('br')); b.appendChild(sx); }
      g.appendChild(RESP ? delWrap('main', sg[0], b) : b);
    });
    bd.appendChild(g);
  }
  /* 6.3 휴대폰 글씨 바닥: 본문·버튼 14px, 제목 18px, 잘라 보이기(clip) 없음, 버튼 누르기 좋은 높이, 쌓은 아래 칸 자동 배치 */
  function mobFloor(c) { if (!c || c.device !== 'mobile') { return c; } (c.blocks || []).forEach(function (b) { var mn = b.type === 'buttons' || !/^h[1-3]$/.test(b.tag) ? 14 : 18; if (num(b.size) < mn) { b.size = mn; } b.clipT = 0; b.clipB = 0; }); c.tap = true; var sp = c.split || {}; if (sp.mode !== 'full' && sp.stack && sp.flow == null) { sp.flow = true; } return c; }
  function mobSize(c) {
    if (c.device !== 'mobile') { return c; }
    c.blocks.forEach(function (b) { b.size = Math.max(b.type === 'buttons' ? 14 : (/^h[1-3]$/.test(b.tag) ? 18 : 14), Math.round(b.size * 0.42)); b.gap = Math.round(num(b.gap) * 0.5); b.clipT = 0; b.clipB = 0; });
    if (c.marquee) { c.marquee.size = Math.max(12, Math.round(c.marquee.size * 0.45)); }
    c.frame.t = Math.round(c.frame.t / 2); c.frame.r = Math.round(c.frame.r / 2); c.frame.b = Math.round(c.frame.b / 2); c.frame.l = Math.round(c.frame.l / 2); return c;
  }
  function applyPreset(p) {
    if (RESP && state.cfg.pc && state.cfg.mobile) { var sv = state.dev; ['pc', 'mobile'].forEach(function (dv) { state.dev = dv; state.cfg[dv] = presetOne(p, state.cfg[dv]); }); state.dev = sv; setBase(); state._lbl = '스타일: ' + p[1]; state.sel = 0; changed(false); renderAll(); build(); msg('"' + p[1] + '" 스타일을 PC·휴대폰에 함께 적용했습니다. 휴대폰 글씨 자리를 맞추는 중…'); allTidy(function (n) { msg('"' + p[1] + '" 스타일을 PC·휴대폰에 함께 적용했습니다.' + (n ? ' 노트북·휴대폰에서 겹치던 글씨를 자동으로 옮겼어요.' : '')); }, true); return; }
    var n = presetOne(p, C());
    state.cfg[state.dev] = n; state.sel = 0; changed(false); build(); msg('"' + p[1] + '" 스타일을 적용했습니다.');
  }

  /* 4.4 휴대폰 글씨 자리 정리: 숨은 휴대폰 크기 창(390×844)에 그려 보고, 겹치거나 화면 밖이면 휴대폰 위치·크기만 고침(PC 그대로).
     PC에서도 일부러 겹친 글씨(디자인)는 그대로 둠 */
  var tidyFr = null;
  function tidyFrame(cb) {
    try { if (tidyFr && tidyFr.contentDocument && tidyFr.contentDocument.getElementById('contents')) { var mh0 = num(state.hdr && state.hdr.mobile && state.hdr.mobile.h, num((SH.headerPx || {}).mobile, 52)), dd = tidyFr.contentDocument; dd.documentElement.style.setProperty('--header-height', mh0 + 'px'); dd.body.style.paddingTop = mh0 + 'px'; cb(dd); return; } } catch (e) { }
    tidyFr = document.createElement('iframe'); tidyFr.setAttribute('aria-hidden', 'true'); tidyFr.tabIndex = -1;
    tidyFr.style.cssText = 'position:fixed;left:-20000px;top:0;width:390px;height:620px;border:0;opacity:0;pointer-events:none'; /* 6.3: 키 844 → 620. 글 칸 사이 간격이 화면 높이의 %라서 키 큰 화면에서만 맞추면 키 작은 휴대폰·주소창이 보이는 휴대폰·웹앱 미리보기에서 다시 겹침 → 키 작은 화면 기준으로 정리(키 큰 화면에서는 간격이 더 벌어질 뿐) */
    tidyFr.onload = function () { try { cb(tidyFr.contentDocument); } catch (e) { cb(null); } };
    var mh = num(state.hdr && state.hdr.mobile && state.hdr.mobile.h, num((SH.headerPx || {}).mobile, 52));
    tidyFr.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=390"><base href="' + location.origin + '/"><style>html,body{margin:0}h1,h2,h3,h4,h5,h6,p,ul,ol,li,dl,dt,dd,figure,blockquote,form,fieldset{margin:0;padding:0}ul,ol{list-style:none}#vth .vth-blk{animation:none!important;translate:none!important;opacity:1!important;filter:none!important}:root{--header-height:' + mh + 'px}body{padding-top:' + mh + 'px}</style></head><body><div id="contents"></div></body></html>';
    document.body.appendChild(tidyFr);
  }
  /* 4.5 노트북 1024×768·PC 1440×900 숨은 창(머리말 높이만큼 위를 비움) */
  var tidyFX = {};
  function tidyFrameX(key, w, h, top, cb) {
    var f = tidyFX[key];
    try { if (f && f.contentDocument && f.contentDocument.getElementById('contents')) { var dd = f.contentDocument; dd.documentElement.style.setProperty('--header-height', top + 'px'); dd.body.style.paddingTop = top + 'px'; cb(dd); return; } } catch (e) { }
    f = tidyFX[key] = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
    f.style.cssText = 'position:fixed;left:-20000px;top:0;width:' + w + 'px;height:' + h + 'px;border:0;opacity:0;pointer-events:none';
    f.onload = function () { try { cb(f.contentDocument); } catch (e) { cb(null); } };
    f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=' + w + '"><base href="' + location.origin + '/"><style>html,body{margin:0}h1,h2,h3,h4,h5,h6,p,ul,ol,li,dl,dt,dd,figure,blockquote,form,fieldset{margin:0;padding:0}ul,ol{list-style:none}#vth .vth-blk{animation:none!important;translate:none!important;opacity:1!important;filter:none!important}:root{--header-height:' + top + 'px}body{padding-top:' + top + 'px}</style></head><body><div id="contents"></div></body></html>';
    document.body.appendChild(f);
  }
  function whenFonts(fd, fn) { setTimeout(function () { var fr = fd.fonts && fd.fonts.ready, done = false, go = function () { if (done) { return; } done = true; setTimeout(fn, 60); }, t = setTimeout(go, 1500); if (fr) { fr.then(function () { clearTimeout(t); go(); }); } }, 300); }
  function probCount(fd, c, pp) {
    var R = blkRects(fd, c), n = 0, H = fd.getElementById('vth'); if (!H) { return 0; } var hr = H.getBoundingClientRect();
    R.forEach(function (r) { if (r && (r.left < hr.left - 3 || r.right > hr.right + 3 || r.top < hr.top - 3 || r.bottom > hr.bottom + 3)) { n++; } });
    for (var i = 0; i < R.length; i++) { for (var j = i + 1; j < R.length; j++) { if (R[i] && R[j] && (c.blocks[i].area || 'main') === (c.blocks[j].area || 'main') && !(pp && pp[i + '-' + j]) && olap(R[i], R[j]) > 0.12) { n++; } } }
    return n;
  }
  /* 노트북에서 겹치면 PC 값을 고치되, 큰 PC(1440)에서 더 나빠지면 되돌림 */
  /* 6.3 일부러 겹친 디자인 = 넉넉한 PC 화면(1440×1100)에서도 절반 넘게 겹친 짝만. 짧은 화면(노트북·높이 900)에서만 겹치면 고칠 대상 */
  function pcPairsBig(cb) {
    if (!RESP || !state.cfg.pc) { cb(null); return; }
    var ph = num(state.hdr && state.hdr.pc && state.hdr.pc.h, num((SH.headerPx || {}).pc, 128)) + num(((SH.hdr || {}).gap || {}).pc);
    tidyFrameX('roomy', 1440, 1100, ph, function (fd) {
      if (!fd) { cb(null); return; }
      try { applyTo(fd, state.cfg.pc); } catch (e) { cb(null); return; }
      whenFonts(fd, function () { var R = blkRects(fd, state.cfg.pc), o = {}; for (var i = 0; i < R.length; i++) { for (var j = i + 1; j < R.length; j++) { if (R[i] && R[j] && olap(R[i], R[j]) > 0.5) { o[i + '-' + j] = 1; } } } cb(o); });
    });
  }
  function lapTidy(done) {
    state._tidying = (state._tidying || 0) + 1; var d0 = done; done = function (n) { state._tidying = Math.max(0, (state._tidying || 1) - 1); if (d0) { d0(n); } };
    if (!RESP || !state.cfg.pc || innerWidth < 1024) { if (done) { done(0); } return; }
    pcPairsBig(function (pp) { lapTidyGo(pp, done); });
  }
  function lapTidyGo(pp, done) {
    var c = state.cfg.pc, keep = JSON.stringify(c), moved = 0, pass = 0, T = { orig: {}, skip: {} };
    var ph = num(state.hdr && state.hdr.pc && state.hdr.pc.h, num((SH.headerPx || {}).pc, 128)) + num(((SH.hdr || {}).gap || {}).pc);
    tidyFrameX('lap', 1024, 768, ph, function (fd) {
      if (!fd) { if (done) { done(0); } return; }
      var fin = function () {
        tidyFrameX('big', 1440, 900, ph, function (bg) {
          if (!bg) { if (done) { done(0); } return; }
          var before = JSON.parse(keep); applyTo(bg, before);
          whenFonts(bg, function () {
            var nb = probCount(bg, before, pp); applyTo(bg, c);
            setTimeout(function () {
              var na = probCount(bg, c, pp);
              if (moved && na > nb) { state.cfg.pc = before; c = state.cfg.pc; moved = 0; applyTo(bg, c); na = nb; }
              var T2 = { orig: T.orig, skip: {} }, p2 = 0;
              var end = function () { if (moved) { setBase(); state._lbl = '노트북 글씨 자리 정리'; changed(false, true); pushAll(); renderAll(); } if (done) { done(moved); } };
              if (!na) { end(); return; }
              var st2 = function () { var f = 0; try { f = tidyOnce(bg, c, pp, T2); } catch (e) { f = 0; } if (f && p2++ < 40) { moved++; applyTo(bg, c); setTimeout(st2, 40); return; } end(); };
              setTimeout(st2, 40);
            }, 120);
          });
        });
      };
      var step = function () { var f = 0; try { f = tidyOnce(fd, c, pp, T); } catch (e) { f = 0; } if (f && pass++ < 40) { moved++; applyTo(fd, c); setTimeout(step, 40); return; } fin(); };
      try { applyTo(fd, c); } catch (e) { fin(); return; }
      whenFonts(fd, step);
    });
  }
  function allTidy(done, quiet) {
    lapTidy(function (n1) { mobTidy(function (n2) {
      if (!quiet) { msg(n1 || n2 ? '겹치거나 화면 밖으로 나간 글씨를 정리했어요' + (n2 ? ' — 휴대폰 ' + n2 + '번' : '') + (n1 ? ' — 노트북 ' + n1 + '번(PC 큰 화면은 그대로 확인)' : '') + '. 📱💻 창에서 확인하세요.' : '휴대폰·노트북에서 겹치거나 화면 밖으로 나간 글씨가 없어요.'); }
      if (done) { done(n1 + n2); }
    }, true); });
  }
  function blkRects(doc, c) {
    return (c.blocks || []).map(function (b) { var e = doc.querySelector('#vth .vth-b' + b.id); if (!e) { return null; } var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? r : null; });
  }
  function olap(a, b) { var ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ix <= 0 || iy <= 4) { return 0; } var m = Math.min(a.width * a.height, b.width * b.height); return m > 0 ? ix * iy / m : 0; }
  function pcPairs() {
    if (innerWidth < 1024 || !state.cfg.pc || !document.getElementById('vth')) { return null; }
    var R = blkRects(document, state.cfg.pc), o = {};
    for (var i = 0; i < R.length; i++) { for (var j = i + 1; j < R.length; j++) { if (R[i] && R[j] && olap(R[i], R[j]) > 0.5) { o[i + '-' + j] = 1; } /* 6.3: 절반 넘게 겹친 것만 일부러 겹친 디자인으로 봄 */ } }
    return o;
  }
  function tidyOnce(fd, c, pp, T) {
    var bl = c.blocks || [], R = blkRects(fd, c), mg = 6, sp = c.split || {};
    var area = function (b) { return fd.querySelector('#vth .vth-' + (b.area === 'side' && sp.mode !== 'full' ? 'side' : 'main')) || fd.getElementById('vth'); };
    /* 작은 칸이 좁아 안 들어가면 휴대폰 작은 칸을 먼저 키움(사진 칸 50%까지) */
    var grow = function (b) { if (!flowOn(c) && b.area === 'side' && sp.mode !== 'full' && sp.stack && num(sp.ratio, 80) > 50) { sp.ratio = Math.max(50, num(sp.ratio, 80) - 5); return 1; } return 0; };
    /* 글씨는 처음 크기의 60%까지만 줄임 */
    var shrink = function (b, f, force) { var o = T.orig[b.id] || num(b.size); T.orig[b.id] = o; var ns = Math.max(c.device === 'mobile' ? (b.type === 'buttons' || !/^h[1-3]$/.test(b.tag) ? 14 : 18) : 9, Math.round(num(b.size) * f)); var lim = force ? (c.device === 'mobile' ? 0 : 0.4) : 0.6; if (ns >= num(b.size) || ns < o * lim) { return 0; } b.size = ns; return 1; };
    if (c.device === 'mobile' && flowOn(c) && sp.fit !== 'below' && num(sp.ratio, 80) >= 50 && bl.some(function (b) { return b.area === 'side'; })) {
      var vm = fd.querySelector('#vth .vth-main'), vs = fd.querySelector('#vth .vth-side'), vv = fd.getElementById('vth'), vhp = fd.querySelector('#vth>.vth-hp');
      if (vm && vs && vv) {
        var hm = vm.getBoundingClientRect().height, hs = vs.getBoundingClientRect().height, hv = vv.getBoundingClientRect().height, hh = vhp ? vhp.getBoundingClientRect().height : 0;
        if (hs > 0 && (hs > hm - 4 || (hh > 0 && hv > hh + 2)) && num(sp.flowK, 1) > 0.6) { sp.flowK = Math.max(0.6, Math.round((num(sp.flowK, 1) - 0.07) * 100) / 100); return 1; }
      }
    }
    var bands = [].slice.call(fd.querySelectorAll('#vth .vth-bm-over, #vth .vth-main > .vth-mq')).map(function (e) { return e.getBoundingClientRect(); }).filter(function (r) { return r.width > 0 && r.height > 0; });
    for (var i = 0; i < bl.length; i++) {
      var b = bl[i], r = R[i]; if (!r || T.skip['b' + i] || (flowOn(c) && b.area === 'side')) { continue; }
      var e = fd.querySelector('#vth .vth-b' + b.id), A = area(b).getBoundingClientRect(), aw = A.width || 1, ah = A.height || 1;
      if (e && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 2) { if (shrink(b, e.clientWidth / e.scrollWidth * 0.97, true)) { return 1; } }
      if (c.device === 'mobile' && e && b.type !== 'buttons' && /^h[1-3]$/.test(b.tag) && !num(b.rotate) && !T.skip['w' + i]) {
        var lhp = parseFloat(fd.defaultView.getComputedStyle(e).lineHeight) || num(b.size) * num(b.lh, 1.3), want = String(b.html || '').split(/<br\s*\/?>/i).length, got = Math.round(r.height / Math.max(1, lhp));
        if (got > want && r.width >= aw * num(b.w, 90) / 100 - 8) { if (shrink(b, 0.94)) { return 1; } T.skip['w' + i] = 1; }
      }
      if (r.width > aw - 2 * mg) { if (shrink(b, (aw - 2 * mg) / r.width * 0.97, true)) { return 1; } if (r.width > aw + 2) { T.skip['b' + i] = 1; continue; } } /* 6.3: 더 못 줄여도 칸 안이면 위치 맞추기는 계속 */
      if (r.height > ah - 2 * mg) { if (grow(b) || shrink(b, (ah - 2 * mg) / r.height * 0.97, true)) { return 1; } if (r.height > ah + 2) { T.skip['b' + i] = 1; continue; } }
      if (r.left < A.left + mg - 1) { b.x = r1(num(b.x) + (A.left + mg - r.left) / aw * 100); return 1; }
      if (r.right > A.right - mg + 1) { b.x = r1(num(b.x) - (r.right - A.right + mg) / aw * 100); return 1; }
      if (r.top < A.top + mg - 1) { b.y = r1(num(b.y) + (A.top + mg - r.top) / ah * 100); return 1; }
      if (r.bottom > A.bottom - mg + 1) { b.y = r1(num(b.y) - (r.bottom - A.bottom + mg) / ah * 100); return 1; }
      /* 사진 위에 겹쳐 흐르는 띠 밑에 깔린 글씨는 띠 밖으로 */
      for (var k = 0; k < bands.length; k++) {
        var br = bands[k]; if (olap(r, br) <= 0.12) { continue; }
        var downBand = (br.top + br.bottom) > (r.top + r.bottom), need = downBand ? r.bottom - br.top + 6 : br.bottom - r.top + 6;
        if (downBand && r.top - need >= A.top + mg) { b.y = r1(num(b.y) - need / ah * 100); return 1; }
        if (!downBand && r.bottom + need <= A.bottom - mg) { b.y = r1(num(b.y) + need / ah * 100); return 1; }
      }
    }
    for (var x = 0; x < bl.length; x++) {
      for (var y = x + 1; y < bl.length; y++) {
        var ra = R[x], rb = R[y]; if (!ra || !rb || T.skip[x + '-' + y] || (flowOn(c) && (bl[x].area === 'side' || bl[y].area === 'side')) || (bl[x].area || 'main') !== (bl[y].area || 'main') || (pp && pp[x + '-' + y])) { continue; }
        var up = (ra.top + ra.bottom) <= (rb.top + rb.bottom) ? x : y, lo = up === x ? y : x, ru = R[up], rl = R[lo], A2 = area(bl[lo]).getBoundingClientRect(), ah2 = A2.height || 1, need = ru.bottom - rl.top + 8;
        var tight = false;
        if (olap(ra, rb) <= 0.12) {
          /* 6.4 휴대폰 글 간격: 같은 세로 줄에 놓인(가로로 30% 넘게 겹치는) 두 칸 사이가 기준보다 좁으면 벌림 */
          if (c.device !== 'mobile' || num(bl[x].rotate) || num(bl[y].rotate)) { continue; }
          var ixg = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), gapv = rl.top - ru.bottom, ming = (bl[x].type === 'buttons' || bl[y].type === 'buttons') ? 16 : 12;
          if (ixg < 0.3 * Math.min(ra.width, rb.width) || gapv >= ming - 1 || gapv < -Math.min(ru.height, rl.height) * 0.6) { continue; }
          /* 사이에 다른 글 칸이 끼어 있으면(바로 이웃이 아니면) 건너뜀 */
          var between = false; for (var zz = 0; zz < bl.length; zz++) { if (zz === x || zz === y || !R[zz]) { continue; } var mz = (R[zz].top + R[zz].bottom) / 2; if (mz > ru.bottom - 2 && mz < rl.top + 2) { between = true; } } if (between) { continue; }
          need = Math.ceil(ming - gapv) + 1; tight = true;
        }
        var botL = A2.bottom - mg, topL = A2.top + mg; bands.forEach(function (br) { if (br.bottom <= A2.top || br.top >= A2.bottom) { return; } var bm = (br.top + br.bottom) / 2; if (bm > (rl.top + rl.bottom) / 2) { botL = Math.min(botL, br.top - 6); } if (bm < (ru.top + ru.bottom) / 2) { topL = Math.max(topL, br.bottom + 6); } });
        var keepOrd = true;
        var hit = function (idx, dy) { var r0 = R[idx], nr = { left: r0.left, right: r0.right, top: r0.top + dy, bottom: r0.bottom + dy, width: r0.width, height: r0.height }; for (var z = 0; z < bl.length; z++) { if (z === x || z === y || !R[z] || (bl[z].area || 'main') !== (bl[idx].area || 'main') || (pp && pp[Math.min(z, idx) + '-' + Math.max(z, idx)])) { continue; } if (olap(nr, R[z]) > 0.12 && olap(r0, R[z]) <= 0.12) { return true; } /* 6.4 글 순서 지키기(keepOrd 일 때): 같은 세로 줄의 다른 글 칸을 뛰어넘는 자리로는 옮기지 않음(톡 PC: 작은 글이 메뉴 버튼 아래로 넘어가 순서가 바뀌던 것) */ if (keepOrd) { var hx0 = Math.min(r0.right, R[z].right) - Math.max(r0.left, R[z].left), c00 = (r0.top + r0.bottom) / 2, cz0 = (R[z].top + R[z].bottom) / 2; if (hx0 > 0 && (c00 - cz0) * (c00 + dy - cz0) < 0) { return true; }
            if (c.device === 'mobile' && hx0 >= 0.3 * Math.min(r0.width, R[z].width) && !num(bl[z].rotate)) { var mgz = (bl[idx].type === 'buttons' || bl[z].type === 'buttons') ? 16 : 12, g1 = Math.max(R[z].top - nr.bottom, nr.top - R[z].bottom), g0z = Math.max(R[z].top - r0.bottom, r0.top - R[z].bottom); if (g1 < mgz - 0.5 && g1 < g0z) { return true; } } } } return false; };
        var tryMove = function () {
          if (rl.bottom + need <= botL && !hit(lo, need)) { bl[lo].y = r1(num(bl[lo].y) + need / ah2 * 100); return 1; }
          if (ru.top - need >= topL && !hit(up, -need)) { bl[up].y = r1(num(bl[up].y) - need / ah2 * 100); return 1; }
          if (rl.bottom + need / 2 <= botL && ru.top - need / 2 >= topL && !hit(lo, need / 2) && !hit(up, -need / 2)) { bl[lo].y = r1(num(bl[lo].y) + need / 2 / ah2 * 100); bl[up].y = r1(num(bl[up].y) - need / 2 / ah2 * 100); return 1; }
          return 0;
        };
        if (tryMove()) { return 1; }
        var grp = function (idx, dy) {
          var r0 = R[idx], c0 = (r0.top + r0.bottom) / 2, ids = [idx];
          for (var z = 0; z < bl.length; z++) { if (z === x || z === y || !R[z] || (bl[z].area || 'main') !== (bl[idx].area || 'main') || num(bl[z].rotate)) { continue; } var hz = Math.min(r0.right, R[z].right) - Math.max(r0.left, R[z].left), cz = (R[z].top + R[z].bottom) / 2; if (hz > 0 && (cz - c0) * dy > 0) { ids.push(z); } }
          if (ids.length < 2) { return 0; }
          for (var k2 = 0; k2 < ids.length; k2++) { var rz = R[ids[k2]]; if (dy > 0 ? rz.bottom + dy > botL : rz.top + dy < topL) { return 0; } }
          ids.forEach(function (q) { bl[q].y = r1(num(bl[q].y) + dy / ah2 * 100); }); return 1;
        };
        if (grp(lo, need) || grp(up, -need)) { return 1; }
        /* 비어 있는 쪽이 없으면 위 칸을 위로(그 위 칸은 다음 차례에 다시 위로 올라감). 위도 막혔으면 아래로 되밀지 않고(서로 되돌리며 헛돎) 글씨를 줄임 */
        T.up = T.up || {}; if (ru.top - need >= topL && (T.up[x + '-' + y] = (T.up[x + '-' + y] || 0) + 1) <= 3) { bl[up].y = r1(num(bl[up].y) - need / ah2 * 100); return 1; }
        keepOrd = false; if (tryMove()) { return 1; } /* 순서를 지키는 자리가 없으면 예전처럼(다른 칸 너머로) */
        if (tight) { T.skip[x + '-' + y] = 1; continue; } /* 간격만 좁은 것은 자리가 없으면 그대로 둠(글씨를 줄이지 않음) */
        if (grow(bl[lo])) { return 1; }
        var s1 = shrink(bl[x], 0.88), s2 = shrink(bl[y], 0.88); if (s1 || s2) { return 1; }
        T.skip[x + '-' + y] = 1;
      }
    }
    return 0;
  }
  function mobTidy(done, quiet) {
    if (!RESP || !state.cfg.mobile) { if (done) { done(0); } return; }
    var ms0 = (state.cfg.mobile && state.cfg.mobile.split) || {}; if (ms0.mode !== 'full' && ms0.stack) { mobTidyGo(null, done, quiet); return; } pcPairsBig(function (pp) { mobTidyGo(pp, done, quiet); });
  }
  function mobTidyGo(pp, done, quiet) {
    var c = state.cfg.mobile, moved = 0, pass = 0, ended = false, T = { orig: {}, skip: {} };
    /* 6.4 휴대폰 기준 맞춤: 본문·버튼 14px 이상, 제목 18px 이상, 버튼은 누르기 좋은 높이(tap = 40px) */
    (c.blocks || []).forEach(function (b) { var mn = b.type === 'buttons' || !/^h[1-3]$/.test(b.tag) ? 14 : 18; if (num(b.size) < mn) { b.size = mn; moved++; } });
    if (!c.tap && (c.blocks || []).some(function (b) { return b.type === 'buttons' && (b.items || []).length; })) { c.tap = true; moved++; }
    state._tidying = (state._tidying || 0) + 1;
    tidyFrame(function (fd) {
      if (!fd) { state._tidying = Math.max(0, (state._tidying || 1) - 1); if (done) { done(0); } return; }
      var finish = function () {
        if (ended) { return; } ended = true; state._tidying = Math.max(0, (state._tidying || 1) - 1);
        if (moved) { setBase(); state._lbl = '휴대폰 글씨 자리 정리'; changed(false, true); pushAll(); renderAll(); if (state.tab === 'style' || state.tab === 'layout') { build(); } }
        if (!quiet) { msg(moved ? '휴대폰에서 겹치거나 화면 밖으로 나간 글씨를 ' + moved + '번 옮기거나 줄였어요(PC는 그대로). 📱 휴대폰 창에서 확인하세요.' : '휴대폰에서 겹치거나 화면 밖으로 나간 글씨가 없어요.'); }
        if (done) { done(moved); }
      };
      var step = function () { var f = 0; var sig0 = JSON.stringify([c.blocks, c.split]); try { f = tidyOnce(fd, c, pp, T); } catch (e) { f = 0; state._tidyErr = String(e && e.message || e); } if (f && JSON.stringify([c.blocks, c.split]) === sig0) { f = 0; } state._tidyPass = pass; (state._tidyLog = state._tidyLog || []).push((c.blocks || []).map(function (b) { return b.x + ',' + b.y + '/' + b.size; }).join(' ') + ' tap' + c.tap + ' r' + (c.split || {}).ratio + ' skip' + Object.keys(T.skip).join('.') + ' up' + JSON.stringify(T.up || {})); if (state._tidyLog.length > 14) { state._tidyLog.shift(); } if (f && pass++ < 90) { moved++; applyTo(fd, c); setTimeout(step, 30); return; } finish(); };
      try { applyTo(fd, c); } catch (e) { finish(); return; }
      var go = function () { setTimeout(step, 60); };
      setTimeout(function () { var fr = fd.fonts && fd.fonts.ready; var t = setTimeout(go, 1500); if (fr) { fr.then(function () { clearTimeout(t); go(); }); } }, 350);
    });
  }
  function presetOne(p, cur) {
    var keep = clone(cur.split), n = clone(cur);
    if (p[0] !== 'base') { fresh(n); }
    n = p[3](n, factors(cur));
    var ks = ['mode', 'ratio', 'reverse', 'stack', 'fit', 'sideH', 'sfx', 'sfy', 'gap', 'spad', 'sovColor', 'sgrad', 'flow'];
    if (p[4] === 'full') { n.split = keep; }
    else { ks.forEach(function (k) { n.split[k] = keep[k]; }); if (!n.split.sideImg && keep.sideImg) { n.split.sideImg = keep.sideImg; } fitSplit(n); if (n.device === 'mobile' && n.split.stack && n.split.flow == null) { n.split.flow = true; }
      /* 6.3: 사진 칸이 좁은 비율(4:6·3:7·2:8)에서 글이 모두 사진 칸에 있는 스타일을 고르면, 비율 단추를 누를 때와 같게 글·버튼을 큰 칸으로 옮김(좁은 사진 칸에 몰려 겹치던 것) */
      if (p[0] !== 'base' && num(n.split.ratio, 80) <= 40 && !(n.blocks || []).some(function (b) { return b.area === 'side'; })) { sideFill(n); }
      if (p[0] !== 'base') { mobSideAll(n); } }
    if (p[0] !== 'base') { mobSize(n); if (n.device === 'mobile') { n.tap = true; } }
    keepFrame(cur, n); n.styleId = p[0];
    return n;
  }
  /* 3.9: 사람이 넣은 바깥여백(위·오른쪽·아래·왼쪽 중 하나라도 0 아님)은 스타일·시안을 바꿔도 그대로 */
  function keepFrame(cur, n) {
    var f = cur && cur.frame; if (!f || !(num(f.t) || num(f.r) || num(f.b) || num(f.l))) { return n; }
    n.frame = clone(f); return n;
  }
  /* ===== 4.5(11/15) 쇼핑몰 개선 제안 50가지 + 체크해서 지우기 =====
     켜짐·세부값 = /_/main/vt_hero/imps.html(손님 화면이 읽음), 번호별 상태·세부값 칸 = imps_def.html(디자인 세션이 씀, 편집기만 읽음),
     지운 스타일·번호 = editor.html(편집기만). 형식: 클로드AI\vt_hero\imps\쇼핑몰개선_설정형식_v1.md */
  var IMP_AREAS = ["머리말 · 메뉴","메인","상품 목록","상품 상세","장바구니 · 주문","바닥 · 안내 · 쇼핑몰별"];
  var IMPS = [{"n":1,"a":0,"pg":"list","t":"검색 칸 펼쳐 두기","was":"PC 머리말에 돋보기 아이콘만 있어 한 번 더 눌러야 찾을 수 있습니다.","now":"PC는 머리말 오른쪽에 입력 칸이 늘 보이고, 휴대폰은 머리말 바로 아래 한 줄로 보입니다.","tr":"머리말 오른쪽 칸. 폭을 휴대폰으로 바꾸면 머리말 아래로 내려옵니다.","w":1440},{"n":2,"a":0,"pg":"list","t":"최근 · 인기 검색어","was":"검색 칸을 눌러도 아무 안내가 없습니다.","now":"검색 칸을 누르면 최근 찾은 말과 많이 찾는 브랜드가 펼쳐져 한 번에 누를 수 있습니다.","tr":"머리말 검색 칸을 눌러 보세요. (1번 검색 칸이 같이 켜집니다)","dep":[1],"w":1440},{"n":3,"a":0,"pg":"list","t":"지금 있는 분류 표시","was":"목록에 들어가도 메뉴의 어느 분류에 와 있는지 표시가 없습니다.","now":"메뉴의 지금 분류에 밑줄이 생기고, 목록 위에 「홈 › 남자 › 블레이저」 길 안내가 붙습니다.","tr":"메뉴 「남자」 밑줄과 목록 제목 위 작은 글씨."},{"n":4,"a":0,"pg":"main","t":"형제몰 바로가기 줄","was":"빈티지톡·플러스·오케이가 서로 이어져 있지 않습니다.","now":"맨 위에 얇은 검은 줄로 세 쇼핑몰 이름을 두고, 지금 쇼핑몰은 흰 글씨로 표시합니다.","tr":"화면 맨 위 검은 줄. 위 막대에서 쇼핑몰을 바꿔 보세요."},{"n":5,"a":0,"pg":"list","t":"휴대폰 아래 고정 메뉴","was":"휴대폰에서 분류·관심상품으로 가려면 맨 위로 올라가 햄버거 메뉴를 열어야 합니다.","now":"화면 아래에 홈 · 분류 · 검색 · 관심 · 마이 다섯 칸이 늘 붙어 있습니다. 움직임 없이 제자리에 있습니다.","tr":"휴대폰 화면 맨 아래 줄.","rec":1,"w":390},{"n":6,"a":0,"pg":"list","t":"「상담·메뉴」 버튼이 가리지 않게","was":"오른쪽 아래 「상담·메뉴 +」 버튼이 상품 가격·실측 글자를 가립니다(오늘 화면에서도 보임).","now":"글자 없는 동그란 버튼으로 줄이고 조금 위로 올려 상품 칸을 덜 가립니다. 5번을 켜면 아래 메뉴 안으로 들어갑니다.","tr":"휴대폰 오른쪽 아래 동그란 버튼.","w":390},{"n":7,"a":0,"pg":"list","t":"PC 오른쪽 아이콘 줄 접기","was":"오른쪽 끝 세로 아이콘 9개(TODAY·배송·관심·장바구니·인스타·페북·카톡·톡톡·위아래)가 다섯째 상품 사진 위에 겹칩니다.","now":"「바로가기」 탭 하나로 접어 두고, 누르면 아홉 칸이 펼쳐집니다.","tr":"오른쪽 끝 「바로가기」를 눌러 보세요.","rec":1,"w":1440},{"n":8,"a":0,"pg":"list","t":"로그인 · 장바구니 표시 정리","was":"회색 알약 「LOGIN」만 모양이 달라 튀고, 장바구니 숫자는 담겨 있어도 검정이라 눈에 덜 띕니다.","now":"「로그인」을 다른 아이콘과 같은 글씨로 맞추고, 장바구니에 담긴 게 있으면 숫자가 빨갛게 됩니다.","tr":"머리말 오른쪽. 목록에서 장바구니 아이콘을 눌러 담아 보세요."},{"n":9,"a":1,"pg":"main","t":"첫 화면 버튼 또렷하게","was":"사진 위 BRAND · WOMEN · MEN · KIDS가 그냥 글자라 누르는 곳인지 잘 모릅니다.","now":"흰 테두리 버튼으로 바꾸고 누르는 칸을 크게 했습니다(휴대폰은 2×2).","tr":"첫 화면 가운데 네 버튼.","rec":1},{"n":10,"a":1,"pg":"main","t":"오늘 들어온 옷 수 띠","was":"「매주 새로운 상품 업데이트!」만 있어 오늘 얼마나 들어왔는지 모릅니다.","now":"첫 화면 아래에 「오늘 새로 들어온 옷 312벌」 띠를 둡니다(숫자는 예시, 실제는 그날 등록 수).","tr":"첫 화면 사진 바로 아래 검은 띠."},{"n":11,"a":1,"pg":"main","t":"분류 사진 칸","was":"첫 화면 다음이 바로 상품 줄이라 큰 분류로 들어가는 길이 메뉴뿐입니다.","now":"여자 · 남자 · 아우터 · 브랜드 네 칸을 실제 상품 사진으로 보여 줍니다.","tr":"첫 화면 아래 네 칸."},{"n":12,"a":1,"pg":"main","t":"인기 브랜드 줄","was":"브랜드로 고르려면 「브랜드」 메뉴로 따로 가야 합니다.","now":"메인에 많이 찾는 브랜드 이름 버튼 줄을 둡니다.","tr":"메인 중간 「BRAND」 줄."},{"n":13,"a":1,"pg":"main","t":"가격대 바로가기","was":"90% 세일인데 싼 옷만 모아 보는 길이 없습니다.","now":"「1만원 이하 · 3만원 이하 · 5만원 이하 · 10만원 이상」 버튼을 둡니다.","tr":"메인 「PRICE」 줄."},{"n":14,"a":1,"pg":"main","t":"지금 계절 추천","was":"계절이 바뀌어도 메인 구성이 같습니다.","now":"지금(11월)은 코트 · 니트 · 패딩 · 블레이저 · 머플러 버튼을 맨 앞에 둡니다. 달마다 바뀝니다.","tr":"메인 「WINTER」 줄."},{"n":15,"a":1,"pg":"main","t":"최근 본 상품 줄","was":"PC 오른쪽 「TODAY 0」 칸에만 있어 휴대폰에서는 볼 길이 없습니다.","now":"메인과 목록 아래에 최근 본 상품 사진 줄을 둡니다. PC·휴대폰 같습니다.","tr":"메인 아래쪽 「최근 본 상품」."},{"n":16,"a":1,"pg":"main","t":"사진 후기 모아 보기","was":"후기는 게시판에 들어가야 봅니다.","now":"메인에 사진 후기 네 개를 별점과 함께 보여 줍니다(글은 예시).","tr":"메인 「REVIEW」 줄."},{"n":17,"a":2,"pg":"list","t":"실측을 칸으로 정리","was":"「어깨 : 45 가슴 : 49 소매 : 64 총기장」 다음 줄에 「: 75」만 떨어지는 칸이 많습니다(오늘 화면).","now":"어깨 39 · 가슴 45 · 소매 16 · 총장 55처럼 항목마다 작은 칸으로 나눠 줄이 끊겨도 숫자가 떨어지지 않습니다.","tr":"상품 가격 아래 회색 칸들.","rec":1},{"n":18,"a":2,"pg":"list","t":"사이즈 글자 칸","was":"M · L · XL이 긴 상품명 맨 끝에 묻혀 있습니다.","now":"상품명 끝 사이즈를 따로 테두리 칸으로 보여 줍니다.","tr":"상품명 아래 「L」 「XL」 칸.","rec":1},{"n":19,"a":2,"pg":"list","t":"가격 한 줄로","was":"정가 줄, 빨간 「할인판매가」 상자와 가격 줄로 두 줄을 씁니다.","now":"「153,300원 219,000원 30%」 한 줄로 줄여 칸 높이가 낮아지고 120개를 더 빨리 훑습니다.","tr":"상품 가격 줄."},{"n":20,"a":2,"pg":"list","t":"할인 동그라미 작게","was":"사진 오른쪽 위 검은 동그라미(48px)가 옷 어깨를 가리기도 합니다.","now":"모서리 작은 빨간 꼬리표로 바꿉니다.","tr":"사진 오른쪽 위."},{"n":21,"a":2,"pg":"list","t":"사진에 올리면 뒷모습","was":"뒷모습을 보려면 상세로 들어가야 합니다.","now":"PC에서 사진 위에 마우스를 올리면 둘째 사진(뒷모습)으로 바뀝니다. 움직임 없이 바로 바뀌고, 휴대폰은 그대로입니다.","tr":"앞쪽 상품 12개 사진에 마우스를 올려 보세요.","rec":1,"w":1440},{"n":22,"a":2,"pg":"list","t":"내 사이즈 표시","was":"손님이 매번 실측 숫자를 하나씩 읽어 맞는지 봐야 합니다.","now":"목록 위에 내 가슴 단면 범위를 한 번 넣으면 맞는 옷에 노란 「내 사이즈」 표가 붙습니다. 이 컴퓨터에 기억합니다.","tr":"목록 위 노란 칸 숫자를 바꿔 보세요."},{"n":23,"a":2,"pg":"list","t":"새로 들어온 옷 표시","was":"신상품순이어도 어느 것이 오늘 들어왔는지 표시가 없습니다.","now":"등록 하루 안의 상품 사진 왼쪽 위에 「NEW」를 붙입니다.","tr":"앞쪽 여섯 칸 사진 왼쪽 위."},{"n":24,"a":2,"pg":"list","t":"품절은 뒤로 보내기","was":"품절 상품이 목록 중간에 섞여 있습니다.","now":"정렬 줄에 「품절 뒤로」 스위치를 두고, 켜면 품절 상품이 맨 뒤로 갑니다. 지운 상품은 없습니다.","tr":"정렬 줄 「품절 뒤로」를 켜고 꺼 보세요."},{"n":26,"a":2,"pg":"list","t":"정렬 줄 위에 붙이기","was":"아래로 내리면 필터·정렬 줄이 사라져 다시 올라가야 합니다.","now":"머리말 바로 아래에 붙어 따라옵니다(움직임 없이 붙어 있기만 합니다).","tr":"목록을 아래로 내려 보세요.","rec":1},{"n":27,"a":2,"pg":"list","t":"휴대폰 관심 · 장바구니 칸 크게","was":"칸 아래 관심 · 장바구니 · 좋아요 칸이 32px로 작고 흐려서 잘못 누르기 쉽습니다.","now":"46px로 키우고 아이콘 아래에 「관심」 「담기」 글자를 붙입니다.","tr":"휴대폰 상품 칸 아래 세 칸.","rec":1,"w":390},{"n":28,"a":2,"pg":"list","t":"상품명 두 줄로 맞추기","was":"상품명이 한 줄인 칸과 세 줄인 칸이 섞여 가격 높이가 들쭉날쭉합니다.","now":"두 줄까지만 보이고 칸 높이를 맞춰 가격이 한 줄에 나란히 섭니다.","tr":"옆 칸끼리 가격 높이를 비교해 보세요."},{"n":29,"a":2,"pg":"list","t":"아래 「다음 120개」 버튼","was":"맨 아래 작은 페이지 숫자만 있습니다.","now":"「다음 120개 보기」 큰 버튼을 두고 페이지 숫자는 그 아래에 그대로 둡니다. 한 쪽 120개는 그대로입니다.","tr":"목록 맨 아래."},{"n":30,"a":2,"pg":"list","t":"브랜드 글자 크기 맞추기","was":"브랜드 글자(20px 굵은 명조)가 상품명보다 훨씬 커서 칸마다 브랜드만 눈에 들어옵니다.","now":"15px 자간 넓힌 글씨로 줄여 상품명 · 가격과 균형을 맞춥니다.","tr":"사진 아래 브랜드 이름."},{"n":31,"a":3,"pg":"detail","t":"아래 구매 줄에 가격","was":"휴대폰 아래 「관심상품 · 장바구니 · 구매하기」에 가격이 없어 위로 올려 확인해야 합니다.","now":"관심 · 담기는 아이콘으로 줄이고 「153,300원 구매하기」로 가격을 함께 보여 줍니다.","tr":"휴대폰 화면 맨 아래 구매 줄.","rec":1,"w":390},{"n":32,"a":3,"pg":"detail","t":"실측 그림","was":"「어깨 : 44 가슴 : 50 …」 글자뿐이라 어디를 잰 건지 모릅니다.","now":"옷 그림 위에 잰 자리를 선으로 긋고 숫자를 붙입니다. 대분류(상의·하의)마다 그림이 다릅니다.","tr":"상품 정보 아래 옷 그림.","rec":1},{"n":33,"a":3,"pg":"detail","t":"내 옷과 비교","was":"손님이 집에 있는 옷 치수와 하나하나 빼 봐야 합니다.","now":"내 옷 치수를 한 번 넣으면 이 옷이 몇 cm 크고 작은지 바로 보여 줍니다. 이 컴퓨터에 기억합니다.","tr":"「내 옷과 비교」 표 숫자를 바꿔 보세요."},{"n":35,"a":3,"pg":"detail","t":"아낀 금액 표시","was":"「(30% 할인)」만 있습니다.","now":"할인 가격 옆에 「65,700원 아껴요」를 붙입니다.","tr":"할인판매가 옆.","rec":1},{"n":36,"a":3,"pg":"detail","t":"배송 · 반품 세 줄 요약","was":"배송·반품 안내가 상세 맨 아래 긴 글에 있습니다.","now":"구매 버튼 아래 세 줄로 요약합니다. 문구는 예시라 실제 기준으로 바꿔야 합니다.","tr":"구매 버튼 아래 네모 칸."},{"n":37,"a":3,"pg":"detail","t":"사진 종류 표시","was":"작은 사진 여섯 장이 무엇인지 하나씩 눌러 봐야 압니다.","now":"작은 사진 아래 「앞 · 뒤 · 택 · 소재 · 디테일」 글자를 붙입니다.","tr":"큰 사진 아래 작은 사진 줄.","rec":1},{"n":38,"a":3,"pg":"detail","t":"사진 크게 보기","was":"큰 사진을 눌러도 더 크게 볼 수 없습니다.","now":"사진을 누르면 화면 가득 검은 바탕에 크게 열립니다(휴대폰은 손가락으로 키움). 움직임 없이 바로 열립니다.","tr":"큰 사진을 눌러 보세요."},{"n":39,"a":3,"pg":"detail","t":"상품코드 복사","was":"상담할 때 손님이 상품코드를 손으로 옮겨 적습니다.","now":"상품코드 옆 「복사」 버튼.","tr":"「자체 상품코드」 옆 복사 버튼."},{"n":40,"a":3,"pg":"detail","t":"이 상품으로 카카오 상담","was":"카카오 상담을 열면 어떤 상품인지 손님이 다시 말해야 합니다.","now":"상세에 「이 상품 카카오 상담」 버튼을 두고, 상품코드와 이름이 첫 말로 들어갑니다.","tr":"구매 버튼 아래 노란 버튼."},{"n":41,"a":3,"pg":"detail","t":"같은 브랜드 · 비슷한 사이즈","was":"상세 아래가 바로 바닥이라 다른 옷으로 넘어갈 길이 없습니다.","now":"같은 브랜드와 비슷한 실측 옷 여섯 벌을 보여 줍니다.","tr":"상세 아래 사진 줄."},{"n":42,"a":3,"pg":"detail","t":"한 벌뿐 안내","was":"빈티지 단품이라는 안내가 없어 「나중에 사야지」 하다 놓칩니다.","now":"「한 벌뿐인 빈티지예요. 품절되면 다시 들어오지 않아요.」 한 줄을 둡니다. 「몇 명이 보는 중」 같은 지어낸 숫자는 쓰지 않습니다.","tr":"가격 표 아래 점선 칸."},{"n":43,"a":4,"pg":"list","t":"담으면 작은 확인 창","was":"장바구니를 누르면 장바구니 화면으로 넘어가거나 알림만 떠서, 보던 목록 자리를 잃습니다.","now":"아래에 작은 창으로 「담았어요」와 사진을 보여 주고 「계속 보기 / 장바구니」를 고르게 합니다. 움직임 없이 나타납니다.","tr":"목록 칸 장바구니 아이콘을 눌러 보세요(휴대폰은 칸 아래, PC는 상세 「장바구니」).","rec":1},{"n":44,"a":4,"pg":"cart","t":"무료배송까지 남은 금액","was":"얼마를 더 사면 무료배송인지 장바구니에서 계산해야 합니다.","now":"장바구니 위에 막대로 「16,700원 더 담으면 무료배송」을 보여 줍니다(기준 금액은 예시).","tr":"장바구니 맨 위 막대.","rec":1},{"n":45,"a":4,"pg":"cart","t":"장바구니 속 품절 표시","was":"담아 둔 사이 다른 손님이 사 가면 주문 단계에서야 알게 됩니다.","now":"장바구니에서 품절된 줄을 빨간 바탕으로 표시하고 「빼기」 버튼을 줍니다.","tr":"장바구니 둘째 줄."},{"n":46,"a":4,"pg":"cart","t":"결제 버튼 정리","was":"PC에서 네이버페이 버튼이 주문 버튼과 떨어진 아래 상자에 따로 있습니다(남은 일 「PC 네이버페이 자리」).","now":"「주문하기」를 크게 두고 바로 아래 네이버페이 · 카카오페이를 한 줄로 둡니다.","tr":"장바구니 아래 버튼들."},{"n":47,"a":5,"pg":"main","t":"휴대폰 회사 정보 접기","was":"휴대폰 바닥에 회사 정보가 길게 펼쳐져 있어 끝까지 내려야 합니다.","now":"고객센터만 보이고 회사 정보는 「사업자 정보 펼치기」로 접어 둡니다. PC는 그대로 펼쳐 둡니다.","tr":"휴대폰 맨 아래로 내려 보세요.","rec":1,"w":390},{"n":48,"a":5,"pg":"main","t":"운영시간 · 전화 한 줄","was":"운영시간과 전화가 바닥 글 사이에 섞여 있습니다.","now":"바닥 맨 위에 「고객센터 전화 · 운영시간」 한 줄 칸을 둡니다. 글자는 세부값에서 바꿉니다.","tr":"메인 바닥 맨 위 흰 칸."},{"n":49,"a":5,"pg":"list","t":"SALE 띠","was":"메뉴의 SALE 칩만 있고 목록에는 세일 안내가 없습니다.","now":"목록 위에 빨간 띠로 「SALE 상품만 보기」 길을 둡니다. 문구·연결 분류는 세부값에서 바꿉니다.","tr":"목록 제목 아래 빨간 띠."},{"n":50,"a":5,"pg":"list","t":"작은 글씨 키우기","was":"정가 · 실측 · 바닥 글씨가 12~13px 연한 회색이라 읽기 어렵고 접근성 점수도 깎입니다(남은 일 「작은 글씨」).","now":"14px 이상, 진한 회색으로 올립니다. 모양은 그대로입니다.","tr":"정가 · 실측 · 정렬 줄 글씨.","rec":1}];
  var IMPC = SH.imp || { file: '/_/main/vt_hero/imps.html', id: 'vt-imps-cfg' }, IMP_FILE = IMPC.file, IMPD_FILE = '/_/main/vt_hero/imps_def.html', ED_FILE = '/_/main/vt_hero/editor.html';
  var IMP_ST = { ready: '만들었음', wip: '준비 중', no: '안 됨', have: '이미 있음' };
  state.top = 'design'; state.selDel = { main: {}, hdr: {}, imp: {}, sst: {} }; state.showDel = {}; state._vis = { main: [], hdr: [], imp: [], sst: [] }; state.impOpen = {};
  (function () {
    var e = document.getElementById(IMPC.id), c = null; try { c = e ? JSON.parse(e.textContent) : null; } catch (x) { c = null; }
    state.imp = c && c.on ? { v: 1, on: c.on } : { v: 1, on: {} }; state.impOrig = JSON.stringify(state.imp); state.impLinked = !!e;
    state.ed = { v: 1, hide: { main: [], hdr: [], imp: [], fx: [], sst: [] }, fxPick: [], fxVal: {} }; state.edOrig = JSON.stringify(state.ed); state.impDef = null;
  })();
  function jsonIn(t, id) { var m = new RegExp('<script[^>]*id="' + id + '"[^>]*>([\\s\\S]*?)<\\/script>').exec(String(t || '')); if (!m) { return null; } try { return JSON.parse(m[1]); } catch (e) { return null; } }
  function impFile(c) {
    var j = JSON.stringify({ v: 1, on: c.on || {} }).replace(/</g, '\\u003c');
    if (IMPC.plain) { return '<script type="application/json" id="' + IMPC.id + '">' + j + '</script>\n'; } /* 4.8 읽는 코드는 그 쇼핑몰 쪽(boot.html)에 있음 */
    return '<script type="application/json" id="vt-imps-cfg">' + j + '</script>\n' +
      '<script>(function(){var W=window,D=document,H=D.documentElement;function rd(){var c={v:1,on:{}};try{c=JSON.parse(D.getElementById(\'vt-imps-cfg\').textContent)||c;}catch(e){}try{if(W.sessionStorage&&sessionStorage.getItem(\'vtimp_preview\')===\'1\'){var p=localStorage.getItem(\'vtimp_prev_\'+location.hostname);if(p){c=JSON.parse(p)||c;}}}catch(e){}return c;}function ap(c){var o=c.on||{};[].slice.call(H.classList).forEach(function(k){if(/^vtimp-\\d+$/.test(k)){H.classList.remove(k);}});for(var i=H.style.length-1;i>=0;i--){var pn=H.style[i];if(pn.indexOf(\'--vtimp-\')===0){H.style.removeProperty(pn);}}Object.keys(o).forEach(function(n){H.classList.add(\'vtimp-\'+n);var x=o[n]||{};Object.keys(x).forEach(function(k){var v=x[k];if(typeof v===\'boolean\'){v=v?1:0;}if(typeof v===\'string\'||typeof v===\'number\'){H.style.setProperty(\'--vtimp-\'+n+\'-\'+k,String(v));}});});W.VTIMP={cfg:c,on:function(n){return !!o[n];},val:function(n,k,d){var x=o[n];return x&&x[k]!=null?x[k]:d;}};}ap(rd());W.addEventListener(\'storage\',function(e){if(e.key===\'vtimp_prev_\'+location.hostname){try{if(sessionStorage.getItem(\'vtimp_preview\')!==\'1\'){return;}}catch(x){return;}ap(rd());try{W.dispatchEvent(new CustomEvent(\'vtimp:change\'));}catch(x){}}});})();</script>\n';
  }
  function edFile(c) { return '<script type="application/json" id="vt-editor-cfg">' + JSON.stringify(c).replace(/</g, '\\u003c') + '</script>\n'; }
  /* 카페24 관리자에서 세 파일 읽기(쇼핑몰 편집기만, 웹앱은 손님 화면에 있는 켜짐만) */
  function impLoad() {
    if (WEB || !RESP || !/\.cafe24\.com$/.test(location.hostname)) { return; }
    var n = state.cfg.pc && state.cfg.pc.skinNo, H = { 'X-Requested-With': 'XMLHttpRequest' }; if (!n) { return; }
    var rd = function (f) { return fetch('/exec/admin/editor/fileOpen?skin_no=' + n + '&file=' + encodeURIComponent(f), { method: 'POST', credentials: 'include', cache: 'no-store', headers: H }).then(function (r) { return r.text(); }).then(function (t) { try { var j = JSON.parse(t); return j && typeof j.original === 'string' ? j.original : null; } catch (e) { return undefined; } }).catch(function () { return undefined; }); }; /* null = 파일 없음, undefined = 못 읽음(로그인 등) */
    Promise.all([rd(IMP_FILE), rd(IMPD_FILE), rd(ED_FILE)]).then(function (a) {
      var fresh = state.H && state.H.length <= 1;
      var c = jsonIn(a[0], IMPC.id); if (c && c.on && fresh) { state.imp = { v: 1, on: c.on }; state.impOrig = JSON.stringify(state.imp); }
      state.impFileOk = a[0] != null;
      var d = jsonIn(a[1], 'vt-imps-def'); state.impDef = a[1] === undefined ? null : (d && d.items ? d.items : {}); /* 상태 파일이 없으면 모두 준비 중 */
      var ed = jsonIn(a[2], 'vt-editor-cfg'); if (ed && ed.hide && fresh) { ed.hide.main = ed.hide.main || []; ed.hide.hdr = ed.hide.hdr || []; ed.hide.imp = ed.hide.imp || []; ed.hide.fx = ed.hide.fx || []; ed.hide.sst = ed.hide.sst || []; ed.fxPick = ed.fxPick || []; ed.fxVal = ed.fxVal || {}; var keepH = state.ed && state.ed.hide; state.edOrig = JSON.stringify(ed); state.ed = ed; hideMerge(keepH); }
      if (fresh && state.H && state.H[0]) { state.H[0].s = snapAll(); setBase(); }
      impApplyAll(); fxAll(); if (state.top === 'imp' || state.tab === 'style' || state.tab === 'hstyle') { build(); }
    });
  }
  function impObj() { var o = {}, on = (state.imp && state.imp.on) || {}; Object.keys(on).forEach(function (n) { o[n] = on[n] || {}; }); return o; }
  function impApplyDoc(d) {
    if (!d || !d.documentElement) { return; }
    var Hh = d.documentElement, o = impObj(), w = d.defaultView;
    [].slice.call(Hh.classList).forEach(function (k) { if (/^vtimp-\d+$/.test(k)) { Hh.classList.remove(k); } });
    for (var i = Hh.style.length - 1; i >= 0; i--) { var pn = Hh.style[i]; if (pn.indexOf('--vtimp-') === 0) { Hh.style.removeProperty(pn); } }
    Object.keys(o).forEach(function (n) { Hh.classList.add('vtimp-' + n); Object.keys(o[n]).forEach(function (k) { var v = o[n][k]; if (typeof v === 'boolean') { v = v ? 1 : 0; } if (typeof v === 'string' || typeof v === 'number') { Hh.style.setProperty('--vtimp-' + n + '-' + k, String(v)); } }); });
    if (w) { w.VTIMP = { cfg: { v: 1, on: o }, on: function (n) { return !!o[n]; }, val: function (n, k, dv) { var x = o[n]; return x && x[k] != null ? x[k] : dv; } }; try { w.dispatchEvent(new w.CustomEvent('vtimp:change')); } catch (e) { } try { if (typeof w.vtImpLoad === 'function') { w.vtImpLoad({ v: 1, on: o }); } else if (w.vtImp && typeof w.vtImp.apply === 'function') { w.vtImp.apply({ v: 1, on: o }); } } catch (e) { } }
  }
  var IW = { pc: null, mob: null };
  function impApplyAll() {
    try { localStorage.setItem('vtimp_prev_' + location.hostname, JSON.stringify({ v: 1, on: impObj() })); } catch (e) { }
    impApplyDoc(document);
    ['pc', 'mob'].forEach(function (k) { var w = IW[k]; try { if (w && !w.closed && w.document) { impApplyDoc(w.document); } } catch (e) { } });
  }
  function impPrevClear() { try { localStorage.removeItem('vtimp_prev_' + location.hostname); } catch (e) { } }
  addEventListener('beforeunload', function () { impPrevClear(); try { sessionStorage.removeItem('vtimp_preview'); } catch (e) { } });
  function impInfo(n) { for (var i = 0; i < IMPS.length; i++) { if (IMPS[i].n === n) { return IMPS[i]; } } return null; }
  function impDef(n) { var D = state.impDef; return D ? D[String(n)] || null : null; }
  function impStatus(n) { if (n === 9 && RESP) { return 'ready'; } if (WEB || !state.impDef) { return 'unknown'; } var d = impDef(n); var st = d && IMP_ST[d.st] ? d.st : 'wip'; if (n === 10 && st === 'no') { st = 'wip'; } if (n === 9 && RESP) { st = 'ready'; } return st; } /* 4.6 10번은 숫자 자료가 없어도 준비 중 */
  function impShopOK(x) { return !x.shop || x.shop === 'talk'; }
  function impUrl(x) {
    var d = impDef(x.n); if (d && d.url) { return d.url; }
    if (x.pg === 'main') { return '/'; } if (x.pg === 'cart') { return '/order/basket.html'; }
    var it = its(state.cfg.pc || {}), u = (it[0] && it[0].u) || '/product/list.html';
    return u;
  }
  function impPreview(x) {
    var url = impUrl(x), wantDetail = x.pg === 'detail';
    try { sessionStorage.setItem('vtimp_preview', '1'); } catch (e) { }
    impApplyAll();
    [['pc', 'width=1440,height=900'], ['mob', 'width=390,height=844']].forEach(function (a) {
      var k = a[0], w = IW[k];
      if (!w || w.closed) { w = IW[k] = window.open(url, 'vtimp_' + k, a[1] + ',left=' + (k === 'pc' ? 40 : 1500) + ',top=40'); }
      else { try { w.location.href = url; } catch (e) { } }
      if (!w) { msg('미리보기 창이 막혔어요. 주소창 오른쪽 팝업 차단 아이콘에서 허용해 주세요.', 1); return; }
      var tries = 0, t = setInterval(function () {
        tries++; if (tries > 60) { clearInterval(t); return; }
        try {
          if (!w.document || w.document.readyState === 'loading' || w.location.href === 'about:blank') { return; }
          try { w.sessionStorage.setItem('vtimp_preview', '1'); } catch (e) { }
          if (wantDetail && !/detail\.html|\/product\/[^/]+\/\d+/.test(w.location.pathname)) {
            var a2 = w.document.querySelector('a.vt-item__thumb, a[href*="/product/detail.html"], a[href*="product_no="], ul.vt-list a[href*="/product/"]'); if (a2 && tries < 50) { w.location.href = a2.href; wantDetail = false; return; }
          }
          impApplyDoc(w.document); impMockDoc(w.document); clearInterval(t);
        } catch (e) { }
      }, 300);
    });
    msg(x.n + '번 「' + x.t + '」 미리보기 창(PC·휴대폰)을 열었어요. 저장하기 전에는 손님 화면이 바뀌지 않아요.');
  }
  /* 4.6 시안으로 보기: 아직 기능이 없는 번호를 편집기 화면·미리보기 창에만 그려 봄(저장·손님 화면 X) */
  state.impMock = {};
  var IMP_MOCK = {
    48: function (d) {
      if (!d.body) { return null; }
      var txt = (d.body.textContent || '').replace(/\s+/g, ' '), tel = (txt.match(/0\d{1,2}[-. ]\d{3,4}[-. ]\d{4}/) || [])[0] || '전화 번호', hr = (txt.match(/(?:AM|PM|오전|오후)\s*\d{1,2}:\d{2}\s*~\s*(?:AM|PM|오전|오후)?\s*\d{1,2}:\d{2}/) || [])[0] || '운영시간';
      var w = d.defaultView, mob = w && w.innerWidth < 1024, el = d.createElement('div');
      el.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:' + (mob ? '4px 12px' : '8px 22px') + ';background:#fff;color:#111;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;padding:' + (mob ? '12px 14px' : '16px 20px') + ';font:600 ' + (mob ? 13 : 15) + 'px/1.4 "Noto Sans KR",sans-serif;outline:2px dashed #ff8a00;outline-offset:-2px;position:relative;z-index:5';
      el.innerHTML = '<b>고객센터 ' + esc(tel) + '</b><span style="font-weight:400">운영시간 ' + esc(hr.replace(/^운영시간\s*/, '')) + '</span><span style="font-weight:400;font-size:.75em;opacity:.6">시안 · 글자는 세부값에서</span>';
      var ft = d.querySelector('footer, #footer, .vt-ft, .xans-layout-footer, [class*="footer"]');
      if (ft && ft.parentNode) { ft.parentNode.insertBefore(el, ft); } else { d.body.appendChild(el); }
      return el;
    },
    49: function (d) {
      var w = d.defaultView; if (!w || !/\/product\/list|\/category\//.test(w.location.pathname)) { return null; }
      var mob = w.innerWidth < 1024, pct = '90%', el = d.createElement('div');
      el.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;background:#c4001f;color:#fff;padding:' + (mob ? '10px 14px' : '14px 24px') + ';margin:' + (mob ? '8px 0' : '12px 0') + ';font:600 ' + (mob ? 13 : 15) + 'px/1.3 "Noto Sans KR",sans-serif;outline:2px dashed #ff8a00;outline-offset:2px';
      el.innerHTML = '<span><b style="font-size:1.3em;letter-spacing:-0.01em;margin-right:8px">' + pct + ' SALE</b>마지막 가격 상품만 모았어요</span><span style="white-space:nowrap">세일 상품만 보기 › <i style="font-style:normal;font-weight:400;font-size:.75em;opacity:.75;margin-left:6px">시안</i></span>';
      var tg = d.querySelector('ul.vt-list, .prdList, .xans-product-listnormal'); /* 상품 칸 바로 위(정렬·필터 아래) */
      if (tg && tg.parentNode) { tg.parentNode.insertBefore(el, tg); } else { var host = d.querySelector('#contents, main') || d.body; host.insertBefore(el, host.firstChild); }
      return el;
    },
    40: function (d) {
      if (!d.body) { return null; }
      var w = d.defaultView, mob = w && w.innerWidth < 1024, el = d.createElement('div');
      el.style.cssText = 'position:fixed;z-index:2147482000;right:' + (mob ? 12 : 24) + 'px;bottom:' + (mob ? 76 : 96) + 'px;display:flex;align-items:center;gap:8px;background:#FEE500;color:#191919;border-radius:999px;padding:' + (mob ? '10px 14px' : '12px 18px') + ';font:700 ' + (mob ? 13 : 15) + 'px/1.2 "Noto Sans KR",sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.18);outline:2px dashed #ff8a00;outline-offset:3px';
      el.innerHTML = '<span style="display:inline-flex;width:22px;height:22px;border-radius:50%;background:#191919;color:#FEE500;align-items:center;justify-content:center;font-size:12px">톡</span><span>이 상품으로 카카오 상담</span><span style="font-weight:400;font-size:.75em;opacity:.7">시안</span>';
      d.body.appendChild(el); return el;
    },
    10: function (d) {
      var hero = d.getElementById('vth'); if (!hero || !hero.parentNode) { return null; }
      var w = d.defaultView, mob = w && w.innerWidth < 1024, el = d.createElement('div');
      el.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:' + (mob ? 8 : 14) + 'px;background:#111;color:#fff;font:600 ' + (mob ? 13 : 16) + 'px/1.2 "Noto Sans KR",sans-serif;height:' + (mob ? 40 : 48) + 'px;letter-spacing:-0.01em;position:relative;z-index:5;outline:2px dashed #ff8a00;outline-offset:-2px';
      el.innerHTML = '<span style="width:7px;height:7px;border-radius:50%;background:#ff3b30"></span><span>오늘 새로 들어온 옷 <b style="color:#ffcf33;font-size:1.25em">312</b>벌</span><span style="opacity:.6;font-weight:400;font-size:.8em">시안 · 숫자는 예시</span>';
      hero.parentNode.insertBefore(el, hero.nextSibling); return el;
    }
  };
  function impMockDoc(d) {
    if (!d) { return; }
    [].slice.call(d.querySelectorAll('[data-vtimp-mock]')).forEach(function (e) { e.remove(); });
    Object.keys(state.impMock).forEach(function (n) { var f = IMP_MOCK[n]; if (!f || !state.impMock[n]) { return; } try { var el = f(d); if (el) { el.setAttribute('data-vtimp-mock', n); } } catch (e) { } });
  }
  function impMockAll() { impMockDoc(document); ['pc', 'mob'].forEach(function (k) { var w = IW[k]; try { if (w && !w.closed && w.document && w.document.readyState !== 'loading') { impMockDoc(w.document); } } catch (e) { } }); }
  function impChanged(lbl) { state._lbl = lbl; pushAll(); impApplyAll(); build(); if (typeof refreshTB === 'function') { refreshTB(); } }
  /* 4.8 9번 첫 화면 버튼 또렷하게: 버튼 칸을 흰 테두리·크게(휴대폰은 2×2), 끄면 저장해 둔 원래 값으로 */
  function imp9(on, keep) {
    ['pc', 'mobile'].forEach(function (dv) {
      var c = state.cfg[dv]; if (!c) { return; }
      (c.blocks || []).forEach(function (b) {
        if (b.type !== 'buttons') { return; }
        if (on) {
          keep[b.id] = keep[b.id] || { bstyle: b.bstyle, size: b.size, gap: b.gap, w: b.w, bcolor: b.bcolor, weight: b.weight };
          b.bstyle = 'outline'; b.bcolor = b.bcolor || '#ffffff'; b.weight = Math.max(600, num(b.weight, 600)); b.size = Math.round(num(keep[b.id].size, 16) * 1.12); b.gap = dv === 'mobile' ? 10 : Math.max(18, Math.round(num(keep[b.id].gap, 30) * 0.7));
          if (dv === 'mobile') { b.w = 70; }
        } else if (keep[b.id]) { var k = keep[b.id]; b.bstyle = k.bstyle; b.size = k.size; b.gap = k.gap; b.w = k.w; b.bcolor = k.bcolor; b.weight = k.weight; delete keep[b.id]; }
      });
    });
    setBase(); changed(false, true); renderAll();
  }
  function impToggle(x, on) {
    var o = state.imp.on;
    if (x.n === 9 && RESP) { var kp = (o[9] && o[9].prev) || {}; if (on) { o[9] = { prev: kp }; } else { delete o[9]; } imp9(on, kp); /* 원래 버튼 값은 9번 값(prev)에 보관 → 편집기를 다시 열어도 끄면 원래대로 */ impChanged((on ? '개선 켬: ' : '개선 끔: ') + '9번 첫 화면 버튼 또렷하게'); if (on) { allTidy(null, true); } return; }
    if (on) {
      var d = impDef(x.n), v = {}; ((d && d.f) || []).forEach(function (f) { v[f[0]] = f[3]; }); o[x.n] = o[x.n] || v;
      (x.dep || []).forEach(function (m) { if (!o[m]) { var dm = impDef(m), vm = {}; ((dm && dm.f) || []).forEach(function (f) { vm[f[0]] = f[3]; }); o[m] = vm; } });
    } else { delete o[x.n]; }
    impChanged((on ? '개선 켬: ' : '개선 끔: ') + x.n + '번 ' + x.t);
  }
  function impField(x, f) {
    var v = state.imp.on[x.n] = state.imp.on[x.n] || {}, key = f[0], type = f[2], dv = f[3], more = f[4], el;
    if (v[key] == null) { v[key] = dv; }
    var put = function (val) { v[key] = val; state._lbl = x.n + '번 ' + f[1]; clearTimeout(state._impT); state._impT = setTimeout(function () { pushAll(); }, 400); impApplyAll(); };
    if (type === 'color') { el = document.createElement('input'); el.type = 'color'; el.value = /^#[0-9a-f]{6}$/i.test(v[key]) ? v[key] : '#000000'; el.oninput = function () { put(el.value); }; }
    else if (type === 'num') { el = document.createElement('input'); el.type = 'number'; var mo = more || {}; if (mo.min != null) { el.min = mo.min; } if (mo.max != null) { el.max = mo.max; } el.step = mo.step || 1; el.value = v[key]; el.style.width = '90px'; el.oninput = function () { put(num(el.value)); }; }
    else if (type === 'chk') { el = document.createElement('input'); el.type = 'checkbox'; el.checked = !!v[key]; el.onchange = function () { put(el.checked); }; }
    else if (type === 'sel') { el = document.createElement('select'); (more || []).forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (String(v[key]) === String(o[0])) { op.selected = true; } el.appendChild(op); }); el.onchange = function () { put(el.value); }; }
    else if (type === 'json') { el = document.createElement('textarea'); el.rows = 4; el.style.cssText = 'flex:1;font:12px/1.4 monospace'; el.value = v[key] == null ? '' : JSON.stringify(v[key], null, 1); el.onchange = function () { var t = el.value.trim(); if (!t) { delete v[key]; put(null); return; } try { put(JSON.parse(t)); el.style.borderColor = ''; } catch (e) { el.style.borderColor = '#c4001f'; msg('묶음 값 모양이 맞지 않아요(대괄호·따옴표 확인).', 1); } }; }
    else { el = document.createElement('input'); el.type = 'text'; el.value = v[key] == null ? '' : v[key]; el.style.flex = '1'; el.oninput = function () { put(el.value); }; }
    return row(f[1], el);
  }
  function isHid(kind, id) { var h = state.ed && state.ed.hide && state.ed.hide[kind]; return !!h && h.indexOf(id) > -1; }
  function liveIds(kind) {
    var a = [];
    if (kind === 'main') { try { a.push(JSON.parse(state.orig.pc || '{}').styleId); } catch (e) { } a.push(state.cfg.pc && state.cfg.pc.styleId); }
    if (kind === 'hdr') { try { var ho = JSON.parse(state.hdrOrig || '{}'); a.push(ho.st && ho.st.id); } catch (e) { } a.push(state.hdr && state.hdr.st && state.hdr.st.id); }
    if (kind === 'imp') { try { a = a.concat(Object.keys(JSON.parse(state.impOrig).on || {}).map(Number)); } catch (e) { } a = a.concat(Object.keys(state.imp.on).map(Number)); }
    if (kind === 'sst') { var so = {}; try { so = JSON.parse(state.siteOrig || '{}').styles || {}; } catch (e) { } Object.keys(so).forEach(function (k) { a.push(k + ':' + so[k]); }); var sc = (state.site && state.site.styles) || {}; Object.keys(sc).forEach(function (k) { a.push(k + ':' + sc[k]); }); }
    return a.filter(function (x) { return x != null && x !== ''; });
  }
  function delName(kind, id) {
    if (kind === 'fx') { var fx = fxInfo(id); return id + ' ' + (fx ? fx.t : ''); }
    if (kind === 'sst') { var sp0 = sstInfo(id); return (SST_NM[String(id).split(':')[0]] || '') + ' · ' + (sp0 ? sp0[1] : id); }
    if (kind === 'imp') { var x = impInfo(id); return id + '번 ' + (x ? x.t : ''); }
    if (kind === 'hdr') { var h = HSTYLES.filter(function (x) { return x[0] === id; })[0]; return h ? h[1] : id; }
    var sg = SIGS.filter(function (x) { return x[0] === id; })[0]; if (sg) { return '추천 시안 · ' + sg[1]; }
    var p = PRESETS.filter(function (x) { return x[0] === id; })[0]; return p ? p[1] : id;
  }
  function delWrap(kind, id, b) {
    var w = document.createElement('div'); w.className = 'vthC'; w.setAttribute('data-sid', kind + ':' + id); w.appendChild(b);
    var l = document.createElement('label'); l.className = 'vthX'; l.title = '체크해서 지우기';
    var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!state.selDel[kind][id];
    c.onclick = function (e) { e.stopPropagation(); }; c.onchange = function () { if (c.checked) { state.selDel[kind][id] = 1; } else { delete state.selDel[kind][id]; } delCount(kind); };
    l.appendChild(c); w.appendChild(l); state._vis[kind].push(id); return w;
  }
  function delCount(kind) { var n = Object.keys(state.selDel[kind]).length, b = bd.querySelector('[data-del="' + kind + '"]'); if (b) { b.textContent = '선택 삭제' + (n ? ' (' + n + ')' : ''); b.disabled = !n; } }
  function delBar(kind) {
    state._vis[kind] = [];
    var bar = document.createElement('div'); bar.className = 'vthDB';
    var all = document.createElement('button'); all.textContent = '전체 선택';
    all.onclick = function () { var v = state._vis[kind], allOn = v.length && v.every(function (id) { return state.selDel[kind][id]; }); v.forEach(function (id) { if (allOn) { delete state.selDel[kind][id]; } else { state.selDel[kind][id] = 1; } }); build(); };
    var del = document.createElement('button'); del.setAttribute('data-del', kind); del.className = 'vthDel';
    del.onclick = function () { delAsk(kind); };
    var hidN = ((state.ed.hide || {})[kind] || []).length, sh = document.createElement('button');
    sh.textContent = (state.showDel[kind] ? '지운 것 닫기' : '지운 것 보기') + ' (' + hidN + ')'; sh.onclick = function () { state.showDel[kind] = !state.showDel[kind]; build(); };
    bar.appendChild(all); bar.appendChild(del); bar.appendChild(sh); bd.appendChild(bar);
    setTimeout(function () { delCount(kind); }, 0);
    if (state.showDel[kind]) {
      var box = document.createElement('div'); box.className = 'vthDelBox';
      var list = (state.ed.hide[kind] || []).slice();
      if (!list.length) { box.appendChild(tip('지운 것이 없어요.')); }
      list.forEach(function (id) {
        var r = document.createElement('div'); r.className = 'vthDelRow'; var s = document.createElement('span'); s.textContent = delName(kind, id);
        var u = document.createElement('button'); u.textContent = '되살리기'; u.onclick = function () { state.ed.hide[kind] = state.ed.hide[kind].filter(function (x) { return x !== id; }); state._lbl = '되살림: ' + delName(kind, id); pushAll(); hideKeep(); build(); msg('「' + delName(kind, id) + '」를 되살렸어요. 저장하면 다음에도 보여요.'); };
        r.appendChild(s); r.appendChild(u); box.appendChild(r);
      });
      if (list.length > 1) { var ua = document.createElement('button'); ua.textContent = '모두 되살리기'; ua.onclick = function () { state.ed.hide[kind] = []; state._lbl = '모두 되살림'; pushAll(); hideKeep(); build(); }; box.appendChild(ua); }
      bd.appendChild(box);
    }
  }
  /* 지우기 전 꼭 묻기(사장님: 모르고 지우면 안 되니까) */
  function delAsk(kind, ids, focusYes) {
    var sel = ids || Object.keys(state.selDel[kind]).map(function (k) { return kind === 'imp' ? Number(k) : k; }); if (!sel.length) { return; }
    var live = liveIds(kind), ok = sel.filter(function (id) { return live.indexOf(id) < 0; }), blocked = sel.length - ok.length;
    var D0 = P.ownerDocument || document, old = D0.getElementById('vthD'); if (old) { old.remove(); }
    var d = D0.createElement('div'); d.id = 'vthD'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    var box = D0.createElement('div'); box.style.cssText = 'width:min(420px,92vw);background:#fff;color:#222;border-radius:10px;padding:18px 18px 14px;box-shadow:0 10px 40px rgba(0,0,0,.3)';
    var t = D0.createElement('p'); t.style.cssText = 'margin:0 0 6px;font-size:15px;font-weight:700;line-height:1.5';
    t.textContent = ok.length ? '선택한 ' + ok.length + '개를 삭제하시겠습니까? (지운 것에서 되살릴 수 있어요)' : '지울 수 있는 것이 없어요.'; if (focusYes && ok.length) { t.textContent += ' — Enter = 삭제, Esc = 취소'; }
    box.appendChild(t);
    if (blocked) { var bl = D0.createElement('p'); bl.style.cssText = 'margin:0 0 6px;color:#c4001f;font-size:13px'; bl.textContent = '지금 손님 화면에 쓰거나 켜져 있는 ' + blocked + '개는 지우지 않아요.'; box.appendChild(bl); }
    var ls = D0.createElement('div'); ls.style.cssText = 'max-height:30vh;overflow:auto;font-size:12px;color:#555;margin:6px 0 12px'; ls.textContent = ok.map(function (id) { return delName(kind, id); }).join(' · '); box.appendChild(ls);
    var f = D0.createElement('div'); f.style.cssText = 'display:flex;gap:8px;justify-content:flex-end';
    var no = D0.createElement('button'); no.textContent = '취소'; no.style.cssText = 'padding:8px 16px;border:1px solid #ccc;border-radius:6px;background:#fff;cursor:pointer;font:inherit';
    var yes = D0.createElement('button'); yes.textContent = '삭제'; yes.style.cssText = 'padding:8px 16px;border:0;border-radius:6px;background:#c4001f;color:#fff;cursor:pointer;font:inherit;font-weight:700'; yes.disabled = !ok.length;
    no.onclick = function () { d.remove(); msg('지우지 않았어요.'); };
    yes.onclick = function () {
      d.remove(); var h = state.ed.hide[kind] = state.ed.hide[kind] || [];
      ok.forEach(function (id) { if (h.indexOf(id) < 0) { h.push(id); } }); if (ids) { ids.forEach(function (id) { delete state.selDel[kind][id]; }); } else { state.selDel[kind] = {}; }
      state._lbl = '지움: ' + ok.length + '개 (' + (kind === 'fx' ? '기능개선' : kind === 'imp' ? '개선 제안' : kind === 'hdr' ? '머리말 스타일' : kind === 'sst' ? '대분류 스타일' : '메인 스타일') + ')'; if (kind === 'fx' && state.fxPeek && ok.indexOf(state.fxPeek) > -1) { state.fxPeek = null; } lcAfterDel(kind, ok); pushAll(); hideKeep(); if (kind === 'fx') { try { fxAll(); } catch (e9) { } } build();
      msg(ok.length + '개를 지웠어요. "지운 것 보기"에서 되살리거나 ESC로 되돌릴 수 있어요. 지운 것은 바로 기억해서 다음에 열어도 다시 나오지 않아요.' + (blocked ? ' (손님 화면에 쓰는 ' + blocked + '개는 남김)' : ''));
    };
    f.appendChild(no); f.appendChild(yes); box.appendChild(f); d.appendChild(box);
    d.addEventListener('click', function (e) { if (e.target === d) { d.remove(); } });
    D0.body.appendChild(d); (focusYes && ok.length ? yes : no).focus();
  }
  /* ===== 6.7(11/19) 목록을 자판·마우스 오른쪽 단추로: 방향키 = 옮겨 가며 보기, Enter = 체크, Delete·오른쪽 단추 = 삭제.
     지운 것은 바로 기억(이 컴퓨터 + 쇼핑몰 편집기는 editor.html, 웹앱은 웹 저장본)해서 다음에 열어도 다시 나오지 않음.
     스타일은 고른 것을 한 번 더 누르면 고르기 전 원래 상태로(목록 위 「↩ 원래 상태」 칸도 같음). 글자 넣는 칸에 커서가 있으면 자판은 글자 편집 그대로. 손님 화면은 안 바뀜(편집기 화면만) =====
     state.lcur = 지금 목록에서 고른 칸('종류:번호'), state.fxPeek = 방향키로 보는 중인 기능개선 시안(고른 것 목록·작업내역·저장에 안 들어감) */
  var HKINDS = ['main', 'hdr', 'imp', 'fx', 'sst'], HKEY = 'vth-ed-hide-' + SH.key, NOHIDE = !!window.__VTH_NOHIDE;
  function lcParse(s) { s = String(s || ''); var i = s.indexOf(':'); if (i < 0) { return null; } var k = s.slice(0, i), id = s.slice(i + 1); return { kind: k, id: k === 'imp' ? Number(id) : id, sid: s }; }
  function lcEls() { return [].slice.call(bd.querySelectorAll('[data-sid]')).filter(function (e) { return e.offsetParent !== null; }); }
  function lcEl() { if (!state.lcur) { return null; } var a = lcEls(); for (var i = 0; i < a.length; i++) { if (a[i].getAttribute('data-sid') === state.lcur) { return a[i]; } } return null; }
  function lcOn() { return state.selKind === 'none' && !!lcEl(); }
  function lcMark(scroll) {
    var a = bd.querySelectorAll('[data-sid]'), cur = null, pk = {};
    Object.keys(state.stO || {}).forEach(function (g) { var o = state.stO[g]; if (o && o.cur) { pk[o.cur] = 1; } });
    for (var i = 0; i < a.length; i++) { var s = a[i].getAttribute('data-sid'), on = state.selKind === 'none' && s === state.lcur; a[i].classList.toggle('vthCur', on); a[i].classList.toggle('vthPk', !!pk[s]); if (on) { cur = a[i]; } }
    if (cur && scroll) { try { cur.scrollIntoView({ block: 'nearest' }); } catch (e) { } }
  }
  function lcSet(sid, scroll) { state.lcur = sid; state.selKind = 'none'; try { markSel(); } catch (e) { } lcMark(scroll); }
  function lcTyping(t) {
    if (!t || !t.tagName) { return false; }
    if (t.closest && (t.closest('.ed') || t.closest('[contenteditable=true]'))) { return true; }
    if (/^(TEXTAREA|SELECT)$/.test(t.tagName)) { return true; }
    return t.tagName === 'INPUT' && !/^(checkbox|radio|button)$/i.test(t.type || '');
  }
  /* ----- 스타일: 고르기 전 원래 상태 기억 (묶음 = main · hdr · sst:대분류) ----- */
  state.stO = {};
  function stGroup(o) { return o.kind === 'sst' ? 'sst:' + String(o.id).split(':')[0] : (o.kind === 'main' || o.kind === 'hdr') ? o.kind : ''; }
  function stActive(g) {
    if (g === 'main') { return state.cfg.pc && state.cfg.pc.styleId ? 'main:' + state.cfg.pc.styleId : ''; }
    if (g === 'hdr') { return state.hdr && state.hdr.st && state.hdr.st.id ? 'hdr:' + state.hdr.st.id : ''; }
    var cat = g.slice(4), v = ((state.site && state.site.styles) || {})[cat]; return v ? 'sst:' + cat + ':' + v : '';
  }
  function stCheck(g) { var o = state.stO[g]; if (o && o.cur && stActive(g) !== o.cur) { delete state.stO[g]; } return state.stO[g] || null; }
  function stBefore(g, sid) { flushHist(); var o = stCheck(g); if (!o || !o.cur) { o = state.stO[g] = { before: snapAll(), cur: null }; } o.cur = sid; }
  function stRevert(g, quiet) {
    var o = stCheck(g); if (!o) { return false; }
    if (!o.cur) { if (!quiet) { msg('지금이 스타일을 고르기 전 원래 상태예요.'); } return true; }
    var b = JSON.parse(o.before), po = lcParse(o.cur), nm = delName(po.kind, po.id); o.cur = null; flushHist();
    if (g === 'main') { state.cfg.pc = b.pc; state.cfg.mobile = b.mobile; setBase(); state._lbl = '스타일 고르기 취소: 원래대로'; state.sel = 0; changed(false); renderAll(); build(); }
    else if (g === 'hdr') { state.hdr = b.hdr; state._hlast = b.hdr ? JSON.stringify(b.hdr) : null; state._lbl = '머리말 스타일 고르기 취소: 원래대로'; changed(true); flushHist(); build(); }
    else { state.site = b.site; siteChanged(SST_NM[g.slice(4)] + ' 스타일 고르기 취소: 원래대로'); build(); try { sstShow(g.slice(4)); } catch (e) { } }
    msg('「' + nm + '」 고르기를 취소하고 고르기 전 원래 상태로 돌아갔어요. 같은 스타일을 다시 누르면 또 적용돼요.');
    return true;
  }
  /* 목록 위 「↩ 원래 상태」 칸: 스타일을 하나라도 고른 뒤에만 보임. 누르거나 방향키로 올라가면 고르기 전 모습 */
  function stOrigRow(g) {
    var o = stCheck(g); if (!o) { return; }
    var w = document.createElement('div'); w.className = 'vthC vthOrig'; w.setAttribute('data-sid', g + ':__orig');
    var b = document.createElement('button'); b.className = o.cur ? '' : 'on'; b.style.cssText = 'width:100%;margin:0 0 8px;text-align:left;padding:8px 10px';
    b.innerHTML = '<b>↩ 원래 상태 (스타일 고르기 전)</b><small style="display:block">' + (o.cur ? '누르면 고르기 전 모습으로 돌아가요. 고른 스타일을 한 번 더 눌러도 같아요.' : '지금 보는 것이 원래 상태예요. 아래 스타일을 누르거나 방향키로 옮겨 보세요.') + '</small>';
    b.onclick = function () { stRevert(g); };
    w.appendChild(b); bd.appendChild(w);
  }
  /* ----- 방향키로 옮기기 ----- */
  function lcMove(dx, dy) {
    var els = lcEls(), cur = lcEl(), i = els.indexOf(cur), to = null; if (i < 0) { return; }
    if (dx) { to = els[i + dx] || null; }
    else {
      var r0 = cur.getBoundingClientRect(), cx = (r0.left + r0.right) / 2, best = null, bestRow = null;
      els.forEach(function (e) {
        if (e === cur) { return; } var r = e.getBoundingClientRect();
        if (dy > 0 ? r.top < r0.bottom - 2 : r.bottom > r0.top + 2) { return; }
        var row = dy > 0 ? r.top : -r.bottom, d = Math.abs((r.left + r.right) / 2 - cx);
        if (bestRow === null || row < bestRow - 4) { bestRow = row; best = { e: e, d: d }; }
        else if (Math.abs(row - bestRow) <= 4 && d < best.d) { best = { e: e, d: d }; }
      });
      to = best && best.e;
    }
    if (!to) { msg(dx < 0 || dy < 0 ? '목록의 맨 처음이에요.' : '목록의 맨 끝이에요.'); return; }
    lcShow(to);
  }
  function lcShow(el) {
    var sid = el.getAttribute('data-sid'), o = lcParse(sid); if (!o) { return; }
    state.lcur = sid; state.selKind = 'none'; state._lcS = 1;
    if (o.kind === 'fx') {
      var x = fxInfo(o.id); state.fxPeek = fxPick().indexOf(o.id) < 0 ? o.id : null; if (x) { FXD.fresh = o.id; fxGoSet(o.id); } fxAll(); build();
      if (x) { try { pvShowFx(x); } catch (e) { } msg(o.id + ' 「' + x.t + '」 시안을 보는 중이에요(방향키로 옮겨 보기 — 고른 것에는 안 들어가요). Enter = 체크, Delete = 삭제, 「👀 시안」을 누르면 고른 것에 넣어요.'); }
      return;
    }
    if (o.kind === 'imp') { state.impOpen = {}; state.impOpen[o.id] = true; build(); return; }
    var b = el.querySelector('button'); if (!b) { lcMark(true); return; }
    state._byKey = 1; try { b.click(); } finally { state._byKey = 0; }
    lcMark(true);
  }
  function lcCheck() {
    var el = lcEl(), c = el && el.querySelector('.vthX input'); if (!c) { msg('이 칸은 체크할 것이 없어요.'); return; }
    c.checked = !c.checked; if (c.onchange) { c.onchange(); }
    var o = lcParse(state.lcur), n = Object.keys(state.selDel[o.kind] || {}).length;
    msg((c.checked ? '체크했어요' : '체크를 풀었어요') + ' (지금 ' + n + '개 체크). Delete 를 누르면 체크한 것을 지워요.');
  }
  function lcDelete(sid) {
    var o = lcParse(sid || state.lcur); if (!o || !state.selDel[o.kind]) { return; }
    if (/__orig$/.test(String(o.id))) { msg('「원래 상태」 칸은 지우는 것이 아니에요.'); return; }
    var n = Object.keys(state.selDel[o.kind]).length;
    if (n) { delAsk(o.kind, null, true); } else { delAsk(o.kind, [o.id], true); }
  }
  function lcMenuClose() { var D0 = P.ownerDocument || document, m = D0.getElementById('vthM'); if (m) { m.remove(); return true; } return false; }
  function lcMenu(e, sid) {
    lcMenuClose(); var D0 = P.ownerDocument || document, o = lcParse(sid), W = D0.defaultView || window; if (!o || !state.selDel[o.kind]) { return; }
    var m = D0.createElement('div'); m.id = 'vthM'; m.setAttribute('role', 'menu');
    m.style.cssText = 'position:fixed;z-index:2147483300;min-width:170px;background:#fff;color:#222;border:1px solid #bbb;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.28);padding:5px;font:13px/1.4 "Noto Sans KR","Malgun Gothic",sans-serif';
    var add = function (t, fn, red) { var b = D0.createElement('button'); b.type = 'button'; b.setAttribute('role', 'menuitem'); b.textContent = t; b.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 10px;border:0;border-radius:5px;background:#fff;cursor:pointer;font:inherit;color:' + (red ? '#c4001f;font-weight:700' : '#222'); b.onmouseenter = function () { b.style.background = '#f1f1f1'; }; b.onmouseleave = function () { b.style.background = '#fff'; }; b.onclick = function () { lcMenuClose(); fn(); }; m.appendChild(b); return b; };
    var ck = !!state.selDel[o.kind][o.id], n = Object.keys(state.selDel[o.kind]).length, orig = /__orig$/.test(String(o.id));
    var hd = D0.createElement('div'); hd.textContent = orig ? '원래 상태' : delName(o.kind, o.id); hd.style.cssText = 'padding:5px 10px 6px;color:#666;font-size:12px;border-bottom:1px solid #eee;margin-bottom:4px;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'; m.appendChild(hd);
    var first = null;
    if (!orig) {
      first = add('🗑 삭제', function () { delAsk(o.kind, [o.id], true); }, true);
      if (n > 1 || (n === 1 && !ck)) { add('🗑 체크한 ' + n + '개 삭제', function () { delAsk(o.kind, null, true); }, true); }
      add(ck ? '☐ 체크 풀기' : '☑ 체크하기', function () { lcCheck(); });
    }
    add('닫기', function () { });
    D0.body.appendChild(m);
    var r = m.getBoundingClientRect(), x = Math.min(e.clientX, W.innerWidth - r.width - 6), y = Math.min(e.clientY, W.innerHeight - r.height - 6);
    m.style.left = Math.max(4, x) + 'px'; m.style.top = Math.max(4, y) + 'px';
    if (first) { try { first.focus(); } catch (e2) { } }
    setTimeout(function () { var off = function (ev) { if (m.contains(ev.target)) { return; } lcMenuClose(); D0.removeEventListener('mousedown', off, true); D0.removeEventListener('wheel', off, true); }; D0.addEventListener('mousedown', off, true); D0.addEventListener('wheel', off, true); }, 0);
  }
  /* 목록 칸을 누르면 그 칸이 '지금 칸'. 고른 스타일을 한 번 더 누르면 원래대로 */
  bd.addEventListener('click', function (e) {
    var t = e.target, w = t && t.closest && t.closest('[data-sid]');
    if (state.fxPeek && !state._byKey) { state.fxPeek = null; try { fxAll(); } catch (e0) { } }
    if (!w) { return; }
    var sid = w.getAttribute('data-sid'), o = lcParse(sid); state.lcur = sid; state.selKind = 'none';
    var g = o ? stGroup(o) : '';
    if (g && !/__orig$/.test(String(o.id)) && !t.closest('.vthX') && t.closest('button') === w.querySelector('button')) {
      var so = stCheck(g);
      if (!state._byKey && so && so.cur === sid) { e.preventDefault(); e.stopPropagation(); stRevert(g); setTimeout(function () { lcMark(); }, 0); return; }
      stBefore(g, sid);
      if (o.kind === 'main' || o.kind === 'hdr') { setTimeout(function () { try { if (o.kind === 'main' && PV.on && PV.pg !== 'main') { pvClose(); } pvDocNow().defaultView.scrollTo(0, 0); } catch (e2) { } }, 0); } /* 6.8 */
    }
    setTimeout(function () { try { markSel(); } catch (e1) { } lcMark(); }, 0);
  }, true);
  bd.addEventListener('contextmenu', function (e) {
    var t = e.target, w = t && t.closest && t.closest('[data-sid]'); if (!w || lcTyping(t)) { return; }
    e.preventDefault(); lcSet(w.getAttribute('data-sid')); lcMenu(e, w.getAttribute('data-sid'));
  });
  /* 자판: true 를 돌려주면 여기서 처리함 */
  function lcKey(e) {
    var t = e.target, D0 = P.ownerDocument || document, k = e.key;
    if (k === 'Escape') { if (lcMenuClose()) { return true; } if (state.fxPeek) { state.fxPeek = null; fxAll(); build(); msg('보던 시안을 껐어요.'); return true; } return false; }
    if (e.ctrlKey || e.metaKey || e.altKey) { return false; }
    if (D0.getElementById('vthD') || document.getElementById('vthD')) { return false; }
    if (D0.getElementById('vthM')) { if (k === 'Delete') { lcMenuClose(); e.preventDefault(); lcDelete(); return true; } return false; }
    if (lcTyping(t) || !lcOn()) { return false; }
    var A = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
    if (A) { e.preventDefault(); lcMove(A[0], A[1]); return true; }
    if (k === 'Enter') { var el = lcEl(); if (t && t.tagName && /^(BUTTON|A)$/.test(t.tagName) && !el.contains(t)) { return false; } e.preventDefault(); lcCheck(); return true; }
    if (k === 'Delete') { e.preventDefault(); lcDelete(); return true; }
    return false;
  }
  /* ----- 지운 것 바로 기억 ----- */
  function hideLocal() { var L = null; try { L = JSON.parse(localStorage.getItem(HKEY) || 'null'); } catch (e) { } return L && typeof L === 'object' ? L : { h: {}, un: {} }; }
  function hideLocalPut(L) { try { localStorage.setItem(HKEY, JSON.stringify(L)); } catch (e) { } }
  function hideMerge(src) {
    if (NOHIDE || !src || !state.ed) { return false; }
    var L = hideLocal(), ch = false; state.ed.hide = state.ed.hide || {};
    HKINDS.forEach(function (k) { var h = state.ed.hide[k] = state.ed.hide[k] || [], un = (L.un && L.un[k]) || []; (src[k] || []).forEach(function (id) { if (h.indexOf(id) < 0 && un.indexOf(id) < 0) { h.push(id); ch = true; } }); });
    return ch;
  }
  function hideLocalSync() {
    var L = hideLocal(), old = L.h || {}; L.un = L.un || {};
    HKINDS.forEach(function (k) { var now = (state.ed.hide || {})[k] || [], un = L.un[k] || []; (old[k] || []).forEach(function (id) { if (now.indexOf(id) < 0 && un.indexOf(id) < 0) { un.push(id); } }); L.un[k] = un.filter(function (id) { return now.indexOf(id) < 0; }); });
    L.h = clone(state.ed.hide || {}); L.t = Date.now(); hideLocalPut(L);
  }
  function edForSave(prev) { var e = prev && prev.hide ? clone(prev) : JSON.parse(state.edOrig || '{}'); e.v = 1; e.hide = clone(state.ed.hide || {}); e.fxPick = e.fxPick || []; e.fxVal = e.fxVal || {}; return e; }
  var hideT = 0;
  function hideSame() { var L = hideLocal().h || {}; return HKINDS.every(function (k) { return JSON.stringify((((state.ed.hide || {})[k]) || []).map(String).sort()) === JSON.stringify((L[k] || []).map(String).sort()); }); }
  function hideKeep(onlyIfChanged) { if (NOHIDE || !RESP || !state.ed) { return; } if (onlyIfChanged && hideSame()) { return; } hideLocalSync(); clearTimeout(hideT); hideT = setTimeout(hidePush, 700); }
  /* 지운 뒤 '지금 칸'을 바로 다음 칸으로(Delete 를 이어서 누를 수 있게) */
  function lcAfterDel(kind, ids) {
    var gone = {}; ids.forEach(function (id) { gone[kind + ':' + id] = 1; }); if (!state.lcur || !gone[state.lcur]) { return; }
    var els = lcEls().map(function (e) { return e.getAttribute('data-sid'); }), i = els.indexOf(state.lcur), nx = null, j;
    for (j = i + 1; j < els.length && !nx; j++) { if (!gone[els[j]] && !/__orig$/.test(els[j])) { nx = els[j]; } }
    for (j = i - 1; j >= 0 && !nx; j--) { if (!gone[els[j]] && !/__orig$/.test(els[j])) { nx = els[j]; } }
    state.lcur = nx; state._lcS = 1;
  }
  function hidePush() {
    hideT = 0; var fail = function (why) { msg('지운 것 목록을 이 컴퓨터에는 기억했어요. ' + why, 1); };
    if (WEB) {
      fetch(WEBAPP + '?api=draft&shop=' + SH.key, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (d) {
        if (!(d && d.pc && d.mobile)) { msg('지운 것 목록을 이 컴퓨터(브라우저)에 기억했어요. 다른 컴퓨터에서도 숨기려면 아래 「웹에 저장」을 한 번 눌러 주세요(그 뒤로는 지울 때마다 저절로 들어가요).'); return; } /* 웹 저장본이 아직 없으면 지우기만으로 새로 만들지 않음: 만들면 그때 디자인이 웹앱에 고정돼 나중에 쇼핑몰에서 고친 것이 안 보이게 됨 */
        var base = d; delete base.savedAt;
        base.ed = edForSave(base.ed); state._edSaving = 1;
        parent.postMessage({ vth: 'save', shop: SH.key, data: JSON.stringify(base) }, '*');
      }).catch(function () { fail('웹 저장본에는 넣지 못했어요(인터넷 연결 확인 — "웹에 저장"을 누르면 같이 저장돼요).'); });
      return;
    }
    var n = state.cfg.pc && state.cfg.pc.skinNo;
    if (!n || !/\.cafe24\.com$/.test(location.hostname)) { return; }
    var H = { 'X-Requested-With': 'XMLHttpRequest' }, ed = edForSave(null), asJ = function (r) { return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { throw new Error('login'); } }); };
    fetch('/exec/admin/editor/fileOpen?skin_no=' + n + '&file=' + encodeURIComponent(ED_FILE), { method: 'POST', credentials: 'include', cache: 'no-store', headers: H }).then(asJ).then(function (S) {
      if (S && S.bComplete === false) { S = { file: ED_FILE, new_file: 1, where: 'me' }; } else if (!S || typeof S.original !== 'string') { throw new Error('open'); }
      return fetch('/exec/admin/editor/fileSave?skin_no=' + n, { method: 'POST', credentials: 'include', headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, H), body: param(Object.assign({}, S, { content: edFile(ed) })) });
    }).then(function (r) { return r.text(); }).then(function (x) {
      if (!/^\s*\{/.test(x)) { throw new Error('login'); } if (!/bComplete":true/.test(x)) { throw new Error('save'); }
      state.edOrig = JSON.stringify(ed);
    }).catch(function () { fail('쇼핑몰에는 넣지 못했어요(카페24 관리자 로그인이 풀린 것 같아요 — 로그인한 뒤 "카페24에 바로 저장"을 누르면 같이 저장돼요).'); });
  }
  /* 열 때: 쇼핑몰의 editor.html · 웹 저장본 · 이 컴퓨터에 기억한 '지운 것'을 모두 합침(어디서 지웠든 다시 나오지 않게). 되살린 것은 빼 줌 */
  function edSync() {
    if (NOHIDE || !RESP || !state.ed) { return; }
    var put = function (h) {
      var ch = hideMerge(h); hideLocalSync();
      if (ch) { if (state.H && state.H.length <= 1 && state.H[0]) { state.H[0].s = snapAll(); setBase(); } try { fxAll(); } catch (e) { } build(); }
    };
    put(hideLocal().h);
    try { pvGet((BASE || '') + ED_FILE + '?t=' + Date.now(), function (t) { var e = jsonIn(t, 'vt-editor-cfg'); if (e && e.hide) { put(e.hide); } }); } catch (e) { }
    try { fetch(WEBAPP + '?api=draft&shop=' + SH.key, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (d) { if (d && d.ed && d.ed.hide) { put(d.ed.hide); } }).catch(function () { }); } catch (e) { }
  }
  /* 맨 위 두 칸 */
  function topBtns() {
    var tb = P.querySelectorAll('.top button'); for (var i = 0; i < tb.length; i++) { tb[i].classList.toggle('on', tb[i].getAttribute('data-a') === 'top-' + state.top); }
    var md = P.querySelector('.mode'); if (md) { md.style.display = state.top === 'imp' ? 'none' : ''; }
  }
  function tImp() {
    var on = state.imp.on, liveOn = {}; try { liveOn = JSON.parse(state.impOrig).on || {}; } catch (e) { }
    bd.appendChild(tip('번호를 켜면 미리보기 창(PC·휴대폰)에 그 화면이 켜진 모습으로 보여요. 세부값을 고치면 바로 바뀌고, 아래 "카페24에 바로 저장"을 누르면 손님 화면에 적용돼요. 끄고 저장하면 원래대로 돌아가요. PC·휴대폰 같이 바뀌고 휴대폰은 움직임이 없어요.'));
    if (!WEB && !state.impLinked && !state.impFileOk) { bd.appendChild(tip('⚠ 아직 이 쇼핑몰 대표 디자인에 개선 제안 설정 파일(' + IMP_FILE + ')이 연결되지 않았어요. 디자인 세션이 기능과 연결을 만든 번호부터 켤 수 있어요.')); }
    if (WEB) { bd.appendChild(tip('웹앱에서는 번호별 준비 상태를 확인할 수 없어 모두 켜 볼 수 있어요. 실제로 만든 번호만 화면이 바뀌어요.')); }
    var cnt = Object.keys(on).length; bd.appendChild(h4('켜진 것 ' + cnt + '개 · 손님 화면에 켜진 것 ' + Object.keys(liveOn).length + '개'));
    var fl = state.impFl = state.impFl || { a: 'all', s: 'all' };
    var fr = document.createElement('div'); fr.style.cssText = 'display:flex;gap:6px;margin:0 0 8px';
    var fa = document.createElement('select'); [['all', '모든 영역']].concat(IMP_AREAS.map(function (a, i) { return [String(i), a]; })).forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (fl.a === o[0]) { op.selected = true; } fa.appendChild(op); }); fa.onchange = function () { fl.a = fa.value; build(); };
    var fs = document.createElement('select'); [['all', '모두'], ['on', '켜진 것'], ['rec', '추천 조합'], ['ready', '만든 것만']].forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (fl.s === o[0]) { op.selected = true; } fs.appendChild(op); }); fs.onchange = function () { fl.s = fs.value; build(); };
    fr.appendChild(fa); fr.appendChild(fs); bd.appendChild(fr);
    delBar('imp');
    var shown = 0;
    IMP_AREAS.forEach(function (an, ai) {
      if (fl.a !== 'all' && String(ai) !== fl.a) { return; }
      var items = IMPS.filter(function (x) { return x.a === ai && impShopOK(x) && !isHid('imp', x.n) && (fl.s === 'all' || (fl.s === 'on' && on[x.n]) || (fl.s === 'rec' && x.rec) || (fl.s === 'ready' && impStatus(x.n) === 'ready')); });
      if (!items.length) { return; }
      bd.appendChild(h4(an));
      items.forEach(function (x) {
        shown++;
        var st = impStatus(x.n), can = st === 'ready' || st === 'unknown', isOn = !!on[x.n];
        var card = document.createElement('div'); card.className = 'vthI' + (isOn ? ' on' : '');
        var hd = document.createElement('div'); hd.className = 'vthIh';
        var sw = document.createElement('button'); sw.className = 'vthT' + (isOn ? ' on' : ''); sw.textContent = isOn ? '켜짐 ✓' : '켜기'; sw.disabled = !can && !isOn; sw.title = can ? (isOn ? '누르면 꺼요' : '누르면 켜고 미리보기 창이 열려요') : (st === 'no' ? '안 됨' : '준비 중');
        sw.onclick = function () { impToggle(x, !isOn); if (!isOn) { impPreview(x); } };
        var nm = document.createElement('b'); nm.textContent = x.n + '. ' + x.t + (x.rec ? ' ★' : ''); nm.style.flex = '1'; nm.style.cursor = 'pointer';
        nm.onclick = function () { state.impOpen[x.n] = !state.impOpen[x.n]; build(); };
        var bg = document.createElement('span'); bg.className = 'vthIb vthIb-' + st; bg.textContent = isOn ? (liveOn[x.n] ? '손님 화면 켜짐' : '켜짐(저장 전)') : (state.impMock[x.n] ? '시안 보는 중' : (st === 'unknown' ? '' : IMP_ST[st])); if (!isOn && liveOn[x.n]) { bg.textContent = '끔(저장 전)'; }
        hd.appendChild(sw); hd.appendChild(nm); hd.appendChild(bg);
        card.appendChild(hd);
        var wr = document.createElement('div'); wr.className = 'vthC'; wr.appendChild(card);
        var l = document.createElement('label'); l.className = 'vthX'; l.title = '체크해서 지우기'; var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!state.selDel.imp[x.n];
        c.onchange = function () { if (c.checked) { state.selDel.imp[x.n] = 1; } else { delete state.selDel.imp[x.n]; } delCount('imp'); }; l.appendChild(c); wr.appendChild(l); wr.setAttribute('data-sid', 'imp:' + x.n); state._vis.imp.push(x.n);
        if (state.impOpen[x.n] || isOn || state.impMock[x.n]) {
          var ds = document.createElement('div'); ds.className = 'vthId';
          ds.innerHTML = '<p><i>지금</i> ' + esc(x.was) + '</p><p><i>바꾸면</i> ' + esc(x.now) + '</p>' + (x.tr ? '<p><i>볼 곳</i> ' + esc(x.tr) + '</p>' : '');
          var dn = impDef(x.n);
          if (st === 'no') { ds.innerHTML += '<p class="vthIno">안 됨: ' + esc((dn && dn.why) || '카페24가 막음') + '</p>'; }
          if (st === 'have') { ds.innerHTML += '<p class="vthIwip">이미 있음: ' + esc((dn && dn.why) || '') + '</p>'; }
          if (dn && dn.note) { ds.innerHTML += '<p class="vthIwip">안내: ' + esc(dn.note) + '</p>'; }
          if (x.n === 9 && RESP) { ds.innerHTML += '<p class="vthIwip">이 번호는 편집기가 첫 화면 버튼 모양을 바꿔요(흰 테두리·크게, 휴대폰 2×2). 겹치는 글씨는 저절로 비켜요. 끄면 원래 모양으로 돌아가요.</p>'; }
          if (st === 'wip') { ds.innerHTML += '<p class="vthIwip">준비 중: 디자인 세션이 만들면 켤 수 있어요.' + (IMP_MOCK[x.n] ? ' 아래 「시안으로 보기」로 화면에서 먼저 볼 수 있어요(저장 안 됨).' : ' 모양은 위 설명과 「쇼핑몰 개선 제안 50가지」 시안에서 볼 수 있어요.') + '</p>'; }
          card.appendChild(ds);
          if (IMP_MOCK[x.n] && st !== 'ready') { var mk = document.createElement('button'); mk.textContent = state.impMock[x.n] ? '👀 시안 끄기' : '👀 시안으로 보기 (저장 안 됨)'; mk.style.cssText = 'margin:4px 6px 0 0' + (state.impMock[x.n] ? ';background:#ff8a00;color:#fff;border-color:#ff8a00' : ''); mk.onclick = function () { state.impMock[x.n] = !state.impMock[x.n]; impMockAll(); if (state.impMock[x.n]) { impPreview(x); msg(x.n + '번 시안을 이 화면과 미리보기 창(PC·휴대폰)에 그렸어요. 주황 점선 안이 바뀌는 곳이고 숫자는 예시예요. 저장되지 않아요.'); } else { msg(x.n + '번 시안을 껐어요.'); } build(); }; card.appendChild(mk); }
          if (isOn) { var d2 = impDef(x.n); ((d2 && d2.f) || []).forEach(function (f) { card.appendChild(impField(x, f)); }); }
          var pv = document.createElement('button'); pv.textContent = '🖥📱 이 화면 미리보기'; pv.style.marginTop = '4px'; pv.onclick = function () { impPreview(x); }; card.appendChild(pv);
        }
        bd.appendChild(wr);
      });
    });
    if (!shown) { bd.appendChild(tip('보이는 번호가 없어요(걸러 보기를 바꿔 보세요).')); }
  }
  /* ===== 5.0(11/15) 기능개선 113가지: 8개 대분류 탭, 번호마다 '👀 시안'(편집기 화면·미리보기 창에만, 쇼핑몰 저장 X),
     고른 것 = state.ed.fxPick(편집기 설정 editor.html·웹에 저장·작업내역에 같이), 지운 것 = state.ed.hide.fx. 자료: 클로드AI\기능개선_통합목록\기능개선_통합목록.json */
  var FX_GROUPS = [{"c":"M","n":"메인(머리말)","k":16},{"c":"D","n":"휴대폰 전체 메뉴","k":9},{"c":"L","n":"상품목록","k":33},{"c":"S","n":"검색","k":8},{"c":"P","n":"상품상세","k":25},{"c":"B","n":"게시판","k":7},{"c":"F","n":"하단","k":8},{"c":"C","n":"공통","k":7}];
  var FX = [{"id":"M-01","g":"M","t":"지금 있는 분류 표시","was":"목록에 들어가도 메뉴의 어느 분류에 와 있는지 표시가 없습니다.","now":"메뉴의 지금 분류에 밑줄이 생기고, 목록 위에 「홈 › 남자 › 블레이저」 길 안내가 붙습니다.","pg":"list","mk":["v","밑줄 색","#111111"]},{"id":"M-02","g":"M","t":"형제몰 바로가기 줄","was":"빈티지톡·플러스·오케이가 서로 이어져 있지 않습니다.","now":"맨 위에 얇은 검은 줄로 세 쇼핑몰 이름을 두고, 지금 쇼핑몰은 흰 글씨로 표시합니다.","pg":"main","mk":["v","바탕색","#111111","글자색","#aaaaaa","지금 쇼핑몰 색","#ffffff"]},{"id":"M-03","g":"M","t":"로그인·장바구니 표시 정리","was":"회색 알약 「LOGIN」만 모양이 달라 튀고, 장바구니 숫자는 담겨 있어도 검정이라 눈에 덜 띕니다.","now":"「로그인」을 다른 아이콘과 같은 글씨로 맞추고, 장바구니에 담긴 게 있으면 숫자가 빨갛게 됩니다.","pg":"main","mk":["v","글","로그인","숫자 색","#c4001f"]},{"id":"M-04","g":"M","t":"PC 오른쪽 아이콘 줄 접기","was":"오른쪽 끝 세로 아이콘 9개(TODAY·배송·관심·장바구니·인스타·페북·카톡·톡톡·위아래)가 다섯째 상품 사진 위에 겹칩니다.","now":"「바로가기」 탭 하나로 접어 두고, 누르면 아홉 칸이 펼쳐집니다.","pg":"main","mk":["v","단추 글","바로가기","바탕색","#111111","글자색","#ffffff"],"rec":1,"pc":1},{"id":"M-05","g":"M","t":"첫 화면 버튼 또렷하게","was":"사진 위 BRAND · WOMEN · MEN · KIDS가 그냥 글자라 누르는 곳인지 잘 모릅니다.","now":"흰 테두리 버튼으로 바꾸고 누르는 칸을 크게 했습니다(휴대폰은 2×2).","pg":"main","mk":["css","#vth [class*=\"vth-b\"] ul a{border:1.5px solid #fff!important;padding:.55em 1.3em!important;background:rgba(0,0,0,.18)}"],"rec":1},{"id":"M-06","g":"M","t":"오늘 들어온 옷 수 띠","was":"「매주 새로운 상품 업데이트!」만 있어 오늘 얼마나 들어왔는지 모릅니다.","now":"첫 화면 아래에 「새로 들어온 옷 ○벌」 띠를 둡니다. 숫자는 쇼핑몰의 실제 새상품 수입니다(오늘 등록한 수만 세려면 따로 연결이 필요해요).","pg":"main","mk":["v","띠 글","새로 들어온 옷 {수}벌","바탕색","#111111","글자색","#ffffff"],"note":"준비 중"},{"id":"M-07","g":"M","t":"분류 사진 칸","was":"첫 화면 다음이 바로 상품 줄이라 큰 분류로 들어가는 길이 메뉴뿐입니다.","now":"분류 칸마다 그 분류의 실제 상품 사진과 상품 수를 보여 줍니다. 칸 이름은 세부값에서 실제 분류 이름으로 바꿉니다.","pg":"main","mk":["v","제목","CATEGORY · 분류","칸 이름들",["여자","남자","키즈","브랜드"]],"rec":1},{"id":"M-08","g":"M","t":"신상품 줄","was":"메인에서 새 옷을 바로 보기 어렵습니다.","now":"메인에 \"새로 들어온 옷\" 줄을 실제 상품 6벌로 둡니다.","pg":"main","mk":["v","제목","NEW ARRIVALS · 새로 들어온 옷"],"rec":1},{"id":"M-09","g":"M","t":"할인 모아 보기 줄","was":"할인 옷을 따로 모아 보기 어렵습니다.","now":"할인율이 큰 실제 상품 순서로 \"할인 많이 하는 옷\" 줄을 둡니다.","pg":"main","mk":["v","제목","SALE · 할인 많이 하는 옷","할인 표시 색","#c4001f"]},{"id":"M-10","g":"M","t":"인기 브랜드 줄","was":"브랜드로 고르려면 「브랜드」 메뉴로 따로 가야 합니다.","now":"지금 메인에 올라온 상품의 실제 브랜드 이름을 버튼 줄로 둡니다. 누르면 그 브랜드 검색으로 갑니다.","pg":"main","mk":["v","제목","BRAND · 많이 찾는 브랜드","칸 이름들",[]]},{"id":"M-11","g":"M","t":"가격대 바로가기","was":"90% 세일인데 싼 옷만 모아 보는 길이 없습니다.","now":"「1만원 이하 · 3만원 이하 · 5만원 이하 · 10만원 이상」 버튼을 둡니다.","pg":"main","mk":["sec","PRICE · 가격대",["1만원 이하","3만원 이하","5만원 이하","10만원 이상"],0]},{"id":"M-12","g":"M","t":"사이즈 바로가기","was":"사이즈로 찾기 어렵습니다.","now":"S · M · L · XL · XXL 단추를 둡니다.","pg":"main","mk":["sec","SIZE · 사이즈",["S","M","L","XL","XXL"],0]},{"id":"M-13","g":"M","t":"지금 계절 추천","was":"계절이 바뀌어도 메인 구성이 같습니다.","now":"지금(11월)은 코트 · 니트 · 패딩 · 블레이저 · 머플러 버튼을 맨 앞에 둡니다. 달마다 바뀝니다.","pg":"main","mk":["v","제목","WINTER · 지금 계절 추천","칸 이름들",["코트","니트","패딩","블레이저","머플러"]]},{"id":"M-14","g":"M","t":"최근 본 상품 줄","was":"PC 오른쪽 「TODAY 0」 칸에만 있어 휴대폰에서는 볼 길이 없습니다.","now":"메인과 목록 아래에 최근 본 상품 사진 줄을 둡니다. PC·휴대폰 같습니다.","pg":"main","mk":["v","제목","최근 본 상품"]},{"id":"M-15","g":"M","t":"사진 후기 모아 보기 칸","was":"후기는 게시판에 들어가야 봅니다.","now":"실제 후기 게시판의 사진 후기를 별점과 함께 보여 줍니다(이름은 가운데를 가림).","pg":"main","mk":["v","제목","REVIEW · 사진 후기"]},{"id":"M-16","g":"M","t":"스크롤하면 머리말 얇게(휴대폰은 움직임 없이)","was":"내려도 머리말 높이가 그대로라 화면을 많이 가립니다.","now":"PC는 내리면 머리말이 얇아집니다(시안을 켜면 조금 내려서 보여 줌). 휴대폰은 움직임 없이 처음부터 얇은 모양으로 둡니다.","pg":"main","mk":["v","얇은 높이","64","아래 선 색","#dddddd"]},{"id":"D-01","g":"D","t":"소분류 펼치기","was":"☰ 창에서 큰 분류만 보이고 소분류는 따로 들어가야 합니다.","now":"☰ 창의 큰 분류 옆 ＋를 누르면 그 분류의 실제 소분류가 바로 아래에 펼쳐집니다(움직임 없이).","pg":"main","mk":["v","＋ 색","#111111"]},{"id":"D-02","g":"D","t":"창 안 검색창","was":"☰ 창에는 검색 칸이 없습니다.","now":"☰ 창 맨 위에 검색 칸을 둡니다.","pg":"main","mk":["v","안내 글","브랜드·상품명 검색"]},{"id":"D-03","g":"D","t":"최근 본 상품 줄","was":"☰ 창에서 최근 본 상품을 볼 수 없습니다.","now":"☰ 창 위쪽에 최근 본 상품 사진 줄을 둡니다.","pg":"main","mk":["v","제목","최근 본 상품"]},{"id":"D-04","g":"D","t":"관심상품 바로가기","was":"관심상품은 마이페이지 안에 있습니다.","now":"☰ 창에 「관심상품」 바로가기 칸을 둡니다.","pg":"main","mk":["v","단추 글","관심상품"]},{"id":"D-05","g":"D","t":"형제몰 바로가기","was":"☰ 창에서 다른 쇼핑몰로 갈 길이 없습니다.","now":"☰ 창 아래에 빈티지톡 · 플러스 · 오케이 바로가기를 둡니다.","pg":"main","mk":["v","제목","우리 쇼핑몰 바로가기"]},{"id":"D-06","g":"D","t":"고객센터 번호 누르면 전화","was":"고객센터 번호가 글자로만 있습니다.","now":"☰ 창의 전화번호를 누르면 휴대폰에서 바로 전화가 걸립니다(이미 되는 쇼핑몰은 표시만).","pg":"main","mk":["v","글자색","#0b57d0","옆 글","누르면 전화"]},{"id":"D-07","g":"D","t":"입금 계좌 복사","was":"입금 계좌를 손으로 옮겨 적어야 합니다.","now":"계좌 옆 「복사」를 누르면 계좌 번호가 복사됩니다.","pg":"main","mk":["v","단추 글","복사"]},{"id":"D-08","g":"D","t":"자주 가는 분류 위로","was":"분류 순서가 늘 같습니다.","now":"손님이 자주 들어간 분류를 ☰ 창 위로 올려 보여 줍니다(이 휴대폰에만 기억).","pg":"main","mk":["v","제목","자주 가는 분류","칸 이름들",["여자","남자"]]},{"id":"D-09","g":"D","t":"로그인·주문조회 한 줄 정리","was":"로그인·주문조회 글자가 흩어져 있습니다.","now":"☰ 창 맨 위에 「로그인 · 주문조회」를 한 줄로 모읍니다.","pg":"main","mk":["v","왼쪽 글","로그인","오른쪽 글","주문조회"]},{"id":"L-01","g":"L","t":"가격 한 줄로","was":"정가 줄, 빨간 「할인판매가」 상자와 가격 줄로 두 줄을 씁니다.","now":"「153,300원 219,000원 30%」 한 줄로 줄여 칸 높이가 낮아지고 120개를 더 빨리 훑습니다.","pg":"list","mk":["price1","#c4001f"],"rec":1},{"id":"L-02","g":"L","t":"아낀 금액 표시","was":"「(30% 할인)」만 있습니다.","now":"할인 가격 옆에 「65,700원 아껴요」를 붙입니다.","pg":"list","mk":["v","글자색","#c4001f","뒤에 붙는 말","아껴요"],"rec":1},{"id":"L-03","g":"L","t":"판매가 크게","was":"판매가와 원가 크기가 비슷합니다.","now":"판매가 글씨를 조금 키워 먼저 보이게 합니다.","pg":"list","mk":["v","글자색","#111111","글씨 크기","18"]},{"id":"L-04","g":"L","t":"가격 옆 할인율 숨기기","was":"사진 위 할인 표시를 켜면 할인율이 두 번 보입니다.","now":"가격 옆에 빨간 할인율 글자가 있으면 숨깁니다(사진 위 표시만 남음).","pg":"list","mk":["v","사진 위 동그라미","그대로"]},{"id":"L-05","g":"L","t":"한 벌뿐 표시","was":"중고 옷은 모두 한 벌뿐인데 따로 표시가 없습니다.","now":"판매 중인 옷의 가격 아래에 작은 글씨로 \"한 벌뿐\"을 붙입니다. 재촉하는 숫자는 쓰지 않습니다.","pg":"list","mk":["v","글자색","#8a5a00","글","한 벌뿐"]},{"id":"L-06","g":"L","t":"원산지 작은 표시","was":"MADE IN JAPAN 같은 정보가 상품명에 섞여 있습니다.","now":"원산지가 있는 옷만 사진 왼쪽 위에 작게 원산지(예: MADE IN JAPAN)를 붙입니다.","pg":"list","mk":["v","바탕색","#ffffff","글자색","#111111"]},{"id":"L-07","g":"L","t":"오늘 입고 띠","was":"오늘 들어온 옷인지 알 수 없습니다.","now":"새로 들어온 옷 사진 맨 위에 초록 \"오늘 입고\" 띠를 붙입니다(시안은 목록 맨 앞 옷에 붙임).","pg":"list","mk":["v","띠 글","오늘 입고","바탕색","#0a7a2f","글자색","#ffffff"]},{"id":"L-08","g":"L","t":"새로 들어온 옷 NEW 표시","was":"새로 들어온 옷인지 목록에서 알 수 없습니다.","now":"최근 등록한 옷 사진 왼쪽 위에 NEW 표시를 붙입니다.","pg":"list","mk":["v","딱지 글","NEW","바탕색","#c4001f","글자색","#ffffff"]},{"id":"L-09","g":"L","t":"무료배송 작은 글자","was":"배송비 정보가 목록에 없습니다.","now":"기준 금액 이상인 옷의 가격 아래에 초록 작은 글자로 \"무료배송\"을 붙입니다(기준 금액은 세부값).","pg":"list","mk":["v","글자색","#0a7a2f","글","무료배송","기준 금액","50000"]},{"id":"L-10","g":"L","t":"마우스 올리면 뒷모습(PC)","was":"앞모습 사진만 보입니다.","now":"PC에서 마우스를 올리면 그 상품의 둘째 사진(뒷모습)으로 바뀝니다(시안은 앞의 네 벌). 휴대폰은 그대로입니다.","pg":"list","mk":["v","딱지 글","뒷모습"],"rec":1,"pc":1},{"id":"L-11","g":"L","t":"사진 위 관심 하트","was":"관심 단추가 사진 아래에 작게 있습니다.","now":"사진 오른쪽 아래에 하트를 둡니다. 누르기 쉬워집니다.","pg":"list","mk":["v","바탕색","#ffffff","누른 색","#c4001f"],"rec":1},{"id":"L-12","g":"L","t":"사진 크게 보기 단추","was":"사진을 크게 보려면 상세에 들어가야 합니다.","now":"사진 오른쪽 위 돋보기를 누르면 그 자리에서 크게 봅니다.","pg":"list","mk":["v","단추 글","⤢ 크게"]},{"id":"L-13","g":"L","t":"사진 위 사이즈 글자","was":"사이즈가 상품명 끝에 묻혀 있습니다.","now":"사진 왼쪽 아래에 상품명 끝의 실제 사이즈(L · M …)를 붙입니다.","pg":"list","mk":["v","바탕색","#111111","글자색","#ffffff"]},{"id":"L-14","g":"L","t":"실측을 칸으로 정리","was":"「어깨 : 45 가슴 : 49 소매 : 64 총기장」 다음 줄에 「: 75」만 떨어지는 칸이 많습니다(오늘 화면).","now":"실제 실측(어깨·가슴·소매·총기장)을 항목마다 작은 칸으로 나눠 줄이 끊겨도 숫자가 떨어지지 않습니다.","pg":"list","mk":["v","테두리 색","#cccccc"],"rec":1},{"id":"L-15","g":"L","t":"사이즈 글자 칸","was":"M · L · XL이 긴 상품명 맨 끝에 묻혀 있습니다.","now":"상품명 끝 사이즈를 따로 테두리 칸으로 보여 줍니다.","pg":"list","mk":["v","테두리 색","#111111"],"rec":1},{"id":"L-16","g":"L","t":"상품명 두 줄로 맞추기","was":"상품명이 한 줄인 칸과 세 줄인 칸이 섞여 가격 높이가 들쭉날쭉합니다.","now":"상품명을 정한 줄 수(기본 두 줄)로 맞춰 칸 높이가 같아지고 가격이 한 줄에 나란히 섭니다.","pg":"list","mk":["v","줄 수","2"],"rec":1},{"id":"L-17","g":"L","t":"브랜드 굵게·크기 맞추기","was":"브랜드 글자 굵기·크기가 상품마다 들쭉날쭉합니다.","now":"브랜드는 굵게, 같은 크기로 맞춥니다.","pg":"list","mk":["v","글자색","#111111","글씨 크기","15"]},{"id":"L-18","g":"L","t":"상품코드 작게","was":"전화 · 카톡 상담 때 어떤 옷인지 말하기 어렵습니다.","now":"상품명 아래에 실제 상품코드를 작게 붙입니다.","pg":"list","mk":["v","글자색","#767676","앞 글","상품코드"]},{"id":"L-19","g":"L","t":"내 사이즈 표시","was":"손님이 매번 실측 숫자를 하나씩 읽어 맞는지 봐야 합니다.","now":"목록 위에 내 가슴 단면 범위를 넣으면 실측이 맞는 옷에 「내 사이즈」 표가 붙습니다. 숫자를 바꾸면 바로 다시 셉니다.","pg":"list","mk":["v","딱지 글","내 사이즈","바탕색","#0b57d0"]},{"id":"L-20","g":"L","t":"품절은 뒤로 보내기","was":"품절 상품이 목록 중간에 섞여 있습니다.","now":"정렬 줄에 「품절 뒤로」 스위치를 두고, 켜면 품절 상품이 실제로 맨 뒤로 갑니다. 지운 상품은 없습니다(시안은 품절이 있는 쪽을 엶).","pg":"list","mk":["v","단추 글","품절 뒤로"],"rec":1,"pg2":"search"},{"id":"L-21","g":"L","t":"정렬 줄 위에 붙이기","was":"아래로 내리면 필터·정렬 줄이 사라져 다시 올라가야 합니다.","now":"정렬·필터 줄이 머리말 바로 아래에 붙어 따라옵니다(시안을 켜면 조금 내려서 보여 줌. 움직임 없이 붙어 있기만 합니다).","pg":"list","mk":["v","바탕색","#ffffff"],"rec":1},{"id":"L-22","g":"L","t":"아래 다음 120개 단추","was":"쪽 번호만 있어 다음 쪽을 찾기 어렵습니다.","now":"목록 끝에 크게 \"다음 120개 보기\" 단추를 둡니다. 한 쪽 120개는 그대로입니다.","pg":"list","mk":["v","단추 글","다음 120개 보기 ›","테두리 색","#111111"]},{"id":"L-23","g":"L","t":"휴대폰 관심·장바구니 칸 크게","was":"칸 아래 관심 · 장바구니 · 좋아요 칸이 32px로 작고 흐려서 잘못 누르기 쉽습니다.","now":"46px로 키우고 아이콘 아래에 「관심」 「담기」 글자를 붙입니다.","pg":"list","mk":["v","테두리 색","#cccccc","칸 크기","46"],"rec":1,"mo":1},{"id":"L-24","g":"L","t":"목록에서 바로 담기","was":"담으려면 상세에 들어가야 합니다.","now":"칸 아래에 \"장바구니 담기\" 단추를 둡니다(한 벌뿐이라 옵션 없음).","pg":"list","mk":["v","단추 글","장바구니 담기","테두리 색","#111111"]},{"id":"L-25","g":"L","t":"담으면 작은 확인 창","was":"장바구니를 누르면 장바구니 화면으로 넘어가거나 알림만 떠서, 보던 목록 자리를 잃습니다.","now":"담으면 아래에 작은 창으로 「담았어요」와 그 옷 사진을 보여 주고 「계속 보기 / 장바구니」를 고르게 합니다. 움직임 없이 나타납니다.","pg":"list","mk":["v","창 제목","장바구니에 담았어요"],"rec":1},{"id":"L-26","g":"L","t":"본 상품 표시","was":"이미 본 옷인지 헷갈립니다.","now":"상세를 본 옷은 사진 아래에 \"본 상품\"을 작게 붙입니다(시안은 첫째·넷째 칸).","pg":"list","mk":["v","글자색","#767676","글","본 상품"]},{"id":"L-27","g":"L","t":"휴대폰 아래 고정 정렬·필터 줄","was":"휴대폰에서 정렬 · 필터가 맨 위에만 있습니다.","now":"휴대폰 화면 아래에 \"정렬 · 필터\" 줄을 고정합니다.","pg":"list","mk":["bar",["정렬","필터","사이즈","맨 위"],1],"rec":1},{"id":"L-28","g":"L","t":"분류 설명 한 줄","was":"분류 이름만 있습니다.","now":"분류 이름 아래에 한 줄 설명을 붙입니다. {분류} 자리에 실제 분류 이름이 들어갑니다.","pg":"list","mk":["v","설명 글","{분류} — 매주 새로 들어오는 수입 빈티지","글자색","#555555"]},{"id":"L-29","g":"L","t":"실측 재는 법 안내","was":"실측 숫자를 어떻게 쟀는지 모릅니다.","now":"정렬 줄 옆에 \"실측 재는 법\" 글자 링크를 두고, 누르면 재는 법이 펼쳐집니다.","pg":"list","mk":["v","링크 글","실측 재는 법","안내 글","옷을 평평하게 놓고 잽니다. 어깨는 끝에서 끝까지, 가슴은 겨드랑이 아래 단면, 총기장은 목 뒤 가운데에서 밑단까지예요."]},{"id":"L-30","g":"L","t":"SALE 띠","was":"메뉴의 SALE 칩만 있고 목록에는 세일 안내가 없습니다.","now":"목록 위에 빨간 띠로 세일 분류로 가는 길을 둡니다.","pg":"list","mk":["v","띠 글","상품만 모아 보기","바탕색","#c4001f","글자색","#ffffff"]},{"id":"L-31","g":"L","t":"품절 숨기기 스위치","was":"품절도 같이 보입니다.","now":"\"품절 숨기기\" 스위치를 켜면 판매 중인 옷만 보입니다(시안은 품절이 있는 쪽을 엶).","pg":"list","mk":["v","단추 글","품절 숨기기"],"note":"필터 확인","pg2":"search"},{"id":"L-32","g":"L","t":"고른 조건 칩 줄","was":"무엇으로 걸렀는지 잘 안 보입니다.","now":"고른 조건(분류·필터)을 칩으로 보여 주고 ✕로 하나씩, \"모두 지우기\"로 한 번에 지웁니다.","pg":"list","mk":["v","앞 글","고른 조건","지우기 글","모두 지우기"],"note":"필터 확인"},{"id":"L-33","g":"L","t":"사이즈 빠른 고르기","was":"사이즈로 고르려면 필터를 열어야 합니다.","now":"목록 위에 이 쪽에 있는 실제 사이즈 단추를 두고 누르면 바로 걸러집니다.","pg":"list","mk":["v","앞 글","사이즈 빠르게"],"note":"필터 확인","rec":1},{"id":"S-01","g":"S","t":"PC 검색 칸 펼쳐 두기","was":"PC 머리말에 돋보기 아이콘만 있어 한 번 더 눌러야 찾을 수 있습니다.","now":"PC는 머리말 오른쪽에 입력 칸이 늘 보이고, 휴대폰은 머리말 바로 아래 한 줄로 보입니다.","pg":"main","mk":["v","안내 글","브랜드·상품명 검색","테두리 색","#bbbbbb"],"rec":1},{"id":"S-02","g":"S","t":"최근 검색어","was":"검색 칸을 눌러도 아무 안내가 없습니다.","now":"검색 칸 바로 아래에 최근 찾은 말이 펼쳐집니다(이 브라우저에만 기억).","pg":"search","mk":["v","제목","최근 검색어","지우기 글","전체 지우기"]},{"id":"S-03","g":"S","t":"인기 검색어","was":"무엇을 찾을지 막막합니다.","now":"검색 칸 바로 아래에 쇼핑몰에 정해 둔 인기 검색어를 순위로 보여 줍니다.","pg":"search","mk":["v","제목","인기 검색어","순위 색","#c4001f"]},{"id":"S-04","g":"S","t":"브랜드 자동 완성","was":"브랜드 이름을 끝까지 쳐야 합니다.","now":"검색 칸에 글자를 치면 맞는 브랜드·상품 이름이 칸 바로 아래에 뜹니다(시안에서도 실제로 쳐 볼 수 있어요).","pg":"search","mk":["v","강조 색","#c4001f"]},{"id":"S-05","g":"S","t":"결과 없을 때 비슷한 상품","was":"결과가 없으면 빈 화면만 나옵니다.","now":"결과가 없을 때 「찾는 옷이 없어요」와 함께 인기 검색어·실제 상품을 보여 줍니다(시안은 결과 없는 검색 화면을 엶).","pg":"search","mk":["v","안내 글","찾는 옷이 없어요. 이런 건 어때요?","상품 줄 제목","지금 많이 보는 옷"]},{"id":"S-06","g":"S","t":"결과를 분류별로 나눠 보기","was":"검색 결과가 한 줄로 섞여 나옵니다.","now":"결과 위에 「여자 12 · 남자 30」처럼 이 쪽 결과를 나눠 보는 칩을 두고, 누르면 바로 걸러집니다.","pg":"search","mk":["v","앞 글","분류별로 보기","나눌 말",["여자","남자","공용","키즈","주니어","베이비"]]},{"id":"S-07","g":"S","t":"검색 결과에서도 필터","was":"검색 결과에서는 사이즈·가격으로 거를 수 없습니다.","now":"검색 결과에도 사이즈·브랜드·가격 필터 줄을 두고, 고르면 바로 걸러집니다.","pg":"search","mk":["v","앞 글","필터"]},{"id":"S-08","g":"S","t":"한영 잘못 쳐도 찾기","was":"한글 자판으로 영어를 치면(예: ㅔㅐㅣㅐ) 결과가 없습니다.","now":"한영을 잘못 쳐도 바로잡아 찾아 줍니다(시안은 「ㅔㅐㅣㅐ」로 찾은 화면을 열어 「polo」 결과를 보여 줌).","pg":"search","mk":["v","강조 색","#c4001f","안내 글","로 찾았어요"]},{"id":"P-01","g":"P","t":"사진 종류 표시","was":"작은 사진 여섯 장이 무엇인지 하나씩 눌러 봐야 압니다.","now":"작은 사진 아래에 「앞 · 뒤 · 택 · 소재 · 디테일」 글자를 붙입니다(순서대로).","pg":"detail","mk":["v","글자색","#555555","이름들",["앞","뒤","택","소재","디테일"]],"rec":1},{"id":"P-02","g":"P","t":"사진 크게 보기","was":"큰 사진을 눌러도 더 크게 볼 수 없습니다.","now":"사진을 누르면 화면 가득 검은 바탕에 크게 열립니다(휴대폰은 손가락으로 키움). 움직임 없이 바로 열립니다.","pg":"detail","mk":["v","단추 글","크게 보기"],"rec":1},{"id":"P-03","g":"P","t":"마우스 올리면 확대(PC)","was":"원단 · 단추를 자세히 보기 어렵습니다.","now":"PC에서 마우스를 올리면 그 자리가 2배로 확대됩니다.","pg":"detail","mk":["v","딱지 글","올리면 2배 확대","배율","2"],"pc":1},{"id":"P-04","g":"P","t":"사진 번호(3/6)","was":"사진이 몇 장인지 모릅니다.","now":"큰 사진 오른쪽 아래에 \"1 / 7\"처럼 사진 번호를 붙입니다(이미 있는 쇼핑몰은 색만 바꿔 봄).","pg":"detail","mk":["v","바탕색","#111111","글자색","#ffffff"]},{"id":"P-05","g":"P","t":"하자 사진 따로 모음","was":"하자 사진이 다른 사진 사이에 섞여 있습니다.","now":"사진 아래에 \"하자 · 사용감\" 칸을 따로 두고 상태 사진을 모읍니다(시안은 마지막 사진 두 장).","pg":"detail","mk":["v","테두리 색","#dddddd","제목","하자 · 사용감 사진"]},{"id":"P-06","g":"P","t":"아낀 금액 표시","was":"「(30% 할인)」만 있습니다.","now":"할인 가격 아래에 실제 아낀 금액을 붙입니다.","pg":"detail","mk":["v","글자색","#c4001f","뒤에 붙는 말","아껴요"],"rec":1},{"id":"P-07","g":"P","t":"휴대폰 아래 고정 구매 줄","was":"휴대폰에서 구매 단추가 위에 한 번만 나옵니다.","now":"휴대폰 화면 아래에 가격과 \"구매하기\"를 고정합니다.","pg":"detail","mk":["v","윗선 색","#111111","단추들",["♡ 관심","장바구니","바로 구매"]],"rec":1,"mo":1},{"id":"P-08","g":"P","t":"아래 구매 줄에 가격","was":"휴대폰 아래 「관심상품 · 장바구니 · 구매하기」에 가격이 없어 위로 올려 확인해야 합니다.","now":"아래 구매 줄에 실제 가격을 함께 보여 줍니다(예: 「174,300원 구매하기」).","pg":"detail","mk":["v","단추 글","구매하기"],"rec":1},{"id":"P-09","g":"P","t":"한 벌뿐 안내","was":"빈티지 단품이라는 안내가 없어 「나중에 사야지」 하다 놓칩니다.","now":"「한 벌뿐인 빈티지예요. 품절되면 다시 들어오지 않아요.」 한 줄을 둡니다. 「몇 명이 보는 중」 같은 지어낸 숫자는 쓰지 않습니다.","pg":"detail","mk":["box","detail","한 벌뿐인 빈티지예요. 품절되면 다시 들어오지 않아요."]},{"id":"P-10","g":"P","t":"품절일 때 상세 표시","was":"품절이어도 구매 단추만 흐려집니다.","now":"품절일 때 큰 사진 위 표시와 같은 브랜드로 가는 안내를 보여 줍니다(시안은 지금 상품을 품절 모양으로 보여 줌).","pg":"detail","mk":["v","사진 위 글","SOLD OUT","바탕색","#111111","안내 글","품절된 옷이에요."]},{"id":"P-11","g":"P","t":"무료배송까지 남은 금액","was":"얼마를 더 사면 무료배송인지 장바구니에서 계산해야 합니다.","now":"가격 아래에 막대로 「○원 더 담으면 무료배송」을 보여 줍니다(기준 금액은 세부값).","pg":"detail","mk":["v","막대 색","#0a7a2f","기준 금액","50000","안내 글","더 담으면 무료배송","채운 글","무료배송이에요"],"rec":1},{"id":"P-12","g":"P","t":"실측 그림","was":"「어깨 : 44 가슴 : 50 …」 글자뿐이라 어디를 잰 건지 모릅니다.","now":"옷 그림 위에 잰 자리를 선으로 긋고 실제 실측 숫자를 붙입니다. 상의·하의 그림이 다릅니다.","pg":"detail","mk":["v","선 색","#c4001f"],"rec":1},{"id":"P-13","g":"P","t":"내 옷과 비교","was":"손님이 집에 있는 옷 치수와 하나하나 빼 봐야 합니다.","now":"내 옷 치수를 넣으면 이 옷이 몇 cm 크고 작은지 바로 보여 줍니다. 숫자를 바꾸면 바로 다시 셉니다.","pg":"detail","mk":["v","제목","내 옷과 비교","강조 색","#c4001f"]},{"id":"P-14","g":"P","t":"재질 표시","was":"재질이 상품명에 섞여 있습니다.","now":"상품명에 있는 실제 재질(예: 코튼 100%)을 칩으로 보여 줍니다.","pg":"detail","mk":["v","앞 글","재질","테두리 색","#111111"]},{"id":"P-15","g":"P","t":"상품코드 복사","was":"상담할 때 손님이 상품코드를 손으로 옮겨 적습니다.","now":"상품코드 옆 「복사」 버튼. 누르면 실제로 복사됩니다.","pg":"detail","mk":["v","단추 글","복사"],"rec":1},{"id":"P-16","g":"P","t":"브랜드 소개 한 줄","was":"브랜드를 모르는 손님이 있습니다.","now":"브랜드 이름 아래에 그 브랜드 옷이 지금 몇 벌 있는지와 「더 보기」를 붙입니다.","pg":"detail","mk":["v","소개 글","옷이 지금 {수}벌 있어요","링크 글","이 브랜드 더 보기","링크 색","#111111"]},{"id":"P-17","g":"P","t":"원산지 표시","was":"원산지가 잘 안 보입니다.","now":"원산지가 있으면 칩으로 보여 줍니다.","pg":"detail","mk":["v","앞 글","원산지","테두리 색","#111111"]},{"id":"P-18","g":"P","t":"배송·반품 세 줄 요약","was":"배송·반품 안내가 상세 맨 아래 긴 글에 있습니다.","now":"가격 아래에 쇼핑몰 안내 글(결제·배송·교환)의 첫 줄을 요약해 보여 줍니다.","pg":"detail","mk":["v","제목 색","#111111"],"rec":1},{"id":"P-19","g":"P","t":"긴 안내 접기","was":"긴 안내가 모두 펼쳐져 있습니다.","now":"긴 안내를 제목만 두고, 누르면 펼쳐지게 접어 둡니다.","pg":"detail","mk":["v","글자색","#111111","펼치기 글","펼치기","접기 글","접기"]},{"id":"P-20","g":"P","t":"실측 재는 법","was":"실측 숫자를 어떻게 쟀는지 모릅니다.","now":"실측 아래에 \"어깨 끝에서 끝까지…\" 재는 법을 붙입니다.","pg":"detail","mk":["box","detail","📏 실측 재는 법: 평평하게 놓고 단면으로 잽니다"]},{"id":"P-21","g":"P","t":"세탁 안내","was":"세탁 방법을 모릅니다.","now":"재질에 맞는 세탁 안내를 짧게 붙입니다.","pg":"detail","mk":["v","제목 색","#111111","앞 글","세탁"]},{"id":"P-22","g":"P","t":"이 상품으로 카카오 상담","was":"카카오 상담을 열면 어떤 상품인지 손님이 다시 말해야 합니다.","now":"상세에 「이 상품 카카오 상담」 버튼을 두고, 상품코드와 이름이 첫 말로 들어갑니다.","pg":"detail","mk":["fab","톡 이 상품으로 카카오 상담","r","#FEE500","#191919"],"rec":1},{"id":"P-23","g":"P","t":"같은 브랜드 옷","was":"다른 옷을 보려면 목록으로 돌아가야 합니다.","now":"아래에 같은 브랜드의 실제 옷 6벌을 보여 줍니다.","pg":"detail","mk":["v","제목","같은 브랜드 옷"]},{"id":"P-24","g":"P","t":"비슷한 사이즈 옷","was":"맞는 사이즈 옷을 다시 찾아야 합니다.","now":"아래에 같은 사이즈의 실제 옷 6벌을 보여 줍니다.","pg":"detail","mk":["v","제목","비슷한 사이즈 옷"]},{"id":"P-25","g":"P","t":"링크 복사","was":"친구에게 보내기 어렵습니다.","now":"상품명 옆에 \"링크 복사\" 단추를 둡니다. 누르면 실제로 복사됩니다.","pg":"detail","mk":["v","단추 글","링크 복사"]},{"id":"B-01","g":"B","t":"사진 후기 모아 보기","was":"후기는 게시판에 들어가야 봅니다.","now":"이 게시판의 사진 있는 실제 후기를 위에 모아 보여 줍니다(이름은 가운데를 가림).","pg":"board","mk":["v","제목","사진 후기 모아 보기"]},{"id":"B-02","g":"B","t":"후기 사진 크게 보기","was":"후기 사진이 작아서 옷 상태가 잘 안 보입니다.","now":"후기 사진을 누르면 크게 봅니다(움직임 없이).","pg":"board","mk":["v","단추 글","⤢"]},{"id":"B-03","g":"B","t":"문의 답변 완료 표시","was":"문의에 답이 달렸는지 들어가 봐야 압니다.","now":"답변이 달린 글 제목 옆에 「답변 완료」 표시를 붙입니다.","pg":"board","mk":["v","딱지 글","답변 완료","바탕색","#0a7a2f"]},{"id":"B-04","g":"B","t":"공지 맨 위 고정","was":"공지가 다른 글 사이에 묻힙니다.","now":"공지 글을 맨 위에서 바탕색과 📌로 눈에 띄게 합니다.","pg":"board","mk":["v","바탕색","#fff8e6"]},{"id":"B-05","g":"B","t":"후기에 산 상품 바로가기","was":"후기를 읽어도 그 옷으로 가는 길이 없습니다.","now":"상품이 붙은 글마다 「산 상품 보기」 바로가기를 붙입니다.","pg":"board","mk":["v","링크 글","산 상품 보기","글자색","#0b57d0"]},{"id":"B-06","g":"B","t":"후기·문의 찾기","was":"후기·문의를 찾으려면 넘겨 봐야 합니다.","now":"게시판 위에 찾기 칸을 두고, 찾을 말을 넣으면 이 쪽 글이 바로 걸러집니다.","pg":"board","mk":["v","안내 글","후기·문의에서 찾을 말","단추 글","찾기"]},{"id":"B-07","g":"B","t":"문의 쓸 때 상품코드 자동","was":"문의를 쓸 때 상품코드를 직접 적어야 합니다.","now":"상품에서 문의를 누르면 제목에 상품코드·이름이 자동으로 들어갑니다(시안은 글쓰기 칸 모양).","pg":"board","mk":["v","제목","상품 문의 쓰기","끝 글","문의드립니다"]},{"id":"F-01","g":"F","t":"휴대폰 회사 정보 접기","was":"휴대폰 바닥에 회사 정보가 길게 펼쳐져 있어 끝까지 내려야 합니다.","now":"고객센터만 보이고 회사 정보는 「사업자 정보 펼치기」로 접어 둡니다. PC는 그대로 펼쳐 둡니다.","pg":"main","mk":["v","펼치기 글","사업자 정보 펼치기","접기 글","사업자 정보 접기"],"rec":1,"mo":1},{"id":"F-02","g":"F","t":"운영시간·전화 한 줄","was":"운영시간과 전화가 바닥 글 사이에 섞여 있습니다.","now":"바닥 맨 위에 실제 전화번호와 운영시간을 한 줄 칸으로 둡니다.","pg":"main","mk":["v","앞 글","고객센터","바탕색","#f5f5f5","글자색","#111111"]},{"id":"F-03","g":"F","t":"작은 글씨 키우기","was":"정가 · 실측 · 바닥 글씨가 12~13px 연한 회색이라 읽기 어렵고 접근성 점수도 깎입니다(남은 일 「작은 글씨」).","now":"바닥의 작은 글씨를 14px 이상, 진한 회색으로 올립니다. 모양은 그대로입니다.","pg":"main","mk":["v","글자색","#444444","글씨 크기","14"],"rec":1},{"id":"F-04","g":"F","t":"SNS(인스타) 아이콘","was":"바닥에 인스타그램 바로가기가 눈에 띄지 않습니다.","now":"바닥에 실제 인스타그램 주소로 가는 아이콘을 둡니다.","pg":"main","mk":["v","앞 글","인스타그램","글자색","#111111"]},{"id":"F-05","g":"F","t":"입금 계좌 복사","was":"입금 계좌를 손으로 옮겨 적어야 합니다.","now":"바닥 계좌 옆 「복사」를 누르면 실제로 복사됩니다.","pg":"main","mk":["v","단추 글","복사"]},{"id":"F-06","g":"F","t":"약관·안내 접기","was":"약관·안내 글이 길게 펼쳐져 있습니다.","now":"바닥의 긴 안내 글을 제목만 두고 누르면 펼쳐지게 접습니다.","pg":"main","mk":["v","테두리 색","#bbbbbb","펼치기 글","펼치기","접기 글","접기"]},{"id":"F-07","g":"F","t":"형제몰 줄","was":"바닥에서 다른 쇼핑몰로 갈 길이 없습니다.","now":"바닥에 빈티지톡 · 플러스 · 오케이 줄을 둡니다.","pg":"main","mk":["v","앞 글","우리 쇼핑몰","선 색","#dddddd"]},{"id":"F-08","g":"F","t":"전화번호 누르면 전화(휴대폰)","was":"휴대폰에서 전화번호가 글자로만 있습니다.","now":"휴대폰에서 번호를 누르면 바로 전화가 걸립니다.","pg":"main","mk":["v","글자색","#0b57d0","옆 글","누르면 전화"],"mo":1},{"id":"C-01","g":"C","t":"휴대폰 아래 고정 메뉴","was":"휴대폰에서 분류·관심상품으로 가려면 맨 위로 올라가 햄버거 메뉴를 열어야 합니다.","now":"화면 아래에 홈 · 분류 · 검색 · 관심 · 마이 다섯 칸이 늘 붙어 있습니다. 움직임 없이 제자리에 있습니다.","pg":"main","mk":["v","바탕색","#ffffff","단추들",["홈","분류","검색","관심","마이"]],"rec":1,"mo":1},{"id":"C-02","g":"C","t":"상담·바로가기 단추가 가리지 않게","was":"오른쪽 아래 상담·바로가기 단추가 가격·단추를 가립니다.","now":"상담·바로가기 단추를 작게 줄이고 조금 위로 올려 덜 가리게 합니다.","pg":"main","mk":["v","크기(%)","80","위로(px)","24"]},{"id":"C-03","g":"C","t":"맨 위로 단추","was":"긴 상세에서 위로 가기 어렵습니다.","now":"오른쪽 아래에 \"위로\" 단추를 둡니다.","pg":"main","mk":["fab","↑ 맨 위로","l","#111","#fff"]},{"id":"C-04","g":"C","t":"최근 본 상품 떠 있는 칸(휴대폰에도)","was":"최근 본 상품은 PC 오른쪽 칸에만 있습니다.","now":"오른쪽 아래에 최근 본 상품 사진이 든 작은 칸을 띄우고, 누르면 최근 본 옷이 펼쳐집니다.","pg":"main","mk":["v","바탕색","#ffffff","단추 글","최근 본"]},{"id":"C-05","g":"C","t":"글씨 대비 높이기(접근성)","was":"연한 회색 글씨가 많아 읽기 어렵습니다.","now":"바탕보다 흐린 글씨(대비 4.5:1 아래)를 찾아 진하게 바꿉니다.","pg":"main","mk":["v","글자색","#444444"]},{"id":"C-06","g":"C","t":"키보드로 이동(접근성)","was":"키보드(Tab)로 움직이면 어디에 있는지 안 보입니다.","now":"Tab으로 움직일 때 지금 칸에 굵은 테두리를 보여 줍니다(시안은 첫 메뉴에 테두리를 그려 둠. 실제로 Tab을 눌러도 따라다녀요).","pg":"main","mk":["v","테두리 색","#0b57d0","두께","3"]},{"id":"C-07","g":"C","t":"맨 위 얇은 공지 띠","was":"세일·공지 소식을 알릴 자리가 없습니다.","now":"화면 맨 위에 얇은 공지 띠를 둡니다. {세일} 자리에 이 쇼핑몰의 세일 분류 이름이 들어갑니다.","pg":"main","mk":["v","띠 글","매주 새 상품 입고 · {세일} 진행 중","바탕색","#c4001f","글자색","#ffffff"]}];
  state.fxTab = 'M'; state.selDel.fx = {}; state._vis.fx = []; state.fxOpen = {};
  function fxPick() { var e = state.ed; e.fxPick = e.fxPick || []; return e.fxPick; }
  function fxInfo(id) { for (var i = 0; i < FX.length; i++) { if (FX[i].id === id) { return FX[i]; } } return null; }
  var FX_URL = { main: '/', cart: '/order/basket.html', search: '/product/search.html?keyword=%ED%8F%B4%EB%A1%9C', board: '/board/product/list.html?board_no=4' };
  function fxUrl(x) { if (FX_URL[x.pg]) { return FX_URL[x.pg]; } var it = its(state.cfg.pc || {}); return (it[0] && it[0].u) || '/product/list.html'; }
  function fxPageOk(d, pg) {
    var p = d.__vtPath || (d.defaultView && d.defaultView.location.pathname) || '';
    if (pg === 'cart') { return /\/order\/basket/.test(p); }
    if (pg === 'main') { return p === '/' || /^\/(index\.html)?$/.test(p) || /^\/skin-[a-z]+\d+\/?$/.test(p) || !!d.getElementById('vth'); }
    if (pg === 'list') { return /\/product\/list|\/category\//.test(p) && !/\/board\//.test(p); }
    if (pg === 'detail') { return /detail\.html|\/product\/[^/]+\/\d+/.test(p) && !/\/board\//.test(p); }
    if (pg === 'search') { return /\/product\/search/.test(p); }
    if (pg === 'board') { return /\/board\//.test(p); }
    return false;
  }
  var FXO = 'outline:2px dashed #ff8a00;outline-offset:-2px';
  function fxTag(id) { return '<span style="position:absolute;top:-1px;left:-1px;background:#ff8a00;color:#fff;font:700 12px/1.5 sans-serif;padding:0 5px;z-index:2">시안 ' + id + '</span>'; }
  function fxEl(d, id, css, html) { var el = d.createElement('div'); el.setAttribute('data-vtfx', id); el.style.cssText = 'position:relative;box-sizing:border-box;font-family:"Noto Sans KR",sans-serif;' + css; el.innerHTML = fxTag(id) + html; return el; }
  function fxFoot(d) { return d.querySelector('#footer, footer, .vt-ft, .xans-layout-footer, [class*="footer"]'); }
  function fxPlace(d, where, el) {
    var put = function (ref, before) { if (ref && ref.parentNode) { ref.parentNode.insertBefore(el, before ? ref : ref.nextSibling); return true; } return false; };
    if (where === 'hero') { if (put(d.getElementById('vth'), false)) { return; } }
    if (where === 'list') { if (put(d.querySelector('ul.vt-list, .prdList, .xans-product-listnormal'), true)) { return; } }
    if (where === 'listEnd') { if (put(d.querySelector('ul.vt-list, .prdList, .xans-product-listnormal'), false)) { return; } }
    if (where === 'foot') { if (put(fxFoot(d), true)) { return; } }
    if (where === 'detailEnd') { if (put(d.querySelector('.xans-product-detail'), false)) { return; } }
    if (where === 'detail') { var tr0 = fxPriceTr(d); if (tr0 && tr0.parentNode) { var r0 = d.createElement('tr'), td0 = d.createElement('td'); td0.colSpan = 2; td0.style.cssText = 'padding:0;text-align:left'; r0.setAttribute('data-vtfx', el.getAttribute('data-vtfx')); el.removeAttribute('data-vtfx'); td0.appendChild(el); r0.appendChild(td0); tr0.parentNode.insertBefore(r0, tr0.nextSibling); return; } }
    if (where === 'detail') { var pr = d.querySelector('.vt-detail__price, .infoArea .price, .xans-product-detail [class*="price"], #span_product_price_text, .headingArea'); if (pr) { var bx = pr.closest('tr, li, div') || pr; if (put(bx, false)) { return; } } if (put(d.querySelector('.xans-product-detail, #contents > div'), false)) { return; } }
    if (where === 'search') { if (put(d.querySelector('.xans-search-result, .xans-product-search, ul.vt-list, .prdList, #contents > div'), true)) { return; } }
    if (where === 'board') { if (put(d.querySelector('.xans-board-list, .boardList, table, #contents > div'), true)) { return; } }
    var c = d.getElementById('contents') || d.body; c.insertBefore(el, c.firstChild);
  }
  function fxCn(e) { return typeof e.className === 'string' ? e.className : ''; }
  function fxPriceEls(cd) {
    var pe = [].slice.call(cd.querySelectorAll('*')).filter(function (e) { if (e.closest('[data-vtfx]')) { return false; } return /price/i.test(fxCn(e)) || (e.tagName === 'LI' && /판매가|소비자가|할인|정가|price/i.test(e.getAttribute('title') || '')); });
    return pe.filter(function (e) { var a = e.parentNode; while (a && a !== cd) { if (pe.indexOf(a) > -1) { return false; } a = a.parentNode; } return true; });
  }
  /* 목록(ul) 안에는 li 로 넣기 */
  function fxAfter(d, ref, el) { var par = ref.parentNode; if (/^(UL|OL)$/.test(par.tagName) && el.tagName !== 'LI') { var li = d.createElement('li'); li.setAttribute('data-vtfx', el.getAttribute('data-vtfx')); li.style.cssText = 'list-style:none;margin:0;padding:0;display:block'; el.removeAttribute('data-vtfx'); li.appendChild(el); el = li; } par.insertBefore(el, ref.nextSibling); return el; }
  var FX_CARD = '.vt-item, ul.prdList > li, .xans-product-listnormal li.xans-record-';
  function fxCards(d, all) { var a = [].slice.call(d.querySelectorAll(FX_CARD)).filter(function (e) { return !(e.parentNode && e.parentNode.closest && e.parentNode.closest(FX_CARD)) && !e.closest('[data-vtfx]'); }); return a.slice(0, all ? 120 : 6); }
  /* ===== 6.3 시안 품질: 번호마다 실제 쇼핑몰 자료 · 제자리 · 실제 동작(FXR). 설명 쪽지는 그리지 않음 ===== */
  var FXD = { cat: {}, busy: 0, na: {}, sw: {}, t: 0 };
  var FXR = {};
  var FX_BASE = '[data-vtfx-o]{outline:2px dashed #ff8a00!important;outline-offset:-2px}[data-vtfx-h]{display:none!important}[data-vtfx-r]{position:relative!important}';
  var FX_ATTR = ['h', 'r', 'o', 'big', 'cur', 'fs', 'lc', 'act'];
  var FX_MALL = [['빈티지톡', 'https://oldmarket.cafe24.com/'], ['빈티지플러스', 'https://k2sun2000.cafe24.com/'], ['빈티지오케이', 'https://korshin7.cafe24.com/']];
  var FX_SZ = /(?:^|\s)((?:XXS|XS|S|M|L|XL|XXL|XXXL|[2-5]XL|FREE|F)(?:\s*\(\s*\d{2,3}\s*\))?|\d{2,3}(?:cm|호)?)\s*$/i;
  var FX_PGU = { 'S-05': function () { return '/product/search.html?keyword=' + encodeURIComponent('없는옷이름'); }, 'S-08': function () { return '/product/search.html?keyword=' + encodeURIComponent('ㅔㅐㅣㅐ'); }, 'L-20': function () { return SH.soldUrl || '/product/search.html?keyword=%ED%8F%B4%EB%A1%9C&page=4'; }, 'L-31': function () { return SH.soldUrl || '/product/search.html?keyword=%ED%8F%B4%EB%A1%9C&page=4'; } };
  function fxBoardUrl(k) { var re = k === 'qna' ? /Q\s*&\s*A|문의/i : /REVIEW|후기|리뷰/i, a = [].slice.call(document.querySelectorAll('#vtDrawer a[href*="/board/"], a[href*="/board/"]')).filter(function (e) { return re.test(fxT(e)); })[0]; return a ? a.getAttribute('href') : (k === 'qna' ? '/board/product/list.html?board_no=6' : '/board/product/list.html?board_no=4'); }
  ['B-01', 'B-02', 'B-04', 'B-05'].forEach(function (k) { FX_PGU[k] = function () { return fxBoardUrl('review'); }; });
  ['B-03', 'B-06', 'B-07'].forEach(function (k) { FX_PGU[k] = function () { return fxBoardUrl('qna'); }; });
  function fxWant(x) { return FX_PGU[x.id] ? pvPath(FX_PGU[x.id]()) : ''; }
  function fxT(e) { return e ? (e.textContent || '').replace(/\s+/g, ' ').trim() : ''; }
  function fxAbs(u) { if (!u) { return ''; } if (/^\/\//.test(u)) { return 'https:' + u; } if (/^(https?:|data:)/i.test(u)) { return u; } return pvBase() + (u.charAt(0) === '/' ? '' : '/') + u; }
  function fxWon(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; }
  function fxKw(s) { return '/product/search.html?keyword=' + encodeURIComponent(s); }
  function fxUniq(a) { return a.filter(function (v, i) { return v && a.indexOf(v) === i; }); }
  function fxO(m) { var o = {}, i = m.indexOf('v'); if (i < 0) { return o; } for (var j = i + 1; j + 1 < m.length; j += 2) { o[m[j]] = m[j + 1]; } return o; }
  function fxNew(d, id, tag, css, html) { var el = d.createElement(tag); el.setAttribute('data-vtfx', id); el.style.cssText = 'box-sizing:border-box;font-family:"Noto Sans KR",sans-serif;' + (css || ''); if (html != null) { el.innerHTML = html; } return el; }
  function fxCss(d, id, css) { var st = d.createElement('style'); st.setAttribute('data-vtfx', id); st.textContent = css; (d.head || d.documentElement).appendChild(st); return st; }
  function fxU(d, fn) { (d.__vtfxU = d.__vtfxU || []).push(fn); }
  function fxAt(e, k, id) { var h = e.getAttribute('data-vtfx-' + k); if (!h || (' ' + h + ' ').indexOf(' ' + id + ' ') < 0) { e.setAttribute('data-vtfx-' + k, (h ? h + ' ' : '') + id); } }
  function fxMarkEl(e, id) { fxAt(e, 'o', id); }
  function fxHide(e, id) { fxAt(e, 'h', id); }
  function fxVis(e) { if (!e) { return false; } var r = e.getBoundingClientRect(), cs = e.ownerDocument.defaultView.getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden'; }
  function fxText(d, el, txt) { var old = el.textContent; el.textContent = txt; fxU(d, function () { el.textContent = old; }); }
  function fxOn(d, el, ev, fn, cap) { el.addEventListener(ev, fn, !!cap); fxU(d, function () { el.removeEventListener(ev, fn, !!cap); }); }
  /* 시안 안 단추: 누르면 동작(쇼핑몰 원래 링크보다 먼저 받음) */
  function fxClick(d, el, fn) { el.setAttribute('data-vtfx-act', '1'); el.__vtfxAct = fn; if (!el.hasAttribute('data-vtfx')) { fxU(d, function () { el.removeAttribute('data-vtfx-act'); el.__vtfxAct = null; }); } }
  function fxActOn(d) {
    var w = d.defaultView; if (!w) { return; }
    var h = function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-vtfx-act], [data-vtfx-ext]') : null; if (!t) { return; }
      e.preventDefault(); e.stopPropagation();
      if (t.hasAttribute('data-vtfx-ext')) { msg('바깥 주소(' + t.getAttribute('href') + ')는 편집기에서 열지 않아요. 실제 쇼핑몰에서는 그 주소로 가요.'); return; }
      if (t.__vtfxAct) { try { t.__vtfxAct(e); } catch (x) { } }
    };
    w.addEventListener('click', h, true); fxU(d, function () { w.removeEventListener('click', h, true); });
  }
  /* 편집 화면(메인) 안 시안 링크는 편집기를 떠나지 않고 가운데 화면에 엶 */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('[data-vtfx] a[href], a[data-vtfx][href]'); if (!a || e.defaultPrevented) { return; }
    var h = a.getAttribute('href') || ''; e.preventDefault(); if (!h || /^(#|javascript:)/i.test(h)) { return; }
    if (/^(tel:|mailto:)/i.test(h)) { msg('시안이라 전화는 걸지 않아요. 실제 쇼핑몰에서는 ' + h.replace(/^tel:/, '') + ' 로 전화가 걸려요.'); return; }
    var u; try { u = new URL(h, pvBase() + '/'); } catch (x) { return; }
    if (u.origin === new URL(pvBase()).origin) { pvOpen(u.pathname + u.search); } else { msg('바깥 주소(' + u.hostname + ')는 편집기에서 열지 않아요.'); }
  }, true);
  function fxForm(d, f) { f.addEventListener('submit', function (e) { if (e.defaultPrevented) { return; } var v = (f.querySelector('input') || {}).value || ''; if (d === document) { e.preventDefault(); if (v) { pvOpen(fxKw(v)); } } }); }
  function fxCopy(d, txt, done) {
    var fb = function () { try { var ta = d.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px'; d.body.appendChild(ta); ta.select(); var ok = d.execCommand('copy'); ta.remove(); done(ok); } catch (e) { done(false); } };
    try { var nv = d.defaultView.navigator; if (nv.clipboard && nv.clipboard.writeText) { nv.clipboard.writeText(txt).then(function () { done(true); }, fb); return; } } catch (e) { }
    fb();
  }
  function fxCopyBtn(d, id, txt, label, css) {
    var b = fxNew(d, id, 'button', 'display:inline-block;margin-left:8px;border:1px solid #111;background:#fff;color:#111;border-radius:4px;padding:3px 10px;font:600 12px/1.5 "Noto Sans KR",sans-serif;cursor:pointer;vertical-align:middle;' + (css || '') + FXO, label); b.type = 'button';
    fxClick(d, b, function () { fxCopy(d, txt, function (ok) { b.textContent = ok ? '복사됨 ✓' : '복사 막힘'; msg(ok ? '「' + txt + '」 을 복사했어요.' : '이 화면에서는 복사가 막혀 있어요. 실제 쇼핑몰에서는 복사돼요.', !ok); }); });
    return b;
  }
  /* 위에 고정 띠를 둘 때: 화면을 그만큼 아래로 밀고(top=머리말도 같이 내림) 가리지 않게 */
  function fxPush(d, px, top) {
    if (d.__vtfxBm == null) { d.__vtfxBm = parseFloat(d.defaultView.getComputedStyle(d.body).marginTop) || 0; }
    d.__vtfxPush = (d.__vtfxPush || 0) + px; if (top) { d.__vtfxTop = (d.__vtfxTop || 0) + px; }
    var st = d.querySelector('style[data-vtfx="_push"]') || fxCss(d, '_push', '');
    st.textContent = 'html body{margin-top:' + (d.__vtfxBm + d.__vtfxPush) + 'px!important}' + (d.__vtfxTop ? 'html body .vt-hd{top:' + d.__vtfxTop + 'px!important}' : '');
  }
  function fxBand(d, id, pos, html, bg, fg, mob) {
    var top = pos === 'top', h = mob ? 34 : 38;
    var b = fxEl(d, id, 'display:flex;align-items:center;justify-content:center;gap:10px;text-align:center;background:' + bg + ';color:' + fg + ';font-size:' + (mob ? 12 : 14) + 'px;font-weight:600;' + FXO + (top ? ';position:fixed;left:0;right:0;top:' + (d.__vtfxTop || 0) + 'px;z-index:101;height:' + h + 'px;padding:0 ' + (mob ? 56 : 80) + 'px;white-space:nowrap;overflow:hidden' : ';flex-wrap:wrap;padding:' + (mob ? '9px 12px' : '11px 20px')), '<span style="overflow:hidden;text-overflow:ellipsis">' + html + '</span>');
    if (top) { d.body.appendChild(b); fxPush(d, h, true); } else { fxPlace(d, pos, b); }
    return b;
  }
  function fxBarEl(d, id, labels, mob) {
    var bar = fxEl(d, id, 'position:fixed;left:0;right:0;bottom:0;z-index:2147482300;display:flex;background:#fff;border-top:1px solid #ddd;height:' + (mob ? 56 : 64) + 'px;' + FXO, labels.map(function (s, k) { return '<span style="flex:1;display:flex;align-items:center;justify-content:center;font-size:' + (mob ? 13 : 15) + 'px;font-weight:700;' + (k === labels.length - 1 && /구매/.test(s) ? 'background:#111;color:#fff' : '') + '">' + esc(s) + '</span>'; }).join(''));
    d.body.appendChild(bar); return bar;
  }
  /* 상품 칸에서 실제 값 읽기 */
  function fxLi(cd, re) { var l = cd.querySelectorAll('li[title]'); for (var i = 0; i < l.length; i++) { if (re.test(l[i].getAttribute('title') || '') && !l[i].closest('[data-vtfx]')) { return l[i]; } } return null; }
  function fxLiV(li) { if (!li) { return ''; } var c = li.cloneNode(true); [].slice.call(c.querySelectorAll('.title')).forEach(function (e) { e.remove(); }); return fxT(c); }
  function fxProd(cd) {
    var a = cd.querySelector('a.vt-item__thumb, .thumbnail a, .prdImg a') || cd.querySelector('a[href]'), im = cd.querySelector('.vt-item__thumb img, .thumbnail img, .prdImg img') || cd.querySelector('img');
    var nm = fxT(cd.querySelector('.vt-item__name, .name')), nums = [];
    fxPriceEls(cd).forEach(function (e) { (e.textContent.match(/\d{1,3}(?:,\d{3})+|\d{4,}/g) || []).forEach(function (q) { var n = +q.replace(/,/g, ''); if (n >= 500 && nums.indexOf(n) < 0) { nums.push(n); } }); });
    var src = im ? (im.getAttribute('src') || im.getAttribute('data-src') || '') : '', href = a ? a.getAttribute('href') || '' : '', meas = [], code = '';
    fxLiV(fxLi(cd, /실측/)).replace(/([가-힣A-Za-z]+)\s*[:：]\s*(\d+(?:\.\d+)?)/g, function (_, k, v) { meas.push([k, +v]); });
    try { code = decodeURIComponent(src.split('?')[0].split('/').pop() || ''); } catch (e) { code = src.split('/').pop() || ''; }
    return { el: cd, href: href, img: fxAbs(src), name: nm, brand: fxLiV(fxLi(cd, /브랜드/)), origin: fxLiV(fxLi(cd, /제조국|원산지/)), lo: nums.length ? Math.min.apply(null, nums) : 0, hi: nums.length ? Math.max.apply(null, nums) : 0, sold: !!cd.querySelector('.vt-item__soldout img, img[alt*="품절"]'), code: code.replace(/_\d+\.\w+$/, '').replace(/\.\w+$/, ''), size: ((nm.match(FX_SZ) || [])[1] || '').toUpperCase(), meas: meas, no: (href.match(/\/(\d{4,})\//) || href.match(/product_no=(\d+)/) || [])[1] || '' };
  }
  function fxBare(p) { var q = {}; Object.keys(p).forEach(function (k) { if (k !== 'el') { q[k] = p[k]; } }); return q; }
  function fxMain() { if (!FXD.prods || !FXD.prods.length) { FXD.prods = fxCards(document, true).map(fxProd).filter(function (p) { return p.img; }).map(fxBare); } return FXD.prods; }
  function fxProds(d) { var a = fxCards(d, true).map(fxProd).filter(function (p) { return p.img; }); return a.length >= 6 ? a : a.concat(fxMain()); }
  function fxEach(d, fn) { fxCards(d, true).forEach(function (cd, i) { fn(cd, fxProd(cd), i); }); }
  function fxHolder(c) { return c.tagName === 'LI' ? c : (c.parentNode && c.parentNode.tagName === 'LI' ? c.parentNode : c); }
  function fxCatList(d) { var seen = {}, out = []; [].slice.call(d.querySelectorAll('.vt-hd__nav li > a, .vt-dr__cate li > a')).forEach(function (e) { var n = fxT(e), u = e.getAttribute('href') || ''; if (n && /cate_no=|\/category\//.test(u) && !seen[n]) { seen[n] = 1; out.push({ n: n, u: u }); } }); return out; }
  function fxCats(d) { var a = d ? fxCatList(d) : []; if (a.length) { return a; } if (!FXD.cats || !FXD.cats.length) { FXD.cats = fxCatList(document); } return FXD.cats; }
  function fxSale(d) { return (fxCats(d).filter(function (c) { return /SALE|세일/i.test(c.n); })[0] || { n: 'SALE' }).n; }
  function fxShop(d) {
    var q = function (s) { return d.querySelector(s) || document.querySelector(s); }, tel = fxT(q('.vt-dr__tel, .vt-ft__call')), bk = q('.vt-dr__bank div') || q('.vt-ft__bank li'), tm = fxT(q('.vt-ft__time') || q('.vt-dr__box p')), ig = q('a[href*="instagram.com"]');
    return { tel: tel, bank: bk ? fxT(bk.querySelector('strong')) : '', acct: bk ? (fxT(bk).match(/\d[\d-]{7,}\d/) || [''])[0] : '', hours: ((tm.match(/OPERATING\s*(.+?)(?=\s*BREAK|$)/) || [])[1] || '').trim(), insta: ig ? ig.getAttribute('href') : '' };
  }
  /* 다른 화면 자료(분류의 소분류·사진, 후기 등)는 한 번만 받아 두고 다 오면 다시 그림 */
  function fxLater() { clearTimeout(FXD.t); FXD.t = setTimeout(function () { try { fxAll(); } catch (e) { } }, 80); }
  function fxFetch(u) {
    var k = pvPath(u), c = FXD.cat[k]; if (c) { return c.done ? c : null; }
    c = FXD.cat[k] = { done: 0, doc: null }; FXD.busy++;
    pvGet(k, function (html) { FXD.busy--; c.done = 1; if (html) { try { c.doc = new DOMParser().parseFromString(html, 'text/html'); } catch (e) { } } fxLater(); });
    return null;
  }
  function fxCat(u) {
    var c = fxFetch(u); if (!c) { return null; }
    if (!c.cat) { var doc = c.doc; c.cat = doc ? { subs: [].slice.call(doc.querySelectorAll('ul.vt-plist__sub1 > li > a')).map(function (a) { return { n: fxT(a).replace(/\s*\(\s*\d*\s*\)\s*$/, ''), u: a.getAttribute('href') || '' }; }).filter(function (s) { return s.n && s.u; }), prods: fxCards(doc, true).map(fxProd).filter(function (p) { return p.img; }).map(fxBare), count: +((fxT(doc.querySelector('.vt-plist__count, .searchResult .record')).replace(/,/g, '').match(/\d+/) || [0])[0]) } : { subs: [], prods: [], count: 0 }; }
    return c.cat;
  }
  function fxMini(p, mob, extra, w) {
    return '<a href="' + esc(p.href) + '" style="flex:0 0 ' + (w || (mob ? '40%' : '15.3%')) + ';min-width:0;color:#111;text-decoration:none;display:block"><span style="display:block;position:relative;aspect-ratio:1/1;overflow:hidden;background:#f4f4f4"><img src="' + esc(p.img) + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">' + (extra || '') + '</span>' + (p.brand ? '<b style="display:block;margin-top:8px;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(p.brand) + '</b>' : '') + '<span style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:13px;line-height:1.4;margin-top:2px;color:#333">' + esc(p.name) + '</span>' + (p.lo ? '<span style="display:block;margin-top:4px;font-size:13px;font-weight:700">' + fxWon(p.lo) + (p.hi > p.lo ? ' <s style="font-weight:400;color:#767676">' + fxWon(p.hi) + '</s>' : '') + '</span>' : '') + '</a>';
  }
  function fxSec(d, id, title, inner, mob, where, wrap) {
    var sc = fxEl(d, id, 'background:#fff;color:#111;text-align:left;padding:' + (mob ? '22px 14px' : '36px 40px') + ';' + FXO, '<div style="font-weight:800;font-size:' + (mob ? 16 : 20) + 'px;margin:6px 0 14px">' + title + '</div><div style="display:flex;gap:' + (mob ? 10 : 16) + 'px;' + (wrap ? 'flex-wrap:wrap' : 'overflow-x:auto') + '">' + inner + '</div>');
    fxPlace(d, where || 'hero', sc); return sc;
  }
  function fxRow(d, x, o, mob, list, extraFn, where) { var inner = list.slice(0, 6).map(function (p) { return fxMini(p, mob, extraFn && extraFn(p)); }).join(''); if (!inner) { return 'na:보여 줄 상품이 없어요'; } fxSec(d, x.id, o['제목'], inner, mob, where); }
  function fxPills(d, x, mob, title, list, hrefFn, where) {
    var items = list.map(function (s) { return '<a href="' + esc(hrefFn ? hrefFn(s) : '#') + '" style="border:1px solid #111;border-radius:999px;padding:' + (mob ? '9px 14px' : '8px 16px') + ';font-size:' + (mob ? 13 : 14) + 'px;white-space:nowrap;color:#111;text-decoration:none;background:#fff">' + esc(s) + '</a>'; }).join('');
    return fxSec(d, x.id, title, items, mob, where, true);
  }
  function fxThumb(cd) { return cd.querySelector('.vt-item__thumb, .thumbnail, .prdImg') || cd.querySelector('a') || cd; }
  function fxBadge(d, cd, id, pos, html, css) {
    var th = fxThumb(cd); if (d.defaultView.getComputedStyle(th).position === 'static') { th.setAttribute('data-vtfx-r', '1'); }
    var s = fxNew(d, id, 'span', 'position:absolute;z-index:4;' + ({ tl: 'top:6px;left:6px', tr: 'top:6px;right:6px', bl: 'bottom:6px;left:6px', br: 'bottom:6px;right:6px' }[pos] || pos) + ';font:700 12px/1 "Noto Sans KR",sans-serif;padding:5px 7px;border-radius:3px;' + (css || ''), html);
    th.appendChild(s); return s;
  }
  function fxUnder(d, cd, el) { var pl = fxPriceEls(cd), at = pl[pl.length - 1]; if (at && at !== cd && at.parentNode) { return fxAfter(d, at, el); } (cd.querySelector('.vt-item__desc') || cd).appendChild(el); return el; }
  function fxUnderName(d, cd, el) { var ats = [].slice.call(cd.querySelectorAll('.vt-item__name, li[title="상품명"], .name')).filter(fxVis), at = ats[0] || cd.querySelector('.vt-item__name, .name'); if (at && at.parentNode) { var r = fxAfter(d, at, el); r.style.order = d.defaultView.getComputedStyle(at).order; return r; } cd.appendChild(el); return el; }
  function fxAbove(d, el) { var ul = d.querySelector('ul.vt-list, ul.prdList, .xans-product-listnormal'); if (ul && ul.parentNode) { ul.parentNode.insertBefore(el, ul); return true; } return false; }
  function fxChip(d, x, label, on, mob) {
    var row = d.querySelector('.vt-plist__menu, .vt-search-menu'), b = fxNew(d, x.id, 'button', 'display:inline-flex;align-items:center;gap:6px;height:' + (mob ? 40 : 34) + 'px;padding:0 12px;margin:0 6px 6px 0;border:1px solid #111;border-radius:999px;background:' + (on ? '#111' : '#fff') + ';color:' + (on ? '#fff' : '#111') + ';font:600 13px/1 "Noto Sans KR",sans-serif;cursor:pointer;white-space:nowrap;vertical-align:middle;' + FXO, '<i style="font-style:normal">' + (on ? '✓' : '○') + '</i><span>' + label + '</span>'); b.type = 'button';
    fxClick(d, b, function () { FXD.sw[x.id] = !on; fxAll(); });
    if (row) { row.insertBefore(b, row.firstChild); } else if (!fxAbove(d, b)) { return null; }
    return b;
  }
  function fxZoom(d, src) {
    var o = d.createElement('div'); o.setAttribute('data-vtfx', '_zoom'); o.style.cssText = 'position:fixed;inset:0;z-index:2147482600;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out';
    o.innerHTML = '<img src="' + esc(src) + '" alt="" style="max-width:96vw;max-height:96vh;object-fit:contain"><span style="position:absolute;top:14px;right:18px;color:#fff;font:700 28px/1 sans-serif">✕</span>';
    o.onclick = function (e) { e.preventDefault(); e.stopPropagation(); o.remove(); }; d.body.appendChild(o);
  }
  function fxTr(d, re) { var ths = d.querySelectorAll('.xans-product-detaildesign th, .infoArea th'); for (var i = 0; i < ths.length; i++) { if (re.test(fxT(ths[i]))) { return ths[i].parentNode; } } return null; }
  function fxRowAfter(d, tr, id, html, css) {
    var r = d.createElement('tr'); r.setAttribute('data-vtfx', id); var td = d.createElement('td'); td.colSpan = 2;
    td.style.cssText = 'box-sizing:border-box;position:relative;padding:10px 0;font:14px/1.6 "Noto Sans KR",sans-serif;color:#111;text-align:left;' + (css || ''); td.innerHTML = html; r.appendChild(td);
    tr.parentNode.insertBefore(r, tr.nextSibling); return td;
  }
  function fxPriceTr(d) { var a = fxTr(d, /할인판매가/), b = fxTr(d, /판매가/); return (a && fxVis(a)) ? a : (b || a); }
  /* 상품상세의 실제 값 */
  function fxPd(d) {
    var nmTr = fxTr(d, /상품명/), name = nmTr ? fxT(nmTr.querySelector('td')) : fxT(d.querySelector('.headingArea h1, .headingArea h2'));
    var num = function (e) { return e ? +((fxT(e).replace(/,/g, '').match(/\d+/) || [0])[0]) : 0; }, pr = num(d.querySelector('#span_product_price_text')), sl = num(d.querySelector('#span_product_price_sale'));
    var brTr = fxTr(d, /브랜드/), cdTr = fxTr(d, /상품코드/), bigs = [].slice.call(d.querySelectorAll('img.BigImage, .xans-product-mobileimage li img')), big = bigs.filter(fxVis)[0] || d.querySelector('img.BigImage'), tAll = [].slice.call(d.querySelectorAll('img.ThumbImage')), tVis = tAll.filter(fxVis), path = d.__vtPath || (d.defaultView ? d.defaultView.location.pathname + d.defaultView.location.search : '');
    return { name: name, brand: brTr ? fxT(brTr.querySelector('td')) : '', code: cdTr ? fxT(cdTr.querySelector('td')) : '', price: pr, sale: sl && sl < pr ? sl : 0, lo: sl && sl < pr ? sl : pr, big: big, img: big ? fxAbs(big.getAttribute('src')) : '', alt: big ? big.getAttribute('alt') || '' : '', no: (path.match(/\/(\d{4,})\//) || path.match(/product_no=(\d+)/) || [])[1] || '', thumbs: tVis.length ? tVis : tAll.filter(function (e) { return !e.closest('.xans-product-mobileimage'); }), bigs: bigs.filter(fxVis), size: ((name.match(FX_SZ) || [])[1] || '').toUpperCase() };
  }
  function fxPdMeas(d, pd) {
    var c = fxMain().filter(function (p) { return p.no && p.no === pd.no; })[0]; if (c && c.meas.length) { return c.meas; }
    var txt = fxT(d.querySelector('.xans-product-detaildesign')) + ' ' + fxT(d.querySelector('#prdDetail')).slice(0, 4000), out = [];
    txt.replace(/(어깨|가슴|소매|총기장|총장|허리|엉덩이|밑위|허벅지|밑단|기장)\s*(?:단면|둘레)?\s*[:：]?\s*(\d{2,3}(?:\.\d)?)/g, function (_, k, v) { if (!out.some(function (q) { return q[0] === k; })) { out.push([k, +v]); } });
    return out;
  }
  var FX_MAT = ['캐시미어', '코튼', '울', '폴리', '나일론', '린넨', '실크', '레이온', '아크릴', '가죽', '레더', '스웨이드', '데님', '모헤어', '앙고라', '알파카', '코듀로이', '벨벳', '밍크', '다운', '구스', '트위드', '쉬폰', '모달', '텐셀', '비스코스', '메리노', '면'];
  var FX_CARE = [[/캐시미어|울|모헤어|앙고라|알파카|메리노|트위드/, '드라이클리닝 권장 · 뉘어서 말리기'], [/실크|쉬폰|벨벳/, '드라이클리닝 · 옷걸이에 걸어 보관'], [/가죽|레더|스웨이드|밍크/, '가죽·모피 전문 세탁 · 습기 피하기'], [/다운|구스/, '중성세제 손세탁 · 두드려 가며 말리기'], [/린넨/, '찬물 손세탁 · 덜 말랐을 때 다림질'], [/./, '찬물 단독 세탁 · 그늘에 말리기']];
  function fxMats(s) { var out = []; FX_MAT.forEach(function (mt) { var r = new RegExp(mt + '(?:에스터|에스테르)?\\s*(\\d{1,3}\\s*%)?').exec(s); if (r && !out.some(function (q) { return q[0] === mt; }) && !(mt === '면' && !r[1])) { out.push([mt, (r[1] || '').replace(/\s/g, '')]); } }); return out; }
  function fxRows(d) { return [].slice.call(d.querySelectorAll('.xans-board-listpackage tbody tr, .xans-board-list tbody tr, .boardList tbody tr')).filter(function (tr) { return tr.querySelector('td') && !tr.closest('[data-vtfx]'); }); }
  function fxRowInfo(tr) {
    var im = tr.querySelector('td.thumb img'), pa = tr.querySelector('td.thumb a'), a = tr.querySelector('td.subject a[href]'), src = im ? im.getAttribute('src') || '' : '', tds = [].slice.call(tr.children), st = tr.querySelector('img[alt$="점"]');
    var rest = tds.filter(function (td) { return !/displaynone|chk|thumb|subject/.test(td.className); });
    return { tr: tr, notice: /공지/.test(fxT(tds[0])), reply: !!tr.querySelector('img[alt="답변"]'), img: src && !/img_product_medium/.test(src) ? fxAbs(src) : '', phref: pa ? pa.getAttribute('href') || '' : '', pname: fxT(tr.querySelector('p.product')), subj: a ? fxT(a) : '', href: a ? a.getAttribute('href') || '' : '', a: a, who: rest[0] ? fxT(rest[0]) : '', date: rest[1] ? fxT(rest[1]) : '', star: st ? +((st.getAttribute('alt').match(/\d/) || [5])[0]) : 0 };
  }
  function fxMask(n) { n = String(n || ''); return n.length <= 1 ? n : n.charAt(0) + new Array(Math.max(2, n.length - 1)).join('*') + (n.length > 2 ? n.charAt(n.length - 1) : ''); }
  function fxRevCards(rows, mob) {
    return rows.slice(0, mob ? 4 : 5).map(function (r) { return '<a href="' + esc(r.href) + '" style="flex:0 0 ' + (mob ? '46%' : '18.4%') + ';min-width:0;display:block;color:#111;text-decoration:none;border:1px solid #eee;background:#fff"><img src="' + esc(r.img.replace('/tiny/', '/medium/')) + '" alt="" loading="lazy" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block"><span style="display:block;padding:10px"><span style="color:#b36b00;font-size:13px;letter-spacing:1px">' + '★★★★★'.slice(0, r.star || 5) + '</span><b style="display:block;font-size:14px;margin:4px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(r.subj) + '</b><span style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:12px;line-height:1.45;color:#555">' + esc(r.pname) + '</span><span style="display:block;margin-top:6px;font-size:12px;color:#666">' + esc(fxMask(r.who)) + ' · ' + esc(r.date) + '</span></span></a>'; }).join('');
  }
  function fxRecent(d) {
    var a = []; [].slice.call(document.querySelectorAll('[data-vt-recent-products] li:not(.displaynone)')).forEach(function (li) { var im = li.querySelector('img'), l = li.querySelector('a'), s = im ? im.getAttribute('src') || '' : ''; if (l && s && !/about:blank/.test(s)) { a.push({ href: l.getAttribute('href') || '', img: fxAbs(s), name: im.getAttribute('alt') || '', brand: '', lo: 0, hi: 0 }); } });
    return a.length ? a : fxProds(d).filter(function (p) { return !p.sold; }).slice(2);
  }
  function fxDr(d) {
    var dr = d.getElementById('vtDrawer'); if (!dr) { return null; }
    if (!dr.__vtfxOpen) { var od = dr.style.display, op = dr.style.getPropertyPriority('display'), oo = dr.style.opacity; dr.__vtfxOpen = 1; dr.style.setProperty('display', 'block', 'important'); dr.style.opacity = '1'; fxU(d, function () { dr.__vtfxOpen = 0; dr.style.removeProperty('display'); if (od) { dr.style.setProperty('display', od, op); } dr.style.opacity = oo; }); }
    return dr.querySelector('.vt-dr__in') || dr;
  }
  function fxMalls(css1, css0) { return FX_MALL.map(function (s) { var on = s[0] === SH.KO; return '<a href="' + s[1] + '" data-vtfx-ext="1" style="text-decoration:none;' + (on ? css1 : css0) + '">' + s[0] + '</a>'; }); }
  /* 처음 한 번: 예시 글 대신 이 쇼핑몰의 실제 분류·브랜드를 기본값으로 */
  function fxInit() {
    if (FXD.init) { return; } FXD.init = 1;
    var names = fxCats().map(function (c) { return c.n; }), set = function (id, label, val) { var x = fxInfo(id); if (!x) { return; } var i = x.mk.indexOf(label); if (i > -1 && val && val.length) { x.mk[i + 1] = val; } };
    var pick = function (pref, n) { var out = pref.filter(function (p) { return names.indexOf(p) > -1; }); names.forEach(function (c) { if (out.length < n && out.indexOf(c) < 0 && !/SALE|세일|추천|새상품/i.test(c)) { out.push(c); } }); return out.slice(0, n); };
    set('M-07', '칸 이름들', pick(['여자', '남자', '키즈', '주니어', '브랜드', '폴로'], 4));
    set('D-08', '칸 이름들', pick(['여자', '남자', '폴로'], 3));
    set('M-10', '칸 이름들', fxUniq(fxMain().map(function (p) { return p.brand; })).slice(0, 8));
  }
  /* ---------- 메인(머리말) ---------- */
  function fxTitleEl(d) { return [].slice.call(d.querySelectorAll('.vt-plist__path, .vt-plist__title')).filter(function (e) { var r = e.getBoundingClientRect(); return fxVis(e) && r.width > 20 && r.height > 12; })[0] || null; }
  FXR['M-01'] = function (d, x, m, mob, o) {
    var path = [].slice.call(d.querySelectorAll('.vt-plist__path ol li:not(.displaynone) a')).map(fxT).filter(Boolean), tEl = d.querySelector('.vt-plist__title'), ttl = fxT(tEl);
    var names = path.slice(1).concat(ttl ? [ttl] : []), hit = null;
    [].slice.call(d.querySelectorAll('.vt-hd__nav li > a')).forEach(function (a) { if (!hit && names.indexOf(fxT(a)) > -1) { hit = a; } });
    if (hit) { hit.setAttribute('data-vtfx-cur', '1'); }
    fxCss(d, x.id, 'html body .vt-hd__nav a[data-vtfx-cur]{text-decoration:underline!important;text-underline-offset:6px;text-decoration-thickness:2px;text-decoration-color:' + o['밑줄 색'] + '!important}');
    var vt = fxTitleEl(d); if (!vt) { return hit ? undefined : 'na:이 화면에는 분류 제목이 없어요'; }
    var crumbs = ['홈'].concat(path.slice(1)); if (ttl && crumbs[crumbs.length - 1] !== ttl) { crumbs.push(ttl); }
    var cs0 = d.defaultView.getComputedStyle(vt), bc = fxNew(d, x.id, 'div', 'font-size:' + (mob ? 12 : 13) + 'px;line-height:1.5;color:#555;margin:0;padding:' + (mob ? '10px 14px 0' : '0 0 2px') + ';text-align:' + cs0.textAlign + ';' + FXO, crumbs.map(function (c, i) { return i === crumbs.length - 1 ? '<b style="color:#111">' + esc(c) + '</b>' : esc(c); }).join(' › '));
    vt.parentNode.insertBefore(bc, vt);
  };
  FXR['M-02'] = function (d, x, m, mob, o) { fxBand(d, x.id, 'top', fxMalls('font-weight:800;color:' + o['지금 쇼핑몰 색'], 'color:' + o['글자색']).join(' <span style="opacity:.5">·</span> '), o['바탕색'], o['글자색'], mob); };
  FXR['M-03'] = function (d, x, m, mob, o) {
    var lb = d.getElementById('vtLoginBtn'), sp = lb && (lb.querySelector('span') || lb), ct = d.querySelector('.vt-ico--cart span');
    if (!lb && !ct) { return 'na:머리말에 로그인·장바구니가 없어요'; }
    if (sp) { fxText(d, sp, fxPlain(o['글'])); fxMarkEl(lb, x.id); }
    if (ct) { if (!+fxT(ct)) { fxText(d, ct, '1'); } fxMarkEl(ct.parentNode, x.id); }
    fxCss(d, x.id, 'html body #vtLoginBtn,html body #vtLoginBtn span{background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;color:#111!important;font-size:13px!important;font-weight:500!important;letter-spacing:0!important}html body #vtLoginBtn{padding:0 8px!important;min-width:0!important;height:auto!important}html body .vt-ico--cart span{color:' + o['숫자 색'] + '!important;font-weight:800!important}');
  };
  FXR['M-04'] = function (d, x, m, mob, o) {
    var f = d.querySelector('.floating.vt-fl-pc'); if (!f || mob || !fxVis(f)) { return mob ? undefined : 'na:오른쪽 아이콘 줄이 없어요'; }
    var open = !!FXD.sw[x.id];
    if (!open) { fxCss(d, x.id, 'html body .floating.vt-fl-pc>*:not([data-vtfx]){display:none!important}'); }
    var b = fxNew(d, x.id, 'button', 'display:block;width:100%;min-width:38px;border:0;margin:0;background:' + o['바탕색'] + ';color:' + o['글자색'] + ';font:700 12px/1.3 "Noto Sans KR",sans-serif;padding:12px 4px;cursor:pointer;writing-mode:vertical-rl;letter-spacing:2px;' + FXO, o['단추 글'] + (open ? ' ▾' : ' ▸')); b.type = 'button';
    fxClick(d, b, function () { FXD.sw[x.id] = !open; fxAll(); });
    f.insertBefore(b, f.firstChild);
  };
  FXR['M-06'] = function (d, x, m, mob, o) {
    var nw = fxCats(d).filter(function (c) { return /새상품|NEW|신상/i.test(c.n); })[0], n = 0;
    if (nw) { var c = fxCat(nw.u); if (!c) { return; } n = c.count; }
    if (!n) { n = d.querySelectorAll('.vt-item__new img').length || fxCards(d, true).length; }
    fxBand(d, x.id, 'hero', String(o['띠 글']).replace('{수}', '<b style="color:#ffcf33;font-size:1.25em">' + n.toLocaleString() + '</b>'), o['바탕색'], o['글자색'], mob);
  };
  FXR['M-07'] = function (d, x, m, mob, o) {
    var all = fxCats(d), cs = (o['칸 이름들'] || []).map(function (n) { return all.filter(function (c) { return c.n === n; })[0]; }).filter(Boolean);
    if (!cs.length) { return 'na:적은 이름과 같은 분류가 이 쇼핑몰에 없어요'; }
    var wait = false, used = {}, cells = cs.map(function (c) {
      var k = fxCat(c.u); if (!k) { wait = true; return ''; }
      var live = k.prods.filter(function (q) { return !q.sold && !used[q.img]; }), p = live.filter(function (q) { return (' ' + q.name + ' ').indexOf(' ' + c.n + ' ') > -1; })[0] || live[0] || k.prods[0]; if (!p) { return ''; } used[p.img] = 1;
      return '<a href="' + esc(c.u) + '" style="flex:1 1 ' + (mob ? '44%' : '0') + ';min-width:0;position:relative;display:block;aspect-ratio:3/4;overflow:hidden;color:#fff;text-decoration:none;background:#f4f4f4"><img src="' + esc(p.img) + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block"><span style="position:absolute;left:0;right:0;bottom:0;padding:34px 14px 14px;background:linear-gradient(transparent,rgba(0,0,0,.62));font-weight:800;font-size:' + (mob ? 16 : 22) + 'px">' + esc(c.n) + (k.count ? ' <span style="font-weight:400;font-size:13px">' + k.count.toLocaleString() + '벌</span>' : '') + '</span></a>';
    }).join('');
    if (wait) { return; }
    if (!cells) { return 'na:분류 상품 사진을 받지 못했어요'; }
    fxSec(d, x.id, o['제목'], cells, mob, 'hero', true);
  };
  FXR['M-08'] = function (d, x, m, mob, o) { return fxRow(d, x, o, mob, fxProds(d).filter(function (p) { return !p.sold; })); };
  FXR['M-09'] = function (d, x, m, mob, o) {
    var ps = fxProds(d).filter(function (p) { return !p.sold && p.hi > p.lo; }).sort(function (a, b) { return (a.lo / a.hi) - (b.lo / b.hi); });
    return fxRow(d, x, o, mob, ps, function (p) { return '<i style="position:absolute;left:8px;top:8px;background:' + o['할인 표시 색'] + ';color:#fff;font:700 13px/1 sans-serif;font-style:normal;padding:6px 8px">-' + Math.round((1 - p.lo / p.hi) * 100) + '%</i>'; });
  };
  FXR['M-10'] = function (d, x, m, mob, o) { if (!(o['칸 이름들'] || []).length) { return 'na:상품에 브랜드 값이 없어요'; } fxPills(d, x, mob, o['제목'], o['칸 이름들'], fxKw); };
  FXR['M-13'] = function (d, x, m, mob, o) { fxPills(d, x, mob, o['제목'], o['칸 이름들'] || [], fxKw); };
  FXR['M-14'] = function (d, x, m, mob, o) { return fxRow(d, x, o, mob, fxRecent(d)); };
  FXR['M-15'] = function (d, x, m, mob, o) {
    var c = fxFetch(fxBoardUrl('review')); if (!c) { return; }
    var rows = c.doc ? fxRows(c.doc).map(fxRowInfo).filter(function (r) { return !r.notice && !r.reply && r.img && r.subj; }) : [];
    if (!rows.length) { return 'na:후기 게시판에서 사진 있는 후기를 찾지 못했어요'; }
    fxSec(d, x.id, o['제목'], fxRevCards(rows, mob), mob, 'hero', mob);
  };
  FXR['M-16'] = function (d, x, m, mob, o) {
    var hd = d.querySelector('.vt-hd'); if (!hd) { return 'na:머리말이 없어요'; }
    var h = parseFloat(o['얇은 높이']) || 64, line = 'border-bottom:1px solid ' + o['아래 선 색'] + '!important;box-shadow:none!important';
    if (mob) { fxCss(d, x.id, 'html body .vt-hd{' + line + '}html body .vt-hd .vt-hd__in{height:' + Math.round(Math.max(40, Math.min(56, h * 0.72))) + 'px!important;padding-top:0!important;padding-bottom:0!important}'); }
    else { fxCss(d, x.id, 'html body .vt-hd.is-fixed{' + line + '}html body .vt-hd.is-fixed .vt-hd__in{height:' + h + 'px!important;padding:0!important;align-items:center!important}html body .vt-hd.is-fixed .vt-hd__right{top:0!important;margin-top:0!important;align-self:center!important}'); }
    fxMarkEl(hd, x.id);
    if (!mob) { var w16 = d.defaultView, mine = false, sc16 = function () { var dn = (w16.pageYOffset || 0) > 100; if (dn && !hd.classList.contains('is-fixed')) { hd.classList.add('is-fixed'); mine = true; } else if (!dn && mine) { hd.classList.remove('is-fixed'); mine = false; } }; fxOn(d, w16, 'scroll', sc16); fxU(d, function () { if (mine) { hd.classList.remove('is-fixed'); } }); sc16(); }
    if (FXD.fresh === x.id && !mob) { FXD.fresh = ''; try { d.defaultView.scrollTo(0, 360); } catch (e) { } }
  };
  /* ---------- 휴대폰 전체 메뉴(실제 ☰ 창 안에) ---------- */
  FXR['D-01'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; }
    var lis = [].slice.call(inn.querySelectorAll('.vt-dr__cate li')).filter(function (li) { var a = li.querySelector('a'); return a && /cate_no=|\/category\//.test(a.getAttribute('href') || '') && !li.closest('[data-vtfx]') && li.offsetWidth > inn.clientWidth * 0.55; });
    if (!lis.length) { return 'na:☰ 창에 분류가 없어요'; }
    var names = lis.map(function (li) { return fxT(li.querySelector('a')); });
    if (FXD.drOpen == null) { FXD.drOpen = names.indexOf('여자') > -1 ? '여자' : names.indexOf('남자') > -1 ? '남자' : names[0]; }
    lis.forEach(function (li, i) {
      var a = li.querySelector('a'), u = a.getAttribute('href'), open = FXD.drOpen === names[i];
      if (d.defaultView.getComputedStyle(li).position === 'static') { li.setAttribute('data-vtfx-r', '1'); }
      var b = fxNew(d, x.id, 'button', 'position:absolute;right:0;top:' + Math.round(a.offsetTop + (a.offsetHeight - 44) / 2) + 'px;width:44px;height:44px;border:0;background:none;font:400 24px/1 sans-serif;color:' + o['＋ 색'] + ';cursor:pointer;padding:0;z-index:2', open ? '－' : '＋'); b.type = 'button'; b.setAttribute('aria-label', names[i] + ' 소분류 ' + (open ? '접기' : '펼치기'));
      fxClick(d, b, function () { FXD.drOpen = open ? '' : names[i]; fxAll(); });
      li.appendChild(b);
      if (!open) { return; }
      var k = fxCat(u); if (!k) { return; }
      var box = fxNew(d, x.id, 'div', 'padding:2px 0 12px 16px;font-size:15px;line-height:2.2;font-weight:400;text-align:left;' + FXO, (k.subs.length ? k.subs : [{ n: names[i] + ' 전체', u: u }]).map(function (s) { return '<a href="' + esc(s.u) + '" style="display:block;color:#444;text-decoration:none;font-size:15px;font-weight:400">' + esc(s.n) + '</a>'; }).join(''));
      li.appendChild(box);
    });
  };
  FXR['D-02'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; }
    var f = fxNew(d, x.id, 'form', 'display:flex;height:48px;margin:0 52px 18px 0;border:1.5px solid #111;background:#fff;' + FXO, '<input type="search" name="keyword" placeholder="' + o['안내 글'] + '" aria-label="검색어" style="flex:1;min-width:0;border:0;padding:0 12px;font-size:16px;background:transparent;outline:0;height:100%;box-sizing:border-box"><button type="submit" aria-label="검색" style="flex:0 0 48px;border:0;background:#111;color:#fff;font-size:18px;cursor:pointer">🔍</button>');
    f.action = '/product/search.html'; f.method = 'get'; fxForm(d, f);
    inn.insertBefore(f, inn.querySelector('.vt-dr__guest, .vt-dr__cate') || inn.firstChild);
  };
  FXR['D-03'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; } var ps = fxRecent(d).slice(0, 4); if (!ps.length) { return 'na:보여 줄 상품이 없어요'; }
    var el = fxNew(d, x.id, 'div', 'margin:14px 0 18px;padding:8px;text-align:left;' + FXO, '<div style="font-weight:700;font-size:14px;margin-bottom:8px">' + o['제목'] + '</div><div style="display:flex;gap:8px">' + ps.map(function (p) { return '<a href="' + esc(p.href) + '" style="flex:0 0 22%;display:block"><img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" style="width:100%;aspect-ratio:1/1;object-fit:cover;display:block"></a>'; }).join('') + '</div>');
    inn.insertBefore(el, inn.querySelector('.vt-dr__cate') || inn.firstChild);
  };
  FXR['D-04'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; }
    var od = inn.querySelector('.vt-dr__order'), el;
    if (od) {
      el = od.cloneNode(true); el.setAttribute('data-vtfx', x.id); el.style.cssText += ';margin-top:8px;' + FXO;
      var a = el.querySelector('a'); if (a) { a.setAttribute('href', '/myshop/wish_list.html'); var sv = a.querySelector('svg'); if (sv) { var h = d.createElement('span'); h.textContent = '♡'; h.style.cssText = 'font-size:20px;line-height:1'; sv.parentNode.replaceChild(h, sv); } [].slice.call(a.querySelectorAll('span')).forEach(function (s) { if (/주문/.test(s.textContent)) { s.innerHTML = o['단추 글']; } }); }
      od.parentNode.insertBefore(el, od.nextSibling);
    } else {
      el = fxNew(d, x.id, 'a', 'display:flex;align-items:center;gap:8px;height:48px;padding:0 14px;border:1px solid #ddd;border-radius:8px;color:#111;text-decoration:none;font-size:15px;margin:10px 0;' + FXO, '<span style="font-size:20px">♡</span><span>' + o['단추 글'] + '</span><span style="margin-left:auto">›</span>'); el.setAttribute('href', '/myshop/wish_list.html');
      inn.insertBefore(el, inn.querySelector('.vt-dr__sp') || null);
    }
  };
  FXR['D-05'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; }
    var el = fxNew(d, x.id, 'div', 'margin:18px 0;text-align:left;' + FXO, '<div style="font-size:12px;color:#666;margin-bottom:8px">' + o['제목'] + '</div><div style="display:flex;gap:6px;flex-wrap:wrap">' + fxMalls('background:#111;color:#fff;border:1px solid #111;padding:9px 12px;border-radius:4px;font-size:13px;font-weight:700', 'background:#fff;color:#111;border:1px solid #bbb;padding:9px 12px;border-radius:4px;font-size:13px').join('') + '</div>');
    inn.insertBefore(el, inn.querySelector('.vt-dr__sns, .vt-dr__copy') || null);
  };
  FXR['D-06'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; } var t = inn.querySelector('.vt-dr__tel'); if (!t) { return 'na:☰ 창에 전화번호가 없어요'; }
    fxMarkEl(t, x.id);
    if (t.tagName === 'A' && !/^tel:/i.test(t.getAttribute('href') || '')) { var oh = t.getAttribute('href'); t.setAttribute('href', 'tel:' + fxT(t)); fxU(d, function () { if (oh == null) { t.removeAttribute('href'); } else { t.setAttribute('href', oh); } }); }
    fxCss(d, x.id, 'html body .vt-dr__tel{text-decoration:underline!important;text-underline-offset:4px;color:' + o['글자색'] + '!important}');
    var tip = fxNew(d, x.id, 'span', 'display:inline-block;margin-left:8px;font-size:13px;font-weight:400;color:#555;vertical-align:middle', '📞 ' + o['옆 글']); t.parentNode.insertBefore(tip, t.nextSibling);
  };
  FXR['D-07'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; } var bk = inn.querySelector('.vt-dr__bank div') || inn.querySelector('.vt-dr__bank'), acct = bk ? (fxT(bk).match(/\d[\d-]{7,}\d/) || [''])[0] : '';
    if (!acct) { return 'na:☰ 창에 계좌 번호가 없어요'; }
    bk.appendChild(fxCopyBtn(d, x.id, acct, o['단추 글']));
  };
  FXR['D-08'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; }
    var all = fxCats(d), cs = (o['칸 이름들'] || []).map(function (n) { return all.filter(function (c) { return c.n === n; })[0]; }).filter(Boolean); if (!cs.length) { return 'na:적은 이름과 같은 분류가 없어요'; }
    var el = fxNew(d, x.id, 'div', 'margin:14px 0 18px;padding:8px;text-align:left;' + FXO, '<div style="font-size:12px;color:#666;margin-bottom:8px">' + o['제목'] + '</div><div style="display:flex;gap:8px;flex-wrap:wrap">' + cs.map(function (c) { return '<a href="' + esc(c.u) + '" style="border:1px solid #111;border-radius:999px;padding:9px 16px;font-size:14px;font-weight:700;color:#111;text-decoration:none">' + esc(c.n) + '</a>'; }).join('') + '</div>');
    inn.insertBefore(el, inn.querySelector('.vt-dr__cate') || inn.firstChild);
  };
  FXR['D-09'] = function (d, x, m, mob, o) {
    var inn = fxDr(d); if (!inn) { return 'na:☰ 창이 없어요'; } var g = inn.querySelector('.vt-dr__guest');
    var el = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:14px;font-weight:700;font-size:16px;margin:0 52px 18px 0;padding:0 8px;min-height:44px;text-align:left;' + FXO, '<a href="/member/login.html" style="color:#111;text-decoration:none">' + o['왼쪽 글'] + '</a><span style="color:#bbb">|</span><a href="/myshop/order/list.html" style="color:#111;text-decoration:none">' + o['오른쪽 글'] + '</a>');
    if (g) { g.parentNode.insertBefore(el, g); fxHide(g, x.id); } else { inn.insertBefore(el, inn.firstChild); }
  };
  /* ---------- 상품목록 ---------- */
  FXR['L-02'] = function (d, x, m, mob, o) { fxEach(d, function (cd, p) { if (!(p.hi > p.lo)) { return; } fxUnder(d, cd, fxNew(d, x.id, 'div', 'font:700 ' + (mob ? 12 : 13) + 'px/1.4 "Noto Sans KR",sans-serif;margin-top:3px;color:' + o['글자색'] + ';' + FXO, fxWon(p.hi - p.lo) + ' ' + o['뒤에 붙는 말'])); }); };
  FXR['L-03'] = function (d, x, m, mob, o) {
    var n = 0, sz = parseFloat(o['글씨 크기']) || 18;
    fxEach(d, function (cd) { var pl = fxPriceEls(cd).filter(fxVis), e = pl.filter(function (q) { return /할인/.test(q.getAttribute('title') || ''); })[0] || pl[pl.length - 1]; if (e) { e.setAttribute('data-vtfx-big', x.id); n++; } });
    if (!n) { return 'na:가격 칸을 찾지 못했어요'; }
    fxCss(d, x.id, '[data-vtfx-big],[data-vtfx-big] span,[data-vtfx-big] strong{font-size:' + sz + 'px!important;font-weight:800!important;color:' + o['글자색'] + '!important}[data-vtfx-big] .title,[data-vtfx-big] .title *{font-size:12px!important;font-weight:400!important}');
  };
  FXR['L-04'] = function (d, x, m, mob, o) {
    var n = 0;
    fxEach(d, function (cd) { [].slice.call(cd.querySelectorAll('.vt-item__desc *')).forEach(function (e) { if (!e.children.length && /^\s*\d{1,2}\s*%\s*$/.test(e.textContent) && fxVis(e) && !e.closest('[data-vtfx]')) { fxHide(e, x.id); n++; } }); });
    if (n) { return; }
    if (o['사진 위 동그라미'] === '숨김') { fxCss(d, x.id, 'html body .vt-item__sale{display:none!important}'); return; }
    return 'na:이 쇼핑몰 목록은 이미 가격 옆에 할인율 글자가 없어요(사진 위 동그라미만 있음) — 바꿀 것이 없어요';
  };
  FXR['L-05'] = function (d, x, m, mob, o) { fxEach(d, function (cd, p) { if (p.sold) { return; } fxUnder(d, cd, fxNew(d, x.id, 'div', 'font:700 12px/1.4 "Noto Sans KR",sans-serif;margin-top:3px;color:' + o['글자색'] + ';' + FXO, o['글'])); }); };
  FXR['L-06'] = function (d, x, m, mob, o) {
    var n = 0;
    fxEach(d, function (cd, p) { if (!p.origin) { return; } n++; fxBadge(d, cd, x.id, 'tl', esc(p.origin), 'background:' + o['바탕색'] + ';color:' + o['글자색'] + ';letter-spacing:.3px;' + FXO); var li = fxLi(cd, /제조국|원산지/); if (li) { fxHide(li, x.id); } });
    if (!n) { return 'na:이 쇼핑몰 목록에는 원산지 값이 없어요'; }
  };
  FXR['L-07'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true), nw = cs.filter(function (cd) { return cd.querySelector('.vt-item__new img'); }); if (!nw.length) { nw = cs.slice(0, 4); }
    nw.slice(0, 12).forEach(function (cd) { fxBadge(d, cd, x.id, 'top:0;left:0;right:0', o['띠 글'], 'background:' + o['바탕색'] + ';color:' + o['글자색'] + ';border-radius:0;text-align:center;padding:6px 4px;' + FXO); });
  };
  FXR['L-08'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true), nw = cs.filter(function (cd) { return cd.querySelector('.vt-item__new img'); }); if (!nw.length) { nw = cs.slice(0, 8); }
    nw.slice(0, 24).forEach(function (cd) { fxBadge(d, cd, x.id, o['위치'] || 'tl', o['딱지 글'], 'background:' + o['바탕색'] + ';color:' + o['글자색'] + ';' + FXO); });
  };
  FXR['L-09'] = function (d, x, m, mob, o) {
    var thr = parseFloat(String(o['기준 금액']).replace(/,/g, '')) || 50000, n = 0;
    fxEach(d, function (cd, p) { if (p.sold || p.lo < thr) { return; } n++; fxUnder(d, cd, fxNew(d, x.id, 'div', 'font:700 12px/1.4 "Noto Sans KR",sans-serif;margin-top:3px;color:' + o['글자색'] + ';' + FXO, o['글'])); });
    if (!n) { return 'na:이 쪽에는 ' + fxWon(thr) + ' 이상인 옷이 없어요(기준 금액을 낮춰 보세요)'; }
  };
  FXR['L-10'] = function (d, x, m, mob, o) {
    if (mob) { return; }
    fxCards(d, true).slice(0, 4).forEach(function (cd) {
      var p = fxProd(cd), im = cd.querySelector('.vt-item__thumb img, .thumbnail img'); if (!p.href || !im) { return; }
      var c = fxFetch(p.href); if (!c || !c.doc) { return; }
      var t = c.doc.querySelectorAll('img.ThumbImage'), s = t[1] ? fxAbs((t[1].getAttribute('src') || '').replace('/small/', '/big/').replace('/tiny/', '/big/')) : ''; if (!s) { return; }
      var o0 = im.getAttribute('src'), os = im.getAttribute('srcset');
      fxOn(d, cd, 'mouseenter', function () { if (os) { im.removeAttribute('srcset'); } im.setAttribute('src', s); });
      fxOn(d, cd, 'mouseleave', function () { im.setAttribute('src', o0); if (os) { im.setAttribute('srcset', os); } });
      fxU(d, function () { im.setAttribute('src', o0); if (os) { im.setAttribute('srcset', os); } });
      fxBadge(d, cd, x.id, 'bl', '↺ ' + o['딱지 글'], 'background:rgba(255,255,255,.92);color:#111;' + FXO);
    });
  };
  FXR['L-11'] = function (d, x, m, mob, o) {
    FXD.heart = FXD.heart || {};
    fxEach(d, function (cd, p, i) { var on = !!FXD.heart[p.no || i], b = fxBadge(d, cd, x.id, o['위치'] || 'br', on ? '♥' : '♡', 'background:' + o['바탕색'] + ';box-shadow:0 1px 4px rgba(0,0,0,.2);color:' + (on ? o['누른 색'] : '#111') + ';font-size:18px;width:' + (mob ? 40 : 36) + 'px;height:' + (mob ? 40 : 36) + 'px;border-radius:50%;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;' + FXO); b.setAttribute('role', 'button'); b.setAttribute('aria-label', '관심상품'); fxClick(d, b, function () { FXD.heart[p.no || i] = !on; fxAll(); }); });
  };
  FXR['L-12'] = function (d, x, m, mob, o) {
    fxEach(d, function (cd, p) { if (!p.img) { return; } var b = fxBadge(d, cd, x.id, o['위치'] || 'tr', o['단추 글'], 'background:rgba(0,0,0,.62);color:#fff;cursor:pointer;' + (mob ? 'padding:9px 10px;' : '') + FXO); b.setAttribute('role', 'button'); fxClick(d, b, function () { fxZoom(d, p.img.replace('/medium/', '/big/')); }); });
  };
  FXR['L-13'] = function (d, x, m, mob, o) {
    var n = 0; fxEach(d, function (cd, p) { if (!p.size) { return; } n++; fxBadge(d, cd, x.id, o['위치'] || 'bl', esc(p.size), 'background:' + o['바탕색'] + ';color:' + o['글자색'] + ';' + FXO); });
    if (!n) { return 'na:상품명 끝에 사이즈가 없어요'; }
  };
  FXR['L-14'] = function (d, x, m, mob, o) {
    var n = 0;
    fxEach(d, function (cd, p) {
      var li = fxLi(cd, /실측/); if (!li || !p.meas.length) { return; } n++;
      var el = fxNew(d, x.id, 'div', 'display:flex;flex-wrap:wrap;gap:3px;justify-content:' + (d.defaultView.getComputedStyle(li).textAlign === 'center' ? 'center' : 'flex-start') + ';margin-top:4px;' + FXO, p.meas.map(function (q) { return '<span style="border:1px solid ' + o['테두리 색'] + ';padding:2px 5px;font-size:12px;line-height:1.3;white-space:nowrap;color:#222">' + esc(q[0]) + ' <b>' + q[1] + '</b></span>'; }).join(''));
      fxAfter(d, li, el); fxHide(li, x.id);
    });
    if (!n) { return 'na:이 목록에는 실측 값이 없어요'; }
  };
  FXR['L-15'] = function (d, x, m, mob, o) {
    var n = 0; fxEach(d, function (cd, p) { if (!p.size) { return; } n++; fxUnderName(d, cd, fxNew(d, x.id, 'span', 'display:inline-block;border:1px solid ' + o['테두리 색'] + ';font-size:12px;line-height:1.5;padding:0 6px;margin-top:4px;color:#111;' + FXO, esc(p.size))); });
    if (!n) { return 'na:상품명 끝에 사이즈가 없어요'; }
  };
  FXR['L-16'] = function (d, x, m, mob, o) {
    var n = Math.max(1, Math.min(4, Math.round(parseFloat(o['줄 수']) || 2))), nm = d.querySelector('.vt-item__name, .vt-item li[title="상품명"]'); if (!nm) { return 'na:상품명 칸이 없어요'; }
    fxCss(d, x.id, 'html body .vt-item .vt-item__name,html body .vt-item li[title="상품명"]{display:-webkit-box!important;-webkit-line-clamp:' + n + '!important;-webkit-box-orient:vertical!important;overflow:hidden!important;line-height:1.4!important;height:' + (n * 1.4) + 'em!important;min-height:0!important}');
    fxCards(d, true).slice(0, 10).forEach(function (cd) { var e = [].slice.call(cd.querySelectorAll('.vt-item__name, li[title="상품명"]')).filter(fxVis)[0]; if (e) { fxMarkEl(e, x.id); } });
  };
  FXR['L-17'] = function (d, x, m, mob, o) { fxCss(d, x.id, 'html body .vt-item li[title="브랜드"] span:not(.title),html body .vt-item [class*="brand"]{font-weight:800!important;font-size:' + (parseFloat(o['글씨 크기']) || 15) + 'px!important;color:' + o['글자색'] + '!important}'); };
  FXR['L-18'] = function (d, x, m, mob, o) {
    var n = 0; fxEach(d, function (cd, p) { if (!p.code) { return; } n++; fxUnderName(d, cd, fxNew(d, x.id, 'div', 'font-size:12px;line-height:1.4;margin-top:3px;color:' + o['글자색'] + ';' + FXO, o['앞 글'] + ' ' + esc(p.code))); });
    if (!n) { return 'na:상품코드를 찾지 못했어요'; }
  };
  FXR['L-19'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true).map(function (cd) { var c = fxProd(cd).meas.filter(function (q) { return /가슴/.test(q[0]); })[0]; return { cd: cd, ch: c ? c[1] : 0 }; }).filter(function (q) { return q.ch; });
    if (!cs.length) { return 'na:이 목록에는 가슴 실측 값이 없어요'; }
    var v = FXD.my; if (!v) { var s = cs.map(function (q) { return q.ch; }).sort(function (a, b) { return a - b; }), md = s[Math.floor(s.length / 2)]; v = FXD.my = { lo: md - 2, hi: md + 2 }; }
    var hit = cs.filter(function (q) { return q.ch >= v.lo && q.ch <= v.hi; }), ist = 'width:64px;height:38px;border:1px solid #888;text-align:center;font-size:15px;box-sizing:border-box';
    var bar = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 12px;padding:10px 12px;border:1px solid #ddd;font-size:14px;background:#fff;color:#111;text-align:left;' + FXO, '<b>' + o['딱지 글'] + '</b><span>가슴 단면</span><input type="number" value="' + v.lo + '" aria-label="가슴 단면 최소" style="' + ist + '"><span>~</span><input type="number" value="' + v.hi + '" aria-label="가슴 단면 최대" style="' + ist + '"><span>cm → 맞는 옷 <b>' + hit.length + '</b>벌</span>');
    var ins = bar.querySelectorAll('input'); [0, 1].forEach(function (k) { ins[k].addEventListener('change', function () { FXD.my = { lo: +ins[0].value || 0, hi: +ins[1].value || 0 }; fxAll(); }); });
    if (!fxAbove(d, bar)) { return; }
    hit.forEach(function (q) { fxBadge(d, q.cd, x.id, 'tl', o['딱지 글'], 'background:' + o['바탕색'] + ';color:#fff;' + FXO); });
  };
  FXR['L-20'] = function (d, x, m, mob, o) {
    var on = FXD.sw[x.id] !== false, cards = fxCards(d, true), sold = cards.filter(function (c) { return fxProd(c).sold; });
    if (!cards.length) { return 'na:상품 목록이 없어요'; }
    if (!fxChip(d, x, o['단추 글'] + ' · 이 쪽 품절 ' + sold.length + '개', on, mob)) { return; }
    if (!on || !sold.length) { return; }
    var list = fxHolder(cards[0]).parentNode, order = [].slice.call(list.children);
    sold.map(fxHolder).forEach(function (li) { if (li.parentNode === list) { list.appendChild(li); } });
    fxU(d, function () { order.forEach(function (li) { if (li.parentNode === list) { list.appendChild(li); } }); });
  };
  FXR['L-21'] = function (d, x, m, mob, o) {
    var row = d.querySelector('.vt-plist__menu, .vt-search-menu'), hd = d.querySelector('.vt-hd'), w = d.defaultView; if (!row) { return 'na:정렬 줄이 없어요'; }
    /* 붙이기: 줄이 머리말 밑으로 올라가면 그 자리에 고정(자리는 빈 칸으로 지켜 화면이 밀리지 않게) */
    var old = row.style.cssText, st = false, ph = fxNew(d, x.id, 'div', 'display:none'); row.parentNode.insertBefore(ph, row);
    var tm21 = 0, upd = function () { core(); clearTimeout(tm21); tm21 = setTimeout(core, 300); }, core = function () {
      var hb = hd ? Math.max(0, Math.round(hd.getBoundingClientRect().bottom)) : 0, r = (st ? ph : row).getBoundingClientRect(), need = r.top < hb;
      if (need && !st) { var rr = row.getBoundingClientRect(), cs = w.getComputedStyle(row); ph.style.cssText = 'display:block;height:' + rr.height + 'px;margin:' + cs.marginTop + ' 0 ' + cs.marginBottom; row.style.cssText = old + ';position:fixed;z-index:90;left:' + rr.left + 'px;width:' + rr.width + 'px;margin:0;padding-top:8px;padding-bottom:8px;box-sizing:border-box;background:' + o['바탕색'] + ';box-shadow:0 1px 0 rgba(0,0,0,.12)'; st = true; }
      if (st && !need) { row.style.cssText = old; ph.style.display = 'none'; st = false; }
      if (st) { row.style.top = hb + 'px'; }
    };
    fxMarkEl(row, x.id); fxOn(d, w, 'scroll', upd); fxOn(d, w, 'resize', function () { if (st) { row.style.cssText = old; ph.style.display = 'none'; st = false; } upd(); });
    fxU(d, function () { clearTimeout(tm21); row.style.cssText = old; if (!old) { row.removeAttribute('style'); } });
    if (FXD.fresh === x.id) { FXD.fresh = ''; try { w.scrollTo(0, Math.max(0, row.getBoundingClientRect().top + w.scrollY + 500)); } catch (e) { } }
    upd();
  };
  FXR['L-22'] = function (d, x, m, mob, o) {
    var cur = d.querySelector('.vt-paging a.this, .xans-product-normalpaging a.this, .ec-base-paginate a.this'), nx = null;
    if (cur) { var li = cur.closest('li'); nx = li && li.nextElementSibling ? li.nextElementSibling.querySelector('a') : null; }
    if (!nx) { return 'na:다음 쪽이 없어요(마지막 쪽)'; }
    var hr = nx.getAttribute('href') || '#'; if (/^\?/.test(hr)) { hr = ((d.__vtPath || (d.defaultView ? d.defaultView.location.pathname : '/')).split('?')[0]) + hr; }
    var el = fxNew(d, x.id, 'div', 'text-align:center;padding:' + (mob ? '18px 0' : '28px 0') + ';' + FXO, '<a href="' + esc(hr) + '" style="display:inline-block;min-width:' + (mob ? '70%' : '320px') + ';border:1.5px solid ' + o['테두리 색'] + ';color:#111;background:#fff;padding:14px 30px;font-weight:700;font-size:15px;text-decoration:none">' + o['단추 글'] + '</a>');
    fxPlace(d, 'listEnd', el);
  };
  FXR['L-23'] = function (d, x, m, mob, o) {
    if (!mob) { return; } var bt = d.querySelector('.vt-item__btns'); if (!bt) { return 'na:목록에 관심·장바구니 단추가 없어요'; }
    var s = parseFloat(o['칸 크기']) || 46;
    fxCss(d, x.id, 'html body .vt-item__btns{display:flex!important;gap:6px;justify-content:center}html body .vt-item__btns>*{min-width:' + s + 'px!important;min-height:' + s + 'px!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center;border:1px solid ' + o['테두리 색'] + ';border-radius:6px;box-sizing:border-box}html body .vt-item__btns .wish::after{content:"관심";font:12px/1.3 "Noto Sans KR",sans-serif;color:#111}html body .vt-item__btns .cart::after{content:"담기";font:12px/1.3 "Noto Sans KR",sans-serif;color:#111}');
    fxCards(d, true).slice(0, 12).forEach(function (cd) { var b = cd.querySelector('.vt-item__btns'); if (b) { fxMarkEl(b, x.id); } });
  };
  function fxCartPop(d, id, p, mob, o) {
    var el = fxNew(d, id, 'div', 'position:fixed;z-index:2147482500;left:50%;transform:translateX(-50%);bottom:' + (mob ? 12 : 24) + 'px;width:' + (mob ? '92vw' : '380px') + ';background:#fff;color:#111;border-radius:10px;padding:14px;box-shadow:0 8px 30px rgba(0,0,0,.28);font-size:14px;text-align:left;' + FXO, '<div style="display:flex;gap:10px;align-items:center"><img src="' + esc(p.img) + '" alt="" style="width:56px;height:56px;object-fit:cover;flex:0 0 56px"><div style="min-width:0"><b>' + o['창 제목'] + '</b><div style="font-size:12px;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(p.name) + '</div></div></div><div style="margin-top:10px;display:flex;gap:6px"><span data-k="0" role="button" style="flex:1;border:1px solid #bbb;padding:11px 8px;text-align:center;cursor:pointer">계속 보기</span><a href="/order/basket.html" style="flex:1;background:#111;color:#fff;padding:11px 8px;text-align:center;text-decoration:none">장바구니 가기</a></div>');
    fxClick(d, el.querySelector('[data-k="0"]'), function () { FXD.sw[id + ':x'] = true; FXD.cartP = null; fxAll(); });
    d.body.appendChild(el); return el;
  }
  FXR['L-24'] = function (d, x, m, mob, o) {
    fxEach(d, function (cd, p) { if (p.sold) { return; } var b = fxNew(d, x.id, 'button', 'display:block;width:100%;margin-top:8px;height:' + (mob ? 42 : 38) + 'px;border:1px solid ' + o['테두리 색'] + ';background:#fff;color:#111;font:600 13px/1 "Noto Sans KR",sans-serif;cursor:pointer;' + FXO, o['단추 글']); b.type = 'button'; b.style.order = '10'; fxClick(d, b, function () { FXD.cartP = fxBare(p); fxAll(); }); (cd.querySelector('.vt-item__desc') || cd).appendChild(b); });
    if (FXD.cartP) { fxCartPop(d, x.id, FXD.cartP, mob, { '창 제목': '장바구니에 담았어요' }); }
  };
  FXR['L-25'] = function (d, x, m, mob, o) {
    var p = fxProds(d).filter(function (q) { return !q.sold; })[0]; if (!p) { return 'na:보여 줄 상품이 없어요'; }
    if (FXD.sw[x.id + ':x'] && FXD.fresh !== x.id) { var b = fxNew(d, x.id, 'button', 'position:fixed;z-index:2147482500;left:50%;transform:translateX(-50%);bottom:' + (mob ? 12 : 24) + 'px;border:1px solid #111;background:#fff;color:#111;border-radius:999px;padding:10px 16px;font:600 13px/1 "Noto Sans KR",sans-serif;cursor:pointer;' + FXO, '확인 창 다시 보기'); b.type = 'button'; fxClick(d, b, function () { FXD.sw[x.id + ':x'] = false; fxAll(); }); d.body.appendChild(b); return; }
    if (FXD.fresh === x.id) { FXD.fresh = ''; FXD.sw[x.id + ':x'] = false; }
    fxCartPop(d, x.id, p, mob, o);
  };
  FXR['L-26'] = function (d, x, m, mob, o) {
    fxCards(d, true).forEach(function (cd, i) { if (i !== 0 && i !== 3) { return; } var el = fxNew(d, x.id, 'div', 'order:0;font-size:12px;line-height:1.4;margin:6px 0 18px;color:' + o['글자색'] + ';' + FXO, '✓ ' + o['글']), ds = cd.querySelector('.vt-item__desc'); if (ds) { ds.insertBefore(el, ds.firstChild); } else { cd.appendChild(el); } });
  };
  FXR['L-28'] = function (d, x, m, mob, o) {
    var t = fxTitleEl(d), nm = fxT(d.querySelector('.vt-plist__title')) || fxT(d.querySelector('.vt-plist__path ol li:not(.displaynone):last-child')); if (!t) { return 'na:이 화면에는 분류 제목이 없어요'; }
    var el = fxNew(d, x.id, 'p', 'margin:0;padding:' + (mob ? '8px 14px' : '8px 0 0') + ';font-size:' + (mob ? 13 : 14) + 'px;line-height:1.5;color:' + o['글자색'] + ';text-align:' + d.defaultView.getComputedStyle(t).textAlign + ';' + FXO, String(o['설명 글']).replace(/\{분류\}/g, esc(nm)));
    t.parentNode.insertBefore(el, t.nextSibling);
  };
  FXR['L-29'] = function (d, x, m, mob, o) {
    var row = d.querySelector('.vt-plist__menu, .vt-search-menu'), open = !!FXD.sw[x.id];
    var a = fxNew(d, x.id, 'button', 'display:inline-flex;align-items:center;height:' + (mob ? 40 : 34) + 'px;border:0;background:none;color:#111;font:600 13px/1 "Noto Sans KR",sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0 8px;margin:0 6px 6px 0;vertical-align:middle;' + FXO, '📏 ' + o['링크 글']); a.type = 'button';
    fxClick(d, a, function () { FXD.sw[x.id] = !open; fxAll(); });
    if (row) { row.insertBefore(a, row.firstChild); } else if (!fxAbove(d, a)) { return 'na:상품 목록이 없어요'; }
    if (open) { var p = fxNew(d, x.id, 'div', 'margin:0 0 12px;padding:12px 14px;background:#fffbe6;color:#4a3a00;font-size:14px;line-height:1.7;text-align:left;' + FXO, o['안내 글']); fxAbove(d, p); }
  };
  FXR['L-30'] = function (d, x, m, mob, o) {
    var sc = fxCats(d).filter(function (c) { return /SALE|세일/i.test(c.n); })[0], nm = sc ? sc.n : 'SALE';
    var b = fxBand(d, x.id, 'list', '<a href="' + esc(sc ? sc.u : fxKw('SALE')) + '" style="color:inherit;text-decoration:none"><b style="font-size:1.2em">' + esc(nm) + '</b> ' + o['띠 글'] + ' ›</a>', o['바탕색'], o['글자색'], mob);
    b.style.marginBottom = '12px';
  };
  FXR['L-31'] = function (d, x, m, mob, o) {
    var on = FXD.sw[x.id] !== false, cards = fxCards(d, true), sold = cards.filter(function (c) { return fxProd(c).sold; });
    if (!cards.length) { return 'na:상품 목록이 없어요'; }
    if (!fxChip(d, x, o['단추 글'] + ' · 이 쪽 품절 ' + sold.length + '개', on, mob)) { return; }
    if (on) { sold.forEach(function (c) { fxHide(fxHolder(c), x.id); }); }
  };
  FXR['L-32'] = function (d, x, m, mob, o) {
    var chips = [].slice.call(d.querySelectorAll('#vtf .vtf-gbtn')).map(function (b) { var v = fxT(b.querySelector('.vtf-gv')); return v ? fxT(b.querySelector('.vtf-gn')) + ' ' + v : ''; }).filter(Boolean), t = fxT(d.querySelector('.vt-plist__title'));
    FXD.chipX = FXD.chipX || {};
    if (t) { chips.unshift(t); } [].slice.call(d.querySelectorAll('.vt-plist__sub1 li.selected a, .vt-plist__sub1 li.on a')).forEach(function (a) { chips.push(fxT(a)); });
    chips = fxUniq(chips).filter(function (c) { return !FXD.chipX[c]; });
    var el = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:0 0 12px;font-size:13px;text-align:left;' + FXO, '<span style="color:#555;margin-right:2px">' + o['앞 글'] + '</span>' + chips.map(function (c, i) { return '<span data-c="' + i + '" role="button" style="border:1px solid #111;border-radius:999px;padding:6px 12px;cursor:pointer;color:#111;background:#fff">' + esc(c) + ' ✕</span>'; }).join('') + '<span data-c="all" role="button" style="text-decoration:underline;cursor:pointer;padding:6px 4px;color:#111">' + o['지우기 글'] + '</span>');
    [].slice.call(el.querySelectorAll('[data-c]')).forEach(function (s) { fxClick(d, s, function () { var k = s.getAttribute('data-c'); if (k === 'all') { FXD.chipX = Object.keys(FXD.chipX).length ? {} : chips.reduce(function (a, c) { a[c] = 1; return a; }, {}); } else { FXD.chipX[chips[+k]] = 1; } fxAll(); }); });
    if (!fxAbove(d, el)) { return 'na:상품 목록이 없어요'; }
  };
  FXR['L-33'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true), ps = cs.map(fxProd), cnt = {}; ps.forEach(function (p) { if (p.size && !/^\d/.test(p.size)) { var k = p.size.replace(/\s*\(.*$/, ''); cnt[k] = (cnt[k] || 0) + 1; } });
    var ord = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'FREE', 'F'], sizes = Object.keys(cnt).sort(function (a, b) { return (ord.indexOf(a) + 99) % 99 - (ord.indexOf(b) + 99) % 99; }).slice(0, 7);
    if (!sizes.length) { return 'na:상품명 끝에 사이즈가 없어요'; }
    var cur = FXD.sz || '';
    var el = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:0 0 12px;font-size:14px;text-align:left;' + FXO, '<b style="margin-right:4px">' + o['앞 글'] + '</b>' + sizes.map(function (s) { var on = cur === s; return '<span data-s="' + esc(s) + '" role="button" style="min-width:44px;height:' + (mob ? 40 : 36) + 'px;display:inline-flex;align-items:center;justify-content:center;gap:4px;border:1px solid #111;padding:0 10px;cursor:pointer;font-weight:700;background:' + (on ? '#111' : '#fff') + ';color:' + (on ? '#fff' : '#111') + '">' + esc(s) + ' <span style="font-weight:400;font-size:12px">' + cnt[s] + '</span></span>'; }).join(''));
    [].slice.call(el.querySelectorAll('[data-s]')).forEach(function (s) { fxClick(d, s, function () { var k = s.getAttribute('data-s'); FXD.sz = FXD.sz === k ? '' : k; fxAll(); }); });
    if (!fxAbove(d, el)) { return; }
    if (cur) { cs.forEach(function (c, i) { if (ps[i].size.replace(/\s*\(.*$/, '') !== cur) { fxHide(fxHolder(c), x.id); } }); }
  };
  /* ---------- 검색 ---------- */
  function fxSInp(d) { return d.querySelector('#ec-product-searchdata-keyword, #vtSearchPage input[name="keyword"][type="text"], .vt-search-form input.keyword'); }
  function fxKwNow(d) { var s = ''; try { s = (PV.on && PV.f && PV.f.contentDocument === d) ? PV.url : (d.defaultView ? d.defaultView.location.search : ''); } catch (e) { } var r = (s.match(/[?&]keyword=([^&]*)/) || [])[1] || ''; try { r = decodeURIComponent(r.replace(/\+/g, ' ')); } catch (e) { } return r || ((fxSInp(d) || {}).value || ''); }
  function fxHot(d) { return fxUniq([].slice.call(d.querySelectorAll('.xans-product-hotkeyword a, .xans-search-hotkeyword a')).map(function (a) { return fxT(a).replace(/^#/, ''); })); }
  function fxDrop(d, id, html) {
    var inp = fxSInp(d); if (!inp) { return null; } var host = inp.closest('.searchInput') || inp.parentNode, box = d.querySelector('[data-vtfx="_drop"]');
    if (!box) { box = fxNew(d, '_drop', 'div', 'background:#fff;border:1px solid #111;border-top:0;text-align:left;margin:0;box-shadow:0 8px 20px rgba(0,0,0,.1);max-width:100%;width:' + Math.round(host.getBoundingClientRect().width) + 'px'); host.parentNode.insertBefore(box, host.nextSibling); var dx = host.getBoundingClientRect().left - box.getBoundingClientRect().left; if (Math.abs(dx) > 1) { box.style.marginLeft = Math.round(dx) + 'px'; } }
    var el = fxNew(d, id, 'div', 'position:relative;padding:12px 14px;font-size:14px;line-height:1.6;color:#111;border-top:1px solid #eee;' + FXO, html); box.appendChild(el); return el;
  }
  FXR['S-01'] = function (d, x, m, mob, o) {
    var hd = d.querySelector('.vt-hd'), rt = d.querySelector('.vt-hd__right'); if (!hd || !rt) { return 'na:머리말이 없어요'; }
    var f = fxNew(d, x.id, 'form', '', '<input type="search" name="keyword" placeholder="' + o['안내 글'] + '" aria-label="검색어" style="flex:1;min-width:0;border:0;outline:0;background:transparent;padding:0 14px;font-size:' + (mob ? 16 : 14) + 'px;height:100%;box-sizing:border-box"><button type="submit" aria-label="검색" style="flex:0 0 40px;height:100%;border:0;background:none;font-size:16px;cursor:pointer">🔍</button>');
    f.action = '/product/search.html'; f.method = 'get'; fxForm(d, f);
    if (!mob) { f.style.cssText += 'display:flex;align-items:center;width:240px;height:38px;border:1px solid ' + o['테두리 색'] + ';border-radius:19px;margin:0 10px 0 0;overflow:hidden;background:#fff;' + FXO; rt.insertBefore(f, rt.firstChild); var sb = d.getElementById('vtSearchBtn'); if (sb) { fxHide(sb, x.id); } return; }
    f.style.cssText += 'display:flex;align-items:center;position:fixed;left:0;right:0;top:' + Math.round(hd.getBoundingClientRect().height + (d.__vtfxTop || 0)) + 'px;z-index:99;height:46px;background:#fff;border-bottom:1px solid ' + o['테두리 색'] + ';' + FXO; d.body.appendChild(f); fxPush(d, 46, false);
  };
  FXR['S-02'] = function (d, x, m, mob, o) {
    var kw = fxKwNow(d); if (!fxSInp(d)) { return 'na:검색 칸이 없어요'; }
    FXD.rcX = FXD.rcX || {}; var list = fxUniq([kw].concat(FXD.rc || [])).filter(function (k) { return !FXD.rcX[k]; });
    var el = fxDrop(d, x.id, '<b style="margin-right:10px">' + o['제목'] + '</b>' + (list.length ? list.map(function (k, i) { return '<span style="display:inline-flex;align-items:center;gap:6px;margin:0 8px 4px 0;border:1px solid #ccc;border-radius:999px;padding:4px 6px 4px 12px"><a href="' + esc(fxKw(k)) + '" style="color:#111;text-decoration:none">' + esc(k) + '</a><span data-x="' + i + '" role="button" aria-label="지우기" style="cursor:pointer;color:#666;padding:2px 6px">✕</span></span>'; }).join('') + '<span data-x="all" role="button" style="cursor:pointer;color:#555;text-decoration:underline;font-size:13px;margin-left:4px">' + o['지우기 글'] + '</span>' : '<span style="color:#666">최근 검색어가 없어요</span>'));
    if (!el) { return; }
    [].slice.call(el.querySelectorAll('[data-x]')).forEach(function (s) { fxClick(d, s, function () { var k = s.getAttribute('data-x'); if (k === 'all') { list.forEach(function (q) { FXD.rcX[q] = 1; }); } else { FXD.rcX[list[+k]] = 1; } fxAll(); }); });
  };
  FXR['S-03'] = function (d, x, m, mob, o) {
    var hot = fxHot(d); if (!fxSInp(d)) { return 'na:검색 칸이 없어요'; } if (!hot.length) { return 'na:이 쇼핑몰에 정해 둔 인기 검색어가 없어요'; }
    fxDrop(d, x.id, '<b style="display:block;margin-bottom:6px">' + o['제목'] + '</b><div style="display:grid;grid-template-columns:repeat(' + (mob ? 2 : 5) + ',1fr);gap:4px 14px">' + hot.slice(0, 10).map(function (k, i) { return '<a href="' + esc(fxKw(k)) + '" style="color:#111;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b style="display:inline-block;min-width:20px;color:' + o['순위 색'] + '">' + (i + 1) + '</b>' + esc(k) + '</a>'; }).join('') + '</div>');
  };
  FXR['S-04'] = function (d, x, m, mob, o) {
    var inp = fxSInp(d); if (!inp) { return 'na:검색 칸이 없어요'; }
    var ps = fxProds(d), pool = fxUniq([].concat(fxHot(d), ps.map(function (p) { return p.name.split(' ').slice(0, 2).join(' '); }), ps.map(function (p) { return p.brand; })));
    var q = String(FXD.ac != null ? FXD.ac : fxKwNow(d)).trim(), ql = q.toLowerCase();
    var hits = q ? pool.filter(function (s) { var l = s.toLowerCase(); return l.indexOf(ql) > -1 && l !== ql; }).sort(function (a, b) { return a.toLowerCase().indexOf(ql) - b.toLowerCase().indexOf(ql) || a.length - b.length; }).slice(0, 6) : [];
    var hl = function (s) { var i = s.toLowerCase().indexOf(ql); return esc(s.slice(0, i)) + '<b style="color:' + o['강조 색'] + '">' + esc(s.slice(i, i + q.length)) + '</b>' + esc(s.slice(i + q.length)); };
    fxDrop(d, x.id, hits.length ? hits.map(function (s) { return '<a href="' + esc(fxKw(s)) + '" style="display:block;padding:6px 0;color:#111;text-decoration:none">🔍 ' + hl(s) + '</a>'; }).join('') : '<span style="color:' + o['강조 색'] + '">' + (q ? '「' + esc(q) + '」 에 맞는 이름이 없어요' : '두 글자만 쳐도 맞는 이름이 여기에 떠요') + '</span>');
    fxOn(d, inp, 'input', function () { FXD.ac = inp.value; clearTimeout(FXD.acT); FXD.acT = setTimeout(fxAll, 150); });
  };
  FXR['S-05'] = function (d, x, m, mob, o) {
    var nd = d.querySelector('.noData'); if (!nd || /displaynone/.test(nd.className) || fxCards(d, true).length) { return 'na:검색 결과가 없을 때만 보이는 칸이에요'; }
    var hot = fxHot(d).slice(0, 8), ps = fxMain().filter(function (p) { return !p.sold; }).slice(0, mob ? 4 : 6);
    var el = fxEl(d, x.id, 'background:#fff;color:#111;text-align:center;padding:' + (mob ? '26px 12px 18px' : '30px 20px') + ';' + FXO, '<b style="font-size:' + (mob ? 16 : 18) + 'px">' + o['안내 글'] + '</b>' + (hot.length ? '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:14px 0 18px">' + hot.map(function (k) { return '<a href="' + esc(fxKw(k)) + '" style="border:1px solid #111;border-radius:999px;padding:8px 14px;font-size:13px;color:#111;text-decoration:none">' + esc(k) + '</a>'; }).join('') + '</div>' : '') + '<div style="font-weight:700;font-size:14px;text-align:left;margin:8px 0">' + o['상품 줄 제목'] + '</div><div style="display:flex;gap:' + (mob ? 10 : 16) + 'px;' + (mob ? 'flex-wrap:wrap' : '') + ';text-align:left">' + ps.map(function (p) { return fxMini(p, mob, '', mob ? '46%' : '15.3%'); }).join('') + '</div>');
    nd.parentNode.insertBefore(el, nd.nextSibling); fxHide(nd, x.id);
  };
  FXR['S-06'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true), ps = cs.map(fxProd), words = o['나눌 말'] || [], cnt = {}, of = function (p) { return words.filter(function (w) { return (' ' + p.name + ' ').indexOf(' ' + w + ' ') > -1; })[0] || ''; };
    ps.forEach(function (p) { var w = of(p); if (w) { cnt[w] = (cnt[w] || 0) + 1; } });
    var ks = words.filter(function (w) { return cnt[w]; }); if (!cs.length) { return 'na:검색 결과가 없어요'; }
    var cur = FXD.sg || '';
    var el = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:0 0 12px;font-size:14px;text-align:left;' + FXO, '<b style="margin-right:4px">' + o['앞 글'] + '</b>' + ks.map(function (w) { var on = cur === w; return '<span data-w="' + esc(w) + '" role="button" style="display:inline-flex;align-items:center;height:' + (mob ? 40 : 36) + 'px;border:1px solid #111;border-radius:999px;padding:0 14px;cursor:pointer;background:' + (on ? '#111' : '#fff') + ';color:' + (on ? '#fff' : '#111') + '">' + esc(w) + ' ' + cnt[w] + '</span>'; }).join(''));
    [].slice.call(el.querySelectorAll('[data-w]')).forEach(function (s) { fxClick(d, s, function () { var k = s.getAttribute('data-w'); FXD.sg = FXD.sg === k ? '' : k; fxAll(); }); });
    if (!fxAbove(d, el)) { return; }
    if (cur && cnt[cur]) { cs.forEach(function (c, i) { if (of(ps[i]) !== cur) { fxHide(fxHolder(c), x.id); } }); }
  };
  FXR['S-07'] = function (d, x, m, mob, o) {
    var cs = fxCards(d, true), ps = cs.map(fxProd); if (!cs.length) { return 'na:검색 결과가 없어요'; }
    var st = FXD.sf = FXD.sf || { s: '', b: '', p: '' }, sizes = fxUniq(ps.map(function (p) { return p.size.replace(/\s*\(.*$/, ''); })).slice(0, 14), brands = fxUniq(ps.map(function (p) { return p.brand; })).sort().slice(0, 40);
    var sel = function (k, nm, opts) { return '<label style="display:inline-flex;align-items:center;gap:6px"><span>' + nm + '</span><select data-k="' + k + '" style="height:' + (mob ? 40 : 36) + 'px;border:1px solid #111;background:#fff;color:#111;padding:0 8px;font-size:14px;max-width:' + (mob ? 130 : 200) + 'px"><option value="">전체</option>' + opts.map(function (v) { var a = Array.isArray(v) ? v : [v, v]; return '<option value="' + esc(a[0]) + '"' + (String(st[k]) === String(a[0]) ? ' selected' : '') + '>' + esc(a[1]) + '</option>'; }).join('') + '</select></label>'; };
    var ok = function (p) { return (!st.s || p.size.replace(/\s*\(.*$/, '') === st.s) && (!st.b || p.brand === st.b) && (!st.p || (p.lo && p.lo <= +st.p)); }, n = ps.filter(ok).length;
    var el = fxNew(d, x.id, 'div', 'display:flex;align-items:center;gap:' + (mob ? 8 : 14) + 'px;flex-wrap:wrap;margin:0 0 12px;padding:10px 12px;border:1px solid #ddd;font-size:14px;background:#fff;color:#111;text-align:left;' + FXO, '<b>' + o['앞 글'] + '</b>' + sel('s', '사이즈', sizes) + sel('b', '브랜드', brands) + sel('p', '가격', [[10000, '1만원 이하'], [30000, '3만원 이하'], [50000, '5만원 이하'], [100000, '10만원 이하']]) + '<span style="color:#555">이 쪽 ' + n + '벌</span>');
    [].slice.call(el.querySelectorAll('select')).forEach(function (s) { s.addEventListener('change', function () { st[s.getAttribute('data-k')] = s.value; fxAll(); }); });
    if (!fxAbove(d, el)) { return; }
    cs.forEach(function (c, i) { if (!ok(ps[i])) { fxHide(fxHolder(c), x.id); } });
  };
  var FX_H2E = { 'ㅂ': 'q', 'ㅈ': 'w', 'ㄷ': 'e', 'ㄱ': 'r', 'ㅅ': 't', 'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o', 'ㅔ': 'p', 'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g', 'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k', 'ㅣ': 'l', 'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b', 'ㅜ': 'n', 'ㅡ': 'm', 'ㅃ': 'Q', 'ㅉ': 'W', 'ㄸ': 'E', 'ㄲ': 'R', 'ㅆ': 'T', 'ㅒ': 'O', 'ㅖ': 'P' };
  FXR['S-08'] = function (d, x, m, mob, o) {
    var kw = fxKwNow(d), en = kw.split('').map(function (c) { return FX_H2E[c] || c; }).join('');
    if (!kw || en === kw || !/^[a-z ]+$/i.test(en)) { return 'na:한글 자판으로 잘못 친 검색어일 때만 보이는 칸이에요'; }
    var c = fxCat(fxKw(en)); if (!c) { return; }
    var nd = d.querySelector('.noData'), ps = c.prods.slice(0, mob ? 4 : 6);
    var el = fxEl(d, x.id, 'background:#fff;color:#111;text-align:center;padding:' + (mob ? '26px 12px 18px' : '30px 20px') + ';' + FXO, '<div style="font-size:' + (mob ? 15 : 17) + 'px">「' + esc(kw) + '」 → <b style="color:' + o['강조 색'] + '">「' + esc(en) + '」</b> ' + o['안내 글'] + (c.count ? ' <span style="color:#555;font-size:13px">' + c.count.toLocaleString() + '벌</span>' : '') + '</div>' + (ps.length ? '<div style="display:flex;gap:' + (mob ? 10 : 16) + 'px;' + (mob ? 'flex-wrap:wrap' : '') + ';text-align:left;margin-top:16px">' + ps.map(function (p) { return fxMini(p, mob, '', mob ? '46%' : '15.3%'); }).join('') + '</div><a href="' + esc(fxKw(en)) + '" style="display:inline-block;margin-top:16px;border:1px solid #111;padding:10px 22px;color:#111;text-decoration:none;font-size:14px">「' + esc(en) + '」 결과 모두 보기 ›</a>' : ''));
    if (nd && nd.parentNode) { nd.parentNode.insertBefore(el, nd.nextSibling); if (!/displaynone/.test(nd.className)) { fxHide(nd, x.id); } } else { fxPlace(d, 'search', el); }
  };
  /* ---------- 상품상세 ---------- */
  function fxPdBox(d) { return [].slice.call(d.querySelectorAll('.xans-product-detail .prdImg .thumbnail, .xans-product-image .prdImg .thumbnail, .xans-product-mobileimage')).filter(fxVis)[0] || d.querySelector('.xans-product-detail .thumbnail, .prdImg .thumbnail'); }
  function fxInfoRow(d, x, html, css) { var tr = fxPriceTr(d); if (tr) { return fxRowAfter(d, tr, x.id, html, (css || '') + FXO); } var el = fxNew(d, x.id, 'div', 'padding:10px 0;font-size:14px;line-height:1.6;color:#111;text-align:left;' + (css || '') + FXO, html); fxPlace(d, 'detail', el); return el; }
  FXR['P-01'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), nm = o['이름들'] || []; if (!pd.thumbs.length) { return 'na:작은 사진이 없어요'; }
    pd.thumbs.forEach(function (im, i) { var li = im.closest('li') || im.parentNode; li.appendChild(fxNew(d, x.id, 'span', 'display:block;text-align:center;font-size:12px;line-height:1.6;white-space:nowrap;color:' + o['글자색'], esc(nm[Math.min(i, nm.length - 1)] || ''))); });
    fxCss(d, x.id, 'html body .xans-product-image li:has(>[data-vtfx="P-01"]){height:auto!important;overflow:visible!important}');
  };
  FXR['P-02'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), th = fxPdBox(d); if (!pd.big || !th) { return 'na:큰 사진이 없어요'; }
    if (d.defaultView.getComputedStyle(th).position === 'static') { th.setAttribute('data-vtfx-r', '1'); }
    var b = fxNew(d, x.id, 'span', 'position:absolute;left:10px;bottom:10px;z-index:5;background:rgba(0,0,0,.62);color:#fff;font:700 13px/1 "Noto Sans KR",sans-serif;padding:10px 12px;border-radius:4px;cursor:zoom-in;' + FXO, '⤢ ' + o['단추 글']); b.setAttribute('role', 'button'); th.appendChild(b);
    var cur = function () { var w = d.defaultView.innerWidth, c = pd.bigs.filter(function (im) { var r = im.getBoundingClientRect(); return r.left > -10 && r.left < w * 0.6; })[0] || pd.big; return fxAbs(c.getAttribute('src')); };
    fxClick(d, b, function () { fxZoom(d, cur()); }); (pd.bigs.length ? pd.bigs : [pd.big]).forEach(function (im) { fxClick(d, im, function () { fxZoom(d, fxAbs(im.getAttribute('src'))); }); });
  };
  FXR['P-03'] = function (d, x, m, mob, o) {
    if (mob) { return; } var pd = fxPd(d), big = pd.big, box = fxPdBox(d) || (big && big.parentNode); if (!big || !box) { return 'na:큰 사진이 없어요'; }
    var z = parseFloat(o['배율']) || 2, oo = box.style.overflow; box.style.overflow = 'hidden';
    fxOn(d, box, 'mousemove', function (e) { var r = box.getBoundingClientRect(); big.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; big.style.transform = 'scale(' + z + ')'; });
    fxOn(d, box, 'mouseleave', function () { big.style.transform = ''; });
    fxU(d, function () { big.style.transform = ''; big.style.transformOrigin = ''; box.style.overflow = oo; });
    if (d.defaultView.getComputedStyle(box).position === 'static') { box.setAttribute('data-vtfx-r', '1'); }
    box.appendChild(fxNew(d, x.id, 'span', 'position:absolute;left:10px;top:10px;z-index:5;background:rgba(255,255,255,.92);color:#111;font:700 12px/1 "Noto Sans KR",sans-serif;padding:8px 10px;border-radius:4px;pointer-events:none;' + FXO, '🔍 ' + o['딱지 글']));
  };
  FXR['P-04'] = function (d, x, m, mob, o) {
    var cn = [].slice.call(d.querySelectorAll('.vt-counter, .vt-mcounter')).filter(fxVis)[0];
    if (cn) { fxMarkEl(cn, x.id); fxCss(d, x.id, 'html body .vt-counter,html body .vt-mcounter{background:' + o['바탕색'] + '!important;color:' + o['글자색'] + '!important}'); return; }
    var pd = fxPd(d), th = fxPdBox(d); if (!pd.big || !th) { return 'na:큰 사진이 없어요'; }
    if (d.defaultView.getComputedStyle(th).position === 'static') { th.setAttribute('data-vtfx-r', '1'); }
    var n = Math.max(1, pd.thumbs.length), s = fxNew(d, x.id, 'span', 'position:absolute;right:10px;bottom:10px;z-index:5;background:' + o['바탕색'] + ';color:' + o['글자색'] + ';font:700 13px/1 "Noto Sans KR",sans-serif;padding:7px 10px;border-radius:999px;' + FXO, '1 / ' + n); th.appendChild(s);
    pd.thumbs.forEach(function (im, i) { var f = function () { s.textContent = (i + 1) + ' / ' + n; }; fxOn(d, im, 'mouseover', f); fxOn(d, im, 'click', f); });
  };
  FXR['P-05'] = function (d, x, m, mob, o) {
    /* 휴대폰은 넘기는 사진이라 한 장만 보임 → 보이는 것 말고 이 상품의 사진 전체에서 고름 */
    var pd = fxPd(d), host = d.querySelector('.xans-product-detail .imgArea, .xans-product-image'), allT = [].slice.call(d.querySelectorAll('.xans-product-addimage img.ThumbImage, .listImg img.ThumbImage')); if (allT.length < 3) { allT = [].slice.call(d.querySelectorAll('.xans-product-mobileimage li img')); } if (allT.length < 3) { allT = pd.thumbs; }
    if (allT.length < 3 || !host) { return 'na:사진이 적어 따로 모을 것이 없어요'; }
    var ts = allT.slice(-2).map(function (im) { return fxAbs((im.getAttribute('src') || '').replace('/small/', '/big/').replace('/tiny/', '/big/')); });
    var el = fxEl(d, x.id, 'margin-top:14px;padding:28px 12px 12px;border:1px solid ' + o['테두리 색'] + ';background:#fff;text-align:left;color:#111;' + FXO, '<b style="font-size:14px">' + o['제목'] + '</b><div style="display:flex;gap:8px;margin-top:8px">' + ts.map(function (s, i) { return '<img data-z="' + i + '" src="' + esc(s) + '" alt="" loading="lazy" style="width:' + (mob ? '46%' : '130px') + ';aspect-ratio:1/1;object-fit:cover;cursor:zoom-in">'; }).join('') + '</div>');
    host.appendChild(el); [].slice.call(el.querySelectorAll('[data-z]')).forEach(function (im, i) { fxClick(d, im, function () { fxZoom(d, ts[i]); }); });
  };
  FXR['P-06'] = function (d, x, m, mob, o) { var pd = fxPd(d); if (!pd.sale) { return 'na:이 상품은 할인 가격이 없어요'; } fxInfoRow(d, x, '<span style="color:' + o['글자색'] + ';font-weight:700">' + fxWon(pd.price - pd.sale) + ' ' + o['뒤에 붙는 말'] + '</span> <span style="color:#555">(' + fxWon(pd.price) + ' → ' + fxWon(pd.sale) + ')</span>'); };
  function fxFixBar(d) { var fa = d.getElementById('orderFixArea'); return fa && fxVis(fa) && d.defaultView.getComputedStyle(fa).position === 'fixed' ? fa : null; }
  FXR['P-07'] = function (d, x, m, mob, o) {
    if (!mob) { return; } var fa = fxFixBar(d);
    if (fa) { fxMarkEl(fa, x.id); fxCss(d, x.id, 'html body #orderFixArea{border-top:2px solid ' + o['윗선 색'] + '!important}'); return; }
    fxBarEl(d, x.id, o['단추들'] || [], mob).style.borderTop = '2px solid ' + o['윗선 색'];
  };
  FXR['P-08'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), pr = pd.lo ? fxWon(pd.lo) : '', fa = fxFixBar(d), ab = fa ? [].slice.call(fa.querySelectorAll('#actionBuy, .btnSubmit span')).filter(fxVis)[0] : null; if (!pr) { return 'na:가격을 찾지 못했어요'; }
    if (fa && ab && fxVis(ab)) { fxText(d, ab, pr + ' ' + fxPlain(o['단추 글'])); fxMarkEl(fa, x.id); return; }
    fxBarEl(d, x.id, [pr, '♡ 관심', '장바구니', fxPlain(o['단추 글'])], mob);
  };
  FXR['P-10'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), th = fxPdBox(d); if (!pd.big || !th) { return 'na:큰 사진이 없어요'; }
    if (d.defaultView.getComputedStyle(th).position === 'static') { th.setAttribute('data-vtfx-r', '1'); }
    th.appendChild(fxNew(d, x.id, 'div', 'position:absolute;inset:0;z-index:6;background:rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center;pointer-events:none', '<span style="background:' + o['바탕색'] + ';color:#fff;font:800 ' + (mob ? 18 : 24) + 'px/1 "Noto Sans KR",sans-serif;letter-spacing:3px;padding:14px 22px">' + o['사진 위 글'] + '</span>'));
    fxInfoRow(d, x, '<b>' + o['안내 글'] + '</b> ' + (pd.brand ? '<a href="' + esc(fxKw(pd.brand)) + '" style="color:#111;text-decoration:underline;text-underline-offset:3px">' + esc(pd.brand) + ' 다른 옷 보기 ›</a>' : ''));
    [].slice.call(d.querySelectorAll('.xans-product-action .btnSubmit, .xans-product-action .actionCart')).forEach(function (e) { fxHide(e, x.id); });
  };
  FXR['P-11'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), thr = parseFloat(String(o['기준 금액']).replace(/,/g, '')) || 50000; if (!pd.lo) { return 'na:가격을 찾지 못했어요'; }
    var rem = thr - pd.lo, pc = Math.max(4, Math.min(100, Math.round(pd.lo / thr * 100)));
    fxInfoRow(d, x, (rem > 0 ? '<b>' + fxWon(rem) + '</b> ' + o['안내 글'] : '<b>' + o['채운 글'] + '</b>') + '<div style="height:6px;background:#eee;border-radius:3px;margin-top:6px;overflow:hidden"><i style="display:block;height:100%;width:' + pc + '%;background:' + o['막대 색'] + '"></i></div>');
  };
  function fxSvg(ms, col) {
    var g = function (re) { var r = ms.filter(function (q) { return re.test(q[0]); })[0]; return r ? r[1] : null; }, L = function (a, b, c, e) { return '<line x1="' + a + '" y1="' + b + '" x2="' + c + '" y2="' + e + '" stroke="' + col + '" stroke-width="1.5" stroke-dasharray="4 3"/>'; }, T = function (a, b, s, an) { return '<text x="' + a + '" y="' + b + '" font-size="13" font-weight="700" fill="' + col + '" text-anchor="' + (an || 'middle') + '" font-family="Noto Sans KR,sans-serif">' + s + '</text>'; };
    var sh = g(/어깨/), ch = g(/가슴/), sl = g(/소매/), ln = g(/기장|총장/), wa = g(/허리/), hp = g(/엉덩이|힙/), th = g(/허벅지/), hm = g(/밑단/), s = '';
    if (ch != null || sh != null) {
      s = '<path d="M110 26 L80 36 L34 78 L58 104 L86 82 L86 196 L214 196 L214 82 L242 104 L266 78 L220 36 L190 26 Q150 50 110 26 Z" fill="#f6f4f0" stroke="#111" stroke-width="1.5"/>';
      if (sh != null) { s += L(80, 16, 220, 16) + T(150, 12, '어깨 ' + sh); }
      if (ch != null) { s += L(86, 110, 214, 110) + T(150, 104, '가슴 ' + ch); }
      if (sl != null) { s += L(228, 30, 274, 72) + T(296, 46, '소매 ' + sl, 'end'); }
      if (ln != null) { s += L(150, 44, 150, 196) + T(156, 160, '총기장 ' + ln, 'start'); }
    } else {
      s = '<path d="M90 20 L210 20 L224 196 L164 196 L150 80 L136 196 L76 196 Z" fill="#f6f4f0" stroke="#111" stroke-width="1.5"/>';
      if (wa != null) { s += L(90, 12, 210, 12) + T(150, 9, '허리 ' + wa); }
      if (hp != null) { s += L(86, 60, 214, 60) + T(150, 54, '엉덩이 ' + hp); }
      if (th != null) { s += L(84, 96, 148, 96) + T(116, 90, '허벅지 ' + th); }
      if (ln != null) { s += L(238, 20, 238, 196) + T(244, 112, '총기장 ' + ln, 'start'); }
      if (hm != null) { s += L(76, 204, 136, 204) + T(106, 208, '밑단 ' + hm); }
    }
    return '<svg viewBox="0 0 300 214" width="300" height="214" role="img" aria-label="실측 그림" style="max-width:100%;height:auto;display:block">' + s + '</svg>';
  }
  FXR['P-12'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), ms = fxPdMeas(d, pd); if (!ms.length) { return 'na:이 상품에서 실측 숫자를 찾지 못했어요'; }
    fxInfoRow(d, x, '<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">' + fxSvg(ms, o['선 색']) + '<div style="font-size:14px;line-height:1.9">' + ms.map(function (q) { return esc(q[0]) + ' <b>' + q[1] + '</b>cm'; }).join('<br>') + '</div></div>');
  };
  FXR['P-13'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), ms = fxPdMeas(d, pd), ch = ms.filter(function (q) { return /가슴/.test(q[0]); })[0] || ms[0]; if (!ch) { return 'na:이 상품에서 실측 숫자를 찾지 못했어요'; }
    var mine = FXD.mine != null ? FXD.mine : ch[1] + 4, df = Math.round((ch[1] - mine) * 10) / 10;
    var td = fxInfoRow(d, x, '<b>' + o['제목'] + '</b> <span style="margin-left:6px">내 옷 ' + esc(ch[0]) + '</span> <input type="number" value="' + mine + '" aria-label="내 옷 ' + esc(ch[0]) + '" style="width:64px;height:36px;border:1px solid #888;text-align:center;font-size:15px;box-sizing:border-box"> cm → <b style="color:' + o['강조 색'] + '">이 옷(' + ch[1] + ')이 ' + (df === 0 ? '같아요' : Math.abs(df) + 'cm ' + (df < 0 ? '작아요' : '커요')) + '</b>');
    var ip = td.querySelector('input'); ip.addEventListener('change', function () { FXD.mine = +ip.value || 0; fxAll(); });
  };
  function fxPdMats(d, pd) { return fxMats(pd.name + ' ' + pd.alt + ' ' + fxT(d.querySelector('.xans-product-detaildesign'))); }
  FXR['P-14'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), mt = fxPdMats(d, pd); if (!mt.length) { return 'na:이 상품 이름에 재질이 없어요'; }
    fxInfoRow(d, x, '<b style="margin-right:8px">' + o['앞 글'] + '</b>' + mt.map(function (q) { return '<span style="display:inline-block;border:1px solid ' + o['테두리 색'] + ';border-radius:999px;padding:3px 12px;margin:0 6px 4px 0;font-size:13px">' + esc(q[0]) + (q[1] ? ' ' + esc(q[1]) : '') + '</span>'; }).join(''));
  };
  FXR['P-15'] = function (d, x, m, mob, o) {
    var tr = fxTr(d, /상품코드/), td = tr && tr.querySelector('td'), code = fxT(td); if (!td || !code) { return 'na:상품코드 칸이 없어요'; }
    td.appendChild(fxCopyBtn(d, x.id, code, o['단추 글']));
  };
  function fxBrandCat(pd) { var w = pd.name.split(' '), keys = fxUniq([pd.brand, w.slice(0, 2).join(' '), w[0]]), i, c; for (i = 0; i < keys.length; i++) { c = fxCat(fxKw(keys[i])); if (!c) { return null; } if (c.prods.filter(function (p) { return p.no !== pd.no && !p.sold; }).length) { return { c: c, k: keys[i] }; } } return { c: { prods: [], count: 0, subs: [] }, k: pd.brand }; }
  FXR['P-16'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), tr = fxTr(d, /브랜드/); if (!pd.brand || !tr) { return 'na:이 상품에 브랜드 값이 없어요'; }
    var bc = fxBrandCat(pd); if (!bc) { return; } var c = bc.c; if (!c.prods.length) { return 'na:이 브랜드의 다른 옷이 지금 없어요'; }
    fxRowAfter(d, tr, x.id, '<b>' + esc(pd.brand) + '</b> ' + String(o['소개 글']).replace('{수}', '<b>' + (c.count || c.prods.length).toLocaleString() + '</b>') + ' <a href="' + esc(fxKw(bc.k)) + '" style="color:' + o['링크 색'] + ';text-decoration:underline;text-underline-offset:3px;white-space:nowrap">' + o['링크 글'] + ' ›</a>', 'padding:4px 0 10px;font-size:13px;' + FXO);
  };
  FXR['P-17'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), c = fxMain().filter(function (p) { return p.no && p.no === pd.no; })[0], og = (c && c.origin) || ((pd.name + ' ' + fxT(d.querySelector('.xans-product-detaildesign'))).match(/MADE IN [A-Z ]{3,20}/i) || [''])[0].trim();
    if (!og) { return 'na:이 상품에는 원산지 값이 없어요'; }
    fxInfoRow(d, x, '<b style="margin-right:8px">' + o['앞 글'] + '</b><span style="display:inline-block;border:1px solid ' + o['테두리 색'] + ';border-radius:999px;padding:3px 12px;font-size:13px">' + esc(og) + '</span>');
  };
  FXR['P-18'] = function (d, x, m, mob, o) {
    var secs = [].slice.call(d.querySelectorAll('.info_fold:not(#review):not(#QnA)')).map(function (f) { var t = fxT(f.querySelector('.info_title')).replace(/\s*[+＋－-]\s*$/, ''), c = fxT(f.querySelector('.info_content')); if (!t || !c) { return null; } var s = c.replace(/^(.{16,64}?[.다요]) .*$/, '$1'); return [t, s.length > 66 ? s.slice(0, 64) + '…' : s]; }).filter(Boolean).slice(0, 3), sh = fxShop(d);
    if (!secs.length) { if (sh.tel) { secs.push(['고객센터', sh.tel + (sh.hours ? ' · ' + sh.hours : '')]); } if (sh.acct) { secs.push(['입금 계좌', sh.bank + ' ' + sh.acct]); } }
    if (!secs.length) { return 'na:이 화면에 배송·반품 안내 글이 없어요'; }
    var ic = function (t) { return /배송/.test(t) ? '🚚' : /교환|반품|환불/.test(t) ? '↩' : /결제|입금|계좌/.test(t) ? '💳' : /고객|상담/.test(t) ? '📞' : '•'; };
    fxInfoRow(d, x, secs.map(function (s) { return '<div style="display:flex;gap:8px;padding:3px 0"><span style="flex:0 0 22px">' + ic(s[0]) + '</span><span><b style="color:' + o['제목 색'] + '">' + esc(s[0]) + '</b> ' + esc(s[1]) + '</span></div>'; }).join(''), 'font-size:13px;');
  };
  FXR['P-19'] = function (d, x, m, mob, o) {
    var fs = [].slice.call(d.querySelectorAll('.info_fold:not(#review):not(#QnA)')).filter(function (f) { return f.querySelector('.info_title') && f.querySelector('.info_content'); }); if (!fs.length) { return 'na:이 화면에 긴 안내 칸이 없어요'; }
    FXD.fold = FXD.fold || {};
    fs.forEach(function (f, i) {
      var t = f.querySelector('.info_title'), c = f.querySelector('.info_content'), open = !!FXD.fold[i];
      if (!open) { fxHide(c, x.id); }
      t.appendChild(fxNew(d, x.id, 'span', 'float:right;font-weight:400;font-size:14px;color:' + o['글자색'] + ';cursor:pointer', (open ? o['접기 글'] : o['펼치기 글']) + (open ? ' －' : ' ＋')));
      fxMarkEl(t, x.id); fxClick(d, t, function () { FXD.fold[i] = !open; fxAll(); });
    });
    fxCss(d, x.id, '[data-vtfx-o~="P-19"]{cursor:pointer}');
  };
  FXR['P-21'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), mt = fxPdMats(d, pd); if (!mt.length) { return 'na:이 상품 이름에 재질이 없어 세탁 안내를 고를 수 없어요'; }
    var care = FX_CARE.filter(function (c) { return c[0].test(mt[0][0]); })[0][1];
    fxInfoRow(d, x, '🧺 <b style="color:' + o['제목 색'] + '">' + o['앞 글'] + '</b> <span style="color:#555">(' + esc(mt[0][0]) + ')</span> ' + care);
  };
  FXR['P-23'] = function (d, x, m, mob, o) {
    var pd = fxPd(d); if (!pd.brand) { return 'na:이 상품에 브랜드 값이 없어요'; }
    var bc = fxBrandCat(pd); if (!bc) { return; }
    var ps = bc.c.prods.filter(function (p) { return p.no !== pd.no && !p.sold; }); if (!ps.length) { return 'na:같은 브랜드의 다른 옷이 지금 없어요'; }
    var inner = ps.slice(0, 6).map(function (p) { return fxMini(p, mob); }).join('');
    fxSec(d, x.id, o['제목'] + ' <span style="font-weight:400;font-size:.7em;color:#555">' + esc(pd.brand) + '</span>', inner, mob, 'detailEnd');
  };
  FXR['P-24'] = function (d, x, m, mob, o) {
    var pd = fxPd(d), sz = pd.size.replace(/\s*\(.*$/, ''), gw = (pd.name.match(/(여자|남자|공용|키즈|주니어|베이비)/) || [''])[0]; if (!sz) { return 'na:이 상품 이름에 사이즈가 없어요'; }
    var c = fxCat(fxKw((gw ? gw + ' ' : '') + sz)); if (!c) { return; }
    var ps = c.prods.concat(fxMain()).filter(function (p, i, a) { return p.no !== pd.no && !p.sold && p.size.replace(/\s*\(.*$/, '') === sz && a.map(function (q) { return q.no; }).indexOf(p.no) === i; });
    if (!ps.length) { return 'na:같은 사이즈 옷을 찾지 못했어요'; }
    fxSec(d, x.id, o['제목'] + ' <span style="font-weight:400;font-size:.7em;color:#555">' + esc((gw ? gw + ' ' : '') + sz) + '</span>', ps.slice(0, 6).map(function (p) { return fxMini(p, mob); }).join(''), mob, 'detailEnd');
  };
  FXR['P-25'] = function (d, x, m, mob, o) {
    var h = d.querySelector('.xans-product-detail .headingArea h1, .xans-product-detail .headingArea h2, .headingArea h1, .headingArea h2'), nmTr = fxTr(d, /상품명/), host = h || (nmTr && nmTr.querySelector('td')); if (!host) { return 'na:상품명 칸이 없어요'; }
    var url = pvBase() + ((PV.on && PV.f && PV.f.contentDocument === d) ? PV.url : (d.defaultView ? d.defaultView.location.pathname + d.defaultView.location.search : '/'));
    host.appendChild(fxCopyBtn(d, x.id, url, '🔗 ' + o['단추 글']));
  };
  /* ---------- 게시판 ---------- */
  /* 쇼핑몰이 표를 카드 목록(.vtb)으로 다시 그려 보여 주면 그 카드에, 아니면 표에 붙임 */
  function fxVtb(d) { var v = d.querySelector('.vtb'); return v && fxVis(v) ? v : null; }
  function fxBoardTop(d, el) { var v = fxVtb(d), t = v ? (v.querySelector('.vtb-list') || v) : d.querySelector('.xans-board-listpackage .ec-base-table, .xans-board-listpackage table, .xans-board-list, .boardList'); if (t && t.parentNode) { t.parentNode.insertBefore(el, t); return true; } return false; }
  function fxCardOf(d, r) { return r.href ? d.querySelector('.vtb-list a[href="' + r.href.replace(/"/g, '') + '"]') : null; }
  function fxGo(d, href) { try { if (d === document || (PV.on && PV.f && PV.f.contentDocument === d)) { pvOpen(href); } else { d.defaultView.location.assign(href); } } catch (e) { } }
  FXR['B-01'] = function (d, x, m, mob, o) {
    var rows = fxRows(d).map(fxRowInfo).filter(function (r) { return !r.notice && !r.reply && r.img && r.subj; }); if (!rows.length) { return 'na:이 게시판에는 사진 있는 글이 없어요'; }
    var el = fxEl(d, x.id, 'background:#fff;color:#111;text-align:left;padding:' + (mob ? '26px 0 16px' : '30px 0 20px') + ';' + FXO, '<div style="font-weight:800;font-size:' + (mob ? 16 : 18) + 'px;margin:0 0 12px">' + o['제목'] + '</div><div style="display:flex;gap:' + (mob ? 10 : 14) + 'px;' + (mob ? 'flex-wrap:wrap' : '') + '">' + fxRevCards(rows, mob) + '</div>');
    if (!fxBoardTop(d, el)) { fxPlace(d, 'board', el); }
  };
  FXR['B-02'] = function (d, x, m, mob, o) {
    var v = fxVtb(d), n = 0;
    fxRows(d).map(fxRowInfo).forEach(function (r) {
      if (!r.img) { return; } var cd = v ? fxCardOf(d, r) : null, im = cd ? cd.querySelector('img.vtb-th') : r.tr.querySelector('td.thumb img'), host = cd || r.tr.querySelector('td.thumb'); if (!im || !host || !fxVis(im)) { return; } n++;
      var open = function () { fxZoom(d, r.img.replace('/tiny/', '/big/')); }; fxClick(d, im, open); im.style.cursor = 'zoom-in'; fxU(d, function () { im.style.cursor = ''; });
      if (n > 8) { return; }
      if (d.defaultView.getComputedStyle(host).position === 'static') { host.setAttribute('data-vtfx-r', '1'); }
      var hr = host.getBoundingClientRect(), ir = im.getBoundingClientRect();
      var b = fxNew(d, x.id, 'span', 'position:absolute;left:' + Math.round(ir.right - hr.left - 26) + 'px;top:' + Math.round(ir.bottom - hr.top - 24) + 'px;z-index:2;background:rgba(0,0,0,.62);color:#fff;font:700 12px/1 sans-serif;padding:5px 6px;border-radius:3px;cursor:zoom-in;' + FXO, o['단추 글']); host.appendChild(b); fxClick(d, b, open);
    });
    if (!n) { return 'na:이 게시판에는 사진이 없어요'; }
  };
  FXR['B-03'] = function (d, x, m, mob, o) {
    var v = fxVtb(d), pills = v ? [].slice.call(v.querySelectorAll('.vtb-pill.ok')) : [];
    if (pills.length) { pills.forEach(function (p) { fxText(d, p, fxPlain(o['딱지 글'])); }); fxMarkEl(pills[0], x.id); fxCss(d, x.id, 'html body .vtb .vtb-pill.ok{background:' + o['바탕색'] + '!important;color:#fff!important;border-color:' + o['바탕색'] + '!important}'); return; }
    var rows = fxRows(d).map(fxRowInfo), n = 0;
    rows.forEach(function (r, i) { if (r.notice || r.reply || !r.a) { return; } var nx = rows[i + 1]; if (!(nx && nx.reply)) { return; } var host = v ? fxCardOf(d, r) : r.a.parentNode; if (!host) { return; } n++; var b = fxNew(d, x.id, 'span', 'display:inline-block;margin-left:8px;background:' + o['바탕색'] + ';color:#fff;font:700 12px/1.6 "Noto Sans KR",sans-serif;padding:0 7px;border-radius:3px;vertical-align:middle;white-space:nowrap', o['딱지 글']); if (v) { (host.querySelector('b') || host).appendChild(b); } else { host.insertBefore(b, r.a.nextSibling); } });
    if (!n) { return 'na:이 쪽에는 답변이 달린 글이 없어요'; }
  };
  FXR['B-04'] = function (d, x, m, mob, o) {
    var v = fxVtb(d), nc = v ? v.querySelector('.vtb-nc') : null;
    if (nc && fxVis(nc)) { fxMarkEl(nc, x.id); [].slice.call(nc.querySelectorAll('a')).forEach(function (a) { var p = fxNew(d, x.id, 'span', 'margin-right:6px;flex:0 0 auto', '📌'); a.insertBefore(p, a.firstChild); }); fxCss(d, x.id, 'html body .vtb .vtb-nc>a{background:' + o['바탕색'] + '!important}'); return; }
    var rows = fxRows(d).map(fxRowInfo).filter(function (r) { return r.notice && fxVis(r.tr); }); if (!rows.length) { return 'na:이 게시판에는 공지 글이 없어요'; }
    rows.forEach(function (r) { r.tr.setAttribute('data-vtfx-lc', x.id); var h = r.a || r.tr.querySelector('td.subject'); if (h) { var p = fxNew(d, x.id, 'span', 'margin-right:6px', '📌'); h.parentNode.insertBefore(p, h); } });
    fxMarkEl(rows[0].tr, x.id);
    fxCss(d, x.id, 'html body tr[data-vtfx-lc],html body tr[data-vtfx-lc]>td{background:' + o['바탕색'] + '!important}html body tr[data-vtfx-lc] td.subject a{font-weight:700!important}');
  };
  FXR['B-05'] = function (d, x, m, mob, o) {
    var v = fxVtb(d), n = 0;
    fxRows(d).map(fxRowInfo).forEach(function (r) {
      if (!r.img || !/\/product\//.test(r.phref) || r.reply) { return; } var cd = v ? fxCardOf(d, r) : null, host = v ? (cd && (cd.querySelector('small') || cd.querySelector('em'))) : (r.tr.querySelector('p.product') || r.tr.querySelector('td.subject')); if (!host || !fxVis(host)) { return; } n++;
      var a = fxNew(d, x.id, 'span', 'display:inline-block;margin-left:8px;font-size:12px;color:' + o['글자색'] + ';text-decoration:underline;text-underline-offset:3px;white-space:nowrap;cursor:pointer', o['링크 글'] + ' ›'); a.setAttribute('role', 'link'); fxClick(d, a, function () { fxGo(d, r.phref); }); host.appendChild(a);
    });
    if (!n) { return 'na:이 게시판 글에는 상품이 붙어 있지 않아요'; }
  };
  FXR['B-06'] = function (d, x, m, mob, o) {
    var v = fxVtb(d), rows = v ? [].slice.call(v.querySelectorAll('.vtb-list > a')) : fxRows(d); if (!rows.length) { return 'na:게시판 목록이 없어요'; }
    var q = FXD.bq || '', n = q ? rows.filter(function (tr) { return fxT(tr).toLowerCase().indexOf(q.toLowerCase()) > -1; }).length : rows.length;
    var el = fxNew(d, x.id, 'form', 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:0 0 12px;' + FXO, '<input type="search" value="' + esc(q) + '" placeholder="' + o['안내 글'] + '" aria-label="찾을 말" style="flex:1;min-width:0;max-width:420px;height:42px;border:1px solid #111;padding:0 12px;font-size:15px;box-sizing:border-box;background:#fff"><button type="submit" style="height:42px;padding:0 18px;border:0;background:#111;color:#fff;font:600 14px/1 sans-serif;cursor:pointer">' + o['단추 글'] + '</button>' + (q ? '<span style="font-size:13px;color:#555">「' + esc(q) + '」 이 쪽에서 ' + n + '개</span>' : ''));
    var ip = el.querySelector('input'), go = function (e) { if (e) { e.preventDefault(); e.stopPropagation(); } FXD.bq = ip.value.trim(); fxAll(); };
    el.addEventListener('submit', go, true); ip.addEventListener('search', function () { go(); });
    if (!fxBoardTop(d, el)) { return 'na:게시판 목록이 없어요'; }
    if (q) { rows.forEach(function (tr) { if (fxT(tr).toLowerCase().indexOf(q.toLowerCase()) < 0) { fxHide(tr, x.id); } }); }
  };
  FXR['B-07'] = function (d, x, m, mob, o) {
    var r = fxRows(d).map(fxRowInfo).filter(function (q) { return q.img && q.pname; })[0], p = r ? { img: r.img.replace('/tiny/', '/medium/'), name: r.pname, code: (function () { try { return decodeURIComponent(r.img.split('/').pop()).replace(/_\d+\.\w+$/, ''); } catch (e) { return ''; } })() } : fxMain()[0];
    if (!p) { return 'na:보여 줄 상품이 없어요'; }
    var el = fxEl(d, x.id, 'background:#fff;color:#111;text-align:left;border:1px solid #ddd;padding:28px 14px 14px;margin:0 0 14px;' + FXO, '<b style="font-size:15px">' + o['제목'] + '</b><div style="display:flex;gap:10px;align-items:center;margin:10px 0"><img src="' + esc(p.img) + '" alt="" style="width:56px;height:56px;object-fit:cover;flex:0 0 56px"><span style="font-size:13px;line-height:1.5;color:#333">' + esc(p.name) + '<br><span style="color:#666">' + esc(p.code) + '</span></span></div><label style="display:block;font-size:13px;color:#555;margin-bottom:4px">제목 (자동으로 들어감)</label><input type="text" readonly value="[' + esc(p.code) + '] ' + esc(p.name) + ' ' + fxPlain(o['끝 글']) + '" style="width:100%;height:42px;border:1px solid #111;padding:0 10px;font-size:14px;box-sizing:border-box;background:#fafafa;color:#111">');
    if (!fxBoardTop(d, el)) { fxPlace(d, 'board', el); }
  };
  /* ---------- 하단 ---------- */
  FXR['F-01'] = function (d, x, m, mob, o) {
    if (!mob) { return; } var ad = d.querySelector('.vt-ft__addr'); if (!ad) { return 'na:바닥에 회사 정보 칸이 없어요'; }
    var open = !!FXD.sw[x.id], b = fxNew(d, x.id, 'button', 'display:flex;align-items:center;justify-content:space-between;width:100%;min-height:46px;border:1px solid #bbb;background:transparent;color:inherit;padding:0 14px;font:600 14px/1 "Noto Sans KR",sans-serif;cursor:pointer;margin:8px 0;' + FXO, '<span>' + (open ? o['접기 글'] : o['펼치기 글']) + '</span><span>' + (open ? '－' : '＋') + '</span>'); b.type = 'button';
    fxClick(d, b, function () { FXD.sw[x.id] = !open; fxAll(); }); ad.parentNode.insertBefore(b, ad); if (!open) { fxHide(ad, x.id); }
  };
  FXR['F-02'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d), sh = fxShop(d); if (!ft || !sh.tel) { return 'na:바닥에 전화번호가 없어요'; }
    var el = fxNew(d, x.id, 'div', 'display:flex;gap:6px 14px;flex-wrap:wrap;align-items:center;justify-content:center;padding:' + (mob ? '12px' : '14px 20px') + ';font-size:' + (mob ? 14 : 15) + 'px;background:' + o['바탕색'] + ';color:' + o['글자색'] + ';' + FXO, '<b>' + o['앞 글'] + ' <a href="tel:' + esc(sh.tel) + '" style="color:inherit;text-decoration:none">' + esc(sh.tel) + '</a></b>' + (sh.hours ? '<span>운영시간 ' + esc(sh.hours) + '</span>' : ''));
    ft.insertBefore(el, ft.firstChild);
  };
  FXR['F-03'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d), w = d.defaultView, sz = parseFloat(o['글씨 크기']) || 14, n = 0; if (!ft) { return 'na:바닥이 없어요'; }
    [].slice.call(ft.querySelectorAll('*')).forEach(function (e) { if (e.closest('[data-vtfx]') || !fxVis(e)) { return; } var own = [].slice.call(e.childNodes).some(function (c) { return c.nodeType === 3 && c.nodeValue.trim(); }); if (own && parseFloat(w.getComputedStyle(e).fontSize) < sz) { e.setAttribute('data-vtfx-fs', x.id); n++; } });
    if (!n) { return 'na:바닥 글씨가 이미 ' + sz + 'px 이상이에요'; }
    fxCss(d, x.id, 'html body [data-vtfx-fs]{font-size:' + sz + 'px!important;color:' + o['글자색'] + '!important;line-height:1.6!important}');
    fxMarkEl(ft, x.id);
  };
  FXR['F-04'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d), u = fxShop(d).insta; if (!ft || !u) { return 'na:이 쇼핑몰에 인스타그램 주소가 없어요'; }
    var h = u.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[/?].*$/, '');
    var el = fxNew(d, x.id, 'div', 'text-align:center;padding:' + (mob ? '14px 0' : '18px 0') + ';' + FXO, '<a href="' + esc(u) + '" data-vtfx-ext="1" style="display:inline-flex;align-items:center;gap:8px;color:' + o['글자색'] + ';text-decoration:none;font-size:14px;min-height:44px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg><span>' + o['앞 글'] + ' @' + esc(h) + '</span></a>');
    (ft.querySelector('.vt-ft__in') || ft).appendChild(el);
  };
  FXR['F-05'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d), sh = fxShop(d); if (!ft || !sh.acct) { return 'na:계좌 번호를 찾지 못했어요'; }
    var li = [].slice.call(ft.querySelectorAll('.vt-ft__bank li, .vt-ft__bank')).filter(function (e) { return fxVis(e) && /\d[\d-]{7,}\d/.test(fxT(e)); })[0];
    if (li) { li.appendChild(fxCopyBtn(d, x.id, sh.acct, o['단추 글'], 'background:transparent;color:inherit;border-color:currentColor;')); return; }
    var host = [].slice.call(ft.querySelectorAll('.vt-ft__holder, .vt-ft__bank')).filter(fxVis)[0]; if (!host) { return 'na:' + (mob ? '휴대폰 바닥에는 계좌 칸이 안 보여요(☰ 창에 있음 → D-07)' : '바닥에 계좌 칸이 없어요'); }
    var el = fxNew(d, x.id, 'div', 'margin:4px 0;font-size:14px;' + FXO, '<b>' + esc(sh.bank) + '</b> ' + esc(sh.acct)); el.appendChild(fxCopyBtn(d, x.id, sh.acct, o['단추 글'], 'background:transparent;color:inherit;border-color:currentColor;outline:0;')); host.parentNode.insertBefore(el, host);
  };
  FXR['F-06'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d); if (!ft) { return 'na:바닥이 없어요'; }
    var ts = [].slice.call(ft.querySelectorAll('.vt-ft__desc, .vt-ft__partner p')).filter(function (e) { return fxT(e).length > 20; }); if (!ts.length) { return 'na:바닥에 긴 안내 글이 없어요'; }
    ts.forEach(function (t, i) {
      var open = !!FXD.sw[x.id + i], lb = /partner/.test(t.parentNode.className) ? '구매안전(에스크로) 안내' : '반품·교환 안내';
      var b = fxNew(d, x.id, 'button', 'display:flex;align-items:center;justify-content:space-between;gap:10px;min-width:' + (mob ? '100%' : '260px') + ';min-height:44px;border:1px solid ' + o['테두리 색'] + ';background:transparent;color:inherit;padding:0 12px;font:600 13px/1 "Noto Sans KR",sans-serif;cursor:pointer;margin:6px 0;' + FXO, '<span>' + lb + '</span><span>' + (open ? o['접기 글'] + ' －' : o['펼치기 글'] + ' ＋') + '</span>'); b.type = 'button';
      fxClick(d, b, function () { FXD.sw[x.id + i] = !open; fxAll(); }); t.parentNode.insertBefore(b, t); if (!open) { fxHide(t, x.id); }
    });
  };
  FXR['F-07'] = function (d, x, m, mob, o) {
    var ft = fxFoot(d); if (!ft) { return 'na:바닥이 없어요'; }
    var el = fxNew(d, x.id, 'div', 'display:flex;gap:6px 16px;flex-wrap:wrap;align-items:center;justify-content:center;padding:' + (mob ? '14px 10px' : '16px 20px') + ';font-size:14px;border-top:1px solid ' + o['선 색'] + ';' + FXO, '<span style="opacity:.8">' + o['앞 글'] + '</span>' + fxMalls('color:inherit;font-weight:800;text-decoration:underline;text-underline-offset:4px;padding:8px 2px', 'color:inherit;padding:8px 2px').join('<span style="opacity:.4">·</span>'));
    (ft.querySelector('.vt-ft__in') || ft).appendChild(el);
  };
  FXR['F-08'] = function (d, x, m, mob, o) {
    if (!mob) { return; } var ft = fxFoot(d); if (!ft) { return 'na:바닥이 없어요'; }
    var t = [].slice.call(ft.querySelectorAll('.vt-ft__call')).filter(fxVis)[0], lk = 'color:' + o['글자색'] + ';text-decoration:underline;text-underline-offset:4px;', tip = function (a) { var s2 = fxNew(d, x.id, 'span', 'display:inline-block;margin-left:8px;font-size:13px;vertical-align:middle', '📞 ' + o['옆 글']); a.parentNode.insertBefore(s2, a.nextSibling); };
    if (t) {
      var tel = (fxT(t).match(/\d[\d-]{6,}\d/) || [''])[0], a = t.tagName === 'A' ? t : t.querySelector('a[href^="tel:"]');
      if (!a) { a = fxNew(d, x.id, 'a', '', esc(fxT(t))); a.className = t.className; a.setAttribute('href', 'tel:' + tel); a.style.cssText = lk + FXO; t.parentNode.insertBefore(a, t); fxHide(t, x.id); }
      else { fxMarkEl(a, x.id); fxCss(d, x.id, 'html body .vt-ft__call,html body .vt-ft__call a{' + lk.replace(/;/g, '!important;') + '}'); }
      tip(a); return;
    }
    /* 보이는 글 가운데 전화번호가 든 글자를 찾아 그 번호만 전화 링크로 */
    var it = d.createTreeWalker(ft, 4), n, hit = null;
    while ((n = it.nextNode())) { var pe = n.parentElement; if (!pe || pe.closest('[data-vtfx], a[href^="tel:"]') || !fxVis(pe)) { continue; } var mt = n.nodeValue.match(/0\d{1,2}-\d{3,4}-\d{4}/); if (mt) { hit = [n, mt[0]]; break; } }
    if (!hit) { var ex = [].slice.call(ft.querySelectorAll('a[href^="tel:"]')).filter(fxVis)[0]; if (ex) { fxMarkEl(ex, x.id); fxCss(d, x.id, '[data-vtfx-o~="F-08"]{' + lk.replace(/;/g, '!important;') + '}'); tip(ex); return; } return 'na:휴대폰 바닥에는 전화번호가 안 보여요(☰ 창에 있음 → D-06)'; }
    var node = hit[0], old = node.nodeValue, i = old.indexOf(hit[1]), rest = node.splitText(i); rest.nodeValue = rest.nodeValue.slice(hit[1].length);
    var a2 = fxNew(d, x.id, 'a', lk + FXO, esc(hit[1])); a2.setAttribute('href', 'tel:' + hit[1]); rest.parentNode.insertBefore(a2, rest);
    fxU(d, function () { try { rest.remove(); node.nodeValue = old; } catch (e) { } }); tip(a2);
  };
  /* ---------- 공통 ---------- */
  var FX_IC = ['<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', '<path d="M4 6h16M4 12h16M4 18h16"/>', '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>', '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'];
  FXR['C-01'] = function (d, x, m, mob, o) {
    if (!mob) { return; } var lb = o['단추들'] || [], hr = ['/', '', '', '/myshop/wish_list.html', '/myshop/index.html'];
    var bar = fxNew(d, x.id, 'nav', 'position:fixed;left:0;right:0;bottom:0;z-index:2147482300;display:flex;background:' + o['바탕색'] + ';border-top:1px solid #ddd;height:58px;' + FXO, lb.slice(0, 5).map(function (s, k) { return '<a href="' + (hr[k] || '#') + '" data-k="' + k + '" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:12px;color:#111;text-decoration:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (FX_IC[k] || FX_IC[0]) + '</svg><span>' + esc(s) + '</span></a>'; }).join(''));
    bar.setAttribute('aria-label', '아래 고정 메뉴'); d.body.appendChild(bar);
    var a1 = bar.querySelector('[data-k="1"]'), a2 = bar.querySelector('[data-k="2"]');
    if (a1) { fxClick(d, a1, function () { drawerOpen(d); }); }
    if (a2) { fxClick(d, a2, function () { var b = d.getElementById('vtSearchBtn'), sc = d.getElementById('vtSearch'); if (b) { b.click(); } setTimeout(function () { if (sc && d.defaultView.getComputedStyle(sc).display === 'none') { sc.style.display = 'block'; sc.style.opacity = '1'; } }, 150); }); }
    fxCss(d, x.id, 'html body{padding-bottom:58px!important}html body details.vt-quick-menu{bottom:70px!important}');
  };
  FXR['C-02'] = function (d, x, m, mob, o) {
    var el = mob ? d.querySelector('details.vt-quick-menu, .floating.vt-quick-menu') : d.querySelector('.floating.vt-fl-pc'); if (!el || !fxVis(el)) { return 'na:떠 있는 상담·바로가기 단추가 없어요'; }
    var s = Math.max(.5, Math.min(1, (parseFloat(o['크기(%)']) || 80) / 100)), up = parseFloat(o['위로(px)']) || 0;
    fxMarkEl(el, x.id);
    fxCss(d, x.id, mob ? 'html body details.vt-quick-menu,html body .floating.vt-quick-menu{transform:scale(' + s + ')!important;transform-origin:right bottom!important;margin-bottom:' + up + 'px!important}' : 'html body .floating.vt-fl-pc{transform:scale(' + s + ')!important;transform-origin:right center!important;margin-top:-' + up + 'px!important}');
  };
  FXR['C-04'] = function (d, x, m, mob, o) {
    var ps = fxRecent(d).slice(0, 3); if (!ps.length) { return 'na:보여 줄 상품이 없어요'; }
    var open = !!FXD.sw[x.id], bt = mob ? 150 : 180, rt = mob ? 12 : 64;
    var b = fxNew(d, x.id, 'button', 'position:fixed;z-index:2147482350;right:' + rt + 'px;bottom:' + bt + 'px;width:60px;border:1px solid #ccc;background:' + o['바탕색'] + ';color:#111;border-radius:8px;padding:4px 4px 6px;box-shadow:0 4px 14px rgba(0,0,0,.18);cursor:pointer;font:600 12px/1.3 "Noto Sans KR",sans-serif;' + FXO, '<img src="' + esc(ps[0].img) + '" alt="" style="width:50px;height:50px;object-fit:cover;display:block;margin:0 auto 4px"><span>' + o['단추 글'] + ' ' + ps.length + '</span>'); b.type = 'button';
    fxClick(d, b, function () { FXD.sw[x.id] = !open; fxAll(); }); d.body.appendChild(b);
    if (open) { var p = fxNew(d, x.id, 'div', 'position:fixed;z-index:2147482350;right:' + (rt + 68) + 'px;bottom:' + bt + 'px;display:flex;gap:6px;background:#fff;border:1px solid #ccc;border-radius:8px;padding:8px;box-shadow:0 4px 14px rgba(0,0,0,.18)', ps.map(function (q) { return '<a href="' + esc(q.href) + '" style="display:block"><img src="' + esc(q.img) + '" alt="' + esc(q.name) + '" style="width:64px;height:64px;object-fit:cover;display:block"></a>'; }).join('')); d.body.appendChild(p); }
  };
  function fxLum(c) { var r = (c.match(/[\d.]+/g) || []).map(Number); if (r.length < 3) { return null; } if (r.length > 3 && r[3] < 0.5) { return null; } var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r[0]) + 0.7152 * f(r[1]) + 0.0722 * f(r[2]); }
  FXR['C-05'] = function (d, x, m, mob, o) {
    var w = d.defaultView, n = 0, it = d.createTreeWalker(d.body, 4), t, seen = [];
    while ((t = it.nextNode()) && n < 400) {
      var e = t.parentElement; if (!t.nodeValue.trim() || !e || seen.indexOf(e) > -1 || e.closest('[data-vtfx],#vthP,#vthT,#vthD,#vthPv,#vth,#vthm,script,style,svg')) { continue; } seen.push(e); if (seen.length > 3000) { break; }
      var cs = w.getComputedStyle(e), lc = fxLum(cs.color); if (lc == null || !fxVis(e)) { continue; }
      var bg = null, a = e; while (a && bg == null) { bg = fxLum(w.getComputedStyle(a).backgroundColor); a = a.parentElement; } if (bg == null) { bg = 1; }
      var hi = Math.max(lc, bg), lo = Math.min(lc, bg); if (bg > 0.6 && (hi + 0.05) / (lo + 0.05) < 4.5) { e.setAttribute('data-vtfx-lc', x.id); n++; }
    }
    if (!n) { return 'na:이 화면에는 흐린 글씨가 없어요(이미 4.5:1 이상)'; }
    fxCss(d, x.id, 'html body [data-vtfx-lc]{color:' + o['글자색'] + '!important;outline:1px dashed #ff8a00;outline-offset:1px}');
  };
  FXR['C-06'] = function (d, x, m, mob, o) {
    var w6 = Math.max(1, Math.min(6, parseFloat(o['두께']) || 3));
    fxCss(d, x.id, 'html body a:focus,html body button:focus,html body input:focus,html body select:focus,html body [tabindex]:focus{outline:' + w6 + 'px solid ' + o['테두리 색'] + '!important;outline-offset:2px!important}[data-vtfx-o~="C-06"]{outline:' + w6 + 'px solid ' + o['테두리 색'] + '!important;outline-offset:2px!important}');
    /* 시안: Tab 을 한 번 누른 모습(머리말 첫 메뉴에 테두리) — 실제로 Tab 을 눌러도 같은 테두리가 따라다님 */
    var a6 = [].slice.call(d.querySelectorAll('.vt-hd__nav a, .vt-hd a, header a')).filter(fxVis)[0]; if (a6) { fxMarkEl(a6, x.id); }
  };
  FXR['C-07'] = function (d, x, m, mob, o) { fxBand(d, x.id, o['위치'] === 'foot' ? 'foot' : 'top', String(o['띠 글']).replace(/\{세일\}/g, esc(fxSale(d))), o['바탕색'], o['글자색'], mob); };
  /* 시안 그리기 틀 */
  function fxDraw(d, x) {
    var w = d.defaultView, mob = w && w.innerWidth < 1024, m = fxMk(x), id = x.id, out = [];
    if (FXR[id]) { var rr = FXR[id](d, x, m, mob, fxO(m)); if (typeof rr === 'string' && rr.indexOf('na:') === 0) { FXD.na[id] = rr.slice(3); } else { delete FXD.na[id]; } return out; }
    delete FXD.na[id];
    for (var i = 0; i < m.length;) {
      var t = m[i];
      if (t === 'css') { var st = d.createElement('style'); st.setAttribute('data-vtfx', id); st.textContent = m[i + 1]; (d.head || d.documentElement).appendChild(st); i += 2; continue; }
      if (t === 'note') { i += 2; continue; } /* 설명 쪽지는 그리지 않음(설명은 편집 칸에만) */
      if (t === 'band') {
        fxBand(d, id, m[i + 1], m[i + 2], m[i + 3], m[i + 4], mob);
        i += 5; continue;
      }
      if (t === 'sec') {
        var cards = m[i + 3], items = m[i + 2].map(function (s) { return cards ? '<div style="flex:0 0 ' + (mob ? '42%' : '18%') + '"><div style="aspect-ratio:3/4;background:#e9e6e1;border-radius:4px;display:flex;align-items:flex-end;justify-content:center;padding:6px;font-size:12px;color:#555">' + esc(s) + '</div></div>' : '<span style="border:1px solid #111;border-radius:999px;padding:7px 14px;font-size:' + (mob ? 12 : 14) + 'px;white-space:nowrap">' + esc(s) + '</span>'; }).join('');
        var sc = fxEl(d, id, 'background:#fff;color:#111;padding:' + (mob ? '18px 14px' : '28px 40px') + ';' + FXO, '<div style="font-weight:800;font-size:' + (mob ? 15 : 20) + 'px;margin:6px 0 12px">' + esc(m[i + 1]) + '</div><div style="display:flex;gap:' + (mob ? 8 : 14) + 'px;overflow-x:auto;' + (cards ? '' : 'flex-wrap:wrap') + '">' + items + '</div>');
        fxPlace(d, x.pg === 'detail' ? 'detail' : x.pg === 'board' ? 'board' : 'hero', sc); i += 4; continue;
      }
      if (t === 'bar') {
        if (m[i + 2] && !mob) { i += 3; continue; }
        var bar = fxBarEl(d, id, m[i + 1], mob); [].slice.call(bar.children).forEach(function (sp) { if (/맨 위/.test(sp.textContent)) { sp.style.cursor = 'pointer'; fxClick(d, sp, function () { d.defaultView.scrollTo(0, 0); }); } });
        i += 3; continue;
      }
      if (t === 'fab') {
        var side = m[i + 2], f = fxEl(d, id, 'position:fixed;z-index:2147482350;' + (side === 'r' ? 'right:' + (mob ? 12 : 64) + 'px;bottom:' + (mob ? 80 : 110) + 'px' : side === 'l2' ? 'right:' + (mob ? 12 : 64) + 'px;bottom:' + (mob ? 150 : 180) + 'px' : 'right:' + (mob ? 12 : 64) + 'px;bottom:' + (mob ? 210 : 250) + 'px') + ';background:' + m[i + 3] + ';color:' + m[i + 4] + ';border-radius:999px;padding:' + (mob ? '10px 14px' : '12px 18px') + ';font-size:' + (mob ? 13 : 14) + 'px;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.2);' + FXO, '<span>' + esc(m[i + 1]) + '</span>');
        d.body.appendChild(f); if (/위로/.test(m[i + 1])) { f.style.cursor = 'pointer'; f.setAttribute('role', 'button'); fxClick(d, f, function () { d.defaultView.scrollTo(0, 0); }); } i += 5; continue;
      }
      if (t === 'badge') {
        var rs0 = d.createElement('style'); rs0.setAttribute('data-vtfx', id); rs0.textContent = '[data-vtfx-r]{position:relative!important}'; (d.head || d.documentElement).appendChild(rs0);
        var cn = m[i + 1], pos2 = { tl: 'top:6px;left:6px', tr: 'top:6px;right:6px', bl: 'bottom:6px;left:6px', br: 'bottom:6px;right:6px' }[cn] || 'top:6px;left:6px';
        fxCards(d, true).forEach(function (cd, k) { if (k % 2 && /^(L-05|L-19|L-26)$/.test(id)) { return; } if (cd.querySelector('[data-vtfx="' + id + '"]')) { return; } var th = cd.querySelector('.vt-item__thumb, .thumbnail, .prdImg, a') || cd; if (getComputedStyle(th).position === 'static') { th.setAttribute('data-vtfx-r', '1'); } var s2 = d.createElement('span'); s2.setAttribute('data-vtfx', id); s2.style.cssText = 'position:absolute;z-index:4;' + pos2 + ';background:' + m[i + 3] + ';color:' + (m[i + 4] || '#fff') + ';font:700 11px/1 "Noto Sans KR",sans-serif;padding:5px 7px;border-radius:3px;' + FXO; s2.textContent = m[i + 2]; th.appendChild(s2); });
        i += 5; continue;
      }
      if (t === 'card') {
        fxCards(d, true).forEach(function (cd) {
          if (cd.querySelector('[data-vtfx="' + id + '"]')) { return; }
          var at = null;
          if (m[i + 1] === 'price') { var pl = fxPriceEls(cd); at = pl[pl.length - 1] || null; }
          else { at = [].slice.call(cd.querySelectorAll('*')).filter(function (e) { return /name|subject/i.test(fxCn(e)) && !e.closest('[data-vtfx]'); })[0] || null; if (at) { while (at.parentNode && at.parentNode !== cd && /name|subject/i.test(fxCn(at.parentNode))) { at = at.parentNode; } } }
          var s3 = d.createElement('div'); s3.setAttribute('data-vtfx', id); s3.style.cssText = 'font:' + (mob ? 12 : 13) + 'px/1.4 "Noto Sans KR",sans-serif;margin-top:3px;' + FXO; s3.innerHTML = m[i + 2];
          if (at && at !== cd && at.parentNode) { fxAfter(d, at, s3); } else { cd.appendChild(s3); }
        });
        i += 3; continue;
      }
      if (t === 'price1') {
        var pcol = m[i + 1] || '#c4001f', hs = d.createElement('style'); hs.setAttribute('data-vtfx', id); hs.textContent = '[data-vtfx-h~="' + id + '"]{display:none!important}'; (d.head || d.documentElement).appendChild(hs);
        fxCards(d, true).forEach(function (cd) {
          if (cd.querySelector('[data-vtfx="' + id + '"]')) { return; }
          var tops = fxPriceEls(cd);
          var nums = []; tops.forEach(function (e) { (e.textContent.match(/\d{1,3}(?:,\d{3})+|\d{4,}/g) || []).forEach(function (q) { var n = +q.replace(/,/g, ''); if (n >= 500 && nums.indexOf(n) < 0) { nums.push(n); } }); });
          if (!tops.length || !nums.length) { return; }
          var hi = Math.max.apply(null, nums), lo = Math.min.apply(null, nums), pc = hi > lo ? Math.round((1 - lo / hi) * 100) : 0, wn = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원'; };
          var s4 = d.createElement('div'); s4.setAttribute('data-vtfx', id); s4.style.cssText = 'display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 6px;font:700 ' + (mob ? 13 : 14) + 'px/1.35 "Noto Sans KR",sans-serif;color:#111;margin-top:4px;' + FXO;
          s4.innerHTML = '<span>' + wn(lo) + '</span>' + (hi > lo ? '<s style="color:#999;font-weight:400;font-size:.88em">' + wn(hi) + '</s><span style="color:' + pcol + '">' + pc + '%</span>' : '');
          fxAfter(d, tops[tops.length - 1], s4);
          tops.forEach(function (e) { var h0 = e.getAttribute('data-vtfx-h'); e.setAttribute('data-vtfx-h', (h0 ? h0 + ' ' : '') + id); });
        });
        i += 2; continue;
      }
      if (t === 'box') { var bx2 = fxEl(d, id, 'background:#fff;color:#111;border:1px solid #e5e5e5;padding:' + (mob ? '12px 14px' : '14px 18px') + ';margin:' + (mob ? '8px 0' : '12px 0') + ';font-size:' + (mob ? 13 : 14) + 'px;line-height:1.6;' + FXO, '<div style="margin-top:6px">' + m[i + 2] + '</div>'); fxPlace(d, m[i + 1], bx2); i += 3; continue; }
      if (t === 'drawer') { var dr = fxEl(d, id, 'position:fixed;z-index:2147482450;top:0;left:0;bottom:0;width:' + (mob ? '82vw' : '360px') + ';background:#fff;color:#111;box-shadow:4px 0 24px rgba(0,0,0,.25);padding:30px 18px 18px;font-size:14px;line-height:1.7;overflow:auto;' + FXO, '<div style="font-weight:800;font-size:16px;margin-bottom:12px">☰ 전체 메뉴 (시안)</div><div style="color:#999;font-size:12px;margin-bottom:10px">여자 · 남자 · 브랜드 · 키즈 …</div><div style="display:grid;gap:10px">' + m[i + 1] + '</div>'); d.body.appendChild(dr); i += 2; continue; }
      if (t === 'pop') { var pp = fxEl(d, id, 'position:fixed;z-index:2147482500;left:50%;top:50%;transform:translate(-50%,-50%);width:' + (mob ? '84vw' : '360px') + ';background:#fff;color:#111;border-radius:10px;padding:22px 18px 16px;box-shadow:0 10px 40px rgba(0,0,0,.3);font-size:14px;' + FXO, '<div style="margin-top:6px">' + m[i + 1] + '</div>'); d.body.appendChild(pp); i += 2; continue; }
      i++;
    }
    return out;
  }
  /* 휴대폰(390)에서는 시안 글씨를 12px 아래로 두지 않음 */
  function fxReadable(d, id) { var w = d.defaultView; if (!w) { return; } var mn = w.innerWidth < 1024 ? 12 : 11; [].slice.call(d.querySelectorAll('[data-vtfx="' + id + '"], [data-vtfx="' + id + '"] *')).forEach(function (e) { if (e.tagName === 'STYLE') { return; } var fs = parseFloat(w.getComputedStyle(e).fontSize); if (fs && fs < mn) { e.style.fontSize = mn + 'px'; } }); }
  function fxDoc(d) {
    if (!d || !d.body) { return; }
    (d.__vtfxU || []).splice(0).reverse().forEach(function (fn) { try { fn(); } catch (e) { } });
    [].slice.call(d.querySelectorAll('[data-vtfx]')).forEach(function (e) { e.remove(); });
    FX_ATTR.forEach(function (k) { [].slice.call(d.querySelectorAll('[data-vtfx-' + k + ']')).forEach(function (e) { e.removeAttribute('data-vtfx-' + k); }); });
    d.__vtfxTop = 0; d.__vtfxPush = 0; d.__vtfxBm = null;
    var pick = fxPick(), hid = (state.ed.hide && state.ed.hide.fx) || []; if (state.fxPeek && pick.indexOf(state.fxPeek) < 0) { pick = pick.concat([state.fxPeek]); }
    var ms = state._fxMiss = state._fxMiss || {}, chg = false, any = false, wide = !!d.defaultView && d.defaultView.innerWidth >= 1024;
    pick.forEach(function (id) {
      var x = fxInfo(id); if (!x || hid.indexOf(id) > -1 || !(fxPageOk(d, x.pg) || (x.pg2 && fxPageOk(d, x.pg2)))) { return; }
      if ((fxMobOnly(x) && wide) || (x.pc && !wide)) { return; }
      if (!any) { any = true; fxCss(d, '_base', FX_BASE); fxActOn(d); }
      try { fxDraw(d, x); } catch (e) { FXD.err = FXD.err || []; FXD.err.push(id + ': ' + String((e && e.message) || e).slice(0, 160)); }
      fxReadable(d, id);
      var ok = !!FXD.busy || !!d.querySelector('[data-vtfx="' + id + '"], [data-vtfx-o~="' + id + '"], [data-vtfx-h~="' + id + '"], [data-vtfx-big~="' + id + '"], [data-vtfx-fs~="' + id + '"], [data-vtfx-lc~="' + id + '"], [data-vtfx-cur]');
      var v = ok ? 0 : (FXD.na[id] ? 'na' : 1);
      if ((ms[id] || 0) !== v) { chg = true; } if (v) { ms[id] = v; } else { delete ms[id]; }
    });
    if (state._fxGo) { fxFocus(d); }
    if (chg && state.top === 'imp') { clearTimeout(state._fxMissT); state._fxMissT = setTimeout(function () { if (state.top === 'imp') { build(); } }, 60); }
  }
  function fxMissTxt(id) { return FXD.na[id] ? '이 화면에는 그릴 것이 없어요: ' + FXD.na[id] : '준비 중: 이 화면에서는 시안을 붙일 자리를 찾지 못했어요(다른 화면·폭에서는 보일 수 있어요).'; }
  var FW = { pc: null, mob: null };
  function vtDocs() { var a = [], add = function (g) { try { var d = g(); if (d && d.body && d.readyState !== 'loading' && a.indexOf(d) < 0 && d !== document) { a.push(d); } } catch (e) { } }; add(function () { return PV.on ? PV.f.contentDocument : null; }); ['pc', 'lap', 'mob'].forEach(function (k) { add(function () { var w = state.wins && state.wins[k]; return w && !w.closed ? w.document : null; }); }); ['pc', 'mob'].forEach(function (k) { add(function () { var w = FW[k]; return w && !w.closed ? w.document : null; }); }); add(function () { var w = document.getElementById('vthFrameWrap'); return w && w.style.display !== 'none' && state.frame ? state.frame.contentDocument : null; }); add(function () { var w = document.getElementById('vthLapWrap'); return w && w.style.display !== 'none' ? w.querySelector('iframe').contentDocument : null; }); return a; }
  function fxAll() { fxDoc(document); vtDocs().forEach(function (d) { try { fxDoc(d); } catch (e) { } }); }
  function fxPreview(x) {
    var url = fxUrl(x), wantDetail = x.pg === 'detail';
    [['pc', 'width=1440,height=900'], ['mob', 'width=390,height=844']].forEach(function (a) {
      var k = a[0], w = FW[k];
      if (!w || w.closed) { w = FW[k] = window.open(url, 'vtfx_' + k, a[1] + ',left=' + (k === 'pc' ? 40 : 1500) + ',top=40'); }
      else { try { if (!fxPageOk(w.document, x.pg)) { w.location.href = url; } else { fxDoc(w.document); return; } } catch (e) { } }
      if (!w) { msg('미리보기 창이 막혔어요. 주소창 오른쪽 팝업 차단 아이콘에서 허용해 주세요.', 1); return; }
      var tries = 0, t = setInterval(function () {
        tries++; if (tries > 60) { clearInterval(t); return; }
        try {
          if (!w.document || w.document.readyState === 'loading' || w.location.href === 'about:blank') { return; }
          if (wantDetail && !fxPageOk(w.document, 'detail')) { var a2 = w.document.querySelector('a.vt-item__thumb, a[href*="/product/detail.html"], a[href*="product_no="], ul.vt-list a[href*="/product/"]'); if (a2 && tries < 50) { w.location.href = a2.href; wantDetail = false; } return; }
          clearInterval(t); setTimeout(function () { fxDoc(w.document); }, 400);
        } catch (e) { }
      }, 300);
    });
  }
  function fxToggle(x) {
    var p = fxPick(), i = p.indexOf(x.id), on = i < 0;
    if (on) { p.push(x.id); FXD.fresh = x.id; fxGoSet(x.id); } else { p.splice(i, 1); state._fxGo = null; }
    state._lbl = (on ? '기능개선 시안 켬: ' : '기능개선 시안 끔: ') + x.id + ' ' + x.t; pushAll(); fxAll(); build();
    if (on) { pvShowFx(x); }
    else { msg(x.id + ' 시안을 껐어요.'); }
  }
  /* 6.8 시안을 켜면(또는 방향키로 보면) 바뀌는 곳이 보이게 화면을 그 자리로. 화면이 아직 안 떴으면 뜬 뒤 fxDoc 이 다시 부름 */
  function fxGoSet(id) { state._fxGo = id; state._fxGoT = Date.now(); setTimeout(function () { try { fxFocus(pvDocNow()); } catch (e) { } }, 350); }
  function fxFocus(d) {
    var id = state._fxGo; if (!id || !d || !d.body || Date.now() - (state._fxGoT || 0) > 15000) { return; }
    try {
      if (d !== pvDocNow()) { return; }
      var w = d.defaultView, els = d.querySelectorAll('[data-vtfx="' + id + '"], [data-vtfx-o~="' + id + '"], [data-vtfx-big~="' + id + '"], [data-vtfx-fs~="' + id + '"], [data-vtfx-lc~="' + id + '"]'), el = null;
      for (var i = 0; i < els.length; i++) { if (els[i].tagName !== 'STYLE' && fxVis(els[i])) { el = els[i]; break; } }
      if (!el) { return; }
      state._fxGo = null;
      setTimeout(function () { try { var r = el.getBoundingClientRect(), ps = w.getComputedStyle(el).position; if (ps === 'fixed' || ps === 'sticky') { return; } if (r.top < 70 || r.bottom > w.innerHeight - 20) { el.scrollIntoView({ block: r.height > w.innerHeight * 0.8 ? 'start' : 'center' }); } } catch (e) { } }, 150);
    } catch (e) { }
  }
  function fxSend() {
    var p = fxPick().filter(function (id) { return fxInfo(id); }), hid = state.ed.hide.fx || [];
    p = p.filter(function (id) { return hid.indexOf(id) < 0; });
    if (!p.length) { msg('고른 것이 없어요. 번호의 「👀 시안」을 켜면 고른 것이 돼요.', 1); return; }
    var txt = '[' + SH.KO + ' 기능개선 고른 것 ' + p.length + '개]\n' + FX_GROUPS.map(function (g) { var a = p.filter(function (id) { return id.charAt(0) === g.c; }); return a.length ? '■ ' + g.n + '\n' + a.map(function (id) { return '- ' + id + ' ' + fxInfo(id).t + fvNote(id); }).join('\n') : ''; }).filter(Boolean).join('\n');
    var ok = function () { msg('고른 ' + p.length + '개 목록을 복사했어요. 채팅에 붙여 넣어 수정 의뢰하시면 돼요.'); };
    var fb = function () { var ta = document.createElement('textarea'); ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { msg('복사가 막혔어요. 아래 글을 직접 복사해 주세요.', 1); } ta.remove(); };
    try { navigator.clipboard.writeText(txt).then(ok, fb); } catch (e) { fb(); }
    state._fxSent = txt;
  }
  function tFeat() {
    var p = fxPick(), hid = (state.ed.hide && state.ed.hide.fx) || [];
    bd.appendChild(tip('줄을 누르면 실제 화면에 바뀐 모습을 바로 그려 보여 줘요(저장 안 됨). 마음에 드는 것만 켜 두고 [고른 것 보내기].'));
    var top = document.createElement('div'); top.style.cssText = 'display:flex;gap:6px;margin:0 0 8px';
    var sendB = document.createElement('button'); sendB.className = 'on'; sendB.style.flex = '1'; sendB.textContent = '고른 것 보내기 (' + p.filter(function (id) { return hid.indexOf(id) < 0; }).length + ')'; sendB.onclick = fxSend;
    var offB = document.createElement('button'); offB.textContent = '시안 모두 끄기'; offB.onclick = function () { if (!p.length) { return; } state.ed.fxPick = []; state._lbl = '기능개선 시안 모두 끔'; pushAll(); fxAll(); build(); msg('시안을 모두 껐어요(작업내역·ESC로 되돌릴 수 있어요).'); };
    top.appendChild(sendB); top.appendChild(offB); bd.appendChild(top);
    var tabs = document.createElement('div'); tabs.className = 'vthFT';
    FX_GROUPS.forEach(function (g) { var n = p.filter(function (id) { return id.charAt(0) === g.c && hid.indexOf(id) < 0; }).length, b = document.createElement('button'); b.textContent = g.n + ' ' + g.c + (n ? ' ·' + n : ''); if (state.fxTab === g.c) { b.className = 'on'; } b.onclick = function () { state.fxTab = g.c; build(); pvAuto(true); }; tabs.appendChild(b); });
    bd.appendChild(tabs);
    delBar('fx');
    var g = FX_GROUPS.filter(function (x) { return x.c === state.fxTab; })[0] || FX_GROUPS[0];
    var items = FX.filter(function (x) { return x.g === g.c && hid.indexOf(x.id) < 0; });
    bd.appendChild(h4(g.n + ' ' + g.c + ' · ' + items.length + '가지'));
    if (!items.length) { bd.appendChild(tip('이 대분류는 모두 지웠어요. 위 "지운 것 보기"에서 되살릴 수 있어요.')); }
    items.forEach(function (x) {
      var on = p.indexOf(x.id) > -1, card = document.createElement('div'); card.className = 'vthI' + (on ? ' on' : '');
      var hd = document.createElement('div'); hd.className = 'vthIh';
      var sw = document.createElement('button'); sw.className = 'vthT' + (on ? ' on' : ''); sw.textContent = on ? '👀 시안 켜짐' : '👀 시안'; sw.title = on ? '누르면 시안을 꺼요' : '누르면 실제 화면 위에 시안을 그려요(저장 안 됨)'; sw.onclick = function () { fxToggle(x); };
      var nm = document.createElement('b'); nm.textContent = x.id + ' ' + x.t + (x.rec ? ' ★' : ''); nm.style.cssText = 'flex:1;cursor:pointer'; nm.title = on ? '누르면 시안을 꺼요' : '누르면 이 시안을 화면에 바로 그려 보여 줘요(저장 안 됨)'; nm.onclick = function () { fxToggle(x); }; /* 6.8: 이름을 눌러도 바로 그 화면·시안 */
      hd.appendChild(sw); hd.appendChild(nm);
      if (state.fxPeek === x.id) { var pb = document.createElement('span'); pb.className = 'vthIb'; pb.style.cssText = 'background:#e7f0ff;color:#0b4bb3'; pb.textContent = '👀 보는 중'; hd.appendChild(pb); }
      if (x.note) { var bg = document.createElement('span'); bg.className = 'vthIb'; bg.textContent = x.note; hd.appendChild(bg); }
      if (on && state._fxMiss && state._fxMiss[x.id]) { var mb = document.createElement('span'); mb.className = 'vthIb'; mb.style.cssText = 'background:#fff1d6;color:#8a4b00'; mb.textContent = FXD.na[x.id] ? '해당 없음' : '준비 중'; mb.title = fxMissTxt(x.id); hd.appendChild(mb); }
      card.appendChild(hd);
      if (state.fxOpen[x.id] || on || state.fxPeek === x.id) {
        var ds = document.createElement('div'); ds.className = 'vthId';
        ds.innerHTML = '<p><i>지금</i> ' + esc(x.was || '-') + '</p><p><i>바꾸면</i> ' + esc(x.now) + '</p><p><i>화면</i> ' + ({ main: '메인', list: '상품목록', detail: '상품상세', search: '검색 결과', board: '게시판' }[x.pg] || '') + (fxMobOnly(x) ? ' — 휴대폰에서만 보임' : x.pc ? ' — PC에서만 보임' : ' — PC·휴대폰 같이(휴대폰 움직임 없음)') + '</p>';
        if (on && state._fxMiss && state._fxMiss[x.id]) { var mp = document.createElement('p'); mp.style.cssText = 'color:#8a4b00;margin:4px 0 0'; mp.textContent = fxMissTxt(x.id); ds.appendChild(mp); }
        card.appendChild(ds);
        if (on) { var pv = document.createElement('button'); pv.textContent = '👀 화면에서 다시 보기'; pv.style.marginTop = '4px'; pv.onclick = function () { pvShowFx(x); }; card.appendChild(pv); fxValBox(x, card); }
      }
      var wr = document.createElement('div'); wr.className = 'vthC'; wr.appendChild(card);
      var l = document.createElement('label'); l.className = 'vthX'; l.title = '체크해서 지우기'; var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!state.selDel.fx[x.id];
      c.onchange = function () { if (c.checked) { state.selDel.fx[x.id] = 1; } else { delete state.selDel.fx[x.id]; } delCount('fx'); }; l.appendChild(c); wr.appendChild(l); wr.setAttribute('data-sid', 'fx:' + x.id); state._vis.fx.push(x.id);
      bd.appendChild(wr);
    });
  }
  /* ===== 5.1(11/15) 디자인 편집기 대분류 10개 + 1 전체(공통): 본문 글꼴·포인트 색·맨 위 공지 띠·팝업·맨 위로 단추
     손님 화면 = /_/main/vt_hero/site.html(설정 JSON + CSS + 작은 스크립트), /layout/basic/vt_header.html 의 header.html 다음 줄에서 불러옴(저장할 때 없으면 연결).
     PC·휴대폰 같이, 휴대폰은 움직임 없음. 미리보기는 편집기 화면·미리보기 창에 같은 코드를 바로 돌림 */
  var CATS = [['site', '1 전체'], ['hdr', '2 머리말'], ['drawer', '3 ☰ 메뉴'], ['main', '4 메인 첫 화면'], ['mainlow', '5 메인 아래'], ['list', '6 상품목록'], ['search', '7 검색'], ['detail', '8 상품상세'], ['board', '9 게시판'], ['foot', '10 하단']];
  var SITE_FILE = '/_/main/vt_hero/site.html', SITE_LINK_FILE = '/layout/basic/vt_header.html';
  function siteDef() { return { v: 1, styles: {}, font: '', accent: '#c4001f', notice: { on: false, text: '이번 주 수입 빈티지 최대 90% SALE', link: '', bg: '#111111', fg: '#ffffff', close: true }, popup: { on: false, title: '공지', text: '', img: '', btn: '자세히 보기', link: '', from: '', to: '', once: 'day' }, totop: { on: false, shape: 'circle', bg: '#111111', fg: '#ffffff' }, drawer: { on: false, bg: '#ffffff', fg: '#111111', bigSize: 18, bigWeight: 700, bigGap: 8, chipShape: 'pill', chipBg: '#ededed', chipFg: '', line: true, lineColor: '#e5e5e5', pad: 32, telSize: 22 }, low: { on: false, hide: {}, order: [], bg: {}, gap: '', tAlign: '', tColor: '', tSize: 0 }, list: { on: false, sold: 0, soldTxt: 'SOLD OUT', nw: 0, sale: 0, saleBg: '', saleFg: '', salePos: 'tl', gapPc: 0, gapMo: 0, thumbR: 9, thumbBg: '#f8f8f8', nameSize: 14, brandSize: 0, priceSize: 0, priceColor: '' }, search: { on: false, titleShow: true, titleSize: 0, titleAlign: '', box: '', boxColor: '#111111', boxH: 0, tag: '', tagBg: '#f4f4f4', tagFg: '#545454', countColor: '', noBg: '', noSize: 0, pg: '', pgColor: '#111111' }, board: { on: false, titleSize: 0, titleAlign: '', headShow: true, headBg: '#f6f6f6', rows: '', rowH: 0, subjSize: 0, writeBg: '#1a1a1a', writeFg: '#ffffff', writeShape: '', pg: '', pgColor: '#111111' }, foot: { on: false, bg: '#fbfbfb', fg: '#666666', head: '#222222', callSize: 0, infoSize: 0, menuColor: '', line: false, lineColor: '#e5e5e5', pad: '', showMap: true, showPartner: true }, detail: { on: false, buyBg: '#222222', buyFg: '#ffffff', shape: '', btnH: 0, sub: '', origShow: true, saleSize: 0, saleColor: '', infoLine: '', thSize: 0, thumbR: 0, totalColor: '' } }; }
  (function () {
    var e = document.getElementById('vt-site-cfg'), c = null; try { c = e ? JSON.parse(e.textContent) : null; } catch (x) { c = null; }
    var d = siteDef(); if (c) { Object.keys(d).forEach(function (k) { if (c[k] != null) { d[k] = (typeof d[k] === 'object' && d[k] && !Array.isArray(d[k])) ? Object.assign(d[k], c[k]) : c[k]; } }); }
    state.site = d; state.siteOrig = JSON.stringify(d); state.siteLinked = !!e; state.sitePop = false;
  })();
  /* 손님 화면 스크립트(문자열) — c = 설정, P = 미리보기(닫기 기억·날짜 무시, 팝업은 P.pop일 때만) */
  var SITE_RT = 'var D=document,W=window,H=D.documentElement,P=W.__vtSiteP||null,mob=W.innerWidth<1024;' +
    'function rm(s){[].slice.call(D.querySelectorAll(s)).forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)})}rm("[data-vtsite]");H.classList.remove("vt-has-notice");' +
    'function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[m]})}' +
    'var n=c.notice||{},kN="vt_notice_x_"+String(n.text||"").length;' +
    'if(n.on&&n.text&&(P||!sessionStorage.getItem(kN))){var b=D.createElement("div");b.setAttribute("data-vtsite","n");b.className="vt-site-notice";b.setAttribute("role","region");b.setAttribute("aria-label","공지");' +
    'b.innerHTML=(n.link?"<a href=\\""+esc(n.link)+"\\">"+esc(n.text)+"</a>":"<span>"+esc(n.text)+"</span>")+(n.close?"<button type=\\"button\\" aria-label=\\"공지 닫기\\">×</button>":"");' +
    'var x=b.querySelector("button");if(x){x.onclick=function(){if(!P){try{sessionStorage.setItem(kN,"1")}catch(e){}}rm("[data-vtsite=n]");H.classList.remove("vt-has-notice")}}D.body.insertBefore(b,D.body.firstChild);H.classList.add("vt-has-notice")}' +
    'var p=c.popup||{},kP="vt_pop_x_"+String((p.title||"")+(p.text||"")+(p.img||"")).length,now=new Date(),td=now.getFullYear()+"-"+("0"+(now.getMonth()+1)).slice(-2)+"-"+("0"+now.getDate()).slice(-2);' +
    'var inDate=(!p.from||td>=p.from)&&(!p.to||td<=p.to),hid=false;try{hid=localStorage.getItem(kP)===td}catch(e){}' +
    'if(p.on&&(p.title||p.text||p.img)&&(P?P.pop:(inDate&&!hid))){var o=D.createElement("div");o.setAttribute("data-vtsite","p");o.className="vt-site-pop";' +
    'o.innerHTML="<div class=\\"vt-site-pop__box\\" role=\\"dialog\\" aria-modal=\\"true\\" aria-label=\\""+esc(p.title||"공지")+"\\">"+(p.img?"<img src=\\""+esc(p.img)+"\\" alt=\\"\\">":"")+(p.title?"<b>"+esc(p.title)+"</b>":"")+(p.text?"<p>"+esc(p.text).replace(/\\n/g,"<br>")+"</p>":"")+(p.link?"<a class=\\"vt-site-pop__go\\" href=\\""+esc(p.link)+"\\">"+esc(p.btn||"자세히 보기")+"</a>":"")+"<div class=\\"vt-site-pop__ft\\"><button type=\\"button\\" data-a=\\"day\\">오늘 하루 안 보기</button><button type=\\"button\\" data-a=\\"x\\">닫기</button></div></div>";' +
    'var cl=function(day){if(day&&!P){try{localStorage.setItem(kP,td)}catch(e){}}rm("[data-vtsite=p]");D.removeEventListener("keydown",ek)},ek=function(e){if(e.key==="Escape"){cl(false)}};' +
    'o.addEventListener("click",function(e){var a=e.target.getAttribute&&e.target.getAttribute("data-a");if(a==="day"){cl(true)}else if(a==="x"||e.target===o){cl(false)}});D.addEventListener("keydown",ek);D.body.appendChild(o);var f=o.querySelector("button[data-a=x]");if(f&&!P){try{f.focus({preventScroll:true})}catch(e){}}}' +
    'var dr=c.drawer||{};if(dr.on){var L=[].slice.call(D.querySelectorAll("#vtDrawer .vt-dr__cate li")),bi=-1,sc=D.getElementById("vt-site-css");if(sc&&sc.sheet){sc.sheet.disabled=true}L.forEach(function(li,i){if(bi<0&&parseFloat(getComputedStyle(li).borderTopWidth)>0){bi=i}});if(sc&&sc.sheet){sc.sheet.disabled=false}if(bi<0){bi=0}L.forEach(function(li,i){li.classList.toggle("vt-dr-chip",i<bi);li.classList.toggle("vt-dr-big",i>=bi);li.classList.toggle("vt-dr-big1",i===bi)})}' +
    'var t=c.totop||{};if(t.on){var u=D.createElement("button");u.type="button";u.setAttribute("data-vtsite","t");u.className="vt-site-top";u.setAttribute("aria-label","맨 위로");u.innerHTML="↑";' +
    'u.onclick=function(){try{W.scrollTo({top:0,behavior:mob?"auto":"smooth"})}catch(e){W.scrollTo(0,0)}};D.body.appendChild(u);var sh=function(){u.classList.toggle("on",(W.scrollY||H.scrollTop)>500||!!P)};sh();W.addEventListener("scroll",sh,{passive:true})}';
  function siteCss(c) {
    var s = '', r = c.font && fontRow(c.font), n = c.notice || {}, t = c.totop || {}, nh = 34, nhm = 30;
    if (c.font) { s += 'html body,html body :is(div,p,span,a,li,td,th,dt,dd,label,strong,em,b,h1,h2,h3,h4,h5,h6,button,input,select,textarea):not(#vth *):not(.vt-hd__nav *):not([class*="ico"]){font-family:' + ff(c.font) + '!important}'; } /* 메인 첫 화면·머리말 메뉴는 각자 글꼴 */
    s += '.vt-site-notice{position:fixed;left:0;right:0;top:0;z-index:2147480000;display:flex;align-items:center;justify-content:center;gap:12px;height:' + nh + 'px;padding:0 44px;background:' + (n.bg || '#111') + ';color:' + (n.fg || '#fff') + ';font:600 13px/1.2 "Noto Sans KR",sans-serif;text-align:center}' +
      '.vt-site-notice a,.vt-site-notice span{color:inherit;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.vt-site-notice button{position:absolute;right:8px;top:50%;margin-top:-14px;width:28px;height:28px;border:0;background:none;color:inherit;font-size:18px;line-height:28px;cursor:pointer}' +
      'html.vt-has-notice body .vt-hd{top:' + nh + 'px}html.vt-has-notice body #wrap{margin-top:' + nh + 'px}' +
      '@media (max-width:1023px){.vt-site-notice{height:' + nhm + 'px;font-size:12px;padding:0 36px}html.vt-has-notice body .vt-hd{top:' + nhm + 'px}html.vt-has-notice body #wrap{margin-top:' + nhm + 'px}}' +
      '.vt-site-pop{position:fixed;inset:0;z-index:2147480100;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;padding:16px}.vt-site-pop__box{width:min(400px,100%);max-height:90vh;overflow:auto;background:#fff;color:#111;border-radius:10px;font:14px/1.6 "Noto Sans KR",sans-serif;text-align:center}' +
      '.vt-site-pop__box img{display:block;width:100%;height:auto}.vt-site-pop__box b{display:block;font-size:17px;margin:16px 18px 4px}.vt-site-pop__box p{margin:6px 18px 12px;color:#444}.vt-site-pop__go{display:block;margin:0 18px 14px;padding:11px;background:' + (c.accent || '#c4001f') + ';color:#fff;text-decoration:none;font-weight:700;border-radius:6px}' +
      '.vt-site-pop__ft{display:flex;border-top:1px solid #eee}.vt-site-pop__ft button{flex:1;padding:12px;border:0;background:#fff;font:inherit;color:#555;cursor:pointer}.vt-site-pop__ft button+button{border-left:1px solid #eee}' +
      '.vt-site-top{position:fixed;z-index:2147479900;right:24px;bottom:110px;width:48px;height:48px;border:0;border-radius:' + (t.shape === 'square' ? '6px' : '50%') + ';background:' + (t.bg || '#111') + ';color:' + (t.fg || '#fff') + ';font:700 20px/48px sans-serif;box-shadow:0 3px 12px rgba(0,0,0,.2);cursor:pointer;opacity:0;visibility:hidden}.vt-site-top.on{opacity:1;visibility:visible}' +
      '@media (max-width:1023px){.vt-site-top{right:12px;bottom:84px;width:42px;height:42px;line-height:42px;font-size:18px}}@media (min-width:1024px){.vt-site-top{transition:opacity .2s}}';
    var lo = c.low || {};
    if (lo.on) {
      var CT = 'html body #contents', keys = (lo.order || []).slice();
      Object.keys(lo.hide || {}).forEach(function (k) { if (lo.hide[k]) { s += CT + ' > ' + k + '{display:none!important}'; } });
      if (keys.length && lo.nat && JSON.stringify(keys) !== JSON.stringify(lo.nat)) { s += CT + ':has(> #vth),' + CT + ':has(> #vthm){display:flex;flex-direction:column}' + CT + ' > #vth,' + CT + ' > #vthm{order:-1}' + CT + ' > *{order:900}' + keys.map(function (k, i) { return CT + ' > ' + k + '{order:' + i + '}'; }).join(''); }
      Object.keys(lo.bg || {}).forEach(function (k) { if (lo.bg[k]) { s += CT + ' > ' + k + '{background:' + lo.bg[k] + '!important}'; } });
      var SEC = keys.length ? keys.map(function (k) { return CT + ' > ' + k; }).join(',') : '';
      if (SEC && lo.gap === 'tight') { s += '@media (min-width:1024px){' + SEC + '{padding-top:50px!important;padding-bottom:50px!important}}@media (max-width:1023px){' + SEC + '{padding-top:24px!important;padding-bottom:24px!important}}'; }
      if (SEC && lo.gap === 'wide') { s += '@media (min-width:1024px){' + SEC + '{padding-top:140px!important;padding-bottom:140px!important}}@media (max-width:1023px){' + SEC + '{padding-top:70px!important;padding-bottom:70px!important}}'; }
      var TT = keys.map(function (k) { return CT + ' > ' + k + ' :is(h2,h3,[class*="__title"],[class*="__tit"])'; }).join(',');
      if (TT && lo.tAlign) { s += TT + '{text-align:' + lo.tAlign + '!important}'; }
      if (TT && lo.tColor) { s += TT + '{color:' + lo.tColor + '!important}'; }
      if (TT && num(lo.tSize)) { s += '@media (min-width:1024px){' + TT + '{font-size:' + num(lo.tSize) + 'px!important}}@media (max-width:1023px){' + TT + '{font-size:' + Math.max(15, Math.round(num(lo.tSize) * 0.65)) + 'px!important}}'; }
    }
    var li = c.list || {};
    if (li.on) {
      var I = 'html body .vt-item', st = esc(li.soldTxt || 'SOLD OUT').replace(/"/g, ''), TH = I + ':has(.vt-item__soldout img) .vt-item__thumb.vt-item__thumb.vt-item__thumb', TA = TH + '::after';
      /* 품절은 사진 칸(.vt-item__thumb) 위에 직접 그림 — 품절 칸 위치가 달라도 사진을 덮음. 카페24 품절 그림 칸은 숨김 */
      var soldBase = I + ' .vt-item__soldout.vt-item__soldout:has(img){display:none!important}' + I + ' .vt-item__soldout::after,' + I + ' .vt-item__soldout::before{content:none!important;display:none!important;background:none!important}' + TH + '{position:relative!important;overflow:hidden}' + TA + '{content:"' + st + '";position:absolute;z-index:3;pointer-events:none;top:auto;right:auto;bottom:auto;left:auto;width:auto;height:auto;margin:0;padding:0;border:0;border-radius:0;transform:none;background:none;text-shadow:none;font:800 15px/1.2 "Noto Sans KR",sans-serif;letter-spacing:.06em;display:flex;align-items:center;justify-content:center;box-sizing:border-box}';
      var SOLD = ['', soldBase + TA + '{inset:0;background:rgba(255,255,255,.62);color:#111}',
        soldBase + TA + '{inset:0;background:rgba(0,0,0,.5);color:#fff}',
        soldBase + TA + '{left:-30%;right:-30%;top:50%;transform:translateY(-50%) rotate(-24deg);background:#111;color:#fff;padding:8px 0}',
        soldBase + TA + '{left:10px;top:10px;background:#111;color:#fff;font-size:11px;padding:5px 8px;border-radius:3px}',
        soldBase + TA + '{left:0;right:0;bottom:0;background:rgba(17,17,17,.85);color:#fff;padding:9px 0;font-size:13px}',
        I + ' .vt-item__soldout.vt-item__soldout:has(img){display:none!important}' + I + ' .vt-item__soldout::after,' + I + ' .vt-item__soldout::before{content:none!important;display:none!important;background:none!important}' + TH + ' img{filter:grayscale(1);opacity:.55}' + TA + '{content:none;background:none}',
        soldBase + TA + '{left:50%;top:50%;width:92px;height:92px;margin:-46px 0 0 -46px;border:3px solid #d0021b;border-radius:50%;color:#d0021b;background:rgba(255,255,255,.75);transform:rotate(-14deg);font-size:14px}',
        soldBase + TA + '{inset:0;color:#fff;font-size:22px;text-shadow:0 2px 8px rgba(0,0,0,.6)}'];
      s += SOLD[num(li.sold)] || '';
      var NW = I + ' .vt-item__new:has(img)', nwBase = NW + '{display:block!important;position:absolute;z-index:4;pointer-events:none;left:10px;top:10px}' + NW + ' img{display:none!important}' + NW + '::after{content:"NEW";font:800 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.06em}';
      var NEWS = ['', nwBase + NW + '::after{background:#111;color:#fff;padding:5px 8px;border-radius:3px;display:block}',
        nwBase + NW + '::after{background:#d0021b;color:#fff;padding:5px 8px;border-radius:3px;display:block}',
        nwBase + NW + '::after{background:#111;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center}',
        nwBase + NW + '{left:0;top:0}' + NW + '::after{display:block;width:0;height:0;border-style:solid;border-width:52px 52px 0 0;border-color:#d0021b transparent transparent transparent;font-size:0}' + NW + '::before{content:"NEW";position:absolute;left:4px;top:10px;transform:rotate(-45deg);color:#fff;font:800 10px/1 sans-serif}',
        nwBase + NW + '::after{background:#fff;color:#111;border:1.5px solid #111;padding:4px 7px;display:block}',
        nwBase + NW + '{top:auto;bottom:10px}' + NW + '::after{background:rgba(255,255,255,.92);color:#111;padding:5px 8px;display:block;border-radius:999px}',
        nwBase + NW + '{left:0;top:14px}' + NW + '::after{content:"NEW IN";background:#111;color:#fff;padding:6px 10px 6px 8px;display:block}',
        nwBase + NW + '::after{display:flex;align-items:center;gap:5px;color:#d0021b;background:rgba(255,255,255,.9);padding:4px 7px;border-radius:3px}' + NW + '::before{content:"";position:absolute;left:7px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:#d0021b}'];
      s += NEWS[num(li.nw)] || '';
      var SA = I + ' .vt-item__sale', pos = li.salePos === 'tr' ? 'left:auto!important;right:10px!important' : '', sb = li.saleBg, sf = li.saleFg;
      var SALES = ['', SA + '{background:' + (sb || '#d0021b') + '!important;color:' + (sf || '#fff') + '!important}',
        SA + '{border-radius:3px!important;width:auto!important;height:auto!important;padding:5px 8px!important;line-height:1!important;background:' + (sb || '#111') + '!important;color:' + (sf || '#fff') + '!important}',
        SA + '{border-radius:0 0 6px 0!important;left:0!important;top:0!important;width:auto!important;height:auto!important;padding:8px 10px!important;line-height:1!important;background:' + (sb || '#d0021b') + '!important;color:' + (sf || '#fff') + '!important}',
        SA + '{background:transparent!important;color:' + (sf || '#d0021b') + '!important;font-size:18px!important;font-weight:900!important;width:auto!important;height:auto!important}',
        SA + '{background:#fff!important;color:' + (sf || '#111') + '!important;border:2px solid ' + (sb || '#111') + '!important}',
        SA + '{border-radius:0!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:auto!important;height:auto!important;padding:6px 0!important;line-height:1!important;background:' + (sb || 'rgba(208,2,27,.92)') + '!important;color:' + (sf || '#fff') + '!important}' + SA + '::after{content:" OFF"}',
        SA + '{border-radius:999px!important;width:auto!important;height:auto!important;padding:4px 9px!important;line-height:1!important;font-size:12px!important;background:' + (sb || '#343434') + '!important;color:' + (sf || '#fff') + '!important}',
        SA + '{display:none!important}'];
      s += SALES[num(li.sale)] || ''; if (pos && num(li.sale) !== 8 && num(li.sale) !== 3 && num(li.sale) !== 6) { s += SA + '{' + pos + '}'; }
      if (num(li.gapPc)) { s += '@media (min-width:1024px){html body ul.vt-list{gap:' + num(li.gapPc) + 'px!important}}'; }
      if (num(li.gapMo)) { s += '@media (max-width:1023px){html body ul.vt-list{gap:' + num(li.gapMo) + 'px!important}}'; }
      s += I + ' .vt-item__thumb{border-radius:' + num(li.thumbR, 9) + 'px!important;background:' + (li.thumbBg || '#f8f8f8') + '!important}';
      if (num(li.nameSize)) { s += I + ' .vt-item__name, ' + I + ' .vt-item__name *{font-size:' + num(li.nameSize) + 'px!important}'; }
      if (num(li.brandSize)) { s += I + ' .vt-item__desc li:first-child > span:last-child{font-size:' + num(li.brandSize) + 'px!important}'; }
      if (num(li.priceSize) || li.priceColor) { s += I + ' .vt-item__desc li:has(> strong.title:not(.displaynone)) > span{' + (num(li.priceSize) ? 'font-size:' + num(li.priceSize) + 'px!important;' : '') + (li.priceColor ? 'color:' + li.priceColor + '!important' : '') + '}'; }
    }
    var se = c.search || {};
    if (se.on) {
      var SP = 'html body #vtSearchPage';
      if (!se.titleShow) { s += SP + ' .titleArea{display:none!important}'; }
      if (num(se.titleSize)) { s += '@media (min-width:1024px){' + SP + ' .titleArea h2{font-size:' + num(se.titleSize) + 'px!important}}@media (max-width:1023px){' + SP + ' .titleArea h2{font-size:' + Math.max(15, Math.round(num(se.titleSize) * 0.7)) + 'px!important}}'; }
      if (se.titleAlign) { s += SP + ' .titleArea, ' + SP + ' .titleArea h2{text-align:' + se.titleAlign + '!important}'; }
      if (se.box) { var br = { square: '0', round: '10px', pill: '999px' }[se.box] || '0'; s += SP + ' .searchInput{border:2px solid ' + (se.boxColor || '#111') + '!important;border-radius:' + br + '!important;overflow:hidden;background:#fff}' + SP + ' .searchInput input.keyword{border:0!important;background:transparent!important;' + (se.box === 'pill' ? 'padding-left:22px!important;' : '') + '}'; }
      if (num(se.boxH)) { s += SP + ' .searchInput input.keyword{height:' + num(se.boxH) + 'px!important}'; }
      var TG = SP + ' form.searchField a[href*="keyword"]';
      if (se.tag === 'pill') { s += TG + '{border-radius:999px!important;background:' + se.tagBg + '!important;color:' + se.tagFg + '!important;border:0!important}'; }
      if (se.tag === 'square') { s += TG + '{border-radius:3px!important;background:' + se.tagBg + '!important;color:' + se.tagFg + '!important;border:0!important}'; }
      if (se.tag === 'line') { s += TG + '{border-radius:999px!important;background:transparent!important;color:' + se.tagFg + '!important;border:1px solid ' + se.tagFg + '!important}'; }
      if (se.tag === 'text') { s += TG + '{background:transparent!important;color:' + se.tagFg + '!important;border:0!important;padding-left:2px!important;padding-right:6px!important;text-decoration:underline;text-underline-offset:3px}'; }
      if (se.countColor) { s += SP + ' .searchResult strong.txtEm, ' + SP + ' .searchResult .txtEm{color:' + se.countColor + '!important}'; }
      if (se.noBg) { s += SP + ' .noData{background:' + se.noBg + '!important;border-radius:8px}'; }
      if (num(se.noSize)) { s += SP + ' .noData, ' + SP + ' .noData *{font-size:' + num(se.noSize) + 'px!important}'; }
      var PG = SP + ' .xans-search-paging ol li a';
      if (se.pg === 'circle') { s += PG + '{border-radius:50%!important;border:1px solid #ddd!important}' + PG + '.this{background:' + se.pgColor + '!important;color:#fff!important;border-color:' + se.pgColor + '!important}'; }
      if (se.pg === 'square') { s += PG + '{border-radius:4px!important;border:1px solid #ddd!important}' + PG + '.this{background:' + se.pgColor + '!important;color:#fff!important;border-color:' + se.pgColor + '!important}'; }
      if (se.pg === 'under') { s += PG + '{border:0!important;background:transparent!important}' + PG + '.this{color:' + se.pgColor + '!important;font-weight:800!important;text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px}'; }
    }
    var de = c.detail || {};
    if (de.on) {
      var DP = 'html body:has(.xans-product-detail)', BUY = DP + ' a.btnSubmit', SUB = DP + ' button.btnNormal.actionCart,' + DP + ' button.btnNormal.actionWish,' + DP + ' .actionCart.btnNormal';
      s += BUY + '{background:' + (de.buyBg || '#222') + '!important;border-color:' + (de.buyBg || '#222') + '!important;color:' + (de.buyFg || '#fff') + '!important}' + BUY + ' *{color:' + (de.buyFg || '#fff') + '!important}';
      if (de.shape) { var rr = { square: '0', round: '8px', pill: '999px' }[de.shape] || '0'; s += BUY + ',' + SUB + '{border-radius:' + rr + '!important}'; }
      if (num(de.btnH)) { s += BUY + '.sizeL,' + DP + ' button.btnNormal.sizeL{height:' + num(de.btnH) + 'px!important;line-height:' + (num(de.btnH) - 2) + 'px!important;display:inline-flex!important;align-items:center;justify-content:center}'; }
      if (de.sub === 'line') { s += SUB + '{background:#fff!important;border:1.5px solid ' + (de.buyBg || '#222') + '!important;color:' + (de.buyBg || '#222') + '!important}'; }
      if (de.sub === 'soft') { s += SUB + '{background:#f2f2f2!important;border:0!important;color:#222!important}'; }
      if (!de.origShow) { s += DP + ' .xans-product-detail table tr:has(#span_product_price_text){display:none!important}'; }
      if (num(de.saleSize) || de.saleColor) { s += DP + ' #span_product_price_sale{' + (num(de.saleSize) ? 'font-size:' + num(de.saleSize) + 'px!important;' : '') + (de.saleColor ? 'color:' + de.saleColor + '!important' : '') + '}'; }
      if (de.infoLine === 'line') { s += DP + ' .xans-product-detail table tr{border-bottom:1px solid #eee!important}' + DP + ' .xans-product-detail table th,' + DP + ' .xans-product-detail table td{padding-top:8px!important;padding-bottom:8px!important}'; }
      if (de.infoLine === 'none') { s += DP + ' .xans-product-detail table tr{border:0!important}' + DP + ' .xans-product-detail table th,' + DP + ' .xans-product-detail table td{border:0!important}'; }
      if (num(de.thSize)) { s += DP + ' .xans-product-detail table th,' + DP + ' .xans-product-detail table th *{font-size:' + num(de.thSize) + 'px!important}'; }
      if (num(de.thumbR)) { s += DP + ' img.ThumbImage{border-radius:' + num(de.thumbR) + 'px!important}'; }
      if (de.totalColor) { s += DP + ' #totalPrice strong,' + DP + ' .totalPrice strong,' + DP + ' #totalPrice em{color:' + de.totalColor + '!important}'; }
    }
    var bo = c.board || {};
    if (bo.on) {
      var BP = 'html body:has([class*="xans-board-listpackage"])', BL = 'html body [class*="xans-board-listpackage"]';
      if (num(bo.titleSize)) { s += '@media (min-width:1024px){' + BP + ' .titleArea h2{font-size:' + num(bo.titleSize) + 'px!important}}@media (max-width:1023px){' + BP + ' .titleArea h2{font-size:' + Math.max(16, Math.round(num(bo.titleSize) * 0.7)) + 'px!important}}'; }
      if (bo.titleAlign) { s += BP + ' .titleArea,' + BP + ' .titleArea h2{text-align:' + bo.titleAlign + '!important}'; }
      if (!bo.headShow) { s += BL + ' table thead{display:none!important}'; } else if (bo.headBg) { s += BL + ' table thead th{background:' + bo.headBg + '!important}'; }
      if (bo.rows === 'line') { s += BL + ' table tbody tr{border-bottom:1px solid #eee!important}' + BL + ' table tbody td{border-top:0!important}'; }
      if (bo.rows === 'none') { s += BL + ' table tbody tr,' + BL + ' table tbody td{border:0!important}'; }
      if (bo.rows === 'zebra') { s += BL + ' table tbody tr:nth-child(even) td{background:#fafafa!important}' + BL + ' table tbody tr,' + BL + ' table tbody td{border:0!important}'; }
      if (num(bo.rowH)) { s += BL + ' table tbody td{padding-top:' + num(bo.rowH) + 'px!important;padding-bottom:' + num(bo.rowH) + 'px!important}'; }
      if (num(bo.subjSize)) { s += BL + ' table tbody td.subject,' + BL + ' table tbody td.subject a,' + BL + ' table tbody td a{font-size:' + num(bo.subjSize) + 'px!important}'; }
      var WB = BP + ' a.btnSubmitFix'; s += WB + '{background:' + (bo.writeBg || '#1a1a1a') + '!important;border-color:' + (bo.writeBg || '#1a1a1a') + '!important;color:' + (bo.writeFg || '#fff') + '!important' + (bo.writeShape ? ';border-radius:' + ({ square: '0', round: '8px', pill: '999px' }[bo.writeShape] || '0') + '!important' : '') + '}';
      var BG = BP + ' [class*="xans-board-paging"] ol li a';
      if (bo.pg === 'circle') { s += BG + '{border-radius:50%!important;border:1px solid #ddd!important}' + BG + '.this{background:' + bo.pgColor + '!important;color:#fff!important;border-color:' + bo.pgColor + '!important}'; }
      if (bo.pg === 'square') { s += BG + '{border-radius:4px!important;border:1px solid #ddd!important}' + BG + '.this{background:' + bo.pgColor + '!important;color:#fff!important;border-color:' + bo.pgColor + '!important}'; }
      if (bo.pg === 'under') { s += BG + '{border:0!important;background:transparent!important;color:#555!important}' + BG + '.this{background:transparent!important;color:' + bo.pgColor + '!important;font-weight:800!important;text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px}'; }
    }
    var fo = c.foot || {};
    if (fo.on) {
      var FT = 'html body .vt-ft';
      s += FT + '{background:' + (fo.bg || '#fbfbfb') + '!important;color:' + (fo.fg || '#666') + '!important}' + FT + ' p,' + FT + ' span:not(.vt-ft__call),' + FT + ' address,' + FT + ' li,' + FT + ' .xans-layout-footer,' + FT + ' .xans-layout-footer *{color:' + (fo.fg || '#666') + '!important}' + FT + ' h2,' + FT + ' .vt-ft__call{color:' + (fo.head || '#222') + '!important}';
      s += FT + ' .vt-ft__order a,' + FT + ' .vt-ft__order a *{color:#444444!important}';
      if (num(fo.callSize)) { s += FT + ' .vt-ft__call{font-size:' + num(fo.callSize) + 'px!important}'; }
      if (num(fo.infoSize)) { s += FT + ' .xans-layout-footer,' + FT + ' .xans-layout-footer *{font-size:' + num(fo.infoSize) + 'px!important}'; }
      if (fo.menuColor) { s += FT + ' .vt-ft__menu a,' + FT + ' .vt-ft__map a{color:' + fo.menuColor + '!important}'; }
      if (fo.line) { s += FT + '{border-top:1px solid ' + (fo.lineColor || '#e5e5e5') + '!important}'; }
      if (fo.pad === 'tight') { s += '@media (min-width:1024px){' + FT + ' .vt-ft__top,' + FT + ' .vt-ft__bottom{padding-top:24px!important;padding-bottom:24px!important}}@media (max-width:1023px){' + FT + '{padding-top:12px!important;padding-bottom:30px!important}}'; }
      if (fo.pad === 'wide') { s += '@media (min-width:1024px){' + FT + ' .vt-ft__top,' + FT + ' .vt-ft__bottom{padding-top:70px!important;padding-bottom:70px!important}}@media (max-width:1023px){' + FT + '{padding-top:36px!important;padding-bottom:70px!important}}'; }
      if (!fo.showMap) { s += FT + ' .vt-ft__map{display:none!important}'; }
      if (!fo.showPartner) { s += FT + ' .vt-ft__partner{display:none!important}'; }
    }
    var dr = c.drawer || {};
    if (dr.on) { var D0 = 'html body #vtDrawer'; s += D0 + '{background:' + dr.bg + '!important}' + D0 + ',' + D0 + ' .vt-dr__ws a{color:' + wsColor(dr.bg, dr.fg) + '!important}' + D0 + ' a:not(.vt-dr__logout):not(.vt-dr__ws a),' + D0 + ' strong,' + D0 + ' p,' + D0 + ' span:not(.vt-dr__label){color:' + dr.fg + '!important}' + D0 + ' .vt-dr__label{color:' + dr.fg + '!important;opacity:.55}' + D0 + ' .vt-dr__order a,' + D0 + ' .vt-dr__order a *{color:#111111!important}' +
      D0 + ' .vt-dr__in{padding:' + num(dr.pad, 32) + 'px!important}' + D0 + ' .vt-dr__cate li.vt-dr-big>a{font-size:' + num(dr.bigSize, 18) + 'px!important;font-weight:' + num(dr.bigWeight, 700) + '!important;padding-top:' + num(dr.bigGap, 8) + 'px!important;padding-bottom:' + num(dr.bigGap, 8) + 'px!important}' +
      D0 + ' .vt-dr__cate li.vt-dr-chip>a{background:' + (dr.chipShape === 'line' ? 'transparent' : dr.chipBg) + '!important;color:' + (dr.chipFg || dr.fg) + '!important;border-radius:' + (dr.chipShape === 'square' ? '4px' : '999px') + '!important;' + (dr.chipShape === 'line' ? 'border:1px solid ' + (dr.chipFg || dr.fg) + '!important' : 'border:0!important') + '}' +
      (dr.line ? D0 + ' .vt-dr__cate li.vt-dr-big:first-of-type,' + D0 + ' .vt-dr__cate li.vt-dr-big1,' + D0 + ' .vt-dr__sp,' + D0 + ' .vt-dr__box{border-top-color:' + dr.lineColor + '!important}' : D0 + ' .vt-dr__cate li,' + D0 + ' .vt-dr__sp,' + D0 + ' .vt-dr__box{border-top:0!important}') +
      D0 + ' .vt-dr__tel{font-size:' + num(dr.telSize, 22) + 'px!important}'; var hx = String(dr.bg || '#ffffff').replace('#', ''); if (hx.length === 6) { var lum = (parseInt(hx.slice(0, 2), 16) * 299 + parseInt(hx.slice(2, 4), 16) * 587 + parseInt(hx.slice(4, 6), 16) * 114) / 255000; if (lum < 0.45) { s += D0 + ' .vt-dr__close{filter:invert(1)}'; } } } /* 어두운 바탕이면 닫기 × 흰색 */
    return s;
  }
  function siteFontLink(c) { var r = c.font && fontRow(c.font); return r && r[3] && r[3].indexOf('g:') === 0 ? 'https://fonts.googleapis.com/css2?family=' + r[3].slice(2) + '&display=swap' : ''; }
  function siteFile(c) {
    var j = JSON.stringify(c).replace(/</g, '\\u003c'), fl = siteFontLink(c);
    return '<script type="application/json" id="vt-site-cfg">' + j + '</script>\n' + (fl ? '<link rel="stylesheet" href="' + fl + '">\n' : '') +
      '<style id="vt-site-css">' + siteCss(c) + '</style>\n' +
      '<script>(function(){var go=function(){try{var c=JSON.parse(document.getElementById("vt-site-cfg").textContent);' + SITE_RT + '}catch(e){}};if(document.body){go()}else{document.addEventListener("DOMContentLoaded",go)}})();</script>\n';
  }
  /* 편집기 미리보기: 이 화면·미리보기 창(디자인 창·기능개선 창) */
  function siteDoc(d) {
    if (!d || !d.body) { return; }
    var w = d.defaultView, st = d.getElementById('vt-site-css'); if (!st) { st = d.createElement('style'); st.id = 'vt-site-css'; (d.head || d.documentElement).appendChild(st); }
    st.textContent = siteCss(state.site);
    var fl = siteFontLink(state.site), lk = d.getElementById('vt-site-font'); if (fl) { if (!lk) { lk = d.createElement('link'); lk.id = 'vt-site-font'; lk.rel = 'stylesheet'; d.head.appendChild(lk); } if (lk.href !== fl) { lk.href = fl; } } else if (lk) { lk.remove(); }
    try { w.__vtSiteP = { pop: !!state.sitePop }; (new w.Function('c', SITE_RT))(JSON.parse(JSON.stringify(state.site))); } catch (e) { }
  }
  function siteAll() { siteDoc(document); vtDocs().forEach(function (d) { try { siteDoc(d); } catch (e) { } }); }
  function siteChanged(lbl, quick) { state._lbl = lbl; clearTimeout(state._siteT); state._siteT = 0; if (quick) { state._siteT = setTimeout(function () { state._siteT = 0; pushAll(); }, 400); } else { pushAll(); } siteAll(); }
  function sTxt(o, k, ph, lbl, area) { var t = document.createElement(area ? 'textarea' : 'input'); if (!area) { t.type = 'text'; } else { t.rows = 3; } t.value = o[k] || ''; if (ph) { t.placeholder = ph; } t.style.flex = '1'; t.oninput = function () { o[k] = t.value; siteChanged(lbl, true); }; return t; }
  function sCol(o, k, lbl) { var c = document.createElement('input'); c.type = 'color'; c.value = /^#[0-9a-f]{6}$/i.test(o[k]) ? o[k] : '#000000'; c.oninput = function () { o[k] = c.value; siteChanged(lbl, true); }; return c; }
  function sChk(o, k, lbl, rebuild) { var c = document.createElement('input'); c.type = 'checkbox'; c.checked = !!o[k]; c.onchange = function () { o[k] = c.checked; siteChanged(lbl); if (rebuild) { build(); } }; return c; }
  function sDate(o, k, lbl) { var c = document.createElement('input'); c.type = 'date'; c.value = o[k] || ''; c.onchange = function () { o[k] = c.value; siteChanged(lbl); }; return c; }
  /* ===== 6.3 대분류 스타일 카드(1 전체·3 ☰ 메뉴·5 메인 아래·6 상품목록·7 검색·8 상품상세·9 게시판·10 하단) =====
     누르면 그 칸 값을 한 번에(PC·휴대폰 같이, 휴대폰 글씨 12px 이상, 상품 사진 크기·한 쪽 120개는 그대로). 체크해서 지우기·되살리기·작업내역·ESC 그대로 */
  function aN(o, bg, fg) { o.notice.on = true; o.notice.bg = bg; o.notice.fg = fg; if (!o.notice.text) { o.notice.text = '이번 주 수입 빈티지 최대 90% SALE'; } }
  function aT(o, sh, bg, fg) { o.totop.on = true; o.totop.shape = sh; o.totop.bg = bg; o.totop.fg = fg; }
  function aDr(o, v) { o.bg = v[0]; o.fg = v[1]; o.bigSize = v[2]; o.bigWeight = v[3]; o.bigGap = v[4]; o.chipShape = v[5]; o.chipBg = v[6]; o.chipFg = v[7]; o.line = v[8]; o.lineColor = v[9]; o.pad = v[10]; o.telSize = v[11]; }
  function lowKeys() { return lowSecs(document).map(function (x) { return x.key; }); }
  function aLo(o, gap, al, tc, ts, bgf) { o.gap = gap; o.tAlign = al; o.tColor = tc; o.tSize = ts; o.bg = {}; if (bgf) { lowKeys().forEach(function (k, i) { var c = bgf(i); if (c) { o.bg[k] = c; } }); } }
  function aLi(o, v) { o.sold = v[0]; o.nw = v[1]; o.sale = v[2]; o.saleBg = v[3]; o.saleFg = v[4]; o.thumbR = v[5]; o.thumbBg = v[6]; o.nameSize = v[7]; o.brandSize = v[8]; o.priceSize = v[9]; o.priceColor = v[10]; o.gapPc = v[11] || 0; o.gapMo = v[12] || 0; }
  function aSe(o, v) { o.titleShow = v[0]; o.titleSize = v[1]; o.titleAlign = v[2]; o.box = v[3]; o.boxColor = v[4]; o.boxH = v[5]; o.tag = v[6]; o.tagBg = v[7]; o.tagFg = v[8]; o.countColor = v[9]; o.noBg = v[10]; o.noSize = v[11]; o.pg = v[12]; o.pgColor = v[13]; }
  function aDe(o, v) { o.buyBg = v[0]; o.buyFg = v[1]; o.shape = v[2]; o.btnH = v[3]; o.sub = v[4]; o.origShow = v[5]; o.saleSize = v[6]; o.saleColor = v[7]; o.infoLine = v[8]; o.thSize = v[9]; o.thumbR = v[10]; o.totalColor = v[11]; }
  function aBo(o, v) { o.titleSize = v[0]; o.titleAlign = v[1]; o.headShow = v[2]; o.headBg = v[3]; o.rows = v[4]; o.rowH = v[5]; o.subjSize = v[6]; o.writeBg = v[7]; o.writeFg = v[8]; o.writeShape = v[9]; o.pg = v[10]; o.pgColor = v[11]; }
  function aFo(o, v) { o.bg = v[0]; o.fg = v[1]; o.head = v[2]; o.callSize = v[3]; o.infoSize = v[4]; o.menuColor = v[5]; o.line = v[6]; o.lineColor = v[7]; o.pad = v[8]; o.showMap = true; o.showPartner = true; }
  var SST_NM = { site: '1 전체', drawer: '3 ☰ 메뉴', low: '5 메인 아래', list: '6 상품목록', search: '7 검색', detail: '8 상품상세', board: '9 게시판', foot: '10 하단' };
  var SST = {
    site: [
      ['a1', '클래식 블랙', '검정 공지 띠 · 검정 맨 위로 단추', ['#111111', '#ffffff'], function (o) { o.font = ''; o.accent = '#111111'; aN(o, '#111111', '#ffffff'); aT(o, 'circle', '#111111', '#ffffff'); }],
      ['a2', '빈티지 레드', '빨간 공지 띠 · 빨간 단추', ['#c4001f', '#ffffff'], function (o) { o.font = ''; o.accent = '#c4001f'; aN(o, '#c4001f', '#ffffff'); aT(o, 'circle', '#c4001f', '#ffffff'); }],
      ['a3', '크림 종이', '세리프 본문 · 크림 띠 · 갈색 네모 단추', ['#f3ece0', '#4a3a28'], function (o) { o.font = 'Noto Serif'; o.accent = '#7a5230'; aN(o, '#f3ece0', '#4a3a28'); aT(o, 'square', '#4a3a28', '#f3ece0'); }],
      ['a4', '네이비', '남색 공지 띠 · 남색 단추', ['#1f3a5f', '#ffffff'], function (o) { o.font = ''; o.accent = '#1f3a5f'; aN(o, '#1f3a5f', '#ffffff'); aT(o, 'circle', '#1f3a5f', '#ffffff'); }],
      ['a5', '연한 회색', '밝은 회색 띠 · 흰 네모 단추', ['#f1f1f1', '#222222'], function (o) { o.font = ''; o.accent = '#333333'; aN(o, '#f1f1f1', '#222222'); aT(o, 'square', '#ffffff', '#111111'); }],
      ['a6', '올리브', '올리브 띠 · 올리브 단추', ['#4b5d2e', '#ffffff'], function (o) { o.font = ''; o.accent = '#4b5d2e'; aN(o, '#4b5d2e', '#ffffff'); aT(o, 'circle', '#4b5d2e', '#ffffff'); }]
    ],
    drawer: [
      ['d1', '하얀 기본', '흰 바탕 · 회색 알약 칩 · 가는 선', ['#ffffff', '#ededed', '#111111'], function (o) { aDr(o, ['#ffffff', '#111111', 18, 700, 8, 'pill', '#ededed', '', true, '#e5e5e5', 32, 22]); }],
      ['d2', '검정 메뉴', '검정 바탕 · 흰 글씨 · 큰 분류', ['#111111', '#2b2b2b', '#ffffff'], function (o) { aDr(o, ['#111111', '#ffffff', 20, 700, 10, 'pill', '#2b2b2b', '#ffffff', true, '#333333', 32, 24]); }],
      ['d3', '크림 메뉴', '크림 바탕 · 네모 칩', ['#f6f1e7', '#e9dfcd', '#3b2f22'], function (o) { aDr(o, ['#f6f1e7', '#3b2f22', 19, 700, 8, 'square', '#e9dfcd', '#3b2f22', true, '#e2d6c2', 30, 22]); }],
      ['d4', '큰 글씨', '큰 분류 24px · 선만 칩', ['#ffffff', '#111111'], function (o) { aDr(o, ['#ffffff', '#111111', 24, 800, 12, 'line', '#ededed', '', false, '#e5e5e5', 28, 26]); }],
      ['d5', '촘촘하게', '작은 분류 · 좁은 줄 간격', ['#ffffff', '#f2f2f2', '#222222'], function (o) { aDr(o, ['#ffffff', '#222222', 15, 500, 4, 'square', '#f2f2f2', '', true, '#eeeeee', 20, 18]); }],
      ['d6', '빨강 칩', '흰 바탕 · 빨간 알약 칩', ['#ffffff', '#c4001f', '#111111'], function (o) { aDr(o, ['#ffffff', '#111111', 18, 700, 8, 'pill', '#c4001f', '#ffffff', true, '#f0d5da', 32, 22]); }]
    ],
    low: [
      ['l1', '가운데 정돈', '칸 제목 가운데 · 28px', ['#ffffff', '#111111'], function (o) { aLo(o, '', 'center', '#111111', 28); }],
      ['l2', '왼쪽 잡지형', '제목 왼쪽 · 넓은 간격', ['#ffffff', '#111111'], function (o) { aLo(o, 'wide', 'left', '#111111', 30); }],
      ['l3', '촘촘하게', '좁은 간격 · 작은 제목', ['#ffffff', '#333333'], function (o) { aLo(o, 'tight', 'center', '', 22); }],
      ['l4', '넉넉하게', '넓은 간격 · 큰 제목', ['#ffffff', '#111111'], function (o) { aLo(o, 'wide', 'center', '#111111', 32); }],
      ['l5', '줄무늬 바탕', '칸마다 흰색·연회색 번갈아', ['#ffffff', '#f7f7f7'], function (o) { aLo(o, '', 'center', '#111111', 26, function (i) { return i % 2 ? '#f7f7f7' : ''; }); }],
      ['l6', '크림 바탕', '모든 칸 크림 · 갈색 제목', ['#faf6ef', '#3b2f22'], function (o) { aLo(o, '', 'center', '#3b2f22', 28, function () { return '#faf6ef'; }); }],
      ['l7', '빨강 제목', '칸 제목 빨강 · 가운데', ['#ffffff', '#c4001f'], function (o) { aLo(o, '', 'center', '#c4001f', 30); }],
      ['l8', '회색 칸 나눔', '연회색·흰색 번갈아 · 제목 왼쪽', ['#f3f3f3', '#222222'], function (o) { aLo(o, 'wide', 'left', '#222222', 26, function (i) { return i % 2 ? '' : '#f3f3f3'; }); }]
    ],
    list: [
      ['s1', '깔끔 기본', '흰 덮개 품절 · 작은 알약 할인', ['#ffffff', '#111111'], function (o) { aLi(o, [1, 1, 7, '', '', 0, '#f8f8f8', 14, 0, 0, '']); }],
      ['s2', '둥근 사진', '사진 모서리 12px · 빨간 동그라미 할인', ['#c4001f', '#f8f8f8'], function (o) { aLi(o, [2, 1, 1, '', '', 12, '#f8f8f8', 14, 0, 15, '#c4001f']); }],
      ['s3', '할인 강조', '빨간 네모 딱지 · 빨간 할인가', ['#c4001f', '#ffffff'], function (o) { aLi(o, [5, 2, 2, '#c4001f', '#ffffff', 0, '#f8f8f8', 14, 0, 16, '#c4001f']); }],
      ['s4', '미니멀', '흐린 품절 · 빨간 글자만 할인', ['#ffffff', '#111111', '#c4001f'], function (o) { aLi(o, [6, 0, 4, '', '', 0, '#ffffff', 13, 0, 0, '#111111']); }],
      ['s5', '브랜드 크게', '브랜드 16px · 상품명 13px', ['#111111', '#f8f8f8'], function (o) { aLi(o, [2, 1, 7, '', '', 0, '#f8f8f8', 13, 16, 15, '']); }],
      ['s6', '모서리 리본', '빨간 리본 NEW · 모서리 깃발 할인', ['#c4001f', '#111111'], function (o) { aLi(o, [3, 4, 3, '', '', 4, '#f8f8f8', 14, 0, 0, '']); }],
      ['s7', '빈티지 도장', '빨간 도장 품절 · 테두리 동그라미 할인', ['#f4efe6', '#d0021b'], function (o) { aLi(o, [7, 7, 5, '', '', 4, '#f4efe6', 14, 0, 0, '']); }],
      ['s8', '촘촘한 목록', '칸 사이 좁게(사진은 더 큼) · 왼쪽 위 딱지 품절', ['#111111', '#ffffff'], function (o) { aLi(o, [4, 1, 7, '', '', 0, '#f8f8f8', 13, 0, 14, '', 8, 6]); }]
    ],
    search: [
      ['q1', '기본 정돈', '네모 검색 칸 · 알약 태그 · 동그라미 쪽', ['#111111', '#f4f4f4'], function (o) { aSe(o, [true, 28, 'center', 'square', '#111111', 48, 'pill', '#f4f4f4', '#545454', '', '', 0, 'circle', '#111111']); }],
      ['q2', '알약 검색', '알약 검색 칸 · 선 태그 · 네모 쪽', ['#111111', '#ffffff'], function (o) { aSe(o, [true, 26, 'center', 'pill', '#111111', 52, 'line', '#f4f4f4', '#333333', '', '', 0, 'square', '#111111']); }],
      ['q3', '빨강 포인트', '빨간 테두리 · 빨간 결과 수', ['#c4001f', '#fdecef'], function (o) { aSe(o, [true, 28, 'center', 'round', '#c4001f', 50, 'pill', '#fdecef', '#c4001f', '#c4001f', '', 0, 'under', '#c4001f']); }],
      ['q4', '제목 없이', '「상품검색」 제목 숨김 · 큰 검색 칸', ['#111111', '#ffffff'], function (o) { aSe(o, [false, 0, '', 'square', '#111111', 56, 'text', '#f4f4f4', '#333333', '', '', 0, 'circle', '#111111']); }],
      ['q5', '크림', '갈색 둥근 칸 · 크림 태그', ['#7a5230', '#f3ece0'], function (o) { aSe(o, [true, 28, 'center', 'round', '#7a5230', 50, 'square', '#f3ece0', '#4a3a28', '#7a5230', '#faf6ef', 16, 'square', '#7a5230']); }]
    ],
    detail: [
      ['p1', '검정 단추', '검정 네모 구매 · 빨간 할인가', ['#111111', '#c4001f'], function (o) { aDe(o, ['#111111', '#ffffff', 'square', 56, 'line', true, 22, '#c4001f', 'line', 13, 0, '#c4001f']); }],
      ['p2', '빨강 구매', '빨간 둥근 구매 · 연한 장바구니', ['#c4001f', '#f2f2f2'], function (o) { aDe(o, ['#c4001f', '#ffffff', 'round', 54, 'soft', true, 24, '#c4001f', '', 0, 0, '#c4001f']); }],
      ['p3', '알약 단추', '검정 알약 구매 · 선 없는 표', ['#222222', '#ffffff'], function (o) { aDe(o, ['#222222', '#ffffff', 'pill', 52, 'line', true, 0, '', 'none', 0, 6, '']); }],
      ['p4', '큰 가격', '할인가 28px · 높은 구매 단추', ['#111111', '#ffffff'], function (o) { aDe(o, ['#111111', '#ffffff', 'square', 58, '', true, 28, '#111111', '', 0, 0, '#111111']); }],
      ['p5', '크림', '갈색 둥근 구매 · 작은 사진 모서리', ['#4a3a28', '#f3ece0'], function (o) { aDe(o, ['#4a3a28', '#ffffff', 'round', 54, 'soft', true, 0, '#7a5230', 'line', 13, 8, '#4a3a28']); }],
      ['p6', '네이비', '남색 네모 구매 · 남색 할인가', ['#1f3a5f', '#ffffff'], function (o) { aDe(o, ['#1f3a5f', '#ffffff', 'square', 54, 'line', true, 22, '#1f3a5f', 'line', 0, 0, '#1f3a5f']); }]
    ],
    board: [
      ['b1', '깔끔 선', '줄마다 가는 선 · 검정 글쓰기', ['#f6f6f6', '#111111'], function (o) { aBo(o, [30, 'center', true, '#f6f6f6', 'line', 14, 14, '#111111', '#ffffff', 'square', 'circle', '#111111']); }],
      ['b2', '줄무늬', '한 줄씩 연한 바탕 · 빨간 알약 글쓰기', ['#fafafa', '#c4001f'], function (o) { aBo(o, [28, 'center', true, '#ffffff', 'zebra', 12, 14, '#c4001f', '#ffffff', 'pill', 'square', '#c4001f']); }],
      ['b3', '머리줄 없이', '제목 왼쪽 · 밑줄 쪽 번호', ['#ffffff', '#111111'], function (o) { aBo(o, [32, 'left', false, '#f6f6f6', 'line', 16, 15, '#111111', '#ffffff', 'round', 'under', '#111111']); }],
      ['b4', '크림', '크림 머리줄 · 갈색 단추', ['#f3ece0', '#4a3a28'], function (o) { aBo(o, [28, 'center', true, '#f3ece0', 'zebra', 12, 14, '#4a3a28', '#ffffff', 'round', 'circle', '#4a3a28']); }],
      ['b5', '넉넉하게', '줄 높이 크게 · 선 없이', ['#ffffff', '#111111'], function (o) { aBo(o, [34, 'center', true, '#f6f6f6', 'none', 20, 15, '#111111', '#ffffff', 'pill', 'under', '#111111']); }]
    ],
    foot: [
      ['f1', '연한 회색', '밝은 회색 바닥 · 위 가는 선', ['#fbfbfb', '#666666'], function (o) { aFo(o, ['#fbfbfb', '#666666', '#222222', 0, 13, '', true, '#e5e5e5', '']); }],
      ['f2', '검정 바닥', '검정 바탕 · 흰 제목·메뉴', ['#111111', '#ffffff'], function (o) { aFo(o, ['#111111', '#bbbbbb', '#ffffff', 0, 13, '#ffffff', false, '#333333', '']); }],
      ['f3', '크림 바닥', '크림 바탕 · 갈색 글씨', ['#f6f1e7', '#3b2f22'], function (o) { aFo(o, ['#f6f1e7', '#5a4a38', '#3b2f22', 0, 13, '', true, '#e2d6c2', '']); }],
      ['f4', '네이비 바닥', '남색 바탕 · 흰 제목', ['#1f2a3a', '#ffffff'], function (o) { aFo(o, ['#1f2a3a', '#c8d0dc', '#ffffff', 0, 13, '#ffffff', false, '#2e3b4f', '']); }],
      ['f5', '넉넉한 흰색', '흰 바탕 · 넓은 여백 · 큰 전화번호', ['#ffffff', '#111111'], function (o) { aFo(o, ['#ffffff', '#555555', '#111111', 26, 14, '', true, '#e5e5e5', 'wide']); }],
      ['f6', '촘촘하게', '좁은 여백 · 회색 바탕', ['#f7f7f7', '#222222'], function (o) { aFo(o, ['#f7f7f7', '#666666', '#222222', 20, 13, '', false, '#e5e5e5', 'tight']); }]
    ]
  };
  function sstInfo(sid) { var a = String(sid).split(':'), L = SST[a[0]] || []; for (var i = 0; i < L.length; i++) { if (L[i][0] === a[1]) { return L[i]; } } return null; }
  /* 바뀐 곳으로 내려가 보여 주기(게시판 목록 표·메인 아래 첫 칸) */
  function sstScroll(cat) { return function (d) { try { var t = cat === 'board' ? d.querySelector('[class*="xans-board-listpackage"] table, [class*="xans-board-listpackage"]') : null; if (t) { t.scrollIntoView({ block: 'center' }); } } catch (e) { } }; }
  function sstShow(cat) {
    var pg = { list: 'list', search: 'search', detail: 'detail', board: 'board' }[cat];
    if (pg) { if (!(PV.on && PV.pg === pg)) { pvGo(pg, null, sstScroll(cat)); } else { try { sstScroll(cat)(PV.f.contentDocument); } catch (e) { } } return; }
    if (cat === 'drawer') { if (innerWidth < 1024) { drawerOpen(document); } else if (PV.on && PV.pg === 'main' && PV.sz === 'mob') { try { drawerOpen(PV.f.contentDocument); } catch (e) { } } else { pvGo('main', 'mob', drawerOpen); } return; }
    if (cat === 'foot') { setTimeout(function () { var f = pvDocNow().querySelector('.vt-ft, #vtFooter, footer'); if (f) { f.scrollIntoView({ block: 'end' }); } }, 250); return; }
    if (cat === 'low') { if (PV.on && PV.pg !== 'main') { pvClose(); } }
    if (cat === 'low') { setTimeout(function () { var sc = lowSecs(document)[0], el = null; try { el = sc && document.querySelector('#contents > ' + sc.key); } catch (e) { } if (el) { el.scrollIntoView({ block: 'start' }); } }, 200); }
  }
  function sstApply(cat, p) {
    var o = cat === 'site' ? state.site : state.site[cat]; if (!o) { return; }
    if (cat !== 'site') { o.on = true; }
    p[4](o);
    state.site.styles = state.site.styles || {}; state.site.styles[cat] = p[0];
    siteChanged(SST_NM[cat] + ' 스타일: ' + p[1]); build(); sstShow(cat);
    msg('「' + p[1] + '」 스타일을 넣었어요(PC·노트북·휴대폰 같이). 편집 화면에 바로 보여요. 되돌리려면 ESC 한 번.');
  }
  function sstCards(cat) {
    var all = SST[cat] || [], cur = (state.site.styles || {})[cat];
    bd.appendChild(h4('스타일 ' + all.length + '가지'));
    delBar('sst'); stOrigRow('sst:' + cat);
    var g = document.createElement('div'); g.className = 'presets';
    all.filter(function (p) { return !isHid('sst', cat + ':' + p[0]); }).forEach(function (p) {
      var b = document.createElement('button'); if (cur === p[0]) { b.className = 'on'; }
      b.innerHTML = '<b>' + esc(p[1]) + '</b><small>' + esc(p[2]) + '</small><span style="display:inline-flex;gap:2px;margin-top:4px">' + p[3].map(function (c) { return '<i style="width:12px;height:12px;border-radius:50%;background:' + c + ';border:1px solid #ddd"></i>'; }).join('') + '</span>';
      b.onclick = function () { sstApply(cat, p); };
      g.appendChild(delWrap('sst', cat + ':' + p[0], b));
    });
    bd.appendChild(g);
    var hr0 = document.createElement('div'); hr0.className = 'vthHr'; hr0.textContent = '직접 고치기'; bd.appendChild(hr0);
  }
  /* 6.3 기능개선 세부값: 시안마다 글·색·위치를 바꿔 볼 수 있음(편집기 안에서만, state.ed.fxVal[번호] = { m: {칸: 값}, c: {칸: {옛 색: 새 색}} }) */
  var FX_T = /^(css|note|band|sec|bar|fab|badge|card|box|drawer|pop|price1|v)$/;
  var FX_LB = { band: { 2: '띠 글', 3: '바탕색', 4: '글자색' }, fab: { 1: '단추 글', 3: '바탕색', 4: '글자색' }, badge: { 2: '딱지 글', 3: '바탕색', 4: '글자색' }, card: { 2: '넣을 글' }, box: { 2: '안내 글' }, note: { 1: '설명' }, sec: { 1: '제목', 2: '칸 이름들' }, bar: { 1: '단추들' }, drawer: { 1: '메뉴 내용' }, pop: { 1: '창 내용' }, price1: { 1: '할인율 색' } };
  var FX_SEL = { fab: { 2: [['r', '오른쪽 아래'], ['l2', '오른쪽 가운데'], ['l3', '오른쪽 위']] }, badge: { 1: [['tl', '사진 왼쪽 위'], ['tr', '사진 오른쪽 위'], ['bl', '사진 왼쪽 아래'], ['br', '사진 오른쪽 아래']] } };
  function bandOpts(pg) { var o = [['top', '화면 맨 위']]; if (pg === 'main') { o.push(['hero', '첫 화면 바로 아래']); } if (pg === 'list') { o.push(['list', '상품 목록 위'], ['listEnd', '상품 목록 아래']); } if (pg === 'detail') { o.push(['detail', '가격 아래']); } if (pg === 'search') { o.push(['search', '검색 결과 위']); } if (pg === 'board') { o.push(['board', '게시판 위']); } o.push(['foot', '바닥 바로 위']); return o; }
  function fxFields(x) {
    var m = x.mk, out = [], t = '', ti = 0;
    for (var i = 0; i < m.length; i++) {
      var v = m[i];
      if (typeof v === 'string' && FX_T.test(v)) { t = v; ti = i; continue; }
      var r = i - ti, lb = (FX_LB[t] || {})[r];
      if (t === 'v') { if (r % 2 === 1) { continue; } var lv = m[i - 1]; if (typeof v === 'string' && /^#[0-9a-f]{3,8}$/i.test(v)) { out.push({ i: i, k: 'color', l: lv }); } else if (Array.isArray(v)) { out.push({ i: i, k: 'list', l: lv + ' (· 로 나눔)' }); } else if (typeof v === 'string') { out.push({ i: i, k: 'text', l: lv }); } continue; }
      if (t === 'band' && r === 1) { out.push({ i: i, k: 'sel', l: '위치', o: bandOpts(x.pg) }); continue; }
      if (FX_SEL[t] && FX_SEL[t][r]) { out.push({ i: i, k: 'sel', l: '위치', o: FX_SEL[t][r] }); continue; }
      if (t === 'css' && typeof v === 'string') { (v.match(/#(?:[0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-f])/ig) || []).map(function (c) { return c.toLowerCase(); }).filter(function (c, j, a) { return a.indexOf(c) === j; }).slice(0, 4).forEach(function (c, j) { out.push({ i: i, k: 'cc', l: '색 ' + (j + 1), c: c }); }); continue; }
      if (!lb) { continue; }
      if (typeof v === 'string' && /^#[0-9a-f]{3,8}$/i.test(v)) { out.push({ i: i, k: 'color', l: lb }); continue; }
      if (Array.isArray(v)) { out.push({ i: i, k: 'list', l: lb + ' (· 로 나눔)' }); continue; }
      if (typeof v === 'string') { out.push({ i: i, k: 'text', l: lb }); }
    }
    return out;
  }
  function fxMk(x) {
    var v = state.ed && state.ed.fxVal && state.ed.fxVal[x.id]; if (!v) { return x.mk; }
    var m = x.mk.slice();
    Object.keys(v.m || {}).forEach(function (k) { var i = +k; if (i >= 0 && i < m.length) { m[i] = v.m[k]; } });
    Object.keys(v.c || {}).forEach(function (k) { var i = +k, mp = v.c[k] || {}; if (typeof m[i] === 'string') { Object.keys(mp).forEach(function (o) { m[i] = m[i].replace(new RegExp(o + '(?![0-9a-f])', 'gi'), mp[o]); }); } });
    return m;
  }
  function fxPlain(s) { return String(s == null ? '' : s).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
  function fvNote(id) {
    var v = state.ed.fxVal && state.ed.fxVal[id], x = fxInfo(id); if (!v || !x) { return ''; }
    var mk = fxMk(x), out = [];
    fxFields(x).forEach(function (f) { if (f.k === 'cc') { var mp = (v.c || {})[f.i]; if (mp && mp[f.c]) { out.push(f.l + ' ' + mp[f.c]); } } else if (v.m && v.m[f.i] != null) { var val = mk[f.i]; out.push(f.l + ' ' + (Array.isArray(val) ? val.join('·') : f.k === 'sel' ? ((f.o.filter(function (o) { return o[0] === val; })[0] || [0, val])[1]) : fxPlain(val))); } });
    return out.length ? ' (세부값: ' + out.join(', ') + ')' : '';
  }
  function fxValBox(x, card) {
    var F = fxFields(x); if (!F.length) { return; }
    var mk = fxMk(x), box = document.createElement('div'); box.className = 'vthFV';
    var hh = document.createElement('div'); hh.className = 'vthFVh'; hh.textContent = '세부값 — 바꾸면 시안에 바로 보여요(쇼핑몰에는 저장 안 됨)'; box.appendChild(hh);
    var put = function (f, val, quick) {
      var e = state.ed; e.fxVal = e.fxVal || {}; var V = e.fxVal[x.id] = e.fxVal[x.id] || { m: {}, c: {} }; V.m = V.m || {}; V.c = V.c || {};
      if (f.k === 'cc') { V.c[f.i] = V.c[f.i] || {}; V.c[f.i][f.c] = val; } else { V.m[f.i] = val; }
      fxAll(); clearTimeout(state._fvT); state._fvT = 0; state._fvLbl = '기능개선 세부값: ' + x.id + ' ' + f.l;
      var go = function () { state._fvT = 0; state._lbl = state._fvLbl; pushAll(); };
      if (quick) { state._fvT = setTimeout(go, 450); } else { go(); }
    };
    F.forEach(function (f) {
      var el, cur = mk[f.i];
      if (f.k === 'color' || f.k === 'cc') {
        el = document.createElement('input'); el.type = 'color';
        var cv = cur; if (f.k === 'cc') { var mp = ((state.ed.fxVal || {})[x.id] || {}).c; cv = (mp && mp[f.i] && mp[f.i][f.c]) || f.c; }
        if (/^#[0-9a-f]{3}$/i.test(cv)) { cv = '#' + cv.slice(1).split('').map(function (h) { return h + h; }).join(''); }
        el.value = /^#[0-9a-f]{6}$/i.test(cv) ? cv : '#000000'; el.oninput = function () { put(f, el.value, true); };
      } else if (f.k === 'sel') {
        el = document.createElement('select'); var os = f.o.slice(); if (!os.some(function (o) { return o[0] === cur; })) { os.unshift([cur, '처음 자리']); }
        os.forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (o[0] === cur) { op.selected = true; } el.appendChild(op); });
        el.onchange = function () { put(f, el.value, false); };
      } else if (f.k === 'list') {
        el = document.createElement('input'); el.type = 'text'; el.value = (cur || []).join(' · '); el.oninput = function () { put(f, el.value.split(/\s*[·,]\s*/).filter(Boolean), true); };
      } else {
        var pl = fxPlain(cur); el = document.createElement(pl.length > 36 ? 'textarea' : 'input'); if (el.tagName === 'INPUT') { el.type = 'text'; } else { el.rows = 2; }
        el.value = pl; el.oninput = function () { put(f, esc(el.value), true); };
      }
      el.style.flex = '1'; box.appendChild(row(f.l, el));
    });
    var rs = document.createElement('button'); rs.textContent = '↺ 처음 값으로'; rs.style.marginTop = '4px';
    rs.onclick = function () { if (state.ed.fxVal) { delete state.ed.fxVal[x.id]; } state._lbl = '기능개선 세부값 처음으로: ' + x.id; pushAll(); fxAll(); build(); };
    box.appendChild(rs); card.appendChild(box);
  }
  function tSite() {
    var c = state.site;
    bd.appendChild(tip('쇼핑몰 모든 화면에 함께 들어가는 것들이에요. 고치면 바로 보여요.'));
    if (!state.siteLinked) { bd.appendChild(tip('처음 저장할 때 모든 화면이 이 설정을 읽도록 공통 머리 파일에 한 줄을 연결해요(지금 모양은 그대로).')); }
    sstCards('site');
    bd.appendChild(h4('본문 글꼴'));
    var fo = document.createElement('select'); [['', '그대로 (지금 글꼴)']].concat(FONT_OPTS).forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (c.font === o[0]) { op.selected = true; } fo.appendChild(op); }); fo.onchange = function () { c.font = fo.value; siteChanged('전체: 본문 글꼴 ' + (fo.value || '그대로')); };
    bd.appendChild(row('글꼴', fo)); bd.appendChild(tip('메인 첫 화면 글씨·머리말 메뉴는 각자 정한 글꼴을 그대로 써요. 웹 글꼴은 손님 화면이 조금 늦게 뜰 수 있어요.'));
    bd.appendChild(h4('포인트 색')); bd.appendChild(row('포인트 색', sCol(c, 'accent', '전체: 포인트 색'))); bd.appendChild(tip('팝업 단추 등 강조에 써요.'));
    var n = c.notice; bd.appendChild(h4('맨 위 공지 띠'));
    bd.appendChild(row('켜기', sChk(n, 'on', '전체: 공지 띠 ' + (n.on ? '끔' : '켬'), true)));
    if (n.on) { bd.appendChild(row('글', sTxt(n, 'text', '예: 이번 주 최대 90% SALE', '전체: 공지 띠 글'))); bd.appendChild(row('누르면 갈 주소', sTxt(n, 'link', '/product/list.html?cate_no=… (비우면 안 감)', '전체: 공지 띠 주소'))); bd.appendChild(row('글자색', sCol(n, 'fg', '전체: 공지 띠 글자색'))); bd.appendChild(row('바탕색', sCol(n, 'bg', '전체: 공지 띠 바탕색'))); bd.appendChild(row('닫기 × 보이기', sChk(n, 'close', '전체: 공지 띠 닫기'))); bd.appendChild(tip('머리말 위에 얇게(PC 34px·휴대폰 30px) 붙고, 머리말·화면이 그만큼 내려가요. ×로 닫으면 그 창에서는 다시 안 보여요.')); }
    var p = c.popup; bd.appendChild(h4('팝업 (처음 들어오면 뜨는 창)'));
    bd.appendChild(row('켜기', sChk(p, 'on', '전체: 팝업 ' + (p.on ? '끔' : '켬'), true)));
    if (p.on) {
      bd.appendChild(row('제목', sTxt(p, 'title', '예: 배송 안내', '전체: 팝업 제목'))); bd.appendChild(row('글', sTxt(p, 'text', '여러 줄 가능', '전체: 팝업 글', true)));
      bd.appendChild(row('사진 주소', imgField(p, 'img', function () { siteChanged('전체: 팝업 사진'); })));
      bd.appendChild(row('단추 글', sTxt(p, 'btn', '자세히 보기', '전체: 팝업 단추 글'))); bd.appendChild(row('단추 주소', sTxt(p, 'link', '비우면 단추 없음', '전체: 팝업 단추 주소')));
      bd.appendChild(row('시작 날', sDate(p, 'from', '전체: 팝업 시작 날'))); bd.appendChild(row('끝 날', sDate(p, 'to', '전체: 팝업 끝 날')));
      var pv = document.createElement('button'); pv.textContent = state.sitePop ? '팝업 미리보기 닫기' : '👀 팝업 미리보기'; pv.onclick = function () { state.sitePop = !state.sitePop; siteAll(); build(); }; bd.appendChild(pv);
      bd.appendChild(tip('날짜를 비우면 늘 떠요. 손님이 "오늘 하루 안 보기"를 누르면 그날은 안 떠요. 휴대폰도 움직임 없이 바로 떠요.'));
    }
    var t = c.totop; bd.appendChild(h4('맨 위로 단추'));
    bd.appendChild(row('켜기', sChk(t, 'on', '전체: 맨 위로 단추 ' + (t.on ? '끔' : '켬'), true)));
    if (t.on) { var sh = document.createElement('select'); [['circle', '동그라미'], ['square', '네모']].forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (t.shape === o[0]) { op.selected = true; } sh.appendChild(op); }); sh.onchange = function () { t.shape = sh.value; siteChanged('전체: 맨 위로 모양'); }; bd.appendChild(row('모양', sh)); bd.appendChild(row('바탕색', sCol(t, 'bg', '전체: 맨 위로 바탕색'))); bd.appendChild(row('글자색', sCol(t, 'fg', '전체: 맨 위로 글자색'))); bd.appendChild(tip('조금 내리면 오른쪽 아래에 보여요. PC는 부드럽게, 휴대폰은 바로 맨 위로 가요(움직임 없음).')); }
    bd.appendChild(h4('단추 모양')); bd.appendChild(tip('단추는 화면마다 생김새가 달라서 "6 상품목록"·"8 상품상세"에서 그 화면 단추로 고쳐요(다음 판).'));
  }
  function sRng(o, k, min, max, lbl) { var w = document.createElement('span'); w.style.cssText = 'display:flex;flex:1;gap:6px;align-items:center'; var a = document.createElement('input'); a.type = 'range'; a.min = min; a.max = max; a.value = num(o[k]); var b = document.createElement('input'); b.type = 'number'; b.min = min; b.max = max; b.value = num(o[k]); b.style.width = '60px'; a.oninput = function () { b.value = a.value; o[k] = num(a.value); siteChanged(lbl, true); }; b.oninput = function () { a.value = b.value; o[k] = num(b.value); siteChanged(lbl, true); }; w.appendChild(a); w.appendChild(b); return w; }
  function sSel(o, k, opts, lbl) { var e = document.createElement('select'); opts.forEach(function (x) { var op = document.createElement('option'); op.value = x[0]; op.textContent = x[1]; if (String(o[k]) === String(x[0])) { op.selected = true; } e.appendChild(op); }); e.onchange = function () { o[k] = /^\d+$/.test(e.value) ? num(e.value) : e.value; siteChanged(lbl); }; return e; }
  /* ☰ 창 미리보기: 휴대폰 창(또는 휴대폰 폭 편집기)에서 ☰를 눌러 열고 지금 값 적용 */
  function drawerClose(d) { try { var dr = d.getElementById('vtDrawer'); if (!dr) { return; } d.__vtDrOpen = 0; var c = dr.querySelector('[data-vt-close]'); if (dr.style.display === 'block' && c) { c.click(); } setTimeout(function () { try { if (d.defaultView.getComputedStyle(dr).display !== 'none' && !dr.__vtfxOpen) { dr.style.display = 'none'; } d.documentElement.classList.remove('vt-lock'); } catch (e) { } }, 180); } catch (e) { } }
  function drawerOpen(d) { try { d.__vtDrOpen = 1; var m = d.querySelector('.vt-hd .vt-ico--menu'); if (m) { m.click(); } setTimeout(function () { if (!d.defaultView) { return; } var dr = d.getElementById('vtDrawer'); if (dr && d.defaultView.getComputedStyle(dr).display === 'none') { dr.style.display = 'block'; dr.style.opacity = '1'; d.documentElement.classList.add('vt-lock'); } }, 150); setTimeout(function () { if (d.defaultView) { siteDoc(d); } }, 300); return !!m; } catch (e) { return false; } }
  function drawerPreview() {
    if (innerWidth < 1024) { drawerOpen(document); msg('☰ 메뉴를 열었어요. 고치면 바로 바뀌어요.'); return; }
    pvGo('main', 'mob', drawerOpen); msg('📱 편집 화면(휴대폰 390)에서 ☰ 메뉴를 열었어요. 고치면 바로 보여요(저장 전에는 손님 화면 그대로).');
  }
  function tDrawer() {
    var d = state.site.drawer;
    bd.appendChild(tip('휴대폰에서 ☰를 누르면 나오는 전체 메뉴예요. 화면에 열어 두었어요(닫혔으면 위 「3 ☰ 메뉴」를 다시 누르세요).'));
    sstCards('drawer');
    bd.appendChild(row('꾸미기 켜기', sChk(d, 'on', '☰ 메뉴: 꾸미기 ' + (d.on ? '끔' : '켬'), true)));
    if (!d.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요. 켜면 아래 값으로 바뀌어요.')); return; }
    bd.appendChild(h4('색')); bd.appendChild(row('바탕색', sCol(d, 'bg', '☰ 메뉴: 바탕색'))); bd.appendChild(row('글자색', sCol(d, 'fg', '☰ 메뉴: 글자색')));
    bd.appendChild(h4('큰 분류 (여자·남자…)')); bd.appendChild(row('글자 크기(px)', sRng(d, 'bigSize', 13, 28, '☰ 메뉴: 큰 분류 크기'))); bd.appendChild(row('굵기', sSel(d, 'bigWeight', [[400, '보통'], [500, '조금 굵게'], [700, '굵게'], [800, '아주 굵게']], '☰ 메뉴: 큰 분류 굵기'))); bd.appendChild(row('줄 간격(px)', sRng(d, 'bigGap', 2, 18, '☰ 메뉴: 줄 간격')));
    bd.appendChild(h4('위 작은 칩 (MD추천·폴로…)')); bd.appendChild(row('모양', sSel(d, 'chipShape', [['pill', '둥근 알약'], ['square', '네모'], ['line', '선만']], '☰ 메뉴: 칩 모양'))); bd.appendChild(row('칩 바탕색', sCol(d, 'chipBg', '☰ 메뉴: 칩 바탕색'))); bd.appendChild(row('칩 글자색', sCol(d, 'chipFg', '☰ 메뉴: 칩 글자색'))); bd.appendChild(tip('칩 글자색을 안 고치면 위 글자색을 따라가요.'));
    bd.appendChild(h4('구분선·여백')); bd.appendChild(row('구분선 보이기', sChk(d, 'line', '☰ 메뉴: 구분선', true))); if (d.line) { bd.appendChild(row('구분선 색', sCol(d, 'lineColor', '☰ 메뉴: 구분선 색'))); } bd.appendChild(row('안쪽 여백(px)', sRng(d, 'pad', 12, 48, '☰ 메뉴: 안쪽 여백')));
    bd.appendChild(h4('고객센터')); bd.appendChild(row('전화번호 크기(px)', sRng(d, 'telSize', 14, 30, '☰ 메뉴: 전화번호 크기')));
    bd.appendChild(tip('기능(소분류 펼치기·창 안 검색 등)은 위 [기능개선] → 휴대폰 전체 메뉴 D 에서 시안으로 볼 수 있어요.'));
  }
  var LOW_NAMES = { 'vt-mtext': '소개 글', 'vt-mgrid': 'UPDATE NEW 사진 칸', 'vt-gmov': '영상 칸', 'vt-tab': '베스트 아이템', 'vt-ws': '구제도매 안내', 'vt-nu': 'NEW UPDATE 줄', 'vt-mlist': '상품 목록' };
  /* 메인 아래 칸 목록: 화면(#contents 바로 아래, 메인 첫 화면 말고)에서 저절로 */
  function lowSecs(d) {
    d = d || document; var C = d.getElementById('contents'); if (!C) { return []; }
    var seen = {}, out = [];
    [].slice.call(C.children).forEach(function (k) {
      if (k.id === 'vth' || k.id === 'vthm' || /^(SCRIPT|STYLE|LINK)$/.test(k.tagName) || k.hasAttribute('data-vtfx') || k.hasAttribute('data-vtsite') || k.hasAttribute('data-vtimp-mock')) { return; }
      var cl = String(k.className || '').split(/\s+/).filter(function (x) { return x && !/^xans|^vth/.test(x); })[0], key = k.id ? '#' + k.id : (cl ? '.' + cl : '');
      if (!key || seen[key]) { return; } seen[key] = 1;
      if (k.getBoundingClientRect().height < 10 && !((state.site.low || {}).hide || {})[key]) { return; } /* 안 보이는 도우미 요소(SEO 제목 등)는 빼기 */
      var t = k.querySelector('h2,h3,[class*="__title"],[class*="__tit"]'), nm = LOW_NAMES[cl] || LOW_NAMES[(k.id || '').toLowerCase()] || (t && t.textContent.trim().split('\n')[0].slice(0, 18)) || key;
      out.push({ key: key, name: nm, el: k });
    });
    return out;
  }
  function tLow() {
    var lo = state.site.low;
    bd.appendChild(tip('메인 첫 화면 아래 칸들이에요. 칸 이름을 누르면 그 칸으로 내려가요.'));
    sstCards('low');
    bd.appendChild(row('꾸미기 켜기', sChk(lo, 'on', '메인 아래: 꾸미기 ' + (lo.on ? '끔' : '켬'), true)));
    if (!lo.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    var secs = lowSecs(document);
    if (!secs.length) { bd.appendChild(tip('이 화면에서 메인 아래 칸을 찾지 못했어요(메인 주소에서 열어 주세요).')); return; }
    var keys = secs.map(function (x) { return x.key; }), ord = (lo.order || []).filter(function (k) { return keys.indexOf(k) > -1; });
    keys.forEach(function (k) { if (ord.indexOf(k) < 0) { ord.push(k); } }); lo.order = ord; lo.nat = keys.slice(); /* 처음 순서 — 순서를 바꿨을 때만 줄 세우기 */
    bd.appendChild(h4('칸 (위에서 아래 순서)'));
    ord.forEach(function (k, i) {
      var sc = secs.filter(function (x) { return x.key === k; })[0]; if (!sc) { return; }
      var r = document.createElement('div'); r.className = 'vthLow';
      var vis = document.createElement('input'); vis.type = 'checkbox'; vis.checked = !lo.hide[k]; vis.title = '보이기'; vis.onchange = function () { lo.hide[k] = !vis.checked; if (!lo.hide[k]) { delete lo.hide[k]; } siteChanged('메인 아래: ' + sc.name + (vis.checked ? ' 보이기' : ' 숨기기')); build(); };
      var nm = document.createElement('span'); nm.textContent = sc.name; nm.style.cssText = 'flex:1;cursor:pointer;' + (lo.hide[k] ? 'text-decoration:line-through;color:#999' : ''); nm.onclick = function () { try { sc.el.scrollIntoView({ block: 'start' }); } catch (e) { } };
      var up = document.createElement('button'); up.textContent = '↑'; up.disabled = i === 0; up.onclick = function () { var a = lo.order; a.splice(i, 1); a.splice(i - 1, 0, k); siteChanged('메인 아래: ' + sc.name + ' 위로'); build(); };
      var dn = document.createElement('button'); dn.textContent = '↓'; dn.disabled = i === ord.length - 1; dn.onclick = function () { var a = lo.order; a.splice(i, 1); a.splice(i + 1, 0, k); siteChanged('메인 아래: ' + sc.name + ' 아래로'); build(); };
      var cc = document.createElement('input'); cc.type = 'color'; cc.title = '바탕색'; cc.value = /^#[0-9a-f]{6}$/i.test(lo.bg[k] || '') ? lo.bg[k] : '#ffffff'; cc.oninput = function () { lo.bg[k] = cc.value; siteChanged('메인 아래: ' + sc.name + ' 바탕색', true); };
      var cx = document.createElement('button'); cx.textContent = '↺'; cx.title = '바탕색 그대로'; cx.onclick = function () { delete lo.bg[k]; siteChanged('메인 아래: ' + sc.name + ' 바탕색 그대로'); build(); };
      [vis, nm, up, dn, cc, cx].forEach(function (e) { r.appendChild(e); }); bd.appendChild(r);
    });
    bd.appendChild(tip('☑ = 보이기, ↑↓ = 순서, 색 = 칸 바탕(↺ 그대로). 상품 목록 칸은 숨기지 않는 게 좋아요.'));
    bd.appendChild(h4('모든 칸'));
    bd.appendChild(row('칸 사이 간격', sSel(lo, 'gap', [['', '그대로'], ['tight', '좁게'], ['wide', '넓게']], '메인 아래: 칸 사이 간격')));
    bd.appendChild(row('제목 정렬', sSel(lo, 'tAlign', [['', '그대로'], ['center', '가운데'], ['left', '왼쪽']], '메인 아래: 제목 정렬')));
    var tc = sCol(lo, 'tColor', '메인 아래: 제목 색'); var tcx = document.createElement('button'); tcx.textContent = '↺'; tcx.onclick = function () { lo.tColor = ''; siteChanged('메인 아래: 제목 색 그대로'); build(); }; var tw = document.createElement('span'); tw.style.cssText = 'display:flex;gap:6px;align-items:center'; tw.appendChild(tc); tw.appendChild(tcx); bd.appendChild(row('제목 색', tw));
    bd.appendChild(row('제목 크기(PC px)', sRng(lo, 'tSize', 0, 48, '메인 아래: 제목 크기'))); bd.appendChild(tip('0 = 그대로. 휴대폰은 자동으로 줄여요(약 65%).'));
    bd.appendChild(tip('새 칸(신상품 줄·브랜드 줄 등)은 위 [기능개선] → 메인(머리말) M 에서 시안으로 볼 수 있어요.'));
  }
  function listPreview(url) { pvOpen(url); msg('화면에 열었어요. 고치면 바로 보여요. 폭은 위 「보는 폭」, 따로 창은 화면 위 ↗ 단추.'); }
  function shapeCards(o, k, names, lbl, demo) {
    var g = document.createElement('div'); g.className = 'vthShp';
    names.forEach(function (n, i) { var b = document.createElement('button'); b.innerHTML = (demo ? demo(i) : '') + '<span>' + n + '</span>'; if (num(o[k]) === i) { b.className = 'on'; } b.onclick = function () { o[k] = i; siteChanged(lbl + ': ' + n); build(); }; g.appendChild(b); });
    return g;
  }
  function tList() {
    var L = state.site.list;
    bd.appendChild(tip('상품 칸 모양이에요. 메인·상품목록·검색 결과에 같이 들어가요.'));
    var pr = document.createElement('div'); pr.style.cssText = 'display:flex;gap:6px;margin:0 0 8px';
    var b1 = document.createElement('button'); b1.textContent = '🖥📱 상품목록 화면'; b1.style.flex = '1'; b1.onclick = function () { var it = its(state.cfg.pc || {}); listPreview((it[0] && it[0].u) || '/product/list.html'); };
    var b2 = document.createElement('button'); b2.textContent = '🖥📱 품절 있는 화면'; b2.style.flex = '1'; b2.onclick = function () { listPreview(SH.soldUrl || '/product/search.html?keyword=%ED%8F%B4%EB%A1%9C&page=4'); }; /* soldUrl: 그 쇼핑몰에서 품절 칸이 섞여 나오는 목록·검색 주소(SHOPS 줄에 넣음) */
    pr.appendChild(b1); pr.appendChild(b2); bd.appendChild(pr);
    sstCards('list');
    bd.appendChild(row('꾸미기 켜기', sChk(L, 'on', '상품목록: 꾸미기 ' + (L.on ? '끔' : '켬'), true)));
    if (!L.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    bd.appendChild(h4('품절 표시'));
    bd.appendChild(shapeCards(L, 'sold', ['그대로', '흰 덮개 + 글자', '검정 덮개 + 글자', '대각선 띠', '왼쪽 위 딱지', '아래 띠', '흐리게만', '빨간 도장', '글자만 크게'], '상품목록: 품절 표시'));
    bd.appendChild(row('품절 글자', sSel(L, 'soldTxt', [['SOLD OUT', 'SOLD OUT'], ['품절', '품절'], ['SOLD', 'SOLD']], '상품목록: 품절 글자')));
    bd.appendChild(h4('NEW 표시'));
    bd.appendChild(shapeCards(L, 'nw', ['그대로(안 보임)', '검정 딱지', '빨간 딱지', '검정 동그라미', '빨간 모서리 리본', '테두리 딱지', '아래 흰 알약', 'NEW IN 띠', '빨간 점 + NEW'], '상품목록: NEW 표시'));
    bd.appendChild(tip('NEW는 카페24 관리자 \'새 상품 아이콘\' 기간 안의 옷에만 붙어요(지금은 붙은 옷이 없어요).'));
    bd.appendChild(h4('할인 표시 (80% 같은 것)'));
    bd.appendChild(shapeCards(L, 'sale', ['그대로', '빨간 동그라미', '네모 딱지', '모서리 깃발', '빨간 글자만', '테두리 동그라미', '아래 띠 OFF', '작은 알약', '숨기기'], '상품목록: 할인 표시'));
    if (num(L.sale) && num(L.sale) !== 8) { var bw = document.createElement('span'); bw.style.cssText = 'display:flex;gap:6px;align-items:center'; var c1 = sCol(L, 'saleBg', '상품목록: 할인 바탕색'), c2 = sCol(L, 'saleFg', '상품목록: 할인 글자색'), rx = document.createElement('button'); rx.textContent = '↺'; rx.title = '모양 기본색'; rx.onclick = function () { L.saleBg = ''; L.saleFg = ''; siteChanged('상품목록: 할인 기본색'); build(); }; bw.appendChild(c1); bw.appendChild(c2); bw.appendChild(rx); bd.appendChild(row('바탕·글자색', bw)); bd.appendChild(row('자리', sSel(L, 'salePos', [['tl', '왼쪽 위'], ['tr', '오른쪽 위']], '상품목록: 할인 자리'))); }
    bd.appendChild(h4('칸·사진'));
    bd.appendChild(row('칸 사이 PC(px)', sRng(L, 'gapPc', 0, 40, '상품목록: 칸 사이 PC'))); bd.appendChild(row('칸 사이 휴대폰(px)', sRng(L, 'gapMo', 0, 24, '상품목록: 칸 사이 휴대폰'))); bd.appendChild(tip('0 = 그대로. 한 쪽 120개·사진 크기는 그대로예요.'));
    bd.appendChild(row('사진 모서리(px)', sRng(L, 'thumbR', 0, 24, '상품목록: 사진 모서리'))); bd.appendChild(row('사진 바탕색', sCol(L, 'thumbBg', '상품목록: 사진 바탕색')));
    bd.appendChild(h4('글씨'));
    bd.appendChild(row('상품명 크기(px)', sRng(L, 'nameSize', 0, 18, '상품목록: 상품명 크기'))); bd.appendChild(row('브랜드 크기(px)', sRng(L, 'brandSize', 0, 24, '상품목록: 브랜드 크기'))); bd.appendChild(row('할인가 크기(px)', sRng(L, 'priceSize', 0, 22, '상품목록: 할인가 크기')));
    var pw = document.createElement('span'); pw.style.cssText = 'display:flex;gap:6px;align-items:center'; pw.appendChild(sCol(L, 'priceColor', '상품목록: 할인가 색')); var px = document.createElement('button'); px.textContent = '↺'; px.onclick = function () { L.priceColor = ''; siteChanged('상품목록: 할인가 색 그대로'); build(); }; pw.appendChild(px); bd.appendChild(row('할인가 색', pw)); bd.appendChild(tip('크기 0 = 그대로.'));
    bd.appendChild(h4('담으면 확인 창')); bd.appendChild(tip('지금 쇼핑몰에는 담으면 뜨는 확인 창이 없어요. [기능개선] L-25 「담으면 작은 확인 창」을 고르시면 그 기능을 만들 때 모양을 여기서 고르게 할게요.'));
  }
  function tSearch() {
    var S2 = state.site.search;
    bd.appendChild(tip('검색 결과 화면이에요. 상품 칸 모양은 「6 상품목록」과 같아요.'));
    var pr = document.createElement('div'); pr.style.cssText = 'display:flex;gap:6px;margin:0 0 8px';
    var b1 = document.createElement('button'); b1.textContent = '🖥📱 검색 결과 화면'; b1.style.flex = '1'; b1.onclick = function () { listPreview('/product/search.html?keyword=%ED%8F%B4%EB%A1%9C'); };
    var b2 = document.createElement('button'); b2.textContent = '🖥📱 결과 없을 때'; b2.style.flex = '1'; b2.onclick = function () { listPreview('/product/search.html?keyword=zzqqxx'); };
    pr.appendChild(b1); pr.appendChild(b2); bd.appendChild(pr);
    sstCards('search');
    bd.appendChild(row('꾸미기 켜기', sChk(S2, 'on', '검색: 꾸미기 ' + (S2.on ? '끔' : '켬'), true)));
    if (!S2.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    bd.appendChild(h4('제목 「상품검색」')); bd.appendChild(row('보이기', sChk(S2, 'titleShow', '검색: 제목 보이기'))); bd.appendChild(row('크기(PC px)', sRng(S2, 'titleSize', 0, 40, '검색: 제목 크기'))); bd.appendChild(row('정렬', sSel(S2, 'titleAlign', [['', '그대로'], ['center', '가운데'], ['left', '왼쪽']], '검색: 제목 정렬')));
    bd.appendChild(h4('검색 칸')); bd.appendChild(row('모양', sSel(S2, 'box', [['', '그대로'], ['square', '네모 테두리'], ['round', '둥근 테두리'], ['pill', '알약']], '검색: 칸 모양'))); if (S2.box) { bd.appendChild(row('테두리 색', sCol(S2, 'boxColor', '검색: 테두리 색'))); } bd.appendChild(row('높이(px)', sRng(S2, 'boxH', 0, 70, '검색: 칸 높이'))); bd.appendChild(tip('높이 0 = 그대로.'));
    bd.appendChild(h4('인기검색어 태그')); bd.appendChild(row('모양', sSel(S2, 'tag', [['', '그대로'], ['pill', '둥근 알약'], ['square', '네모'], ['line', '선만'], ['text', '글자만(밑줄)']], '검색: 태그 모양'))); if (S2.tag) { if (S2.tag === 'pill' || S2.tag === 'square') { bd.appendChild(row('바탕색', sCol(S2, 'tagBg', '검색: 태그 바탕색'))); } bd.appendChild(row('글자색', sCol(S2, 'tagFg', '검색: 태그 글자색'))); }
    bd.appendChild(h4('결과 수·결과 없음'));
    var cw = document.createElement('span'); cw.style.cssText = 'display:flex;gap:6px;align-items:center'; cw.appendChild(sCol(S2, 'countColor', '검색: 결과 수 색')); var cx = document.createElement('button'); cx.textContent = '↺'; cx.onclick = function () { S2.countColor = ''; siteChanged('검색: 결과 수 색 그대로'); build(); }; cw.appendChild(cx); bd.appendChild(row('결과 수 색', cw));
    var nw = document.createElement('span'); nw.style.cssText = 'display:flex;gap:6px;align-items:center'; nw.appendChild(sCol(S2, 'noBg', '검색: 결과 없음 바탕')); var nx = document.createElement('button'); nx.textContent = '↺'; nx.onclick = function () { S2.noBg = ''; siteChanged('검색: 결과 없음 바탕 그대로'); build(); }; nw.appendChild(nx); bd.appendChild(row('결과 없음 바탕', nw));
    bd.appendChild(row('결과 없음 글자(px)', sRng(S2, 'noSize', 0, 20, '검색: 결과 없음 글자')));
    bd.appendChild(h4('쪽 번호 (1 2 3 …)')); bd.appendChild(row('모양', sSel(S2, 'pg', [['', '그대로'], ['circle', '동그라미'], ['square', '네모'], ['under', '밑줄']], '검색: 쪽 번호 모양'))); if (S2.pg) { bd.appendChild(row('지금 쪽 색', sCol(S2, 'pgColor', '검색: 지금 쪽 색'))); }
    bd.appendChild(tip('기능(최근 검색어·자동 완성 등)은 위 [기능개선] → 검색 S 에서 시안으로 볼 수 있어요.'));
  }
  /* 상세 미리보기: 첫 화면 버튼 첫 분류 목록 → 첫 상품으로 이동해 지금 값 적용 */
  function detailPreview() { pvGo('detail'); msg('편집 화면에 첫 상품 상세를 열었어요. 고치면 바로 보여요.'); }
  function tDetail() {
    var D2 = state.site.detail;
    bd.appendChild(tip('상품 상세 화면이에요. 휴대폰 아래 구매 줄 단추도 같이 바뀌어요.'));
    sstCards('detail');
    bd.appendChild(row('꾸미기 켜기', sChk(D2, 'on', '상품상세: 꾸미기 ' + (D2.on ? '끔' : '켬'), true)));
    if (!D2.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    bd.appendChild(h4('구매 단추')); bd.appendChild(row('바탕색', sCol(D2, 'buyBg', '상품상세: 구매 단추 바탕'))); bd.appendChild(row('글자색', sCol(D2, 'buyFg', '상품상세: 구매 단추 글자')));
    bd.appendChild(row('단추 모양', sSel(D2, 'shape', [['', '그대로'], ['square', '네모'], ['round', '둥근 모서리'], ['pill', '알약']], '상품상세: 단추 모양'))); bd.appendChild(row('단추 높이(px)', sRng(D2, 'btnH', 0, 64, '상품상세: 단추 높이'))); bd.appendChild(tip('높이 0 = 그대로.'));
    bd.appendChild(row('장바구니·관심 단추', sSel(D2, 'sub', [['', '그대로'], ['line', '구매 색 테두리'], ['soft', '연한 회색 바탕']], '상품상세: 장바구니·관심 단추')));
    bd.appendChild(h4('가격')); bd.appendChild(row('판매가 줄 보이기', sChk(D2, 'origShow', '상품상세: 판매가 줄'))); bd.appendChild(row('할인가 크기(px)', sRng(D2, 'saleSize', 0, 30, '상품상세: 할인가 크기')));
    var sw = document.createElement('span'); sw.style.cssText = 'display:flex;gap:6px;align-items:center'; sw.appendChild(sCol(D2, 'saleColor', '상품상세: 할인가 색')); var sx = document.createElement('button'); sx.textContent = '↺'; sx.onclick = function () { D2.saleColor = ''; siteChanged('상품상세: 할인가 색 그대로'); build(); }; sw.appendChild(sx); bd.appendChild(row('할인가 색', sw));
    var tw = document.createElement('span'); tw.style.cssText = 'display:flex;gap:6px;align-items:center'; tw.appendChild(sCol(D2, 'totalColor', '상품상세: 총액 색')); var tx = document.createElement('button'); tx.textContent = '↺'; tx.onclick = function () { D2.totalColor = ''; siteChanged('상품상세: 총액 색 그대로'); build(); }; tw.appendChild(tx); bd.appendChild(row('총액(TOTAL) 색', tw));
    bd.appendChild(h4('정보 표·사진')); bd.appendChild(row('표 줄', sSel(D2, 'infoLine', [['', '그대로'], ['line', '줄마다 가는 선'], ['none', '선 없이']], '상품상세: 표 줄'))); bd.appendChild(row('표 제목 글자(px)', sRng(D2, 'thSize', 0, 18, '상품상세: 표 제목 글자'))); bd.appendChild(row('작은 사진 모서리(px)', sRng(D2, 'thumbR', 0, 20, '상품상세: 작은 사진 모서리')));
    bd.appendChild(h4('담으면 확인 창')); bd.appendChild(tip('지금 쇼핑몰에는 담으면 뜨는 확인 창이 없어요. [기능개선] L-25를 고르시면 그 기능을 만들 때 모양을 여기서 고르게 할게요.'));
    bd.appendChild(tip('기능(사진 크게 보기·상품코드 복사 등)은 위 [기능개선] → 상품상세 P 에서 시안으로 볼 수 있어요.'));
  }
  function boardUrls() { var a = [].slice.call(document.querySelectorAll('#vtDrawer a[href*="/board/"]')).map(function (x) { return [x.textContent.trim(), x.getAttribute('href')]; }), seen = {}; a = a.filter(function (x) { if (seen[x[1]]) { return false; } seen[x[1]] = 1; return true; }); return a.length ? a.slice(0, 3) : [['REVIEW', '/board/product/list.html?board_no=4'], ['Q&A', '/board/product/list.html?board_no=6']]; }
  function tBoard() {
    var B2 = state.site.board;
    bd.appendChild(tip('게시판 목록 화면이에요(Q&A·REVIEW·공지 같이).'));
    var pr = document.createElement('div'); pr.style.cssText = 'display:flex;gap:6px;margin:0 0 8px;flex-wrap:wrap';
    boardUrls().forEach(function (u) { var b = document.createElement('button'); b.textContent = '🖥📱 ' + u[0]; b.style.flex = '1'; b.onclick = function () { listPreview(u[1]); }; pr.appendChild(b); }); bd.appendChild(pr);
    sstCards('board');
    bd.appendChild(row('꾸미기 켜기', sChk(B2, 'on', '게시판: 꾸미기 ' + (B2.on ? '끔' : '켬'), true)));
    if (!B2.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    bd.appendChild(h4('제목')); bd.appendChild(row('크기(PC px)', sRng(B2, 'titleSize', 0, 44, '게시판: 제목 크기'))); bd.appendChild(row('정렬', sSel(B2, 'titleAlign', [['', '그대로'], ['center', '가운데'], ['left', '왼쪽']], '게시판: 제목 정렬'))); bd.appendChild(tip('크기 0 = 그대로, 휴대폰은 약 70%.'));
    bd.appendChild(h4('목록 표')); bd.appendChild(row('머리줄 보이기', sChk(B2, 'headShow', '게시판: 머리줄 보이기', true))); if (B2.headShow) { bd.appendChild(row('머리줄 바탕', sCol(B2, 'headBg', '게시판: 머리줄 바탕'))); }
    bd.appendChild(row('줄 모양', sSel(B2, 'rows', [['', '그대로'], ['line', '줄마다 가는 선'], ['none', '선 없이'], ['zebra', '한 줄씩 연한 바탕']], '게시판: 줄 모양'))); bd.appendChild(row('줄 높이(위아래 px)', sRng(B2, 'rowH', 0, 24, '게시판: 줄 높이'))); bd.appendChild(row('글 제목 크기(px)', sRng(B2, 'subjSize', 0, 18, '게시판: 글 제목 크기'))); bd.appendChild(tip('0 = 그대로.'));
    bd.appendChild(h4('글쓰기 단추')); bd.appendChild(row('바탕색', sCol(B2, 'writeBg', '게시판: 글쓰기 바탕'))); bd.appendChild(row('글자색', sCol(B2, 'writeFg', '게시판: 글쓰기 글자'))); bd.appendChild(row('모양', sSel(B2, 'writeShape', [['', '그대로'], ['square', '네모'], ['round', '둥근 모서리'], ['pill', '알약']], '게시판: 글쓰기 모양')));
    bd.appendChild(h4('쪽 번호')); bd.appendChild(row('모양', sSel(B2, 'pg', [['', '그대로'], ['circle', '동그라미'], ['square', '네모'], ['under', '밑줄']], '게시판: 쪽 번호 모양'))); if (B2.pg) { bd.appendChild(row('지금 쪽 색', sCol(B2, 'pgColor', '게시판: 지금 쪽 색'))); }
    bd.appendChild(tip('기능(사진 후기 모아 보기·답변 완료 표시 등)은 위 [기능개선] → 게시판 B 에서 시안으로 볼 수 있어요.'));
  }
  function tFoot() {
    var F2 = state.site.foot;
    bd.appendChild(tip('모든 화면 맨 아래 바닥(고객센터·계좌·회사 정보)이에요. 화면을 바닥으로 내려 두었어요.'));
    sstCards('foot');
    bd.appendChild(row('꾸미기 켜기', sChk(F2, 'on', '하단: 꾸미기 ' + (F2.on ? '끔' : '켬'), true)));
    if (!F2.on) { bd.appendChild(tip('끄면 지금 모양 그대로예요.')); return; }
    bd.appendChild(h4('색')); bd.appendChild(row('바탕색', sCol(F2, 'bg', '하단: 바탕색'))); bd.appendChild(row('글자색', sCol(F2, 'fg', '하단: 글자색'))); bd.appendChild(row('제목·전화 색', sCol(F2, 'head', '하단: 제목 색')));
    var mw = document.createElement('span'); mw.style.cssText = 'display:flex;gap:6px;align-items:center'; mw.appendChild(sCol(F2, 'menuColor', '하단: 메뉴 글자색')); var mx = document.createElement('button'); mx.textContent = '↺'; mx.onclick = function () { F2.menuColor = ''; siteChanged('하단: 메뉴 글자색 그대로'); build(); }; mw.appendChild(mx); bd.appendChild(row('메뉴 글자색', mw));
    bd.appendChild(h4('글자')); bd.appendChild(row('전화번호 크기(px)', sRng(F2, 'callSize', 0, 34, '하단: 전화번호 크기'))); bd.appendChild(row('회사 정보 글자(px)', sRng(F2, 'infoSize', 0, 15, '하단: 회사 정보 글자'))); bd.appendChild(tip('0 = 그대로. 회사 정보는 휴대폰에서 11px라 13px 이상이면 읽기 쉬워요.'));
    bd.appendChild(h4('선·여백·보이기')); bd.appendChild(row('위 구분선', sChk(F2, 'line', '하단: 위 구분선', true))); if (F2.line) { bd.appendChild(row('선 색', sCol(F2, 'lineColor', '하단: 선 색'))); }
    bd.appendChild(row('위아래 여백', sSel(F2, 'pad', [['', '그대로'], ['tight', '좁게'], ['wide', '넓게']], '하단: 위아래 여백')));
    bd.appendChild(row('바로가기 표(MY SHOP·COMMUNITY)', sChk(F2, 'showMap', '하단: 바로가기 표'))); bd.appendChild(row('안전거래 칸', sChk(F2, 'showPartner', '하단: 안전거래 칸')));
    bd.appendChild(tip('기능(휴대폰 회사 정보 접기·계좌 복사 등)은 위 [기능개선] → 하단 F 에서 시안으로 볼 수 있어요.'));
  }
  /* 6.1 가운데 화면 바꾸기: 메인이 아닌 화면을 새 창 없이 편집기 가운데 틀에 열고 꾸미기·시안을 바로 그림.
     쇼핑몰 편집기는 같은 주소라 그대로 열고, 웹앱은 쇼핑몰 화면 글을 웹앱(부모)에게 받아 같은 주소 틀(srcdoc)에 넣음 */
  function pvDef() { return innerWidth < 1024 ? 'mob' : 'pc'; }
  var PV = { w: null, f: null, on: false, pg: 'main', url: '/', sz: pvDef(), req: 0, cb: {}, key: '', then: null, scale: 1 };
  var PV_NM = { main: '메인', list: '상품목록', detail: '상품상세', search: '검색', board: '게시판', cart: '장바구니' };
  var PV_SZ = { pc: 1440, lap: 1024, mob: 390 };
  var PV_A = 'a.vt-item__thumb[href], ul.vt-list a[href*="/product/"], a[href*="/product/detail.html"]';
  function pvBase() { try { return new URL('/', document.baseURI).href.replace(/\/$/, ''); } catch (e) { return location.origin; } }
  function pvPath(u) { try { var x = new URL(u, pvBase() + '/'); return x.pathname + x.search; } catch (e) { return u; } }
  function pvPgOf(u) { var p = pvPath(u).split('?')[0]; return /\/board\//.test(p) ? 'board' : /\/product\/search/.test(p) ? 'search' : /detail\.html|\/product\/[^/]+\/\d+/.test(p) ? 'detail' : /\/product\/list|\/category\//.test(p) ? 'list' : /\/order\/basket/.test(p) ? 'cart' : 'main'; }
  function pvUrlOf(pg) { if (pg === 'list') { var it = its(state.cfg.pc || {}); return (it[0] && it[0].u) || '/product/list.html'; } if (pg === 'board') { return boardUrls()[0][1]; } return FX_URL[pg] || '/'; }
  /* 상품 상세 주소만(분류·목록 주소는 빼고) */
  function pvDetailHrefs(d) {
    var L = [].slice.call(d.querySelectorAll(PV_A)), on = [], off = [];
    for (var i = 0; i < L.length; i++) {
      var h = L[i].getAttribute('href'); if (!h || pvPgOf(h) !== 'detail' || on.indexOf(h) > -1 || off.indexOf(h) > -1) { continue; }
      var card = L[i].closest ? L[i].closest('.vt-item, li') : null, sold = false;
      try { sold = !!(card && card.querySelector('.vt-item__soldout img, img[alt*="품절"], img[src*="soldout"], img[src*="sold_out"]')); } catch (e) { }
      (sold ? off : on).push(h);
    }
    return on.concat(off);
  }
  function pvDetailHref(d) { return pvDetailHrefs(d)[0] || ''; }
  function pvDocNow() { try { if (PV.on && PV.f.contentDocument) { return PV.f.contentDocument; } } catch (e) { } return document; }
  function pvGet(url, cb) {
    if (!WEB) { fetch(url, { credentials: 'include', cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (t) { cb(t); }, function () { cb(null); }); return; }
    /* 6.3 웹앱: ① 받은 화면은 5분 동안 기억해 두고 다시 씀 — 시안을 켜고 끌 때마다 같은 상품 상세를 수십 번 받아 가면 쇼핑몰 쪽에서 받기를 거절함(「사용할 수 없는 주소」, 11/18)
       ② 못 받으면 저절로 두 번 더 시도(지운 상품처럼 주소가 없는 것은 바로 포기) */
    var path = pvPath(url), mem = PV.mem = PV.mem || {}, hit = mem[path], tries = 0;
    if (hit && Date.now() - hit.t < 300000) { setTimeout(function () { cb(hit.h); }, 0); return; }
    var go = function () {
      var id = ++PV.req;
      PV.cb[id] = function (h, err) {
        if (h) { var ks = Object.keys(mem); if (ks.length >= 8) { ks.sort(function (a, b) { return mem[a].t - mem[b].t; }); delete mem[ks[0]]; } mem[path] = { h: h, t: Date.now() }; cb(h); return; }
        tries++;
        if (tries < (err === 'time' ? 2 : 3) && !/\((4\d\d)\)|주소가 틀렸|쇼핑몰 이름/.test(String(err || ''))) { if (PV.url === path) { pvLoad('화면을 다시 받는 중… (' + (tries + 1) + '번째)'); } setTimeout(go, 1500 * tries); return; }
        cb(null, err);
      };
      setTimeout(function () { if (PV.cb[id]) { var f = PV.cb[id]; delete PV.cb[id]; f(null, 'time'); } }, 30000);
      try { parent.postMessage({ vth: 'page', id: id, path: path }, '*'); } catch (e) { var f2 = PV.cb[id]; delete PV.cb[id]; if (f2) { f2(null); } }
    };
    go();
  }
  if (WEB) { addEventListener('message', function (e) { var d = e.data || {}; if (d.vth !== 'pageHtml' || !PV.cb[d.id]) { return; } var cb = PV.cb[d.id]; delete PV.cb[d.id]; cb(d.html || null, d.err); }); }
  if (WEB) {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a[href]'); if (!a || e.defaultPrevented || a.closest('#vthP, #vthT, #vthD, #vthPv')) { return; }
      var h = a.getAttribute('href') || ''; if (!h || /^(#|javascript:)/i.test(h)) { e.preventDefault(); return; }
      if (/^(mailto:|tel:)/i.test(h)) { return; }
      var u; try { u = new URL(h, pvBase() + '/'); } catch (x) { e.preventDefault(); return; }
      e.preventDefault();
      if (u.origin === new URL(pvBase()).origin) { pvOpen(u.pathname + u.search); msg('누른 화면을 편집 화면에 열었어요(고치던 것은 그대로). 메인으로 돌아가려면 위 「메인」 또는 ✕ 메인으로.'); } else { msg('바깥 주소는 편집기에서 열지 않아요.'); }
    });
  }
  function pvShell() {
    if (!PV.w) {
      var w = PV.w = document.createElement('div'); w.id = 'vthPv';
      w.innerHTML = '<div class="pvb"><span class="pvs"></span><span class="pvg"></span><button data-pv="win" title="지금 화면을 PC·휴대폰 따로 창에도(창은 하나씩만, 다시 누르면 같은 창을 다시 씀)">↗ 따로 창</button><button data-pv="x" title="메인 편집 화면으로 돌아가기">✕ 메인으로</button></div><div class="pva"><div class="pvl">불러오는 중…</div><iframe title="편집 화면"></iframe></div>';
      document.body.appendChild(w); PV.f = w.querySelector('iframe'); PV.f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms'); PV.f.onload = pvLoaded;
      w.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('button[data-pv]'); if (!b) { return; } if (b.getAttribute('data-pv') === 'x') { pvClose(); } else { pvWin(); } });
      addEventListener('resize', pvFit);
    }
    PV.w.style.display = 'flex'; PV.on = true; pvFit(); return PV.w;
  }
  function pvLoad(t) { if (!PV.w) { return; } var l = PV.w.querySelector('.pvl'); l.style.display = t ? 'flex' : 'none'; if (t) { l.textContent = t; } }
  function pvClose() { if (PV.w) { PV.w.style.display = 'none'; } PV.on = false; PV.pg = 'main'; PV.url = '/'; pvBar(); }
  function pvGo(pg, sz, then) {
    if (sz) { PV.sz = sz; }
    if (pg === 'main' && PV.sz === pvDef()) { pvClose(); if (then) { then(document); } return; }
    if (pg === 'detail') {
      pvShell(); PV.pg = 'detail'; pvBar(); pvLoad('상품 상세를 찾는 중…');
      var as = pvDetailHrefs(document);
      if (as.length) { PV.alts = as.slice(1, 6); pvOpen(as[0], then); return; }
      pvGet(pvUrlOf('list'), function (h) { var xs = []; if (h) { try { xs = pvDetailHrefs(new DOMParser().parseFromString(h, 'text/html')); } catch (e) { } } if (xs.length) { PV.alts = xs.slice(1, 6); pvOpen(xs[0], then); } else { pvLoad('상품 상세 주소를 찾지 못했어요.'); } });
      return;
    }
    pvOpen(pvUrlOf(pg), then);
  }
  function pvSize(sz) {
    PV.sz = sz;
    if (!PV.on) { if (sz !== pvDef()) { pvGo('main'); } else { pvBar(); } return; }
    if (PV.pg === 'main' && sz === pvDef()) { pvClose(); return; }
    pvFit(); pvBar();
  }
  function pvOpen(url, then) {
    pvShell(); PV.url = pvPath(url); PV.pg = pvPgOf(url); PV.then = then || null; pvBar(); pvLoad(PV_NM[PV.pg] + ' 화면 불러오는 중…');
    var f = PV.f;
    if (!WEB) { f.removeAttribute('srcdoc'); f.src = PV.url; return; }
    if (PV.pg === 'main' && WEB.html) { f.srcdoc = WEB.html; return; }
    var want = PV.url;
    pvGet(PV.url, function (h, err) {
      if (want !== PV.url) { return; }
      if (!h) {
        /* 상품 상세를 못 불러오면(지운 상품·받기 거절 등) 메인에 있는 다른 판매 중 상품으로 저절로 바꿔 보여 줌 */
        if (PV.pg === 'detail' && PV.alts && PV.alts.length) { var nx = PV.alts.shift(), th = PV.then; pvOpen(nx, th); pvLoad('이 상품 화면을 불러오지 못해 다른 상품으로 바꿔 보여 드려요…'); return; }
        pvLoad(err === 'time' ? '화면을 받지 못했어요. 웹앱 주소를 새로 고침(F5)한 뒤 다시 눌러 주세요.' : '화면을 불러오지 못했어요: ' + (err || '')); return;
      }
      h = h.replace(/<script\b(?![^>]*application\/json)[^>]*>[\s\S]*?<\/script>/gi, '');
      var b = '<base href="' + pvBase() + '/">'; h = /<head[^>]*>/i.test(h) ? h.replace(/<head([^>]*)>/i, '<head$1>' + b) : b + h;
      f.srcdoc = h;
    });
  }
  function pvLoaded() {
    var f = PV.f, d = null; if (!PV.on) { return; }
    try { d = f.contentDocument; } catch (e) { }
    if (!d || !d.body || d.URL === 'about:blank') { return; }
    pvLoad('');
    if (!WEB) { try { PV.url = d.defaultView.location.pathname + d.defaultView.location.search; PV.pg = pvPgOf(PV.url); } catch (e) { } pvBar(); }
    d.__vtPath = PV.url.split('?')[0];
    d.addEventListener('keydown', function (e) { if (VTH._onKey) { VTH._onKey(e); } });
    if (WEB) {
      /* 웹앱 틀 안에서 누른 쇼핑몰 주소는 틀 안에서 다시 엶(쇼핑몰 주소로 나가면 꾸미기를 못 그림) */
      d.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href]'); if (!a) { return; } var h = a.getAttribute('href') || ''; if (/^(#|javascript:|mailto:|tel:)/i.test(h) || !h) { e.preventDefault(); return; } var u; try { u = new URL(h, pvBase() + '/'); } catch (x) { return; } e.preventDefault(); if (u.origin === new URL(pvBase()).origin) { pvOpen(u.pathname + u.search); } else { msg('바깥 주소는 편집 화면에서 열지 않아요.'); } }, true);
      d.addEventListener('submit', function (e) { e.preventDefault(); var fm = e.target; try { if ((fm.getAttribute('method') || 'get').toLowerCase() !== 'get') { msg('보내기 칸은 편집 화면에서 실행하지 않아요(보기 전용).'); return; } var u = new URL(fm.getAttribute('action') || PV.url, pvBase() + '/'); pvOpen(u.pathname + '?' + new URLSearchParams(new FormData(fm)).toString()); } catch (x) { } }, true);
    }
    noBar(d, PV.sz === 'mob'); siteDoc(d); fxDoc(d); pvHero(false); if (typeof applyHdr === 'function') { try { applyHdr(); } catch (e) { } }
    if (PV.then) { var t = PV.then; PV.then = null; setTimeout(function () { t(d); }, 350); }
  }
  function pvHero(cssOnly) { try { if (!PV || !PV.on || PV.pg !== 'main') { return; } var d = PV.f.contentDocument, w = d && d.defaultView; if (!d || !d.getElementById('vth')) { return; } if (RESP) { var dm = d.getElementById('vthm'); if (dm) { dm.parentNode.removeChild(dm); } } var mb = w.innerWidth < 1024; applyTo(d, winCfg(w), !!cssOnly && d.__vthMob === mb); d.__vthMob = mb; } catch (e) { } }
  function noBar(d, on) { try { if (!d || !d.head) { return; } var st = d.getElementById('vth-nobar'); if (!on) { if (st) { st.remove(); } return; } if (!st) { st = d.createElement('style'); st.id = 'vth-nobar'; st.textContent = 'html{scrollbar-width:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}'; d.head.appendChild(st); } } catch (e) { } }
  function pvFit() {
    if (!PV.on) { return; }
    try { noBar(PV.f.contentDocument, PV.sz === 'mob'); } catch (e) { }
    var a = PV.w.querySelector('.pva'), W = PV_SZ[PV.sz] || 1440, aw = Math.max(200, a.clientWidth - 16), ah = Math.max(200, a.clientHeight - 16), sc = Math.min(1, aw / W), f = PV.f;
    PV.scale = sc; f.style.width = W + 'px'; f.style.height = Math.round(ah / sc) + 'px'; f.style.transform = sc < 1 ? 'scale(' + sc + ')' : ''; f.style.left = Math.round((a.clientWidth - W * sc) / 2) + 'px';
    clearTimeout(PV.ft); PV.ft = setTimeout(function () { pvHero(false); try { fxDoc(PV.f.contentDocument); } catch (e) { } }, 300);
    pvBar();
  }
  function pvBar() {
    var pg = PV.on ? PV.pg : 'main', bs = P ? P.querySelectorAll('.pvsel button') : [];
    for (var i = 0; i < bs.length; i++) { var k = bs[i].getAttribute('data-a'); bs[i].classList.toggle('on', k === 'pv-' + pg || k === 'pvz-' + (PV.on ? PV.sz : pvDef())); }
    var sl = P ? P.querySelector('.pvsel select') : null; /* 6.8: 화면 고르기는 모든 화면에 들어가는 대분류(1 전체·2 머리말·10 하단, 기능개선 공통)에서만 보임 — 나머지는 대분류가 화면을 정함 */
    if (sl) { sl.value = pg; sl.parentNode.style.display = (state.top === 'imp' ? state.fxTab === 'C' : (state.mode === 'site' || state.mode === 'hdr' || state.mode === 'foot')) ? '' : 'none'; }
    if (PV.w) { PV.w.querySelector('.pvs').textContent = (PV_NM[PV.pg] || '') + ' · 폭 ' + (PV_SZ[PV.sz] || 1440) + 'px' + (PV.scale < 1 ? ' (' + Math.round(PV.scale * 100) + '%로 줄여 보임)' : ''); var g = PV.url; try { g = decodeURIComponent(g); } catch (e) { } PV.w.querySelector('.pvg').textContent = g; }
  }
  function pvAuto(force) { /* 6.8 force: 대분류 단추를 직접 누른 것 — 같은 대분류여도 그 화면으로 다시 데려감(「✕ 메인으로」나 화면 안 링크로 떠나 있던 때) */
    var key = state.top + ':' + (state.top === 'imp' ? state.fxTab : state.mode), same = key === PV.key, prevDr = /:drawer$|^imp:D$/.test(PV.key || ''); if (same && !force) { return; } PV.key = key; try { pvBar(); } catch (e0) { }
    var pg = state.top === 'imp' ? ({ L: 'list', S: 'search', P: 'detail', B: 'board' }[state.fxTab] || 'main') : ({ list: 'list', search: 'search', detail: 'detail', board: 'board' }[state.mode] || 'main');
    if ((state.top === 'imp' && state.fxTab === 'D') || (state.top !== 'imp' && state.mode === 'drawer')) { if (PV.on && PV.pg === 'main' && PV.sz === 'mob') { var lo0 = PV.w && PV.w.querySelector('.pvl'); if (!(lo0 && lo0.style.display !== 'none')) { try { drawerOpen(PV.f.contentDocument); } catch (e3) { } } return; } pvGo('main', 'mob', drawerOpen); return; }
    if (document.__vtDrOpen) { drawerClose(document); } /* ☰ 메뉴를 보려고 열어 둔 창은 다른 대분류로 가면 닫음(휴대폰 폭 편집기에서 화면을 가리던 것) */
    try { var pd0 = PV.on ? PV.f.contentDocument : null; if (pd0 && pd0.__vtDrOpen) { drawerClose(pd0); } } catch (e1) { } /* 6.8: 휴대폰 폭 틀 안에 열어 둔 메뉴도 닫음 */
    if (prevDr && !same && PV.on && PV.pg === 'main' && PV.sz === 'mob' && pvDef() !== 'mob') { PV.sz = pvDef(); pvClose(); } /* 6.8: ☰ 메뉴를 보던 휴대폰 폭 틀은 다른 대분류(하단 포함)로 가면 닫고 원래 폭으로 */
    if ((state.top !== 'imp' && state.mode === 'foot') || (state.top === 'imp' && state.fxTab === 'F')) { setTimeout(function () { try { var ft = pvDocNow().querySelector('.vt-ft, #vtFooter, footer'); if (ft) { ft.scrollIntoView({ block: 'end' }); } } catch (e) { } }, 250); return; } /* 하단은 모든 화면에 있어서 지금 화면 그대로, 바닥으로만 내림 */
    if (!same && PV.on && PV.pg === 'main' && pg === 'main') { PV.sz = pvDef(); pvClose(); return; } /* ☰ 메뉴 보던 휴대폰 틀은 닫고 메인 편집 화면으로 */
    var cur = PV.on ? PV.pg : 'main';
    if (pg === cur) { return; }
    if (pg === 'main') { pvClose(); return; }
    if (PV.sz === 'mob' && cur === 'main') { PV.sz = pvDef(); }
    pvGo(pg);
  }
  function fxMobOnly(x) { var k = x.mk.indexOf('bar'); return !!x.mo || x.g === 'D' || (k > -1 && !!x.mk[k + 2]); }
  function fxAlt(u) { return Object.keys(FX_PGU).some(function (k) { return pvPath(FX_PGU[k]()) === u; }); }
  function pvShowFx(x) {
    var nm = PV_NM[x.pg] || '', wide = innerWidth >= 1024, want = fxWant(x), tail = ' 쇼핑몰에는 저장되지 않아요.';
    if (fxMobOnly(x) && wide) { if (PV.on && PV.pg === x.pg && !fxAlt(PV.url)) { if (PV.sz !== 'mob') { pvSize('mob'); } else { try { fxDoc(PV.f.contentDocument); } catch (e) { } } } else { pvGo(x.pg, 'mob'); } msg(x.id + ' 「' + x.t + '」 은 휴대폰에서 보이는 시안이라 편집 화면을 휴대폰 폭(390)으로 바꿔 그렸어요.' + tail); return; }
    if (x.pc && !wide) { if (PV.on && PV.pg === x.pg && !fxAlt(PV.url)) { if (PV.sz !== 'pc') { pvSize('pc'); } else { try { fxDoc(PV.f.contentDocument); } catch (e) { } } } else { pvGo(x.pg, 'pc'); } msg(x.id + ' 「' + x.t + '」 은 PC에서만 보이는 시안이라 편집 화면을 PC 폭(1440)으로 바꿔 그렸어요.' + tail); return; }
    if (want) { if (PV.on && PV.url === want) { try { fxDoc(PV.f.contentDocument); } catch (e) { } } else { pvOpen(want); } msg(x.id + ' 「' + x.t + '」 시안이 잘 보이는 화면을 가운데에 열어 그렸어요.' + tail); return; }
    if (x.pg === 'main' || fxPageOk(document, x.pg)) { if (PV.on && PV.pg !== 'main') { pvClose(); } msg(x.id + ' 「' + x.t + '」 시안을 이 화면에 그렸어요. 주황 점선이 바뀌는 곳이에요.' + tail); return; }
    if (PV.on && PV.pg === x.pg && !fxAlt(PV.url)) { try { fxDoc(PV.f.contentDocument); } catch (e) { } msg(x.id + ' 「' + x.t + '」 시안을 편집 화면(' + nm + ')에 그렸어요.' + tail); return; }
    pvGo(x.pg); msg(x.id + ' 「' + x.t + '」 시안을 보려고 편집 화면을 ' + nm + ' 화면으로 바꿨어요(다 뜨면 바로 그려져요).' + tail);
  }
  function pvWin() {
    if (!PV.on) { return; }
    var html = WEB ? PV.f.srcdoc : '', path = PV.url;
    [['pc', 'width=1440,height=900,left=40,top=40'], ['mob', 'width=390,height=844,left=1500,top=40']].forEach(function (a) {
      var w = FW[a[0]], od = null;
      if (!w || w.closed) { w = FW[a[0]] = window.open(WEB ? '' : path, 'vtfx_' + a[0], a[1]); } else if (!WEB) { try { if (pvPath(w.location.href) !== path) { od = w.document; w.location.href = path; } } catch (e) { } }
      if (!w) { msg('창이 막혔어요. 주소창 오른쪽 팝업 차단 아이콘에서 허용해 주세요.', 1); return; }
      if (WEB) { try { w.document.open(); w.document.write(html); w.document.close(); } catch (e) { } }
      try { w.focus(); } catch (e) { }
      var n = 0, t = setInterval(function () { n++; if (n > 60) { clearInterval(t); return; } try { var d = w.document; if (!d || d.readyState !== 'complete' || (!WEB && (pvPath(w.location.href) !== path || d === od))) { return; } clearInterval(t); if (WEB) { d.__vtPath = path.split('?')[0]; } siteDoc(d); fxDoc(d); } catch (e) { } }, 300);
    });
    msg('따로 창(PC·휴대폰)에 지금 화면을 열었어요. 고치면 그 창에도 바로 보여요. 다시 누르면 같은 창을 다시 써요.');
  }
  function tCatSoon() {
    var nm = (CATS.filter(function (x) { return x[0] === state.mode; })[0] || ['', ''])[1];
    bd.appendChild(h4(nm));
    bd.appendChild(tip('이 대분류는 다음 판에서 만들어요(1번부터 차례로). 지금은 위 [기능개선] 칸에서 이 화면 기능들을 👀 시안으로 먼저 볼 수 있어요.'));
    var gm = { drawer: 'D', mainlow: 'M', list: 'L', search: 'S', detail: 'P', board: 'B', foot: 'F' }[state.mode];
    if (gm) { var b = document.createElement('button'); b.textContent = '[기능개선] ' + nm.replace(/^\d+ /, '') + ' 시안 보러 가기'; b.onclick = function () { state.top = 'imp'; state.fxTab = gm; build(); pvAuto(); }; bd.appendChild(b); }
  }
  function build() {
    var keepTop = state._bTab === state.tab + state.dev ? bd.scrollTop : 0; state._bTab = state.tab + state.dev;
    setTimeout(function () { bd.scrollTop = keepTop; }, 0);
    setTimeout(function () { var sc = state._lcS; state._lcS = 0; lcMark(sc); }, 0);
    if (state.fxPeek && state.top !== 'imp') { state.fxPeek = null; try { fxAll(); } catch (e0) { } }
    tabsEl.innerHTML = ''; bd.innerHTML = '';
    if (RESP) { topBtns(); if (state.top === 'imp') { tFeat(); return; } }
    if (RESP && state.mode && state.mode !== 'main' && state.mode !== 'hdr') { var cb = P.querySelectorAll('.mode button'); for (var ci = 0; ci < cb.length; ci++) { cb[ci].classList.toggle('on', cb[ci].getAttribute('data-a') === 'mode-' + state.mode); } if (state.mode === 'site') { tSite(); } else if (state.mode === 'drawer') { tDrawer(); } else if (state.mode === 'mainlow') { tLow(); } else if (state.mode === 'list') { tList(); } else if (state.mode === 'search') { tSearch(); } else if (state.mode === 'detail') { tDetail(); } else if (state.mode === 'board') { tBoard(); } else if (state.mode === 'foot') { tFoot(); } else { tCatSoon(); } return; }
    var HTABS = [['hstyle', '① 머리말 스타일'], ['hdr', '② 세부 조정']], inH = state.mode === 'hdr';
    var mb = P.querySelectorAll('.mode button'); for (var mi = 0; mi < mb.length; mi++) { mb[mi].classList.toggle('on', mb[mi].getAttribute('data-a') === 'mode-' + (inH ? 'hdr' : (state.mode && state.mode !== 'site' ? state.mode : 'main'))); }
    if (inH && state.tab !== 'hstyle' && state.tab !== 'hdr') { state.tab = 'hstyle'; } if (!inH && (state.tab === 'hstyle' || state.tab === 'hdr')) { state.tab = 'layout'; }
    (inH ? HTABS : TABS.filter(function (t) { return t[0] !== 'hdr'; })).forEach(function (t) { var b = document.createElement('button'); b.textContent = t[1]; b.setAttribute('data-tab', t[0]); if (state.tab === t[0]) { b.className = 'on'; } b.onclick = function () { state.tab = t[0]; build(); }; tabsEl.appendChild(b); });
    var hb = P.querySelectorAll('.hd button[data-a^=dev]');
    if (typeof winBtns === 'function') { winBtns(); }
    for (var i = 0; i < hb.length; i++) { var ha = hb[i].getAttribute('data-a'); hb[i].classList.toggle('on', ha === 'dev-lap' ? state.view === 'lap' : (ha === 'dev-' + state.dev && state.view !== 'lap')); }
    var c = C(); if (!c) { bd.appendChild(tip('불러오는 중…')); return; }
    if (RESP && state.mode !== 'hdr' && state.tab !== 'done') { var sw = document.createElement('label'); sw.className = 'tip'; sw.style.cssText = 'display:flex;gap:6px;align-items:center;background:#f6f6f6;border-radius:6px;padding:6px 8px;margin-bottom:8px'; var sc = document.createElement('input'); sc.type = 'checkbox'; sc.checked = state.sync !== false; sc.onchange = function () { state.sync = sc.checked; setBase(); msg(sc.checked ? '모든 값을 PC·휴대폰 같이 바꿔요(휴대폰은 폭에 맞춰 줄임).' : '지금 보는 폭(' + (state.dev === 'mobile' ? '휴대폰' : 'PC') + ')만 바꿔요.'); build(); }; sw.appendChild(sc); sw.appendChild(document.createTextNode('모든 값을 PC·휴대폰 같이 바꾸기 (여백·글씨 크기는 휴대폰 폭에 맞춰 줄여요. 휴대폰만 따로는 "📱 휴대폰일 때"에서)')); bd.appendChild(sw);
      if (state.sync !== false && state.cfg.mobile && state.cfg.pc) { var sa = document.createElement('button'); sa.textContent = '📱 지금 PC 값으로 휴대폰 맞추기'; sa.title = '바깥 여백·모서리·어둡게·작은 칸 색·글씨·색·글꼴·띠·사진을 휴대폰에 한 번에'; sa.style.cssText = 'width:100%;margin:-2px 0 8px'; sa.onclick = syncAllNow; bd.appendChild(sa); } }
    var fn = ({ layout: tLayout, style: tStyle, area: tArea, text: tText, marquee: tMq, fx: tFx, hdr: tHdr, hstyle: tHStyle, done: tDone })[state.tab] || tLayout;
    fn(c);
  }
  function areaNames(sp) {
    if (sp.mode === 'full') { return ['사진', '']; }
    var big = num(sp.ratio, 80) >= 50, a = big ? ' (큰 칸)' : ' (작은 칸)', b = big ? ' (작은 칸)' : ' (큰 칸)';
    if (sp.stack) { return sp.reverse ? ['아래 칸' + a, '위 칸' + b] : ['위 칸' + a, '아래 칸' + b]; }
    return sp.reverse ? ['오른쪽 칸' + a, '왼쪽 칸' + b] : ['왼쪽 칸' + a, '오른쪽 칸' + b];
  }
  function layoutName(sp) {
    if (sp.mode === 'full') { return '전체 화면'; }
    var r = num(sp.ratio, 80) / 10; return (sp.stack ? '위아래 ' : '좌우 ') + r + ' : ' + (10 - r);
  }
  function tLayout(c) {
    var sp = c.split, h = c.height, f = c.frame;
    layoutButtons(c, '화면을 어떻게 나눌까요?');
    if (RESP && c.device !== 'mobile' && innerWidth >= 1024) { var wv = document.createElement('button'); wv.style.cssText = 'width:100%;margin:6px 0 2px'; var isW = state.view === 'lap' && state.lapWhole; wv.textContent = isW ? '✏️ 원래 PC 편집 화면으로' : '🖥 PC 전체 화면 줄여 보기 (편집 칸에 가려진 곳까지)'; wv.onclick = function () { if (isW) { state.view = 'pc'; var lw = document.getElementById('vthLapWrap'); if (lw) { lw.style.display = 'none'; } } else { pcWhole(); } build(); }; bd.appendChild(wv); }
    if (sp.mode !== 'full') {
      bd.appendChild(row(sp.stack ? '위아래 바꾸기' : '좌우 바꾸기', chk(sp, 'reverse', build, true)));
      bd.appendChild(row('위아래로 쌓기', chk(sp, 'stack', build), '모바일은 보통 위아래로 쌓습니다'));
      if (c.device === 'mobile' && sp.stack) { bd.appendChild(row('아래 칸 글씨 자동 배치', chk(sp, 'flow', build))); }
      if (sp.stack) {
        if (!sp.fit) { sp.fit = 'screen'; }
        bd.appendChild(row('쌓는 방식', sel(sp, 'fit', [['screen', '한 화면 안에서 나누기 (사진 + 칸이 화면 꽉)'], ['below', '사진은 화면 꽉 + 아래 칸은 내려서 보기']], build)));
        if (sp.fit === 'below') { bd.appendChild(row(areaNames(sp)[1].split(' (')[0] + ' 높이(화면%)', rng(sp, 'sideH', 15, 100))); }
      }
      bd.appendChild(row('두 칸 사이 간격', rng(sp, 'gap', 0, 80)));
    }
    if (RESP && state.dev === 'pc' && sp.mode !== 'full' && state.cfg.mobile) { mobSplitBox(c); }
    bd.appendChild(h4('높이'));
    bd.appendChild(row('높이 방식', sel(h, 'mode', [['screen', '화면 꽉 차게'], ['vh', '화면의 몇 %'], ['px', '픽셀로'], ['ratio', '비율로 (16:9 등)']], build, true)));
    if (h.mode === 'ratio') { if (!h.ratio) { h.ratio = '16:9'; } bd.appendChild(row('비율 (가로:세로)', sel(h, 'ratio', [['21:9', '21:9'], ['16:9', '16:9'], ['3:2', '3:2'], ['4:3', '4:3'], ['1:1', '1:1'], ['4:5', '4:5'], ['3:4', '3:4'], ['9:16', '9:16']], null, true))); }
    if (h.mode === 'vh') { bd.appendChild(row('화면 %', rng(h, 'vh', 20, 120))); }
    if (h.mode === 'px') { bd.appendChild(row('픽셀', rng(h, 'px', 200, 1600, 10))); }
    if (h.mode !== 'px' && h.mode !== 'ratio') { bd.appendChild(row('머리말 높이 빼기', chk(h, 'minusHeader', null, true))); }
    bd.appendChild(row('좌우 끝까지', chk(c, 'bleed', null, true)));
    bd.appendChild(h4('바깥 여백 (화면 전체 둘레)'));
    var all = { v: f.t }; var r = rng(all, 'v', 0, 300), fr4 = {};
    /* 3.9: 끌기·키보드 입력·Enter·칸 벗어나기 모두 네 방향에 바로 적용(다시 그리지 않아 입력 칸이 안 닫힘) */
    var put4 = function (v) { v = Math.max(0, Math.min(300, num(v))); f.t = f.r = f.b = f.l = v; ['t', 'r', 'b', 'l'].forEach(function (k) { var w = fr4[k]; if (!w) { return; } [].forEach.call(w.querySelectorAll('input'), function (i) { if (i !== document.activeElement) { i.value = v; } }); }); changed(true); };
    [].forEach.call(r.querySelectorAll('input'), function (i) {
      i.addEventListener('input', function () { put4(i.value); });
      i.addEventListener('change', function () { put4(i.value); });
      i.addEventListener('keydown', function (e) { if (e.key === 'Enter') { put4(i.value); i.blur(); } });
      i.addEventListener('blur', function () { put4(i.value); });
    });
    bd.appendChild(row('네 방향 같이', r));
    fr4.t = rng(f, 't', 0, 300); fr4.r = rng(f, 'r', 0, 300); fr4.b = rng(f, 'b', 0, 300); fr4.l = rng(f, 'l', 0, 300);
    bd.appendChild(row('위', fr4.t)); bd.appendChild(row('오른쪽', fr4.r));
    bd.appendChild(row('아래', fr4.b)); bd.appendChild(row('왼쪽', fr4.l));
    bd.appendChild(row('여백·간격 색', col(f, 'color'))); bd.appendChild(row('칸 모서리 둥글게', rng(f, 'radius', 0, 80)));
    var go = document.createElement('button'); go.className = 'on'; go.style.cssText = 'width:100%;margin-top:12px;padding:9px';
    go.textContent = '다음: ② 이 화면에 맞는 스타일 고르기 →'; go.onclick = function () { state.tab = 'style'; build(); };
    bd.appendChild(go);
  }
  /* 4.1 PC가 나눈 화면일 때 휴대폰에서 어떻게 보일지(휴대폰 설정을 여기서 바로) */
  function mobSplitBox(pc) {
    var mo = state.cfg.mobile, ms = mo.split = mo.split || {}, cur = ms.mode && ms.mode !== 'full' ? 'stack' : 'full';
    bd.appendChild(h4('📱 휴대폰일 때 (PC ' + layoutName(pc.split) + ')'));
    bd.appendChild(tip('PC·노트북은 위처럼 ' + layoutName(pc.split) + '로 나뉘고, 휴대폰은 폭이 좁아서 여기서 따로 정한 대로 보여요. 8:2·7:3·5:5 등 어떤 나눔이든 이 칸에서 정해요. 고치면 📱 휴대폰 창에서 바로 보여요(움직임 없음).'));
    var o = { m: cur };
    bd.appendChild(row('휴대폰 화면', sel(o, 'm', [['stack', '위아래로 쌓기 (사진 + 작은 칸)'], ['full', '한 화면 (작은 칸 없이, 글씨는 사진 위)']], function () { mobMode(pc, o.m); }, true)));
    if (cur === 'stack') {
      var ord = { v: ms.reverse ? 'side' : 'main' };
      bd.appendChild(row('위에 올 칸', sel(ord, 'v', [['main', '사진 칸이 위'], ['side', '글 칸이 위']], function () { ms.reverse = ord.v === 'side'; state._lbl = '휴대폰: 위에 올 칸 ' + (ms.reverse ? '글 칸' : '사진 칸'); changed(false); build(); }, true)));
      bd.appendChild(row('사진 칸 높이 (%)', rng(ms, 'ratio', 20, 85)));
      bd.appendChild(row('아래 칸 글씨 자동 배치', chk(ms, 'flow', build)));
      bd.appendChild(tip(ms.flow ? '글 칸 글씨를 차례로 놓아 겹치거나 잘리지 않게 하고, 본문 14px·제목 20px 이상, 버튼은 누르기 좋은 높이. 글 칸 높이는 글 높이에 맞춰요(빈 칸 없음). 휴대폰은 큰 칸이 위 — 사진 칸이 절반보다 작은 4:6·3:7·2:8 은 글 칸이 위, 사진 칸은 그 아래에 100px 넘는 띠로(글이 짧으면 글 칸 위아래 여백을 늘려 큰 칸으로 둬요).' : '끄면 아래 칸 글씨를 직접 끌어 옮길 수 있어요(겹치거나 잘릴 수 있어요).'));
      if (!ms.fit) { ms.fit = 'screen'; }
      bd.appendChild(row('쌓는 방식', sel(ms, 'fit', [['screen', '한 화면 안에서 나누기 (사진 + 칸이 화면 꽉)'], ['below', '사진은 화면 꽉 + 아래 칸은 내려서 보기']], build)));
      if (ms.fit === 'below') { bd.appendChild(row('작은 칸 높이 (화면%)', rng(ms, 'sideH', 15, 100))); }
      bd.appendChild(tip('작은 칸 글씨 위치·크기는 📱 휴대폰 창이나 ✏️휴대폰에서 다듬어요.'));
    } else {
      bd.appendChild(tip('휴대폰에서는 작은 칸이 없어지고, 작은 칸에 있던 글씨는 사진 위로 옮겨 보여요.'));
    }
    var tb2 = document.createElement('button'); tb2.textContent = '📱 휴대폰 글씨 겹침 정리'; tb2.style.cssText = 'margin:6px 6px 0 0'; tb2.onclick = function () { msg('휴대폰 화면에 그려 보는 중…'); mobTidy(null, false); }; bd.appendChild(tb2);
    var wb = document.createElement('button'); wb.textContent = '📱 휴대폰 창으로 보기'; wb.style.marginTop = '6px';
    wb.onclick = function () { if (!winOpen('mob')) { winToggle('mob'); } else { try { state.wins.mob.focus(); } catch (e) { } } };
    bd.appendChild(wb);
  }
  function mobMode(pc, m) {
    var mo = state.cfg.mobile, ms = mo.split = mo.split || {}, ps = pc.split || {}, pb = pc.blocks || [];
    if (state.ed) { state.ed.mobFull = m !== 'stack'; }
    if (m === 'stack') {
      var was = ms.mode; ms.mode = 'ratio'; ms.stack = true; if (was === 'full' || !was || !num(ms.ratio)) { ms.ratio = Math.max(20, Math.min(85, num(ps.ratio, 80))); } if (!ms.fit) { ms.fit = 'screen'; } if (ms.flow == null || was === 'full' || !was) { ms.flow = true; }
      ['sideType', 'sideColor', 'sideImg', 'sfx', 'sfy', 'sov', 'sovColor', 'sgrad'].forEach(function (k) { if (ps[k] !== undefined) { ms[k] = ps[k]; } });
      var pj = -1; pb.forEach(function (b, i) { if (b._pm && pj < 0) { pj = i; } });
      (mo.blocks || []).forEach(function (b, i) { if (!b._pm) { b.area = (i !== pj && pb[i] && pb[i].area) || 'main'; } });
      sideDupFix(mo);
      if (!(mo.blocks || []).some(function (b) { return b.area === 'side'; })) { sideFill(mo, pj); }
      if (was === 'full' || !was) { mobBigTop(mo); } else { mobSideAll(mo); }
    } else {
      ms.mode = 'full'; sideUnfill(mo); (mo.blocks || []).forEach(function (b) { b.area = 'main'; });
    }
    setBase(); state._lbl = '휴대폰 화면: ' + (m === 'stack' ? '위아래로 쌓기' : '한 화면'); state.sel = 0;
    changed(false); build(); msg(m === 'stack' ? '휴대폰은 위아래로 쌓아 보여요. 📱 휴대폰 창에서 확인하세요.' : '휴대폰은 작은 칸 없이 한 화면으로 보여요.'); mobTidy(null, true);
  }
  function tArea(c) {
    var sp = c.split, nm = areaNames(sp), split = sp.mode !== 'full';
    if (!split) { state.area = 'main'; }
    if (split) {
      bd.appendChild(tip('꾸밀 칸을 고르세요. 칸마다 사진·어둡게·글씨 여백이 따로 적용됩니다.'));
      var g = document.createElement('div'); g.className = 'lay'; g.style.gridTemplateColumns = '1fr 1fr';
      [['main', nm[0]], ['side', nm[1]]].forEach(function (a) {
        var b = document.createElement('button'); b.textContent = a[1]; if (state.area === a[0]) { b.className = 'on'; }
        b.onclick = function () { state.area = a[0]; build(); }; g.appendChild(b);
      });
      bd.appendChild(g);
    }
    if (state.area === 'main') {
      bd.appendChild(h4((split ? nm[0] : '사진') + ' — 사진·영상'));
      tMedia(c);
      bd.appendChild(h4((split ? nm[0] : '사진') + ' — 어둡게 덮기'));
      bd.appendChild(row('진하기 0~100', rng(c.overlay, 'amount', 0, 100)));
      bd.appendChild(row('덮개 색', col(c.overlay, 'color')));
      bd.appendChild(row('방향', sel(c.overlay, 'grad', GRADS, null, true)));
      bd.appendChild(h4('글씨 안쪽 여백'));
      bd.appendChild(row('여백 %', rng(c, 'pad', 0, 20)));
    } else {
      if (sp.sfx == null) { sp.sfx = 50; } if (sp.sfy == null) { sp.sfy = 50; } if (sp.sov == null) { sp.sov = 0; } if (sp.spad == null) { sp.spad = num(c.pad, 5); }
      bd.appendChild(h4(nm[1] + ' — 사진·배경'));
      bd.appendChild(row('배경', sel(sp, 'sideType', [['image', '사진'], ['color', '단색']], build)));
      if (sp.sideType === 'image') {
        bd.appendChild(row('사진', imgField(sp, 'sideImg')));
        bd.appendChild(row('가로 중심 %', rng(sp, 'sfx', 0, 100)));
        bd.appendChild(row('세로 중심 %', rng(sp, 'sfy', 0, 100)));
        bd.appendChild(h4(nm[1] + ' — 어둡게 덮기'));
        bd.appendChild(row('진하기 0~100', rng(sp, 'sov', 0, 100)));
        bd.appendChild(row('덮개 색', col(sp, 'sovColor')));
        bd.appendChild(row('방향', sel(sp, 'sgrad', GRADS, null, true)));
        bd.appendChild(row('사진 없을 때 색', col(sp, 'sideColor')));
      } else {
        bd.appendChild(row('배경색', col(sp, 'sideColor')));
      }
      bd.appendChild(h4('글씨 안쪽 여백'));
      bd.appendChild(row('여백 %', rng(sp, 'spad', 0, 20)));
    }
    bd.appendChild(tip('글씨를 다른 칸으로 옮기려면 "④ 글씨·버튼"에서 글씨를 고르고 "놓을 칸"을 바꾸세요.'));
  }
  var GRADS = [['none', '전체 고르게'], ['bottom', '아래로 갈수록 진하게'], ['top', '위로 갈수록'], ['right', '오른쪽으로'], ['left', '왼쪽으로'], ['radial', '가장자리 진하게']];
  function tStyle(c) {
    var sp = c.split, mob = c.device === 'mobile';
    if (RESP) { delBar('main'); stOrigRow('main'); }
    if (RESP && state.cfg.mobile) { var tb = document.createElement('button'); tb.textContent = '📱💻 휴대폰·노트북 글씨 겹침 정리'; tb.title = '휴대폰(390)·노트북(1024) 화면에 그려 보고 겹치거나 화면 밖으로 나간 글씨를 옮겨요(큰 PC 화면이 나빠지면 안 바꿈). 스타일을 고르면 저절로도 해요.'; tb.style.cssText = 'width:100%;margin:0 0 8px'; tb.onclick = function () { msg('휴대폰·노트북 화면에 그려 보는 중…'); allTidy(null, false); }; bd.appendChild(tb); }
    sigList();
    layoutButtons(c, '지금 화면 방식: ' + layoutName(sp) + ' (바꾸면 맞는 스타일 목록으로 바뀝니다)');
    styleList(c);
  }
  /* 6.3 나눔 기본값: 작은 칸이 비어 보이지 않게 버튼 칸을 옮겨 넣음(원래 자리는 _pm에 적어 두었다가 전체 화면으로 돌아가면 되돌림) */
  function sideInk(sp) { if (sp.sideType === 'image' && sp.sideImg) { return '#ffffff'; } var m = /^#?([0-9a-f]{6})$/i.exec(sp.sideColor || '#ffffff'); if (!m) { return '#111111'; } var n = parseInt(m[1], 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 150 ? '#111111' : '#ffffff'; }
  function sideFill(c, idx) {
    var bl = c.blocks || [], sp = c.split, ink = sideInk(sp), pick = [], k;
    if (bl.some(function (b) { return b.area === 'side'; })) { return -1; }
    if (num(sp.ratio, 80) <= 40) { for (k = 0; k < bl.length; k++) { if (bl[k].type === 'buttons' ? (bl[k].items || []).length : String(bl[k].html || '').replace(/<[^>]*>/g, '').trim()) { pick.push(k); } } }
    else { if (typeof idx === 'number' && bl[idx] && bl[idx].type === 'buttons') { pick.push(idx); } for (k = 0; !pick.length && k < bl.length; k++) { if (bl[k].type === 'buttons' && (bl[k].items || []).length) { pick.push(k); } } }
    if (!pick.length) {
      /* 첫 화면에 메뉴 버튼 칸이 없으면 작은 칸에 실제 큰 분류(브랜드·여자·남자·키즈 — 쇼핑몰 줄의 items, 없으면 기본 값) 메뉴 버튼을 만들어 넣음.
         전에는 첫 화면 사진을 한 번 더 넣어 같은 사진이 두 번 보였음. 만든 칸은 _auto 표시(전체 화면으로 돌아가면 지움) */
      var it = num(sp.ratio, 80) > 40 ? its(c) : [];
      if (it.length) {
        var mobA = c.device === 'mobile';
        var nb = baseBlock({ type: 'buttons', html: '', area: 'side', pos: 'mc', x: 0, y: 0, w: 90, align: 'center', font: 'Noto Sans KR', size: mobA ? 15 : 20, weight: 700, gap: sp.stack ? (mobA ? 17 : 40) : 28, bdir: sp.stack ? 'row' : 'col', color: ink, bcolor: ink, items: it });
        nb._auto = 1; bl.push(nb); c.blocks = bl; return bl.length - 1;
      }
      if (!(sp.sideType === 'image' && sp.sideImg) && c.media && c.media.src) { sp._sw = { sideType: sp.sideType }; sp.sideType = 'image'; sp.sideImg = c.media.src; } return -1;
    }
    var n = pick.length, ys = n === 1 ? [0] : n === 2 ? [-9, 9] : pick.map(function (q, t) { return Math.round(-14 + t * 28 / (n - 1)); });
    pick.forEach(function (q, t) {
      var b = bl[q];
      b._pm = { area: b.area, pos: b.pos, x: b.x, y: b.y, w: b.w, align: b.align, bdir: b.bdir, gap: b.gap, color: b.color, bcolor: b.bcolor };
      b.area = 'side'; b.pos = 'mc'; b.x = 0; b.y = ys[t]; b.w = 90; b.align = 'center'; b.color = ink; b.bcolor = ink;
      if (b.type === 'buttons') { b.bdir = sp.stack || n > 1 ? 'row' : 'col'; if (!sp.stack && n === 1) { b.gap = Math.min(num(b.gap, 40), 28); } }
    });
    return pick[0];
  }
  /* 작은 칸에 글·버튼 없이 첫 화면 사진만 한 번 더 들어가 있으면(예전 방식) 단색 칸으로 되돌림 → 그 뒤 sideFill 이 메뉴 버튼을 넣음 */
  function sideDupFix(c) {
    var sp = c && c.split; if (!sp || !c.media) { return; }
    if (sp.sideType === 'image' && sp.sideImg && sp.sideImg === c.media.src && !(c.blocks || []).some(function (b) { return b.area === 'side'; })) { sp.sideType = 'color'; sp.sideImg = ''; delete sp._sw; }
  }
  function sideUnfill(c) {
    var bl0 = c.blocks || []; for (var q0 = bl0.length - 1; q0 >= 0; q0--) { if (bl0[q0]._auto) { bl0.splice(q0, 1); } } if (state && state.sel >= bl0.length) { state.sel = 0; }
    (c.blocks || []).forEach(function (b) { if (b._pm) { for (var k in b._pm) { if (b._pm.hasOwnProperty(k)) { b[k] = b._pm[k]; } } delete b._pm; } });
    var sp = c.split; if (sp && sp._sw) { sp.sideType = sp._sw.sideType; sp.sideImg = ''; delete sp._sw; }
  }
  /* 6.3 휴대폰 나눔 = 큰 칸 위·작은 칸 아래(원칙서 2번). 사진 칸이 절반보다 작은 비율(4:6·3:7·2:8)을 고르면 글 칸이 위로, 8:2~5:5 는 사진 칸이 위.
     비율을 고르는 순간에만 정함(그 뒤 '위에 올 칸'을 손으로 바꾸면 그대로 둠) */
  function mobBigTop(c) {
    var sp = c && c.split; if (!sp || c.device !== 'mobile' || sp.mode === 'full' || !sp.stack) { return; }
    sp.reverse = num(sp.ratio, 80) < 50; delete sp.flowK; mobSideAll(c);
  }
  /* 사진 칸이 절반보다 작은 휴대폰 화면: 사진 칸이 얇은 띠가 되므로 사진 위에 놓였던 글·버튼도 모두 글 칸으로(원래 자리는 _pm 에 적어 둠) */
  function mobSideAll(c) {
    var sp = c && c.split; if (!sp || c.device !== 'mobile' || sp.mode === 'full' || !sp.stack || !sp.flow || sp.fit === 'below' || num(sp.ratio, 80) >= 50) { return; }
    var ink = sideInk(sp);
    (c.blocks || []).forEach(function (b) {
      if (b.area === 'side') { return; }
      if (!(b.type === 'buttons' ? (b.items || []).length : String(b.html || '').replace(/<[^>]*>/g, '').trim())) { return; }
      if (!b._pm) { b._pm = { area: b.area, pos: b.pos, x: b.x, y: b.y, w: b.w, align: b.align, bdir: b.bdir, gap: b.gap, color: b.color, bcolor: b.bcolor }; }
      b.area = 'side'; b.pos = 'mc'; b.x = 0; b.y = 0; b.w = 90; b.align = 'center'; b.color = ink; b.bcolor = ink;
      if (b.type === 'buttons') { b.bdir = 'row'; }
    });
  }
  /* 지금 고치는 폭(from)의 화면 방식을 다른 폭(to)이 따라감: PC 나눔 ↔ 휴대폰 위아래 쌓기 */
  function layFollow(from, to, m) {
    var fs = from.split, ts = to.split = to.split || {}, fb = from.blocks || [], tb = to.blocks || [], toMob = to.device === 'mobile';
    if (m === 'full') { if (ts.mode && ts.mode !== 'full') { ts.mode = 'full'; sideUnfill(to); tb.forEach(function (b) { b.area = 'main'; }); } return ''; }
    if (toMob && state.ed && state.ed.mobFull) { return ' 휴대폰은 전에 고르신 "한 화면" 그대로예요(바꾸려면 아래 📱 휴대폰일 때).'; }
    var was = ts.mode;
    ts.mode = 'ratio'; if (!ts.fit) { ts.fit = 'screen'; }
    if (toMob) { ts.stack = true; ts.ratio = Math.max(20, Math.min(85, num(fs.ratio, 80))); if (ts.flow == null || was === 'full' || !was) { ts.flow = true; } } else { ts.ratio = num(fs.ratio, 80); }
    ['sideType', 'sideColor', 'sideImg', 'sfx', 'sfy', 'sov', 'sovColor', 'sgrad'].forEach(function (k) { if (fs[k] !== undefined && k !== '_sw') { ts[k] = fs[k]; } });
    sideDupFix(to);
    if (was === 'full' || !was || tb.some(function (b) { return b._pm || b._auto; }) || !tb.some(function (b) { return b.area === 'side'; })) {
      if (was && was !== 'full') { sideUnfill(to); }
      var j = -1; fb.forEach(function (b, i) { if (b._pm && j < 0) { j = i; } });
      tb.forEach(function (b, i) { b.area = (!fb[i] || fb[i]._pm) ? 'main' : (fb[i].area || 'main'); });
      if (!tb.some(function (b) { return b.area === 'side'; })) { sideFill(to, j); }
    }
    if (toMob) { mobBigTop(to); }
    return toMob ? ' 휴대폰도 같이 위아래로 쌓았어요(큰 칸이 위 — ' + (ts.reverse ? '글 칸 ' + (100 - ts.ratio) + ' : 사진 칸 ' + ts.ratio : '사진 칸 ' + ts.ratio + ' : 글 칸은 글 높이만큼') + '). 휴대폰만 한 화면으로 하려면 아래 "📱 휴대폰일 때".' : ' PC도 같이 좌우 ' + (ts.ratio / 10) + ' : ' + (10 - ts.ratio / 10) + '로 나눴어요.';
  }
  /* PC 전체 화면 줄여 보기: 편집 칸에 가려지는 오른쪽(작은 칸)까지 한눈에. 지금 창 크기 그대로를 줄여서 보여 줌(끌어 옮기기·고치기 그대로) */
  function pcWhole() {
    state.dev = 'pc'; state.view = 'lap'; var fw = document.getElementById('vthFrameWrap'); if (fw) { fw.style.display = 'none'; }
    if (typeof pvClose === 'function' && PV && PV.on) { pvClose(); }
    openLaptop([Math.max(1024, innerWidth), Math.max(600, innerHeight)]); state.sel = 0;
  }
  function layoutButtons(c, title) {
    var sp = c.split, mob = c.device === 'mobile';
    bd.appendChild(h4(title));
    var g1 = document.createElement('div'); g1.className = 'lay';
    [['full', '전체 화면'], [80, '8 : 2'], [70, '7 : 3'], [60, '6 : 4'], [50, '5 : 5'], [40, '4 : 6'], [30, '3 : 7'], [20, '2 : 8']].forEach(function (l) {
      var b = document.createElement('button'); b.textContent = l[1];
      if (l[0] === 'full' ? sp.mode === 'full' : (sp.mode !== 'full' && num(sp.ratio) === l[0])) { b.className = 'on'; }
      b.onclick = function () {
        var cc = C(), s2 = cc.split, was = s2.mode, both = RESP && state.sync !== false && state.cfg.pc && state.cfg.mobile, other = both ? (mob ? state.cfg.pc : state.cfg.mobile) : null, note = '';
        if (l[0] === 'full') { s2.mode = 'full'; sideUnfill(cc); if (other) { layFollow(cc, other, 'full'); } }
        else {
          s2.mode = 'ratio'; s2.ratio = l[0];
          if (mob) { s2.stack = true; if (s2.flow == null || was === 'full') { s2.flow = true; } } if (!s2.fit) { s2.fit = 'screen'; }
          if (was === 'full' && s2.sideType === 'image' && !s2.sideImg) { s2.sideType = 'color'; } /* 전에는 첫 화면 사진을 작은 칸에 한 번 더 넣었음(같은 사진 두 번) → 단색 칸에 글·메뉴 */
          sideDupFix(cc);
          if (was === 'full' || !was) { sideFill(cc); } else if ((cc.blocks || []).some(function (b) { return b._pm || b._auto; })) { sideUnfill(cc); sideFill(cc); } else if (!(cc.blocks || []).some(function (b) { return b.area === 'side'; })) { sideFill(cc); }
          if (mob) { mobBigTop(cc); }
          if (other) { note = layFollow(cc, other, 'split'); }
          if (!mob && RESP && state.view !== 'lap' && innerWidth >= 1024 && !document.documentElement.classList.contains('vth-pop') && !P.classList.contains('min')) { pcWhole(); note += ' 작은 칸이 편집 칸 밑에 가려져서 PC 전체 화면을 줄여서 보여 드려요(위 ✏️PC를 누르면 원래 화면).'; }
        }
        changed(false); build(); msg('화면 방식을 "' + layoutName(s2) + '"(으)로 바꿨습니다.' + note + ' "② 스타일"에서 어울리는 스타일을 골라 보세요.');
        if (RESP && l[0] !== 'full' && typeof allTidy === 'function') { allTidy(null, true); }
      };
      g1.appendChild(b);
    });
    bd.appendChild(g1);
  }
  function styleList(c) {
    var sp = c.split;
    var kind = sp.mode === 'full' ? 'full' : 'split';
    var sideF = 1 - num(sp.ratio, 80) / 100;
    function fits(tag) { return kind === 'full' || !tag || tag === 'any' || (tag === 'narrow' && sideF <= 0.3001) || (tag === 'wide' && sideF >= 0.3999); }
    var all = PRESETS.filter(function (p) { return p[4] === kind && fits(p[8]); });
    var comps = (kind === 'full' ? COMPS_FULL : COMPS_SPLIT).filter(function (cp) { return fits(cp[3]); });
    var sf = state.sf = state.sf || {};
    if (sf.kind !== kind) { sf.kind = kind; sf.g = 'all'; sf.t = 'all'; }
    bd.appendChild(h4((kind === 'full' ? '전체 화면' : layoutName(sp)) + '에 맞는 스타일 (모두 ' + all.length + '가지)'));
    if (kind === 'split') { bd.appendChild(tip(sideF <= 0.3 ? '작은 칸이 좁은 비율이라, 좁은 칸용 구도(세로 메뉴·세로 숫자 등)까지 보여요.' : sideF >= 0.4 ? '작은 칸이 넓은 비율이라, 넓은 칸용 구도(반반 대비·잡지 펼침면·두 사진 메뉴 등)까지 보여요.' : '이 비율에서는 어느 칸에나 맞는 구도가 보여요.')); }
    bd.appendChild(tip('구도와 분위기(글꼴·색)를 골라 걸러 보세요. 고르면 바로 바뀌고, 화면 방식·사진·버튼 링크·띠는 그대로입니다. 고른 뒤 모든 글씨는 "④ 글씨·버튼"에서 크기·기울기·글꼴·색·위치 등 전부 고칠 수 있어요.'));
    function chipRow(label, opts, key) {
      bd.appendChild(tip(label));
      var w = document.createElement('div'); w.className = 'chips';
      opts.forEach(function (o) {
        var x = document.createElement('button'); x.textContent = o[1]; if (sf[key] === o[0]) { x.className = 'on'; }
        x.onclick = function () { sf[key] = o[0]; build(); }; w.appendChild(x);
      });
      bd.appendChild(w);
    }
    chipRow('구도', [['all', '전체'], ['rec', '추천(직접 만든 것)']].concat(comps.map(function (cp) { return [cp[0], cp[1]]; })), 'g');
    chipRow('분위기 (글꼴·색)', [['all', '전체']].concat(THEMES.map(function (T) { return [T.id, T.n]; })), 't');
    var list = all.filter(function (p) {
      var g0 = p[5] || 'rec', t0 = p[6] || '';
      if (sf.g !== 'all' && sf.g !== g0) { return false; }
      if (sf.t !== 'all' && sf.t !== t0) { return false; }
      return true;
    });
    bd.appendChild(tip('보이는 스타일: ' + list.length + '가지'));
    var g = document.createElement('div'); g.className = 'presets';
    list.filter(function (p) { return !(RESP && isHid('main', p[0])); }).forEach(function (p) {
      var b = document.createElement('button'), T = p[7];
      var sw = T ? '<span style="display:inline-flex;gap:2px;margin-top:4px"><i style="width:12px;height:12px;border-radius:50%;background:' + T.acc + ';border:1px solid #ddd"></i><i style="width:12px;height:12px;border-radius:50%;background:' + T.sideBg + ';border:1px solid #ddd"></i><i style="width:12px;height:12px;border-radius:50%;background:' + T.sideTx + ';border:1px solid #ddd"></i></span>' : '';
      b.innerHTML = '<b>' + p[1] + '</b><small>' + p[2] + '</small>' + sw;
      b.onclick = function () { applyPreset(p); };
      g.appendChild(RESP ? delWrap('main', p[0], b) : b);
    });
    bd.appendChild(g);
    bd.appendChild(h4('편하게 쓰는 법'));
    bd.appendChild(tip('① 화면의 글씨를 마우스로 끌어 옮길 수 있어요. ② 글씨를 누르면 그 글씨의 설정이 열려요. ③ ↶↷로 되돌리기. ④ 다 되면 아래 "카페24에 바로 저장".'));
  }
  /* 2.7: 크기별 사진·세로로 긴 화면용 사진 */
  function imgExtras(m) {
    bd.appendChild(h4('크기별 사진 (선택)'));
    bd.appendChild(tip('같은 사진을 폭만 다르게(예: 1440·1920) 올려 두면, 손님 화면 폭에 맞는 것 하나만 받아서 더 빨리 떠요. 폭(px)은 사진을 올리면 저절로 들어가요. 위 "사진"의 폭(' + (num(m.w) || '?') + 'px)도 같이 씁니다.'));
    (m.sizes || []).forEach(function (it, i) {
      var w = document.createElement('span'); w.style.cssText = 'display:flex;gap:6px;flex:1;flex-wrap:wrap;align-items:center';
      var n = document.createElement('input'); n.type = 'number'; n.min = 100; n.max = 6000; n.value = num(it.w) || ''; n.placeholder = '폭'; n.style.width = '70px';
      n.oninput = function () { it.w = num(n.value); changed(false); };
      var x = document.createElement('button'); x.textContent = '빼기'; x.onclick = function () { m.sizes.splice(i, 1); if (!m.sizes.length) { delete m.sizes; } changed(false); build(); };
      w.appendChild(n); w.appendChild(imgField(it, 'src', function () { n.value = num(it.w) || ''; })); w.appendChild(x);
      bd.appendChild(row('폭 ' + (num(it.w) || '?') + 'px', w));
    });
    var add = document.createElement('button'); add.textContent = '크기 하나 더';
    add.onclick = function () { m.sizes = m.sizes || []; m.sizes.push({ src: '', w: 0, h: 0 }); build(); };
    bd.appendChild(add);
    bd.appendChild(h4('휴대폰용 세로 사진 (선택)'));
    bd.appendChild(tip('화면 너비가 좁을 때(휴대폰)만 이 사진을 보여 줘요. 너비로 고르기 때문에 스크롤해서 주소창이 접혀도 사진이 바뀌지 않아요. 비워 두면 위 사진 하나만 써요.'));
    var T = m.tall || { src: '', w: 0, h: 0, ratio: '7/10' };
    var keep = function () { if (T.src) { m.tall = T; } else { delete m.tall; } changed(false); };
    bd.appendChild(row('세로 사진', imgField(T, 'src', keep)));
    var TW = { v: T.ratio === '3/4' ? '3/4' : '7/10' };
    bd.appendChild(row('이럴 때 보이기', sel(TW, 'v', [['7/10', '휴대폰에서만 (화면 너비 767px 이하)'], ['3/4', '태블릿 세로까지 (화면 너비 1023px 이하)']], function () { T.ratio = TW.v; keep(); })));
  }
  function tMedia(c) {
    var m = c.media;
    bd.appendChild(row('종류', sel(m, 'type', [['image', '사진 1장'], ['none', '사진 없이 배경색만'], ['anim', '움직이는 사진 (영상→WebP)'], ['slides', '여러 장 슬라이드'], ['video', '동영상(mp4 주소)']], build)));
    if (m.type === 'image') { bd.appendChild(row('사진', imgField(m, 'src'))); imgExtras(m); }
    if (m.type === 'none' || m.type === 'image') { if (!c.mainBg) { c.mainBg = '#111111'; } bd.appendChild(row(m.type === 'none' ? '배경색' : '사진 없을 때 색', col(c, 'mainBg'))); }
    if (m.type === 'none') { return; }
    if (m.type === 'anim') {
      bd.appendChild(row('첫 장면 사진', imgField(m, 'src')));
      var aw = document.createElement('span'); aw.style.cssText = 'display:flex;gap:6px;flex:1;flex-wrap:wrap';
      var at = txt(m, 'anim', '/web/upload/... 움직이는 webp 주소'); at.style.minWidth = '160px';
      var ab = document.createElement('button'); ab.textContent = '움직이는 사진 올리기';
      ab.onclick = function () { pickRaw(function (u) { m.anim = u; at.value = u; changed(false); }); };
      aw.appendChild(at); aw.appendChild(ab); bd.appendChild(row('움직이는 사진', aw));
      bd.appendChild(tip('첫 장면 사진이 먼저 바로 보이고(속도 유지), 화면이 다 뜬 뒤 움직이는 사진으로 바뀝니다. 움직이는 사진은 줄이지 않고 그대로 올립니다. PC·모바일은 따로 넣으세요.'));
    }
    if (m.type === 'slides') {
      var ta = document.createElement('textarea'); ta.rows = 5; ta.value = (m.slides || []).join('\n'); ta.placeholder = '사진 주소를 한 줄에 하나씩';
      ta.onchange = function () { m.slides = ta.value.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean); changed(false); };
      bd.appendChild(row('사진들', ta));
      var add = document.createElement('button'); add.textContent = '+ 사진 올려서 추가';
      add.onclick = function () { pickUpload(function (u) { m.slides = (m.slides || []).concat([u]); changed(false); build(); }); };
      bd.appendChild(add);
      bd.appendChild(row('한 장 시간(초)', rng(m, 'slideSec', 2, 15, 1, false)));
    }
    if (m.type === 'video') {
      bd.appendChild(row('영상 주소', txt(m, 'video', 'https://... .mp4')));
      bd.appendChild(row('첫 장면 사진', imgField(m, 'poster')));
      bd.appendChild(tip('첫 장면 사진이 먼저 바로 보이고, 영상은 화면이 다 뜬 뒤 재생됩니다(속도 유지). 영상은 소리 없이 반복 재생됩니다.'));
      if (c.device === 'mobile') { bd.appendChild(row('모바일 영상', sel(m, 'videoMobile', [['poster', '사진만 (가장 빠름)'], ['video', '영상도 재생']], null))); }
    }
    bd.appendChild(h4('사진 중심 (잘릴 때 남길 부분)'));
    bd.appendChild(row('가로 위치 %', rng(m, 'fx', 0, 100)));
    bd.appendChild(row('세로 위치 %', rng(m, 'fy', 0, 100)));
    bd.appendChild(row('배경 고정', chk(m, 'fixed', null, true), '스크롤할 때 사진은 멈춰 있고 내용이 위로 덮입니다(지금 메인 방식)'));
    motionRow(m);
  }
  function tText(c) {
    var chips = document.createElement('div'); chips.className = 'chips';
    c.blocks.forEach(function (b, i) {
      var t = b.type === 'buttons' ? '버튼: ' + (b.items || []).map(function (x) { return x.t; }).join(' ') : String(b.html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      var bt = document.createElement('button'); bt.textContent = (i + 1) + '. ' + (t || '(빈 글씨)'); if (i === state.sel) { bt.className = 'on'; }
      bt.onclick = function () { state.sel = i; state.selKind = 'block'; markSel(); build(); }; chips.appendChild(bt);
    });
    bd.appendChild(chips);
    var bar = document.createElement('div'); bar.className = 'chips';
    [['+ 글씨', function () { c.blocks.push(baseBlock({ html: '새 글씨', size: c.device === 'mobile' ? 24 : 40 })); state.sel = c.blocks.length - 1; }],
     ['+ 버튼 묶음', function () { c.blocks.push(baseBlock({ type: 'buttons', items: [{ t: 'SHOP', u: '/product/list.html?cate_no=2459' }], size: 16, weight: 700, bstyle: 'outline' })); state.sel = c.blocks.length - 1; }],
     ['복제', function () { var b = clone(c.blocks[state.sel]); b.id = newId(); b.x = num(b.x) + 3; b.y = num(b.y) + 3; c.blocks.splice(state.sel + 1, 0, b); state.sel++; }],
     ['위로', function () { if (state.sel > 0) { var b = c.blocks.splice(state.sel, 1)[0]; c.blocks.splice(--state.sel, 0, b); } }],
     ['아래로', function () { if (state.sel < c.blocks.length - 1) { var b = c.blocks.splice(state.sel, 1)[0]; c.blocks.splice(++state.sel, 0, b); } }],
     ['삭제', function () { if (c.blocks.length) { c.blocks.splice(state.sel, 1); state.sel = Math.max(0, state.sel - 1); msg('지웠습니다. Ctrl+Z로 되돌릴 수 있어요.'); } }]
    ].forEach(function (a) { var b = document.createElement('button'); b.textContent = a[0]; b.onclick = function () { state.selKind = 'block'; a[1](); changed(false); build(); }; bar.appendChild(b); });
    bd.appendChild(bar);
    bd.appendChild(tip('⌨ 글씨를 누른 뒤: 방향키 = 0.1%씩 이동, Shift+방향키 = 1%씩, Delete = 삭제, Ctrl+C = 복사, Ctrl+V = 붙여넣기, Ctrl+X = 잘라내기, Ctrl+D = 바로 복제, Esc = 선택 해제 (PC에서 복사해 모바일에 붙여넣어도 크기가 맞춰져요)'));
    var b = c.blocks[state.sel]; if (!b) { bd.appendChild(tip('"+ 글씨"로 추가하세요.')); return; }

    if (c.split.mode !== 'full') { bd.appendChild(row('놓을 칸', sel(b, 'area', [['main', '사진 칸'], ['side', '작은 칸']], null))); }
    if (b.type === 'buttons') { buttonsEditor(b); } else { richEditor(b); }

    bd.appendChild(h4('위치'));
    var g = document.createElement('div'); g.className = 'grid9';
    ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br'].forEach(function (p) {
      var bt = document.createElement('button'); bt.textContent = { tl: '↖', tc: '↑', tr: '↗', ml: '←', mc: '●', mr: '→', bl: '↙', bc: '↓', br: '↘' }[p]; if (b.pos === p) { bt.className = 'on'; }
      bt.onclick = function () { b.pos = p; b.x = 0; b.y = 0; changed(true); build(); }; g.appendChild(bt);
    });
    bd.appendChild(row('기준 자리', g));
    bd.appendChild(row('가로 이동 %', rng(b, 'x', -60, 60, 0.5)));
    bd.appendChild(row('세로 이동 %', rng(b, 'y', -60, 60, 0.5)));
    bd.appendChild(row('최대 너비 %', rng(b, 'w', 10, 100)));
    bd.appendChild(tip('화면에서 글씨를 직접 끌어도 됩니다.'));

    bd.appendChild(h4('글꼴·크기'));
    bd.appendChild(row('글꼴', sel(b, 'font', FONT_OPTS, null)));
    bd.appendChild(row('크기 px', rng(b, 'size', 6, 400)));
    bd.appendChild(row('굵기', sel(b, 'weight', WEIGHTS, null, true)));
    bd.appendChild(row('기울임', chk(b, 'italic', null, true)));
    bd.appendChild(row('글자 색', col(b, 'color')));
    bd.appendChild(row('글자 간격', rng(b, 'ls', -200, 1000, 5)));
    bd.appendChild(tip('글자 간격은 포토샵 자간과 같은 단위입니다(예: -90).'));
    bd.appendChild(row('줄 간격', rng(b, 'lh', 0.6, 3, 0.02)));
    bd.appendChild(row('정렬', sel(b, 'align', [['left', '왼쪽'], ['center', '가운데'], ['right', '오른쪽'], ['justify', '양쪽']], null, true)));
    bd.appendChild(row('대소문자', sel(b, 'upper', [['none', '그대로'], ['uppercase', '모두 대문자'], ['lowercase', '모두 소문자'], ['capitalize', '첫 글자만 대문자']], null, true)));

    bd.appendChild(h4('모양·효과'));
    bd.appendChild(row('회전(대각선)', rng(b, 'rotate', -180, 180)));
    bd.appendChild(row('좌우 뒤집기', chk(b, 'flipX', null, true)));
    bd.appendChild(row('위아래 뒤집기', chk(b, 'flipY', null, true)));
    bd.appendChild(row('위 잘림 %', rng(b, 'clipT', 0, 60)));
    bd.appendChild(row('아래 잘림 %', rng(b, 'clipB', 0, 60)));
    bd.appendChild(row('테두리 글씨', rng(b, 'stroke', 0, 10, 0.5)));
    bd.appendChild(row('테두리 색', col(b, 'strokeColor')));
    bd.appendChild(row('속 채우기', chk(b, 'fill', null, true)));
    bd.appendChild(row('그림자', rng(b, 'shadow', 0, 40)));
    bd.appendChild(row('뒤 배경 상자', col(b, 'bg', true)));
    bd.appendChild(row('상자 여백', rng(b, 'bgPad', 0, 60)));
    bd.appendChild(row('투명도', rng(b, 'opacity', 5, 100)));
    if (b.type !== 'buttons') {
      bd.appendChild(row('글씨 전체 링크', txt(b, 'link', '/product/list.html?cate_no=...')));
      bd.appendChild(row('제목 종류', sel(b, 'tag', [['h1', '제목1 (페이지 대표)'], ['h2', '제목2'], ['h3', '제목3'], ['p', '문단'], ['div', '일반']], null), '검색엔진용. 보통 큰 제목은 제목2'));
    }
  }
  function buttonsEditor(b) {
    bd.appendChild(h4('버튼들'));
    (b.items || []).forEach(function (it, i) {
      var w = document.createElement('span'); w.style.cssText = 'display:flex;gap:4px;flex:1';
      var t = txt(it, 't', '글씨'); t.style.width = '90px'; t.style.flex = 'none';
      var u = txt(it, 'u', '링크'); var x = document.createElement('button'); x.textContent = '×';
      x.onclick = function () { b.items.splice(i, 1); changed(false); build(); };
      w.appendChild(t); w.appendChild(u); w.appendChild(x); bd.appendChild(row('버튼 ' + (i + 1), w));
    });
    var add = document.createElement('button'); add.textContent = '+ 버튼 추가';
    add.onclick = function () { b.items.push({ t: 'NEW', u: '/' }); changed(false); build(); }; bd.appendChild(add);
    bd.appendChild(row('모양', sel(b, 'bstyle', [['text', '글씨만'], ['underline', '밑줄'], ['outline', '테두리'], ['solid', '꽉 찬 상자'], ['pill', '둥근 알약']], null, true)));
    bd.appendChild(row('배치', sel(b, 'bdir', [['row', '가로로'], ['col', '세로로']], null, true)));
    bd.appendChild(row('버튼 간격', rng(b, 'gap', 0, 200)));
    bd.appendChild(row('버튼 글씨색', col(b, 'bcolor')));
    bd.appendChild(row('상자 색', col(b, 'bbg')));
    bd.appendChild(row('마우스 올림 색', col(b, 'bhover')));
  }

  function richEditor(b) {
    bd.appendChild(h4('글 내용'));
    var tb = document.createElement('div'); tb.className = 'tb';
    var ed = document.createElement('div'); ed.className = 'ed'; ed.contentEditable = 'true'; ed.innerHTML = b.html;
    ed.style.fontFamily = ff(b.font);
    var pendingSize = 1, range = null;
    function fixSizes() {
      var fs = ed.querySelectorAll('font[size="7"]');
      for (var i = 0; i < fs.length; i++) { var sp = document.createElement('span'); sp.style.fontSize = pendingSize + 'em'; sp.innerHTML = fs[i].innerHTML; fs[i].parentNode.replaceChild(sp, fs[i]); }
    }
    function save() { fixSizes(); b.html = cleanHtml(ed.innerHTML); changed(false); }
    function cmd(c, v) { ed.focus(); try { document.execCommand('styleWithCSS', false, c === 'hiliteColor' || c === 'foreColor'); } catch (e) { } document.execCommand(c, false, v); save(); }
    function btn(label, title, fn) { var x = document.createElement('button'); x.innerHTML = label; x.title = title; x.onmousedown = function (e) { e.preventDefault(); }; x.onclick = fn; tb.appendChild(x); return x; }
    function saveRange() { var s = window.getSelection(); if (s.rangeCount && ed.contains(s.anchorNode)) { range = s.getRangeAt(0).cloneRange(); } }
    function restoreRange() { if (!range) { return; } var s = window.getSelection(); s.removeAllRanges(); s.addRange(range); }
    function wrapSel(style) {
      var s = window.getSelection(); if (!s.rangeCount || !ed.contains(s.anchorNode) || s.isCollapsed) { return; }
      var r = s.getRangeAt(0), sp = document.createElement('span'); sp.setAttribute('style', style);
      try { sp.appendChild(r.extractContents()); r.insertNode(sp); } catch (e) { } save();
    }
    btn('<b>B</b>', '두껍게', function () { cmd('bold'); });
    btn('<i>I</i>', '기울임', function () { cmd('italic'); });
    btn('<u>U</u>', '밑줄', function () { cmd('underline'); });
    btn('<s>S</s>', '취소선', function () { cmd('strikeThrough'); });
    btn('x²', '위 첨자', function () { cmd('superscript'); });
    btn('x₂', '아래 첨자', function () { cmd('subscript'); });
    btn('⯇', '왼쪽 정렬', function () { b.align = 'left'; cmd('justifyLeft'); });
    btn('≡', '가운데 정렬', function () { b.align = 'center'; cmd('justifyCenter'); });
    btn('⯈', '오른쪽 정렬', function () { b.align = 'right'; cmd('justifyRight'); });
    btn('☰', '양쪽 정렬', function () { b.align = 'justify'; cmd('justifyFull'); });
    var fc = document.createElement('input'); fc.type = 'color'; fc.title = '고른 글자 색'; fc.value = '#c4001f';
    fc.onmousedown = function () { saveRange(); }; fc.onchange = function () { restoreRange(); cmd('foreColor', fc.value); }; tb.appendChild(fc);
    var hc = document.createElement('input'); hc.type = 'color'; hc.title = '형광펜(글자 뒤 색)'; hc.value = '#fff200';
    hc.onmousedown = function () { saveRange(); }; hc.onchange = function () { restoreRange(); cmd('hiliteColor', hc.value); }; tb.appendChild(hc);
    var fs = document.createElement('select'); fs.title = '고른 글자 크기';
    [['', '크기'], ['0.5', '50%'], ['0.7', '70%'], ['0.85', '85%'], ['1.2', '120%'], ['1.5', '150%'], ['2', '200%'], ['3', '300%']].forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; fs.appendChild(op); });
    fs.onmousedown = function () { saveRange(); };
    fs.onchange = function () { if (!fs.value) { return; } restoreRange(); pendingSize = num(fs.value, 1); cmd('fontSize', '7'); fs.value = ''; };
    tb.appendChild(fs);
    var fn = document.createElement('select'); fn.title = '고른 글자 글꼴';
    var o0 = document.createElement('option'); o0.value = ''; o0.textContent = '글꼴'; fn.appendChild(o0);
    FONTS.forEach(function (f) { var op = document.createElement('option'); op.value = f[0]; op.textContent = f[1]; fn.appendChild(op); });
    fn.onmousedown = function () { saveRange(); };
    fn.onchange = function () { if (!fn.value) { return; } restoreRange(); cmd('fontName', fn.value); fn.value = ''; };
    tb.appendChild(fn);
    btn('Aa', '고른 글자 대문자', function () { wrapSel('text-transform:uppercase'); });
    btn('aa', '고른 글자 소문자', function () { wrapSel('text-transform:lowercase'); });
    btn('• 목록', '글머리 목록', function () { cmd('insertUnorderedList'); });
    btn('→', '들여쓰기', function () { cmd('indent'); });
    btn('←', '내어쓰기', function () { cmd('outdent'); });
    btn('🔗', '링크 걸기', function () { var u = prompt('연결할 주소를 넣으세요 (예: /product/list.html?cate_no=2459)'); if (u) { cmd('createLink', u); } });
    btn('↶', '되돌리기', function () { cmd('undo'); });
    btn('↷', '다시하기', function () { cmd('redo'); });
    btn('지우개', '서식 지우기', function () { cmd('removeFormat'); });
    ed.oninput = function () { save(); };
    ed.onkeyup = saveRange; ed.onmouseup = saveRange;
    bd.appendChild(tb); bd.appendChild(ed);
    bd.appendChild(tip('글씨 일부를 드래그로 고른 뒤 버튼을 누르면 그 부분만 바뀝니다. 엔터로 줄을 바꿉니다.'));
  }

  /* ---------- 움직이는 띠 탭 ---------- */
  var BAND_PRESETS = [
    ['아래 띠 칸 · SALE', '사진 9 + 띠 1 (아래)', [{ mode: 'zone', pos: 'bottom', zone: 10, bg: '#111111', font: 'Libre Caslon Text', italic: true, ls: -40, text: 'SALE  SALE  SALE  SALE', speed: 25 }]],
    ['위 띠 칸 · 공지', '빨간 얇은 띠 (위)', [{ mode: 'zone', pos: 'top', zone: 5, bg: '#c4001f', font: 'Inter', weight: 700, ls: 150, text: 'NEW ARRIVALS EVERY WEEK  ·  UP TO 90% SALE  ·', speed: 30 }]],
    ['위·아래 띠 칸', '편집샵처럼 위아래 둘 다', [{ mode: 'zone', pos: 'top', zone: 5, bg: '#ffffff', color: '#111111', font: 'Inter', weight: 700, ls: 200, text: SH.EN + '  ·  WEEKLY DROP  ·', speed: 30 },
      { mode: 'zone', pos: 'bottom', zone: 9, bg: '#111111', font: 'Anton', ls: 20, text: 'SALE  SALE  SALE  SALE', speed: 22, dir: 'right' }]],
    ['왼쪽 세로 띠 칸', '왼쪽에 세로로 흐름', [{ mode: 'zone', pos: 'left', zone: 5, bg: '#f1efe9', color: '#111111', font: 'Bebas Neue', ls: 100, text: SH.EN + '  ·  ', dir: 'up', speed: 20 }]],
    ['오른쪽 세로 띠 칸', '오른쪽에 세로로 흐름', [{ mode: 'zone', pos: 'right', zone: 5, bg: '#111111', font: 'Bebas Neue', ls: 100, text: 'UP TO 90% SALE  ·  ', dir: 'down', speed: 20 }]],
    ['네 방향 띠 칸', '사진 둘레를 띠로 감싸기', [{ mode: 'zone', pos: 'top', zone: 4, bg: '#111111', font: 'Inter', weight: 700, ls: 200, text: 'NEW IN  ·  ', speed: 30 },
      { mode: 'zone', pos: 'bottom', zone: 4, bg: '#111111', font: 'Inter', weight: 700, ls: 200, text: 'SALE  ·  ', speed: 30, dir: 'right' },
      { mode: 'zone', pos: 'left', zone: 3, bg: '#111111', font: 'Inter', weight: 700, ls: 200, text: 'VINTAGE  ·  ', speed: 30, dir: 'down' },
      { mode: 'zone', pos: 'right', zone: 3, bg: '#111111', font: 'Inter', weight: 700, ls: 200, text: 'TALK  ·  ', speed: 30, dir: 'up' }]],
    ['사진 위 SALE (잘린 글씨)', '처음 세일 강조 방식', [{ mode: 'over', pos: 'bottom', text: 'SALE  SALE  SALE  SALE', font: 'Libre Caslon Text', size: 140, ls: -90, clipT: 12, clipB: 18 }]],
    ['가운데 반투명 띠', '사진 가운데를 지나는 띠', [{ mode: 'over', pos: 'middle', bg: 'rgba(0,0,0,.45)', font: 'Anton', size: 70, ls: 40, text: 'UP TO 90% SALE  ·  ', speed: 24 }]],
    ['대각선 노란 테이프', '공사장 테이프 느낌', [{ mode: 'over', pos: 'custom', y: 72, rotate: -7, bg: '#f2d64b', color: '#111111', font: 'Anton', size: 44, ls: 60, text: 'SALE  ·  SALE  ·  SALE  ·  ', speed: 18 }]],
    ['X자 테이프 두 줄', '노랑 + 검정 교차', [{ mode: 'over', pos: 'custom', y: 45, rotate: -8, bg: '#f2d64b', color: '#111111', font: 'Anton', size: 42, ls: 60, text: 'SALE  ·  SALE  ·  ', speed: 18 },
      { mode: 'over', pos: 'custom', y: 58, rotate: 8, bg: '#111111', font: 'Anton', size: 42, ls: 60, text: 'NEW IN  ·  NEW IN  ·  ', speed: 18, dir: 'right' }]],
    ['빨간 사선 띠', '왼쪽 위 → 오른쪽 아래', [{ mode: 'over', pos: 'custom', y: 30, rotate: 12, bg: '#c4001f', font: 'Bebas Neue', size: 50, ls: 120, text: 'UP TO 90% OFF  ·  ', speed: 20 }]],
    ['세로 띠 (사진 위 오른쪽)', '배경 없이 세로 글씨', [{ mode: 'over', pos: 'right', y: 3, font: 'Bebas Neue', size: 60, ls: 200, text: 'NEW IN  ·  ', dir: 'down', opacity: 85 }]],
    ['세로 띠 (사진 위 왼쪽)', '배경 없이 세로 글씨', [{ mode: 'over', pos: 'left', y: 3, font: 'Playfair Display', italic: true, size: 56, ls: 0, text: 'vintage talk  —  ', dir: 'up', opacity: 85 }]],
    ['테두리 글씨 큰 띠', '속이 빈 거대한 글씨', [{ mode: 'over', pos: 'middle', size: 240, stroke: 1.5, font: 'Anton', ls: 20, text: 'VINTAGE  VINTAGE  ', speed: 40, opacity: 70 }]],
    ['위아래 반대로 흐르는 띠', '두 줄이 서로 반대로', [{ mode: 'over', pos: 'top', font: 'Bodoni Moda', italic: true, size: 90, ls: -20, text: 'vintage  edit  ', speed: 30, opacity: 90 },
      { mode: 'over', pos: 'bottom', font: 'Bodoni Moda', italic: true, size: 90, ls: -20, text: 'vintage  edit  ', speed: 30, dir: 'right', opacity: 90 }]],
    ['비 내리는 SALE', '세로 글씨가 떨어짐', [{ mode: 'rain', count: 14, size: 40, font: 'Anton', text: 'SALE SALE SALE', speed: 20, opacity: 80 }]],
    ['비 내리는 빨간 글씨', '빨간 90% OFF', [{ mode: 'rain', count: 10, size: 50, font: 'Bebas Neue', color: '#c4001f', text: '90% OFF', speed: 24 }]],
    ['위로 올라가는 글씨', '거품처럼 위로', [{ mode: 'rain', count: 12, size: 34, font: 'Playfair Display', italic: true, text: 'vintage', dir: 'up', speed: 28, opacity: 70 }]],
    ['깜빡이는 SALE 도장', '여기저기 나타났다 사라짐', [{ mode: 'float', count: 6, size: 70, font: 'Anton', color: '#c4001f', text: 'SALE', rotate: 18, speed: 16 }]],
    ['떠다니는 손글씨', '이탤릭 글씨가 반짝', [{ mode: 'float', count: 5, size: 60, font: 'Playfair Display', italic: true, text: 'vintage', rotate: 12, speed: 20 }]]
  ];
  /* ---- 11/09 띠 대량 추가: 손으로 만든 것 + (띠 모양 × 색 조합) ---- */
  BAND_PRESETS.push(
    ['비 내리는 한글 세일', '세일 · 할인 글씨가 떨어짐', [{ mode: 'rain', count: 12, size: 42, font: 'Black Han Sans', text: '세일 할인 세일', speed: 22, opacity: 85 }]],
    ['비 내리는 별', '★ ✦ 반짝이는 별비', [{ mode: 'rain', count: 18, size: 30, font: 'Inter', text: '★  ✦  ★', speed: 26, opacity: 75 }]],
    ['비 내리는 가격표', '$ $ $ 글씨비', [{ mode: 'rain', count: 14, size: 44, font: 'Abril Fatface', text: '$ $ $', color: '#f2d64b', speed: 20 }]],
    ['깜빡이는 NEW', '여기저기 NEW 도장', [{ mode: 'float', count: 7, size: 60, font: 'Bebas Neue', text: 'NEW', color: '#ffffff', rotate: 15, speed: 14, bg: '' }]],
    ['깜빡이는 별', '★가 반짝반짝', [{ mode: 'float', count: 10, size: 40, font: 'Inter', text: '★', color: '#f2d64b', rotate: 20, speed: 10 }]],
    ['깜빡이는 한글 도장', '신상 · 세일 · 할인', [{ mode: 'float', count: 6, size: 64, font: 'Black Han Sans', text: '신상', color: '#c4001f', rotate: 14, speed: 16 }, { mode: 'float', count: 5, size: 56, font: 'Black Han Sans', text: '세일', color: '#ffffff', rotate: 14, speed: 18 }]],
    ['떠다니는 타자기 글씨', 'vintage 1990', [{ mode: 'float', count: 6, size: 40, font: 'Special Elite', text: 'vintage 1990', color: '#efe6d2', rotate: 8, speed: 22 }]],
    ['두꺼운 아래 띠 칸 (20%)', '사진 8 + 띠 2', [{ mode: 'zone', pos: 'bottom', zone: 20, bg: '#111111', font: 'Anton', ls: 10, text: 'SALE  SALE  SALE  ', speed: 30 }]],
    ['아주 얇은 위 띠 칸', '작은 공지 한 줄', [{ mode: 'zone', pos: 'top', zone: 3, bg: '#111111', font: 'Inter', weight: 600, ls: 250, text: 'FREE GIFT WITH EVERY ORDER  ·  WEEKLY DROP  ·', speed: 35 }]],
    ['세 줄 대각선 테이프', '노랑 · 검정 · 빨강', [{ mode: 'over', pos: 'custom', y: 35, rotate: -9, bg: '#f2d64b', color: '#111111', font: 'Anton', size: 40, ls: 60, text: 'SALE  ·  ', speed: 16 },
      { mode: 'over', pos: 'custom', y: 52, rotate: 6, bg: '#111111', font: 'Anton', size: 40, ls: 60, text: 'NEW IN  ·  ', speed: 18, dir: 'right' },
      { mode: 'over', pos: 'custom', y: 70, rotate: -4, bg: '#c4001f', font: 'Anton', size: 40, ls: 60, text: 'UP TO 90%  ·  ', speed: 20 }]],
    ['세로 테두리 글씨 (오른쪽)', '속이 빈 세로 글씨', [{ mode: 'over', pos: 'right', y: 2, font: 'Anton', size: 130, stroke: 1.5, text: 'VINTAGE  ', dir: 'down', speed: 30, opacity: 70 }]],
    ['양쪽 세로 띠', '왼쪽 위로 · 오른쪽 아래로', [{ mode: 'over', pos: 'left', y: 2, font: 'Bebas Neue', size: 54, ls: 200, text: SH.EN + '  ·  ', dir: 'up' }, { mode: 'over', pos: 'right', y: 2, font: 'Bebas Neue', size: 54, ls: 200, text: 'WEEKLY DROP  ·  ', dir: 'down' }]],
    ['가운데 큰 이탤릭 흐름', '배경 없이 큰 손글씨', [{ mode: 'over', pos: 'middle', font: 'Playfair Display', italic: true, size: 200, ls: -30, text: 'vintage talk  ', speed: 45, opacity: 60 }]],
    ['사진 위 아래 반투명 공지', '검은 반투명 띠', [{ mode: 'over', pos: 'bottom', bg: 'rgba(0,0,0,.55)', font: 'Inter', weight: 600, size: 22, ls: 200, text: 'NEW ARRIVALS EVERY WEEK  ·  UP TO 90% SALE  ·  ', speed: 30 }]]
  );
  var BAND_PALS = [['black', '블랙', '#111111', '#ffffff'], ['white', '화이트', '#ffffff', '#111111'], ['red', '레드', '#c4001f', '#ffffff'], ['yellow', '옐로', '#f2d64b', '#111111'],
    ['cream', '크림', '#f1efe9', '#2b2b2b'], ['navy', '네이비', '#0b1f3a', '#f1e6c8'], ['green', '그린', '#1f2a24', '#e9e4d8'], ['orange', '오렌지', '#ff4d00', '#111111']];
  var BAND_DESIGNS = [
    ['아래 띠 칸 · 굵은 글씨', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 9, bg: b, color: f, font: 'Anton', ls: 20, text: 'SALE  SALE  SALE  SALE', speed: 24 }]; }],
    ['위 띠 칸 · 공지', function (b, f) { return [{ mode: 'zone', pos: 'top', zone: 4.5, bg: b, color: f, font: 'Inter', weight: 700, ls: 200, text: 'NEW ARRIVALS EVERY WEEK  ·  UP TO 90% SALE  ·', speed: 32 }]; }],
    ['아래 띠 칸 · 이탤릭 세리프', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 10, bg: b, color: f, font: 'Playfair Display', italic: true, ls: -30, text: 'vintage  edit  ', speed: 28 }]; }],
    ['대각선 테이프', function (b, f) { return [{ mode: 'over', pos: 'custom', y: 70, rotate: -7, bg: b, color: f, font: 'Anton', size: 44, ls: 60, text: 'SALE  ·  SALE  ·  ', speed: 18 }]; }],
    ['반대 대각선 테이프', function (b, f) { return [{ mode: 'over', pos: 'custom', y: 30, rotate: 8, bg: b, color: f, font: 'Bebas Neue', size: 50, ls: 120, text: 'NEW IN  ·  NEW IN  ·  ', speed: 18, dir: 'right' }]; }],
    ['가운데 띠', function (b, f) { return [{ mode: 'over', pos: 'middle', bg: b, color: f, font: 'Oswald', weight: 700, size: 60, ls: 80, text: 'UP TO 90% SALE  ·  ', speed: 24 }]; }],
    ['왼쪽 세로 띠 칸', function (b, f) { return [{ mode: 'zone', pos: 'left', zone: 5, bg: b, color: f, font: 'Bebas Neue', ls: 100, text: SH.EN + '  ·  ', dir: 'up', speed: 20 }]; }],
    ['오른쪽 세로 띠 칸', function (b, f) { return [{ mode: 'zone', pos: 'right', zone: 5, bg: b, color: f, font: 'Bebas Neue', ls: 100, text: 'UP TO 90% SALE  ·  ', dir: 'down', speed: 20 }]; }],
    ['위·아래 띠 칸', function (b, f) { return [{ mode: 'zone', pos: 'top', zone: 4.5, bg: b, color: f, font: 'Inter', weight: 700, ls: 200, text: SH.EN + '  ·  WEEKLY DROP  ·', speed: 30 }, { mode: 'zone', pos: 'bottom', zone: 8, bg: b, color: f, font: 'Anton', ls: 20, text: 'SALE  SALE  SALE  ', speed: 22, dir: 'right' }]; }],
    ['타자기 공지 띠', function (b, f) { return [{ mode: 'zone', pos: 'top', zone: 5, bg: b, color: f, font: 'Special Elite', ls: 60, text: 'vintage clothing since today  ·  ', speed: 34 }]; }],
    ['블랙레터 띠', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 10, bg: b, color: f, font: 'UnifrakturMaguntia', ls: 0, text: 'Vintage  Talk  ', speed: 30 }]; }],
    ['아르데코 띠', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 8, bg: b, color: f, font: 'Limelight', ls: 120, text: 'VINTAGE SALE  ·  ', speed: 28 }]; }],
    ['한글 포스터 띠', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 9, bg: b, color: f, font: 'Black Han Sans', ls: 0, text: '세일  최대 90%  세일  ', speed: 24 }]; }],
    ['레트로 띠 (70년대)', function (b, f) { return [{ mode: 'zone', pos: 'bottom', zone: 10, bg: b, color: f, font: 'Shrikhand', ls: 0, text: 'groovy sale  ', speed: 26 }]; }]
  ];
  BAND_DESIGNS.forEach(function (d) { BAND_PALS.forEach(function (p) { BAND_PRESETS.push([d[0] + ' · ' + p[1], '배경 ' + p[1], d[1](p[2], p[3]), null, p[0], d[0]]); }); });
  function bandCat(arr) {
    var o = arr[0] || {};
    if (o.mode === 'rain') { return 'rain'; } if (o.mode === 'float') { return 'float'; }
    if (o.mode === 'zone') { return (o.pos === 'left' || o.pos === 'right') ? 'vzone' : 'zone'; }
    if (o.pos === 'left' || o.pos === 'right') { return 'vover'; }
    return num(o.rotate) ? 'tape' : 'over';
  }
  var BAND_CATS = [['all', '전체'], ['zone', '띠 칸 (위·아래)'], ['vzone', '세로 띠 칸'], ['over', '사진 위 띠'], ['tape', '대각선 테이프'], ['vover', '세로 띠'], ['rain', '비 내리는 글씨'], ['float', '깜빡이는 글씨']];
  var BAND_MODES = [['zone', '띠 칸 (사진을 줄이고 자리 차지)'], ['over', '사진 위에 흐르는 띠'], ['rain', '비 내리듯 떨어지는 글씨'], ['float', '여기저기 깜빡이는 글씨']];
  function tMq(c) {
    normBands(c);
    var B2 = c.bands, mob = c.device === 'mobile';
    bd.appendChild(h4('빠르게 추가 (모두 ' + BAND_PRESETS.length + '가지)'));
    bd.appendChild(tip('누를 때마다 띠가 하나씩 더해집니다. 스타일을 바꿔도 띠는 그대로 남아요. 띠 칸은 사진 높이를 줄여 자리를 차지합니다 (예: 사진 9 + 띠 1 = 전체 10).'));
    var bf = state.bf = state.bf || { cat: 'all', pal: 'all' };
    function bchips(opts, key) {
      var w = document.createElement('div'); w.className = 'chips';
      opts.forEach(function (o) { var x = document.createElement('button'); x.textContent = o[1]; if (bf[key] === o[0]) { x.className = 'on'; } x.onclick = function () { bf[key] = o[0]; build(); }; w.appendChild(x); });
      bd.appendChild(w);
    }
    bd.appendChild(tip('종류')); bchips(BAND_CATS, 'cat');
    bd.appendChild(tip('띠 색')); bchips([['all', '전체'], ['hand', '직접 만든 것']].concat(BAND_PALS.map(function (p) { return [p[0], p[1]]; })), 'pal');
    var blist = BAND_PRESETS.filter(function (p) {
      if (bf.cat !== 'all' && bandCat(p[2]) !== bf.cat) { return false; }
      if (bf.pal === 'hand' && p[4]) { return false; }
      if (bf.pal !== 'all' && bf.pal !== 'hand' && p[4] !== bf.pal) { return false; }
      return true;
    });
    bd.appendChild(tip('보이는 띠: ' + blist.length + '가지'));
    var g = document.createElement('div'); g.className = 'presets';
    blist.forEach(function (p) {
      var b = document.createElement('button'), o0 = p[2][0] || {};
      var sw = '<span style="display:inline-block;margin-top:4px;padding:1px 6px;border-radius:3px;font-size:10px;background:' + (o0.bg || '#777') + ';color:' + (o0.color || '#fff') + ';border:1px solid #ddd">' + esc(String(o0.text || '').trim().slice(0, 12)) + '</span>';
      b.innerHTML = '<b>' + p[0] + '</b><small>' + p[1] + '</small>' + sw;
      b.onclick = function () {
        var fixH = false;
        p[2].forEach(function (o) { var nb = bandOf(o); if (mob) { nb.size = Math.max(12, Math.round(nb.size * 0.42)); } B2.push(nb); if (mob && nb.pos === 'bottom' && !c.height.minusHeader && c.height.mode !== 'px') { fixH = true; } });
        if (fixH) { c.height.minusHeader = true; }
        state.bsel = B2.length - 1; state.selKind = 'band'; changed(false); build();
        msg('"' + p[0] + '" 띠를 더했습니다.' + (fixH ? ' 모바일은 사진 아래가 화면 밖(머리말 높이만큼)으로 나가 있어서, 띠가 보이도록 "머리말 높이 빼기"를 켰습니다.' : ''));
      };
      g.appendChild(b);
    });
    bd.appendChild(g);
    var add = document.createElement('button'); add.textContent = '+ 빈 띠 하나 추가'; add.style.marginTop = '8px';
    add.onclick = function () { B2.push(bandOf({ size: mob ? 50 : 120 })); state.bsel = B2.length - 1; state.selKind = 'band'; changed(false); build(); };
    bd.appendChild(add);
    if (!B2.length) { return; }
    if (mob && !c.height.minusHeader && c.height.mode !== 'px' && B2.some(function (x) { return x.pos === 'bottom' && x.on !== false; })) {
      var fx = document.createElement('button'); fx.className = 'on'; fx.style.cssText = 'width:100%;margin:8px 0';
      fx.textContent = '아래 띠가 화면 밖에 있어요 → 사진을 화면 안에 맞추기';
      fx.onclick = function () { c.height.minusHeader = true; changed(false); build(); };
      bd.appendChild(fx);
    }
    bd.appendChild(h4('지금 있는 띠 (' + B2.length + '개) — 눌러서 고치기'));
    var chips = document.createElement('div'); chips.className = 'chips';
    if (state.bsel == null || state.bsel >= B2.length) { state.bsel = 0; }
    B2.forEach(function (b, i) {
      var x = document.createElement('button'); x.textContent = (i + 1) + '. ' + (b.on === false ? '(끔) ' : '') + String(b.text).trim().slice(0, 14);
      if (i === state.bsel) { x.className = 'on'; } x.onclick = function () { state.bsel = i; state.selKind = 'band'; markSel(); build(); }; chips.appendChild(x);
    });
    bd.appendChild(chips);
    bd.appendChild(tip('⌨ 띠를 누른 뒤(화면에서 띠를 눌러도 됨): Delete = 삭제, Ctrl+C·V = 복사·붙여넣기, Ctrl+X = 잘라내기, Ctrl+D = 복제, 방향키 = 위치(사진 위 띠)·칸 크기(띠 칸) 조절, Shift = 크게. 사진 위 띠는 화면에서 위아래로 끌어 옮길 수 있어요.'));
    var b = B2[state.bsel], vert = bandVert(b);
    var tools = document.createElement('div'); tools.className = 'chips';
    [['복제', function () { var nb = clone(b); nb.id = newId(); B2.splice(state.bsel + 1, 0, nb); state.bsel++; }],
      ['위로', function () { if (state.bsel > 0) { B2.splice(state.bsel - 1, 0, B2.splice(state.bsel, 1)[0]); state.bsel--; } }],
      ['아래로', function () { if (state.bsel < B2.length - 1) { B2.splice(state.bsel + 1, 0, B2.splice(state.bsel, 1)[0]); state.bsel++; } }],
      ['삭제', function () { B2.splice(state.bsel, 1); state.bsel = Math.max(0, state.bsel - 1); }],
      ['모두 지우기', function () { if (askOK('띠를 모두 지울까요?')) { B2.length = 0; } }]].forEach(function (t) {
      var x = document.createElement('button'); x.textContent = t[0]; x.onclick = function () { state.selKind = 'band'; t[1](); changed(false); build(); }; tools.appendChild(x);
    });
    bd.appendChild(tools);
    bd.appendChild(row('켜기', chk(b, 'on', build)));
    bd.appendChild(row('종류', sel(b, 'mode', BAND_MODES, build)));
    if (b.mode === 'zone') {
      bd.appendChild(row('위치', sel(b, 'pos', [['bottom', '아래 칸'], ['top', '위 칸'], ['left', '왼쪽 세로 칸'], ['right', '오른쪽 세로 칸']], build)));
      bd.appendChild(row('칸 크기 %', rng(b, 'zone', 2, 40, 0.5), '전체 높이(세로 칸은 너비) 중 띠가 차지하는 비율. 10이면 사진 9 : 띠 1'));
      bd.appendChild(row('글씨를 칸에 맞추기', chk(b, 'fitZone', build, true)));
    }
    if (b.mode === 'over') {
      bd.appendChild(row('위치', sel(b, 'pos', [['bottom', '아래쪽'], ['top', '위쪽'], ['middle', '가운데'], ['custom', '세로 위치 직접'], ['left', '왼쪽 세로'], ['right', '오른쪽 세로']], build)));
      if (b.pos === 'custom') { bd.appendChild(row('세로 위치 %', rng(b, 'y', 0, 100))); }
      if (vert) { bd.appendChild(row('가장자리에서 %', rng(b, 'y', 0, 45))); }
    }
    if (b.mode === 'rain' || b.mode === 'float') { bd.appendChild(row('글씨 개수', rng(b, 'count', 1, 40, 1, false))); }
    if (b.mode !== 'zone') { bd.appendChild(row(b.mode === 'float' ? '흔들림 각도' : '기울기(대각선)', rng(b, 'rotate', -45, 45))); }
    if (c.split.mode !== 'full' && b.mode !== 'zone') { bd.appendChild(row('놓을 곳', sel(b, 'area', [['all', '화면 전체'], ['main', '큰 칸 안에만']], null))); }
    bd.appendChild(h4('글씨'));
    bd.appendChild(row('글씨', txt(b, 'text', 'SALE  SALE  SALE')));
    bd.appendChild(row('글꼴', sel(b, 'font', FONT_OPTS, null)));
    if (!(b.mode === 'zone' && b.fitZone !== false)) { bd.appendChild(row('크기 px', rng(b, 'size', 10, 400))); }
    bd.appendChild(row('굵기', sel(b, 'weight', WEIGHTS, null, true)));
    bd.appendChild(row('기울임', chk(b, 'italic', null, true)));
    bd.appendChild(row('글자 간격', rng(b, 'ls', -200, 600, 5)));
    bd.appendChild(row('반복 사이 간격', rng(b, 'gapEm', 0, 4, 0.1)));
    bd.appendChild(row('대소문자', sel(b, 'upper', [['none', '그대로'], ['uppercase', '대문자'], ['lowercase', '소문자']], null, true)));
    bd.appendChild(row('글자 색', col(b, 'color')));
    bd.appendChild(row('테두리만 (굵기)', rng(b, 'stroke', 0, 5, 0.5)));
    bd.appendChild(row('띠 배경', col(b, 'bg', true)));
    if (b.mode === 'zone' || b.mode === 'over') {
      bd.appendChild(row('위 잘림 %', rng(b, 'clipT', 0, 45)));
      bd.appendChild(row('아래 잘림 %', rng(b, 'clipB', 0, 45)));
    }
    bd.appendChild(h4('움직임'));
    bd.appendChild(row(b.mode === 'float' ? '깜빡 속도(초)' : '한 바퀴 시간(초)', rng(b, 'speed', 3, 120)));
    if (b.mode === 'rain') { bd.appendChild(row('방향', sel(b, 'dir', [['down', '아래로 떨어짐'], ['up', '위로 올라감']], null, true))); }
    else if (b.mode !== 'float') { bd.appendChild(row('방향', sel(b, 'dir', vert ? [['up', '위로'], ['down', '아래로']] : [['left', '왼쪽으로'], ['right', '오른쪽으로']], null, true))); }
    bd.appendChild(row('투명도', rng(b, 'opacity', 5, 100)));
  }
  /* 편집 화면에서 나타나기 움직임을 한 번 보여 줌(가운데 화면·따로 창 포함) */
  function fxPlay() {
    var ds = [document]; try { if (typeof lapDoc === 'function' && lapDoc()) { ds.push(lapDoc()); } } catch (e) { }
    ds.forEach(function (d) { try { var h = d.documentElement; h.classList.remove('vth-fxplay'); void h.offsetWidth; h.classList.add('vth-fxplay'); setTimeout(function () { h.classList.remove('vth-fxplay'); }, 2200); } catch (e) { } });
  }
  function tFx(c) {
    var f = c.fx;
    if (RESP && c.device === 'mobile') { bd.appendChild(tip('휴대폰(1023px 이하)은 움직이는 효과를 모두 끕니다. 여기서 골라도 손님 휴대폰 화면에서는 글씨·사진·띠가 멈춰 있고, 내리면 글씨 사라짐도 꺼집니다.')); }
    bd.appendChild(row('내리면 글씨 사라짐', chk(f, 'scrollFade', null)));
    bd.appendChild(row('처음 나타나기', sel(f, 'entrance', [['none', '없음'], ['fade', '서서히'], ['up', '아래에서 위로 (기본)'], ['blur', '흐림에서 선명하게']], function () { fxPlay(); }, false)));
    var pb = document.createElement('button'); pb.textContent = '▶ 나타나기 다시 보기'; pb.style.cssText = 'margin:0 0 6px'; pb.onclick = function () { fxPlay(); }; bd.appendChild(pb);
    bd.appendChild(tip('PC 기본은 "아래에서 위로"예요(0.7초, 글꼴이 준비돼 글씨가 보이는 순간 시작). 고치는 동안에는 멈춰 있고 손님 화면에서만 움직여요. 움직임 줄이기를 켠 손님과 휴대폰에서는 꺼집니다.'));
    bd.appendChild(tip('글씨 효과와 사진 효과는 따로 움직입니다. 글씨만 올라오게 하려면 아래 "사진 움직임"을 "없음"으로 두세요.'));
    bd.appendChild(row('배경 고정', chk(c.media, 'fixed', null, true)));
    motionRow(c.media);
    if (!f.pageIn) { f.pageIn = 'still'; }
    bd.appendChild(row('다른 페이지에서 들어올 때', sel(f, 'pageIn', [['still', '사진 제자리, 서서히 나타남 (추천)'], ['slide', '화면 전체가 위에서 살짝 내려옴 (사이트 기본)']], null, true)));
  }
  function motionRow(m) {
    if (!m.motion) { m.motion = m.zoom ? 'zoomLoop' : 'none'; }
    m.zoom = false;
    bd.appendChild(row('사진 움직임', sel(m, 'motion', [
      ['none', '없음 (가장 빠름, 추천)'],
      ['zoomIn1', '처음에 크게 → 제자리로 (한 번)'],
      ['zoomOut1', '천천히 다가감 (한 번)'],
      ['zoomLoop', '천천히 확대·축소 반복'],
      ['panX', '좌우로 천천히 이동 (반복)'],
      ['panY', '위아래로 천천히 이동 (반복)'],
      ['drift', '살랑살랑 떠다님 (반복)'],
      ['blurIn', '흐림에서 선명하게 (한 번)'],
      ['darkIn', '어둡다가 밝아짐 (한 번)']
    ], null, true)));
  }
  /* ===== 머리말 탭 (2.4) ===== */
  function applyHdr() {
    if (!state.hdr) { return; }
    if (typeof siteAll === 'function' && state.site && (state.site.notice.on || state.site.popup.on || state.site.totop.on || state.site.font || state.siteLinked)) { try { siteAll(); } catch (e) { } }
    try { if (window.vtImp && typeof window.vtImp.apply === 'function' && state.imp && Object.keys(state.imp.on).length) { setTimeout(function () { window.vtImp.apply({ v: 1, on: impObj() }); }, 0); } } catch (e) { } /* 4.8 머리말 높이 다시 계산(1·4번) */
    var t = VTH.hdrCss(state.hdr);
    [document, state.frame && state.frame.contentDocument, typeof lapDoc === 'function' ? lapDoc() : null].concat(typeof winDocs === 'function' ? winDocs() : []).concat(typeof vtDocs === 'function' ? vtDocs() : []).forEach(function (d) {
      if (!d || !d.head) { return; }
      var st = d.getElementById('vth-hdr-css');
      if (!st) { st = d.createElement('style'); st.id = 'vth-hdr-css'; d.head.appendChild(st); }
      if (st.textContent !== t) { st.textContent = t; }
      VTH.hdrFonts(state.hdr).forEach(function (u) { if (![].some.call(d.querySelectorAll('link[data-vthhf]'), function (l) { return l.href === u; })) { var l = d.createElement('link'); l.rel = 'stylesheet'; l.href = u; l.setAttribute('data-vthhf', '1'); d.head.appendChild(l); } });
    });
  }
  function tHdr(c) {
    if (!SH.hdr || !SH.hdr.sel) { bd.appendChild(tip(SH.KO + '은(는) 아직 머리말 편집 준비가 안 됐어요. (편집기 세션이 쇼핑몰 표에 머리말 칸 이름을 넣어야 함)')); return; }
    if (!RESP) { bd.appendChild(tip('머리말 편집은 PC·휴대폰이 한 디자인인 반응형 디자인에서만 돼요.')); return; }
    if (!state.hdrOn) { bd.appendChild(tip('이 디자인에는 아직 머리말 설정 파일(' + SH.hdr.file + ')이 연결되지 않았어요. 편집기 세션에 "머리말 파일 연결"을 부탁해 주세요.')); return; }
    var h = state.hdr, mob = state.dev === 'mobile', d = h[mob ? 'mobile' : 'pc'];
    bd.appendChild(tip('머리말(로고·분류·아이콘 줄)은 모든 화면에 나와요. 높이를 바꾸면 목록·상세·게시판 윗여백과 메인 높이가 같이 맞춰져요. 위 [PC]·[모바일]로 바꿔 각각 고치고, 아래 "카페24에 바로 저장"을 누르면 메인과 함께 저장돼요.'));
    bd.appendChild(h4((mob ? '휴대폰' : 'PC') + ' 머리말'));
    bd.appendChild(row('높이 (px)', rng(d, 'h', mob ? 40 : 60, mob ? 120 : 260)));
    bd.appendChild(row('로고 크기 (px)', rng(d, 'logoH', 8, mob ? 40 : 80)));
    bd.appendChild(row('로고 자리', sel(d, 'logoPos', [['left', '왼쪽'], ['center', '가운데']], build, true)));
    if (d.logoPos !== 'center') { bd.appendChild(row('로고 왼쪽에서 (px)', rng(d, 'logoX', 0, 200))); }
    if (!mob) { bd.appendChild(row('로고 위에서 (px)', rng(d, 'logoY', 0, 200))); }
    if (!mob) {
      bd.appendChild(row('분류 글자 크기 (px)', rng(d, 'navSize', 0, 30)));
      bd.appendChild(tip('0 = 화면 폭에 맞춰 자동(지금 모양). 크게 해도 좁은 화면에서는 메뉴가 한 줄에 들어가는 만큼까지만 커져요.'));
      bd.appendChild(row('분류 사이 간격 (px)', rng(d, 'navGap', 0, 60)));
      bd.appendChild(tip('0 = 지금 간격. 특별 칩(MD추천·SALE 등)은 원래 간격을 지켜요.'));
    }
    bd.appendChild(row('아이콘 위아래 (px)', rng(d, 'iconY', -60, 60)));
    bd.appendChild(tip('- 는 위로, + 는 아래로 움직여요.'));
    bd.appendChild(h4('PC·휴대폰 같이'));
    bd.appendChild(row('배경색', col(h, 'bg')));
    bd.appendChild(row('스크롤해도 머리말 고정', chk(h, 'fixed', null, true)));
    bd.appendChild(row('사진 위에 겹치기 (메인만)', chk(h, 'overlay', build, true)));
    if (h.overlay) {
      bd.appendChild(row('겹칠 때 글씨·아이콘 흰색', chk(h, 'overlayLight', null, true)));
      bd.appendChild(tip('메인에서만 머리말이 투명해지고 사진이 화면 맨 위부터 꽉 차요. 내리면 원래 머리말로 보여요.'));
    }
    bd.appendChild(h4('메인 첫 화면 높이 (' + (mob ? '휴대폰' : 'PC') + ')'));
    var ht = c.height, full = ht.mode === 'screen';
    var fc = document.createElement('input'); fc.type = 'checkbox'; fc.checked = full;
    fc.onchange = function () { ht.mode = fc.checked ? 'screen' : (ht.ratio ? 'ratio' : 'px'); changed(false); build(); };
    bd.appendChild(row('화면 꽉 채우기', fc));
    if (full) { bd.appendChild(row('머리말 높이 빼기', chk(ht, 'minusHeader', null, true))); bd.appendChild(tip('"머리말 높이 빼기"를 켜면 메인 높이 = 화면 높이 − 머리말 높이. 머리말을 바꾸면 메인이 저절로 맞춰지고 사진은 찌그러지지 않아요.')); }
    else {
      bd.appendChild(row('높이 방식', sel(ht, 'mode', [['px', '정한 높이 (px)'], ['ratio', '비율 (16:9 등)'], ['vh', '화면의 몇 %']], build, true)));
      if (ht.mode === 'px') { bd.appendChild(row('높이 (px)', rng(ht, 'px', 200, 1600, 10))); }
      if (ht.mode === 'ratio') { if (!ht.ratio) { ht.ratio = '16:9'; } bd.appendChild(row('비율 (가로:세로)', sel(ht, 'ratio', [['21:9', '21:9'], ['16:9', '16:9'], ['3:2', '3:2'], ['4:3', '4:3'], ['1:1', '1:1'], ['4:5', '4:5'], ['3:4', '3:4'], ['9:16', '9:16']], null, true))); }
      if (ht.mode === 'vh') { bd.appendChild(row('화면 %', rng(ht, 'vh', 20, 120))); }
    }
    hstDetail(h);
    var rs = document.createElement('button'); rs.textContent = '머리말 처음 값으로';
    rs.onclick = function () { if (!askOK('머리말을 처음 값(편집기를 넣었을 때 모양)으로 되돌릴까요? 저장하기 전에는 손님 화면이 바뀌지 않아요.')) { return; } state.hdr = VTH.hdrDefaults(); changed(true); build(); };
    bd.appendChild(rs);
  }
  /* ===== 머리말 화면 (2.8): ① 머리말 스타일 카드 ===== */
  function hsCard(h) {
    var st = h.st || {}, p = h.pc || {}, fg = st.fg || (st.dark ? '#ffffff' : '#111111'), bar = st.bar && st.bar.text ? st.bar : null;
    var bg = st.glass ? 'linear-gradient(135deg,#8a7a6a,#3c4a5a)' : (h.overlay ? 'linear-gradient(135deg,#9a8b78,#4a5562)' : (h.bg || '#fff'));
    var tc = h.overlay && h.overlayLight !== false && !st.glass ? '#ffffff' : fg;
    var font = st.font ? ff(st.font) : 'inherit', ly = st.layout || (p.logoPos === 'center' ? 'center' : '');
    var logo = '<b style="font:700 ' + (p.logoH > 40 ? 15 : 11) + 'px/1 serif;letter-spacing:.02em;' + (st.logoBox ? 'background:' + st.logoBox + ';color:' + (st.logoBoxInv ? '#fff' : '#2b1d10') + ';padding:2px 4px;' + (st.logoTilt ? 'transform:rotate(' + st.logoTilt + 'deg);' : '') : '') + '">' + esc(SH.EN) + '</b>';
    var navT = '<span style="font-family:' + font + ';' + (st.up ? 'text-transform:uppercase;' : '') + (st.it ? 'font-style:italic;' : '') + 'letter-spacing:' + num(st.ls) + 'em;font-size:9px">' + (st.div === 'box' ? '<i style="border:1px solid;padding:1px 3px;font-style:normal">women</i><i style="border:1px solid;padding:1px 3px;margin-left:-1px;font-style:normal">men</i>' : st.div === 'bar' ? 'women | men | kids' : 'women men kids') + ' <i style="font-style:inherit;font-weight:700;color:' + wsColor(h.overlay && h.overlayLight !== false && !st.glass ? '#222222' : (st.glass ? '#ffffff' : (h.bg || '#ffffff')), tc) + '">wholesale</i></span>'; /* 7.0: 머리말 WHOLESALE(주황 글씨) */
    var ico = '<span style="font-size:9px;font-family:' + font + '">' + (st.icon === 'bracket' ? '[ BAG 0 ]' : st.icon === 'text' ? 'SEARCH BAG(0)' : '⌕ ♡ ▢') + '</span>';
    var row = ly === 'ed' ? '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 6px 0">' + logo + ico + '</div><div style="padding:3px 6px 0;font:800 13px/1.1 sans-serif;letter-spacing:-.02em">MD추천 폴로 브랜드</div><div style="padding:2px 6px 4px">' + navT + '</div>' : ly === 'center' ? '<div style="text-align:center;padding-top:4px">' + logo + '</div><div style="display:flex;justify-content:space-between;align-items:center;padding:3px 6px 4px"><span></span>' + navT + ico + '</div>'
      : (ly === 'row' || ly === 'right') ? '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;padding:7px 6px">' + logo + (ly === 'right' ? '<span style="flex:1"></span>' : '') + navT + ico + '</div>'
        : '<div style="padding:4px 6px 0">' + logo + '</div><div style="display:flex;justify-content:space-between;align-items:center;padding:3px 6px 4px">' + navT + ico + '</div>';
    var ln = function (l, side) { return l ? 'border-' + side + ':' + Math.max(1, Math.round(l.w)) + 'px ' + (l.s || 'solid') + ' ' + (l.c || fg) + ';' : ''; };
    var inner = '<div style="' + (st.glass ? 'margin:5px;border-radius:999px;background:rgba(255,255,255,.75);' : '') + ln(st.lineT, 'top') + ln(st.lineB, 'bottom') + '">' + row + '</div>';
    return '<div style="border:1px solid #ddd;border-radius:6px;overflow:hidden;background:' + bg + ';color:' + tc + ';' + (st.blend ? 'filter:invert(.1);' : '') + 'text-align:left">' +
      (bar ? '<div style="background:' + (bar.bg || '#111') + ';color:' + (bar.fg || '#fff') + ';font:' + num(bar.fw, 500) + ' 8px/14px ' + ff(bar.font || 'Noto Sans KR') + ';white-space:nowrap;overflow:hidden;padding:0 6px;text-align:center">' + esc(bar.text).slice(0, 60) + '</div>' : '') + inner + '</div>';
  }
  function applyHStyle(id, quiet) {
    var n = hstMake(id); if (!n) { return; }
    state.hdr = n; state._hlast = JSON.stringify(n); /* 4.4 스타일 통째로 바꿀 땐 같이 바꾸기(비율 맞춤) 안 함 */ var hsp = HSTYLES.filter(function (x) { return x[0] === id; })[0]; state._lbl = '머리말 스타일: ' + (hsp ? hsp[1] : id); changed(true); flushHist(); build();
    if (!quiet) { var sp = HSTYLES.filter(function (x) { return x[0] === id; })[0]; msg('머리말 "' + sp[1] + '" 스타일을 PC·휴대폰에 함께 적용했습니다. 마음에 들면 "카페24에 바로 저장" (저장 전에는 손님 화면 그대로).'); }
  }
  function tHStyle(c) {
    if (!SH.hdr || !SH.hdr.sel || !RESP || !state.hdrOn) { tHdr(c); return; }
    bd.appendChild(tip('누르면 머리말이 PC·휴대폰 함께 바뀌어요(색·글꼴·선·아이콘·로고 자리 모두 휴대폰도 같은 스타일, 휴대폰은 움직임 없음). 머리말 높이가 바뀌어도 메인 첫 화면과 목록·상세·게시판 윗여백이 저절로 맞춰져요. 세부 값은 "② 세부 조정"에서.'));
    var cur = (state.hdr && state.hdr.st && state.hdr.st.id) || '';
    var b0 = document.createElement('button'); b0.textContent = '처음 머리말로 (지금 모양)'; b0.onclick = function () { state.hdr = VTH.hdrDefaults(); state._hlast = JSON.stringify(state.hdr); changed(true); build(); msg('머리말을 처음 모양으로 되돌렸습니다(저장 전에는 손님 화면 그대로).'); };
    bd.appendChild(b0);
    delBar('hdr'); stOrigRow('hdr');
    var groups = [];
    HSTYLES.forEach(function (x) { if (groups.indexOf(x[2]) < 0) { groups.push(x[2]); } });
    groups.forEach(function (gname) {
      var gl = HSTYLES.filter(function (x) { return x[2] === gname && !isHid('hdr', x[0]); }); if (!gl.length) { return; }
      bd.appendChild(h4(gname));
      var g = document.createElement('div'); g.className = 'presets';
      gl.forEach(function (x) {
        var b = document.createElement('button'); if (cur === x[0]) { b.className = 'on'; }
        b.setAttribute('data-hst', x[0]);
        b.innerHTML = hsCard(hstMake(x[0])) + '<b style="display:block;margin-top:5px">' + x[1] + '</b><small>' + x[3] + '</small>';
        b.onclick = function () { applyHStyle(x[0]); };
        g.appendChild(delWrap('hdr', x[0], b));
      });
      bd.appendChild(g);
    });
  }
  /* ② 세부 조정에 붙는 꾸밈 칸 */
  function hstDetail(h) {
    var st = h.st = h.st || {};
    bd.appendChild(h4('꾸밈 (PC·휴대폰 같이)'));
    bd.appendChild(row('글자색', col(st, 'fg', true)));
    bd.appendChild(row('어두운 바탕 (로고·아이콘 흰색)', chk(st, 'dark', null, true)));
    bd.appendChild(row('분류 글꼴', sel(st, 'font', [['', '그대로']].concat(FONT_OPTS), null, true)));
    bd.appendChild(row('분류 대문자', chk(st, 'up', null, true)));
    bd.appendChild(row('분류 칩(알약)', sel(st, 'chip', [['', '그대로'], ['plain', '알약 없이 글자만'], ['line', '선만']], null, true)));
    bd.appendChild(h4('배치·아이콘 (휴대폰도 맞춰 바뀜)'));
    bd.appendChild(row('배치', sel(st, 'layout', [['', '처음대로 (로고 위·분류 아래)'], ['row', '한 줄 (로고·분류 가운데·아이콘)'], ['center', '분류 가운데 (휴대폰은 로고 가운데)'], ['ed', '큰 메뉴 에디토리얼 (휴대폰은 굵은 메뉴 줄)']], function () { var m = h.mobile = h.mobile || {}; m.logoPos = st.layout === 'center' ? 'center' : 'left'; if (st.layout === 'ed') { m.h = Math.max(num(m.h, 52), 96); } else if (num(m.h) >= 96) { m.h = num((VTH.hdrDefaults().mobile || {}).h, 52); } changed(true); build(); }, true)));
    bd.appendChild(row('아이콘', sel(st, 'icon', [['', '그림'], ['text', '글자 (SEARCH·BAG(0))'], ['bracket', '괄호 ([ BAG 0 ])']], null, true)));
    bd.appendChild(row('분류 구분', sel(st, 'div', [['', '없음'], ['bar', '세로선'], ['box', '네모 칸']], null, true)));
    bd.appendChild(h4('위 정보 띠'));
    var bar = st.bar || { text: '', h: 32, mh: 26, bg: '#111111', fg: '#ffffff', font: 'Inter', fw: 600, up: true, ls: 0.12 };
    var keep = function () { if (bar.text) { st.bar = bar; } else { delete st.bar; } changed(true); };
    bd.appendChild(row('띠 글 (비우면 없음)', txt(bar, 'text', '예: NEW ARRIVALS EVERY WEEK', keep)));
    bd.appendChild(row('휴대폰 짧은 글', txt(bar, 'mtext', '비우면 위 글', keep)));
    bd.appendChild(row('띠 높이 PC (px)', rng(bar, 'h', 18, 60)));
    bd.appendChild(row('띠 높이 휴대폰 (0 = 안 보임)', rng(bar, 'mh', 0, 40)));
    bd.appendChild(row('띠 배경', col(bar, 'bg')));
    bd.appendChild(row('띠 글자색', col(bar, 'fg')));
    bd.appendChild(row('PC에서 흐르기', chk(bar, 'move', keep, true)));
    bd.appendChild(tip('휴대폰은 늘 멈춰 있어요.'));
  }
  /* 메인 추천 시안 → 짝 머리말까지 한 번에 */
  function sigSetButton(sg) {
    var hid = SIG_HDR[sg[0]]; if (!hid || !SH.hdr || !state.hdrOn) { return null; }
    var x = document.createElement('span'); x.setAttribute('role', 'button'); x.tabIndex = 0; x.textContent = '머리말도 같이 (세트)'; x.style.cssText = 'display:inline-block;margin-top:5px;font-size:11px;padding:3px 7px;border:1px solid #c4001f;border-radius:5px;color:#c4001f;background:#fff';
    x.onclick = function (e) { e.stopPropagation(); applySig(sg); applyHStyle(hid, true); var hs = HSTYLES.filter(function (y) { return y[0] === hid; })[0]; msg('"' + sg[1] + '" 시안 + 머리말 "' + hs[1] + '" 세트로 바꿨습니다. 마음에 들면 "카페24에 바로 저장".'); };
    return x;
  }
  function tDone(c) {
    if (RESP) { bd.appendChild(tip('반응형 디자인(스킨67)은 PC와 모바일이 한 파일입니다. "카페24에 바로 저장"을 누르면 PC 설정과 모바일 설정이 함께 ' + (state.cfg.pc.skinNo || '?') + '번 디자인의 ' + c.file + ' 에 저장됩니다. 한쪽만 고쳐도 다른 쪽은 그대로 남습니다.')); }
    else { bd.appendChild(tip('① "카페24에 바로 저장"을 누르면 이 디자인(' + (c.skinNo || '?') + '번)의 메인 설정 파일에 저장됩니다. 카페24 관리자에 로그인되어 있어야 합니다. ② 안 되면 "코드 복사" 후 카페24 디자인 편집 → ' + c.file + ' 내용을 모두 지우고 붙여넣어 저장하세요.')); }
    var ta = document.createElement('textarea'); ta.className = 'code'; ta.readOnly = true; ta.value = fileText(); bd.appendChild(ta);
    bd.appendChild(h4('임시 저장 (날짜별, 이 브라우저에 보관)'));
    bd.appendChild(tip('Ctrl+S = 임시 저장, Ctrl+O = 날짜별 불러오기, Ctrl+Z = 되돌리기, Ctrl+Y = 다시. 고치는 동안 15초마다 자동 저장도 됩니다(최근 15개). 화면 위 떠 있는 도구 막대는 ⠿를 끌어 옮기고, 두 번 누르면 제자리로 갑니다.'));
    var a = document.createElement('button'); a.textContent = '💾 지금 상태 임시 저장'; a.onclick = function () { saveDraft('', false); };
    var bb = document.createElement('button'); bb.textContent = '📂 날짜별 불러오기'; bb.onclick = function () { openDrafts(); };
    bd.appendChild(a); bd.appendChild(document.createTextNode(' ')); bd.appendChild(bb);
    bd.appendChild(h4('설정 번호'));
    if (RESP) { bd.appendChild(row('저장할 디자인 번호', rng(state.cfg.pc, 'skinNo', 0, 300, 1, false))); return; }
    bd.appendChild(row('저장할 디자인 번호', rng(c, 'skinNo', 0, 300, 1, false)));
    if (c.device === 'pc') { bd.appendChild(row('모바일 미리보기 주소', txt(c, 'mobilePreview', '/skin-mobile34/'))); bd.appendChild(row('모바일 디자인 번호', rng(c, 'mobileSkinNo', 0, 300, 1, false))); }
  }

  function param(obj, prefix) {
    var out = [];
    Object.keys(obj).forEach(function (k) {
      var v = obj[k], key = prefix ? prefix + '[' + k + ']' : k;
      if (v === null || v === undefined) { out.push(encodeURIComponent(key) + '='); }
      else if (Array.isArray(v)) { v.forEach(function (it, i) { if (it !== null && typeof it === 'object') { out.push(param(it, key + '[' + i + ']')); } else { out.push(encodeURIComponent(key + '[]') + '=' + encodeURIComponent(it)); } }); }
      else if (typeof v === 'object') { var p = param(v, key); if (p) { out.push(p); } }
      else { out.push(encodeURIComponent(key) + '=' + encodeURIComponent(v)); }
    });
    return out.filter(Boolean).join('&');
  }
  /* 저장할 파일 내용: 반응형이면 PC+모바일 한 파일 */
  function fileText() {
    if (!RESP) { return VTH.file(C()); }
    normBands(state.cfg.pc); normBands(state.cfg.mobile);
    return VTH.fileR(state.cfg.pc, state.cfg.mobile, preOn());
  }
  /* 3.2: 미리 받기 파일이 이 화면에 연결돼 있을 때만 hero.html에서 preload를 뺌 */
  function preOn() { return !!(SH.preloadFile && window.__vthPre); }
  /* 3.2: 사진 실제 크기 재기(실패·4초 넘으면 그대로) */
  function measureOne(obj, src) {
    return new Promise(function (res) {
      var live = true, im = new Image();
      var t = setTimeout(function () { live = false; res(); }, 4000);
      im.onload = function () { if (live && im.naturalWidth && im.naturalHeight) { obj.w = im.naturalWidth; obj.h = im.naturalHeight; } clearTimeout(t); res(); };
      im.onerror = function () { clearTimeout(t); res(); };
      im.src = src;
    });
  }
  function measureMedia() {
    var jobs = [];
    ['pc', 'mobile'].forEach(function (dv) {
      var c = state.cfg[dv], md = c && c.media; if (!md) { return; }
      if ((md.type === 'image' || md.type === 'anim') && md.src) { jobs.push(measureOne(md, md.src)); }
      (md.sizes || []).forEach(function (x) { if (x && x.src) { jobs.push(measureOne(x, x.src)); } });
      if (md.tall && md.tall.src) { jobs.push(measureOne(md.tall, md.tall.src)); }
    });
    return Promise.all(jobs);
  }
  /* 저장할 곳 목록: 반응형 = 한 파일, 따로인 디자인 = 지금 보는 쪽 + 고쳐 놓은 다른 쪽 */
  function saveTargets() {
    var cleanFile = function (f) { return String(f || '/_/main/vt_hero/hero.html').replace(/^\/skin-[a-z]+\d+/, ''); };
    if (RESP) {
      var hdrCh = !!(state.hdr && SH.hdr && JSON.stringify(state.hdr) !== state.hdrOrig);
      var heroCh = state.orig.pc !== JSON.stringify(state.cfg.pc) || state.orig.mobile !== JSON.stringify(state.cfg.mobile);
      var impCh = !!(state.imp && JSON.stringify(state.imp) !== state.impOrig), edCh = !!(state.ed && JSON.stringify(state.ed) !== state.edOrig);
      var siteCh = !!(state.site && JSON.stringify(state.site) !== state.siteOrig);
      var L = heroCh || (!hdrCh && !impCh && !edCh && !siteCh) ? [{ dev: 'both', label: 'PC·모바일 메인', n: state.cfg.pc.skinNo, file: cleanFile(state.cfg.pc.file), content: fileText() }] : []; /* 머리말만 바꿨으면 메인 파일은 그대로(손작업 사진 보호) */
      if (L.length && SH.preloadFile) { L.unshift({ dev: 'pre', label: '첫 사진 미리 받기', n: state.cfg.pc.skinNo, file: SH.preloadFile, content: VTH.preFileR(state.cfg.pc, state.cfg.mobile) }); } /* 3.2: 미리 받기 파일 먼저 */
      if (hdrCh) { L.push({ dev: 'hdr', label: '머리말', n: state.cfg.pc.skinNo, file: SH.hdr.file, content: VTH.hdrFile(state.hdr) }); }
      if (impCh) { L.push({ dev: 'imp', label: '쇼핑몰 개선 제안 ' + Object.keys(state.imp.on).length + '개 켜짐', n: state.cfg.pc.skinNo, file: IMP_FILE, content: impFile(state.imp) }); }
      if (edCh) { L.push({ dev: 'ed', label: '편집기 지운 것 목록', n: state.cfg.pc.skinNo, file: ED_FILE, content: edFile(state.ed) }); }
      if (siteCh) { L.push({ dev: 'site', label: '전체(공지 띠·팝업·맨 위로·글꼴)', n: state.cfg.pc.skinNo, file: SITE_FILE, content: siteFile(state.site) }); if (!state.siteLinked) { L.push({ dev: 'link', label: '전체 설정 연결(공통 머리 파일 한 줄)', n: state.cfg.pc.skinNo, file: SITE_LINK_FILE, transform: function (t) { var line = '<!--@import(' + SITE_FILE + ')-->'; if (t.indexOf(line) > -1) { return null; } var hl = '<!--@import(' + (SH.hdr && SH.hdr.file || '/_/main/vt_hero/header.html') + ')-->'; var i = t.indexOf(hl); if (i < 0) { return null; } i += hl.length; return t.slice(0, i) + '\n' + line + t.slice(i); } }); } }
      return L;
    }
    var list = [], devs = [state.dev, state.dev === 'pc' ? 'mobile' : 'pc'];
    devs.forEach(function (dv, i) {
      var c = state.cfg[dv]; if (!c) { return; }
      if (i > 0 && state.orig[dv] === JSON.stringify(c)) { return; }
      normBands(c);
      var n = c.skinNo || (dv === 'mobile' && state.cfg.pc ? state.cfg.pc.mobileSkinNo : 0);
      list.push({ dev: dv, label: dv === 'mobile' ? '모바일' : 'PC', n: n, file: cleanFile(c.file), content: VTH.file(c) });
    });
    return list;
  }
  /* 4.0 웹 모드 저장: 웹앱(부모 화면)에 보내 구글 드라이브에 저장 */
  function webSave() {
    flushHist();
    var data = JSON.stringify({ pc: state.cfg.pc, mobile: state.cfg.mobile, hdr: state.hdr || null, imp: state.imp || null, ed: state.ed || null, site: state.site || null });
    msg('웹에 저장하는 중…');
    try { parent.postMessage({ vth: 'save', shop: SH.key, data: data }, '*'); } catch (e) { msg('웹에 저장하지 못했어요(웹앱 화면 안에서만 됩니다).', 1); }
  }
  if (WEB) {
    addEventListener('message', function (e) {
      var d = e.data || {}; if (!d || d.vth !== 'saved') { return; }
      if (state._edSaving) { state._edSaving = 0; if (!d.ok) { msg('지운 것 목록을 이 컴퓨터에는 기억했지만 웹 저장본에는 넣지 못했어요: ' + (d.err || '알 수 없음'), 1); } return; }
      if (d.ok) { msg('웹에 저장했어요 (' + (d.at || '') + '). 다른 컴퓨터에서도 이어서 고칠 수 있어요. 실제 쇼핑몰 반영은 위쪽 "쇼핑몰에 반영" 단추.'); } else { msg('웹 저장 실패: ' + (d.err || '알 수 없음'), 1); }
    });
  }
  function saveToCafe24() {
    if (WEB) { webSave(); return; }
    if (RESP) { msg('사진 크기 확인 중…'); var fold = function () { if (state.H && state.H[state.Hi]) { state.H[state.Hi].s = snapAll(); setBase(); } saveNow(); }; measureMedia().then(fold, fold); return; } /* 3.2: 저장 전 사진 실제 크기 */
    saveNow();
  }
  function saveNow() {
    var T = saveTargets(), bad = T.filter(function (t) { return !t.n; })[0];
    if (!T.length) { return; }
    if (bad) { msg('"완성" 탭에서 ' + bad.label + ' 저장할 디자인 번호를 넣어 주세요.', 1); state.tab = 'done'; build(); return; }
    if (!askOK(SH.KO + ' 편집한 내용을 저장할까요?\n' + T.map(function (t) { return '· ' + t.label + ' → 디자인 ' + t.n + '번'; }).join('\n'))) { return; }
    if (!/\.cafe24\.com$/.test(location.hostname)) { msg('저장은 ' + SH.key + '.cafe24.com 주소(관리자 로그인한 브라우저)에서만 됩니다. 웹앱에서 「웹에 저장」 뒤 「쇼핑몰에 반영」을 눌러 주세요. (지금 작업은 "임시 저장"에 남겨 두었어요)', 1); if (typeof saveDraft === 'function') { saveDraft('저장 전 자동 보관', true); } return; }
    if (typeof saveDraft === 'function') { saveDraft('저장 전 자동 보관', true); }
    msg('저장하는 중…');
    var H = { 'X-Requested-With': 'XMLHttpRequest' }, cur = null, done = [];
    var asJson = function (r) { return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { throw new Error('login'); } }); };
    function one(t) {
      cur = t;
      return fetch('/exec/admin/editor/fileOpen?skin_no=' + t.n + '&file=' + encodeURIComponent(t.file), { method: 'POST', credentials: 'include', cache: 'no-store', headers: H })
        .then(asJson)
        .then(function (S) {
          if ((t.dev === 'hdr' || t.dev === 'pre' || t.dev === 'imp' || t.dev === 'ed' || t.dev === 'site') && S && S.bComplete === false) { S = { file: t.file, new_file: 1, where: 'me' }; } /* 머리말 파일이 없으면 새로 만듦 */
          else if (!S || S.bComplete === false || typeof S.original !== 'string') { throw new Error('open'); }
          if (t.transform) { var nc = t.transform(String(S.original || '')); if (nc == null) { return { text: function () { return Promise.resolve('{"bComplete":true}'); } }; } t.content = nc; } /* 5.1 연결 줄은 지금 파일에 한 줄만 끼움 */
          var body = param(Object.assign({}, S, { content: t.content }));
          return fetch('/exec/admin/editor/fileSave?skin_no=' + t.n, { method: 'POST', credentials: 'include', headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, H), body: body });
        })
        .then(function (r) { return r.text(); })
        .then(function (x) {
          if (!/^\s*\{/.test(x)) { throw new Error('login'); }
          if (!/bComplete":true/.test(x)) { throw new Error('save'); }
          if (t.dev === 'site') { state.siteOrig = JSON.stringify(state.site); } else if (t.dev === 'link') { state.siteLinked = true; } else if (t.dev === 'imp') { state.impOrig = JSON.stringify(state.imp); state.impFileOk = true; } else if (t.dev === 'ed') { state.edOrig = JSON.stringify(state.ed); } else if (t.dev === 'pre') { } else if (t.dev === 'hdr') { state.hdrOrig = JSON.stringify(state.hdr); } else if (t.dev === 'both') { state.orig.pc = JSON.stringify(state.cfg.pc); state.orig.mobile = JSON.stringify(state.cfg.mobile); } else { state.orig[t.dev] = JSON.stringify(state.cfg[t.dev]); }
          done.push(t.label);
        });
    }
    T.reduce(function (p, t) { return p.then(function () { return one(t); }); }, Promise.resolve())
      .then(function () { if (typeof saveDraft === 'function') { saveDraft('카페24 저장', true); } if (RESP) { build(); } msg('저장했습니다! (' + done.join(' · ') + ') 손님 화면은 카페24 캐시 때문에 몇 분 뒤 바뀔 수 있어요.'); })
      .catch(function (e) {
        var w = e && e.message, n = cur ? cur.n : '?', f = cur ? cur.file : '', pre = done.length ? '(' + done.join(' · ') + '는 저장됨) ' : '';
        if (w === 'login') { msg(pre + '카페24 관리자 로그인이 풀려서 저장하지 못했어요. 새 탭에서 eclogin.cafe24.com 으로 관리자에 다시 로그인한 뒤, 이 화면은 그대로 두고 "카페24에 바로 저장"을 다시 눌러 주세요. 지금 작업은 "임시 저장"에도 남아 있어요.', 1); }
        else if (w === 'open') { msg(pre + '디자인 ' + n + '번에서 ' + f + ' 파일을 열지 못했어요. "완성" 탭의 저장할 디자인 번호를 확인해 주세요.', 1); }
        else if (w === 'save') { msg(pre + '저장이 안 됐습니다. "코드 복사"를 써 주세요.', 1); }
        else { msg(pre + '저장 실패(인터넷 연결 또는 카페24 응답 문제). 잠시 뒤 다시 눌러 주세요. 계속 안 되면 "코드 복사"를 써 주세요.', 1); }
      });
  }
  function copyCode() {
    var t = fileText();
    var done =function () { msg('복사했습니다. 카페24 디자인 편집 → ' + C().file + ' 에 붙여넣으세요.'); };
    function fallback() { var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); }
    if (navigator.clipboard) { navigator.clipboard.writeText(t).then(done, fallback); } else { fallback(); }
  }

  /* ===== 3.7 따로 창 미리보기: [🖥 PC][💻 노트북][📱 휴대폰] 켜고 끄기 =====
     각각 떨어진 창(다른 모니터로 옮길 수 있음)으로 열고, 고치면 모든 창이 같이 바뀜. 창에서 끌어 옮기면 그 폭을 고침.
     창 자리·크기는 기억했다가 다음에 그 자리에 엶(브라우저가 허락하는 만큼) */
  var WINS = { pc: { w: 1920, h: 1080, n: '🖥 PC' }, lap: { w: 1366, h: 768, n: '💻 노트북' }, mob: { w: 390, h: 844, n: '📱 휴대폰' } };
  state.wins = {};
  function winOpen(k) { var w = state.wins[k]; return w && !w.closed ? w : null; }
  function winDocs() { var a = []; Object.keys(WINS).forEach(function (k) { var w = winOpen(k); try { if (w && w.__vthReady && w.document) { a.push(w.document); } } catch (e) { } }); return a; }
  function winCfg(w) { return w.innerWidth < 1024 ? state.cfg.mobile || state.cfg.pc : state.cfg.pc; }
  function winsApply(cssOnly) {
    Object.keys(WINS).forEach(function (k) { var w = winOpen(k); try { if (w && w.__vthReady) { var c = winCfg(w); if (c) { applyTo(w.document, c, cssOnly && w.__vthMob === (w.innerWidth < 1024)); w.__vthMob = w.innerWidth < 1024; } } } catch (e) { } });
  }
  function winInit(k, w) {
    var d = w.document; if (!d || !d.getElementById('vth') || w.__vthReady) { return false; }
    w.__vthReady = 1; try { d.title = '[미리보기 ' + WINS[k].n.replace(/^\S+\s/, '') + '] ' + d.title; } catch (e) { }
    if (RESP) { var dm = d.getElementById('vthm'); if (dm) { dm.parentNode.removeChild(dm); } }
    w.__vthMob = w.innerWidth < 1024; applyTo(d, winCfg(w)); if (typeof applyHdr === 'function') { applyHdr(); }
    bindDrag(d);
    /* 이 창을 누르면 이 폭(휴대폰/PC)을 고치는 상태로 */
    w.addEventListener('pointerdown', function () { var want = w.innerWidth < 1024 ? 'mobile' : 'pc'; if (state.dev !== want && state.cfg[want]) { state.dev = want; state.sel = 0; build(); } }, true);
    w.addEventListener('resize', function () { var m = w.innerWidth < 1024; if (m !== w.__vthMob) { w.__vthMob = m; applyTo(d, winCfg(w)); if (typeof applyHdr === 'function') { applyHdr(); } } });
    return true;
  }
  function winSavePos(k) { var w = winOpen(k); if (!w) { return; } try { if (w.screenX <= -10000 || w.screenY <= -10000 || w.innerWidth < 200 || w.document.visibilityState === 'hidden') { return; } /* 내린(최소화) 창 자리는 기억 안 함 */ localStorage.setItem('vth-win-' + k, JSON.stringify({ x: w.screenX, y: w.screenY, w: w.innerWidth, h: w.innerHeight })); } catch (e) { } }
  function winToggle(k) {
    var w = winOpen(k);
    if (w) { winSavePos(k); w.close(); state.wins[k] = null; winBtns(); msg(WINS[k].n + ' 창을 닫았어요.'); return; }
    var p = null; try { p = JSON.parse(localStorage.getItem('vth-win-' + k) || 'null'); } catch (e) { } if (p && (p.x <= -10000 || p.y <= -10000 || p.w < 200)) { p = null; }
    var W = WINS[k], f = 'popup=yes,width=' + (p ? p.w : W.w) + ',height=' + (p ? p.h : W.h) + (p ? ',left=' + p.x + ',top=' + p.y : '');
    w = WEB ? window.open('', 'vthWin_' + k, f) : window.open((BASE || '') + '/?vtview=' + k, 'vthWin_' + k, f);
    if (w && WEB) { try { w.document.open(); w.document.write(WEB.html); w.document.close(); } catch (e) { } }
    if (!w) { msg('창이 막혔어요. 주소창 오른쪽의 "팝업 차단" 표시를 눌러 이 사이트 팝업을 허용한 뒤 다시 눌러 주세요.', 1); return; }
    state.wins[k] = w; winBtns();
    msg(W.n + ' 창을 열었어요. 다른 모니터로 끌어다 놓아도 되고, 자리·크기는 기억해요. 창에서 글씨를 끌면 그 폭을 고쳐요.');
  }
  function winBtns() { var b = P.querySelectorAll('.hd button[data-a^=win-]'); for (var i = 0; i < b.length; i++) { b[i].classList.toggle('on', !!winOpen(b[i].getAttribute('data-a').slice(4))); } }
  /* 창이 다 뜨면 연결, 사용자가 창을 닫으면 단추 끔, 자리 기억 */
  setInterval(function () {
    Object.keys(WINS).forEach(function (k) {
      var w = state.wins[k]; if (!w) { return; }
      if (w.closed) { state.wins[k] = null; winBtns(); return; }
      try { if (!w.__vthReady && w.document && w.document.readyState !== 'loading') { winInit(k, w); } } catch (e) { }
      winSavePos(k);
    });
  }, 700);
  addEventListener('beforeunload', function () { Object.keys(WINS).forEach(function (k) { var w = winOpen(k); if (w) { winSavePos(k); w.close(); } }); });
  /* 3.5 노트북 폭 보기: PC 설정을 1366×768 화면에 줄여 보여 줌(고치면 바로 바뀜, 끌어 옮기기도 됨) */
  function lapDoc() { var w = document.getElementById('vthLapWrap'); if (!w || w.style.display === 'none') { return null; } var f = w.querySelector('iframe'); return f && f.contentDocument; }
  function lapFit() {
    var w = document.getElementById('vthLapWrap'); if (!w || w.style.display === 'none') { return; }
    var LW = state.lapW || 1366, LH = state.lapH || 768;
    var r = w.getBoundingClientRect(), k = Math.min(1, (r.width - 40) / LW, (r.height - 70) / LH), b = w.querySelector('.lapbox'), f = w.querySelector('iframe');
    f.style.width = LW + 'px'; f.style.height = LH + 'px';
    b.style.width = Math.round(LW * k) + 'px'; b.style.height = Math.round(LH * k) + 'px'; f.style.transform = 'scale(' + k + ')';
    var cp = w.querySelector('.lapcap'); if (cp) { cp.textContent = (state.lapWhole ? '🖥 PC 전체 화면 (' + LW + '×' + LH + (k < 1 ? ', ' + Math.round(k * 100) + '%로 줄여 보임' : '') + ') — 편집 칸에 가려지는 곳까지 보여요. 여기서 끌어 옮기거나 오른쪽 칸에서 고치면 바로 바뀌어요. 원래 화면은 위 ✏️PC' : '💻 노트북 화면 (1366×768) — 여기서 끌어 옮기거나 오른쪽 칸에서 고치면 바로 바뀌어요'); }
  }
  function openLaptop(wh) {
    var w = document.getElementById('vthLapWrap');
    state.lapWhole = !!wh; state.lapW = wh ? wh[0] : 1366; state.lapH = wh ? wh[1] : 768;
    if (!w) {
      w = document.createElement('div'); w.id = 'vthLapWrap'; w.innerHTML = '<div class="lapbox"><iframe></iframe><div class="lapload">화면 불러오는 중…</div></div><div class="lapcap"></div>'; document.body.appendChild(w);
      var f = w.querySelector('iframe'); f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
      f.onload = function () { var d = null; try { d = f.contentDocument; } catch (e) { } if (d && d.URL === 'about:blank') { return; } var lo = w.querySelector('.lapload'); if (lo) { lo.remove(); } if (!d) { msg('화면을 열지 못했습니다(같은 주소에서 열어야 합니다).', 1); return; }
        if (WEB) { d.addEventListener('click', function (e) { var a = e.target && e.target.closest && e.target.closest('a[href]'); if (a) { e.preventDefault(); } }, true); }
        bindDrag(d); applyTo(d, state.cfg.pc); if (typeof applyHdr === 'function') { applyHdr(); } if (typeof siteDoc === 'function') { try { siteDoc(d); fxDoc(d); } catch (e) { } } };
      if (WEB && WEB.html) { f.srcdoc = WEB.html; } else { f.src = (BASE || '') + '/'; }
      addEventListener('resize', function () { if (state.lapWhole) { state.lapW = Math.max(1024, innerWidth); state.lapH = Math.max(600, innerHeight); } lapFit(); });
    }
    w.style.display = 'flex'; lapFit();
  }
  function openMobile() {
    var pc = state.cfg.pc, url = RESP ? (BASE || '') + '/' : ((pc && pc.mobilePreview) || '');
    if (!url) { msg('"완성" 탭에서 모바일 미리보기 주소를 넣어 주세요 (예: /skin-mobile34/).', 1); state.dev = 'pc'; return; }
    var w = document.getElementById('vthFrameWrap');
    if (!w) {
      w = document.createElement('div'); w.id = 'vthFrameWrap'; w.innerHTML = '<iframe></iframe>'; document.body.appendChild(w);
      state.frame = w.querySelector('iframe'); state.frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
      state.frame.onload = function () {
        var d = state.frame.contentDocument; if (!d) { msg('모바일 화면을 열지 못했습니다(같은 주소에서 열어야 합니다).', 1); return; }
        if (RESP) { var dm = d.getElementById('vthm'); if (dm) { dm.parentNode.removeChild(dm); } }
        if (!state.cfg.mobile) { state.cfg.mobile = readCfg(d, 'mobile'); if (!state.cfg.mobile.skinNo && pc.mobileSkinNo) { state.cfg.mobile.skinNo = pc.mobileSkinNo; } state.hist.mobile = [JSON.stringify(state.cfg.mobile)]; }
        bindDrag(d); applyTo(d, state.cfg.mobile); applyHdr(); build();
      };
      state.frame.src = url;
    }
    w.style.display = 'flex';
  }

  function bindDrag(doc) {
    if (doc.__vthDrag) { return; } doc.__vthDrag = 1;
    if (doc !== document) { doc.addEventListener('keydown', function (e) { if (VTH._onKey) { VTH._onKey(e); } }); }
    doc.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#vth')) { e.preventDefault(); } }, true);
    doc.addEventListener('pointerdown', function (e) {
      var el = e.target.closest && e.target.closest('#vth .vth-blk');
      if (!el) {
        /* 띠를 눌러 고르기 · 사진 위 띠는 위아래로 끌어 옮기기 */
        var be = e.target.closest && e.target.closest('#vth .vth-bd'); if (!be) { return; }
        e.preventDefault();
        var cb = C(), bid = be.getAttribute('data-bid'), bi = -1;
        (cb.bands || []).forEach(function (x, i) { if (x.id === bid) { bi = i; } }); if (bi < 0) { return; }
        state.selKind = 'band'; state.bsel = bi; state.tab = 'marquee'; markSel(doc); build();
        var band = cb.bands[bi]; if (band.mode !== 'over') { return; }
        var sec = doc.getElementById('vth').getBoundingClientRect(), vert = bandVert(band), sx0 = e.clientX, sy0 = e.clientY;
        var y0 = num(band.y), mvd = false;
        function bmv(ev) {
          if (!mvd && Math.abs(ev.clientX - sx0) + Math.abs(ev.clientY - sy0) < 3) { return; }
          if (!mvd && !vert && band.pos !== 'custom') { var r0b = be.getBoundingClientRect(); band.y = Math.round(((r0b.top + r0b.height / 2 - sec.top) / sec.height * 100) * 10) / 10; band.pos = 'custom'; y0 = band.y; }
          mvd = true;
          if (vert) { var d = (ev.clientX - sx0) / sec.width * 100; band.y = Math.max(0, Math.round((y0 + (band.pos === 'left' ? d : -d)) * 10) / 10); }
          else { band.y = Math.max(0, Math.min(100, Math.round((y0 + (ev.clientY - sy0) / sec.height * 100) * 10) / 10)); }
          changed(true, true);
        }
        function bup() { doc.removeEventListener('pointermove', bmv); doc.removeEventListener('pointerup', bup); if (mvd) { changed(true); build(); } }
        doc.addEventListener('pointermove', bmv); doc.addEventListener('pointerup', bup);
        return;
      }
      e.preventDefault();
      var c = C(), id = el.getAttribute('data-id'), idx = -1;
      c.blocks.forEach(function (b, i) { if (b.id === id) { idx = i; } }); if (idx < 0) { return; }
      state.sel = idx; state.selKind = 'block'; state.tab = 'text'; markSel(doc);
      var b = c.blocks[idx], area = el.parentNode.getBoundingClientRect(), sx = e.clientX, sy = e.clientY, bx = num(b.x), by = num(b.y), moved = false;
      /* 맞춤선: 다른 글씨의 왼쪽·가운데·오른쪽 / 위·가운데·아래, 칸 가운데에 가까우면 붙고 빨간 임시 선이 보임 (Alt 누르면 끔) */
      var r0 = el.getBoundingClientRect(), gx = [area.left + area.width / 2], gy = [area.top + area.height / 2];
      var padX = area.width * num(c.pad, 5) / 100, padY = area.height * num(c.pad, 5) / 100;
      gx.push(area.left + padX, area.right - padX); gy.push(area.top + padY, area.bottom - padY);
      Array.prototype.forEach.call(el.parentNode.querySelectorAll('.vth-blk'), function (o) {
        if (o === el) { return; } var r = o.getBoundingClientRect();
        gx.push(r.left, r.left + r.width / 2, r.right); gy.push(r.top, r.top + r.height / 2, r.bottom);
      });
      var lines = [];
      function clearLines() { lines.forEach(function (l) { l.remove(); }); lines = []; }
      function line(vertical, pos) {
        var l = doc.createElement('div');
        l.style.cssText = 'position:fixed;z-index:2147483600;pointer-events:none;background:#ff2d55;box-shadow:0 0 0 .5px #fff;' +
          (vertical ? 'top:' + area.top + 'px;height:' + area.height + 'px;width:1px;left:' + Math.round(pos) + 'px' : 'left:' + area.left + 'px;width:' + area.width + 'px;height:1px;top:' + Math.round(pos) + 'px');
        doc.body.appendChild(l); lines.push(l);
      }
      function snap(edges, guides) {
        var best = null;
        edges.forEach(function (ed) { guides.forEach(function (g) { var d = g - ed; if (Math.abs(d) <= 6 && (!best || Math.abs(d) < Math.abs(best.d))) { best = { d: d, g: g }; } }); });
        return best;
      }
      function mv(ev) {
        moved = true;
        var dx = ev.clientX - sx, dy = ev.clientY - sy;
        clearLines();
        if (!ev.altKey) {
          var sxs = snap([r0.left + dx, r0.left + r0.width / 2 + dx, r0.right + dx], gx);
          var sys = snap([r0.top + dy, r0.top + r0.height / 2 + dy, r0.bottom + dy], gy);
          if (sxs) { dx += sxs.d; line(true, sxs.g); }
          if (sys) { dy += sys.d; line(false, sys.g); }
        }
        b.x = Math.round((bx + dx / area.width * 100) * 100) / 100; b.y = Math.round((by + dy / area.height * 100) * 100) / 100;
        changed(true, true);
      }
      function up() { clearLines(); doc.removeEventListener('pointermove', mv); doc.removeEventListener('pointerup', up); if (moved) { changed(true); } build(); }
      doc.addEventListener('pointermove', mv); doc.addEventListener('pointerup', up);
    });
  }

  P.addEventListener('change', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('data-pvpg')) { pvGo(t.value); } });
  P.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-a]'); if (!a) { return; }
    var k = a.getAttribute('data-a');
    if (k === 'pop') { if (P.ownerDocument === document) { popOut(); } else { if (popWin) { popWin.close(); } dock(); } return; }
    if (k === 'undo') { undo(); } else if (k === 'redo') { redo(); }
    else if (k === 'min') { P.classList.toggle('min'); document.documentElement.classList.toggle('vth-min', P.classList.contains('min')); }
    else if (k === 'side') { P.classList.toggle('left'); document.documentElement.classList.toggle('vth-pl', P.classList.contains('left')); }
    else if (k === 'top-design' || k === 'top-imp') { state.top = k.slice(4); build(); pvAuto(true); }
    else if (k.indexOf('mode-') === 0) { state.mode = k.slice(5); state.tab = state.mode === 'hdr' ? 'hstyle' : 'layout'; build(); pvAuto(true); }
    else if (k.indexOf('pvz-') === 0) { pvSize(k.slice(4)); }
    else if (k.indexOf('pv-') === 0) { pvGo(k.slice(3)); }
    else if (k === 'more') { P.classList.toggle('hm'); a.classList.toggle('on', P.classList.contains('hm')); }
    else if (k === 'save') { saveToCafe24(); } else if (k === 'copy') { copyCode(); }
    else if (k === 'dev-pc') { state.dev = 'pc'; state.view = 'pc'; var w = document.getElementById('vthFrameWrap'); if (w) { w.style.display = 'none'; } var lw = document.getElementById('vthLapWrap'); if (lw) { lw.style.display = 'none'; } state.sel = 0; build(); }
    else if (k.indexOf('win-') === 0) { winToggle(k.slice(4)); }
    else if (k === 'dev-lap') { state.dev = 'pc'; state.view = 'lap'; var w2 = document.getElementById('vthFrameWrap'); if (w2) { w2.style.display = 'none'; } openLaptop(); state.sel = 0; applyTo(document, state.cfg.pc); build(); }
    else if (k === 'dev-mobile') { state.dev = 'mobile'; state.view = 'mobile'; var lw2 = document.getElementById('vthLapWrap'); if (lw2) { lw2.style.display = 'none'; } state.sel = 0;
      if (RESP && !isMobileSkin) { var fw = document.getElementById('vthFrameWrap'); if (fw) { fw.style.display = 'none'; } if (!winOpen('mob')) { winToggle('mob'); } msg('휴대폰 설정을 고쳐요. 휴대폰 창에서 바로 보이고, PC 화면은 그대로예요.'); } else { openMobile(); }
      build(); }
  });
  /* ---------- 임시 저장(날짜별) · 불러오기 · 초기화 · 떠 있는 도구 막대 (11/09) ---------- */
  state.orig = {};
  function origOf(dev) { if (!state.orig[dev] && state.cfg[dev]) { state.orig[dev] = JSON.stringify(state.cfg[dev]); } return state.orig[dev]; }
  function dKey(dev) { return (RESP ? 'vth-drafts-r-' : 'vth-drafts-') + (dev || state.dev); }
  function getDrafts(dev) { try { return JSON.parse(localStorage.getItem(dKey(dev)) || '[]'); } catch (e) { return []; } }
  function putDrafts(list, dev) { try { localStorage.setItem(dKey(dev), JSON.stringify(list)); return true; } catch (e) { msg('임시 저장 공간이 꽉 찼습니다. 오래된 임시 저장을 지워 주세요.', 1); return false; } }
  function fmtT(t) { var d = new Date(t), p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds()); }
  function saveDraft(name, auto) {
    var c = C(); if (!c) { return; }
    var list = getDrafts(), s = JSON.stringify(c);
    if (auto) {
      var lastAuto = list.filter(function (x) { return x.auto; })[0];
      if (lastAuto && JSON.stringify(lastAuto.cfg) === s) { return; }
    }
    list.unshift({ t: Date.now(), name: name || (auto ? '자동 저장' : '임시 저장'), auto: !!auto, cfg: JSON.parse(s) });
    var autos = 0, mans = 0;
    list = list.filter(function (x) { if (x.auto) { autos++; return autos <= 15; } mans++; return mans <= 60; });
    if (putDrafts(list) && !auto) { msg('임시 저장했습니다 (' + fmtT(list[0].t) + '). 불러오기: Ctrl+O 또는 📂'); }
    refreshTB();
  }
  var autoT = 0;
  function autoSave() { clearTimeout(autoT); autoT = setTimeout(function () { saveDraft('', true); }, 15000); }
  function setCfg(obj, note) { state.cfg[state.dev] = obj; state.sel = 0; changed(false); build(); if (note) { msg(note); } }
  function resetAll() {
    if (!askOK('처음 상태(지금 메인 그대로)로 전체 초기화할까요?\n사진·글씨·띠·나누기가 모두 처음으로 돌아갑니다.\n(되돌리기 ↶로 다시 돌아올 수 있고, 지금 상태는 임시 저장해 둡니다.)')) { return; }
    saveDraft('초기화 직전', false);
    var c = C(), d = VTH.defaults(state.dev); d.skinNo = c.skinNo; d.mobilePreview = c.mobilePreview; d.mobileSkinNo = c.mobileSkinNo; d.bands = [];
    setCfg(d, '전체 초기화했습니다. ↶ 되돌리기로 돌아갈 수 있어요.');
  }
  function revertSaved() {
    var o = origOf(state.dev); if (!o) { return; }
    if (!askOK('카페24에 마지막으로 저장된 상태로 되돌릴까요?\n(지금 상태는 임시 저장해 둡니다.)')) { return; }
    saveDraft('되돌리기 직전', false);
    setCfg(JSON.parse(o), '카페24에 저장된 상태로 되돌렸습니다.');
  }
  function openDrafts() {
    var old = document.getElementById('vthD'); if (old) { old.remove(); return; }
    var w = document.createElement('div'); w.id = 'vthD';
    var list = getDrafts();
    var h = '<div class="dh"><b>임시 저장 목록 · ' + (state.dev === 'pc' ? 'PC' : '모바일') + ' (' + list.length + '개)</b><button data-x="close">닫기 ✕</button></div>' +
      '<div class="dn"><input type="text" placeholder="이름 붙여 저장 (예: 겨울 세일 시안)"><button data-x="save" class="on">💾 지금 상태 저장</button></div>' +
      '<div class="dl">' + (list.length ? '' : '<p style="color:#888;padding:20px;text-align:center">아직 임시 저장이 없습니다.</p>');
    list.forEach(function (x, i) {
      h += '<div class="di"><div><b>' + esc(x.name) + '</b>' + (x.auto ? ' <span class="tg">자동</span>' : '') + '<br><small>' + fmtT(x.t) + ' · 글씨 ' + ((x.cfg.blocks || []).length) + '개 · 띠 ' + ((x.cfg.bands || []).length) + '개 · ' +
        (x.cfg.split && x.cfg.split.mode !== 'full' ? '나누기 ' + (num(x.cfg.split.ratio) / 10) + ':' + (10 - num(x.cfg.split.ratio) / 10) : '전체 화면') + '</small></div>' +
        '<span><button data-x="load" data-i="' + i + '" class="on">불러오기</button> <button data-x="del" data-i="' + i + '">삭제</button></span></div>';
    });
    h += '</div><div class="df"><button data-x="orig">카페24 저장본으로 되돌리기</button> <button data-x="reset">🧹 전체 초기화</button></div>';
    w.innerHTML = h; document.body.appendChild(w);
    w.addEventListener('click', function (e) {
      var b = e.target.closest('[data-x]'); if (!b) { if (e.target === w) { w.remove(); } return; }
      var x = b.getAttribute('data-x'), i = +b.getAttribute('data-i'), L = getDrafts();
      if (x === 'close') { w.remove(); }
      if (x === 'save') { saveDraft(w.querySelector('.dn input').value.trim() || '임시 저장', false); w.remove(); openDrafts(); }
      if (x === 'load' && L[i]) { saveDraft('불러오기 직전', true); setCfg(clone(L[i].cfg), '"' + L[i].name + '" (' + fmtT(L[i].t) + ') 을(를) 불러왔습니다. ↶로 되돌릴 수 있어요.'); w.remove(); }
      if (x === 'del' && L[i] && askOK('"' + L[i].name + '" (' + fmtT(L[i].t) + ') 을(를) 지울까요?')) { L.splice(i, 1); putDrafts(L); w.remove(); openDrafts(); }
      if (x === 'orig') { w.remove(); revertSaved(); }
      if (x === 'reset') { w.remove(); resetAll(); }
    });
  }
  var TB = document.createElement('div'); TB.id = 'vthT';
  TB.innerHTML = '<span class="grip" title="끌어서 옮기기">⠿</span>' +
    '<button data-t="undo" title="되돌리기 (Ctrl+Z)">↶<i>되돌리기</i></button>' +
    '<button data-t="redo" title="다시 하기 (Ctrl+Y)">↷<i>다시</i></button>' +
    '<button data-t="hist" title="작업내역 (눌러서 그때로 되돌리기)">📜<i>작업내역</i></button>' +
    '<span class="sep"></span>' +
    '<button data-t="save" title="임시 저장 (Ctrl+S)">💾<i>임시 저장</i></button>' +
    '<button data-t="load" title="날짜별 불러오기 (Ctrl+O)">📂<i>불러오기</i></button>' +
    '<span class="sep"></span>' +
    '<button data-t="orig" title="카페24에 저장된 상태로">⟲<i>저장본으로</i></button>' +
    '<button data-t="reset" title="처음 상태로 전체 초기화">🧹<i>전체 초기화</i></button>' +
    '<span class="cnt"></span>';
  var tcss = document.createElement('style');
  tcss.textContent = '#vthT{position:fixed;z-index:2147483100;bottom:14px;left:calc(50% - 200px);transform:translateX(-50%);display:flex;align-items:center;gap:4px;padding:5px 8px;background:rgba(17,17,17,.92);color:#fff;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.35);font:12px/1.2 "Noto Sans KR",sans-serif;user-select:none}' +
    '#vthT.moved{transform:none;bottom:auto}#vthT .grip{cursor:grab;padding:4px 6px;font-size:16px;color:#aaa}#vthT .grip:active{cursor:grabbing}' +
    '#vthT button{font:inherit;cursor:pointer;background:transparent;color:#fff;border:0;border-radius:8px;padding:5px 8px;display:flex;flex-direction:column;align-items:center;gap:1px;font-size:16px;line-height:1}#vthT button i{font-style:normal;font-size:10.5px;color:#ccc}#vthT button:hover{background:#c4001f}#vthT button:disabled{opacity:.35;cursor:default;background:transparent}' +
    '#vthT .sep{width:1px;height:28px;background:#444;margin:0 2px}#vthT .cnt{font-size:10.5px;color:#999;padding:0 4px;min-width:54px;text-align:center}' +
    '#vthD{position:fixed;inset:0;z-index:2147483200;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;font:13px/1.45 "Noto Sans KR",sans-serif}' +
    '#vthD>*{box-sizing:border-box}#vthD .dh,#vthD .dn,#vthD .dl,#vthD .df{width:min(560px,94vw);background:#fff;color:#222;padding:10px 14px}#vthD{flex-direction:column}#vthD .dh{display:flex;justify-content:space-between;align-items:center;border-radius:12px 12px 0 0;border-bottom:1px solid #eee}' +
    '#vthD .dn{display:flex;gap:6px}#vthD .dn input{flex:1;padding:6px 8px;border:1px solid #ccc;border-radius:6px;font:inherit}#vthD .dl{max-height:56vh;overflow:auto;padding-top:0;padding-bottom:0}#vthD .di{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid #f0f0f0}' +
    '#vthD .di small{color:#888}#vthD .tg{font-size:10px;background:#eee;border-radius:4px;padding:1px 5px;color:#666}#vthD .df{border-radius:0 0 12px 12px;display:flex;justify-content:flex-end;gap:6px;border-top:1px solid #eee}' +
    '#vthD button{font:inherit;cursor:pointer;border:1px solid #ccc;background:#fff;border-radius:6px;padding:5px 10px;color:#222;white-space:nowrap}#vthD button.on{background:#c4001f;border-color:#c4001f;color:#fff}';
  document.head.appendChild(tcss); document.body.appendChild(TB);
  try { var tp = JSON.parse(localStorage.getItem('vth-tb-pos') || 'null'); if (tp) { TB.classList.add('moved'); TB.style.left = Math.min(tp.x, innerWidth - 120) + 'px'; TB.style.top = Math.min(tp.y, innerHeight - 50) + 'px'; } } catch (e) { }
  TB.querySelector('.grip').addEventListener('pointerdown', function (e) {
    e.preventDefault(); var r = TB.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
    TB.classList.add('moved'); TB.style.left = r.left + 'px'; TB.style.top = r.top + 'px';
    function mv(ev) { TB.style.left = Math.max(0, Math.min(innerWidth - r.width, ev.clientX - ox)) + 'px'; TB.style.top = Math.max(0, Math.min(innerHeight - r.height, ev.clientY - oy)) + 'px'; }
    function up() { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); try { localStorage.setItem('vth-tb-pos', JSON.stringify({ x: parseInt(TB.style.left, 10), y: parseInt(TB.style.top, 10) })); } catch (e2) { } }
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up);
  });
  TB.querySelector('.grip').addEventListener('dblclick', function () { TB.classList.remove('moved'); TB.style.left = ''; TB.style.top = ''; try { localStorage.removeItem('vth-tb-pos'); } catch (e) { } });
  TB.addEventListener('click', function (e) {
    var b = e.target.closest('[data-t]'); if (!b) { return; }
    var k = b.getAttribute('data-t');
    if (k === 'hist') { histToggle(); } if (k === 'undo') { undo(); } if (k === 'redo') { redo(); } if (k === 'save') { saveDraft('', false); } if (k === 'load') { openDrafts(); }
    if (k === 'orig') { revertSaved(); } if (k === 'reset') { resetAll(); }
    refreshTB();
  });
  /* 3.3 작업내역 상자: 떠 있는 도구막대의 '작업내역' 단추로 열고 닫음 */
  var HB = document.createElement('div'); HB.id = 'vthH'; HB.style.display = 'none';
  var hcss = document.createElement('style');
  hcss.textContent = '#vthH{position:fixed;z-index:2147483101;width:300px;max-height:min(60vh,520px);display:flex;flex-direction:column;background:#fff;color:#222;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.35);font:12.5px/1.4 "Noto Sans KR",sans-serif;overflow:hidden}' +
    '#vthH .hh{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:#111;color:#fff;font-weight:700}#vthH .hh button{font:inherit;font-weight:400;cursor:pointer;background:#333;color:#fff;border:0;border-radius:6px;padding:3px 8px}' +
    '#vthH .hl{overflow:auto;padding:4px 0}#vthH .hr{display:flex;gap:8px;align-items:baseline;padding:6px 10px;cursor:pointer;border-left:3px solid transparent}#vthH .hr:hover{background:#f6f6f6}' +
    '#vthH .hr b{min-width:22px;color:#999;font-weight:400;text-align:right}#vthH .hr span{flex:1}#vthH .hr small{color:#aaa}#vthH .hr.on{background:#fff0f2;border-left-color:#c4001f;font-weight:700}#vthH .hr.fut{color:#aaa}#vthH .hr.fut span{text-decoration:line-through}' +
    '#vthH .hf{padding:6px 10px;border-top:1px solid #eee;color:#888;font-size:11px}';
  document.head.appendChild(hcss); document.body.appendChild(HB);
  function histUI() {
    if (HB.style.display === 'none') { return; }
    var tm = function (t) { var d = new Date(t); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2); };
    var rows = state.H.map(function (h, i) { return '<div class="hr' + (i === state.Hi ? ' on' : i > state.Hi ? ' fut' : '') + '" data-h="' + i + '"><b>' + i + '</b><span>' + esc(h.label) + '</span><small>' + tm(h.t) + '</small></div>'; }).join('');
    HB.innerHTML = '<div class="hh">작업내역 (' + Math.max(0, state.H.length - 1) + ')<button data-hx="1">닫기</button></div><div class="hl">' + rows + '</div><div class="hf">줄을 누르면 그때 모습으로 돌아가요. ESC = 한 단계 되돌리기, Ctrl+Y = 다시. PC·휴대폰·머리말이 한 목록이에요.</div>';
    var on = HB.querySelector('.hr.on'); if (on) { on.scrollIntoView({ block: 'nearest' }); }
  }
  function histToggle(show) {
    var vis = show != null ? show : HB.style.display === 'none';
    if (!vis) { HB.style.display = 'none'; return; }
    var r = TB.getBoundingClientRect(); HB.style.display = 'flex';
    HB.style.top = Math.min(innerHeight - 200, r.bottom + 6) + 'px'; HB.style.left = Math.max(6, Math.min(innerWidth - 306, r.left)) + 'px';
    histUI();
  }
  HB.addEventListener('click', function (e) {
    if (e.target.closest('[data-hx]')) { histToggle(false); return; }
    var r = e.target.closest('[data-h]'); if (r) { goHist(+r.getAttribute('data-h')); }
  });
  function refreshTB() {
    if (RESP) { TB.querySelector('[data-t=undo]').disabled = state.Hi < 1; TB.querySelector('[data-t=redo]').disabled = state.Hi >= state.H.length - 1; TB.querySelector('.cnt').innerHTML = '내역 ' + Math.max(0, state.Hi) + '/' + Math.max(0, state.H.length - 1) + '<br>임시 ' + getDrafts().filter(function (x) { return !x.auto; }).length + '개'; return; }
    var h = state.hist[state.dev] || [], f = state.fut[state.dev] || [];
    TB.querySelector('[data-t=undo]').disabled = h.length < 2; TB.querySelector('[data-t=redo]').disabled = !f.length;
    TB.querySelector('.cnt').innerHTML = '되돌리기 ' + Math.max(0, h.length - 1) + '<br>임시 ' + getDrafts().filter(function (x) { return !x.auto; }).length + '개';
  }
  /* 선택된 글씨/띠: 방향키 미세 이동, Delete 삭제, Ctrl+D 복제 */
  function selObj() {
    var c = C(); if (!c) { return null; }
    if (state.selKind === 'band') { var b = (c.bands || [])[state.bsel]; return b ? { kind: 'band', o: b, list: c.bands, i: state.bsel } : null; }
    if (state.selKind === 'none') { return null; }
    var k = c.blocks[state.sel]; return k ? { kind: 'block', o: k, list: c.blocks, i: state.sel } : null;
  }
  var rebuildT = 0;
  function softBuild() { clearTimeout(rebuildT); rebuildT = setTimeout(build, 250); }
  function deleteSel() {
    var s = selObj(); if (!s) { msg('먼저 화면이나 목록에서 지울 글씨·띠를 눌러 고르세요.', 1); return; }
    s.list.splice(s.i, 1);
    if (s.kind === 'band') { state.bsel = Math.max(0, s.i - 1); if (!s.list.length) { state.selKind = 'none'; } }
    else { state.sel = Math.max(0, s.i - 1); if (!s.list.length) { state.selKind = 'none'; } }
    changed(false); build(); msg((s.kind === 'band' ? '띠를' : '글씨를') + ' 지웠습니다. Ctrl+Z로 되돌릴 수 있어요.');
  }
  function dupSel() {
    var s = selObj(); if (!s) { return; }
    var n = clone(s.o); n.id = newId();
    if (s.kind === 'block') { n.x = num(n.x) + 2; n.y = num(n.y) + 2; state.sel = s.i + 1; } else { state.bsel = s.i + 1; }
    s.list.splice(s.i + 1, 0, n); changed(false); build(); msg('복제했습니다.');
  }
  /* 복사(Ctrl+C) · 잘라내기(Ctrl+X) · 붙여넣기(Ctrl+V): PC↔모바일 사이도 됨(크기 자동 맞춤) */
  function copySel(cut) {
    var s = selObj(); if (!s) { msg('먼저 복사할 글씨·띠를 눌러 고르세요.', 1); return; }
    var clip = { kind: s.kind, dev: state.dev, o: clone(s.o), t: Date.now() };
    state.clip = clip; try { localStorage.setItem('vth-clip', JSON.stringify(clip)); } catch (e) { }
    if (cut) {
      s.list.splice(s.i, 1);
      if (s.kind === 'band') { state.bsel = Math.max(0, s.i - 1); } else { state.sel = Math.max(0, s.i - 1); }
      if (!s.list.length) { state.selKind = 'none'; }
      changed(false); build(); msg('잘라냈습니다. Ctrl+V로 붙여넣으세요.');
    } else { msg((s.kind === 'band' ? '띠를' : '글씨를') + ' 복사했습니다. Ctrl+V로 붙여넣으세요.'); }
  }
  function pasteClip() {
    var clip = state.clip; if (!clip) { try { clip = JSON.parse(localStorage.getItem('vth-clip') || 'null'); } catch (e) { } }
    if (!clip) { msg('복사한 것이 없습니다. 먼저 Ctrl+C로 복사하세요.', 1); return; }
    var c = C(), n = clone(clip.o); n.id = newId();
    if (clip.dev !== state.dev) { var f = state.dev === 'mobile' ? 0.42 : 1 / 0.42; n.size = Math.max(10, Math.round(num(n.size) * f)); if (n.gap != null) { n.gap = Math.round(num(n.gap) * f); } }
    if (clip.kind === 'band') { normBands(c); var bi = state.selKind === 'band' ? state.bsel + 1 : c.bands.length; c.bands.splice(bi, 0, n); state.bsel = bi; state.selKind = 'band'; }
    else {
      if (n.area === 'side' && c.split.mode === 'full') { n.area = 'main'; }
      var same = c.blocks.some(function (b) { return Math.abs(num(b.x) - num(n.x)) < 0.5 && Math.abs(num(b.y) - num(n.y)) < 0.5 && b.pos === n.pos; });
      if (same) { n.x = num(n.x) + 2; n.y = num(n.y) + 2; }
      var ki = state.selKind === 'block' ? state.sel + 1 : c.blocks.length; c.blocks.splice(ki, 0, n); state.sel = ki; state.selKind = 'block';
    }
    changed(false); build(); msg('붙여넣었습니다.' + (clip.dev !== state.dev ? ' (' + (state.dev === 'mobile' ? '모바일' : 'PC') + ' 크기에 맞춤)' : ''));
  }
  function nudge(dx, dy, big) {
    var s = selObj(); if (!s) { return false; }
    var st = big ? 1 : 0.1, o = s.o, r2 = function (v) { return Math.round(v * 100) / 100; };
    if (s.kind === 'block') { o.x = r2(num(o.x) + dx * st); o.y = r2(num(o.y) + dy * st); }
    else if (o.mode === 'over') {
      if (bandVert(o)) { o.y = Math.max(0, r2(num(o.y) + (o.pos === 'left' ? dx : -dx) * st)); }
      else {
        if (!dy) { return true; }
        if (o.pos !== 'custom') { o.y = o.pos === 'top' ? 4 : o.pos === 'bottom' ? 96 : 50; o.pos = 'custom'; }
        o.y = Math.max(0, Math.min(100, r2(num(o.y) + dy * st)));
      }
    } else if (o.mode === 'zone') {
      var grow = o.pos === 'bottom' ? -dy : o.pos === 'top' ? dy : o.pos === 'left' ? dx : -dx;
      if (!grow) { return true; }
      o.zone = Math.max(1, Math.min(40, r2(num(o.zone, 10) + grow * (big ? 1 : 0.1))));
    } else { msg('비·깜빡이는 글씨는 위치가 자동입니다. 개수·크기·속도로 바꿔 보세요.'); return true; }
    changed(true); softBuild(); return true;
  }
  function isTyping(t) { return (t.closest && (t.closest('.ed') || t.closest('[contenteditable=true]'))) || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName); }
  function onKey(e) {
    var t = e.target, k = String(e.key).toLowerCase();
    if (lcKey(e)) { return; }
    if (!(e.ctrlKey || e.metaKey)) {
      if (e.key === 'Escape') {
        var d = document.getElementById('vthD') || (P.ownerDocument || document).getElementById('vthD'); if (d) { d.remove(); return; }
        if (HB.style.display !== 'none') { histToggle(false); return; }
        if (isTyping(t)) { if (t.blur) { t.blur(); } return; }
        e.preventDefault(); state.selKind = 'none'; markSel(); undo(); refreshTB(); return;
      }
      if (isTyping(t) || document.getElementById('vthD')) { return; }
      if (e.key === 'Delete') { e.preventDefault(); deleteSel(); return; }
      var A = { arrowleft: [-1, 0], arrowright: [1, 0], arrowup: [0, -1], arrowdown: [0, 1] }[k];
      if (A && selObj()) { e.preventDefault(); nudge(A[0], A[1], e.shiftKey); }
      return;
    }
    if (k === 's') { e.preventDefault(); saveDraft('', false); return; }
    if (k === 'o') { e.preventDefault(); openDrafts(); return; }
    if (isTyping(t)) { return; }
    if (k === 'd') { e.preventDefault(); dupSel(); return; }
    var selTxt = ''; try { selTxt = String((t.ownerDocument || document).getSelection() || ''); } catch (e2) { }
    if ((k === 'c' || k === 'x') && !selTxt) { if (selObj()) { e.preventDefault(); copySel(k === 'x'); } return; }
    if (k === 'v') { var hasClip = state.clip; if (!hasClip) { try { hasClip = localStorage.getItem('vth-clip'); } catch (e3) { } } if (hasClip) { e.preventDefault(); pasteClip(); } return; }
    if (k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); refreshTB(); }
    else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); redo(); refreshTB(); }
  }
  document.addEventListener('keydown', onKey);
  VTH._onKey = onKey;
  setInterval(refreshTB, 1500);

  state.hist[state.dev] = [JSON.stringify(C())];
  origOf(state.dev);
  if (RESP) { ['pc', 'mobile'].forEach(function (dv) { normBands(state.cfg[dv]); if (!state.hist[dv].length) { state.hist[dv] = [JSON.stringify(state.cfg[dv])]; } origOf(dv); }); }
  if (RESP) { histInit(); impLoad(); impApplyAll(); edSync(); }
  /* 4.0: 쇼핑몰 편집기(?vtedit&vtdraft=web)에서 웹 저장본 불러오기 → 확인 후 '카페24에 바로 저장' */
  if (!WEB && RESP && /[?&]vtdraft=web/.test(location.search)) {
    msg('웹 저장본을 불러오는 중…');
    fetch(WEBAPP + '?api=draft&shop=' + SH.key, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.pc || !d.mobile) { msg('웹에 저장된 것이 없어요.', 1); return; }
      state.cfg.pc = d.pc; state.cfg.mobile = d.mobile; if (d.hdr && state.hdrOn) { state.hdr = d.hdr; } if (d.imp && d.imp.on) { state.imp = d.imp; } if (d.ed && d.ed.hide) { var keepH2 = state.ed && state.ed.hide; state.ed = d.ed; hideMerge(keepH2); } if (d.site && d.site.notice) { if (!d.site.drawer) { d.site.drawer = siteDef().drawer; } if (!d.site.low) { d.site.low = siteDef().low; } if (!d.site.list) { d.site.list = siteDef().list; } if (!d.site.search) { d.site.search = siteDef().search; } if (!d.site.detail) { d.site.detail = siteDef().detail; } if (!d.site.board) { d.site.board = siteDef().board; } if (!d.site.foot) { d.site.foot = siteDef().foot; } state.site = d.site; }
      setBase(); state._lbl = '웹 저장본 불러옴 (' + String(d.savedAt || '').replace('T', ' ').slice(0, 16) + ')'; pushAll(); renderAll(); build();
      msg('웹에서 고친 것을 불러왔어요(' + String(d.savedAt || '').replace('T', ' ').slice(0, 16) + '). 화면을 확인하고 아래 "카페24에 바로 저장"을 누르면 손님 화면에 반영돼요.');
    }).catch(function () { msg('웹 저장본을 불러오지 못했어요. 인터넷 연결을 확인해 주세요.', 1); });
  }
  bindDrag(document);
  applyTo(document, C());
  build();
  msg('저장 전까지 손님 화면은 그대로예요' + (RESP ? ' · ESC = 되돌리기' : '.'));
})();