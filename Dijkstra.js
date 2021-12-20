let fs = require('fs');
let arg = process.argv;
let expression = fs.readFileSync(arg[2], 'utf8');
expression.toString();
let stack = new Array();
let out = '';

function Priority(x) {
	if (x == '+') return 0;
	if (x == '-') return 0;
	if (x == '*') return 1;
	if (x == '/') return 1;
	if (x == '^') return 2;
	
    return -1;
}

for (let i = 0; i < expression.length; i++) {
    if (expression[i] != ' ') {
		if (expression[i] == parseInt(expression[i])) {
            while (expression[i] == parseInt(expression[i])) {
				out += expression[i];
                i++;
            }
			i--;
			out += ' '; 
			continue;
		}
		switch (expression[i]) {
			case '(':
				stack.push('(');
				continue;
			case ')':
				if (stack.length == 0)
					console.log('error');
				while (stack[stack.length - 1] != '(')
                    out += stack.pop();
				stack.pop();
				continue;
		}
		if (Priority(expression[i]) > Priority(stack[stack.length - 1]))
			stack.push(expression[i]);
		else {
			while (Priority(expression[i]) <= Priority(stack[stack.length - 1]))
                out += stack.pop();
            stack.push(expression[i]);
		}
	}
}

while (stack.length) 
	out += stack.pop();

console.log(out);

for (let i = 0; i < out.length; i++) {
	if (out[i] == parseInt(out[i])){
		let s = '';
		while (out[i] == parseInt(out[i])){
			s += out[i];
			i++;
		}
		stack.push(parseInt(s));
	}else{
		let num2 = parseInt(stack.pop());
        let num1 = parseInt(stack.pop());
		switch (out[i]) {
			case '+':
				stack.push(num1 + num2);
				continue;
			case '-':
				stack.push(num1 - num2);
				continue;
			case '*':
				stack.push(num1 * num2);
				continue;
			case '/':
				if (num2 == 0)
					console.log('error - деление на ноль')
				else{
					stack.push(num1 / num2);
					continue;
				}
			case '^':
				stack.push((Math.pow(num1, num2)));
				continue;
		}
	}
}
for (let i = 0; i < expression.length; i++)
	expression = expression.replace('^','**');

console.log('eval: ' + eval(expression))
console.log('dijkstra: ' + stack.pop())