import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

export const ActualizarProducto = ({ closeModal, product, characteristics, onUpdate }) => {
	const [formData, setFormData] = useState({
		...product,
		characteristics: characteristics.reduce((acc, char) => ({
			...acc,
			[char.id]: product.characteristics?.[char.id] || 0
		}), {})
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedProduct = {
				...formData,
				duration_days: parseInt(formData.duration_days),
				duration_nights: parseInt(formData.duration_nights),
				unit_price: parseFloat(formData.unit_price),
				reviews: parseInt(formData.reviews),
				characteristics: Object.entries(formData.characteristics).reduce((acc, [key, value]) => ({
					...acc,
					[key]: parseInt(value)
				}), {})
			};
			
			await onUpdate(updatedProduct);
			closeModal();
		} catch (error) {
			console.error('Error al actualizar:', error);
		}
	};

	const handleCharacteristicChange = (charId) => {
		setFormData(prev => ({
			...prev,
			characteristics: {
				...prev.characteristics,
				[charId]: prev.characteristics[charId] === 1 ? 0 : 1
			}
		}));
	};

	return (
		<Modal 
			isOpen={true} 
			onClose={closeModal}
			placement="center"
			size="2xl"
			scrollBehavior="inside"
			classNames={{
				base: "max-h-[90vh]",
				wrapper: "overflow-hidden",
				body: "overflow-y-auto py-6",
			}}
		>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1 border-b border-gray-200 p-6">
					<h2 className="text-xl font-bold">Actualizar Producto</h2>
				</ModalHeader>
				
				<ModalBody className="px-6">
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							label="Nombre"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
							variant="bordered"
						/>

						<Input
							label="País"
							value={formData.destination}
							onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
							required
							variant="bordered"
						/>

						<Input
							label="Ciudad"
							value={formData.city}
							onChange={(e) => setFormData({ ...formData, city: e.target.value })}
							required
							variant="bordered"
						/>

						<div className="grid grid-cols-2 gap-4">
							<Input
								type="number"
								label="Noches"
								value={formData.duration_nights}
								onChange={(e) => setFormData({ ...formData, duration_nights: e.target.value })}
								required
								variant="bordered"
							/>

							<Input
								type="number"
								label="Días"
								value={formData.duration_days}
								onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
								required
								variant="bordered"
							/>
						</div>

						<Input
							type="number"
							label="Precio Unitario"
							value={formData.unit_price}
							onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
							required
							variant="bordered"
						/>

						<Input
							label="URL de Imagen"
							value={formData.url_img}
							onChange={(e) => setFormData({ ...formData, url_img: e.target.value })}
							variant="bordered"
						/>

						<Textarea
							label="Descripción"
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							variant="bordered"
							minRows={3}
						/>

						<Textarea
							label="Itinerario"
							value={formData.itinerary}
							onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
							variant="bordered"
							minRows={3}
						/>

						<Input
							type="number"
							label="Reviews"
							value={formData.reviews}
							onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
							variant="bordered"
						/>

						<div className="space-y-2">
							<p className="text-sm font-medium text-gray-700">Características</p>
							{characteristics.map((char) => (
								<div key={char.id} className="flex items-center gap-2">
									<input
										type="checkbox"
										id={`char-${char.id}`}
										checked={formData.characteristics[char.id] === 1}
										onChange={() => handleCharacteristicChange(char.id)}
										className="w-4 h-4 text-[#FF8127] border-gray-300 rounded focus:ring-[#FF8127]"
									/>
									<label 
										htmlFor={`char-${char.id}`}
										className="flex items-center gap-2"
									>
										<img 
											src={char.url_icon} 
											alt={char.name}
											className="w-6 h-6"
										/>
										<span>{char.name}</span>
									</label>
								</div>
							))}
						</div>
					</form>
				</ModalBody>

				<ModalFooter className="border-t border-gray-200 p-6">
					<Button 
						color="danger" 
						variant="light" 
						onPress={closeModal}
					>
						Cancelar
					</Button>
					<Button 
						color="primary"
						onClick={handleSubmit}
						className="bg-[#FF8127] text-white"
					>
						Actualizar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
