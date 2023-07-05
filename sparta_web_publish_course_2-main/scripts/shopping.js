class Shopping {
  // constructor(생성자)
  constructor() {}

  // 첫 번째 shopping-content 만 보여줌
  init($content) {
    $content.children(".shop_content").hide();
    $content.children(".shop_content").eq(0).show();
  }

  // shopping 안에 있는 swiper들을 1페이지로 초기화
  initSwipers(swipers) {
    Object.keys(swipers).forEach((_swiper, index) => {
      const swiper = swipers[_swiper];
      swiper.slideTo(1, 0);
    });
  }

  // index 만큼 swiper 이동 선택된 tab 색상과 컨텐츠 보여줌
  changeSwiper(
    swiper,
    $tabs,
    $tabContent,
    { tabIndex, contentIndex, swiperIndex }
  ) {
    this.changeTabColor($tabs, tabIndex);
    this.changeTabContent($tabContent, contentIndex);
    swiper.slideTo(swiperIndex, 0);
  }

  // 선택된 tab에 해당하는 contents 만 보여주는 함수
  changeTabContent($tabContent, index) {
    $tabContent.children(".shop_content").hide();
    $tabContent.children(".shop_content").eq(index).show();
  }

  // tab 색상을 바꿔주는 함수
  changeTabColor($tabs, index) {
    $tabs.attr("aria-selected", false);
    $tabs.eq(index).attr("aria-selected", true);
  }

  // tab click
  handleTabClick($tabs, $tabContent, swipers) {
    $tabs.on("click", (e) => {
      e.preventDefault();

      // 현재 누른 탭이 상품 탭이면
      // 라이프, 패션, 뷰티, 디지털･레저 중에 랜덤하게 1개 보이기
      if (e.target.text == "상품") {
        const $plusTabs = $("#contents_productAdPlus .category");
        const $plusTabContent = $("#contents_productAdPlus .shop_contents");
        const randomIndex = Math.floor(Math.random() * $plusTabs.length);
        this.changeTabColor($plusTabs, randomIndex);
        this.changeTabContent($plusTabContent, randomIndex);
      }

      const index = $tabs.index(e.target);

      this.changeTabColor($tabs, index);
      this.changeTabContent($tabContent, index);
      if (swipers) {
        this.initSwipers(swipers);
      }
    });
  }
}

const shopping = new Shopping();
