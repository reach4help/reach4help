# Map Marker Documentation

The purpose of this readme is to outline the data model that the map uses to track organization/community map markers.

## What is a Map Marker

A map marker represents an organization or community effort to orchestrate aid. It consists of several components as well as a latitude, longitude, and area of influence (a radius measured in meters).

### Data Model

```typescript
/**
 * Contact details capture various methods to contact an organization.
 */
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string }; // List of URLs
  phone?: string[];
  email?: string[];
}

/**
 * Locations can be saved so they can be re-used for other markers.
 *
 * See the LOCATIONS array.
 */
export interface Location {
  description: string; // human readable name of the location
  lat: number;
  lng: number;
  serviceRadius: number; // distance in meters
}

/**
 * A marker that will be rendered on the map. A short title and description is also visible to users.
 *
 * It contains an array of services
 */
export interface MarkerInfo {
  // name of the organization or community effort
  contentTitle: string;

  // description of the organization or community effort
  contentBody?: string;

  // a list of services provided -- at least one is required from the list below
  services: [
    'food',
    'supplies',
    'aid',
    'mobility',
    'medicine',
    'manufacturing',
    'financial',
    'information',
  ];

  // Three contact detail objects cover various opportunities available at each organization
  contact: {
    general?: ContactDetails; // For general info
    getHelp?: ContactDetails; // For showcasing how those who need help can interact with the organization
    volunteers?: ContactDetails; // For showcasing how those who want to help can interact with the organization
  };

  loc: Location; // The location data for this organization
}
```

### How to Capture Lat, Long, and Radius

1. Open Google Maps
2. Click and hold (~1 sec.) until a marker appears.
3. Click the "Lat., Long" on the marker to open it.
4. Now you can copy the numbers with ease.
5. Right-click on the map to open the option menu.
6. Select the "Measure Distance" (or clear it if it's already on).
7. Click on the map to make a start point, and again to make an end point.
8. You can drag the measure around to identify the correct radius.
9. Remember to convert the radius from KM to Meters

See the video below if you have any questions.

![ezgif com-optimize](https://user-images.githubusercontent.com/961844/77779477-ce871100-700f-11ea-9d81-be316d3bdc77.gif)

### Sample Marker

```json
{
  "contentTitle": "Community Organization for Aid - SF Bay Area",
  "contentBody": "We are a collective of parents, industry leaders, and volunteers providing aid to anyone who needs it.",
  "services": [
    "food",
    "supplies",
    "aid",
    "mobility",
    "medicine",
    "manufacturing",
    "financial",
    "information"
  ],
  "contact": {
    "general": {
      "facebookGroup": "https://facebook.com/groups/findhelp",
      "web": {
        "Homepage": "https://www.findhelp.org",
        "Our Team": "https://www.findhelp.org/team",
        "Our Mission": "https://www.findhelp.org/misson"
      },
      "phone": ["+1 800 555 1234", "+1 800 555 5678"],
      "email": ["info@findhelp.org", "another-email@findhelp.org"]
    },
    "getHelp": {
      "web": {
        "Request Help Form": "https://google.com/forms/get-help.html"
      },
      "email": ["helpme@findhelp.org"]
    },
    "volunteers": {
      "web": {
        "Offer Help Form": "https://google.com/forms/get-help.html",
        "Donate Funds": "https://gofundme.com/findhelp",
        "Donate Items": "https://google.com/forms/donate-items.html"
      },
      "email": ["offerhelp@findhelp.org"]
    }
  },
  "loc": {
    "description": "Bay Area, California",
    "lat": 37.8272,
    "lng": -122.2913,
    "serviceRadius": 85000
  }
}
```

## How to Contribute

You may submit PRs to this repository to add markers to the map. Submit your changes to the [marker source file](/map/src/data/markers.ts).

You may test your changes locally by following the steps outlined in [the map README](/map/README.md).
