<template>
  <div id="reportmanage">
    <el-card>
      <div slot="header" class="clearfix">
        <span>申报列表</span>
      </div>
      <el-table
        :data="requestlist"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="event.name"
          label="比赛名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="event.sponsor"
          align="center"
          label="主办方"
          width="200">
        </el-table-column>
        <el-table-column
          prop="poster.name"
          align="center"
          label="申报人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="award.name"
          align="center"
          label="获奖级别"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="比赛级别"
          width="100">
          <template slot-scope="scope">
            {{getscopebyid(scope.row.event.scope)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="比赛时间"
          width="100">
          <template slot-scope="scope">
            {{getdate(scope.row.event.date)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag :type="gettype(scope.row.review)">{{getstate(scope.row.review)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="check(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="申报审核" :visible.sync="checkwindow" width="500px" :before-close="cancel">
        <div class="dialog">
          <div class="input-group">
            <div class="right-span">
              <span>比赛名称：</span>
            </div>
            <span>{{checklist.name}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>主办方：</span>
            </div>
            <span>{{checklist.sponsor}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>比赛级别：</span>
            </div>
            <span>{{checklist.scope}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>比赛时间：</span>
            </div>
            <span>{{checklist.date}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>申报人：</span>
            </div>
            <span>{{checklist.poster}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>获奖情况：</span>
            </div>
            <span>{{checklist.award}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>评价：</span>
            </div>
            <el-input v-model="assess" placeholder="如果通过，可以不填评价" size="medium" style="width: 300px"></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="danger" @click="reject">驳 回</el-button>
          <el-button type="primary" @click="pass">通 过</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ReportManage',
  data () {
    return {
      requestlist: [],
      checkwindow: false,
      levels: [],
      checklist: {},
      assess: '',
      request: []
    }
  },
  methods: {
    check: function (index, row) {
      if (row.review) {
        this.dangermessage('已审核完成，请勿重复审核')
        return 0
      }
      this.checklist.name = row.event.name
      this.checklist.sponsor = row.event.sponsor
      this.checklist.scope = this.getscopebyid(row.event.scope)
      this.checklist.date = this.getdate(row.event.date)
      this.checklist.poster = row.poster.name
      this.checklist.award = row.award.name
      this.assess = ''
      this.request = row
      this.checkwindow = true
    },
    cancel: function () {
      this.checkwindow = false
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
    reject: function () {
      if (this.assess === '') {
        this.dangermessage('驳回请输入理由')
        return 0
      }
      this.$http.post('http://39.106.109.8:5005/api/requests/review?accessToken=' + this.$parent.access, {request: this.request.id, accepted: false, comment: this.assess}).then(res => {
        if (res.body.succeed) {
          this.successmessage('审批成功')
          this.getrequestlist()
          this.cancel()
        } else {
          this.dangermessage(res.body.message)
        }
      })
    },
    pass: function () {
      this.$http.post('http://39.106.109.8:5005/api/requests/review?accessToken=' + this.$parent.access, {request: this.request.id, accepted: true}).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.successmessage('审批成功')
          this.getrequestlist()
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
    },
    getstate: function (data) {
      if (!data) {
        return '审核中'
      }
      if (data.accepted) {
        return '通过'
      }
      return '已驳回'
    },
    gettype: function (data) {
      if (!data) {
        return 'info'
      }
      if (data.accepted) {
        return 'success'
      }
      return 'danger'
    },
    getrequestlist: function () {
      this.$http.get('http://39.106.109.8:5005/api/requests?accessToken=' + this.$parent.access).then(res => {
        console.log(res)
        if (res.body.succeed) {
          this.requestlist = res.body.value
        }
      })
    }
  },
  created: function () {
    this.getrequestlist()
    this.$http.get('http://39.106.109.8:5005/api/scopes?accessToken=' + this.$parent.access).then(res => {
      // console.log(res)
      if (res.body.succeed) {
        this.levels = res.body.value
      }
    })
  }
}
</script>

<style scoped>
  #reportmanage{
    width: 100%;
    padding: 24px;
  }
  .input-group{
    display: flex;
    margin-bottom: 16px;
  }
  .input-group:last-child{
    margin-bottom: 0px;
  }
  .right-span{
    display: flex;
    width: 80px;
    justify-content: flex-end;
    align-items: center;
  }
</style>
