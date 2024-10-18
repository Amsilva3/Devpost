import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';
import { AuthContext } from '../../contexts/auth';
import Animated, {
  Easing,
  FlipInEasyX,
  FlipInEasyY,
  FlipOutEasyX,
  FlipOutEasyY,
} from 'react-native-reanimated';

const TitleAnimated = Animated.createAnimatedComponent(Title);

function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  async function handleSignIn() {
    if (email === '' || password === '') {
      alert('Preencha todos os campos');
      return;
    }
    //Fazer o login do user
    await signIn(email, password);
  }
  async function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Preencha todos os campos para cadastrar');
      return;
    }
    //Cadastrar o usuario na aplicação
    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <TitleAnimated entering={FlipInEasyY.duration(1000)} exiting={FlipOutEasyY}>
          Dev<Text style={{ color: '#E52246' }}>Post</Text>
        </TitleAnimated>
        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          secureTextEntry={true}
          placeholder="******"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <TitleAnimated entering={FlipInEasyX.duration(1000)} exiting={FlipOutEasyX}>
        Dev<Text style={{ color: '#E52246' }}>Post</Text>
      </TitleAnimated>
      <Input placeholder="seu nome" value={name} onChangeText={(text) => setName(text)} />
      <Input
        placeholder="seuemail@teste.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        secureTextEntry={true}
        placeholder="******"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}

export default Login;
