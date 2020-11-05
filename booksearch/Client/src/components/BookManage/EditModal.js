import React, { useState } from 'react'
import { TextBox, Button } from '../../atoms/index'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { searchBook } from '../../redux/Slices/book/book'

const EditModal = (props) => {
    const [title, setTile] = useState(props.book.title)
    const [comment, setComment] = useState(props.book.comment)
    const [open, setOpen] = useState(false)
    const [addFlg, setAddFlg] = useState(false)
    const dispatch = useDispatch()

    const openModal = () => {
        setTile(props.book.title)
        setComment(props.book.comment)
        setOpen(true)
        let path = window.location.pathname.replace('/', '')
        if (path === "BookAdd") setAddFlg(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const changeTitle = (e) => {
        setTile(e.target.value)
    }
    const changeComment = (e) => {
        setComment(e.target.value)
    }
    const onRegister = () => {
        // 新規登録
        if (addFlg) {
            // 新規登録処理
        } else {
            // 更新
            axios.post('/updateBookInfo', {
                isbn: props.book.isbn,
                title: title,
                comment: comment,
                image: props.book.image
            }).then((res) => {
                // 更新成功したため、再検索を行いリフレッシュ
                dispatch(searchBook(title))
                alert('更新しました。')
            }).catch((error) => {
                console.error(error)
                alert('更新に失敗しました。管理者に問い合わせてください。')
            })
        }
        // 画面を閉じる
        closeModal()
    }

    return (
        <div>
            <IconButton onClick={openModal}>
                <EditIcon color="secondary" />
            </IconButton>
            <Dialog fullWidth open={open} onClose={closeModal}>
                <DialogTitle>{!addFlg ? '編集画面' : '追加画面'}</DialogTitle>
                <DialogContent>
                    <TextBox
                        label="title"
                        fullWidth
                        value={title}
                        onChange={changeTitle}
                    />
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
                    <Button color="primary" onClick={closeModal}>
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditModal