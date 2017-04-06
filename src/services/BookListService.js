import Book from '../models/Book';
import FakeStorage from "../utils/FakeStorage"
const BookListService = function($q, $http) {
    let list = [];
    let booksWereLoaded = false;
    let lastBookId;

    /**
     * Actual async books loading
     * @returns {*}
     */
    let loadList = () => {
        return $q((resolve, reject) => {
            if ( booksWereLoaded ) return resolve(list);
            $http.get("/book/list/")
                .then(res  => {
                    list = res.data;
                    booksWereLoaded = true;
                    lastBookId = list.length;
                    resolve(list);
                }).catch(e=>reject(e))
        })
    };

    /**
     * Async books loading, should send http only one time, since we have no pagination
     */
    this.getList = () => {
        return loadList();
    };

    /**
     * Gets new book instance or finds in list
     * @param {number} id
     * @returns {*}
     */
    this.getBook = (id) => {
        return $q((resolve, reject) => {
            if ( id === 'new' ){
                return resolve(new Book(id))
            }
            loadList()
                .then(list => resolve(list.find(e=>e.id == id)))
                .catch(e=>reject(e))
        })
    };

    /**
     *
     * @param {Book} book
     * @returns {*}
     */
    this.putBook = (book) => {
        return $http.post("/book/save/", book)
            .then(res => {
                if ( res.data.id ){
                    book.id = res.data.id + (++lastBookId);
                    list.push(book);
                } else {
                    let cBook;
                    for ( let i = 0; i < list.length; i++ ){
                        cBook = list[i];
                        if ( cBook.id == book.id ) {
                            list[i] = book;
                            break;
                        }
                    }
                }
                resolve(book);
            }).catch(e=>reject(e));
    };

    /**
     * Deletes book from list and returns new list
     * @param {Book} book
     * @returns {Array}
     */
    this.deleteBook = (book) => {
        list = list.filter(e=>e.id != book.id);
        return list;
    }

};

BookListService.inject = ["$q", "$http"];

export default BookListService;