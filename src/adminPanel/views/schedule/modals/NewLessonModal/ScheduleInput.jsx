import { CoursePicker } from "adminPanel/components/CoursePicker/CoursePicker";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext } from "react";
import { Col, Input, Label, Row } from "reactstrap";

export const ScheduleInput = ({ handleChange, data }) => {
  const { coursesNames } = useContext(GroupsContext);

  return (
    <Row>
      <Col md={5}>
        <CoursePicker
          courses={coursesNames}
          onChange={(e) => {
            handleChange({ ...data, course: e.target.value });
          }}
          className="schedule-input border"
        />
      </Col>
      <Col md={5}>
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
