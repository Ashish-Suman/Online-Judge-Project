#!/bin/bash

lang=$1
RTE=0
CE=0


if [ $lang = "c" ]
then {
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
