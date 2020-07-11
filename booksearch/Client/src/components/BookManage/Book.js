import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import bookImage from '../../images/book1.jpg';


class Book extends Component{

        render(){
            return(
                <Card>
                <CardMedia
                        title="本の画像"></CardMedia>
                    <CardContent>
                        <Typography variant="h5">本のタイトル</Typography>
                        <Typography variant="body">備考</Typography>
                        <img src={bookImage} alt="bookImage" />
                    </CardContent>
                </Card>
        )}
    }
    export default Book;
