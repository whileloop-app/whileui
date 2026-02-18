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

export function SignUpForm() {
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
            <Input placeholder="Jane" />
          </View>
          <View className="flex-1 gap-2">
            <Label nativeID="last-name">Last name</Label>
            <Input placeholder="Doe" />
          </View>
        </View>
        <View className="gap-2">
          <Label nativeID="signup-email">Email</Label>
          <Input placeholder="you@email.com" keyboardType="email-address" />
        </View>
        <View className="gap-2">
          <Label nativeID="signup-password">Password</Label>
          <Input placeholder="••••••••" secureTextEntry />
        </View>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <ButtonText>Create Account</ButtonText>
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
          Already have an account? <Text className="text-primary font-medium">Sign In</Text>
        </Text>
      </CardFooter>
    </Card>
  );
}
