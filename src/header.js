import React from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  header: {
    color: '#000000',
    opacity: 0.8,
    background: '#FFFFFF',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
    height: 60
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 22
  },
  byline: {
    
  }
});

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styles={styles.header} data-layout data-horizontal data-around-justified data-center>
        <div style={styles.logo}>
          Spatially
        </div>
        <div style={styles.byline}>
          Bring your app to the real world
        </div>
      </div>
    );
  }
}
