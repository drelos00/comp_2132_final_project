function shootFireball(){
    $("#fireball").fadeIn(50);
    
    $("#fireball").animate({left: "+=380"}, 700);

    $("#fireball").fadeOut(10, function(){
        $("#fireball").removeAttr("style"); 
    });
}