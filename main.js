$(document).ready(function() {
    $(".loadradar").click(function() {
        var data = $(this).data();
        var radarName = $(this).text();
        $(".radar-img").attr("src", data.img + "?v=" + new Date().getTime());
        $(".status-text").hide();
        $(".status-text").html("<h5>เรดาร์" + radarName +"</h5>กำลังโหลดภาพเรดาร์<div class='progress'><div class='indeterminate'></div></div>");
        $(".status-text").show();
        $('.radar-img').fadeOut(200);
        $('.radar-img').on('load', function() {
            $('.radar-img').fadeIn(325);
            $(".status-text").html("<h5>เรดาร์" + radarName +"</h5> เรดาร์นี้อยู่ในการดูแลของ" + data.src);
        });
        $('.radar-img').on('error', function() {
            $(".status-text").html("<h5>ไม่สามารถโหลดภาพเรดาร์</h5>กรุณาลองใหม่อีกครั้ง หรือเลือกดูเรดาร์อื่น");
        });
    });
    $('.modal').modal({
        opacity: 0.6,
        in_duration: 425,
        out_duration: 250,
    });
    $('.dropdown-menu').dropdown({
        inDuration: 325,
        outDuration: 200,
        constrain_width: true,
        hover: false,
        gutter: 0,
        belowOrigin: false,
        alignment: 'left'
    });
});
