/**
 * Created by Ryan Pelletier on 6/23/2016.
 */
angular.module('valueList').config(function(valueListServiceProvider){
    valueListServiceProvider.setBaseUrl("http://localhost:8080/valueslistservice/values");
})
    .constant('page_const',1)
    .constant('numberPerPage_const',15)
    .constant('valueListQuery_const','query');