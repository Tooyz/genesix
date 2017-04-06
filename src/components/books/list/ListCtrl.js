export default class ListCtrl {
    constructor($scope, $location, BookListService, $q) {
        this.$scope = $scope;
        this.bookListService = BookListService;
        this.$location = $location;
        this.$q = $q;
        this.init();
    }

    init(){
        this.fillBookList();
        /*
         * @param {Book} book
         */
        this.$scope.onBookEdit = (book) => {
            this.$location.path(`/edit/${book.id}`);
        };

        /**
         * @param {Book} book
         */
        this.$scope.onBookDelete = (book) => {
            this.$scope.bookList = this.bookListService.deleteBook(book);
        };

        this.$scope.onBookAdd = () => {
            this.$location.path('/edit/new');
        }
    }

    fillBookList(){
        return this.$q((resolve, reject) => {
            this.$scope.bookList = [];
            this.bookListService.getList().then((books) => {
                this.$scope.bookList = books;
                resolve(books);
            });
        })
    }
}

ListCtrl.inject = ["$scope", '$location', "BookListService", "$q"];