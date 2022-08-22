import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
        ? "JWT " + localStorage.getItem('access_token')
        : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (typeof error.response === 'undefined') {
            alert('Server error');
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + 'token/refresh/'
        ){
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid' &&
            error.response.statusText === 'Unauthorized'
        ){
            const refreshToken = localStorage.getItem('refresh_token');

            if(refreshToken){
                const tokenParts = JSON.parse(refreshToken.split('.')[1].toString('base64'))
                const now = Math.ceil(Date.now() / 1000);

                if(tokenParts.exp > now){
                    return axiosInstance
                    .post('/token/refresh/', {refresh: refreshToken})
                    .then(res => {
                        localStorage.setItem('access_token', res.data.access);
                        localStorage.setItem('refresh_token', res.data.refresh);

                        axiosInstance.defaults.headers['Authorization'] = 'JWT '+ res.data.access;
                        originalRequest.defaults.headers['Authorization'] = 'JWT '+ res.data.access;

                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log('Token is expired');
                    window.location.href = '/login/';
                }
            } else {
                console.log('Token is not available');
                window.location.href = '/login/';
            }
        }
        return Promise.reject(error);

    }
)

export default axiosInstance;