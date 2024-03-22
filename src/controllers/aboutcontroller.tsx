import { useState } from "react";
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

import MarkDownIt from "markdown-it";

const mdIt = new MarkDownIt({
  html: true
})

const AboutController =() => {
    const [ aboutContent, setAboutContent ] = useState("");

    async function loadAboutContent() {
        await PyInterop.getAboutContent().then((res) => {
            setAboutContent(res.about);
        });
    }

    if(aboutContent === ""){
        loadAboutContent();
    }

    return (
        <div>
            
        </div>
    )
}

export { AboutController }