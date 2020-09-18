import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';



class Book extends Component {

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">{this.props.book.title}</Typography>
                    <Typography variant="body">{this.props.book.comment}</Typography>
                    <img src={this.props.book.image} alt="bookImage" />
                </CardContent>
            </Card>
        )
    }
}
export default Book;

