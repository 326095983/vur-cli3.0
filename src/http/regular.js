
export default {
  //校验input框只能输入数字且只能是两位小数
  checkPrice(){
    let reg = /^[+-]?\d*\.?\d{0,2}$/;
    return reg
  },
  //校验密码必须是6-15位数字字母组合
  checkPassword(){
    let reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,15}$/
    return reg
  },
  //校验正确的手机号
  checkPhone(){
    let reg= /^1[3456789]\d{9}$/
    return reg
  },
  //校验身份证
  checkCard(){
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg
  },
  //检验银行卡号
  checkBank(){
    let reg = /^([1-9]{1})(\d{14}|\d{19})$/
    return reg
  },
  //校验只能输入数字
  checkNumber(){
    let reg= /^\d+$/;
    return reg
  },
  //校验只能输入字母
  checkC(){
    let reg = /^(?!_)([A-Za-z ]+)$/
    return reg
  },
  //邮箱校验规则
  checkEmail(){
    let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return reg
  },
  //IP格式校验
  checkIp(){
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg
  },
  //校验只能输入正整数
  checkNum(){
    let reg =  /^[0-9]+$/
    return reg
  },
}