(function () {
    'use strict';

    var EligibilityCheckController = function (ApiService, $scope) {

        var vm = this;

        vm.reset = function () {

            vm.AMPAddress = '';
            vm.EthereumAddress = '';
            vm.ToS = false;
            vm.formSubmitting = false;
            vm.response = {
                error: false,
                success: false
            };
        };

        vm.reset();

        vm.demo = {
            returnError: false,
            setData: function () {
                vm.AMPAddress = '897fn8d3ng89b2mf050nfi';
                vm.EthereumAddress = 'yc786enkj029unkgopwj';
                vm.ToS = true;
            }
        };

        vm.submit = function () {

            vm.response = {
                error: false,
                success: false
            };

            if (vm.form.$invalid || vm.formSubmitting) {
                return;
            }

            vm.formSubmitting = true;

            ApiService.checkEligibility(vm.demo.returnError)
                .then(function (response) {
                    vm.response.success = response;
                })
                .catch(function (response) {
                    vm.response.error = response;
                })
                .finally(function () {
                    vm.formSubmitting = false;
                });

        };

    };

    EligibilityCheckController.$inject = ['ApiService', '$scope'];

    app.controller('EligibilityCheckController', EligibilityCheckController);

})();