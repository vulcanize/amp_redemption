var app = angular.module('rchain', ['ui.router']);

app
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])

    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.html'
            })

            .state('eligibility-check', {
                url: '/eligibility-check',
                templateUrl: 'templates/eligibility-check.html',
                controller: 'EligibilityCheckController',
                controllerAs: 'vm'
            })

            .state('transaction-status', {
                url: '/transaction-status',
                templateUrl: 'templates/transaction-status.html',
                controller: 'TransactionStatusController',
                controllerAs: 'vm'
            })
        ;
    }])

    .directive('formGroup', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attr) {

                if (!attr.ngForm || !scope[attr.ngForm] || !scope[attr.ngForm].$$parentForm) {
                    return;
                }

                scope.$watch(function () {
                    return scope[attr.ngForm].$invalid
                           && (scope[attr.ngForm].$$parentForm.$submitted
                               || scope[attr.ngForm].$dirty);
                }, function (hasError) {
                    element.toggleClass('has-error', hasError);
                });
            }
        }
    })

    .factory('ReceiptService', function ($timeout, $q) {

        var receiptKey = 'APIClientReceiptKey';

        return {

            remove: function () {
                localStorage.removeItem(receiptKey);
                return $q.resolve();
            },

            get: function () {
                var receipt = angular.copy(localStorage.getItem(receiptKey));
                return receipt ? $q.resolve(receipt) : $q.reject(null);
            },

            set: function (receipt) {
                localStorage.setItem(receiptKey, receipt);
                return receipt;
            }
        };
    })
;