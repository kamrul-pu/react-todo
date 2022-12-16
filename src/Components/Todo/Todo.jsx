import React from "react";
import AddTodo from "./AddTodo";
import Plan from "./Plan";
import axios from "axios";

class Todo extends React.Component {
    state = {
        items: [],
        text: "",
    }

    showPlan = () => {
        //Using Fetch
        // fetch("http://127.0.0.1:8000/api/")
        //     .then(res => res.json())
        //     .then(data => this.setState({ items: data }))
        //     .catch(err => console.log(err));

        //Using Axios
        axios.get("http://127.0.0.1:8000/api/")
            .then(res => this.setState({ items: res.data }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.showPlan();
    }

    handleChangeFn = val => {
        this.setState({ text: val.target.value });
    }

    handleAddFn = () => {
        if (this.state.text !== "") {
            const data = { 'items': this.state.text };
            console.log(data);
            fetch("http://127.0.0.1:8000/api/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            const items = [...this.state.items, this.state.text];
            this.setState({ items: items, text: "" });
            this.showPlan();
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

        fetch("http://127.0.0.1:8000/api/delete/" + id, {
            method: 'DELETE',
        })
            .then(res => console.log(res));

        console.log("Deleted", id);
        const oldItems = [...this.state.items];
        // console.log('oldItems', oldItems)
        const items = oldItems.filter((element, i) => {
            console.log(element);
            console.log('e id', element.id, 'p id', id);
            return i != id
        });
        console.log("new Items", items);
        this.setState({ items: items });
        this.showPlan();
    }

    render() {
        const items = this.state.items.map((plan, i) => {
            // console.log('plan', plan)
            return <Plan item={plan.items} id={plan.id} sendData={this.handleDelete} key={Math.random()} />
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