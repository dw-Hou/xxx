<template>
  <div id="rolemanage">
    <el-card class="box-card" style="min-width: 600px;margin-bottom: 24px">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>
      <div class="button-group">
        <el-button type="success" size="small">添加角色</el-button>
        <el-button type="danger" size="small">删除角色</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="rolelist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="角色名"
          prop="name"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="submit(scope.$index, scope.row)">内容编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">权限管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-checkbox v-model="checked">只显示没有角色的用户</el-checkbox>
      </div>
      <div class="button-group">
        <el-button type="success" size="small">添加角色</el-button>
        <el-button type="danger" size="small">删除角色</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="rolelist"
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
          prop="realname"
          label="姓名"
          align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'RoleManage',
  data () {
    return {
      rolelist: [{
        name: 'xxx',
        status: true,
        checked: true
      }]
    }
  }
}
</script>

<style scoped>
  #rolemanage{
    padding: 24px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .clearfix{
    display: flex;
    justify-content: space-between;
  }
</style>
