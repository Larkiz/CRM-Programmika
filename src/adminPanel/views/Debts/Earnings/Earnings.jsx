import { Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";

export const Earnings = ({ chartEarningsData, chartDebtsData, options }) => {
  return (
    <Row className="justify-content-around ">
      <Col style={{ maxWidth: 650 }} className="mt-4 mb-3">
        <h2>Доход </h2>

        {chartEarningsData && (
          <Bar data={chartEarningsData} options={options} />
        )}
      </Col>

      <Col style={{ maxWidth: 650 }} className="mt-4 mb-3">
        <h2>Не оплачено</h2>

        {chartDebtsData && <Bar data={chartDebtsData} options={options} />}
      </Col>
    </Row>
  );
};
