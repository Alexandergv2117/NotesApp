import { useForm } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";

import useFetch from "../../hooks/useFetch";

interface CreateCommandProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}

export default function CreateCommand({
  isOpen,
  onOpenChange,
}: CreateCommandProps) {
  const { fetchData } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async ({ title, description, command }) => {

    const { data, message} = await fetchData({
      url: "command",
      method: "POST",
      body: { title, description, command },
    });

    console.log(data, message);

    onOpenChange();
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-2xl">
                <h2>Crear comando</h2>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <section className="space-y-4">
                    <Input
                      type="text"
                      label="Titulo"
                      isInvalid={!!errors.title}
                      errorMessage="Este campo es requerido"
                      {...register("title", { required: true })}
                    />
                    <Input
                      type="text"
                      label="Descripción"
                      isInvalid={!!errors.description}
                      errorMessage="Este campo es requerido"
                      {...register("description", { required: true })}
                    />
                    <Input
                      type="text"
                      label="Comando"
                      isInvalid={!!errors.command}
                      errorMessage="Este campo es requerido"
                      {...register("command", { required: true })}
                    />
                  </section>
                  <section className="w-full flex flex-row justify-end space-x-2">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button color="primary" type="submit">
                      Crear
                    </Button>
                  </section>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
