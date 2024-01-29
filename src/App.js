import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [sum, setSum] = useState(null);

  let worker = null;

  const calculateSum = () => {
    if (worker) {
      worker.terminate();
    }

    worker = new Worker(`myWorker.js`);

    worker.onmessage = (event) => {
      setSum(event.data);
      worker.terminate();
    };

    worker.postMessage({ numbers });
  };

  return (
    <>
      <h1>Sum Calculator</h1>
      <p>Numbers: {numbers.join(', ')}</p>
      <button onClick={calculateSum}>Calculate Sum</button>
      {sum !== null && <p>Sum: {sum}</p>}

<div></div>
    </>
  );
};

export default App;