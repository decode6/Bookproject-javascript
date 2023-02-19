import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isbn: '',
      name: '',
      price: '',
      isInStock: 'yes',
      edition: '',
      printDate: '',
    };
  }

  handleInputChange = (event, id) => {
    const value = event.target.value;

    this.setState(() => ({
      [`${id}`]: value,
    }));
  }

  saveBook = () => {
    const book = {
      ISBN: this.state.isbn,
      name: this.state.name,
      price: this.state.price,
      isInStock: this.state.isInStock === 'yes' ? true : false,
      edition: this.state.edition,
      printDate: this.state.printDate,
    }

    axios.post(`http://localhost:4000/book`, book).then(res => {
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
            <label>ISBN:</label>
            <input type="text" value={this.state.isbn} onChange={(event) => this.handleInputChange(event, 'isbn')} />
          </div>
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
          {/* <div>
            <label>Print Date:</label>
            <input type="text" value={this.state.printDate} onChange={(event) => this.handleInputChange(event, 'printDate')} />
          </div> */}
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

export default AddBook;
