import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomScreenContainer from '~/components/general/CustomScreenContainer.tsx';
import {supabaseClient} from '~/lib/supabase';

interface Props {
  //
}

type OrderType = {
  id: string;
  created_at: Date;
  user_id: string;
  total_amount: number;
  delivery_address: string;
  delivery_zipcode: string;
  delivery_city: string;
  product_name: string;
  order_quantity: number;
};

export default function Orders(props: Props): React.JSX.Element {
  // hooks
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orders, setOrders] = useState<Array<OrderType> | null>();

  // helpers
  const getOrders = async () => {
    setIsLoadingOrders(true);
    try {
      let {data, error, status} = await supabaseClient
        .from('orders')
        .select('*');

      if (error) {
        console.error('\n\n getOrders :>> \t\t', error, '\n\n---');
        return;
      }

      setOrders(data);
    } catch (error) {
      console.error('\n\n getOrders :>> \t\t', error, '\n\n---');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const keyExtractor = (item: OrderType, index: number) => index.toString();

  const ordersChannel = supabaseClient
    .channel('orders_channel')
    .on('postgres_changes', {event: '*', schema: 'public'}, (payload: any) => {
      setOrders(prevState => [...prevState!, payload.new]);
    })
    .subscribe();

  // renders
  const renderItem: ListRenderItem<OrderType> = ({item}) => (
    <TouchableOpacity style={styles.listItem}>
      <Text>{item.product_name}</Text>
      <Text>{item.total_amount}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoadingOrders)
    return (
      <CustomScreenContainer>
        <Text style={[styles.text, {padding: 50}]}>It is loading orders</Text>
      </CustomScreenContainer>
    );

  return (
    <CustomScreenContainer>
      <View style={styles.container}>
        <Text style={styles.text}>This is the Orders screen</Text>
        <FlatList
          keyExtractor={keyExtractor}
          data={orders ?? []}
          renderItem={renderItem}
        />
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  listItem: {
    height: 60,
    backgroundColor: 'peach',
  },
});
