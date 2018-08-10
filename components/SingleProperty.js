import template from '../templates/SingleProperty.html';

const SingleProperty = template({
  props:[
    'property',
  ],
  template: template,
  computed: {
    
    propery_flash: function()   
    {
      return this.property.propertyflash.toLowerCase().replace(' ', '-');
    },

    propery_price: function()   
    {
      return this.property.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
})

export default SingleProperty;