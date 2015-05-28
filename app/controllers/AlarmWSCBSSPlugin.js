var LaEngine = require('./LaEngine').LaEngine,
	logger = require('../../log').logger;

function AlarmWSCBSSParser(host) {
	return function(data,next) {
        try{
            var arr = data.data.split(String.fromCharCode(1))
            var obj = {
                host: host,
                smsid: arr[0],
                servicename: arr[4],
                operatename: arr[5],
                reqtime: arr[6],
                rsptime: arr[7],
                rspcode: arr[12],
                rspdesc: arr[13]
            };
            
            obj.timestamp = (new Date(obj.reqtime)).getTime();

            data.data = obj;
            data.date = obj.timestamp;
            next();
        }catch(e){
			next(new Error("error format."));
        }
	}
}

exports.AlarmWSCBSSLoader = function(data, host){
	var engine = new LaEngine();
	engine.add(AlarmWSCBSSParser(host)) //解析字串
		.add(engine.save("YYYYMMDD"))    //分主机按天保存
        .add(engine.group("GroupHost",function(data){ //分主机统计
            var count = {};
            count[data['rspcode']] = 1;
            return {"$inc": count}
        },{
            group : function(data){
                return {'host': data.host, 'servicename': data.servicename, 'operatename': data.operatename}
            }
        },"day"))
        .add(engine.group("Group",function(data){ //分组统计Alarm_WS所有主机记录
            var count = {};
            count[data['rspcode']] = 1;
            return {"$inc": count}
        },{
            group : function(data){
                return {'servicename': data.servicename, 'operatename': data.operatename}
            }
        },"day"))
        .add(engine.sum("CalledSum", function(data){
            var count = {}
            if(data["rspcode"] == "0000"){
                count["0000"] = 1;
            }
            count["_total"] = 1;
            return count;
        }, {
            byHost: function(data){
                var obj = {}; obj['host'] = data.host;
                return obj;
            },
            byAll: function(data){
                return {"host": "all"};
            }
        }, "day"))
		.add(engine.showError())//显示错误
		.run(data,"AlarmWSCBSS");
}
