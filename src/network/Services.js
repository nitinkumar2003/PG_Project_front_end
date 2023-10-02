import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4001/';
const $InvokeApi = (url, method, body, cancel) => {
    return new Promise((resolve, reject) => {
        if (cancel) {
            cancel()
        }
        try {
            konsole.log('URL: ' + url);
            konsole.log('method:' + method);
            konsole.log(((method == "POST") ? "body" : 'params') + JSON.stringify(body));
            let token = sessionStorage.getItem('AuthToken')
            konsole.log("token ", `Bearer ${token}`);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios({
                cancelToken: new axios.CancelToken(function executor(c) {
                    cancel = c;
                }),
                method: method,
                url: url,
                params: (method === 'GET') ? body : null,
                data: (method === 'POST' || method === 'PUT' || method === 'DELETE') ? body : null
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    konsole.error('Request canceled', error.message);
                } else {
                    konsole.error('Something went wrong: ', error.message);
                    reject(error);
                }
            });
        } catch (error) {
            konsole.error('Something went wrong: ', error.message);
            reject(error);
        }
    });
};


export  {$InvokeApi}