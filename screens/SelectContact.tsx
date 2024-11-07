// SelectContact.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import SearchBar from '../components/SearchBar'; // Importa el componente SearchBar

const SelectContact = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Función para solicitar permisos
  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setPermissionGranted(true);
    } else {
      console.log('Permission to access contacts was denied');
    }
  };

  // Función para cargar los contactos
  const loadContacts = async () => {
    if (permissionGranted) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
      setFilteredContacts(data); // Al principio mostramos todos los contactos
    }
  };

  // Función para filtrar los contactos según el texto de búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
    setFilteredContacts(filtered);
  };

  // Solicitar permisos y cargar contactos automáticamente cuando el screen es cargado
  useEffect(() => {
    const loadData = async () => {
      await requestContactsPermission();
      loadContacts(); // Cargar los contactos después de obtener permisos
    };
    loadData();
  }, [permissionGranted]);

  // Función para obtener las iniciales del contacto
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  // Función para manejar la selección del contacto y navegar a SendMoney
  const handleSelectContact = (contact: any) => {
    navigation.navigate('SendMoney', { contact });
  };

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>My Contacts</Text>

      {/* Usar el componente SearchBar */}
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

      {/* Lista de contactos filtrada */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactContainer} onTouchEnd={() => handleSelectContact(item)}>
            {/* Ícono de contacto con iniciales */}
            <View style={styles.icon}>
              <Text style={styles.iconText}>
                {getInitials(item.firstName, item.lastName)} {/* Mostrar las iniciales */}
              </Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={{ fontSize: 18 }}>
                {item.firstName} {item.lastName}
              </Text>
              {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text>{item.phoneNumbers[0].number}</Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4C51F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactInfo: {
    flex: 1,
  },
});

export default SelectContact;
