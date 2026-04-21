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
                if (inputField.value == "stranger_things") { }
            }
        })

    }

    // LOGIC FOR COMPONENT
    async logic() {
        // TEST FOR STARTTEXT - NOT WORKING CURRENTLY
        function resolvePromise(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let startTextArray = ["cd ..", "cd hidden", "ls", "access.log", "nodes_04", "signal.tmp"];

        for (let string of startTextArray) {

            let p = document.createElement("p");
            this.shadowRoot.querySelector("#startText").append(p);
            let span;

            if (string.includes("cd") || string.includes("ls")) {
                span = document.createElement("span")
                p.append(span)
            }


            for (let letter of string) {
                if (!span) {
                    p.innerHTML += letter;
                } else {
                    span.innerHTML += letter;
                }
                await resolvePromise(100);
            }
        }

        this.shadowRoot.querySelector("#commandPrompt").style = "display: flex;"



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
                    display: none;
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