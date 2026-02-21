/**
 * WhileUI Starter — Minimal composable app
 *
 * Demonstrates: AppShell + Header + BottomNav + content
 * Clone and extend for new projects.
 */
import './global.css';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppShell, Header, BottomNav, Text, Stack, PortalHost } from '@thewhileloop/whileui';

function HomeScreen() {
  return (
    <ScrollView className="flex-1 p-4">
      <Stack gap="lg">
        <Text variant="heading">Welcome</Text>
        <Text variant="body" className="text-muted-foreground">
          This is the starter app. Replace screens with your blocks.
        </Text>
      </Stack>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView className="flex-1 p-4">
      <Stack gap="lg">
        <Text variant="heading">Profile</Text>
        <Text variant="body" className="text-muted-foreground">
          Add ProfileHeader, SettingsSection, etc.
        </Text>
      </Stack>
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState<'home' | 'profile'>('home');

  return (
    <>
      <StatusBar style="auto" />
      <AppShell
        header={<Header title="Starter" />}
        bottomNav={
          <BottomNav
            items={[
              { key: 'home', label: 'Home', icon: <Text className="text-lg">🏠</Text> },
              { key: 'profile', label: 'Profile', icon: <Text className="text-lg">👤</Text> },
            ]}
            activeKey={tab}
            onSelect={(key) => setTab(key as 'home' | 'profile')}
          />
        }
      >
        {tab === 'home' ? <HomeScreen /> : <ProfileScreen />}
      </AppShell>
      <PortalHost />
    </>
  );
}
