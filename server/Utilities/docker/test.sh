#!/bin/bash

initMem=5
time=6
memory=10
k=10

res=`echo $time + $memory | bc`
echo res $res
# echo ${res}
let "time *= 1000"
let "memory = memory/1 - initMem/1"
let "a = k + $1"
let "bool = k <= 1"

echo a $a
echo time $time
echo memory $memory

echo -n "Enter a number: "
read VAR

if [[ $VAR -gt 10 ]]
then
  echo "The variable is greater than 10."
elif [[ $VAR -eq 10 ]]
then
  echo "The variable is equal to 10."
else
  echo "The variable is less than 10."
fi

memDiff=-5
if [[ $memDiff -le 0 ]]
then
    echo "MLE"
fi 
