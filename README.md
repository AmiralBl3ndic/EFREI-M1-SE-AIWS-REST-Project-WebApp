# Application Interoperability with Web Services REST Project | REST API

This repository contains the code of the AIWS REST Project for the team composed of:
- Camille **BRIAND** (M1 SE)
- Elodie **DEHACHE** (M1 SE)
- Jérémi **FRIGGIT** (M1 IRV)
- Jules **LAGNY** (M1 SE)
- Zoé **NIDDAM** (M1 IRV)

## Backend REST API

This webapp relies on the [AIWS REST Project](https://github.com/AmiralBl3ndic/EFREI-M1-SE-AIWS-REST-Project-API) REST API, it will not 
work if this project is not running.

## Configuring the webapp

Before even starting the webapp, please ensure that the `src/uris.js` file contains the `apiUri` variable and that its value has been
set to the correct URL/URI of the root endpoint of your API. 

**Disclaimer**: The webapp won't work otherwise.

## Running the project

The project has been developed with the **yarn** package manager, but **npm** should work as well.

**Disclaimer**: The project has not been generated thanks to the *create-react-app* cli interface, but has been manually set to use the
**parcel** bundler rather than **webpack** because of its ease of use.

### Install the dependencies

**yarn**:
```
yarn
```

**npm**:
```
npm install
```

### Run the project

First, ensure the configuration of the project matches your environment (see [Configuring the webapp](#configuring-the-webapp)).

**yarn**:
```
yarn dev
```

**npm**:
```
npm run dev
```

### Build the webapp

The above steps should be sufficient enough to get the webapp up and running, but you can build the project so that it works standalone.

**yarn**:
```
yarn build
```

**npm**:
```
npm run build
```

Both these commands should produce a build in a `dist` folder which can work as a standalone frontend (will still need the backend API)
