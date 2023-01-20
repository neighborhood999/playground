import { createSignal, createEffect } from 'solid-js';
import style from './App.module.css';

export function App() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 1000);

  createEffect(() => {
    console.log('The count is now', count());
  });

  return (
    <div class={style.container}>
      <p class={style.counter}>Current count: {count()}</p>
      <button onClick={() => setCount(c => c + 9)}>+9</button>
    </div>
  );
}