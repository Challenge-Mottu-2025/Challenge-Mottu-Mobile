import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../constants/colors';

export default function OpcoesScreen() {
  const navigation = useNavigation();

  const containerAnim = useRef(new Animated.Value(0)).current;

  const buttons = [
    {
      label: "Mottu Sport",
      image: require("../assets/mottu-sport.webp"),
      route: "SportScreen",
    },
    {
      label: "Mottu E",
      image: require("../assets/mottu-e.webp"),
      route: "EScreen",
    },
    {
      label: "Mottu Pop",
      image: require("../assets/mottu-pop.webp"),
      route: "PopScreen",
    },
  ];

  const buttonsAnim = buttons.map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(20)).current,
    scale: useRef(new Animated.Value(1)).current,
  }));

  useEffect(() => {
    Animated.timing(containerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const animations = buttonsAnim.map(({ opacity, translateY }, i) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: i * 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          delay: i * 200,
          useNativeDriver: true,
        }),
      ])
    );
    Animated.stagger(150, animations).start();
  }, []);

  const onPressIn = (index) => {
    Animated.spring(buttonsAnim[index].scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (index) => {
    Animated.spring(buttonsAnim[index].scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: containerAnim,
          transform: [
            {
              translateY: containerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        },
      ]}
    >
    <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <AntDesign name="caretleft" size={28} color={colors.primary} />
    </TouchableOpacity>
      <Text style={styles.title}>Escolha sua categoria</Text>

      {buttons.map((btn, index) => (
        <Animated.View
          key={index}
          style={{
            opacity: buttonsAnim[index].opacity,
            transform: [
              { translateY: buttonsAnim[index].translateY },
              { scale: buttonsAnim[index].scale },
            ],
            marginVertical: 12,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Pressable
            onPressIn={() => onPressIn(index)}
            onPressOut={() => onPressOut(index)}
            onPress={() => navigation.navigate(btn.route)}
            style={styles.button}
          >
            <Image source={btn.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.text}>{btn.label}</Text>
          </Pressable>
        </Animated.View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backArrow: {
    paddingTop: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1c1c1c",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(1, 139, 19, 0.74)",
    alignItems: "center",
    width: 250,
    elevation: 4,
    shadowColor: "#000",
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
