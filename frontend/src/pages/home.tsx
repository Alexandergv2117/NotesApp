import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateCommand from "../components/create-command/create-command";

import useFetch from "../hooks/useFetch";
import Command, { ICommand } from "../components/command/command";

export default function Home() {
  const [commands, setCommands] = useState<ICommand[]>([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { fetchData } = useFetch();


  useEffect(() => {
    const fetchCommands = async () => {
      const { data } = await fetchData({ url: "command", method: "GET" });
      setCommands(data);
    };

    if (!isOpen) fetchCommands();
  }, [isOpen]);


  return (
    <div className="relative mt-4">
      <section>
        <h1 className="text-4xl font-bold m-2">Comandos</h1>
        <section className="pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {commands.map((command) => (
            <Command key={command.id} {...command} />
          ))}
        </section>
      </section>

      <Button onPress={onOpen} variant="bordered" color="primary" className="absolute bottom-1 right-2">
        Crear comando
      </Button>

      <CreateCommand isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}/>
    </div>
  );
}
