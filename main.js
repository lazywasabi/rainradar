$(document).ready(function() {
    $(".loadradar").click(function() {
        var data = $(this).data();
        var radarName = $(this).text();
        $(".radar-img").attr("src", "");
        $(".radar-img").show();
        $(".radar-img").attr("src", data.img + "?v=" + new Date().getTime());
        $(".status-text").html("<h5>เรดาร์" + radarName +"</h5>");
        $(".loading").show();
        $('.radar-img').on('load', function() {
            $(".loading").hide();
            $(".status-text").html("<h5>เรดาร์" + radarName +"</h5>เรดาร์นี้อยู่ในการดูแลของ" + data.src);
        });
        $('.radar-img').on('error', function() {
            $(".loading").hide();
            $(".radar-img").hide();
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
