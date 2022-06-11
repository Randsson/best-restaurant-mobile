import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EstablishmentService from '../../../services/establishment_service';
import StarRating from 'react-native-star-rating';

const ListRatings = (props) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    getStore();
  }, [props.place]);

  async function getStore() {
    try {
      const response = await EstablishmentService.show(props.place.place_id);
      setStore(response.data.result);
    } catch (error) {
      setStore([]);
    }
  }
  
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.opinions}>
        {(store.user_ratings_total > 0) ? store.user_ratings_total : '0'} Opiniões
      </Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={store.rating}
        fullStarColor="yellow"
        starSize={15}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 30,
  },
  opinions: {
    color: 'white',
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 20,
  },
  user_name: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 30,
  },
  text: {
    color: 'white',
    marginHorizontal: 20,
    fontSize: 10,
  },  
});

export default ListRatings;