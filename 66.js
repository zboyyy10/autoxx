"ui";
var Refresh = false,
    img, token, Cookie, txt = '',
    rk;
var s = 0;
var bs = "Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Plus Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36"

var URL = [
    new url_obj('第一个960服', 'http://www.cq17.com/index/Index/index.html', 'http://www.cq17.com/index/Index/getuniaccqrcode.html', "http://www.cq17.com/index/Index/checkAuth.html", 'http://www.cq17.com/index/User/index.html', 'http://www.cq17.com/index/User/usign.html'),
    new url_obj('第二个345服', 'http://wwww.345cq.com:12345/', 'http://wwww.345cq.com:12345/index/Index/getuniaccqrcode.html', 'http://wwww.345cq.com:12345/index/Index/checkAuth.html', 'http://wwww.345cq.com:12345/index/User/index.html', 'http://wwww.345cq.com:12345/index/User/usign.html'),
    new url_obj('第三个418服', 'http://www.418f.com/index/Index/index.html', 'http://www.418f.com/index/Index/getuniaccqrcode.html', "http://www.418f.com/index/Index/checkAuth.html", 'http://www.418f.com/index/User/index.html', 'http://www.418f.com/index/User/usign.html'),
    new url_obj('第四个567服', 'http://www.567cq.com/index/Index/index.html', 'http://www.567cq.com/index/Index/getuniaccqrcode.html', "http://www.567cq.com/index/Index/checkAuth.html", 'http://www.567cq.com/index/User/index.html', 'http://www.567cq.com/index/User/usign.html')
];
var Xy = [ //3
    new xyt2_obj({}, {}, "//www.cq17.com", "http://www.cq17.com/index/Index/index.html", {}, {}, {}, "http://www.cq17.com/index/Index/index.html", "www.cq17.com", "http://www.cq17.com", {}, "http://www.cq17.com/index/User/index.html"),
    new xyt_obj('wwww.345cq.com:12345', 'http://wwww.345cq.com:12345', {}, 'http://wwww.345cq.com:12345/', 'wwww.345cq.com:12345', {}, {}, 'http://wwww.345cq.com:12345/', 'wwww.345cq.com:12345', 'http://wwww.345cq.com:12345', {}, 'http://wwww.345cq.com:12345/index/User/index.html'),
    new xyt2_obj({}, {}, "//www.418f.com", "http://www.418f.com/index/Index/index.html", {}, {}, {}, "http://www.418f.com/index/Index/index.html", "www.418f.com", "http://www.418f.com", {}, "http://www.418f.com/index/User/index.html"),
    new xyt2_obj({}, {}, "//www.567cq.com", "http://www.567cq.com/index/Index/index.html", {}, {}, {}, "http://www.567cq.com/index/Index/index.html", "www.567cq.com", "http://www.567cq.com", {}, "http://www.567cq.com/index/User/index.html")
];

function url_obj(m, url1, url2, url3, url4, url5) {
    this.bq = m;
    this.url1 = url1;
    this.url2 = url2;
    this.url3 = url3;
    this.url4 = url4;
    this.url5 = url5;
};

function xyt_obj(Referer, Cookie, User) {
    this.xy = {
        'Referer': Referer,
        'Cookie': Cookie,
        'User-Agent': User
    }
};

function xyt2_obj(a, b, c, d, aa, bb, cc, dd, aaa, bbb, ccc, ddd) {
    this.Host3 = a;
    this.Origin3 = b;
    this.http3 = c;
    this.Referer3 = d;
    this.Host4 = aa;
    this.Origin4 = bb;
    this.http4 = cc;
    this.Referer4 = dd;
    this.Host5 = aaa;
    this.Origin5 = bbb;
    this.http5 = ccc;
    this.Referer5 = ddd;
};

