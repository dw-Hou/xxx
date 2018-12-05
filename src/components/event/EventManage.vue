<template>
  <div id="eventmanage">
    <el-card>
      <div slot="header" class="clearfix">
        <span>事件列表</span>
      </div>
      <div>
        <div>
          <el-button type="success" size="mini" @click="openaddwindow">添加事件</el-button>
          <el-button type="danger" size="mini">删除事件</el-button>
        </div>
        <el-table
          :data="eventlist"
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
            prop="num"
            label="主办方"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="level"
            label="比赛级别"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="num"
            label="申报人数"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="发起人"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="比赛时间"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="submit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="事件添加" :visible.sync="addwindow" width="500px">
      <div class="dialog">
        <div class="input-group">
          <div class="right-span">
            <span>比赛名称：</span>
          </div>
          <el-input v-model="eventname" size="medium" style="width: 300px;"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>主办方：</span>
          </div>
          <el-input v-model="eventsponsor" size="medium" style="width: 300px"></el-input>
        </div>
        <div class="input-group">
          <div class="right-span">
            <span>比赛级别：</span>
          </div>
          <el-select v-model="eventlevel" placeholder="请选择" style="width: 300px">
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
          <el-input v-model="eventtime" size="medium" style="width: 300px"></el-input>
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
        <el-button >取 消</el-button>
        <el-button type="primary" @click="addevent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EventManage',
  data () {
    return {
      eventlist: [
        {
          name: 'xxx',
          time: '1月1日',
          level: 'xxx'
        }
      ],
      addwindow: false,
      eventtime: '',
      eventname: '',
      eventsponsor: '',
      eventlevel: '',
      eventaward: '',
      levels: [],
      awards: []
    }
  },
  methods: {
    openaddwindow: function () {
      this.addwindow = true
    },
    addevent: function () {
      console.log(this.eventlevel)
      console.log(this.eventaward)
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
      if (this.eventaward === '') {
        this.dangermessage('奖项选择不可为空')
        return 0
      }
    },
    dangermessage: function (mess) {
      this.$message({
        message: mess,
        type: 'error',
        showClose: true
      })
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
