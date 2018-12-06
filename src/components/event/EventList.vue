<template>
  <div id="eventlist">
    <el-table
      :data="eventlist"
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
        width="100">
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
      <el-table-column
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="submit(scope.$index, scope.row)">申报</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="比赛获奖申报" :visible.sync="request" :before-close="cancel">
      <div>
        <div class="shenbao">
          <div class="right-span">
            <span>比赛名称：</span>
          </div>
          <span>{{request_name}}</span>
        </div>
        <div class="shenbao">
          <div class="right-span">
            <span>主办方：</span>
          </div>
          <span>{{request_sponsor}}</span>
        </div>
        <div class="shenbao">
          <div class="right-span">
            <span>比赛级别：</span>
          </div>
          <span>{{request_level}}</span>
        </div>
        <div class="shenbao">
          <div class="right-span">
            <span>比赛时间：</span>
          </div>
          <span>{{request_date}}</span>
        </div>
        <div class="shenbao">
          <div class="right-span">
            <span>获奖级别：</span>
          </div>
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in trueawards"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitrequest">确定申报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  data () {
    return {
      eventlist: [],
      request: false,
      dialogFormVisible: false,
      value: '',
      request_name: '',
      request_level: '',
      request_date: '',
      request_pride: '',
      request_sponsor: '',
      levels: [],
      awards: [],
      trueawards: [],
      row: ''
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
  },
  methods: {
    submit: function (index, row) {
      this.request_name = row.name
      this.request_level = this.getscopebyid(row.scope)
      this.request_date = this.getdate(row.date)
      this.request_sponsor = row.sponsor
      this.row = row
      this.trueawards = []
      var i = 0
      this.awards.forEach(award => {
        row.awardsList.forEach(row => {
          if (award.id === row) {
            this.trueawards[i++] = award
            return 0
          }
        })
      })
      console.log(this.trueawards)
      this.request = true
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
    getdate: function (date) {
      if (date) {
        return date.substring(0, 10)
      }
    },
    cancel: function () {
      this.request = false
      this.value = ''
    },
    submitrequest: function () {
      if (this.value === '') {
        this.dangermessage('请选择获奖级别')
        return 0
      }
      var request = {
        event: this.row.id,
        poster: this.$parent.userId,
        award: this.value
      }
      this.$http.post('/api/requests?accessToken=' + this.$parent.access, request).then(res => {
        if (res.body.succeed) {
          this.successmessage('申报成功')
          this.cancel()
        } else {
          this.dangermessage(res.body.message)
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
  #eventlist{
    padding: 24px;
    width: 100%;
  }
  .shenbao{
    height: 30px;
    display: flex;
    align-items: center;
  }
  .right-span{
    display: flex;
    width: 80px;
    justify-content: flex-end;
    align-items: center;
  }
</style>
