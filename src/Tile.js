import React, { Component } from 'react';
import styled from 'styled-components';
import elevate from './elevator'

const Tile = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  color: grey;
width: 100px;
height: 100px;
margin:20px;
  ${props=>elevate(props.z)};
`;

export default Tile;
