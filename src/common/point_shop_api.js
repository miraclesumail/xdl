/*
* point_shop_api module
* */
// 获取积分排名列表
export const getRewardPointsRanking = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getRewardPointsRanking',
        data: data
    });
};
// 获取登入积分信息
export const getLoginRewardPoints = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getLoginRewardPoints',
        data: data
    });
};
// 获取游戏积分信息
export const getGameRewardPoints = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getGameRewardPoints',
        data: data
    });
};
// 获取存款积分信息
export const getTopUpRewardPointsEvent = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getTopUpRewardPointsEvent',
        data: data
    });
};
// 获取任务信息
export const getMissonList = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getMissonList',
        data: data
    });
};
// 获取积分规则
export const getPointRule = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getPointRule',
        data: data
    });
};

// 积分兑换真钱
export const applyPointToCredit = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'applyPointToCredit',
        data: data
    });
};
// 扣除积分
export const deductPointManually = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'deductPointManually',
        data: data
    });
};
// 手动申请积分活动奖励
export const applyRewardPoint = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'applyRewardPoint',
        data: data
    });
};

// 获取玩家积分明细
export const getPointChangeRecord = function (service, data) {
    return window.net.send({
        service: service,
        functionName: 'getPointChangeRecord',
        data: data
    });
};
