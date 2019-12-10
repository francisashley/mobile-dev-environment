import { isNil } from "lodash";

/**
 * State
 *
 * @description handles short term and persisted stated.
 *
 * @feature store value in memory
 * @feature store value in cache (localstorage)
 * @feature retrieve value in memory w/ support for default fall back
 * @feature retrieve value in cache (localstorage) w/ support for default fall back
 * @feature return variable with the type it was saved as
 */

export default function state(namespace = "global") {
  let state = {};

  return {
    get: (key, { defaultValue, cache = false } = {}) => {
      let value;

      if (cache) value = localStorage.getItem(`mde-${namespace}-${key}`);
      else value = state[key];

      if (isNil(value) && !isNil(defaultValue)) return defaultValue;
      if (isNil(value)) return null;

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
    getCache: (key, defaultValue) => {
      let value = localStorage.getItem(`mde-${namespace}-${key}`);

      if (isNil(value) && !isNil(defaultValue)) return defaultValue;
      if (isNil(value)) return null;

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
    set: (key, value, { cache = false } = {}) => {
      if (cache) {
        localStorage.setItem(`mde-${namespace}-${key}`, JSON.stringify(value));
        value = localStorage.getItem(`mde-${namespace}-${key}`);
      } else {
        value = state[key] = value;
      }

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
    setCache: (key, value) => {
      localStorage.setItem(`mde-${namespace}-${key}`, JSON.stringify(value));
      value = localStorage.getItem(`mde-${namespace}-${key}`);

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  };
}
