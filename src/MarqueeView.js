import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useMemo,
  cloneElement,
  forwardRef,
  useCallback,
} from "react";
import {
  Animated,
  Easing,
  PixelRatio,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  children: ReactElement<any>;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
}

const MarqueeView = (
  { style, children, speed = 0.1, delay = 0, autoPlay = true, playing }: Props,
  ref
) => {
  const containerWidth = useRef(0);
  const contentWidth = useRef(0);
  const offsetX = useRef(new Animated.Value(0));
  const contentRef = useRef(null);
  const isPlaying = useRef(autoPlay);
  const animatedValue = useRef(null);
  const reset = useRef(false);

  useEffect(() => {
    offsetX.current.addListener(({ value }) => {
      if (value.toFixed(1) <= -contentWidth.current && !reset.current) {
        reset.current = true;
        const outScreenValue = containerWidth.current;
        animatedValue.current = Animated.timing(offsetX.current, {
          toValue: outScreenValue,
          duration: 0,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          start(outScreenValue);
        });
      }
    });
    return () => {
      offsetX.current.removeAllListeners();
      contentRef.current = null;
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      start,
      stop,
    }),
    []
  );

  useEffect(() => {
    if (isPlaying.current && !playing) {
      stop();
    }
    if (!isPlaying.current && playing) {
      start();
    }
    return () => {};
  }, [playing]);

  const stop = () => {
    animatedValue.current?.reset?.();
    isPlaying.current = false;
  };

  const start = (currentOffset = 0) => {
    const value = -(contentWidth.current * 2);
    const durationByValue =
      PixelRatio.getPixelSizeForLayoutSize(-value + currentOffset) / speed;
    // Check speed with different value
    // const averageSpeed = (currentOffset - value) / durationByValue;

    animatedValue.current = Animated.timing(offsetX.current, {
      toValue: value,
      duration: durationByValue,
      delay,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    isPlaying.current = true;
    reset.current = false;
    animatedValue.current.start();
  };
  const childrenCloned = useMemo(
    () =>
      cloneElement(children, {
        ...children.props,
        onLayout: ({
          nativeEvent: {
            layout: { width, x },
          },
        }) => {
          if (width === contentWidth.current) {
            return;
          }
          contentWidth.current = width;
          if (autoPlay) {
            start();
          }
        },
        ref: (refValue) => (contentRef.current = refValue),
      }),
    [children]
  );

  const measureContainerView = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }) => {
      if (containerWidth.current === width) {
        return;
      }
      containerWidth.current = width;
    },
    []
  );

  return (
    <View onLayout={measureContainerView} style={style}>
      <ScrollView
        horizontal={true}
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        <Animated.View
          style={{
            transform: [{ translateX: offsetX.current }],
          }}
        >
          {childrenCloned}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default forwardRef(MarqueeView);
