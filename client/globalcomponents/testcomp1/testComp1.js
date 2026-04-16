class HeaderComp extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    subs() {

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @font-face {
                    font-family: "Benguiat_bold";
                    src: url("../fonts/Benguiat_Bold.ttf") format("truetype");
                }
                @font-face {
                    font-family: "Benguiat_outlined";
                    src: url("../fonts/Stranger_Things_Outlined.ttf") format("Outlined");
                }
                #header{
                    text-align: center;
                    margin-top: 84px;
                    background: black;
                }
                h1, h2{
                    margin: 0px;
                    letter-spacing: -1px;
                }
                h1{
                    font-family: "Benguiat_outlined";
                    -webkit-text-stroke: 2px #A10303;
                    color: transparent;
                    font-size: 48px;
                }
                h2{
                    font-family: "Benguiat_bold";
                    color: white;
                    font-size: 24px;
                }
            </style>
            <div id="header">
                <h1>STRANGER THINGS</h1>
                <h2>THE LAST GATE</h2>
            </div>
        `
    }
}

customElements.define("header-comp", HeaderComp);