import { j as jsxRuntimeExports } from './jsx-runtime-CvJTHeKY.js';
import { importShared } from './__federation_fn_import-43Vb2UVn.js';

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
                    '@ant-design/icons':{'undefined':{get:()=>get(new URL('__federation_shared_@ant-design/icons-DU8bJ7TK.js', import.meta.url).href), loaded:1}},'@tanstack/react-query':{'undefined':{get:()=>get(new URL('__federation_shared_@tanstack/react-query-BKmDD9O3.js', import.meta.url).href), loaded:1}},'antd':{'undefined':{get:()=>get(new URL('__federation_shared_antd-XjSWEq03.js', import.meta.url).href), loaded:1}},'react':{'undefined':{get:()=>get(new URL('__federation_shared_react-DoKb58Ht.js', import.meta.url).href), loaded:1}},'react-dom':{'undefined':{get:()=>get(new URL('__federation_shared_react-dom-pEkape4k.js', import.meta.url).href), loaded:1}}
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
  users: "users"};

const __federation_var_dacodesroothttpClient = await __federation_method_getRemote("@dacodes/root" , "./httpClient");
 let httpClient = __federation_method_unwrapDefault(__federation_var_dacodesroothttpClient); 
const profilesService = {
  async getProfileById(id) {
    return httpClient.get(`/users/${id}`).then((response) => response.data);
  }
};

const {useQuery} = await importShared('@tanstack/react-query');
function useProfiles() {
  const profilesGetById = (id) => useQuery({
    queryKey: [e.users, "profiles", id],
    queryFn: () => profilesService.getProfileById(id)
  });
  return {
    profilesGetById
  };
}

const {LeftCircleOutlined} = await importShared('@ant-design/icons');
const __federation_var_dacodesrootqueryClient = await __federation_method_getRemote("@dacodes/root" , "./queryClient");
 let queryClient = __federation_method_unwrapDefault(__federation_var_dacodesrootqueryClient); 
const {Alert,Button,Descriptions,Spin} = await importShared('antd');

const {useMemo} = await importShared('react');
function ProfileView() {
  const profileId = window.location.pathname.split("/")[2];
  const { profilesGetById } = useProfiles();
  const { data, isLoading, isFetched } = profilesGetById(+profileId);
  const items = useMemo(
    () => !data ? [] : [
      {
        key: "id",
        label: "id",
        children: data.id
      },
      {
        key: "firstName",
        label: "Nombre",
        children: data.firstName
      },
      {
        key: "lastName",
        label: "Apellido",
        children: data.lastName
      },
      {
        key: "maidenName",
        label: "Apellido de soltera",
        children: data.maidenName
      },
      {
        key: "age",
        label: "Edad",
        children: data.age
      },
      {
        key: "gender",
        label: "Género",
        children: data.gender
      },
      {
        key: "email",
        label: "Correo electrónico",
        children: data.email
      },
      {
        key: "phone",
        label: "Teléfono",
        children: data.phone
      },
      {
        key: "username",
        label: "Nombre de usuario",
        children: data.username
      },
      {
        key: "birthDate",
        label: "Fecha de nacimiento",
        children: data.birthDate
      },
      {
        key: "image",
        label: "Imagen",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.image,
            alt: "User",
            style: { width: 100, height: 100 }
          }
        )
      },
      {
        key: "bloodGroup",
        label: "Grupo sanguíneo",
        children: data.bloodGroup
      },
      {
        key: "height",
        label: "Altura (cm)",
        children: data.height
      },
      {
        key: "weight",
        label: "Peso (kg)",
        children: data.weight
      },
      {
        key: "eyeColor",
        label: "Color de ojos",
        children: data.eyeColor
      },
      {
        key: "hairColor",
        label: "Color de cabello",
        children: data.hair.color
      },
      {
        key: "hairType",
        label: "Tipo de cabello",
        children: data.hair.type
      },
      {
        key: "ip",
        label: "IP Address",
        children: data.ip
      },
      {
        key: "address",
        label: "Dirección",
        children: `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.postalCode}, ${data.address.country}`
      },
      {
        key: "macAddress",
        label: "Dirección MAC",
        children: data.macAddress
      },
      {
        key: "university",
        label: "Universidad",
        children: data.university
      },
      {
        key: "bankCardExpire",
        label: "Tarjeta Expira",
        children: data.bank.cardExpire
      },
      {
        key: "bankCardNumber",
        label: "Número de tarjeta bancaria",
        children: data.bank.cardNumber
      },
      {
        key: "bankCardType",
        label: "Tipo de tarjeta bancaria",
        children: data.bank.cardType
      },
      {
        key: "bankCurrency",
        label: "Moneda bancaria",
        children: data.bank.currency
      },
      {
        key: "bankIban",
        label: "IBAN bancario",
        children: data.bank.iban
      },
      {
        key: "companyDepartment",
        label: "Departamento de la empresa",
        children: data.company.department
      },
      {
        key: "companyName",
        label: "Nombre de la empresa",
        children: data.company.name
      },
      {
        key: "companyTitle",
        label: "Título de la empresa",
        children: data.company.title
      },
      {
        key: "companyAddress",
        label: "Dirección de la empresa",
        children: `${data.company.address.address}, ${data.company.address.city}, ${data.company.address.state}, ${data.company.address.postalCode}, ${data.company.address.country}`
      },
      {
        key: "ein",
        label: "EIN",
        children: data.ein
      },
      {
        key: "ssn",
        label: "SSN",
        children: data.ssn
      },
      {
        key: "userAgent",
        label: "User Agent",
        children: data.userAgent
      },
      {
        key: "cryptoCoin",
        label: "Moneda de criptomonedas",
        children: data.crypto.coin
      },
      {
        key: "cryptoWallet",
        label: "Billetera de criptomonedas",
        children: data.crypto.wallet
      },
      {
        key: "cryptoNetwork",
        label: "Red de criptomonedas",
        children: data.crypto.network
      },
      {
        key: "role",
        label: "Rol del usuario",
        children: data.role
      }
    ],
    [data]
  );
  const handleBack = () => {
    queryClient.setQueryData([e.navigate], "/directory");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "my-8", onClick: handleBack, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCircleOutlined, {}),
      "Volver"
    ] }),
    data && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { spinning: true, size: "large" }),
    !data && isFetched && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Alert,
      {
        showIcon: true,
        className: "w-fit",
        message: "No se encontró el usuario",
        type: "error"
      }
    ),
    data && /* @__PURE__ */ jsxRuntimeExports.jsx(Descriptions, { title: "Información de usuario", bordered: true, items })
  ] });
}

const __federation_var_dacodesrootAppProvider = await __federation_method_getRemote("@dacodes/root" , "./AppProvider");
 let AppProvider = __federation_method_unwrapDefault(__federation_var_dacodesrootAppProvider); 
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, {}) });
}

export { App as default };
