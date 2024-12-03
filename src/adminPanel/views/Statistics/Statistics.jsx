import {
  Box,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { authFetch } from "@/adminPanel/functions/authFetch";
import moment from "moment";
import { ucFirst } from "@/functions/uppercaseFirst";
import { numberIsNegative } from "@/functions/numberIsNegatibe";
import { MonthController } from "@/commonComponents/MonthController/MonthController";
import { monthFilterReducer } from "@/adminPanel/reducers/filters/monthFilterReducer";
import { numberWithDots } from "@/functions/numberWithDots";
import { ColorlibConnector, MonthStepIcon } from "./StepperComponents";

import ClassIcon from "@mui/icons-material/Class";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TourIcon from "@mui/icons-material/Tour";
import { DataGrid } from "@mui/x-data-grid";
import { filterData, studentsColumns } from "../Index/StudentsStats/options";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
import { CoursePicker } from "@/adminPanel/components/FormElements/CoursePicker";
import { FilterTypeSelector } from "@/adminPanel/views/Statistics/FilterTypeSelector";
import { StatCard } from "@/adminPanel/views/Statistics/StatCard";

const StepperSx = {
  flexWrap: "wrap",
  gap: 5,
  p: 2,
  pr: 0,
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
  fontSize: { xs: 35, sm: 70 },
  p: 1,
  m: 1,
  borderRadius: "0.5rem",
};

export const Statistics = () => {
  const [stats, setStats] = useState({ yearMonths: [] });

  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [onlyYear, setOnlyYear] = useState(true);

  const [activeStep, setActiveStep] = useState(
    stats.yearMonths.findLastIndex((month) => month !== 0)
  );

  useEffect(() => {
    let path = `${filterDate.year}`;
    if (!onlyYear) {
      path += `/${filterDate.month}`;
    }
    authFetch(`/finance/${path}`)
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
  }, [filterDate, onlyYear]);

  const [filter, setFilter] = useState({ name: "", course: "" });
  const {
    groups: { coursesNames },
  } = useContext(GroupsContext);

  return (
    <Container
      sx={{ marginBottom: 1, paddingLeft: "5px!important", mt: 3 }}
      maxWidth={false}
    >
      <FilterTypeSelector
        filterData={filterDate}
        onChange={setOnlyYear}
        onlyYear={onlyYear}
        sx={{ mt: 3, mb: 5 }}
      />
      {onlyYear && (
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
                          {!numberIsNegative(diff) && "+"}
                          {numberWithDots(diff)}
                          <i className="fa-solid fa-ruble-sign"></i>
                        </>
                      )}
                    </Typography>
                  )}

                  <StepLabel
                    StepIconComponent={(props) => (
                      <MonthStepIcon label={month.month} {...props} />
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
      )}

      <Stack sx={{ marginTop: 5, width: "100%" }} spacing={3}>
        <Stack
          spacing={1}
          justifyContent={{ xs: "space-between", sm: "normal" }}
          direction={"row"}
        >
          <StatCard
            icon={<ClassIcon sx={{ ...cardIconSx }} />}
            value={stats.totalLessons}
            sx={{ width: 340 }}
          >
            Уроков
          </StatCard>
          <StatCard
            icon={<HourglassDisabledIcon sx={{ ...cardIconSx }} />}
            value={stats.totalOmissions || 0}
            sx={{ width: 340 }}
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
            sx={{ width: { xs: "100%", lg: 340 } }}
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
            sx={{ width: { xs: "100%", lg: 340 } }}
          >
            Выручка
          </StatCard>
        </Stack>
      </Stack>
      <Box sx={{ pt: 3 }}>
        <Stack
          className="mb-3"
          sx={{ marginTop: 3, gap: 2, margin: 0 }}
          direction={"row"}
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
          sx={{ minHeight: 350, maxWidth: "100%", overflowX: "scroll", mt: 3 }}
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
        onlyYear={onlyYear}
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
