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
import { Separator } from '../../components/separator';
import { Text } from '../../components/text';

export interface SignInFormProps {
  /** Called when user submits email/password. Receives form values. */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Called when user taps "Forgot?" link. */
  onForgotPassword?: () => void;
  /** Called when user taps "Sign Up" link. */
  onSignUp?: () => void;
  /** Called when user taps Google button. */
  onGooglePress?: () => void;
  /** Called when user taps Apple button. */
  onApplePress?: () => void;
}

export function SignInForm({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGooglePress,
  onApplePress,
}: SignInFormProps = {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ email, password });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="email">Email</Label>
          <Input
            placeholder="you@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Label nativeID="password">Password</Label>
            <Pressable onPress={onForgotPassword} accessibilityRole="button">
              <Text className="text-sm text-primary font-medium">Forgot?</Text>
            </Pressable>
          </View>
          <Input
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full" onPress={handleSubmit}>
          <ButtonText>Sign In</ButtonText>
        </Button>

        <View className="flex-row items-center gap-3 w-full">
          <Separator className="flex-1" />
          <Text className="text-xs text-muted-foreground uppercase">or</Text>
          <Separator className="flex-1" />
        </View>

        <View className="flex-row gap-3 w-full">
          <Button variant="outline" className="flex-1" onPress={onGooglePress}>
            <ButtonText>Google</ButtonText>
          </Button>
          <Button variant="outline" className="flex-1" onPress={onApplePress}>
            <ButtonText>Apple</ButtonText>
          </Button>
        </View>

        <Pressable
          onPress={onSignUp}
          className="flex-row justify-center"
          accessibilityRole="button"
        >
          <Text className="text-sm text-center text-muted-foreground">
            Don't have an account? <Text className="text-primary font-medium">Sign Up</Text>
          </Text>
        </Pressable>
      </CardFooter>
    </Card>
  );
}
