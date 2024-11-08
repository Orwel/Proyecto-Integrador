import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import CustomInput from "./input";
import { useAuth } from "../context/AuthContext";






const ModalLogin = ({ isOpen, onOpenChange }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn(email, password);
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="w-1/2 z-50"
      size="sm"
      placement="bottom"
    >
      <ModalContent className="bg-slate-500">
        {(onClose) => (
          <>
            <div className="">
              <div className="flex flex-col items-center justify-center">
                <picture>
                  <img src="" alt="" />
                </picture>
                <h2 className="">Iniciar sesión</h2>
              </div>

            </div>
            <div className="flex flex-col items-center gap-4 py-2 px-1 justify-between">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center gap-4 py-2 px-1 justify-between">
              <Button
                onClick={handleLogin}
                isLoading={isLoading}
                radius="full"
                className=" label w-full max-w-[312px] ">
                {isLoading ? 'Iniciando...' : 'Acceder'}
              </Button>
            </div>


            <ModalFooter className=" flex flex-col items-center">
              <Link className="" href="/" >
                Olvidaste tu contraseña?
              </Link>
              <Divider className="my-4 bg-[#5EA667] max-w-[312px]" />
              <Link className="" href="/" >
                Aún no te has registrado?
              </Link>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalLogin;