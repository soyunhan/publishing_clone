// 변수 설정

// 가장 최상단 박스
const $nm_int_right = $("#NM_INT_RIGHT");

// locations
const $sc_my = $nm_int_right.find(".sc_my");
const $content = $nm_int_right.find("#contents");

// 동적으로 html 생성후(ajax 요청후) 설정해줄 변수들
// tabs (알림, MY구독, 메일, 카페, 블로그 ...)
const $loginTabs = $sc_my.find("#NM_MY_TAB .tab");
const $loginTabContents = $sc_my.find(".sc_service .service_wrap");
const $shoppingTabs = $nm_int_right.find("#tab_title .tab");
const $shoppingTabContent = $nm_int_right.find("#contents");

// 내가 사용할 swiper 객체들
// loing swiper
let loginSwiper = null;
// timesquare swiper (이슈, live, 증시, 환율)
let timesquareSwiper = null;
// shopping swiper (트렌드쇼핑 상품)
let shoppingSwiper = null;
// event swiper (반갑다! 쇼핑뉴스)
let eventSwiper = null;
// plus swipers (라이프, 패션, 뷰티, 디지털･레저)
let plusLifeSwiper = null;
let plusFashionSwiper = null;
let plusBeautyeSwiper = null;
let plusDigitalSwiper = null;

// loginSwiper 생성
loginSwiper = new Swiper(".sc_my .loginSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  navigation: {
    nextEl: "#NM_MY_TAB_next",
    prevEl: "#NM_MY_TAB_prev",
  },
  watchOverflow: true, // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
  on: {
    slideChangeTransitionStart: function (swiper) {
      login.initTab($loginTabs, $loginTabContents);
    },
  },
});

// loginTab click 이벤트 달기
login.handleClick($loginTabs);

// timesquareSwiper 생성
timesquareSwiper = new Swiper("#NM_TS_ROLLING_WRAP .timesquareSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
  },
  navigation: {
    nextEl: "#timesquare .card_nav .btn_next",
    prevEl: "#timesquare .card_nav .btn_prev",
  },
});

// shoppingSwiper 생성
shoppingSwiper = new Swiper("#shopcast .productSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  spaceBetween: 15,
  navigation: {
    nextEl: "#contents_productAd .btn_next",
    prevEl: "#contents_productAd .btn_prev",
  },
  pagination: {
    el: "#contents_productAd .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
        <em class="current">
          <span class="blind">현재</span><span class="${currentClass}"></span>
        </em>
        <span class="blind">전체</span>/ <span class="${totalClass}"></span>
      `;
    },
    type: "fraction",
  },
});

// eventSwiper 생성
eventSwiper = new Swiper("#contents_productAdBanner .eventSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  navigation: {
    nextEl: "#contents_productAdBanner .btn_next",
    prevEl: "#contents_productAdBanner .btn_prev",
  },
  pagination: {
    el: "#contents_productAdBanner .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
        <em class="current">
          <span class="blind">현재</span><span class="${currentClass}"></span>
        </em>
        <span class="blind">전체</span>/ <span class="${totalClass}"></span>
      `;
    },
    type: "fraction",
  },
});

// plusLifeSwiper 생성
plusLifeSwiper = new Swiper("#contents_productAdPlus .plusLifeSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: "#contents_productAdPlus .shop_life .btn_next",
    prevEl: "#contents_productAdPlus .shop_life .btn_prev",
  },
  pagination: {
    el: "#contents_productAdPlus .shop_life .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
        <em class="current">
          <span class="blind">현재</span><span class="${currentClass}"></span>
        </em>
        <span class="blind">전체</span>/ <span class="${totalClass}"></span>
      `;
    },
    type: "fraction",
  },
  on: {
    slideChange: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;

      const $tabs = $("#contents_productAdPlus").find(".category");
      const $tabContent = $("#contents_productAdPlus").find(".shop_contents");

      let prevSwiperIndex = null;
      let nextFashionSwiper = 1;
      if (plusDigitalSwiper) {
        prevSwiperIndex =
          plusDigitalSwiper.slides.length == 1
            ? 1
            : plusDigitalSwiper.slides.length - 2;
      }
      if (index == 0) {
        // 이전 탭(디지털･레저)으로 이동
        shopping.changeSwiper(plusDigitalSwiper, $tabs, $tabContent, {
          tabIndex: 3,
          contentIndex: 3,
          swiperIndex: prevSwiperIndex,
        });
      } else if (index > total) {
        // 이후 탭(패션)으로 이동
        shopping.changeSwiper(plusFashionSwiper, $tabs, $tabContent, {
          tabIndex: 1,
          contentIndex: 1,
          swiperIndex: nextFashionSwiper,
        });
      }
    },
  },
});

// plusFashionSwiper 생성
plusFashionSwiper = new Swiper("#contents_productAdPlus .plusFashionSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: "#contents_productAdPlus .shop_fashion .btn_next",
    prevEl: "#contents_productAdPlus .shop_fashion .btn_prev",
  },
  pagination: {
    el: "#contents_productAdPlus .shop_fashion .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
          <em class="current">
            <span class="blind">현재</span><span class="${currentClass}"></span>
          </em>
          <span class="blind">전체</span>/ <span class="${totalClass}"></span>
        `;
    },
    type: "fraction",
  },
  on: {
    slideChange: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;

      const $tabs = $("#contents_productAdPlus").find(".category");
      const $tabContent = $("#contents_productAdPlus").find(".shop_contents");

      let prevSwiperIndex = null;
      let nextFashionSwiper = 1;
      if (plusLifeSwiper) {
        prevSwiperIndex =
          plusLifeSwiper.slides.length == 1
            ? 1
            : plusLifeSwiper.slides.length - 2;
      }
      if (index == 0) {
        // 이전 탭(라이프))으로 이동
        shopping.changeSwiper(plusLifeSwiper, $tabs, $tabContent, {
          tabIndex: 0,
          contentIndex: 0,
          swiperIndex: prevSwiperIndex,
        });
      } else if (index > total) {
        // 이후 탭(뷰티)으로 이동
        shopping.changeSwiper(plusBeautyeSwiper, $tabs, $tabContent, {
          tabIndex: 2,
          contentIndex: 2,
          swiperIndex: nextFashionSwiper,
        });
      }
    },
  },
});

