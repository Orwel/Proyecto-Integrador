import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export const ModalConfirmation = ({ isOpen, onOpenChange, navigate, type }) => {

	const handleContinue = () => {
		onOpenChange(false);
		navigate('/');
	};



	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement="top-center"
			className="bg-[#CCCED3] p-9"
			size="lg"
		>
			<ModalContent>
				{(onClose) => (
					<>
						{type === "inicio" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Inicio de sesión exitoso!</ModalHeader>

								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Has ingresado a tu cuenta en <span className="text-[#FE8C00]">Tourify.</span>  Ahora puedes explorar y gestionar tus reservas.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login"
										
									>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}

						{type === "cierre" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Cierre de sesión exitoso!</ModalHeader>

								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Has salido de tu cuenta en <span className="text-[#FE8C00]">Tourify.</span>  Tu sesión ha finalizado de manera segura, y ya no podrás acceder a las funciones exclusivas para usuarios registrados.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login"
										onPress={handleContinue}
									>
										Ir a la página de inicio
									</Button>
								</ModalFooter>
							</>
						)}

						{type === "exito" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Cuenta creada exitosamente!</ModalHeader>

								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Te hemos enviado un correo de confirmación de registro a tu dirección de email. Si no recibes el correo en unos minutos, verifica tu carpeta de spam o selecciona la opción "Reenviar correo"</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login"
										onPress={handleContinue}
									>
										Reenviar correo
									</Button>
								</ModalFooter>
							</>
						)}
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
