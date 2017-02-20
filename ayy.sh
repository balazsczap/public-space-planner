if [ -n "$ find $1 -maxdepth 5 -iname project.json )" ]; then
	echo "ayyaa" && exit 0
fi
