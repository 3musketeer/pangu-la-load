var LaEngine = require('./LaEngine').LaEngine,
	logger = require('../../log').logger;

function Alarm3GESSParser(host) {
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
                routevalue: arr[10],
                procid: arr[11],
                transido: arr[12],
//                processtime: arr[13],
                rsptype: arr[14],
                rspcode: arr[15],
                rspdesc: arr[16],
                operid: arr[17],
                provincecode: arr[18],
                eparchycode: arr[19],
                citycode: arr[20],
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

exports.Alarm3GESSLoader = function(data, host){
	var engine = new LaEngine();
	engine.add(Alarm3GESSParser(host)) //解析字串
		.add(engine.save("YYYYMMDD"))    //分主机按天保存
        .add(engine.group("Group",function(data){
            var count = {};
            count[data['rspcode']] = 1;
            return {"$inc": count}
        },{
            group1 : function(data){
                return {'host': data.host, 'type': 'code', 'servicename': data.servicename}
            },
            group2 : function(data){
                return {'host': data.host, 'type': 'code', 'operatename': data.operatename}
            }
        },"day"))
/*        .add(engine.group("Group", function(data){
            var count = {};
            count[data['rspdesc']] = 1;
            return {"$inc": count}
        },{
            group1 : function(data){
                return {'host': data.host, 'type': 'desc', 'servicename': data.servicename}
            },
            group2 : function(data){
                return {'host': data.host, 'type': 'desc', 'operatename': data.operatename}
            }
        },"day"))
*/		.add(engine.showError())//显示错误
		.run(data,"Alarm3GESS");
}
