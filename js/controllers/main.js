'use strict';

var mainCtrl = angular.module('mainCtrl', []);

  mainCtrl.controller('mainCtrl', [MainCtrl]);

function MainCtrl () {

  var vm = this;
  vm.test = "testing blah";
  
}
