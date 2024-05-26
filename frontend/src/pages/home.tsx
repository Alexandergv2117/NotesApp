import { Button, useDisclosure } from "@nextui-org/react";
import CreateCommand from "../components/create-command/create-command";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className="relative">
      <h1 className="text-4xl font-bold">Welcome to ACME</h1>
      <p className="mt-4 text-lg">The best place to find the best products</p>

      <Button onPress={onOpen} variant="bordered" color="primary" className="absolute bottom-0 right-0">
        Crear comando
      </Button>

      <CreateCommand isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}/>
    </div>
  );
}
