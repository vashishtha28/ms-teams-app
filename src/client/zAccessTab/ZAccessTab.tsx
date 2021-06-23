import * as React from "react";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import {NonTeams} from "../Components/NonTeams";
import { ZCreateInstance } from "../Components/ZCreateInstance";

/**
 * Implementation of the Z-Access content page
 */
export const ZAccessTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();
    const [userEmailId, setUserEmail] = useState<string | undefined>();
    
    // Microsoft Teams check and Integration:
    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
            microsoftTeams.getContext(function(context) {
                setUserEmail(context.loginHint); 
               });
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.entityId);
        }
    }, [context]);

    /**
     * Render the appropriate component
     */
        return (
            <ZCreateInstance
                userEmailId = "abc@zomato.com"
            />
        );
    
};
