<template>
  <div id="logmanage">
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>日志列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="rolelist"
        tooltip-effect="dark">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="触发用户"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="日志级别"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="日志信息"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="时间"
          align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LogManage',
  data () {
    return {
      rolelist: [
        {
          name: 'xxx'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #logmanage{
    width: 100%;
    padding: 24px;
  }
</style>
