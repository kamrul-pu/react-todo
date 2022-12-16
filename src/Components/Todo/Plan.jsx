import React from "react";

const Plan = props => {
    return (
        <div className="row">
            <li className="shadow p-2 my-2 col-sm-9">{props.item}</li>
            <button onClick={() => { props.sendData(props.id) }} className="btn btn-danger my-2 col-sm-2 offset-1">X</button>
        </div>
    );
}

export default Plan;