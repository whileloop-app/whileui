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

export function ResetPasswordForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="gap-2">
          <Label nativeID="new-password">New Password</Label>
          <Input placeholder="********" secureTextEntry />
        </View>
        <View className="gap-2">
          <Label nativeID="confirm-password">Confirm Password</Label>
          <Input placeholder="********" secureTextEntry />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ButtonText>Reset Password</ButtonText>
        </Button>
      </CardFooter>
    </Card>
  );
}