var Arsenal = {
    //1
    Getp: function(url) {
        return http.get(url.url1, {
            headers: {
                "User-Agent": bs
            }
        }).headers['Set-Cookie'];
    },
    Getcookie: function(url) {
        var d = new Date();
        var Timestamp = ((d.getTime() / 1000).toString()).match(/\d+/g)[0];
        return this.Getp(url).replace(' path=/', 'Hm_lvt_1f2702b808a51604ffe7a7fd7268adf2=' + Timestamp + '; Hm_lpvt_1f2702b808a51604ffe7a7fd7268adf2=' + (parseInt(Timestamp) + random(200, 900)));
    },
    //2
    Getimg: function(cookie, url) {
        var n = http.post(url.url2, {}, {
            headers: {
                "User-Agent": bs,
                "Cookie": cookie
            }
        }).body.json();
        return {
            url: n.data,
            token: n.token,
            cookie: cookie
        };
    }, //4
    Logdr: function(cookie, url) {
        let x = new xyt_obj(Xy[s].Referer4, cookie, bs);
        var n = http.get(url.url4, {
            headers: x.xy
        }).body.string();
        if (/会员账号: /.test(n)) {
            var ze = /会员账号: ([\s\S]*?) | ID/g
            var qq =s+1
           // txt +="当前第"+qq+ n.match(ze)[0] + '\n'
           txt +="当前第"+qq
            ui.post(() => {
                ui.t1.text(txt);
            })
            sleep(500)
            this.Sign(cookie, url);
        } else {
            return false;
        };
    }, //5
    Sign: function(cookie, url) {
        let xx = Xy[s];
        let x = new xyt_obj(xx.Referer5, cookie, bs);
        x.xy.Host = xx.Host5;
        x.xy.Origin = xx.Origin5;
        ret = http.get(url.url5, {
            headers: x.xy
        }).body.string();
        txt += ret + '\n';
        ui.post(() => {
            ui.t1.text(txt.toString());
        })
        threads.shutDownAll();
    }, //3
    Heartbeat: function(token, cookie, n, url) {
        ui.post(() => {
            ui.bq1.text(url.bq)
        })
        var rt = {};
        let x = new xyt_obj(Xy[s].Referer3, cookie, bs);
        if (s == 0) {
            x.xy.http = Xy[s].http3
        };
        log(x)
        for (var i = 0; i < n; i++) {
            ui.post(() => {
                ui.t2.text(('请求时间:' + (n - i)).toString())
            });
            ret = http.post(url.url3, {
                'token': token
            }, {
                headers: x.xy
            }).body.string();
           // log(ret)
           var qq =s+1
            if (/登录成功/.test(ret)) {
                ui.post(() => {
                    txt += '登录成功'
                    ui.t1.text(txt.toString());
                });
                sleep(500);
                this.Logdr(cookie, url);
            };
            sleep(1000);
            if (i == (n - 1)) {
                ui.post(() => {
                    ui.t2.text('提示:二维码已失效!')
                })
            };
        };
    },
    failed: function() {
        ui.post(() => {
            ui.t2.text("提示:请求失败,请重新请求!");
        });
        threads.shutDownAll();
    }
};
入口(s);
ui.layout(
    <vertical gravity='center_vertical'>
        <text id='bq1' text='账号数量'  gravity='center'  textColor="red" textSize='30'  />
        <img id='img1' w='200' h='200' layout_gravity='center_horizontal' />
        <text layout_gravity='center_horizontal' id='t2' w='auto' h='50'  textColor="red"  />
        <horizontal>
        <button id='an1'w='180' style="Widget.AppCompat.Button.Colored" text="刷新二维码" />
        <button id='an4'w='*' style="Widget.AppCompat.Button.Colored" text="清空日志" />
        </horizontal>
        <horizontal>
        <button id='an3'w='180' style="Widget.AppCompat.Button.Colored" text="上一个" />
        <button id='an2' w='*'style="Widget.AppCompat.Button.Colored" text="下一个" />
        </horizontal>
        <horizontal>
        <button id='q1'w='90' style="Widget.AppCompat.Button.Colored" text="1aa" />
        <button id='q2' w='90'style="Widget.AppCompat.Button.Colored" text="2ee" />
        <button id='q3' w='90'style="Widget.AppCompat.Button.Colored" text="7kk" />
        <button id='q4' w='*'style="Widget.AppCompat.Button.Colored" text="六合一" />
        </horizontal>
         <ScrollView >
            <text gravity='center' id='t1'  w='*' h='*' textColor="red" textSize='20'/>
        </ScrollView>
    </vertical>
);
ui.an1.click(() => {
    入口(s);
});
ui.an2.click(() => {
    s++;
    if (s >= URL.length) {
        toast('超出范围!')
    } else {
        入口(s);
    }
});
ui.an3.click(() => {
    s--;
    if (s = 0) {
        toast('超出范围!')
    } else {
        入口(s);
    }
});
ui.an4.click(() => {

ui.t1.text(txt="");
})
ui.q1.on("click", () => {
    toast("1aa")
    var e1 = engines.execScriptFile("./1aaqiandao.js");
   
   engines.myEngine().forceStop();

   
   });
   ui.q2.on("click", () => {
    toast("2ee")
    var e2 = engines.execScriptFile("./2eeqiandao.js");
   engines.myEngine().forceStop();

   });
   ui.q3.on("click", () => {
    toast("77k")
    var e3 = engines.execScriptFile("./77kqiandao.js");
   
  
  engines.myEngine().forceStop();


   
   
   });
   ui.q4.on("click", () => {
    toast("主页")
    var e4 = engines.execScriptFile("./66.js");
   engines.myEngine().forceStop();

   });
function 入口(i) {
    let url = URL[i];
    threads.shutDownAll();
    var sum = threads.disposable();
    threads.start(function() {
        img = Arsenal.Getimg(Arsenal.Getcookie(url), url);
        sum.setAndNotify(img);
    });
    img = sum.blockedGet();
    ui.post(() => {
        ui.img1.setSource(img.url);
    })
    if (img) {
        threads.start(function() {
            log(img)
            Arsenal.Heartbeat(img.token, img.cookie, 50, url);
        });
    }
};