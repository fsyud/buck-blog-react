//// 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  const D =
    date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h =
    date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  const m =
    date.getMinutes() < 10
      ? '0' + date.getMinutes() + ':'
      : date.getMinutes() + ':';
  const s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}

// 判断是否为移动端
//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export function isMobileOrPc() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}
