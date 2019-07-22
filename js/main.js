$(function() {
	$(document).on('click', '[data-open]', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerWidth())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		console.log(15);
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerWidth())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});


	$(document).on('click', '[data-rereview]', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="rereview"]');
		t.find('[name="id"]').val($(this).attr('data-rereview'));
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerWidth())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});

	$(document).on('submit', '[name=rereview]', function(e) {
		$this = $(this);
		if($this.find('[name=text]').val()!='') 	
			$.ajax({
        		type: "POST",
        		url: '/include/form_re.php',
        		data: $this.serialize(), 
        		success: function(data) { 
        			$this.find('[name=text]').val('');
        			window.location.href = '';
          		}
      		});
		return false;
   	});

   	$(document).on('click', '[data-rereviewdel]', function(e) {
		BX.showWait();
		$this = $(this).closest('.re_rev_info');
			$.ajax({
        		type: "POST",
        		url: '/include/form_re.php',
        		data: {del: 'Y', id: $(this).attr('data-rereviewdel')}, 
        		success: function(data) { 
        			$this.remove();
        			BX.closeWait();
          		}
      		});
		return false;
   	});
	

	// console.log($(document).find('#add_review').length);
	if($(document).find('#add_review').length>0) {
		$.ajax({
        		type: "POST",
        		url: '/include/form_r.php?ID='+$(document).find('#add_review').data('id'), 
        		success: function(data) { 
        			$('#add_review').html(data);
          		}
      		});
	}

	if($('[data-open-auth]').length>0) {
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-$('.modal[data-target="login"]').outerWidth())/2;
		if ( h < 0 ) {
			h = 0;
		}
		$('.modal[data-target="login"]').css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	}
});

$('[name=phone]').inputmask("+7 (999) 999-99-99");

$('[name=NEW_PERSONAL_MOBILE]').focus(function() {
	$('[name=NEW_PERSONAL_MOBILE]').inputmask("+7 (999) 999-99-99");
});

$('[name=feedback] button').click(function() {
		phone=$('[name=phone]').val();
		name=$('[name=name]').val();
		if (phone!='' && name!='') {
			$.ajax({
				data: {phone: phone, name: name},
				type: "POST",
				url: "/bitrix/templates/lu/ajax/feedback.php",
				success: function(data) {
					$('[name=feedback] input').val('').parent('p').removeClass('complete');
					$('[name=feedback] button').before('<p>Мы получили ваш номер телефона и перезвоним в ближайшее время!</p>');
				}
			});
		}
});

$('[name=feedback] input').focus(function() {
	$('[name=feedback] button').prev('p').remove();
});

var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

$('[name=subscribe] button, .subscribe button').click(function(event) {
	event.preventDefault();
	var error='';	

	if (!($('[name=subscribe] [type=checkbox], .subscribe [type=checkbox]').is(':checked'))) {
		error='Нужно принять политику сайта';        
    }
    if (!(pattern.test($('[name=subscribe] [type=text], .subscribe [type=text]').val()))) {
		error='Введите корректный e-mail';        
    }
    if($('[name=subscribe]').is('div')) $('[name=subscribe] h4').next('p').remove();   
    else $('.subscribe h3').next('p').next('p').remove(); 

    var email= $('[name=subscribe]').is('div') ? $('[name=subscribe] input').val(): $('.subscribe input').val();
		if (error==='') {
			$.ajax({
				data: {email: email},
				type: "POST",
				url: "/bitrix/templates/lu/ajax/subscribe.php",
				success: function(data) {
					$('[name=subscribe] input, .subscribe input').val('');
					$('[name=subscribe] [type=checkbox], .subscribe [type=checkbox]').prop('checked', false).parent('span').removeClass('checked');
					if($('[name=subscribe]').is('div')) $('[name=subscribe] h4').after('<p style="padding-left: 85px;">На указанный e-mail отправлено письмо для подтверждения подписки</p>');
					else $('.subscribe h3').next('p').after('<p style="">На указанный e-mail отправлено письмо для подтверждения подписки</p>'); 
				}
			});
		}
		else {
			if($('[name=subscribe]').is('div')) $('[name=subscribe] h4').after('<p style="padding-left: 85px;">'+error+'</p>');
			else $('.subscribe h3').next('p').after('<p style="">'+error+'</p>');  
		}
});


$('.list-b .item-e button').on('click', function() {
	if(!($(this).is('.property_more')) && !($(this).is('.nochange'))) {
		$(this).hide().before('<span class="added-basket">В корзине</span>');
		$(this).remove();
	}
});

$('.context-b, .browsing').on('click', 'button', function() {
	if(!($(this).is('.property_more')) && !($(this).is('.nochange'))) {
		$(this).hide().before('<span class="added-basket">В корзине</span>');
		$(this).remove();
	}
});

$('.product-b .controls button').on('click', function() {
	if(!($(this).is('.property_more')) && !($(this).is('.nochange'))) {
		$(this).hide().before('<button class="added">В корзине</button>');
		$(this).remove();
	}
});


$('[name=bform]').on('submit', function() {
	if($('[name=USER_EMAIL]').val()=='') {
		$('[name=USER_EMAIL]').parent('p').addClass('error');
		return false;
	}
});

if($('nav .grid').length > 0) {
	var hh=$(window).height()-64;
	$('nav .grid').css({'overflow-y': 'auto', 'max-height': hh+'px'});
}

$(window).resize(function(){
	if($('nav .grid').length > 0) {
		var hh=$(window).height()-64;
		$('nav .grid').css({'overflow-y': 'auto', 'max-height': hh+'px'});
	}
});





