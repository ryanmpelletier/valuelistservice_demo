/**
 * Created by Ryan Pelletier on 6/23/2016.
 */
angular.module('valueList').config(function(valueListServiceProvider){
    valueListServiceProvider.setBaseUrl("http://localhost:8080/valueslistservice/values");
}).value("defaultParams",{page:1, numberPerPage:15, valueListQuery: 'query'});