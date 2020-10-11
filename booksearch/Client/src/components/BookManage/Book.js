import React, { Component } from 'react'
import { Card, CardActionArea, CardContent, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
    root: {
        display: 'flex',
        padding: '15px 0px',
    },
    contents: {
        flex: '1 0 auto',
    },
    buttons: {
        width: '60px',
    }
}

class Book extends Component {
    onDelete = (event) => {
        var result = window.confirm('削除してもよろしいですか？')
        if (result)
            // ToDo削除処理記述
            console.log('OKがクリックされました');
    }
    render() {
        return (
            <Card style={styles.root} >
                <CardActionArea>
                    <img src={this.props.book.image} alt="bookImage" />
                </CardActionArea>
                <div style={styles.contents}>
                    <CardContent>
                        <Typography variant="h5">{this.props.book.title}</Typography>
                        <Typography variant="body2">{this.props.book.comment}</Typography>
                    </CardContent>
                </div>
                <div style={styles.buttons}>
                    <IconButton aria-label="edit">
                        <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton color="primary" aria-label="delete" onClick={this.onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Card>
        )
    }
}
export default Book;

