import { importShared } from './__federation_fn_import-BgsQVGK0.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CvJTHeKY.js';
import { u as useNavigate } from './index-DBuxqqkc.js';

const {Button,Flex,Typography} = await importShared('antd');
const NotFoundView = () => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Flex,
    {
      vertical: true,
      align: "center",
      justify: "center",
      style: { minHeight: "80vh" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { width: "300px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Title, { level: 3, className: "mb-5 text-center", children: "Esta página no existe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, type: "primary", onClick: () => navigate("/"), children: "Volver" })
      ] })
    }
  );
};

export { NotFoundView as default };
