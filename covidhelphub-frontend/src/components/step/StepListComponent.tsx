import React, { useState, useEffect } from 'react';
import StepService from '../../services/StepService';
import { Step } from '../../objectModel/Step';

const StepListComponent = () => {
  const [steps, setSteps] = useState([] as Step[]);
  const [newStepCode, setNewStepCode] = useState('');
  const [stepCount, setStepCount] = useState(0);
  const [forceUpdateCount, setForceUpdateCount] = useState(0);

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
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function deleteArrayRow(i: number) {
    steps.splice(i, 1);
    setSteps(steps);
    setStepCount(steps.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function refreshNewStepCode(e: React.ChangeEvent<HTMLInputElement>) {
    setNewStepCode(e.target.value);
  }

  function revertSteps() {
    async function getData() {
      const steps = await StepService.list();
      setSteps(steps);
      setStepCount(steps.length);
      setForceUpdateCount(forceUpdateCount + 1);
    }
    getData();
  }

  function updateArrayRow(e: React.ChangeEvent<HTMLInputElement>, i: number) {
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
          key={`addnewstepvalue-${forceUpdateCount}`}
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
