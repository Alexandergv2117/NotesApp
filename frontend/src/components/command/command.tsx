import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code
} from "@nextui-org/react";

export interface ICommand {
  id: string
  title: string
  command: string
  description: string
  createdAt: string
}

export default function Command ({ title, description, command, createdAt }: ICommand) {
  const date = new Date(createdAt);

  return (
    <Card className="max-w-[350px] m-2">
      <CardHeader className="justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 space-y-4">
        <p>{description}</p>
        <Code>{command}</Code>
      </CardBody>
      <CardFooter className="gap-3">
        <span className="text-right w-full">{date.toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
}
