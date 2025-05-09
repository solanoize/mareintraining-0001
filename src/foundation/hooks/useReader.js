import React from "react";
import { requestBuilder, urlBuilder, urlParameterBuilder } from "../services/httpx";
import { ensureIsArray, ensureIsPlainObject } from "../services/validations";


export default function useReader(url) {
  const [collection, setCollection] = React.useState([]);
  const [object, setObject] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [currentURL, setCurrentURL] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    next: null,
    previous: null,
  });

  const onList = React.useCallback(async (customURL, params) => {
    setError(null);
    setLoading(true);
    try {
      const buildURL = urlBuilder(url, customURL, params)
      const response = await requestBuilder(buildURL, null, "GET", true);

      const paging = {};
      paging.next = response?.data?.next;
      paging.previous = response?.data?.previous;

      setPagination(paging);
      setCollection(response?.data?.results);
      setCurrentURL(response?.url);

      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const onDetail = React.useCallback(async (id) => {
    setError(null);
    setLoading(true);

    try {
      const buildURL = urlParameterBuilder(url, [id])
      const response = await requestBuilder(buildURL, null, 'GET', true);
      setObject(response?.data);
      return Promise.resolve(response);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    }finally {
      setLoading(false);
    }
  }, [url]);

  const onFillObject = React.useCallback((value) => {
    if (ensureIsPlainObject(value)) {
      setObject(value);
    }
  }, []);

  const onFillCollection = React.useCallback((values) => {
    if (ensureIsArray(values)) {
      setCollection(values);
    }
  }, []);

  const isEmptyCollection = React.useMemo(() => {
    return collection.length <= 0;
  }, [collection]);

  const isSelected = React.useMemo(() => {
    return object?.id ? true : false
  }, [object?.id]);

  const onPurgeObject = () => {
    setObject({});
  }

  const onPurgeCollection = () => {
    setCollection([]);
  }

  const onRefresh = (isCurrent) => {
    if (isCurrent) {
      onList(currentURL)
    } else {
      onList();
    }
  }

  const onSelectObject = (value) => {
    if (isSelected && value?.id === object?.id) {
      onPurgeObject();
    } else {
      onFillObject(value);
    }
  }

  return {
    collection,
    object,
    error,
    pagination,
    loading,
    currentURL,
    isEmptyCollection,
    isSelected,

    onList,
    onDetail,
    onFillCollection,
    onFillObject,
    onPurgeObject,
    onPurgeCollection,
    onRefresh,
    onSelectObject,
  }
}
