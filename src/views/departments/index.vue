<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
export default {
  components: {
    TreeTools,
  },
  data() {
    return {
      company: {}, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: "name", // 表示 从这个属性显示内容
      },
    };
  },
  created() {
    this.getDepartments(); // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人" };
      // 这里定义一个空串  因为 它是根 所有的子节点的数据pid 都是 ""
      this.departs = tranListToTreeData(result.depts, "");
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>