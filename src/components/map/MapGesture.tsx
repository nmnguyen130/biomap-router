import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { G, Svg } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  width: number;
  height: number;
  children: React.ReactNode;
}

const MapGesture: React.FC<Props> = ({ width, height, children }) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const focal = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX / scale.value + start.value.x,
        y: e.translationY / scale.value + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = { ...offset.value };
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;

      focal.value = {
        x: e.focalX,
        y: e.focalY,
      };
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedProps = useAnimatedStyle(() => ({
    transform: [
      { translateX: focal.value.x },
      { translateY: focal.value.y },
      { scale: scale.value },
      { translateX: -focal.value.x },
      { translateY: -focal.value.y },
      { translateX: offset.value.x },
      { translateY: offset.value.y },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Svg width={width} height={height}>
        <AnimatedG animatedProps={animatedProps}>{children}</AnimatedG>
      </Svg>
    </GestureDetector>
  );
};

export default MapGesture;
