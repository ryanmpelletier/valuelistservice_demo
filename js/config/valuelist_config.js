/**
 * Created by Ryan Pelletier on 6/23/2016.
 */
angular.module('valueList').config(function(valueListServiceProvider){
    //get location of where service is running in tomcat
    valueListServiceProvider.setServiceUrl("http://localhost:8080/valuelist/valuelistservice/values");
}).value("defaultParams",{page:1, numberPerPage:15, valueListQuery: 'query'});
