import { Col, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";

export const Earnings = ({ chartEarningsData, chartDebtsData, options }) => {
  return (
    <Row>
      <Col className="mt-4 mb-3">
        <h2>Выручка </h2>

        {chartEarningsData && (
          <Bar data={chartEarningsData} options={options} />
        )}
      </Col>

      <Col className="mt-4 mb-3">
        <h2>Не оплачено</h2>

        {chartDebtsData && <Bar data={chartDebtsData} options={options} />}
      </Col>
    </Row>
  );
};
