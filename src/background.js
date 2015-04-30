import React from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  child: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0,
    transition: 'opacity ease-in 1s'
  },
  current: {
    opacity: 1,
    transition: 'opacity 1s ease-out 1s'
  }
});

export default class Background extends React.Component {
  render() {
    var current = this.props.showScreen;

    return (
      <div style={styles.base}>
        {React.Children.map(this.props.children, (child, i) => {
          return <div styles={[styles.child, i === current ? styles.current : null]}>
            {child}
          </div>;
        })}
      </div>
    )
  }
}
