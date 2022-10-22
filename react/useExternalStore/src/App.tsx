import { createStore, initialState } from './createStore';
import './App.css';

const { Provider, useStore } = createStore(initialState);

type Field = keyof typeof initialState;

function Display({ field }: { field: Field }) {
  const [value] = useStore((store) => store[field]);

  return (
    <div>
      {field}: {value}
    </div>
  );
}

function Input({ field }: { field: Field }) {
  const [value, setStore] = useStore((store) => store[field]);

  return (
    <div>
      {field}
      {': '}
      <input
        value={value}
        onChange={(event) => setStore({ [field]: event?.target.value })}
      />
    </div>
  );
}

function App() {
  return (
    <Provider>
      <div className="app">
        <div className="foo">
          <Input field="firstName" />
          <Input field="lastName" />
        </div>

        <div className="foo">
          <Display field="firstName" />
          <Display field="lastName" />
        </div>
      </div>
    </Provider>
  );
}

export default App;
