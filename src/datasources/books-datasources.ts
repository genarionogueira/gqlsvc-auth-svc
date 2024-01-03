import {AddBookMutationResponse, Book} from "../generated/graphql.js"

const BooksDB: Omit<Required<Book>, "__typename">[] = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
];

export class BooksDataSource {  
    getBooks(): Book[] {
      return BooksDB;
    }
    addBook(book: Book): AddBookMutationResponse{
      if(book.title && book.author){
        BooksDB.push({
          title: book.title,
          author: book.author
        });
        return {
          code: "200", success: true, message: "New Book Added!", book
        }
      }else{
        return {
          code: "400",
          success: false,
          message: "Invalid input",
          book: null
        }
      }
    }
}