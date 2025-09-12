import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as yup from 'yup';


const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const AdvancedLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', { ...data, rememberMe });
    alert(`Login Successful! Remember Me: ${rememberMe}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, marginBottom: 5, padding: 8, borderRadius: 5 }}
            />
            {errors.username && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.username.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5, marginBottom: 5 }}>
              <TextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                style={{ flex: 1, padding: 8 }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 8 }}>
                <Text>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.password.message}</Text>}
          </>
        )}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>Remember Me</Text>
      </View>

      <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
    </View>
  );
};

export default AdvancedLoginForm;
