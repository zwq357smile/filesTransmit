import axios from '../axios'

export default function (url, baseUrl = 'http://localhost') {
  let require = new Promise((resolve) => {
    axios.get('/r/loadDir', {
      baseURL: baseUrl,
      params: {
        url: url
      }
    }).then((res) => {
      resolve(res.data);
    })
  });
  return require;
}
