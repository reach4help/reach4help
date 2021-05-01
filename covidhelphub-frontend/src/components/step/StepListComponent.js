import React, { useState, useEffect } from 'react';
import StepService from '../../services/StepService';

const StepListComponent = () => {
  const [steps, setSteps] = useState([]);
  const [newStepCode, setNewStepCode] = useState('');
  const [stepCount, setStepCount] = useState(0);
  const [forceUpdateTime, setForceUpdateTime] = useState(new Date());
  const [forceAddCount, setForceAddCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const steps = await StepService.list();
      setSteps(steps);
      setStepCount(steps.length);
    }
    getData();
  }, []);

  let StepLinks = {};

  StepLinks = steps.map((step, i) => {
    const dateString = new Date().toISOString();
    return (
      <tr key={`item-${step.code}-${i}=${dateString}`}>
        <td>
          <input
            type="text"
            defaultValue={step.code}
            onChange={e => updateArrayRow(e, i)}
          />
        </td>
        <td>
          <button onClick={e => deleteArrayRow(i)}>Delete</button>
        </td>
      </tr>
    );
  });
  // }

  function addStepToArray() {
    steps.push({ code: newStepCode });
    setSteps(steps);
    setNewStepCode('');
    setStepCount(steps.length);
    setForceUpdateTime(forceUpdateTime + 1);
    setForceAddCount(forceAddCount + 1);
  }

  function deleteArrayRow(i) {
    steps.splice(i, 1);
    setSteps(steps);
    setStepCount(steps.length);
    setForceUpdateTime(forceUpdateTime + 1);
  }

  function refreshNewStepCode(e) {
    setNewStepCode(e.target.value);
  }

  function revertSteps() {
    async function getData() {
      const steps = await StepService.list();
      setSteps(steps);
      setStepCount(steps.length);
      setForceUpdateTime(forceUpdateTime + 1);
    }
    getData();
  }

  function updateArrayRow(e, i) {
    steps[i].code = e.target.value;
    setSteps(steps);
  }

  async function saveSteps() {
    await StepService.saveMany(steps);
  }

  return (
    <div>
      <p>Count: {stepCount}</p>
      <table className="">
        <thead>
          <tr>
            <th>Step</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{StepLinks}</tbody>
      </table>
      <hr />
      <div>
        <input
          key={`addnewstepvalue-${forceAddCount}`}
          aria-label={'Value for new step'}
          type="text"
          defaultValue={newStepCode}
          onChange={e => refreshNewStepCode(e)}
        />
        <button onClick={addStepToArray}>Add Item</button>
      </div>
      <br />
      <button onClick={saveSteps}>Save</button>
      <button onClick={revertSteps}>Revert</button>
    </div>
  );
};

export default StepListComponent;
