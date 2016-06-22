/**
 * Created by 578993 on 6/20/2016.
 */
var app = angular.module('ValueListServiceDemo', ['ui.grid','ui.grid.pagination']);



app.directive('queryForm',function(){
    return{
        templateUrl: 'template/query_form_template.html'
    }
});

app.directive('tablePaging',function(){
    return {
        templateUrl: 'template/paging_template.html'
    }
});

app.directive('employeeTable',function(){
    return {
        templateUrl: 'template/employee_table.html'
    }
});


app.filter('roundup', function() {
    return function(input) {
        return Math.ceil(input);
    };
});