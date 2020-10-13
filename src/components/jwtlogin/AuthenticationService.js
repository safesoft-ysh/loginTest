import axios from "axios";

class AuthenticationService {
    
    // Send Username, password to the SERVER
    // Body에 username, password를 넣고 POST /authenticate
    executeJwtAuthenticationService(username, password) {
        return axios.post("http://localhost:8081/authenticate", {
            username,
            password
        })
    }

    executeHelloService() {
        console.log("===executeHelloService===")
        return axios.get('http://localhost:8081/hello');
    }

    //로그인 성공 시, username을 authenticatedUser로 localStorage에 저장
    //JWTToken을 생성하여 setupAxiosInterceptors에 넣기
    registerSuccessfulLoginForJwt(username, token) {
        console.log("===registerSuccessfulLoginForJwt===");
        localStorage.setItem('token', token)
        localStorage.setItem('authenticatedUser', username);

        //sessionStorage.setItem('authenticationUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return "Bearer " + token;
    }

    setupAxiosInterceptors() {
        //Axios - 자바스크립트에서 HTTP통신을 위해 쓰이는 Promise 기반 HTTP Client이다.
        //Axios Interceptors는 모든 Request/Response가 목적지에 도달하기 전에 Request에
        //원하는 내용을 담아 보내거나 원하는 코드를 실행시킬 수 있다.
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    //Token이 있으면 header에 Bearer + token을 담아서 보냄
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                //이후 모든 Request Header에는 token이 담겨져서 전달됨
                //config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                //CORS Error
                Promise.reject(error);
            });
    }

    logout() {
        //sessionStorage.removeItem("authenticatedUser');
        localStorage.removeItem("authenticatedser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        console.log("===UserLoggedInCheck===");
        console.log(token);

        if(token) {
            return true;
        }

        return false;
    }

    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser');
        let user = localStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }
}

export default new AuthenticationService();