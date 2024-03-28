import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedProps,
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
      scale.value = clamp(0.9, e.scale * savedScale.value, 2.8);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: offset.value.x },
      { translateY: offset.value.y },
      { scale: scale.value },
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
