import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
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
    <div className="Container">
      <Row className="ContainerRow">
        <Col className={props.leftColumn.className} span={props.leftColumn.size}>
          {props.leftColumn.children}
        </Col>

        <Col className={props.rightColumn.className} span={props.rightColumn.size}>
          {props.rightColumn.children}
        </Col>
      </Row>
    </div>
  );
}
