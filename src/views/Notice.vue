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
      <a href="" class="arrow"
        ><img
          @click="C_main"
          src="../assets/img/向左箭头.png"
          style="float: left"
      /></a>
      <h2>周四一二节</h2>
      <a @click="manage" href="#" style="color: #00b2ff">管理班级</a>
      <div class="line"></div>
      <ul class="specific">
        <!-- <li v-for="(item,index) in display" :key="index">{{item.name}}</li> -->
        <li>
          <p id="tit">{{ title }}</p>
          <p style="display: inline">{{ publisher }}</p>
          <p id="date" style="display: inline">截止时间：{{ deadLine }}</p>
          <p id="arrow" style="display: inline">
            <img src="../assets/img/arrow-right-bold.png" alt="" />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import service from "../api/services/service"
// window.onload = {
//     getHandle2(){
//             // console.log("hhh")
//             // let param = new FormData()
//             // param.append('classID',this.classID)
//             // console.log(this.classID)
//             let token = this.$store.state.token
//             service.defaults.headers.common['token'] = token
//             service.get('api'+'/classes/'+"25VEO4"+'/getVotes',"25VEO4")
//             .then(res=>{
//                 console.log(res);
//                 console.log("hh")
//                 // this.display = res.data.data;
//             })
//             .catch(err=>console.log(err))
//         },
// }
export default {
  name: "Notice",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
    };
  },
  computed: {
    classID() {
      return this.$route.params.classID;
    },
    deadLine() {
      return this.$route.params.deadLine;
    },
    publisher() {
      return this.$route.params.publisher;
    },
    title() {
      return this.$route.params.title;
    },
  },

  mounted() {
    // console.log(this.classID)
    // console.log(this.deadLine)
    // console.log(this.publisher)
    // console.log(this.title)
  },

  methods: {
    C_main() {
      this.$router.push("/");
    },
    manage() {
      this.$router.push("/Management/" + this.classID);
    },
    // getHandle(){
    //     let param = new FormData()
    //     param.append('classID', this.classID)
    //     // console.log("hhh")
    //     let token = this.$store.state.token
    //     service.defaults.headers.common['token'] = token
    //     service.get('api'+'/classes/'+this.classID+'/getVotes',param)
    //     .then(res=>{
    //         console.log(res);
    //         // this.display = res.data.data;
    //         // console.log(this.display);
    //     })
    //     .catch(err=>console.log(err))
    // },
    // postHandle(){
    //     let param = new FormData()
    //     param.append('classID', this.classID)
    //     let token = this.$store.state.token
    //     // console.log(token)
    //     service.defaults.headers.common['token'] = token
    //     service.post('api'+'/classes/'+this.classID+'/join',param)
    //     .then(res => {
    //         console.log(res);
    //         confirm(res.msg);
    //     })
    //     .catch(err => console.log(err));
    // }
  },
};
</script>
<style src="@/assets/css/reset.css" scoped></style>
<style src="@/assets/css/nav.css" scoped></style>
<style src="@/assets/css/create.css" scoped></style>
<style lang="scss" scoped>
// @import url("../assets/css/reset.css");
// @import url("../assets/css/nav.css");
// @import url("../assets/css/create.css");
.process {
  position: relative;
}
.process h2 {
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}
.process a {
  display: inline-block;
  position: absolute;
  top: 30px;
  right: 20px;
}
.process .arrow {
  display: block;
  top: -5px;
  left: 0;
}
.specific li {
  height: 100px;
  font-size: 28px;
  border: 2px solid #cecece;
  border-top: none;
  text-align: left;
  padding-left: 20px;
}
.specific li #tit {
  font-weight: bold;
  font-size: 30px;
  // padding-top: 10px;
}
.specific li #arrow {
  margin-left: 150px;
  // margin-top: -20px;
}
.specific li #date {
  margin-left: 30px;
}
</style>
