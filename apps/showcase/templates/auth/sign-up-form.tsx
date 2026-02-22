/**
 * SignUpForm — Copy-paste template
 * Copy this file into your app and customize. Uses @thewhileloop/whileui primitives.
 */
import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  ButtonText,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Pressable,
  Separator,
  Text,
} from '@thewhileloop/whileui';

export interface SignUpFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  onSignIn?: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

export function SignUpForm({
  onSubmit,
  onSignIn,
  onGooglePress,
  onApplePress,
}: SignUpFormProps = {}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ firstName, lastName, email, password });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-3">
          <View className="flex-1 gap-2">
            <Label nativeID="first-name">First name</Label>
            <Input placeholder="Jane" value={firstName} onChangeText={setFirstName} />
          </View>
          <View className="flex-1 gap-2">
            <Label nativeID="last-name">Last name</Label>
            <Input placeholder="Doe" value={lastName} onChangeText={setLastName} />
          </View>
        </View>
        <View className="gap-2">
          <Label nativeID="signup-email">Email</Label>
          <Input
            placeholder="you@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View className="gap-2">
          <Label nativeID="signup-password">Password</Label>
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
          <ButtonText>Create Account</ButtonText>
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
          onPress={onSignIn}
          className="flex-row justify-center"
          accessibilityRole="button"
        >
          <Text className="text-sm text-center text-muted-foreground">
            Already have an account? <Text className="text-primary font-medium">Sign In</Text>
          </Text>
        </Pressable>
      </CardFooter>
    </Card>
  );
}
