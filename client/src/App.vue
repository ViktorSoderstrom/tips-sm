<template>
  <div id="app">
    <script
      type="application/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"
    ></script>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- <add-chart /> -->
    <all-charts />
    <games />
  </div>
</template>

<script>
import AddChart from "./components/AddChart.vue";
import AllCharts from "./components/AllCharts.vue";
import Games from "./components/Games";

export default {
  name: "app",
  components: {
    AddChart,
    AllCharts,
    Games
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Open sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
