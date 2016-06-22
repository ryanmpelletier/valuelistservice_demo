/**
 * Created by 578993 on 6/9/2016.
 */

app.controller('ValueListServiceController',function($scope, $http) {
    $scope.valuesInfo = {};
    $scope.waiting = false;
    $scope.params = {};
    // default parameters for the baseUrl, these parameters will ALWAYS sent with the request (configurable)
    var defaultParams = {
        "valueListQuery" : "query",
        "page" : 1,
        "numberPerPage" : 10
    };
    $scope.params = defaultParams;

    $scope.conversionErrors = {};


    var baseUrl = "http://localhost:8080/valueslistservice/values?";

    function getUrl(params){
        var paramsString = "";
        Object.keys(params).forEach(function(key){
            paramsString = paramsString + key + "=" + params[key] + "&";
        });
        //trims off last &
        return (baseUrl + paramsString).slice(0, (baseUrl + paramsString).length - 1);
    }

    function setScopeParams(){
        $scope.params = {};
        var paramsPart = $scope.url.split('?')[1];
        var kvPairArray = paramsPart.split('&');
        for(var i = 0; i < kvPairArray.length; i++){
            $scope.params[kvPairArray[i].split("=")[0]] = kvPairArray[i].split("=")[1];
        }
    }

    if($scope.url === null || $scope.url == undefined || $scope.url == ""){
        $scope.url = getUrl($scope.params);
    }


    $scope.refreshValues = function(){
        setScopeParams();
        refresh();
    };

    function refresh(){
        $scope.waiting = true;
        $scope.hasValuesInfo = false;
        $http.get(getUrl($scope.params))
            .then(function(response) {
                $scope.values = response.data.values;
                $scope.valuesInfo.totalCount = response.data.valuesInfo.totalCount;
                $scope.valuesInfo.page = response.data.valuesInfo.page;
                $scope.valuesInfo.numberPerPage = response.data.valuesInfo.numberPerPage;
                $scope.valuesInfo.totalPages = Math.ceil(($scope.valuesInfo.totalCount/$scope.valuesInfo.numberPerPage));
                $scope.hasValuesInfo = true;
                $scope.waiting = false;
                $scope.conversionErrors = {};
            },function(errorResponse){
                if(errorResponse.status == 400){
                    $scope.conversionErrors = errorResponse.data;
                }
                $scope.waiting = false;
            });

    }

    $scope.nextPage = function(){
        setScopeParams();
        $scope.params['page'] = parseInt($scope.params['page']) + 1;
        $scope.url = getUrl($scope.params);
        refresh();
    };

    $scope.backPage = function(){
        setScopeParams();
        $scope.params['page'] = parseInt(Math.max(1, ($scope.params['page'] - 1)));
        $scope.url = getUrl($scope.params);
        refresh();
    };

    //this can be moved to the service
    function sort(columnName, order){
        setScopeParams();
        $scope.params['sortByColumn'] = columnName;
        $scope.params['sortByOrder'] = order;
        $scope.url = getUrl($scope.params);
        refresh();
    }

    $scope.sortAsc = function(columnName){
        sort(columnName, "asc");
    };

    $scope.sortDesc = function(columnName){
        sort(columnName, "desc");
    };

});
