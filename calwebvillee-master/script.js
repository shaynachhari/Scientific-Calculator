// function for inserting characters, numbers, and operators inside div of Html 
function insert(value){
    if (expression.innerHTML.slice(-1) == "/" && value == "/") {
        // doing nothing 
    } else {
        expression.innerHTML += value;
    }
}

// this is the main function which will be invoked when we press equal button
// this will take expression as an argument
function resultant(expression){
    // required variables and array
    let expressionElements = expression.split("");
    console.log("expressionEle", expressionElements);
    let result;
    let finalExpression;
    
    // loop working on each character of expression array for identifying or manupulating 
    for (let i = 0; i < expressionElements.length; i++) {
        const element = expressionElements[i];

        // checking for * before small bracket if not found then injecting
        if (element == "(" && i > 0) {
            if (expressionElements[i-1] == "+" || expressionElements[i-1] == "-" || expressionElements[i-1] == "*" || expressionElements[i-1] == "/" || expressionElements[i-1] == "(" || expressionElements[i-3] == "s" || expressionElements[i-3] == "t" || expressionElements[i-3] == "c" || expressionElements[i-3] == "*s" ||expressionElements[i-3] == "*c" || expressionElements[i-3] == "*t" || expressionElements[i-1] == ")*") {
                continue;            
            }
            else{
                expressionElements[i] = "*(";
            }
        }

        // checking for * after small bracket if not found then injecting
        if (element == ")" && i < expressionElements.length - 1) {
            if (expressionElements[i+1] == "+" || expressionElements[i+1] == "-" || expressionElements[i+1] == "*" || expressionElements[i+1] == "/" || expressionElements[i+1] == ")"){
                continue;
            }
            else{
                expressionElements[i] = ")*";
            }
        }

        // checking for * before trignometric functions if not found then injecting
        if ((element == "s" || element == "c" || element == "t") && i > 0) {
            if (expressionElements[i-1] == "+" || expressionElements[i-1] == "-" || expressionElements[i-1] == "*" || expressionElements[i-1] == "/" || expressionElements[i-1] == "(" || expressionElements[i-1] == "*("){
                continue;
            }
            else{
                if (element == "s" && expressionElements[i-1] != "o" && expressionElements[i-2] != "r")  {
                    expressionElements[i] = "*s";
                }
                else if (element == "c"){
                    expressionElements[i] = "*c";
                }
                else if (element == "t"){
                    expressionElements[i] = "*t";
                }
            }
        }
    }
    console.log(expressionElements);

    // checking for degree mode is on or off 
    if (degreeCheck.checked) {
        finalExpression = expressionElements.join("").replace(/π/g, "Math.PI").replace(/sin\(/g, "Math.sin((Math.PI/180)*").replace(/cos\(/g, "Math.cos((Math.PI/180)*").replace(/tan\(/g, "Math.tan((Math.PI/180)*");
        finalExpression = finalExpression.replace(/reMath.sin\(\(Math.PI\/180\)\*/g, "resin(")
        console.log(finalExpression);
    }
    else{
        finalExpression = expressionElements.join("").replace(/π/g, "Math.PI").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/reMath.sin/g, "resin");
    }

    console.log(finalExpression);

    try {
        // calculating the expression
        result = eval(finalExpression)
        // injecting final result into html display div
        total.innerHTML = Math.round(result * 100000000000) / 100000000000;
    } catch (error) {
        // injecting css
        total.innerHTML = "error";
        total.style.color = "red";
        displayBox.style.border = "1px solid red";
        displayBox.style.backgroundColor = "#ffc3c3";
        console.log(error);
    }

}


// function for clearing the screen
function allClear(){
    total.innerHTML = "";
    expression.innerHTML = "";

    // resetting the css 
    total.style.color = "initial";
    displayBox.style.border = "1px solid gray";
    displayBox.style.backgroundColor = "#e0ffdf";
    
}

// function for poping out last entity from display screen 
function clean(exp){
    let updatedExpression = exp.substr(0, exp.length - 1)
    expression.innerHTML = updatedExpression;
}

// function that takes value and return in the multiple of 392.9. this also named as resin.
function resin(value){
    return value * 392.9;
}