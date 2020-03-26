# Map Marker Documentation

The purpose of this readme is to outline the data model that the map uses to track organization/community map markers.

## What is a Map Marker

A map marker represents an organization or community effort to orchestrate aid. It consists of several components as well as a latitude, longitude, and area of influence (a radius measured in meters).

### Data Model

```typescript
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string };
  phone?: string[];
  email?: string[];
}

export interface Location {
  description: string; // human readable name of the location
  lat: number;
  lng: number;
  serviceRadius: number; // distance in meters
}

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

  contact: {
    general?: ContactDetails;
    getHelp?: ContactDetails;
    volunteers?: ContactDetails;
  };

  loc: Location;
}
```

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

You may submit PRs to this repository to add markers to the map. Submit your changes to `map/src/data/markers.ts`.

You may test your changes locally by following the steps outlined in [the map README](/map/README.md).
