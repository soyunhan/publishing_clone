const swiperArray = []; // 종합/경제, 방송/통신 ... swiper 객체를 담을 배열
let totalSwiper = null;
let broadcastSwiper = null;
let itSwiper = null;

// 왼쪽 종합/경제, 방송/통신 옵션들 색 바꿔주는 함수
const changeOptionColor = ($options, $self) => {
  // 전체 option_item 에 option_on class 제거
  $options.removeClass('option_on');
  // 선택된 option_item option_on class 추가
  $self.addClass('option_on');
};

// index에 해당하는 container를 보여주는 함수
const changeContainer = ($containers, index) => {
  // 전체 containers hide
  $containers.hide();
  // 선탠된 container 만 show
  $containers.eq(index).show();
};

// swiper 이동
const moveSwiper = (index, pageIndex) => {
  swiperArray[index].slideTo(pageIndex, 0);
};

// option에 해당 하는 swiper navigation 연결
const connectSwiperNav = swiper => {
  // 모든 스와이퍼 네비 연결 끊기
  swiperArray.forEach(swiper => {
    swiper.navigation.destroy();
  });
  // 선택된 option에 해당 하는 swiper 네비 연결
  swiper.navigation.init();
};

// initSwiperNav
// 처음 나오는 totalSwiper에만 navigation 연결
const initSwiperNav = () => {
  // 모든 스와이퍼 네비 연결 끊기
  swiperArray.forEach(swiper => {
    swiper.navigation.destroy();
  });
  // 초기 스와이퍼(totalSwiper) 네비만 연결
  totalSwiper.navigation.init();
};

// 왼쪽 option (종합/경제, 방송/통신, IT) 클릭시
// _NM_NEWSSTAND_ARTICLE_CONTAINER 이동
const clickOptions = () => {
  const $options = $('#NM_NEWSSTAND_DEFAULT_LIST .list_option .option_item');
  const $containers = $('#NM_NEWSSTAND_DEFAULT_LIST ._NM_NEWSSTAND_ARTICLE_CONTAINER');
  $options.on('click', (e, lastPage) => {
    const $self = $(e.currentTarget);
    const index = $options.index($self);
    changeOptionColor($options, $self);
    changeContainer($containers, index);
    if (lastPage) {
      moveSwiper(index, lastPage);
    } else {
      moveSwiper(index, 1);
    }
    connectSwiperNav(swiperArray[index]);
  });
};

// 스와이퍼 옵션 참고
// https://velog.io/@function_dh/JavaScript-Swiper-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EA%B5%AC%ED%98%84

// group_issue_swiper 객체 생성
const group_issue_swiper = new Swiper('.group-issue-swiper', {
  direction: 'vertical',
  speed: 1000, // transition speed
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

// totalSwiper 객체 생성
totalSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .totalSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  // autoplay: {  // autoplay 로도 실행 가능 합니다 주석을 풀어서 테스트해 보세요
  //   delay: 3000,
  //   disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
  // },
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_1 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        // 지역 option 클릭 => 지역 에 해당하는 container 보임
        // 지역의 마지막 페이지로 가기위해 trigger 메소드를 이용
        // 2번째 인자에 totalSwiper 의 총 슬라이드를 계산하여 넣고 실행
        $('.option_item_7').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        // 방송/통신 option 클릭 => 방송/통신 에 해당하는 container 보임
        $('.option_item_2').click();
      }
    },
  },
});

// broadcastSwiper 객체 생성
broadcastSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .broadcastSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_2 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        // 종합/경제 option 클릭 => 종합/경제 에 해당하는 container 보임
        // 종합/경제에 마지막 페이지로 가기위해 trigger 메소드를 이용
        // 2번째 인자에 totalSwiper 의 총 슬라이드를 계산하여 넣고 실행
        $('.option_item_1').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        // IT option 클릭 => IT 에 해당하는 container 보임
        $('.option_item_3').click();
      }
    },
  },
});

// itSwiper 객체 생성
itSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .itSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_3 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        $('.option_item_2').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        $('.option_item_4').click();
      }
    },
  },
});

// englishSwiper 객체 생성
englishSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .englishSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_4 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        $('.option_item_3').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        $('.option_item_5').click();
      }
    },
  },
});

// sportsSwiper 객체 생성
sportsSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .sportsSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_5 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        $('.option_item_4').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        $('.option_item_6').click();
      }
    },
  },
});

// magazineSwiper 객체 생성
magazineSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .magazineSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_6 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        $('.option_item_5').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        $('.option_item_7').click();
      }
    },
  },
});

