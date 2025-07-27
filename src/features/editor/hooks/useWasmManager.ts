import { useMemo, useEffect } from 'react';
import { WasmManager } from '../services/execution/WasmManager';

export const useWasmManager = (): WasmManager => {
  const wasmManager = useMemo(() => {
    if (typeof window === 'undefined') {
      // Return a dummy manager for SSR
      return {
        isLoaded: () => false,
        isLoadedSync: () => false,
        load: async () => {},
        runCode: async () => {
          throw new Error('WASM not available on server side');
        },
        getSupportedLanguages: () => [],
        getRuntimeStatus: () => ({}),
        loadAll: async () => {},
        addRuntime: () => {},
        removeRuntime: () => false,
      } as unknown as WasmManager;
    }
    console.log('🔄 Initializing WasmManager on client side');
    return WasmManager.default();
  }, []);

  // Preload Python runtime when the hook is first used
  useEffect(() => {
    if (typeof window !== 'undefined' && wasmManager) {
      console.log('🚀 Preloading Python WASM runtime...');
      wasmManager.load('python').catch((error) => {
        console.warn('Failed to preload Python WASM runtime:', error);
      });
    }
  }, [wasmManager]);

  return wasmManager;
};
