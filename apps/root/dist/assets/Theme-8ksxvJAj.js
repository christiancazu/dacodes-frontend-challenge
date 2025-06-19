import { importShared } from './__federation_fn_import-BgsQVGK0.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CvJTHeKY.js';
import { p as persistQueryClientRestore, a as persistQueryClientSubscribe } from './__federation_expose_QueryClient-CxrNhLQ-.js';
import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';

// src/PersistQueryClientProvider.tsx
const React = await importShared('react');
const {IsRestoringProvider,QueryClientProvider} = await importShared('@tanstack/react-query');
var PersistQueryClientProvider = ({
  children,
  persistOptions,
  onSuccess,
  onError,
  ...props
}) => {
  const [isRestoring, setIsRestoring] = React.useState(true);
  const refs = React.useRef({ persistOptions, onSuccess, onError });
  const didRestore = React.useRef(false);
  React.useEffect(() => {
    refs.current = { persistOptions, onSuccess, onError };
  });
  React.useEffect(() => {
    const options = {
      ...refs.current.persistOptions,
      queryClient: props.client
    };
    if (!didRestore.current) {
      didRestore.current = true;
      persistQueryClientRestore(options).then(() => refs.current.onSuccess?.()).catch(() => refs.current.onError?.()).finally(() => {
        setIsRestoring(false);
      });
    }
    return isRestoring ? void 0 : persistQueryClientSubscribe(options);
  }, [props.client, isRestoring]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IsRestoringProvider, { value: isRestoring, children }) });
};

var es_ES$6 = {};

var interopRequireDefault = {exports: {}};

var hasRequiredInteropRequireDefault;

function requireInteropRequireDefault () {
	if (hasRequiredInteropRequireDefault) return interopRequireDefault.exports;
	hasRequiredInteropRequireDefault = 1;
	(function (module) {
		function _interopRequireDefault(e) {
		  return e && e.__esModule ? e : {
		    "default": e
		  };
		}
		module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (interopRequireDefault));
	return interopRequireDefault.exports;
}

var es_ES$5 = {};

var hasRequiredEs_ES$6;

function requireEs_ES$6 () {
	if (hasRequiredEs_ES$6) return es_ES$5;
	hasRequiredEs_ES$6 = 1;

	Object.defineProperty(es_ES$5, "__esModule", {
	  value: true
	});
	es_ES$5.default = void 0;
	var locale = {
	  // Options
	  items_per_page: '/ página',
	  jump_to: 'Ir a',
	  jump_to_confirm: 'confirmar',
	  page: 'Página',
	  // Pagination
	  prev_page: 'Página anterior',
	  next_page: 'Página siguiente',
	  prev_5: '5 páginas previas',
	  next_5: '5 páginas siguientes',
	  prev_3: '3 páginas previas',
	  next_3: '3 páginas siguientes',
	  page_size: 'tamaño de página'
	};
	es_ES$5.default = locale;
	return es_ES$5;
}

var es_ES$4 = {};

var es_ES$3 = {};

var es_ES$2 = {};

var objectSpread2 = {exports: {}};

var defineProperty = {exports: {}};

var toPropertyKey = {exports: {}};

var _typeof = {exports: {}};

var hasRequired_typeof;

function require_typeof () {
	if (hasRequired_typeof) return _typeof.exports;
	hasRequired_typeof = 1;
	(function (module) {
		function _typeof(o) {
		  "@babel/helpers - typeof";

		  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
		    return typeof o;
		  } : function (o) {
		    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
		}
		module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (_typeof));
	return _typeof.exports;
}

var toPrimitive = {exports: {}};

var hasRequiredToPrimitive;

function requireToPrimitive () {
	if (hasRequiredToPrimitive) return toPrimitive.exports;
	hasRequiredToPrimitive = 1;
	(function (module) {
		var _typeof = require_typeof()["default"];
		function toPrimitive(t, r) {
		  if ("object" != _typeof(t) || !t) return t;
		  var e = t[Symbol.toPrimitive];
		  if (void 0 !== e) {
		    var i = e.call(t, r || "default");
		    if ("object" != _typeof(i)) return i;
		    throw new TypeError("@@toPrimitive must return a primitive value.");
		  }
		  return ("string" === r ? String : Number)(t);
		}
		module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (toPrimitive));
	return toPrimitive.exports;
}

var hasRequiredToPropertyKey;

function requireToPropertyKey () {
	if (hasRequiredToPropertyKey) return toPropertyKey.exports;
	hasRequiredToPropertyKey = 1;
	(function (module) {
		var _typeof = require_typeof()["default"];
		var toPrimitive = requireToPrimitive();
		function toPropertyKey(t) {
		  var i = toPrimitive(t, "string");
		  return "symbol" == _typeof(i) ? i : i + "";
		}
		module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (toPropertyKey));
	return toPropertyKey.exports;
}

var hasRequiredDefineProperty;

function requireDefineProperty () {
	if (hasRequiredDefineProperty) return defineProperty.exports;
	hasRequiredDefineProperty = 1;
	(function (module) {
		var toPropertyKey = requireToPropertyKey();
		function _defineProperty(e, r, t) {
		  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		    value: t,
		    enumerable: true,
		    configurable: true,
		    writable: true
		  }) : e[r] = t, e;
		}
		module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (defineProperty));
	return defineProperty.exports;
}

var hasRequiredObjectSpread2;

function requireObjectSpread2 () {
	if (hasRequiredObjectSpread2) return objectSpread2.exports;
	hasRequiredObjectSpread2 = 1;
	(function (module) {
		var defineProperty = requireDefineProperty();
		function ownKeys(e, r) {
		  var t = Object.keys(e);
		  if (Object.getOwnPropertySymbols) {
		    var o = Object.getOwnPropertySymbols(e);
		    r && (o = o.filter(function (r) {
		      return Object.getOwnPropertyDescriptor(e, r).enumerable;
		    })), t.push.apply(t, o);
		  }
		  return t;
		}
		function _objectSpread2(e) {
		  for (var r = 1; r < arguments.length; r++) {
		    var t = null != arguments[r] ? arguments[r] : {};
		    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
		      defineProperty(e, r, t[r]);
		    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
		      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		    });
		  }
		  return e;
		}
		module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports; 
	} (objectSpread2));
	return objectSpread2.exports;
}

var common = {};

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;

	Object.defineProperty(common, "__esModule", {
	  value: true
	});
	common.commonLocale = void 0;
	common.commonLocale = {
	  yearFormat: 'YYYY',
	  dayFormat: 'D',
	  cellMeridiemFormat: 'A',
	  monthBeforeYear: true
	};
	return common;
}

