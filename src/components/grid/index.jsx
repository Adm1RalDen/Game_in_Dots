import React from "react";
import { inject, observer } from "mobx-react";
import { Col, Row } from "antd";
import "./Grid.css";

const Grid = props => {
  const handleClickToCell = event => {
    let arr = event.target.attributes.class.nodeValue
      .toString()
      .split(" ")
      .reverse()[0]
      .split("/");
    if (arr.length == 2) {
      let [i, j] = arr

      if (props.Store.isPlay) {
        let arr = props.Store.grid;
        if (arr[+i][+j].classColor === "blue-cell") {
          arr[+i][+j].classColor = "green-cell";
          props.Store.setGrid(arr);
        }
      }
    }
  };
  return (
    <div className="grid-container">
      {Object.keys(props.Store.grid).length ? (
        <div className="grid-div" onClick={handleClickToCell}>
          {props.Store.grid.map((row, index) => {
            return (
              <Row type="flex" justufy="center" key={index}>
                {row.map((cell, j) => {
                  return (
                    <Col
                      key={j}
                      className={`cell-in-row ${cell.classColor} ${index + '/' + j}`}
                    />
                  );
                })}
              </Row>
            );
          })}
        </div>
      ) : (
        <div>Please pick game mode</div>
      )}
    </div>
  );
};
const grid = inject("Store")(observer(Grid));
export default grid;
// onClick={() => handleClickToCell(index, j)}
