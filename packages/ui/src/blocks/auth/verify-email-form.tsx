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

export interface VerifyEmailFormProps {
  /** Called when user submits verification code. Receives form values. */
  onSubmit?: (data: { code: string }) => void;
  /** Called when user taps "Resend" link. */
  onResend?: () => void;
}

export function VerifyEmailForm({ onSubmit, onResend }: VerifyEmailFormProps = {}) {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ code });
  };

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
            value={code}
            onChangeText={setCode}
          />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onPress={handleSubmit}>
          <ButtonText>Verify Email</ButtonText>
        </Button>
        <Pressable
          onPress={onResend}
          className="flex-row justify-center"
          accessibilityRole="button"
        >
          <Text className="text-sm text-center text-muted-foreground">
            Didn't receive code? <Text className="text-primary underline font-medium">Resend</Text>
          </Text>
        </Pressable>
      </CardFooter>
    </Card>
  );
}
