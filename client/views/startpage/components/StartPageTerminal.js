class StartPageTerminal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.logic();
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

    // LOGIC FOR COMPONENT
    logic() {
        // TEST FOR STARTTEXT - NOT WORKING CURRENTLY
        let startTextArray = ["cd ..", "cd hidden", "ls", "access.log", "nodes_04", "signal.tmp"];

        for (let text of startTextArray) {
            let p = document.createElement("p");
            this.shadowRoot.querySelector("#startText").append(p);
            for (let letter of text) {
                setTimeout(() => {
                    p.innerHTML += letter;
                }, 500)
            }
        }
    }

    // OLD HTML FOR #STARTTEXT
    // <p><span>cd</span> ..</p>
    // <p><span>cd</span> hidden</p>
    // <span>ls</span>
    // <p>access.log</p>
    // <p>nodes_04</p>
    // <p>signal.tmp</p>

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                p {
                    color: white;
                    margin: 0;
                }
                h3 {
                    color: red;
                    margin: 0;
                }
                span {
                    color: orange;
                }
                input {
                    background-color: black;
                    border: none;
                    border-bottom: 2px solid green;
                    color: green;
                }
                #terminal {
                    display: flex;
                    flex-direction: column;
                    padding: 70px;
                    gap: 30px;
                }
                #commandPrompt {
                    display: flex;
                    gap: 10px;
                }
                #proceedPart {
                    display: flex;
                    flex-direction: column;
                }
                button {
                    margin-left: auto;
                    border: none;
                    padding: 10px;
                    border-radius: 5px;
                }
            </style>

            <div id="terminal">
                <div id="startText">
                    
                </div>
            
                <div id="commandPrompt">
                    <p>run</p>
                    <input type="text">
                </div>

                <div id="responseText">
                    <h3>WARNING:</h3>
                    <p>if you choose to enter, you will not be allowed to leave this website.</p>
                </div>

                <div id="proceedPart">
                    <p>proceed? [enter]</p>
                    <button>enter</button>
                </div>
            </div>
        
        `
    }



}

customElements.define("start-page-terminal", StartPageTerminal);