<template>
  <div>
    <el-row type="flex" justify="end">
      <!-- //选择年 -->
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <!-- //选择月 -->
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        @change="dateChange"
      >
        <!-- //循环12个月 -->
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <!-- //日历组件 -->
    <el-calendar v-model="currentDate">
      <!-- //具名插槽+作用域插槽 -->
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <!-- //data.day 进行getDay过滤 //2021-09-21 | getDay 过滤之后结果：21
          //2021-09-01 | getDay 过滤之后结果：1 -->
          <span class="text"> {{ data.day | getDay }}</span>
          <!-- //如果是休息日，那么添加一个休 字 -->
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    startDate: {
      type: Date,
      //对象类型的默认值，必须通过函数指定，不能直接写new Date()
      default: () => new Date(), //如果没有传递startDate，就使用默认的当前时间
    },
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      yearList: [],
      currentDate: null, //当前日期
    };
  },
  created() {
    this.currentMonth = this.startDate.getMonth() + 1; //getMonth返回的是0-11
    this.currentYear = this.startDate.getFullYear();
    // 根据当前的年 生成可选年份 前后各加5年
    this.yearList = Array.from(
      Array(11),
      (value, index) => this.currentYear + index - 5
    );
    this.dateChange();
  },
  filters: {
    getDay(value) {
      // 2021-08-08  2021-08-18
      const day = value.split("-")[2]; // 08  18
      //如果是08那么就返回8
      return day.startsWith("0") ? day.substr(1) : day; // 8 18
    },
  },
  methods: {
    // 是否是休息日
    isWeek(value) {
      //getDay是获取星期几，如果是0是星期日，6是星期六
      return value.getDay() === 6 || value.getDay() === 0;
    },
    dateChange() {
      const year = this.currentYear;
      const month = this.currentMonth;
      //需求：如果年月份改变之后，我们让日历默认选中当月1号
      this.currentDate = new Date(`${year}-${month}-1`); // 以当前月的1号为起始
    },
  },
};
</script>

<style  scoped  >
.el-calendar-day {
  height: auto;
}
.el-calendar-table__row td,
.el-calendar-table tr td:first-child,
.el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
.el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
.el-calendar__header {
  display: none;
}
</style>

