import React from 'react';

class Row extends React.Component {

    state = {
        num: this.props.num,
        fName: this.props.fname,
        lName: this.props.lname,
        addVer: this.props.addVer
    }

    renderRow = () => {
        return (
            <tr >
                <th scope="row">{this.state.num}</th>
                <td >{this.state.fName}</td>
                <td>{this.state.lName}</td>
                <td>
                    <button type="button" className="btn btn-primary" style={{ marginRight: "1%" }}>EDIT</button>
                </td>
            </tr>
        )
    }

    renderAddVer = () => {
        return (
            <tr >
                <th scope="row">1</th>
                <td ><input className="form-control" name="fName" value={this.state.fName} onChange={this.handleChange} type="text" placeholder="First.." style={{ maxWidth: "100%" }} /></td>
                <td ><input className="form-control" name="lName" value={this.state.lName} onChange={this.handleChange} type="text" placeholder="Last.." style={{ maxWidth: "100%" }} /></td>
                <td>
                    <button onClick={this.clickSave} type="button" className="btn btn-primary" style={{ marginRight: "1%" }}>SAVE</button>
                    <button onClick={this.clickCancle} type="button" className="btn btn-danger">Cancle</button>
                </td>
            </tr>
        )
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    clickCancle = () => {
        this.props.handleClickCancle();
    }

    clickSave = () => {
        if (this.inputValidation(this.state)) {
            let newPerson = {
                first: this.state.fName,
                last: this.state.lName
            }
            this.props.addPerson(newPerson);
        }
    }

    inputValidation = ({ fName, lName }) => {
        if (fName != null && lName != null) {
            return true;
        } else {
            alert("first and last must be entered!")
            return false;
        }
    }

    renderRows = () => {
        if (this.state.addVer == null) {
            return this.renderRow();
        } else {
            return this.renderAddVer();
        }
    }


    render() {
        return (
            this.renderRows()
        )
    }
}

export default Row;