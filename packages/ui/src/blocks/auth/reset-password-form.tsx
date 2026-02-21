import { useState } from 'react';
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

export interface ResetPasswordFormProps {
  /** Called when user submits new password. Receives form values. */
  onSubmit?: (data: { password: string; confirmPassword: string }) => void;
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps = {}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ password, confirmPassword });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="new-password">New Password</Label>
          <Input
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View className="gap-2">
          <Label nativeID="confirm-password">Confirm Password</Label>
          <Input
            placeholder="********"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={handleSubmit}>
          <ButtonText>Reset Password</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}
