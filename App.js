import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App => {
  const [data, setData] = useState([]);

  function print(obj) {
    console.log(JSON.stringify(obj, null, 4));
  }

  const getData = async value => {
    try {
      const response = await fetch(
        `https://singular-gumdrop-eead17.netlify.app/.netlify/functions/api/masjid`,
      );
      const json = await response.json();
      print(json);
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: -5.141654,
          longitude: 119.509886,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {data.map((marker, index) => {
          const geo = marker.address.geo;
          print(`lat: ${geo.lat}, long: ${geo.lng}`);
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(geo.lat),
                longitude: parseFloat(geo.lng),
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
    </View>
  );
};
