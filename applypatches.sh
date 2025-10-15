#!/usr/bin/env bash
set -euo pipefail
shopt -s inherit_errexit

which patch &> /dev/null || {
	echo "Please install patch."
	exit 1
}

if ! [[ -d "terraria/Patches" ]]; then
	echo "Please run tools/genpatches.sh first."
fi

if ! [[ "$#" -eq "1" ]]; then
	echo "usage: bash tools/applypatches.sh <dir>"
	exit 1
fi

find "terraria/Patches/$1" -type f -name "*.patch" | while read -r patch; do
	file=${patch#terraria/Patches/$1/}
	file=${file%.patch}

	patch --version-control=none --no-backup-if-mismatch -p1 -i "$patch" "terraria/$file"
done
