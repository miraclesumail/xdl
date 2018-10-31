<template>
    <content-wrapper :options="options" class="home">
        <scroll-component>
            <!--<the-down-load-app></the-down-load-app>-->
            <the-banner :listData="banner"></the-banner>
            <the-notice :listData="notice"></the-notice>
            <the-menu></the-menu>
            <the-game></the-game>
        </scroll-component>
        <the-pop></the-pop>
        <the-free-money></the-free-money>
        <the-get-free-money></the-get-free-money>
    </content-wrapper>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import TheHeader from '@/components/top-header/AppHeader';
import TheBanner from '@/components/carousel/TheBanner';
import TheMenu from './children/TheMenu';
import TheGame from '../home/children/TheGame';
import TheNotice from '../home/children/TheNotice';
import ThePop from '../home/children/ThePop';
import TheFreeMoney from '../home/children/TheFreeMoney';
// import TheDownLoadApp from '../../components/download-app/TheDownLoadApp';
import TheGetFreeMoney from '../../components/pop/TheGetFreeMoney';
// import BScroll from 'better-scroll'; // 模拟滚动 => search better-scroll github this is very awesome
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {apiRequest} from '@/common/api/base';
// console.log(apiRequest);
export default {
    name: 'index',
    computed: {
        ...mapState(['test'])
    },
    data () {
        return {
            scroll: null,
            banner: null,
            notice: null,
            pop: null,
            menu: null,
            options: {
                top: 1.7066,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['MSGALERT', 'STATEMENT']),
        init () {
            apiRequest('getConfig', {
                service: 'platform',
                data: {
                    device: 3
                }
            }).then((res) => {
                console.log(res);
                this.banner = res.data.activityList.filter((val, index) => {
                    if (/mobile\/banner/.test(val.code) && val.status === 1) {
                        return val;
                    }
                });
            }).catch((res) => {
                console.log(res);
            });
            apiRequest('getPlatformAnnouncements', {
                service: 'platform',
                data: {
                    reach: 'players'
                }
            }).then((res) => {
                console.log(res);
                this.notice = res.data;
            }).catch((res) => {
                console.log(res);
            });
        }
    },
    components: {
        TheHeader,
        TheBanner,
        TheMenu,
        TheGame,
        TheNotice,
        ScrollComponent,
        ThePop,
        ContentWrapper,
        TheFreeMoney,
        TheGetFreeMoney
        // TheDownLoadApp
    },
    created () {
        this.init();
    },
    mounted () {
        console.log('mounted')
    }
};
</script>

<style scoped lang="scss">
/*.home {*/
    /*!*height: 100%;*!*/
    /*height: calc(100% - 1.7066rem - 1.7333rem);*/
    /*margin-top: 1.7066rem;*/
    /*margin-bottom: 1.7333rem;*/
/*}*/
</style>
