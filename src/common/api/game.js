/*
* game api container
* ApiName == > getGamePassword modifyGamePassword getTestLoginURL getProviderList getGameGroupInfo getFavoriteGames
*              removeFavoriteGame addFavoriteGame getLoginURL getCreditBalance searchGame transferToProvider
*              transferFromProvider
* */
const API = {
    getGamePassword: 'getGamePassword', // 获取游戏账号密码 | get game account password
    modifyGamePassword: 'modifyGamePassword', // 修改游戏密码 | modify game account password
    getTestLoginURL: 'getTestLoginURL', // 获取试玩游戏链接
    getProviderList: 'getProviderList', // 获取游戏供应商列表 | get game company list
    getGameGroupInfo: 'getGameGroupInfo', // 获取游戏分组详细信息 | get game group information
    getFavoriteGames: 'getFavoriteGames', // 获取收藏的游戏列表 | get games marked as favorite by the player
    removeFavoriteGame: 'removeFavoriteGame', // 删除收藏游戏 | remove a game from favorites
    addFavoriteGame: 'addFavoriteGame', // 收藏游戏 | add a game to favorites
    getLoginURL: 'getLoginURL', // 获取登录游戏的URL | get URL of the game
    getCreditBalance: 'getCreditBalance', // 获取玩家全额消费 | get player's balance
    searchGame: 'searchGame', // 搜索游戏 | search game
    transferToProvider: 'transferToProvider', // 本地额度转入到游戏额度 | transfer balance from local to game
    transferFromProvider: 'transferFromProvider', // 游戏额度转入到本地额度 | transfer balance from game to local
    getGameGroupTreeInfo: 'getGameGroupTreeInfo' // 游戏分组信息 | game group info
};
// const memorize = function (fn) {
//     const cache = {};
//     return function (...args) {
//         const _args = JSON.stringify(args);
//         return cache[_args] || (cache[_args] = fn.apply(fn, args));
//     };
// };
export function gameApiRequest (functionName, obj) {
    if (typeof functionName !== 'string') {
        throw new Error('the functionName params need string');
    }
    if (typeof obj !== 'object') {
        throw new Error('the object params need object');
    }
    if (!('service' in obj)) {
        throw new Error('the object.service params undefined');
    }
    if (!('data' in obj)) {
        throw new Error('the object.data params undefined');
    }
    return window.net.send({
        service: obj.service,
        functionName: API[functionName],
        data: obj.data
    });
}
