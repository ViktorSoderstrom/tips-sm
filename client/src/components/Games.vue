<template>
  <div>
    <ul v-if="gamesReady" class="games-list">
      <li v-for="game in games" :key="game.game_id">
        <div class="game">
          {{moment(game.start_date_time).format('MMMM')}}
          <span
            v-text="teamsMap[game.home_team_code]"
          ></span>
          <span>-</span>
          <span v-text="teamsMap[game.away_team_code]"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SHLService from "@/services/shl";
import Teams from "../data/teams";
const moment = require("moment");
export default {
  name: "Games",
  components: {},
  data: function() {
    return {
      games: Array,
      gamesReady: false,
      teamsMap: Teams,
      moment: moment
    };
  },
  methods: {
    async getGames() {
      const resp = await SHLService.getTodaysGames();
      const allGames = resp.data.reverse();
      this.games = allGames;
      this.gamesReady = true;
    }
  },
  computed: {},
  created: function() {
    this.getGames();
    this.moment.locale("sv");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.games-list {
  list-style: none;
}
</style>
