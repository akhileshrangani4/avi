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
