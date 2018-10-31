import Vue from 'vue';
import Router from 'vue-router';
const Home = r => require.ensure([], () => r(require('@/view/home/TheIndex.vue')), 'home');
const Lobby = r => require.ensure([], () => r(require('@/view/lobby/TheIndex.vue')), 'lobby');
const ElContent = r => require.ensure([], () => r(require('@/view/lobby/children/TheElectronic.vue')), 'lobby');
const Deposit = r => require.ensure([], () => r(require('@/view/deposit/TheIndex.vue')), 'deposit');
const Account = r => require.ensure([], () => r(require('@/view/account/TheIndex.vue')), 'account');
const Info = r => require.ensure([], () => r(require('@/view/info/TheIndex.vue')), 'info');
const InfoLetter = r => require.ensure([], () => r(require('@/view/info/children/TheLetter.vue')), 'info');
const InfoNotice = r => require.ensure([], () => r(require('@/view/info/children/TheNotice.vue')), 'info');
// const Server = r => require.ensure([], () => r(require('@/components/customer-service/AppCustomerService.vue')), 'server');
const Login = r => require.ensure([], () => r(require('@/view/login-register/TheLogin.vue')), 'login');
const Register = r => require.ensure([], () => r(require('@/view/login-register/TheRegister.vue')), 'register');
const AccountContent = r => require.ensure([], () => r(require('@/view/account/children/TheContent.vue')), 'account');
const AccountInfo = r => require.ensure([], () => r(require('@/view/account/children/TheInfo.vue')), 'account');
const AccountTransfer = r => require.ensure([], () => r(require('@/view/account/children/TheTransfer.vue')), 'account');
const AccountSearch = r => require.ensure([], () => r(require('@/view/account/children/TheSearch.vue')), 'account');
const AccountPassword = r => require.ensure([], () => r(require('@/view/account/children/ThePassword.vue')), 'account');
const AccountNotice = r => require.ensure([], () => r(require('@/view/account/children/TheNotice.vue')), 'account');
const AccountWashCode = r => require.ensure([], () => r(require('@/view/account/children/TheWashCode.vue')), 'account');
const AccountEditContact = r => require.ensure([], () => r(require('@/view/account/children/TheEditContact.vue')), 'account');
const AccountEditBank = r => require.ensure([], () => r(require('@/view/account/children/TheEditBank.vue')), 'account');
const AccountDepositOrder = r => require.ensure([], () => r(require('@/view/account/children/TheDepositOrder.vue')), 'account');
const AccountDownload = r => require.ensure([], () => r(require('@/view/account/children/TheDownload.vue')), 'account');
const Discount = r => require.ensure([], () => r(require('@/view/discount/TheIndex.vue')), 'discount'); // discount
const DiscountDetail = r => require.ensure([], () => r(require('@/view/discount/children/ThePageDetail.vue')), 'discount'); // discount
// const DiscountFirst = r => require.ensure([], () => r(require('@/view/discount/activity-page/FirstPage.vue')), 'discount'); // discount
// const DiscountSecond = r => require.ensure([], () => r(require('@/view/discount/activity-page/SecondPage.vue')), 'discount'); // discount
// const DiscountThird = r => require.ensure([], () => r(require('@/view/discount/activity-page/ThirdPage.vue')), 'discount'); // discount
// const DiscountFourth = r => require.ensure([], () => r(require('@/view/discount/activity-page/FourthPage.vue')), 'discount'); // discount
// const DiscountFifth = r => require.ensure([], () => r(require('@/view/discount/activity-page/FifthPage.vue')), 'discount'); // discount
// const DiscountSix = r => require.ensure([], () => r(require('@/view/discount/activity-page/SixPage.vue')), 'discount'); // discount
// const DiscountSeven = r => require.ensure([], () => r(require('@/view/discount/activity-page/SevenPage.vue')), 'discount'); // discount
// const DiscountBackWater = r => require.ensure([], () => r(require('@/view/discount/activity-page/BackWater.vue')), 'discount'); // discount
// const DiscountClubLive = r => require.ensure([], () => r(require('@/view/discount/activity-page/ClubLive.vue')), 'discount'); // discount
// const DiscountDogfall = r => require.ensure([], () => r(require('@/view/discount/activity-page/dogfall.vue')), 'discount'); // discount
// const LiveReturn = r => require.ensure([], () => r(require('@/view/discount/activity-page/LiveReturn.vue')), 'discount'); // discount
// const BetPlus = r => require.ensure([], () => r(require('@/view/discount/activity-page/BetPlus.vue')), 'discount'); // discount
// const WorldCup = r => require.ensure([], () => r(require('@/view/discount/activity-page/WorldCup.vue')), 'discount'); // discount
// const ChampionQuiz = r => require.ensure([], () => r(require('@/view/discount/activity-page/ChampionQuiz.vue')), 'discount'); // dis/count
// const DeliChallenge = r => require.ensure([], () => r(require('@/components/discount/activity-page/DeliChallenge.vue')), 'discount'); // discount
const Jewel = r => require.ensure([], () => r(require('@/view/xdl-jewel/TheIndex.vue')), 'gem'); // gem
const Club = r => require.ensure([], () => r(require('@/view/club/TheIndex.vue')), 'club'); // club
const Eldiscount = r => require.ensure([], () => r(require('@/view/electronic-discount/TheIndex.vue')), 'eldiscount'); // electronic-discount
const DtGame = r => require.ensure([], () => r(require('@/view/dt-game/TheIndex.vue')), 'dtgame'); // electronic-discount

