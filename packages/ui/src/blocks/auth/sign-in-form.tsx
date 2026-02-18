import React from 'react';
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
import { Separator } from '../../components/separator';
import { Text } from '../../components/text';

export function SignInForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="email">Email</Label>
          <Input placeholder="you@email.com" keyboardType="email-address" />
        </View>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Label nativeID="password">Password</Label>
            <Text className="text-sm text-primary font-medium">Forgot?</Text>
          </View>
          <Input placeholder="••••••••" secureTextEntry />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <ButtonText>Sign In</ButtonText>
        </Button>

        {/* Divider */}
        <View className="flex-row items-center gap-3 w-full">
          <Separator className="flex-1" />
          <Text className="text-xs text-muted-foreground uppercase">or</Text>
          <Separator className="flex-1" />
        </View>

        {/* Social */}
        <View className="flex-row gap-3 w-full">
          <Button variant="outline" className="flex-1">
            <ButtonText>Google</ButtonText>
          </Button>
          <Button variant="outline" className="flex-1">
            <ButtonText>Apple</ButtonText>
          </Button>
        </View>

        <Text className="text-sm text-center text-muted-foreground">
          Don't have an account? <Text className="text-primary font-medium">Sign Up</Text>
        </Text>
      </CardFooter>
    </Card>
  );
}
