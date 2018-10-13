<template>
    <div>
    <app-header></app-header>
    <center>
        <div style="width:40%;">
                <b-field label="Name">
                        <b-input v-model="name"></b-input>
                </b-field>
                <b-field label="cycles_per_day">
                        <b-input v-model.number="cycles_per_day"></b-input>
                </b-field>
                <b-field label="daily_amount">
                        <b-input v-model.number="daily_amount"></b-input>
                </b-field>
                <b-field label="fertilizer">
                        <b-input v-model.number="fertilizer"></b-input>
                </b-field>
            <button class="button is-clear" @click="submit">Submit</button>&nbsp;
            <button class="button is-clear" @click="$router.go(-1)">Cancel</button>
        </div>
   </center>

    </div>  
</template>
<script>
import Header from "./Header.vue";
export default {
  data() {
    return {
      name: this.$route.params.plan.name,
      cycles_per_day: this.$route.params.plan.cycles_per_day,
      daily_amount: this.$route.params.plan.daily_amount,
      fertilizer: this.$route.params.plan.fertilizer
    };
  },
  methods: {
    submit: function() {
      this.axios({
        method: "post",
        url:
          this.$server+ "/plan/" +
          this.$route.params.plan.id,
        data: {
          name: this.name,
          cycles_per_day: this.cycles_per_day,
          daily_amount: this.daily_amount,
          fertilizer: this.fertilizer
        }
      })
        .then(
          data => {
            console.log("axios sss", data);
            this.$router.push({name:'home'});
          },
          error => {
            console.log(error);
          }
        )
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    console.log(this.$route.params.plan);
  },
  components: {
    "app-header": Header
  }
};
</script>

<style>
</style>

