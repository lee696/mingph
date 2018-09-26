<?php

namespace Home\Controller;

use Think\Controller;

/**
 * api代理
 * 由于第三方接口端跨域配置问题，通过第三方模拟访问实现代理功能
 * 要求实现功能:
 *      * 能够代理各种请求模式
 *      * 协调cookie
 *      * 客户端IP告知
 * 暂时只弄个简单代理
 */
class ApiController extends Controller {

    private $method;
    private $url;
    private $cookie;
    private $clientIp;
    private $param;
    private $header;

    public function test()
    {
        $url = 'http://120.25.237.198:8180/api/user/getUserInfo';
        //$url = 'http://120.25.237.198:8180/api/user/sendcode';
        $param = ['userId' => 22];
        //$param = ['phone' => '13066887201', 'type' => 1];
        $method = 'GET';
        if ($method == "GET") {
            $res = curlPostdata($url, $param, $method, C('RAW_HEADER'));
        } else {
            $res = curlPostdata($url, json_encode($param), $method, C('RAW_HEADER'));
        }
        print_r($res);
    }

    public function uploadImg(){
        $param = I('post.imgBase64','','trim');
        if(!$param){
            $this->returnError('参数错误');
        }
        $data = base64ToImg($param);
        if($data){
            $this->returnData('http://'.$_SERVER['HTTP_HOST'].$data);
        }
        $this->returnError('参数错误');
    }

    public function proxy()
    {
        $param = I('post.');  //为保障安全，前端请求全部为post             
        $url = isset($param['request_url']) ? $param['request_url'] : '';
        $method = isset($param['method']) ? strtoupper($param['method']) : '';
        unset($param['request_url']);
        unset($param['method']);
        if ($method == "GET") {
            $res = curlPostdata($url, $param, $method, C('RAW_HEADER'));
        } else {
            $res = curlPostdata($url, json_encode($param), $method, C('RAW_HEADER'));
        }
        if (empty($res) || $res['code'] !== 200) {
            writelog(['msg' => 'API接口请求异常错误!', 'param' => $param, 'data' => $res]);
            $this->returnError('API接口请求异常,请稍候再试!');
        }
        //$return_res = json_decode($res['result'], true);
        $return_res = array_merge(json_decode($res['result'], true), ['params' => ['require_url' => $url, 'method' => $method, 'post_data' => $param]]);  //临时调试用途
        $this->returnData($return_res);
    }

    public function proxy1()
    {
        $param = I('post.');  //为保障安全，前端请求全部为post
        $url = isset($param['request_url']) ? $param['request_url'] : '';
        $method = isset($param['method']) ? strtoupper($param['method']) : '';
        unset($param['request_url']);
        unset($param['method']);
        if ($method == "GET") {
            $res = curlPostdata($url, $param, $method, C('RAW_HEADER'));
        } else {
            $res = curlPostdata($url, json_encode($param), $method, C('RAW_HEADER'));
        }
        if (empty($res) || $res['code'] !== 200) {
            writelog(['msg' => 'API接口请求异常错误!', 'param' => $param, 'data' => $res]);
            $this->returnError('API接口请求异常,请稍候再试!');
        }
        $this->returnData($res);
        die;
        $return_res = array_merge(json_decode($res['result'], true), ['params' => ['require_url' => $url, 'method' => $method, 'post_data' => $param]]);  //临时调试用途
        $this->returnData($return_res);
    }

    /**
     * 管理后台数据返回API
     */
    public function returnData($data = [], $msg = '', $code = 200)
    {
        /* $ret_data = array(
          'code' => $code,
          'msg' => $msg,
          'data' => $data,
          ); */
        $ret_data = $data;
        echo json_encode($ret_data);
        exit;
    }

    /**
     * 获取数据失败提示
     */
    public function returnError($msg = '', $code = 400)
    {
        $ret_data = array(
            'code' => $code,
            'msg' => $msg,
            'data' => [],
        );
        echo json_encode($ret_data);
        exit;
    }

    /* public function proxy(){
      $this->initHeader();
      $param = I('post.');
      //var_dump($param);
      $url = $param['request_url'];
      unset($param['request_url']);
      $data = json_encode($param, JSON_UNESCAPED_UNICODE);
      //print_r($data);die;
      $header = [];
      foreach ($this->header as $k => $v){
      if(in_array($k, ['CONTENT-TYPE', 'CONTENT-LENGTH'])){
      continue;
      }
      $header[] = "$k:$v";
      }

      $header[] =  'Content-Type: application/json';
      $header[] = 'Content-Length: ' . strlen($data);
      $ch = curl_init($url);
      curl_setopt($ch,CURLOPT_HEADER,1);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
      //        curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
      $result = curl_exec($ch);
      // 获得响应结果里的：头大小
      $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
      // 根据头大小去获取头信息内容
      $headerResponse = substr($result, 0, $headerSize);
      dump($headerResponse);
      $result = substr($result, $headerSize, -1);
      curl_close($ch);
      exit(json_decode($result, true));
      } */

    private function initHeader()
    {
        $this->header = [];
        foreach ($_SERVER as $key => $value) {
            if ('HTTP_' == substr($key, 0, 5)) {
                $this->header[str_replace('_', '-', substr($key, 5))] = $value;
            }
        }
        if (isset($_SERVER['PHP_AUTH_DIGEST'])) {
            $this->header['AUTHORIZATION'] = $_SERVER['PHP_AUTH_DIGEST'];
        } elseif (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
            $this->header['AUTHORIZATION'] = base64_encode($_SERVER['PHP_AUTH_USER'] . ':' . $_SERVER['PHP_AUTH_PW']);
        }
        if (isset($_SERVER['CONTENT_LENGTH'])) {
            $this->header['CONTENT-LENGTH'] = $_SERVER['CONTENT_LENGTH'];
        }
        if (isset($_SERVER['CONTENT_TYPE'])) {
            $this->header['CONTENT-TYPE'] = $_SERVER['CONTENT_TYPE'];
        }
    }


}
