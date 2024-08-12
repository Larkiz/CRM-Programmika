import { Button, Col, Row } from "reactstrap";

const colStyle = { width: "75px" };

export const TablePagination = ({
  prevPage,
  nextPage,
  page,
  length,
  start,
  end,
  perPage,
}) => {
  const maxPage = Math.ceil(length / perPage);
  return (
    <Row
      style={{ margin: 0, width: "350px" }}
      className="align-items-center d-inline-flex "
    >
      <Col style={{ color: "#383838" }}>
        {start}-{page === maxPage ? length : end} из {length}
      </Col>
      <Col style={{ ...colStyle }}>
        {page > 1 && <Button onClick={prevPage}>Назад</Button>}
      </Col>
      <Col style={{ color: "#383838" }}>
        {page} из {maxPage}
      </Col>
      <Col style={{ ...colStyle }}>
        {page !== maxPage && <Button onClick={nextPage}>Далее</Button>}
      </Col>
    </Row>
  );
};
