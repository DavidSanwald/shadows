import React, { Component } from 'react';
import styled from 'styled-components'
import Tile from './Tile'

const MainWrapper = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  height: 80vmin;
  width:80vmin;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  `

const depths = Array.from(Array(22).keys());
console.log(depths)

class App extends Component {
  render() {
    return (
      <MainWrapper>
      {depths.map(zValue=><Tile z={(zValue+1).toString()} key={zValue} >{zValue}</Tile>)}
      </MainWrapper>

    );
  }
}

export default App;
