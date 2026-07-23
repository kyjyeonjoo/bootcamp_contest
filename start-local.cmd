@echo off
cd /d "%~dp0"
node -e "const fs=require('fs');const path=require('path');const code=fs.readFileSync(path.join(process.cwd(),'local-server.js'),'utf8');new Function('require','__dirname','console','process',code)(require,process.cwd(),console,process);"
