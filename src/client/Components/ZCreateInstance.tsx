import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import { Form, FormInput, FormTextArea, Divider, Alert, Segment } from '@fluentui/react-northstar'
import { ConsoleTranscriptLogger } from "botbuilder";
import axios from "axios"

export const ZCreateInstance = (props) => {

    const [{ inTeams, theme, context }] = useTeams();
    const [emptyFieldError, setErrorMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState("Null"); // will be importing from database
    const [requestData, setRequestData] =  useState({
        userEmailId: props.userEmailId,
        sshKey: "",
        sideNote: ""
    });

    function handleDiscard(event){
        event.preventDefault();
        setRequestData({
            userEmailId: props.userEmailId,
            sshKey: "",
            sideNote: ""
        });
        setErrorMessage("");

    }

    function handleSubmit(event){
        event.preventDefault();
        //check filled fields
        if(requestData.sshKey=="") setErrorMessage("This can't be empty");
        else{
            setErrorMessage("");
            console.log(requestData);
            axios.post("http://localhost:8000/req/zdev", requestData)
            .then((response)=>{
                console.log("this is server respnse message: ", response.data);
                setRequestStatus("underProgress");
                setRequestData({
                    userEmailId: props.userEmailId,
                    sshKey: "",
                    sideNote: ""
                });
                
            },(err)=>{
                console.log(err);
            });
        }
        //if ok, send http request
    }

    function handleChange(e){
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        console.log(name);
        console.log(value);
        setRequestData((prev)=>{
            return {...prev, [name]: value};
        })
    }

    return (
       <Flex column gap="gap.small" style={{maxWidth:"30rem", margin:"0 auto"}}>
           
        <Provider theme={theme} style={{padding: "2rem 2rem 0 2rem"}}>
                <Flex column styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    {requestStatus==="underProgress" && <Flex.Item>
                        <Segment content="Your Request has been submitted" color="green" inverted />
                    </Flex.Item>}
                    <Flex.Item>
                            <Header as="h1" align="center">
                                Zdev Access Controller
                            </Header>
                    </Flex.Item>
                    <Divider/>
                    <Flex.Item>
                        <div>
                            <Text size="large">
                                <strong>
                                    Create new instance
                                </strong>
                            </Text>
                            <br/>
                            <Text size="large">
                                Generate a request to create your Zdev instance.
                            </Text>
                            <Form
                                style={{padding:"2rem 2rem"}}
                                onSubmit={() => {
                                alert('Form submitted')
                                }}
                            >
                                <FormInput
                                    fluid
                                    label="Work email id"
                                    type="email"
                                    name="userEmailId"
                                    id="email-id"
                                    value={props.userEmailId}
                                    required
                                    readOnly
                                    showSuccessIndicator={false}
                                />
                                <FormInput
                                    fluid
                                    label="SSH key"
                                    name="sshKey"
                                    value={requestData.sshKey}
                                    id="ssh-key"
                                    required
                                    showSuccessIndicator={false}
                                    errorMessage={emptyFieldError}
                                    onChange={handleChange}
                                />
                                <FormTextArea 
                                    name="sideNote" 
                                    id="side-note"
                                    label="Side note"
                                    value={requestData.sideNote} 
                                    placeholder="This message will show up with your request" 
                                    style={{minWidth:"100%"}}
                                    onChange={handleChange}
                                />
                                <Flex gap="gap.smaller" hAlign="end" style={{marginTop:"1rem"}}>
                                    <Button content="Discard" secondary onClick={handleDiscard}/>
                                    <Button content="Submit Request" primary onClick={handleSubmit}/>
                                </Flex>
                            </Form>    
                        </div>
                    </Flex.Item>
                    <Flex.Item styles={{
                        padding: ".8rem 0 .8rem .5rem"
                    }}>
                        <Divider>
                            <Text size="smaller" content="(C) Copyright Zomato" />
                        </Divider>
                    </Flex.Item>
                </Flex>
            </Provider>
        </Flex>
        
    );
};
