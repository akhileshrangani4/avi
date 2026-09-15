#!/usr/bin/env bash
set -euo pipefail

if ! command -v tectonic &> /dev/null; then
  echo "Installing tectonic..."
  curl -sSL https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.15.0/tectonic-0.15.0-x86_64-unknown-linux-musl.tar.gz | tar xz -C /tmp
  TECTONIC=/tmp/tectonic
else
  TECTONIC=tectonic
fi

echo "Compiling resume.tex -> public/resume.pdf"
$TECTONIC src/resume/resume.tex --outdir public

echo "Copying pdf.js worker to public/"
# The worker calls Math.sumPrecise too and never loads our app modules, so the
# polyfill is prepended here. Keep in sync with lib/math-sum-precise.ts.
cat > public/pdf.worker.min.mjs <<'POLYFILL'
if(typeof Math.sumPrecise!=="function"){Math.sumPrecise=function(values){let sum=0,c=0,n=0;for(const v of values){const x=Number(v),t=sum+x;c+=Math.abs(sum)>=Math.abs(x)?sum-t+x:x-t+sum;sum=t;n++}return n===0?-0:sum+c};}
POLYFILL
cat node_modules/pdfjs-dist/build/pdf.worker.min.mjs >> public/pdf.worker.min.mjs
