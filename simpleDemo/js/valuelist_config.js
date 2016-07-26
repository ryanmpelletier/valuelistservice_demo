/**
 * Created by 578993 on 6/23/2016.
 */
angular.module('valueList').config(function(valueListServiceProvider){
    valueListServiceProvider.setServiceUrl("http://localhost:8080/valuelist/valuelistservice/values");
});
