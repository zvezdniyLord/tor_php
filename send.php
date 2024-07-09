<?php

$token = "7238360214:AAED9R27wBHgJVnU4nCw4LavUxrZ0L9gubA";

$chat_id = "170195649";

if ($_POST['act'] == 'order') {
    $product = ($_POST['id']);

    $arr = array(
        'Заказ:' => $product
    );
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

    if ($sendToTelegram) {
        echo($txt);
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    }

    else {
        echo($txt);
        alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    }
}
