import { importShared } from './__federation_fn_import-BgsQVGK0.js';
import { queryClient } from './__federation_expose_QueryClient-CxrNhLQ-.js';

const {useCallback} = await importShared('react');
function useNotify() {
  const api = queryClient.getQueryData(["notify"]);
  return useCallback(
    ({
      message,
      placement = "bottomRight",
      type = "success",
      description
    }) => {
      api[type]({
        message,
        description,
        placement
      });
    },
    []
  );
}

export { useNotify as default };
