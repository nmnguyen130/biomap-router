import React from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const DEFAULT_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";

export default function Canvas() {
  const WIDTH = 400;
  const HEIGHT = 400;

  const focal = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const scalePrevious = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onStart((g) => {
      if (g.numberOfPointers == 2) {
        focal.value = {
          x: g.focalX,
          y: g.focalY,
        };
      }
    })
    .onUpdate((g) => {
      scale.value = g.scale;
      offset.value = {
        x: (1 - scale.value) * (focal.value.x - WIDTH / 2),
        y: (1 - scale.value) * (focal.value.y - HEIGHT / 2),
      };
    })
    .onEnd(() => {
      scalePrevious.value = scalePrevious.value * scale.value;

      start.value = {
        x: scale.value * start.value.x + offset.value.x,
        y: scale.value * start.value.y + offset.value.y,
      };

      offset.value = {
        x: 0,
        y: 0,
      };

      scale.value = 1;
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: scale.value },
        { translateX: start.value.x },
        { translateY: start.value.y },
        { scale: scalePrevious.value },
      ],
    };
  });

  return (
    <View>
      <GestureHandlerRootView>
        <GestureDetector gesture={pinch}>
          <Animated.View style={{ width: 1000, height: 1000 }}>
            <Animated.Image
              source={{ uri: DEFAULT_IMG }}
              style={[
                {
                  width: WIDTH,
                  height: HEIGHT,
                },
                animatedStyle,
              ]}
            ></Animated.Image>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
