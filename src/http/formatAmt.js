export default {
  //金额添加千分符并保留两位小数
  formatMoney(num,n) {
    num = Number(num).toFixed(n);
    let re = /(-?\d+)(\d{3})/;
    while(re.test(num)) {
      num = num.replace(re,"$1,$2");
    }
    return num;
  },
}