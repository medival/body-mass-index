# body-mass-index

### Overview

Integrate with CI/CD with Google Cloud Platform. Created with Node JS as Backend

#### Cloud Stack

- Cloud Run
- CI/CD (Cloud Build and Cloud Deploy)
- Cloud Monitoring

### Getting Started

Body-Mass-Index requires [Node.js](https://nodejs.org/) v16+ to run.
Clone the repositories, Install the devDependencies and start the server.

1. `git clone https://github.com/medival/body-mass-index.git`
2. `cd body-mass-index`
3. `npm i`
4. `npm run start-dev`

### How to use

#### Health-check

1. Endpoint

```
GET /status
```

2. Sample Request

```
curl -X GET \
  http://localhost:5000/status \
  -H 'Content-Type: application/json'
```

3. Sample Response

```
{
    "status": "It's working bro!"
}
```

#### Calculate

1. Endpoint

```
POST /calculate
```

2. Parameter

   | Parameter   | Type     | Description                      |
   | :---------: | :-------:| :-----------------------------:  |
   | `height`    | `integer`| **Required**. Height in cm format|
   | `weight`    | `integer`| **Required**. Weight in kg format|

3. Sample Request

```
curl -X POST \
  http://localhost:5000/calculate \
  -H 'Content-Type: application/json' \
  -d '{ \
  "height": 170, \
  "weight": 60, \
}'
```

4. Sample Response

```
{
    "bmi": "20.76",
    "label": "normal"
}
```