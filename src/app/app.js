import angular from 'angular';
const ngRoute = require('angular-route');
const ngMock = require('angular-mocks');

import ListCtrl from "../components/books/list/ListCtrl";
import EditCtrl from "../components/books/edit/EditCtrl";

import bookRow from "../shared/bookrow/bookRow";
import BookListService from "../services/BookListService";

import FakeStorage from "../utils/FakeStorage";

import '../style/app.css';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute', 'ngMockE2E'])
    .service('BookListService', BookListService)
    .controller('ListCtrl', ListCtrl)
    .controller('EditCtrl', EditCtrl)
    .directive('bookRow', bookRow)
    .config(['$locationProvider', '$routeProvider', '$qProvider', function( $locationProvider, $routeProvider, $qProvider ) {
        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/list', {
                template: require('../components/books/list/ListView.html'),
                controller: 'ListCtrl'
            })
            .when('/edit/:id', {
                template: require('../components/books/edit/EditView.html'),
                controller: "EditCtrl"
            })
            .otherwise({redirectTo: '/list'});
        }
    ])
    .run(['$httpBackend', ($httpBackend) => {
        //Fake http
        $httpBackend
            .whenGET(/^\/book\/list/)
            .respond(FakeStorage.getBookList());
        $httpBackend
            .whenPOST(/^\/book\/save/, function (data) {
                return JSON.parse(data).id == 'new';
            })
            .respond(FakeStorage.getSavedBookData(true));
        $httpBackend
            .whenPOST(/^\/book\/save/, function (data) {
                return JSON.parse(data).id !== 'new';
            })
            .respond(FakeStorage.getSavedBookData(false))
    }]);

export default MODULE_NAME;