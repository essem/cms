# CMS (Content Management System)

Store game data and browse them via web.

## Setup

### Development environment

Install npm modules
```bash
cd lib
yarn install
cd ../api
yarn install
cd ../front
yarn install
```

Link lib project to others
```bash
cd lib
yarn link
cd ../api
yarn link cms-lib
cd ../front
yarn link cms-lib
```

Run development servers. (Run them in 3 terminals)
```bash
cd lib
yarn run watch-ts

cd api
yarn run watch 

cd front
yarn start
```

Open your browser and connect to http://localhost:4200.