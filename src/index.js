// code for testing

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Images from './components/Images'

class App extends Component {
  render() {

    return (
      <div>
        This is the react App!!
        more stuff!!
        <Images />
      </div>

    );
  }
}

ReactDOM.render( <App />, document.getElementById('root'));



// import React from 'react'
// import { render } from 'react-dom'
// import App from './components/app'
// import './styles/app.scss'
//
// render(<App/>, document.getElementById('main'))
