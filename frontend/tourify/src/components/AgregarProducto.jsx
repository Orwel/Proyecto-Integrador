import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useDisclosure as useDisclosure1 } from "@nextui-org/react";
import { ModalConfirmation } from "./modalConfirmation";
import { useImages } from "../hook/use-images";


export const AgregarProducto = ({ closeModal, handleCreate, characteristics }) => {
  const { insertImages } = useImages();
  const [urls, setUrls] = useState(["", "", "", ""]);
  const { isOpen: isOpenNewProduct, onOpen: onOpenNewProduct, onOpenChange: onOpenChangeNewProduct } = useDisclosure1();
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    name: "",
    destination: "",
    city: "",
    duration_days: "",
    duration_nights: "",
    unit_price: "",
    categoria_id: "",
    url_img: "",
    description: "",
    itinerary: "",
    reviews: "",
    characteristics: [],
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const { data, error } = await supabase.from("categorias").select("*");
      if (error) throw error;
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const handleChange = (field, value) => {
    setProducto((prev) => ({ ...prev, [field]: value }));
  };

  const handleCharacteristicChange = (id) => {
    setProducto((prev) => {
      const updatedCharacteristics = prev.characteristics.includes(id)
        ? prev.characteristics.filter((charId) => charId !== id)
        : [...prev.characteristics, id];
      return { ...prev, characteristics: updatedCharacteristics };
    });
  };

  const handleUrlsChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !producto.name ||
      !producto.destination ||
      !producto.city ||
      !producto.duration_days ||
      !producto.duration_nights ||
      !producto.unit_price ||
      !producto.categoria_id
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const productoId = await handleCreate(producto);
      // console.log("Producto creado:", createdProduct);
      const imageInsertions = urls
        .filter((url) => url) // Filtrar URLs no vacías
        .map((url) => insertImages({ product_id: productoId, url_imge: url }));

      await Promise.all(imageInsertions);

      setProducto({
        name: "",
        destination: "",
        city: "",
        duration_days: "",
        duration_nights: "",
        unit_price: "",
        categoria_id: "",
        url_img: "",
        description: "",
        itinerary: "",
        reviews: "",
        characteristics: [],
      });
      // onOpenChangeNewProduct(true)
      setUrls(["", "", "", ""]);
      closeModal();


    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto");
    }
  };

  return (
    <>
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
            <h2 className="text-xl font-bold">Crear Producto</h2>
          </ModalHeader>

          <ModalBody className="px-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre"
                value={producto.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                variant="bordered"
              />

              <Input
                label="País"
                value={producto.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                required
                variant="bordered"
              />

              <Input
                label="Ciudad"
                value={producto.city}
                onChange={(e) => handleChange("city", e.target.value)}
                required
                variant="bordered"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Noches"
                  value={producto.duration_nights}
                  onChange={(e) => handleChange("duration_nights", e.target.value)}
                  required
                  variant="bordered"
                />

                <Input
                  type="number"
                  label="Días"
                  value={producto.duration_days}
                  onChange={(e) => handleChange("duration_days", e.target.value)}
                  required
                  variant="bordered"
                />
              </div>

              <Input
                type="number"
                label="Precio Unitario"
                value={producto.unit_price}
                onChange={(e) => handleChange("unit_price", e.target.value)}
                required
                variant="bordered"
              />

              <Input
                label="URL de Imagen"
                value={producto.url_img}
                onChange={(e) => handleChange("url_img", e.target.value)}
                variant="bordered"
              />
              <div className="space-y-2">
                <h3 className="text-sm font-medium">4 imagenes opcionales</h3>
                {urls.map((url, index) => (
                  <Input
                    key={index}
                    label={`Imagen ${index + 1}`}
                    value={url}
                    onChange={(e) => handleUrlsChange(index, e.target.value)}
                    placeholder="Ingresa la URL de la imagen"
                    variant="bordered"
                  />
                ))}
              </div>
              <Textarea
                label="Descripción"
                value={producto.description}
                onChange={(e) => handleChange("description", e.target.value)}
                variant="bordered"
                minRows={3}
              />

              <Textarea
                label="Itinerario"
                value={producto.itinerary}
                onChange={(e) => handleChange("itinerary", e.target.value)}
                variant="bordered"
                minRows={3}
              />

              <Input
                type="number"
                label="Reviews"
                value={producto.reviews}
                onChange={(e) => handleChange("reviews", e.target.value)}
                variant="bordered"
              />

              <select
                value={producto.categoria_id}
                onChange={(e) => handleChange("categoria_id", e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Características</p>
                {characteristics.map((char) => (
                  <div key={char.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`char-${char.id}`}
                      checked={producto.characteristics.includes(char.id)}
                      onChange={() => handleCharacteristicChange(char.id)}
                      className="w-4 h-4 text-[#FF8127] border-gray-300 rounded focus:ring-[#FF8127]"
                    />
                    <label
                      htmlFor={`char-${char.id}`}
                      className="flex items-center gap-2"
                    >
                      <img src={char.url_icon} alt={char.name} className="w-6 h-6" />
                      <span>{char.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </form>
          </ModalBody>

          <ModalFooter className="border-t border-gray-200 p-6">
            <Button color="danger" variant="light" onPress={closeModal}>
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit}
              className="bg-[#FF8127] text-white"
            >
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ModalConfirmation
        isOpen={isOpenNewProduct}
        onOpenChange={onOpenChangeNewProduct}
        type="newproduct"
      />
    </>

  );
};

export default AgregarProducto;
