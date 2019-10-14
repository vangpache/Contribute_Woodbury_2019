import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardContent, Grid, InputLabel, MenuItem, FormControlLabel, Checkbox, FormControl, Select, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Swal from 'sweetalert2';
// import { thisExpression } from '@babel/types';


const styles = theme => ({
    backButton: {
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 0px 0px 30px'
    },
    submitButton: {
        float: 'right',
        color: 'white',
        backgroundColor: '#457736',
        margin: '0px 130px 0px 0px'
    },
    dropdownBox: {
        width: '500px'
    },
    checkbox: {
        margin: '0px 0px 10px 0px',
    },
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    dateFields: {
        margin: '10px 10px 10px 30px',
        width: '40%'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '1030px'
    },
    times: {
        margin: '10px 10px 10px 30px',
        width: '40%'
    }
})


class AddEvent extends Component {

    state = {
        name: '',
        non_profit_id: this.props.match.params.id,
        description: '',
        address: '',
        city: '',
        zip_code: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        event_url: '',
        volunteers_needed: true,
    }

    handleChange = (propertyName, event) => {
        this.setState({
            [propertyName]: event.target.value
        })
        console.log(this.state);
    }

    handleVolunteerChange = (event) => {
        if(this.state.volunteers_needed === true) {
            this.setState({
                volunteers_needed: false,
            })
        } else {
            this.setState({
                volunteers_needed: true
            })
        }
        
        console.log('volunteer needed state:', this.state);
        
    }

    handleBackButton = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "The event has not been saved.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            // confirmButtonColor: '#457736'
        }).then((result) => {
            if (result.value) {
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                this.props.history.push(`/organizationHome/${id}`)
            }
        })
        console.log('back button was clicked');
        //link to the nonprofit home page
        //add sweetalert warning: no event has been saved
        // this.props.history.push('/nonprofithome')
    }

    handleSubmitButton = () => {
        console.log('submit event button clicked');
        this.props.dispatch({
            type: 'ADD_EVENT',
            payload: this.state,
            history: this.props.history
        })
        Swal.fire({
            title: 'Success!',
            text: 'Your event was submitted.',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#457736'
        })
    }

    


    render() {



        return (

            <div className={this.props.classes.rootDiv}>
                <h1>Add Event</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <Card> */}
                            <CardContent>

                            
                            <h2>Advertise your upcoming event</h2>
                            <p>Please complete the required fields to add your event. <br/>
                            Select from the dropdown list to reuse information from a previous event. <br/>
                            Leave the "Volunteers Needed" checkbox unchecked if you do not want to add volunteer opportunities at this time for the event.
                            </p>
                            <FormControl variant="outlined">
                                <InputLabel >
                                    Re-Use previous event
                                </InputLabel>
                                <Select
                                    className={this.props.classes.dropdownBox}
                                    // value={values.age}
                                    // onChange={handleChange}
                                    // labelWidth={labelWidth}
                                    // inputProps={{
                                    //     name: 'age',
                                    //     id: 'outlined-age-simple',
                                    // }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Event 1</MenuItem>
                                    <MenuItem value={20}>Event 2</MenuItem>
                                    <MenuItem value={30}>Event 3</MenuItem>
                                </Select>

                                <FormControlLabel 
                                    className={this.props.classes.checkbox}
                                    control={
                                        <Checkbox
                                            defaultChecked
                                            onChange={this.handleVolunteerChange}
                                            color="primary"
                                        />
                                    }
                                    label="Volunteers Needed"
                                />

                                <TextField className={this.props.classes.textFields} type="text" label="Enter the event Name" variant="outlined"
                                    value={this.state.name} onChange={(event) => this.handleChange('name', event)} />

                                <TextField className={this.props.classes.description} type="text" 
                                            placeholder="Enter the event description and any links where tickets can be purchased if required to attend" 
                                            label="description"
                                            variant="outlined" multiline rows="4" 
                                            value={this.state.description} onChange={(event) => this.handleChange('description', event)}/>
                            </FormControl>
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {/* <Card> */}
                            <CardContent>
                            <h2>left column</h2>
                            <TextField className={this.props.classes.dateFields} type="date" placeholder="Start"
                                variant="outlined" value={this.state.start_date} onChange={(event) => this.handleChange('start_date', event)} />
                            <TextField className={this.props.classes.dateFields} type="date" placeholder="End" variant="outlined"
                                value={this.state.end_date} onChange={(event) => this.handleChange('end_date', event)} />
                            <br />
                            
                            <TextField className={this.props.classes.times} type="time" placeholder="Start Time" 
                                variant="outlined" value={this.state.start_time} onChange={(event) => this.handleChange('start_time', event)} />
                            <TextField className={this.props.classes.times} type="time" placeholder="End Time" 
                                variant="outlined" value={this.state.end_time} onChange={(event) => this.handleChange('end_time', event)} />
                            <br/>
                    
                            <TextField className={this.props.classes.textFields} type="text" label="Image url" variant="outlined"
                                value={this.state.event_url} onChange={(event) => this.handleChange('event_url', event)} />
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Card> */}
                            <CardContent>
                            <h2>right column</h2>
                            
                            <TextField className={this.props.classes.textFields} type="text" label="Address" variant="outlined"
                                value={this.state.address} onChange={(event) => this.handleChange('address', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="City" variant="outlined"
                                value={this.state.city} onChange={(event) => this.handleChange('city', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="State" variant="outlined"
                                value={this.state.state} onChange={(event) => this.handleChange('state', event)} />
                            <br />
                            <TextField className={this.props.classes.textFields} type="text" label="Zip Code" variant="outlined"
                                value={this.state.zip_code} onChange={(event) => this.handleChange('zip_code', event)} />
                            <br />
                            
                            </CardContent>
                        {/* </Card> */}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Button className={this.props.classes.backButton} variant="contained"
                                    onClick={this.handleBackButton} >Back</Button>
                            <Button className={this.props.classes.submitButton} variant="contained"
                                    onClick={this.handleSubmitButton} >Submit</Button>
                        </CardContent>
                        
                    </Grid>
                </Grid>
                

            </div>
        )
    }
}


export default withStyles(styles) (connect()(AddEvent));