import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

const MinhaTela = () => {
  const [users, setUsers] = useState([]);
  const route = useRoute();
  const { postUserId } = route.params;

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, 'suaColecaoDeUsuarios'); // Substitua 'suaColecaoDeUsuarios' pelo nome da coleção que contém os usuários

      try {
        // Crie uma consulta para buscar os usuários que fizeram uma postagem com base no postUserId
        const q = query(usersCollection, where('userId', '==', postUserId));

        const querySnapshot = await getDocs(q);
        const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, [postUserId]);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo à minha tela React Native!</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            {/* Outras informações do usuário */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MinhaTela;
