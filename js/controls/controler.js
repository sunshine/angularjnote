(function(angular){

//创建一个控制器
var app=angular.module('todo.controller',['todoApp.service']);

app.controller('todoController',['$scope','$location','MyServer',function($scope,$location,MyServer){
	// console.log(MyServer)
		$scope.data=MyServer.get();


		//1.添加数据

		 $scope.newTask='';
		$scope.add=function(){
			if(!$scope.newTask) return;
			 var id;
			if($scope.data.length>0){
				id=$scope.data[$scope.data.length-1].id+1;
			}else{
				id=1;
			}
			MyServer.add(id, $scope.newTask)
			$scope.newTask='';
		}

		//删除任务
		$scope.remove=function(id){
			MyServer.remove(id);
		}

		//编辑任务
		$scope.iseiding=-1;
		$scope.edit=function(id){
			$scope.iseiding=id;
		}
		//保存数据
		$scope.save=function(){
			$scope.iseiding=-1;
			MyServer.save();
		};


		//切换所有的任务
	var flag=false;
	$scope.toggleAll=function(){
		MyServer.toggleAll(flag);
		flag=!flag;
	}

	//点击清除所有
	// $scope.clearCompleteAll=function(){
	// 	for (var i = 0; i <  $scope.data.length; i++) {
	// 		if( $scope.data[i].complete){
	// 			 $scope.data.splice(i,1)
	// 		};

	// 	}
	// }
	//点击清除所有完成,阿静为完成的任务放到一个数组里面.重新渲染出来
	$scope.clearCompleteAll=function(){
		 $scope.data=MyServer.removeAllCompleted();
	}


	//显示和隐藏完成按钮
	$scope.isshow=function(){
		return MyServer.isShow();
	}



	//显示未完成数
	$scope.count=function(){
		return MyServer.count();
	};


	//切换状态
	// $scope.active=function(){
	// 	$scope.search={complete:false}
	// };

	// $scope.complete=function(){
	// 	$scope.search={complete:true}
	// };

	// $scope.all=function(){
	// 	$scope.search='';
	// }
	//
	//这里不能监控status.url()的值,因为只执行一次,获得的值是一个定值,也可以设置#后面的值
	//随着数据的变化,$scope里面的值都会刷新,
	$scope.status=$location;
	$scope.$watch("status.url()",function(now,old){
		switch(now){
			case '/active':
			$scope.search={complete:false};
			break;
			case '/completed':
			$scope.search={complete:true};
			break;
			default:
			$scope.search={};
			break;
		}
	})

	}])


})(angular)
