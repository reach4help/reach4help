import React, { useState, useEffect } from 'react';
import StageService from '../../services/StageService';
import { StageModel } from '../../objectModel/StageModel';

const StageListComponent = () => {
  const [stages, setStages] = useState([] as StageModel[]);
  const [newStageCode, setNewStageCode] = useState('');
  const [stageCount, setStageCount] = useState(0);
  // forceUpdateCount used to update key of table row
  // If key is not changed, even though value of input field changes, React only refreshes
  // new rows or reduces number of rows, but does not update 
  const [forceUpdateCount, setForceUpdateCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const stages = await StageService.list();
      setStages(stages);
      setStageCount(stages.length);
    }
    getData();
  }, []);

  let StageLinks = {};

  StageLinks = stages.map((stage, i) => {
    return (
      <tr key={`item-${stage.code}-${i}=${forceUpdateCount}`}>
        <td>
          <input
            type="text"
            defaultValue={stage.code}
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

  function addStageToArray() {
    stages.push({ code: newStageCode });
    setStages(stages);
    setNewStageCode('');
    setStageCount(stages.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function deleteArrayRow(i: number) {
    stages.splice(i, 1);
    setStages(stages);
    setStageCount(stages.length);
    setForceUpdateCount(forceUpdateCount + 1);
  }

  function refreshNewStageCode(e: React.ChangeEvent<HTMLInputElement>) {
    setNewStageCode(e.target.value);
  }

  function revertStages() {
    async function getData() {
      const stages = await StageService.list();
      setStages(stages);
      setStageCount(stages.length);
      setForceUpdateCount(forceUpdateCount + 1);
    }
    getData();
  }

  function updateArrayRow(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    stages[i].code = e.target.value;
    setStages(stages);
  }

  async function saveStages() {
    await StageService.saveMany(stages);
  }

  return (
    <div>
      <p>Count: {stageCount}</p>
      <table className="">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{StageLinks}</tbody>
      </table>
      <hr />
      <div>
        <input
          key={`addnewstagevalue-${forceUpdateCount}`}
          aria-label={'Value for new stage'}
          type="text"
          defaultValue={newStageCode}
          onChange={e => refreshNewStageCode(e)}
        />
        <button onClick={addStageToArray}>Add Item</button>
      </div>
      <br />
      <button onClick={saveStages}>Save</button>
      <button onClick={revertStages}>Revert</button>
    </div>
  );
};

export default StageListComponent;
