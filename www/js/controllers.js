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
  

  // data=$scope.result;
  // console.log('data',data);
  $scope.$storage = $localStorage;
  //         store: data
  //       });
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
        url: Constants.baseUrl + '/api/list?after=0'})
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
  // for(var i=0;i<$scope.$storage.store.length;i++){
  // if($scope.$storage.store[i].event==true){
  //     console.log('event');
  //     str='';
  //     for(var j=0;j<19;j++){
  //       if(j==10){
  //         str+=' Time: ';
  //       }else{
  //         str+=($scope.$storage.store[i].event_start).charAt(j);
  //       }
  //     }
  //     console.log(str);
  //     $scope.$storage.store[i].event_start=str;
  //   }
  // }
};
  // delete_list=[];
  // k=0;
  $scope.articles=$scope.$storage.store;
  $scope.cut=moment().startOf('day').subtract(1,'millisecond');

  // for(var i=0;i<$scope.$storage.store.length;i++){
  // if($scope.$storage.store[i].event==true){
  //     console.log('event');
  //     if(cut.isBefore($scope.$storage.store[i].event_start)){
  //       delete_list[k++]=i;
  //       //delete $scope.$storage.store[i];
  //       console.log($scope.$storage.store[i].event_start);
  //     }
  //   }
  // }

  var toUTCDate = function(date){
    var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    return _utc;
  };
  
  var millisToUTCDate = function(millis){
    return toUTCDate(new Date(millis));
  };
  
    $scope.toUTCDate = toUTCDate;
    $scope.millisToUTCDate = millisToUTCDate;

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
        {id: 55, title: 'Robotics and Flying Club', taxons: [], is_first_level: false},
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
  console.log('param',$stateParams);
  // data=$scope.result;
  // $scope.$storage = $localStorage.$default({storedog:{id: $stateParams.categoryName, storecat:data}});
  // $scope.articles=$scope.$storage.storedog.storecat;
  // console.log('store',$scope.$storage.storecat);


   var j=0,k=0;
   for(var i=0;i<$scope.$storage.store.length;i++){
  //   if(!($scope.$storage.store[i].category).localeCompare("Coupons")){
  //     if(!($scope.$storage.store[i].author).localeCompare($stateParams.restaurant_name)){
  //       $scope.articles[j++]=$scope.$storage.store[i];
  //     }
  //   }else{
       if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
         $scope.articles[j++]=$scope.$storage.store[i];
  //       $scope.$index[k++]=$scope.articles[j-1].id;
       }
  //   }
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
  console.log('param',$stateParams);

  $scope.res=[];

  $scope.restaurants = [
    {
      id: 1,
      name: 'G6 Music Cafe',
      description1: "Cost for 2:",description2:" ₹800",
      description3:"Popular Items on Menu:",description4:" Shooters and Cocktails",
      description5:"Best for:",description6:" Karaoke nights on Friday and Live Music Nights on Saturday ",
      description7:"How to get there:",description8:" Take bus to Jyoti, take an Auto to G6 (in Kankanady)",
      coupons: $scope.res
      // coupons: [
      //   {id: 1, offer: "20% discount on Wednesdays", validity: "1st November"},
      //   {id: 2, offer: "15% discount for a bill over ₹1,000", validity: "1st December"},
      //   {id: 3, offer: "Get 2 iced teas free with orders of ₹350", validity: "1st December"}
      // ]
    },{
      id: 2,
      name: 'Mangala Restaurant',
      description1: "Cost for 2:",description2:" ₹600",
      description3:"Popular Items on Menu:",description4:" Burgers, Cocktails",
      description5:"Must try:",description6:"  Authentic Freddies Burgers",
      description7:"How to get there:",description8:" Take bus to Jyoti, take an Auto to G6 (in Kankanady)",
      coupons:$scope.res
    },{
      id: 3,
      name: 'Crave Cafe',
      description1: "Cost for 2:",description2:" ₹300",
      description3:"Cuisine:",description4:" Sandwiches, Milkshakes, Ice Cream, Cakes, and a special Live Bakery",
      description5:"Must Try:",description6:" Cheesecakes, Hazelnut Milkshakes, and Death by Chocolate",
      description7:"How to get there:",description8:" Take bus to Jyoti, next to Diesel Cafe",
      coupons:$scope.res
    },{
      id: 4,
      name: 'Kabab Studio',
      description1: "Cost (Exclusive of Tax):",description2:"Breakfast: Rs. 299 Lunch: Weekdays - Rs. 399 Weekends - Rs.499 Dinner: Weekdays- Rs. 599 Weekends - Rs 666",
      description3:"Cuisine:",description4:" Authentic Indian with Fresh Kababs",
      description5:"Must Try:",description6:" Kababs and Breakfast Buffet",
      description7:"How to get there:",description8:"Take bus to Jyoti, Go to Goldfinch Hotel",
      coupons:$scope.res
    },{
      id: 5,
      name: 'Mojo\'s',
      description1: "Cost :",description2:" Entry prices vary according to event",
      description3:"Cuisine:",description4:" ",
      description5:"Best for:",description6:" Great discotheque, Ladies Night on Wednesdays, International DJ’s",
      description7:"How to get there:",description8:" Take bus to Jyoti, Go to Goldfinch Hotel",
      coupons:$scope.res
    },{
      id: 6,
      name: 'Sandigra',
      description1: "Cost for 2:",description2:" ₹800",
      description3:"Cuisine:",description4:" Authentic Seafood",
      description5:"Must try",description6:"Budget Thaalis",
      description7:"How to get there:",description8:" Take bus to Jyoti, Go to Goldfinch Hotel",
      coupons:$scope.res
    },
    {
      id: 7,
      name: 'Sip n Sup Cafe',
      description1: "Cost for 2:",description2:" ₹300",
      description3:"Cuisine:",description4:" Cafe and sandwiches",
      description5:"Must try:",description6:" Near Surathkal bus stand",
      description7:"How to get there:",description8:" Cheesecake and Chicken burger",
      coupons:$scope.res
    },{
      id: 8,
      name: 'Trattoria',
      description1: "Cost for 2:",description2:" ₹500",
      description3:"Cuisine:",description4:" Italian",
      description5:"Must try:",description6:" Authentic Wood Oven Pizza",
      description7:"How to get there:",description8:" Take a bus to Jyoti, walk up the road next to Favourite Shop",
      coupons:$scope.res
    },{
      id: 9,
      name: 'Palkhi',
      description1: "Cost for 2:",description2:" ₹700",
      description3:"Cuisine:",description4:" Indian and Chinese",
      description5:"Must try:",description6:" Seafood, Indian dishes",
      description7:"How to get there:",description8:" Take a bus to Jyoti, next to KMC Hospital",
      coupons:$scope.res
    }
  ];

  $scope.res_title = $scope.restaurants[$scope.restaurant_id-1].name;
  j=0,k=0;
     for(var i=0;i<$scope.$storage.store.length;i++){
      if(!($scope.$storage.store[i].category).localeCompare("Coupons")){
        console.log($scope.$storage.store[i].author);
        if(!($scope.$storage.store[i].author).localeCompare($scope.res_title)){
          console.log('res',$scope.res_title);
          $scope.res[j++]=$scope.$storage.store[i];
        }
      }else{
       if(!($scope.$storage.store[i].category).localeCompare($stateParams.categoryName)){
         $scope.articles[k++]=$scope.$storage.store[i];
        } 
      }
    }

    for(i=0;i<$scope.restaurants.length;i++)
    {
      $scope.restaurants[i].coupons=$scope.res;
    }

  console.log('res',$scope.res);
  console.log('success',$scope.articles);

  $scope.coupon_list = $scope.restaurants[$scope.restaurant_id-1].coupons;

  $scope.description1 = $scope.restaurants[$scope.restaurant_id-1].description1;
  $scope.description2 = $scope.restaurants[$scope.restaurant_id-1].description2;
  $scope.description3 = $scope.restaurants[$scope.restaurant_id-1].description3;
  $scope.description4 = $scope.restaurants[$scope.restaurant_id-1].description4;
  $scope.description5 = $scope.restaurants[$scope.restaurant_id-1].description5;
  $scope.description6 = $scope.restaurants[$scope.restaurant_id-1].description6;
  $scope.description7 = $scope.restaurants[$scope.restaurant_id-1].description7;
  $scope.description8 = $scope.restaurants[$scope.restaurant_id-1].description8;
  
  for(var i=0; i< ($scope.coupon_list).length;i++){
    if(($scope.coupon_list[i].id) == ($stateParams.coupon_id))
    {
      $scope.url=$scope.coupon_list[i].image_url;
      console.log('url',$scope.url);
      $scope.coupon_title = $scope.coupon_list[i].title;
      $scope.coupon_content = $scope.coupon_list[i].content;
    }  
  }
  //$scope.coupon_title = $scope.restaurants[$scope.restaurant_id-1].coupons[coupon_id-1];
})

