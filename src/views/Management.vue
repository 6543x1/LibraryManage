<template>
  <div>
    <div class="nav">
      <ul class="select">
        <li>
          <a href="javascript:;">{{ className }}</a>
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/通知(3).png" alt="" />{{ notice }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/发布.png" alt="" />{{ release }}</a
          >
        </li>
        <li>
          <a href="" @click="C_main"
            ><img src="../assets/img/班级.png" alt="" />{{ class_ }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/头像.png" alt="" />{{ my }}</a
          >
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="process">
      <a class="arrow"
        ><img
          @click="C_main"
          src="../assets/img/向左箭头.png"
          style="float: left"
      /></a>
      <div class="t1">班级管理</div>
      <div class="line"></div>
      <ul class="items">
        <li>班级邀请码：{{ classID }}</li>
        <li @click="list()">
          <a href="javascript:;" style="color: #00b0ff">班级名单</a>
        </li>
        <li @click="active()">
          <a href="javascript:;" style="color: #00b0ff">活跃度查看</a>
        </li>
        <li>
          <p style="display: inline; font-size: 18px">进群审核</p>
          <br />
          <div class="testswitch">
            <input
              class="testswitch-checkbox"
              id="onoffswitch"
              type="checkbox"
            />
            <label class="testswitch-label" for="onoffswitch">
              <span class="testswitch-inner"></span>
              <span class="testswitch-switch"></span>
            </label>
          </div>
        </li>
        <br /><br />
        <!-- <li><a href="javascript:;" style="color: #00B0FF;">删除所有通知</a></li> -->
        <li @click="pop()">
          <a href="javascript:;" style="color: #ff0303">退出并解散班级</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import service from '../api/services/service';
// import {useRouter} from 'vue-router';
// const router = useRouter();
export default {
  name: "Create",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
      display: [],
    };
  },
  computed: {
    classID() {
      return this.$route.params.classID;
    },
  },
  mounted() {
    // console.log(this.classID)
  },

  methods: {
    C_main() {
      this.$router.push("/");
    },
    list() {
      this.$router.push("/List/" + this.classID);
    },
    active() {
      this.$router.push("/Active/" + this.classID);
    },
    pop() {
      alert("删除班级成功");
    },
    // getHandle(){
    //     // console.log("hhh")
    //     let param = new FormData()
    //     param.append('classID', this.classID)
    //     let token = this.$store.state.token
    //     service.defaults.headers.common['token'] = token
    //     service.get('/api'+'/classes/'+this.classID+'/getStuList',param)
    //     .then(res=>{
    //         console.log(res);
    //         this.display = res.data
    //         // router.push({path: '/List', query: {name: this.dispaly}});
    //         // console.log(this.display)
    //         this.list()
    //     })
    //     .catch(err=>console.log(err))
    // },
    // postHandle(){
    //     let param = new FormData()
    //     param.append('classID', this.classID)
    //     let token = this.$store.state.token
    //     // console.log(token)
    //     service.defaults.headers.common['token'] = token
    //     service.post('/api'+'/classes/'+this.classID+'/deleteClass',param)
    //     .then(res => {
    //         console.log(res);
    //         // confirm(res.msg);
    //     })
    //     .catch(err => console.log(err));
    // }
  },
};
</script>
<style src="@/assets/css/reset.css" scoped></style>
<style src="@/assets/css/nav.css" scoped></style>
<style src="@/assets/css/create.css" scoped></style>
<style src="@/assets/css/management.css" scoped></style>
<style lang="scss" scoped>
</style>
