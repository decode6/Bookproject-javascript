import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Books from './components/Books';
import BookDescription from './components/BookDescription';
import EditBook from './components/EditBook';
import AddBook from './components/AddBook';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Books} exact />
          <Route path='/book/:id' component={BookDescription} exact />
          <Route path='/book/edit/:id' component={EditBook} exact />
          <Route path='/add/book' component={AddBook} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
