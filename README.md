# Backend Assessment
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## About <a name = "about"></a>

Epress application for finding the intesection points between lines.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

1. Install node https://nodejs.org/en/download/

### How to run

1. Navigate to the project directory
```
cd path/to/project/mapup-assessment/backend
```
2. Install the dependencies
```
npm install 
```
3. Run the app
```
npm run dev
```
### Test
1. Run this curl
```
curl --location 'localhost:3000/api/v1/line/get-intersections' \
--header 'authKey: my$uper$ecretkey' \
--header 'Content-Type: application/json' \
--data '{
  "type": "LineString",
  "coordinates": [
    [-89.12168, 39.98982],
    [-89.12241, 39.99046],
    [-89.12294, 39.99138],
    [-89.12347, 39.99211],
    [-89.1244, 39.99287],
    [-89.12482, 39.99442],
    [126, -11], [129, -21]
  ]
}'
```
