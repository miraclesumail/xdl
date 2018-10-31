<!--
this is common components, because we have header tabchange need use this components
how to use?
<tab-content :list="options"> ==> options must is array
options: [
    {
        id: 0,
        name: '页面一'
    },
    {
        id: 1,
        name: '页面二'
    }
]
you can see the props params
-->
<template>
    <div class="container">
        <div class="header">
            <span class="title" :class="index === active? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="open(item.id)">{{item.name}}</span>
        </div>
        <div class="content">
                <div class="wrap" v-if="index === active" v-for="(item, index) in tabList" :key="index">
                    <slot :name="index"></slot>
                </div>
        </div>
    </div>
</template>

<script>
// import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
export default {
    name: 'tab-content',
    data () {
        return {
            active: 4,
            tabList: this.list,
            runfn: this.fnoptions
        };
    },
    components: {
        // ScrollComponent
    },
    props: {
        list: {
            type: Array,
            default () {
                return [
                    {
                        id: 0,
                        name: '页面一'
                    },
                    {
                        id: 1,
                        name: '页面二'
                    }
                ];
            }
        },
        fnoptions: {
            type: Object,
            default () {
                return {};
            }
        },
        activePage: {
            type: Number
        }
    },
    methods: {
        open (id) {
            this.active = id;
            if (this.runfn[id]) {
                this.runfn[id].runFn();
            }
            // if (this.runfn[id].runFn) {
            //
            // }
        }
    },
    mounted () {
        // console.log(this.activePage);
        // console.log(1111111);
        // console.log(this.activePage);
        this.active = this.activePage ? this.activePage : 0;
        // console.log(this.runfn);
    }
};
</script>

<style scoped lang="scss">
$images: '../../assets';
.container {
    .header{
        display: flex;
        align-items: center;
        padding: 0.2rem 0.2rem 0;
        .title {
            width: 2.3rem;
            height: 0.8rem;
            line-height: 0.8rem;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: center;
            color: #ccc;
            font-weight: bold;
            background:linear-gradient(to bottom, #1d1d1d, #101010);
            font-size: 0.38rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            margin-right: 0.1rem;
            border: 1px solid #444444;
            border-bottom:none;
            position: relative;
        }
        .active{
            border: 1px solid #ffa200;
            border-bottom: none;
            color: #ffa200;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat-x;
            background-size: 0.586rem 1.0666rem;
            position: relative;
            z-index: 2;
        }
    }
    .content{
        padding: 0 0.2rem;
        .wrap{
            position: relative;
            z-index: 1;
            background: url('https://xdlftp.xindedom.life/images/mobile_image/lobby-bg.png') repeat;
            background-size: 0.586rem 1.0666rem;
            width: 100%;
            border: 1px solid #ffa200;
            margin-top: -1px;
            margin-bottom: 10px;
        }
    }
}
</style>
