import { Box, Button } from "@mui/material";
import moment from "moment";

export const FilterTypeSelector = ({ onlyYear, filterData, onChange, sx }) => {
  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Box className="mask-box">
        <Box
          className="mask"
          sx={{
            transform: `translateX(${onlyYear ? 0 : "160px"})`,
          }}
        />
        <Button
          disableRipple
          variant="text"
          sx={{ color: onlyYear ? "#ffffff" : "#939393", fontSize: 25 }}
          onClick={() => onChange(true)}
        >
          {filterData.year}
        </Button>
        <Button
          disableRipple
          variant="text"
          sx={{ color: !onlyYear ? "#ffffff" : "#939393", fontSize: 25 }}
          onClick={() => onChange(false)}
        >
          {moment(`${filterData.year}.${filterData.month}`, "YYYY.MM").format(
            "MMMM"
          )}
        </Button>
      </Box>
    </Box>
  );
};
