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
    DialogButton,
    joinClassNames,
    gamepadDialogClasses,
} from "decky-frontend-lib"
import { Screenshot } from "../lib/datastructure.screenshots";
const FieldWithSeparator = joinClassNames(gamepadDialogClasses.Field, gamepadDialogClasses.WithBottomSeparatorStandard);

const ScreenshotManagerController = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ screenshotsList, setScreenshotsList ] = useState({});
    const [ successfulUploads, setSuccessfulUploads ] = useState({});

    async function reload() {
        try{
            await PyInterop.getScreenshots().then((res) => {
                setScreenshotsList(res.result);
            });
            await PyInterop.getSuccessfulUploads().then((res) => {
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
        <PanelSection title="Recent Screenshots" style={{
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            padding: "20px", 
            gap: "20px"
        }}>
        <Focusable className="" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gridGap: "0.5rem", padding: "8px 0" }}>

          {
            (Object.keys(screenshotsList).length === 0) ? (
                <div style={{ 
                    textAlign: "center", 
                    margin: "14px 0px", 
                    padding: "0px 15px", 
                    fontSize: "18px" 
                }}>
                    No screenshots found
                </div>
            ) : (
                <>
                    {
                        Object.values(screenshotsList).map((itm: Screenshot) => (
                            <div style={{
                                border: itm.uploaded ? "3px solid green" : "3px solid red", 
                                width: "180px", 
                                display: "flex", 
                                borderRadius: "8px", 
                                flexDirection: "column", 
                                justifyContent: "center",
                                flex: "0 0 auto",
                            }}>
                                {itm.base64 && <img style={{ height: "100px", width: "180px" }} src={`data:image/png;base64,${itm.base64}`} alt="Screenshot" />}
                                <div style={{ padding: "8px", textAlign: "center" }}>
                                    <div style={{ fontSize: "12px", fontWeight: "bold" }}>{itm.name}</div>
                                    <div style={{ fontSize: "10px" }}>{itm.uploaded ? "Shared" : "Not Shared"}</div>
                                    <ButtonItem style={{height: "30px", justifyContent: "center", fontSize: "10px"}} onClick={() => {
                                        PyInterop.uploadScreenshot(itm.path).then(() => {
                                            reload();
                                        });
                                    }}>
                                        Share
                                    </ButtonItem>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
          }
          </Focusable>
            <PanelSectionRow>
                <ButtonItem layout="below" onClick={reload} >
                    Reload Screenshots
                </ButtonItem>
            </PanelSectionRow>
        </PanelSection>
    )

}

export { ScreenshotManagerController }