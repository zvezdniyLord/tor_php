<?php

$token = "7238360214:AAED9R27wBHgJVnU4nCw4LavUxrZ0L9gubA";

$chat_id = "-4288535116";

if ($_POST['act'] == 'order') {
    $product = ($_POST['product']);
    $street = ($_POST['street']);
    $home = ($_POST['home']);
    $podhome = ($_POST['podhome']);
    $levelhome = ($_POST['levelhome']);
    $kvartira = ($_POST['kvartira']);
    $tel = ($_POST['tel']);
    $name = ($_POST['name']);

    $arr = array(
        'Имя:' => $name,
        'Заказ:' => $product,
        'Телефон:' => $tel,
        'Улица:' => $street,
        'Дом:' => $home,
        'Подъезд:' => $podhome,
        'Этаж:' => $levelhome,
        'Квартира:' => $kvartira,
    );

    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

    if ($sendToTelegram) {
        header("Location: https://тороторо.рф");
    }

    else {
        header("Location: https://тороторо.рф");
    }
}
