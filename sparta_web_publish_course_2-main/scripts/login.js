class Login {
  // constructor(생성자)
  constructor() {}

  // tab을 초기화 하는 함수
  initTab($tabs, $tabContents) {
    this.initTabColor($tabs);
    this.initTabContent($tabContents);
  }

  // 좌/우 로 스와이프시 tab 색상을 초기화 시켜주는 함수
  initTabColor($tabs) {
    // 모든 tab에 aria-selected 속성 false
    $tabs.attr("aria-selected", false);
  }

  // 좌/우 로 스와이프시 tabcontents 안 보이게 하는 함수
  initTabContent($tabContents) {
    $tabContents.hide();
  }

  // login tab (알림, MY구독, 메일, 카페, 블로그 ...) 클릭시
  handleClick($tabs) {
    $tabs.on("click", (e) => {
      e.preventDefault();
      // for tabs
      const $tabs = $(e.target).parent(".tab_box").find(".tab");
      // 현재 tab_box 의 위치에따라 (0, 1, 2) changeTabContent 함수에 index 에 +5, +10 해주어야함
      const tab_box_index =
        $(e.target)
          .parents(".tab_box_wrap")
          .find(".tab_box")
          .index($tabs.parent()) + 1;
      const $tab = $(e.target);

      // for tabcontents
      const $tabcontent_wrap = $(e.target)
        .parents(".my_cont")
        .find(".sc_service");
      const $tabcontents = $tabcontent_wrap.find(".service_wrap");
      const index = $tabs.index($tab);

      // 함수 실행 부분
      this.changeTabColor(e, $tab, $tabs);
      this.changeTabContent(e, $tabcontents, tab_box_index, index);
    });
  }

  // tab 색상을 바꿔주는 함수
  changeTabColor(e, $tab, $tabs) {
    // 이미 색상이 바뀌어져 있으면 == 한번 눌러졌으면
    // 다시 색을 바꿔준 후 조기리턴
    if ($tab.attr("aria-selected") === "true") {
      $tab.attr("aria-selected", false);
      return;
    }

    // 모든 tab에 aria-selected 속성 false
    // 그후 선택된 요소에만 aria-selected 속성 true
    $tabs.attr("aria-selected", false);
    $tab.attr("aria-selected", true);
  }

  // 선택된 tab에 해당하는 contents 만 보여주는 함수
  changeTabContent(e, $tabcontents, tab_box_index, index) {
    if (tab_box_index === 2) {
      index += 5;
    } else if (tab_box_index === 3) {
      index += 10;
    }

    // 이미 contents가 보여 주고있으면
    // ccontents를 다시 닫아준 후 조기리턴
    if ($tabcontents.eq(index).css("display") === "flex") {
      $tabcontents.eq(index).css({ display: "none" });
      return;
    }

    $tabcontents.hide();

    $tabcontents.eq(index).css({ display: "flex" });
  }
}

const login = new Login();