const PointsShop = r => require.ensure([], () => r(require('@/view/points-shop/PointsShop.vue')), 'points'); // electronic-discount
const EarnPoints = r => require.ensure([], () => r(require('@/view/points-shop/children/EarnPoints.vue')), 'points'); // electronic-discount
const EarnDetails = r => require.ensure([], () => r(require('@/view/points-shop/children/EarnDetails.vue')), 'points'); // electronic-discount
const SpendPoints = r => require.ensure([], () => r(require('@/view/points-shop/children/SpendPoints.vue')), 'points'); // electronic-discount
const EarnLeaderboard = r => require.ensure([], () => r(require('@/view/points-shop/children/EarnLeaderboard.vue')), 'points'); // electronic-discount
const SpendRedemption = r => require.ensure([], () => r(require('@/view/points-shop/children/SpendRedemption.vue')), 'points'); // electronic-discount
const IntegralRules = r => require.ensure([], () => r(require('@/view/points-shop/children/IntegralRules.vue')), 'points'); // electronic-discount

const CustomerService = r => require.ensure([], () => r(require('@/view/customer-service/AppCustomerService.vue')), 'CustomerService');

const QuestionRegister = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionRegister.vue')), 'CommonQuestion');
const QuestionRecharge = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionRecharge.vue')), 'CommonQuestion');
const QuestionWithdraw = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionWithdraw.vue')), 'CommonQuestion');
const QuestionDownload = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionDownload.vue')), 'CommonQuestion');
const QuestionGameProblem = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionGameProblem.vue')), 'CommonQuestion');
const QuestionMaintenance = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionMaintenance.vue')), 'CommonQuestion');
const QuestionTemplate = r => require.ensure([], () => r(require('@/view/customer-service/CommonQuestionChild/QuestionTemplate.vue')), 'CommonQuestion');

