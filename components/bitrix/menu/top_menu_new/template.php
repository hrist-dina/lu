<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<nav>
	<?if (!empty($arResult)):?>
		<ul>
			<?
			$previousLevel=0;
			$catalog=false;
			foreach($arResult as $arItem) {
				if($arItem['DEPTH_LEVEL']==1) {
					if($catalog) {
						$catalog=false;
						if($l2t) {?>
							</ul></div><div data-lvl="1" class="cat-menu__cell"><?
							foreach ($l2t as $key => $value) {
								echo '<ul class="cat-menu__list">'.$value.'</ul>';
							}?>
							</div>
							<?if($l3t) {?>
								<div data-lvl="2" class="cat-menu__cell"><?
									foreach ($l3t as $key => $value) {
										echo '<ul class="cat-menu__list">'.$value.'</ul>';
									}?>
								</div></div></li>
							<?}
						}
						else {?>
							</ul></div></div></li>
						<?}
					}
					elseif($previousLevel!=1&&$previousLevel>0) {?></ul></div></li><?}?>
					<li <?if ($arItem["SELECTED"]):?>class="active <?if($arItem['IS_PARENT']){?>sub<?}?>"<?endif?>>
						<a href="<?=$arItem["LINK"]?>" ><?=$arItem["TEXT"]?></a>
						<?if($arItem['LINK']=='/catalog/') {
							$catalog=true;
							$l2=-1;	
							$l3=-1;	
							$l3t=array();
							$l2t=array();?>
							<div class="cat-menu"><div data-lvl="0" class="cat-menu__cell"><ul class="cat-menu__list">
						<?}
						elseif($arItem['IS_PARENT']) {?><div class="inline"><ul><?}
						else {?></li><?}?>
				<?}
				elseif($catalog) {
					if($arItem['DEPTH_LEVEL']==2) {?>
						<li <?if($arItem['IS_PARENT']) { $l2++;?>data-list="<?=$l2?>"<?}?> ><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></li>				
					<?}	
					elseif($arItem['DEPTH_LEVEL']==3) {
						if($arItem['IS_PARENT']) $l3++;
						$l2t[$l2].="<li ".($arItem['IS_PARENT']?'data-list="'.$l3.'"':'')."><a href='".$arItem["LINK"]."'>".$arItem["TEXT"]."</a></li>";
					}
					elseif($arItem['DEPTH_LEVEL']==4) {
						$l3t[$l3].="<li><a href='".$arItem["LINK"]."'>".$arItem["TEXT"]."</a></li>";
					}
				}
				else {
					if($arItem['DEPTH_LEVEL']==2) {?>
						<li><a href="<?=$arItem["LINK"]?>" ><?=$arItem["TEXT"]?></a></li>
					<?}	
				}
				$previousLevel=$arItem['DEPTH_LEVEL'];?>
			<?}
			if($catalog) {  
				if(!empty($l2t)) {?>
					</ul></div><div data-lvl="1" class="cat-menu__cell"><?
					foreach ($l2t as $key => $value) {
						echo '<ul class="cat-menu__list">'.$value.'</ul>';
					}?>
					</div>
					<?if(!empty($l3t)) {?>
						<div data-lvl="2" class="cat-menu__cell"><?
						foreach ($l3t as $key => $value) {
							echo '<ul class="cat-menu__list">'.$value.'</ul>';
						}?>
					</div></div></li>
					<?}
				}
				else {?>
					</ul></div></div></li>
				<?}
			}
			elseif($previousLevel!=1&&$previousLevel>0) {?></ul></div></li><?}?>
		</ul>
	<?endif?>
</nav>