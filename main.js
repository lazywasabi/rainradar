var hash = window.location.hash,
    img = $(".radar-img"),
    ldg = $(".loading"),
    stxt = $(".status-text"),
    tw = $(".twitter-block"),
    loadtw = $(".loadtwitter"),
    mdcnt = $(".modal .modal-content"),
    togglessl = $(".togglessl"),
    d = new Date();

if ( hash == "" ) {
  window.history.replaceState( {} , "", "/#home" );
}

$(document).ready(function() {

  $(".loadradar").click(function() {
    var data = $(this).data(),
        radarName = $(this).text(),
        radarId = $(this).attr("id"),
    window.history.replaceState( {} , "", "/#" + radarId );
    $('.nav-extended').css("top", "0");
    tw.hide();
    img.removeAttr("src");
    img.show();
    if (location.protocol === 'https:') {
      if (data.mirror == "no") {
        img.attr("src", data.img + "?v=" + d.getTime());
      } else {
        img.attr("src", "https://cdn.pakin.me/storage/cache/radarimg/" + d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() - (d.getMinutes() % 10) + "/" + data.imgssl );
      }
    } else {
      img.attr("src", data.img + "?v=" + d.getTime());
    }
    if (data.type == "info") {
      stxt.html("<h5>" + data.title + "</h5>");
    } else {
      stxt.html("<h5>เรดาร์" + radarName + "</h5>");
    }
    ldg.show();
    img.on('load', function() {
      ldg.hide();
      if (data.type == "info") {
        stxt.html("<h5>" + data.title + "</h5>ข้อมูลจาก" + data.src);        
      } else {
        stxt.html("<h5>เรดาร์" + radarName + "</h5>เรดาร์นี้อยู่ในการดูแลของ" + data.src);
      }
    });
    img.on('error', function() {
      ldg.hide();
      img.hide();
      if (data.type == "info") {
        stxt.html("<h5>" + data.title + "</h5>ไม่สามารถโหลดข้อมูลได้<br>กรุณาลองใหม่อีกครั้ง หรือเลือกดูภาพเรดาร์แทน");
      } else {
        stxt.html("<h5>เรดาร์" + radarName + "</h5>ไม่สามารถโหลดภาพเรดาร์<br>กรุณาลองใหม่อีกครั้ง หรือเลือกดูเรดาร์อื่น");
      }
    });
  });

  var modalhash =  window.location.hash;
  
  $(".modal-trigger").click(function() {
    modalhash =  window.location.hash;    
    var data = $(this).data();
    $(".modal").attr("alt",data.identity);
    window.history.replaceState( {} , "", "/#" + data.identity );    
    mdcnt.load(data.url, function( response, status ) {
      if ( status == "error" ) {
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
      if (modalhash.match(/faq|about|terms|ddslinks/)) {
        window.history.replaceState( {} , "", "/#home" );
      } else {
        window.history.replaceState( {} , "", modalhash );
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
    window.history.replaceState( {} , "", "/#traffic" );
    window.scrollTo(0,0);
    $('.nav-extended').css("top", "0");
    if (loadtw.data("click") == 0){
      img.removeAttr("src");
      img.hide();
      ldg.hide();
      stxt.html("<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>");
      ldg.show();
      
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
      img.hide();
      stxt.html("<h5>ข้อมูลการจราจรจากทวิตเตอร์</h5>อัปเดตอัตโนมัติ เมื่อมีข้อมูลใหม่จะแสดงทันที");
      ldg.hide();
      tw.show();
    }
  });

  $(".brand-logo").click(function(e) {
    e.preventDefault();
    window.history.replaceState( {} , "", "/#home" );
    $('.nav-extended').css("top", "0");
    img.removeAttr("src");
    stxt.html("");
    ldg.hide();    
    img.hide();
    tw.hide();
    stxt.load("/content/default.html");
  });

  // Load image by url
  $(hash).click();

  // Open modal by url
  if ( hash.match( /faq|about|terms|ddslinks/ ) ) {
    $('#modal').modal('open');
  }

  // Toggle https button
  if (location.protocol === 'https:') {
    togglessl.text("ใช้งานผ่าน HTTP");
    togglessl.attr("href", "http://radar.pakin.me/");
  }    

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
  }, 250);

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
