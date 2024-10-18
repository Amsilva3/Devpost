import React from 'react';
import { Text } from 'react-native';
import { Container, Title } from './styles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const TitleAnimated = Animated.createAnimatedComponent(Title);

function Header() {
  return (
    <Container>
      <TitleAnimated entering={FadeIn.duration(5000)} exiting={FadeOut}>
        Dev
        <Text style={{ fontStyle: 'italic', color: '#E52246' }}>Post</Text>
      </TitleAnimated>
    </Container>
  );
}
export default Header;
