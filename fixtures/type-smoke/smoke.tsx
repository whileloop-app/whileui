import {
  Button,
  ButtonText,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@thewhileloop/whileui';
import { withWhileUIViteCompat } from '@thewhileloop/whileui/vite';

const viteConfig = withWhileUIViteCompat({});
void viteConfig;

export function Smoke() {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Type smoke</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="a" className="w-full">
          <TabsList>
            <TabsTrigger value="a" className="flex-1">
              A
            </TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">
            <Button className="mt-2">
              <ButtonText>Button text children</ButtonText>
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
