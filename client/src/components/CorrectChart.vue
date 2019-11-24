<template>
  <div>
    <h3 v-text="chart.name"></h3>
    <table class="chart">
      <tr class="chart-row">
        <th class="position chart-header">TP</th>
        <th class="team chart-header">Lag</th>
        <th class="position chart-header">P</th>
        <th class="difference chart-header">Diff</th>
        <th class="points chart-header">Poäng</th>
      </tr>
      <tr class="chart-row" v-for="(team, i) in chart.chart" :key="team.name + i + chart.name">
        <td class="position chart-data" v-text="team.position"></td>
        <td class="team chart-data" v-text="team.name.toUpperCase()"></td>
        <td class="position chart-data" v-text="teamPositions[team.team_code]"></td>
        <td class="difference chart-data" v-text="getTeamDiff(team.position, team.team_code)"></td>
        <td class="points chart-data" v-text="getPoints(team.position, team.team_code)"></td>
      </tr>
      <tr class="chart-row">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="chart-data">{{points}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import SHLService from "@/services/shl";
import Teams from "../data/teams";

export default {
  name: "AddChart",
  components: {},
  data: function() {
    return {
      teamPositions: {}
    };
  },
  props: {
    standings: Array,
    chart: Object
  },

  methods: {
    setTeamPositions() {
      this.standings.forEach(s => {
        this.teamPositions[s.team_code] = s.position;
      });
    },
    getTeamDiff(pos, teamCode) {
      const correctPos = this.teamPositions[teamCode];
      return Math.abs(correctPos - pos);
    },
    getPointsFromDiff(diff) {
      if (diff >= 11) return -5;
      else if (diff >= 9) return -4;
      else if (diff >= 7) return -3;
      else if (diff >= 5) return -2;
      else if (diff >= 3) return -1;
      else if (diff >= 2) return 0;
      else if (diff >= 1) return 1;
      else if (diff === 0) return 3;
      else return 0;
    },
    addPoints(points) {
      this.points += points;
    },
    getPoints(pos, teamCode) {
      const diff = this.getTeamDiff(pos, teamCode);
      const points = this.getPointsFromDiff(diff);
      return points;
    }
  },
  computed: {
    points() {
      return this.chart.chart.reduce((acc, curr) => {
        let pos = curr.position;
        let correctPosition = this.teamPositions[curr.team_code];
        return acc + this.getPointsFromDiff(Math.abs(pos - correctPosition));
      }, 0);
    }
  },
  created: function() {
    this.setTeamPositions();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  margin: 0;
  font-size: 14px;
}
th {
  font-size: 14px;
  text-align: start;
  &:first-child {
    width: 40px;
  }
}
td {
  text-align: start;
  font-size: 14px;
}
.chart-data {
  border: 1px solid white;
  padding: 0.5rem 1rem;
  background-color: #4abdac;
  color: white;
}
.chart-header {
  border: 1px solid white;
  padding: 0.5rem 1rem;
  background-color: #4abdac;
  color: white;
}
.chart {
  width: 400px;
  border-collapse: collapse;
}
.chart-row {
}
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
.chart-wrapper {
  display: flex;
  justify-content: center;
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

.list-group-item i {
  cursor: pointer;
}
</style>
