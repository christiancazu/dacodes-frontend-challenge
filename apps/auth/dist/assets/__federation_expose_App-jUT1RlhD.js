import { j as jsxRuntimeExports } from './jsx-runtime-CvJTHeKY.js';
import { importShared } from './__federation_fn_import-CfsfP85Z.js';
import { aL as useForm } from './Form-B6EIjdzW.js';

const remotesMap = {
'@dacodes/root':{url:'dacodes.christiancazu.dev/assets/root.js',format:'esm',from:'vite'}
};
                const currentImports = {};

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    '@ant-design/icons':{'undefined':{get:()=>get(new URL('__federation_shared_@ant-design/icons-C3uIqSmX.js', import.meta.url).href), loaded:1}},'@tanstack/react-query':{'undefined':{get:()=>get(new URL('__federation_shared_@tanstack/react-query-BAU_tToE.js', import.meta.url).href), loaded:1}},'antd':{'undefined':{get:()=>get(new URL('__federation_shared_antd-BF8MpSOZ.js', import.meta.url).href), loaded:1}},'react':{'undefined':{get:()=>get(new URL('__federation_shared_react-DoKb58Ht.js', import.meta.url).href), loaded:1}},'react-dom':{'undefined':{get:()=>get(new URL('__federation_shared_react-dom-pEkape4k.js', import.meta.url).href), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_unwrapDefault(module) {
                    return (module?.__esModule || module?.[Symbol.toStringTag] === 'Module') ? module.default : module
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const e = {
  navigate: "navigate",
  auth: "auth"};

const __federation_var_dacodesroothttpClient = await __federation_method_getRemote("@dacodes/root" , "./httpClient");
 let httpClient = __federation_method_unwrapDefault(__federation_var_dacodesroothttpClient); 
 let {setToken} = __federation_var_dacodesroothttpClient;
const authService = {
  async login(dto) {
    return httpClient.post("/auth/login", dto).then((response) => {
      setToken(response.data.accessToken);
      return response.data;
    });
  }
};

const __federation_var_dacodesrootqueryClient$1 = await __federation_method_getRemote("@dacodes/root" , "./queryClient");
 let queryClient$1 = __federation_method_unwrapDefault(__federation_var_dacodesrootqueryClient$1); 
const __federation_var_dacodesrootuseNotify = await __federation_method_getRemote("@dacodes/root" , "./useNotify");
 let useNotify = __federation_method_unwrapDefault(__federation_var_dacodesrootuseNotify); 
const {useMutation} = await importShared('@tanstack/react-query');
function useAuth() {
  const notify = useNotify();
  const authLogin = () => useMutation({
    mutationKey: ["login"],
    mutationFn: (dto) => authService.login(dto),
    onError: () => {
      notify({
        type: "error",
        message: "El usuario o la contraseña son incorrectos"
      });
    },
    onSuccess: (res) => {
      notify({
        message: "La sesión se ha iniciado correctamente"
      });
      queryClient$1.setQueryData([e.auth], res);
    }
  });
  return {
    authLogin
  };
}

const AuthView$1 = "_AuthView_16r9i_1";
const classes = {
	AuthView: AuthView$1
};

const {KeyOutlined,UserOutlined} = await importShared('@ant-design/icons');
const __federation_var_dacodesrootqueryClient = await __federation_method_getRemote("@dacodes/root" , "./queryClient");
 let queryClient = __federation_method_unwrapDefault(__federation_var_dacodesrootqueryClient); 
const {Button,Flex,Form,Input,Typography} = await importShared('antd');
function AuthView() {
  const [form] = useForm();
  const { authLogin } = useAuth();
  const { mutateAsync, isPending } = authLogin();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { vertical: true, align: "center", justify: "center", className: classes.AuthView, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Title, { level: 3, children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Form,
      {
        onFinish: (v) => mutateAsync(v).then(() => {
          queryClient.setQueryData([e.navigate], "/directory");
        }),
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        autoComplete: "off",
        form,
        disabled: isPending,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Form.Item,
            {
              label: /* @__PURE__ */ jsxRuntimeExports.jsx(UserOutlined, {}),
              name: "username",
              rules: [{ required: true, message: "Por favor ingrese su usuario" }],
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "usuario" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Form.Item,
            {
              label: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyOutlined, {}),
              name: "password",
              rules: [
                { required: true, message: "Por favor ingrese su contraseña" }
              ],
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Password, { placeholder: "contraseña" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { label: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", htmlType: "submit", loading: isPending, children: "SIGN IN" }) })
        ]
      }
    )
  ] });
}

const __federation_var_dacodesrootAppProvider = await __federation_method_getRemote("@dacodes/root" , "./AppProvider");
 let AppProvider = __federation_method_unwrapDefault(__federation_var_dacodesrootAppProvider); 
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthView, {}) });
}

export { App as default };
