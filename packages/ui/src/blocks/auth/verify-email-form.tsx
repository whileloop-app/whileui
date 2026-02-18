import { View } from 'react-native';
import { Button, ButtonText } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/card';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Text } from '../../components/text';

export function VerifyEmailForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <CardDescription>
          We sent a verification code to your email. Enter it below to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="code">Verification Code</Label>
          <Input
            placeholder="123456"
            keyboardType="number-pad"
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <ButtonText>Verify Email</ButtonText>
        </Button>
        <Text className="text-sm text-center text-muted-foreground">
          Didn't receive code? <Text className="text-primary underline font-medium">Resend</Text>
        </Text>
      </CardFooter>
    </Card>
  );
}
