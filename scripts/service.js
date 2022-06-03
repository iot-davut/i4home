
angular.module('starter.service', ['ionic'])
	.factory('SysConfigService', ['$http', function($http) {
		var dataFactory = {};
		dataFactory.AppName="LivingPattern";
//		dataFactory.AppName="KMD";
		dataFactory.ShowRegFgpwd=true;
//		dataFactory.BranchInfo="home";
//		dataFactory.BaseURL="livingpattern.co";

		dataFactory.BranchInfo="app";
		dataFactory.BaseURL="i4home.net";

		dataFactory.SubFolder="home";		
		
//		dataFactory.BranchInfo="home";
//        dataFactory.BaseURL="kmd.net.br";

		dataFactory.Forgetpwdurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/forgetpwd.php";
		dataFactory.Registerurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/register.php";
		dataFactory.Statusurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/status.php";
		dataFactory.Controlurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/control.php";
		dataFactory.Alarmurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/event.php";
		dataFactory.Deviceurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/devicestatus.php";
		dataFactory.Profileurl="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/profile.php";

		dataFactory.Pushnotificateupdate="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/pushnotificateupdate.php";
		//dataFactory.Machinestatus="http://"+dataFactory.BranchInfo+".livingpattern.co/"+dataFactory.BranchInfo+"/machinestatus.php";
		//dataFactory.Alarmcmd="http://"+dataFactory.BranchInfo+".livingpattern.co/"+dataFactory.BranchInfo+"/alarmcmd.php";
		dataFactory.Mobilogoutupdate="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/mobilogoutupdate.php";
		dataFactory.Mobiloginupdate="http://"+dataFactory.BranchInfo+"."+dataFactory.BaseURL+"/"+dataFactory.SubFolder+"/mobiloginupdate.php?cdn=0";
		return dataFactory;
	}])
