import axios from '../axios'

export default function (url, name, baseUrl = 'http://localhost') {
  let require = new Promise((resolve) => {
    axios.get('/file/load', {
      baseURL: baseUrl,
      params: {
        url: url,
        name: name
      }
    }).then((res) => {
      resolve(res);
    })
  });
  return require;
}
