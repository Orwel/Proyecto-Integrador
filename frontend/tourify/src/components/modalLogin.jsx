import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import CustomInput from "./input";
import { useNavigate } from 'react-router-dom';
import { ModalConfirmation } from "./modalConfirmation";



const ModalLogin = ({ isOpen, onOpenChange }) => {
  const { signIn, userInfo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { respData, respError } = await signIn(email, password);
      if (respError) {
        setErrorMessage('Email o contraseña incorrectos');
      } else {
        setIsAuthenticated(true);
        onOpenChange(false);
        setIsConfirmationOpen(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol adecuado antes de redirigir
    if (isAuthenticated && userInfo?.role_id === 2) {
      navigate('/panel');
    }
  }, [isAuthenticated, userInfo, navigate]);

  

  return (
    <>
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
                  placeholder={"Ingresa tu correo"}
                />
                <CustomInput
                  inputValue={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Ingresa tu contraseña"}
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
      <ModalConfirmation
        isOpen={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        navigate={navigate}
        type="inicio" />
    </>

  );
}

export default ModalLogin;