import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() =>{
    (async () => {
      let {status} = await Location.requestPermissionsAsync();

      if (status !== 'granted'){
        Alert.alert('Habilite sua localização para acessar o aplicativo');
      }
      else{
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={
            {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }
        }
      >
      <Marker title={'Sua localização'} icon={require('./src/images/location_icon.png')}
        coordinate ={
          {
          latitude: latitude,
          longitude: longitude
          }
        }
      />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  map: {
    height: '100%',
    width: '100%'
  }
});

