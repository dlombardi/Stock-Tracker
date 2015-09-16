'use strict';

let stockApp = angular.module('stockApp', ['ngRoute']);

stockApp.config(function($routeProvider) {
  $routeProvider

    .when("/", {
      templateUrl : "views/pages/home.html",
      controller  : "mainController"
    })

    .when('/addStock', {
      templateUrl : 'views/pages/addStock.html',
      controller  : 'addStockController'
    })

    .when('/listQuotes', {
      templateUrl : 'views/pages/listQuotes.html',
      controller  : 'listQuotesController'
    });
});

stockApp.controller('mainController', function($scope){
  // $scope.message = "Everyone come and see how good I look";
});

stockApp.controller('addStockController', function($scope, stockService, trackService){

  $scope.trackStock = function(stockItem) {
    trackService.trackStock(stockItem);
  };

  $scope.trackInput = function(){
    stockService.getStocks($scope.company)
    .success(function(data){
      $scope.stockList = data;
      console.log($scope.stockList);
    });
  }


});

stockApp.controller('listQuotesController', function($scope){
  // $scope.message = "Contact us! JK. This is just a demo";
});

//
stockApp.service("stockService", function($http){
  this.getStocks = function(company){
    console.log("ok");
    return $http.jsonp(`http://dev.markitondemand.com/Api/v2/Lookup/jsonp?input=${company}&callback=JSON_CALLBACK`)
  }
});
//
stockApp.service("trackService", function($http){
  this.trackStock = function(stockItem){
    console.log(stockItem);
    $http.post('/tracked', stockItem)
    .success(function(data){
      console.log(data);
    });
  }
});
