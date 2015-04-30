import './style/arrow.css';

import React from 'react';
import StyleSheet from 'react-style';

import Phone from './phone';
import Background from './background';

import { example, star } from './backgrounds';

var styles = StyleSheet.create({
  header: {
    position: 'relative',
  },
  drawing: {
    width: '65%',
    height: 'auto',
    pointerEvents: 'none',
    MsUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
  }
});

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: 0
    };
  }

  render() {
    return (
      <div styles={styles.header} data-flex data-layout data-vertical data-center data-center-justified>
        <Background showScreen={this.state.showing}>
          <img style={styles.drawing} src={example} />
          <img style={styles.drawing} src={star} />
        </Background>

        <Phone
          height={this.props.height}
          parent={this}
          showScreen={(num) => this.setState({showing: num})}
        >
          {this.renderHomescreen('Diapers needs changing!')}
          {this.renderHomescreen()}
        </Phone>
        <div className="arrow bounce"></div>
      </div>
    );
  }

  renderHomescreen(notification) {
    var date = new Date();

    return (
      <div>
        <div id="reminder">
          <div></div>
          <div>{notification}</div>
          <div>now</div>
        </div>
        <div id="time">{date.getHours()}:{date.getMinutes()}</div>
        <div id="date">Saturday, January 4</div>
        <div id="bottom"></div>
        <div id="slide">
          <div></div>
          slide to unlock
        </div>
      </div>
    );
  }
}
