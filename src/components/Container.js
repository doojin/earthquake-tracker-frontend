import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container as BootstrapContainer, Row } from "react-bootstrap";
import './Container.css';

const ColumnType = PropTypes.shape({
  size: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}).isRequired;

Container.propTypes = {
  leftColumn: ColumnType,
  rightColumn: ColumnType
};

export default function Container(props) {
  return (
    <BootstrapContainer fluid className="Container">
      <Row className="ContainerRow">
        <Col xs={ props.leftColumn.size }>{ props.leftColumn.children }</Col>
        <Col xs={ props.rightColumn.size }>{ props.rightColumn.children }</Col>
      </Row>
    </BootstrapContainer>
  );
}
