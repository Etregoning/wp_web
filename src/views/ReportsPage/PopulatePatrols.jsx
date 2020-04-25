import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";



import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// Import React Table
import ReactTable from "react-table";
import "assets/css/react-table.css"


const requestData = (pageSize, page, sorted, filtered) => {

  // You can retrieve your data however you want, in this case, we will just use some local data.
  return fetch("https://wilderness.42.us.org/patrols", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`APIfetchIssues...ok=${response.ok}, response=${JSON.stringify(response)}`);
    })

  // // You can use the filters in your request, but you are responsible for applying them.
  // if (filtered.length) {
  //   filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
  //     return filteredSoFar.filter(row => {
  //       return (row[nextFilter.id] + "").includes(nextFilter.value);
  //     });
  //   }, filteredData);
  // }
  // // You can also use the sorting in your request, but again, you are responsible for applying it.
  // const sortedData = _.orderBy(
  //   filteredData,
  //   sorted.map(sort => {
  //     return row => {
  //       if (row[sort.id] === null || row[sort.id] === undefined) {
  //         return -Infinity;
  //       }
  //       return typeof row[sort.id] === "string"
  //         ? row[sort.id].toLowerCase()
  //         : row[sort.id];
  //     };
  //   }),
  //   sorted.map(d => (d.desc ? "desc" : "asc"))
  // );

  // You must return an object containing the rows of the current page, and optionally the total pages number.
  // const res = {
  //   rows: _.slice(pageSize * page, pageSize * page + pageSize),
  //   pages: Math.ceil(_.length / pageSize)
  // };

  // Here we'll simulate a server response with 500ms of delay.
  // setTimeout(() => resolve(res), 500);

};

class PopulatePatrols extends React.Component {
  constructor() {
    super();
    this.state = {
      patrolData: [],
      pages: null,
      loading: true
    };
    this.fetchPatrols = this.fetchPatrols.bind(this);
  }
  fetchPatrols(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(patrolRes => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        patrolData: patrolRes,
        pages: patrolRes.pages,
        loading: false
      });
    });
  }
  render() {
    const { patrolData, pages, loading } = this.state;
    console.Í(patrolData.length)
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "Interaction Type",
              accessor: "visitorTypes"
            },
            {
              Header: "Comments",
              accessor: "notes"
            },
            {
              Header: "Park",
            accessor: "parks[0].name"
            },
            //{
            //   Header: "Trail",
            // accessor: "trails[0].name"
            // },
            // {
            //   Header: "Reported By",
            //   accessor: "user_id"
            // },
            {
              Header: "Time/Date",
            accessor: "updated_at"
            },
            {
              Header: "View On Map",
            // accessor: "parks[0].name"
            },
            {
              Header: "View Image",
            // accessor: "parks[0].name"
            },
          ]}
          // manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={patrolData}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchPatrols} // Request new data when things change
          filterable
          minRows={patrolData.length <= 25 ? patrolData.length : undefined}
          defaultPageSize={25}
          className="-striped -highlight"
        />
        <br />
        <GridContainer>
        <GridItem>
          <Button type="button" color="success">
            Delete
          </Button>
          <Button type="button" color="success">
            Archive
          </Button>
          <Button type="button" color="success">
            Export
          </Button>

        </GridItem>
      </GridContainer>
      </div>
    );
  }
}




export default withStyles(dashboardStyle)(PopulatePatrols);
