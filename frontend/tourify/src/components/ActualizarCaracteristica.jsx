import React, { useState } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";

export const ActualizarCaracteristica = ({ closeModal, caracteristica, onUpdate }) => { 
  	const [formData, setFormData] = useState({
		...caracteristica,
	});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const updatedCaracteristica = {
            ...formData,
          };
          await onUpdate(updatedCaracteristica); 
          closeModal();
        } catch (error) {
          console.error('Error al actualizar:', error);
        }
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
                <h2 className="text-xl font-bold">Actualizar Característica</h2>
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

                    <Textarea
                        label="Descripción"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        variant="bordered"
                        minRows={3}
                    />

                    <Input
                        label="URL de Icono"
                        value={formData.url_icon}
                        onChange={(e) => setFormData({ ...formData, url_icon: e.target.value })}
                        variant="bordered"
                    />
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