$(document).on('click', '.property_more',function(){
	$('.popupscu').hide().removeClass('popupCart').removeClass('popupscu').html('');
	$('body').append('<div class="popup-window-overlay" id="popup-window-overlay-scu" style="z-index: 1099; width: 1903px; height: 2131px; display: block;"></div>');
	$(this).closest('.core').next('.bx_catalog_item_scu').addClass('popupCart').addClass('popupscu').prepend($(this).closest('.core').find('h3, .filter_price').clone());
	$(this).closest('.core').next('.bx_catalog_item_scu').addClass('popupCart').addClass('popupscu').prepend('<h4>Выбрать дополнительные свойства</h4><p class="cena">Цена:</p>');
	
	
	//$(this).closest('.core').next('.bx_catalog_item_scu').addClass('popupCart').addClass('popupscu').prepend('<h4>Выбрать дополнительные свойства</h4><p class="cena">Цена:</p>');
	var qua =$(this).closest('.core').find('.quantity-e');
	$(this).closest('.core').next('.bx_catalog_item_scu').find('button').before('<p>Кол-во: </p>').before(qua);
	$('.popupscu').show();
	return false;
});
$(document).on('click', '.popup-scu-close', function(){
	var qua = $('.popupscu').find('.quantity-e');
	$('.popupscu').prev('.core').find('.bx_catalog_item_price').after(qua);
	$(this).parent('.popupscu').hide().removeClass('popupCart').removeClass('popupscu').find('h4, p, h3, .filter_price').remove();
	$('#popup-window-overlay-scu').remove();
	return false;
});
$(document).on('click', '.popupscu .buy_btn', function(){
	var qua = $('.popupscu').find('.quantity-e');
	$('.popupscu').prev('.core').find('.bx_catalog_item_price').after(qua);
	$('.popupscu').hide().removeClass('popupCart').removeClass('popupscu').find('h4, p, h3, .filter_price').remove();
	$('#popup-window-overlay-scu').remove();
	return false;
});

$(document).on('mouseup', function(e) { /* закрываем всплывающее окно */
	var div = $('.popupscu'); 
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			var qua = $('.popupscu').find('.quantity-e');
			$('.popupscu').prev('.core').find('.bx_catalog_item_price').after(qua);
			$('.popupscu').hide().removeClass('popupCart').removeClass('popupscu').find('h4, p, h3, .filter_price').remove();
			$('#popup-window-overlay-scu').remove();			
		}
});

$(document).ready(function() {
$('.lk-b').bind("DOMSubtreeModified",function(){
    if ( $('input[type="checkbox"]').length > 0  && $('.checker').length == 0) {
			$('input[type="checkbox"').uniform();
		}

		if ( $('input[type="radio"]').length > 0  && $('.radio').length == 0) {
			$('label>input[type="radio"]').uniform();;
		}
		
		
			
});
});

	$(document).on('change', '.bx_size select, select.sku',function(){
		var rr=$(this).find('option:checked').val();
		$('[data-treevalue='+rr+']').trigger('click');
	});
	
	
$(document).on('click', '.clear_all:not(.sender)',function(){
	$this=$(this);
	$this.addClass('sender');
	BX.showWait();
	$.ajax({
				data: {BasketDelete: 'Y'},
				type: "POST",
				url: "/include/alldelete.php",
				success: function(data) {
					BX.closeWait();
					$this.closest('form').after('<p><font class="errortext">Ваша корзина пуста</font></p>');
					$this.closest('form').remove();
					BX.onCustomEvent('OnBasketChange');
				}
			});
});

$(document).on('click', '.clear_fn:not(.sender)',function(){
	$this=$(this);
	$this.addClass('sender');
	BX.showWait();
	$.ajax({
				data: {BasketDelete: 'Y'},
				type: "POST",
				url: "/include/alldelete.php",
				success: function(data) {
					BX.onCustomEvent('OnBasketChange');
					BX.closeWait();
					
				}
			});
});


$(document).on('click', '.b-item__counter-plus, .b-item__counter-minus',function(){
	$this=$(this);
	//BX.showWait();
window.scrollingBasket = $(document).find('.basket__items').scrollTop();
	if($this.is('.b-item__counter-plus'))
		$this.closest('div').data('q', $this.closest('div').data('q')*1-1);		
	else $this.closest('div').data('q', $this.closest('div').data('q')*1+1);

		$.ajax({
				data: {id: $(this).closest('div').data('id'), q: $(this).closest('div').data('q')},
				type: "POST",
				url: "/include/upquantity.php",
				success: function(data) {

					BX.onCustomEvent('OnBasketChange');
					//BX.closeWait();					
				}
			});
});
	$(document).ready(function() {                                                          
BX.addCustomEvent('onAjaxSuccess', BX.closeWait());    
});

$(document).on('submit','[name=question]', function(){
	$('#res_ad').remove();
        var err=0;
		$(this).find('[type=text],  textarea').each(function() {
			if($(this).val()=='') {
				err++;
				$(this).closest('p').addClass('error');
			}
			else {
				$(this).closest('p').removeClass('error');
			}
		});
		if(err==0) {
			$this =$(this);
			var s = $this.serialize();
	    	$.ajax({
	        	data: s,
        		type: "POST",
        		url: '/include/add_r.php', 
        		success: function(data) { 
        			$this.find('textarea').each(function() {
						$(this).val('');
					});
					$this.after('<p id="res_ad">Отзыв добавлен и будет опубликован после модерации</p>');
          		}
      		});
		}
		return false;
    }); 