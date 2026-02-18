import { Button, ButtonText } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/card';
import { Text } from '../../components/text';

export function SocialConnections() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Social Connections</CardTitle>
        <CardDescription>Connect your account with social providers.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <Button variant="outline" className="w-full flex-row gap-2">
          <Text className="font-bold">G</Text>
          <ButtonText>Continue with Google</ButtonText>
        </Button>
        <Button variant="outline" className="w-full flex-row gap-2">
          <Text className="font-bold"></Text>
          <ButtonText>Continue with Apple</ButtonText>
        </Button>
        <Button variant="outline" className="w-full flex-row gap-2">
          <Text className="font-bold">GH</Text>
          <ButtonText>Continue with GitHub</ButtonText>
        </Button>
      </CardContent>
      <CardFooter>
        <Text className="text-xs text-center text-muted-foreground w-full">
          By clicking continue, you agree to our <Text className="underline">Terms of Service</Text>{' '}
          and <Text className="underline">Privacy Policy</Text>.
        </Text>
      </CardFooter>
    </Card>
  );
}
