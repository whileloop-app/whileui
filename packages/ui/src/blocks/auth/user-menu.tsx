import { View } from 'react-native';
import { Avatar, AvatarFallback } from '../../components/avatar';
import { Button } from '../../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/dropdown-menu';
import { Text } from '../../components/text';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <View className="flex flex-col gap-1">
            <Text className="text-sm font-medium leading-none text-foreground">My Account</Text>
            <Text className="text-xs leading-none text-muted-foreground">user@email.com</Text>
          </View>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text className="text-foreground">Profile</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text className="text-foreground">Billing</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text className="text-foreground">Settings</Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Text className="text-foreground">New Team</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text className="text-destructive">Log out</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
