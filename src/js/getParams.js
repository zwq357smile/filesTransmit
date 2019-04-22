export default function (url) {
  let params = {};
  let dataArr = url.split('?')[1];
  let data = [];
  if (dataArr) data = dataArr.split('&');
  for (let value in data) {
    params[data[value].split('=')[0]] = decodeURI(data[value].split('=')[1]).replace(/%3A/, ':');
  }
  return params;
}
