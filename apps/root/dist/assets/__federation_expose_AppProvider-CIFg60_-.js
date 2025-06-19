import { j as jsxRuntimeExports } from './jsx-runtime-CvJTHeKY.js';
import { T as ThemeProvider, P as PersistQueryClientProvider } from './Theme-8ksxvJAj.js';
import { persister, queryClient } from './__federation_expose_QueryClient-CxrNhLQ-.js';

function AppProvider({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PersistQueryClientProvider,
    {
      client: queryClient,
      persistOptions: { persister },
      children
    }
  ) });
}

export { AppProvider as default };
