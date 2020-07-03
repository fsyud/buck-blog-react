//// 时间 格式化成 2018-12-12 12:12:00
export const timestampToTime = (timestamp, dayMinSecFlag) => {
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

//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export const isMobileOrPc = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

//存sessionStorage
export const sessionStorageSet = (name: string, obj: any) => {
  if (typeof obj === 'undefined') {
    return false
  }
 // obj为undefined或null或空字符串不能存储，布尔值可存储，但取时为字符串
 if(!obj && (typeof obj === 'undefined' || typeof obj === 'object' || typeof obj === 'string')) {
    return false
 }
  let saveStr = ''
  if (typeof obj === 'object') {
    saveStr = JSON.stringify(obj)
  } else {
    saveStr = obj
  }
  sessionStorage.setItem(name, saveStr)
  return true
}

// 取sessionStorage
export const sessionStorageGet = (name: string) => {
  if (typeof name !== 'string') {
    return
  }
  var savedStr = sessionStorage.getItem(name)
  // 非法值返回，包括undefined、null、空字符串
  if (!savedStr) {
    return
  }
  var result
  if ((savedStr.indexOf('"') < 0 && savedStr.indexOf('\'') < 0) || savedStr.indexOf(':') < 0) {
    return savedStr
  }
  try {
    result = JSON.parse(savedStr)
    return result
  } catch (e) {
    return savedStr
  }
}

// 删除sessionStorage
export const sessionStorageRemove = (name: string) => {
  if (typeof name !== 'string') {
    return
  }
  sessionStorage.removeItem(name)
}
