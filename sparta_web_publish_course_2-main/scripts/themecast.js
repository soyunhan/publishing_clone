// 변수 선언

// theme-swiper 객체 담을 변수
let theme_swiper = null;

// 현재 슬라이더 위치를 담을 변수
let slide_count = 2;

// 현재 tab의 위치를 담을 변수
let li_count = 1;

// tab 요소 전체
const $themeTabs = $("#NM_THEME_CATE_FLICK .swiper-slide ._NM_THEME_CATE");

// 컨텐츠 요소
const $theme_conts = $("#themecast .theme_conts");

// theme swiper 좌/우 버튼
const $theme_swiper_btns = $('#NM_THEME_CATE_GROUPS a[role="button"]');

// 선택된 tab (JOB&, 테크, 여행+, 과학 ...) 에 해당하는 content 보여 주는 함수
const showContent = (slide_count, li_count) => {
  // 현재 보여줄 content의 index를 계산
  const index = 8 * (slide_count - 1) + li_count - 1;

  // 전체 content를 숨김
  // 그후 보여줄 content만 보여줌
  $theme_conts.find(".theme_cont").hide();
  $theme_conts.find(".theme_cont").eq(index).show();
};

// 선택된 tab (JOB&, 테크, 여행+, 과학 ...) 에 해당하는 content 보여 주는 함수
const showThemeContent = (slide_count, li_count) => {
  // 현재 보여줄 content의 index를 계산
  const index = 8 * (slide_count - 1) + li_count - 1;

  // 전체 content를 숨김
  // 그후 보여줄 content만 보여줌
  $theme_conts.find(".theme_cont").hide();
  $theme_conts.find(".theme_cont").eq(index).show();
};

// 테마 swiper에 좌/우 버튼 클릭시
// 8번째 마다 theme-swiper 에 next slide 보여줌
const clickThemeSwiperBtns = () => {
  $theme_swiper_btns.on("click", (e) => {
    const $self = $(e.currentTarget);
    const isPrev = $self.hasClass("pm_btn_prev");

    if (isPrev) {
      // 이전 버튼 눌렀을 때

      // 다음 버튼이 none 되어있으면 block 전환하여 보여준다
      if ($theme_swiper_btns.eq(1).css("display") === "none") {
        $theme_swiper_btns.eq(1).css("display", "block");
      }

      if (li_count === 1) {
        li_count = 8;
        slide_count--;
        theme_swiper.slidePrev();
      } else {
        li_count--;
      }

      let $currentTab = $("#NM_THEME_CATE_FLICK .swiper-slide")
        .eq(slide_count - 1)
        .find('._NM_THEME_CATE[aria-selected="true"');
      // 이전 slide로 넘어 왔다면
      if ($currentTab.length === 0) {
        // 전체 tab에 aria-selected="fasle"로 바꾼후
        // 현재 슬라이드에 마지막 tab 을 aria-selected="true"로 바꿔줌
        $("#NM_THEME_CATE_FLICK .swiper-slide ._NM_THEME_CATE").attr(
          "aria-selected",
          false
        );
        $("#NM_THEME_CATE_FLICK .swiper-slide")
          .eq(slide_count - 1)
          .find("._NM_THEME_CATE:last")
          .last()
          .attr("aria-selected", true);
      } else {
        const $currentUl = $currentTab.closest(".list_category");

        // ul 밑에 tab에 붙은 aria-selected="false" 로 바꾼후
        // 이전 tab에 aria-selected="true" 로 바꿈
        $currentUl.find("._NM_THEME_CATE").attr("aria-selected", false);
        $currentUl
          .find("._NM_THEME_CATE")
          .eq(li_count - 1)
          .attr("aria-selected", true);
      }

      // 첫 번째 슬라이드 첫 번째 tab 에서 버튼을 숨긴다.
      if (slide_count == 1 && li_count === 1) {
        $theme_swiper_btns.eq(0).hide();
      }

      // 이전 컨텐츠 보여줌
      showContent(slide_count, li_count);
    } else {
      // 다음 버튼 눌렀을 때

      // 이전 버튼이 none 되어있으면 block 전환하여 보여준다
      if ($theme_swiper_btns.eq(0).css("display") === "none") {
        $theme_swiper_btns.eq(0).css("display", "block");
      }

      if (li_count === 8) {
        li_count = 1;
        slide_count++;
        theme_swiper.slideNext();
      } else {
        li_count++;
      }

      let $currentTab = $("#NM_THEME_CATE_FLICK .swiper-slide")
        .eq(slide_count - 1)
        .find('._NM_THEME_CATE[aria-selected="true"');
      // 다음 slide로 넘어 왔다면
      if ($currentTab.length === 0) {
        // 전체 tab에 aria-selected="fasle"로 바꾼후
        // 현재 슬라이드에 첫 번째 tab 을 aria-selected="true"로 바꿔줌
        $("#NM_THEME_CATE_FLICK .swiper-slide ._NM_THEME_CATE").attr(
          "aria-selected",
          false
        );
        $("#NM_THEME_CATE_FLICK .swiper-slide")
          .eq(slide_count - 1)
          .find("._NM_THEME_CATE")
          .eq(0)
          .attr("aria-selected", true);
      } else {
        const $currentUl = $currentTab.closest(".list_category");

        // ul 밑에 tab에 붙은 aria-selected="false" 로 바꾼후
        // 다음 tab에 aria-selected="true" 로 바꿈
        $currentUl.find("._NM_THEME_CATE").attr("aria-selected", false);
        $currentUl
          .find("._NM_THEME_CATE")
          .eq(li_count - 1)
          .attr("aria-selected", true);
      }

      // 마지막 슬라이드 마지막 tab 에선 다음 버튼을 숨긴다.
      if (slide_count === 3 && li_count === 8) {
        $theme_swiper_btns.eq(1).hide();
      }

      // 다음 컨텐츠 보여줌
      showContent(slide_count, li_count);
    }
  });
};

