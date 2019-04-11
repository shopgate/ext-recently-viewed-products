# Shopgate Connect - Extension Recently-Viewed-Products

This extension provides a slider of the recently viewed products within the cart.

The amount of items within the slider is limited and will only show up the recent entries. When a cms page with the key `recently-viewed` is available within the `quicklinks` menu, the complete list can be shown within that page.

## Configuration
Configuration is done by extension config.

```json
{
"maximumHistoryEntriesPerUser": "Number, defaults to 50, Maximum of recently viewed item in the history of a user",
    "pageId": "String, defaults to recently-viewed. ID of the cmd page where the recently views products should be shown as list",
    "sliderLimit" : "Number, defaults to 10. Number of items shown in the slider",
    "showOnEmptyCartPage" : "Boolean. Defaults to true. Whether slider is shown on the empty cart page",
    "showOnPdpPage" : "Boolean. Defaults to true. Whether slider is shown on the product detail page"
}
```


## Widget
If you want to use the recently viewed product slider as a widget, you can create a HTML widget with following content:

```html
<!--Widget
{
  "type": "@shopgate/recently-viewed-products/ProductSlider-widget",
  "settings": {
	"headline": "My custom headline",
	"autoPlay": false
  }
}
-->
```

Settings:
- autoPlay (optional): false
- headline (optional): "Recently viewed items"


## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.


