$(function() {
	/*
if($('#ORDER_PROP_5').length>0) {
$(document).on('change', '#ORDER_PROP_5', function() {
	if ($('#ORDER_PROP_5').is(':checked')) {
		$('#ORDER_PROP_5').closest('h6').after('<div class="form-autorized" id="bonus_amount"><div class="form"><p class="complete"><span>Сколько бонусов использовать для оплаты: </span><input type="text" value="<?=$maxbonus?>" name="ORDER_PROP_7" id="ORDER_PROP_7"></p></div><div class="form"><p>&nbsp;</p></div></div>');
	}
	else {
		$('#bonus_amount').remove();
	}
});
}*/
$(document).on('click', '.more_prim', function(e) {
	e.preventDefault();
	$(document).find('.primechanie>div').css('height',  $(document).find('.primechanie-tab:visible').height());
	$(document).find('.primechanie .more_prim').remove();
});
$(document).on('change', '[name=ORDER_PROP_9]', function() {
$(document).find('.primechanie>div').css('height',  '');
	$(document).find('.primechanie .more_prim').remove();

	$(this).closest('div').find('.primechanie-tab').hide();
	$(this).closest('div').find('.primechanie-tab').eq($(this).find(':selected').index()).show();
	if($(this).closest('div').find('.primechanie-tab').eq($(this).find(':selected').index()).is('.prim_empty')) {
		//
		$(this).closest('div').find('.primechanie').hide();
	}
	else $(this).closest('div').find('.primechanie').show();

	
	if($(document).find('.primechanie-tab:visible').height()>49) {
		$(document).find('.primechanie').append('<a href="#" class="more_prim">Читать далее...</a>');
	}
});
	$('#bx-soa-order-form').on('submit', function() {
		BX.showWait();
		$err=0;
		if($('#PAY_SYSTEM_ID').find(':selected').length==0||$('#PAY_SYSTEM_ID').find(':selected').val()=='') {
			$('#PAY_SYSTEM_ID').before("<span style='font-size: 12px;left: 20px;top: -28px;text-align: left;padding: 10px 0 0;color: red;'>Выберите способ оплаты<span>");			
			$err++;
		} else {
			$('#PAY_SYSTEM_ID').prev('span').remove();
		}
		if($('#DELIVERY_ID').find(':selected').length==0||$('#DELIVERY_ID').find(':selected').val()=='') {
			$('#DELIVERY_ID').before("<span style='font-size: 12px;left: 20px;top: -28px;text-align: left;padding: 10px 0 0;color: red;'>Выберите способ доставки<span>");
					
			$err++;
		} else {
			$('#DELIVERY_ID').prev('span').remove();
		}
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		$(this).closest('form').find('.req_p').each(function() {
			if($(this).find('[type=text], textarea').val()=='') {
				$err++;
				$(this).addClass('error');
			}
			else {
				if($(this).is('.req_email')) {
					if (!(pattern.test($(this).find('[type=text]').val()))) {
						$err++;
						$(this).addClass('error').removeClass('complete');
    				}					
    				else $(this).removeClass('error');
				}
				else $(this).removeClass('error');
			}
		});
		if($(this).find('[name=rules]').length>0) {
			if($(this).find('[name=rules]').prop('checked')===false) {
				$(this).find('[name=rules]').closest('h6').css('color', 'red');
				$err++;
			}
			else $(this).find('[name=rules]').closest('h6').css('color', '');
		}
		if($err>0) {
			var scrollTop = $(document).find('.breadcrumbs').offset().top;
  			$('html, body').stop().animate({
    				scrollTop: scrollTop
  			}, 500);  	
  			BX.closeWait();
			return false;
		}

	});
	if ( $('.introduction .slider').length > 0 ) {
		$('.introduction .slider').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 10000,
			pause: 2500,
			animationComplete: function(e) {
				$('.introduction .nav li').eq($('.introduction .slider .pagination li.current').index()).addClass('active').siblings().removeClass();
			}
		});
		$('.introduction .slider').bind('swipeleft', function() {
			$('.introduction .slider .next').trigger('click');
		});
		$('.introduction .slider').bind('swiperight', function() {
			$('.introduction .slider .prev').trigger('click');
		});
		$('.introduction .slider .bg').each(function() {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
				'background-size': 'cover'
			});
		});
		$('.introduction .nav li').eq(0).addClass('active');
		$('.introduction .nav li').bind('click', function(e) {
			e.preventDefault();
			$('.introduction .slider .pagination li').eq($(this).index()).find('a').trigger('click');
			setTimeout(function() {
				$(this).addClass('active').siblings().removeClass();
			}, 500);
		});
	}
	
	$('.minus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.plus').click(function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.catalog-i .tabs-nav li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	if ( $('.lc .browsing ul li').length > 1 ) {
		$('.lc .browsing ul:not(.sku-txt, .sku-img)').jcarousel({
			scroll: 1,
			animation: 500,
			easing: 'easeInOutQuad',
			wrap: 'circular'
		});
		$('.lc .browsing .jcarousel-container').bind('swipeleft', function() {
			$('.lc .browsing .jcarousel-container .jcarousel-next').trigger('click');
		});
		$('.lc .browsing .jcarousel-container').bind('swiperight', function() {
			$('.lc .browsing .jcarousel-container .jcarousel-prev').trigger('click');
		});
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('input[type="radio"]').length > 0 ) {
		$('input[type="radio"]').uniform();
	}
	$('.benefits-b > div > div > ul > li a').bind('click', function(e) {
		e.preventDefault();
		$(this).parents('ul').siblings('[data-tab="'+$(this).attr('href')+'"]').show().siblings('[data-tab]').hide();
		$(this).parent().addClass('active').siblings().removeClass();
	}).filter(':first').click();
	$('.panel .lk-open').bind('click', function(e) {
		e.preventDefault();
		$(this).siblings('.lk-drop').stop().slideToggle(200);
		$('.panel .menu-nav').slideUp(200);
	});
	$('html').click(function() {
		$('.panel .lk-drop').stop().slideUp(200);
	});
	$('.panel .lk-open, .panel .lk-drop, .modal, .fade').click(function(event) {
		event.stopPropagation();
	});
	if ( $('.catalog-i .lc .nav > li > div').length > 0 ) {
		$('.catalog-i .lc .nav > li > div').each(function() {
			$(this).append('<span class="arrow"></span>');
		});
		$('.catalog-i .lc .nav > li > div').parent().hover(
			function() {
				$(this).children('div').stop().delay(0).fadeIn(0);
				$(this).find('.arrow').css({
					'top': $(this).position().top+'px'
				});
				$(this).find('ul').css({
					'min-height': $(this).parent().outerHeight()+25+'px'
				});
			},
			function() {
				$(this).children('div').stop().delay(0).fadeOut(0);
			}
		)
	}
	if ( $('.menu > nav > ul > li > div').length > 0 ) {
		$('.menu > nav > ul > li > div').each(function() {
			$(this).parent().addClass('sub');
		});

		$('.menu > nav > ul > li.sub').hover(
			function() {
				if ($(window).width() > 768) {
					$(this).children('div').stop().delay(0).fadeIn(0);
				}
			},
			function(e) {
				if ($(window).width() > 768) {
					if ($(e.relatedTarget).hasClass('jspContainer')) return;
					$(this).children('div').stop().delay(0).fadeOut(0);
				}
			}
		)
		
	}
	
	$('.form input, .form textarea').each(function() {
		$(this).focusin(function() {
			$(this).parent().addClass('focus');
		});
		$(this).focusout(function() {
			if ( $(this).val().length > 0 ) {
				$(this).parent().addClass('complete').removeClass('focus');
			}
			else {
				$(this).parent().removeClass('focus complete');
			}
		});
	});

	$(document).on('focusin', '.form input, .form textarea', function() {
		console.log('123');
	});
	
	$(document).on('focusin', '.form input, .form textarea', function() {
			$(this).parent().addClass('focus');
	});
	$(document).on('focusout', '.form input, .form textarea', function() {
		if ( $(this).val().length > 0 ) {
			$(this).parent().addClass('complete').removeClass('focus');
		}
		else {
			$(this).parent().removeClass('focus complete');
		}
	});

	$('.form p span').bind('click', function(e) {
		e.preventDefault();
		setTimeout(function() {
			$(this).parent().find('input, textarea').focus();
		}, 100)
	});
	$('.modal').append('<span class="close"></span>');

	$('.fade, .modal .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(400);
	});
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() > $('header').offset().top+$('header').outerHeight() && $(window).width() > 768) {
			$('.menu').addClass('fixed');
			$('.basket__fly').removeClass('fixed');
			$('header').css({
				'margin-bottom': $('.menu').outerHeight()+'px'
			});
		} else {
			$('.menu').removeClass('fixed');
			$('.basket__fly').addClass('fixed');
			$('header').css({
				'margin-bottom': '0'
			});
		}
		if ( $(document).scrollTop() > $('header').offset().top+$('header').outerHeight() )  {
			$('.go-top').show();
		} else {
			$('.go-top').hide();
		}
		if ($('.main-i').length>0&& $(document).scrollTop() > $('.main-i').offset().top - 30 && $(window).width() > 768) {
			$('.sub-categories').addClass('fixed');
		} else {
			$('.sub-categories').removeClass('fixed');
		}
	});
	$('.go-top').bind('click', function(e) {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});
	function goTopPos() {
		if ( $(window).width() < 1000+($('.go-top').width()*2) ) {
			$('.go-top').addClass('mini');
		} else {
			$('.go-top').removeClass('mini');
		}
	}
	goTopPos();
	$(window).resize(function() {
		goTopPos();
	});
	/*$('.filter-t ul li span').bind('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('reverse');
	});*/
	if ( $('.context-b').length > 0 ) {
		$('.context-b ul').each(function() {
			if ( $(this).children('li').length > 0 ) {
				$(this).jcarousel({
					scroll: 1,
					animation: 500,
					easing: 'easeInOutQuad',
					wrap: 'circular'
				});
			}
		});
		$('.context-b .jcarousel-container').each(function() {
			$(this).bind('swipeleft', function() {
				$(this).find('.jcarousel-next').trigger('click');
			});
			$(this).bind('swiperight', function() {
				$(this).find('.jcarousel-prev').trigger('click');
			});
		});
	}

	contextBjcarousel();
	$(window).on('resize', contextBjcarousel);

	function contextBjcarousel() {
		if ($(window).width() <= 768) {
			$('.context-b .jcarousel-container').parent().hide();
		}
	}

	if ( $('.order-total h5.discount').length > 0 ) {
		$(function() {
			var max = 0;
			$('.order-total h5 strong').each(function() {
				var w = $(this).width(); 
				max = w > max ? w : max;
			});
			$('.order-total h5 strong').width(max);
		});
	}
	$('.product-b .desc h6 span').bind('click', function(e) {
		e.preventDefault();
		if ( $(this).text() == 'Больше информации' ) {
			$(this).parent().siblings('.more').stop().slideDown(200);
			$(this).text('Скрыть');
		} else {
			$(this).parent().siblings('.more').stop().slideUp(200);
			$(this).text('Больше информации');
		}
	});
	if ( $('.product-b .card .gallery').length > 0 ) {
		$('.product-b .card .gallery > div').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad',
			play: 10000,
			pause: 2500
		});
		$('.product-b .card .gallery > div .pagination li a').each(function() {
			$(this).append('<img src="'+$('.product-b .card .gallery .container > div > div').eq($(this).parent().index()).attr('data-preview')+'" alt="">');
		});
		$('.product-b .card .gallery > div').bind('swipeleft', function() {
			$('.product-b .card .gallery > div .next').trigger('click');
		});
		$('.product-b .card .gallery > div').bind('swiperight', function() {
			$('.product-b .card .gallery > div .prev').trigger('click');
		});
	}
	if ( $('a.zoom').length > 0 ) {
		$('a.zoom').fancybox({
			padding: 0,
			helpers: {
				overlay: {
					locked: false,
					css : {
						'position' : 'fixed',
						'top' : 0,
						'left' : 0,
						'z-index' : 99,
						'background' : 'rgba(1, 1, 1, 0.5)',
						'width' : '100%',
						'height' : '100%'
					}
				}
			}
		});
	}
	if ( $('a.zoomAll').length > 0 ) {
		$('a.zoomAll').fancybox({
			padding: 0,
			helpers: {
				overlay: {
					locked: false,
					css : {
						'position' : 'fixed',
						'top' : 0,
						'left' : 0,
						'z-index' : 99,
						'background' : 'rgba(1, 1, 1, 0.5)',
						'width' : '100%',
						'height' : '100%'
					}
				}
			}
		});
	}
	$(document).bind('click', '#tobasket>.close', function(e) {		
		$('#tobasket').stop(true,true).fadeOut(400).remove();
	});
	$(document).click(function(event) { 
    	if (!($(event.target).closest("#tobasket").length)) {
    		$('#tobasket').stop(true,true).fadeOut(400).remove();
    	} 
	});

	function adaptiveHeightMenu () {
		var menuHeight = $('.menu').outerHeight(),
			dropMenu = $('.menu>nav>ul>li>div');

		$(dropMenu).css('top', menuHeight);
	}

	adaptiveHeightMenu();
	$(window).on('resize', adaptiveHeightMenu);
	$(window).on('scroll', adaptiveHeightMenu);
});

