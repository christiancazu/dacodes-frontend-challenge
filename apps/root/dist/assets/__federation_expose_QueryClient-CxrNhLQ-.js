import { importShared } from './__federation_fn_import-BgsQVGK0.js';
import { w as hydrate, z as dehydrate } from './hydration-Bn_XJvPl.js';

var cacheEventTypes = ["added", "removed", "updated"];
function isCacheEventType(eventType) {
  return cacheEventTypes.includes(eventType);
}
async function persistQueryClientRestore({
  queryClient,
  persister,
  maxAge = 1e3 * 60 * 60 * 24,
  buster = "",
  hydrateOptions
}) {
  try {
    const persistedClient = await persister.restoreClient();
    if (persistedClient) {
      if (persistedClient.timestamp) {
        const expired = Date.now() - persistedClient.timestamp > maxAge;
        const busted = persistedClient.buster !== buster;
        if (expired || busted) {
          return persister.removeClient();
        } else {
          hydrate(queryClient, persistedClient.clientState, hydrateOptions);
        }
      } else {
        return persister.removeClient();
      }
    }
  } catch (err) {
    await persister.removeClient();
    throw err;
  }
}
async function persistQueryClientSave({
  queryClient,
  persister,
  buster = "",
  dehydrateOptions
}) {
  const persistClient = {
    buster,
    timestamp: Date.now(),
    clientState: dehydrate(queryClient, dehydrateOptions)
  };
  await persister.persistClient(persistClient);
}
function persistQueryClientSubscribe(props) {
  const unsubscribeQueryCache = props.queryClient.getQueryCache().subscribe((event) => {
    if (isCacheEventType(event.type)) {
      persistQueryClientSave(props);
    }
  });
  const unsubscribeMutationCache = props.queryClient.getMutationCache().subscribe((event) => {
    if (isCacheEventType(event.type)) {
      persistQueryClientSave(props);
    }
  });
  return () => {
    unsubscribeQueryCache();
    unsubscribeMutationCache();
  };
}
function persistQueryClient(props) {
  let hasUnsubscribed = false;
  let persistQueryClientUnsubscribe;
  const unsubscribe = () => {
    hasUnsubscribed = true;
    persistQueryClientUnsubscribe?.();
  };
  const restorePromise = persistQueryClientRestore(props).then(() => {
    if (!hasUnsubscribed) {
      persistQueryClientUnsubscribe = persistQueryClientSubscribe(props);
    }
  });
  return [unsubscribe, restorePromise];
}

// src/utils.ts
function noop() {
}

// src/index.ts
function createSyncStoragePersister({
  storage,
  key = `REACT_QUERY_OFFLINE_CACHE`,
  throttleTime = 1e3,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  retry
}) {
  if (storage) {
    const trySave = (persistedClient) => {
      try {
        storage.setItem(key, serialize(persistedClient));
        return;
      } catch (error) {
        return error;
      }
    };
    return {
      persistClient: throttle((persistedClient) => {
        let client = persistedClient;
        let error = trySave(client);
        let errorCount = 0;
        while (error && client) {
          errorCount++;
          client = retry?.({
            persistedClient: client,
            error,
            errorCount
          });
          if (client) {
            error = trySave(client);
          }
        }
      }, throttleTime),
      restoreClient: () => {
        const cacheString = storage.getItem(key);
        if (!cacheString) {
          return;
        }
        return deserialize(cacheString);
      },
      removeClient: () => {
        storage.removeItem(key);
      }
    };
  }
  return {
    persistClient: noop,
    restoreClient: noop,
    removeClient: noop
  };
}
function throttle(func, wait = 100) {
  let timer = null;
  let params;
  return function(...args) {
    params = args;
    if (timer === null) {
      timer = setTimeout(() => {
        func(...params);
        timer = null;
      }, wait);
    }
  };
}

const {QueryClient} = await importShared('@tanstack/react-query');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
});
const persister = createSyncStoragePersister({
  storage: window.localStorage
});
persistQueryClient({
  queryClient,
  persister
});

export { persistQueryClientSubscribe as a, queryClient as default, persistQueryClientRestore as p, persister, queryClient };
