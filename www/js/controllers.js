angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, Constants, Shared, $localStorage, $timeout) {

  // $.ajax({
  //       type: "GET",
  //       async: false,
  //       url: Constants.baseUrl + 'api/list?after=0'
  // }).success(function(response, status) {
  //       //$scope.status = status;
  //       $scope.result = response;
  //       Shared.addList(response);
  //       delete $localStorage.store;
  //       //Shared.store(response);
  //       //console.log('Success',$scope.result);
  // });
  

  data=$scope.result;
  console.log('data',data);
  $scope.$storage = $localStorage.$default({
          store: data
        });
  // console.log('local',$scope.$storage);
  // var cache = $cacheFactory('cache');

  // var data = cache.get(key);

  // if (!data) {
  //    $.ajax({
  //       type: "GET",
  //       async: false,
  //       url: Constants.baseUrl + 'api/list?after=0'
  //       }).success(function(response, status){
  //         $scope.result = response;
  //         cache.put(key, $scope.result);
  //       })
  // }

$scope.doRefresh = function() {
    console.log('refresh');
    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0'})
     .success(function(response,status) {
       res = response;
       Shared.addList(response);
       delete $localStorage.store;
       console.log('refresh');
     })
     $scope.$broadcast('scroll.refreshComplete');
       console.log('refresh');

  data=res;
  console.log('dataxz',data);
  $scope.$storage = $localStorage.$default({
          store: data
          });
  $scope.articles=$scope.$storage.store;
};

  $scope.title = 'Home';
  //console.log('Result from controller');
  //console.log($scope.result);
  $scope.articles=$scope.$storage.store;
  //console.log('Articles object',$scope.articles);
  // Side menu sub categories
   $scope.hideSidemenuBackButton = true;
    var topLevelCategories;

    topLevelCategories = $scope.categories = [
      {id: 1, title: 'Student Council', taxons: [], is_first_level: true},
      //{id: 2, title: 'Administration', taxons: [], is_first_level: true},
      {id: 3, title: 'Technical Clubs', taxons: [
        {id: 31, title: 'IEEE', taxons: [], is_first_level: false},
        {id: 32, title: 'CSI', taxons: [], is_first_level: false},
        {id: 33, title: 'IE', taxons: [], is_first_level: false},
        {id: 34, title: 'ISTE', taxons: [], is_first_level: false},
        {id: 35, title: 'IET', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 4, title: 'Cultural Clubs', taxons: [
        {id: 47, title: 'LSD', taxons: [], is_first_level: false},
        {id: 41, title: 'Music Club', taxons: [], is_first_level: false},
        {id: 42, title: 'DDFC', taxons: [], is_first_level: false},
        {id: 44, title: 'Spic Mackay', taxons: [], is_first_level: false},
        {id: 45, title: 'Art & Design', taxons: [], is_first_level: false},
        {id: 46, title: 'Kannada Vedika', taxons: [], is_first_level: false}
        ], is_first_level: true},
    {id: 5, title: 'Special Interest Clubs', taxons: [
        {id: 51, title: 'Rotaract Club', taxons: [], is_first_level: false},
        {id: 52, title: 'Hobbies Club', taxons: [], is_first_level: false},
        {id: 53, title: 'E-Cell', taxons: [], is_first_level: false},
        {id: 54, title: 'Racing Club', taxons: [], is_first_level: false}
      ], is_first_level: true},
      //{id: 6, title: 'First Year Students', taxons: [], is_first_level: true},
      {id: 7, title: 'Engineer', taxons: [], is_first_level: true},
      {id: 8, title: 'Incident', taxons: [], is_first_level: true},
      {id: 9, title: 'Talks and Seminars ', taxons: [], is_first_level: true},
      {id: 10, title: 'College Sports', taxons: [], is_first_level: true}
    ];

    var getByParentId = function(id) {
      for (var i in topLevelCategories) {
        if (topLevelCategories[i].id == id) {
          $scope.title = topLevelCategories[i].title;
          return topLevelCategories[i].taxons;
        }
      }
    }

    $scope.toggleCategories = function() {
        $scope.sideMenuController.toggleLeft();
    };

    $scope.showSubcategories = function(category) {
        $scope.categories = getByParentId(category.id);
        $scope.hideSidemenuBackButton = false;
    };

    $scope.showTopLevelCategories = function () {
        $scope.categories = topLevelCategories;
        $scope.title = 'Categories';
        $scope.hideSidemenuBackButton = true;
    };
    // End of subcategories
})

.controller('CategoryCtrl', function($scope, $stateParams, Constants, Shared, $localStorage, $timeout) {
  
  $scope.articles=[];
  //$scope.$storage=$localStorage.$default({storedog:'hi'});
  // $.ajax({
  //       type: "GET",
  //       async: false,
  //       url: Constants.baseUrl + 'api/list?after=0' + $stateParams.categoryName
  // }).success(function(response, status) {
  //       //$scope.status = status;
  //       $scope.result = response;
  //       //delete $localStorage.storedog.storecat;
  //       //Shared.store(response);
  // });

  $scope.doRefresh = function() {
    console.log('refresh');
    $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0'})
     .success(function(response,status) {
       res = response;
       Shared.addList(response);
       delete $localStorage.store;
       console.log('refresh');
     })
     $scope.$broadcast('scroll.refreshComplete');
       console.log('refresh');

  data=res;
  console.log('data',data);
  $scope.$storage = $localStorage.$default({
          store: data
          });

  var j=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
      $scope.articles[j++]=$scope.$storage.store[i];
    }
  }
};

  // data=$scope.result;
  // $scope.$storage = $localStorage.$default({storedog:{id: $stateParams.categoryName, storecat:data}});
  // $scope.articles=$scope.$storage.storedog.storecat;
  // console.log('store',$scope.$storage.storecat);

  var j=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
      $scope.articles[j++]=$scope.$storage.store[i];
    }
  }

  console.log('success',$scope.articles);
  $scope.title = $stateParams.categoryName;
  $scope.restaurant_id = 1;
  var coupon_id = 1;
  if (!(typeof $stateParams.restaurant_id === 'undefined'))
    $scope.restaurant_id = parseInt($stateParams.restaurant_id);
  if (!(typeof $stateParams.coupon_id === 'undefined'))
    coupon_id = parseInt($stateParams.coupon_id);
  // $scope.articles=$scope.result;
  
  $scope.restaurants = [
    {
      id: 1,
      name: 'Sip n Sup Cafe',
      description: "Cost for 2: ₹300 <br/> Cuisine: Cafe and sandwiches<br/>How to get there: Near Surathkal bus stand<br/>Best dish: Cheesecake and Chicken burger",
      coupons: [
        {id: 1, offer: "20% discount on Wednesdays", validity: "1st November"},
        {id: 2, offer: "15% discount for a bill over ₹1,000", validity: "1st December"},
        {id: 3, offer: "Get 2 iced teas free with orders of ₹350", validity: "1st December"}
      ]
    }
  ];
  $scope.coupon_list = $scope.restaurants[$scope.restaurant_id-1].coupons;
  $scope.description = $scope.restaurants[$scope.restaurant_id-1].description;
  $scope.coupon_details = $scope.restaurants[$scope.restaurant_id-1].coupons[coupon_id-1];
})

.controller('ArticleCtrl', function($scope, $stateParams, Constants, Shared, $timeout) {
  //$scope.backendUrl = 'http://nitk-connect.herokuapp.com/' //Change to correct link
  // $scope.result = Constants.getRequest($stateParams.articleId);
  $scope.title = $stateParams.articleId;
  $scope.articles=[];
  $scope.articles=$scope.$storage.store;
  for(var i=0; i< ($scope.articles).length;i++){
    if(!($scope.articles[i].title).localeCompare($scope.title))
    $scope.content = $scope.articles[i].content;
  }
})

.controller('FirstCtrl',function($scope, Constants, $localStorage, $timeout) {
  $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0'})
     .success(function(response,status) {
       res = response;
       Shared.addList(response);
       delete $localStorage.store;

       console.log('refresh');
     })
     console.log('refresh');

     data=res;
     console.log('data',data);
     $scope.$storage = $localStorage.$default({
          store: data
          });
})