## Abofity Conversion Tracking Script Integration

### Overview

This document provides instructions for integrating the Abofity Conversion Tracking Script into your website. This script is designed to track user conversions, such as sign-ups and purchases, and sends the data to the backend endpoint `/conversion_events`.

### Integration Steps

#### Step 1: Add the Script

Include the following `<script>` tag in your HTML file or template to incorporate the Abofity Conversion Tracking Script.

```html
<script src="https://api.abotify.com/static/js/track.js"></script>
```

Make sure to place this tag before the closing `</body>` tag.

#### Step 2: Initialize the Script

After loading, the script will automatically initialize. This means it will automatically read the `abotify_id` from the URL parameters and extract the `userId` from cookies.

#### Step 3: Track Conversion Events

To track a conversion event (like a user purchase), you need to call the `abotify.track()` method, passing an object that contains details of the conversion event.

For example, to track a purchase when a user completes it, you can do as follows:

```javascript
abotify.track({
  name: "purchase",
  detail: "Premium Subscription",
  revenue: 39.99,
});
```

#### Step 4: Customization

If you need to customize the tracking logic based on user behavior or specific conditions, ensure to call the `abotify.track()` method in the respective part where the event is triggered.

### Example Code

Here is an example of adding a button on an HTML page and tracking a purchase event when it's clicked:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abofity Conversion Tracking</title>
    <!-- Include Abofity Conversion Tracking Script -->
    <script src="https://api.abotify.com/static/js/track.js"></script>
</head>
<body>
    <!-- Purchase Button -->
    <button id="purchaseButton">Purchase</button>

    <!-- JavaScript to handle click event on the purchase button -->
    <script>
        document
            .getElementById("purchaseButton")
            .addEventListener("click", function () {
                abotify.track({
                    name: "purchase",
                    detail: "Product XYZ",
                    revenue: 49.99,
                });
            });
    </script>
</body>
</html>

```

### Considerations
 
- Consider user privacy and consent. Depending on your region’s privacy laws (like GDPR or CCPA), you might need to obtain user consent before tracking their data.

### Support

If you encounter any issues during the integration process, or if you have any questions, please contact gpt-ads@proton.me for assistance.
