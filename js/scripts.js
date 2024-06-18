$(document).ready(function () {
  let headerHeight = $("header").outerHeight();
  $(window).scroll(function () {
    if ($(window).scrollTop() >= headerHeight) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });

  $(".scroll-top").click(function () {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    }
  });
  $(".faq-item-title").on("click", function () {
    $(this).closest(".faq-item").toggleClass("active");
  });

  // Anchor links smooth scrolling
  $('.main-navigation a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - headerHeight,
          },
          1000
        );
        return false;
      }
    }
  });

  // Mobile menu
  // $(".main-navigation a").click(function (e) {
  //   e.preventDefault();
  //   if ($(".main-navigation").hasClass("toggled")) {
  //     $(".main-navigation").toggleClass("toggled");
  //     $(".hamburger").toggleClass("is-active");
  //   }
  // });

  function marginTopHeader() {
    $(".first-section").css("margin-top", headerHeight);
  }
  marginTopHeader();
});
