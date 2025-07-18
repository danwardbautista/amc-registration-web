# Vue + Vite Typescript

Frontend Registration

## Live Website
https://amc.danwardbautista.com/

## Prerequisite
1. Node JS Stable Version

## Running Development
### Package installation
```shell
npm install
```
### Local Setup
1. Create an `.env` file.
2. Create an entry in `.env`, `VITE_API_BASE_URL=http://localhost:8000`

### Local
Run it locally on port `5173`
```shell
npm run dev
```

## Running Docker
### Setup
1. Create an `.env.production` file.
2. Create an entry in `.env.production`, `VITE_API_BASE_URL=https://amc.danwardbautista.com`

### Commands
Build and run
```shell
docker-compose up --build
```
