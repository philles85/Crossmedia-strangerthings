class StartPageTerminal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.eventListeners();
        this.logic("start");
    }

    subs() {

    }

    eventListeners() {
        let inputField = this.shadowRoot.querySelector("input");

        inputField.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                if (inputField.value == "stranger_things") {
                    this.logic("end");
                }
            }
        })

    }

    // LOGIC FOR COMPONENT
    async logic(type) {
        // TEST FOR STARTTEXT - NOT WORKING CURRENTLY
        function resolvePromise(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // let string = "cd ..-cd hidden-ls_access.log-nodes_04-signal.tmp"

        if (type == "end") {

            let terminalEndText = ["WARNING: ", "if ", "you ", "choose ", "to ", "enter, ", "you ", "will ", "not ", "be ", "allowed ", "to ", "leave ", "this ", "website. "];


            let h3 = document.createElement("h3");
            this.shadowRoot.querySelector("#responseText").append(h3);

            let p = document.createElement("p");
            this.shadowRoot.querySelector("#responseText").append(p);


            for (let string of terminalEndText) {

                for (let letter of string) {
                    if (string.includes("WARNING:")) {
                        h3.innerHTML += letter;

                    } else {
                        p.innerHTML += letter;

                    }
                    await resolvePromise(100);
                }
            }

            this.shadowRoot.querySelector("#proceedPart").style = "display: flex;"

        } else if (type == "start") {

            let startTextArray = ["cd ..", "cd", "hidden", "ls", "access.log", "nodes_04", "signal.tmp"];

            for (let string of startTextArray) {

                let p = document.createElement("p");
                this.shadowRoot.querySelector("#startText").append(p);

                let span;

                if (string.includes("cd") || string.includes("ls")) {
                    span = document.createElement("span")
                    span.id = "orangeSpan";
                    p.append(span)
                }


                for (let letter of string) {
                    if (!span) {

                        p.innerHTML += letter;

                    } else {
                        span.innerHTML += letter;

                        if (span.innerHTML.includes("cd ")) {
                            console.log(letter);
                            p.innerHTML += letter;
                        }
                    }
                    await resolvePromise(100);
                }
            }


        }


        this.shadowRoot.querySelector("#commandPrompt").style = "display: flex;"



    }


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
                #orangeSpan {
                    color: orange;
                }
                #redSpan {
                    color: red;
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
                    display: none;
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