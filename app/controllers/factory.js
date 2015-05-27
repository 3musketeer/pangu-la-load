var tuxstate = require('./TuxStatePlugin'),
    tuxmem = require('./TuxMemPlugin'),
    tuxque = require('./TuxQuePlugin'),
    tuxtrade4g = require('./TuxTrade4GPlugin'),
    warning = require('./Warning'),
    tuxlcupoint = require('./TuxLcuPointPlugin'),
    alarmws3gess = require('./AlarmWS3GESSPlugin'),
    alarmwscust = require('./AlarmWSCUSTPlugin'),
    alarmwscrm = require('./AlarmWSCRMPlugin'),
    alarmwsnum = require('./AlarmWSNUMPlugin'),
    alarmwscbss = require('./AlarmWSCBSSPlugin'),
    alarmws3ghttp = require('./AlarmWS3GHTTPPlugin');

createLoader = function( type ){
    var loader;
    switch( type ){
        case "TuxState":
            loader = tuxstate.TuxStateLoader;
            break;
        case "TuxMem":
            loader = tuxmem.TuxMemLoader;
            break;
        case "TuxQue":
            loader = tuxque.TuxQueLoader;
            break;
        case "TuxTrade4G":
            loader = tuxtrade4g.TuxTrade4GLoader;
            break;
        case "Warning":
            loader = warning.WarningLoader;
            break;
        case "TuxLcuPoint":
            loader = tuxlcupoint.TuxLcuPointLoader;
            break;
        case "AlarmWS3GESS":
            loader = alarmws3gess.AlarmWS3GESSLoader;
            break;
        case "AlarmWSCUST":
            loader = alarmwscust.AlarmWSCUSTLoader;
            break;
        case "AlarmWSCRM":
            loader = alarmwscrm.AlarmWSCRMLoader;
            break;
        case "AlarmWSNUM":
            loader = alarmwsnum.AlarmWSNUMLoader;
            break;
        case "AlarmWS3GHTTP":
            loader = alarmws3ghttp.AlarmWS3GHTTPLoader;
            break;
        case "AlarmWSCBSS":
            loader = alarmwscbss.AlarmWSCBSSLoader;
            break;
        default:
            loader = null;
            break;
    }
    return loader;
}


exports.createLoader = createLoader