var hasRequiredEs_ES$5;

function requireEs_ES$5 () {
	if (hasRequiredEs_ES$5) return es_ES$2;
	hasRequiredEs_ES$5 = 1;

	var _interopRequireDefault = requireInteropRequireDefault().default;
	Object.defineProperty(es_ES$2, "__esModule", {
	  value: true
	});
	es_ES$2.default = void 0;
	var _objectSpread2 = _interopRequireDefault(requireObjectSpread2());
	var _common = requireCommon();
	var locale = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _common.commonLocale), {}, {
	  locale: 'es_ES',
	  today: 'Hoy',
	  now: 'Ahora',
	  backToToday: 'Volver a hoy',
	  ok: 'Aceptar',
	  clear: 'Limpiar',
	  week: 'Semana',
	  month: 'Mes',
	  year: 'Año',
	  timeSelect: 'Seleccionar hora',
	  dateSelect: 'Seleccionar fecha',
	  monthSelect: 'Elegir un mes',
	  yearSelect: 'Elegir un año',
	  decadeSelect: 'Elegir una década',
	  dateFormat: 'D/M/YYYY',
	  dateTimeFormat: 'D/M/YYYY HH:mm:ss',
	  previousMonth: 'Mes anterior (PageUp)',
	  nextMonth: 'Mes siguiente (PageDown)',
	  previousYear: 'Año anterior (Control + left)',
	  nextYear: 'Año siguiente (Control + right)',
	  previousDecade: 'Década anterior',
	  nextDecade: 'Década siguiente',
	  previousCentury: 'Siglo anterior',
	  nextCentury: 'Siglo siguiente'
	});
	es_ES$2.default = locale;
	return es_ES$2;
}

