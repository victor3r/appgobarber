import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const [showBackToSignIn, setShowBackToSignIn] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const callbackKeyboardDidShow = () => {
      setShowBackToSignIn(false);
    };

    const callbackKeyboardDidHide = () => {
      setShowBackToSignIn(true);
    };

    Keyboard.addListener('keyboardDidShow', callbackKeyboardDidShow);

    Keyboard.addListener('keyboardDidHide', callbackKeyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', callbackKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', callbackKeyboardDidHide);
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => null}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {showBackToSignIn && (
        <BackToSignIn onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#f4ede8" />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export default SignUp;
