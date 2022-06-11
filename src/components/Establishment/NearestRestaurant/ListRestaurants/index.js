import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EstablishmentService from '../../../../services/establishment_service';
import StarRating from 'react-native-star-rating';

const Separator = () => (
  <View style={styles.separator} />
);

const ListRestaurants = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearbyRestaurants();
  }, []);

  async function loadNearbyRestaurants() {
    try {
      const response = await EstablishmentService.index(props.latitude, props.longitude);
      setStores(response.data.results);
    } catch (error) {
      setStores([]);
    }
  }

  return (
    <ScrollView style={styles.container}>
    {
      stores.map((store, index) => {
        return (
          <View style={{ flex: 1 }} key={index}>
            <Text style={styles.store_name}>{store.name}</Text>

            <Text style={styles.store_address}>
              {store.adr_address}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={store.rating}
                fullStarColor="yellow"
                starSize={15}
              />

              <Text style={{ color: 'white', marginLeft: 10, fontSize: 10 }}>
                {store.user_ratings_total} Opiniões
              </Text>
            </View>

            <Separator />
          </View>
        )
      })
    }
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  store_name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  store_address: {
    color: 'white',
    fontSize: 9,
  },
});

export default ListRestaurants;