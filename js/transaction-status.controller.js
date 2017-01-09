(function () {
    'use strict';

    var TransactionStatusController = function (ReceiptService, ApiService) {

        var vm = this;

        vm.reset = function (keepCurrentReceipt) {

            vm.Receipt = '';
            vm.formSubmitting = false;
            vm.response = {
                error: false,
                success: false
            };

            if (!keepCurrentReceipt) {
                ReceiptService.remove();
            }
        };

        vm.reset(true);


        ReceiptService.get()
            .then(function (receipt) {
                vm.Receipt = receipt;
            })
            .catch(function () {
                vm.Receipt = '';
            });

        vm.submit = function () {

            vm.response = {
                error: false,
                success: false
            };

            if (vm.form.$invalid || vm.formSubmitting) {
                return;
            }

            vm.formSubmitting = true;

            ApiService.checkTransactionStatus()
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

    TransactionStatusController.$inject = ['ReceiptService', 'ApiService'];

    app.controller('TransactionStatusController', TransactionStatusController);

})();