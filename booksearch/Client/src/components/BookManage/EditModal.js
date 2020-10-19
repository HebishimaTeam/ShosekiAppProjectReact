import React from 'react'
import Button from '../../atoms/Button'
import TextBox from '../../atoms/TextBox'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

export default function EditModal() {
    const [open, setOpen] = React.useState(false)
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const onRegister = () => {
        // ToDo登録処理後リロード
        setOpen(false)
    }
    // ToDo kanriFlg処理
    const kanriFlg = false

    return (
        <div>
            <IconButton onClick={openModal}>
                <EditIcon color="secondary" />
            </IconButton>
            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    {!kanriFlg && (
                        // ToDo title処理
                        <TextBox
                            margin="dense"
                            label="title"
                            fullWidth
                        />
                    )}
                    {/* ToDo comment処理 */}
                    <textarea cols="50" rows="30" placeholder="Comment" className="textarea-primary" />
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained" onClick={onRegister}>
                        保存
                    </Button>
                    <Button onClick={closeModal} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}