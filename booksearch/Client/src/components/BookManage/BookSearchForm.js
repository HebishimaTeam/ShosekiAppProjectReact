import React, {Component} from 'react'
import Button from '../../atoms/Button';
import TextBox from '../../atoms/TextBox';
import Book from"./Book";

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
                検索 </Button>
                <Book/>
               </div>
     )}
}
export default BookSearchForm;