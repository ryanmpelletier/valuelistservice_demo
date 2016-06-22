/**
 * Created by Ryan Pelletier on 6/9/2016.
 *
 * I think this is good, and more what a controller is supposed to look like
 * notice how everything is basically just a scope funciton, or a scope object.
 * There aren't other little objects floating around that we don't care about.
 */

app.controller('ValueListServiceController',function($scope, $http, valueListService) {

    var baseUrl = "http://localhost:8080/valueslistservice/values?valueListQuery=query";
    valueListService.setBaseUrl(baseUrl);

    //anything you want to be default can be in here
    $scope.formData = {
        page:1,
        numberPerPage:10
    };

    $scope.getValues = function(){
        $scope.results = undefined;
        $scope.errorData = undefined;
        valueListService.getValues($scope.formData).then(function(responseData){
            $scope.results = responseData;
        }, function(errorData){
            $scope.errorData = errorData;
        })
    };

    $scope.nextPage = function(){
        console.log("PAGE",$scope.formData.page);
        $scope.formData.page = parseInt($scope.formData.page) + 1;
        $scope.getValues(angular.merge($scope.formData,$scope.sortingParams));
    };

    $scope.backPage = function(){
        $scope.formData.page = parseInt($scope.formData.page) - 1;
        $scope.getValues(angular.merge($scope.formData,$scope.sortingParams));
    };

    $scope.sort = function sort(columnName, sortingOrder){
        $scope.sortingParams = {
            sortByColumn : columnName,
            sortByOrder : sortingOrder
        };
        $scope.getValues(angular.merge($scope.formData,$scope.sortingParams));
    };
});
