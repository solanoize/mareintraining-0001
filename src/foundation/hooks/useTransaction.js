import React from "react";
import { parseInput, requestBuilder, urlParameterBuilder } from "../services";
import { ensureIsPlainObject } from "../services/validations";

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function useTransaction(application, initialize={}) {
  const [object, setObject] = React.useState(initialize);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onInit = React.useCallback((value) => {
    if (ensureIsPlainObject(value)) {
      setObject(value);
    }
  }, []);

  const onDetail = React.useCallback(async (id) => {
      setError(null);
      setLoading(true);
  
      try {
        const buildURL = urlParameterBuilder(`${BASE_URL}/${application}/`, [id])
        const response = await requestBuilder(buildURL, null, 'GET', true);
        setObject(response?.data);
        return Promise.resolve(response);
      } catch (error) {
        setError(error);
        return Promise.reject(error);
      }finally {
        setLoading(false);
      }
    }, [application]);
  

  const onSetField = React.useCallback((key, value) => {
    setObject((c) => ({...c, [key]: value}));
  }, []);

  const isDetail = React.useMemo(() => (object?.id ? true : false), [object]);

  const onCreate = async (payload) => {
    setError(null);
    setLoading(true)
    try {
      const response = await requestBuilder(`${BASE_URL}/${application}/`, payload, 'POST', true);
      onReset();
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  const onUpdate = async (id, payload) => {
    setError(null);
    setLoading(true)
    try {
      const buildURL = urlParameterBuilder(`${BASE_URL}/${application}/`, [id])
      const response = await requestBuilder(buildURL, payload, 'PUT', true);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async (id) => {
    setError(null);
    setLoading(true)
    try {
      const buildURL = urlParameterBuilder(`${BASE_URL}/${application}/`, [id]);
      const result = await requestBuilder(buildURL, null, 'DELETE', true);
      return Promise.resolve(result);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }

  const onCreateOrUpdate = async (payload) => {
    return isDetail
      ? onUpdate(object?.id, payload)
      : onCreate(payload);
  };

  const onReset = () => {
    setObject({});
  }

  const onChange = (e) => {
    const [name, value] = parseInput(e);
    const current = object ?? {};
    setObject({ ...current, [name]: value });
  }

  const onValueChange = React.useCallback((value, key) => {
    console.log(key, value)
    setObject(c => ({ ...c, [key]: value }));
  }, []);

  return {
    object,
    error,
    loading,
    isDetail,
    onInit,
    onSetField,
    onCreate,
    onUpdate,
    onDelete,
    onCreateOrUpdate,
    onReset,
    onChange,
    onValueChange,
    onDetail
  }
}