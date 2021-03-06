import React, { Component } from "react";
import style from "styled-components";

const BlockStyled = style.div`
    width: 1rem;
    height: 1rem;
    padding: 1rem;
    border: 1px solid grey;
    display: inline-block;
    white-space: nowrap;
    background-color: ${({ clicked, flagged, containsBomb }) => {
      if (clicked) {
        if (containsBomb) {
          return "red";
        } else {
          return "white";
        }
      } else if (flagged) {
        return "purple";
      } else {
        return "black";
      }
    }};

    &:hover {
        cursor: ${({ clicked }) => (clicked ? "not-allowed" : "pointer")};
    }
`;

export class Block extends Component {
  constructor({ data }) {
    super();

    this.state = data;
  }

  render() {
    const {
      data: { value }
    } = this.props;
    const clickedLetter = this.state.containsBomb
      ? "B"
      : value > 0
        ? value
        : "";

    return (
      <BlockStyled
        onClick={e => this.handleClick(e)}
        onContextMenu={e => this.handleContextMenu(e)}
        {...this.state}
      >
        {this.state.clicked && clickedLetter}
        {this.state.flagged ? "F" : ""}
      </BlockStyled>
    );
  }

  handleContextMenu(e) {
    e.preventDefault();
    if (!this.state.clicked) {
      this.setState({
        flagged: !this.state.flagged
      });
    }
  }

  handleClick(e) {
    if (!this.state.clicked && !this.state.flagged) {
      this.props.onBoxClick({
        row: this.props.rowIndex,
        column: this.props.index,
        currentBox: this.props
      });
      this.setState({
        clicked: true
      });
    }
  }
}
