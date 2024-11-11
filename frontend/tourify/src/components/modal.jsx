import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import CustomInput from "./input";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const ModalLogin = ({ isOpen, onOpenChange }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { respData, respError } = await signIn(email, password);
      if (respError) {
        setErrorMessage('Email o contraseña incorrectos');
      } else {
        toast.success("Inicio de sesión exitoso");
        onOpenChange(false);
        navigate('/');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="bg-[#CCCED3]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col text-center">Iniciar Sesión</ModalHeader>
            <Divider className="bg-white" />
            <ModalBody className="p-8">
              <p>Bienvenido a <span className="text-[#FE8C00]">Tourify</span></p>
              <CustomInput
                inputValue={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                inputValue={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </ModalBody>
            <ModalFooter>
              <Button
                className="boton-modal-login"
                onPress={handleLogin}
                isLoading={isLoading}>
                {isLoading ? 'Iniciando...' : 'Acceder'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalLogin;