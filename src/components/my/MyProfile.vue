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
        specialty: '',
        class: '',
        phone: '',
        email: ''
      },
      lablist: [],
      collegelist: []
    }
  },
  created: function () {
    let user = this.$parent.access
    this.$http.get('/api/users/2?accessToken=' + user).then(res => {
      console.log(res)
      this.message = res.body.value
      if (this.message.gender) {
        this.gender = '1'
      } else {
        this.gender = '0'
      }
    })
    this.$http.get('/api/labs?accessToken=' + this.$parent.access).then(res => {
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
    this.$http.get('/api/colleges/specialties?accessToken=' + this.$parent.access).then(res => {
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
      this.$http.put('/api/users?accessToken=' + user, this.message).then(res => {
        console.log(res)
        console.log(this.message)
        if (res.body.succeed) {
          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true
          })
        } else {
          this.$message({
            message: res.body.message,
            type: 'error',
            showClose: true
          })
        }
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
</style>
