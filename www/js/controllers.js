angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http, Constants, $timeout) {

  $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0'
  }).success(function(response, status) {
        //$scope.status = status;
        $scope.result = response;
        console.log('Success',$scope.result);
  });


  $scope.title = 'Home';
  console.log('Result from controller');
  console.log($scope.result);
  $scope.articles=$scope.result;
  console.log('Articles object',$scope.articles);
  // Side menu sub categories
   $scope.hideSidemenuBackButton = true;
    var topLevelCategories;

    topLevelCategories = $scope.categories = [
      {id: 1, title: 'Student Council', taxons: [], is_first_level: true},
      {id: 2, title: 'Administration', taxons: [], is_first_level: true},
      {id: 3, title: 'Technical Clubs', taxons: [
        {id: 31, title: 'IEEE', taxons: [], is_first_level: false},
        {id: 32, title: 'CSI', taxons: [], is_first_level: false},
        {id: 33, title: 'IE', taxons: [], is_first_level: false},
        {id: 34, title: 'ISTE', taxons: [], is_first_level: false},
        {id: 35, title: 'IET', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 4, title: 'Cultural Clubs', taxons: [
        {id: 41, title: 'Music Club', taxons: [], is_first_level: false},
        {id: 42, title: 'DDFC', taxons: [], is_first_level: false},
        {id: 43, title: 'Films Club', taxons: [], is_first_level: false},
        {id: 44, title: 'Spic Mackay', taxons: [], is_first_level: false},
        {id: 45, title: 'Artist Forum & MACD', taxons: [], is_first_level: false},
        {id: 46, title: 'Others', taxons: [], is_first_level: false}
      ], is_first_level: true},
    {id: 5, title: 'Non-Technical Clubs', taxons: [
        {id: 51, title: 'Rotaract Club', taxons: [], is_first_level: false},
        {id: 52, title: 'Hobbies Club', taxons: [], is_first_level: false},
        {id: 53, title: 'E-Cell', taxons: [], is_first_level: false},
        {id: 54, title: 'LSD', taxons: [], is_first_level: false},
        {id: 55, title: 'Racing Club', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 6, title: 'First Year Students', taxons: [], is_first_level: true},
      {id: 7, title: 'Engineer', taxons: [], is_first_level: true},
      {id: 8, title: 'Incident', taxons: [], is_first_level: true},
      {id: 9, title: 'Talks and Seminars', taxons: [], is_first_level: true},
      {id: 10, title: 'College Sports News', taxons: [], is_first_level: true}
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
  $scope.article = [
  {heading: 'News 4', postedBy: 'Club 1'},
  {heading: 'News 3', postedBy: 'Club 2'},
  {heading: 'News 2', postedBy: 'Club 3'},
  {heading: 'News 1', postedBy: 'Club 4'}
   ];

   $scope.events = [
  {heading: 'Title 1', location: 'NITK', dateTime: '30-September-2014'},
  {heading: 'Title 2', location: 'NITK', dateTime: '30-September-2014'},
  {heading: 'Title 3', location: 'NITK', dateTime: '30-September-2014'},
  {heading: 'Title 4', location: 'NITK', dateTime: '30-September-2014'}
   ];

})

.controller('CategoryCtrl', function($scope, $stateParams, Constants, $timeout) {

  $.ajax({
        type: "GET",
        async: false,
        url: Constants.baseUrl + 'api/list?after=0&category=' + $stateParams.categoryName
  }).success(function(response, status) {
        //$scope.status = status;
        $scope.result = response;
        console.log('Success',$scope.result);
  });

  $scope.articles=$scope.result;
  console.log($scope.articles);
  $scope.title = $stateParams.categoryName;
  $scope.restaurant_id = 1;
  var coupon_id = 1;
  if (!(typeof $stateParams.restaurant_id === 'undefined'))
    $scope.restaurant_id = parseInt($stateParams.restaurant_id);
  if (!(typeof $stateParams.coupon_id === 'undefined'))
    coupon_id = parseInt($stateParams.coupon_id);
  $scope.articles=$scope.result;
  $scope.article = [
  {heading: 'News 1', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'},
  {heading: 'News 2', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'}
  ];
  $scope.events = [
  {heading: 'Title 1', location: 'NITK', dateTime: '30-September-2014'},
  {heading: 'Title 2', location: 'NITK', dateTime: '30-September-2014'},
  ];
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

.controller('ArticleCtrl', function($scope, $stateParams, Constants, $timeout) {
  //$scope.backendUrl = 'http://nitk-connect.herokuapp.com/' //Change to correct link
  // $scope.result = Constants.getRequest($stateParams.articleId);
  $scope.title = $stateParams.articleId;
  // console.log($scope.title);
  $scope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
})
