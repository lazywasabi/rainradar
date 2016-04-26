$(document).ready(function() {
    $(".loadradar").click(function() {
        var data = $(this).data();
        var radarName = $(this).text();
        $(".radar-img").attr("src", data.img);
        $(".status-text").html("<div class='progress'><div class='indeterminate'></div></div>");
        $('.radar-img').fadeOut(50);
        $('.radar-img').load(function() {
            $('.radar-img').fadeIn(200);
            $(".status-text").html("<h5>เรดาร์" + radarName +"</h5> เรดาร์นี้อยู่ในการดูแลของ" + data.src);
        });
    });
    $('.modal-trigger').leanModal();
    $('.dropdown-menu').dropdown({
        inDuration: 175,
        outDuration: 225,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
});
