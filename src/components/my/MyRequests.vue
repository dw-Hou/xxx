<template>
  <div id="myrequests">
    <el-card>
      <div slot="header">
        <span>我的申报</span>
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
          prop="award.name"
          align="center"
          label="获奖级别"
          width="100">
        </el-table-column>
        <el-table-column
          label="比赛级别"
          align="center"
          width="100">
          <template slot-scope="scope">
            {{getscopebyid(scope.row.event.scope)}}
          </template>
        </el-table-column>
        <el-table-column
          label="比赛时间"
          align="center"
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
              type="danger"
              @click="deletes(scope.$index, scope.row)">撤回</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="views(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="申报信息" :visible.sync="detail" width="500px" :before-close="cancel">
        <div class="dialog">
          <div class="input-group">
            <div class="right-span">
              <span>比赛名称：</span>
            </div>
            <span>{{details.name}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>主办方：</span>
            </div>
            <span>{{details.sponsor}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>比赛级别：</span>
            </div>
            <span>{{details.scope}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>比赛时间：</span>
            </div>
            <span>{{details.date}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>申报人：</span>
            </div>
            <span>{{details.poster}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>获奖情况：</span>
            </div>
            <span>{{details.award}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>评价：</span>
            </div>
            <span>{{details.comment}}</span>
          </div>
          <div class="input-group">
            <div class="right-span">
              <span>审核状态：</span>
            </div>
            <span>{{details.status}}</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MyRequests',
  data () {
    return {
      requestlist: [],
      levels: [],
      detail: false,
      details: {}
    }
  },
  methods: {
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
    deletes: function (index, row) {
      this.$confirm('是否确认撤回申报', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('http://39.106.109.8:5005/api/requests/' + row.id + '?accessToken=' + this.$parent.access).then(res => {
          if (res.body.succeed) {
            this.successmessage('撤回成功')
          } else {
            this.dangermessage(res.body.message)
          }
        })
      }).catch(() => {})
    },
    views: function (index, row) {
      this.detail = true
      this.details.name = row.event.name
      this.details.sponsor = row.event.sponsor
      this.details.award = row.award.name
      this.details.scope = this.getscopebyid(row.event.scope)
      this.details.date = this.getdate(row.event.date)
      this.details.poster = row.poster.name
      if (!row.review) {
        this.details.status = this.getstate(row.review)
        return 0
      }
      this.details.status = this.getstate(row.review)
      if (row.review.comment) {
        this.details.comment = row.review.comment
      } else {
        this.details.comment = ''
      }
    },
    cancel: function () {
      this.details = {}
      this.detail = false
    }
  },
  created: function () {
    console.log(this.$parent.userId)
    this.$http.post('http://39.106.109.8:5005/api/requests/filter?accessToken=' + this.$parent.access, {poster: this.$parent.userId}).then(res => {
      console.log(res)
      if (res.body.succeed) {
        this.requestlist = res.body.value
      }
    })
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
  #myrequests{
    padding: 24px;
    width: 100%;
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
