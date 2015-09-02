﻿/*
*	全国三级城市联动 js版
*/
(function(){
	function Dsy(){
		this.Items = {};
	}
	Dsy.prototype.add = function(id,iArray){
		this.Items[id] = iArray;
	}
	Dsy.prototype.Exists = function(id){
		if(typeof(this.Items[id]) == "undefined") return false;
		return true;
	}
	var dsy = new Dsy();
dsy.add("0",["黑龙江","吉林","辽宁","河北","北京","天津","山西","内蒙","山东","江苏","安徽","浙江","上海","河南","湖北","湖南","江西","福建","广东","广西","海南","四川","贵州","云南","重庆","西藏","青海","甘肃","新疆","宁夏","陕西"]);
dsy.add("0_0",["佳木斯市","牡丹江市","哈尔滨市","七台河市","齐齐哈尔市","大庆市"]);
dsy.add("0_1",["辽源市","松原市","吉林市","白山市","梅河口市","延边鲜族州","长春市","白城市","四平市"]);
dsy.add("0_2",["鞍山市","大连市","盘锦市","沈阳市","辽阳市","朝阳市","葫芦岛市","铁岭市","营口市","阜新市","锦州市","抚顺市","本溪市"]);
dsy.add("0_3",["石家庄市","沧州市","邢台市","廊坊市","保定市","秦皇岛市","衡水市","唐山市","邯郸市","承德市","张家口市","石家庄","任丘市"]);
dsy.add("0_4",["北京市"]);
dsy.add("0_5",["天津市"]);
dsy.add("0_6",["吕梁市","长治市","忻州市","运城市","太原市","大同市","临汾市","晋城市","晋中市","阳泉市"]);
dsy.add("0_7",["呼和浩特市","乌兰浩特市","通辽市","锡林浩特市","海拉尔市","赤峰市","临河市","鄂尔多斯市"]);
dsy.add("0_8",["青岛市","枣庄市","临沂市","日照市","烟台市","淄博市","聊城市","德州市","济南市","潍坊市","东营市","荷泽市","滨州市","济宁市","威海市","菏泽市"]);
dsy.add("0_9",["苏州市","南京市","无锡市","连云港","镇江市","盐城市","南通市","丹阳市","淮安市","泰州市","徐州市","常州市","宿迁市"]);
dsy.add("0_10",["巢湖市","马鞍山市","蚌埠市","安庆市","淮北市","滁州市","阜阳市","合肥市","亳州市","六安市","黄山市","宿州市","芜湖市","淮南市"]);
dsy.add("0_11",["宁波市","嘉兴市","金华市","台州市","温州市","舟山市","丽水市","杭州市","衢州市","义乌市","湖州市"]);
dsy.add("0_12",["上海市"]);
dsy.add("0_13",["郑州市","开封市","焦作市","洛阳市","平顶山市","漯河市","新乡市","驻马店","三门峡市","南阳市","周口市","济源市","商丘市","安阳市"]);
dsy.add("0_14",["襄樊市","恩施州","武汉市","随州市","十堰市","宜昌市","荆州市","潜江市"]);
dsy.add("0_15",["岳阳市","湘潭市","长沙市","衡阳市","永州市","常德市","邵阳市","郴州市","怀化市"]);
dsy.add("0_16",["九江市","赣州市","景德镇市","南昌市","吉安市","萍乡市"]);
dsy.add("0_17",["福州市","厦门市","泉州市","龙岩市"]);
dsy.add("0_18",["湛江市","云浮市","广州市","清远市","揭阳市","韶关市","佛山市","江门市","潮州市","惠州市","东莞市","阳江市","茂名市","中山市","深圳市","汕头市","珠海市","梅州市","肇庆市"]);
dsy.add("0_19",["南宁市","柳州市","贺州市","桂林市","玉林市","贵港市","北海市","钦州市","百色市","梧州市"]);
dsy.add("0_20",["海口市"]);
dsy.add("0_21",["成都市","凉山州","攀枝花市","自贡市","泸州市","眉山市","乐山市","巴中市","南充市","达州市","德阳市","广元市","遂宁市","宜宾市","绵阳市"]);
dsy.add("0_22",["贵阳市","黔西南州","遵义市","毕节市"]);
dsy.add("0_23",["红河州","昭通市","昆明市","大理市","玉溪市","曲靖市","楚雄市"]);
dsy.add("0_24",["重庆市"]);
dsy.add("0_25",["拉萨市"]);
dsy.add("0_26",["西宁市"]);
dsy.add("0_27",["嘉峪关","天水市","白银市","武威市","张掖市","兰州市","平凉市"]);
dsy.add("0_28",["昌吉州","阿克苏地区","和田地区","乌鲁木齐市","巴音郭楞蒙古州","喀什地区","石河子市","哈密地区","克拉玛依市","奎屯市"]);
dsy.add("0_29",["银川市","吴忠市"]);
dsy.add("0_30",["西安市","汉中市","安康市","渭南市","宝鸡市","榆林市"]);
dsy.add("0_0_0",["佳木斯佳庆汽车销售有限公司"]);
dsy.add("0_0_1",["牡丹江市裕隆汽车销售服务有限公司"]);
dsy.add("0_0_2",["哈尔滨顺达汽车销售服务有限公司","哈尔滨龙汇汽车销售有限公司"]);
dsy.add("0_0_3",["七台河途乐贸易有限公司"]);
dsy.add("0_0_4",["齐齐哈尔鑫万翔汽车销售有限公司"]);
dsy.add("0_0_5",["大庆市盛鑫龙源汽车销售维修有限公司"]);
dsy.add("0_1_0",["辽源市丰达汽贸服务有限公司"]);
dsy.add("0_1_1",["松原市禹腾汽车贸易有限公司"]);
dsy.add("0_1_2",["吉林市东山汽车经销有限公司","吉林市荣升汽车贸易有限责任公司"]);
dsy.add("0_1_3",["白山市长铃汽车销售有限责任公司"]);
dsy.add("0_1_4",["梅河口市汇丰轻型汽车销售有限公司"]);
dsy.add("0_1_5",["延吉市东山汽车贸易有限公司"]);
dsy.add("0_1_6",["吉林省华通汽车贸易有限公司","长春腾盛汽车销售服务有限公司"]);
dsy.add("0_1_7",["白城市大众轿车销售维修有限公司"]);
dsy.add("0_1_8",["四平铭邦汽车销售有限公司"]);
dsy.add("0_2_0",["鞍山米兰发展有限公司"]);
dsy.add("0_2_1",["大连东升汽车销售服务有限公司","大连东洲汽车销售服务有限公司","大连鸿博汽车销售服务有限公司"]);
dsy.add("0_2_2",["盘锦东宸汽车销售有限公司"]);
dsy.add("0_2_3",["辽宁牧欧汽车销售服务有限公司","沈阳瑞志达汽车销售服务有限公司","沈阳大众企业集团有限公司"]);
dsy.add("0_2_4",["辽阳凯晟汽车销售服务有限公司"]);
dsy.add("0_2_5",["朝阳市尊翔汽车销售服务有限公司"]);
dsy.add("0_2_6",["葫芦岛市路赛得和安汽车销售有限公司"]);
dsy.add("0_2_7",["铁岭市北方汽车贸易服务有限公司"]);
dsy.add("0_2_8",["营口华熙汽车销售有限公司"]);
dsy.add("0_2_9",["阜新鑫澳汽车销售服务有限公司"]);
dsy.add("0_2_10",["锦州金帝汽车销售服务有限公司"]);
dsy.add("0_2_11",["抚顺恒信汽车贸易有限公司"]);
dsy.add("0_2_12",["本溪汇盛汽车销售服务有限公司"]);
dsy.add("0_3_0",["石家庄天和汽车贸易有限公司","石家庄国利汽车销售维修有限公司"]);
dsy.add("0_3_1",["沧州市世纪通汽车销售服务有限公司","沧州市融世通汽车贸易有限公司"]);
dsy.add("0_3_2",["邢台瑞鹏汽车服务有限公司","邢台佳利汽车贸易有限公司"]);
dsy.add("0_3_3",["霸州市兴业亚飞汽车服务有限公司","廊坊市瑞友汽车贸易有限公司"]);
dsy.add("0_3_4",["保定新星宇华长安铃木汽车销售有限公司"]);
dsy.add("0_3_5",["秦皇岛机电长安铃木汽车销售服务有限公司","秦皇岛瑞通嘉禾汽车销售服务有限公司"]);
dsy.add("0_3_6",["衡水通力汽车销售服务有限公司"]);
dsy.add("0_3_7",["唐山京津长安铃木汽车贸易有限公司","唐山市联亚物资贸易有限公司","唐山市冀东华昌汽车销售服务有限公司第二分公司"]);
dsy.add("0_3_8",["邯郸市辰鑫汽车销售服务有限公司","邯郸市立达汽车销售服务有限公司","邯郸市立达汽车销售服务有限公司(二店)"]);
dsy.add("0_3_9",["承德市庞大物流仓储有限责任公司"]);
dsy.add("0_3_10",["张家口阳光众达汽车贸易有限公司"]);
dsy.add("0_3_11",["石家庄广源汽车贸易有限公司"]);
dsy.add("0_3_12",["任丘市腾祥汽车销售服务有限公司"]);
dsy.add("0_4_0",["北方新兴(北京)汽车销售有限公司","北京北方新兴投资控股发展有限公司杏石口销售分公司","北京祥路来汽车销售服务有限公司","北京新兴燕都汽车销售有限公司","北京航空华北汽车贸易有限责任公司","北京世纪群飞商贸有限责任公司","北京永驰长铃商贸有限责任公司","北京联航长铃汽车销售有限公司","北京北方新兴长安铃木汽车销售服务有限责任公司","北京北方新兴投资控股发展有限公司通州汽车销售分公司"]);
dsy.add("0_5_0",["天津合兴盛业汽车销售有限公司","天津市燕语津发汽车销售有限公司","北方新兴（天津）汽车部件有限公司"]);
dsy.add("0_6_0",["吕梁金运汽车贸易有限公司"]);
dsy.add("0_6_1",["长治市鑫海汽车销售有限公司"]);
dsy.add("0_6_2",["忻州大正丰汽车维修有限公司"]);
dsy.add("0_6_3",["运城市通达汽车销售服务有限公司"]);
dsy.add("0_6_4",["山西盛隆汽车销售服务有限公司","山西友信汽车贸易有限公司"]);
dsy.add("0_6_5",["山西阳光家园冀东汽车连锁销售有限公司"]);
dsy.add("0_6_6",["洪洞县汽车贸易公司","临汾海普瑞商贸有限公司"]);
dsy.add("0_6_7",["山西机电晋城汽车销售有限公司"]);
dsy.add("0_6_8",["介休市通和汽车服务有限公司"]);
dsy.add("0_6_9",["阳泉市三江工程机械设备有限公司"]);
dsy.add("0_7_0",["内蒙古利丰汽车有限公司"]);
dsy.add("0_7_1",["兴安盟利丰恒泰汽车销售有限责任公司"]);
dsy.add("0_7_2",["通辽市通华投资有限责任公司"]);
dsy.add("0_7_3",["锡林郭勒盟利丰汽车行有限公司"]);
dsy.add("0_7_4",["呼伦贝尔市利丰汽车有限公司"]);
dsy.add("0_7_5",["赤峰市利丰汽车行有限公司"]);
dsy.add("0_7_6",["巴彦淖尔市利丰汽车行有限公司"]);
dsy.add("0_7_7",["鄂尔多斯市天意汽车销售有限公司"]);
dsy.add("0_8_0",["青岛康利捷汽车销售服务有限责任公司","青岛康安捷汽车销售服务有限公司","青岛康富捷汽车销售服务有限责任公司（胶南店）","青岛康捷汽车销售服务有限责任公司"]);
dsy.add("0_8_1",["枣庄世纪祥和商贸有限公司"]);
dsy.add("0_8_2",["临沂华安汽车销售服务有限公司"]);
dsy.add("0_8_3",["日照市润杰汽车贸易有限公司"]);
dsy.add("0_8_4",["龙口市长铃汽车销售服务有限公司","山东鸿运汽车交易广场有限公司"]);
dsy.add("0_8_5",["淄博伟图汽车销售服务有限公司","淄博久通汽车维修服务有限公司"]);
dsy.add("0_8_6",["聊城远达汽车销售服务有限公司"]);
dsy.add("0_8_7",["德州华润汽贸有限公司"]);
dsy.add("0_8_8",["济南快爱特有限公司","济南骏铃汽车服务有限公司"]);
dsy.add("0_8_9",["山东润杰集团有限公司","潍坊润德汽车贸易有限公司(二店）","青州润杰汽车贸易有限公司"]);
dsy.add("0_8_10",["东营市泰和汽车销售有限责任公司","东营宏远汽车销售服务有限公司"]);
dsy.add("0_8_11",["菏泽诚源汽车销售服务有限公司"]);
dsy.add("0_8_12",["山东滨州市汽车物资贸易有限公司"]);
dsy.add("0_8_13",["济宁世纪商贸有限公司"]);
dsy.add("0_8_14",["威海隆德贸易有限公司"]);
dsy.add("0_8_15",["菏泽星驰汽车销售服务有限公司"]);
dsy.add("0_9_0",["昆山豪骏汽车销售服务有限公司","苏州市都市飞梭汽车销售服务有限公司","苏州市都市飞梭汽车销售服务有限公司（二店）"]);
dsy.add("0_9_1",["南京福佳汽车销售服务有限公司","南京羚澳汽车贸易有限公司"]);
dsy.add("0_9_2",["无锡车龙锦汽车销售服务有限公司","江阴市永兴汽车销售有限公司"]);
dsy.add("0_9_3",["连云港东恒汽车销售服务有限公司"]);
dsy.add("0_9_4",["镇江福佳汽车贸易有限公司"]);
dsy.add("0_9_5",["江苏龙杰汽车实业有限公司"]);
dsy.add("0_9_6",["南通钧贺车业有限公司"]);
dsy.add("0_9_7",["丹阳京达汽车有限公司"]);
dsy.add("0_9_8",["江苏金天浩航汽车销售服务有限公司"]);
dsy.add("0_9_9",["泰州东方铃瑞汽车销售服务有限公司"]);
dsy.add("0_9_10",["徐州亚飞徐视汽车营销有限公司"]);
dsy.add("0_9_11",["常州联创亚飞投资发展有限公司"]);
dsy.add("0_9_12",["宿迁万骏汽车销售服务有限公司"]);
dsy.add("0_10_0",["巢湖市众力汽车销售服务有限公司"]);
dsy.add("0_10_1",["马鞍山市中兴摩托车销售有限公司"]);
dsy.add("0_10_2",["蚌埠新达汽车销售服务有限公司"]);
dsy.add("0_10_3",["安庆市通银汽车销售服务有限公司"]);
dsy.add("0_10_4",["淮北安奇汽车销售服务有限公司"]);
dsy.add("0_10_5",["滁州市建林汽车销售有限公司"]);
dsy.add("0_10_6",["阜阳市恒通汽车销售服务有限公司"]);
dsy.add("0_10_7",["合肥大步车之家汽车销售服务有限公司","合肥渝皖汽车销售有限公司"]);
dsy.add("0_10_8",["亳州市隆兴汽车销售有限责任公司"]);
dsy.add("0_10_9",["六安明峰汽车销售服务有限公司"]);
dsy.add("0_10_10",["黄山市畅远汽车销售服务有限公司"]);
dsy.add("0_10_11",["宿州永福汽车贸易有限公司"]);
dsy.add("0_10_12",["芜湖铃瑞汽车销售服务有限公司"]);
dsy.add("0_10_13",["淮南市赤骥汽车销售服务有限公司"]);
dsy.add("0_11_0",["宁波荣鑫汽车销售服务有限公司","余姚市东兴汽车销售服务有限公司","宁波市中瑞汽车销售服务有限公司"]);
dsy.add("0_11_1",["嘉兴市中信汽车销售有限公司"]);
dsy.add("0_11_2",["金华市福铃汽车销售有限公司2007.05.25"]);
dsy.add("0_11_3",["台州祥通汽车有限公司","台州市路桥汽车销售服务有限公司"]);
dsy.add("0_11_4",["永嘉利达汽车有限公司","温州市铃燕汽车销售服务有限公司","瑞安市铃达汽车销售服务有限公司"]);
dsy.add("0_11_5",["舟山永杰汽车销售服务有限公司"]);
dsy.add("0_11_6",["丽水市万兴汽车销售有限公司"]);
dsy.add("0_11_7",["杭州祥通铃木汽车有限公司"]);
dsy.add("0_11_8",["衢州市龙腾汽车销售服务有限公司"]);
dsy.add("0_11_9",["义乌迪通汽车销售有限公司"]);
dsy.add("0_11_10",["湖州长铃汽车销售服务有限公司"]);
dsy.add("0_12_0",["上海弘邦汽车销售服务有限公司","上海金旋铃铃汽车销售服务有限公司","上海弘迅汽车销售服务有限公司","上海弘怡汽车销售服务有限公司","上海弘品汽车销售服务有限公司","上海铃木机动车销售有限公司"]);
dsy.add("0_13_0",["河南省裕华汽车集团有限公司","河南鼎芝源汽车销售有限公司","河南中植汽车销售服务有限公司"]);
dsy.add("0_13_1",["开封市万宝实业有限公司"]);
dsy.add("0_13_2",["焦作市辂德驰汽车贸易有限公司"]);
dsy.add("0_13_3",["洛阳达飞汽车销售有限公司"]);
dsy.add("0_13_4",["平顶山市佳程汽车销售有限公司"]);
dsy.add("0_13_5",["漯河宏运汽车贸易有限公司"]);
dsy.add("0_13_6",["新乡市三环汽车贸易有限公司"]);
dsy.add("0_13_7",["驻马店市九洲汽车贸易有限公司"]);
dsy.add("0_13_8",["三门峡兴顺汽车销售服务有限公司"]);
dsy.add("0_13_9",["南阳达源汽车销售有限公司"]);
dsy.add("0_13_10",["周口市永达汽车贸易有限公司"]);
dsy.add("0_13_11",["济源市恒运汽车销售服务有限公司 "]);
dsy.add("0_13_12",["商丘市隆兴汽车销售有限公司"]);
dsy.add("0_13_13",["林州市华夏汽车销售服务有限公司"]);
dsy.add("0_14_0",["襄阳市桑奥汽车服务有限责任公司"]);
dsy.add("0_14_1",["恩施宏源汽车销售服务有限公司"]);
dsy.add("0_14_2",["武汉北方车辆有限公司"]);
dsy.add("0_14_3",["随州市金华汽车销售服务有限公司"]);
dsy.add("0_14_4",["十堰市新长安汽车销售有限公司"]);
dsy.add("0_14_5",["宜昌市华康工贸有限责任公司"]);
dsy.add("0_14_6",["荆州市众能汽车贸易有限公司"]);
dsy.add("0_14_7",["湖北汇银汽车销售服务有限公司"]);
dsy.add("0_15_0",["湖南邦田汽车服务有限公司"]);
dsy.add("0_15_1",["湘潭正铃汽车销售有限公司"]);
dsy.add("0_15_2",["长沙天潮贸易有限公司(二店)（原湖南弘泰瑞驰）","长沙天潮贸易有限公司"]);
dsy.add("0_15_3",["衡阳市裕翔汽车贸易服务有限公司"]);
dsy.add("0_15_4",["永州香河旺达汽车销售有限公司"]);
dsy.add("0_15_5",["常德市金源盛汽车贸易有限公司"]);
dsy.add("0_15_6",["邵阳市盛德汽车销售有限责任公司"]);
dsy.add("0_15_7",["郴州海弘汽车销售有限公司"]);
dsy.add("0_15_8",["怀化市恒生汽车销售服务有限公司"]);
dsy.add("0_16_0",["九江市新恒通汽车销售有限公司"]);
dsy.add("0_16_1",["赣州诚致汽车销售服务有限公司"]);
dsy.add("0_16_2",["景德镇市鹏翔汽车销售服务有限公司"]);
dsy.add("0_16_3",["江西燕兴长安汽车销售有限公司","江西瑞风汽车有限公司"]);
dsy.add("0_16_4",["吉安兰氏汽车贸易有限公司"]);
dsy.add("0_16_5",["萍乡华泰汽车销售服务有限公司"]);
dsy.add("0_17_0",["福州雄峰汽车维修服务有限公司","福州云驿汽车销售服务有限公司"]);
dsy.add("0_17_1",["厦门铃瑞汽车销售服务有限公司","厦门中展汽车维修销售服务有限公司","厦门文华菱瑞商贸有限公司"]);
dsy.add("0_17_2",["福建省晋江市安平雄峰车行","福建省晟邦汽车贸易有限公司"]);
dsy.add("0_17_3",["龙岩和众汽车销售服务有限公司"]);
dsy.add("0_18_0",["湛江市金富汽车销售有限公司"]);
dsy.add("0_18_1",["云浮市华宇汽车销售服务有限公司"]);
dsy.add("0_18_2",["广州市众赢汽车维修服务有限公司","广州泰润贸易有限公司?","广州市羚锐汽车贸易有限公司 ","重庆长安铃木汽车销售服务有限公司广州分公司"]);
dsy.add("0_18_3",["清远丰神汽车销售服务有限公司"]);
dsy.add("0_18_4",["广东欣旺贸易有限公司","揭阳市煜基实业有限公司"]);
dsy.add("0_18_5",["韶关市森鑫汽车贸易有限公司"]);
dsy.add("0_18_6",["佛山市路通汽车贸易有限公司","佛山市路通汽车贸易有限公司南海分公司 ","佛山市顺德亚飞汽车销售有限公司"]);
dsy.add("0_18_7",["江门市蓬江区泰卓汽贸有限公司"]);
dsy.add("0_18_8",["潮州市亿发物资汽车贸易有限公司"]);
dsy.add("0_18_9",["惠州市东升汽车贸易有限公司"]);
dsy.add("0_18_10",["东莞市羚丰汽车贸易有限公司","东莞华多利汽车有限公司"]);
dsy.add("0_18_11",["阳江市立丰汽车销售有限公司"]);
dsy.add("0_18_12",["茂名市亿泰汽车有限公司"]);
dsy.add("0_18_13",["中山市华铃汽车贸易有限公司"]);
dsy.add("0_18_14",["深圳市宝爵汽车贸易有限公司"]);
dsy.add("0_18_15",["汕头市欣旺贸易有限公司"]);
dsy.add("0_18_16",["珠海腾宇汽车销售服务有限公司"]);
dsy.add("0_18_17",["梅州洁源泵业有限公司"]);
dsy.add("0_18_18",["肇庆市美利汽车销售有限公司"]);
dsy.add("0_19_0",["广西弘晖汽车销售服务有限公司","广西恒晟汽车销售服务有限公司"]);
dsy.add("0_19_1",["柳州市容达汽车销售有限公司"]);
dsy.add("0_19_2",["贺州市日月机电销售有限公司"]);
dsy.add("0_19_3",["桂林市福航汽车销售服务有限公司","广西南百汽车销售服务有限公司"]);
dsy.add("0_19_4",["广西玉林市华维汽车销售服务有限公司"]);
dsy.add("0_19_5",["贵港市华港汽车销售服务有限公司"]);
dsy.add("0_19_6",["广西物资集团北海机电有限公司"]);
dsy.add("0_19_7",["广西恒晟汽车销售服务有限公司钦州分公司"]);
dsy.add("0_19_8",["广西南百汽车销售服务有限公司百色分公司"]);
dsy.add("0_19_9",["广西梧州新田汽车贸易有限公司"]);
dsy.add("0_20_0",["海南翔龙汽车销售服务有限公司?","海口东之星铃木汽车销售服务有限公司"]);
dsy.add("0_21_0",["成都万友经济技术开发总公司高新二分公司","成都西星汽车投资有限公司","四川铃尚汽车销售服务有限公司","四川辰安汽车销售服务有限公司"]);
dsy.add("0_21_1",["西昌永兴科技有限责任公司"]);
dsy.add("0_21_2",["攀枝花市永新商务有限责任公司"]);
dsy.add("0_21_3",["自贡市四达汽车贸易有限公司"]);
dsy.add("0_21_4",["泸州铃里汽车销售服务有限公司"]);
dsy.add("0_21_5",["眉山铃晨汽车销售服务有限公司"]);
dsy.add("0_21_6",["乐山红弗车业有限公司"]);
dsy.add("0_21_7",["巴中市铭僖工贸有限公司"]);
dsy.add("0_21_8",["南充明云铃丰车业有限公司"]);
dsy.add("0_21_9",["达州骏意汽车有限公司"]);
dsy.add("0_21_10",["成都万友经济技术开发总公司旌阳分公司"]);
dsy.add("0_21_11",["广元唯兴汽车销售服务有限公司"]);
dsy.add("0_21_12",["遂宁市益安金成汽车销售有限责任公司 "]);
dsy.add("0_21_13",["宜宾宏信汽车销售服务有限公司"]);
dsy.add("0_21_14",["绵阳新悦成贸易有限公司"]);
dsy.add("0_22_0",["贵州中企汽车销售有限公司","贵州乾顶汽车贸易有限公司"]);
dsy.add("0_22_1",["兴义市宏伟进口汽车维修有限公司"]);
dsy.add("0_22_2",["遵义市福瑞通汽车销售有限公司"]);
dsy.add("0_22_3",["毕节市原源汽车销售有限公司"]);
dsy.add("0_23_0",["开远市瑞丰汽车贸易有限责任公司"]);
dsy.add("0_23_1",["昭通市昭阳区农业机械有限公司"]);
dsy.add("0_23_2",["昆明万铃汽车销售服务有限公司","昆明万铃汽车销售服务有限公司(二店)","昆明万铃汽车销售服务有限公司（德宏店）","昆明万铃汽车销售服务有限公司（保山店）","昆明万铃汽车销售服务有限公司（临沧店）","昆明明杰汽车服务有限公司"]);
dsy.add("0_23_3",["大理万铃汽车销售服务有限公司"]);
dsy.add("0_23_4",["云南玉溪新世纪汽车贸易有限公司"]);
dsy.add("0_23_5",["曲靖壹众汽车经销有限公司"]);
dsy.add("0_23_6",["楚雄州机电设备有限公司"]);
dsy.add("0_24_0",["重庆瑞隆汽车销售有限公司","重庆都成万禾汽车服务有限公司","重庆永川区江民汽车销售有限公司","重庆交通物资集团汇达汽车销售有限公司","重庆辰宇骏铃汽车销售服务有限公司","重庆长安铃木汽车销售服务有限公司重庆分公司","重庆长安专用汽车有限公司","重庆市涪陵区文化旅游汽车出租有限公司","重庆上驭汽车销售服务有限公司","重庆市璧元汽车销售有限公司"]);
dsy.add("0_25_0",["西藏汽车工业贸易有限责任公司"]);
dsy.add("0_26_0",["西宁华菱丰汽车服务有限公司"]);
dsy.add("0_27_0",["嘉峪关市东方冶金机电有限责任公司"]);
dsy.add("0_27_1",["中国重汽集团天水兰凌专用汽车有限公司"]);
dsy.add("0_27_2",["白银海天长铃汽车销售服务有限公司"]);
dsy.add("0_27_3",["武威财发工商贸有限公司"]);
dsy.add("0_27_4",["张掖市海峰机电汽车贸易有限责任公司"]);
dsy.add("0_27_5",["兰州翔宇汽车销售服务有限公司"]);
dsy.add("0_27_6",["平凉百昌昌盛汽车销售有限公司"]);
dsy.add("0_28_0",["新疆汇展商贸有限公司"]);
dsy.add("0_28_1",["阿克苏笑好欣跃汽车销售服务有限公司"]);
dsy.add("0_28_2",["和田市德荣商贸有限责任公司"]);
dsy.add("0_28_3",["新疆天汇笑好汽车销售有限公司","乌鲁木齐市笑好汽车销售服务有限公司"]);
dsy.add("0_28_4",["新疆巴州恒瑞汽车贸易有限公司"]);
dsy.add("0_28_5",["喀什市通工实业有限公司"]);
dsy.add("0_28_6",["新疆石河子市天圣杰汽车销售服务有限公司?"]);
dsy.add("0_28_7",["哈密市大超汽车贸易有限责任公司"]);
dsy.add("0_28_8",["克拉玛依市华清汽车配件工业有限公司"]);
dsy.add("0_28_9",["奎屯泰达商贸有限责任公司"]);
dsy.add("0_29_0",["宁夏康杰中佰汽车销售服务有限公司","宁夏尖峰汽车销售服务有限公司"]);
dsy.add("0_29_1",["吴忠市天翔汽车销售客运有限公司"]);
dsy.add("0_30_0",["陕西致华实业有限公司","陕西康源汽车服务有限公司","陕西新荣盛汽车贸易有限公司","陕西新日盛汽车贸易有限公司","陕西中顺汽车贸易有限公司"]);
dsy.add("0_30_1",["汉中意通工贸有限公司"]);
dsy.add("0_30_2",["安康市阳光车业有限公司"]);
dsy.add("0_30_3",["渭南燕兴长安铃木汽车销售服务有限公司"]);
dsy.add("0_30_4",["宝鸡市金盛工贸有限公司"]);
dsy.add("0_30_5",["榆林昌通汽贸有限公司"]);

	function MyArea(s,lableArr,firstSelect){  //初始化函数
		/*var s=["Province","City","County"];//三个select的name
		 */
		var that=this;
		if(!(s&&s.length)){
			alert("省份插件需要传入select的id作为第一个参数(数组)");
			return
		}else{
			this.selectArr=s;
		}
		if(!(lableArr&&lableArr.length)){
			this.lableArr = ["省份","地级市","市、县级市"];//初始值
		}
		this.firstSelect=firstSelect;
		for(var i=0;i< s.length;i++){
			if(document.getElementById(s[i])!=null){
				(function(i){
					document.getElementById(s[i]).onchange=function(){
						change.bind(that,i)();
					};
				})(i);
			}
		}
		change.bind(this,0)();
	}
	function change(v,from){
		var from= from!=null?from:v,str= "0",
			that=this,
			startItem=document.getElementById(that.selectArr[0]),
			selItem=document.getElementById(that.selectArr[v]),
			itemIndex,selectStart= 1,selArr;
		if(that.firstSelect) {
			selectStart=0;
		}
		for(var i=0;i<v;i++){
			if(i>0){
				startItem =document.getElementById(that.selectArr[i]);
			}
			if(startItem.selectedIndex==-1){
				itemIndex=0;
				//第一次初始化select
			}else{
				itemIndex=startItem.selectedIndex-selectStart;
			}
			str+="_"+itemIndex;
		}
		with(selItem){
			if(from!=v||options.length<=0+selectStart){
				options.length=0;
				if(selectStart==1){
					options[0]=new Option(that.lableArr[v],that.lableArr[v]);
				}
				if(dsy.Exists(str)){
					selArr = dsy.Items[str];
					for(i=selectStart;i<selArr.length+selectStart;i++){
						options[i]=new Option(selArr[i-selectStart],selArr[i-selectStart]);
					}//end for
					//if(v){ options[0].selected = true; }
				}
			}
			//console.log(v,ss,ss.selectedIndex,str,selArr,"---------")
			if(++v<that.selectArr.length){change.bind(that,v,from)();}
		}

	}
	//暴露出去
	window.MyArea=MyArea;
})();
