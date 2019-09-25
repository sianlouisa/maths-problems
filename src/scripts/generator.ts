
const generateNumber = () => {
  return Math.floor(Math.random() * 21).toString();
}

const generateProblemType = () => {
  let result = '';
  const types = '+-';
  result += types.charAt(Math.floor(Math.random() * types.length));
  return result;
}

export const calculateProblem = (problem: string) => {
  return eval(problem);
}

export const generateMathsProblem = () => {
  let problem = '';
  const firstNum = generateNumber();
  const secondNum = generateNumber();
  if (+firstNum <= +secondNum) {
    problem = `${secondNum} ${generateProblemType()} ${firstNum}`;
  } else {
    problem = `${firstNum} ${generateProblemType()} ${secondNum}`;
  }
  return problem;
}