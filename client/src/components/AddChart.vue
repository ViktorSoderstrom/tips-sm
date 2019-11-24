<template>
  <div>
    <p v-text="chartObject"></p>
    <p>Namn:</p>
    <input type="text" v-model="chartObject.name" />
    <div class="chart-wrapper">
      <draggable
        v-model="chartObject.chart"
        class="list-group"
        tag="ul"
        v-bind="dragOptions"
        @start="startDrag"
        @end="stopDrag"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
            class="list-group-item"
            v-for="(element, index) in chartObject.chart"
            :key="index + 'team'"
          >
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            <span class="position">{{index + 1}}</span>
            <span class="team">{{ element.name }}</span>
          </li>
        </transition-group>
      </draggable>
    </div>
    <button @click="saveChart(chartObject)">skicka in</button>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import SHLService from "@/services/shl";
import Teams from "../data/teams";

export default {
  name: "AddChart",
  components: {
    Draggable
  },
  data: function() {
    return {
      chartObject: {
        name: "",
        chart: [1, 2, 3]
      },
      drag: false
    };
  },
  methods: {
    async getTeams() {
      let resp = await SHLService.getTeams();
      let teams = resp.data.map((t, index) => {
        return {
          position: index + 1,
          team_code: t.team_code,
          name: Teams[t.team_code]
        };
      });
      this.chartObject.chart = teams;
    },
    async saveChart(chartObject) {
      //let resp = await SHLService.saveChart(chartObject);
      console.log("Avstängd");
    },
    stopDrag() {
      let chart = this.chartObject.chart;
      chart = chart.forEach((element, index) => {
        element.position = index + 1;
      });
      this.drag = false;
    },
    startDrag() {
      this.drag = true;
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  created: function() {
    this.getTeams();
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
