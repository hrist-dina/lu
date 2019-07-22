<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
CJSCore::Init();
if ($arResult['SHOW_ERRORS'] == 'Y' && $arResult['ERROR'])
	ShowMessage($arResult['ERROR_MESSAGE']);
?>
<?
$APPLICATION->IncludeComponent("bitrix:socserv.auth.form", "icons", 
	array(
		"AUTH_SERVICES"=>$arResult["AUTH_SERVICES"],
		"SUFFIX"=>"form",
	), 
	$component, 
	array("HIDE_ICONS"=>"Y")
);
?>