<template>
    <content-wrapper class="content" :options="options">
        <common-header>信息</common-header>
        <scroll-component>
            <div class="list">
                <div class="newnotice" @click="notice">
                    <img src="https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/new_announcement.png" alt="">
                </div>
                <div class="indexletter" @click="letter">
                    <img src="https://xdlftp-hk.xindedom.life/images/xdl/mobile_image/inside_letter.png" alt="">
                </div>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import {mapMutations} from 'vuex';
export default {
    name: 'the-index',
    data () {
        return {
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        notice () {
            this.$router.push({name: 'infonotice'});
        },
        letter () {
            this.$router.push({name: 'infoletter'});
        }
    },
    components: {
        CommonHeader,
        ContentWrapper,
        ScrollComponent
    }
    // mounted () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: false
    //     });
    // },
    // beforeDestroy () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: true
    //     });
    // }
};
</script>

<style scoped lang="scss">
.content {
    .list{
        padding: 0.4rem 0.2rem;
        .newnotice{
            img{
                width: 100%;
                height: 100%;
            }
        }
        .indexletter {
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
