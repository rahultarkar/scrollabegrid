import React from 'react';
import logo from './logo.svg';
import './Grid.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return <td>{this.props.text}</td>
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const id = this.props.id;
        const ignoreIndexes = this.props.ignoreIndexes || [];
        const data = this.props.data.filter((d, idx) => {            
            for (let i = 0; i < ignoreIndexes.length; i++) {
                if (idx == ignoreIndexes[i]) {
                    return false;
                }
            }
            return true;
        });
        const cells = data.map((d, idx)=>
            <Cell key={"row" + idx} id={id + d} text={d}></Cell>
        );
        return (
            <tr>
                {cells}
            </tr>
        )
    }
}

class Table extends React.Component {
    render() {
        
        const cols = this.props.columns.map((col, idx)=>
            <th key={"header" + idx}>{col}</th>
        );
        const header = <tr>{cols}</tr>
        const filters = this.props.filter ? this.props.columns.map((col, idx)=>
            <th key={"filter" + idx}><input type="text" /></th>
        ):[];
        const rows = this.props.data.map((d, idx)=>
            <Row key={"row" + idx} id={d.join("")} data={d} ignoreIndexes={this.props.ignoreIndexes}></Row>
        );
        return (
            <table>
                { 
                    cols.length > 0 &&           
                    <thead>
                        {header}
                        {filters.length > 0 &&
                            <tr>
                                {filters}
                            </tr>
                        }
                    </thead>
                }
                {
                    rows.length > 0 &&
                    <tbody>
                        {rows}
                    </tbody>
                }
            </table>
        )
    }
}

class Grid extends React.Component {
    constructor(props){
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScroll2 = this.handleScroll2.bind(this);
        let colWidths = [];
        let frozenColumns = this.props.frozenColumns;
        const columns = this.props.columns.filter((col, idx)=>{
            let include = true;
            for (let i = 0; i < frozenColumns.length; i++) {
                if (col == frozenColumns[i]) {
                    include = false;
                    break;
                }
            }
            return include;
        });
        for (let i = 0; i < columns.length; i++) {
            colWidths.push(0);
        }
        this.state = {
            colWidths: colWidths
        };
    }

    handleScroll() {
        this.refs.scrollHeader.scrollLeft = this.refs.scroller.scrollLeft;
    }

    handleScroll2(){
        this.refs.masterGridData.scrollTop = this.refs.slaveGridData.scrollTop;
        this.refs.slaveGridHeader.scrollLeft = this.refs.slaveGridData.scrollLeft;
    }

    componentDidMount(){
        //let headerTable = this.refs.scrollHeader.firstChild;
        //let dataTable = this.refs.scroller.firstChild;
    }

    render() {
        if (this.props.scrollable) {
            const emptyData = [];   
            const frozenColumns = this.props.frozenColumns;    
            const masterIndexes = []; 
            const slaveIndexes = [];    
            const columns = this.props.columns.filter((col, idx)=>{
                let include = true;
                for (let i = 0; i < frozenColumns.length; i++) {
                    if (col == frozenColumns[i]) {
                        include = false;
                        break;
                    }
                }
                if (include == false) {
                    masterIndexes.push(idx);
                } else {
                    slaveIndexes.push(idx);
                }
                return include;
            });
            if (frozenColumns.length == 0){
                return (
                    <div id="scrollable_grid" ref="scrollContainer">                    
                        <div id="scrollable_grid_header" ref="scrollHeader">
                            <Table columns={this.props.columns} data={emptyData} filter={false} />
                        </div>
                        <div id="scrollable_grid_data" onScroll={this.handleScroll} ref="scroller">
                            <Table columns={emptyData} data={this.props.data} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id="scrollable_grid" ref="scrollContainer">
                        <div id="master_grid" ref="masterGrid">
                            <div id="master_grid_header" ref="masterGridHeader">
                                <Table columns={frozenColumns} data={emptyData} filter={false} />
                            </div>
                            <div id="master_grid_data" ref="masterGridData">
                                <Table columns={emptyData} data={this.props.data} ignoreIndexes={slaveIndexes} />
                            </div>
                        </div>
                        <div id="slave_grid" ref="slaveGrid">
                            <div id="slave_grid_header" ref="slaveGridHeader">
                                <Table columns={columns} data={emptyData} filter={false} />
                            </div>
                            <div id="slave_grid_data" ref="slaveGridData" onScroll={this.handleScroll2}>
                                <Table columns={emptyData} data={this.props.data} ignoreIndexes={masterIndexes} />
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <Table columns={this.props.columns} data={this.props.data} />
            )
        }
    }
}

export default Grid;