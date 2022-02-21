window.addEventListener('load', function () {
    var wait = this.document.querySelector('.wait');
    //登录功能(有问题)
    var inp1 = this.document.querySelector('.inp1');
    var inp2 = this.document.querySelector('.inp2');
    var btn2 = this.document.querySelector('.btn2');
    var font = this.document.querySelector('.font');
    var avatarUrl = this.document.querySelector('.avatarUrl');
    var log = this.document.querySelector('.log');

    var sign = this.document.querySelector('.sign');
    var your = this.document.querySelector('.your');
    var yimg = this.document.querySelectorAll('.yimg');
    var yoursn = this.document.querySelectorAll('.yoursn');
    var cook;
    btn2.addEventListener('click', function () {
        if (inp2.value == '' || inp1.value == '') {
            alert('请输入手机号或密码');
        }
        else {
            var phone = inp1.value;
            var password = inp2.value;
            // console.log(phone.substring(0, 11));
            // console.log(password.substring(0));
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', 'http://redrock.udday.cn:2022/login/cellphone?phone=' + phone.substring(0, 11) + '&password=' + password.substring(0));
            xhr.send();
            xhr.onreadystatechange = function () {
                //xhr对象的请求状态readyState
                //服务器的响应状态 status
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    console.log(xhr.response);
                    log.style.display = 'none';
                    font.innerHTML = (xhr.response.profile.nickname).substring(0, 4);
                    font.innerHTML += '...';
                    avatarUrl.src = xhr.response.profile.avatarUrl;

                    cook = xhr.response.cookie;
                    var uid = (xhr.response.account.id).toString();
                    var xhry = new XMLHttpRequest();
                    xhry.responseType = 'json';
                    xhry.open('GET', 'http://redrock.udday.cn:2022/user/playlist?uid=' + uid);
                    xhry.send();
                    xhry.onreadystatechange = function () {
                        if (xhry.readyState === 4 && xhry.status >= 200 && xhry.status < 300) {
                            sign.style.display = 'none';
                            your.style.display = 'block';
                            for (var i = 0; i <= 7; i++) {
                                yimg[i].src = xhry.response.playlist[i].coverImgUrl;
                                yoursn[i].innerHTML = xhry.response.playlist[i].name;

                            }

                        }

                    }

                }



            }

        }
    })
    //console.log(cook);
    //搜索模块
    //热搜榜
    var hot = this.document.querySelector('.hot');
    var phot = hot.querySelectorAll('p');
    var namehot = this.document.querySelectorAll('.namehot');
    var score = this.document.querySelectorAll('.play');
    var hotli = hot.querySelectorAll('li');

    phot[0].style.color = '#ff3a3a';
    phot[1].style.color = '#ff3a3a';
    phot[2].style.color = '#ff3a3a';
    var xhrhot = new XMLHttpRequest();
    xhrhot.responseType = 'json';
    xhrhot.open('GET', 'http://redrock.udday.cn:2022/search/hot/detail');
    xhrhot.send();
    xhrhot.onreadystatechange = function () {
        if (xhrhot.readyState === 4 && xhrhot.status >= 200 && xhrhot.status < 300) {
            for (var i = 0; i <= 19; i++) {
                namehot[i].innerHTML = xhrhot.response.data[i].searchWord;
                score[i].innerHTML = xhrhot.response.data[i].score;
                hotli[i].addEventListener('mouseover', function () {
                    // search.value = this.namehot[0].innerHTML;
                    console.log(i)
                })
            }

        }
    }


    var search = this.document.querySelector('.sou');
    var soup1 = this.document.querySelector('.soup1');
    var findmusic = this.document.querySelector('.findmusic')
    var searchcon = this.document.querySelector('.searchcon')
    var nav = document.querySelector('.nav');
    var lis = nav.querySelectorAll('li');
    var con = this.document.querySelector('.con');
    var conli = con.querySelectorAll('li');
    var conname = this.document.querySelectorAll('.conname');
    var conwriter = this.document.querySelectorAll('.conwriter');
    var where = this.document.querySelectorAll('.where');
    search.addEventListener('focus', function () {
        hot.style.display = 'block';
        //搜索结果
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                concat[0].className = 'conli';
                hot.style.display = 'none';
                findmusic.style.display = 'none';
                wait.style.display = 'block';
                for (var i = 1; i <= 4; i++) {
                    concat[i].className = '';
                }
                con.style.display = 'block'
                zhuanji.style.display = 'none'
                consinger.style.display = 'none'
                consheet.style.display = 'none'
                conuser.style.display = 'none'
                for (var i = 0; i <= 19; i = i + 2) {
                    conli[i].style.backgroundColor = '#f9f9f9';
                }
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                searchcon.style.display = 'block';
                soup1.innerHTML = search.value;
                var xhrcon = new XMLHttpRequest();
                xhrcon.responseType = 'json';
                xhrcon.open('GET', 'http://redrock.udday.cn:2022/cloudsearch?keywords=' + search.value.substring(0));
                xhrcon.send();
                xhrcon.onreadystatechange = function () {
                    if (xhrcon.readyState === 4 && xhrcon.status >= 200 && xhrcon.status < 300) {
                        for (var i = 0; i <= 29; i++) {
                            conname[i].innerHTML = xhrcon.response.result.songs[i].name;
                            conwriter[i].innerHTML = xhrcon.response.result.songs[i].ar[0].name;
                            where[i].innerHTML = xhrcon.response.result.songs[i].al.name;
                        }
                        wait.style.display = 'none'

                        con.onclick = function (e) {
                            e = e || window.event;
                            var songid = (xhrcon.response.result.songs[e.target.id].id).toString();
                            //console.log(e.target.id);
                            var sxhr = new XMLHttpRequest();
                            sxhr.responseType = 'json';
                            sxhr.open('GET', 'http://redrock.udday.cn:2022/song/url?id=' + songid);
                            sxhr.send();
                            sxhr.onreadystatechange = function () {
                                if (sxhr.readyState === 4 && sxhr.status >= 200 && sxhr.status < 300) {
                                    //console.log(sxhr.response.data[0].url)
                                    audio.src = sxhr.response.data[0].url;
                                }
                            }
                            //2、歌词部分
                            //初始化页面
                            lyrics.addEventListener('click', function () {
                                detail.style.display = 'block'
                                var xhrgc = new XMLHttpRequest();
                                xhrgc.responseType = 'json';
                                xhrgc.open('GET', 'http://redrock.udday.cn:2022/lyric?id=' + songid);
                                xhrgc.send();
                                xhrgc.onreadystatechange = function () {
                                    if (xhrgc.readyState === 4 && xhrgc.status >= 200 && xhrgc.status < 300) {
                                        //剔除时间 提炼歌词
                                        //正则 难    采用split
                                        function init() {
                                            var ci = xhrgc.response.lrc.lyric.split('[')
                                            ci.forEach(function (current) {
                                                var h = current.split(']');
                                                var newci = h[1];
                                                var lyricstime = h[0].split('.');
                                                //console.log(lyricstime);
                                                var newlyricstime = lyricstime[0].split(':');
                                                var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]);
                                                //console.log(newlyricstime1);
                                                if (newci) {
                                                    dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                }


                                            })

                                        }
                                        init();
                                    }
                                }


                            })
                            var xhrd = new XMLHttpRequest();
                            xhrd.responseType = 'json';
                            xhrd.open('GET', 'http://redrock.udday.cn:2022/song/detail?ids=' + songid);
                            xhrd.send();
                            xhrd.onreadystatechange = function () {
                                if (xhrd.readyState === 4 && xhrd.status >= 200 && xhrd.status < 300) {
                                    dsong.innerHTML = xhrd.response.songs[0].al.name;
                                    if (xhrd.response.songs[0].alia[0]) {
                                        dsinger.innerHTML = '<p>' + xhrd.response.songs[0].alia[0] + '</p>';
                                    }
                                    dsinger.innerHTML += '<p>' + xhrd.response.songs[0].ar[0].name + '</p>';
                                    dimg.src = xhrd.response.songs[0].al.picUrl;
                                    leftimg.src = xhrd.response.songs[0].al.picUrl;
                                    bname.innerHTML = xhrd.response.songs[0].al.name;
                                    bsinger.innerHTML = xhrd.response.songs[0].ar[0].name;
                                }
                            }
                            //歌曲评论
                            var xhrconmment = new XMLHttpRequest();
                            xhrconmment.responseType = 'json';
                            xhrconmment.open('GET', 'http://redrock.udday.cn:2022/comment/music?id=' + songid);
                            xhrconmment.send();
                            xhrconmment.onreadystatechange = function () {
                                if (xhrconmment.readyState === 4 && xhrconmment.status >= 200 && xhrconmment.status < 300) {
                                    for (var i = 0; i <= 14; i++) {
                                        touxiang[i].src = xhrconmment.response.hotComments[i].user.avatarUrl;
                                        content[i].innerHTML = xhrconmment.response.hotComments[i].user.nickname;
                                        content[i].innerHTML += ':  ' + xhrconmment.response.hotComments[i].content;
                                        comtime[i].innerHTML = xhrconmment.response.hotComments[i].timeStr;
                                        like[i].innerHTML += xhrconmment.response.hotComments[i].likedCount;
                                    }

                                }
                            }


                        }
                    }

                }



            }
        }

    })
    var classify1 = this.document.querySelector('.classify1');
    var concat = classify1.querySelectorAll('li');

    var zhuanji = this.document.querySelector('.zhuanji');
    var consinger = this.document.querySelector('.consinger');
    var consheet = this.document.querySelector('.consheet');
    var conuser = this.document.querySelector('.conuser');

    var zhuanji = this.document.querySelector('.zhuanji');
    var zhuanjili = zhuanji.querySelectorAll('li');
    var zhuanjiimg = zhuanji.querySelectorAll('img');
    var zname = this.document.querySelectorAll('.zname');
    var zwriter = this.document.querySelectorAll('.zwriter');
    concat[0].addEventListener('click', function () {
        for (var i = 0; i <= 4; i++) {
            concat[i].className = '';
        }
        this.className = 'conli';
        con.style.display = 'block'
        zhuanji.style.display = 'none'
        consinger.style.display = 'none'
        consheet.style.display = 'none'
        conuser.style.display = 'none'
    })
    concat[1].addEventListener('click', function () {
        for (var i = 0; i <= 4; i++) {
            concat[i].className = '';
        }
        this.className = 'conli';
        con.style.display = 'none'
        zhuanji.style.display = 'block'
        consinger.style.display = 'none'
        consheet.style.display = 'none'
        conuser.style.display = 'none'
        wait.style.display = 'block';
        for (var i = 0; i <= 19; i = i + 2) {
            zhuanjili[i].style.backgroundColor = '#f9f9f9';
        }

        var conxhr = new XMLHttpRequest();
        conxhr.responseType = 'json';
        conxhr.open('GET', 'http://redrock.udday.cn:2022/cloudsearch?limit=20&type=10&keywords=' + search.value.substring(0));
        conxhr.send();
        conxhr.onreadystatechange = function () {
            if (conxhr.readyState === 4 && conxhr.status >= 200 && conxhr.status < 300) {
                for (var i = 0; i <= 19; i++) {
                    zhuanjiimg[i].src = conxhr.response.result.albums[i].blurPicUrl;
                }
                for (var i = 0; i <= 19; i++) {
                    zname[i].innerHTML = conxhr.response.result.albums[i].name;
                    zwriter[i].innerHTML = conxhr.response.result.albums[i].artists[0].name;
                }
                wait.style.display = 'none'



            }
        }


    })
    var singerimg = consinger.querySelectorAll('img');
    var singerli = consinger.querySelectorAll('li');
    var singername = this.document.querySelectorAll('.singername');
    concat[2].addEventListener('click', function () {
        for (var i = 0; i <= 4; i++) {
            concat[i].className = '';
        }
        this.className = 'conli';
        con.style.display = 'none'
        zhuanji.style.display = 'none'
        consinger.style.display = 'block'
        consheet.style.display = 'none'
        conuser.style.display = 'none'
        wait.style.display = 'block'
        for (var i = 0; i <= 19; i = i + 2) {
            singerli[i].style.backgroundColor = '#f9f9f9';
        }

        var conxhr = new XMLHttpRequest();
        conxhr.responseType = 'json';
        conxhr.open('GET', 'http://redrock.udday.cn:2022/cloudsearch?limit=20&type=100&keywords=' + search.value.substring(0));
        conxhr.send();
        conxhr.onreadystatechange = function () {
            if (conxhr.readyState === 4 && conxhr.status >= 200 && conxhr.status < 300) {
                for (var i = 0; i <= 19; i++) {
                    singerimg[i].src = conxhr.response.result.artists[i].picUrl;
                    singername[i].innerHTML = conxhr.response.result.artists[i].name;
                }
                wait.style.display = 'none'
            }
        }
    })
    var consheetimg = consheet.querySelectorAll('img');
    var sheetname = this.document.querySelectorAll('.sheetname');
    var sheetcreat = this.document.querySelectorAll('.sheetcreat');
    var consheetplay = this.document.querySelectorAll('.consheetplay');
    var consheetli = consheet.querySelectorAll('li');
    concat[3].addEventListener('click', function () {
        for (var i = 0; i <= 4; i++) {
            concat[i].className = '';
        }
        this.className = 'conli';
        con.style.display = 'none'
        zhuanji.style.display = 'none'
        consinger.style.display = 'none'
        consheet.style.display = 'block'
        conuser.style.display = 'none'
        wait.style.display = 'block'
        for (var i = 0; i <= 19; i = i + 2) {
            consheetli[i].style.backgroundColor = '#f9f9f9';
        }
        var conxhr = new XMLHttpRequest();
        conxhr.responseType = 'json';
        conxhr.open('GET', 'http://redrock.udday.cn:2022/cloudsearch?limit=20&type=1000&keywords=' + search.value.substring(0));
        conxhr.send();
        conxhr.onreadystatechange = function () {
            if (conxhr.readyState === 4 && conxhr.status >= 200 && conxhr.status < 300) {
                for (var i = 0; i <= 19; i++) {
                    consheetimg[i].src = conxhr.response.result.playlists[i].coverImgUrl;
                    sheetname[i].innerHTML = conxhr.response.result.playlists[i].name;
                    sheetcreat[i].innerHTML += conxhr.response.result.playlists[i].creator.nickname;
                    consheetplay[i].innerHTML += conxhr.response.result.playlists[i].playCount;
                }
                wait.style.display = 'none'
            }
        }
    })
    var conuserli = conuser.querySelectorAll('li');
    var conuserimg = conuser.querySelectorAll('img');
    var username = this.document.querySelectorAll('.username');
    concat[4].addEventListener('click', function () {
        for (var i = 0; i <= 4; i++) {
            concat[i].className = '';
        }
        this.className = 'conli';
        con.style.display = 'none'
        zhuanji.style.display = 'none'
        consinger.style.display = 'none'
        consheet.style.display = 'none'
        conuser.style.display = 'block'
        wait.style.display = 'block'
        for (var i = 0; i <= 19; i = i + 2) {
            conuserli[i].style.backgroundColor = '#f9f9f9';
        }
        var conxhr = new XMLHttpRequest();
        conxhr.responseType = 'json';
        conxhr.open('GET', 'http://redrock.udday.cn:2022/cloudsearch?limit=20&type=1002&keywords=' + search.value.substring(0));
        conxhr.send();
        conxhr.onreadystatechange = function () {
            if (conxhr.readyState === 4 && conxhr.status >= 200 && conxhr.status < 300) {
                for (var i = 0; i <= 19; i++) {
                    conuserimg[i].src = conxhr.response.result.userprofiles[i].avatarUrl;
                    username[i].innerHTML = conxhr.response.result.userprofiles[i].nickname;
                }
                wait.style.display = 'none'
            }
        }
    })
    search.addEventListener('blur', function () {
        hot.style.display = 'none';

    })


    //rsongsheeet 推荐歌单
    var rsongsheet = this.document.querySelector('.rsongsheet');
    var p = rsongsheet.querySelectorAll('p');
    var img = this.document.querySelectorAll('#gedan');
    var playcount = this.document.querySelectorAll('.playcount');


    var xhr1 = new XMLHttpRequest();
    xhr1.responseType = 'json';
    xhr1.open('GET', 'http://redrock.udday.cn:2022/personalized?limit=8');
    xhr1.send();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status >= 200 && xhr1.status < 300) {
            for (var i = 0; i <= 7; i++) {
                //console.log(this.response);
                //console.log(xhr1.response.result[0].picUrl);
                //div.style.background.url = xhr1.response.result[0].picUrl;
                img[i].src = xhr1.response.result[i].picUrl;
                p[i].innerHTML = xhr1.response.result[i].name;
                playcount[i].innerHTML = xhr1.response.result[i].playCount;
            }

        }
    }
    //latestmusic 推荐新音乐
    var latestmusic = this.document.querySelector('.latestmusic');
    //  var p = latestmusic.querySelectorAll('p');
    var img1 = this.document.querySelectorAll('#geqv')
    var p6 = this.document.querySelectorAll('.p6')
    var writer = this.document.querySelectorAll('.writer');
    var xhr3 = new XMLHttpRequest();
    xhr3.responseType = 'json';
    xhr3.open('GET', 'http://redrock.udday.cn:2022/personalized/newsong?limit=12');
    xhr3.send();
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState === 4 && xhr3.status >= 200 && xhr3.status < 300) {
            for (var i = 0; i <= 11; i++) {
                img1[i].src = xhr3.response.result[i].picUrl;
                p6[i].innerHTML = xhr3.response.result[i].name;
                writer[i].innerHTML = xhr3.response.result[i].song.artists[0].name;
            }
        }
    }
    //rMV 推荐MV
    var rMV = this.document.querySelector('.rMV');
    var p1 = rMV.querySelectorAll('.p1');
    var p2 = rMV.querySelectorAll('.p2');
    var img2 = this.document.querySelectorAll('#mv')
    var artistName;
    var xhr4 = new XMLHttpRequest();
    xhr4.responseType = 'json';
    xhr4.open('GET', 'http://redrock.udday.cn:2022/personalized/mv');
    xhr4.send();
    xhr4.onreadystatechange = function () {
        if (xhr4.readyState === 4 && xhr4.status >= 200 && xhr4.status < 300) {
            for (var i = 0; i <= 2; i++) {
                //console.log(this.response);
                //console.log(xhr1.response.result[0].picUrl);
                //div.style.background.url = xhr1.response.result[0].picUrl;
                img2[i].src = xhr4.response.result[i].picUrl;
                p1[i].innerHTML = xhr4.response.result[i].name;
                p2[i].innerHTML = xhr4.response.result[i].artistName;
                //playcount[i].innerHTML = xhr4.response.result[i].playCount;
            }

        }
    }
    //GD 歌单
    // 歌单菜单
    var catlog = this.document.querySelector('.catlog');
    var li = catlog.querySelectorAll('li');
    var xhr5 = new XMLHttpRequest();
    xhr5.responseType = 'json';
    xhr5.open('GET', 'http://redrock.udday.cn:2022/playlist/catlist');
    xhr5.send();
    xhr5.onreadystatechange = function () {
        if (xhr5.readyState === 4 && xhr5.status >= 200 && xhr5.status < 300) {
            for (var i = 0; i <= 19; i++) {
                li[i].innerHTML = xhr5.response.sub[i + 3].name;
            }

        }
    }
    // 歌单内容
    // var GD = this.document.querySelectorAll('.GD');
    var img3 = this.document.querySelectorAll('#GeDan')
    var p3 = this.document.querySelectorAll('.p3');
    var playcount1 = this.document.querySelectorAll('.playcount1')
    var GD = this.document.querySelector('.GD')
    var nihao = 0;
    var simg = this.document.querySelector('.simg');
    var sname = this.document.querySelector('.sname');
    var uimg = this.document.querySelector('.uimg');
    var uname = this.document.querySelector('.uname');
    var tag = this.document.querySelector('.tag');
    var hmany = this.document.querySelector('.hmany');
    var spc = this.document.querySelector('.spc');
    var sdes = this.document.querySelector('.sdes');
    var songsheetdetail = this.document.querySelector('.songsheetdetail');
    var scontent = this.document.querySelector('.scontent');
    var xhr6 = new XMLHttpRequest();
    xhr6.responseType = 'json';
    xhr6.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40');
    xhr6.send();
    xhr6.onreadystatechange = function () {
        if (xhr6.readyState === 4 && xhr6.status >= 200 && xhr6.status < 300) {
            for (var i = 0; i <= 39; i++) {
                img3[i].src = xhr6.response.playlists[i].coverImgUrl;
                p3[i].innerHTML = xhr6.response.playlists[i].name;
                //p[i].innerHTML = xhr1.response.result[i].name;
                playcount1[i].innerHTML = xhr6.response.playlists[i].playCount;
            }

            GD.onclick = function (e) {
                e = e || window.event;
                //console.log(xhr6.response.playlists[e.target.alt].id);
                var gdid = (xhr6.response.playlists[e.target.alt].id).toString();
                fetch("http://redrock.udday.cn:2022/playlist/detail?id=" + gdid + "&cookie=" + cook.substring(0))
                    .then((response) => response.json())
                    .then((res) => {
                        songsheetdetail.style.display = 'block';
                        for (var i = 0; i < lis.length; i++) {
                            lis[i].className = '';
                        }
                        simg.src = res.playlist.coverImgUrl;
                        sname.innerHTML = res.playlist.name;
                        uimg.src = res.playlist.creator.avatarUrl;
                        uname.innerHTML = res.playlist.creator.nickname;
                        tag.innerHTML += res.playlist.tags[0];
                        hmany.innerHTML += res.playlist.tracks.length;
                        spc.innerHTML += res.playlist.playCount;
                        sdes.innerHTML += res.playlist.description;
                        for (var i = 0; i <= res.playlist.tracks.length; i++)
                            scontent.innerHTML += '<li>' + res.playlist.tracks[i].name + '</li>';
                    }
                    );

            }

        }
    }
    li[0].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=华语');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    //p[i].innerHTML = xhr1.response.result[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[1].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=清晨');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    //p[i].innerHTML = xhr1.response.result[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[2].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=怀旧');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    //p[i].innerHTML = xhr1.response.result[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[3].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=夜晚');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    //p[i].innerHTML = xhr1.response.result[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[4].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=摇滚');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    //p[i].innerHTML = xhr1.response.result[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[5].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=欧美');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[6].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=清新');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[7].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=ACG');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[8].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=浪漫');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[9].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=民谣');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[10].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=日语');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[11].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=学习');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[12].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=儿童');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[13].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=电子');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[14].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=韩语');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[15].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=校园');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[16].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=工作');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[17].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=午休');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[18].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=伤感');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    li[19].addEventListener('click', function () {
        for (var i = 0; i <= 19; i++) {
            li[i].style.backgroundColor = '#ffffff';
            li[i].style.color = '#676767';
        }
        this.style.backgroundColor = '#fdf5f5';
        this.style.color = '#ee4141';
        var xhr7 = new XMLHttpRequest();
        xhr7.responseType = 'json';
        xhr7.open('GET', 'http://redrock.udday.cn:2022/top/playlist?limit=40&cat=粤语');
        xhr7.send();
        xhr7.onreadystatechange = function () {
            if (xhr7.readyState === 4 && xhr7.status >= 200 && xhr7.status < 300) {
                for (var i = 0; i <= 39; i++) {
                    img3[i].src = xhr7.response.playlists[i].coverImgUrl;
                    p3[i].innerHTML = xhr7.response.playlists[i].name;
                    playcount1[i].innerHTML = xhr7.response.playlists[i].playCount;
                }

            }
        }
    })
    //singers 歌手
    var lang = this.document.querySelector('.lang');
    var langli = lang.querySelectorAll('li');

    var classify = this.document.querySelector('.classify');
    var classifyli = classify.querySelectorAll('li');

    var screen = this.document.querySelector('.screen');
    var screenli = screen.querySelectorAll('li');

    var singers = this.document.querySelector('.singers');
    var img4 = this.document.querySelectorAll('#geshou');
    var p4 = this.document.querySelectorAll('.p4')

    var singerdetail = this.document.querySelector('.singerdetail');
    var datou = this.document.querySelector('.datou');
    var mz = this.document.querySelector('.mz');
    var describe = this.document.querySelector('.describe');
    var hot50 = this.document.querySelectorAll('.hot50');
    var qmz = this.document.querySelectorAll('.qmz');
    var hotsing = this.document.querySelectorAll('.hotsing');
    for (var i = 0; i <= 49; i = i + 2) {
        hot50[i].style.backgroundColor = '#f9f9f9';
    }
    var xhr8 = new XMLHttpRequest();
    xhr8.responseType = 'json';
    xhr8.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&type=-1&area=-1&initial=-1');
    xhr8.send();
    xhr8.onreadystatechange = function () {
        if (xhr8.readyState === 4 && xhr8.status >= 200 && xhr8.status < 300) {
            for (var i = 0; i <= 59; i++) {
                langli[0].className = 'new';
                classifyli[0].className = 'new';
                screenli[0].className = 'new';
                img4[i].src = xhr8.response.artists[i].img1v1Url;
                p4[i].innerHTML = xhr8.response.artists[i].name;
            }

            singers.onclick = function (e) {
                e = e || window.event;
                // console.log(xhr11.response.result[e.target.alt].id);
                var songid = (xhr8.response.artists[e.target.alt].id).toString();
                console.log(songid);
                singerdetail.style.display = 'block';
                findmusic.style.display = 'none';
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                var xhr20 = new XMLHttpRequest();
                xhr20.responseType = 'json';
                xhr20.open('GET', 'http://redrock.udday.cn:2022/artist/detail?id=0' + songid);
                xhr20.send();
                xhr20.onreadystatechange = function () {
                    if (xhr20.readyState === 4 && xhr20.status >= 200 && xhr20.status < 300) {
                        datou.src = xhr20.response.data.artist.cover;
                        mz.innerHTML = xhr20.response.data.artist.name;
                        describe.innerHTML = xhr20.response.data.artist.briefDesc;
                        var xhr21 = new XMLHttpRequest();
                        xhr21.responseType = 'json';
                        xhr21.open('GET', 'http://redrock.udday.cn:2022/artist/top/song?id=' + songid);
                        xhr21.send();
                        xhr21.onreadystatechange = function () {
                            if (xhr21.readyState === 4 && xhr21.status >= 200 && xhr21.status < 300) {
                                for (var i = 0; i <= 49; i++) {
                                    qmz[i].innerHTML = xhr21.response.songs[i].name;
                                }
                                singerdetail.onclick = function (e) {
                                    e = e || window.event;
                                    // console.log(e.target.id);
                                    var hotsongid = (xhr21.response.songs[e.target.id].id).toString();
                                    console.log(hotsongid);
                                    var sxhr = new XMLHttpRequest();
                                    sxhr.responseType = 'json';
                                    sxhr.open('GET', 'http://redrock.udday.cn:2022/song/url?id=' + hotsongid);
                                    sxhr.send();
                                    sxhr.onreadystatechange = function () {
                                        if (sxhr.readyState === 4 && sxhr.status >= 200 && sxhr.status < 300) {
                                            //console.log(sxhr.response.data[0].url)
                                            audio.src = sxhr.response.data[0].url;
                                        }
                                    }
                                    //2、歌词部分
                                    //初始化页面
                                    lyrics.addEventListener('click', function () {
                                        detail.style.display = 'block'
                                        singerdetail.style.display = 'none'
                                        var xhrgc = new XMLHttpRequest();
                                        xhrgc.responseType = 'json';
                                        xhrgc.open('GET', 'http://redrock.udday.cn:2022/lyric?id=' + hotsongid);
                                        xhrgc.send();
                                        xhrgc.onreadystatechange = function () {
                                            if (xhrgc.readyState === 4 && xhrgc.status >= 200 && xhrgc.status < 300) {
                                                //剔除时间 提炼歌词
                                                //正则 难    采用split
                                                function init() {
                                                    var ci = xhrgc.response.lrc.lyric.split('[')
                                                    ci.forEach(function (current) {
                                                        var h = current.split(']');
                                                        var newci = h[1];
                                                        var lyricstime = h[0].split('.');
                                                        //console.log(lyricstime);
                                                        var newlyricstime = lyricstime[0].split(':');
                                                        var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]);
                                                        //console.log(newlyricstime1);
                                                        if (newci) {
                                                            dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                        }


                                                    })

                                                }
                                                init();
                                            }
                                        }


                                    })
                                    var xhrd = new XMLHttpRequest();
                                    xhrd.responseType = 'json';
                                    xhrd.open('GET', 'http://redrock.udday.cn:2022/song/detail?ids=' + hotsongid);
                                    xhrd.send();
                                    xhrd.onreadystatechange = function () {
                                        if (xhrd.readyState === 4 && xhrd.status >= 200 && xhrd.status < 300) {
                                            dsong.innerHTML = xhrd.response.songs[0].name;
                                            if (xhrd.response.songs[0].alia[0]) {
                                                dsinger.innerHTML = '<p>' + xhrd.response.songs[0].alia[0] + '</p>';
                                            }
                                            dsinger.innerHTML += '<p>' + xhrd.response.songs[0].ar[0].name + '</p>';
                                            dimg.src = xhrd.response.songs[0].al.picUrl;
                                            leftimg.src = xhrd.response.songs[0].al.picUrl;
                                            bname.innerHTML = xhrd.response.songs[0].name;
                                            bsinger.innerHTML = xhrd.response.songs[0].ar[0].name;
                                        }
                                    }
                                    //歌曲评论
                                    var xhrconmment = new XMLHttpRequest();
                                    xhrconmment.responseType = 'json';
                                    xhrconmment.open('GET', 'http://redrock.udday.cn:2022/comment/music?id=' + hotsongid);
                                    xhrconmment.send();
                                    xhrconmment.onreadystatechange = function () {
                                        if (xhrconmment.readyState === 4 && xhrconmment.status >= 200 && xhrconmment.status < 300) {
                                            for (var i = 0; i <= 14; i++) {
                                                touxiang[i].src = xhrconmment.response.hotComments[i].user.avatarUrl;
                                                content[i].innerHTML = xhrconmment.response.hotComments[i].user.nickname;
                                                content[i].innerHTML += ':  ' + xhrconmment.response.hotComments[i].content;
                                                comtime[i].innerHTML = xhrconmment.response.hotComments[i].timeStr;
                                                like[i].innerHTML += xhrconmment.response.hotComments[i].likedCount;
                                            }

                                        }
                                    }
                                }


                            }
                        }

                    }
                }

            }
        }
    }
    langli[0].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    langli[1].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    langli[2].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    langli[3].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    langli[4].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    langli[5].addEventListener('click', function () {
        for (var i = 0; i <= 5; i++) {
            langli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    classifyli[0].addEventListener('click', function () {
        for (var i = 0; i <= 3; i++) {
            classifyli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    classifyli[1].addEventListener('click', function () {
        for (var i = 0; i <= 3; i++) {
            classifyli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    classifyli[2].addEventListener('click', function () {
        for (var i = 0; i <= 3; i++) {
            classifyli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    classifyli[2].addEventListener('click', function () {
        for (var i = 0; i <= 3; i++) {
            classifyli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    classifyli[3].addEventListener('click', function () {
        for (var i = 0; i <= 3; i++) {
            classifyli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[0].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[1].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[2].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[3].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[4].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[5].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[6].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[7].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[8].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[9].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[10].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[11].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[12].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[13].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[14].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[15].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[16].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[17].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[18].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[19].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[20].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[21].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[22].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[23].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[24].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[25].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[26].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    screenli[27].addEventListener('click', function () {
        for (var i = 0; i <= 27; i++) {
            screenli[i].className = '';
        }
        this.className = 'new';
        for (var k = 0; k <= 5; k++) {
            if (langli[k].className == 'new') {
                for (var i = 0; i <= 3; i++) {
                    if (classifyli[i].className == 'new') {
                        for (var j = 0; j <= 27; j++) {
                            if (screenli[j].className == 'new') {
                                // console.log(classifyli[i].id);
                                // console.log(screenli[j].id);

                                var xhr9 = new XMLHttpRequest();
                                xhr9.responseType = 'json';
                                xhr9.open('GET', 'http://redrock.udday.cn:2022/artist/list?limit=60&area=' + langli[k].id.substring(0) + '&type=' + classifyli[i].id.substring(0) + '&initial=' + screenli[j].id.substring(0));
                                xhr9.send();
                                xhr9.onreadystatechange = function () {
                                    if (xhr9.readyState === 4 && xhr9.status >= 200 && xhr9.status < 300) {
                                        for (var i = 0; i <= 59; i++) {
                                            img4[i].src = xhr9.response.artists[i].img1v1Url;
                                            p4[i].innerHTML = xhr9.response.artists[i].name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    })
    //排行榜
    var list = this.document.querySelector('.List');
    var img5 = list.querySelectorAll('img');
    var img6 = this.document.querySelectorAll('#bang');
    var p5 = this.document.querySelectorAll('.p5')
    var xhr10 = new XMLHttpRequest();
    xhr10.responseType = 'json';
    xhr10.open('GET', 'http://redrock.udday.cn:2022/toplist');
    xhr10.send();
    xhr10.onreadystatechange = function () {
        if (xhr10.readyState === 4 && xhr10.status >= 200 && xhr10.status < 300) {
            for (var i = 0; i <= 3; i++) {
                img5[i].src = xhr10.response.list[i].coverImgUrl;
            }
            for (var i = 4; i <= 34; i++) {
                img6[i - 4].src = xhr10.response.list[i].coverImgUrl;
                p5[i - 4].innerHTML = xhr10.response.list[i].name;
            }
        }
    }
    //飙升榜
    var biaosh = this.document.querySelector('.biaosh');
    var on1 = this.document.querySelectorAll('.on1');
    var tw1 = this.document.querySelectorAll('.tw1');
    var xhrbs = new XMLHttpRequest();
    xhrbs.responseType = 'json';
    xhrbs.open('GET', 'http://redrock.udday.cn:2022/playlist/detail?id=19723756');
    xhrbs.send();
    xhrbs.onreadystatechange = function () {
        if (xhrbs.readyState === 4 && xhrbs.status >= 200 && xhrbs.status < 300) {
            for (var i = 0; i <= 4; i++) {
                on1[i].innerHTML = xhrbs.response.playlist.tracks[i].name;
                tw1[i].innerHTML = xhrbs.response.playlist.tracks[i].ar[0].name;
            }

        }
    }
    //新歌榜
    var on2 = this.document.querySelectorAll('.on2');
    var tw2 = this.document.querySelectorAll('.tw2');
    var xhrxg = new XMLHttpRequest();
    xhrxg.responseType = 'json';
    xhrxg.open('GET', 'http://redrock.udday.cn:2022/playlist/detail?id=3779629');
    xhrxg.send();
    xhrxg.onreadystatechange = function () {
        if (xhrxg.readyState === 4 && xhrxg.status >= 200 && xhrxg.status < 300) {
            for (var i = 0; i <= 4; i++) {
                on2[i].innerHTML = xhrxg.response.playlist.tracks[i].name;
                tw2[i].innerHTML = xhrxg.response.playlist.tracks[i].ar[0].name;
            }
        }
    }
    //原创榜
    var on3 = this.document.querySelectorAll('.on3');
    var tw3 = this.document.querySelectorAll('.tw3');
    var xhryc = new XMLHttpRequest();
    xhryc.responseType = 'json';
    xhryc.open('GET', 'http://redrock.udday.cn:2022/playlist/detail?id=2884035');
    xhryc.send();
    xhryc.onreadystatechange = function () {
        if (xhryc.readyState === 4 && xhryc.status >= 200 && xhryc.status < 300) {
            for (var i = 0; i <= 4; i++) {
                on3[i].innerHTML = xhryc.response.playlist.tracks[i].name;
                tw3[i].innerHTML = xhryc.response.playlist.tracks[i].ar[0].name;
            }
        }
    }
    //热歌榜
    var on4 = this.document.querySelectorAll('.on4');
    var tw4 = this.document.querySelectorAll('.tw4');
    var xhrrg = new XMLHttpRequest();
    xhrrg.responseType = 'json';
    xhrrg.open('GET', 'http://redrock.udday.cn:2022/playlist/detail?id=3778678');
    xhrrg.send();
    xhrrg.onreadystatechange = function () {
        if (xhrrg.readyState === 4 && xhrrg.status >= 200 && xhrrg.status < 300) {
            for (var i = 0; i <= 4; i++) {
                on4[i].innerHTML = xhrrg.response.playlist.tracks[i].name;
                tw4[i].innerHTML = xhrrg.response.playlist.tracks[i].ar[0].name;
            }

        }
    }
    //latest 最新音乐
    var lyrics = this.document.querySelector('.lyrics');
    var detail = this.document.querySelector('.detail');
    var dlyrics = this.document.querySelector('.dlyrics');
    var dsong = this.document.querySelector('.dsong');
    var dsinger = this.document.querySelector('.dsinger');
    var dimg = this.document.querySelector('.zhuan');
    var leftimg = document.querySelector('.leftimg');
    var bname = document.querySelector('.bname');
    var bsinger = document.querySelector('.bsinger');
    var touxiang = this.document.querySelectorAll('.touxiang');
    var content = this.document.querySelectorAll('.content');
    var comtime = this.document.querySelectorAll('.comtime');
    var like = this.document.querySelectorAll('.like');

    var songs = this.document.querySelector('.songs');
    var songsli = songs.querySelectorAll('li');
    var songsimg = this.document.querySelectorAll('#LM');
    var name = document.querySelectorAll('.name');
    var writer1 = document.querySelectorAll('.writer1');

    var last = this.document.querySelector('.last');
    var next = this.document.querySelector('.next');
    for (var i = 0; i <= 99; i++) {
        if (i % 2 != 0) {
            songsli[i - 1].style.backgroundColor = '#f9f9f9';
        }
    }
    var xhr11 = new XMLHttpRequest();
    xhr11.responseType = 'json';
    xhr11.open('GET', 'http://redrock.udday.cn:2022/personalized/newsong?limit=100');
    xhr11.send();
    xhr11.onreadystatechange = function () {
        if (xhr11.readyState === 4 && xhr11.status >= 200 && xhr11.status < 300) {
            for (var i = 0; i <= 99; i++) {
                songsimg[i].src = xhr11.response.result[i].picUrl;
                name[i].innerHTML = xhr11.response.result[i].name
                writer1[i].innerHTML = xhr11.response.result[i].song.artists[0].name
            }
            songs.onclick = function (e) {
                e = e || window.event;
                // console.log(xhr11.response.result[e.target.alt].id);
                var songid = (xhr11.response.result[e.target.alt].id).toString();
                console.log(songid);
                var sxhr = new XMLHttpRequest();
                sxhr.responseType = 'json';
                sxhr.open('GET', 'http://redrock.udday.cn:2022/song/url?id=' + songid);
                sxhr.send();
                sxhr.onreadystatechange = function () {
                    if (sxhr.readyState === 4 && sxhr.status >= 200 && sxhr.status < 300) {
                        //console.log(sxhr.response.data[0].url)
                        audio.src = sxhr.response.data[0].url;
                    }
                }
                next.addEventListener('click', function () {
                    songid = (xhr11.response.result[(e.target.alt)++].id).toString();
                    console.log(songid);
                    var nsxhr = new XMLHttpRequest();
                    nsxhr.responseType = 'json';
                    nsxhr.open('GET', 'http://redrock.udday.cn:2022/song/url?id=' + songid);
                    nsxhr.send();
                    nsxhr.onreadystatechange = function () {
                        if (nsxhr.readyState === 4 && nsxhr.status >= 200 && nsxhr.status < 300) {
                            //console.log(sxhr.response.data[0].url)
                            audio.src = nsxhr.response.data[0].url;

                            //2、歌词部分
                            //初始化页面
                            lyrics.addEventListener('click', function () {
                                detail.style.display = 'block'
                                var xhrgc = new XMLHttpRequest();
                                xhrgc.responseType = 'json';
                                xhrgc.open('GET', 'http://redrock.udday.cn:2022/lyric?id=' + songid);
                                xhrgc.send();
                                xhrgc.onreadystatechange = function () {
                                    if (xhrgc.readyState === 4 && xhrgc.status >= 200 && xhrgc.status < 300) {
                                        //剔除时间 提炼歌词
                                        //正则 难    采用split
                                        function init() {
                                            var ci = xhrgc.response.lrc.lyric.split('[')
                                            ci.forEach(function (current) {
                                                var h = current.split(']');
                                                var newci = h[1];
                                                var lyricstime = h[0].split('.');
                                                //console.log(lyricstime);
                                                var newlyricstime = lyricstime[0].split(':');
                                                var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]);
                                                //console.log(newlyricstime1);
                                                if (newci) {
                                                    dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                }
                                                /*  if (lyricstime[1]) {
                                                     var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]) +parseInt(lyricstime[1].substring(0, 2)) / 100;
                                                     console.log(newlyricstime1);
                                                     if (newci) {
                                                         dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                     }
                                                 } */

                                            })

                                        }
                                        init();
                                    }
                                }


                            })
                            var xhrd = new XMLHttpRequest();
                            xhrd.responseType = 'json';
                            xhrd.open('GET', 'http://redrock.udday.cn:2022/song/detail?ids=' + songid);
                            xhrd.send();
                            xhrd.onreadystatechange = function () {
                                if (xhrd.readyState === 4 && xhrd.status >= 200 && xhrd.status < 300) {
                                    dsong.innerHTML = xhrd.response.songs[0].al.name;
                                    dsinger.innerHTML = '';
                                    if (xhrd.response.songs[0].alia[0]) {
                                        dsinger.innerHTML = '<p>' + xhrd.response.songs[0].alia[0] + '</p>';
                                    }
                                    dsinger.innerHTML += '<p>' + xhrd.response.songs[0].ar[0].name + '</p>';
                                    dimg.src = xhrd.response.songs[0].al.picUrl;
                                    leftimg.src = xhrd.response.songs[0].al.picUrl;
                                    bname.innerHTML = xhrd.response.songs[0].al.name;
                                    bsinger.innerHTML = xhrd.response.songs[0].ar[0].name;
                                }
                            }
                            //歌曲评论
                            var xhrconmment = new XMLHttpRequest();
                            xhrconmment.responseType = 'json';
                            xhrconmment.open('GET', 'http://redrock.udday.cn:2022/comment/music?id=' + songid);
                            xhrconmment.send();
                            xhrconmment.onreadystatechange = function () {
                                if (xhrconmment.readyState === 4 && xhrconmment.status >= 200 && xhrconmment.status < 300) {
                                    for (var i = 0; i <= 14; i++) {
                                        touxiang[i].src = xhrconmment.response.hotComments[i].user.avatarUrl;
                                        content[i].innerHTML = xhrconmment.response.hotComments[i].user.nickname;
                                        content[i].innerHTML += ':  ' + xhrconmment.response.hotComments[i].content;
                                        comtime[i].innerHTML = xhrconmment.response.hotComments[i].timeStr;
                                        like[i].innerHTML += xhrconmment.response.hotComments[i].likedCount;
                                    }

                                }
                            }

                        }
                    }
                })

                last.addEventListener('click', function () {
                    songid = (xhr11.response.result[(e.target.alt)--].id).toString();
                    console.log(songid);
                    var nsxhr = new XMLHttpRequest();
                    nsxhr.responseType = 'json';
                    nsxhr.open('GET', 'http://redrock.udday.cn:2022/song/url?id=' + songid);
                    nsxhr.send();
                    nsxhr.onreadystatechange = function () {
                        if (nsxhr.readyState === 4 && nsxhr.status >= 200 && nsxhr.status < 300) {
                            //console.log(sxhr.response.data[0].url)
                            audio.src = nsxhr.response.data[0].url;

                            //2、歌词部分
                            //初始化页面
                            lyrics.addEventListener('click', function () {
                                detail.style.display = 'block'
                                var xhrgc = new XMLHttpRequest();
                                xhrgc.responseType = 'json';
                                xhrgc.open('GET', 'http://redrock.udday.cn:2022/lyric?id=' + songid);
                                xhrgc.send();
                                xhrgc.onreadystatechange = function () {
                                    if (xhrgc.readyState === 4 && xhrgc.status >= 200 && xhrgc.status < 300) {
                                        //剔除时间 提炼歌词
                                        //正则 难    采用split
                                        function init() {
                                            var ci = xhrgc.response.lrc.lyric.split('[')
                                            ci.forEach(function (current) {
                                                var h = current.split(']');
                                                var newci = h[1];
                                                var lyricstime = h[0].split('.');
                                                //console.log(lyricstime);
                                                var newlyricstime = lyricstime[0].split(':');
                                                var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]);
                                                //console.log(newlyricstime1);
                                                if (newci) {
                                                    dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                }
                                                /*  if (lyricstime[1]) {
                                                     var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]) +parseInt(lyricstime[1].substring(0, 2)) / 100;
                                                     console.log(newlyricstime1);
                                                     if (newci) {
                                                         dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                                     }
                                                 } */

                                            })

                                        }
                                        init();
                                    }
                                }


                            })
                            var xhrd = new XMLHttpRequest();
                            xhrd.responseType = 'json';
                            xhrd.open('GET', 'http://redrock.udday.cn:2022/song/detail?ids=' + songid);
                            xhrd.send();
                            xhrd.onreadystatechange = function () {
                                if (xhrd.readyState === 4 && xhrd.status >= 200 && xhrd.status < 300) {
                                    dsong.innerHTML = xhrd.response.songs[0].al.name;
                                    dsinger.innerHTML = '';
                                    if (xhrd.response.songs[0].alia[0]) {
                                        dsinger.innerHTML = '<p>' + xhrd.response.songs[0].alia[0] + '</p>';
                                    }
                                    dsinger.innerHTML += '<p>' + xhrd.response.songs[0].ar[0].name + '</p>';
                                    dimg.src = xhrd.response.songs[0].al.picUrl;
                                    leftimg.src = xhrd.response.songs[0].al.picUrl;
                                    bname.innerHTML = xhrd.response.songs[0].al.name;
                                    bsinger.innerHTML = xhrd.response.songs[0].ar[0].name;
                                }
                            }
                            //歌曲评论
                            var xhrconmment = new XMLHttpRequest();
                            xhrconmment.responseType = 'json';
                            xhrconmment.open('GET', 'http://redrock.udday.cn:2022/comment/music?id=' + songid);
                            xhrconmment.send();
                            xhrconmment.onreadystatechange = function () {
                                if (xhrconmment.readyState === 4 && xhrconmment.status >= 200 && xhrconmment.status < 300) {
                                    for (var i = 0; i <= 14; i++) {
                                        touxiang[i].src = xhrconmment.response.hotComments[i].user.avatarUrl;
                                        content[i].innerHTML = xhrconmment.response.hotComments[i].user.nickname;
                                        content[i].innerHTML += ':  ' + xhrconmment.response.hotComments[i].content;
                                        comtime[i].innerHTML = xhrconmment.response.hotComments[i].timeStr;
                                        like[i].innerHTML += xhrconmment.response.hotComments[i].likedCount;
                                    }

                                }
                            }

                        }
                    }
                })

                //2、歌词部分
                //初始化页面
                lyrics.addEventListener('click', function () {
                    detail.style.display = 'block'
                    var xhrgc = new XMLHttpRequest();
                    xhrgc.responseType = 'json';
                    xhrgc.open('GET', 'http://redrock.udday.cn:2022/lyric?id=' + songid);
                    xhrgc.send();
                    xhrgc.onreadystatechange = function () {
                        if (xhrgc.readyState === 4 && xhrgc.status >= 200 && xhrgc.status < 300) {
                            //剔除时间 提炼歌词
                            //正则 难    采用split
                            function init() {
                                var ci = xhrgc.response.lrc.lyric.split('[')
                                ci.forEach(function (current) {
                                    var h = current.split(']');
                                    var newci = h[1];
                                    var lyricstime = h[0].split('.');
                                    //console.log(lyricstime);
                                    var newlyricstime = lyricstime[0].split(':');
                                    var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]);
                                    //console.log(newlyricstime1);
                                    if (newci) {
                                        dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                    }
                                    /*  if (lyricstime[1]) {
                                         var newlyricstime1 = newlyricstime[0] * 60 + parseInt(newlyricstime[1]) +parseInt(lyricstime[1].substring(0, 2)) / 100;
                                         console.log(newlyricstime1);
                                         if (newci) {
                                             dlyrics.innerHTML += '<p id="s' + newlyricstime1 + '">' + newci + '</p>';
                                         }
                                     } */

                                })

                            }
                            init();
                        }
                    }


                })
                var xhrd = new XMLHttpRequest();
                xhrd.responseType = 'json';
                xhrd.open('GET', 'http://redrock.udday.cn:2022/song/detail?ids=' + songid);
                xhrd.send();
                xhrd.onreadystatechange = function () {
                    if (xhrd.readyState === 4 && xhrd.status >= 200 && xhrd.status < 300) {
                        dsong.innerHTML = xhrd.response.songs[0].al.name;
                        if (xhrd.response.songs[0].alia[0]) {
                            dsinger.innerHTML = '<p>' + xhrd.response.songs[0].alia[0] + '</p>';
                        }
                        dsinger.innerHTML += '<p>' + xhrd.response.songs[0].ar[0].name + '</p>';
                        dimg.src = xhrd.response.songs[0].al.picUrl;
                        leftimg.src = xhrd.response.songs[0].al.picUrl;
                        bname.innerHTML = xhrd.response.songs[0].al.name;
                        bsinger.innerHTML = xhrd.response.songs[0].ar[0].name;
                    }
                }
                //歌曲评论
                var xhrconmment = new XMLHttpRequest();
                xhrconmment.responseType = 'json';
                xhrconmment.open('GET', 'http://redrock.udday.cn:2022/comment/music?id=' + songid);
                xhrconmment.send();
                xhrconmment.onreadystatechange = function () {
                    if (xhrconmment.readyState === 4 && xhrconmment.status >= 200 && xhrconmment.status < 300) {
                        for (var i = 0; i <= 14; i++) {
                            touxiang[i].src = xhrconmment.response.hotComments[i].user.avatarUrl;
                            content[i].innerHTML = xhrconmment.response.hotComments[i].user.nickname;
                            content[i].innerHTML += ':  ' + xhrconmment.response.hotComments[i].content;
                            comtime[i].innerHTML = xhrconmment.response.hotComments[i].timeStr;
                            like[i].innerHTML += xhrconmment.response.hotComments[i].likedCount;
                        }

                    }
                }

            }

        }
    }
    //新碟上架
    var newdie = this.document.querySelector('.newdie');
    var newdieimg = this.document.querySelectorAll('.pic');
    var one = this.document.querySelectorAll('.one');
    var two = this.document.querySelectorAll('.two');

    //切换按钮 change
    var changebtn = this.document.querySelector('.change');
    var changeli = changebtn.querySelectorAll('li');
    changeli[0].className = 'nowchange';
    changeli[0].addEventListener('click', function () {
        this.className = 'nowchange';
        changeli[1].className = '';
        newdie.style.display = 'none';
        songs.style.display = 'block'
    })

    changeli[1].addEventListener('click', function () {
        this.className = 'nowchange';
        changeli[0].className = '';
        songs.style.display = 'none';
        newdie.style.display = 'block';
        wait.style.display = 'block';
        var xhr12 = new XMLHttpRequest();
        xhr12.responseType = 'json';
        xhr12.open('GET', 'http://redrock.udday.cn:2022/top/album?offset=0&limit=32');
        xhr12.send();
        xhr12.onreadystatechange = function () {
            if (xhr12.readyState === 4 && xhr12.status >= 200 && xhr12.status < 300) {
                for (var i = 0; i <= 31; i++) {
                    newdieimg[i].src = xhr12.response.monthData[i].blurPicUrl;
                    one[i].innerHTML = xhr12.response.monthData[i].name;
                    two[i].innerHTML = xhr12.response.monthData[i].artist.name;

                }
                wait.style.display = 'none';
            }

        }
    })
    //核心：音乐播放器
    //封装获取元素的函数
    function get(selector) {
        return selector.substring(0, 1) == '.' ? document.getElementsByClassName(selector.substring(1)) : document.getElementById(selector.substring(1));
    }
    //1、点击播放暂停
    var flag = true;
    var start = this.document.querySelector('.start');
    var pause = this.document.querySelector('.pause');
    var audio = this.document.getElementById('audio');
    var btimer;
    start.addEventListener('click', function () {
        if (flag) {
            audio.play();
            flag = false;
            start.style.display = 'none';
            pause.style.display = 'block';
            btimer = setInterval(ProgressTime, 1000);
        }
        else {
            audio.pause();
            flag = true;
            start.style.display = 'block';
            pause.style.display = 'none';
            clearInterval(btimer);
        }
    })
    pause.addEventListener('click', function () {
        if (flag) {
            audio.play();
            flag = false;
            start.style.display = 'none';
            pause.style.display = 'block';
        }
        else {
            audio.pause();
            flag = true;
            start.style.display = 'block';
            pause.style.display = 'none';
            clearInterval(btimer);
        }
    })

    var down = this.document.querySelector('.down');
    down.addEventListener('click', function () {
        detail.style.display = 'none';
    })
    //3、歌曲进度条（根据当前运动时间求运动点）
    //小圆点运动 & 已播放歌曲的时间
    var process = this.document.querySelector('.process');
    var point = process.querySelector('svg');
    var movecolor = this.document.querySelector('.movecolor');
    function ProgressTime() {
        /* var t = audio.currentTime;
        var z = audio.duration;
        var x = process.offsetWidth;
        console.log(x); */
        var n = audio.currentTime / audio.duration;
        point.style.marginLeft = ~~(n * process.offsetWidth) + 'px';
        movecolor.style.width = n * process.offsetWidth + 'px';
    }
    //4、拖拽进度条（根据当前运动点求运动时间）- point.offsetWidth / 2
    //计算拖拽长度
    point.onmousedown = function () {
        document.onmousemove = function (e) {
            var x = e.clientX;
            var a = x - 850;
            point.style.marginLeft = a + 'px';
            movecolor.style.width = a + 'px';
            var b = (parseInt(getComputedStyle(point).marginLeft) / 18) * audio.duration;
            //var c=b* audio.duration;
            audio.currentTime = b;
            ProgressTime();
        }
        document.onmouseup = function () {
            this.onmousedown = null;
            this.onmousemove = null;
        }


    }
    //5、歌词同步
    var bcur = 0;
    audio.addEventListener('timeupdate', function () {
        // console.log(this.currentTime);
        var cur = parseInt(this.currentTime);
        if (document.getElementById('s' + cur)) {
            document.getElementById('s' + bcur).style.color = '#656565';
            document.getElementById('s' + bcur).style.fontWeight = '400';
            bcur = cur;
            document.getElementById('s' + cur).style.color = 'black';
            document.getElementById('s' + cur).style.fontWeight = '600';
            // dlyrics.scrollTop((document.getElementById('s' + cur).index() - 10) * 25);
        }

    }, 50)
    //当前时间 歌词时间
    /*   get('.start').onclick = function () {
          if (flag) {
              get('#audio').play();
              flag = false;
              console.log(flag);
              get('.start').style.display = 'none';
              get('.pause').style.display = 'block';
          }
          else {
              get('#audio').pause();
              flag = true;
              console.log(flag);
              get('.start').style.display = 'block';
              get('.pause').style.display = 'none';
          }
  
  
      } */
    /*  //var id = xhr1.response.result[i].id;
    li[i].addEventListener('click', function () {
       var xhr2 = new XMLHttpRequest();
        xhr2.responseType = 'json';
        xhr2.open('GET', 'http://redrock.udday.cn:2022/playlist/detail?id=' + xhr1.response.result[i].id.substring(0));
        xhr2.send();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4 && xhr2.status >= 200 && xhr2.status < 300) {
                console.log(xhr2.response)
            }
        } 
       console.log(i);
   })*/
})
/* var QR = this.document.querySelector('.QR');
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
}) */

