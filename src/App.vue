<template>
    <div id="app">
        <down-load-app></down-load-app>
        <div class="app-container" :style="appContainerStyle">
            <app-header v-if="header"></app-header>
            <!--<common-header v-if="pageHeader">{{commonHeaderTitle}}</common-header>-->
            <router-view/>
            <app-toast></app-toast>
            <app-modal></app-modal>
            <app-loading></app-loading>
            <!--<app-customer-service></app-customer-service>-->
        </div>
        <app-tab v-if="bottom"></app-tab>
    </div>
</template>

<script>
import DownLoadApp from '@/components/download-app/TheDownLoadApp';
import AppHeader from '@/components/top-header/AppHeader.vue';
import AppToast from '@/components/pop/AppToast.vue';
import AppModal from '@/components/pop/AppModal.vue';
import AppLoading from '@/components/pop/AppLoading.vue';
import AppTab from '@/components/bottom-tab/AppTab.vue';
// import AppCustomerService from '@/components/customer-service/AppCustomerService.vue';
// import {mapMutations} from 'vuex';
// import {login, logout} from '@/common/api';
import ScrollComponent from '@/components/scroll-component/better-scroll';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import {mapState} from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapState(['header', 'bottom', 'pageHeader', 'commonHeaderTitle', 'isDownLoad'])
    },
    data () {
        return {
            scroll: null,
            appContainerStyle: {
                height: `calc(${100}%)`,
                transform: `translate3d(0, 0, 0)`,
                transition: `1s all`
            }
        };
    },
    methods: {
        calcAppContainerHeight () {
            if (this.isDownLoad) {
                this.appContainerStyle.height = `calc(${100}% - ${1.7}rem)`;
                this.appContainerStyle.transform = `translate3d(0, ${1.7}rem, 0)`;
            } else {
                this.appContainerStyle.height = `calc(${100}%)`;
                this.appContainerStyle.transform = `translate3d(0, 0, 0)`;
            }
        }
    },
    watch: {
        isDownLoad () {
            this.calcAppContainerHeight();
        }
    },
    created () {
        this.calcAppContainerHeight();
    },
    components: {
        AppToast,
        AppModal,
        AppLoading,
        AppTab,
        AppHeader,
        // AppCustomerService,
        ScrollComponent,
        CommonHeader,
        DownLoadApp
    }
};
</script>
<style lang="scss">
    $images: 'assets';
    body, html {
        position: relative;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    #app{
        background: linear-gradient(to bottom, #242424, #000);
        height: 100%;
    }
    .app-container {
        position: relative;
    }
</style>
