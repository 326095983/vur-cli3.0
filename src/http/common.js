import moment from 'dayjs'
import format from './formatAmt'

//过滤时间
let formatTime =  function(row, column, cellValue, index,time='YYYY-MM-DD HH:mm:ss'){
  return cellValue?moment(cellValue).format(time):''
}
//格式化日期时间
let formatDate = function(date,time='YYYY-MM-DD HH:mm:ss'){
  return date?moment(date).format(time):''
}
//金额添加千分符
let formatMoney = function(row, column, cellValue,index){
  return format.formatMoney(cellValue?cellValue:0,2)
}

//数字添加千分符
let formatNum = function(row, column, cellValue,index){
  return format.formatMoney(cellValue?cellValue:0,0)
}

//金额千分符
let formatAmount = function(amount,num){
  return format.formatMoney(amount?amount:'',num)
}

export default {
  formatTime,//过滤时间
  formatDate,//格式化日期时间
  formatMoney,//金额格式化
  formatNum,//数字添加千分符
  formatAmount,//金额千分符
}