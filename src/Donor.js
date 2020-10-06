import React, { Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

export default class Donor extends Component {
    constructor() {
        super();
        this.state = {
            donorList: [],
            key_gender: 'male'
        };
        this.genderInputChange = this.genderInputChange.bind(this);

    }

    componentDidMount = () => {
        axios.get('/donor').then(response => {
            console.log(response);
            this.setState({
                donorList: response.data.map(donor => <div><h3>ID: {donor.donorID} Gender: {donor.gender} Age: {donor.age}</h3></div>)
            });
        });
    };

    // genderInputChange(event) {
    //     this.setState({key_gender: event.target.value});
    // }

    genderInputChange(event) {
        this.setState({key_gender: event.target.value});
    }


    clickSearchGender = () => {
        axios.get(`/donor/gender?gender=${this.state.key_gender}`)
        .then(response => {
            this.setState({
                donorList: response.data.map(donor => <div><h3>ID: {donor.donorID} Gender: {donor.gender} Age: {donor.age}</h3></div>)
            });
        });
    };

    render() {
        return (
            <div>
                
                <h1>Welcome to use Donor portal!</h1>
                <div>
                    <label>Gender:
                        <input type="text" value={this.state.key_gender} onChange={this.genderInputChange}/>
                        <button onClick={this.clickSearchGender}>filter</button>
                    </label>
                </div>
                <div>{this.state.donorList}</div>
            </div>
            
        );
    }
}

