import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

interface stringifyOptionsTypes {
  [x: string]: any
}

export function stringifyOptions(options: stringifyOptionsTypes) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, '');
}

export const setCookie = (name: string, value: string | number | boolean, options: any) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: '/',
    ...options
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5
  ).toUTCString();

  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + stringifyOptions(optionsWithDefaults);
};

export const getCookie = (name: string, initialValue = '') => {
  return (
    (isBrowser &&
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, '')) ||
    initialValue
  );
};

export function removeCookie(name: string) {
  if (isBrowser) {
    document.cookie = `${name}=; expires=${new Date(0)}`;
  }
}

export default function useCookie(key: any, initialValue?: string | any | undefined) {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = (value: string, options: any) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem] as const;
}

// contoh setItem(JSON.stringify(state), { path: '/', maxAge: 60 * 60 * 24 * 365 })
