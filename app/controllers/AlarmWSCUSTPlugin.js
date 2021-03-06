var LaEngine = require('./LaEngine').LaEngine,
	logger = require('../../log').logger;

function AlarmWSCUSTParser(host) {
	return function(data,next) {
        try{
            var arr = data.data.split(String.fromCharCode(1))
            var obj = {
                host: host,
                smsid: arr[0],
//                sysid: arr[1],
//                svccode: arr[2],
//                messagetype: arr[3],
                servicename: arr[4],
                operatename: arr[5],
                reqtime: arr[6],
                rsptime: arr[7],
//                actionrelation: arr[8],
//                routetype: arr[9],
//                routevalue: arr[10],
//                procid: arr[11],
//                transido: arr[12],
//                processtime: arr[13],
                rsptype: arr[14],
                rspcode: arr[15],
                rspdesc: arr[16]
//                operid: arr[17],
//                provincecode: arr[18],
//                eparchycode: arr[19],
//                citycode: arr[20],
//                channelid: arr[21],
//                channeltype: arr[22],
//                accesstype: arr[23],
//                ordertype: arr[24]
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

exports.AlarmWSCUSTLoader = function(data, host){
	var engine = new LaEngine();
	engine.add(AlarmWSCUSTParser(host)) //解析字串
		.add(engine.save("YYYYMMDD"))    //分主机按天保存
        .add(engine.group("Group",function(data){ //分主机统计
            var count = {};
            count[data['rspcode']] = 1;
            return {"$inc": count}
        },{
            groupHost : function(data){
                return {'host': data.host, 'servicename': data.servicename, 'operatename': data.operatename}
            },
            groupAll : function(data){
                return {'host': "all", 'servicename': data.servicename, 'operatename': data.operatename}
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
                return {"host": data.host};
            },
            byHostSvr: function(data){
                return {"host": data.host, "servicename": data.servicename}
            },
            byHostOpr: function(data){
                return {"host": data.host, "operatename": data.operatename}
            },
            byAll: function(data){
                return {"host": "all"};
            },
            byAllSvr: function(data){
                return {"host": "all", "servicename": data.servicename}
            },
            byAllOpr: function(data){
                return {"host": "all", "operatename": data.operatename}
            }
        }, "day"))
		.add(engine.showError())//显示错误
		.run(data,"AlarmWSCUST");
}
