import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext } from "react";
import { Col, Input, Label, Row } from "reactstrap";

export const ScheduleInput = ({ handleChange, data }) => {
  const { coursesNames } = useContext(GroupsContext);

  return (
    <Row>
      <Col>
        <CoursePicker
          courses={coursesNames}
          onChange={(e) => {
            handleChange({ ...data, course: e.target.value });
          }}
          className="schedule-input border"
        />
      </Col>
      <Col>
        <Label for="course">Время</Label>
        <Input
          id="course"
          onChange={(e) => {
            handleChange({ ...data, time: e.target.value });
          }}
          className="schedule-input border"
          type="time"
        />
      </Col>
    </Row>
  );
};
