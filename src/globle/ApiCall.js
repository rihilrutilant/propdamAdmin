import axios from "axios";

const makeAPIRequest = async (method, url, data, headers, params) =>
    new Promise(async (resolve, reject) => {
        const token = await localStorage.getItem("AdminToken");
        // console.log({ token });
        const options = {
            ...{
                method,
                url,
                data,
                params,
            },
            ...(token && { headers: { 'authToken_admin': token } }),
        };
        if (headers) {
            options.headers = { ...options.headers, ...headers };
        }
        axios(options)
            .then(async (response) => {
                if (response?.status === 200 || response?.status === 201) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch(async (error) => {
                reject(error);
            });
        return null;
    });

export default makeAPIRequest;