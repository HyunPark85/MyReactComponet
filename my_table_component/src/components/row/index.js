import React from 'react';

//This component will be rendered depeding on it's condition specified by parent's component
//If it is not inputVer, this.state.inputVer is null and it renders row which contain data passed by parent
//Input version is used for editing data as well as adding data. 
//This component also render add version or edit version of row.  
class Row extends React.Component {

    state = {
        num: this.props.num,
        id: this.props.id,
        fName: this.props.fname,
        lName: this.props.lname,
        inputVer: this.props.inputVersion,
        addRow: this.props.addRow
    }

    renderRow = () => {
        return (
            <tr >
                <th scope="row">{this.state.num}</th>
                <td >{this.state.fName}</td>
                <td>{this.state.lName}</td>
                <td>
                    <button onClick={() => this.clickEdit(this.state.id)} type="button" className="btn btn-primary" style={{ marginRight: "1%" }}>EDIT</button>
                </td>
            </tr>
        )
    }

    //the addRow is passed by parent's component in order to check if the row is add version or not.
    //if it is addRow, this function only decrease the number of rows in parent's state.   
    clickCancleInput = () => {
        if (this.state.addRow) {
            this.props.handleClickCancle();
        } else {
            this.setState((prevState, props) => {
                return { inputVer: false }
            }, () => {
                this.props.handleClickCancle();
            })

        }
    }
    clickEdit = (id) => {
        this.setState((prevState, props) => {
            return { inputVer: !prevState.inputVer }
        })
    }

    renderInputVersion = () => {
        return (
            <tr >
                <th scope="row">1</th>
                <td ><input className="form-control" name="fName" value={this.state.fName} onChange={this.handleChange} type="text" placeholder="First.." style={{ maxWidth: "100%" }} /></td>
                <td ><input className="form-control" name="lName" value={this.state.lName} onChange={this.handleChange} type="text" placeholder="Last.." style={{ maxWidth: "100%" }} /></td>
                <td>
                    <button onClick={this.clickSave} type="button" className="btn btn-primary" style={{ marginRight: "1%" }}>SAVE</button>
                    <button onClick={this.clickCancleInput} type="button" className="btn btn-danger">Cancle</button>
                </td>
            </tr>
        )
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    clickSave = () => {
        if (this.inputValidation(this.state) && this.state.id) {
            let editedPerson = {
                id: this.state.id,
                first: this.state.fName,
                last: this.state.lName
            }
            this.setState((prevState, props) => {
                return { inputVer: !prevState.inputVer }
            }, () => {
                this.props.addPerson(editedPerson);
            })
        } else if (this.inputValidation(this.state) && !this.state.id) {
            let newPerson = {
                id: Math.floor(Math.random() * Math.floor(100)),
                first: this.state.fName,
                last: this.state.lName
            }
            this.setState((prevState, props) => {
                return {
                    inputVer: !prevState.inputVer,
                }
            }, () => {
                this.props.addPerson(newPerson);
            })
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
        //parent's component does not pass inputVer to this component when the row has data to be displayed
        if (this.state.inputVer == null || !this.state.inputVer) {
            return this.renderRow();
        } else {
            return this.renderInputVersion();
        }
    }
    render() {
        return (
            this.renderRows()
        )
    }
}

export default Row;