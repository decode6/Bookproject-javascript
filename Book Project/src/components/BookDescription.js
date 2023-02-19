import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class BookDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (!id) {
      return;
    }

    axios.get(`http://localhost:4000/book/${id}`).then(res => {
      this.setState(() => ({
        book: res.data.book[0],
      }));
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <span className="book-name">{this.state.book.name}</span>
          <span className="isbn">({this.state.book.ISBN})</span>
        </div>
        <div className="details">
          <div>
            <span className="label">Price: </span>
            <span className="value">$ {this.state.book.price}</span>
          </div>
          <div>
            <span className="label">Edition: </span>
            <span className="value">{this.state.book.edition}</span>
          </div>
          <div>
            <span className="label">Print Date: </span>
            <span className="value">{this.state.book.printDate?.split('T')[0]}</span>
          </div>
          <div>
            <span className="label">Is In Stock: </span>
            <span className="value">{this.state.book.isInStock ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <hr />

        <Link to='/'>Back</Link>
      </div>
    );
  }
}

export default BookDescription;
