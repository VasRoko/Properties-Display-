import template from '../templates/PropertyList.html';
import PropertyMapView from './PropertyMapView'; 
import PropertyListView from './PropertyListView';

const PropertyList = template ({
  props:[
    'properties'

  ],
  
  template: template,
  
  data: function(){
    return {
      selectedMode: 'map',
      status: 'all',
      plots: 'any',
      location: 'all',
      maxPropertyPrice: 'any',
      minPropertyPrice: 'any',
      sortByDate: 'date',
      sortByPlots: 'plot-size',
      sortByStatus: 'any',
      itemsPerPage: 9,
      currentPage: 1,
    }
  },

  components: 
  { 
    PropertyListView, 
    PropertyMapView 
  },

  methods: {
    uniqueLocation: function(arr)
    {
      
      let unique_array = []

      for(let i = 0; i < arr.length; i++){

          if(unique_array.indexOf(arr[i]) == -1)
          {
            unique_array.push(arr[i])
          }
      }

      return unique_array
    },
    setPage: function(pageNumber) {
      this.currentPage = pageNumber
    },
    
    mapViewMode: function () 
    { 
      this.selectedMode = 'map';
      this.reset();
    },
    listViewMode: function ()
    {
      this.selectedMode = 'list';
      this.reset();
    },

    reset: function()
    {
      Object.assign(this.$data, this.$options.data(), { selectedMode: this.selectedMode });
    },
  },

  computed: 
  {
    filteredProperties: function()   
    {
      
      const location = this.location;
      const status = this.status;
      const splitedPlot = this.plots.split("-");
      const maxprice = this.maxPropertyPrice;
      const minprice = this.minPropertyPrice;

      return this.properties.filter(function(property) {
         
          let includeProperty = true; // all properties are true by default
          
          //Has the status list been set?
          if(status && property.status && status !== "all" && status !== property.status){
            includeProperty = false;
          }

          //Has the location been set?
          if(location && property.location && location !== "all" && location !== property.location){
            includeProperty = false;
          } 

          if (minprice && property.price && minprice !== "any" && property.price < minprice)
          {
            includeProperty = false;
          }
          else if(maxprice && property.price && maxprice !== "any" && property.price > maxprice)
          {
            includeProperty = false;
          } 

          if(splitedPlot[0] !== "any" && splitedPlot[0] > property.plots)
          {
            includeProperty = false;
          } 
          else if (splitedPlot[0] !== "any" && splitedPlot[1] < property.plots)
          {
            includeProperty = false;
          } 
          else if (splitedPlot.length == 1 && splitedPlot[0] !== "any" && property.plots < splitedPlot[0])
          {
            includeProperty = false;
          }
          return includeProperty;

      }).sort((a, b) => {

        let displayOrder = 1; 

        if (this.sortByDate !== 'date' && this.sortByDate === 'newest') 
        {          
            if(a.created_at > b.created_at)
            {
              displayOrder = -1;
            }
        } 

        if (this.sortByDate !== 'date' && this.sortByDate === 'oldest') 
        {          
            if(a.created_at < b.created_at)
            {
              displayOrder = -1;
            }
        } 

        if (this.sortByPlots !== 'plot-size' && this.sortByPlots == 'high') 
        {        
          if(a.plots > b.plots)
          {
            displayOrder = -1;
          } 
        }

        if (this.sortByPlots !== 'plot-size' && this.sortByPlots == 'low') 
        {          
          if(a.plots < b.plots)
          {
            displayOrder = -1;
          } 
        }

        if (this.sortByStatus !== 'any' && this.sortByStatus == 'sold') 
        {          
          if(a.status > b.status)
          {
            displayOrder = -1;
          } 
        }

        if (this.sortByStatus !== 'any' && this.sortByStatus == 'forsale') 
        {          
          if(a.status < b.status)
          {
            displayOrder = -1;
          } 
        }

        return displayOrder;        
      });

    },

    totalPages: function() {
      return Math.ceil(this.filteredProperties.length / this.itemsPerPage)
    },

    paginatedProperties: function(){

      const index = this.currentPage + this.itemsPerPage;

      return this.filteredProperties.slice(index, index + this.itemsPerPage)
    },

    locations: function() {
      let AvailableLocations = [];

      this.filteredProperties.forEach(function(property)
      {
        AvailableLocations.push(property.location);
      });

      return this.uniqueLocation(AvailableLocations);

    },

    propertyPrices: function()
    {
      let availablePrices = [];

      this.properties.forEach(function(property)
      {
        availablePrices.push(property.price);
      });

        
      return this.uniqueLocation(availablePrices).sort(
        function(a, b)
        {
          return a - b
        });
    }

  }

})

export default PropertyList;