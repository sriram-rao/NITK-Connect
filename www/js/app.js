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

  // var store = lawnchair(function(store){
  //   var str={key: articleList};

  //   store.save(str);
  
  //   this.get(articleList,function(str){
  //     console.log(str);
  //   })
  // })

  var getList = function(){
    return articleList;
  }

  return{
    addList: addList,
    getList: getList,
   // store: store
  };
})

// .factory('cache', ['$cacheFactory', function($cacheFactory) {
//     return $cacheFactory('cache');
// }])

// postRequest =  function(url) {
//   $http.post(baseUrl + 'url').then(function(resp) {
//     console.log('Success', resp);
//     // For JSON responses, resp.data contains the result
//     result = resp.data
//   }, function(err) {
//     console.error('ERR', err);
//     // err.status will contain the status code
//   })
//   return result;
// }

.run(function($ionicPlatform, Constants, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //navigator.splashscreen.show();
    console.log("Cordova is ready, let's do this!");
    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0'})
     .success(function(response,status) {
       res = response;
       delete $localStorage.store;
       //navigator.splashscreen.hide();

       console.log('refresh');
     })
     console.log('refresh');

     data=res;
     console.log('data',data);
     $localStorage.$default({
          store: data
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

    .state('initial', {
      url: "/#",
      abstract: true,
      controller: 'FirstCtrl'
    })

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

    .state('app.article', {
      url: "/article/:articleId",
      views: {
        'menuContent' :{
          templateUrl: "templates/article.html",
          controller: 'ArticleCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/articles');
});
