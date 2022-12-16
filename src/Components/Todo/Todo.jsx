import React from "react";
import AddTodo from "./AddTodo";
import Plan from "./Plan";

class Todo extends React.Component {
    state = {
        items: [],
        text: "",
    }

    handleChangeFn = val => {
        this.setState({ text: val.target.value });
    }

    handleAddFn = () => {
        if (this.state.text !== "") {
            const items = [...this.state.items, this.state.text];
            this.setState({ items: items, text: "" });
        }
    }

    handleChange = e => {
        this.setState({ text: e.target.value });
    }
    handleAdd = e => {
        if (this.state.text !== "") {
            const items = [...this.state.items, this.state.text];
            this.setState({ items: items, text: "" });
        }
    }

    handleDelete = id => {

        console.log("Deleted", id);
        const oldItems = [...this.state.items];
        // console.log('oldItems', oldItems)
        const items = oldItems.filter((element, i) => {
            return i !== id
        });
        // console.log("new Items", items);
        this.setState({ items: items });
    }

    render() {
        const items = this.state.items.map((plan, i) => {
            return <Plan item={plan} id={i} sendData={this.handleDelete} key={Math.random()} />
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 mx-auto">
                        <h3 className="text-center">Add Todo</h3>
                        <hr />
                        {/* <div className="row">
                            <div className="col-9 mx-auto">
                                <input onChange={this.handleChange} type="text" className="form-control" placeholder="What To do" value={this.state.text} />
                            </div>
                            <div className="col-3">
                                <button onClick={this.handleAdd} className="btn btn-info px-3 font-weight-bold">Add</button>
                            </div>
                        </div> */}
                        <AddTodo changeFn={this.handleChangeFn} addFn={this.handleAddFn} val={this.state.text} />
                    </div>
                    <div className="col-md-6 col-sm-12 mx-auto">
                        <h3 className="text-center">Todays Work</h3>
                        <hr />
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;