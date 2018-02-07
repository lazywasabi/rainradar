var hash = window.location.hash,
  img = $(".radar-img"),
  ldg = $(".loading"),
  stxt = $(".status-text"),
  tw = $(".twitter-block"),
  loadtw = $(".loadtwitter"),
  mdcnt = $(".modal .modal-content"),
  togglessl = $(".togglessl");

$(document).ready(function() {

  $(".loadradar").click(function() {
    var data = $(this).data(),
      radarName = $(this).text(),
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
    $('.nav-extended').css("top", "0");
    tw.hide();
    img.removeAttr("src");
    img.show();
    img.attr("src", data.imgprefix + data.img + "?ct=" + time5);
    if (data.type == "info") {
      stxt.html("<h5>" + data.title + "</h5>");
    } else {
      stxt.html("<h5>เรดาร์" + radarName + " (ภาพเคลื่อนไหว)</h5>");
    }
    ldg.show();
    img.on('load', function() {
      ldg.hide();
      if (data.type == "info") {
        stxt.html("<h5>" + data.title + "</h5>ข้อมูลจาก" + data.src);
      } else {
        stxt.html("<h5>เรดาร์" + radarName + " (ภาพเคลื่อนไหว)</h5>ภาพเรดาร์จาก" + data.src);
      }
    });
    img.on('error', function() {
      ldg.hide();
      img.hide();
      if (data.type == "info") {
        stxt.html("<h5>" + data.title + "</h5>ไม่สามารถโหลดข้อมูลได้<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูภาพเรดาร์แทน");
      } else if (location.protocol == 'https:' && data.imgani == "yes") {
        stxt.load("/content/imgani.html");
      } else {
        stxt.html("<h5>เรดาร์" + radarName + "</h5>ไม่สามารถโหลดภาพเรดาร์<br>กรุณาลองใหม่อีกครั้งในอีก 5-10 นาที หรือเลือกดูเรดาร์อื่น");
      }
    });
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

  // Load image by url
  $(hash).click();

});

