<template>
  <div class="signDetail">
    <MyNav />
    <div class="box4">
      <div class="box5">
        <button
          href=""
          onclick="window.history.back(-1)"
          style="
            outline: none;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 30px;
            position: relative;
            left: 5px;
            float: left;
          "
        >
          <span style="color: red; font-size: 30px">&lt;</span>
        </button>
        <span class="title">定时签到</span>
         <button @click="gotoStatics" class="btn_Statics"
            ><img src="../assets/img/投票(1).png" style="height: 15px" />
            统计结果</button>
        <div class="notice_confirm">
          <button @click="gotoConfirm" :class='[signed==false?"btn_confirm":"btn_noConfirm"]'>{{ confirm }}</button>
        </div>
        <span
          style="float: left; clear: both; margin-left: 100px; color: slategrey"
          >{{ signDetail.publisher }}</span
        >
        <span style="float: left; margin-left: 50px; color: slategrey">{{
          signDetail.publishedTime
        }}</span>
        <span style="float: left; margin-left: 50px; color: red"
          >截止时间：</span
        >
        <span style="float: left; color: red">{{ signDetail.deadLine }}</span>
      </div>
      <div class="box6">
        <button
          type="button"
          id="signi"
          @click="gotoSign"
          :class="[signed == true ? 'btn_signed' : 'btn_unSigned']"
        >
          <span color="white" id="butto">{{
            signed == true ? "已签到" : "签到"
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../api/services/service";
import MyNav from "@/components/MyNav.vue";
export default {
  name: "SignDetail",
  components: {
    MyNav,
  },
  data() {
    return {
      signDetail: {},
      key: "",
      signed: false,
      type: "",
    };
  },
  mounted() {
    console.log(this.$route.params.signDetail);
    this.signDetail = JSON.parse(this.$route.params.signDetail);
    this.type = this.signDetail.signType;
    // console.log(this.randomStu.students);
    // console.log(this.randomStu.students.length);
    //, this.sum=this.randomStu.students.length;
  },
  methods: {
     gotoStatics() {
          let param = new FormData();
          param.append("signID",this.signDetail.signID);
      let token = sessionStorage.getItem('token');
      console.log(this.signDetail.signID);
      service.defaults.headers.common["token"] = token;
      service
        .post("/api/classes/"+this.signDetail.classID+"/getSignInDetail", param)
        .then((res) => {
          console.log(res);
          let result=res.data.data;
          this.$router.push({name:'Statics',params:{statics:JSON.stringify({
              type:'sign',data:result})}
          });
          
        
        })
        .catch((err) => console.log(err));
      },
    gotoSign() {
      let param = new FormData();
      param.append("signID", this.signDetail.signID);
      if (this.type == "normal") {
        param.append("key", 0);
      } else {
        param.append("key", this.key);
      }
      let token = sessionStorage.getItem("token");
      service.defaults.headers.common["token"] = token;
      service
        .post("/api/classes/" + this.signDetail.classID + "/signIn", param)
        .then((res) => {
          console.log(res);
          alert(res.data.msg);
          this.signed = true; //测试用
          if (res.data.status == true) {
            this.signed = true;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style src="../assets/css/style.css" scoped>
</style>
<style scoped>
.title{
    position: relative;
    margin-left: 150px;
    float:center;
}
.box6 button {
  height: 200px;
  width: 200px;
  margin-left: 20px;
  margin-top: 100px;
  border-radius: 100%;
  /* background: rgb(1, 176, 255); */
  border: none;
  font-size: 40px;
  color: rgb(233, 233, 233);
  outline: none;
  cursor: pointer;
}
.btn_unSigned {
  background: rgb(1, 176, 255);
}
.btn_signed {
  background: rgb(164, 164, 164);
}
.btn_Statics{
  margin-left:90px;
  margin-right: 10px;
  position: relative;
  float:right;
   cursor: pointer;
  border: none;
  /* display: inline-block; */
  width: 80px;
  height: 20px;
  font-size: 15px;
  /* background: rgb(1, 176, 255); */
  background: white;
}
</style>