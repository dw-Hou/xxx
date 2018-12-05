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
        prop="level"
        label="比赛级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="主办方"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="比赛时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="submit(scope.$index, scope.row)">申报</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="比赛获奖申报" :visible.sync="dialogFormVisible">
      <div>
        <div class="shenbao">
          <span>比赛名称：</span><span>{{request_name}}</span>
        </div>
        <div class="shenbao">
          <span>比赛级别：</span><span>{{request_level}}</span>
        </div>
        <div class="shenbao">
          <span>比赛时间：</span><span>{{request_time}}</span>
        </div>
        <div class="shenbao">
          <span>比赛获奖：</span>
          <el-select v-model="value" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定申报</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EventList',
  data () {
    return {
      eventlist: [
        {
          name: '蓝桥杯',
          level: '校级',
          time: '1月1日'
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      request_name: '',
      request_level: '',
      request_time: '',
      request_pride: ''
    }
  },
  created: function () {
    console.log('1')
  },
  methods: {
    submit: function (index, row) {
      console.log(index)
      this.request_name = row.name
      this.request_level = row.level
      this.request_time = row.time
      this.dialogFormVisible = true
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
  }
</style>
