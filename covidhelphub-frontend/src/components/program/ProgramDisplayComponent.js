const ProgramDisplayComponent = props => {
  return (
    <div>
      <h1>Program</h1>
      <h2>{props.location.name}</h2>
      <h2>Steps:</h2>
      <table>
        <tr>
          <td>Step 1</td>
        </tr>
        <tr>
          <td>Step 2</td>
        </tr>
      </table>
    </div>
  );
};

export default ProgramDisplayComponent;
