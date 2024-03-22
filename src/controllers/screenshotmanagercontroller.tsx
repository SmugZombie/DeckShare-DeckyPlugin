import { useState, Fragment } from "react";
import { PyInterop } from "../PyInterop";
import { 
    ButtonItem,
    Focusable,
    PanelSection,
    PanelSectionRow,
    TextField,
    ToggleField,
    Navigation,
    DialogButton
} from "decky-frontend-lib"
import { Screenshot } from "../lib/datastructure.screenshots";

const ScreenshotManagerController = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ screenshotsList, setScreenshotsList ] = useState({});
    const [ successfulUploads, setSuccessfulUploads ] = useState({});

    async function reload() {
        try{
            await PyInterop.getScreenshots().then((res) => {
                //PyInterop.log("Screenshots: " + JSON.stringify(res.result));
                setScreenshotsList(res.result);
            });
            await PyInterop.getSuccessfulUploads().then((res) => {
                PyInterop.log("Successful Uploads: " + JSON.stringify(res.uploads));
                setSuccessfulUploads(res.uploads);
            }
            
        }catch(e){
            PyInterop.log("Error in reload: " + e);
        }
        setIsLoading(false);
    }

    if (Object.keys(screenshotsList).length === 0) {
        reload();
      }
    else {
        Object.values(screenshotsList).forEach((screenshot: Screenshot) => {
            if (successfulUploads[screenshot.id]) {
                screenshot.uploaded = true;
            } else {
                screenshot.uploaded = false;
            }
        });
    }

    return (
        <PanelSection title="Recent Screenshots">
          {
            (Object.keys(screenshotsList).length === 0) ? (
                <div style={{ textAlign: "center", margin: "14px 0px", padding: "0px 15px", fontSize: "18px" }}>No screenshots found</div>
            ) : (
                <>
                    {
                        Object.values(screenshotsList).map((itm: Screenshot) => (
                            <span style={{border: itm.uploaded ? "1px solid green" : "1px solid red"}}>
                                {itm.base64 && <img style={{ height: "100px" }} src={`data:image/png;base64,${itm.base64}`} alt="Screenshot" />}
                            </span>
                        ))
                    }
                </>
            )
          }
            <PanelSectionRow>
                <ButtonItem layout="below" onClick={reload} >
                    Reload Screenshots
                </ButtonItem>
            </PanelSectionRow>
        </PanelSection>
    )

}

export { ScreenshotManagerController }