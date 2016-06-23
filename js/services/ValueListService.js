/**
 * Created by 578993 on 6/23/2016.
 */
angular.module('ValueListServiceDemo').provider("valueListService",function(){
    var baseUrl = null;
    this.setBaseUrl = function(url){
        baseUrl = url;
    };

    this.$get = function($http) {
        var getUrl = function(params){
            var paramsString = "";
            // console.log(params);
            if(Object.keys(params).length !== 0){
                paramsString += "&";
                //put passed params on url (how to do error handling, what if they pass in like a string or something?)
                Object.keys(params).forEach(function(key){
                    if(params[key] != ""){
                        paramsString = paramsString + key + "=" + params[key] + "&";
                    }
                });
                paramsString = paramsString.slice(0,-1);
            }
            return baseUrl + paramsString;
        };

        function getMyValues(params){
            var url = getUrl(params);
            return $http.get(getUrl(params)).then(function(okResponse){
                return {
                    values: okResponse.data.values,
                    valuesInfo: {
                        page: okResponse.data.valuesInfo.page,
                        numberPerPage: okResponse.data.valuesInfo.numberPerPage,
                        totalCount: okResponse.data.valuesInfo.totalCount,
                        totalPages: Math.ceil(okResponse.data.valuesInfo.totalCount/okResponse.data.valuesInfo.numberPerPage)
                    }
                };
            }).catch(function(errorResponse){//might want to consider adding more stuff here
                return {errorData : errorResponse.data};
            })
        }
        return {
            getValues: getMyValues
        };
    }
});