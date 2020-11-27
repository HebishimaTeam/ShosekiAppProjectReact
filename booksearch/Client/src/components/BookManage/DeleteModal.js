import React, { useState } from 'react'
import { Button } from '../../atoms/index'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'

const DeleteModal = (props) => {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const onDelete = () => {
        console.log(props.isbn)
        // TODO: ISBNを渡して書籍情報をDBから削除する関数をここで呼ぶ
        deleteBookInfo(props.isbn)
        closeModal()
    }

    const deleteBookInfo = (isbn) => {
        console.log('call api')
        axios.post('/deleteBookInfo', { isbn: isbn }).then(res => {
            console.log(`response is ${JSON.stringify(res)}`)
            if(res.status === 200){
                alert(res.data.message)
            }else if(res.status >= 500){
                alert('サーバーにリクエストが正常に到達しませんでした。時間をおいて再度実行してください。')
            }else {
                alert(`削除リクエストに失敗しました。サーバ側からのレスポンスメッセージ：${res.data.message}`)
            }
        })
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
                        variant="contained" onClick={onDelete}>
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