// theme-swiper 객체 생성
theme_swiper = new Swiper("#NM_THEME_CATE_FLICK .theme-swiper", {
  observer: true,
  observeParents: true,
  allowTouchMove: false,  // touch 비활성화
  initialSlide: 1, // 시작 슬라이더 설정
});

// tab (JOB&, 테크, 여행+, 과학 ...) 클릭시
// 해당 컨텐츠만 보여줌
const clickThemeTab = () => {
  $themeTabs.on("click", (e) => {
    console.log(e.currentTarget);
    const $self = $(e.currentTarget);
    const $lis = $self.closest(".list_category").find(".category_item");
    const $li = $self.parent();
    const index = $lis.index($li);

    showThemeContent(slide_count, index + 1);

    // 탭 색상도 바꿔준다
    $lis.find("._NM_THEME_CATE").attr("aria-selected", false);
    $self.attr("aria-selected", true);

    // 현재 탭위치도 수정해 준다 (li_count)
    li_count = index + 1;

    // 항상 이전/다음 버튼 보여줌
    $theme_swiper_btns.show();

    // 클릭한 탭이 첫 번째 슬라이드 첫번째 탭 이면
    // 이전 버튼 숨김
    // 클릭한 탭이 마지막 슬라이드 마지막 탭 이면
    // 다음 버튼 숨김
    if (slide_count == 1 && li_count === 1) {
      $theme_swiper_btns.eq(0).hide();
    } else if (slide_count === 3 && li_count === 8) {
      $theme_swiper_btns.eq(1).hide();
    }
  });
};

// 관심주제 설정 클릭시 알림창
const clickThemeEditSet = () => {
  $("#NM_THEME_EDIT_SET").on("click", () => {
    alert("관심주제 설정 클릭!");
  });
};

clickThemeTab();
clickThemeEditSet();
clickThemeSwiperBtns();
showThemeContent(slide_count, li_count);
