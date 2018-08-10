import template from '../templates/PropertyListView.html';
import SingleProperty from './SingleProperty';

const PropertyListView = template({
  props:['paginatedProperties', 'totalPages', 'setPage'],
  template: template,
  components: { 
    SingleProperty
  },
  data: function(){
    return {
      activePage: 1
    }
  },
  methods: {
    setActiveClass: function(page) {
      return this.activePage = page;
    }
  }

})

export default PropertyListView;