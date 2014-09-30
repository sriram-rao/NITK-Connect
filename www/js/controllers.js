angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Constants, $ionicModal, $timeout) {
  // $scope.result = Constants.getRequest('/');
  $scope.title = 'Home'
  $scope.categories = ['A','B','C','D'];
  $scope.articles = [
  {heading: 'News 1', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'},
  {heading: 'News 2', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'},
  {heading: 'News 3', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'},
  {heading: 'News 4', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'}
   ];
})

.controller('CategoryCtrl', function($scope, $stateParams, Constants, $ionicModal, $timeout) {
  // $scope.result = Constants.getRequest('category/' + $stateParams.categoryName);
  $scope.title = $stateParams.categoryName;
  // console.log($scope.title);
  $scope.articles = [
  {heading: 'News 1', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'},
  {heading: 'News 2', descr: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt'}
  ];
})

.controller('ArticleCtrl', function($scope, $stateParams, Constants, $ionicModal, $timeout) {
  //$scope.backendUrl = 'http://nitk-connect.herokuapp.com/' //Change to correct link
  // $scope.result = Constants.getRequest($stateParams.articleId);
  $scope.title = $stateParams.articleId;
  // console.log($scope.title);
  $scope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
})
