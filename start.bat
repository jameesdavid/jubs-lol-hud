@echo off

start cmd /k "cd layouts\layout-volu-europe && npm i && npm run start"

start cmd /k "cd backend && npm i && npm run start"

start "" "http://localhost:3000/?backend=ws://localhost:8999"
