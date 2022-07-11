#!/bin/bash

lang=$1
RTE=0
CE=0

echo Start

cat testcase.txt

echo 1 $1
echo 2 $2
echo 3 $3
echo 4 $4
echo 5 $5

memArr=(3500 7500 95000 19000)
initMem=0

if [ $lang = "c" ]
then {
        initMem=${memArr[0]}
        gcc -o solution solution.c &> $2 && {
            {
                ./solution < testcase.txt &> $2    
            } || {
                RTE=1        
            }
        }
    } || {
        CE=1
    } 
elif [ $lang = "cpp" ]
then {
        initMem=${memArr[1]}
        g++ -o solution solution.cpp &> $2 && {
            {
                ./solution < testcase.txt &> $2
            } || {
                RTE=1  
            }
        }
    } || {
        CE=1
    }
fi  

if [[ $CE -eq 1 ]]
then
    echo "COMPILATION ERROR" >> $2
fi

if [[ $RTE -eq 1 ]]
then
    echo "RUNTIME ERROR" >> $2
fi

echo time $time
echo memory $memory

echo -e "\n$time" >> $3
echo $memory >> $3
