import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export const ModalConfirmation = ({ isOpen, onOpenChange, navigate, type, onConfirm, role_id }) => {

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
										onPress={onClose()}
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
						{type === "permiso" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">Asignación de permisos</ModalHeader>
								<ModalBody className="p-9 text-center">
									{role_id === 1 ? (
										<p className="text-[14px]">¿Estás seguro de que deseas otorgar los permisos de administrador?</p>
									) : (
										<p className="text-[14px]">¿Estás seguro de que deseas quitar los permisos de administrador?</p>
									)}
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login"
										onPress={() => {
											onConfirm();
										}}
									>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "favsAñadidos" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Guardado en favoritos!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Producto añadido a tu lista de favoritos</p>
								</ModalBody>
								<ModalFooter>
								<Button
										className="boton-modal-login"
										onPress={() => {
											onConfirm();
										}}
									>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "favsEliminados" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Eliminado de favoritos!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Producto eliminado de tu lista de favoritos</p>
								</ModalBody>
								<ModalFooter>
								<Button
									className="boton-modal-login" onPress={() => {
											onConfirm();
										}}>
										Continuar
								</Button>
								</ModalFooter>
							</>
						)}
						{type === "error" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡ERROR!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Ocurrió un error. Intenta nuevamente.</p>
								</ModalBody>
								<ModalFooter>
								<Button
									className="boton-modal-login" onPress={() => {
											onConfirm();
										}}>
										Reintentar
								</Button>
								</ModalFooter>
							</>
						)}
						{type === "iniciarSesion" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Usuario Autenticado!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Necesitas iniciar sesión para añadir productos a tu lista de favoritos.</p>
								</ModalBody>
								<ModalFooter>
								<Button
									className="boton-modal-login" onPress={handleContinue}>
										Continuar
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
