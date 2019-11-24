import Api from '@/services/Api'

export default {
  getTeams() {
    return Api().get('get-teams')
  },
  getStandings() {
    return Api().get('get-standings')
  },
  saveChart(chartObj) {
    return Api().post('save-chart', chartObj)
  },
  getAllCharts() {
    return Api().get('get-all-charts')
  },
  getTodaysGames() {
    return Api().get('get-todays-games')
  }
}