var es_ES$1 = {};

var hasRequiredEs_ES$4;

function requireEs_ES$4 () {
	if (hasRequiredEs_ES$4) return es_ES$1;
	hasRequiredEs_ES$4 = 1;

	Object.defineProperty(es_ES$1, "__esModule", {
	  value: true
	});
	es_ES$1.default = void 0;
	const locale = {
	  placeholder: 'Seleccionar hora'
	};
	es_ES$1.default = locale;
	return es_ES$1;
}

var hasRequiredEs_ES$3;

function requireEs_ES$3 () {
	if (hasRequiredEs_ES$3) return es_ES$3;
	hasRequiredEs_ES$3 = 1;

	var _interopRequireDefault = requireInteropRequireDefault().default;
	Object.defineProperty(es_ES$3, "__esModule", {
	  value: true
	});
	es_ES$3.default = void 0;
	var _es_ES = _interopRequireDefault(requireEs_ES$5());
	var _es_ES2 = _interopRequireDefault(/*@__PURE__*/ requireEs_ES$4());
	// Merge into a locale object
	const locale = {
	  lang: Object.assign({
	    placeholder: 'Seleccionar fecha',
	    rangePlaceholder: ['Fecha inicial', 'Fecha final'],
	    shortWeekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
	    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
	  }, _es_ES.default),
	  timePickerLocale: Object.assign({}, _es_ES2.default)
	};
	// All settings at:
	// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
	es_ES$3.default = locale;
	return es_ES$3;
}

var hasRequiredEs_ES$2;

function requireEs_ES$2 () {
	if (hasRequiredEs_ES$2) return es_ES$4;
	hasRequiredEs_ES$2 = 1;

	var _interopRequireDefault = requireInteropRequireDefault().default;
	Object.defineProperty(es_ES$4, "__esModule", {
	  value: true
	});
	es_ES$4.default = void 0;
	var _es_ES = _interopRequireDefault(/*@__PURE__*/ requireEs_ES$3());
	es_ES$4.default = _es_ES.default;
	return es_ES$4;
}

var hasRequiredEs_ES$1;

