import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert,
  TextInput,
  ScrollView 
} from 'react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  dishName: string;
  description: string;
  price: string;
  course: string;
}

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [screen, setScreen] = useState('welcome');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    dishName: '',
    description: '', 
    price: '',
    course: 'Starters'
  });

  // Part 2: Add menu item function
  const addMenuItem = () => {
    if (!formData.dishName || !formData.description || !formData.price) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: formData.dishName,
      description: formData.description,
      course: formData.course,
      price: parseFloat(formData.price)
    };

    setMenuItems(prev => [...prev, newItem]);
    
    // Reset form
    setFormData({
      ...formData,
      dishName: '',
      description: '',
      price: ''
    });
    
    Alert.alert('Success', 'Menu item added!');
  };

  const courses = ['Starters', 'Mains', 'Desserts', 'Drinks'];

  // Welcome Screen
  if (screen === 'welcome') {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeBackground}>
          <Text style={styles.logo}>TasteBuds</Text>
          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => setScreen('signup')}
          >
            <Text style={styles.orderButtonText}>ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Sign Up Screen
  if (screen === 'signup') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>the long wait is over</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={() => setScreen('home')}
        >
          <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.loginText}>Already Registered? Log in here.</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Home Screen - MAIN SCREEN WITH PART 2 REQUIREMENTS
  return (
    <View style={styles.container}>
      <Text style={styles.header}>TasteBuds Restaurant</Text>
      
      {/* Part 2: Total Count */}
      <Text style={styles.totalText}>Total Menu Items: {menuItems.length}</Text>

      {/* Part 2: Add Menu Item Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add New Menu Item</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={formData.dishName}
          onChangeText={(text) => setFormData({...formData, dishName: text})}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
          multiline
        />
        
        <Text style={styles.label}>Course</Text>
        <View style={styles.courseContainer}>
          {courses.map((courseItem) => (
            <TouchableOpacity
              key={courseItem}
              style={[
                styles.courseButton,
                formData.course === courseItem && styles.courseSelected
              ]}
              onPress={() => setFormData({...formData, course: courseItem})}
            >
              <Text style={formData.course === courseItem ? styles.courseTextSelected : styles.courseText}>
                {courseItem}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={formData.price}
          onChangeText={(text) => setFormData({...formData, price: text})}
          keyboardType="decimal-pad"
        />

        {/* Part 2: Add Item Button */}
        <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
          <Text style={styles.addButtonText}>Add to Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Part 2: Display Menu Items */}
      <Text style={styles.sectionTitle}>Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <View style={styles.itemDetails}>
              <Text style={styles.itemCourse}>{item.course}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
        style={styles.list}
      />

      {/* Navigation */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => setScreen('welcome')}>
          <Text style={styles.navText}>Welcome</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setScreen('signup')}>
          <Text style={styles.navText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setScreen('home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  welcomeBackground: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  orderButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  orderButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  courseButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  courseSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  courseText: {
    color: '#666',
  },
  courseTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
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
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});