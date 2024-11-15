import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";


export default function CustomInput({ inputValue, onChange, type, placeholder, onValidChange }) {
	const [isVisible, setIsVisible] = useState(false);

	const validatePasswordStrong = (value) =>
		value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/);

	const validateInput = (value) => {
		if (type === "email") {
			return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
		} else if (type === "password") {
			return value.length > 0;
		} else if (type === "passwordstrong") {
			return validatePasswordStrong(value);
		} else if (type === "first_name" || type === "last_name") {

			return /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/.test(value);
		}
		return true;
	};

	const isInvalid = useMemo(() => {
		if (inputValue === "") return false;
		return !validateInput(inputValue);
	}, [inputValue, type]);

	useEffect(() => {
		if (onValidChange) onValidChange(!isInvalid);
}, [isInvalid, onValidChange]);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Input
			value={inputValue}
			type={type === "password" && isVisible ? "text" : type}
			label=" "
			placeholder={placeholder}
			variant="bordered"
			isInvalid={isInvalid}
			color={isInvalid ? "danger" : "success"}
			errorMessage={
				isInvalid
					? type === "email"
						? "Correo inválido"
						: type === "password"
							? "Por favor ingrese su contraseña"
							: type === "passwordstrong"
								? "La contraseña debe contener un dígito del 1 al 9, una letra minúscula, una letra mayúscula, un carácter especial, sin espacios y debe tener entre 8 y 16 caracteres."
								: type === "first_name"
									? "Es obligatorio indicar un nombre válido"
									: type === "last_name"
										? "Es obligatorio indicar un apellido válido"
										: null
					: null
			}
			onChange={onChange}
			endContent={
				(type === "password" || type === "passwordstrong") && (
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
