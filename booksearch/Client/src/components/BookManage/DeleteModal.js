import React, { useState } from 'react'
import { Button } from '../../atoms/index'
import { IconButton, Dialog, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
// import axios from 'axios'
import { useDispatch } from 'react-redux'
import { searchBook } from '../../redux/Slices/book/book'

const DeleteModal = (props) => {

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const onRegister = () => {
        // 削除処理
        //     .then(() => {
        dispatch(searchBook())
        //         alert('削除しました。')
        //     }).catch((error) => {
        //         console.error(error)
        //         alert('削除に失敗しました。管理者に問い合わせてください。')
        //     })
        closeModal()
    }

    return (
        <div>
            <IconButton onClick={openModal}>
                <DeleteIcon color="primary" />
            </IconButton>
            <Dialog open={open} onClose={closeModal}>
                <DialogContent>
                    <DialogContentText>
                        削除してよろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained" onClick={onRegister}>
                        はい
                    </Button>
                    <Button color="primary" onClick={closeModal}>
                        いいえ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteModal