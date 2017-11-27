var http = require('http')
var fs = require('fs')
var querystring = require('querystring')

http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    var str='';
    req.on('data',function(data){
        str += data

    })

    req.on('end',function(err){
        if(err) throw err;
        var json = querystring.parse(str);

        fs.readFile('szc.txt','utf-8',function(err,data){
            if(err) throw err;
            var json1=JSON.parse(data)
            console.log(json1)
            if(json1[json.user]){
                res.write('账号已注册！')
                res.end()
            }
            else{
                json1[json.user] = json.pass;
                fs.writeFile('szc.txt',JSON.stringify(json1),function(err){
                    if(err) throw err;
                    res.write('注册成功')
                    res.end()
                })
            }
        })
    })
}).listen(8000)


http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')
    var str = '';
    req.on('data',function(data){
        str += data
    })

    req.on('end',function(err){
        if(err) throw err
        var json = querystring.parse(str);

        fs.readFile('szc.txt','utf-8',function(err,data){
            if(err) throw err
            var json1 = JSON.parse(data)
            if(json1[json.user] == json.pass){
                res.write('登入成功')
                res.end()
            }
            else{
                res.write('账号或密码错误!')
                res.end()
            }
        })
    })

}).listen(8080)


http.createServer(function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*')

    var str = '';
    req.on('data',function(data){
        str += data
    })

    req.on('end',function(err){
        if(err) throw err
        var json = querystring.parse(str);

            fs.readFile('szc1.txt',function(err,data){
                if(err) throw err
                var json1 = JSON.parse(data)
                json1[json.title] = json.content
                fs.writeFile('szc1.txt',JSON.stringify(json1),function(err){
                    if(err) throw err
                    res.write(JSON.stringify(json1))
                    res.end()
            })
        })
    })

}).listen(9000)
