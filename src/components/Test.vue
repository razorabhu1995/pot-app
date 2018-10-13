<template>
<div>
    <app-header></app-header>
    <br>
        <div>
            <center><h1><b>Sensors</b></h1></center>
            <center>
                <table class="table" style="width : 80%; border: 1px solid cyan;border-collapse: collapse;">
                  <thead>
                    <tr>
                    <th>Name</th>
                    <th>Raw</th>
                    <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(read,index) in reads" :key="index">
                      <td>{{read.name}}</td>
                      <td>{{read.raw.toFixed(2)}}</td>
                      <td>{{read.value}}</td>
                    </tr>
                  </tbody>
                </table>
            </center>   
        </div>
        <hr>
        <center><h1><b>Controls</b></h1></center>
        <center>
          <table class="table" style="width : 80%; border: 1px solid cyan;border-collapse: collapse;">
            <thead>
              <tr>
              <th>Relay #</th>
              <th>ON/OFF</th>
              <th>Reset After</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(relay, index) in relays" :key="index">
                <td>{{relay.name}}</td>
                <td>
                  <input type="checkbox" v-model="relay.state" v-on:change="handleClick(relay)"/>
                </td>
                <td><b-input style="width:40%;" v-model="relay.delay"></b-input> Seconds</td>
              </tr>
            </tbody>
          </table>

        </center>
    </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  data() {
    return {
      reads: [],
      relays: [],
      interval: null
    };
  },
  methods: {
    getReads: function() {
      this.axios
        .get(this.$server + "/read")
        .then(data => {
          this.reads = data.data
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getControls: function() {
      this.axios
        .get(this.$server + "/control")
        .then(
          data => {
            Object.keys(data.data).forEach( r_name => {

              let relay = {
                id: parseInt(r_name.split(' ')[1]),
                name: r_name,
                state: !!data.data[r_name]
              }
              relay.delay = this.relays[relay.id] && this.relays[relay.id].delay || 0
              this.$set(this.relays, relay.id, relay)
            })
          },
          error => {
            console.log(error);
          }
        )
        .catch(function(err) {
          console.log(err);
        });
    },
    handleClick: function(relay) {
      console.log('relay:', relay)
      if (relay.state && relay.delay) {
        console.log('delayed call')
        this.axios.post(
          this.$server + "/control",
          {
            relay: relay.id,
            state: 1
          }
        )
        this.axios.post(
          this.$server + "/control?delay=" + relay.delay,
          {
            relay: relay.id,
            state: 0
          }
        )
        .then(
          data => {
            var interval = setInterval( () => 
            {
              relay.delay -= 1
              if (relay.delay <= 0) {
                clearInterval(interval)
                return
              }
            }, 1000);
            console.log(data);
            
          }
        )
      }
      else {
        this.axios.post(
          this.$server + "/control",
          {
            relay: relay.id,
            state: relay.state
          }
        )
        .then(
          data => {
            console.log("axios sss", data);
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e)
        })
      }
    }
  },
  mounted() {
    this.getReads()
    this.getControls();
    this.interval = setInterval(() => { this.getReads(); this.getControls() }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
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

td {
  width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
