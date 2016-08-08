/**
 * Created by Ryan Pelletier on 6/23/2016.
 */
angular.module('valueList',[]).provider("valueListService",function(){

    var serviceUrl = null;
    this.setServiceUrl = function(url){
        serviceUrl = url;
    };

    this.$get = function($http,$q,$location) {
        if(serviceUrl === null){
            serviceUrl = ($location.protocol() + "://" + $location.host() + ":" + $location.port() + "/" + $location.absUrl().split("/")[3] + "/valuelist/valuelistservice/values");
        }
        var getUrl = function(params) {
            var str = [];
            str.push("?");
            for(var property in params)
                if (params.hasOwnProperty(property) && params[property] !== "") {
                    str.push(encodeURIComponent(property) + "=" + encodeURIComponent(params[property]));
                }
            return serviceUrl + str.join("&");
        };

        function getMyValues(params){
            var deferred = $q.defer();
            console.log(getUrl(params));
            $http.get(getUrl(params)).then(function(okResponse){
                deferred.resolve({
                    values: okResponse.data.values,
                    valuesInfo: okResponse.data.valuesInfo ? {
                        page: okResponse.data.valuesInfo.page,
                        numberPerPage: okResponse.data.valuesInfo.numberPerPage,
                        totalCount: okResponse.data.valuesInfo.totalCount,
                        totalPages: Math.ceil(okResponse.data.valuesInfo.totalCount/okResponse.data.valuesInfo.numberPerPage)
                    }:null,
                    response: {
                        status: okResponse.status,
                        statusText: okResponse.statusText,
                        config: okResponse.config
                    }
                });
            }).catch(function(errorResponse){//might want to consider adding more stuff here
                deferred.reject({
                    errorData : errorResponse.data,
                    response: {
                        status: errorResponse.status,
                        statusText: errorResponse.statusText,
                        config: errorResponse.config
                    }
                });
            });
            return deferred.promise;
        }
        return {
            getValues: getMyValues
        };
    }
}).controller('ValueListServiceController',function($scope, $http, valueListService, startingQueryParams) {

    $scope.queryParams = startingQueryParams;
    $scope.results = {};

    $scope.getValues = function(queryName){
        valueListService.getValues($scope.queryParams[queryName]).then(function(responseData){
            $scope.results[queryName] = responseData;
        },function(errorResponseData){
            $scope.results[queryName] = errorResponseData;
        });
    };

    $scope.nextPage = function(queryName){
        $scope.queryParams[queryName].page = parseInt($scope.queryParams[queryName].page) + 1;
        $scope.getValues(queryName);
    };

    $scope.backPage = function(queryName){
        $scope.queryParams[queryName].page = parseInt($scope.queryParams[queryName].page) - 1;
        $scope.getValues(queryName);
    };

    $scope.sort = function sort(sortByColumn, sortByOrder,queryName){
        $scope.queryParams[queryName].sortByColumn = sortByColumn;
        $scope.queryParams[queryName].sortByOrder = sortByOrder;
        $scope.getValues(queryName);
    };
    
});
