import React from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  panel: {
    background: '#2196F3',
    padding: '60px 20px',
    color: '#FFFFFF',
  },
  '@media screen and (max-width: 400px)': {
    panel: {
      flexDirection: 'column'
    }
  }
})

export default class HowItWorks extends React.Component {
  render() {
    return (
      <div style={styles.panel} data-layout data-horizontal data-center data-justified>
        <span>
          1. Develop app with Spatially hardware
        </span>
        <span>
          2. Distribute app through app store
        </span>
        <span>
          3. End users get Spatially hardware through in-app purchase
        </span>
      </div>
    );
  }
}
