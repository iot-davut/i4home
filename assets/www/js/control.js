


angular.module('starter.control', [])

    .controller('AppCtrl', function($scope) {
        // TODO
    })
    .controller('DemoCtrl', function($scope) {
        // TODO
    })
	.controller('BranchCtrl', function($scope, $sce ,SysConfigService) {
        // TODO
		$scope.forgetpwdurl=$sce.trustAsResourceUrl(SysConfigService.Forgetpwdurl);
		$scope.registerurl=$sce.trustAsResourceUrl(SysConfigService.Registerurl);
		//alert($scope.forgetpwdurl);
    })
    .controller('ContentCtrl', function($scope, $sce, $ionicScrollDelegate, $rootScope, $localStorage, $sessionStorage,$ionicLoading,$window, LoadingService,SysConfigService) {

		$scope.statusurl=$sce.trustAsResourceUrl(SysConfigService.Statusurl);
		$scope.controlurl=$sce.trustAsResourceUrl(SysConfigService.Controlurl);	
		$scope.alarmurl=$sce.trustAsResourceUrl(SysConfigService.Alarmurl);	
		$scope.deviceurl=$sce.trustAsResourceUrl(SysConfigService.Deviceurl);	
		$scope.profileurl=$sce.trustAsResourceUrl(SysConfigService.Profileurl);	
		
		//$rootScope.cancel = $ionicLoading.hide;
		//$scope.showloading = function() {
			LoadingService.show();
		//};
		//$rootScope.cancelloading = function() {
		//	LoadingService.hide();
		//};
		//showloading();
		
		
		//$scope.statusmode=2;//$sessionStorage.mstatus;
		//alert("hihi");
		
//  $scope.scrollTop = function() {
//       $ionicScrollDelegate.$getByHandle('contentScroll').scrollTop(false);
/*	   
$timeout(function(){

},50);
*/	 
	 
//  };
		/*
		$scope.querystatus = function(){
		
			StatusService.querystatus()
			.success(function (result) {
					if(result.indexOf("ms:0")>-1)
					{
						$scope.statusmode=0;
					}
					else if(result.indexOf("ms:1")>-1)
					{
						$scope.statusmode=1;
					}
					else if(result.indexOf("ms:2")>-1)
					{
						$scope.statusmode=2;
					}
					else
						$scope.statusmode=-1;
					
					
					if(result.indexOf("#dt:")>-1)
					{
					//	var dtIndex=result.indexOf("#dt:");
					//	$("p[id^='mtime']").text(formatCreatedDate(data.substring(dtIndex+4)));
					}			
			})
            .error(function (data, status, headers, config) {
				//alert("Operation Failure!");
				         alert("Status Error!")
       // alert(data);
       // alert(status);
       // alert(headers);
       // alert(config);
			});		
		
		
		};
	
		//$scope.querystatus();
		
        $scope.updatestatus = function(mode) {

			var msg="";
			if(mode==0)
			{
				msg="Disarm";
			}
			else if(mode==1)
			{
				msg="Home";
			}
			else if(mode==2)
			{
				msg="Away";
			}
			else if(mode==3){
				msg="Clear";
			}		
			
			StatusService.alarmcmd(mode)
			.success(function (result) {
				
				if(mode==0 || mode==1 || mode==2)
				{
					alert(msg+" mode! Refreshing the page");
					$window.location.reload();
				}
				else if(mode==3)
				{
					alert("Clear Status!");
				}				
			//	$state.go('login');
			})
            .error(function (error) {
				alert(msg+"Cmd Failure "+error);
			//	$state.go('login');
			}); 			
		};
			*/
    })
	.controller('TabCtrl', function($scope, $rootScope, $localStorage, $ionicScrollDelegate,$sessionStorage,$window, $state, PushProcessingService,LoadingService) {
	
		$scope.hasAlarm=0;
		$scope.locationrefresh = function() {
			$window.location.reload();
		};
		
		$state.transitionTo($state.current,null,{reload: true, inherit:false, notify:true});

		$scope.gotostatus = function() {
			$window.location.href='#/sidemenu/status';
			$window.location.reload();
			//$state.go('sidemenu.status',{},{reload:true});

		//	$window.location.reload(true);
//		$state.go('sidemenu.status', {}, {reload: true});
		};

		$scope.gotocontrol = function() {
			$window.location.href='#/sidemenu/control';
			$window.location.reload();
			//$state.go('sidemenu.control',{},{reload:true});
		//	$state.go('sidemenu.control', {}, {reload: true});
		//	$window.location.reload(true);
		};

		$scope.gotoalarm = function() {
			$scope.hasAlarm=0;
			$window.location.href='#/sidemenu/alarm';
			$window.location.reload();
			//$state.go('sidemenu.alarm',{},{reload:true});
		//	$window.location.reload(true);
		};

		$scope.gotodevice = function() {
			$window.location.href='#/sidemenu/device';
			$window.location.reload();
			//$state.go('sidemenu.device',{},{reload:true});
		//	$window.location.reload(true);
		};
        // TODO
    })
	.controller('RefreshCtrl', function($scope,$ionicViewService) {
        // TODO
		 //$window.location.reload();
		 // $route.reload();
		 // $ionicViewService.clearHistory();
    })
	.controller('MenuCtrl', function($scope, $rootScope, $localStorage, $sessionStorage,$timeout, $ionicSideMenuDelegate, $state, LogoutService, PushProcessingService) {


		$scope.username=$localStorage.username;
		//alert($localStorage.username);
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleRight();
		};
		
		$scope.toggleRight = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$scope.gotoprofile = function() {
			$state.go('sidemenu.profile');
		};
		$scope.tryLogout = function()
		{
			LogoutService.tryLogout()
			.success(function (result) {
			//	alert("Logout Success ");
			})
            .error(function (error) {
				//alert("Logout Failure "+error);
			});
			//$localStorage.username="";

			$localStorage.logout=1;
			$state.go('login');
			//PushProcessingService.unregister(PushProcessingService.registerID);
			PushProcessingService.unregister();
		};
	})
	.controller('LoginCtrl', function($scope, $rootScope,$ionicViewService, $ionicHistory, $localStorage, $sessionStorage,$window, $state, $ionicLoading, LoginService, PushProcessingService, CookLoginService) {

		$scope.user = {};
		$scope.user.username = $localStorage.username;
		if($localStorage.logout==0)
		{
			CookLoginService.tryLogin()
			.success(function (result) {
				if(result.trim().indexOf('LoginSuccess')>=0)
				{
					$ionicLoading.hide();
					$ionicHistory.clearHistory();
//					$state.go('sidemenu.status');
					$window.location.href='#/sidemenu/status';
           			$window.location.reload();
				}
			});
		}
		else
		{
			$localStorage.logout=0;
		}

		function loginStart(user) {

            if (!user.username || !user.password)
                return false;

            $ionicLoading.show({
                template: 'Login...'
            });


			LoginService.tryLogin(user)
			.success(function (result) {
				//alert(result.trim().indexOf('LoginSuccess'));
				if(result.trim().indexOf('LoginSuccess')>=0)
				{
					$ionicLoading.hide();
					var elements = result.trim().split(":");
					if(elements.length==2)
					{
						//alert(elements[1]);
						//$rootScope.username = elements[1];
						$sessionStorage.username = elements[1];
						$localStorage.username = elements[1];

						//alert($localStorage.username);
					}


					//$sessionStorage.login=1;
					$ionicHistory.clearHistory();
					//PushProcessingService.registrate(PushProcessingService.registerID);
					//$state.go('sidemenu.status');
					$window.location.href='#/sidemenu/status';
           			$window.location.reload();
					//alert("logining success");
					PushProcessingService.gcmregistrate();
					PushProcessingService.lvptnregistrate();
					//try{
					//	if (PushProcessingService.registerID) {
					//		PushProcessingService.gcmregistrate();
					//	}
					//}
					//catch(e)
					//{
					//	alert(e);
					//}

				}
				else
				{
					alert(result);
					$ionicLoading.show({
						template: result,
						delay: 500,
						duration: 1000
					});
//					$state.go('control');
				}
			})
            .error(function (error) {
				//alert(error.message);
				$ionicLoading.show({
                  template: 'Login Failure, Please Check Again',
                  delay: 500,
                  duration: 1000
                });
                //$scope.status = 'Unable to load post data: ' + error.message;
            }).then(function(response){

			});



		 };

		 $scope.tryLogin = loginStart;
		 //loginStart();

		 //CookLoginService

			//if($sessionStorage.login==1)
			//{
			//	$state.go('sidemenu.status');
			//}


		/*

		*/
		/*
        $scope.user = {};

        $("#elephant").on('load', function() {
            var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
            imgCanvas.width = elephant.width;
            imgCanvas.height = elephant.height;
            imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
            var imgAsDataURL = imgCanvas.toDataURL("image/(jpg|jpeg)");
            try {
                $localStorage.bkapp_avatar = imgAsDataURL;
            }
            catch (e) {
                console.log("Storage failed: " + e);
            }
        });

        $scope.tryLogin = function(user) {
            if (!user.username || !user.password)
                return false;
            $ionicLoading.show({
                template: '登入中...'
            });
            LoginService.tryLogin(user)
            .success(function (result) {
                $scope.token = result;
                $localStorage.bkapp_access_token = $scope.token.access_token;
                AppuserService.getAppuserByUsername(user.username)
                .success(function (result) {
                    if (result.data != "") {
                        $rootScope.currentUser = result.data;
                        $localStorage.bkapp_current_user = angular.toJson(result.data);
                        $("#elephant").attr('src', result.data.profile.avatar_url);
                        if(typeof window.plugins != 'undefined') {
                            $rootScope.androidPush.setAlias($rootScope.currentUser.username, $rootScope.successHandler);
                        }
                        $ionicLoading.hide();
                        $state.go('main');
                    } else {
                        $ionicLoading.show({
                          template: '登入错误',
                          delay: 500,
                          duration: 2000
                        });
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load post data: ' + error.message;
                });
            })
            .error(function (error) {
                $ionicLoading.show({
                  template: '登入失败，请检查用户名或密码',
                  delay: 500,
                  duration: 2000
                });
                $scope.status = 'Unable to load post data: ' + error.message;
            });
        };
        */
    });

