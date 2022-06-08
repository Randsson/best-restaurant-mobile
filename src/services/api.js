import axios from 'axios';

const Api = axios.create({baseURL: 'https://13f6-2804-d49-4708-1500-6bd3-7e2-8c99-ed54.sa.ngrok.io/api/v1'})

export default Api;