import React from 'react';

import Row from '../row/index';

class Table extends React.Component {
    state = {
        data:
            [
                {
                    id: "0001",
                    first: "HYUN",
                    last: "PARK"
                },
                {
                    id: "0002",
                    first: "SUNGHWAN",
                    last: "JO"
                },
                {
                    id: "0003",
                    first: "JIN",
                    last: "YOON"
                }
            ]
        ,
        numOfAddRows: 0,
        inputVersion: false
    }
    componentDidMount() {

    }
    clickinputVersion = () => {
        this.setState((prevState, prop) => {
            return {
                numOfAddRows: prevState.numOfAddRows + 1,
                inputVersion: true
            }
        }, () => {
        })
    }
    handleClickCancle = () => {
        this.setState((prevState, props) => {
            return {
                numOfAddRows: prevState.numOfAddRows > 0 ? prevState.numOfAddRows - 1 : prevState.numOfAddRows = 0,
            }
        }, () => {


        })
    }

    renderRows = () => {
        return this.state.data.map((person, index) => {
            return <Row num={index} addPerson={this.saveData} handleClickCancle={this.handleClickCancle} id={person.id} fname={person.first} lname={person.last} />
        })
    }
    renderInputVer = () => {
        if (this.state.inputVersion) {
            let addRows = [];
            for (let i = 0; i < this.state.numOfAddRows; ++i) {
                addRows.push(<Row addRow={true} numOfInputRow={this.state.numOfAddRows} addPerson={this.saveData} inputVersion={this.state.inputVersion} handleClickCancle={this.handleClickCancle} />);
            }
            return addRows.map(row => {
                return row;
            })
        }
    }

    saveData = (newPerson => {
        const index = this.state.data.findIndex(person => person.id === newPerson.id);
        if (index === -1) {
            this.setState((prevState, props) => {
                return {
                    data: [...this.state.data, newPerson],
                    numOfAddRows: prevState.numOfAddRows - 1,
                    inputVersion: !prevState.inputVersion
                }
            })
        } else {
            let newData = [...this.state.data] // important to create a copy, otherwise you'll modify state outside of setState call
            newData[index] = newPerson;
            this.setState((prevState, props) => {
                return {
                    data: newData,
                    inputVersion: !prevState.inputVersion
                }
            }, () => {
            });
        }
    })

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
                        {this.renderInputVer()}
                    </tbody>
                </table>
                <button onClick={this.clickinputVersion} type="button" className="btn btn-success" style={{ float: "right", marginRight: "1%" }}>ADD</button>
            </>
        )
    }
}

export default Table;