<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <page-tools show-before>
      //show-before是:show-before="true"的简写，所有等于true的都可以只写属性名
      <template v-slot:before>
        <span>我想你们</span>
      </template>
      <template #after>
        <el-button type="primary">导入Excel</el-button>
      </template>
    </page-tools> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import PageTools from "@/components/PageTools";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: {
    // PageTools,
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
