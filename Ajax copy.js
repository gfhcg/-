window.addEventListener('load', function () {
    var QR = this.document.querySelector('.QR');
    var font = this.document.querySelector('.font')
    var log = this.document.querySelector('.log');
    font.addEventListener('click', function () {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', 'http://redrock.udday.cn:2022/login/qr/key');
        xhr.send();
        xhr.onreadystatechange = function () {
            //xhr对象的请求状态readyState
            //服务器的响应状态 status
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                var key = xhr.response.data.unikey;
                console.log(key);
                var xhr1 = new XMLHttpRequest();
                xhr1.responseType = 'json';
                xhr1.open('GET', 'http://redrock.udday.cn:2022/login/qr/create?key&qrimg');
                xhr1.send('');
                xhr1.onreadystatechange = function () {
                    //xhr对象的请求状态readyState
                    //服务器的响应状态 status
                    if (xhr1.readyState === 4 && xhr1.status >= 200 && xhr1.status < 300) {
                        console.log(this.response)
                        var qrcode = new QRCode(QR, {
                            text: this.response.data.qrurl,
                            width: 255,
                            height: 255,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H

                        })

                        log.addEventListener('mouseover', function () {
                            qrcode.width = 184;
                            qrcode.height = 184;

                        })
                    }
                }
            }
        }
    })
})