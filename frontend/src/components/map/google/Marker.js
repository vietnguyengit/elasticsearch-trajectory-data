
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background-color: Chocolate;
  border: 2px solid #fff;
  user-select: all;
  opacity: 0.2;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = (props) => {

    const handleDragEnd = (t, map, coord) => {
        console.log(coord)
    }

    return (
        <Wrapper
            alt='Drag to move the area box'
            draggable={true}
            onDragEnd={handleDragEnd}
        />);
};

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default Marker;