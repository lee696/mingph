<?php

return [

    'MODULE_ALLOW_LIST' => array('Home'),
    'URL_MODEL' => 2, //URL模式
    // 域名部署
    'DEFAULT_MODULE' => 'Home',
    // 资源目录
    'TMPL_PARSE_STRING' => array(
        '__JS__' => __ROOT__ . '/static/js',
        '__CSS__' => __ROOT__ . '/static/css',
        '__IMG__' => __ROOT__ . '/static/images',
        '__JSON__' => __ROOT__ . '/static/json',
        '__T__' => 'v=0.01'
    ),
    'RAW_HEADER' => [
        'X-Apple-Tz: 0',
        'X-Apple-Store-Front: 143444,12',
        'Accept: text/html,application/json,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Encoding: gzip, deflate',
        'Accept-Language: en-US,en;q=0.5',
        'Cache-Control: no-cache',
        'Content-type: application/json; charset=utf-8',
        'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:28.0) Gecko/20100101 Firefox/28.0',
        'X-MicrosoftAjax: Delta=true',
    ]
];
