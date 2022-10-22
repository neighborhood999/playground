import {
  useRef,
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from 'react';

export function createStore<Store>(initialStore: Store) {
  function useStoreData() {
    const store = useRef(initialStore);
    const get = useCallback(() => store.current, []);
    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);

      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  function useStore<SelectedStore>(
    selector: (store: Store) => SelectedStore
  ): [SelectedStore, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.set];
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;
  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const value = useStoreData();
    return (
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
  }

  return {
    Provider,
    useStore,
  };
}

export const initialState = { firstName: 'John', lastName: 'Doe' };
