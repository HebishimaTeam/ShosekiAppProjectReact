import React, { ReactNode } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { EditModal, DeleteModal, BookImage } from "./index";

type props = {
  book:
};

function Book(props: props): React.ReactNode {
  let showModalFlg = false;
  if (props.kanriFlg) showModalFlg = true;
  if (props.addFlg) showModalFlg = false;

  return (
    <React.Fragment>
      <Card className="book-image-row">
        <div className="img-content">
          <BookImage image={props.book.image} />
        </div>
        <div className="book-contents">
          <CardContent>
            <Typography variant="h5">{props.book.title}</Typography>
            <Typography variant="body2">{props.book.comment}</Typography>
          </CardContent>
        </div>
        <div className="book-bottons">
          <EditModal
            book={props.book}
            kanriFlg={props.kanriFlg}
            onSearchBtnClicked={() => props.onSearchBtnClicked()}
          />
          {showModalFlg && (
            <DeleteModal isbn={props.book.isbn} bookTitle={props.bookTitle} />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
}
export default Book;
