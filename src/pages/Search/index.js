import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Container, AreaInput, Input, List } from './styles';
import Feather from '@expo/vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }
    const subscribe = firestore()
      .collection('users')
      .where('nome', '>=', input)
      .where('nome', '<=', input + '\uf8ff')
      .onSnapshot((snapshot) => {
        const listUsers = [];

        snapshot.forEach((doc) => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        //console.log('Lista de Users');
        //console.log(listUsers);
        setUsers(listUsers);
      });

    return () => subscribe();
  }, [input]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#E52246" />
        <Input
          placeholder="Procurando alguem?"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>

      <List data={users} renderItem={({ item }) => <SearchList data={item} />} />
    </Container>
  );
}

export default Search;
