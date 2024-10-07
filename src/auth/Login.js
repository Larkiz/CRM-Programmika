import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

const Login = () => {
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  function auth(data) {
    fetch(`${process.env.REACT_APP_API_HOST_COMMON}/auth/login`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.token) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          if (data.rememberMe) {
            localStorage.setItem("token", resJson.token);
            localStorage.setItem("role", resJson.role);
          } else {
            sessionStorage.setItem("token", resJson.token);
            sessionStorage.setItem("role", resJson.role);
          }

          return navigate("/index");
        } else {
          toast.error(resJson.message);
        }
      });
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni  ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <input
                    name="username"
                    className="form-control"
                    {...register("login", { required: true })}
                    placeholder="Логин"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <input
                    className="form-control"
                    {...register("password", { required: true })}
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control  custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  {...register("rememberMe")}
                />
                <label
                  className=" custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span>Запомнить меня</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  onClick={handleSubmit((data) => {
                    auth(data);
                  })}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Войти
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
