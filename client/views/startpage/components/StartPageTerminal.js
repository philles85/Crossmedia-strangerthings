class StartPageTerminal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    subs() {

    }

    eventListeners() {
        let inputField = this.shadowRoot.querySelector("input");

        inputField.addEventListener("keydown", (event) => {
            if (event.key == "enter") {
                if (inputField.value == "") { }
            }
        })

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>

            </style>

            <div id="startText">
                <p>cd ..</p>
                <p>cd hidden</p>
                <p>access.log</p>
                <p>nodes_04</p>
                <p>signal.tmp</p>
            </div>
            
            <div id="commandPrompt">
                <p>run</p>
                <input type="text">

            </div>

            <div id="responseText">
                <p>WARNING:</p>
                <p>if you choose to enter, you will not be allowed to leave this website.</p>
            </div>

            <div id="proceedPart">
                <p>proceed? [enter]</p>
                <button>enter</button>
            </div>

        
        `
    }



}

customElements.define("start-page-terminal", StartPageTerminal);