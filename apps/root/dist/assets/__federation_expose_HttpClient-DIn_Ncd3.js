import { importShared } from './__federation_fn_import-BgsQVGK0.js';
import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';

var debounce$1 = {exports: {}};

var hasRequiredDebounce;

function requireDebounce () {
	if (hasRequiredDebounce) return debounce$1.exports;
	hasRequiredDebounce = 1;
	function debounce(function_, wait = 100, options = {}) {
		if (typeof function_ !== 'function') {
			throw new TypeError(`Expected the first parameter to be a function, got \`${typeof function_}\`.`);
		}

		if (wait < 0) {
			throw new RangeError('`wait` must not be negative.');
		}

		// TODO: Deprecate the boolean parameter at some point.
		const {immediate} = typeof options === 'boolean' ? {immediate: options} : options;

		let storedContext;
		let storedArguments;
		let timeoutId;
		let timestamp;
		let result;

		function run() {
			const callContext = storedContext;
			const callArguments = storedArguments;
			storedContext = undefined;
			storedArguments = undefined;
			result = function_.apply(callContext, callArguments);
			return result;
		}

		function later() {
			const last = Date.now() - timestamp;

			if (last < wait && last >= 0) {
				timeoutId = setTimeout(later, wait - last);
			} else {
				timeoutId = undefined;

				if (!immediate) {
					result = run();
				}
			}
		}

		const debounced = function (...arguments_) {
			if (
				storedContext
				&& this !== storedContext
				&& Object.getPrototypeOf(this) === Object.getPrototypeOf(storedContext)
			) {
				throw new Error('Debounced method called with different contexts of the same prototype.');
			}

			storedContext = this; // eslint-disable-line unicorn/no-this-assignment
			storedArguments = arguments_;
			timestamp = Date.now();

			const callNow = immediate && !timeoutId;

			if (!timeoutId) {
				timeoutId = setTimeout(later, wait);
			}

			if (callNow) {
				result = run();
			}

			return result;
		};

		Object.defineProperty(debounced, 'isPending', {
			get() {
				return timeoutId !== undefined;
			},
		});

		debounced.clear = () => {
			if (!timeoutId) {
				return;
			}

			clearTimeout(timeoutId);
			timeoutId = undefined;
		};

		debounced.flush = () => {
			if (!timeoutId) {
				return;
			}

			debounced.trigger();
		};

		debounced.trigger = () => {
			result = run();

			debounced.clear();
		};

		return debounced;
	}

	// Adds compatibility for ES modules
	debounce$1.exports.debounce = debounce;

	debounce$1.exports = debounce;
	return debounce$1.exports;
}

var debounceExports = /*@__PURE__*/ requireDebounce();
const debounce = /*@__PURE__*/getDefaultExportFromCjs(debounceExports);

const {message} = await importShared('antd');

const axios = await importShared('axios');
const httpClient = axios.create({
  baseURL: "https://dummyjson.com"
});
const messageError = debounce((msg) => message.error(msg, 5), 500);
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorMessage = error?.response?.data?.message;
    if (error?.code === "ERR_NETWORK") {
      messageError("No hay conexión con el servidor");
    }
    if ([401].some((status) => status === error.status)) {
      messageError(
        errorMessage === "Unauthorized" ? "La sessión ha finalizado, ingrese nuevamente" : errorMessage
      );
    }
    if ([400, 404, 422, 500].some((status) => status === error.status)) {
      messageError(errorMessage || "Error en el servidor");
    }
    return Promise.reject(error);
  }
);
const sessionToken = localStorage.getItem("token");
const setToken = (token, isFirstTime = false) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  if (!tokenInLocalStorage && !isFirstTime) {
    localStorage.setItem("token", token);
  }
  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
setToken(sessionToken, true);

export { httpClient as default, setToken };
