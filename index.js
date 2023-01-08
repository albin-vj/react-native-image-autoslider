import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";

const imageslider = React.createRef();
let CurrentSlide = 0;
let timerId;
let IntervalTime = 8000;
let stop = 0;

export const ImageAutoSlider = (props) => {
  const dataArray = props.dataArray;
  const disableAutoSlide = props.disableSlide;
  IntervalTime = props.intervalTime ?? 8000;
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const black = "#000000";
  const darkGray = "#A9A9A9";

  //image slide start
  const startAutoPlay = () => {
    if (disableAutoSlide) {
      return;
    }
    if (timerId) {
      clearInterval(timerId);
    }
    timerId = setInterval(() => {
      setTimeout(() => {
        stop = 0;
      }, 3000);
      if (stop == 1) return;
      stop = 1;
      goToNextPage();
    }, IntervalTime);
  };

  //imageslide stop
  const stopAutoPlay = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  // automatic slide
  const goToNextPage = async () => {
    try {
      if (CurrentSlide >= dataArray.length - 1) CurrentSlide = 0;
      else CurrentSlide = CurrentSlide + 1;

      imageslider.current?.scrollToIndex({
        index: CurrentSlide,
        animated: true,
        viewPosition: 0.5,
      });
      if (timerId) changeDotExtraData();
    } catch (err) {}
  };

  const onViewRef = React.useRef((obj) => {
    try {
      CurrentSlide = obj?.viewableItems[0]?.index;
      if (!timerId) changeDotExtraData();
    } catch (err) {}
  });

  const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 60 });

  const changeDotExtraData = () => {
    setSliderIndex(CurrentSlide);
  };

  React.useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, []);

  return (
    <View
      style={{
        height: props.containerHeight ?? Dimensions.get("screen").width * 0.24,
        width: props.containerWidth ?? "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: props.containerPadding ?? 5,
          paddingVertical: props.containerPaddingVertical ?? 0,
        }}
        data={dataArray}
        horizontal={props.vertical ? false : true}
        onScrollBeginDrag={() => stopAutoPlay()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        ref={imageslider}
        initialScrollIndex={0}
        onScrollToIndexFailed={(info) => {}}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              stopAutoPlay();
              props.positiveClick(item);
            }}
            style={{
              paddingLeft: (index = 0 ? 10 : 3),
              paddingRight: index == dataArray.length - 1 ? 10 : 3,
              height: props.height ?? Dimensions.get("screen").width * 0.22,
              width: props.width ?? null,
              alignItems: "center",
              justifyContent: "center",
              borderColor: props.borderColor ?? darkGray,
              borderWidth: item.id == props.selectedItem ? 5 : 0,
            }}
          >
            <Image
              source={{
                uri: item.imagepath,
              }}
              style={{
                borderRadius: 5,
                height:
                  props.imageHeight ?? Dimensions.get("screen").width * 0.17,
                width:
                  props.imageWidth ?? Dimensions.get("screen").width * 0.88,
                resizeMode: "cover",
                overflow: "hidden",
              }}
            />
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={dataArray}
        horizontal={true}
        extraData={sliderIndex}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => "l" + index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: Dimensions.get("screen").width * 0.02,
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 5,
            }}
          >
            <View
              style={{
                borderRadius: 3,
                marginVertical: 5,
                height: 6,
                width: 6,
                backgroundColor: index == sliderIndex ? black : darkGray,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

ImageAutoSlider.propTypes = {
  dataArray: PropTypes.array,
  disableSlide: PropTypes.bool,
  intervalTime: PropTypes.number,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  containerPadding: PropTypes.number,
  containerPaddingVertical: PropTypes.number,
  vertical: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  borderColor: PropTypes.string,
  selectedItem: PropTypes.string,
  positiveClick: PropTypes.func,
};
