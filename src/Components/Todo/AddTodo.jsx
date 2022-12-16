import React from "react";

class AddTodo extends React.Component {
    state = {
        items: [],
        text: "",
    }
    handleChange = e => {
        this.setState({ text: e.target.value });
    }
    handleAdd = e => {
        if (this.state.text !== "") {
            const items = [...this.state.items, this.state.text];
            this.setState({ items: items, text: "" });
            console.log(items);
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-9 mx-auto">
                    <input onChange={this.handleChange} type="text" className="form-control" placeholder="What To do" value={this.state.text} />
                </div>
                <div className="col-3">
                    <button onClick={this.handleAdd} className="btn btn-info px-3 font-weight-bold">Add</button>
                </div>
            </div>
        );
    }
}

export default AddTodo;