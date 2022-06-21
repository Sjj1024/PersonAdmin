<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件  -->
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
import AddDept from "./components/add-dept"; // 引入新增部门组件

export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      company: {}, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: "name", // 表示 从这个属性显示内容
      },
      showDialog: false, // 显示窗体,
      node: null, // 操作的节点
      loading: false, // 用来控制进度弹层的显示和隐藏
    };
  },
  created() {
    this.getDepartments(); // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      this.loading = true; //获取前，改为true
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      // 这里定义一个空串  因为 它是根 所有的子节点的数据pid 都是 ""
      this.departs = tranListToTreeData(result.depts, "");
      this.loading = false; //获取后，改为false
    },
    //增加方法
    addDepts(node) {
      this.showDialog = true; // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node;
    },
    // 编辑部门节点
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true;
      this.node = node; // 赋值操作的节点
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id); // 直接调用子组件中的方法 传入一个id
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