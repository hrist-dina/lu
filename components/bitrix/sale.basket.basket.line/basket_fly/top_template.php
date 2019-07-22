<?if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true) die();
?>
<div class="basket">
	<p>
		<a href="<?=$arParams['PATH_TO_BASKET']?>">В корзине</a> <?=($arResult['NUM_PRODUCTS']>0?$arResult['NUM_PRODUCTS']:0).' '.$arResult['PRODUCT(S)']?>
		<br> на сумму <strong><?=str_replace(" руб.", "", $arResult['TOTAL_PRICE'])?></strong> руб.
	</p>
	<div class="basket__fly">
		<a class="basket__order" href="<?=$arParams['PATH_TO_BASKET']?>">Оформить заказ</a>
		<button class="basket__clear clear_fn">Очистить корзину</button>
		<ul class="basket__items" style='opacity: 0'>
			<?foreach ($arResult["CATEGORIES"] as $category => $items):
				if (!(empty($items)) && $category=='READY') {
					usort($items, "sortBasket");
					foreach ($items as $v):?>				
            			<li class="b-item" data-prodid="<?=$v['PRODUCT_ID']?>">
							<div class="b-item__img">
								<img src="<?=$v["PICTURE_SRC"]?>" alt="<?=$v["NAME"]?>" title="<?=$v["NAME"]?>">
							</div>
							<div class="b-item__counter" data-q="<?=$v["QUANTITY"]?>" data-id="<?=$v['ID']?>">
								<button class="b-item__counter-plus"  ></button>
								<button class="b-item__counter-minus" ></button>
							</div>
							<div class="b-item__res">
								<strong><?=str_replace('руб.', '', $v["SUM"])?> Р</strong><br>
								<span><?=$v["QUANTITY"]?> шт.</span>
							</div>
						</li>						
					<?endforeach?>
				<?}
			endforeach?>		
		</ul>
	</div>
</div>
<script>
	$(function() {
		window.scrollBasket = window.scrollBasket || 0;
		window.scrollingBasket=window.scrollingBasket || 0;		
		if(window.scrollBasket>0) {
			var topLi=$(document).find('.basket__items .b-item[data-prodid='+window.scrollBasket+']').position().top - 20;
			var bottomLi=$(document).find('.basket__items .b-item[data-prodid='+window.scrollBasket+']').position().top+$(document).find('.basket__items .b-item[data-prodid='+window.scrollBasket+']').outerHeight() - 20;
			var scrollNow=window.scrollingBasket;
			var viewport=$(document).find('.basket__items').outerHeight()+window.scrollingBasket;
			if(topLi>scrollNow&&topLi<viewport || bottomLi>scrollNow&&bottomLi<viewport) {
				$(document).find('.basket__items').animate({
			        scrollTop: window.scrollingBasket
		    	}, 0);	
		    	$(document).find('.basket__items').css('opacity', 1);
			}
			else {
				var h = $('.b-item').first().outerHeight() + 10;
				$(document).find('.basket__items').animate({
			        scrollTop: $(document).find('.basket__items .b-item[data-prodid='+window.scrollBasket+']').position().top - h
		    	}, 0);	
		    	setTimeout("$(document).find('.basket__items').css('opacity', 1)", 1);
			}			
		}
		else if(window.scrollingBasket>0) {
			$(document).find('.basket__items').animate({
		        scrollTop: window.scrollingBasket
		    }, 0);	
		    $(document).find('.basket__items').css('opacity', 1);
		}
		else $(document).find('.basket__items').css('opacity', 1);
		window.scrollingBasket =0;
		window.scrollBasket =0;
	});
</script>