.controller('ArticleCtrl', function($scope, $stateParams, Constants, Shared, $timeout) {
  //$scope.backendUrl = 'http://nitk-connect.herokuapp.com/' //Change to correct link
  // $scope.result = Constants.getRequest($stateParams.articleId);
  $scope.id = $stateParams.articleId;
  $scope.articles=[];
  $scope.articles=$scope.$storage.store;
  //console.log($stateParams.articleId);
  for(var i=0; i< ($scope.articles).length;i++){
    //if(!($scope.articles[i].title).localeCompare($scope.title)){
    if($scope.articles[i].id==$stateParams.articleId){  
    $scope.title=$scope.articles[i].title;
    $scope.content = $scope.articles[i].content;
    // $scope.title = $scope.articles[i].category;
    if($scope.articles[i].image_url.localeCompare(null)){
      $scope.url=Constants.baseUrl+$scope.articles[i].image_url;
      }
    }
  }
})

.controller('LiveCtrl',function($scope, Constants, $localStorage, $timeout) {
  
  $scope.articles=[];
  $scope.doRefresh();

  $scope.doRefresh = function() {
    console.log('refresh');
    $.ajax({
        type: "GET",
        async: true,
        url: Constants.baseUrl + '/api/list?after=0'})
     .success(function(response,status) {
       res = response;
       //Shared.addList(response);
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

  var j=0,k=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare("Live News")){
        $scope.articles[j++]=$scope.$storage.store[i];
        // if($scope.articles[j-1].image_url.localeCompare(null)){
        //   $scope.url[k++]=Constants.baseUrl+$scope.articles[i].image_url;
        // }
      }
    }

    $scope.cut=moment().startOf('day').subtract(1,'millisecond');
    console.log('live',$scope.articles);
    console.log('live refresh');
    
    $timeout($scope.doRefresh,600000);
  };
  $timeout($scope.doRefresh,600000);

  var j=0;
  for(var i=0;i<$scope.$storage.store.length;i++){
    if(!($scope.$storage.store[i].category).localeCompare("Live News")){
      $scope.articles[j++]=$scope.$storage.store[i];
    }
  }
  $scope.cut=moment().startOf('day').subtract(1,'millisecond');
  console.log('live',$scope.articles);

})