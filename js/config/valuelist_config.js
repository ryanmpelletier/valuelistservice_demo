/**
 * Created by 578993 on 6/23/2016.
 */
angular.module('valueList').config(function(valueListServiceProvider){
    valueListServiceProvider.setBaseUrl("http://localhost:8080/valueslistservice/values?");
});