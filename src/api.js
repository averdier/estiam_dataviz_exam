import axios from 'axios'

const ROWS = 1000
const API_KEY = 'ef7a96984f6c7516cb0f30e9d112e1714940989da255714be51c6d27'

export default {
    getPoitiersPollution () {
        const url = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=concentrations-horaires-de-polluants-dans-lair-ambiant-issues-du-reseau-permanen%40grandpoitiers&rows=${ROWS}&facet=nm_sttn&facet=nom_pll&apikey=${API_KEY}`

        return axios.get(url)
    },


    get62Events () {
        const url = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=cdt62_manifestations%40tourisme62&rows=${ROWS}&facet=lang&facet=type&facet=adherent&facet=langues&facet=territoires&facet=themes&facet=moyenspaiement&facet=prestations&facet=classement_categories&facet=classement_labels&facet=classement_guides&facet=classement_chaines&facet=classement_tourisme_et_handicap&facet=code_postal_etab&facet=commune_etab&facet=periode_date_debut_1&facet=periode_date_fin_1&facet=created&apikey=${API_KEY}`

        return axios.get(url)
    }
}