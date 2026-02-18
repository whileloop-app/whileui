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

export function ForgotPasswordForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="forgot-email">Email</Label>
          <Input placeholder="you@email.com" keyboardType="email-address" />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <ButtonText>Send Reset Link</ButtonText>
        </Button>
        <Text className="text-sm text-center text-muted-foreground">
          Remember your password?{' '}
          <Text className="text-primary underline font-medium">Back to Sign In</Text>
        </Text>
      </CardFooter>
    </Card>
  );
}
