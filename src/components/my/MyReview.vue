<template>
  <div id="myreview">
    <el-card>
      <div slot="header" class="clearfix">
        <span>事件列表</span>
      </div>
      <div>
        <div>
          <el-button type="success" size="mini">添加事件</el-button>
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
            prop="name"
            label="主办方"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="level"
            label="比赛级别"
            width="180">
          </el-table-column>
          <el-table-column
            prop="num"
            label="申报人数"
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
  </div>
</template>

<script>
export default {
  name: 'MyReview',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  #myreview{
    width: 100%;
    padding:24px
  }
</style>
