import { numberIsNegative } from "@/functions/numberIsNegatibe";
import { numberWithDots } from "@/functions/numberWithDots";
import { Typography } from "@mui/material";

export const OperationCell = ({ name, amount, id, onClick, selectedId }) => {
  return (
    <tr
      style={{
        backgroundColor: selectedId === id ? "#e7e7e7" : "transparent",
      }}
      onClick={() => onClick(id)}
      height="65px"
    >
      <td style={{ fontSize: 16 }}>
        <Typography>{name}</Typography>
      </td>
      <td style={{ fontSize: 16, textAlign: "center" }}>
        <span className={numberIsNegative(amount) ? "red-text" : "green-text"}>
          <Typography>{numberWithDots(amount)}₽</Typography>
        </span>
      </td>
    </tr>
  );
};
