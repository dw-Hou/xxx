<template>
  <div id="labmanage">
    <div id="dictionary">
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span>实验室字典</span>
        </div>
        <div class="button-group">
          <el-button type="success" size="small" @click="addLab(0)">添加字典</el-button>
          <el-button type="danger" size="small" @click="deleteall(0)">删除字典</el-button>
        </div>
        <el-table
          ref="table1"
          :data="lablist"
          tooltip-effect="dark">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="字典名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="edits(scope.$index, scope.row, 0)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row, 0)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span>学院字典</span>
        </div>
        <div class="button-group">
          <el-button type="success" size="small" @click="addLab(1)">添加字典</el-button>
          <el-button type="danger" size="small" @click="deleteall(0)">删除字典</el-button>
        </div>
        <el-table
          ref="table2"
          :data="collegelist"
          tooltip-effect="dark">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="字典名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="edits(scope.$index, scope.row, 1)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span>专业字典</span>
        </div>
        <div class="button-group">
          <el-button type="success" size="small" @click="addLab(2)">添加字典</el-button>
          <el-button type="danger" size="small" @click="deleteall(0)">删除字典</el-button>
        </div>
        <el-table
          ref="table3"
          :data="rolelist"
          tooltip-effect="dark">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="字典名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="editspecialty(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletespecialty(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span>获奖字典</span>
        </div>
        <div class="button-group">
          <el-button type="success" size="small" @click="addLab(3)">添加字典</el-button>
          <el-button type="danger" size="small" @click="deleteall(0)">删除字典</el-button>
        </div>
        <el-table
          ref="table4"
          :data="awards"
          tooltip-effect="dark">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="字典名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="edits(scope.$index, scope.row, 3)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row, 3)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="card">
        <div slot="header" class="clearfix">
          <span>事件字典</span>
        </div>
        <div class="button-group">
          <el-button type="success" size="small" @click="addLab(4)">添加字典</el-button>
          <el-button type="danger" size="small" @click="deleteall(0)">删除字典</el-button>
        </div>
        <el-table
          ref="table5"
          :data="eventlist"
          tooltip-effect="dark">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="字典名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="edits(scope.$index, scope.row, 4)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row, 4)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="字典添加" :visible.sync="add" width="500px" :before-close="cancel">
      <div class="dialog">
        <div class="input-group">
          <span>类型：</span>
          <el-input v-model="keytype" size="medium" disabled style="width: 300px;margin-bottom: 24px"></el-input>
        </div>
        <div class="input-group">
          <span>键值：</span>
          <el-input v-model="keyvalue" size="medium" style="width: 300px"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="字典编辑" :visible.sync="editflag" width="500px">
      <div class="dialog">
        <div class="input-group">
          <span>类型：</span>
          <el-input v-model="edittype" size="medium" disabled style="width: 300px;margin-bottom: 24px"></el-input>
        </div>
        <div class="input-group">
          <span>键值：</span>
          <el-input v-model="editvalue" size="medium" style="width: 300px"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancel">取 消</el-button>
        <el-button type="primary" @click="editsave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LabManage',
  data () {
    return {
      rolelist: [],
      add: false,
      dictionary: ['实验室', '学院', '专业', '获奖', '事件'],
      dictionaryurl: ['labs', 'colleges', 'specialty', 'awards', 'scopes'],
      keytype: '',
      keyvalue: '',
      chosen: 0,
      lablist: [],
      collegelist: [],
      awards: [],
      eventlist: [],
      editflag: false,
      edittype: '',
      editvalue: '',
      editid: 0,
      deletelist: []
    }
  },
  methods: {
    addLab: function (index) {
      this.keytype = this.dictionary[index]
      this.chosen = index
      this.add = true
    },
    cancel: function () {
      this.keyvalue = ''
      this.add = false
    },
    editcancel: function () {
      this.editflag = false
    },
    save: function () {
      let url = this.dictionaryurl[this.chosen]
      this.$http.post('/api/' + url + '?accessToken=' + this.$parent.access, {name: this.keyvalue}).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.$message({
            message: '创建成功',
            type: 'success',
            showClose: true
          })
          this.keyvalue = ''
          this.add = false
          switch (this.chosen) {
            case 0: { this.getlab(); break }
            case 1: { this.getcollege(); break }
            case 2: { this.getspecialty(); break }
            case 3: { this.getaward(); break }
            case 4: { this.getevent(); break }
          }
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
          this.keyvalue = ''
          this.add = false
        }
      })
    },
    editsave: function () {
      let url = this.dictionaryurl[this.chosen]
      this.$http.put('/api/' + url + '?accessToken=' + this.$parent.access, {id: this.editid, name: this.editvalue}).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true
          })
          this.keyvalue = ''
          this.add = false
          switch (this.chosen) {
            case 0: { this.getlab(); break }
            case 1: { this.getcollege(); break }
            case 2: { this.getspecialty(); break }
            case 3: { this.getaward(); break }
            case 4: { this.getevent(); break }
          }
          this.editflag = false
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
          this.keyvalue = ''
          this.add = false
        }
      })
    },
    getlab: function () {
      this.$http.get('/api/labs?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
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
    },
    getcollege: function () {
      this.$http.get('/api/colleges?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.collegelist = res.body.value
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
        }
      })
    },
    getaward: function () {
      this.$http.get('/api/awards?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.awards = res.body.value
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
        }
      })
    },
    getevent: function () {
      this.$http.get('/api/scopes?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.eventlist = res.body.value
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
        }
      })
    },
    deletes: function (index, row, num) {
      this.$http.delete('/api/' + this.dictionaryurl[num] + '/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.$message({
            message: '删除成功',
            type: 'success',
            showClose: true
          })
          switch (num) {
            case 0: { this.getlab(); break }
            case 1: { this.getcollege(); break }
            case 2: { this.getspecialty(); break }
            case 3: { this.getaward(); break }
            case 4: { this.getevent(); break }
          }
        } else {
          this.$message({
            message: res.body.message,
            type: 'danger',
            showClose: true
          })
        }
      })
    },
    edits: function (index, row, num) {
      this.editflag = true
      this.editvalue = row.name
      this.edittype = this.dictionary[num]
      this.editid = row.id
      this.chosen = num
    },
    deleteall: function (num) {
      switch (num) {
        case 0: { this.deletelist = this.$refs.table1.store.states.selection; break }
        case 1: { this.deletelist = this.$refs.table2.store.states.selection; break }
        case 2: { this.deletelist = this.$refs.table3.store.states.selection; break }
        case 3: { this.deletelist = this.$refs.table4.store.states.selection; break }
        case 4: { this.deletelist = this.$refs.table5.store.states.selection; break }
      }
      this.deletechosen(num)
    },
    deletechosen: function (num) {
      var flags = false
      this.deletelist.forEach(row => {
        this.$http.delete('/api/' + this.dictionaryurl[num] + '/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
          if (!res.body.succeed) {
            flags = true
          }
        })
      })
      if (flags) {
        this.$message({
          message: '发生错误',
          type: 'danger',
          showClose: true
        })
      } else {
        switch (num) {
          case 0: { this.getlab(); break }
          case 1: { this.getcollege(); break }
          case 2: { this.getspecialty(); break }
          case 3: { this.getaward(); break }
          case 4: { this.getevent(); break }
        }
      }
    }
  },
  mounted: function () {
    this.getlab()
    this.getcollege()
    this.getaward()
    this.getevent()
  }
}
</script>

<style scoped>
  #labmanage{
    padding: 24px;
    width: 100%;
  }
  #dictionary{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .card{
    width: 49%;
    margin-bottom: 12px;
  }
  .input-group{
    /*margin-bottom: 24px;*/
  }
  .dialog{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
