/**
 * Created by 578993 on 6/21/2016.
 */
app.controller('ValueListServiceController2',function($scope,$http,valueListService) {

    /** CONFIG - I would like to move this to some sort of configuration file**/
    var baseUrl = "http://localhost:8080/valueslistservice/values?";
    var defaultParams = {
        "valueListQuery": "query",
        "page": 1,
        "numberPerPage": 800
    };

    valueListService.setBaseUrl("http://localhost:8080/valueslistservice/values?");
    valueListService.setDefaultParams(defaultParams);
    /** END CONFIG**/

    //could this sort be on the service? Probably not because we would need to keep the state somewhere, idk
    $scope.sort = function(columnName,sortingOrder){
        var sortingParams = {
            sortByColumn : columnName,
            sortByOrder : sortingOrder
        };

        for (var attrname in sortingParams) {
            $scope.formData[attrname] = sortingParams[attrname];
        }

        $scope.getValues($scope.formData);
    };

    //lets test out just using a form, ideally I would like a submit button to pass in the form
    //this object will hold my form data
    $scope.formData = {};
    //you have to add context:$scope in order for this to be able to work.
    //it really pisses me off how I can't stick this in a JSON file
    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        data: "results.values",
        columnDefs: [
        { name: "Employee Number",
          field: "emp_no",
          menuItems:[
              {
                  title:"Sort All Asc",
                  context:$scope,
                  action: function(){$scope.sort("emp_no","ASC")}
              },
              {
                  title:"Sort All Desc",
                  context:$scope,
                  action: function(){$scope.sort("emp_no","DESC")}
              }
          ]
        },
        { name: "First Name",
            field: "first_name",
            menuItems:[
                {
                    title:"Sort All Asc",
                    context:$scope,
                    action: function(){$scope.sort("first_name","ASC")}
                },
                {
                    title:"Sort All Desc",
                    context:$scope,
                    action: function(){$scope.sort("first_name","DESC")}
                }
            ]
        },
        { name: "Last Name",
            field: "last_name",
            menuItems:[
                {
                    title:"Sort All Asc",
                    context:$scope,
                    action: function(){$scope.sort("last_name","ASC")}
                },
                {
                    title:"Sort All Desc",
                    context:$scope,
                    action: function(){$scope.sort("last_name","DESC")}
                }
            ]
        },
        { name: "Birth Date",
            field: "birth_date",
            menuItems:[
                {
                    title:"Sort All Asc",
                    context:$scope,
                    action: function(){$scope.sort("birth_date","ASC")}
                },
                {
                    title:"Sort All Desc",
                    context:$scope,
                    action: function(){$scope.sort("birth_date","DESC")}
                }
            ]
        },
        { name: "Gender",
            field: "gender",
            menuItems:[
                {
                    title:"Sort All Asc",
                    context:$scope,
                    action: function(){$scope.sort("gender","ASC")}
                },
                {
                    title:"Sort All Desc",
                    context:$scope,
                    action: function(){$scope.sort("gender","DESC")}
                }
            ]
        },
        { name: "Gender",
            field: "gender",
            menuItems:[
                {
                    title:"Sort All Asc",
                    context:$scope,
                    action: function(){$scope.sort("gender","ASC")}
                },
                {
                    title:"Sort All Desc",
                    context:$scope,
                    action: function(){$scope.sort("gender","DESC")}
                }
            ]
        }
        ]
    };


    $scope.getValues = function() {
        $scope.results = undefined;
        valueListService.getValues($scope.formData).then(function (data) {
            $scope.results = data;
        }, function (errorData) {
            $scope.errorData = errorData;
        });
    };
});
