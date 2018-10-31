
<!--
时间日期组件,大小是24k,压缩之后代码会更加小,最多应该是15k
本人能力有限,只能改良别人的组件,以达到项目需求，目前已经很是稳定，github上面的那个已经不维护了。
组件可以选择使用日期，日期加时间选择，自定义样式
后期可能加入时间跨度限制，时间冲突判断，选择到今天为止的时间
使用方法:
 1、 import DatePicker from '@/components/vue-datepicker-es6';//时间组件
 2、 npm install moment --save 用于处理时间的各种格式化以及时间问题 大小是12k,非常给力的js
 3、 vue.use(DatePicker);
 4、 注册组件
 5、data(){
    return {
      time:new Date() || '2018-01-11',
      inputStyle:{},//输入框样式本身已经有默认样式,如果要修改按照vue对象样式写法,
      options:{
        type:'day' || 'min' 默认是min,
        format:'YYYY-MM-DD' || 'YYYY-MM-DD HH:mm' 默认是'YYYY-MM-DD HH:mm'
      }
    }
 }
 6、<date-picker :date="time" :inputStyle="已经设置默认样式"></date-picker>
-->

<style scoped>
    /* eslint-disable */
    .datepicker-overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 100;
        top: 0;
        left: 0;
        overflow: hidden;
        -webkit-animation: fadein 0.5s;
        /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 0.5s;
        /* Firefox < 16 */
        -ms-animation: fadein 0.5s;
        /* Internet Explorer */
        -o-animation: fadein 0.5s;
        /* Opera < 12.1 */
        animation: fadein 0.5s;
    }

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .cov-date-body {
        overflow: hidden;
        font-size: 0.34666rem;
        font-weight: 400;
        position: fixed;
        display: block;
        width: 10rem;
        max-width: 100%;
        z-index: 999;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    }

    .cov-date-box {
        background-color: #10142d;
    }

    .cov-picker-box {
        display: inline-block;
        padding: 0.2rem;
        box-sizing: border-box !important;
        -moz-box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
        -ms-box-sizing: border-box !important;
        width: 10rem;
        max-width: 100%;
        height: 280px;
        text-align: start !important;
    }

    .cov-picker-box td {
        height: 34px;
        width: 34px;
        padding: 0;
        line-height: 34px;
        text-align: center;
        cursor: pointer;
    }

    .cov-picker-box td:hover {
        background: #E6E6E6;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

    }

    .day {
        width: 51.42px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        height: 34px;
        padding: 0;
        line-height: 34px;
        vertical-align: middle;
        box-sizing: border-box !important;
        -moz-box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
        -ms-box-sizing: border-box !important;
        border: 1px solid transparent;

    }

    .week ul {
        margin: 0 0 8px;
        padding: 0;
        list-style: none;
    }

    .week ul li {
        width: 14.285%;
        font-size: 0.34rem;
        font-weight: normal;
        display: inline-block;
        text-align: center;
        background: transparent;
    }

    .passive-day {
        color: rgba(109, 207, 246, 0.2);
    }

    .checked {
        background-color: #c1f5fe;
        color: #10142d;
        /*background: #10142d;*/
        /*color: #6dcff6 !important;*/
        border-radius: 3px;
        /*border: 1px solid #00aeef;*/
    }

    .unavailable {
        /*color: #ccc;*/
        cursor: not-allowed;
    }

    .cov-date-monthly {
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cov-date-monthly > div {
        /*display: inline-block;*/
        /*vertical-align: middle;*/
        color: #fff;
        font-size: 0.8rem;
        /*height: 0.5rem;*/
        /*float: left;*/
        text-align: center;
        /*cursor: pointer;*/
    }

    .cov-date-previous,
    .cov-date-next {
        /*position: relative;*/
        /*width: 14.285% !important;*/
        /*text-indent: -300px;*/
        /*overflow: hidden;*/
        font-size: 0.4rem;
        display: inline-block;
        color: #fff;
    }

    .cov-date-caption {
        /*width: 60%;*/
        /*padding: 50px 0 !important;*/
        /*box-sizing: border-box;*/
        font-size: 1rem;
        display: flex;
        align-items: center;
    }

    /*.cov-date-caption span:hover {*/
        /*color: rgba(255, 255, 255, 0.7);*/
    /*}*/

    .cov-date-previous:hover,
    .cov-date-next:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .day:hover {
        border: 1px solid #00a0fe;
        box-sizing: border-box !important;
        -moz-box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
        -ms-box-sizing: border-box !important;
    }

    .unavailable:hover {
        background: none;
    }

    /*.checked:hover {*/
    /*background: #FF4F8E;*/
    /*}*/

    /*.cov-date-next::before,*/
    /*.cov-date-previous::before {*/
        /*width: 20px;*/
        /*height: 2px;*/
        /*text-align: center;*/
        /*position: absolute;*/
        /*background: #fff;*/
        /*top: 50%;*/
        /*margin-top: -7px;*/
        /*margin-left: -7px;*/
        /*left: 50%;*/
        /*line-height: 0;*/
        /*content: '';*/
        /*-webkit-transform: rotate(45deg);*/
        /*-moz-transform: rotate(45deg);*/
        /*transform: rotate(45deg);*/
    /*}*/

    /*.cov-date-next::after,*/
    /*.cov-date-previous::after {*/
        /*width: 20px;*/
        /*height: 2px;*/
        /*text-align: center;*/
        /*position: absolute;*/
        /*background: #fff;*/
        /*margin-top: 6px;*/
        /*margin-left: -7px;*/
        /*top: 50%;*/
        /*left: 50%;*/
        /*line-height: 0;*/
        /*content: '';*/
        /*-webkit-transform: rotate(-45deg);*/
        /*-moz-transform: rotate(-45deg);*/
        /*transform: rotate(-45deg);*/
    /*}*/

    /*.cov-date-previous::after {*/
        /*-webkit-transform: rotate(45deg);*/
        /*-moz-transform: rotate(45deg);*/
        /*transform: rotate(45deg);*/
    /*}*/

    /*.cov-date-previous::before {*/
        /*-webkit-transform: rotate(-45deg);*/
        /*-moz-transform: rotate(-45deg);*/
        /*transform: rotate(-45deg);*/
    /*}*/

    .date-item {
        text-align: center;
        font-size: 20px;
        padding: 10px 0;
        cursor: pointer;
    }

    .date-item:hover {
        /*background: #e0e0e0;*/
    }

    .date-list {
        overflow: auto;
        vertical-align: top;
        padding: 0;
    }

    .cov-vue-date {
        display: inline-block;
        color: #6dcff6;
        width: 100%;
    }

    .button-box {
        background: #0f132f;
        vertical-align: top;
        height: 50px;
        line-height: 50px;
        text-align: right;
        padding-right: 20px;
    }

    .button-box span {
        cursor: pointer;
        padding: 10px 20px;

    }

    .button-box span:hover {
        color: #00a0fe;
    }

    .watch-box {
        height: 100%;
        overflow: hidden;
    }

    .hour-text {
        font-size: 20px;
        margin: 10px 0;
        width: 50%;
        float: left;
        text-align: center;
    }

    .min-text {
        font-size: 20px;
        margin: 10px 0;
        width: 50%;
        float: left;
        text-align: center;
    }

    .hour-box,
    .min-box {
        display: inline-block;
        width: 50%;
        text-align: center;
        height: 85%;
        overflow: auto;
        float: left;
    }

    .hour-box ul,
    .min-box ul {
        list-style: none;
        margin: 0;
        padding: 0;

    }

    .hour-item,
    .min-item {
        padding: 10px;
        font-size: 36px;
        cursor: pointer;
    }

    .hour-item:hover,
    .min-item:hover {
    }

    .hour-box .active,
    .min-box .active {
        background: #c1f5fe;
        color: #10142d !important;
    }

    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-track {
        background: #E3E3E3;
    }

    ::-webkit-scrollbar-thumb {
        background: #C1C1C1;
        border-radius: 2px;
    }
</style>
<template>
    <!--eslint-disable-->
    <div class="cov-vue-date">
        <div class="datepickbox">
            <input type="text" title="input date" class="cov-datepicker" readonly="readonly"
                   :placeholder="option.placeholder"
                   v-model="timeFormat" :required="required" @click="showCheck" @foucus="showCheck"
                   :style="inputStyle?inputStyle:{}"/>
        </div>
        <div class="datepicker-overlay" v-if="showInfo.check" @click="dismiss($event)">
            <div class="cov-date-body">
                <div class="cov-date-monthly"
                     :style="{'background-color': option.color ? option.color.header : '#3f51b5'}">
                    <div class="cov-date-previous" @click="nextMonth('pre')"><</div>
                    <div class="cov-date-caption" :style="{'color': option.color ? option.color.headerText : '#fff'}">
                        <span @click="showYear"><small>{{checked.year}}</small></span>
                        <br>
                        <span @click="showMonth">{{displayInfo.month}}</span>
                    </div>
                    <div class="cov-date-next" @click="nextMonth('next')">></div>
                </div>
                <div class="cov-date-box" v-if="showInfo.day">
                    <div class="cov-picker-box">
                        <div class="week">
                            <ul>
                                <li v-for="weekie in library.week">{{weekie}}</li>
                            </ul>
                        </div>
                        <div class="day" v-for="day in dayList" track-by="$index" @click="checkDay(day)"
                             :class="{'checked':day.checked,'unavailable':day.unavailable,'passive-day': !(day.inMonth)}"
                        >
                            {{day.value}}
                        </div>
                    </div>
                </div>
                <div class="cov-date-box list-box" v-if="showInfo.year">
                    <div class="cov-picker-box date-list" id="yearList">
                        <div class="date-item" v-for="yearItem in library.year" track-by="$index"
                             @click="setYear(yearItem)">
                            {{yearItem}}
                        </div>
                    </div>
                </div>
                <div class="cov-date-box list-box" v-if="showInfo.month">
                    <div class="cov-picker-box date-list">
                        <div class="date-item" v-for="monthItem in library.month" track-by="$index"
                             @click="setMonth(monthItem)">
                            {{monthItem}}
                        </div>
                    </div>
                </div>
                <div class="cov-date-box list-box" v-if="showInfo.hour">
                    <div class="cov-picker-box date-list">
                        <div class="watch-box">
                            <p class="hour-text">
                                时
                            </p>
                            <p class="min-text">
                                分
                            </p>
                            <div class="hour-box">
                                <ul>
                                    <li class="hour-item" v-for="hitem in hours" @click="setTime('hour', hitem, hours)"
                                        :class="{'active':hitem.checked}">{{hitem.value}}
                                    </li>
                                </ul>
                            </div>
                            <div class="min-box">
                                <div class="min-item" v-for="mitem in mins" @click="setTime('min',mitem, mins)"
                                     :class="{'active':mitem.checked}">{{mitem.value}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-box">
                    <span @click="showInfo.check=false">{{buttons? buttons.cancel : 'Cancel' }}</span>
                    <span @click="picked">{{buttons? buttons.ok : 'Ok'}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment';
export default {
    props: {
        required: false,
        date: {},
        option: { // 配置
            type: Object,
            default () {
                return {
                    type: 'min',
                    format: 'YYYY-MM-DD HH:mm',
                    color: {
                        checked: '#F50057',
                        header: '#258bf2',
                        headerText: '#fff',
                        weekColor: '',
                        dayColor: '',
                        bg: '',
                        dayActive: '',
                    },
                    placeholder: '请选择时间',
                    overlayOpacity: 0.5,
                    dismissible: true
                };
            }
        },
        limit: { // 时间跨度限制
            type: Array,
            default () {
                return [];
            }
        },
        inputStyle: { // 设置样式
            type: Object,
            default () {
                return {
                    width: '100%',
                    height: "30px",
                    lineHeight: '30px',
                    backgroundColor: "#161616",
                    border: '1px solid #929191',
                    borderRadius: "3px",
                    fontSize: "14px",
                    paddingLeft: "5px",
                    cursor: 'pointer',
                    color: "#fff",
                }
            }
        }
    },
    data() {
        let that = this;

        function hours() {
            let list = [];
            let hour = 24;
            while (hour > 0) {
                hour--;
                if (moment(that.date).format("HH") == ('0' + hour)) {
                    list.push({
                        checked: true,
                        value: hour < 10 ? '0' + hour : hour
                    })
                } else if (moment(that.date).format("HH") == (hour)) {
                    list.push({
                        checked: true,
                        value: hour < 10 ? '0' + hour : hour
                    })
                } else {
                    list.push({
                        checked: false,
                        value: hour < 10 ? '0' + hour : hour
                    })
                }
            }
            return list
        }

        function mins() {
            let list = [];
            let min = 60;
            while (min > 0) {
                min--;
                if (moment(that.date).format("mm") == ('0' + min)) {
                    list.push({
                        checked: true,
                        value: min < 10 ? '0' + min : min
                    })
                } else if (moment(that.date).format("mm") == (min)) {
                    list.push({
                        checked: true,
                        value: min < 10 ? '0' + min : min
                    })
                } else {
                    list.push({
                        checked: false,
                        value: min < 10 ? '0' + min : min
                    })
                }
            }
            return list
        }

        return {
            hours: hours(),
            mins: mins(),
            // week:
            // month:
            SundayFirst: false,
            showInfo: {
                hour: false,
                day: false,
                month: false,
                year: false,
                check: false
            },
            displayInfo: {
                month: ''
            },
            library: {
                week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                year: []
            },
            checked: {
                oldtime: '',
                currentMoment: null,
                year: '',
                month: '',
                day: '',
                hour: '00',
                min: '00'
            },
            dayList: [],
            selectedDays: [],
            timeDate: this.date,
            buttons: {
                ok: '确认',
                cancel: '取消'
            },
        }
    },
    methods: {
        pad(n) {
            n = Math.floor(n)
            return n < 10 ? '0' + n : n
        },
        nextMonth(type) {
            let next = null
            type === 'next' ? next = moment(this.checked.currentMoment).add(1, 'M') : next = moment(this.checked.currentMoment).add(-1, 'M')
            this.showDay(next)
        },
        showDay(time) {
            if (time === undefined || !Date.parse(time)) {
                this.checked.currentMoment = moment()
            } else {
                this.checked.currentMoment = moment(time, this.option.format)
            }
            this.showOne('day')
            this.checked.year = moment(this.checked.currentMoment).format('YYYY')
            this.checked.month = moment(this.checked.currentMoment).format('MM')
            this.checked.day = moment(this.checked.currentMoment).format('DD')
            this.displayInfo.month = this.library.month[moment(this.checked.currentMoment).month()]
            let days = []
            let currentMoment = this.checked.currentMoment
            let firstDay = moment(currentMoment).date(1).day()
            // gettting previous and next month
            // let currentMonth = moment(currentMoment)
            let previousMonth = moment(currentMoment)
            let nextMonth = moment(currentMoment)
            nextMonth.add(1, 'months')
            previousMonth.subtract(1, 'months')
            let monthDays = moment(currentMoment).daysInMonth()
            let oldtime = this.checked.oldtime
            for (let i = 1; i <= monthDays; ++i) {
                days.push({
                    value: i,
                    inMonth: true,
                    unavailable: false,
                    checked: false,
                    moment: moment(currentMoment).date(i)
                })
                if (i === Math.ceil(moment(currentMoment).format('D')) && moment(oldtime, this.option.format).year() === moment(currentMoment).year() && moment(oldtime, this.option.format).month() === moment(currentMoment).month()) {
                    days[i - 1].checked = true
                }
                this.checkBySelectDays(i, days)
            }
            if (firstDay === 0) firstDay = 7
            for (let i = 0; i < firstDay - (this.SundayFirst ? 0 : 1); i++) {
                let passiveDay = {
                    value: previousMonth.daysInMonth() - (i),
                    inMonth: false,
                    action: 'previous',
                    unavailable: false,
                    checked: false,
                    moment: moment(currentMoment).date(1).subtract(i + 1, 'days')
                }
                days.unshift(passiveDay)
            }
            if (this.limit.length > 0) {
                for (let li of this.limit) {
                    switch (li.type) {
                        case 'fromto':
                            days = this.limitFromTo(li, days)
                            break
                        case 'weekday':
                            days = this.limitWeekDay(li, days)
                            break
                    }
                }
            }
            var passiveDaysAtFinal = 42 - days.length
            for (let i = 1; i <= passiveDaysAtFinal; i++) {
                let passiveDay = {
                    value: i,
                    inMonth: false,
                    action: 'next',
                    unavailable: false,
                    checked: false,
                    moment: moment(currentMoment).add(1, 'months').date(i)
                }
                days.push(passiveDay)
            }
            this.dayList = days
        },
        checkBySelectDays(d, days) {
            this.selectedDays.forEach(day => {
                if (this.checked.year === moment(day).format('YYYY') && this.checked.month === moment(day).format('MM') && d === Math.ceil(moment(day).format('D'))) {
                    days[d - 1].checked = true
                }
            })
        },
        limitWeekDay(limit, days) {
            days.map((day) => {
                if (limit.available.indexOf(Math.floor(day.moment.format('d'))) === -1) {
                    day.unavailable = true
                }
            })
            return days
        },
        limitFromTo(limit, days) {
            if (limit.from || limit.to) {
                days.map((day) => {
                    if (this.getLimitCondition(limit, day)) {
                        day.unavailable = true
                    }
                })
            }
            return days
        },
        getLimitCondition(limit, day) {
            let tmpMoment = moment(this.checked.year + '-' + this.pad(this.checked.month) + '-' + this.pad(day.value))
            if (limit.from && !limit.to) {
                return !tmpMoment.isAfter(limit.from)
            } else if (!limit.from && limit.to) {
                return !tmpMoment.isBefore(limit.to)
            } else {
                return !tmpMoment.isBetween(limit.from, limit.to)
            }
        },
        checkDay(obj) {
            if (obj.unavailable || obj.value === '') {
                return false
            }
            if (!(obj.inMonth)) {
                this.nextMonth(obj.action)
            }
            if (this.option.type === 'day' || this.option.type === 'min') {
                this.dayList.forEach((x) => {
                    x.checked = false
                })
                this.checked.day = this.pad(obj.value)
                obj.checked = true
            } else {
                let day = this.pad(obj.value)
                let ctime = this.checked.year + '-' + this.checked.month + '-' + day
                if (obj.checked === true) {
                    obj.checked = false
                    this.selectedDays.$remove(ctime)
                } else {
                    this.selectedDays.push(ctime)
                    obj.checked = true
                }
            }
            switch (this.option.type) {
                case 'day':
                    this.picked()
                    break
                case 'min':
                    this.showOne('hour')
                    // shift activated time items to visible position.
                    this.shiftActTime()
                    break
            }
        },
        showYear() {
            let year = moment(this.checked.currentMoment).year()
            this.library.year = []
            let yearTmp = []
            for (let i = year - 100; i < year + 5; ++i) {
                yearTmp.push(i)
            }
            this.library.year = yearTmp
            this.showOne('year')
            this.$nextTick(() => {
                let listDom = document.getElementById('yearList')
                listDom.scrollTop = (listDom.scrollHeight - 100)
                this.addYear()
            })
        },
        showOne(type) {
            switch (type) {
                case 'year':
                    this.showInfo.hour = false
                    this.showInfo.day = false
                    this.showInfo.year = true
                    this.showInfo.month = false
                    break
                case 'month':
                    this.showInfo.hour = false
                    this.showInfo.day = false
                    this.showInfo.year = false
                    this.showInfo.month = true
                    break
                case 'day':
                    this.showInfo.hour = false
                    this.showInfo.day = true
                    this.showInfo.year = false
                    this.showInfo.month = false
                    break
                case 'hour':
                    this.showInfo.hour = true
                    this.showInfo.day = false
                    this.showInfo.year = false
                    this.showInfo.month = false
                    break
                default:
                    this.showInfo.day = true
                    this.showInfo.year = false
                    this.showInfo.month = false
                    this.showInfo.hour = false
            }
        },
        showMonth() {
            this.showOne('month')
        },
        addYear() {
            let listDom = document.getElementById('yearList')
            listDom.addEventListener('scroll', (e) => {
                if (listDom.scrollTop < listDom.scrollHeight - 100) {
                    let len = this.library.year.length
                    let lastYear = this.library.year[len - 1]
                    this.library.year.push(lastYear + 1)
                }
            }, false)
        },
        setYear(year) {
            this.checked.currentMoment = moment(year + '-' + this.checked.month + '-' + this.checked.day)
            this.showDay(this.checked.currentMoment)
        },
        setMonth(month) {
            let mo = (this.library.month.indexOf(month) + 1)
            if (mo < 10) {
                mo = '0' + '' + mo
            }
            this.checked.currentMoment = moment(this.checked.year + '-' + mo + '-' + this.checked.day)
            this.showDay(this.checked.currentMoment)
        },
        showCheck () {
            this.timeDate = moment(this.timeDate).format(this.option.format);

            if (this.timeDate === '') {
                this.showDay();
            } else {
                if (this.option.type === 'day' || this.option.type === 'min') {
                    this.checked.oldtime = this.timeDate;

                    this.showDay(this.timeDate);
                } else {
                    this.selectedDays = JSON.parse(this.timeDate)
                    if (this.selectedDays.length) {
                        this.checked.oldtime = this.selectedDays[0]
                        this.showDay(this.selectedDays[0])
                    } else {
                        this.showDay();
                    }
                }
            }
            this.showInfo.check = true;
        },
        setTime (type, obj, list) {

            for (let item of list) {
                item.checked = false;
                if (item.value === obj.value) {
                    item.checked = true;
                    this.checked[type] = item.value;
                }
            }
        },
        picked () {
            if (this.option.type === 'day' || this.option.type === 'min') {
                let ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day + ' ' + this.checked.hour + ':' + this.checked.min
                this.checked.currentMoment = moment(ctime, 'YYYY-MM-DD HH:mm');
                this.timeDate = moment(this.checked.currentMoment).format(this.option.format);
            } else {
                this.timeDate = JSON.stringify(this.selectedDays);
            }
            this.showInfo.check = false;
            this.$emit('change', this.timeDate);
        },
        dismiss (evt) {
            if (evt.target.className === 'datepicker-overlay') {
                if (this.option.dismissible === undefined || this.option.dismissible) {
                    this.showInfo.check = false;
                    this.$emit('cancel');
                }
            }
        },
        shiftActTime () {
            // shift activated time items to visible position.
            this.$nextTick(() => {
                if (!document.querySelector('.hour-item.active')) {
                    return false;
                }
                document.querySelector('.hour-box').scrollTop = (document.querySelector('.hour-item.active').offsetTop || 0) - 250
                document.querySelector('.min-box').scrollTop = (document.querySelector('.min-item.active').offsetTop || 0) - 250
            });
        }
    },
    computed: {
        timeFormat () {
            return moment(this.timeDate).format(this.option.format)
        }
    }
};
</script>
