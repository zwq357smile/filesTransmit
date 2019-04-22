import axios from '../axios'
import config from '@/js/config'

export default function (token, baseUrl = 'http://localhost:' + config.requestPort) {
  let require = new Promise((resolve, reject) => {
    axios.get('/token', {
      baseURL: baseUrl,
      params: {
        token: token
      }
    }).then(res => {
      resolve(res.data);
    })
  });

  return require;
}
