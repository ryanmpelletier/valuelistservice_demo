/**
 * Created by 578993 on 6/23/2016.
 */
angular.module('ValueListServiceDemo').config(function(valueListServiceProvider){
    valueListServiceProvider.setBaseUrl("http://localhost:8080/valueslistservice/values?");
});