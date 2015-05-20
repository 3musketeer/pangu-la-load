var LaEngine = require('./LaEngine').LaEngine,
	logger = require('../../log').logger;

function Alarm3GESSParser(host) {
	return function(data,next) {
        try{
            var obj = JSON.parse(data.data);
            obj.host = host;
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
		.add(engine.showError())//显示错误
		.run(data,"Alarm3GESS");
}
