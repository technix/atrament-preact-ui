import { h } from 'preact';
import style from './index.module.css';

const Table = ({columns = [], data = []}) => {
  return (
    <table class={style.table}>
      {columns.length > 0 && 
        <thead>
          {columns.map((th, i) => (<th key={i}>{th}</th>))}
        </thead>
      }
      {data.length > 0 && 
        <tbody>
          {data.map((tr, row) => (
            <tr key={row}>
              {tr.map((td, col) => <td key={col}>{td}</td>)}
            </tr>
          ))}
        </tbody>
      }
    </table>
  );
}

export default Table;
