import axios from '../axios'

export default function () {
  let require = new Promise((resolve, reject) => {
    axios.get('/r/getIP').then((res) => {
      resolve(res.data.address);
    })
  });

  return require;
}
