//dropmenu
function dropMenu(obj){
		$(obj).each(function(){
			var theSpan = $(this);
			var theMenu = theSpan.find(".submenu");
			var tarHeight = theMenu.height();
			theMenu.css({height:0,opacity:0});
			
			var t1;
			
			function expand() {
				clearTimeout(t1);
				theSpan.find('a').addClass("selected");
				theMenu.stop().show().animate({height:tarHeight,opacity:1},200);
			}
			
			function collapse() {
				clearTimeout(t1);
				t1 = setTimeout(function(){
					theSpan.find('a').removeClass("selected");
					theMenu.stop().animate({height:0,opacity:0},200,function(){
						$(this).css({display:"none"});
					});
				}, 250);
			}
			
			theSpan.hover(expand, collapse);
			theMenu.hover(expand, collapse);
		});
	}

$(function(){
	dropMenu(".drop-menu-effect");
});

//tabs
$("input[type=radio]").on("click",function(e){
	e.stopPropagation()
})
$(function(){
	jQuery.jqtab = function(tabtit,tab_conbox,shijian) {
		//$(tab_conbox).find("li").hide();
		$(tabtit).find("li:first").addClass("curr").show().find("input[type=radio]").prop("checked",true);
		$(tab_conbox).find("li:first").show();
		$(tabtit).find("li").bind(shijian,function(){
			$(this).addClass("curr").find("input[type=radio]").prop("checked",true);
		  $(this).siblings("li").removeClass("curr");
			var activeindex = $(tabtit).find("li").index(this);
			$(tab_conbox).children().eq(activeindex).show().siblings().hide();
			return false;
		});
	
	};
	$.jqtab("#tabs","#tab_conbox","click");
	$.jqtab("#tabs2","#tab_conbox2","mouseenter");
});

 /***** Back to top ******/
	$(window).scroll(function () {
	    if ($(window).scrollTop() >= 300) {
	        $("#top_button").fadeIn(400);
	    } else {
	        $("#top_button").fadeOut(400);
	    }
	});

	$('#top_button').click(function () {
	    $('html, body').animate({ scrollTop: 0 }, 400);
	    return false;
	});