import axios from 'axios'

class HelloWorldService {
    executeHelloService() {
        console.log('executed service')
        return axios.get('https://localhost:8081/hello');
    }
}

export default new HelloWorldService();