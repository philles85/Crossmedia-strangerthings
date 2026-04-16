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
                }
                h1{
                    font-family: "Benguiat_outlined";
                    -webkit-text-stroke: 1px #A10303;
                    font-size: 48px;
                }
                h2{
                    font-family: "Benguiat_bold";
                    color: black;
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