<template>
    <!--<content-wrapper class="container" :options="options">-->
    <!--<common-header>{{title}}</common-header>-->
    <!--<scroll-component>-->
    <!--</scroll-component>-->
    <!--</content-wrapper>-->
    <router-view></router-view>
</template>

<script>
import TheInfo from './TheInfo';
// import {mapState, mapMutations} from 'vuex';
// import tool from '@/common/tool';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import CommonHeader from '@/components/top-header/CommonHeader';
export default {
    name: 'the-content',
    data () {
        return {
            // title: null
            // options: {
            //     top: 1.533,
            //     bottom: 1.7333
            // }
        };
    },
    components: {
        CommonHeader,
        TheInfo,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        // ...mapMutations(['STATEMENT']),
        init () {
            // console.log(this.$route.params.title);
            // if (this.$route.name === 'accounteditbank') {
            //     this.options.top = 0;
            //     this.options.bottom = 0;
            // } else {
            //     this.options.top = ;
            //     this.options.bottom = ;
            // }
            // if (this.$route.params.title) {
            //     this.title = this.$route.params.title;
            //     tool.setSessionStore('accountTitle', this.$route.params.title);
            // } else {
            //     this.title = tool.getSessionStore('accountTitle');
            // }
        }
    },
    computed: {
        // ...mapState(['accountTitle'])
    },
    updated () {
        // this.init();
    },
    mounted () {
        // this.init();
    },
    created () {}
};
</script>

<style scoped lang="scss">

</style>
