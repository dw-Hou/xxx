<template>
  <div id="rolemanage">
    <el-card class="box-card" style="min-width: 600px;margin-bottom: 24px;margin-right: 24px">
      <div slot="header" class="clearfix">
        <span>角色列表</span>
      </div>
      <div class="button-group">
        <el-button type="success" size="small" @click="openaddwindow">添加角色</el-button>
          <el-button type="danger" size="small" @click="deleteall">删除角色</el-button>
      </div>
      <el-table
        ref="table"
        :data="rolelist"
        tooltip-effect="dark"
        style="width: 100%">
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
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="submit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">权限管理</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)">用户添加</el-button>
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
        row-key="id"
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
    <el-dialog title="角色添加" :visible.sync="addwindow" width="500px" :before-close="cancel">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>角色名称：</span>
          </div>
          <el-input v-model="newrole.name" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="内容编辑" :visible.sync="editwindow" width="500px">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>角色名称：</span>
          </div>
          <el-input v-model="editrole.name" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancel">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleManage',
  data () {
    return {
      editwindow: false,
      addwindow: false,
      rolelist: [],
      newrole: {
        name: ''
      },
      editrole: {
        name: ''
      },
      tempclick: {
        index: '',
        row: ''
      }
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    dangermessage: function (mess) {
      this.$message({
        message: mess,
        type: 'error',
        showClose: true
      })
    },
    editcancel: function () {
      this.editrole.name = ''
      this.tempclick = {
        index: '',
        row: ''
      }
      this.editwindow = false
    },
    edituser: function () {
      if (this.editrole.name === '') {
        this.dangermessage('角色名不可为空')
        return 0
      }
      this.rolelist[this.tempclick.index].name = this.editrole.name
      this.$http.put('/api/roles?accessToken=' + this.$parent.access, this.rolelist[this.tempclick.index]).then(res => {
        if (res.body.succeed) {
        }
      })
      this.editcancel()
    },
    successmessage: function (mess) {
      this.$message({
        message: mess,
        type: 'success',
        showClose: true
      })
    },
    cancel: function () {
      this.newrole = {
        name: ''
      }
      this.addwindow = false
    },
    addrole: function () {
      if (this.newrole.name === '') {
        this.dangermessage('角色名不可为空')
        return 0
      }
      this.$http.post('/api/roles?accessToken=' + this.$parent.access, this.newrole).then(res => {
        if (res.body.succeed) {
          this.successmessage('创建成功')
          this.getrolelist()
          this.cancel()
        }
      })
    },
    getrolelist: function () {
      this.$http.get('/api/roles?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.rolelist = res.body.value.filter(row => { return row.id !== 52 })
          console.log(this.rolelist)
        }
      })
    },
    deleteall: function () {
      let flag = false
      // console.log(this.$refs.table.store.states.selection)
      this.$refs.table.store.states.selection.forEach(row => {
        this.$http.delete('/api/roles/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
          console.log(res)
          if (!res.body.succeed) {
            this.dangermessage(res.body.message)
            flag = true
          }
        })
      })
      if (!flag) {
        this.getrolelist()
        this.successmessage('删除成功')
      }
    },
    submit: function (index, row) {
      this.editwindow = true
      this.editrole.name = this.rolelist[index].name
      this.tempclick = {
        index: index,
        row: row
      }
    }
  },
  created: function () {
    this.getrolelist()
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
  .input-group{
    display: flex;
    margin-bottom: 16px;
  }
  .input-group:last-child{
    margin-bottom: 0px;
  }
  .dialog{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .right-span{
    display: flex;
    width: 80px;
    justify-content: flex-end;
    align-items: center;
  }
</style>
