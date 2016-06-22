/**
 * Created by Ryan Pelletier on 6/20/2016.
 *  hopefully a configurable service
 *
 *  Service cannot store default parameters! It is a singleton and would therefore not be safe across multiple controllers.
 */

app.service('valueListService', function($http) {
    // the base url of the API (configurable)
    var baseUrl;

    // set base url
    this.setBaseUrl = function setBaseUrl(url){
        baseUrl = url;
    };

    //I would like to get this down to one loop
    function getUrl(params){
        var paramsString = "";
        console.log(params);
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
    }
    //do I have to use $q to not have this get called automatically?

    this.getValues = function getValues(params){
        console.log("PARAMS",params);
        var url = getUrl(params);
        console.log("URL",url);
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
        },function(errorResponse){
            return errorResponse.data;
        });
    }
});