function requireEs_ES$1 () {
	if (hasRequiredEs_ES$1) return es_ES$6;
	hasRequiredEs_ES$1 = 1;

	var _interopRequireDefault = requireInteropRequireDefault().default;
	Object.defineProperty(es_ES$6, "__esModule", {
	  value: true
	});
	es_ES$6.default = void 0;
	var _es_ES = _interopRequireDefault(requireEs_ES$6());
	var _es_ES2 = _interopRequireDefault(/*@__PURE__*/ requireEs_ES$2());
	var _es_ES3 = _interopRequireDefault(/*@__PURE__*/ requireEs_ES$3());
	var _es_ES4 = _interopRequireDefault(/*@__PURE__*/ requireEs_ES$4());
	const typeTemplate = '${label} no es un ${type} válido';
	const localeValues = {
	  locale: 'es',
	  Pagination: _es_ES.default,
	  DatePicker: _es_ES3.default,
	  TimePicker: _es_ES4.default,
	  Calendar: _es_ES2.default,
	  global: {
	    placeholder: 'Seleccione',
	    close: 'Cerrar'
	  },
	  Table: {
	    filterTitle: 'Filtrar menú',
	    filterConfirm: 'Aceptar',
	    filterReset: 'Reiniciar',
	    filterEmptyText: 'Sin filtros',
	    filterCheckAll: 'Seleccionar todo',
	    filterSearchPlaceholder: 'Buscar en filtros',
	    emptyText: 'Sin datos',
	    selectAll: 'Seleccionar todo',
	    selectInvert: 'Invertir selección',
	    selectNone: 'Vacíe todo',
	    selectionAll: 'Seleccionar todos los datos',
	    sortTitle: 'Ordenar',
	    expand: 'Expandir fila',
	    collapse: 'Colapsar fila',
	    triggerDesc: 'Click para ordenar en orden descendente',
	    triggerAsc: 'Click para ordenar en orden ascendente',
	    cancelSort: 'Click para cancelar ordenamiento'
	  },
	  Tour: {
	    Next: 'Siguiente',
	    Previous: 'Anterior',
	    Finish: 'Finalizar'
	  },
	  Modal: {
	    okText: 'Aceptar',
	    cancelText: 'Cancelar',
	    justOkText: 'Aceptar'
	  },
	  Popconfirm: {
	    okText: 'Aceptar',
	    cancelText: 'Cancelar'
	  },
	  Transfer: {
	    titles: ['', ''],
	    searchPlaceholder: 'Buscar aquí',
	    itemUnit: 'elemento',
	    itemsUnit: 'elementos',
	    remove: 'Eliminar',
	    selectCurrent: 'Seleccionar página actual',
	    removeCurrent: 'Eliminar página actual',
	    selectAll: 'Seleccionar todos los datos',
	    removeAll: 'Eliminar todos los datos',
	    selectInvert: 'Invertir página actual'
	  },
	  Upload: {
	    uploading: 'Subiendo...',
	    removeFile: 'Eliminar archivo',
	    uploadError: 'Error al subir el archivo',
	    previewFile: 'Vista previa',
	    downloadFile: 'Descargar archivo'
	  },
	  Empty: {
	    description: 'No hay datos'
	  },
	  Icon: {
	    icon: 'ícono'
	  },
	  Text: {
	    edit: 'Editar',
	    copy: 'Copiar',
	    copied: 'Copiado',
	    expand: 'Expandir'
	  },
	  Form: {
	    optional: '(opcional)',
	    defaultValidateMessages: {
	      default: 'Error de validación del campo ${label}',
	      required: 'Por favor, rellena ${label}',
	      enum: '${label} debe ser uno de [${enum}]',
	      whitespace: '${label} no puede ser un carácter en blanco',
	      date: {
	        format: 'El formato de fecha de ${label} es inválido',
	        parse: '${label} no se puede convertir a una fecha',
	        invalid: '${label} es una fecha inválida'
	      },
	      types: {
	        string: typeTemplate,
	        method: typeTemplate,
	        array: typeTemplate,
	        object: typeTemplate,
	        number: typeTemplate,
	        date: typeTemplate,
	        boolean: typeTemplate,
	        integer: typeTemplate,
	        float: typeTemplate,
	        regexp: typeTemplate,
	        email: typeTemplate,
	        url: typeTemplate,
	        hex: typeTemplate
	      },
	      string: {
	        len: '${label} debe tener ${len} caracteres',
	        min: '${label} debe tener al menos ${min} caracteres',
	        max: '${label} debe tener hasta ${max} caracteres',
	        range: '${label} debe tener entre ${min}-${max} caracteres'
	      },
	      number: {
	        len: '${label} debe ser igual a ${len}',
	        min: '${label} valor mínimo es ${min}',
	        max: '${label} valor máximo es ${max}',
	        range: '${label} debe ser entre ${min}-${max}'
	      },
	      array: {
	        len: 'Debe ser ${len} ${label}',
	        min: 'Al menos ${min} ${label}',
	        max: 'Como máximo ${max} ${label}',
	        range: 'El valor de ${label} debe estar entre ${min}-${max}'
	      },
	      pattern: {
	        mismatch: '${label} no coincide con el patrón ${pattern}'
	      }
	    }
	  },
	  Image: {
	    preview: 'Previsualización'
	  }
	};
	es_ES$6.default = localeValues;
	return es_ES$6;
}

var es_ES;
var hasRequiredEs_ES;

function requireEs_ES () {
	if (hasRequiredEs_ES) return es_ES;
	hasRequiredEs_ES = 1;
	es_ES = /*@__PURE__*/ requireEs_ES$1();
	return es_ES;
}

var es_ESExports = /*@__PURE__*/ requireEs_ES();
const es = /*@__PURE__*/getDefaultExportFromCjs(es_ESExports);

const {ConfigProvider} = await importShared('antd');
function ThemeProvider({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ConfigProvider,
    {
      locale: es,
      theme: {
        cssVar: true,
        token: {
          fontFamily: "Assistant",
          colorPrimary: "#5240e2",
          colorText: "#333765"
        }
      },
      children
    }
  );
}

export { PersistQueryClientProvider as P, ThemeProvider as T };
