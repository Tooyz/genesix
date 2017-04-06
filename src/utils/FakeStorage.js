import Book from "../models/Book";
import Promise from 'promise-polyfill';
export default class FakeBackend{
    static getBookList(){
        return [
            new Book(1, "Dark tower", '"Clint Eastwood" adventures', new Date('1982-01-01'), 'https://upload.wikimedia.org/wikipedia/ru/2/23/The_Dark_Tower.jpg'),
            new Book(2, "1984", "Life is good", new Date("1948-01-01"), 'https://upload.wikimedia.org/wikipedia/ru/0/0e/1984_%28first_book-cover%29.jpg'),
            new Book(3, "Harry Potter", "You're a wizard Harry!", new Date("1997-01-01"), "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg")
        ];
    }

    static getSavedBookData(isNew = false){
        let res = {
            status: 'ok'
        };
        if ( isNew ){
            res.id = Date.now();
        }
        return res;
    }
}