const TrialPlay = r => require.ensure([], () => r(require('@/view/trial-play/trial-play.vue')), 'trialplay');
const Fourandfour = r => require.ensure([], () => r(require('@/view/404/404.vue')), '404');
Vue.use(Router);
const routes = [
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/lobby',
        name: 'lobby',
        component: Lobby
    },
    {
        path: '/lobby/elcontent',
        name: 'elcontent',
        component: ElContent
    },
    {
        path: '/deposit',
        name: 'deposit',
        component: Deposit
    },
    {
        path: '/account',
        name: 'account',
        component: Account
    },
    {
        path: '/account/content',
        name: 'accountcontent',
        component: AccountContent,
        children: [
            {
                path: '/account/info',
                name: 'accountinfo',
                component: AccountInfo
            },
            {
                path: '/account/transfer',
                name: 'accounttransfer',
                component: AccountTransfer
            },
            {
                path: '/account/search',
                name: 'accountsearch',
                component: AccountSearch
            },
            {
                path: '/account/password',
                name: 'accountpassword',
                component: AccountPassword
            },
            {
                path: '/account/notice',
                name: 'accountnotice',
                component: AccountNotice
            },
            {
                path: '/account/wash',
                name: 'accountwash',
                component: AccountWashCode
            },
            {
                path: '/account/edit',
                name: 'accounteditcontact',
                component: AccountEditContact
            },
            {
                path: '/account/bank',
                name: 'accounteditbank',
                component: AccountEditBank
            },
            {
                path: '/account/deposit',
                name: 'accountdeposit',
                component: AccountDepositOrder
            },
            {
                path: '/account/download',
                name: 'accountdownload',
                component: AccountDownload
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/home/jewel',
        name: 'jewel',
        component: Jewel
    },
    {
        path: '/home/discount',
        name: 'discount',
        component: Discount
    },
    {
        path: '/home/discountdetail',
        name: 'discountdetail',
        component: DiscountDetail
    },
    {
        path: '/home/club',
        name: 'club',
        component: Club
    },
    {
        path: '/home/eldiscount',
        name: 'eldiscount',
        component: Eldiscount
    },
    {
        path: '/info',
        name: 'info',
        component: Info
    },
    {
        path: '/info/notice',
        name: 'infonotice',
        component: InfoNotice
    },
    {
        path: '/info/letter',
        name: 'infoletter',
        component: InfoLetter
    },
    {
        path: '/dtgame',
        name: 'dtgame',
        component: DtGame
    },
    {
        path: '/pointsshop',
        name: 'pointsshop',
        component: PointsShop,
        redirect: '/pointsshop/earn',
        children: [
            { path: '/pointsshop/earn', name: 'earn', component: EarnPoints },
            { path: '/pointsshop/earn/details', name: 'earndetails', component: EarnDetails },
            { path: '/pointsshop/earn/leaderboard', name: 'earnleaderboard', component: EarnLeaderboard },
            { path: '/pointsshop/earn/integralrules', name: 'integralrules', component: IntegralRules },
            { path: '/pointsshop/spend', name: 'spend', component: SpendPoints },
            { path: '/pointsshop/spend/redemption', name: 'spendredemption', component: SpendRedemption }
        ]
    },
    {
        path: '/cs',
        name: 'cs',
        component: CustomerService
    },
    {
        path: '/cs/question',
        name: 'cs/question',
        component: QuestionTemplate,
        children: [
            { path: '/cs/question/howtoregister', name: 'howtoregister', component: QuestionRegister },
            { path: '/cs/question/howtorecharge', name: 'howtorecharge', component: QuestionRecharge },
            { path: '/cs/question/howtowithdraw', name: 'howtowithdraw', component: QuestionWithdraw },
            { path: '/cs/question/howtodownload', name: 'howtodownload', component: QuestionDownload },
            { path: '/cs/question/gameproblem', name: 'gameproblem', component: QuestionGameProblem },
            { path: '/cs/question/maintenancetime', name: 'maintenancetime', component: QuestionMaintenance }
        ]
    },
    {
        path: '/trial',
        name: 'trialplay',
        component: TrialPlay
    },
    {
        path: '/sorry',
        name: 'sorry',
        component: Fourandfour
    }
    // {
    //     path: '/discount/first',
    //     name: 'discountfirst',
    //     component: DiscountFirst
    // },
    // {
    //     path: '/discount/second',
    //     name: 'discountsecond',
    //     component: DiscountSecond
    // },
    // {
    //     path: '/discount/third',
    //     name: 'discountthird',
    //     component: DiscountThird
    // },
    // {
    //     path: '/discount/fourth',
    //     name: 'discountfourth',
    //     component: DiscountFourth
    // },
    // {
    //     path: '/discount/fifth',
    //     name: 'discountfifth',
    //     component: DiscountFifth
    // },
    // {
    //     path: '/discount/six',
    //     name: 'discountsix',
    //     component: DiscountSix
    // },
    // {
    //     path: '/discount/seven',
    //     name: 'discountseven',
    //     component: DiscountSeven
    // },
    // {
    //     path: '/discount/backwater',
    //     name: 'backwater',
    //     component: DiscountBackWater
    // },
    // {
    //     path: '/discount/clublive',
    //     name: 'clublive',
    //     component: DiscountClubLive
    // },
    // {
    //     path: '/discount/dogfall',
    //     name: 'dogfall',
    //     component: DiscountDogfall
    // },
    // {
    //     path: '/discount/livereturn',
    //     name: 'livereturn',
    //     component: LiveReturn
    // },
    // {
    //     path: '/discount/betplus',
    //     name: 'betplus',
    //     component: BetPlus
    // },
    // {
    //     path: '/discount/worldcup',
    //     name: 'worldcup',
    //     component: WorldCup
    // },
    // {
    //     path: '/discount/championquiz',
    //     name: 'championquiz',
    //     component: ChampionQuiz
    // },
];
export default new Router({
    routes: routes,
    mode: 'hash'
});