// plusBeautyeSwiper 생성
plusBeautyeSwiper = new Swiper("#contents_productAdPlus .plusBeautyeSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: "#contents_productAdPlus .shop_beauty .btn_next",
    prevEl: "#contents_productAdPlus .shop_beauty .btn_prev",
  },
  pagination: {
    el: "#contents_productAdPlus .shop_beauty .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
          <em class="current">
            <span class="blind">현재</span><span class="${currentClass}"></span>
          </em>
          <span class="blind">전체</span>/ <span class="${totalClass}"></span>
        `;
    },
    type: "fraction",
  },
  on: {
    slideChange: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;

      const $tabs = $("#contents_productAdPlus").find(".category");
      const $tabContent = $("#contents_productAdPlus").find(".shop_contents");

      let prevSwiperIndex = null;
      let nextFashionSwiper = 1;
      if (plusFashionSwiper) {
        prevSwiperIndex =
          plusFashionSwiper.slides.length == 1
            ? 1
            : plusFashionSwiper.slides.length - 2;
      }
      if (index == 0) {
        // 이전 탭(패션)으로 이동
        shopping.changeSwiper(plusFashionSwiper, $tabs, $tabContent, {
          tabIndex: 1,
          contentIndex: 1,
          swiperIndex: prevSwiperIndex,
        });
      } else if (index > total) {
        // 이후 탭(디지털･레저)으로 이동
        shopping.changeSwiper(plusDigitalSwiper, $tabs, $tabContent, {
          tabIndex: 3,
          contentIndex: 3,
          swiperIndex: nextFashionSwiper,
        });
      }
    },
  },
});

// plusDigitalSwiper 생성
plusDigitalSwiper = new Swiper("#contents_productAdPlus .plusDigitalSwiper", {
  observer: true,
  observeParents: true,
  parallax: true,
  // loop: true,
  spaceBetween: 10,
  navigation: {
    disabledClass: "none",
    nextEl: "#contents_productAdPlus .shop_digital .btn_next",
    prevEl: "#contents_productAdPlus .shop_digital .btn_prev",
  },
  pagination: {
    el: "#contents_productAdPlus .shop_digital .swiper-pagination",
    renderFraction: function (currentClass, totalClass) {
      return `
          <em class="current">
            <span class="blind">현재</span><span class="${currentClass}"></span>
          </em>
          <span class="blind">전체</span>/ <span class="${totalClass}"></span>
        `;
    },
    type: "fraction",
  },
  // 사진이 1줄만 나오기 때문에 기존 로직으로 판별 불가
  // on: {
  //   slideChange: function (swiper) {
  //     const real = swiper.realIndex;
  //     const index = swiper.activeIndex;
  //     const total = swiper.slides.length - 2;
  //     if (index == 0) {
  //       // $(".category_fashion").click();
  //     } else if (index > total) {
  //       // $(".category_digital").click();
  //     }
  //     console.log(real,index, total)
  //   },
  // },
});
// 사진이 1줄만 나올 때 예외 처리
// 간단히 이곳에서 바로 이벤트 연결
$(".shop_digital .btn").on("click", function () {
  const $tabs = $("#contents_productAdPlus").find(".category");
  const $tabContent = $("#contents_productAdPlus").find(".shop_contents");

  let prevSwiperIndex = null;
  let nextFashionSwiper = 1;
  if (plusBeautyeSwiper) {
    prevSwiperIndex =
      plusBeautyeSwiper.slides.length == 1
        ? 1
        : plusBeautyeSwiper.slides.length - 2;
  }

  const isPrev = $(this).hasClass("btn_prev");

  if (isPrev) {
    // 이전 탭(뷰티)으로 이동
    shopping.changeSwiper(plusBeautyeSwiper, $tabs, $tabContent, {
      tabIndex: 2,
      contentIndex: 2,
      swiperIndex: prevSwiperIndex,
    });
  } else {
    // 이후 탭(라이프)으로 이동
    shopping.changeSwiper(plusLifeSwiper, $tabs, $tabContent, {
      tabIndex: 0,
      contentIndex: 0,
      swiperIndex: nextFashionSwiper,
    });
  }
});

// event 라이프, 패션, 뷰티,  디지털･레저 init
shopping.init($content.find("#contents_productAdPlus .shop_contents"));

// event 라이프, 패션, 뷰티,  디지털･레저 tab control
(() => {
  const $tabs = $content.find("#contents_productAdPlus .category");
  const $tabContent = $content.find("#contents_productAdPlus .shop_contents");
  shopping.handleTabClick($tabs, $tabContent, {
    plusLifeSwiper,
    plusFashionSwiper,
    plusBeautyeSwiper,
    plusDigitalSwiper,
  });
})();

// shopping init 이벤트 달기
shopping.init($content);

// shopping click 이벤트 달기
shopping.handleTabClick($shoppingTabs, $shoppingTabContent, {
  shoppingSwiper,
  eventSwiper,
  plusLifeSwiper,
  plusFashionSwiper,
  plusBeautyeSwiper,
  plusDigitalSwiper,
});
