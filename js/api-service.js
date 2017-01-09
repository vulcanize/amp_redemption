(function () {
    'use strict';

    var ApiService = function (ReceiptService, $timeout, $q, $http) {

        return {

            checkEligibility: function () {

                ReceiptService.remove();

                // sample error response
                var errorResponse = {
                    message: 'This is the actual error message returned from the check eligibility status API response.'
                };

                // sample success response
                var successResponse = {
                    receipt: '8c002ae298835501d80200f05753de0edf0',
                    transaction: '263c018582731ff54dc72c7d67e858c002ae298835501d80200f05753de0edf0'
                };

                /*
                 replace this  ->
                 */
                return $timeout(function () {

                    return 1 === 1 ? $q.resolve(successResponse) : $q.reject(errorResponse);

                }, 1750)
                /*
                 <- with this -> return $http.get('/api/check-eligibility')
                 */
                    .then(function (response) {
                        ReceiptService.set(response.receipt);
                        return response;
                    });
            },

            checkTransactionStatus: function () {

                // sample error response
                var errorResponse = {
                    message: 'This is the actual error message returned from the check transaction status API response.'
                };

                // sample success response
                var successResponse = {
                    // Website to submit the raw transaction
                    rawTransactionSubmissionUrl: 'http://example.com',
                    // link to a 3rd party site that will display the status of the
                    // transaction.
                    transactionStatusUrl: 'http://example.com/status',
                    // 3rd party site to display the Etherium transaction.
                    transactionEtheriumUrl: 'http://example.com/etherium-transaction'
                };

                /*
                 return $http.get('/api/check-transaction-status')
                 start  -> */

                /*
                 replace this  ->
                 */
                return $timeout(function () {

                    return 1 === 1 ? $q.resolve(successResponse) : $q.reject(errorResponse);

                }, 1750)
                /*
                 <- with this -> return $http.get('/api/check-eligibility')
                 */
                    .then(function (response) {
                        return response;
                    });
            }

        };
    };

    ApiService.$inject = ['ReceiptService', '$timeout', '$q'];

    app.factory('ApiService', ApiService);

})();