// 时间戳转化成 YYYY-MM-DD hh:mm:ss
function agre_formatTime(time, symbol) {
  var date = new Date(time)
  var Y = date.getFullYear() + symbol
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + symbol
  var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : date.getDate())
  var h = (date.getHours() + 1< 10 ? '0'+(date.getHours()): date.getHours()) + ':'
  var m = (date.getMinutes() + 1< 10 ? '0'+(date.getMinutes()): date.getMinutes()) + ':'
  var s = (date.getSeconds() + 1< 10 ? '0'+(date.getSeconds()): date.getSeconds())
  return Y + M + D + ' ' + h + m + s;
}

function agre_request(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',            
      success: (res) => {
        const { result, status, msg, message } = res
        if ( status === 1 ) {
          resolve(result || {} )
        } else {
          reject(msg || message)
        }
      },
      error: () => {
        reject()
      }
    });
  })
}
