import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      isInStock: '',
      edition: '',
      printDate: '',
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    if (!id) {
      return;
    }

    axios.get(`http://localhost:4000/book/${id}`).then(res => {
      const book = res.data.book[0];
      this.setState(() => ({
        name: book.name,
        price: book.price,
        isInStock: book.isInStock ? 'yes' : 'no',
        edition: book.edition,
      }));
    }).catch(err => {
      console.log(err);
    })
  }

  handleInputChange = (event, id) => {
    const value = event.target.value;

    this.setState(() => ({
      [`${id}`]: value,
    }));
  }

  saveBook = () => {
    const id = this.props.match.params.id;

    const book = {
      name: this.state.name,
      price: this.state.price,
      isInStock: this.state.isInStock === 'yes' ? true : false,
      edition: this.state.edition,
    }

    axios.put(`http://localhost:3001/book/${id}`, book).then(res => {
      this.props.history.push('/');
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className='form'>
          <div>
            <label>Name:</label>
            <input type="text" value={this.state.name} onChange={(event) => this.handleInputChange(event, 'name')} />
          </div>
          <div>
            <label>Price:</label>
            <input type="text" value={this.state.price} onChange={(event) => this.handleInputChange(event, 'price')} />
          </div>
          <div>
            <label>Edition:</label>
            <input type="text" value={this.state.edition} onChange={(event) => this.handleInputChange(event, 'edition')} />
          </div>
          <div>
            <label>Is In Stock:</label>
            <select value={this.state.isInStock} onChange={(event) => this.handleInputChange(event, 'isInStock')}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button onClick={() => this.saveBook()}>Save Book</button>

        <hr />

        <Link to='/'>Back</Link>
      </div>
    );
  }
}

export default EditBook;
