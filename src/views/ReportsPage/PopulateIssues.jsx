import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon"
import EditPopover from "components/Tooltips/EditPopover";
import Popover from "@material-ui/core/Popover";
import { TiWarning, TiWarningOutline } from "react-icons/ti";
import { CSVLink } from "react-csv"
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx"
// react plugin for creating charts
// @material-ui/core
import checkboxHOC from "react-table/lib/hoc/selectTable";
import ReactTable from "react-table";
import "assets/css/react-table.css";
import {
  requestData,
  requestDelete,
  requestArchive,
  requestUrgencySet
} from "api/ReportsAPI";
import dateFormat from "dateformat";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import modalStyle from "assets/jss/material-dashboard-react/modalStyle.jsx"
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";
// import {Carousel} from "react-responsive-carousel"
import AliceCarousel from 'react-alice-carousel'
import ContentEditable from 'react-contenteditable'
// import "react-alice-carousel/lib/alice-carousel.css"
// core components
const CheckboxTable = checkboxHOC(ReactTable);

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class PopulateIssues extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataCSV: [],
      columns: [],

      loading: true,
      selection: [],
      selectAll: false,
      pageSize: 25,
      modal: false,
      modalImgSrc: [],
      lengthCarousel: null,
      popoverAnchor: null,
      setPopoverAnchor: null

    };
    this.fetchIssues = this.fetchIssues.bind(this);
    this.deleteIssues = this.deleteIssues.bind(this);
    this.archiveIssues = this.archiveIssues.bind(this)
    
  }

  handleChange = event => {
    if (event.target.name === "description")
      this.setState({ firstName: event.target.value })
  }
  
  handleSubmit = event => {
    event.preventDefault();
  }

  handleEdit = event => {
    this.setState({
      popoverEvent: event.target.value
    })
  }

  renderEditable = cellInfo => {
    return (
      <div
        style={{width: "100%"}}
        contentEditable
        suppressContentEditableWarning
        // onBlur={{background: "#FF0000"}}
        onClick={this.openPopover}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
 
        }}
      > 
      </div>
    );
  }

  handleClick(event) {
    this.setPopoverAnchor(event.currentTarget);
  }

  handlePopoverClose() {
    this.setPopoverAnchor(null);
  }

  // cellFocus = cellInfo => {

  //     return (
  //       <div
  //         style={{  background: "#FF0000" }}
  //         contentEditable
  //         suppressContentEditableWarning
  //         dangerouslySetInnerHTML={{
  //           __html: this.state.data[cellInfo.index][cellInfo.column.id]
  //         }}
  //       > 
  //       </div>
  //     );

  // }

  // handlePopoverOpen(){
  //   return (
  //     <EditPopover anchor={} />
  //   )
  // }

  handleClickOpen(modal, rowInfo, imgSrc) {

    var x = [];
    x[modal] = true;
    let imgAr = []
    let urlRoot = "https://wilderness.42.us.org"
    let url = ""
    if (rowInfo.row.photos.length > 0) {
      for (var key in rowInfo.row.photos){
        if (rowInfo.row.photos.hasOwnProperty(key)){
          imgAr.push(urlRoot + rowInfo.row.photos[key].photo.photo.url)
        }
      }
      this.setState({
        lengthCarousel: imgAr.length
      })
      this.setState({
        modalImgSrc: imgAr.map((i) => (<img key={i} src={i}/>)),
      })
    }
    this.setState(x);

    console.log(imgAr)
    // console.log(imgAr)
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.setState({
      modalImgSrc: []
    })
  }
  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
 
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }
  // fillCarousel = () => {
  //   let images = this.state.modalImgSrc.map((i) => (<h2 key={i}>{i}</h2>)),
  // }

  fetchIssues (state, instance) {
    
    // this.setState({ loading: true });
    requestData(state.pageSize, state.page, state.sorted, state.filtered).then(
      res => {
        this.setState({
          data: res,
          pages: res.pages,
          loading: false
        });
      }
    );
  }

  async deleteIssues() {
    const { selection, data } = this.state;
    const toDelete = new Set(selection)
    const updatedData = data.filter( obj => !toDelete.has(obj.id)) 
    await selection.forEach( item => {
      requestDelete(item)
    })
    this.setState({
      selection: [],
      data: updatedData
    });
  }

  async archiveIssues(){
    const { selection, data } = this.state
    const toArchive =  new Set(selection)
    const updatedData = data.filter( obj => !toArchive.has(obj.id))
    selection.forEach( item => {
      requestArchive(item)
    })
    this.setState({
      selection: [],
      data: updatedData
    });
  }

  async unsetUrgency(index) {
    const data = this.state.data
    const id = data[index].id
    data[index].status = "Open"
    this.setState({ data: data })
    await requestUrgencySet(id, data[index].status);
    // this.fetchIssues(state);
  }

  async setUrgency(index) {
    const data = this.state.data
    const id = data[index].id
    data[index].status = "urgent"
    this.setState({data: data})
    await requestUrgencySet(id, data[index].status);
    // this.toggleUrgency()
    
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
    const { images } = this.state.modalImgSrc
    const {classes} = this.props

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
    
    const openPopover = Boolean(this.popoverAnchor)
    const id = openPopover ? 'simple-popover' : undefined

    return (
      <div>
        {/* <Button
        onClick={ () => {
          console.log(this.state.selection)
        }}
      >
        log selection
      </Button> */}
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
              Header: rowInfo => {
                const val = rowInfo.Header
                return val
              },
              
              id: "status",
              style: { textAlign: "center", justifyContent: "center" },
              maxWidth: 55,

              accessor: "status",

              Cell: rowInfo =>
                rowInfo.row.status === "urgent" ? (
                  <IconButton
                    style={{ height: 30, width: 30, margin: 0, padding: 0 }}
                    onClick={() => {
                      this.unsetUrgency(rowInfo.index)
                      console.log(rowInfo)
                    }}
                  >
                    <TiWarning color="red" />
                  </IconButton>
                ) : (
                  <IconButton
                    style={{ height: 30, width: 30, margin: 0, padding: 0 }}
                    onClick={() =>
                      this.setUrgency(rowInfo.index)
                    }
                  >
                    <TiWarningOutline />
                  </IconButton>
                ),
              filterMethod: (filter, row) => {
                if (filter.value === "all")
                  return row[filter.id] === null || row[filter.id] === "urgent" || row[filter.id] === "Open";
                if (filter.value === "urgent")
                  return row[filter.id] === "urgent";
              },
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%", marginTop: 5 }}
                  value={filter ? filter.value : "all"}
                >
                  <option value="all">All</option>
                  <option value="urgent">Urgent</option>
                </select>
              )
            },
            {
              Header: "Description",
              accessor: "description",
              Cell: rowInfo => 
              <div onClick={() => this.}>
              <Popover 
              id={id}
        open={this.openPopover}
        anchorEl={this.popoverAnchor}
        onClose={this.handlePopoverClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
                
              </Popover>

              
              <div 
              contentEditable
              >
                {rowInfo.row.description}
            </div>
            </div>,
              // onBlur: this.renderEditable,
              width: 350,
              onClick: this.handleEdit
            },
            {
              Header: "Park",
              accessor: "parks[0].name",
              style: { textAlign: "center", justifyContent: "center" },
            },
            {
              Header: "Trail",
              accessor: "trails[0].name",
              style: { textAlign: "center", justifyContent: "center" },
            },
            {
              Header: "Reported By",
              accessor: "user_id",
              style: { textAlign: "center", justifyContent: "center" },
            },
            {
              Header: "Time/Date",
              accessor: "updated_at",
              style: { textAlign: "center", justifyContent: "center" },
              Cell: rowInfo =>
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
              accessor: "photos",
              status: "photos",
              style: { textAlign: "center" },
              maxWidth: 60,
              Cell: rowInfo => {
                // let imgAr = rowInfo.row.photos[0].photo.photo;
                let imgSrc = []
                if (undefined !== rowInfo.row.photos && rowInfo.row.photos.length >= 1){
                  imgSrc.push(rowInfo.row.photos[0].photo.photo.url)
                  imgSrc.push(rowInfo.row.photos[0].photo.photo.thumb)
                  // imgSrc = JSON.stringify(data[rowInfo.index].photos[0].photo.photo.url)
                  // this.setState({modalImgSrc: `https://wilderness.42.us.org${imgSrc}`})
                  // console.log(imgSrc)
                }  
                // { console.log(rowInfo.row.photos[0].photo.photo.url) }
                // this.setState({modalImgSrc: `https://wilderness.42.us.org${imgSrc}`})
                // console.log(imgSrc);
                return (
     
                  <IconButton 
          style={{ 
            color: "#57AD5A", 
            height:30, 
            width: 30, 
            margin: 0, 
            padding: 0}}
  
            onClick={() => {
              this.handleClickOpen("modal", rowInfo, imgSrc)
            }}
      
        >
              <Icon>image</Icon>
          </IconButton>
                );

              }
            }
          ]}
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={ () => this.fetchIssues(this.state)} // Request new data when things change
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
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={this.state.modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("modal")}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description">
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}>
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.handleClose("modal")}>
              <Close className={classes.modalClose} />
            </IconButton>
            {/* <h4 className={classes.modalTitle}></h4> */}
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}>
            {/* <h5>Are you sure you want to do this?</h5>
            <img src={this.state.modalImgSrc} style={{ width: "100%" }}alt="issue image" /> */}
            {
              this.state.modalImgSrc.length === 0  ?
                 "This issue has no attached images"
              :
          
              <AliceCarousel
              startIndex={0}
              items={this.state.modalImgSrc}
              responsive={this.responsive}
              autoPlayInterval={2000}
              autoPlayDirection="rtl"
              // autoPlay={true}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              // playButtonEnabled={true}
              disableAutoPlayOnAction={true}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
            
            />
        
              }
            
          </DialogContent>
          <DialogActions
            className={classes.modalFooter +" " +classes.modalFooterCenter}>
            <Button
              onClick={() => this.handleClose("modal")}
            >
              Close
            </Button>
        
          </DialogActions>
        </Dialog>
        <GridContainer>
          <GridItem style={{flexDirection: "row"}}>
            <Button
              type="button"
              color="success"
              onClick={this.deleteIssues}
              {...checkboxProps.isSelected}
            >
              Delete
            </Button>
            <Button 
              type="button" 
              color="success"
              onClick={this.archiveIssues}
              {...checkboxProps.isSelected}
            >
              Archive Selected
            </Button>
            <Button 
              type="button" 
              color="success"
              onClick={this.archiveIssues}
              {...checkboxProps.isSelected}
            >
              Archive All
            </Button>
      
            <Button type="button" color="success">
            <CSVLink
              headers={data[0] ? Object.keys(data[0]) : null}
              data={
                data.map((report) => {
                return(Object.keys(report).map(key => {
                  if (key === "parks") {
                    return (report[key].length > 0 ? report[key][0].name : "No park, somehow");
                  }
                  else if (key === "trails") {
                    return (report[key].length > 0 ? report[key][0].name : "");
                  }
                  else if (key === "photos") {
                    return ( null );
                  } else {
                    return (report[key]);
                  }
                }))
              })}
              style={{ color: 'white' }}
              onClick={() => {
                console.log("You click the link"); 
              }}
            >
              Download me
            </CSVLink>
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(modalStyle)(PopulateIssues)
