<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<div class="form" id="auth_form">
	<h3>Авторизация</h3>
	<form name="system_auth_form<?=$arResult["RND"]?>" method="post" target="_top" action="<?=$arResult["AUTH_URL"]?>">
		<?if($arResult["BACKURL"] <> ''):?>
			<input type="hidden" name="backurl" value="<?=$arResult["BACKURL"]?>" />
		<?endif?>
		<?foreach ($arResult["POST"] as $key => $value):?>
			<input type="hidden" name="<?=$key?>" value="<?=$value?>" />
		<?endforeach?>
		<input type="hidden" name="AUTH_FORM" value="Y" />
		<input type="hidden" name="TYPE" value="AUTH" />
		<p class="complete"><span>Электронная почта *</span><input type="text" name="USER_LOGIN" maxlength="50" value="<?=$arResult["USER_LOGIN"]?>" size="17"></p>
		<p class="complete"><span>Пароль *</span><input type="password" name="USER_PASSWORD" maxlength="50" size="17" autocomplete="off"></p>
		<?if($arResult["SECURE_AUTH"]):?>
			<span class="bx-auth-secure" id="bx_auth_secure<?=$arResult["RND"]?>" title="<?echo GetMessage("AUTH_SECURE_NOTE")?>" style="display:none">
				<div class="bx-auth-secure-icon"></div>
			</span>
			<noscript>
				<span class="bx-auth-secure" title="<?echo GetMessage("AUTH_NONSECURE_NOTE")?>">
					<div class="bx-auth-secure-icon bx-auth-secure-unlock"></div>
				</span>
			</noscript>
			<script type="text/javascript">
				document.getElementById('bx_auth_secure<?=$arResult["RND"]?>').style.display = 'inline-block';
			</script>
		<?endif?>
		<h6>* Поля, обязательные к заполнению</h6>
		<h5><noindex><a href="<?=$arResult["AUTH_FORGOT_PASSWORD_URL"]?>" id="forgot" rel="nofollow">Забыли пароль</a><a href="/login/" rel="nofollow">Регистрация</a></noindex></h5>
		<button name="Login">Войти</button>
		<?$APPLICATION->IncludeComponent("bitrix:socserv.auth.form", "icons", 
			array(
				"AUTH_SERVICES"=>$arResult["AUTH_SERVICES"],
				"SUFFIX"=>"form",
			), 
			$component, 
			array("HIDE_ICONS"=>"Y")
		);?>
		<h6 class="error"><? if ($arResult['SHOW_ERRORS'] == 'Y' && $arResult['ERROR'])
			ShowMessage($arResult['ERROR_MESSAGE']); ?>
			<?if(!$USER->IsAuthorized() && isset($_GET['login'])):?>
				Неправильно указан логин и/или пароль
			<?endif;?>
		</h6>
	</form>
</div>
<?$APPLICATION->IncludeComponent("bitrix:system.auth.forgotpasswd", "forgot", Array(
	"COMPONENT_TEMPLATE" => ".default",
		"FORGOT_PASSWORD_URL" => "/personal/",
		"PROFILE_URL" => "/personal/",
		"REGISTER_URL" => "/reg/",
		"SHOW_ERRORS" => "N"
	),
	false
);?>
<script>
$('#auth').click(function(event) {
	event.preventDefault();
	$('#forgot_form').hide();
	$('#auth_form').show();
});
$('#forgot').click(function(event) {
	event.preventDefault();
	$('#forgot_form').show();
	$('#auth_form').hide();
});
</script>