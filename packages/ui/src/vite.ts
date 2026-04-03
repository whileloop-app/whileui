import { readFile } from 'node:fs/promises';

export const RN_PRIMITIVES_VITE_PACKAGES = [
  '@rn-primitives/portal',
  '@rn-primitives/select',
  '@rn-primitives/popover',
  '@rn-primitives/tooltip',
  '@rn-primitives/hover-card',
] as const;

const RN_PRIMITIVES_DIST_PATTERN = new RegExp(
  String.raw`node_modules[\\/](?:\.pnpm[\\/][^\\/]+[\\/])?@rn-primitives[\\/](portal|select|popover|tooltip|hover-card)[\\/]dist[\\/].+\.(mjs|js)$`
);

type AnyRecord = Record<string, unknown>;

function asRecord(value: unknown): AnyRecord {
  return value && typeof value === 'object' ? (value as AnyRecord) : {};
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function mergeUniqueStrings(...values: unknown[]): string[] {
  return [...new Set(values.flatMap((value) => asArray<string>(value)))];
}

function mergeAliases(base: unknown, next: unknown): AnyRecord {
  const baseRecord = asRecord(base);
  const nextRecord = asRecord(next);
  return { ...baseRecord, ...nextRecord };
}

/**
 * Returns a Vite config patch that makes rn-primitives dist files parse correctly
 * in Vite dev + build when consumed through WhileUI.
 */
export function createWhileUIViteCompatConfig() {
  return {
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
      },
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    esbuild: {
      loader: 'jsx',
      include: RN_PRIMITIVES_DIST_PATTERN,
    },
    optimizeDeps: {
      include: [...RN_PRIMITIVES_VITE_PACKAGES],
      esbuildOptions: {
        plugins: [
          {
            name: 'whileui-rn-primitives-jsx',
            setup(build: {
              onLoad: (
                options: { filter: RegExp },
                callback: (args: { path: string }) => Promise<{ contents: string; loader: string }>
              ) => void;
            }) {
              build.onLoad({ filter: RN_PRIMITIVES_DIST_PATTERN }, async (args) => {
                const contents = await readFile(args.path, 'utf8');
                return { contents, loader: 'jsx' };
              });
            },
          },
        ],
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
}

/**
 * Merges the WhileUI compatibility patch into an existing Vite config object.
 */
export function withWhileUIViteCompat(config?: AnyRecord): AnyRecord {
  const base = asRecord(config);
  const compat = createWhileUIViteCompatConfig();

  const mergedResolve = asRecord(base.resolve);
  const mergedOptimizeDeps = asRecord(base.optimizeDeps);
  const mergedEsbuildOptions = asRecord(mergedOptimizeDeps.esbuildOptions);
  const compatOptimizeDeps = asRecord(compat.optimizeDeps);
  const compatEsbuildOptions = asRecord(compatOptimizeDeps.esbuildOptions);
  const mergedBuild = asRecord(base.build);
  const mergedCommonJs = asRecord(mergedBuild.commonjsOptions);
  const compatBuild = asRecord(compat.build);
  const compatCommonJs = asRecord(compatBuild.commonjsOptions);

  return {
    ...base,
    resolve: {
      ...mergedResolve,
      alias: mergeAliases(mergedResolve.alias, asRecord(compat.resolve).alias),
      extensions: mergeUniqueStrings(mergedResolve.extensions, asRecord(compat.resolve).extensions),
    },
    esbuild: {
      ...asRecord(base.esbuild),
      ...asRecord(compat.esbuild),
    },
    optimizeDeps: {
      ...mergedOptimizeDeps,
      include: mergeUniqueStrings(mergedOptimizeDeps.include, compatOptimizeDeps.include),
      esbuildOptions: {
        ...mergedEsbuildOptions,
        ...compatEsbuildOptions,
        plugins: [
          ...asArray(mergedEsbuildOptions.plugins),
          ...asArray(compatEsbuildOptions.plugins),
        ],
      },
    },
    build: {
      ...mergedBuild,
      commonjsOptions: {
        ...mergedCommonJs,
        ...compatCommonJs,
      },
    },
  };
}
