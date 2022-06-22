<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          //我们先写死一个，测试一下（这个图片是百度图片上随便复制的一个地址，失效的话自己随便再找一个）
          url: "http://skeimg.com/i/2021/12/07/xxy36g.jpg",
        },
      ], // 上传的文件列表
      showDialog: false, // 控制显示弹层
      imgUrl: "", //图片路径
    };
  },
  methods: {
    preview(file) {
      //file是el-upload组件传递过来的参数，就是当前预览的文件对象
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url;
      this.showDialog = true;
    },
  },
};
</script>

<style>
</style>