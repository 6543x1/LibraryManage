/* eslint-disable */ 
<template>
  <div class="myNotification">
    <MyNav></MyNav>
    <div id="layout">
      <nav>
        <input
          type="button"
          value="尚未完成"
          v-on:click="GetUnfinished"
          id="button-nav"
        />
        <br />
        <input
          type="button"
          value="公告"
          v-on:click="GetAnnouncement"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="投票"
          v-on:click="GetVotes"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="签到"
          v-on:click="GetSignIn"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="抽签"
          v-on:click="getRandom"
          id="button-nav"
        />
        <br><br>
      </nav>

      <div id="section" v-if="flag!=0">
        <table>
          <tr>
            <td id="button-notice">
              <input type="button" value="我收到的" id="recenotice" />
            </td>
            <td id="button-notice">
              <input type="button" value="我发起的" id="sendnotice" />
            </td>
          </tr>
        </table>
        
      <ul class="content" id="list">
      <li @click="gotoDetail(item)"
        v-for="(item, index) in display.slice( (curPage - 1) * pageSize,
          curPage * pageSize)"
        :key="index"
      >
        <span class="unfinished">{{item.finished}}</span>{{item.multi}}{{ item.title }}
        <br>
       {{item.className}}&nbsp;截止时间:{{item.deadLine}}
      </li>
    </ul>
    <div id="pageControl">
      <input
        type="button"
        class="btn_PageControl"
        v-show="curPage > 1"
        @click="curPage--"
        value="&laquo;"
      />
      <span>当前第{{ curPage }}页</span>/<span>总共{{ pageSum }}页</span>
      <input
        type="button"
        class="btn_PageControl"
        v-show="curPage < pageSum"
        @click="curPage++"
        value="&raquo;"
      />
    </div>
     
      </div>
      <div class="content2" v-if="flag==0">
        <li >你有{{unfinished[0]}}篇公告未读</li>
       <li >你有{{unfinished[1]}}个投票未投</li>
        <li >你有{{unfinished[2]}}个签到未签到</li>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../api/services/service';
