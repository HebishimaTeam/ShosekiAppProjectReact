export type BookState = {
  searchBook: string;
  books: Book[];
};

export type Book = {
  isbn: string;
  title: string;
  imageUrl: string;
  comment: string;
};
