import React, { useState, useEffect } from 'react';
import {
  Container,
  Name,
  Header,
  Avatar,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost,
  TextNome,
  ModalNomes,
  ModalNomesContent,
  ModalNomesHeader,
  ModalNomesTitle,
  ButtonFecharModal,
  NomesLike,
  TextButton,
  View,
} from './styles';

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; // Corrigido: Importação do storage
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native'; // Importar para usar o componente Image

function PostsList({ data, userId, nome }) {
  const navigation = useNavigation();
  const [likePost, setLikePost] = useState(data?.likes || 0);
  const [likesData, setLikesData] = useState([]); // Mudar para armazenar objeto com nome e avatar
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesSnapshot = await firestore()
        .collection('likes')
        .where('postId', '==', data.id)
        .get();

      const likesArray = likesSnapshot.docs.map((doc) => doc.data());
      setLikesData(likesArray); // Atualiza o estado com dados completos
    };

    fetchLikes();
  }, [data.id]); // Dependência: executa quando data.id mudar

  async function handleLikePost(id, likes) {
    const docId = `${userId}_${id}`;
    const doc = await firestore().collection('likes').doc(docId).get(); // Corrigido aqui
    const avatarUrl = await storage().ref('users').child(userId).getDownloadURL();

    if (doc.exists) {
      // Remover like
      await firestore()
        .collection('posts')
        .doc(id)
        .update({ likes: likes - 1 });
      await firestore().collection('likes').doc(docId).delete();
      setLikePost(likes - 1);
      setLikesData(likesData.filter((like) => like.userId !== userId)); // Atualiza a lista de likes
      return;
    }

    // Adicionar like
    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
      nome: nome,
      avatarUrl: avatarUrl,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({ likes: likes + 1 });
    setLikePost(likes + 1);
    setLikesData([...likesData, { userId, nome, avatarUrl }]); // Adiciona novo like
  }

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);
    return formatDistance(new Date(), datePost, { locale: ptBR });
  }

  return (
    <Container>
      <Header
        onPress={() => navigation.navigate('PostsUser', { title: data.autor, userId: data.userId })}
      >
        <Avatar
          source={data.avatarUrl ? { uri: data.avatarUrl } : require('../../assets/avatar.png')}
        />
        <Name numberOfLines={1}>{data?.autor}</Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>{likePost > 0 ? likePost : ''}</Like>
          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />
          <TextNome onPress={() => setModalVisible(true)}>
            {likesData.length > 0 ? <TextButton>Curtido por:</TextButton> : ''}
          </TextNome>
        </LikeButton>

        <TimePost>{formatTimePost()}</TimePost>
        <ModalNomes
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ModalNomesContent>
            <ModalNomesHeader>
              <ModalNomesTitle>Nome das pessoas que curtiram seu comentário: </ModalNomesTitle>
              {likesData.map((like) => (
                <View key={like.userId} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: like.avatarUrl }}
                    style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
                  />
                  <NomesLike>{like.nome}</NomesLike>
                </View>
              ))}
              <ButtonFecharModal onPress={() => setModalVisible(false)}>
                <TextButton>Fechar</TextButton>
              </ButtonFecharModal>
            </ModalNomesHeader>
          </ModalNomesContent>
        </ModalNomes>
      </Actions>
    </Container>
  );
}

export default PostsList;
