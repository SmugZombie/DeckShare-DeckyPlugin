import { useState, useRef, useEffect } from "react";
import { PyInterop } from "../PyInterop";
import { 
    Focusable,
    DialogButton
} from "decky-frontend-lib"

const LogController = () => {
    const [ logs, setLogs ] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, [logs]);

    async function getLogs() {
        try{
            PyInterop.getLogs().then((res) => {
                setLogs(res.logs.join(""));
            });
        }catch(e:string){
            PyInterop.log("Error in getLogs: " + e);
        }
    }

    if(logs == ""){
        getLogs();
    }

    return (
        <div>
            <textarea ref={textareaRef} readOnly={true} style={{width: "100%", height: "300px"}} value={logs}></textarea>
            <Focusable>
                <DialogButton onClick={()=>getLogs()}>Refresh Logs</DialogButton>
            </Focusable>
        </div>
    )
}

export { LogController }