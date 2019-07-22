<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
$cartId = "bx_basket".$component->getNextNumber();
$arParams['cartId'] = $cartId;
?>
<script>
	var <?=$cartId?> = new BitrixSmallCart;
</script>
<div id="<?=$cartId?>" >
	<?
	$frame = $this->createFrame('bx_cart_block', false)->begin();
	require(realpath(dirname(__FILE__)).'/ajax_template.php');
	$frame->beginStub();
	require(realpath(dirname(__FILE__)).'/top_template.php');
	$frame->end();	
	?>
</div>
<script>
	<?=$cartId?>.siteId       = '<?=SITE_ID?>';
	<?=$cartId?>.cartId       = '<?=$cartId?>';
	<?=$cartId?>.ajaxPath     = '<?=$componentPath?>/ajax.php';
	<?=$cartId?>.templateName = '<?=$templateName?>';
	<?=$cartId?>.arParams     =  <?=CUtil::PhpToJSObject ($arParams)?>; // TODO \Bitrix\Main\Web\Json::encode
	<?=$cartId?>.closeMessage = '<?=GetMessage('TSB1_COLLAPSE')?>';
	<?=$cartId?>.openMessage  = '<?=GetMessage('TSB1_EXPAND')?>';
	<?=$cartId?>.activate();
</script>
