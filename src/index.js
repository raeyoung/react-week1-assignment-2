/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function defaultFunction(x, y) {
  return x || y;
}

function caculate(operator, accumulator, number) {
  return (operatorFunctions[operator] || defaultFunction)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: 0,
  operator: '',
};

function render({ accumulator, number, operator }) {
  const handleClickNumber = (value) => {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  };

  const handleClickOperator = (value) => {
    render({
      accumulator: caculate(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  };

  const handleClickReset = () => {
    render(initialState);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      {/* 기존 값을 보여주거나 누른 값을 보여줌 */}
      <p>{number || accumulator}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 9, 0].map((i) => (
          <button type='button' onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button type='button' onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        <button type='button' onClick={handleClickReset}>
          Reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
