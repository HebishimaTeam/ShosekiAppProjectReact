import React from 'react'
import { CardActionArea } from '@material-ui/core'

const BookImage = (props) => {
    return (
        <React.Fragment>
            <div className="img-content">
                {props.image === '' ?
                    (<div className="no-image"> No Image</div>)
                    :
                    (<CardActionArea> <img src={props.image} alt="bookImage" /></CardActionArea>)
                }
            </div>
        </React.Fragment>
    )
}
export default BookImage

