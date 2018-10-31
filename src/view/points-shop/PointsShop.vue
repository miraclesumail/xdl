<template>
    <content-wrapper class="points-shop-wrapper" :options="options">
        <common-header>爵士积分商城</common-header>
        <scroll-component>
            <div class="points-navs">
                <router-link tag="div" v-for="(v, i) in pointsNav" :key="i" :to="'/pointsshop/' + v.type" :class="'nav nav-' + v.type + (activeNav === i ? ' active' : '')" @click.native="changeNav(i)" replace>
                    <span :class="'points-sprite i-' + v.type"></span>
                    <p>{{ v.text }}</p>
                </router-link>
            </div>
            <router-view></router-view>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import {mapMutations} from 'vuex';

export default {
    name: 'points-shop',
    data () {
        return {
            pointsNav: [
                { type: 'earn', text: '赚积分' },
                { type: 'spend', text: '花积分' }
            ],
            activeNav: 0,
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    methods: {
        ...mapMutations(['STATEMENT']),
        changeNav (index) {
            this.activeNav = index;
        }
    },
    mounted () {
        // this.STATEMENT({
        //     name: 'header',
        //     data: false
        // });

        switch (this.$route.name) {
        case 'earn':
            this.activeNav = 0;
            break;
        case 'spend':
            this.activeNav = 1;
            break;
        default:
            break;
        }
    }
    // beforeDestroy () {
    //     this.STATEMENT({
    //         name: 'header',
    //         data: true
    //     });
    // }
};
</script>

<style lang="scss">
    .points-sprite {
        display: block;
        background-image: url('https://xdlftp.xindedom.life/images/mobile_image/points/points-sprite.png?v=201807050517');
        background-repeat: no-repeat;
        background-size: 6.773rem 2.56rem;
    }
</style>

<style scoped lang="scss">
    .i-earn {
        width: .786rem;
        height: .786rem;
        background-position: -.826rem 0;
    }

    .i-spend {
        width: .813rem;
        height: .88rem;
        background-position: -2.506rem 0;
    }

    .points-shop-wrapper {
        .points-navs {
            display: flex;
            align-items: center;
            background: linear-gradient(#232323, #848484, #232323);

            .nav {
                width: 100%;
                height: 1.386rem;
                display: flex;
                align-items: center;
                justify-content: center;

                &.active {
                    &.nav-earn {
                        background: linear-gradient(#cf0808, #6a0808);
                    }

                    &.nav-spend {
                        background: linear-gradient(#3ac9cf, #084084);
                    }

                    .i-earn {
                        width: .786rem;
                        height: .786rem;
                        background-position: 0 0;
                    }

                    .i-spend {
                        width: .813rem;
                        height: .88rem;
                        background-position: -1.653rem 0;
                    }
                }

                > p {
                    margin-left: .266rem;
                    color: #fff;
                    font-size: .533rem;
                    font-weight: 700;
                }
            }
        }
    }
</style>
