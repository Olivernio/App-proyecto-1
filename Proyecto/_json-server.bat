@echo off

echo ******************************************
echo EJECUTAR JSON SERVER
echo ******************************************
echo.
echo.

call cd _JSON-SERVER
call json-server --watch publicaciones.json
rem call json-server --host=localhost --watch publicaciones.json
@REM rem call json-server --host=192.168.100.34 --watch publicaciones.json

