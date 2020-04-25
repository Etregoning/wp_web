import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "@material-ui/core/IconButton";
import ImagePopover from "components/Tooltips/ImagePopover";
import { TiWarning, TiWarningOutline } from "react-icons/ti";
import { CSVLink } from "react-csv"

// react plugin for creating charts
// @material-ui/core
import checkboxHOC from "react-table/lib/hoc/selectTable";
import ReactTable from "react-table";
import "assets/css/react-table.css";
import {
  requestUserList
} from "api/ReportsAPI";
import dateFormat from "dateformat";

const CheckboxTable = checkboxHOC(ReactTable);



class PopulateUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataCSV: [],
      columns: [],
      pages: null,
      loading: true,
      selection: [],
      selectAll: false,
      pageSize: 25,

    };
    this.fetchUsers = this.fetchUsers.bind(this);

  }

  fetchUsers(state, instance) {
    const parkId = JSON.parse(localStorage.park_id)
    // this.setState({ loading: true });
    requestUserList(state.pageSize, state.page, state.sorted, state.filtered, parkId).then(
      res => {
        this.setState({
          data: res,
          pages: res.pages,
          loading: false
        });
      }
    );
  }
  renderEditable = cellInfo => {
    return (
      <div
        style={{width: "100%"}}
        contentEditable
        suppressContentEditableWarning
        // onBlur={{background: "#FF0000"}}
        onFocus={this.handleEdit}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
 
        }}
      > 
      
      </div>
    );
  };

  toggleSelection = (key, shift, row) => {
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array

      currentRecords.some(item => {
        selection.push(item._original.id);
        return selection.length === this.state.pageSize;
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, pages, loading, selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTrProps: (s, r) => {
        const selected = r ? this.isSelected(r.original.id) : false; // because r might not exist

        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit",
            paddingBottom: 0
          }
        };
      }
    };

    return (
      <div>
        <CheckboxTable
          keyField="id"
          ref={r => (this.checkboxTable = r)}
          columns={[
            {
              accessor: "id",
              show: false,
              id: "id"
            },
       
            {
              Header: "Name",
              accessor: "name",
              style: {textAlign: "center"},
              Cell: this.renderEditable,
              width: 400
            },
            {
              Header: "Username/Email",
              accessor: "uid",
              style: { textAlign: "center", justifyContent: "center" },
              Cell: this.renderEditable,
            },
            {
              Header: "Phone Number",
              accessor: "phone_number",
              style: { textAlign: "center", justifyContent: "center" },
              Cell: this.renderEditable,
            },
            {
              Header: "User Role",
              accessor: "user_role",
              style: { textAlign: "center", justifyContent: "center" },
              Cell: this.renderEditable,
            },
            {
              Header: "Signup Date",
              accessor: "created_at",
              style: { textAlign: "center", justifyContent: "center" },
              Cell: rowInfo =>
                dateFormat(rowInfo.row.updated_at, "mm/dd/yyyy h:MM TT")
            },
            // {
            //   Header: "View On Map",
            // // accessor: "parks[0].name"
            // },
     
          ]}
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchUsers} // Request new data when things change
          filterable
          verticalAlign="middle"
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          minRows={data.length <= 25 ? data.length : undefined}
          defaultPageSize={25}
          className="-striped -highlight"
          onPageSizeChange={pageSize => {
            this.setState({ pageSize: pageSize });
            this.setState({ selectAll: false });
            this.setState({ selection: [] });
          }}
          onPageChange={() => {
            this.setState({ selectAll: false });
            this.setState({ selection: [] });
          }}
          onFilteredChange={filtered => this.setState({ filtered })}
          {...checkboxProps}
        />
        <br />
        <GridContainer>
          <GridItem>
          <Button
              type="button"
              color="success"
              onClick={this.deleteIssues}
              {...checkboxProps.isSelected}
            >
              Create User
            </Button>
            <Button
              type="button"
              color="success"
              onClick={this.deleteIssues}
              {...checkboxProps.isSelected}
            >
              Remove User
            </Button>
            <Button 
              type="button" 
              color="success"
              onClick={this.archiveIssues}
              {...checkboxProps.isSelected}
            >
              Promote/Demote
            </Button>
    
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default PopulateUsers
