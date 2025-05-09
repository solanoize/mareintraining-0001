import React from "react";
import { ensureIsPlainObject } from "../services/validations";

export default function useGroup() {
  const [keys, setKeys] = React.useState([]);
  const [object, setObject] = React.useState({});
  const [groups, setGroups] = React.useState({});

  const onGroup = React.useCallback((basedOn, entries) => {
    const grouped = Object.groupBy(entries, (item) => item?.[basedOn]);
    const keyGroups = Object.keys(grouped);
    setGroups(grouped);
    setKeys(keyGroups);
  }, []);

  const onFillObject = React.useCallback((value) => {
    if (ensureIsPlainObject(value)) {
      setObject(value);
    }
  }, []);

  const isSelected = React.useMemo(() => {
    return object?.id ? true : false;
  }, [object?.id]);

  const onPurgeObject = () => {
    setObject({});
  };

  const onSelectObject = (value) => {
    if (isSelected && value?.id === object?.id) {
      onPurgeObject();
    } else {
      onFillObject(value);
    }
  };

  return {
    keys, 
    groups,
    object,
    isSelected,
    onSelectObject,
    onPurgeObject,
    onGroup,
    onFillObject,
  }
}
