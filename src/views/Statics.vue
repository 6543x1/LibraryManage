<template>
  <div class="statics">
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
        <span class="title" style="font-size: 30px">统计结果</span>
        <div class="pieChart">
          <div id="chartPie" class="pie-wrap"></div>
          <div id="chartPie2" class="pie-wrap"></div>
        </div>

        <div class="unconfirmed" v-if="unconfirmed.length != 0">
          {{ bottomLabel[1] }}的名单：
          <ul class="statics_ul">
            <li
              class="statics_li"
              v-for="(item, index) in unconfirmed"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
          <button class="btn_urge" onclick="alert('成功')">一键催促</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import * as echarts from "echarts";
require("echarts/theme/macarons");
export default {
  name: "Statics",
  components: {
    MyNav,
  },
  data() {
    return {
      chartPie: null,
      bottomLabel: ["已参与", "未参与"],
      pieData: [
        { value: 335, name: "已参与" },
        { value: 200, name: "未参与" },
      ],
      unconfirmed: [],
      confirmed: [],
      selections: [],
    };
  },
  mounted() {
    let myData = JSON.parse(this.$route.params.statics);
    console.log("statics", myData);
    if (myData.type == "notice") {
      // this.$set(this.pieData,0,{value:myData.data.confirmed.length,name:'已确认'});
      // this.$set(this.pieData,1,{value:myData.data.unconfirmed.length,name:'未确认'});
      this.pieData = [
        { value: myData.data.confirmed.length, name: "已确认" },
        { value: myData.data.unconfirmed.length, name: "未确认" },
      ];
      this.bottomLabel = ["已确认", "未确认"];
      this.unconfirmed = myData.data.unconfirmed;
      this.confirmed = myData.data.confirmed;
    } else if (myData.type == "sign") {
      this.pieData = [
        { value: myData.data.signed.length, name: "已签到" },
        { value: myData.data.unSigned.length, name: "未签到" },
      ];
      this.bottomLabel = ["已签到", "未签到"];
      this.unconfirmed = myData.data.unSigned;
      this.confirmed = myData.data.signed;
    } else if (myData.type == "vote") {
      this.pieData = [
        { value: myData.data.voted.length, name: "已投票" },
        { value: myData.data.notVoted.length, name: "未投票" },
      ];
      this.bottomLabel = ["已投票", "未投票"];
      this.unconfirmed = myData.data.notVoted;
      this.confirmed = myData.data.Voted;
      this.selections = myData.selections;
      console.log(myData.data.selections);
      this.$nextTick(() => {
        this.drawSelectionPieChart();
      });
    }
    this.$nextTick(() => {
      this.drawPieChart();
    });
  },
  methods: {
    drawPieChart() {
      let mytextStyle = {
        color: "#333",
        fontSize: 18,
      };
      let mylabel = {
        show: true,
        position: "right",
        offset: [30, 40],
        formatter: "{b} : {c} ({d}%)",
        textStyle: mytextStyle,
      };
      this.chartPie = echarts.init(
        document.getElementById("chartPie"),
        "macarons"
      );
      this.chartPie.setOption({
        title: {
          text: "",
          subtext: "",
          x: "center",
        },
        tooltip: {
          // trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: this.bottomLabel,
          left: "center",
          top: "bottom",
          orient: "horizontal",
          // marginTop:'20px',
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            data: this.pieData,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
            label: {
              emphasis: mylabel,
            },
          },
        ],
      });
    },
    drawSelectionPieChart() {
      let mytextStyle = {
        color: "#333",
        fontSize: 18,
      };
      let mylabel = {
        show: true,
        position: "right",
        offset: [30, 40],
        formatter: "{b} : {c} ({d}%)",
        textStyle: mytextStyle,
      };
      this.chartPie = echarts.init(
        document.getElementById("chartPie2"),
        "macarons"
      );
      this.chartPie.setOption({
        title: {
          text: "",
          subtext: "",
          x: "center",
        },
        tooltip: {
          // trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: this.selections.map((item) => item.value),
          left: "center",
          top: "bottom",
          orient: "horizontal",
          // marginTop:'20px',
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            data: this.selections.map((item) => {
              return { value: item.score, name: item.value };
            }),
            animationEasing: "cubicInOut",
            animationDuration: 2600,
            label: {
              emphasis: mylabel,
            },
          },
        ],
      });
    },
  },
};
</script>
<style src="../assets/css/style.css" scoped>
</style>

<style scoped>
.unconfirmed {
  position: relative;
  margin-top: 50px;
}
.pieChart{
    justify-content:center;
    display: flex;
    width:100%;
}
.pie-wrap {

  margin-top: 50px;
  position: relative;
  width: 50%;
  height: 250px;
}
.loading {
  width: 8em;
  height: 8em;
  position: relative;
  margin-left: 250px;
  margin-top: 30px;
  margin-right: 150px;
  float: left;
}

.loading .progress {
  position: absolute;
  width: 6em;
  height: 6em;
  background-color: white;
  border-radius: 50%;
  left: 1em;
  top: 1em;
  line-height: 6em;
  text-align: center;
}

.left,
.right {
  width: 4em;
  height: 8em;
  overflow: hidden;
  position: relative;
  float: left;
  background-color: rgb(66, 221, 146);
}
.left {
  border-radius: 8em 0 0 8em;
}

.right {
  border-radius: 0 8em 8em 0;
}
.btn_urge {
  width: 60px;
  height: 30px;
  background-color: rgb(1, 176, 255);
  color: white;
}
</style>