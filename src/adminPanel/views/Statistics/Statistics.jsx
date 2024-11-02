import {
  Box,
  Container,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { authFetch } from "../Index/functions/authFetch";
import moment from "moment";
import { ucFirst } from "functions/uppercaseFirst";
import { numberIsNegative } from "functions/numberIsNegatibe";
import { MonthController } from "commonComponents/MonthController/MonthController";
import { monthFilterReducer } from "adminPanel/reducers/filters/monthFilterReducer";
import { numberWithDots } from "functions/numberWithDots";
import { ColorlibConnector, MonthStepIcon } from "./StepperComponents";

import ClassIcon from "@mui/icons-material/Class";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TourIcon from "@mui/icons-material/Tour";
import { DataGrid } from "@mui/x-data-grid";
import { filterData, studentsColumns } from "../Index/StudentsStats/options";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";

const StepperSx = {
  flexWrap: "wrap",
  gap: 5,
  p: 2,
};

const ConnectorLabelSx = {
  position: "absolute",
  width: "100px",
  right: { xs: "55%", md: "75%" },

  top: { xs: -15, md: 5 },
  fontWeight: 500,
};

const cardIconSx = {
  backgroundColor: "#3a82d6",
  color: "#fff",
  fontSize: { xs: 50, sm: 70 },
  p: 1,
  m: 1,
  borderRadius: "0.5rem",
};

const StatCard = ({ children, value, icon, sx }) => {
  return (
    <Paper sx={{ maxWidth: 340, width: "100%", ...sx }} elevation={3}>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        {icon}

        <Stack sx={{ p: 2 }}>
          <Typography
            sx={{ color: "#939393" }}
            alignSelf={"end"}
            variant="subtitle2"
          >
            {children}
          </Typography>

          <Typography alignSelf={"end"} variant="h4">
            {value && value}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export const Statistics = () => {
  const [stats, setStats] = useState({ yearMonths: [] });
  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [activeStep, setActiveStep] = useState(
    stats.yearMonths.findLastIndex((month) => month !== 0)
  );
  useEffect(() => {
    authFetch(`/finance/${filterDate.year}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          yearMonths: data.yearMonths.map((item) => {
            item.month = ucFirst(moment(item.month, "MM").format("MMMM"));
            return item;
          }),
          ...data,
        });
        setActiveStep(
          data.yearMonths.findLastIndex((month) => month.amount !== 0) + 1
        );
      });
  }, [filterDate]);
  const [filter, setFilter] = useState({ name: "", course: "" });
  const { coursesNames } = useContext(GroupsContext);
  return (
    <Container
      sx={{ marginBottom: 1, paddingLeft: "5px!important" }}
      maxWidth={false}
    >
      <Typography className="mb-5" variant="h4">
        {filterDate.year} Год
      </Typography>
      <Stepper
        sx={StepperSx}
        connector={<ColorlibConnector />}
        alternativeLabel
        activeStep={activeStep}
      >
        {stats.yearMonths.length &&
          stats.yearMonths.map((month, key) => {
            const diff =
              key !== 0 && month.amount - stats.yearMonths[key - 1].amount;
            return (
              <Step key={key}>
                {key !== 0 && (
                  <Typography
                    sx={ConnectorLabelSx}
                    align="center"
                    className={
                      numberIsNegative(diff) ? "red-text" : "green-text"
                    }
                  >
                    {month.amount !== 0 && (
                      <>
                        {numberWithDots(diff)}
                        <i className="fa-solid fa-ruble-sign"></i>
                      </>
                    )}
                  </Typography>
                )}

                <StepLabel
                  StepIconComponent={(props) => (
                    <MonthStepIcon children={month.month} {...props} />
                  )}
                  sx={{
                    ".MuiStepLabel-label": {
                      color: "#000",
                      fontWeight: 500,
                    },
                  }}
                >
                  {month.amount !== 0 && (
                    <>
                      {numberWithDots(month.amount)}
                      <i className="fa-solid fa-ruble-sign"></i>
                    </>
                  )}
                </StepLabel>
              </Step>
            );
          })}
      </Stepper>
      <Stack sx={{ marginTop: 5 }} spacing={3}>
        <Stack sx={{ width: "100%" }} spacing={3} direction={"row"}>
          <StatCard
            icon={<ClassIcon sx={{ ...cardIconSx }} />}
            value={stats.totalLessons}
            sx={{ width: { xs: 170, sm: "100%" } }}
          >
            Уроков
          </StatCard>
          <StatCard
            icon={<HourglassDisabledIcon sx={{ ...cardIconSx }} />}
            value={stats.totalOmissions || 0}
            sx={{ width: { xs: 160, sm: "100%" } }}
          >
            Пропуски
          </StatCard>
        </Stack>
        <Stack
          sx={{ width: "100%" }}
          flexWrap={"wrap"}
          gap={3}
          direction={"row"}
        >
          <StatCard
            icon={<TourIcon sx={cardIconSx} />}
            value={stats.totalVisited}
          >
            Посещений
          </StatCard>
          <StatCard
            icon={<AccountBalanceIcon sx={cardIconSx} />}
            value={
              <div className="green-text">
                {stats.totalEarnings ? numberWithDots(stats.totalEarnings) : 0}
                <i className="fa-solid fa-ruble-sign"></i>
              </div>
            }
          >
            Выручка
          </StatCard>
        </Stack>
      </Stack>
      <Box sx={{ pt: 3 }}>
        <Stack
          className="mb-3"
          direction={"row"}
          style={{ gap: 20, margin: 0 }}
        >
          <TextField
            id="outlined-number"
            label="Имя"
            type="text"
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          {coursesNames && (
            <CoursePicker
              courses={coursesNames}
              value={filter.course}
              asFilter={true}
              onChange={(e) => {
                setFilter({ ...filter, course: e.target.value });
              }}
            />
          )}
        </Stack>
        <DataGrid
          className="mb-3"
          sx={{ minHeight: 350, maxWidth: "100%", overflowX: "scroll" }}
          rows={filterData(stats.studentsStats, filter)}
          columns={studentsColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <MonthController
        onlyYear
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
