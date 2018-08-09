var hash = window.location.hash,
  img = $(".radar-img"),
  ldg = $(".loading"),
  stxt = $(".status-text"),
  tw = $(".twitter-block"),
  loadtw = $(".loadtwitter"),
  mdcnt = $(".modal .modal-content"),
  //togglessl = $(".togglessl"),
  anilink = $(".animated-radar"),
  twnotice = $(".traffic-notice"),
  unitnotice = $(".radar-unit-notice");

if (hash == "") {
  window.history.replaceState({}, "", "/#home");
  stxt.load("../content/home.html?v=8.1.0");
  gtag('config', 'UA-78233854-2', {
    'page_path': '/#home'
  });
}

$(document).ready(function() {

  twnotice.hide();

  if (location.protocol === 'http:') {
    $(".imganiold").show();
    $(".gif-badge").hide();
  }

  $(".loadradar").click(function() {
    var data = $(this).data(),
      radarName = data.title,
      aniRadarName = data.anititle,
      radarId = $(this).attr("id"),
      d = new Date(),
      date = d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours(),
      minute5 = d.getMinutes() - (d.getMinutes() % 5),
      minute10 = d.getMinutes() - (d.getMinutes() % 10),
      time5 = date + minute5,
      time20 = date + minute10;
    if (minute10 > 20) {
      time20 = date + "20";
    }
    window.history.replaceState({}, "", "/#" + radarId);
    gtag('config', 'UA-78233854-2', {
      'page_path': '/#' + radarId
    });
    $('.nav-extended').css("top", "0");
    anilink.hide();
    tw.hide();
    twnotice.hide();
    unitnotice.show();
    img.removeAttr("src");
    img.show();
    if (location.protocol === 'https:') {
      if (data.cache == "20") {
        img.attr("src", "https://storage1-cdn.pakin.me/rainradar/gqk2r6/" + time20 + "/" + data.img + "?rainradar=8.1.0");
        //img.attr("src", "https://images.weserv.nl?url=" + data.img + "?rainradar=8.1.0" + time20);
      } else if (data.imganiold === "yes") {
        img.attr("src", "https://cdn.pakin.me/storage/images/blank.gif");
      } else {
        img.attr("src", "https://storage1-cdn.pakin.me/rainradar/gqk2r6/" + time5 + "/" + data.img + "?rainradar=8.1.0");
        //img.attr("src", "https://images.weserv.nl?url=" + data.img + "?rainradar=8.1.0" + time5);
        if (data.imgani === "yes") {
          anilink.html("<a class=\"waves-effect waves-light blue btn-large\" href=\"http://nossl.radar.openbase.co/#" + radarId + "ani\"><img class=\"animated-radar-button\" src=\"/img/play.png\"/> ดูเรดาร์" + aniRadarName + "แบบเคลื่อนไหว</a>");
          anilink.show();
        }
      }
    } else {
      img.attr("src", data.imgprefix + data.img + "?ct=" + time5);
    }
    if (data.type == "info") {
      stxt.html("<h5>" + data.title + "</h5>ข้อมูลจาก" + data.src);
    } else {
      stxt.html("<h5>เรดาร์" + radarName + "</h5>ภาพเรดาร์จาก" + data.src);
    }
    ldg.show();
    img.on('load', function() {
      ldg.hide();
      if (data.imganiold === "yes" && location.protocol === 'https:') {
        stxt.html("<h5>RainRadar เปลี่ยนรูปแบบการโหลดภาพเคลื่อนไหว</h5>กรุณาเลือกเรดาร์ที่ต้องการดูใหม่ครั้ง");
      }
    });
    img.on('error', function() {
      ldg.hide();
      unitnotice.hide();
      img.hide();
      if (data.type === "info") {
        stxt.html("<h5>" + data.title + "</h5>ไม่สามารถโหลดข้อมูลได้<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูภาพเรดาร์แทน");
      } else {
        stxt.html("<h5>เรดาร์" + radarName + "</h5>ไม่สามารถโหลดภาพเรดาร์<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูเรดาร์อื่น");
      }
    });
  });

  var modalhash = window.location.hash;

  $(".modal-trigger").click(function() {
    modalhash = window.location.hash;
    var data = $(this).data();
    $(".modal").attr("alt", data.identity);
    window.history.replaceState({}, "", "/#" + data.identity);
    gtag('config', 'UA-78233854-2', {
      'page_path': '/#' + data.identity
    });
    mdcnt.load(data.url, function(response, status) {
      if (status == "error") {
        mdcnt.html("ไม่สามารถโหลดข้อมูล");
      }
    });
  });

  $('#modal').modal({
    opacity: 0.6,
    in_duration: 425,
    out_duration: 250,
    startingTop: '0%',
    endingTop: '8%',
    complete: function() {
      mdcnt.html("กำลังโหลดข้อมูล กรุณารอสักครู่");
      if (modalhash.match(/faq|about|termsandprivacy|ddslinks|radarclosed/)) {
        window.history.replaceState({}, "", "/#home");
        stxt.load("../content/home.html?v=8.1.0");
        gtag('config', 'UA-78233854-2', {
          'page_path': '/#home'
        });
      } else {
        window.history.replaceState({}, "", modalhash);
        gtag('config', 'UA-78233854-2', {
          'page_path': '/' + modalhash
        });
      }
    }
  });

  $('.dropdown-menu').dropdown({
    inDuration: 325,
    outDuration: 200,
    constrain_width: false,
    hover: false,
    gutter: 0,
    belowOrigin: true,
    alignment: 'left'
  });

  loadtw.click(function() {
    window.history.replaceState({}, "", "/#traffic");
    gtag('config', 'UA-78233854-2', {
      'page_path': '/#traffic'
    });
    window.scrollTo(0, 0);
    $('.nav-extended').css("top", "0");
    if (loadtw.data("click") == 0) {
      img.removeAttr("src");
      unitnotice.hide();
      img.hide();
      ldg.hide();
      anilink.hide();
      stxt.html("<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>");
      ldg.show();
      twnotice.show();

      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, "script", "twitter-wjs"));

      twttr.ready(
        function(twttr) {
          twttr.events.bind(
            'rendered',
            function(event) {
              loadtw.data("click", 1);
              ldg.hide();
              tw.show();
              stxt.html("<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>อัปเดตอัตโนมัติ เมื่อมีข้อมูลใหม่จะแสดงทันที");
            }
          );
        }
      );
    } else {
      img.removeAttr("src");
      unitnotice.hide();
      img.hide();
      anilink.hide();
      stxt.html("<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>อัปเดตอัตโนมัติ เมื่อมีข้อมูลใหม่จะแสดงทันที");
      ldg.hide();
      tw.show();
    }
  });

  $("#home").click(function(e) {
    e.preventDefault();
    window.history.replaceState({}, "", "/#home");
    gtag('config', 'UA-78233854-2', {
      'page_path': '/#home'
    });
    $('.nav-extended').css("top", "0");
    img.removeAttr("src");
    anilink.hide();
    stxt.html("");
    ldg.hide();
    unitnotice.hide();
    img.hide();
    tw.hide();
    twnotice.hide();
    stxt.load("../content/home.html?v=8.1.0");
  });

  // Load image by url
  $(hash).click();

  // Open modal by url
  if (hash.match(/faq|about|termsandprivacy|ddslinks|radarclosed/)) {
    $('#modal').modal('open');
  }

  // Toggle https button
  /*
  if (location.protocol === 'https:') {
    togglessl.text("ใช้งานผ่าน HTTP");
    togglessl.attr("href", "http://radar.openbase.co/");
  }
  */

  // Hide navbar when scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.nav-extended').outerHeight();
  var wrapperHeight = $('.nav-wrapper').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 200);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('.nav-extended').css("top", -wrapperHeight);
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('.nav-extended').css("top", "0");
      }
    }

    lastScrollTop = st;
  }

});
