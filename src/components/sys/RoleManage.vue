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
              @click="menu(scope.$index, scope.row)">权限管理</el-button>
            <el-button
              size="mini"
              type="success"
              @click="adduser(scope.$index, scope.row)">用户添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card" style="min-width: 300px" v-show="addu">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <div class="button-group">
        <el-button type="success" size="small" @click="addusers">添加用户</el-button>
        <el-button type="danger" size="small" @click="deleteusers">删除用户</el-button>
      </div>
      <el-table
        ref="userroletable"
        :data="roleuserlist"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="schoolId">
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
    <el-dialog title="内容编辑" :visible.sync="editwindow" width="500px" :before-close="editcancel">
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
    <el-dialog title="权限管理" :visible.sync="menumanage" width="500px" :before-close="menucancel">
      <div>
        <el-tree :data="menulist" show-checkbox ref="tree" node-key="value">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menucancel">取 消</el-button>
        <el-button type="primary" @click="menuchange">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户添加" :visible.sync="user" width="500px " :before-close="usercancel">
      <el-table
        ref="usertable"
        :data="userlist"
        row-key="id"
        tooltip-effect="dark"
        style="width: 100%">
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
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="usercancel">取 消</el-button>
        <el-button type="primary" @click="userchoose">确 定</el-button>
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
      },
      roleuserlist: [],
      addu: false,
      menumanage: false,
      menulist: [],
      activemenu: [],
      activerole: '',
      userlist: [],
      user: false,
      userrole: ''
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
      this.$http.put('http://39.106.109.8:5005/api/roles?accessToken=' + this.$parent.access, this.rolelist[this.tempclick.index]).then(res => {
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
      this.$http.post('http://39.106.109.8:5005/api/roles?accessToken=' + this.$parent.access, this.newrole).then(res => {
        if (res.body.succeed) {
          this.successmessage('创建成功')
          this.getrolelist()
          this.cancel()
        }
      })
    },
    getrolelist: function () {
      this.$http.get('http://39.106.109.8:5005/api/roles?accessToken=' + this.$parent.access).then(res => {
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
        this.$http.delete('http://39.106.109.8:5005/api/roles/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
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
    },
    adduser: function (index, row) {
      this.addu = true
      this.userrole = row.id
      this.$http.get('http://39.106.109.8:5005/api/roles/' + row.id + '/users?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.roleuserlist = res.body.value
        } else {
          this.dangermessage(res.body.message)
        }
      })
    },
    menu: function (index, row) {
      this.menumanage = true
      this.activerole = row.id
      this.$http.get('http://39.106.109.8:5005/api/roles/' + row.id + '/menu?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          var a = []
          var i = 0
          res.body.value.forEach(node => {
            a[i++] = node.id
          })
          this.activemenu = a
          this.$refs.tree.setCheckedKeys(a)
        } else {
          this.dangermessage(res.body.message)
        }
      })
    },
    menucancel: function () {
      this.menumanage = false
    },
    menuchange: function () {
      var flag = false
      if (this.activemenu.length > 0) {
        this.$http.post('http://39.106.109.8:5005/api/roles/' + this.activerole + '/menu/del?accessToken=' + this.$parent.access, this.activemenu).then(res => {
          // console.log(res)
          if (!res.body.succeed) {
            flag = true
          } else {
            var a = []
            var i = 0
            this.$refs.tree.getCheckedNodes().forEach(node => {
              a[i++] = node.value
            })
            this.$http.post('http://39.106.109.8:5005/api/roles/' + this.activerole + '/menu?accessToken=' + this.$parent.access, a).then(res => {
              // console.log(res)
              if (!res.body.succeed || flag) {
                this.dangermessage('出现错误')
              } else {
                this.successmessage('修改成功')
              }
            })
          }
        })
      } else {
        var a = []
        var i = 0
        this.$refs.tree.getCheckedNodes().forEach(node => {
          a[i++] = node.value
        })
        this.$http.post('http://39.106.109.8:5005/api/roles/' + this.activerole + '/menu?accessToken=' + this.$parent.access, a).then(res => {
          // console.log(res)
          if (!res.body.succeed || flag) {
            this.dangermessage('出现错误')
          } else {
            this.successmessage('修改成功')
          }
        })
      }
      this.menucancel()
    },
    addusers: function () {
      this.user = true
    },
    usercancel: function () {
      this.user = false
    },
    userchoose: function () {
      var flag = 0
      console.log(this.userrole)
      this.$refs.usertable.store.states.selection.forEach(row => {
        this.$http.post('http://39.106.109.8:5005/api/users/' + row.id + '/roles?accessToken=' + this.$parent.access, [this.userrole]).then(res => {
          flag++
          if (flag === this.$refs.usertable.store.states.selection.length - 1) {
            this.$http.get('http://39.106.109.8:5005/api/roles/' + this.userrole + '/users?accessToken=' + this.$parent.access).then(res => {
              if (res.body.succeed) {
                this.roleuserlist = res.body.value
              } else {
                this.dangermessage(res.body.message)
              }
            })
          }
        })
      })
      this.user = false
    },
    deleteusers: function () {
      var flag = 0
      this.$refs.userroletable.store.states.selection.forEach(row => {
        this.$http.post('http://39.106.109.8:5005/api/users/' + row.id + '/roles/del?accessToken=' + this.$parent.access, [this.userrole]).then(res => {
          flag++
          if (flag === this.$refs.userroletable.store.states.selection.length - 1) {
            this.$http.get('http://39.106.109.8:5005/api/roles/' + this.userrole + '/users?accessToken=' + this.$parent.access).then(res => {
              if (res.body.succeed) {
                this.successmessage('删除成功')
                this.roleuserlist = res.body.value
              } else {
                this.dangermessage(res.body.message)
              }
            })
          }
        })
      })
    }
  },
  created: function () {
    this.getrolelist()
    this.$http.get('http://39.106.109.8:5005/api/menu?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.menulist = res.body.value
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/users?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.userlist = res.body.value
      }
    })
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
