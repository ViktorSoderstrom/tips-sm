<template>
  <div>
    <br />
    <div v-if="showCorrect" class="charts-wrapper">
      <div v-for="chart in charts" :key="chart.name">
        <correct-chart v-if="true" :chart="chart" :standings="standings" />
      </div>
    </div>
  </div>
</template>

<script>
import SHLService from "@/services/shl";
import Teams from "../data/teams";
import CorrectChart from "../components/CorrectChart.vue";

export default {
  name: "AddChart",
  components: {
    CorrectChart
  },
  data: function() {
    return {
      standings: [1, 2, 3],
      charts: [],
      standingsDone: false,
      chartsDone: false
    };
  },
  methods: {
    async getStandings() {
      let resp = await SHLService.getStandings();
      let teams = resp.data.map((t, index) => {
        return {
          position: index + 1,
          team_code: t.team_code,
          name: Teams[t.team_code]
        };
      });
      this.standings = teams;
      this.standingsDone = true;
    },
    async getAllCharts() {
      let resp = await SHLService.getAllCharts();
      this.charts = resp.data;
      this.chartsDone = true;
      console.log(this.charts);
    }
  },
  computed: {
    showCorrect: function() {
      return this.chartsDone && this.standingsDone;
    }
  },
  created: function() {
    this.getStandings();
    this.getAllCharts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart-team {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: space-between;
}
.charts-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.draggable {
  width: 300px;
}
.position {
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 300px;
}
.list-group-item {
  position: relative;
  cursor: move;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 4px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.position {
  position: absolute;
  left: 10px;
}
.team {
  position: absolute;
  left: 30%;
}
.list-group-item i {
  cursor: pointer;
}
</style>
