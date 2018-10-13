<template>
<div>
    <app-header></app-header>
    <div>
            <center>
              <div>
                <b-field label="Select Plan">
                  <b-select placeholder="Select a plan" v-model="selectedPlan" style="text-align: center;">
                      <option
                          v-for="(plan,index) in plans"
                          :value="plan"
                          :key="index">
                          {{ plan.name }}
                      </option>
                  </b-select>
                </b-field>
              </div>
              <br>
                <table class="table" style="width : 50%; border: 1px solid cyan;border-collapse: collapse;">
                 <thead>
                    <tr>
                    <th>Plan Name: {{selectedPlan.name}}</th>
                    <th style="text-align: right;"><button class="button is-clear" @click="gotoEdit(selectedPlan)">Edit</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>cycles_per_day</td>
                        <td>{{selectedPlan.cycles_per_day}}</td>
                    </tr>
                    <tr>
                        <td>daily_amount</td>
                        <td>{{selectedPlan.daily_amount}}</td>
                        
                    </tr>
                    <tr>
                        <td>fertilizer</td>
                        <td>{{selectedPlan.fertilizer}}</td>
                        
                    </tr>
                </tbody>
            </table>
            </center>
            
    </div>
</div>
</template>

<script>
import Header from "./Header.vue";
export default {
  data() {
    return {
      plans: [],
      selectedPlan: {}
    };
  },
  methods: {
    getPlans: function() {
      console.log("here");

      this.axios
        .get(this.$server + "/plans")
        .then(data => {
          console.log(data.data);
          this.plans = data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    gotoEdit: function(plan) {
      this.$router.push({ name: "edit", params: { id: plan.id, plan: plan } });
    }
  },
  mounted() {
    this.getPlans();
    console.log(this.plans);
    setTimeout(() => {
      if (this.plans && this.plans.length > 0) {
        this.selectedPlan = this.plans[0];
      }
    }, 500);
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