$(function() {
	// Browsing slider
	if ( $('.browsing .slider').length > 0 ) {
		var sliderContainer = $('.browsing .slider .container'),
			listB = $('.browsing .list-b'),
			elements = $(listB).children().length -1,
			listCount = Math.round(elements / 2),
			ul = '<ul class="list-b"></ul>';

		if (listCount > 1) {
			for (var i = 0; i < listCount; i++) {
				$(sliderContainer).append(ul);
				$(sliderContainer).find('.list-b').last().append($(listB).children().get(0)).append($(listB).children().get(1))
			}

			$(listB).remove();
		}

		$('.browsing .slider').slides({
			generatePagination: true,
			generateNextPrev: true,
			container: 'container',
			effect: 'slide',
			slideSpeed: 500,
			slideEasing: 'easeInOutQuad'
		});

	}
	
});

$(function() {
	// Directions slider
	// function sliderAdaptive () {
	// 	var showElements = ($(window).width() > 768) ? 4 : 2;
	// 	var sliderContainer = $('.directions .slider .container'),
	// 		list = $('.directions .slider .container .slides'),
	// 		elements = $(list).children().length,
	// 		listCount = Math.round(elements / showElements),
	// 		div = '<div class="slides"></div>';

	// 	if (listCount > 1) {
	// 		for (var i = 0; i < listCount; i++) {
	// 			$(sliderContainer).append(div);
	// 			for (var k = 0; k < showElements; k++) {
	// 				$(sliderContainer).find('.slides').last().append($(list).children().get(0))
	// 			}
	// 		}

	// 		$(list).remove();
	// 	}
	// }

	// if ( $('.directions .slider').length > 0 ) {
	// 	sliderAdaptive();

	// 	$('.directions .slider').slides({
	// 		generatePagination: true,
	// 		generateNextPrev: true,
	// 		container: 'container',
	// 		effect: 'slide',
	// 		slideSpeed: 500,
	// 		slideEasing: 'easeInOutQuad'
	// 	});
	// }
	
	function dSlider() {
		if ($(window).width() <= 768 && !$('.directions .slides').hasClass('slick-slider')) {
			$('.directions .slider .slides').slick({
				slidesToShow: 4,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}				
					},
					{
						breakpoint: 460,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
		}
	}

	$(window).on('resize', dSlider);



	var mobileMenuActive = false;

	function mobileMenu() {
		var isMobile = $(window).width() <= 768;

		$('.menu nav').addClass('menu-nav');
		var menu = $('.menu-nav');

		if (isMobile) {
			if (mobileMenuActive) return;
			var menuBtn = '<p class="menu-open"><span>Меню</span></p>';
			
			$('.panel').append(menu);
			$(menuBtn).insertBefore(menu);

			$('.menu-open').on('click', function() {
				$('.menu-nav').slideToggle(200);
				$('.menu-sub-show').removeClass('menu-sub-show');
				$('.sub-show').trigger('click').removeClass('sub-show');
			});

			mobileMenuActive = true
		} else {
			$('.menu-open').remove();
			$('.menu').prepend(menu);

			$(window).trigger('scroll');
			mobileMenuActive = false;
		}

	}

	mobileMenu();
	$(window).on('resize', mobileMenu);

	$('nav > ul > li.sub').on('click', function() {
		if (!mobileMenuActive) return;
		$('.menu-nav .sub > div').slideUp(200);
		
		if ($(this).hasClass('sub-show')) {
			$('.menu-nav .sub-show').removeClass('sub-show');
			return;
		};

		$('.menu-nav .sub-show').removeClass('sub-show');
		$(this).addClass('sub-show');
		$(this).find('> div').slideDown(200);
		$('.menu-nav').addClass('menu-sub-show');
	});


	// 20.02.2018 меню

	var scrolls = [];

	$('.cat-menu__list li[data-list]').hover(function() {
		var list = $(this).data('list'),
			lvl = $(this).closest('[data-lvl]').data('lvl'),
			hover = $(this).parent().find('.hover').removeClass('hover');

		$(this).addClass('hover');

		if (lvl === 0) {
			$('[data-lvl]:not([data-lvl="0"]) .cat-menu__list').hide();
			$('[data-lvl]:not([data-lvl="0"]) .cat-menu__list .hover').removeClass('hover');
		}

		show = $('[data-lvl="'+(++lvl)+'"]').find('.cat-menu__list')[list];

		$('[data-lvl="'+(lvl)+'"]').find('.cat-menu__list').hide();	
		$(show).show();

		$(scrolls).each(function(i, scroll) {
			if (lvl == scroll.lvl) {
				scroll.scroll.destroy();
				scrolls.splice(i, 1);
			}
		});

		scrolls.push({
			lvl: lvl,
			scroll: $(show).parent().jScrollPane().data().jsp
		});
	})

	// табы
	$('.new-tabs__nav li').on('click', function() {
		var index = $(this).index(),
			tabs = $(this).closest('.new-tabs'),
			div = $('.new-tabs__div')[index];

		$(tabs).find('.new-tabs__nav li.active').removeClass('active');
		$(this).addClass('active');

		$('.new-tabs__div').hide();
		$(div).show();
	});

	$('.new-tabs').each(function(i, tabs) {
		$(tabs).find('.new-tabs__nav li').first().trigger('click');
	});

	/*$('.buy_btn').on('click', function() {
		setTimeout(function() {
			$('.basket__items').animate({
		        scrollTop: $('.basket__items').find('.b-item').last().offset().top
		    }, 2000);
		}, 2000)
	})*/

	$('[data-tip] span').hover(
		function() {
			$(this).closest('div').append('<div class="tips">'+$(this).closest('div').data('tip')+'</div>');
		},
		function() {
			$(this).closest('div').find('.tips').remove();
		}
	);


});