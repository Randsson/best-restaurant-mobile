import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Establishment from './src/components/Establishment';

import EstablishmentService from './src/services/establishment_service.js';
import NearestRestaurants from './src/components/Establishment/NearestRestaurant';


export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() =>{
    async function loadRestaurants(latitude, longitude) {
      try {
        const response = await EstablishmentService.index(latitude, longitude);
        setLocations(response.data.results);
      } catch (error) {
        setLocations([]);
      }
    }
    (async () => {
      let {status} = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted'){
        Alert.alert('Habilite sua localização para acessar o aplicativo');
      }
      else{
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        loadRestaurants(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <NearestRestaurants latitude={latitude} longitude={longitude} />
      {(selected) && <Establishment place={selected} />}
    
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
      {
        locations.map(item => {
          
          return (
            <Marker key={item.place_id}
                    title={item.name}
                    icon={require('./src/images/restaurant_icon3.png')}
                    coordinate={
                      {
                        latitude: item.geometry.location.lat,
                        longitude: item.geometry.location.lng
                      }
                    }
                    onPress={() => setSelected(item)}
            />
          )
        })
        }
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

