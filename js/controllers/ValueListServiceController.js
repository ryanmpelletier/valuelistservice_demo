/**
 * Created by Ryan Pelletier on 6/9/2016.
 */

angular.module('ValueListServiceDemo').controller('ValueListServiceController',function($scope, $http, valueListService) {

    //should not be configurable at a service level, at controller
    $scope.formData = {
        page:1,
        numberPerPage:10,
        valueListQuery: 'query'
    };

    $scope.getValues = function(){
        $scope.results = undefined;//if I left this would my table not have to refresh?
        valueListService.getValues($scope.formData).then(function(responseData){
            $scope.results = responseData;
        });
    };

    $scope.nextPage = function(){
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
