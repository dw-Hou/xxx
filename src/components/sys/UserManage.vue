<template>
  <div id="usermanage">
    <div id="usermanage-top">
      <el-button type="success" size="small" @click="openaddwindow">添加用户</el-button>
      <el-button type="danger" size="small" @click="deleteall">删除用户</el-button>
    </div>
    <el-card class="box-card" style="margin-top: 12px">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <el-table
        ref="usertable"
        :data="userlist"
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
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edits(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deletes(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="用户添加" :visible.sync="addwindow" width="500px" :before-close="cancel">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>工号/学号：</span>
          </div>
          <el-input v-model="newuser.schoolId" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>姓名：</span>
          </div>
          <el-input v-model="newuser.name" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>密码：</span>
          </div>
          <el-input type="password" v-model="newuser.pwd1" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>重复密码：</span>
          </div>
          <el-input type="password" v-model="newuser.pwd2" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="用户编辑" :visible.sync="editwindow" width="500px" :before-close="canceledit">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>工号/学号：</span>
          </div>
          <el-input v-model="editschoolId" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>姓名：</span>
          </div>
          <el-input v-model="editname" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceledit">取消</el-button>
        <el-button type="primary" @click="saveedit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data () {
    return {
      userlist: [],
      addwindow: false,
      editwindow: false,
      newuser: {
        schoolId: '',
        name: '',
        pwd1: '',
        pwd2: ''
      },
      edituser: {},
      editschoolId: '',
      editname: '',
      newpassword: '',
      oldpassword: ''
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    adduser: function () {
      if (this.newuser.schoolId === '') {
        this.dangermessage('学号不可为空')
        return 0
      }
      if (this.newuser.name === '') {
        this.dangermessage('名字不可为空')
        return 0
      }
      if (this.newuser.pwd1 === '') {
        this.dangermessage('密码不可为空')
        return 0
      }
      if (this.newuser.pwd2 === '') {
        this.dangermessage('请重复输入密码')
        return 0
      }
      if (this.newuser.pwd1 !== this.newuser.pwd2) {
        this.dangermessage('两次密码输入不一样')
        return 0
      }
      let mess = {
        userId: this.newuser.schoolId,
        password: this.newuser.pwd1,
        name: this.newuser.name
      }
      this.$http.post('/api/users?accessToken=' + this.$parent.access, mess).then(res => {
        if (res.body.succeed) {
          this.successmessage('创建成功')
          this.getuserlist()
          this.cancel()
        } else {
          this.dangermessage(res.body.message)
        }
      })
    },
    deleteall: function () {
      var flag = false
      this.$refs.usertable.store.states.selection.forEach(user => {
        this.$http.delete('/api/users/' + user.id + '?accessToken=' + this.$parent.access).then(res => {
          if (!res.body.succeed) {
            flag = true
          }
        })
      })
      if (flag) {
        this.dangermessage('发生错误')
      } else {
        this.successmessage('删除成功')
        this.getuserlist()
      }
    },
    dangermessage: function (mess) {
      this.$message({
        message: mess,
        type: 'error',
        showClose: true
      })
    },
    successmessage: function (mess) {
      this.$message({
        message: mess,
        type: 'success',
        showClose: true
      })
    },
    cancel: function () {
      this.newuser = {
        schoolId: '',
        name: ''
      }
      this.addwindow = false
    },
    getuserlist: function () {
      this.$http.get('/api/users?detail=true&accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.userlist = res.body.value
        }
      })
    },
    edits: function (index, row) {
      this.editwindow = true
      this.edituser = row
      this.editschoolId = row.schoolId
      this.editname = row.name
    },
    canceledit: function () {
      this.editwindow = false
    },
    saveedit: function () {
      if (this.editschoolId !== this.edituser.schoolId || this.editname !== this.edituser.name) {
        this.$http.put('/api/users?accessToken=' + this.$parent.access, {id: this.edituser.id, schoolId: this.editschoolId, name: this.editname}).then(res => {
          console.log(res)
          if (res.body.succeed) {
            this.successmessage('修改成功')
            this.getuserlist()
          } else {
            this.dangermessage(res.body.message)
          }
        })
      }
    },
    deletes: function (index, row) {
      this.$http.delete('/api/users/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.successmessage('删除成功')
          this.getuserlist()
        } else {
          this.dangermessage(res.body.message)
        }
      })
    }
  },
  created: function () {
    this.$http.get('/api/users?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.userlist = res.body.value
      }
    })
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
