/* eslint-disable */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Icon from "@material-ui/core/Icon";

import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ReactTable from "react-table";
import "assets/css/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { requestData, requestDelete, requestArchivedData } from "api/ReportsAPI";
import dateFormat from 'dateformat'
import IconButton from '@material-ui/core/IconButton';

import { TiWarning, TiWarningOutline } from 'react-icons/ti'
const CheckboxTable = checkboxHOC(ReactTable);

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class ArchivedIssues extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [],
      pages: null,
      loading: true,
      selection: [],
      selectAll: false,
      pageSize: 25,
   
    };
    this.fetchIssues = this.fetchIssues.bind(this);
    this.deleteIssues = this.deleteIssues.bind(this);
    this.setUrgency = this.setUrgency.bind(this)
  }
  // fetch issues without loading animation
  fetchIssuesNoLoad(state) {
    const parkId = JSON.parse(localStorage.park_id)
    requestData(state.pageSize, state.page, state.sorted, state.filtered, parkId).then(
      res => {
        this.setState({
          data: res,
          pages: res.pages,
          loading: false
        });
      }
    );
  }

  fetchIssues(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this 
    // method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show 
    // you're own loading bar if you want.

    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestArchivedData(state.pageSize, state.page, state.sorted, state.filtered).then(
      res => {
        // Now just get the rows of data to your React Table (and update anything else like total 
        // pages or loading)
        this.setState({
          data: res,
          pages: res.pages,
          loading: false
        });
      }
    );
  }

  async deleteIssues(state) {
    this.setState({ loading: true });
    console.log(this.state.selection);
    let i = 0;
    let item = this.state.selection;
    while (i < item.length) {
      await requestDelete(state.pageSize, state.page, item[i]);
      i++;
    }
    this.setState({
      selection: []
    });
    // Now just get the rows of data to your React Table (and update anything else like total 
    // pages or loading)
    this.setState({
      data: this.state.data,
      pages: this.state.pages,
      loading: false
    });
  }

  async unsetUrgency(data) {
    const state = this.state
    await requestUrgencyUnset(data)
    this.fetchIssues(state)
  }

  async setUrgency(data)  {
    await requestUrgencySet(data)
  }

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
      // the 'sortedData' property contains the currently accessible records based on the filter
      //  and sort
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
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
    const { data, columns, pages, loading, selectAll } = this.state;


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
              id: "id",
              // Cell: ({ value }) => {
              //   const clickedRowId = value
              //   this.setState({clickedRowId})
              // },
              
              
            },
           
            {
              Header: "Description",
              accessor: "description",

              width: 700,
              
              
            },
            
            {
              Header: "Park",
              accessor: "parks[0].name"
            },
            {
              Header: "Trail",
              accessor: "trails[0].name"
            },
            {
              Header: "Reported By",
              accessor: "user_id"
            },
            {
              Header: "Time/Date",
              accessor: "updated_at",
              style: { textAlign: "center", justifyContent: 'center' },
              Cell: (rowInfo ) => 
                dateFormat(rowInfo.row.updated_at, "mm/dd/yyyy h:MM TT")
            },
            // {
            //   Header: "View On Map",
            // // accessor: "parks[0].name"
            // },
            {
              Header: "Image",
              filterable: false,
              sortable: false,
              accessor: "parks[0].name",
              style: { textAlign: "center" },
              maxWidth: 60,
              Cell: () => <Icon style={{ color: "#57AD5A" }}>image</Icon>
            }
          ]}
          // manual // Forces table not to paginate or sort automatically, so we can handle it 
          // server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchIssues} // Request new data when things change
          filterable
          verticalAlign='middle'
      
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          minRows={data.length <= 25 ? data.length : undefined}
          defaultPageSize={25}
          className="-striped -highlight"
          onPageSizeChange={pageSize => {
            this.state.pageSize = pageSize;
            this.state.selectAll = false;
            this.state.selection = [];
          }}
          onPageChange={() => {
            this.state.selectAll = false;
            this.state.selection = [];
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
              Delete
            </Button>
            <Button type="button" color="success">
              Unarchive
            </Button>
            <Button type="button" color="success">
              Download List
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(ArchivedIssues);