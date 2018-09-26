<?php

class Ylm {

    private $appid = '';
    private $channel_id = 25;
    private $key = 'VEWYUNETcHpIv5KcE0cMRVIHHZ5T3vdx';
    private $vhost = 'http://dev.ylmo2o.com';
    private $host = 'http://dev.ylmo2o.com/admin/ylmapi';
    private $host2 = 'http://dev.ylmo2o.com/admin/lrg';
    public function __construct($appid = ''){
        $this->appid = $appid;
    }

    public function oauth2($jump_url)
    {
        $data = [];
        $data['appid'] = $this->appid;
        $data['channel_id'] = $this->channel_id;
        $data['scope'] = 'snsapi_userinfo';
        $data['state'] = 'web';
        $data['jump_url'] = $jump_url;
        $data['sign'] = $this->getSign($data);
        $json = json_encode($data);
        $base64 = base64_encode($json);
        $cipher = urlencode($base64);
        redirect($this->host . '/oauth2?cipher=' . $cipher);
    }

    public function cipherDecode($cipher)
    {
        $base64 = urldecode($cipher);
        $json = base64_decode($base64);
        $data = json_decode($json, true);
        return $data;
    }

    public function getUserInfo($openid)
    {
        $url = $this->host . '/getuserinfo';
        $data = [];
        $data['appid'] = $this->appid;
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        $data['sign'] = $this->getSign($data);
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function sendMessage()
    {
        // 发送模板消息
    }

    public function getJsConfig($localUrl)
    {
        $data = [];
        $data['appid'] = $this->appid;
        $data['channel_id'] = $this->channel_id;
        $data['url'] = $localUrl;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/getjssdkconfig';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function getMemberInfo($openid)
    {
        $url = $this->host . '/getmeminfo';
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        $data['sign'] = $this->getSign($data);
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function updateMemberInfo($openid, $sex = null, $birth = null)
    {
        $url = $this->host . '/uptmeminfo';
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        if(isset($sex)){
            $data['sex'] = $sex;
        }
        if(isset($birth)){
            $data['brid_day'] = date('Ymd', $birth);
        }
        $data['sign'] = $this->getSign($data);
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    /**
     * @param $openid
     * @param $grade    等级积分
     * @param $score    消费积分
     * @param $balance  余额
     * @param $opertype 1：注册    2： 平台调整     3： 重值       4： 消费   5： 邀请   6：赠送
     * @param bool $overflow  true: 整体覆盖   false: 在原有基础上做加法
     */
    public function updateAssets($openid, $grade, $score, $balance, $opertype, $overflow = false)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        if ($overflow) {
            $data['grade_value'] = $grade;
            $data['consume_score'] = $score;
            $data['balance'] = $balance;
        } else {
            $data['add_grade_value'] = $grade;
            $data['add_consume_score'] = $score;
            $data['add_balance'] = $balance;
        }
        $data['opertype'] = $opertype;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/uptassets';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    // $type：   1：余额变动      2：消费积分变动    3：等级积分变动
    public function getAssetsHistory($openid, $page, $type)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        $data['cur_page'] = $page;
        $data['type'] = $type;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/getassetshis';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function getCustomerInfo($customerId)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['cust_id'] = $customerId;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/getcusinfo';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function getStoreInfo($customerId)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['cust_id'] = $customerId;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/getpoinfo';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function register($openid, $userName, $phone, $password, $code)
    {
        $data = [];
        $data['appid'] = $this->appid;
        $data['channel_id'] = $this->channel_id;
        $data['openid'] = $openid;
        $data['user_type'] = 0;
        $data['user_name'] = $userName;
        $data['code'] = $code;
        $data['password'] = $password;
        $data['phone'] = $phone;
        $data['sign'] = $this->getSign($data);

        $url = $this->host2 . '/register';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function sendSms($phone)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['appid'] = $this->appid;
        $data['phone'] = $phone;
        $data['sign'] = $this->getSign($data);
        $url = $this->host2 . '/sendsms';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function login($phone, $password, $code)
    {
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['appid'] = $this->appid;
        $data['phone'] = $phone;
        $data['password'] = $password;
        $data['code'] = $code;
        $data['sign'] = $this->getSign($data);
        $url = $this->host2 . '/login';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function getCustomerId(){
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['appid'] = $this->appid;
        $data['sign'] = $this->getSign($data);
        $url = $this->host . '/getcustid';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    public function getPayId($cust_id, $jump_url){
        $data = [];
        $data['cust_id'] = $cust_id;
        $data['channel_id'] = $this->channel_id;
        $data['type'] = 1;
        $data['jump_url'] = $jump_url;
        $data['sign'] = $this->getSign($data);
        $json = json_encode($data);
        $base64 = base64_encode($json);
        $cipher = urlencode($base64);
        return $this->vhost . '/admin/wepay/getpayid?cipher=' . $cipher;
    }
    public function getPayUrl($cust_id, $price, $pay_no, $goods_name, $goods_explain, $pay_notify_url, $jump_url, $openid, $trade_type = 2, $is_raw = 2){
        $data = [];
        $data['channel_id'] = $this->channel_id;
        $data['cust_id'] = $cust_id;
        $data['amount'] = $price * 100;
        $data['orderno'] = $pay_no;
        $data['goods_name'] = $goods_name;
        $data['goods_explain'] = $goods_explain;
        $data['pay_notify_url'] = $pay_notify_url;
        $data['jump_url'] = $jump_url;
        $data['trade_type'] = $trade_type;
        $data['openid'] = $openid;
        $data['is_raw'] = $is_raw;
        $data['sign'] = $this->getSign($data);
        $url = $this->vhost.'/admin/wepay/wxprepay';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }
    public function orderQuery($cust_id, $orderno){
        $data = [];
        $data['cust_id'] = $cust_id;
        $data['orderno'] = $orderno;
        $data['channel_id'] = $this->channel_id;
        $data['sign'] = $this->getSign($data);
        $url = $this->vhost.'/admin/wepay/query';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }
    public function getGradeList($appid){
        $data = [];
        $data['appid'] = $appid;
        $data['channel_id'] = $this->channel_id;
        $data['sign'] = $this->getSign($data);
        $url = $this->host.'/getgradelist';
        $res = $this->Post($url, $data);
        return json_decode($res, true);
    }

    private function Post($url, $curlPost, $header = [], $cookieFile = '', $is_send = false)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

        if ($cookieFile) {
            if ($is_send) {
                curl_setopt($curl, CURLOPT_COOKIEFILE, $cookieFile);
            } else {
                curl_setopt($curl, CURLOPT_COOKIEJAR, $cookieFile);
            }
        }
        if ($header) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        }
        $return_str = curl_exec($curl);
        curl_close($curl);
        return $return_str;
    }

    private function getSign($data)
    {
        ksort($data);
        $string = $this->ToUrlParams($data);
        $string .= '&key=' . $this->key;
        $sign = md5($string);
        $sign = strtoupper($sign);
        return $sign;
    }

    private function ToUrlParams($data)
    {
        $buff = "";
        foreach ($data as $k => $v) {
            if ($k != "sign" && $v !== "" && !is_array($v)) {
                $buff .= $k . "=" . $v . "&";
            }
        }
        $buff = trim($buff, "&");
        return $buff;
    }

}
