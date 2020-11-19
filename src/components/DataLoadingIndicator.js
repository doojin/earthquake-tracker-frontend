import ReactDOM from 'react-dom';
import React from 'react';
import {Spin} from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import {hasActiveRequests} from '../store/slices/requestsSlice';
import {useSelector} from 'react-redux';
import './DataLoadingIndicator.less';

export default function DataLoadingIndicator() {
  const hasRequestsInProgress = useSelector(hasActiveRequests);

  const requestInProgressWidget = (
    <div className="DataLoadingIndicator">
      <div className="popup">
        <Spin size="large"/>
        <div className="loadingText">
          We're loading your data
          <HeartTwoTone twoToneColor="#b35d5d"/>
        </div>
      </div>
    </div>
  );

  const widget = hasRequestsInProgress ? requestInProgressWidget : null;

  return ReactDOM.createPortal(widget, document.querySelector('body'));
}
