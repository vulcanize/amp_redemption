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

        vm.submit = function () {

            vm.response = {
                error: false,
                success: false
            };

            if (vm.form.$invalid || vm.formSubmitting) {
                return;
            }

            vm.formSubmitting = true;

            ApiService.checkEligibility()
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