import axios from 'axios'


const http =axios.create({
    baseURL: 'http://localhost:8848/pc',
    timeout: 200000
})


export default http