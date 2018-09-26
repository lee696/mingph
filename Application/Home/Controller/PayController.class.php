<?php

namespace Home\Controller;

use Think\Controller;

class PayController extends Controller {

  public function Alipay(){
	 $paydata = $_POST; 
	 $this->assign('date',$paydata['date']);
	 $this->display('/Modal/payhtml');
  }

}
