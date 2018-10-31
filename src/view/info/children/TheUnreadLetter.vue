<template>
    <div class="unread">
        <ul>
            <li v-for="(item, index) in unReadList" :key="index" :class="item.isRead ? 'active' : ''">
                <div class="list" v-show="!item.isRead">
                    <div class="top" @click="open(item._id, index)">
                        <span class="email-icon"></span>
                        <span class="text">{{item.title}}</span>
                        <span class="time">{{item.createTime}}</span>
                        <span class="arrow" :class="item.isRead ? 'active' : ''"></span>
                    </div>
                </div>
                <div class="list" v-show="item.isRead">
                    <div class="top" @click="open(item._id, index)">
                        <span class="email-icon"></span>
                        <span class="text">{{item.title}}</span>
                        <span class="arrow" :class="item.isRead ? 'active' : ''"></span>
                    </div>
                    <transition name="read">
                        <div class="detail">
                            {{item.content}}
                            <p class="time">{{item.detailTime}}</p>
                        </div>
                    </transition>
                </div>
            </li>
        </ul>
        <p class="tip" v-if="unReadList.length === 0">
            暂无未读信件
        </p>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import tool from '@/common/tool';
export default {
    name: 'the-unread-letter',
    data () {
        return {
            unReadList: []
        };
    },
    computed: {
    },
    created () {
        this.$nextTick(() => {
            this.init();
        });
    },
    methods: {
        open (id) {
            this.unReadList = this.unReadList.filter((val, index) => {
                if (val._id === id) {
                    // this.init();
                    val.isRead = !val.isRead;
                    if (val.isRead) {
                        apiRequest('readMail', {
                            service: 'player',
                            data: {
                                _isLoading: true,
                                mailObjId: id
                            }
                        }).then((res) => {
                        });
                    } else {
                        this.init();
                    }
                } else {
                    val.isRead = false;
                }
                return val;
            });
        },
        init () {
            apiRequest('getUnreadMail', {
                service: 'player',
                data: {
                    _isModal: true,
                    _isLoading: true
                }
            }).then((res) => {
                console.log(res);
                this.unReadList = res.data.filter((val, index) => {
                    val.isRead = false;
                    val.detailTime = tool.timeFormat(val.detailTime, 'YYYY-MM-DD HH:mm:ss');
                    val.createTime = tool.timeFormat(val.createTime, 'YYYY-MM-DD');
                    return val;
                });
                this.unReadList = this.unReadList.reverse();
            });
        }
    },
    mounted () {}
};
</script>

<style scoped lang="scss">
    .unread{
        ul{
            /*padding: 0.2rem;*/
            padding-top: 0.2rem;
            li{
                margin: 0 0.1rem 0.3rem;
                border: 1px solid #483515;
                border-radius: 5px;
                background-color: rgba(16,16,16,0.7);
                .top{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #fff;
                    font-size: 0.4rem;
                    height: 0.8rem;
                    padding: 0.1rem 0;
                    /*margin: 0.1rem 0 0 0.2rem;*/
                    margin: 0.1rem 0.2rem;
                    font-weight: bold;
                    position: relative;
                    /*border-bottom: 1px solid #202020;*/
                    .email-icon {
                        background: url("https://xdlftp.xindedom.life/images/mobile_image/email-new-icon.png") no-repeat;
                        width: 0.3866rem;
                        height: 0.3066rem;
                        background-size: 0.8666rem 0.3066rem;
                        position: absolute;
                        left: 0.2rem;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                    .arrow{
                        background: url("https://xdlftp.xindedom.life/images/mobile_image/lobby-arrow.png") no-repeat;
                        background-size: 0.48rem 0.666rem;
                        background-position: 0 0;
                        width: 0.48rem;
                        height: 0.33rem;
                        position: absolute;
                        right: 0.2rem;
                        top: 50%;
                        transform: translate(0%, -50%);
                        transition: 0.5s all;
                    }
                    .text {
                        padding-left: 0.7rem;
                    }
                    .time{
                        padding-right: 0.8rem;
                        font-weight: normal;
                    }
                    .active {
                        background-position: 0 -0.33rem;
                    }

                }
                .detail {
                    font-size: 0.4rem;
                    color: #fff;
                    padding: 0.2rem;
                    .time {
                        text-align: end;
                        padding-top: 0.2rem;
                    }
                }
            }
            li:last-child {
                .top{
                    border-bottom: none;
                }
            }
            li.active {
                box-shadow: 0 0 1px 0 #191919 inset;
                background:linear-gradient(to bottom, #191919, #000000);
                border-radius: 5px;
                border: 1px solid #fea100;
                .top{
                    color: #ffa004;
                    border-bottom: 1px solid #fea100;
                }
                .detail{
                    color: #fff;
                    /*text-indent: 0.8rem;*/
                    .time{
                        color: #ff0000;
                        font-size: 0.3466rem;
                    }
                }
                .email-icon{
                    background: url("https://xdlftp.xindedom.life/images/mobile_image/email-new-icon.png") no-repeat;
                    width: 0.3866rem;
                    height: 0.3066rem;
                    background-size: 0.8666rem 0.3066rem;
                    position: absolute;
                    left: 0.2rem;
                    top: 50%;
                    transform: translate(0, -50%);
                    background-position: -0.46rem 0;
                }
                .delete {
                    width: 1.2rem;
                    height: 0.6rem;
                    background: linear-gradient(to bottom, #ce0000, #610000);
                    color: #fff;
                    font-size: 0.3466rem;
                    text-align: center;
                    position: absolute;
                    right: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: normal;
                    border-radius: 5px;
                }
            }
        }
        .tip {
            font-size: 0.4rem;
            text-align: center;
            color: #fff;
            padding: 0.5rem 0;
        }
    }
</style>
