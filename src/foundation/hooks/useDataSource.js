import React from "react";

import { CustomStore } from "devextreme/common/data";


export default function useDataSource(application) {
  

  const dataSource = React.useMemo(() => {
    const store = new CustomStore({
      key: 'id',
      load: async (loadOptions) => {
        const limit = loadOptions.take;
        const offset = loadOptions.skip;
        const token = localStorage.getItem("token");
    
        const baseUrl = import.meta.env.VITE_BASE_URL;
    
        let searchQuery = "";
        
        if (loadOptions.filter) {
          const [, operator, value] = loadOptions.filter;
          if (operator === "contains") {
            searchQuery = `&search=${encodeURIComponent(value)}`;
          }
        }

        if (loadOptions.searchValue) {
          searchQuery = `&search=${encodeURIComponent(loadOptions.searchValue)}`;
        }
    
        const url = `${baseUrl}/${application}/?limit=${limit}&offset=${offset}&${searchQuery}`;
    
        const response = await fetch(url, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
    
        const data = await response.json();
    
        return {
          data: data.results,
          totalCount: data.count,
        };
      },
    });

    // gridRef.current = store;
    return store;
  }, [application]);

  const gridRef = React.useRef(dataSource);

  const onRefresh = () => {
    gridRef.current?.instance?.refresh();
  };

  return {gridRef, dataSource, onRefresh}
}

