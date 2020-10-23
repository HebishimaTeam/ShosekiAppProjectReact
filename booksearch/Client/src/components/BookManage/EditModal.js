import React, { useState } from 'react'
import { TextBox, Button } from '../../atoms/index'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import axios from 'axios'

const EditModal = (props) => {
    const [title, setTile] = useState(props.book.title)
    const [comment, setComment] = useState(props.book.comment)
    const [open, setOpen] = useState(false)
    // const [book, setbook] = useState(props.book) サーバに渡すとき1まとまりにしたい

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setTile(props.book.title)
        setComment(props.book.comment)
        setOpen(false)
    }
    const changeTitle = (e) => {
        setTile(e.target.value)
    }
    const changeComment = (e) => {
        setComment(e.target.value)
    }
    const onRegister = () => {
        // props.onSearchBtnClicked(props.bookTitle)
        axios.post('/updateBookInfo', {
            isbn: props.book.isbn,
            title: title,
            comment: comment,
            image: props.book.image
        })
            .then((res) => {
                alert('更新しました。')
                props.onSearchBtnClicked(props.book.title)
            },
            ).catch((error) => {
                console.error(error)
                alert('更新に失敗しました。管理者問い合わせてください。')
            }
            )

        closeModal()
    }

    return (
        <div>
            <IconButton onClick={openModal}>
                <EditIcon color="secondary" />
            </IconButton>
            <Dialog fullWidth open={open} onClose={closeModal}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    {props.kanriFlg && (
                        <TextBox
                            label="title"
                            fullWidth
                            value={title}
                            onChange={changeTitle}
                        />
                    )}
                    <TextBox
                        label="comment"
                        style={{ marginTop: 10 }}
                        placeholder="comment"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={10}
                        value={comment}
                        onChange={changeComment}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained" onClick={onRegister}>
                        登録
                    </Button>
                    <Button onClick={closeModal} color="primary">
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default EditModal