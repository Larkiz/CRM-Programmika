import {
  StepConnector,
  stepConnectorClasses,
  styled,
  Typography,
} from "@mui/material";

export const MonthStepIcon = (props) => {
  const { completed, label } = props;

  return (
    <Typography
      sx={{
        backgroundColor: completed ? "#3a82d6" : "#dbdbdb",
        color: "#fff",
        width: 20,
        height: 20,
        padding: 5,
        fontSize: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        fontWeight: 500,
      }}
    >
      {label}
    </Typography>
  );
};

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 50,
    marginLeft: -15,
    zIndex: -1,
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#3a82d6",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#dbdbdb",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));
