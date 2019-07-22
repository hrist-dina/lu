<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
global $APPLICATION;
if(empty($arResult))
	return "";

$strReturn = '';
$strReturn .= '<ul class="breadcrumbs"><li><a href="/">Главная</a></li>';
$itemSize = count($arResult);
for($index = 0; $index < $itemSize; $index++)
{
	$title = htmlspecialcharsex($arResult[$index]["TITLE"]);
	$nextRef = ($index < $itemSize-2 && $arResult[$index+1]["LINK"] <> ""? ' itemref="bx_breadcrumb_'.($index+1).'"' : '');
	$child = ($index > 0? ' itemprop="child"' : '');
	$arrow = ($index > 0? '<i class="fa fa-angle-right"></i>' : '');
	if($arResult[$index]["LINK"] <> "" && $index != $itemSize-1)
	{
		$strReturn .= '<li><a href="'.$arResult[$index]["LINK"].'" title="'.$title.'">'.$title.'</a></li>';
	}
	else
	{
		$strReturn .= '<li>'.$title.'</li>';
	}
}
$strReturn .= '</ul>';
return $strReturn;