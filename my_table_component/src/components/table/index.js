import React from 'react';

import Row from '../row/index';

class Table extends React.Component {
    state = {
        data:
            [
                { first: "HYUN", last: "PARK" },
                { first: "SUNGHWAN", last: "JO" },
                { first: "JIN", last: "YOON" }
            ]
        ,
        numOfAddRows: 0,
        addVer: false
    }
    componentDidMount() {

    }
    handleClick = () => {
        this.setState((prevState, prop) => {
            return {
                numOfAddRows: prevState.numOfAddRows + 1,
                addVer: true
            }
        })
    }
    handleClickCancle = () => {
        this.setState((prevState, props) => {
            return {
                numOfAddRows: prevState.numOfAddRows - 1
            }
        })
    }
    renderRows = () => {
        return this.state.data.map((person, index) => {
            return <Row num={index} fname={person.first} lname={person.last} />
        })
    }
    renderAddVer = () => {
        if (this.state.addVer) {
            let addRows = [];
            for (let i = 0; i < this.state.numOfAddRows; ++i) {
                addRows.push(<Row addPerson={this.addData} addVer={this.state.addVer} handleClickCancle={this.handleClickCancle} />);
            }
            return addRows.map(row => {
                return row;
            })
        }
    }

    addData = (newPerson) => {
        this.setState((prevState, props) => {
            return {
                data: [...prevState.data, newPerson],
                numOfAddRows: prevState.numOfAddRows - 1
            }
        }, () => {

        })
    }
    render() {
        return (
            <>
                <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                        {this.renderAddVer()}
                    </tbody>
                </table>
                <button onClick={this.handleClick} type="button" className="btn btn-success" style={{ float: "right", marginRight: "1%" }}>ADD</button>
            </>
        )
    }
}

export default Table;