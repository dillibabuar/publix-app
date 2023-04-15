$(function(){
    $('#example').okzoom({
      width: 150,
      height: 150,
      border: "1px solid black",
      shadow: "0 0 5px #000"
    });
  });
  jQuery(document).ready(function($) {
    $(".scroll").click(function(event){		
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
    });
});
  $(document).ready(function() {
    /*
        var defaults = {
        containerID: 'toTop', // fading element id
        containerHoverID: 'toTopHover', // fading element hover id
        scrollSpeed: 1200,
        easingType: 'linear' 
        };
    */
                        
    $(document).UItoTop({ easingType: 'easeOutQuart' });
                        
    });

  