<?php
	class Admin_Model_Fakenum extends Admin_Model_DAO 
	{
		public $_name="fakenum";
		public $_primary="id";
		
		public function getFakeFactorByName($name)
		{
		    $r=$this->getItemsByCriteria(array('name=?'=>$name));
		    return $r['rows']->current()->factor;
		}
}