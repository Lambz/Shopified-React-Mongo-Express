
import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {fetchSubcategoriesImage} from '../model/interface';


const defaultIllustrationUrl = 'https://i.imgur.com/UYiroysl.jpg';
const {width: screenWidth} = Dimensions.get('window');

let carouselArray = [];

function getImagesForCarousel(subcategoryArray, callback) {
  carouselArray = [];
  fetchSubcategoriesImage(subcategoryArray, (images) => {
    subcategoryArray.forEach((subcategory, index) => {
      if(images && images[index]) {
        carouselArray.push({title: subcategory, illustration: images[index]});
      }
      else {
        carouselArray.push({title: subcategory, illustration: defaultIllustrationUrl});
      }
    })
    callback();
  });
}




export default function CategoryView({item}) {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  if(isLoading) {
    getImagesForCarousel(item.item.subcategories, isFetched);
  }
  function isFetched() {
    setEntries(carouselArray);
    setIsLoading(false);
  }

  function imageClicked(subcategoryIndex) {
    console.log("Click", subcategoryIndex);
  }
  
  const renderItem = ({item, index}, parallaxProps) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => imageClicked({index})}>
          <ParallaxImage
            source={{uri: item.illustration}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </TouchableOpacity> 
     
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
        <Text style={styles.categoryHeader}>{item.item.name}</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 120,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  categoryHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5
  },
  title: {
    fontSize: 18
  }
});