//轮播图
window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');


    //鼠标经过显示/隐藏按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer0);
        timer0 = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer0 = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })
    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        //记录小圆圈的索引号，自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        //小圆圈的排他思想
        li.addEventListener('mouseenter', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            //移动图片
            var index = this.getAttribute('index');
            num = circle = index;
            function animate(obj, target, callback) {
                clearInterval(obj.timer);
                obj.timer = setInterval(function () {
                    var step = (target - obj.offsetLeft) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    if (obj.offsetLeft == target) {
                        clearInterval(obj.timer);
                        if (callback) {
                            callback();
                        }
                    }
                    //缓动动画
                    obj.style.left = obj.offsetLeft + step + 'px';
                }, 15);
            }
            animate(ul, -index * 810);
        })

    }
    ol.children[0].className = 'selected';
    //克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);


    var num = 0;
    var circle = 0;
    //右侧按钮滚动
    arrow_r.addEventListener('click', function () {
        num++;
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    if (callback) {
                        callback();
                    }
                }
                //缓动动画
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15);
        }
        animate(ul, -num * 810);

        //小圆圈自动变化
        circle++;
        if (circle == ol.children.length) {
            circle = 0;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'selected';
    });

    //左侧按钮滚动
    //右侧按钮滚动
    arrow_l.addEventListener('click', function () {

        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = (-num) * 810 + 'px';

        }
        num--;
        function animate(obj, target, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    if (callback) {
                        callback();
                    }
                }
                //缓动动画
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15);
        }
        animate(ul, -num * 810);

        //小圆圈自动变化
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'selected';
    });
    //自动播放
    var timer0 = this.setInterval(function () {
        arrow_r.click();
    }, 2000)

    var bannerimg = this.document.querySelectorAll('.banner');
    var type = this.document.querySelectorAll('.type');
    var xhrbanner = new XMLHttpRequest();
    xhrbanner.responseType = 'json';
    xhrbanner.open('GET', 'http://redrock.udday.cn:2022/banner?type=0');
    xhrbanner.send();
    xhrbanner.onreadystatechange = function () {
        if (xhrbanner.readyState === 4 && xhrbanner.status >= 200 && xhrbanner.status < 300) {
            for (var i = 0; i <= 7; i++) {
                bannerimg[i].src = xhrbanner.response.banners[i].imageUrl;
                type[i].innerHTML = xhrbanner.response.banners[i].typeTitle;
            }

            bannerimg[0].addEventListener('click', function () {
                if (xhrbanner.response.banners[0].url) {
                    window.open(xhrbanner.response.banners[0].url);
                }
            })
            bannerimg[1].addEventListener('click', function () {
                if (xhrbanner.response.banners[1].url) {
                    window.open(xhrbanner.response.banners[1].url);
                }
            })
            bannerimg[2].addEventListener('click', function () {
                if (xhrbanner.response.banners[2].url) {
                    window.open(xhrbanner.response.banners[2].url);
                }
            })
            bannerimg[3].addEventListener('click', function () {
                if (xhrbanner.response.banners[3].url) {
                    window.open(xhrbanner.response.banners[3].url);
                }
            })
            bannerimg[4].addEventListener('click', function () {
                if (xhrbanner.response.banners[4].url) {
                    window.open(xhrbanner.response.banners[4].url);
                }
            })
            bannerimg[5].addEventListener('click', function () {
                if (xhrbanner.response.banners[5].url) {
                    window.open(xhrbanner.response.banners[5].url);
                }
            })
            bannerimg[6].addEventListener('click', function () {
                if (xhrbanner.response.banners[6].url) {
                    window.open(xhrbanner.response.banners[6].url);
                }
            })
            bannerimg[7].addEventListener('click', function () {
                if (xhrbanner.response.banners[7].url) {
                    window.open(xhrbanner.response.banners[7].url);
                }
            })
            bannerimg[8].addEventListener('click', function () {
                if (xhrbanner.response.banners[8].url) {
                    window.open(xhrbanner.response.banners[8].url);
                }
            })


        }
    }

    //左侧导航栏
    //1、排他思想
    //获取元素
    var nav = document.querySelector('.nav');
    var lis = nav.querySelectorAll('li');
    var items = document.querySelectorAll('#item');
    var searchcon = this.document.querySelector('.searchcon')
    var singerdetail = this.document.querySelector('.singerdetail');
    var songsheetdetail = this.document.querySelector('.songsheetdetail');
    //for循环绑定点击事件
    items[0].style.display = 'block';
    lis[0].className = 'current ';
    for (let i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            singerdetail.style.display = 'none';
            songsheetdetail.style.display = 'none';
            //干掉所有人，其余清除
            for (let i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = 'current ';
            //显示内容
            let index = this.getAttribute('index');
            console.log(index);
            //干掉所有人
            searchcon.style.display = 'none';

            for (let i = 0; i < items.length; i++) {
                items[i].style.display = 'none';
            }

            items[index].style.display = 'block';
            if (index == 4) {
                var img = items[4].querySelector('img');
                var div = items[4].querySelector('div');
                img.style.display = 'block';
                div.style.display = 'block';
            }
        }
    }

    //内部导航栏lisnav
    var lisnav = document.querySelector('.lisnav');
    var lis1 = lisnav.querySelectorAll('li');
    var items1 = document.querySelectorAll('#item1');
    //for循环绑定点击事件
    items1[0].style.display = 'block';
    lis1[0].className = 'current1 ';
    for (let i = 0; i < lis1.length; i++) {
        lis1[i].setAttribute('index', i);
        lis1[i].onclick = function () {
            //干掉所有人，其余清除
            for (let i = 0; i < lis1.length; i++) {
                lis1[i].className = '';
            }
            this.className = 'current1 ';
            //显示内容
            let index = this.getAttribute('index');
            console.log(index);
            //干掉所有人

            for (let i = 0; i < items1.length; i++) {
                items1[i].style.display = 'none';
            }

            items1[index].style.display = 'block';
        }
    }

    //control
    var control = this.document.querySelector('.control');
    var lis2 = control.querySelectorAll('li');
    var color = this.document.querySelector('.color');
    var div = color.querySelector('div');
    var flag = 0;
    lis2[6].addEventListener('click', function () {

        if (flag == 0) {
            color.style.display = 'block';
            flag = 1;
        }
        else if (flag == 1) {
            color.style.display = 'none';
            flag = 0;
        }
    })
    //更换皮肤
    var lis3 = document.querySelectorAll('.lis');
    var header = this.document.querySelector('.header');
    var lis4 = ol.querySelectorAll('li');
    var homepage = this.document.querySelector('.homepage');
    lis3[0].addEventListener('click', function () {
        header.style.backgroundColor = ' #000';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#000")

        }
        div.setAttribute("style", "border-color:#000")
    })
    lis3[1].addEventListener('click', function () {
        header.style.backgroundColor = ' #ec4141';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#ec4141")

        }
        div.setAttribute("style", "border-color:#ec4141")
    })
    lis3[2].addEventListener('click', function () {
        header.style.backgroundColor = '#eb90b6';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#eb90b6")
        }
        div.setAttribute("style", "border-color:#eb90b6")
    })
    lis3[3].addEventListener('click', function () {
        header.style.backgroundColor = '#53b8fd';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#53b8fd")
        }
        div.setAttribute("style", "border-color:#53b8fd")
    })
    lis3[4].addEventListener('click', function () {
        header.style.backgroundColor = '#4faa65';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#4faa65")
        }
        div.setAttribute("style", "border-color:#4faa65")
    })
    lis3[5].addEventListener('click', function () {
        header.style.backgroundColor = '#f0c98a';
        //lis1.style.borderColor = ' #f0c98a';
        for (var i = 0; i < lis1.length; i++) {
            lis1[i].setAttribute("style", "border-color:#f0c98a")
        }
        div.setAttribute("style", "border-color:#f0c98a")

    })
    /*  lis2[2].addEventListener('click', function () {
 
         window.resizeTo(300, 300);
 
     })
  */
    //登录界面login
    var flag1 = 0;
    var login = this.document.querySelector('.login');
    login.addEventListener('click', function () {
        if (flag1 == 0) {
            log.style.display = 'block';
            flag1 = 1;
        }

    })

    var log = this.document.querySelector('.log');
    //var download = this.document.querySelector('.download');
    var close = this.document.querySelector('.close')

    close.addEventListener('click', function () {
        log.style.display = 'none';
        flag1 = 0;
    })

    var rsongsheet = this.document.querySelector('.rsongsheet');
    var div1 = rsongsheet.querySelector('div');
    var latestmusic = this.document.querySelector('.latestmusic');
    var div2 = latestmusic.querySelector('div');
    var rMV = this.document.querySelector('.rMV');
    var div3 = rMV.querySelector('div');
    var vid = this.document.querySelector('.vid');
    div1.addEventListener('click', function () {
        for (let i = 0; i < items1.length; i++) {
            items1[i].style.display = 'none';
        }
        items1[2].style.display = 'block';
        for (let i = 0; i < lis1.length; i++) {
            lis1[i].className = '';
        }
        lis1[2].className = 'current1 ';

    })
    div2.addEventListener('click', function () {
        for (let i = 0; i < items1.length; i++) {
            items1[i].style.display = 'none';
        }
        items1[5].style.display = 'block';
        for (let i = 0; i < lis1.length; i++) {
            lis1[i].className = '';
        }
        lis1[5].className = 'current1 ';
    })
    div3.addEventListener('click', function () {
        vid.className = 'nowvid';
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        lis[2].className = 'current ';
    })
})