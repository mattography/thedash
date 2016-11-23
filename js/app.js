var myApp = angular.module('myApp', ['firebase']);

myApp.controller('ProductsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){

  var myProducts = new Firebase('https://jobs-tracker.firebaseio.com/jobs');

  $scope.products = $firebaseArray(myProducts);

  $scope.showForm = function(){
    $scope.addFormShow = true;
    $scope.editFormShow = false;
    clearForm();
    window.scrollTo(0, 0);
  }

  $scope.hideForm = function(){
    $scope.addFormShow = false;
  }

  function clearForm(){
    $scope.company = '';
    $scope.role = '';
    $scope.notes = '';
    $scope.recruiter = '';
    $scope.History = '';
    $scope.details = '';
    $scope.stage = '';
    $scope.modify = '';
  }

  $scope.addFormSubmit = function(){
    $scope.products.$add({
      company:$scope.company,
      role:$scope.role,
      notes:$scope.notes,
      recruiter:$scope.recruiter,
      History:$scope.History,
      details:$scope.details,
      stage:$scope.stage,
      date:Date.now()
    });
    $('.messages').addClass('alert alert-success').slideDown().show().html('The task has been added').fadeOut(2000);
    clearForm();
  }

  $scope.showProduct = function(product){
    $scope.editFormShow = true;
    $scope.addFormShow = false;
    $scope.company = product.company;
    $scope.role = product.role;
    $scope.notes = product.notes;
    $scope.recruiter = product.recruiter;
    $scope.History = product.History;
    $scope.details = product.details
    $scope.stage = product.stage;
    $scope.modify = product.modify;
    $scope.id = product.$id;
  }

  $scope.editFormSubmit = function(){
    var id = $scope.id;
    var record = $scope.products.$getRecord(id);
    record.company = $scope.company;
    record.role = $scope.role;
    record.notes = $scope.notes;
    record.recruiter = $scope.recruiter;
    record.stage = $scope.stage;
    record.History = $scope.History;
    record.details = $scope.details;
    record.modify = Date.now();

    $scope.products.$save(record);
    $('.messages').addClass('alert alert-info').slideDown().show().html('The job has been edited').fadeOut(2000);
    clearForm();
    $('.edit-form').toggle();
  }

  $scope.deleteProduct = function(product){
    if(confirm('Are you sure you want to delete this entry??')) {
      $scope.products.$remove(product);
      if(confirm){
        $('.messages').addClass('alert alert-warning').slideDown().show().html('The job has been deleted').fadeOut(2000);
      }
      else{}
    }
  }
}]);
