import { useEffect, useState } from "react";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";

export const UserIndex = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST_COMMON}/api/account`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <Container fluid>
      <h1>Личный кабинет</h1>
      {profile && (
        <div className="profile">
          <Row>
            <Col>
              <FormGroup>
                <Label for="first_name">Имя</Label>
                <div className="profile-el" id="first_name">
                  {profile.first_name || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="last_name">Фамилия</Label>
                <div className="profile-el" id="last_name">
                  {profile.last_name || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
          </Row>

          {profile.courses.map((course, key) => {
            return (
              <Row key={key}>
                <Col>
                  <FormGroup>
                    <Label for="course">Курс</Label>
                    <div className="profile-el" id="course">
                      {course.course || "Неизвестно"}
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            );
          })}

          <Row>
            <Col>
              <FormGroup>
                <Label for="phone_number">Номер телефона</Label>
                <div className="profile-el" id="phone_number">
                  {profile.phone_number || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="parent_phone">Тел. родитилей</Label>
                <div className="profile-el" id="parent_phone">
                  {profile.parent_phone || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="city">Город</Label>
                <div className="profile-el" id="city">
                  {profile.city || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="birthday">Дата рождения</Label>
                <div className="profile-el" id="birthday">
                  {profile.birthday || "Неизвестно"}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};
