import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import CustomInput from "./input";
import { useNavigate } from 'react-router-dom';
import { ModalConfirmation } from "./modalConfirmation";



const ModalSignUp = ({ isOpen, onOpenChange }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [first_name, setFirstname] = useState('');
	const [last_name, setLasttname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);

  const isFormComplete = emailValid && passwordValid && firstNameValid && lastNameValid;
  
  const handleSignUp = async () => {
		setIsLoading(true);
		setErrorMessage(null);
		try {
			const { respData, respError } = await signUp(email, password, first_name, last_name);
			if (respError) {
				setErrorMessage("Error al crear la cuenta: " + respError);
        console.error("Error al registrarse:", respError);
			} else {
        console.log("Usuario registrado exitosamente:", respData);
				onOpenChange(false);
				setIsConfirmationOpen(true); 
				
			}
		} catch (error) {
			console.error("Error al crear la cuenta:", error.message);
		} finally {
			setIsLoading(false);
		}
	};

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
              <ModalHeader className="flex flex-col text-center">Registrarse</ModalHeader>
              <Divider className="bg-white" />
              <ModalBody className="p-8">
                <p>¡Prepárate para descubrir el mundo con <span className="text-[#FE8C00]">Tourify</span></p>
								<CustomInput
                  inputValue={first_name}
                  type="first_name"
                  onChange={(e) => setFirstname(e.target.value)}
                  onValidChange={setFirstNameValid}
									placeholder={"Ingresa tu nombre"}
									
                />
								 <CustomInput
                  inputValue={last_name}
                  type="last_name"
                  onChange={(e) => setLasttname(e.target.value)}
									placeholder={"Ingresa tu apellido"}
                  onValidChange={setLastNameValid}
                />

                <CustomInput
                  inputValue={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onValidChange={setEmailValid}
									placeholder={"Ingresa tu email"}
                />
								<span>Te enviaremos por correo electrónico la confirmación de tu viaje y los recibos</span>
                <CustomInput
                  inputValue={password}
                  type="passwordstrong"
                  onChange={(e) => setPassword(e.target.value)}
                  onValidChange={setPasswordValid}
									placeholder={"Ingresa tu contraseña"}
                />
								<p>Al crear una cuenta, usted acepta nuestra política de privacidad y los términos de uso.</p>
								{errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                 isDisabled={!isFormComplete || isLoading}
                  className="boton-modal-login"
                  onPress={handleSignUp}
                  isLoading={isLoading}>
                  {isLoading ? 'Iniciando...' : 'Aceptar y continuar'}
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
      type="exito" />
    </>

  );
}

export default ModalSignUp;