const fs = require('fs');
const crypto = require('crypto');

//这个文件封装了fs常用的模块，处理post请求中的data参数，加密模块，允许跨域的设置

/* 
  	第一个参数是加密的字符串
  	第二个参数是加密类型  默认是'md5'
  	第三个参数编码方式 ：  'utf8', 'ascii'或者'binary' 默认是‘ascii’
  	第四个参数是加密内容输出的编码方式： 'binary', 'base64'或'hex'
  */
exports.encrypt = (data, cryptType = 'md5', codingType = 'utf8', outputType = 'hex') => {
  var signature = crypto.createHash(cryptType);
  signature.update(data, codingType);
  return signature.digest(outputType)
};

//允许跨域，基于express
exports.ACAO = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

//封装读取文件的接口，path的__dirname以引用这个文件的文件的绝对路径作为基准
exports.readfile = (path) => {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(path);
    let data = '';
    stream.on('data', (chrunk) => {
      data += chrunk;
    });
    stream.on('end', () => {
      resolve(data)
    });
    stream.on('err', (err) => {
      console.log('读取文件错误')
      reject(err)
    })
  })
};

//封装写入文件的接口，path的__dirname以引用这个文件的文件的绝对路径作为基准
exports.writefile = (path, data) => {
  data = (typeof data === 'string' ? data : JSON.stringify(data))
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err)
      }
      resolve('success')
    })
  })
};

//封装post请求时的请求参数
exports.postdata = (req) => {
  return new Promise((resolve, reject) => {
    var data = "";
    /* 只有在post请求中有这个 */
    req.on('data', (chunk) => {
      /*node将请求拆分，拿到的数据段需要进行拼接*/
      data += chunk;
    });
    req.on('end', () => {
      resolve(data)
    });
    req.on('err', (err) => {
      console.log('获取post参数错误')
      reject(err)
    })
  })
};