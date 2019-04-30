import axios from 'axios';

export default function (data, clb, baseUrl = 'http://localhost') {
  let require = new Promise((resolve) => {
    axios.post('/file/upload', data, {
      baseURL: baseUrl,
      timeout: 6000000,
      onUploadProgress: function (e) {
        clb(parseInt(e.loaded / e.total * 100) + '%');
      }
    }).then((res) => {
      resolve(res);
    })
  });
  return require;
}
