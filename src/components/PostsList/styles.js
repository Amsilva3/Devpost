import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  margin-top: 8px;
  margin: 8px 2%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  ${Platform.select({
    android: 'elevation: 3;', // Apenas Android usa "elevation"
    ios: 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);', // iOS usa "box-shadow"
  })}
  padding: 11px;
`;
export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  color: #353840;
  font-size: 18px;
  font-weight: bold;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 6px;
`;
export const ContentView = styled.View``;

export const Content = styled.Text`
  color: #353840;
  margin: 4px 0;
`;
export const Actions = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;
//LikeButton e o coração//
export const LikeButton = styled.TouchableOpacity`
  width: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
// Like é o número//
export const Like = styled.Text`
  color: #e52246;
  margin-right: 6px;
`;
export const TimePost = styled.Text`
  color: #121212;
`;
export const TextNome = styled.TouchableOpacity`
  width: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const ModalNomes = styled.Modal``;

export const ModalNomesContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const ModalNomesHeader = styled.View`
  flex-direction: column;
  width: 300px;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
export const ModalNomesTitle = styled.Text`
  color: #353840;
  font-size: 18px;
  font-weight: bold;
  padding: 20px;
`;
export const NomesLike = styled.Text`
  color: #353840;
  font-size: 18px;
  padding: 20px;
`;
export const TextButton = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #418cfd;
  padding: 2px 5px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
export const ButtonFecharModal = styled.TouchableOpacity`
  background-color: #418cfd;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;
export const View = styled.View``;
export const Text = styled.Text`
  color: #353840;
  font-size: 18px;
  padding: 20px;
`;
