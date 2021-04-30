import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const ProgramCreateComponent = () => {
    const [name, setName] = useState('');
    const [steps, setSteps] = useState(new Array(6).fill(""));
    const [html, setHtml] = useState([])
    const history = useHistory();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else {


            const attributeName = e.target.name;
            const pos = "step".length;
            const stepNumber = Number(attributeName.substr(pos));
            if (e.target.value.includes("xx")) {
                steps[stepNumber - 1] = steps[stepNumber];
                steps[stepNumber] = e.target.value;

            } else {
                steps[stepNumber - 1] = e.target.value;
            }
            setSteps(steps);
            console.log('steps', steps);
            const stepInputs = steps.map((step, index) =>
            (<label>{`Step ${index + 1}`}
                <input
                    id={`step${index + 1}`}
                    defaultValue={steps[index]}
                    onChange={e => handleChange(e)}
                    type="text"
                    name={`step${index + 1}`}
                />
            </label>));
        }
    };
    console.log('steps', steps);
    const stepInputs = steps.map((step, index) =>
    (<label>{`Step ${index + 1}`}
        <input
            id={`step${index + 1}`}
            defaultValue={steps[index]}
            onChange={e => handleChange(e)}
            type="text"
            name={`step${index + 1}`}
        />
    </label>));
    setHtml(stepInputs);
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name })
                    };
                    fetch('http://localhost:8080/program/create', requestOptions)
                        .then(res => {
                            return res.json();
                        }
                        )
                        .then(json => {

                            if (json.err) {
                                // do something
                            }
                            else {
                                history.push('/program/list')
                            }
                        })
                        .catch(err => {
                            alert(`catch ${err}`);
                        }

                        );

                }}
            >
                <div className="form-control">
                    <label>
                        Name
                        <input
                            defaultValue={name}
                            onChange={e => handleChange(e)}
                            type="text"
                            name="name"
                        />
                    </label>
                    {stepInputs}
                    {/* <label>Step 1
            <input
              id="step1"
              defaultValue={steps[0]}
              onChange={e => handleChange(e)}
              type="text"
              name="step1"
            />
          </label>
          <label>Step 2 */}
                    {/* <input
              defaultValue={steps[1]}
              id="step2"
              onChange={e => handleChange(e)}
              type="text"
              name="step2"
            />
          </label> */}
                </div>
                <input type="submit" value="Save" />
                <Link className="list-btn" to="/program/list">
                    <button>Cancel</button>
                </Link>
            </form>
        </div>
    );
};
export default ProgramCreateComponent;
