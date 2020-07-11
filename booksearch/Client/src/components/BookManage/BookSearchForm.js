import React, {Component} from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Card from '@material-ui/core/Card';

class BookSearchForm extends Component {
    render(){
        return(
            <div><div>BookSearchForm</div>
            <TextBox label="本のタイトル"
                name="booktitle">
            </TextBox>
            <Button className="btnSearch"
                type="submit"
                variant="contained">
                検索
            </Button>
            </div>
    )}
}

export default BookSearchForm;