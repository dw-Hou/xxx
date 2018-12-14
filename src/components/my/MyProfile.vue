<template>
  <div id="myprofile">
    <el-card style="max-width: 600px;">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div id="profile-block">
        <div class="profile-group">
          <div class="title-block">
            <span>姓名：</span>
          </div>
          <el-input
            style="width: calc(100% - 100px)"
            placeholder="请输入内容"
            v-model="message.name"
            clearable>
          </el-input>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>密码：</span>
          </div>
          <el-button type="danger" size="small" @click="changepassword">修改密码</el-button>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>学号：</span>
          </div>
          <el-input
            style="width: calc(100% - 100px)"
            placeholder="请输入内容"
            v-model="message.schoolId"
            clearable>
          </el-input>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>性别：</span>
          </div>
          <el-radio v-model="gender" label="0">男</el-radio>
          <el-radio v-model="gender" label="1">女</el-radio>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>实验室：</span>
          </div>
          <el-select v-model="message.lab" clearable placeholder="请选择" style="width: calc(100% - 100px)">
            <el-option
              v-for="item in lablist"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>学院/专业：</span>
          </div>
          <el-cascader
            :options="collegelist"
            v-model="specialty"
            style="width: calc(100% - 100px)">
          </el-cascader>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>班号：</span>
          </div>
          <el-input
            style="width: calc(100% - 100px)"
            placeholder="请输入班号"
            v-model="message.class"
            clearable>
          </el-input>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>联系方式：</span>
          </div>
          <el-input
            style="width: calc(100% - 100px)"
            placeholder="请输入联系方式"
            v-model="message.phone"
            clearable>
          </el-input>
        </div>
        <div class="profile-group">
          <div class="title-block">
            <span>电子邮箱：</span>
          </div>
          <el-input
            style="width: calc(100% - 100px)"
            placeholder="请输入电子邮箱"
            v-model="message.email"
            clearable>
          </el-input>
        </div>
        <div id="save">
          <el-button type="primary" @click="save">保存修改</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="修改密码" :visible.sync="passwordwindow" width="500px" :before-close="cancel">
      <div class="dialog">
        <div class="input-group">
          <span>旧密码：</span>
          <el-input v-model="oldpassword" type="password" size="medium" style="width: 300px"></el-input>
        </div>
        <div class="input-group">
          <span>新密码：</span>
          <el-input v-model="newpassword" type="password" size="medium" style="width: 300px"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="savepassword" type="primary">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyProfile',
  http: {
    root: '/',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  data () {
    return {
      gender: '0',
      message: {
        id: 0,
        name: '',
        schoolId: '',
        gender: false,
        lab: '',
        college: '',
        specialty: [],
        class: '',
        phone: '',
        email: ''
      },
      lablist: [],
      collegelist: [],
      specialty: '',
      passwordwindow: false,
      newpassword: '',
      oldpassword: ''
    }
  },
  created: function () {
    let user = this.$parent.access
    this.$http.get('http://39.106.109.8:5005/api/users/' + this.$parent.userId + '?accessToken=' + user).then(res => {
      console.log(res)
      this.message = res.body.value
      if (this.message.gender) {
        this.gender = '1'
      } else {
        this.gender = '0'
      }
      if (this.message.specialty) {
        this.specialty = [this.message.college, this.message.specialty]
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/labs?accessToken=' + this.$parent.access).then(res => {
      // console.log(res)
      if (res.body.succeed) {
        this.lablist = res.body.value
      } else {
        this.$message({
          message: res.body.message,
          type: 'danger',
          showClose: true
        })
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/colleges/specialties?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.collegelist = res.body.value
        console.log(this.collegelist)
      }
    })
  },
  methods: {
    save: function () {
      let user = this.$parent.access
      if (this.gender === '1') {
        this.message.gender = true
      } else {
        this.message.gender = false
      }
      if (this.specialty) {
        this.message.college = this.specialty[0]
        this.message.specialty = this.specialty[1]
      }
      this.$http.put('http://39.106.109.8:5005/api/users?accessToken=' + user, this.message).then(res => {
        console.log(res)
        console.log(this.message)
        if (res.body.succeed) {
          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true
          })
          this.$http.get('http://39.106.109.8:5005/api/users/' + this.$parent.userId + '?accessToken=' + user).then(res => {
            console.log(res)
            this.message = res.body.value
            if (this.message.gender) {
              this.gender = '1'
            } else {
              this.gender = '0'
            }
            if (this.message.specialty) {
              this.specialty = [this.message.college, this.message.specialty]
            }
          })
        } else {
          this.$message({
            message: res.body.message,
            type: 'error',
            showClose: true
          })
        }
      })
    },
    changepassword: function () {
      this.passwordwindow = true
    },
    cancel: function () {
      this.passwordwindow = false
      this.oldpassword = ''
      this.newpassword = ''
    },
    savepassword: function () {
      var mess = {
        oldPassword: this.oldpassword,
        newPassword: this.newpassword
      }
      if (this.oldpassword === '') {
        this.dangermessage('请输入旧密码')
        return 0
      }
      if (this.newpassword === '') {
        this.dangermessage('请输入新密码')
        return 0
      }
      this.$http.put('http://39.106.109.8:5005/api/users/' + this.$parent.userId + '/pwd?accessToken=' + this.$parent.access, mess).then(res => {
        if (res.body.succeed) {
          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true
          })
          this.cancel()
        } else {
          this.dangermessage('旧密码不正确')
        }
      })
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
    }
  }
}
</script>

<style scoped>
  #save{
    display: flex;
    justify-content: flex-end;
  }
  #myprofile{
    padding: 24px;
    width: 100%;
  }
  #profile-block{
    max-width: 600px;
  }
  .profile-group{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .profile-group span{
    font-size: 16px;
  }
  .title-block{
    width: 100px;
  }
  .title-block span{
    float: right;
  }
  .input-group{
    display: flex;
    margin-bottom: 16px;
    align-items: center;
  }
  .input-group:last-child{
    margin-bottom: 0px;
  }
  .dialog{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
