import moment from 'moment';

const addSearchParam = (searchParams, name, value) => {
  if (value !== null && value !== undefined) {
    searchParams.append(name, value);
  }
};

export const getEarthquakes = async ({
  limit,
  minMagnitude,
  maxMagnitude,
  startDateTime,
  endDateTime,
  minDepth,
  maxDepth
}) => {
  const searchParams = new URLSearchParams();
  addSearchParam(searchParams, 'limit', limit);
  addSearchParam(searchParams, 'minMagnitude', minMagnitude);
  addSearchParam(searchParams, 'maxMagnitude', maxMagnitude);
  addSearchParam(searchParams, 'startTime', (startDateTime && moment(startDateTime).format()));
  addSearchParam(searchParams, 'endTime', (endDateTime && moment(endDateTime).format()));
  addSearchParam(searchParams, 'minDepth', minDepth);
  addSearchParam(searchParams, 'maxDepth', maxDepth);

  const search = searchParams.toString();
  const url = search ? `/earthquakes?${search}` : '/earthquakes';

  const response = await fetch(url);
  const json = await response.json();
  return json.data;
};
