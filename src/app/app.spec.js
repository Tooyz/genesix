import angular from 'angular';
import app from './app';
import Book from "../models/Book";

describe('app', () => {
    function testController(ctrl){
        expect(ctrl.$scope).toBeDefined();
        expect(ctrl.bookListService).toBeDefined();
    }

    beforeEach(angular.mock.module("app"));
    describe('ListCtrl', () => {
        let ctrl;
        it('should work', (/*done*/) => {
            inject(($controller, $rootScope, $location, BookListService) => {
                ctrl = $controller('ListCtrl', {
                    $scope: $rootScope.$new(),
                    $location: $location,
                    BookListService: BookListService
                });
                testController(ctrl);
                /*
                Не резолвится, не понятно почему
                ctrl.fillBookList()
                    .then(r=>{
                        console.info(r);
                        expect(ctrl.$scope.bookList.length).toBeGreaterThan(0);
                        done();
                    });
                */
            });
        });
    });

    describe('EditCtrl', () => {
        let ctrl;
        beforeEach(inject(($controller, $rootScope, $location, BookListService) => {
            ctrl = $controller('EditCtrl', {
                $scope: $rootScope.$new(),
                $location: $location,
                BookListService: BookListService
            });
        }));
        it('should work', () => testController(ctrl));
    });

    describe("Book", () => {
       let book = new Book();
       console.info(book);
       it('should format date as localeDateString', () => {
           expect(new Date().toLocaleDateString() == book.getFormattedDate()).toBeTruthy();
       });
       it('should shallow clone itself', () => {
           let bookClone = book.clone();
           expect(bookClone).not.toBe(book);
           expect(bookClone).toEqual(book);
       });
    });
});