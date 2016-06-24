/**
 * Created by 578993 on 6/23/2016.
 */
angular.module('ValueListDemo').controller('MainController',function($scope,valueListService){

    var params = {
        valueListQuery: "query",
        page: 1,
        numberPerPage: 15
    };

    valueListService.getValues(params).then(function(data){
        $scope.results = JSON.stringify(data);
    })
});