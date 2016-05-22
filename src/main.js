(function(){
	$(window).on('resize', function(){
		var siteHeight = $('.site-page').height();
		var windowHeight = $('body').height();
		if( siteHeight < windowHeight){
			$('.footer').addClass('sticky');
		}else{
			$('.footer').removeClass('sticky');
		}
	});
	$(window).trigger('resize');

	var headerHeight = $('.header .site-header').height();
	$(document).scroll(function() {
		var scrollDistance = $(document).scrollTop();
		if( headerHeight < scrollDistance){
			var navHeight = $('.site-page > .header').height();
			if( !$('.site-page > .header').hasClass('sticky')){
				$('.header').addClass('sticky');
				$('.site-page > .content').css('margin-top', navHeight + 32 + 3);
			}
		}else{


			$('.header').removeClass('sticky');
			$('.site-page > .content').css('margin-top', 32);
		}
	});
})();
