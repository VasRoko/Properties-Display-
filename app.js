import Vue from 'vue';
import $ from 'jquery';
import PropertyList from './components/PropertyList';
import './styles/styles.scss';

$(document).ready(function(){

  $('#listCont').hide();

  new Vue({
    el: '#properties',
    data:
    {
      properties: [],
    },
    components: { PropertyList },

    mounted() {
      $.getJSON('you API link here!', json => {
        this.properties = json
      })
    }
  });
});
