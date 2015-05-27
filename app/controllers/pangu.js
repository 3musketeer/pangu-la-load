var TuxStateLoader = require('./TuxStatePlugin').TuxStateLoader,
    TuxMemLoader = require('./TuxMemPlugin').TuxMemLoader,
    TuxQueLoader = require('./TuxQuePlugin').TuxQueLoader,
    TuxTrade4GLoader = require('./TuxTrade4GPlugin').TuxTrade4GLoader,
    WarningLoader = require('./Warning').WarningLoader,
    TuxLcuPointLoader = require('./TuxLcuPointPlugin').TuxLcuPointLoader,
    AlarmWS3GESSLoader = require('./AlarmWS3GESSPlugin').AlarmWS3GESSLoader,
    AlarmWSCUSTLoader = require('./AlarmWSCUSTPlugin').AlarmWSCUSTLoader,
    AlarmWSCRMLoader = require('./AlarmWSCRMPlugin').AlarmWSCRMLoader,
    AlarmWSNUMLoader = require('./AlarmWSNUMPlugin').AlarmWSNUMLoader,
    AlarmWSCBSSLoader = require('./AlarmWSCBSSPlugin').AlarmWSCBSSLoader,
    AlarmWS3GHTTPLoader = require('./AlarmWS3GHTTPPlugin').AlarmWS3GHTTPLoader;

exports.panguLaLoad = function(type, data, host){
    if( "TuxState" == type ){
        TuxStateLoader(data, host);
    }
    if( "TuxMem" == type ){
        TuxMemLoader(data, host);
    }
    if( "TuxQue" == type ){
        TuxQueLoader(data, host);
    }
    if( "TuxTrade4G" == type ){
        TuxTrade4GLoader(data, host);
    }
    if( "Warning" == type ){
        WarningLoader(data, host);
    }
    if( "TuxLcuPoint" == type ){
        TuxLcuPointLoader(data, host);
    }
    if( "AlarmWS3GESS" == type ){
        AlarmWS3GESSLoader(data, host);
    }
    if( "AlarmWSCUST" == type ){
        AlarmWSCUSTLoader(data, host);
    }
    if( "AlarmWSCRM" == type ){
        AlarmWSCRMLoader(data, host);
    }
    if( "AlarmWSNUM" == type ){
        AlarmWSNUMLoader(data, host);
    }
    if( "AlarmWS3GHTTP" == type ){
        AlarmWS3GHTTPLoader(data, host);
    }
    if( "AlarmWSCBSS" == type ){
        AlarmWSCBSSLoader(data, host);
    }
};
