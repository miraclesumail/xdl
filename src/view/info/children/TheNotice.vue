<template>
    <content-wrapper :options="options">
        <common-header>最新公告</common-header>
        <scroll-component>
            <div class="content">
                <ul>
                    <li v-for="(item, index) in list" :key="index">
                        <div class="title">
                            <span class="icon"></span>
                            <span class="text">{{item.title}}</span>
                        </div>
                        <div class="detail">
                            {{item.content}}
                        </div>
                        <div class="time">
                            创建时间：{{item.date}}
                        </div>
                    </li>
                </ul>
            </div>
        </scroll-component>
    </content-wrapper>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import ScrollComponent from '@/components/scroll-component/better-scroll.vue';
import CommonHeader from '@/components/top-header/CommonHeader.vue';
import ContentWrapper from '@/components/scroll-component/ContentWrapper';
import tool from '@/common/tool';
export default {
    name: 'the-letter',
    components: {
        CommonHeader,
        ScrollComponent,
        ContentWrapper
    },
    data () {
        return {
            list: null,
            options: {
                top: 1.5333,
                bottom: 1.7333
            }
        };
    },
    methods: {
        init () {
            apiRequest('getPlatformAnnouncements', {
                service: 'platform',
                data: {
                    reach: 'players'
                }
            }).then((res) => {
                this.list = res.data.filter((val, index, arr) => {
                    val.date = tool.timeFormat(val.date, 'YYYY-MM-DD HH:mm:ss');
                    return val;
                });
            });
        }
    },
    mounted () {},
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
.content {
    padding: 0.2rem;
    ul{
        li{
            border: 1px solid #fea100;
            border-radius: 5px;
            padding: 0.2rem;
            margin-bottom: 0.3rem;
            .title{
                font-size: 0.4rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                color: #fea100;
                padding-bottom: 0.2rem;
                border-bottom: 1px solid #fea100;
                .icon{
                    background: url('https://xdlftp.xindedom.life/images/mobile_image/trumpet-icon.png') no-repeat;
                    width: 0.38rem;
                    height: 0.366rem;
                    background-size: 100% 100%;
                    margin-right: 0.2rem;
                }
            }
            .detail {
                font-size: 0.3466rem;
                color: #fff;
                padding-bottom: 0.5rem;
                padding-top: 0.2rem;
            }
            .time{
                font-size: 0.32rem;
                color: #ff0000;
                text-align: end;
            }
        }
    }
}
</style>
