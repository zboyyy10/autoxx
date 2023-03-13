'ui';
//此代码只用于测试学习请24小时内进行删除!，请勿用于违法操作，产生一切后果由使用者承担全部责任!
var bs = "Mozilla/5.0 (Linux; Android 6.0.1; OPPO R9s Plus Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36"
var Token =false  
ui.layout(
    <vertical gravity='center_vertical'>
        <img id='img1' w='200' h='200' layout_gravity='center_horizontal' />
        <text layout_gravity='center_horizontal' id='t2' w='auto' h='50'  textColor="red"  />
        <button id='an1' style="Widget.AppCompat.Button.Colored" text="刷新二维码" />
        <ScrollView >
            <text gravity='center' id='t1'  w='*' h='*' textColor="red" textSize='30' />
        </ScrollView>
    </vertical>
);
//
var s = 0,
    kaiguan = true;

function URL(A, B, C) {
    this.url1 = A;
    this.url2 = B;
    this.url3 = C;
};
var m = {};
(function() {
    function cs(A, B, C) {
        this.headers1 = {
            'User-Agent': bs
        };
        this.headers2 = {
            'User-Agent': bs
        };
        this.headers3 = {
            'User-Agent': bs
        }
    };
    cs.prototype.fenpei = function(tou, daima, shuju) {
        for (var ii = 0; ii < 3; ii++) {
            var Subcode = daima[ii];
            var Subdata = shuju[ii];
            for (var i = 0; i < Subcode.length; i++) {
                if (ii == 0) {
                    this.headers1[tou[Subcode[i]]] = Subdata[i]
                } else if (ii == 1) {
                    this.headers2[tou[Subcode[i]]] = Subdata[i]
                } else if (ii == 2) {
                    this.headers3[tou[Subcode[i]]] = Subdata[i]
                }
            };
        };
    };
    cs.prototype.xiugai = function(t, C, D) { //修改
        if (t == 0) {
            if (C) {
                this.headers1['Cookie'] = C
            }
            if (D) {
                this.headers1['token'] = D
            }
        } else if (t == 1) {
            if (C) {
                this.headers2['Cookie'] = C
            }
            if (D) {
                this.headers2['token'] = D
            }
        } else if (t == 2) {
            if (C) {
                this.headers3['Cookie'] = C
            }
            if (D) {
                this.headers3['token'] = D
            }
        }
    };
    m = cs
})(this)
//0-4
var tou = ['origin', 'device-type', 'authority', 'token', 'referer'] //tou可自行添加

//开始配置
var p1 = new m
var 代码1 = [
    [0, 4],
    [1, 0, 4],
    [1, 2, 0, 4]
];
var 数据1 = [
    ['https://1aa.com', 'https://1aa.com/'],
    ['web', 'https://1aa.com', 'https://1aa.com/'],
    ['web', '1aa.com', 'https://1aa.com', 'https://1aa.com/']
];
p1.fenpei(tou, 代码1, 数据1)
//log(p1)
//结束配置(配置了一个二维码的信息，想继续添加可以以上代码为准继续添加)
var 配置url = [new URL('https://1aa.com/api/client/member/isLogin', 'https://1aa.com/api/client/member/login', 'https://1aa.com/api/client/member/isLogin')] //配置url
//
var gonmgneng = {
    getcookie: function() { //1
        let url = 配置url[s].url1
        var fh = http.get(url, {
            headers: this.fenpei(s).headers1

        }).headers['set-cookie'].match(/P([\s\S]*?);/)[0];
        var d = new Date();
        var Timestamp = ((d.getTime() / 1000).toString()).match(/\d+/g)[0];
        let t = 'promote=undefined; UM_distinctid=18676cda03880-05a33aff7a2fa5-26021051-100200-18676cda03e3; CNZZDATA1281100623=' + Timestamp + '-' + (parseInt(Timestamp) + random(200, 900)) + '- ' + (parseInt(Timestamp) + random(200, 900)) + ';';
        return this.getimg(t + fh);
    },
    getimg: function(cookie) { //2
        let url = 配置url[s].url2
        p1.xiugai(1, cookie); //添加cookie
        let fh = http.get(url, {
            headers: this.fenpei(s).headers2
        }).body.json().data
        ui.post(() => {
            ui.img1.setSource(fh.code);
        });
        return {
            token: fh.token,
            cookie: cookie
        }
    },
    
    xintiao: function(cookie, token, n) { //3
            let url = 'https://1aa.com/api/client/member/isLogin'
            for (var i = 0; i < n; i++) {
                ui.post(() => {
                    ui.t2.text(('请求时间:' + (n - i)).toString())
                });
                ret = http.post(url, {}, {
                    headers: {
                        "device-type": "web",
                        "cookie": cookie + token,
                        "origin": "https://1aa.com",
                        "referer": "https://1aa.com/",
                        "token": token,
                        "X-Requested-With": "mark.via",
                        "User-Agent": bs
                    }
                }).body.json()
                let m=ret.msg;
                if (m == '已登录') {
                    ui.post(() => {
                        ui.t1.text(m);
                    });
                    sleep(1000);
                    Token = true;
                    break;
                };
                sleep(1000);
                if (i == (n - 1)) {
                    ui.post(() => {
                        ui.t2.text('提示:二维码已失效!')
                    })
                };
            };
            if (Token) this.qiandao(cookie, token);
        },
        qiandao: function(cookie, token) {
            let url = 'https://1aa.com/api/client/member/checkIn'
            let ret = http.get(url, {
                headers: {
                    "device-type": "web",
                    "authority": ".com",
                    "cookie": cookie + token,
                    "origin": "https:1aa//com",
                    "referer": "https://1aa.com/",
                    "token": token,
                    "X-Requested-With": "mark.via",
                    "User-Agent": bs
                }
            }).body.json();
            ui.post(() => {
                let m = ui.t1.text();
                ui.t1.text(m + "\n" + ret.msg);
            });
            Token = false;
            threads.shutDownAll();
        },
        rukou: function() {
            let cookie_token = this.getcookie();
            sleep(1000)
            this.xintiao(cookie_token.cookie, cookie_token.token, 30);
        },
       
    fenpei: function(s) {//如果继续添加配置需要继续添加代码
        if (s == 0) return p1
    }
};

threads.start(function() {
    gonmgneng.rukou();
})