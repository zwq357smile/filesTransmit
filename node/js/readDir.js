const fs = require('fs');

function readFileList(path) {
  let dirList = [];
  let filesList = [];
  let files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    let stat = fs.statSync(path + '\\' + itm);
    let type = '';
    if (stat.isDirectory()) {
      type = 'dir';
      dirList.push({
        path: path + '\\' + itm,
        filename: itm,
        date: stat.birthtime,
        type
      });
    } else {
      switch ((itm.substring(itm.lastIndexOf('.') + 1).toLowerCase())) {
        case 'mp3':
        case 'wav':
        case 'ogg':
        case 'm4a':
        case 'acc':
        case 'flac':
        case 'ape': type = 'audio'; break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif': type = 'image'; break;
        case 'mp4':
        case 'mov':
        case 'avi':
        case 'mpeg':
        case 'wmv':
        case '3gp':
        case 'mkv':
        case 'flv':
        case 'rmvb':
        case 'qsv': type = 'video'; break;
        case 'zip':
        case 'rar':
        case '7z': type = 'zip'; break;
        case 'doc':
        case 'docx': type = 'word'; break;
        case 'ppt':
        case 'pptx': type = 'ppt'; break;
        case 'txt': type = 'txt'; break;
        case 'pdf': type = 'pdf'; break;
        case 'xls':
        case 'xlsx': type = 'excel'; break;
        default: type = 'unknow'; break;
      }
      filesList.push({
        path: path + '\\' + itm,
        filename: itm,
        date: stat.birthtime,
        type
      });
    }
  });

  return dirList.concat(filesList);
}

module.exports = readFileList;
