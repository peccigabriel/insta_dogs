import React from 'react';
import { Route, Routes } from 'react-router';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordRecovery from './LoginPasswordRecovery';
import LoginPasswordReset from './LoginPasswordReset';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
        <Route path="recuperar" element={<LoginPasswordRecovery />} />
        <Route path="resetar" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;
