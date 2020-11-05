import React, { useState, useEffect } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { EditModal, DeleteModal, BookImage } from './index'

// ToDo kanriFlg セッションから取得
let kanriFlg = true

const Book = (props) => {

    const [isShowDeleteModal, setshowModal] = useState(false)

    useEffect(() => {
        if (kanriFlg) setshowModal(true)
        let path = window.location.pathname.replace('/', '')
        if (path === "BookAdd") setshowModal(false)
    }, [])

    return (
        <React.Fragment>
            <Card className="book-image-row" >
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
                    <EditModal book={props.book}
                    />
                    {isShowDeleteModal &&
                        <DeleteModal book={props.book} />
                    }
                </div>
            </Card>
        </React.Fragment >
    )
}

export default Book

