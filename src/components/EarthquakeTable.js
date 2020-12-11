import React, {useRef} from 'react';
import {Table, Input} from 'antd';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getAllEarthquakes} from '../store/slices/earthquakesSlice';
import Magnitude from './Magnitude';
import RelativeDate from './RelativeDate';
import './EarthquakeTable.less';

export default function EarthquakeTable() {
  const {t} = useTranslation('translation');
  const earthquakes = useSelector(getAllEarthquakes);
  const searchBoxRef = useRef(null);

  const columns = [
    {
      title: t('title'),
      dataIndex: 'title',
      width: '30%',
      sorter: (eq1, eq2) => eq1.title.localeCompare(eq2.title),
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchBoxRef.current && searchBoxRef.current.select(), 100);
        }
      },
      filterDropdown: ({setSelectedKeys, confirm}) => (
        <div className="TextFilter">
          <Input.Search ref={node => searchBoxRef.current = node}
                        onChange={e => setSelectedKeys([e.target.value])}
                        onSearch={() => confirm()}/>
        </div>
      )
    },
    {
      title: t('magnitude'),
      width: '120px',
      sorter: (eq1, eq2) => eq1.magnitude - eq2.magnitude,
      render: (text, record) => <Magnitude magnitude={record.magnitude} toFixed={1}/>
    },
    {
      title: t('depth'),
      width: '150px',
      sorter: (eq1, eq2) => eq1.position.depth - eq2.position.depth,
      render: (text, record) => {
        const depth = record.position.depth.toFixed(0);
        return `${depth} ${t('km')}`;
      }
    },
    {
      title: t('latitude.longitude'),
      render: (text, record) => {
        const {latitude, longitude} = record.position;
        const [latitudeFormatted, longitudeFormatted] = [latitude, longitude].map(coord => coord.toFixed(1));
        return `${latitudeFormatted} / ${longitudeFormatted}`;
      }
    },
    {
      title: t('when'),
      dataIndex: 'timestamp',
      sorter: (eq1, eq2) => eq1.timestamp - eq2.timestamp,
      render: timestamp => <RelativeDate timestamp={timestamp} />
    }
  ];

  return <Table className="EarthquakeTable"
                columns={columns}
                dataSource={earthquakes.map(eq => ({...eq, key: eq.id}))}
                pagination={false}
                scroll={{y: '100%'}}/>;
}
