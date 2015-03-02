// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngStorage'])

.service('Constants', function($http) {
  this.baseUrl = 'http://106.186.23.15/'; //Change for correct URL
})

.service('Shared', function() {
  var articleList=[];

  var addList = function(artList){
    articleList = artList;
  }

  var getList = function(){
    return articleList;
  }

  return{
    addList: addList,
    getList: getList,
  };
})

.run(function($ionicPlatform, Constants, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //$cordovaSplashScreen.show();
    //navigator.splashscreen.show();
    res=[];

    console.log($localStorage.store);

    if (typeof $localStorage.store[0] != "undefined") {
      $scope.favourite=$scope.$storage.favourite;
      last_date = new Date($localStorage.store[0].created_at).getTime()/1000.0;
    } else { 
      last_date = 0;
    $scope.$storage.favourite=[1,2,3,4,5,6,7,8,9,10];
      $scope.favourite=$scope.$storage.favourite;
    }
    console.log("app.js");
    console.log(Constants.baseUrl + '/api/list?after=' + Math.round(new Date(last_date)));
    // console.log(Constants.baseUrl + "/api/list?after=\"" + last_date + "\"");
    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + '/api/list?after=' + String(last_date)
      })
     .success(function(response,status) {
       res=response;
     
         // Store newer articles at the start of the array
       $.each(res, function( i, n ){
          $localStorage.store.unshift(n);
       });
     })
     console.log('data',res);
     $localStorage.$default({
          store: res
      });

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.articles', {
      url: "/articles",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'AppCtrl'
        }
      }
    })

    .state('app.list', {
      url: "/category/:categoryName",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'CategoryCtrl'
        }
      }
    })

      .state('app.liveNews', {
      url: "/live",
      views: {
        'menuContent' :{
          templateUrl: "templates/live.html",
          controller: 'LiveCtrl'
        }
      }
    })

    .state('app.coupons', {
      url: "/coupons",
      views: {
        'menuContent' :{
          templateUrl: "templates/coupons.html",
          controller: 'CategoryCtrl'
        }
      }
    })

    .state('app.coupon_list', {
      url: "/coupons/:restaurant_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/coupon_list.html",
          controller: 'CategoryCtrl'
        }
      }
    })

    .state('app.coupon_details', {
      url: "/coupons/:restaurant_id/:coupon_id",
      views: {
        'menuContent' :{
          templateUrl: "templates/coupon_details.html",
          controller: 'CategoryCtrl'
        }
      }
    })

    .state('app.comments', {
      url: "/article/:articleId/comments",
      views: {
        'menuContent' :{
          templateUrl: "templates/comments.html",
          controller: 'ArticleCtrl'
        }
      }
    })

    .state('app.aboutUs', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html",
          controller: 'AppCtrl'
        }
      }
    })

    .state('app.article', {
      url: "/article/:articleId",
      views: {
        'menuContent' :{
          templateUrl: "templates/test_article.html",
          controller: 'ArticleCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/articles');
});

