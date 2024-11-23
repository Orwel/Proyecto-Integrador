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
				nights: parseInt(formData.nights),
				duration_days: parseInt(formData.duration_days),
				unit_price: parseFloat(formData.unit_price),
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

	const handleCharacteristicChange = (charId, value) => {
		setFormData(prev => ({
			...prev,
			characteristics: {
				...prev.characteristics,
				[charId]: value === '' ? 0 : parseInt(value)
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
								<Input
									key={char.id}
									type="number"
									min="0"
									max="1"
									label={char.name}
									value={formData.characteristics[char.id] || 0}
									onChange={(e) => handleCharacteristicChange(char.id, e.target.value)}
									variant="bordered"
								/>
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
