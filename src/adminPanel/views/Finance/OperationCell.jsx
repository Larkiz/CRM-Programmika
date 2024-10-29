import { numberIsNegative } from "functions/numberIsNegatibe";

export const OperationCell = ({ name, amount, id, onClick, selectedId }) => {
  return (
    <tr
      style={{
        backgroundColor: selectedId === id ? "#e7e7e7" : "transparent",
      }}
      onClick={() => onClick(id)}
      height="65px"
    >
      <td style={{ fontSize: 16 }}>{name}</td>
      <td style={{ fontSize: 16, textAlign: "center" }}>
        <span className={numberIsNegative(amount) ? "red-text" : "green-text"}>
          {amount}₽
        </span>
      </td>
    </tr>
  );
};
