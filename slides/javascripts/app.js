/* 
* Skeleton V1.0.3
* Copyright 2011, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 7/17/2011
*/	
	
var $slide, slide = 0, next_slide_available=false, next_available=false, prev_slide_available=false, prev_available=false, total_slides=0, mouse_last_moved = 0, MOUSE_INTERVAL = 2500;

function flash($el){
    var begin;
    begin = $el.css('opacity');
    $el.animate({opacity: (begin + 0.5)}, 50, "linear", function(){
        $el.animate({opacity: (begin - 0.5)}, 50, "linear", function(){
            $el.animate({opacity: begin}, 50, "linear", function(){
                reset_ui();
            });
        });
    });
}

function reset_ui(){
        
    next_available = next_slide_available || ($slide.find("[data-onnext]").length > 0);
    prev_available = prev_slide_available || ($slide.find("[data-onprev]").length > 0);
    
    if(next_available === false){
        $("a[href=#next]").addClass("disabled").css({"opacity": 0.4});
        $("a[href=#last]").addClass("disabled").css({"opacity": 0.4});
    }
    else {
        $("a[href=#next]").removeClass("disabled").css({"opacity": 1});
        $("a[href=#last]").removeClass("disabled").css({"opacity": 1});
    }
    
    if(prev_available === false){
        $("a[href=#previous]").addClass("disabled").css({"opacity": 0.4});
        $("a[href=#first]").addClass("disabled").css({"opacity": 0.4});
    }
    else {
        $("a[href=#previous]").removeClass("disabled").css({"opacity": 1});
        $("a[href=#first]").removeClass("disabled").css({"opacity": 1});
    }
    
    $("#count").html((slide+1) + "/" + total_slides);
}

function next(){
    var $next, $next_reveal;
    flash($("a[href=#next]"));
    
    $next_reveal = $slide.find("[data-onnext]:first");
    if ($next_reveal.length){
        $next_reveal.removeAttr("data-onnext");
        $next_reveal.fadeIn(250);
        $next_reveal.attr("data-onprev", "hide");
        reset_ui();
        return;
    }

    if(next_slide_available){
        $next = $slide.next()   ;
        window.location.hash = $next.attr("id");
    }
    reset_ui();
}
function previous(){
    var $prev, $prev_reveal;
    flash($("a[href=#previous]"));

    $prev_reveal = $slide.find("[data-onprev]:last");
    if ($prev_reveal.length){
        $prev_reveal.removeAttr("data-onprev");
        $prev_reveal.fadeOut(250);
        $prev_reveal.attr("data-onnext", "reveal");

        reset_ui();
        
        return;
    }
    
    if(prev_slide_available){
        $prev = $slide.prev();
        window.location.hash = $prev.attr("id");
    }
    reset_ui();
}

$(document).ready(function() {

    $(window).hashchange(function(e){
        $slide = $(window.location.hash);
        if (window.location.hash == "") {
            prev_slide_available = total_slides > 0;
            next_slide_available = total_slides > 1;
            window.location.hash = $(".slide:first").attr("id");

            e.preventDefault();
            return false;
        }

        $(".shownslide").fadeOut(250,function(){
            $slide.fadeIn(250).removeClass("hidden").addClass("shownslide");
        }).removeClass("shownslide");

        slide = $slide.prevAll().length; // Gets the index of the current slide

        prev_slide_available = ($slide.prevAll().length > 0);
        next_slide_available = ($slide.nextAll().length > 0);

        e.preventDefault();
        return false;
    });
    
    total_slides = $(".slide").length;
    
    $(window).keydown(function(e){
        switch (e.keyCode) {
            case 37:
                previous();
                break;
            case 38:
                previous();
                break;
            case 8:
                previous();
                break;
            case 39:
                next();
                break;
            case 40:
                next();
                break;
            case 32:
                next();
                break;
        }
        console.log(e.keyCode);
    });

    $("a[href=#first]").mousedown(function(e){
         window.location.hash = $(".slide:first").attr("id");
         e.preventDefault();
         return false;
    });
    $("a[href=#previous]").mousedown(function(e){
         previous();
         e.preventDefault();
         return false;
    });
    $("a[href=#next]").mousedown(function(e){
         next();
         e.preventDefault();
         return false;
    });
    $("a[href=#last]").mousedown(function(e){
         window.location.hash = $(".slide:last").attr("id");
         e.preventDefault();
         return false;
    });
    $("nav a").click(function(e){e.preventDefault(); return false;}); //Caught it on mousedown

    /* shoudl just use for non touch devices */
    $("body").mousemove(function(e){
        mouse_last_moved = 0;
        $("nav").stop(true, true).fadeIn(15);
    });
    $("body").mousedown(function(e){
        mouse_last_moved = 0;
        $("nav").stop(true, true).fadeIn(15);
    });
    setInterval(function(){
        mouse_last_moved += 250;

        if (mouse_last_moved > MOUSE_INTERVAL){
            $("nav").stop(true, true).fadeOut(500);
        }
    }, 250);

    $(window).hashchange();
    reset_ui();

    if(Modernizr.touch){
        var threshold;

        MOUSE_INTERVAL = 4000;

        $("body").bind("touchstart", function(e){
            mouse_last_moved = 0;
            $("nav").stop(true, true).fadeIn(15);
        });

        threshold = $(window).width() * 0.01

        $(".slide").swipe({
            swipe: function(e, direction){
                console.log("caught a swipe" + direction)
                if (direction == "right"){
                    previous();
                }
                else if (direction=="left") {
                    next();
                }
            },
            threshold: threshold
        });
    }

	/* Tabs Activiation
	================================================== */
	var tabs = $('ul.tabs');
	
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).find('> li > a');
		tab.click(function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr('href') + "Tab";
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();
			
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				
				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
				
			} 
		});
	}); 
	
});