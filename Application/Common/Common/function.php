<?php

/**
 * 写日志
 * 调用方式   writelog(['msg'=>'说明文字','order_info'=>[]]);
 * @param type $data
 */
function writelog($data = [])
{
    $dir = APP_PATH . "logs/";
    if (!is_dir($dir)) {
        @mkdir($dir);
    }
    $logname = $dir . date("Ymd") . ".log";
    $date = date("Y-m-d H:i:s") . "=>";
    $debug_backtrace = debug_backtrace();
    $res = [
        'file' => $debug_backtrace[0]['file'],
        'line' => $debug_backtrace[0]['line'],
        'class' => isset($debug_backtrace[1]['class']) ? $debug_backtrace[1]['class'] : '',
        'func' => isset($debug_backtrace[1]['function']) ? $debug_backtrace[1]['function'] : '',
            //'args' => isset($debug_backtrace[0]['args']) ? $debug_backtrace[0]['args'] : '',
    ];
    $res = array_merge($res, $data);
    file_put_contents($logname, $date . var_export($res, TRUE) . "\r\n", FILE_APPEND);
}

function curlPostdata($url, $data = NULL, $method = "GET", $author = NULL)
{
    //$username = 'admin';
    //$password = '1234';
    $timeout = 60 * 5;
    $url = $url . '?' . http_build_query($data);
    ini_set('max_execution_time', $timeout);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => $timeout, //设置超时时间为5分钟
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_POSTFIELDS => is_array($data) ? http_build_query($data) : $data, //json 对象字符串
        CURLOPT_HTTPHEADER => empty($author) ? array() : $author,
        CURLOPT_USERAGENT => '',
        CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
            //CURLOPT_USERPWD => "{$username}:{$password}",
    ));
    $result = curl_exec($curl);
    $error = curl_error($curl);
    $curlinfo = curl_getinfo($curl);
    curl_close($curl);
    return array("result" => $result, "error" => $error, "code" => $curlinfo['http_code'], "curlinfo" => $curlinfo);
}

/**
 * base64 寸本地
 * @param $base64
 * @return bool|stringd
 */
function base64ToImg($base64)
{
    if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64, $result)) {
        $type = $result[2];
        $ext = ['jpg', 'gif', 'png', 'jpeg'];
        if (!in_array($type, $ext)) {
            return false;
        }
        $new_file = '/static/upload/' . time() . rand(100000, 999999) . '.' . $type;
        if (file_put_contents('.' . $new_file, base64_decode(str_replace($result[1], '', $base64)))) {
            return $new_file;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
