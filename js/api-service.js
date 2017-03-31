(function () {
    'use strict';

    var ApiService = function (ReceiptService, $timeout, $q) {


        return {

            checkEligibility: function (returnError) {

                ReceiptService.remove();

                return $timeout(function () {

                    if (returnError) {

                        return $q.reject(
                            {
                                message: 'This is the actual error message returned from the check eligibility status API response.'
                            });
                    }

                    return $q.resolve(
                        {
                            receipt: '8c002ae298835501d80200f05753de0edf0',
                            transaction: '263c018582731ff54dc72c7d67e858c002ae298835501d80200f05753de0edf0'
                        });

                }, 1750)
                    .then(function (response) {
                        ReceiptService.set(response.receipt);
                        return response;
                    });
            },

            checkTransactionStatus: function (returnError) {

                return $timeout(function () {

                    if (returnError) {

                        return $q.reject(
                            {
                                message: 'This is the actual error message returned from the check transaction status API response.'
                            });

                    }

                    return $q.resolve(
                        {
                            // Website to submit the raw transaction
                            rawTransactionSubmissionUrl: 'http://example.com',
                            // link to a 3rd party site that will display the status of the
                            // transaction.
                            transactionStatusUrl: 'http://example.com/status',
                            // 3rd party site to display the Etherium transaction.
                            transactionEtheriumUrl: 'http://example.com/etherium-transaction'
                        });

                }, 1750);
            }

        };
    };

    ApiService.$inject = ['ReceiptService', '$timeout', '$q'];

    app.factory('ApiService', ApiService);

})();