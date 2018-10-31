<template>
    <div class="read">
        <ul>
            <li v-for="(item, index) in readList" :key="index" :class="item.isRead ? 'active' : ''" v-if="item.hasBeenRead">
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
                        <span class="delete" @click="deleteInfo(item._id)">删除</span>
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
        <p class="tip" v-if="readList.length === 0">
            暂无已读信件
        </p>
    </div>
</template>

<script>
import {apiRequest} from '@/common/api/base';
import {mapState} from 'vuex';
import tool from '@/common/tool';
export default {
    name: 'the-read-letter',
    data () {
        return {
            readList: []
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        open (id, index) {
            // this.readList.splice(index, 1, this.readList.isRead = !this.readList.isRead);
            this.readList = this.readList.filter((val, index) => {
                if (val._id === id) {
                    val.isRead = !val.isRead;
                } else {
                    val.isRead = false;
                }
                return val;
            });
        },
        deleteInfo (id) {
            apiRequest('deleteMail', {
                service: 'player',
                data: {
                    mailObjId: id
                }
            }).then((res) => {
                // console.log(res);
                this.init();
            });
        },
        init () {
            apiRequest('getMailList', {
                service: 'player',
                data: {
                    _isModal: true
                }
            }).then((res) => {
                this.readList = res.data.filter((val, index) => {
                    // console.log(val);
                    // this.readList = [];
                    val.detailTime = tool.timeFormat(val.createTime, 'YYYY-MM-DD HH:mm:ss');
                    val.createTime = tool.timeFormat(val.createTime, 'YYYY-MM-DD');
                    // console.log(val.createTime);
                    val.isRead = false;
                    if (val.hasBeenRead) {
                        return val;
                    }
                });
                this.readList = this.readList.reverse();
            });
        }
    },
    created () {
        this.init();
    }
};
</script>

<style scoped lang="scss">
    .read{
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
