<template>
  <div id="reportmanage">
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
        prop="num"
        label="主办方"
        width="180">
      </el-table-column>
      <el-table-column
        prop="request_name"
        label="申报人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pride_level"
        label="获奖级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="比赛级别"
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
            @click="submit(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ReportManage',
  data () {
    return {
      eventlist: [
        {
          name: '蓝桥杯',
          level: '校级',
          time: '1月1日',
          request_name: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
  #reportmanage{
    width: 100%;
    padding: 24px;
  }
</style>
