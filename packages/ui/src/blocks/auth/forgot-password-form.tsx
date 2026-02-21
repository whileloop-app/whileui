import { useState } from 'react';
import { View } from 'react-native';
import { Pressable } from '../../components/pressable';
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

export interface ForgotPasswordFormProps {
  /** Called when user submits email. Receives form values. */
  onSubmit?: (data: { email: string }) => void;
  /** Called when user taps "Back to Sign In" link. */
  onBackToSignIn?: () => void;
}

export function ForgotPasswordForm({ onSubmit, onBackToSignIn }: ForgotPasswordFormProps = {}) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ email });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="forgot-email">Email</Label>
          <Input
            placeholder="you@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onPress={handleSubmit}>
          <ButtonText>Send Reset Link</ButtonText>
        </Button>
        <Pressable
          onPress={onBackToSignIn}
          className="flex-row justify-center"
          accessibilityRole="button"
        >
          <Text className="text-sm text-center text-muted-foreground">
            Remember your password?{' '}
            <Text className="text-primary underline font-medium">Back to Sign In</Text>
          </Text>
        </Pressable>
      </CardFooter>
    </Card>
  );
}