import MyNav from "@/components/MyNav.vue";
export default {
  components:{
    MyNav
  },
  name: "MyNotification",
  data() {
    return {
      classID: "",
      classIDs:[],
      display:[],
      unfinished:[0,0,0],
      token: "",
      deadline: '',
      publisher: '',
      title: '',
      vid: "",
      pageSum:0,
      pageSize:5,
      curPage:1,
      flag:0,
      preDisplay:['(公告)','（投票）','(签到)','(抽签)']
    };
  },
  computed: {

    // classIDs: [],
  },

  mounted() {
    this.token=sessionStorage.getItem('token');
    this.ReceiveClassID();
  },

  methods: {
    
    gotoDetail(item){
        if(typeof(item.body)!='undefined'){
          // params传递需要指定name
          console.log('item',item);
        this.$router.push({name:'NoticeDetail',
        params:{
            notice:JSON.stringify(item),
        }})
        }
        else if(typeof(item.selections)!='undefined'){
          this.$router.push({name:'VoteDetail',
        params:{
            vote:JSON.stringify(item),
        }})}
        else if(typeof(item.signID)!='undefined'){
          this.$router.push({name:'SignDetail',params:{signDetail:JSON.stringify(item)}});
        }
        
    },
    getRandom(){//直接跳转到详情页，不墨迹了
      console.log('Random...');
        console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
      if(sessionStorage.getItem("role")=="teacher"){
            this.classID='CIRD9F';
      }
      let url="api/classes/"+this.classID+"/RandomStu";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      // this.addURLParam(url, "classID", this.classID);
      xhr.setRequestHeader("token", this.token);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log("RandomStu",myJson);
              // 添加className属性
            myJson.data.className=this.classIDs[0].name;
            // myJson.data[i].
            this.$router.push({name:'RandomDetail',params:{randomStu:JSON.stringify(myJson.data)}});
            // this.display=myJson.data;
            // console.log(typeof(this.display));
            // console.log(this.display);
            // this.pageSum=Math.ceil(this.display.length/this.pageSize);
            this.flag=4;

          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },
    //获取投票
    GetVotes() {
      console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
   if(sessionStorage.getItem("role")=="teacher"){
            this.classID='CIRD9F';
      }
      let url="api/classes/"+this.classID+"/getVotes";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      // this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            var myJson = JSON.parse(xhr.responseText);
            console.log(myJson);
            this.display=myJson;
             for(var i=0; i<this.display.length;i++){ // 添加className属性
              this.display[i].className=this.classIDs[0].name;
              this.display[i].multi=this.display[i].limitation==1?'(单选)':'(多选)';
              if(this.display[i].voted==false){
                this.display[i].finished='(未投票)';
              }
            // myJson.data[i].
        }
            console.log(typeof(this.display));
            console.log(this.display);
            this.pageSum=Math.ceil(this.display.length/this.pageSize);
            this.flag=2;
            // this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取公告
    GetAnnouncement() {
      // let url = "api/classes/{classID}/notice";
      // 需要写循环来获取全部班级的信息，同时item里要加入...额那个班级名字
      // 使用unshift在末尾添加
      console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
     if(sessionStorage.getItem("role")=="teacher"){
       console.log(sessionStorage.getItem("role"));
            this.classID='CIRD9F';
      }
      let url="api/classes/"+this.classID+"/notice";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
     
      // this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
            var myJson = JSON.parse(xhr.responseText);
            console.log("noticeRes",myJson);
           
            
        for(var i=0; i<myJson.data.length;i++){ // 添加className属性
            myJson.data[i].className=this.classIDs[0].name;
            // myJson.data[i].
        }
            this.display=myJson.data;
            console.log(typeof(this.display));
            console.log(this.display);
            this.pageSum=Math.ceil(this.display.length/this.pageSize);
            // this.deadline = myJson.data[0].deadline;
            // this.publisher = myJson.data[0].publisher;
            // this.title = myJson.data[0].title;
            // this.vid = myJson.data[0].vid;
            this.ModifyDeadline();
            this.flag=1;
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取签到
    GetSignIn() {
        console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
      if(sessionStorage.getItem("role")=="teacher"){
            this.classIDs=[{classID:'CIRD9F',name:'测试用班级'}];
          }
      let url="api/classes/"+this.classID+"/signIn";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      // this.addURLParam(url, "classID", this.classID);
      xhr.setRequestHeader("token", this.token);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log("SignInRes",myJson);
              for(var i=0; i<myJson.length;i++){ // 添加className属性
            myJson[i].className=this.classIDs[0].name;
            // myJson.data[i].
        }
            this.display=myJson;
            console.log(typeof(this.display));
            console.log(this.display);
            this.pageSum=Math.ceil(this.display.length/this.pageSize);
            this.flag=3;

          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //请求所有的班级信息
    ReceiveClassID() {
      let url = "api/classes/getMyClass";
      let xhr = new XMLHttpRequest();
      if(sessionStorage.getItem("role")=="teacher"){
            this.classID='CIRD9F';
            this.classIDs=[{classID:'CIRD9F',name:'测试用班级'}];
            console.log("done")
            return;
      }
      service.defaults.headers.common["token"] = sessionStorage.getItem('token');
      // service
      //   .get("api" + "/classes/getMyClass", {})
      //   .then((res) => {
      //     console.log(res);
      //     this.classIDs = res.data.data;
      //     this.classID = res.data.data[0].classID;
      //     // this.pageSum= res.data.data.mapList.length/this.pageSize;
      //     console.log(
      //       "@@classIDs is",this.classIDs); 
      //     // console.log(res.data.data[0].classID)
      //   })
      //   .catch((err) => console.log(err));
      xhr.open("get", url, true);
      this.token=sessionStorage.getItem('token');
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      // 友情提示！箭头函数的内部的this作用域为当前vue实例
      // 而function()通常为window
      xhr.onreadystatechange =  ()=> { 
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log(myJson);
            // this.classID = myJson.data.classID;
            this.classIDs=myJson.data;
            console.log("myJson.data.data:",myJson.data);
            console.log("@@",this.classIDs);
            console.log("@@@",this.classIDs[0].classID);
            // sessionStorage.setItem("classID",this.classID);
          } else{
            console.log("...")
          };
          }
          if(sessionStorage.getItem("role")=="teacher"){
            this.classIDs=[{classID:'CIRD9F',name:'测试用班级'}];
          }
        }
      
    },

    //获取还未完成的所有活动
    GetUnfinished() {
       console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
      let url = "api/classes/"+this.classID+"/unconfirmed";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            // alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log("myJson",myJson);
            this.display=myJson.data.notice;
            this.display.push(myJson.data.vote);
            this.display.push(myJson.data.signIn);
            console.log(typeof(this.display));
            console.log(this.display);
            this.pageSum=Math.ceil(this.display.length/this.pageSize);
            this.unfinished=[myJson.data.notice.length,myJson.data.vote.length,myJson.data.signIn.length];
            console.log("unfinished",this.unfinished);
            // this.deadline = myJson.data[0].deadline;
            // this.publisher = myJson.data[0].publisher;
            // this.title = myJson.data[0].title;
            // this.vid = myJson.data[0].vid;
            this.ModifyDeadline();
            this.flag=0;
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //格式化截止时间
    ModifyDeadline() {
      // let l = this.deadline.length;
      // for (let i = 0; i < l; i++)
      //   this.deadline[i] = "截止时间：" + this.deadline[i];
    },

    //添加信息
    addURLParam(url, name, value) {
      url += url.indexOf("?") == -1 ? "?" : "&";
      url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
      return url;
    },
  },
};
</script>

<style scoped>
/* // vue中直接import 是不受scoped影响的！所以会污染全局
// @import url("../assets/css/通知.css");
// @import url("../assets/css/版头.css"); */
.content{
    height: 300px;
}
.content li{
    height: 50px;
    width: 80%;
    font-size:  15px;
    color: #3393FC;
    /* border-top: 1px solid #000; */
    border: 1px solid #000;
    /* margin: -1px; */
    margin: 10px auto;
    list-style-type: none;
}
.content2 li{
  height: 50px;
    width: 50%;
    font-size: 15px;
    color: #3393FC;
    /* border-top: 1px solid #000; */
    border: 1px solid #000;
    /* margin: -1px; */
    margin: 10px auto;
    list-style-type: none;
} 
#pageControl{
  margin-left:50px;
}
.btn_PageControl {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  width: 60px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  background: rgb(241, 241, 241);
  border: none;
}
.btn_PageControl:hover {
  background: rgb(221, 221, 221);
}
.unfinished{
  color:red;
}
  
</style>
<style src="@/assets/css/通知.css"  scoped>
    </style>
<style src="@/assets/css/版头.css" scoped></style>