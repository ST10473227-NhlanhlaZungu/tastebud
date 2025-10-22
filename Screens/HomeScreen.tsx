import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

export default function HomeScreen({ navigation }: any) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = () => {
    Alert.prompt(
      'Add Dish Name',
      'Enter dish name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Next', 
          onPress: (name) => {
            if (name) {
              Alert.prompt(
                'Add Description',
                'Enter description:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Next', 
                    onPress: (description) => {
                      if (description) {
                        Alert.prompt(
                          'Add Price',
                          'Enter price:',
                          [
                            { text: 'Cancel', style: 'cancel' },
                            { 
                              text: 'Add', 
                              onPress: (price) => {
                                if (price && !isNaN(parseFloat(price))) {
                                  const newItem: MenuItem = {
                                    id: Date.now().toString(),
                                    name: name,
                                    description: description,
                                    course: 'Mains',
                                    price: parseFloat(price),
                                  };
                                  setMenuItems((prev: MenuItem[]) => [...prev, newItem]);
                                }
                              }
                            },
                          ]
                        );
                      }
                    }
                  },
                ]
              );
            }
          }
        },
      ]
    );
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemCourse}>{item.course}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TasteBuds Home</Text>
      
      <Text style={styles.totalText}>Total Menu Items: {menuItems.length}</Text>
      
      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  itemCourse: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
    backgroundColor: '#ffeaea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});