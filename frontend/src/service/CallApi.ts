import axios, { InternalAxiosRequestConfig } from "axios";
import { CallApiConfigType, MethodType } from "../types/type";
const api_url = import.meta.env.VITE_API_URL;

const controller = new AbortController();
const signal = controller.signal;

const baseAxios = axios.create({
    baseURL: api_url || "https://final-project-htp7.onrender.com/api",
    signal: signal,
    withCredentials: true,

    // headers: {
    //     common: { Accept: "application/json, text/plain, */*" },
    //     post: { "Content-Type": "application/x-www-form-urlencoded" },
    // },
});

baseAxios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        //     // Do something before request is sent
        if (config.url === "/Log") {
            return config;
        }

        return config;
    },
    (error) => {
        //     // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
baseAxios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        return Promise.reject(error);
    }
);

// using AXIOS
export const callApi = async (
    apiString: string = "/",
    method: MethodType,
    { data = {}, config = {}, params = {} }: CallApiConfigType = {}
): Promise<any> => {
    let attempts = 0;
    const maxRetiries = 3;
    try {
        while (attempts < maxRetiries) {
            try {
                console.log(apiString, method, data, config, params);

                // params = new URLSearchParams(params);
                const response = await baseAxios({
                    method: method.toLowerCase(),
                    url: apiString,
                    params,
                    data: method.toLowerCase() !== "get" ? data : {},
                    ...config,
                });
                // console.log(response.config.url);
                console.log(response);
                if (response.status === 200) {
                    return response;
                } else {
                    throw new Error("Some Error");
                }
            } catch (error) {
                console.log(error);

                attempts++;
                console.log(`Attempt ${attempts} failed. Retrying...`);
                if (attempts >= maxRetiries) throw error;
            }
        }
    } catch (error) {
        if (typeof error === "object" && error !== null) {
            (error as { abort?: () => void }).abort = controller.abort;
            console.error("Request Aborted");
        }
        if ((error as any)?.status) {
            console.error(`Error ${(error as any).status}`);
        }
        throw error;
    }
};
