import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';


function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    try {
      await signUp(email, password, name);
      alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
    } catch (error) {
			console.log(email,"email enviado")
      console.error("Error al crear la cuenta:", error.message);
    }
  };

  return (
    <div className='pt-[300px]'>
      <h1>Crear cuenta</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignUp}>Registrar</button>
    </div>
  );
}

export default SignUp;
