<template>
  <div id="index">
    <div id="index-top">
      <div class="index-block" style="background: deepskyblue">
        <h1>发起申报</h1>
      </div>
      <div class="index-block" style="background: forestgreen">
        <h1>我的申报</h1>
      </div>
      <div class="index-block" style="background: orange">
        <h1>我的信息</h1>
      </div>
    </div>
    <div id="index-bottom">
      <div style="width: 48%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最近事件</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      <div style="width: 48%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最新消息</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #index{
    padding:24px;
    width: 100%;
  }
  #index-top{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .index-block{
    width: 30%;
    height: 138px;
    position: relative;
    color: white;
    cursor: pointer;
  }
  .index-block h1{
    margin-left: 12px;
    margin-top: 20px;
  }
  #index-bottom{
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
  }
</style>
