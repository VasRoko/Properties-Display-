# Properties-Display-

Please Note this is for development not production. 

Place following code inside your blade, app or html templates.

```
<div class="container">
    <div id="properties">
        <property-list :properties="properties" v-bind:key="properties.id"></property-list>
    </div>
</div>

```

Use npm install in initialize node modules.

use yarn dev for development.
