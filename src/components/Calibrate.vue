<template>
<div>
  <app-header></app-header>
  <br>
  <div>
    <h1>Calibrate Sensors</h1>
    <center>
      <table class="table" style="width : 100%; border: 1px solid cyan;border-collapse: collapse;">
        <thead>
          <tr>
            <th>Channel</th>
            <th>Name</th>
            <th>Wiring</th>
            <th>V read</th>
            <th>value</th>
            <th>Slope (a)</th>
            <th>Intersect (b)</th>
            <th>Last calibrated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sensor in sensors" :key="sensor.channel">
            <td>{{sensor.channel}}</td>
            <td>{{sensor.name}}</td>
            <td>{{ sensor.details }}</td>
            <td>{{ reads[sensor.channel].toFixed(2) }}</td>
            <td>{{ Math.round(reads[sensor.channel] * parseFloat(sensor.slope) + parseFloat(sensor.intersect)) }}</td>
            <td>
              <input type="number" placeholer="sensor.slope" v-model=sensor.slope> 
            </td>
            <td>
              <input type="number" placeholer="sensor.intersect" v-model=sensor.intersect> 
            </td>
            <td>{{sensor.last_calibrated | humanize}}</td>
            <td>
              <button class="button" @click="updateCalibration(sensor)">Calibrate</button> 
            </td>            
          </tr>
        </tbody>
      </table>
    </center>   
  </div>
  
  <div>
    <br>
    <center>
      <button class="button is-clear fat" @click="reset">Reset</button>
    </center>
  </div>

</div>
</template>

<script>
import Header from "./Header.vue";
export default {
  data() {
    return {
      sensors: [],
      reads: [],
      interval: null
    };
  },
  filters: {
    humanize: function(ts) {
      return new Date(ts * 1e3).toISOString().replace('T', ' ').split('.')[0]
    }
  },
  methods: {
    reset: function() {
      this.getSensors()
    },
    updateCalibration: function(sensor) {
      console.log('updating calibration', sensor)
      this.axios
        .post(this.$server + "/config/calibrate",
              {
                channel: sensor.channel,
                slope: sensor.slope,
                intersect: sensor.intersect
              }
        )
        .then( data => {
          console.log('update config:', data.data)
          let updated = data.data[sensor.channel]
          this.$set(this.sensors, sensor.channel, updated)
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getReads: function() {
      this.axios
        .get(this.$server + "/read")
        .then( data => {
          data.data.forEach( e => {
            this.$set(this.reads, e.channel, e.raw)
          })
          console.log(this.sensors[0])
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getSensors: function() {
      this.axios
        .get(this.$server + "/config")
        .then(
          data => {
            Object.values(data.data.SENSORS).forEach( s => {
              this.$set(this.sensors, s.channel, s)
            })
            console.log('sensors:', this.sensors)
            this.getReads()

            if (!this.interval) {
              const self = this
              console.log('starting interval')
              this.interval = setInterval(
                () => self.getReads(),
                1000
              )
            }
          },
          error => { console.log(error) }
        )
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getSensors()
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
.fat {
  margin: 20px
}

table {
  table-layout:fixed;
}

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
