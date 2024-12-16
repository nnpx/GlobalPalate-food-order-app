// import { useCallback, useState, useEffect } from "react";

// async function sendHttpRequest(url, config) {
//   const response = await fetch(url, config);

//   const resData = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       resData.message || "Something went wrong,failed to send request."
//     );
//   }

//   return resData;
// }

// // custom hook starts with "use"
// export default function useHttp(url, config, initialData) {
//   const [data, setData] = useState(initialData);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();

//   function clearData() {
//     setData(initialData);
//   }

//   const sendRequest = useCallback(
//     async function sendRequest(data) {
//       setIsLoading(true);
//       try {
//         const resData = await sendHttpRequest(url, { ...config, body: data });
//         setData(resData);
//       } catch (error) {
//         setError(error.message || "Something went wrong");
//       }
//       setIsLoading(false);
//     },
//     [url, config]
//   );

//   useEffect(() => {
//     if ((config && (config.method === "GET" || !config.method)) || !config) {
//       sendRequest();
//     }
//   }, [sendRequest, config]);

//   return {
//     data,
//     isLoading,
//     error,
//     sendRequest,
//     clearData,
//   };
// }

import { useCallback, useState, useEffect } from "react";

async function sendHttpRequest(url, config) {
  console.log(`useHttp.js sendHttpRequest url: ${url}`);
  console.log(`useHttp.js sendHttpRequest config: ${config}`);

  const response = await fetch(url, config);
  console.log(`useHttp.js sendHttpRequest response: ${response}`);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong,failed to send request."
    );
  }

  return resData;
}

// custom hook starts with "use"
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        console.log(`useHttp.js resData: ${resData}`);

        setData(resData);
      } catch (error) {
        console.log(`useHttp.js Fetching URL: ${url}`);
        console.log(`useHttp.js config: ${config}`);
        console.log(`useHttp.js data: ${data}`);
        console.log(`useHttp.js error: ${error}`);

        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
