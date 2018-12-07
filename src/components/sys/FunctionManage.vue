<template>
  <div id="functionmanage">
    <div id="functionmanage-top">
      <el-button type="success" size="small" @click="openaddwindow">添加功能</el-button>
      <el-button type="danger" size="small" @click="deleteall">删除功能</el-button>
    </div>
    <el-card class="box-card" style="margin-top: 12px">
      <div slot="header" class="clearfix">
        <span>功能列表</span>
      </div>
      <el-tree :data="menulist" show-checkbox ref="tree" node-key="value">
      </el-tree>
    </el-card>
    <el-dialog title="功能添加" :visible.sync="addwindow" width="500px">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>添加类型：</span>
          </div>
          <div style="width: 300px">
            <el-radio v-model="radio" label="1" @change="change">添加根节点</el-radio>
            <el-radio v-model="radio" label="2" @change="change">添加叶节点</el-radio>
          </div>
        </div>
        <div class="input-group" v-show="leave" placeholder="请选择根节点">
          <div class="right-span">
            <span>根节点：</span>
          </div>
          <el-select style="width: 300px" v-model="gen">
            <el-option
              v-for="item in menulist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>功能名称：</span>
          </div>
          <el-input v-model="name" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addmenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FunctionManage',
  data () {
    return {
      addwindow: false,
      newability: {
        name: ''
      },
      abilitylist: [],
      abilityfilter: {
        name: '',
        serverPagination: '',
        page: '',
        itemsPerPage: ''
      },
      menulist: [],
      radio: '1',
      leave: false,
      gen: '',
      name: ''
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    cancel: function () {
      this.addwindow = false
      this.gen = ''
      this.name = ''
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
    addmenu: function () {
      if (this.leave) {
        this.$http.post('/api/menu?accessToken=' + this.$parent.access, {name: this.name, fatherid: this.gen}).then(res => {
          if (res.body.succeed) {
            this.successmessage('添加成功')
            this.getmenulist()
            this.cancel()
          } else {
            this.dangermessage(res.body.message)
          }
        })
      } else {
        this.$http.post('/api/menu?accessToken=' + this.$parent.access, {name: this.name, fatherid: null}).then(res => {
          if (res.body.succeed) {
            this.successmessage('添加成功')
            this.getmenulist()
            this.cancel()
          } else {
            this.dangermessage(res.body.message)
          }
        })
      }
    },
    getmenulist: function () {
      this.$http.get('/api/menu?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.menulist = res.body.value
        }
      })
    },
    change: function (row) {
      this.leave = !this.leave
    },
    deleteall: function () {
      var flag = false
      this.$refs.tree.getCheckedNodes().forEach(row => {
        this.$http.delete('/api/menu/' + row.value + '?accessToken=' + this.$parent.access).then(res => {
          if (!res.body.succeed) {
            flag = true
          }
        })
      })
      if (!flag) {
        this.successmessage('删除成功')
        this.getmenulist()
      } else {
        this.dangermessage('删除失败')
      }
    }
  },
  created: function () {
    this.$http.get('/api/menu?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.menulist = res.body.value
      }
    })
  }
}
</script>

<style scoped>
  #functionmanage{
    width: 100%;
    padding: 24px;
  }
  #functionmanage-top{
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
