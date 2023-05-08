import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions, StatusBar, ActivityIndicator } from 'react-native';

export default function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchImage = () => {
    setIsLoading(true);
    fetch('https://random.dog/woof.json')
      .then(response => response.json())
      .then(data => {
        if (data.url.endsWith('.mp4') || data.url.endsWith('.webm')) {
          fetchImage();
        } else {
          setImageUrl(data.url);
          Image.getSize(data.url, (width, height) => {
            const deviceWidth = Dimensions.get('window').width;
            const scaleFactor = width / deviceWidth;
            const imageHeight = height / scaleFactor;
            setImageSize({ width: deviceWidth, height: imageHeight });
            setIsLoading(false);
          });
        }
      });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog App</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        imageUrl && <Image source={{ uri: imageUrl }} style={imageSize} />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Refresh Image" onPress={fetchImage} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    top: '5%',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
  },
});