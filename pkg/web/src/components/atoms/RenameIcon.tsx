import styled from 'styled-components'
export const Rename = styled.i`
  & {
    box-sizing: border-box;
    position: relative;
    display: block;
    width: 20px;
    height: 16px;
    transform: scale(var(--ggs, 1));
    background: linear-gradient(to left, currentColor 22px, transparent 0) no-repeat 6px center/2px
      22px;
  }
  &::after,
  &::before {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 12px;
    border: 2px solid;
    top: 2px;
  }
  &::before {
    border-right: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &::after {
    width: 10px;
    border-left: 0;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    right: 0;
  }
`