// locationSwiper 객체 생성
locationSwiper = new Swiper('#NM_NEWSSTAND_DEFAULT_LIST .locationSwiper', {
  observer: true,
  observeParents: true,
  loop: true,
  navigation: {
    prevEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_prev_l',
    nextEl: '#NM_NEWSSTAND_DEFAULT_LIST .pm_btn_next_l',
  },
  pagination: {
    el: '.option_item_7 .swiper-pagination',
    renderFraction: function (currentClass, totalClass) {
      return `
      <div class="num_box">
        <span class="current ${currentClass}"></span> / <span class="all ${totalClass}"></span>
      </div>
      `;
    },
    type: 'fraction',
  },
  on: {
    slideChangeTransitionStart: function (swiper) {
      const index = swiper.activeIndex;
      const total = swiper.slides.length - 2;
      if (index === 0) {
        $('.option_item_6').trigger('click', totalSwiper.slides.length === 1 ? 1 : totalSwiper.slides.length - 2);
      } else if (index > total) {
        $('.option_item_1').click();
      }
    },
  },
});

// 구독하기 클릭시
const clickSubscribe = () => {
  $subBtn = $('#NM_NEWSSTAND_DEFAULT_LIST ._NM_NEWSSTAND_LIST_subscribe_press');
  $subBtn.on('click', () => {
    alert('구독하였습니다.');
  });
};

// 구독한 언론사, 전체 언론사 클릭시
const clickSortArea = () => {
  $sortBtns = $('#NM_NEWSSTAND_data_buttons .btn_sort');
  $sortBtns.on('click', e => {
    const $self = $(e.currentTarget);
    // NM_NEWSSTAND_VIEW_CONTAINER 아래 group_news 를 모두 숨김
    $('#NM_NEWSSTAND_VIEW_CONTAINER .group_news').hide();
    // NM_NEWSSTAND_data_buttons 아래 btn_sort 에 sort_on 클래스를 모두 제거
    $('#NM_NEWSSTAND_data_buttons .btn_sort').removeClass('sort_on');

    if ($self.data('type') === 'my') {
      // 구독한 언론사 클릭시
      // 구독한 언론사 #NM_NEWSSTAND_MY_EMPTY 만 보여줌
      $('#NM_NEWSSTAND_VIEW_CONTAINER #NM_NEWSSTAND_MY_EMPTY').show();
      // NM_NEWSSTAND_data_buttons 아래 btn_sort 에 data-type="my" 요소에 sort_on 클래스 추가
      $('#NM_NEWSSTAND_data_buttons .btn_sort[data-type="my"]').addClass('sort_on');
    } else {
      // 전체언론사 #NM_NEWSSTAND_DEFAULT_LIST 만 보여줌
      $('#NM_NEWSSTAND_VIEW_CONTAINER #NM_NEWSSTAND_DEFAULT_LIST').show();
      // NM_NEWSSTAND_data_buttons 아래 btn_sort 에 data-type="all" 요소에 sort_on 클래스 추가
      $('#NM_NEWSSTAND_data_buttons .btn_sort[data-type="all"]').addClass('sort_on');
    }
  });
};

// NM_NEWSSTAND_view_buttons
// ico_list, ico_title 클릭시
const clickSetArea = () => {
  // role이 button 인 요소들만 선택
  const $setBtn = $('#NM_NEWSSTAND_view_buttons .btn_set[role="button"]');

  $setBtn.on('click', e => {
    $self = $(e.currentTarget);

    // 전체 언론사로 항상 이동
    $('#NM_NEWSSTAND_data_buttons .btn_sort[data-type="all"]').click();
    // NM_NEWSSTAND_VIEW_CONTAINER 아래 group_news 를 모두 숨김
    $('#NM_NEWSSTAND_VIEW_CONTAINER .group_news').hide();
    // 전체 버튼에서 set_on class 제거
    $setBtn.removeClass('set_on');

    if ($self.data('type') === 'list') {
      // data-type list 클릭
      // list_option에서 option_item option_item_1(종합/경제)을 보여줌
      $('#NM_NEWSSTAND_DEFAULT_LIST .list_option .option_item_1').click();

      // #NM_NEWSSTAND_DEFAULT_LIST 만 보여줌
      $('#NM_NEWSSTAND_VIEW_CONTAINER #NM_NEWSSTAND_DEFAULT_LIST').show();

      // 선택된 요소에만 set_on class 생성
      $self.addClass('set_on');
    } else {
      // data-type thumb 클릭

      // #NM_NEWSSTAND_DEFAULT_THUMB 만 보여줌
      $('#NM_NEWSSTAND_VIEW_CONTAINER #NM_NEWSSTAND_DEFAULT_THUMB').css('display', 'flex');

      $self.addClass('set_on');
    }
  });
};

$('#NM_THEME_CATE_GROUPS a').on('click', evt => {
  evt.preventDefault();
});

clickSetArea();
clickSortArea();
clickSubscribe();
swiperArray.push(totalSwiper, broadcastSwiper, itSwiper, englishSwiper, sportsSwiper, magazineSwiper, locationSwiper);
initSwiperNav();
clickOptions();
