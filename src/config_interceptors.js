import axios from "axios";
    const createSetAuthInterceptor =  config => {
        let jwt = sessionStorage.getItem('json')
        if (jwt) {
            config.headers.Authorization = jwt;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    };

function jwt_interceptor() {
    axios.interceptors.request.use(createSetAuthInterceptor);
}
export default jwt_interceptor

