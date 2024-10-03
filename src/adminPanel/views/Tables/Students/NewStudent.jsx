import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, FormGroup, Row } from "reactstrap";

export const NewStudent = ({ onSubmit }) => {
  const { coursesNames } = useContext(GroupsContext);

  const { register, handleSubmit } = useForm();
  return (
    <Container fluid>
      <Row>
        <FormElement
          md={3}
          id={"first_name"}
          register={{ ...register("first_name", { required: true }) }}
        >
          Имя
        </FormElement>
        <FormElement
          md={3}
          id={"last_name"}
          register={{ ...register("last_name", { required: true }) }}
        >
          Фамилия
        </FormElement>
      </Row>
      <Row>
        <Col md={3}>
          <FormGroup>
            <CoursePicker
              courses={coursesNames}
              register={{ ...register("course", { required: true }) }}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <FormElement
          md={3}
          id={"phone_number"}
          register={{ ...register("phone_number") }}
        >
          Номер телефона
        </FormElement>
        <FormElement
          md={3}
          id={"parent_phone"}
          register={{ ...register("parent_phone") }}
        >
          Тел. родитилей
        </FormElement>
      </Row>
      <Row>
        <FormElement md={3} id={"city"} register={{ ...register("city") }}>
          Город
        </FormElement>
        <FormElement
          md={3}
          id={"birthday"}
          register={{ ...register("birthday") }}
        >
          Дата рождения
        </FormElement>
      </Row>

      <Button onClick={handleSubmit((data) => onSubmit(data))}>Добавить</Button>
    </Container>
  );
};
