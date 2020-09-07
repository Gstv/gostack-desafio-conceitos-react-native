import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);
    
    const index = repositories.findIndex((repositorie) => repositorie.id === id)
    repositories[index].likes = response.data.likes
    
    setRepositories([...repositories]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repositorie) => repositorie.id}
          renderItem={({ item: repositorie }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.titleRepository}>{repositorie.title}</Text>

              <View style={styles.techsContainer}>
                {repositorie.techs.map((tech, index) => (
                  <Text style={styles.tech} key={index}>{tech}</Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repositorie.id}`}
                >
                  {repositorie.likes} likes
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repositorie.id)}
                testID={`like-button-${repositorie.id}`}
              >
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  repositoryContainer: {
    borderRadius: 4,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 20,
  },
  titleRepository: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  techsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    backgroundColor: '#04d361',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
  },
  likesContainer: {
    marginTop: 15,
  },
  likeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#7159c1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
