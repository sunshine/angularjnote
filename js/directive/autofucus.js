(function(angular){
	//dom元素的操作.自动获得焦点函数
	var app=angular.module('mydirective',[]);
	app.directive('autoFucus',['$timeout',function($timeout){
			return {
				link:function(scope,element,attributes){
					element.on('dblclick',function(){
						var item=element.parent().next().children();//刚开始没有input标签,只能获得lebel标签,所以通过后代获取
						$timeout(function(){
							item[0].focus();//转化为dom元素操作
						},100)
					})
				}
			}
	}])
	
})(angular)