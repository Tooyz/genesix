export default class EditCtrl{
    constructor($scope, $location, $routeParams, BookListService){
        this.$scope = $scope;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.bookListService = BookListService;
        this.init();
    }

    init(){
        this.bookListService.getBook(this.$routeParams.id)
            .then(book => {
                this.$scope.editedBook = book.clone();
                console.log(this.$scope.editedBook)
            });

        this.$scope.routeToList = () => {
            this.$location.path('/list');
        };

        /**
         * Save currently edited book and return to list
         */
        this.$scope.saveBook = () => {
            this.bookListService.putBook(this.$scope.editedBook);
            this.$scope.routeToList();
        };
    }
}


EditCtrl.inject = ['$scope', '$location', '$routeParams', 'BookListService'];