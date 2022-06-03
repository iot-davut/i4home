// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
angular.module('starter', ['ionic', 'starter.control', 'starter.service', 'ngStorage'])

.run(function($rootScope, $ionicPlatform, PushProcessingService, SysConfigService) 
{

	$rootScope.counterValue = SysConfigService.AppName;
	$rootScope.showregfgpwd = SysConfigService.ShowRegFgpwd;
  //$rootScope.username = "";
//  $rootScope.BranchInfo="beta";
  
 // $rootScope.Machinestatus="http://"+$rootScope.BranchInfo+".livingpattern.co/"+$rootScope.BranchInfo+"/machinestatus.php";
 // $rootScope.Alarmcmd="http://"+$rootScope.BranchInfo+".livingpattern.co/"+$rootScope.BranchInfo+"/alarmcmd.php";
  
  /*
  $ionicPlatform.registerBackButtonAction(function (event) {
    //if($state.current.name=="app.home"){
    //  navigator.app.exitApp();
    //}
    //else {
    //  navigator.app.backHistory();
    //}
  }, 100);  
  */
						
  PushProcessingService.initialize();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.defaults.withCredentials = true;
	  //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
	  //$httpProvider.defaults.withCredentials = true;	
	
      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'page/login.html',
			controller: 'LoginCtrl'
		})
		.state('forgetpwd', {
			url: '/forgetpwd',
			templateUrl: 'page/forgetpwd.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'page/register.html'
		})
		.state('sidemenu', {
			url: "/sidemenu",
			abstract: true,
			templateUrl: "page/sidemenu.html"
		})
		.state('sidemenu.profile', {
			url: '/profile',
			views: {
				'menuContent' :{
					templateUrl: "page/profile.html"
				}
			}
		})
		.state('sidemenu.status', {
			url: '/status',
			views: {
				'menuContent' :{
					templateUrl: "page/status.html"
				}
			}
		})
		.state('sidemenu.control', {
			url: '/control',
			views: {
				'menuContent' :{
					templateUrl: "page/control.html"
				}
			}
		})
		.state('sidemenu.alarm', {
			url: '/alarm',
			views: {
				'menuContent' :{
					templateUrl: "page/alarm.html"
				}
			}
		})
		.state('sidemenu.device', {
			url: '/device',
			views: {
				'menuContent' :{
					templateUrl: "page/device.html"
				}
			}
		})
		;

   $urlRouterProvider.otherwise("/login");
})
