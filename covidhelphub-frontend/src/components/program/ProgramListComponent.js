import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../AppContext';

const DynamicTable = () => {
  const { listPrograms } = useAppContext();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function getData() {
      const programs = listPrograms();
      setPrograms(programs);
    }
    getData();
  }, [programs]);

  const ProgramLinks = programs.map(program => (
    <tr>
      <td>{program.code}</td>
    </tr>
  ));

  // updateMessage(event) {
  //   this.setState({
  //     message: event.target.value,
  //   });
  // }

  // handleClick() {
  //   var items = this.state.items;

  //   items.push(this.state.message);

  //   this.setState({
  //     items: items,
  //     message: '',
  //   });
  // }

  // handleItemChanged(i, event) {
  //   var items = this.state.items;
  //   items[i] = event.target.value;

  //   this.setState({
  //     items: items,
  //   });
  // }

  // handleItemDeleted(i) {
  //   var items = this.state.items;

  //   items.splice(i, 1);

  //   this.setState({
  //     items: items,
  //   });
  // }

  // renderRows() {
  //   var context = this;

  //   return this.state.items.map(function(o, i) {
  //     return (
  //       <tr key={'item-' + i}>
  //         <td>
  //           <input
  //             type="text"
  //             value={o}
  //             // onChange={context.handleItemChanged.bind(context, i)}
  //           />
  //         </td>
  //         <td>
  //           <button
  //           // onClick={context.handleItemDeleted.bind(context, i)}
  //           >
  //             Delete
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }

  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Item</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ProgramLinks}</tbody> */}
      </table>
      <hr />
      <input
        type="text"
        defaultValue=""
        // onChange={this.updateMessage.bind(this)}
      />
      <button
      //onClick={this.handleClick.bind(this)}
      >
        Add Item
      </button>
    </div>
  );
};

export default DynamicTable;
