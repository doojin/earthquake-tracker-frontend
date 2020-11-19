import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container as BootstrapContainer, Row} from "react-bootstrap";
import './Container.less';

const ColumnType = PropTypes.shape({
  size: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}).isRequired;

Container.propTypes = {
  leftColumn: ColumnType,
  rightColumn: ColumnType
};

export default function Container(props) {
  return (
    <BootstrapContainer fluid className="Container">
      <Row className="ContainerRow">
        <Col className={props.leftColumn.className} xs={props.leftColumn.size}>
          {props.leftColumn.children}
        </Col>

        <Col className={props.rightColumn.className} xs={props.rightColumn.size}>
          {props.rightColumn.children}
        </Col>
      </Row>
    </BootstrapContainer>
  );
}
