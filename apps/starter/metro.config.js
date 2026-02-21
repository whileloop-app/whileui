const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);
const monorepoRoot = path.resolve(__dirname, '../..');
config.watchFolders = [monorepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
});
