<template>
<div>
    <app-header></app-header>
    <center>
        <!-- <div style="width:40%">
            <b-field label="Samples">
                <b-input v-model.number="sample"></b-input>
            </b-field>
            <b-select placeholder="Select a channel" v-model="channel" style="text-align: center;">
                      <option
                          v-for="(channel,index) in channelArray"
                          :value="channel"
                          :key="index">
                          {{ channel }}
                      </option>
              </b-select>
              <br>
              <button class="button is-clear" @click="getSamples(sample,channel)">View Graph</button>
        </div>
        <br> -->
       
        <div v-for="(chartOption,index) in chartOptions" :key="index" style="width:90%;border: 1px solid aqua;margin-bottom:10px;">
              <highcharts :options="chartOption"></highcharts>
        </div>
      
    </center>
    
    

</div>
</template>

<script>
import Header from "./Header.vue";
export default {
  data() {
    return {
      samples: [],
      sample: null,
      chartOptions: [],
      interval: null,
      channelArray: [0, 1, 2, 3, 4],
      channel: null
    };
  },
  methods: {
    getSamples: function() {
      this.axios({
        method: "get",
        url: this.$server + "/samples?n=" + 100
      })
        .then(
          data => {
            this.chartOptions = [];
            console.log("sample", data.data);
            var ts = [];
            for (let index = 0; index < data.data.ts.length; index++) {
              console.log(
                "time",
                this.$moment(data.data.ts[index]).format("h:mm:ss a")
              );
              ts.push(this.$moment(data.data.ts[index]).format("h:mm:ss a"));
            }

            for (let key in data.data.sensors) {
              console.log("object", data.data.sensors[key]);
              var chartOption = {
                chart: {
                  type: "spline"
                },
                title: {
                  text: data.data.sensors[key].name
                },
                xAxis: {
                  allowDecimals: true,
                  title: {
                    text: "Time"
                  },
                  categories: ts
                },
                yAxis: {
                  allowDecimals: true,
                  title: {
                    text: "Raw"
                  }
                },
                series: [
                  {
                    data: data.data.sensors[key].raw
                  }
                ]
              };
              console.log("chartoption", chartOption);

              this.chartOptions.push(chartOption);
            }

            console.log("chart", chartOption);
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    },
    // startInterval: function() {
    //   this.interval = setInterval(() => {
    //     this.getSamples(1);
    //   }, 10000);
    // }
  },
  mounted() {
    console.log(this.$server);
    this.getSamples();
    this.interval = setInterval(() => {
      this.getSamples();
    }, 10000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    "app-header": Header
  }
};
</script>
<style>
tr,
th {
  border: 1px solid #dddddd;
}
</style>
