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

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const [showCreateAccountButton, setShowCreateAccountButton] = useState(true);

  useEffect(() => {
    const callbackKeyboardDidShow = () => {
      setShowCreateAccountButton(false);
    };

    const callbackKeyboardDidHide = () => {
      setShowCreateAccountButton(true);
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
              <Title>Faça seu logon</Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => null}>Entrar</Button>

            <ForgotPassword onPress={() => null}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {showCreateAccountButton && (
        <CreateAccountButton onPress={() => null}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
