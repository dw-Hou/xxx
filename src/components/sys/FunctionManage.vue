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
      <el-table
        ref="multipleTable"
        :data="abilitylist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="功能"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editability(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="功能添加" :visible.sync="addwindow" width="500px">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>功能名称：</span>
          </div>
          <el-input v-model="newability.name" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>Token：</span>
          </div>
          <el-input v-model="newability.name" size="medium" style="width: 300px;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addability">确 定</el-button>
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
      }
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    cancel: function () {
      this.addwindow = false
      this.newability = {
        name: ''
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
    addability: function () {
      // if (this.newability.name == '') {
      //   this.dangermessage('功能名不能为空')
      //   return 0
      // }
      this.$http.post('/api/abilities?accessToken=' + this.$parent.access, this.newability).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.successmessage('添加成功')
          this.getabilitylist()
          this.cancel()
        }
      })
    },
    getabilitylist: function () {
      this.$http.get('/api/menu?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.abilitylist = res.body.value
        }
      })
    }
  },
  created: function () {
    this.$http.get('/api/menu?accessToken=' + this.$parent.access).then(res => {
      console.log(res)
      if (res.body.succeed) {
        this.abilitylist = res.body.value
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
