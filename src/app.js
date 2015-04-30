import './flex.css';
import './app.css';

import React from 'react';

import Dragable from './dragable';
import Header from './header';
import Content from './content';
import How from './howitworks';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render() {
    var style = {
      height: this.state.height,
      width: this.state.width
    };

    return (
      <div>
        <div style={style} data-layout data-vertical data-justified>
          <Header />
          <Content height={this.state.height} />
        </div>
        <How height={this.state.height} />
      </div>
    );
  }

  handleResize() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }
}
