<template>
  <!-- 导入公共组件 -->
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from "@/api/employees";

export default {
  data() {
    return {
      type: this.$route.query.type, //接收查询字符串参数type，比如：/import?type=user
    };
  },
  methods: {
    // 在methods中修改success函数
    async success({ header, results }) {
      // 如果是导入员工
      const userRelations = {
        入职日期: "timeOfEntry",
        手机号: "mobile",
        姓名: "username",
        转正日期: "correctionTime",
        工号: "workNumber",
      };

      // 将中文转为英文的
      var newArr = [];
      results.forEach((item) => {
        const userInfo = {};
        Object.keys(item).forEach((key) => {
          userInfo[userRelations[key]] = item[key];
          if (
            userRelations[key] === "timeOfEntry" ||
            userRelations[key] === "correctionTime"
          ) {
            // 只有这样, 才能入库
            userInfo[userRelations[key]] = new Date(
              this.formatDate(item[key], "/")
            );
          }
        });
        newArr.push(userInfo);
      });
      console.log(newArr);
      await importEmployee(newArr);
      this.$message.success("导入excel成功");
      this.$router.back();
    },
    //转化excel的日期格式（直接复制即可）
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() - 1 + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>