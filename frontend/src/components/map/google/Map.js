import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapRect from 'google-map-react';

const Wrapper = styled.main`
  height: 100%;
`;

const Map = ({ children, ...props }) => {
  // From the github, you need to wrap the map with a div
  // obviously we can use <Box> too
  return (
    <Wrapper>
      <GoogleMapRect {...props}>
        {children}
      </GoogleMapRect>
    </Wrapper>
  );
}

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Map.defaultProps = {
  children: null,
};

export default Map;