let ipAddress = new Promise((resolve) => {
  let http = new XMLHttpRequest();
  http.open('GET', 'http://192.168.10.227:8034/r/getIP', true);
  http.send();
  http.onreadystatechange = function (res) {
    if (http.readyState === 4) { // 4 = "loaded"
      if (http.status === 200) { // 200 = OK
        resolve(JSON.parse(res.target.response).address)
      }
    }
  };
});

export default ipAddress
