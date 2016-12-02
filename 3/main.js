$(document).ready(function() {
    $(".loadradar").click(function() {
        var data = $(this).data();
        var radarName = $(this).text();
        var progress = document.createElement('div');
        progress.className = 'mdl-progress mdl-js-progress mdl-progress__indeterminate';
        $(".radar-img").attr("src", data.img + "?v=" + new Date().getTime());
        $(".status-text").hide();
        $(".status-text").html("<h4>เรดาร์" + radarName +"</h4><p>กำลังโหลดภาพเรดาร์</p>");
        componentHandler.upgradeElement(progress);
        $(".status-text").append(progress);
        $(".status-text").show();
        $('.radar-img').hide();
        $('.radar-img').on('load', function() {
            $('.radar-img').show();
            $(".status-text").html("<h4>เรดาร์" + radarName +"</h4><p>เรดาร์นี้อยู่ในการดูแลของ" + data.src + "</p>");
        });
        $('.radar-img').on('error', function() {
            $(".status-text").html("<h4>ไม่สามารถโหลดภาพเรดาร์</h4><p>กรุณาลองใหม่อีกครั้ง หรือเลือกดูเรดาร์อื่น</p>");
        });
    });
});
