import flyio from 'flyio'
let server = 'http://121.40.240.199:8001/api'//正式
// let server = 'http://192.168.0.102:8001/api'//本地
//判断是否是本地还是正式
// process.env.NODE_ENV == 'production'?server = window.location.origin + '/ms':server = '/api'
//flyio请求

// flyio.config.headers={}
let httpRequest = async function(...option){
  let [method,httpUrl,body] = option
  try {
    let requestData = {
      method:method,
      headers:{
        'token':sessionStorage.getItem('token'),
        // 'Content-Type':'application/json',
        // "accept": "application/json",
      },
      url: server + httpUrl,
      // parseJson:true,
      withCredentials:true,
      body:body,
    }
    let res = await flyio.request(requestData);
    return res.data
  }catch(error){
    return {code:1, message:error.message};
    // Message.error(error.response.data)
    // const status = error.response;
    // if (status == 401) {
    //   message.erroe('token失效，请重新登录');
    //   //清除token
    //   localStorage.removeItem("token")
    // }
  }
}
export default {
  httpRequest,server
};
