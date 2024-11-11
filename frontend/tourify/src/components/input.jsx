import React, { useState, useMemo } from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";


export default function CustomInput({ inputValue, onChange, type }) {
	const [isVisible, setIsVisible] = useState(false);

	const validateInput = (value) => {
		if (type === "email") {
			return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
		} else if (type === "password") {
			return value.length > 0; 
		}
		return true; // Para otros tipos de input, no se aplica validación específica
	};

	const isInvalid = useMemo(() => {
		if (inputValue === "") return false;
		return !validateInput(inputValue);
	}, [inputValue, type]);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Input
			value={inputValue}
			type={type === "password" && isVisible ? "text" : type}
			label=" "
			placeholder={type === "email" ? "Ingresa tu correo" : type === "password" ? "Ingresa tu contraseña" : "Name"}
			variant="bordered"
			isInvalid={isInvalid}
			color={isInvalid ? "danger" : "success"}
			errorMessage={
				isInvalid
					? type === "email"
						? " Correo invalido"
						: type === "password"
							? "Por favor ingrese su contraseña"
							: null
					: null
			}
			onChange={onChange}
			endContent={
				type === "password" && (
					<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
						{isVisible ? (
							<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
						) : (
							<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
						)}
					</button>
				)
			}
			classNames={{
				inputWrapper: ["input-login"],
			}}
		/>
	);
}