.factory('PushProcessingService', ['$http','$state','SysConfigService', function($http,$state,SysConfigService) {

	var transFn = function(data) {
		var str = [];
		for(var p in data)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
		return str.join("&");
	};
	var postCfg = {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		transformRequest: transFn
	};


    function onDeviceReady() {
        console.info('NOTIFY  Device is ready.  Registering with GCM server');
		
		var push = PushNotification.init({
			android: {
				senderID: "1036345686923",
				sound: true,
				vibrate: true
			},
			//browser: {
			//	pushServiceURL: 'http://push.api.phonegap.com/v1/push'
			//},
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			windows: {}
		});
		
		push.on('registration', (data) => {
			//var deviceToken=data.registrationId;
			console.log("regid ->"+data.registrationId+" deviceid ->"+device.uuid);
			registerID=data.registrationId;
			//AppSettings.DeviceToken=device.uuid;
			//AppSettings.RegId=data.registrationId;
		});
		push.on('notification', (data) => {
			console.log('notificationmessage', data.message);
	  
			let self = this;
			//if user using app and push notification comes
			if (data.additionalData.foreground) {
				console.log("foreground:"+data.message);
				alert(data.message);
				var tabscope = angular.element(document.getElementById("tabCtrl")).scope();
				tabscope.$apply(function(){
					tabscope.hasAlarm=1;
				});
			} else {
				console.log("background:"+data.message);
				//console.log("Push notification clicked");
				setTimeout(() => { 
//					this.nav.setRoot(TabEventPage, {message: data.message});
//					 this.events.publish("notification", null);
					
					var tabscope = angular.element(document.getElementById("tabCtrl")).scope();
				
					tabscope.$apply(function(){
						tabscope.gotoalarm();
					});
						
					//var elem = angular.element(document.querySelector('[ng-app]'));
					//var injector = elem.injector();
					//var pushService = injector.get('PushProcessingService');
					//pushService.gotoalarmpage();

					}, 3000);
			}
		});
		
		push.on('error', (e) => {
			console.log(e.message);
		});
        //var devicestr =  'Device Name: '     + device.name     + '<br />' +
        //              'Device Cordova: '  + device.cordova  + '<br />' +
        //               'Device Platform: ' + device.platform + '<br />' +
        //               'Device UUID: '     + device.uuid     + '<br />' +
        //               'Device Version: '  + device.version  + '<br />';		
		
		//alert(devicestr);

	//	var pushNotification = window.plugins.pushNotification;
	//	pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {"senderID":"1036345686923","ecb":"onNotificationGCM"});
    }
	/*
    function gcmSuccessHandler(result) {
        console.info('NOTIFY  pushNotification.register succeeded.  Result = '+result);
	//	alert('NOTIFY  pushNotification.register succeeded.  Result = '+result);
    }
    function gcmErrorHandler(error) {
        console.error('NOTIFY  '+error);
    //    alert('NOTIFY  '+error);
    }	
*/
	var dataFactory = {};
	
	dataFactory.initialize = function() {
		console.info('NOTIFY  initializing');
        document.addEventListener('deviceready', onDeviceReady, false);
	};
	
	dataFactory.gcmregistrate = function () {
	    console.info('GCM Registration');
	//	alert("registrateing");
		
	//	var pushNotification = window.plugins.pushNotification;
	//	pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {"senderID":"1036345686923","ecb":"onNotificationGCM"});
	//	alert("registrateing end");
		
	};

	dataFactory.lvptnregistrate = function () {	
	
		//var deviceInformation = ionic.Platform.device();

		var isWebView = ionic.Platform.isWebView();
		var isIPad = ionic.Platform.isIPad();
		var isIOS = ionic.Platform.isIOS();
		var isAndroid = ionic.Platform.isAndroid();
		//var isWindowsPhone = ionic.Platform.isWindowsPhone();

		if(isAndroid)
		{
			try{
		
				console.log("lvptnregistrate android version 2 "+registerID+" "+device.uuid);
				var data = {
					regid: registerID,
					act: "reg",
					uuid: device.uuid,
					version: 2
				};			
			
				//$http.post('http://scientest.livingpattern.co/scientest/pushnotificateupdate.php', data, postCfg);	
				$http.post(SysConfigService.Pushnotificateupdate, data, postCfg);	
			}
			catch(e)
			{
				alert(e);
			}
		}
		else if(isIOS)
		{
			try{
		
				console.log("lvptnregistrate ios version 1 "+registerID+" "+device.uuid);
				var data = {
					act: "reg",
					uuid: device.uuid
				};			
			
				//$http.post('http://scientest.livingpattern.co/scientest/pushnotificateupdate.php', data, postCfg);	
				$http.post(SysConfigService.Pushnotificateupdate, data, postCfg);	
			}
			catch(e)
			{
				alert(e);
			}			
		}
	};
	
	dataFactory.registerID=0;

	dataFactory.unregister = function () {
        console.info('unregister')

		try{
		
			var data = {
				act: "unreg",
				uuid: device.uuid
			};			
			
//			$http.post('http://scientest.livingpattern.co/scientest/pushnotificateupdate.php', data, postCfg);
			$http.post(SysConfigService.Pushnotificateupdate, data, postCfg);

			//alert(device.uuid);
		}
		catch(e)
		{
			alert(e);
		}		
		
		
        var push = window.plugins.pushNotification;
        if (push) {
            push.unregister(function () {
				console.info('unregister success')
				//alert('unregister success')
			});
		}
    };
	
    dataFactory.hasAlarm=0;
    dataFactory.gotoalarmpage = function () {
		
		$state.go('sidemenu.alarm');
    };	
	
    return dataFactory;
}])

	/*
	.factory('StatusService', ['$http','SysConfigService', function($http,SysConfigService) {
		var dataFactory = {};
		
        var transFn = function(data) {
                var str = [];
                for(var p in data)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            };
        var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transFn
            };
			
		dataFactory.querystatus = function() {
			
            var data = {
            };			
			
			return $http.post(SysConfigService.Machinestatus, data, postCfg);
			
		};	
		
		dataFactory.alarmcmd = function(mode) {
			
            var data = {
				mode: mode,
            };			
			
			return $http.post(SysConfigService.Alarmcmd, data, postCfg);

		};
		
        return dataFactory;
	}])
	*/
	
	.factory('ScrollService', ['$ionicScrollDelegate', function($ionicScrollDelegate) {
		var dataFactory = {};
		dataFactory.scrollTop = function() {
	     //  var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
		 //  delegate.forgetScrollPosition();
		//$ionicScrollDelegate.$getByHandle('contentScroll').scrollTop(false);
		  $ionicScrollDelegate.scrollTop();
		};
        return dataFactory;
	}])
	.factory('LoadingService', ['$ionicLoading', function($ionicLoading) {
		var dataFactory = {};
		dataFactory.show = function() {
			//$ionicLoading.show({ showBackdrop: false ,template: '<button class="button button-clear" style="line-height: normal; min-height: 0; min-width: 0;" ng-controller="ContentCtrl" ng-click="$root.cancelloading()"><i class="ion-close-circled"></i></button> Loading...' });
			$ionicLoading.show({
				showBackdrop: true ,
				template: 'Loading...',
				duration: 15000
			});			
		};
		dataFactory.hide = function() {
			$ionicLoading.hide();
//			$ionicLoading.show({ template: '<button class="button button-clear" style="line-height: normal; min-height: 0; min-width: 0;" ng-click="$ionicLoading.hide()"><i class="ion-close-circled"></i></button> Loading...' });
		};
		
		dataFactory.showwithcancel = function() {
			$ionicLoading.show({ template: '<button class="button button-clear" style="line-height: normal; min-height: 0; min-width: 0;" ng-click="$root.cancel()"><i class="ion-close-circled"></i></button> Loading...' });
		};
		
        return dataFactory;
	}])
	.factory('LogoutService', ['$http','SysConfigService', function($http,SysConfigService) {
		var dataFactory = {};
		dataFactory.tryLogout = function() {
				return $http.post(SysConfigService.Mobilogoutupdate, "");
		};
		
        return dataFactory;
	}])
    .factory('CookLoginService', ['$http','SysConfigService', function($http,SysConfigService) {
		var dataFactory = {};
        var transFn = function(data) {
                var str = [];
                for(var p in data)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            };
        var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transFn
            };
		
		dataFactory.tryLogin = function(user) {
			
            var data = {
            };			
			
			return $http.post(SysConfigService.Mobiloginupdate, data, postCfg);
		};
		

        return dataFactory;

    }])	
    .factory('LoginService', ['$http','SysConfigService', function($http,SysConfigService) {
	
		var dataFactory = {};
		//alert(SysConfigService.Profileurl);
        var transFn = function(data) {
                var str = [];
                for(var p in data)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            };
        var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transFn
            };
		
		dataFactory.tryLogin = function(user) {
			
            var data = {
				username: user.username,
				password: user.password
            };			
			
			//alert(SysConfigService.Mobiloginupdate());
			
			return $http.post(SysConfigService.Mobiloginupdate, data, postCfg);
			/*
            return $http({
				method: 'POST',
				url: 'http://scientest.livingpattern.co/scientest/mobiloginupdate.php',
				data: 'username='+user.username+'&password='+ user.password ,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
        */
		};
		
		/*
		$http({
			method: 'POST',
			url: 'http://beta.livingpattern.co/beta/mobiloginupdate.php',
			data: 'username='+$scope.mid+'&password='+ $scope.item ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).
		success(function(response) {
			alert(response);
			//$window.location.reload();
		}).
		error(function(response) {
			//$scope.codeStatus = response || "Request failed";
			alert("Login Failure");
		});
		
		
        var transFn = function(data) {
                var str = [];
                for(var p in data)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                return str.join("&");
            };
        var postCfg = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transFn
            };
		*/
        
		/*
        dataFactory.tryLogin = function(user) {

            var data = {
            grant_type: 'password',
            client_id: 'r62XhW1582CcCotlZ3ijRl258P7381WX',
            client_secret: '5a4Jp88tThAF4evbgcLPiumNv846F9w4',
            username: user.username,
            password: user.password
            };
            return $http.post(OAUTH_API, data, postCfg);
        }
		*/
        return dataFactory;

    }])
