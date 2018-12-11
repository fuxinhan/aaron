cimport axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrfToken";

const api = 'http://localhost:8000/api';

let token = localStorage.token

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

const headers = {
    'Access-Control-Allow-Origin':'*',
    'Authorization': token,
    'Content-Type': 'application/json',
}

// 手机号发送验证码
export const PhoneCodeApi=(code)=>{
    const request =
        axios.post(`${api}/smscodes/`, {
            mobile: code
        }).then(res => {
            console.log("res: ", res)
        }).catch (function (error) {
            if(error.response){
                console.log("发送请求错误")
                console.log(error.response.data);
                return;
            }
        })
    return request
}
