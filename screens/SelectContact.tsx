import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SectionList } from 'react-native';
import * as Contacts from 'expo-contacts';

//components
import SearchBar from '../components/SearchBar';
import ArrowIcon from '../components/ArrowIcon';

const SelectContact = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactSections, setContactSections] = useState<any[]>([]);

  // Function to request permissions
  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setPermissionGranted(true);
    } else {
      console.log('Permission to access contacts was denied');
    }
  };

  // Function to load contacts
  const loadContacts = async () => {
    if (permissionGranted) {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
      setFilteredContacts(data);
      groupContactsByLetter(data);
    }
  };

  // Function to filter contacts
  const search = (query: string) => {
    setSearchQuery(query);
  
    // remove spaces from search
    const cleanedQuery = query.replace(/\s+/g, '').toLowerCase();
  
    const filtered = contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.replace(/\s+/g, '').toLowerCase();
      const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0]?.number?.replace(/\s+/g, '').toLowerCase();
  
      return (
        fullName.includes(cleanedQuery) || (phoneNumber && phoneNumber.includes(cleanedQuery))
      );
    });
    setFilteredContacts(filtered);
    groupContactsByLetter(filtered);
  };

  // Group contacts by first letter of the first name
  const groupContactsByLetter = (contacts: any[]) => {
    const grouped = contacts.reduce((groups, contact) => {
      const firstLetter = contact.firstName.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
      return groups;
    }, {});

    const sections = Object.keys(grouped).map((letter) => ({
      title: letter,
      data: grouped[letter],
    }));

    setContactSections(sections);
  };

  // Request permissions and load contacts
  useEffect(() => {
    const loadData = async () => {
      await requestContactsPermission();
      loadContacts();
    };
    loadData();
  }, [permissionGranted]);

  // Function to get the contact's initials
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  // Function to select contact and navigate to SendMoney
  const selectContact = (contact: any) => {
    navigation.navigate('SendMoney', { contact });
  };

  return (
    <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: 7, backgroundColor: '#fff' }}>

      <SearchBar searchQuery={searchQuery} onSearch={search} />

      {/* SectionList to display contacts with letters */}
      <SectionList
        sections={contactSections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item, index, section }) => (
          <View>
            <View style={styles.contactContainer} onTouchEnd={() => selectContact(item)}>
              {/* Contact Icon */}
              <View style={styles.icon}>
                <Text style={styles.iconText}>
                  {getInitials(item.firstName, item.lastName)} 
                </Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>
                  {item.firstName} {item.lastName}
                </Text>
                {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                  <Text style={styles.contactNumber}>
                    {item.phoneNumbers[0].number}
                  </Text>
                )}
              </View>
              <ArrowIcon style={styles.arrowIcon} />
            </View>
            {/* Add a separator line after the last contact in the section */}
            {index === section.data.length - 1 && <View style={styles.separatorLine} />}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#C6C7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 13,
  },
  iconText: {
    color: '#3130C6',
    fontSize: 11,
    fontFamily: "RedHatDisplay_400Regular",
    marginBottom: 1,
  },
  contactInfo: {
    flex: 1,
    gap: 5,
  },
  contactName: {
    fontSize: 14,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#3E3E3E',
  },
  contactNumber: {
    fontSize: 12,
    fontFamily: "RedHatDisplay_400Regular",
    color: '#787878',
  },
  arrowIcon: {
    marginRight: 23,
  },
  sectionHeader: {
    paddingBottom: 20,
    paddingLeft: 18,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#4C51F7',
    fontFamily: "RedHatDisplay_400Regular",
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#4C51F7',
    marginVertical: 10,
    width: '100%',
  },
});

export default SelectContact;
