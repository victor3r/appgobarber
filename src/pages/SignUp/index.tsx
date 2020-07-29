import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [showBackToSignIn, setShowBackToSignIn] = useState(true);

  const navigation = useNavigation();

  const handleSignUp = useCallback(async data => {
    console.log(data);
  }, []);

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

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={emailInputRef.current?.focus}
              />

              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={passwordInputRef.current?.focus}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={formRef.current?.submitForm}
              />
            </Form>

            <Button onPress={formRef.current?.submitForm}>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {showBackToSignIn && (
        <BackToSignIn onPress={navigation.goBack}>
          <Icon name="arrow-left" size={20} color="#f4ede8" />
          <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export default SignUp;
