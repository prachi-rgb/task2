import { useState } from 'react';
import './App.css';

function App() {
  const [formVal, setFormVal] = useState([{ name: '', email: '' }]);

  const addRow = () => {
    setFormVal([...formVal, { name: '', email: '' }]);
  };

  const onRemove = (i) => {
    const newForm = [...formVal];
    newForm.splice(i, 1);
    setFormVal(newForm);
  };

  const onHandle = (e, i) => {
    let newForm = [...formVal];
    newForm[i][e.target.name] = e.target.value;
    setFormVal(newForm);
  };

  const formValidation = (formVal) => {
    const data = [...formVal];
    for (let index = 0; index < data.length; index++) {
      if (data[index].name === '') {
        data[index].nameCheck = 'Name required';
      } else if (data[index].name.length < 10) {
        data[index].nameLengthCheck = 'Name should be greater than 10';
      } else {
        data[index].nameCheck = '';
        data[index].nameLengthCheck = '';
      }

      if (data[index].email === '') {
        data[index].emailCheck = 'Email required';
      } else {
        data[index].emailCheck = '';
      }
    }

    setFormVal(data); // Move this inside the function
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formValidation(formVal);
  };

  return (
    <div className="App">
      <div style={{ width: '60%', margin: '10px auto' }}>
        <form onSubmit={onSubmit}>
          {formVal.map((item, i) => (
            <div key={i}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={item.name || ''}
                onChange={(e) => onHandle(e, i)}
              />
              <div style={{ color: 'red' }}>
                {item.nameCheck}
                {item.nameLengthCheck}
              </div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={item.email || ''}
                onChange={(e) => onHandle(e, i)}
              />
              <div style={{ color: 'red' }}>{item.emailCheck}</div>
              {i !== 0 && (
                <button type="button" onClick={() => onRemove(i)}>
                  Remove Row
                </button>
              )}
            </div>
          ))}
          <div style={{ marginTop: '10px' }}>
            <button type="button" onClick={addRow}>
              Add Row
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
