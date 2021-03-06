import React, { Component } from 'react';
import { Animated } from 'react-native';
import CircularProgress from './Graphic';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0),
    };
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    // Animated.spring(this.state.chartFillAnimation, {
    //   toValue: this.props.fill,
    //   tension,
    //   friction,
    //   // useNativeDriver: true,
    // }).start();
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <Animated.View>
        <AnimatedProgress {...other} fill={this.state.chartFillAnimation} />
      </Animated.View>
    );
  }
}

// AnimatedCircularProgress.defaultProps = {
//   tension: 7,
//   friction: 10,
// };
