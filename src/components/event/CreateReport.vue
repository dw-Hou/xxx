<template>
  <div id="createreport">
    <el-steps direction="vertical" :active="active" finish-status="success" style="width: 100px">
      <el-step title="步骤 1" description="选择事件"></el-step>
      <el-step title="步骤 2" description="选择报表列"></el-step>
      <el-step title="步骤 3" description="生成并下载报表"></el-step>
    </el-steps>
    <div style="height: 100%;width: calc(100% - 120px);margin-left: 20px">
      <div class="contentblock" v-show="step1">
        <el-button type="primary" size="small" @click="eventchoose">选择事件</el-button>
        <el-card class="card">
          <div slot="header">
            <span>已选事件</span>
          </div>
          <el-table
            :data="choseneventlist"
            stripe
            style="width: 100%">
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
              align="center"
              label="主办方"
              width="200">
            </el-table-column>
            <el-table-column
              align="center"
              label="比赛级别"
              width="100">
              <template slot-scope="scope">
                {{getscopebyid(scope.row.scope)}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="比赛时间"
              width="100">
              <template slot-scope="scope">
                {{getdate(scope.row.date)}}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="contentblock" v-show="step2">
        <el-button type="primary" size="small" @click="columnchoose">选择报表项</el-button>
        <el-card class="card">
          <div slot="header">
            <span>已选报表项</span>
          </div>
          <el-table
            :data="chosencolumnlist"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="报表项名称">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="contentblock" v-show="step3" style="display: flex;justify-content: space-between;padding-bottom: 28px;">
        <el-card class="fin">
          <div slot="header">
            <span>已选事件</span>
          </div>
          <el-table
            :data="choseneventlist"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="比赛名称"
              align="center"
              min-width="180">
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="fin">
          <div slot="header">
            <span>已选报表项</span>
          </div>
          <el-table
            :data="chosencolumnlist"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="报表项名称">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div>
        <el-button type="primary" size="small" @click="pre" v-show="preflag">上一步</el-button>
        <el-button type="primary" size="small" @click="next" v-show="nextflag">下一步</el-button>
        <el-button type="success" size="small" @click="finish" v-show="finishflag">生成并下载报表</el-button>
      </div>
    </div>
    <el-dialog title="事件选择" :visible.sync="event" :before-close="eventcancel">
      <el-table
        :data="eventlist"
        ref="eventTable"
        stripe
        style="width: 100%">
        <el-table-column
          type="selection">
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
          align="center"
          label="主办方"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="比赛级别"
          width="100">
          <template slot-scope="scope">
            {{getscopebyid(scope.row.scope)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="比赛时间"
          width="100">
          <template slot-scope="scope">
            {{getdate(scope.row.date)}}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eventcancel" size="small">取 消</el-button>
        <el-button type="primary" @click="chooseevent" size="small">选 择</el-button>
      </div>
    </el-dialog>
    <el-dialog title="列表项选择" :visible.sync="column" :before-close="columncancel">
      <el-table
        :data="columnlist"
        ref="columnTable"
        stripe
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="报表项名称">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="columncancel" size="small">取 消</el-button>
        <el-button type="primary" @click="choosecolumn" size="small">选 择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateReport',
  data () {
    return {
      active: 0,
      preflag: false,
      nextflag: true,
      choseneventlist: [],
      eventlist: [],
      columnlist: [],
      chosencolumnlist: [],
      event: false,
      levels: [],
      step1: true,
      step2: false,
      step3: false,
      column: false,
      finishflag: false
    }
  },
  methods: {
    next: function () {
      if (this.active === 0 && this.choseneventlist.length === 0) {
        this.dangermessage('请选择事件')
        return 0
      }
      if (this.active === 1 && this.chosencolumnlist.length === 0) {
        this.dangermessage('请选择报表项')
        return 0
      }
      if (this.active < 2) {
        this.active++
      }
      if (this.active === 2) {
        this.nextflag = false
        this.finishflag = true
      }
      this.preflag = true
      this.changestep()
    },
    pre: function () {
      if (this.active > 0) {
        this.active--
      }
      if (this.active === 0) {
        this.preflag = false
      }
      this.finishflag = false
      this.nextflag = true
      this.changestep()
    },
    changestep: function () {
      this.step1 = false
      this.step2 = false
      this.step3 = false
      switch (this.active) {
        case 0: { this.step1 = true; break }
        case 1: { this.step2 = true; break }
        case 2: { this.step3 = true; break }
      }
    },
    getscopebyid: function (id) {
      let flag = ''
      this.levels.forEach(level => {
        if (level.id === id) {
          flag = level.name
          return 0
        }
      })
      return flag
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
    getdate: function (date) {
      if (date) {
        return date.substring(0, 10)
      }
    },
    eventcancel: function () {
      this.event = false
    },
    eventchoose: function () {
      this.event = true
    },
    chooseevent: function () {
      let i = 0
      this.choseneventlist = []
      this.$refs.eventTable.store.states.selection.forEach(row => {
        this.choseneventlist[i++] = row
      })
      this.eventcancel()
    },
    columnchoose: function () {
      this.column = true
    },
    columncancel: function () {
      this.column = false
    },
    choosecolumn: function () {
      let i = 0
      this.chosencolumnlist = []
      this.$refs.columnTable.store.states.selection.forEach(row => {
        this.chosencolumnlist[i++] = row
      })
      this.columncancel()
    },
    finish: function () {
      this.$http.post('http://39.106.109.8:5005/api/reports?accessToken=' + this.$parent.access, {name: Math.random().toString(36).substring(2)}).then(res => {
        var ids
        console.log(res)
        if (res.body.succeed) {
          ids = res.body.value
          var a = []
          var i = 0
          this.choseneventlist.forEach(event => {
            a[i++] = event.id
          })
          this.$http.post('http://39.106.109.8:5005/api/reports/' + ids + '/events?accessToken=' + this.$parent.access, a).then(res => {
            if (res.body.succeed) {
              var b = []
              var i = 0
              this.chosencolumnlist.forEach(column => {
                b[i++] = column.id
              })
              this.$http.post('http://39.106.109.8:5005/api/reports/' + ids + '/columns?accessToken=' + this.$parent.access, b).then(res => {
                if (res.body.succeed) {
                  let url = 'http://39.106.109.8:5005/api/reports/' + ids + '/file?accessToken=' + this.$parent.access
                  window.open(url)
                } else {
                  this.dangermessage('创建失败')
                }
              })
            } else {
              this.dangermessage('创建失败')
            }
          })
        } else {
          this.dangermessage('创建失败')
        }
      })
    }
  },
  created: function () {
    this.$http.get('http://39.106.109.8:5005/api/events?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.eventlist = res.body.value
        console.log(this.eventlist)
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/scopes?accessToken=' + this.$parent.access).then(res => {
      if (res.body.succeed) {
        this.levels = res.body.value
      }
    })
    this.$http.get('http://39.106.109.8:5005/api/reports/columns?accessToken=' + this.$parent.access).then(res => {
      console.log(res)
      if (res.body.succeed) {
        this.columnlist = res.body.value
      }
    })
  }
}
</script>

<style scoped>
  #createreport{
    padding: 24px;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .contentblock{
    /*width: calc(100% - 100px);*/
    height: calc(100% - 50px);
  }
  .card{
    width: 100%;
    height: calc(100% - 80px);
    margin-top: 20px;
  }
  .fin{
    width: 49%;
  }
</style>
