import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('ID:', id);
    console.log('Password:', password);
    // 여기에서 로그인 API 호출 가능
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dayfull</Text>
      
      <Text style={styles.label}>ID</Text>
      <TextInput 
        style={styles.input} 
        placeholder="아이디 입력" 
        value={id} 
        onChangeText={setId}
      />
      
      <Text style={styles.label}>PASSWORD</Text>
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호 입력" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#4dcfe0',
    marginBottom: 60,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 50,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#4dcfe0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
