<template>
  <div id="usermanage">
    <div id="usermanage-top">
      <el-button type="success" size="small">添加用户</el-button>
      <el-button type="danger" size="small">删除用户</el-button>
    </div>
    <el-card class="box-card" style="margin-top: 12px">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="userlist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="工号/学号"
          prop="schoolId"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data () {
    return {
      userlist: [
        {
          schoolId: 'xxx',
          name: 'xxx'
        },
        {
          schoolId: 'xxx',
          name: 'xxx'
        }
      ]
    }
  }
}
</script>

<style scoped>
  #usermanage{
    width: 100%;
    padding: 24px;
  }
  #usermanage-top{
  }
</style>
