import React, { useState } from 'react'
import { Button } from '../../atoms/index'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteModal = (props) => {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const onRegister = () => {
        // ToDo削除処理後,リロード
        console.log(props.isbn)
        props.onSearchBtnClicked()
        closeModal()
    }

    return (
        <div>
            <IconButton onClick={openModal}>
                <DeleteIcon color="primary" />
            </IconButton>
            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Subscribe</DialogTitle>
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