#! /usr/bin/env node

import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns";
import chalk from "chalk";

const response = await inquirer.prompt({
    type:"number",
    name : "userInput",
    message:"Enter the amount of second",
    validate : (input)=>{
        if(isNaN(input)){
            return "Please enter valid number.";
        }else if(input>60){
            return "Seconds must be in 60";
        }
        else{
            return true;
        }
    }
});

let input = response.userInput;

function StartTimer(second:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + second);
    const intervalTime = new Date(initialTime);
    setInterval((()=>{
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if(timeDiff<=0){
            console.log("Timer has expired");
            process.exit();
        }

        const minute = Math.floor((timeDiff%(3600*24))/3600);
        const seconds = Math.floor(timeDiff%60);
        console.log(`${chalk.bold.red(minute.toString().padStart(2, "0"))}:${chalk.bold.red(seconds.toString().padStart(2, "0"))}`);
    }),1000)
}

StartTimer(input);