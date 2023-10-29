@echo off

echo ******************************************
echo EJECUTAR JSON SERVER
echo ******************************************
echo.
echo.

call cd _JSON-SERVER
rem call json-server --watch publicaciones.json
call json-server --watch publicaciones.json

