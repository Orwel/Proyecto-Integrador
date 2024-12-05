import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export const ModalConfirmation = ({ isOpen, onOpenChange, navigate, type, onConfirm, role_id, duracionMinima }) => {

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
										onPress={() => {
											onOpenChange(false);
										}}
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
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Usuario No Autenticado!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Necesitas iniciar sesión o crear una cuenta para añadir productos a tu lista de favoritos.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login" onPress={handleContinue}>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "SesionAuth" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Usuario No Autenticado!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Debes iniciar sesión para realizar una reserva. Por favor, inicia sesión o regístrate.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login" onPress={handleContinue}>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "fechasValidas" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">Selección fechas</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Por favor, selecciona un rango de fechas válido.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login" onPress={handleContinue}>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === `duracion ${duracionMinima}` && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">Verificar duración del tour o experiencia</ModalHeader>
								<ModalBody className="p-9 text-center">
								<p className="text-[14px]">La duración del tour o experiencia debe ser exactamente de <span className="text-[#FE8C00] strong" >{duracionMinima}</span> días. Por favor, ajusta la duración para proceder.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login" onPress={() => {
											onConfirm();
										}}
										>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "reserva" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">¡Estás a un paso de confirmar tu reserva!</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Para completar tu reserva, por favor confirma los detalles de tu tour o experiencia.</p>
								</ModalBody>	
								<ModalFooter>
									<Button
										className="boton-modal-login" onPress={handleContinue}>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}

						{type === "eliminar" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px] text-red-600">
									Confirmar eliminación
								</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">¿Estás seguro de que deseas eliminar esta característica?.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login bg-red-600 hover:bg-red-700"
										onPress={() => {
											onConfirm();
										}}
									>
										Eliminar
									</Button>
									<Button
										className="boton-modal-login bg-gray-400 hover:bg-gray-500"
										onPress={() => {
											onOpenChange(false);
										}}
									>
										Cancelar
									</Button>
								</ModalFooter>
							</>
						)}
						{type === "duplicadoname" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">Nombres Duplicados</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">El nombre del producto ya está en uso. Por favor, elige un nombre diferente.</p>
								</ModalBody>
								<ModalFooter>
									<Button
										className="boton-modal-login"
										onPress={() => {
											onOpenChange(false);
										}}
									>
										Continuar
									</Button>
								</ModalFooter>
							</>
						)}
						
						{type === "newproduct" && (
							<>
								<ModalHeader className="flex flex-col text-center text-[24px]">Confirmación</ModalHeader>
								<ModalBody className="p-9 text-center">
									<p className="text-[14px]">Producto agregado exitosamente. Ahora está disponible en el catálogo.</p>
								</ModalBody>
								
							</>
						)}

					</>
				)}
			</ModalContent>
		</Modal>
	)
}
