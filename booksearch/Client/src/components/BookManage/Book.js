import React, { Component } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'

const styles = {
    root: {
        display: 'flex',
        padding: '15px 0px',
        width: '100%'
    },
    contents: {
        flex: '1',
    },
    buttons: {
        width: '60px',
    }
}

class Book extends Component {
    render() {
        return (
            <React.Fragment>
                <Card style={styles.root} >
                    <div className="img-content">
                        {this.props.book.image === '' ?
                            (<div className="noImage"> No Image</div>)
                            :
                            (<CardActionArea> <img src={this.props.book.image} alt="bookImage" /></CardActionArea>)
                        }
                    </div>
                    <div style={styles.contents}>
                        <CardContent>
                            <Typography variant="h5">{this.props.book.title}</Typography>
                            <Typography variant="body2">{this.props.book.comment}</Typography>
                        </CardContent>
                    </div>
                    <div style={styles.buttons}>
                        <EditModal />
                        {!this.props.kanriFlg && (
                            <DeleteModal />
                        )}
                    </div>
                </Card>
            </React.Fragment >
        )
    }
}
export default Book

