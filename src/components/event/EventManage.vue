<template>
  <div id="eventmanage">
    <el-card>
      <div slot="header" class="clearfix">
        <span>事件列表</span>
      </div>
      <div>
        <div>
          <el-button type="success" size="mini" @click="openaddwindow">添加事件</el-button>
          <el-button type="danger" size="mini" @click="deleteall">删除事件</el-button>
        </div>
        <el-table
          :data="eventlist"
          ref="eventTable"
          stripe
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="比赛名称"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="sponsor"
            label="主办方"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            label="比赛级别"
            align="center"
            width="100">
            <template slot-scope="scop">
              {{getlevelbyid(scop.row.scope)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="requestsCount"
            label="申报人数"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            label="比赛时间"
            width="100">
            <template slot-scope="scope">
              {{getdate(scope.row.date)}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="edits(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletes(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="事件添加" :visible.sync="addwindow" width="500px" :before-close="cancel">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>比赛名称：</span>
          </div>
          <el-input v-model="newevent.name" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>主办方：</span>
          </div>
          <el-input v-model="newevent.sponsor" size="medium" style="width: 300px"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>比赛级别：</span>
          </div>
          <el-select v-model="newevent.scope" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in levels"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>比赛时间：</span>
          </div>
          <el-date-picker
            style="width: 300px"
            v-model="newevent.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>奖项选择：</span>
          </div>
          <el-select v-model="eventaward" multiple placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in awards"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addevent">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="事件编辑" :visible.sync="editwindow" width="500px" :before-close="canceledit">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>比赛名称：</span>
          </div>
          <el-input v-model="editevent.name" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>主办方：</span>
          </div>
          <el-input v-model="editevent.sponsor" size="medium" style="width: 300px"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>比赛级别：</span>
          </div>
          <el-select v-model="editevent.scope" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in levels"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>比赛时间：</span>
          </div>
          <el-date-picker
            style="width: 300px"
            v-model="editevent.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>奖项选择：</span>
          </div>
          <el-select v-model="editevent.awardsList" multiple placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in awards"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceledit">取 消</el-button>
        <el-button type="primary" @click="saveedit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EventManage',
  data () {
    return {
      eventlist: [],
      addwindow: false,
      editwindow: false,
      newevent: {
        date: '',
        name: '',
        sponsor: '',
        scope: ''
      },
      eventaward: [],
      editevent: '',
      levels: [],
      awards: [],
      editrow: ''
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    addevent: function () {
      // console.log(this.eventlevel)
      // console.log(this.eventaward)
      if (this.eventname === '') {
        this.dangermessage('比赛名称不可为空')
        return 0
      }
      if (this.eventsponsor === '') {
        this.dangermessage('主办方不可为空')
        return 0
      }
      if (this.eventlevel === '') {
        this.dangermessage('比赛级别不可为空')
        return 0
      }
      if (this.eventtime === '') {
        this.dangermessage('比赛时间不可为空')
        return 0
      }
      if (this.eventaward.length === 0) {
        this.dangermessage('奖项选择不可为空')
        return 0
      }
      this.$http.post('/api/events?accessToken=' + this.$parent.access, this.newevent).then(res => {
        if (res.body.succeed) {
          let index = res.body.value
          this.$http.post('/api/events/' + index + '/awards?accessToken=' + this.$parent.access, this.eventaward).then(res => {
            console.log(res)
            if (res.body.succeed) {
              this.successmessage('创建成功')
              this.geteventlist()
              this.cancel()
            }
          })
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
    },
    getlevelbyid: function (id) {
      let flag = ''
      this.levels.forEach(level => {
        if (level.id === id) {
          flag = level.name
          return 0
        }
      })
      return flag
    },
    getdate: function (date) {
      if (date) {
        return date.substring(0, 10)
      }
    },
    geteventlist: function () {
      this.$http.get('/api/events?detail=true&accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.eventlist = res.body.value
        }
      })
    },
    deletes: function (index, row) {
      this.$http.delete('/api/events/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
        if (res.body.succeed) {
          this.geteventlist()
          this.successmessage('删除成功')
        } else {
          this.dangermessage(res.body.message)
        }
      })
    },
    cancel: function () {
      this.newevent = {
        date: '',
        name: '',
        sponsor: '',
        scope: ''
      }
      this.eventaward = []
      this.addwindow = false
    },
    edits: function (index, row) {
      this.editwindow = true
      this.editevent = row
      this.editrow = row
      console.log(row)
    },
    canceledit: function () {
      this.editwindow = false
    },
    saveedit: function () {
      console.log(this.editevent !== this.row)
      if (this.editevent !== this.row) {
        this.$http.put('/api/events?accessToken=' + this.$parent.access).then(res => {
          console.log(res)
          if (res.body.succeed) {
            this.successmessage('修改成功')
            this.geteventlist()
          } else {
            this.dangermessage(res.body.message)
          }
        })
      }
    },
    deleteall: function () {
      let flag = false
      this.$refs.eventTable.store.states.selection.forEach(row => {
        this.$http.delete('/api/events/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
          if (!res.body.succeed) {
            this.dangermessage(res.body.message)
            flag = true
          }
        })
      })
      if (!flag) {
        this.geteventlist()
        this.successmessage('删除成功')
      }
    }
  },
  created: function () {
    this.$http.get('/api/scopes?accessToken=' + this.$parent.access).then(res => {
      // console.log(res)
      if (res.body.succeed) {
        this.levels = res.body.value
      }
    })
    this.$http.get('/api/awards?accessToken=' + this.$parent.access).then(res => {
      // console.log(res)
      if (res.body.succeed) {
        this.awards = res.body.value
      }
    })
    this.$http.get('/api/events?detail=true&accessToken=' + this.$parent.access).then(res => {
      console.log(res)
      if (res.body.succeed) {
        this.eventlist = res.body.value
      }
    })
  }
}
</script>

<style scoped>
  #eventmanage{
    width: 100%;
    padding: 24px
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