.factory('PushProcessingService2', ['$http', function($rootScope, $http, $state, $localStorage, $sessionStorage) {
		
		function onRegistrate(id) {

		}
        function onDeviceReady() {
            console.info('NOTIFY  Device is ready.  Registering with GCM server');
			var pushNotification = window.plugins.pushNotification;
			pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {"senderID":"1036345686923","ecb":"onNotificationGCM"});
        }
        function gcmSuccessHandler(result) {
			alert('result = ' + result);
            console.info('NOTIFY  pushNotification.register succeeded.  Result = '+result);
			//alert('NOTIFY  pushNotification.register succeeded.  Result = '+result);
        }
        function gcmErrorHandler(error) {
			alert('error = ' + error);
            console.error('NOTIFY  '+error);
        	//alert('NOTIFY  '+error);
        }
        return {
            initialize : function () {
                console.info('NOTIFY  initializing');
                document.addEventListener('deviceready', onDeviceReady, false);
            },
            registrate : function () {
				//alert("registrate");
                console.info('GCM Registration');
				onRegistrate(id);
//				var pushNotification = window.plugins.pushNotification;
//				if (pushNotification) 
//				{
//					pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {"senderID":"1036345686923","ecb":"onNotificationGCM"});
//				}
				//alert(registerID);
				
				
				
			},			
			registerID : 0,
            registerID2 : function (id) {
				
				
				/*
				var data = $.param({"regid": id});

				$http({
					url:'http://scientest.livingpattern.co/scientest/pushnotificateupdate.php'
					data : data ,
					method : 'POST',
					headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(data)
				{
					alert(data);
				})
				.error(function(data)
				{
					alert(data);				
				});
				
				*/
/*
				var param = function(obj) {
    var query = '',
        name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};

				
				var transFn = [function(data) {
					return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
				}];

				var postCfg = {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
					transformRequest: transFn
				};
				
				var data = {
					regid: id
				};	

				$http.post('http://scientest.livingpattern.co/scientest/pushnotificateupdate.php', data, postCfg)
	*/			
				
				//Insert code here to store the user's ID on your notification server. 
                //You'll probably have a web service (wrapped in an Angular service of course) set up for this.  
                //For example:
                //MyService.registerNotificationID(id).then(function(response){
                //    if (response.data.Result) {
                //        console.info('NOTIFY  Registration succeeded');
                //    } else {
                //        console.error('NOTIFY  Registration failed');
                //    }
                //});
            }, 
            //unregister can be called from a settings area.
            unregister : function () {
                console.info('unregister')
                var push = window.plugins.pushNotification;
                if (push) {
                    push.unregister(function () {
                        console.info('unregister success')
                    });
                }
            }, 
            message : function (msg) {
                //console.log('--INLINE NOTIFICATION--' + '');
                alert(msg);
            }, 
            gotoalarm : function () {
				$state.go('sidemenu.alarm');
            }
        }
    }])	
	
	;
	
	//function onNotificationGCM(e) 
	var onNotificationGCM = function(e) 
	{
			console.log('EVENT < RECEIVED:' + e.event + '');
			var elem = angular.element(document.querySelector('[ng-app]'));
			var injector = elem.injector();
			var pushService = injector.get('PushProcessingService');

			var tabscope = angular.element(document.getElementById("tabCtrl")).scope();
			
			switch( e.event )
			{
				case 'registered':
					if ( e.regid.length > 0 )
					{
						console.log('REGISTERED with GCM Server -< REGID:' + e.regid + "");
 
						//call back to web service in Angular.  
						//This works for me because in my code I have a factory called
						//      PushProcessingService with method registerID
						
						//alert(e.regid);
						pushService.registerID=e.regid;
						pushService.lvptnregistrate(e.regid);
						//alert(myService.registerID);
					}
					break;  
			
				case 'message':
					// if this flag is set, this notification happened while we were in the foreground.
					// you might want to play a sound to get the user's attention, throw up a dialog, etc.
					//alert(e.payload.message);
					
					tabscope.$apply(function(){
						tabscope.hasAlarm=1;
					});
					
					if (e.foreground)
					{
						//we're using the app when a message is received.
						
						console.log('--INLINE NOTIFICATION--' + '');
						
						window.JSInterface.startAlert(e.payload.level);
						alert(e.payload.message);
						
						//myService.message('--INLINE NOTIFICATION--'+e.payload.message);
 
						// if the notification contains a soundname, play it.
						//var soundfile = e.soundname || e.payload.sound;
						//var soundfile = "siren.mp3";
						//var my_media = new Media("/android_asset/www/sound/"+soundfile);
						//my_media.play();
					}
					else
					{   
						// otherwise we were launched because the user touched a notification in the notification tray.
						if (e.coldstart)
						{
							console.log('--COLDSTART NOTIFICATION--' + '');
						//	myService.message('--COLDSTART NOTIFICATION--');
						
						}else
						//	myService.message('--BACKGROUND NOTIFICATION--');
							console.log('--BACKGROUND NOTIFICATION--' + '');
						//alert("redirect");
						
						tabscope.$apply(function(){
							tabscope.gotoalarm();
						});
						
						// direct user here:
						//window.location = "#/status";
						//myService.gotoalarmpage();
					}
 
					console.log('MESSAGE -< MSG: ' + e.payload.message + '');
					console.log('MESSAGE: '+ JSON.stringify(e.payload));
					break;
 
				case 'error':
					console.log('ERROR -< MSG:' + e.msg + '');
					break;
 
				default:
					console.log('EVENT -< Unknown, an event was received and we do not know what it is');
					break;
			}
			
	}	
		