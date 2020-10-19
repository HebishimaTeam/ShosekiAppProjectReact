import React from 'react'
import Button from '../../atoms/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'

export default function EditModal() {
    const [open, setOpen] = React.useState(false)
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const onRegister = () => {
        // ToDo削除処理後,リロード
        setOpen(false)
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
                    <Button onClick={closeModal} color="primary">
                        いいえ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}