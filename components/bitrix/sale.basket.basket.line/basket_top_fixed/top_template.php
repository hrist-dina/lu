<?if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true) die();?>
<p><a href="<?=$arParams['PATH_TO_BASKET']?>">В корзине</a> <?=($arResult['NUM_PRODUCTS']>0?$arResult['NUM_PRODUCTS']:0).' '.$arResult['PRODUCT(S)']?></p>
<p>на сумму <strong><?=str_replace(" руб.", "", $arResult['TOTAL_PRICE'])?></strong> руб.</p>