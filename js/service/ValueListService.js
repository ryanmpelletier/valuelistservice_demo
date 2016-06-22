/**
 * Created by Ryan Pelletier on 6/20/2016.
 *  hopefully a configurable service
 *
 *  It would be nice if this could have a next() and back()
 */

app.service('valueListService', function($http) {
    // the base url of the API (configurable)
    var baseUrl;

    var defaultParams = {};

    // set base url
    this.setBaseUrl = function setBaseUrl(url){
        baseUrl = url;
    };

    //set default params
    this.setDefaultParams = function setDefaultParams(params){
        defaultParams = params;
    };

    function getUrl(params){
        var paramsString = "";

        //put default params on URL
        if(Object.keys(defaultParams).length !== 0){
            paramsString += "&";
            Object.keys(defaultParams).forEach(function(key){
                paramsString = paramsString + key + "=" + defaultParams[key] + "&";
            });
            paramsString = paramsString.slice(0,-1);
        }

        if(Object.keys(params).length !== 0){
            paramsString += "&";
            //put passed params on url (how to do error handling, what if they pass in like a string or something?)
            Object.keys(params).forEach(function(key){
                paramsString = paramsString + key + "=" + params[key] + "&";
            });
            paramsString = paramsString.slice(0,-1);
        }
        return baseUrl + paramsString;
    }
    //do I have to use $q to not have this get called automatically?

    this.getValues = function getValues(params){
        var url = getUrl(params);
        return $http.get(getUrl(params)).then(function(okResponse) {
            return {
                values: okResponse.data.values,
                valuesInfo: {
                    page: okResponse.data.valuesInfo.page,
                    numberPerPage: okResponse.data.valuesInfo.numberPerPage,
                    totalPages: Math.ceil((okResponse.data.valuesInfo.totalCount/okResponse.data.valuesInfo.numberPerPage))
                }
            };
        },function(errorResponse){
            return errorResponse.data;
        });
    }
});
